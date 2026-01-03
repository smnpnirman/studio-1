import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { farms } from "@/lib/data";
import { FarmCard } from "@/components/farm-card";
import { Search } from "lucide-react";

export default function FarmsPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-accent">Explore Our Farms</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
          Find your perfect countryside getaway. From rustic homesteads to luxury vineyards, your next adventure awaits.
        </p>
      </div>
      
      <div className="mb-8 p-4 bg-background rounded-lg border shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search by farm name or location..." className="pl-10 text-base" />
          </div>
          <Select>
            <SelectTrigger className="w-full text-base">
              <SelectValue placeholder="Filter by activity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fruit-picking">Fruit Picking</SelectItem>
              <SelectItem value="animal-interaction">Animal Interaction</SelectItem>
              <SelectItem value="workshops">Workshops</SelectItem>
              <SelectItem value="vineyards">Vineyards</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {farms.map((farm) => (
          <FarmCard key={farm.id} farm={farm} />
        ))}
      </div>
    </div>
  );
}
