import Image from "next/image";

export default function Header() {
  return (
    <header className="pt-5 flex items-center justify-between">
      <div>
        <h1 className="dark-blue-color text-[24px] font-medium">
          Good Morning, Abdul
        </h1>
      </div>
      <div className="flex items-center gap-5">
        <div className="searchbar min-w-72.5 shadow-[0px_4px_6px_0px_#00000005] bg-white rounded-[55px] py-3.25 px-2.5 flex items-center gap-2.5">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.5418 2.52087C6.11205 2.52087 2.521 6.11192 2.521 10.5417C2.521 14.9715 6.11205 18.5625 10.5418 18.5625C14.9716 18.5625 18.5627 14.9715 18.5627 10.5417C18.5627 6.11192 14.9716 2.52087 10.5418 2.52087ZM1.146 10.5417C1.146 5.35253 5.35265 1.14587 10.5418 1.14587C15.731 1.14587 19.9377 5.35253 19.9377 10.5417C19.9377 15.7309 15.731 19.9375 10.5418 19.9375C5.35265 19.9375 1.146 15.7309 1.146 10.5417Z"
              fill="#3B7FF7"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.8474 17.8472C18.1158 17.5788 18.5511 17.5788 18.8196 17.8472L20.653 19.6806C20.9215 19.9491 20.9215 20.3844 20.653 20.6528C20.3845 20.9213 19.9492 20.9213 19.6807 20.6528L17.8474 18.8195C17.5789 18.551 17.5789 18.1157 17.8474 17.8472Z"
              fill="#3B7FF7"
            />
          </svg>
          <input
            type="text"
            placeholder="Search for anything..."
            className="search-input focus:outline-none placeholder:text-[#727272] text-[14px] font-normal w-full"
          />
        </div>
        <div className="messages shadow-[0px_4px_6px_0px_#00000005] bg-white rounded-[55px] p-3.25 flex items-center justify-center gap-2.5 cursor-pointer">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 17C22 17.5304 21.7893 18.0391 21.4142 18.4142C21.0391 18.7893 20.5304 19 20 19H6.828C6.29761 19.0001 5.78899 19.2109 5.414 19.586L3.212 21.788C3.1127 21.8873 2.9862 21.9549 2.84849 21.9823C2.71077 22.0097 2.56803 21.9956 2.43831 21.9419C2.30858 21.8881 2.1977 21.7971 2.11969 21.6804C2.04167 21.5637 2.00002 21.4264 2 21.286V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H20C20.5304 3 21.0391 3.21071 21.4142 3.58579C21.7893 3.96086 22 4.46957 22 5V17Z"
              stroke="#3B7FF7"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 11H12.01"
              stroke="#3B7FF7"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16 11H16.01"
              stroke="#3B7FF7"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 11H8.01"
              stroke="#3B7FF7"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className="notif shadow-[0px_4px_6px_0px_#00000005] bg-white rounded-[55px] p-3.25 flex items-center justify-center gap-2.5 cursor-pointer">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.2681 21C10.4436 21.304 10.6961 21.5565 11.0001 21.732C11.3041 21.9075 11.649 21.9999 12.0001 21.9999C12.3511 21.9999 12.696 21.9075 13 21.732C13.3041 21.5565 13.5565 21.304 13.7321 21"
              stroke="#3B7FF7"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.26176 15.326C3.13112 15.4692 3.04491 15.6472 3.01361 15.8385C2.98231 16.0298 3.00728 16.226 3.08546 16.4034C3.16365 16.5807 3.29169 16.7316 3.45401 16.8375C3.61633 16.9434 3.80594 16.9999 3.99976 17H19.9998C20.1936 17.0001 20.3832 16.9438 20.5456 16.8381C20.708 16.7324 20.8363 16.5817 20.9146 16.4045C20.993 16.2273 21.0182 16.0311 20.9872 15.8398C20.9561 15.6485 20.8702 15.4703 20.7398 15.327C19.4098 13.956 17.9998 12.499 17.9998 8C17.9998 6.4087 17.3676 4.88258 16.2424 3.75736C15.1172 2.63214 13.5911 2 11.9998 2C10.4085 2 8.88234 2.63214 7.75712 3.75736C6.6319 4.88258 5.99976 6.4087 5.99976 8C5.99976 12.499 4.58876 13.956 3.26176 15.326Z"
              stroke="#3B7FF7"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className="profile shadow-[0px_4px_6px_0px_#00000005] bg-white rounded-[55px] py-1.25 pl-1.25 pr-5 flex items-center justify-center gap-2.5 cursor-pointer">
          <div className="avatar w-9.5 h-9.5 rounded-full bg-[#3B7FF7] flex items-center justify-center">
            <Image
              src="/assets/common/avatar-placeholder.webp"
              alt="avatar"
              width={30}
              height={30}
            />
          </div>
          <div className="info flex flex-col">
            <span className="font-normal text-[14px] text-[#2C2C2C]">Abdul Wasay</span>
            <span className="font-normal text-[12px] primary-blue-color">Prod Admin</span>
          </div>
          <div className="icon">
            <svg
              width="9"
              height="6"
              viewBox="0 0 9 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.144967 0.149109C-0.0483224 0.347922 -0.0483224 0.67026 0.144967 0.869072L4.10456 4.9418C4.19738 5.03727 4.32328 5.09091 4.45455 5.09091C4.58581 5.09091 4.71171 5.03727 4.80453 4.9418L8.76412 0.869072C8.95741 0.67026 8.95741 0.347921 8.76412 0.149109C8.57083 -0.0497035 8.25745 -0.0497034 8.06416 0.149109L4.45455 3.86185L0.844932 0.149109C0.651642 -0.0497031 0.338257 -0.0497031 0.144967 0.149109Z"
                fill="#2C2C2C"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
