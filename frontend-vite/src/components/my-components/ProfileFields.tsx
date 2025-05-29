import { useUserProfile } from "../my-contexts/UserProfileContext";

export default function UserProfileFields() {
  const { userProfile } = useUserProfile();
  const name = !userProfile ? undefined : userProfile.userName;
  const email = !userProfile ? undefined : userProfile.email;
  const semesterIndex = !userProfile
    ? 1
    : userProfile.currentSemesterIndex === null
    ? 1
    : userProfile.currentSemesterIndex;
  const createdAt = !userProfile ? new Date() : userProfile.createdAt;
  const updatedAt = !userProfile ? new Date() : userProfile.updatedAt;

  return (
    <div className="space-y-2">
      <>
        <div className="text-lg font-semibold">UserName: {name}</div>
        <div className="text-sm text-muted-foreground">Email: {email}</div>
      </>
      <div>
        <strong>Semester:</strong> Y{Math.floor((semesterIndex + 1) / 2)}S
        {semesterIndex % 2 === 0 ? 2 : 1}
      </div>
      <div>
        <strong>Created:</strong> {new Date(createdAt).toLocaleDateString()}
      </div>
      <div>
        <strong>Updated:</strong> {new Date(updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
}
