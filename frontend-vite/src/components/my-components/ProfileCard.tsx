import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import UserProfileFields from "./ProfileFields.tsx";
import { useUserProfile } from "../my-hooks/UserProfileContext.tsx";

export default function ProfileCard() {
  const { userProfile } = useUserProfile();

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-xl">You're not logged in</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            Please log in to view your dashboard.
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return <UserProfileFields />;
  }
}
