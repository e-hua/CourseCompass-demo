import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/components/my-components/Dashboard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
interface UserProfileCardProps {
  user: User;
}

export default function UserProfileCard({user}: UserProfileCardProps) {

  const {userName, email, currentSemesterIndex, createdAt, updatedAt} : User = user;
  
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(userName);
  const [emailAddress, setEmailAddress] = useState(email);
  const [semesterIndex, setSemesterIndex] = useState(currentSemesterIndex);

 return (<Card className="p-6" onSubmit ={(e) => {
    e.preventDefault();
    setEditing(!editing);
    // Here you would typically handle the save logic, e.g., send updated data to the server
   }
  }>
  <CardHeader>
    <CardTitle className="text-xl">Welcome back!</CardTitle>
  </CardHeader>
  <CardContent className="flex items-center space-x-4">
    <Avatar>
      <AvatarImage src="/avatar-placeholder.png" />
      <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
    <div>
      { editing ? <input value = {name} onChange = {(e) => setName(e.target.value)}></input>
      :<div className="text-lg font-semibold">{name}</div>}
      <div className="text-sm text-muted-foreground">{user.email}</div>
          <div>
            <strong>Semester:</strong> Y
            {Math.floor((user.currentSemesterIndex + 1) / 2)}S
            {user.currentSemesterIndex % 2 == 0 ? 2 : 1}
          </div>
          <div>
            <strong>Created:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </div>
          <div>
            <strong>Updated:</strong>{" "}
            {new Date(user.updatedAt).toLocaleDateString()}
          </div>
    </div>
    <Button className="ml-auto" variant="outline" type = "submit">
      {editing ? "Save" : "Edit"}
    </Button>
  </CardContent>
</Card> )
}
