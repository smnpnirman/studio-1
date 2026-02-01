'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, LoaderCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { describeImage } from '@/ai/flows/describe-image-flow';
import { useUser, useFirestore, useStorage, addDocumentNonBlocking } from '@/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, serverTimestamp } from 'firebase/firestore';

export function ImageDescriber() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState<string | null>(null);
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const storage = useStorage();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Please select an image smaller than 4MB.',
        });
        return;
      }
      setSelectedFile(file);
      setDescription(null);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDescribe = async () => {
    if (!selectedFile) return;
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Please log in',
        description: 'You need to be logged in to save uploaded images.',
      });
      return;
    }

    setLoading(true);
    setDescription(null);

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onload = async () => {
      const dataUri = reader.result as string;
      try {
        const [descriptionResult, uploadResult] = await Promise.all([
          describeImage({ photoDataUri: dataUri }),
          (async () => {
            if (!storage || !user) throw new Error("Not logged in or storage not available.");
            const imageRef = storageRef(storage, `users/${user.uid}/uploadedImages/${Date.now()}-${selectedFile.name}`);
            const snapshot = await uploadBytes(imageRef, selectedFile);
            return await getDownloadURL(snapshot.ref);
          })()
        ]);
        
        const downloadURL = uploadResult;
        setDescription(descriptionResult);

        if (firestore) {
          const uploadedImagesCol = collection(firestore, `users/${user.uid}/uploadedImages`);
          
          addDocumentNonBlocking(uploadedImagesCol, {
              userId: user.uid,
              imageUrl: downloadURL,
              description: descriptionResult,
              createdAt: serverTimestamp()
          }).then(() => {
              toast({
                title: 'Image Saved!',
                description: 'Your image and its description have been saved to your collection.',
              });
          });
        }

      } catch (error: any) {
        console.error('Error during upload or description:', error);
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
          description: error.message || 'There was a problem processing your image.',
        });
      } finally {
        setLoading(false);
      }
    };
    reader.onerror = (error) => {
        console.error('File reader error:', error);
        toast({
          variant: 'destructive',
          title: 'File error',
          description: 'Could not read the selected file.',
        });
        setLoading(false);
    };
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
            <CardTitle className="text-center">AI Image Explorer</CardTitle>
            <CardDescription className="text-center">Upload an image and let our AI tell you what it sees!</CardDescription>
        </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <label htmlFor="image-upload" className="w-full h-48 border-2 border-dashed border-muted rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
            {previewUrl ? (
              <Image src={previewUrl} alt="Selected preview" width={192} height={192} className="h-full w-auto object-contain rounded-md" />
            ) : (
              <>
                <UploadCloud className="h-12 w-12 text-muted-foreground" />
                <span className="mt-2 text-sm text-muted-foreground">Click to upload or drag and drop</span>
                <span className="text-xs text-muted-foreground">PNG, JPG, or WEBP (max 4MB)</span>
              </>
            )}
            <input id="image-upload" type="file" accept="image/png, image/jpeg, image/webp" className="sr-only" onChange={handleFileChange} disabled={loading} />
          </label>
          
          {!user && !isUserLoading && (
            <p className="text-sm text-center text-muted-foreground">
              <Link href="/login" className="underline text-primary">Login</Link> to save your uploaded images.
            </p>
          )}

          {selectedFile && (
            <div className="w-full flex flex-col items-center gap-2">
                <p className="text-sm text-muted-foreground truncate w-full text-center">
                    {selectedFile.name}
                </p>
                <Button onClick={handleDescribe} disabled={loading || !selectedFile || !user} className="w-full">
                    {loading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {loading ? 'Analyzing...' : 'Describe & Save Image'}
                </Button>
            </div>
          )}
          {description && (
            <div className="w-full p-4 bg-muted/50 rounded-lg text-sm text-foreground">
                <p className='font-semibold mb-2'>AI Description:</p>
                <p>{description}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
