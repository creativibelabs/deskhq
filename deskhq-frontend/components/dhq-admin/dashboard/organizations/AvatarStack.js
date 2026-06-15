const PALETTE = ["#3B7FF7", "#0CCC67", "#F59E0B", "#F11D1D", "#8B5CF6"];

export default function AvatarStack({ count = 0, max = 5 }) {
  const visible = Math.min(count, max);
  const overflow = count - visible;

  return (
    <div className="flex items-center -space-x-2.5">
      {Array.from({ length: visible }).map((_, i) => (
        <span
          key={i}
          className="w-[34px] h-[34px] rounded-full border-2 border-white flex items-center justify-center text-[12px] font-medium text-white"
          style={{ backgroundColor: PALETTE[i % PALETTE.length] }}
        >
          {String.fromCharCode(65 + i)}
        </span>
      ))}
      {overflow > 0 && (
        <span className="w-[34px] h-[34px] rounded-full border-2 border-white bg-[#171717] flex items-center justify-center text-[12px] font-normal text-[#F0F4FC]">
          +{overflow}
        </span>
      )}
    </div>
  );
}
