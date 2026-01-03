import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { MapPin, Star } from "lucide-react";
import type { farms as FarmType } from "@/lib/data";

type Farm = typeof FarmType[0];

interface FarmCardProps {
  farm: Farm;
}

export function FarmCard({ farm }: FarmCardProps) {
  const image = PlaceHolderImages.find(p => p.id === farm.imagePlaceholder);

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 flex flex-col">
      <Link href={`/farms/${farm.id}`} className="block">
        <div className="relative h-48 w-full">
          {image ? (
            <Image
              src={image.imageUrl}
              alt={farm.name}
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
        <CardTitle className="font-headline text-2xl truncate">
          <Link href={`/farms/${farm.id}`} className="hover:text-accent transition-colors">{farm.name}</Link>
        </CardTitle>
        <CardDescription className="flex items-center pt-1">
          <MapPin className="h-4 w-4 mr-1.5 text-muted-foreground" />
          {farm.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3">{farm.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="font-semibold">{farm.rating}</span>
          <span className="text-xs text-muted-foreground">({farm.reviews} reviews)</span>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href={`/farms/${farm.id}`}>Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
