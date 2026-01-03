import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Clock, User } from "lucide-react";
import type { courses as CourseType } from "@/lib/data";

type Course = typeof CourseType[0];

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const image = PlaceHolderImages.find(p => p.id === course.imagePlaceholder);

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 flex flex-col">
      <Link href={`/courses/${course.id}`} className="block">
        <div className="relative h-48 w-full">
          {image ? (
            <Image
              src={image.imageUrl}
              alt={course.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              data-ai-hint={image.imageHint}
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
        </div>
      </Link>
      <CardHeader>
        <CardTitle className="font-headline text-xl h-14 line-clamp-2">
          <Link href={`/courses/${course.id}`} className="hover:text-accent transition-colors">{course.title}</Link>
        </CardTitle>
        <CardDescription className="flex items-center pt-1">
          <User className="h-4 w-4 mr-1.5 text-muted-foreground" />
          {course.instructor}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3">{course.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{course.duration}</span>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href={`/courses/${course.id}`}>Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
