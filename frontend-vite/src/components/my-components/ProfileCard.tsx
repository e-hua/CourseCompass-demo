import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserProfileFields from "./ProfileFields.tsx";
import { useUserProfile } from "../my-contexts/UserProfileContext.tsx";

export default function ProfileCard() {
  const { userProfile } = useUserProfile();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(
    userProfile === null ? undefined : userProfile.userName
  );
  const [emailAddress, setEmailAddress] = useState(
    userProfile == null ? undefined : userProfile.email
  );
  const [semesterIndex] = useState(
    userProfile === null
      ? 1
      : userProfile.currentSemesterIndex === null
      ? 1
      : userProfile.currentSemesterIndex
  );

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
    const { createdAt } = userProfile;

    return (
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-xl">Welcome back !</CardTitle>
        </CardHeader>
        <CardContent className="flex space-x-6 items-start">
          <UserProfileFields
            editing={editing}
            name={name === undefined ? "To be updated" : name}
            email={emailAddress === undefined ? "To be updated" : emailAddress}
            semesterIndex={semesterIndex}
            createdAt={createdAt}
            onNameChange={setName}
            onEmailChange={setEmailAddress}
          />
          <Button onClick={() => setEditing((e) => !e)} className="ml-auto">
            {editing ? "Save" : "Edit"}
          </Button>
        </CardContent>
      </Card>
    );
  }
}
