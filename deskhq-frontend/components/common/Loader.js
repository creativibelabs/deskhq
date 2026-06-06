export default function Loader() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-10 h-10 block bg-transparent"
      preserveAspectRatio="xMidYMid"
    >
      <g>
        {/* Left circle */}
        <circle r="20" fill="#153875" cy="50" cx="30">
          <animate
            begin="-0.5s"
            values="30;70;30"
            keyTimes="0;0.5;1"
            dur="1s"
            repeatCount="indefinite"
            attributeName="cx"
          />
        </circle>

        {/* Right circle */}
        <circle r="20" fill="#ffffff" cy="50" cx="70">
          <animate
            begin="0s"
            values="30;70;30"
            keyTimes="0;0.5;1"
            dur="1s"
            repeatCount="indefinite"
            attributeName="cx"
          />
        </circle>

        {/* Overlay circle with opacity animation */}
        <circle r="20" fill="#153875" cy="50" cx="30">
          <animate
            begin="-0.5s"
            values="30;70;30"
            keyTimes="0;0.5;1"
            dur="1s"
            repeatCount="indefinite"
            attributeName="cx"
          />
          <animate
            repeatCount="indefinite"
            dur="1s"
            keyTimes="0;0.499;0.5;1"
            calcMode="discrete"
            values="0;0;1;1"
            attributeName="fill-opacity"
          />
        </circle>
      </g>
    </svg>
  );
}
