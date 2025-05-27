import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserAvatarBadge from "./UserAvatarBadge.tsx";
import UserProfileFields from "./ProfileFields.tsx";
import type { User } from "./Dashboard";
import axios from "axios"; 
interface UserProfileCardProps {
  user: User;
}

export default function ProfileCard({user}: UserProfileCardProps) {

  const {userName, email, currentSemesterIndex, createdAt} : User = user;
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(userName);
  const [emailAddress, setEmailAddress] = useState(email);
  const [semesterIndex] = useState(currentSemesterIndex);
  const handleSave = async () => {
    try {
      const updatedUser = {
        userName: name,
        email: email,
       };
      
      const response = await axios.put("http://localhost:8080/api/users/${user.id}", updatedUser);
      console.log("Updated user:", response.data);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-xl">Welcome back!</CardTitle>
      </CardHeader>
      <CardContent className="flex space-x-6 items-start">
        <UserAvatarBadge name={name} />
        <UserProfileFields
          editing={editing}
          name={name}
          email={emailAddress}
          semesterIndex={semesterIndex}
          createdAt={createdAt}
          //updatedAt={updatedAt}
          onNameChange={setName}
          onEmailChange={setEmailAddress}
        />
        <Button onClick={() => {setEditing((e) => !e);handleSave}} className="ml-auto">
          {editing ? "Save" : "Edit"}
        </Button>
      </CardContent>
    </Card>
  );
}
