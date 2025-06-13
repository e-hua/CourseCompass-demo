import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

export default function Stars({ value }: { value: number }) {
  return (
    <div>
      {[0, 1, 2, 3, 4].map((x: number) => {
        if (value - x >= 0.75) {
          return <StarIcon />;
        } else if (value - x >= 0.25) {
          return <StarHalfIcon />;
        } else {
          return <StarOutlineIcon />;
        }
      })}
    </div>
  );
}
