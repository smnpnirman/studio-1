'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, LoaderCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { describeImage } from '@/ai/flows/describe-image-flow';

export function ImageDescriber() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState<string | null>(null);
  const { toast } = useToast();

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

    setLoading(true);
    setDescription(null);

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = async () => {
      const dataUri = reader.result as string;
      try {
        const result = await describeImage({ photoDataUri: dataUri });
        setDescription(result);
      } catch (error: any) {
        console.error('AI error:', error);
        toast({
          variant: 'destructive',
          title: 'Analysis failed',
          description: error.message || 'There was a problem analyzing your image.',
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
          {selectedFile && (
            <div className="w-full flex flex-col items-center gap-2">
                <p className="text-sm text-muted-foreground truncate w-full text-center">
                    {selectedFile.name}
                </p>
                <Button onClick={handleDescribe} disabled={loading || !selectedFile} className="w-full">
                    {loading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {loading ? 'Analyzing...' : 'Describe Image'}
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
