import { type User } from "@/components/my-components/UserProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserProfileCard({
  userProfile,
}: {
  userProfile: User | null;
}) {
  if (!userProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-xl">You’re not logged in</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            Please log in to view your dashboard.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-8 p-6 space-y-10">
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-2xl">
            Welcome, {userProfile.userName}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Email:</strong> {userProfile.email}
          </div>
          <div>
            <strong>GPA:</strong>{" "}
            {userProfile.gpa ? (
              userProfile.gpa.toFixed(2)
            ) : (
              <> Please update your gpa</>
            )}
          </div>
          <div>
            <strong>Semester:</strong>
            {!userProfile.currentSemesterIndex ? (
              <> Please update your current semesterIndex</>
            ) : (
              <>
                {Math.floor((userProfile.currentSemesterIndex + 1) / 2)}S
                {userProfile.currentSemesterIndex % 2 === 0 ? 2 : 1}
              </>
            )}
          </div>
          <div>
            <strong>Created:</strong>{" "}
            {new Date(userProfile.createdAt).toLocaleDateString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
