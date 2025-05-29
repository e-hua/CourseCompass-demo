import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserProfileFields from "./ProfileFields.tsx";
import { useUserProfile } from "../my-contexts/UserProfileContext.tsx";

export default function ProfileCard() {
  const { userProfile } = useUserProfile();
  const [editing, setEditing] = useState(false);

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
  } else {
    return (
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-xl">Welcome back !</CardTitle>
        </CardHeader>
        <CardContent className="flex space-x-6 items-start">
          <UserProfileFields />
          <Button onClick={() => setEditing((e) => !e)} className="ml-auto">
            {editing ? "Save" : "Edit"}
          </Button>
        </CardContent>
      </Card>
    );
  }
}
