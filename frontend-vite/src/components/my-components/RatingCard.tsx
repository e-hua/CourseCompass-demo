import Ratings from "@/components/my-components/Ratings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import { postCourseRating } from "@/apis/CourseRatingAPI";
import { toast } from "sonner";
import { useUserProfile } from "@/components/my-hooks/UserProfileContext";
import { Update } from "@mui/icons-material";
import { LoaderCircle } from "lucide-react";

export default function RatingCard({ courseName }: { courseName: string }) {
  const [difficulty, setDifficulty] = useState<number>(0);
  const [workload, setWorkload] = useState<number>(0);
  const [enjoyability, setEnjoyability] = useState<number>(0);
  // const [ratingSubmitted, setRatingSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const { userProfile, refetchUserProfile } = useUserProfile();
  const existingRating = (userProfile?.courseRatings ?? []).filter(
    (x) => x.courseCode === courseName
  );

  const handleUpload = async () => {
    if (difficulty === 0 || workload === 0 || enjoyability === 0) {
      toast.error("Please rate all categories before submitting.");
      return;
    }

    setLoading(true);
    try {
      await postCourseRating(courseName, difficulty, workload, enjoyability);
      await refetchUserProfile();
      // setRatingSubmitted(true);
      toast.success("Rating submitted!");
    } catch (e) {
      const message =
        e instanceof Error
          ? e.message
          : typeof e === "string"
          ? e
          : "Unknown error";

      toast.error("Failed to submit rating", { description: message });
    } finally {
      setLoading(false); // stop spinner
    }
  };

  /*
  if (ratingSubmitted) {
    return (
      <Card className="m-10 p-6 mx-auto space-y-5 w-200 h-100">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{courseName}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p>Thank you for your ratings!</p>
        </CardContent>
      </Card>
    );
  }
*/

  if (existingRating.length > 0) {
    return (
      <Card className="m-10 p-6 mx-auto space-y-5 w-200 h-100">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{courseName}</CardTitle>
        </CardHeader>

        <CardContent className="flex items-center space-x-2">
          <CardTitle>Rate its Difficulty !</CardTitle>
          <Ratings
            onChange={(v) => setDifficulty(v)}
            existingIndex={existingRating[0].difficulty}
          />
        </CardContent>

        <CardContent className="flex items-center space-x-2">
          <CardTitle>Rate its Workloads !</CardTitle>
          <Ratings
            onChange={(v) => setWorkload(v)}
            existingIndex={existingRating[0].averageWorkload}
          />
        </CardContent>

        <CardContent className="flex items-center space-x-2">
          <CardTitle>Rate its Enjoyability !</CardTitle>
          <Ratings
            onChange={(v) => setEnjoyability(v)}
            existingIndex={existingRating[0].enjoyability}
          />
        </CardContent>

        <CardContent className="flex items-center-safe space-x-2">
          <Button onClick={handleUpload} disabled={loading}>
            {loading ? (
              <LoaderCircle className="animate-spin w-5 h-5" />
            ) : (
              <>
                {" "}
                <Update /> Update Rating{" "}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card className="m-10 p-6 mx-auto space-y-5 w-200 h-100">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{courseName}</CardTitle>
        </CardHeader>

        <CardContent className="flex items-center space-x-2">
          <CardTitle>Rate its Difficulty !</CardTitle>
          <Ratings onChange={(v) => setDifficulty(v)} existingIndex={0} />
        </CardContent>

        <CardContent className="flex items-center space-x-2">
          <CardTitle>Rate its Workloads !</CardTitle>
          <Ratings onChange={(v) => setWorkload(v)} existingIndex={0} />
        </CardContent>

        <CardContent className="flex items-center space-x-2">
          <CardTitle>Rate its Enjoyability !</CardTitle>
          <Ratings onChange={(v) => setEnjoyability(v)} existingIndex={0} />
        </CardContent>

        <CardContent className="flex items-center-safe space-x-2">
          <Button onClick={handleUpload} disabled={loading}>
            {loading ? (
              <LoaderCircle className="animate-spin w-5 h-5" />
            ) : (
              <>
                {" "}
                <Upload /> Upload Rating{" "}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }
}
