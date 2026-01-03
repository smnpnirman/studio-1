'use client';
import Image from "next/image";
import { farms } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { notFound } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, MapPin, Star, Users } from "lucide-react";
import React from "react";
import { useToast } from "@/hooks/use-toast";

export default function FarmDetailPage({ params }: { params: { id: string } }) {
  const farm = farms.find((f) => f.id === params.id);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { toast } = useToast();

  if (!farm) {
    notFound();
  }
  
  const handleBooking = () => {
    toast({
      title: "Booking Confirmed!",
      description: `Your visit to ${farm.name} on ${date?.toLocaleDateString()} has been booked.`,
      variant: "default",
      duration: 5000,
    });
  }


  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-2">
          <Carousel className="w-full rounded-lg overflow-hidden shadow-lg border">
            <CarouselContent>
              {farm.gallery.map((imageId, index) => {
                const image = PlaceHolderImages.find(p => p.id === imageId);
                return (
                  <CarouselItem key={index}>
                    <div className="relative h-64 md:h-[450px]">
                      {image && (
                         <Image
                          src={image.imageUrl}
                          alt={`${farm.name} gallery image ${index + 1}`}
                          fill
                          className="object-cover"
                          data-ai-hint={image.imageHint}
                        />
                      )}
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="ml-16" />
            <CarouselNext className="mr-16" />
          </Carousel>
          
          <div className="mt-8">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">{farm.name}</h1>
            <div className="flex items-center gap-4 text-muted-foreground mt-3">
               <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1.5" />
                <span>{farm.location}</span>
              </div>
              <div className="flex items-center">
                 <Star className="w-4 h-4 mr-1.5 text-yellow-400 fill-yellow-400" />
                 <span className="font-semibold text-foreground">{farm.rating}</span>
                 <span className="ml-1">({farm.reviews} reviews)</span>
              </div>
            </div>
            
            <p className="mt-6 text-lg leading-relaxed">{farm.longDescription}</p>
          </div>
          
          <div className="mt-10">
            <h2 className="font-headline text-3xl font-bold">Activities & Amenities</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {farm.activities.map((activity, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span className="text-foreground/90">{activity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <Card className="sticky top-24 shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-center">Book Your Visit</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border p-0"
                disabled={(date) => date < new Date(new Date().setHours(0,0,0,0)) }
              />
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Select defaultValue="2">
                  <SelectTrigger className="w-full pl-10 text-base">
                    <SelectValue placeholder="Number of guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <SelectItem key={num} value={String(num)}>{num} Guest{num > 1 ? 's' : ''}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleBooking}>
                Book Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
