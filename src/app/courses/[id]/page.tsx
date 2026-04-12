'use client';
import Image from "next/image";
import { courses } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { notFound, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Clock, Layers, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CourseDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const course = courses.find((c) => c.id === id);
  const { toast } = useToast();

  if (!course) {
    notFound();
  }
  
  const handleEnrollment = () => {
    toast({
      title: "Enrollment Successful!",
      description: `You have successfully enrolled in "${course.title}".`,
      variant: "default",
      duration: 5000,
    });
  };

  const image = PlaceHolderImages.find(p => p.id === course.imagePlaceholder);

  return (
    <>
      <section className="relative w-full h-64 md:h-80 bg-muted">
        {image && (
          <Image
            src={image.imageUrl}
            alt={course.title}
            fill
            className="object-cover"
            data-ai-hint={image.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col justify-end">
          <div className="container mx-auto px-4 md:px-6 py-8 text-white">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">{course.title}</h1>
            <p className="mt-2 text-lg">{course.description}</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <div className="md:col-span-2">
            <h2 className="font-headline text-3xl font-bold mb-4">Course Syllabus</h2>
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
              {course.syllabus.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    Week {item.week}: {item.topic}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    Detailed content for week {item.week} covering {item.topic}. This section would typically include video links, reading materials, and assignments.
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="md:col-span-1">
            <Card className="sticky top-24 shadow-xl">
              <CardContent className="pt-6">
                <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg" onClick={handleEnrollment}>
                  Enroll Now
                </Button>
                <ul className="mt-6 space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <span className="text-muted-foreground">Instructor</span>
                      <p className="font-semibold">{course.instructor}</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <span className="text-muted-foreground">Duration</span>
                      <p className="font-semibold">{course.duration}</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <Layers className="h-5 w-5 text-primary" />
                    <div>
                      <span className="text-muted-foreground">Level</span>
                      <p className="font-semibold">{course.level}</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
