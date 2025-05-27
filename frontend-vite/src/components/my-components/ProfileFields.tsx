import axios from "axios";
interface ProfileFieldsProps {
  editing: boolean;
  userId: number;
  name: string;
  email: string;
  semesterIndex: number;
  createdAt: string;
  updatedAt: string;
  onNameChange: (val: string) => void;
  onEmailChange: (val: string) => void;
}

export default function UserProfileFields({
  editing,
  userId,
  name,
  email,
  semesterIndex,
  createdAt,
  updatedAt,
  onNameChange,
  onEmailChange,
}: ProfileFieldsProps) {

  

  return (
    <div className="space-y-2">
      {editing ? (
        <>
          <input
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
          <input
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
        </>
      ) : (
        <>
          <div className="text-lg font-semibold">{name}</div>
          <div className="text-sm text-muted-foreground">{email}</div>
        </>
      )}
      <div>
        <strong>Semester:</strong> Y{Math.floor((semesterIndex + 1) / 2)}S
        {semesterIndex % 2 === 0 ? 2 : 1}
      </div>
      <div>
        <strong>Created:</strong> {new Date(createdAt).toLocaleDateString()}
      </div>
      <div>
        <strong>Updated:</strong> {new Date().toLocaleDateString()}
      </div>

    </div>
  );
}
