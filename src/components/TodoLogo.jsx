const TodoLogo = ({ className = "w-12 h-12", color = "#1f2041" }) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="8"
      y="6"
      width="32"
      height="36"
      rx="3"
      fill="white"
      stroke={color}
      strokeWidth="2"
    />
    <rect x="16" y="2" width="16" height="8" rx="2" fill={color} />
    <rect x="12" y="16" width="4" height="4" rx="1" fill={color} />
    <path
      d="M13 17.5l1 1 2-2"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="20"
      y1="18"
      x2="36"
      y2="18"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <rect
      x="12"
      y="24"
      width="4"
      height="4"
      rx="1"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
    />
    <line
      x1="20"
      y1="26"
      x2="36"
      y2="26"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <rect
      x="12"
      y="32"
      width="4"
      height="4"
      rx="1"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
    />
    <line
      x1="20"
      y1="34"
      x2="32"
      y2="34"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default TodoLogo;
