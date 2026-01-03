import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook } from "lucide-react";
import { Leaf } from "lucide-react";

export default function LoginPage() {
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
            <Button asChild className="w-full bg-[#1877F2] hover:bg-[#1877F2]/90 text-white">
              <Link href="/dashboard">
                <Facebook className="mr-2 h-5 w-5" />
                Login with Facebook
              </Link>
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
