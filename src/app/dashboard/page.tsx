import Image from "next/image";
import { user, bookings, farms, courses } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, BookOpen } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const avatarImage = PlaceHolderImages.find(p => p.id === user.avatarPlaceholder);

  const farmBookings = bookings.filter(b => b.type === 'farm').map(booking => {
      const farm = farms.find(f => f.id === booking.itemId);
      return { ...booking, item: farm };
  });

  const courseBookings = bookings.filter(b => b.type === 'course').map(booking => {
      const course = courses.find(c => c.id === booking.itemId);
      return { ...booking, item: course };
  });

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
        <Avatar className="h-24 w-24 border-4 border-primary/50">
          {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={user.name} data-ai-hint={avatarImage.imageHint} />}
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-4xl font-bold font-headline">Welcome back, {user.name.split(' ')[0]}!</h1>
          <p className="text-muted-foreground text-lg">Here's your schedule of upcoming rural escapes.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">My Schedule</CardTitle>
          <CardDescription>View and manage your upcoming farm visits and online courses.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="farm-visits">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="farm-visits">Farm Visits</TabsTrigger>
              <TabsTrigger value="online-courses">Online Courses</TabsTrigger>
            </TabsList>
            <TabsContent value="farm-visits" className="mt-6">
              {farmBookings.length > 0 ? (
                <div className="space-y-4">
                  {farmBookings.map(booking => booking.item && (
                    <Card key={booking.id} className="flex flex-col md:flex-row items-start md:items-center p-4 gap-4">
                      <div className="flex-grow">
                        <h3 className="font-semibold text-lg">{booking.item.name}</h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                           <span className="flex items-center"><MapPin className="w-4 h-4 mr-1.5"/>{booking.item.location}</span>
                           <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5"/>{booking.date?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                           <span className="flex items-center"><Users className="w-4 h-4 mr-1.5"/>{booking.guests} Guest{booking.guests && booking.guests > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                       <Button asChild variant="outline" size="sm" className="w-full md:w-auto mt-2 md:mt-0">
                         <Link href={`/farms/${booking.item.id}`}>Manage Booking</Link>
                       </Button>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold">No Farm Visits Booked</h3>
                  <p className="text-muted-foreground mt-2">Ready for an adventure? Find your next farm stay.</p>
                  <Button asChild className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/farms">Explore Farms</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="online-courses" className="mt-6">
              {courseBookings.length > 0 ? (
                <div className="space-y-4">
                  {courseBookings.map(booking => booking.item && (
                    <Card key={booking.id} className="flex flex-col md:flex-row items-start md:items-center p-4 gap-4">
                       <div className="flex-grow">
                        <h3 className="font-semibold text-lg">{booking.item.title}</h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                           <span className="flex items-center"><BookOpen className="w-4 h-4 mr-1.5"/>{booking.item.instructor}</span>
                           <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5"/>{booking.item.duration}</span>
                           <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5"/>Starts {booking.startDate?.toLocaleDateString()}</span>
                        </div>
                      </div>
                       <Button asChild variant="outline" size="sm" className="w-full md:w-auto mt-2 md:mt-0">
                         <Link href={`/courses/${booking.item.id}`}>Go to Course</Link>
                       </Button>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold">No Courses Enrolled</h3>
                  <p className="text-muted-foreground mt-2">Ready to learn something new? Browse our courses.</p>
                   <Button asChild className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/courses">Explore Courses</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
