import Layout from "@/components/Sidebar/layout";
import RatingCard from "@/components/my-components/RatingCard";
import { useTakenCourses } from "@/components/my-hooks/UseTakenCourses";
import { useUserProfile } from "@/components/my-hooks/UserProfileContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

function SearchPage() {
  const { data: courses, isLoading, error } = useTakenCourses();
  const { userProfile } = useUserProfile();

  if (!userProfile) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-xl">You're not logged in</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              Please log in to view your Ratings.
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (isLoading)
    return (
      <Layout>
        <div className="p-4">
          <Skeleton className="rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="m-10 p-6 mx-auto space-y-5  w-200 h-100" />
            <Skeleton className="m-10 p-6 mx-auto space-y-5  w-200 h-100" />
            <Skeleton className="m-10 p-6 mx-auto space-y-5  w-200 h-100" />
          </div>
        </div>
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-xl">Your profile is broken</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              Please try login again to view your courseRatings.
            </CardContent>
          </Card>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <Carousel className="max-w-3xl mx-auto my-auto relative" opts={{
    align: "start",
    loop: true,
  }}>
        <CarouselContent >
    
        {courses?.map((course) => (
          <CarouselItem><RatingCard key={course.id} courseName={course.courseCode} /></CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute inset-y-65 left-4"/>
  <CarouselNext className="absolute inset-y-65 right-4"/>
  </Carousel>
    </Layout>
  );
}

export default SearchPage;
