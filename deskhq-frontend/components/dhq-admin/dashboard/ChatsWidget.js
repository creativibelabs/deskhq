import { ChevronRight } from "lucide-react";

const AVATARS = [
  { id: 1, color: "#3B7FF7", initials: "AW", online: true },
  { id: 2, color: "#3B7FF7", initials: "MK", online: true },
  { id: 3, color: "#D9E6F8", initials: "" },
  { id: 4, color: "#D9E6F8", initials: "" },
  { id: 5, color: "#D9E6F8", initials: "" },
  { id: 6, color: "#D9E6F8", initials: "" },
  { id: 7, color: "#D9E6F8", initials: "" },
  { id: 8, color: "#D9E6F8", initials: "" },
  { id: 9, color: "#D9E6F8", initials: "" },
  { id: 10, color: "#D9E6F8", initials: "" },
];

export default function ChatsWidget() {
  return (
    <div className="bg-white rounded-[32px] p-5 sm:p-6 w-full xl:w-[368px] flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-[16px] font-medium text-[#2C2C2C]">Chats</h2>
        <span className="text-[14px] font-normal primary-blue-color">2 unread messages</span>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {AVATARS.map((avatar) => (
          <span
            key={avatar.id}
            className="relative w-full aspect-square rounded-2xl flex items-center justify-center text-white text-[12px] font-medium"
            style={{ backgroundColor: avatar.color }}
          >
            {avatar.initials}
            {avatar.online && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F11D1D] ring-2 ring-white" />
            )}
          </span>
        ))}
      </div>

      <button type="button" className="flex items-center gap-1 text-[14px] font-normal primary-blue-color cursor-pointer self-start">
        All messages
        <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
      </button>
    </div>
  );
}
