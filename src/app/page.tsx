import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { farms, courses } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { FarmCard } from "@/components/farm-card";
import { CourseCard } from "@/components/course-card";
import { TractorIcon, SproutIcon, BookOpenCheckIcon } from "@/components/icons";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === "hero-1");

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="relative w-full h-[60vh] md:h-[80vh]">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
            Rural Escapes
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Discover authentic farm stays, hands-on workshops, and the tranquility of the countryside.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/farms">Explore Farms</Link>
          </Button>
        </div>
      </section>

      <section className="w-full py-12 md:py-20 lg:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-accent">
                Why Choose Rural Escapes?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We offer a curated selection of unique rural experiences that connect you with nature and local culture.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
            <Card className="bg-card/80 backdrop-blur-sm transition-all hover:shadow-lg">
              <CardHeader className="flex flex-col items-center text-center">
                <TractorIcon className="w-12 h-12 mb-4 text-primary" />
                <CardTitle className="font-headline text-2xl">Authentic Farm Stays</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>Experience genuine farm life. Stay in cozy cottages, help with daily chores, and enjoy fresh, local food.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm transition-all hover:shadow-lg">
              <CardHeader className="flex flex-col items-center text-center">
                <SproutIcon className="w-12 h-12 mb-4 text-primary" />
                <CardTitle className="font-headline text-2xl">Connect with Nature</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>Wake up to birdsong, hike through rolling hills, and breathe in the fresh country air. A perfect digital detox.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm transition-all hover:shadow-lg">
              <CardHeader className="flex flex-col items-center text-center">
                <BookOpenCheckIcon className="w-12 h-12 mb-4 text-primary" />
                <CardTitle className="font-headline text-2xl">Learn New Skills</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>Join workshops on cheesemaking, organic gardening, beekeeping, and more, taught by passionate experts.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Featured Farms</h2>
             <Button variant="link" asChild className="text-accent">
              <Link href="/farms">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {farms.slice(0, 3).map((farm) => (
              <FarmCard key={farm.id} farm={farm} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20 lg:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Popular Courses</h2>
            <Button variant="link" asChild className="text-accent">
              <Link href="/courses">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
