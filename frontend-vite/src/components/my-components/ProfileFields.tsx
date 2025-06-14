import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUserProfile } from "../my-hooks/UserProfileContext";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { z } from "zod";
import { updateUserProfile } from "@/apis/UserAPI";
import MajorSelectForm from "@/components/diy-ui/Combobox";

const nameSchema = z
  .string()
  .min(2, {
    message: "Name must be at least 2 characters.",
  })
  .max(30, {
    message: "Name must not be longer than 30 characters.",
  });

const indexToSemester = (index: number) =>
  `Y${Math.floor((index + 1) / 2)}S${index % 2 === 0 ? 2 : 1}`;

export default function UserProfileCard() {
  const { userProfile, setUserProfile } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [name, setName] = useState(
    userProfile?.userName || "Please set your user name "
  );
  const [semester, setSemester] = useState(
    userProfile?.currentSemesterIndex?.toString() || "1"
  );
  const [major, setMajor] = useState(userProfile?.major || "Please select your major ");

  const handleCancle = () => {
    setName(userProfile?.userName || "");
    setSemester(userProfile?.currentSemesterIndex?.toString() || "1");
    setMajor(userProfile?.major || "");
    setIsEditing(false);
  };

  const handleSave = async () => {
    const validation = nameSchema.safeParse(name);
    if (!validation.success) {
      toast.error("Invalid name", {
        description: validation.error.issues[0].message,
      });
      return;
    }
    setIsSaving(true);
    try {
      // Imported from @/apis/UserAPI.ts
      const res = await updateUserProfile(
        {
          userName: name,
          currentSemesterIndex: parseInt(semester),
          bookmarkedCourseIds: userProfile?.bookmarkedCourseIds ?? [],
          major: major,
        },
        localStorage.getItem("id_token") ?? ""
      );
      if (!res.ok) {
        const err = await res.json();
        toast.error("Update failed", {
          description: err.error || "Unknown error",
        });
        return;
      }

      const updated = await res.json();
      setUserProfile(updated);
      toast.success("Profile updated !");
      setIsEditing(false);
    } catch (err) {
      toast.error("Network error", { description: String(err) });
    } finally {
      setIsSaving(false);
    }
  };

  if (!userProfile) return null;

  return (
    <Card className="m-10 p-6 mx-auto space-y-5 w-200">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">User Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <>
            <div>
              <label className="block mb-1 text-sm font-medium text-muted-foreground">
                User Name
              </label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-muted-foreground">
                Semester
              </label>
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger className="max-w-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {indexToSemester(i)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="absolute inset-y-73 right-4">
              <label className="block mb-1 text-sm font-medium text-muted-foreground">
                Major
              </label>
              <MajorSelectForm onChange={(val) => {setMajor(val)}} defaultValue={major}/>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button variant="outline" onClick={handleCancle}>
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="text-lg font-semibold">
              UserName: {userProfile.userName}
            </div>
            <div className="text-sm text-muted-foreground">
              Email: {userProfile.email}
            </div>
            <div className="text-sm">
              <strong>Semester:</strong>{" "}
              {indexToSemester(userProfile.currentSemesterIndex ?? 1)}
            </div>
            <div className="text-sm">
              <strong>Created:</strong>{" "}
              {new Date(userProfile.createdAt).toLocaleDateString()}
            </div>
            <div className="text-sm">
              <strong>Updated:</strong>{" "}
              {new Date(userProfile.updatedAt).toLocaleDateString()}
            </div>
            <div className="text-sm absolute inset-y-74 right-60">
              <strong>Major: </strong>{" "}
              {userProfile.major ?? "Not set"}
            </div>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
