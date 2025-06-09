import { animate, motion, stagger } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

export default function Ratings({
  onChange,
  existingIndex,
}: {
  onChange: (value: number) => void;
  existingIndex: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filledIndex, setFilledIndex] = useState(existingIndex);
  const [hoverIndex, setHoverIndex] = useState(0);

  const onClickLambda = (y: number) => {
    if (!containerRef.current) return;
    const filledStars = containerRef.current.querySelectorAll(".filled");
    if (y === filledIndex) {
      animate(
        filledStars,
        {
          rotate: [0, -10, 10, -10, 10, 0],
          scale: [1, 0.8, 1],
          opacity: [1, 0.3, 1],
          y: [0, 10, 0],
        },
        {
          duration: 0.5,
          delay: stagger(0.05),
        }
      );
      setFilledIndex(0);
      onChange(0);
    } else {
      animate(
        filledStars,
        { scale: [1, 1.2, 1] },
        { duration: 0.5, delay: stagger(0.075) }
      );
      setFilledIndex(y);
      onChange(y);
    }
  };

  useEffect(() => {
    onChange(existingIndex);
  }, []);

  return (
    <div ref={containerRef} className="flex rating-component">
      {[1, 2, 3, 4, 5].map((x: number) => (
        <motion.div
          key={x}
          onMouseOver={() => setHoverIndex(x)}
          onClick={() => onClickLambda(x)}
          onMouseOut={() => setHoverIndex(0)}
          animate={{
            scale: hoverIndex === x ? 1.5 : 1,
          }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
        >
          {x <= hoverIndex || (hoverIndex == 0 && x <= filledIndex) ? (
            <StarIcon style={{}} className="filled" />
          ) : (
            <StarOutlineIcon style={{}} />
          )}
        </motion.div>
      ))}
    </div>
  );
}
