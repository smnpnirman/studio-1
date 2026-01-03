'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Leaf } from "lucide-react";
import { useAuth } from "@/firebase";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error: any) {
      console.error("Facebook login error:", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "An unexpected error occurred during Facebook login.",
      });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm mx-auto shadow-xl">
        <CardHeader className="text-center">
          <Leaf className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="mt-4 text-3xl font-headline">Welcome Back</CardTitle>
          <CardDescription className="mt-2">Sign in to continue your rural adventure.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Button onClick={handleFacebookLogin} className="w-full bg-[#1877F2] hover:bg-[#1877F2]/90 text-white">
              <Facebook className="mr-2 h-5 w-5" />
              Login with Facebook
            </Button>
             <p className="text-center text-xs text-muted-foreground">
              By logging in, you agree to our Terms and Privacy Policy.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
