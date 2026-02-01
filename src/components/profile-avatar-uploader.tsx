'use client';

import { useState } from 'react';
import { useAuth, useUser, useStorage } from '@/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Camera } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export function ProfileAvatarUploader() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const storage = useStorage();
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;

    setUploading(true);
    const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);

    try {
      const snapshot = await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { photoURL: downloadURL });
      }

      toast({
        title: 'Success!',
        description: 'Your profile picture has been updated.',
      });

      setPreviewUrl(null);
      setSelectedFile(null);

    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        variant: 'destructive',
        title: 'Upload failed',
        description: error.message || 'There was a problem uploading your image.',
      });
    } finally {
      setUploading(false);
    }
  };

  if (isUserLoading) {
    return <Skeleton className="h-24 w-24 rounded-full" />;
  }

  const effectivePhotoUrl = previewUrl || user?.photoURL;

  return (
    <div className="flex flex-col items-center gap-4">
        <div className="relative group">
            <Avatar className="h-24 w-24 border-4 border-primary/50">
                <AvatarImage src={effectivePhotoUrl ?? ''} alt={user?.displayName ?? ''} />
                <AvatarFallback>{user?.displayName?.charAt(0) ?? user?.email?.charAt(0)}</AvatarFallback>
            </Avatar>
            <label htmlFor="avatar-upload" className="absolute inset-0 bg-black/50 flex items-center justify-center text-white rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="h-8 w-8" />
                <input id="avatar-upload" type="file" accept="image/*" className="sr-only" onChange={handleFileChange} disabled={uploading} />
            </label>
        </div>
        {selectedFile && (
            <div className="flex items-center gap-2">
                <Button onClick={handleUpload} disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Save Picture'}
                </Button>
                <Button variant="ghost" onClick={() => { setSelectedFile(null); setPreviewUrl(null); }} disabled={uploading}>
                    Cancel
                </Button>
            </div>
        )}
    </div>
  );
}
