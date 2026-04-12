'use client';
import Link from "next/link";
import { Leaf, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
    { href: "/farms", label: "Farms" },
    { href: "/courses", label: "Courses" },
    { href: "/dashboard", label: "My Schedule" },
];

export function Header() {
    const pathname = usePathname();
    const { user, isUserLoading } = useUser();
    const auth = useAuth();

    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Leaf className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline text-xl">Rural Escapes</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "transition-colors hover:text-accent",
                                pathname === link.href ? "text-accent" : "text-foreground/80"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="flex flex-1 items-center justify-end gap-4">
                    {isUserLoading ? (
                        <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
                    ) : user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
                                        <AvatarFallback>{user.displayName?.charAt(0) ?? user.email?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user.displayName}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                         <Button asChild className="hidden sm:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground">
                            <Link href="/login">Login</Link>
                        </Button>
                    )}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                               <SheetTitle>Navigation Menu</SheetTitle>
                               <SheetDescription className="sr-only">
                                 Access all sections of Rural Escapes.
                               </SheetDescription>
                                <Link href="/" className="mb-8 flex items-center space-x-2">
                                     <Leaf className="h-6 w-6 text-primary" />
                                    <span className="font-bold font-headline text-xl">Rural Escapes</span>
                                </Link>
                            </SheetHeader>
                            <div className="flex flex-col h-full">
                                <nav className="flex flex-col gap-6 text-lg font-medium">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={cn(
                                                "transition-colors hover:text-accent",
                                                pathname === link.href ? "text-accent" : "text-muted-foreground"
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>
                                <div className="mt-auto">
                                    { user ? (
                                        <Button onClick={handleLogout} className="w-full">Logout</Button>
                                    ) : (
                                        <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                            <Link href="/login">Login</Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
