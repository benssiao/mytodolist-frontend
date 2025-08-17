import { useState, useRef } from "react";

function Entry(props) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const holdTimer = useRef(null);
  const progressTimer = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Control visibility of the entry
  const LINESPEED = 83; // Adjust this value to change the speed of the green outline on hold.
  const LINERADIUS = 8; // Radius of the circle for the progress indicator.
  const startHold = () => {
    setIsHolding(true);
    setProgress(0);

    // Progress animation
    progressTimer.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer.current);
          return 100;
        }
        return prev + 10; // Increment progress
      });
    }, 100);

    // Complete after 3 seconds
    holdTimer.current = setTimeout(() => {
      completeTask();
      resetHold();
    }, 1000);
  };

  const resetHold = () => {
    setIsHolding(false);
    setProgress(0);
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
    }
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
    }
  };

  const completeTask = () => {
    setIsChecked(true);
    setIsVisible(false); // Hide the entry after completion
    setTimeout(() => {
      props.onRemove();
    }, 500); // 500ms delay to allow the fade-out effect
    resetHold();
  };

  return (
    <div
      className="bg-gray-100 dark:bg-gray-700 p-4  flex items-center w-full transition-opacity duration-500 ease-out "
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* Checkbox with circular progress border */}
      <div className="relative">
        {/* Progress circle */}
        <svg
          className="absolute -top-0.5 -left-1 w-6 h-6 " // Smaller inset
          viewBox="0 0 24 24"
        >
          {isHolding && (
            <circle
              cx="12"
              cy="12"
              r={`${LINERADIUS}`}
              fill="none"
              stroke="#10b981" // Green progress circle
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * LINERADIUS}`} // Circumference
              strokeDashoffset={`${
                2 * Math.PI * LINERADIUS * (1 - progress / LINESPEED)
              }`}
              transform="rotate(-90 12 12)" // Start from top (12 o'clock)
              className=" absolute z-2 transition-all duration-100 ease-linear"
            />
          )}
        </svg>

        {/* check this to mark an entry as being completed */}
        <input
          type="radio"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 relative z-1 "
          onMouseDown={startHold}
          onMouseUp={resetHold}
          onMouseLeave={resetHold}
          onTouchStart={startHold}
          onTouchEnd={resetHold}
        />
      </div>

      <span className="ml-3 text-gray-900 dark:text-white break-words">
        {props.entryText}
      </span>
    </div>
  );
}

export default Entry;
