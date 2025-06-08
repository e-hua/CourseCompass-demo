import Ratings from "@/components/my-components/Ratings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function RatingCard({ courseName }: { courseName: string }) {
  return (
    <Card className="m-10 p-6 mx-auto space-y-5 w-200 h-100">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{courseName}</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center space-x-2">
        <CardTitle>Rate its Difficulty !</CardTitle>
        <Ratings />
      </CardContent>

      <CardContent className="flex items-center space-x-2">
        <CardTitle>Rate its Workloads !</CardTitle>
        <Ratings />
      </CardContent>

      <CardContent className="flex items-center space-x-2">
        <CardTitle>Rate its Enjoyability !</CardTitle>
        <Ratings />
      </CardContent>

      <CardContent className="flex items-center-safe space-x-2">
        <Button className="w-30">
          <Upload /> Upload Rating
        </Button>
      </CardContent>
    </Card>
  );
}
