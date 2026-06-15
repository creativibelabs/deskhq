"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const prodAdminLink = [
  {
    name: "Dashboard",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.8889 0.888864C12.5216 0.256126 13.4149 0 14.4375 0H16.2708C17.2935 0 18.1867 0.256126 18.8195 0.888864C19.4522 1.5216 19.7083 2.41486 19.7083 3.4375V5.27083C19.7083 6.29347 19.4522 7.18673 18.8195 7.81947C18.1867 8.45221 17.2935 8.70833 16.2708 8.70833H14.4375C13.4149 8.70833 12.5216 8.45221 11.8889 7.81947C11.2561 7.18673 11 6.29347 11 5.27083V3.4375C11 2.41486 11.2561 1.5216 11.8889 0.888864ZM12.8611 1.86114C12.5772 2.14506 12.375 2.62681 12.375 3.4375V5.27083C12.375 6.08153 12.5772 6.56327 12.8611 6.8472C13.1451 7.13113 13.6268 7.33333 14.4375 7.33333H16.2708C17.0815 7.33333 17.5633 7.13113 17.8472 6.8472C18.1311 6.56327 18.3333 6.08153 18.3333 5.27083V3.4375C18.3333 2.62681 18.1311 2.14506 17.8472 1.86114C17.5633 1.57721 17.0815 1.375 16.2708 1.375H14.4375C13.6268 1.375 13.1451 1.57721 12.8611 1.86114Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.888864 11.8889C1.5216 11.2561 2.41486 11 3.4375 11H5.27083C6.29347 11 7.18673 11.2561 7.81947 11.8889C8.45221 12.5216 8.70833 13.4149 8.70833 14.4375V16.2708C8.70833 17.2935 8.45221 18.1867 7.81947 18.8195C7.18673 19.4522 6.29347 19.7083 5.27083 19.7083H3.4375C2.41486 19.7083 1.5216 19.4522 0.888864 18.8195C0.256126 18.1867 0 17.2935 0 16.2708V14.4375C0 13.4149 0.256126 12.5216 0.888864 11.8889ZM1.86114 12.8611C1.57721 13.1451 1.375 13.6268 1.375 14.4375V16.2708C1.375 17.0815 1.57721 17.5633 1.86114 17.8472C2.14506 18.1311 2.62681 18.3333 3.4375 18.3333H5.27083C6.08153 18.3333 6.56327 18.1311 6.8472 17.8472C7.13113 17.5633 7.33333 17.0815 7.33333 16.2708V14.4375C7.33333 13.6268 7.13113 13.1451 6.8472 12.8611C6.56327 12.5772 6.08153 12.375 5.27083 12.375H3.4375C2.62681 12.375 2.14506 12.5772 1.86114 12.8611Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.35417 1.375C2.70882 1.375 1.375 2.70882 1.375 4.35417C1.375 5.99952 2.70882 7.33333 4.35417 7.33333C5.99952 7.33333 7.33333 5.99952 7.33333 4.35417C7.33333 2.70882 5.99952 1.375 4.35417 1.375ZM0 4.35417C0 1.94943 1.94943 0 4.35417 0C6.75891 0 8.70833 1.94943 8.70833 4.35417C8.70833 6.75891 6.75891 8.70833 4.35417 8.70833C1.94943 8.70833 0 6.75891 0 4.35417Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.3542 12.375C13.7088 12.375 12.375 13.7088 12.375 15.3542C12.375 16.9995 13.7088 18.3333 15.3542 18.3333C16.9995 18.3333 18.3333 16.9995 18.3333 15.3542C18.3333 13.7088 16.9995 12.375 15.3542 12.375ZM11 15.3542C11 12.9494 12.9494 11 15.3542 11C17.7589 11 19.7083 12.9494 19.7083 15.3542C19.7083 17.7589 17.7589 19.7083 15.3542 19.7083C12.9494 19.7083 11 17.7589 11 15.3542Z"
          fill="currentColor"
        />
      </svg>
    ),
    link: "/dhq-admin",
  },
  {
    name: "Organizations",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.1665 11H12.8332"
          stroke="currentColor"
          strokeWidth="1.83333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.1665 7.33325H12.8332"
          stroke="currentColor"
          strokeWidth="1.83333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.8332 19.2501V16.5001C12.8332 16.0139 12.64 15.5475 12.2962 15.2037C11.9524 14.8599 11.4861 14.6667 10.9998 14.6667C10.5136 14.6667 10.0473 14.8599 9.70348 15.2037C9.35966 15.5475 9.1665 16.0139 9.1665 16.5001V19.2501"
          stroke="currentColor"
          strokeWidth="1.83333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.50016 9.16675H3.66683C3.1806 9.16675 2.71428 9.3599 2.37047 9.70372C2.02665 10.0475 1.8335 10.5139 1.8335 11.0001V17.4167C1.8335 17.903 2.02665 18.3693 2.37047 18.7131C2.71428 19.0569 3.1806 19.2501 3.66683 19.2501H18.3335C18.8197 19.2501 19.286 19.0569 19.6299 18.7131C19.9737 18.3693 20.1668 17.903 20.1668 17.4167V8.25008C20.1668 7.76385 19.9737 7.29754 19.6299 6.95372C19.286 6.6099 18.8197 6.41675 18.3335 6.41675H16.5002"
          stroke="currentColor"
          strokeWidth="1.83333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 19.25V4.58333C5.5 4.0971 5.69315 3.63079 6.03697 3.28697C6.38079 2.94315 6.8471 2.75 7.33333 2.75H14.6667C15.1529 2.75 15.6192 2.94315 15.963 3.28697C16.3068 3.63079 16.5 4.0971 16.5 4.58333V19.25"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    link: "/dhq-admin/organizations",
    subItem: [
      { name: "All Organizations", link: "/dhq-admin/organizations" },
      {
        name: "Active Organizations",
        link: "/dhq-admin/organizations?status=active",
      },
      {
        name: "Trial Organizations",
        link: "/dhq-admin/organizations?status=trial",
      },
    ],
  },
  {
    name: "Users",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    link: "/dhq-admin/users",
    subItem: [
      { name: "All Users", link: "/dhq-admin/users" },
      {
        name: "Active Users",
        link: "/dhq-admin/users?status=active",
      },
      {
        name: "Trial Users",
        link: "/dhq-admin/users?status=trial",
      },
    ],
  },
  {
    name: "Managers",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.6668 19.25V17.4167C14.6668 16.4442 14.2805 15.5116 13.5929 14.8239C12.9053 14.1363 11.9726 13.75 11.0002 13.75H5.50016C4.5277 13.75 3.59507 14.1363 2.90744 14.8239C2.2198 15.5116 1.8335 16.4442 1.8335 17.4167V19.25"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.6665 2.86743C15.4528 3.07127 16.1491 3.53042 16.6462 4.17282C17.1433 4.81522 17.413 5.6045 17.413 6.41677C17.413 7.22903 17.1433 8.01831 16.6462 8.66071C16.1491 9.30311 15.4528 9.76226 14.6665 9.9661"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.1665 19.25V17.4166C20.1659 16.6042 19.8955 15.815 19.3978 15.1729C18.9 14.5308 18.2031 14.0722 17.4165 13.8691"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.25016 10.0833C10.2752 10.0833 11.9168 8.44171 11.9168 6.41667C11.9168 4.39162 10.2752 2.75 8.25016 2.75C6.22512 2.75 4.5835 4.39162 4.5835 6.41667C4.5835 8.44171 6.22512 10.0833 8.25016 10.0833Z"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    link: "/dhq-admin/managers",
  },
  {
    name: "Clients",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.7135 11.5647C14.7741 11.3789 14.8924 11.2173 15.0513 11.1036C15.2102 10.9898 15.4012 10.9297 15.5966 10.9322C15.792 10.9347 15.9815 10.9995 16.1374 11.1172C16.2933 11.235 16.4076 11.3994 16.4635 11.5867L17.139 12.9177C17.2048 13.0471 17.3003 13.159 17.4178 13.2443C17.5352 13.3295 17.6712 13.3857 17.8146 13.4081L19.3125 13.6428C19.5053 13.6435 19.6931 13.7051 19.8489 13.8187C20.0048 13.9323 20.1208 14.0922 20.1805 14.2756C20.2402 14.459 20.2406 14.6566 20.1815 14.8402C20.1224 15.0238 20.0069 15.1841 19.8515 15.2983L18.7771 16.3689C18.6743 16.4713 18.5972 16.5967 18.5523 16.7347C18.5073 16.8727 18.4958 17.0194 18.5186 17.1628L18.756 18.6413C18.8214 18.8267 18.8254 19.0281 18.7676 19.2159C18.7097 19.4037 18.5931 19.5679 18.4348 19.6844C18.2765 19.8008 18.0851 19.8633 17.8886 19.8627C17.6921 19.8621 17.501 19.7983 17.3435 19.6808L16.0005 18.9933C15.8712 18.9271 15.7279 18.8925 15.5825 18.8925C15.4372 18.8925 15.2939 18.9271 15.1645 18.9933L13.8216 19.6808C13.6641 19.7973 13.4734 19.8603 13.2775 19.8605C13.0816 19.8608 12.8908 19.7982 12.733 19.6821C12.5753 19.5659 12.4589 19.4023 12.4009 19.2152C12.3429 19.028 12.3464 18.8273 12.4109 18.6423L12.6474 17.1637C12.6702 17.0203 12.6587 16.8736 12.6137 16.7356C12.5688 16.5976 12.4917 16.4722 12.3889 16.3698L11.3292 15.3129C11.1685 15.2016 11.0476 15.0417 10.9841 14.8568C10.9207 14.6718 10.9181 14.4714 10.9767 14.2849C11.0352 14.0983 11.1519 13.9354 11.3097 13.8198C11.4674 13.7043 11.658 13.6423 11.8535 13.6428L13.3505 13.4081C13.4939 13.3857 13.6299 13.3295 13.7473 13.2443C13.8648 13.159 13.9603 13.0471 14.026 12.9177L14.7135 11.5647Z"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.33333 13.75H6.41667C5.44421 13.75 4.51158 14.1363 3.82394 14.8239C3.13631 15.5116 2.75 16.4442 2.75 17.4167V19.25"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.16667 10.0833C11.1917 10.0833 12.8333 8.44171 12.8333 6.41667C12.8333 4.39162 11.1917 2.75 9.16667 2.75C7.14162 2.75 5.5 4.39162 5.5 6.41667C5.5 8.44171 7.14162 10.0833 9.16667 10.0833Z"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    link: "/dhq-admin/clients",
  },
  {
    name: "Subscription Plans",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5983 2.99387C10.6379 2.922 10.696 2.86208 10.7666 2.82034C10.8373 2.77861 10.9178 2.75659 10.9998 2.75659C11.0819 2.75659 11.1624 2.77861 11.233 2.82034C11.3036 2.86208 11.3618 2.922 11.4013 2.99387L14.1073 8.13087C14.1719 8.24982 14.2619 8.353 14.3711 8.43302C14.4802 8.51303 14.6057 8.56789 14.7385 8.59365C14.8714 8.61942 15.0083 8.61545 15.1394 8.58203C15.2706 8.54861 15.3927 8.48657 15.497 8.40037L19.4176 5.0417C19.4928 4.98049 19.5856 4.94473 19.6824 4.93958C19.7793 4.93443 19.8753 4.96016 19.9567 5.01305C20.038 5.06594 20.1004 5.14327 20.135 5.23392C20.1696 5.32456 20.1745 5.42383 20.1491 5.51745L17.5512 14.9096C17.4982 15.1018 17.384 15.2715 17.2258 15.3929C17.0677 15.5143 16.8743 15.5809 16.6749 15.5825H5.32565C5.12613 15.5811 4.9325 15.5146 4.77418 15.3932C4.61585 15.2717 4.50147 15.102 4.4484 14.9096L1.85149 5.51837C1.82605 5.42475 1.83097 5.32547 1.86555 5.23483C1.90012 5.14419 1.96257 5.06686 2.04389 5.01397C2.12522 4.96107 2.22123 4.93535 2.31811 4.9405C2.41498 4.94565 2.50772 4.9814 2.58299 5.04262L6.50265 8.40128C6.60697 8.48749 6.72908 8.54953 6.86021 8.58295C6.99134 8.61636 7.12825 8.62033 7.2611 8.59457C7.39395 8.56881 7.51945 8.51395 7.62859 8.43393C7.73772 8.35392 7.82779 8.25073 7.89232 8.13178L10.5983 2.99387Z"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.5835 19.25H17.4168"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    link: "/dhq-admin/subscription-plans",
  },
  {
    name: "Payments",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.1665 16.4999V10.0833"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.1924 2.02119C10.4438 1.89786 10.72 1.83374 11 1.83374C11.28 1.83374 11.5562 1.89786 11.8076 2.02119L18.9943 5.54669C19.0873 5.5923 19.1622 5.6681 19.2066 5.76173C19.2511 5.85536 19.2625 5.96129 19.239 6.06223C19.2155 6.16317 19.1584 6.25317 19.0772 6.31753C18.996 6.38189 18.8953 6.41682 18.7917 6.41661H3.20834C3.10477 6.41661 3.00426 6.38154 2.92318 6.3171C2.8421 6.25267 2.78523 6.16267 2.76184 6.06178C2.73845 5.96089 2.74992 5.85506 2.79438 5.76152C2.83884 5.66798 2.91367 5.59226 3.00667 5.54669L10.1924 2.02119Z"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.8335 16.4999V10.0833"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.5 16.4999V10.0833"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2.75 20.1667H19.25"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.5 16.4999V10.0833"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    link: "/dhq-admin/payments",
  },
  {
    name: "Modules",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.0833 19.9192C10.362 20.0801 10.6782 20.1648 11 20.1648C11.3218 20.1648 11.638 20.0801 11.9167 19.9192L18.3333 16.2525C18.6118 16.0917 18.843 15.8606 19.0039 15.5823C19.1648 15.3039 19.2497 14.9882 19.25 14.6667V7.33333C19.2497 7.01183 19.1648 6.69607 19.0039 6.41772C18.843 6.13938 18.6118 5.90824 18.3333 5.74749L11.9167 2.08083C11.638 1.91992 11.3218 1.83521 11 1.83521C10.6782 1.83521 10.362 1.91992 10.0833 2.08083L3.66667 5.74749C3.38824 5.90824 3.15698 6.13938 2.99609 6.41772C2.8352 6.69607 2.75033 7.01183 2.75 7.33333V14.6667C2.75033 14.9882 2.8352 15.3039 2.99609 15.5823C3.15698 15.8606 3.38824 16.0917 3.66667 16.2525L10.0833 19.9192Z"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11 20.1667V11"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3.01562 6.41675L10.9998 11.0001L18.984 6.41675"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.875 3.91406L15.125 8.6349"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    link: "/dhq-admin/modules",
  },
  {
    name: "Storage",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 7.33325C15.5563 7.33325 19.25 6.10204 19.25 4.58325C19.25 3.06447 15.5563 1.83325 11 1.83325C6.44365 1.83325 2.75 3.06447 2.75 4.58325C2.75 6.10204 6.44365 7.33325 11 7.33325Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2.75 4.58325V17.4166C2.75 18.1459 3.61919 18.8454 5.16637 19.3611C6.71354 19.8769 8.81196 20.1666 11 20.1666C13.188 20.1666 15.2865 19.8769 16.8336 19.3611C18.3808 18.8454 19.25 18.1459 19.25 17.4166V4.58325"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2.75 11C2.75 11.7293 3.61919 12.4288 5.16637 12.9445C6.71354 13.4603 8.81196 13.75 11 13.75C13.188 13.75 15.2865 13.4603 16.8336 12.9445C18.3808 12.4288 19.25 11.7293 19.25 11"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    link: "/dhq-admin/storage",
  },
  {
    name: "Blogs",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_72_1566)">
          <path
            d="M12.2832 1.83325H5.49984C5.01361 1.83325 4.54729 2.02641 4.20347 2.37022C3.85966 2.71404 3.6665 3.18036 3.6665 3.66659V18.3333C3.6665 18.8195 3.85966 19.2858 4.20347 19.6296C4.54729 19.9734 5.01361 20.1666 5.49984 20.1666H16.4998C16.9861 20.1666 17.4524 19.9734 17.7962 19.6296C18.14 19.2858 18.3332 18.8195 18.3332 18.3333V11.5499"
            stroke="currentColor"
            stroke-width="1.83333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1.8335 5.5H5.50016"
            stroke="currentColor"
            stroke-width="1.83333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1.8335 9.16675H5.50016"
            stroke="currentColor"
            stroke-width="1.83333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1.8335 12.8333H5.50016"
            stroke="currentColor"
            stroke-width="1.83333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1.8335 16.5H5.50016"
            stroke="currentColor"
            stroke-width="1.83333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19.5966 5.15722C19.9617 4.79206 20.1669 4.2968 20.1669 3.78039C20.1669 3.26398 19.9617 2.76871 19.5966 2.40355C19.2314 2.0384 18.7361 1.83325 18.2197 1.83325C17.7033 1.83325 17.2081 2.0384 16.8429 2.40355L12.2504 6.99789C12.0325 7.21571 11.8729 7.48494 11.7866 7.78072L11.0193 10.4116C10.9963 10.4904 10.9949 10.574 11.0153 10.6536C11.0357 10.7332 11.0771 10.8059 11.1352 10.864C11.1933 10.9221 11.266 10.9635 11.3456 10.9839C11.4252 11.0043 11.5088 11.0029 11.5876 10.9799L14.2185 10.2126C14.5143 10.1263 14.7835 9.96674 15.0013 9.7488L19.5966 5.15722Z"
            stroke="currentColor"
            stroke-width="1.83333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_72_1566">
            <rect width="22" height="22" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    link: "/dhq-admin/blogs",
  },
  {
    name: "Settings",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.8335 15.5833H4.5835"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17.4165 6.41675H9.1665"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.5835 18.3333C17.1023 18.3333 18.3335 17.102 18.3335 15.5833C18.3335 14.0645 17.1023 12.8333 15.5835 12.8333C14.0647 12.8333 12.8335 14.0645 12.8335 15.5833C12.8335 17.102 14.0647 18.3333 15.5835 18.3333Z"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.4165 9.16675C7.93529 9.16675 9.1665 7.93553 9.1665 6.41675C9.1665 4.89796 7.93529 3.66675 6.4165 3.66675C4.89772 3.66675 3.6665 4.89796 3.6665 6.41675C3.6665 7.93553 4.89772 9.16675 6.4165 9.16675Z"
          stroke="currentColor"
          stroke-width="1.83333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    link: "/dhq-admin/settings",
  },
];

function ChevronIcon({ open }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M2 4L6 8L10 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SideBarLinks({
  role = "prod-admin",
  collapsed = false,
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.toString()
    ? `?${searchParams.toString()}`
    : "";

  const links = role === "prod-admin" ? prodAdminLink : prodAdminLink;

  const getInitialOpen = () => {
    const idx = links.findIndex((link) =>
      link.subItem?.some((sub) => pathname.startsWith(sub.link.split("?")[0])),
    );
    return idx !== -1 ? idx : null;
  };

  const [openDropdown, setOpenDropdown] = useState(getInitialOpen);

  const toggleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  const activeClass =
    "dark-blue-color py-1.5 bg-[linear-gradient(90deg,rgba(211,224,247,0)_0%,rgba(255,255,255,0.4)_52.74%)] font-bold";
  const inactiveClass = "grey-color hover:text-[#153875]! font-normal";

  return (
    <ul className="flex flex-col gap-3 sidebarLinks">
      {links.map((link, index) => {
        const isActive =
          pathname === link.link ||
          link.subItem?.some((sub) =>
            pathname.startsWith(sub.link.split("?")[0]),
          );
        const isOpen = openDropdown === index;

        return (
          <li key={link.link}>
            {link.subItem ? (
              <>
                {collapsed ? (
                  <Link
                    href={link.link}
                    title={link.name}
                    className={`flex items-center justify-center px-2 text-[14px] transition-all duration-200 min-h-8.5 w-full rounded-3xl
                      ${isActive ? activeClass : inactiveClass}`}
                  >
                    {link.icon}
                  </Link>
                ) : (
                  <button
                    onClick={() => toggleDropdown(index)}
                    className={`flex items-center justify-between pr-3 gap-3 text-[14px] cursor-pointer transition-all duration-200 min-h-8.5 w-full rounded-3xl
                      ${isActive ? activeClass : inactiveClass}`}
                  >
                    <span className="flex items-center gap-3">
                      {link.icon}
                      <span className="whitespace-nowrap label-fade-in">{link.name}</span>
                    </span>
                    <span className="label-fade-in"><ChevronIcon open={isOpen} /></span>
                  </button>
                )}

                {!collapsed && isOpen && (
                  <ul className="ml-2.5 mt-1 flex flex-col">
                    {(() => {
                      const activeSubIndex = link.subItem.findIndex(
                        (sub) =>
                          pathname + currentSearch === sub.link ||
                          (sub.link.split("?")[0] === pathname &&
                            !sub.link.includes("?") &&
                            !currentSearch),
                      );
                      return link.subItem.map((sub, subIndex) => {
                        const subActive = subIndex === activeSubIndex;
                        const isBeforeActive =
                          activeSubIndex !== -1 && subIndex < activeSubIndex;
                        return (
                          <li key={sub.link} className="relative pl-4">
                            {isBeforeActive && (
                              <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#153875]" />
                            )}
                            {subActive && (
                              <span className="absolute left-0 top-0 w-4 h-[50%] border-l-2 border-b-2 border-[#153875] rounded-bl-lg" />
                            )}
                            <Link
                              href={sub.link}
                              className={`block px-2 py-1.5 rounded-lg text-[14px] transition-all duration-200
                                ${subActive ? "dark-blue-color font-medium" : "text-[#727272] hover:text-[#153875]!"}`}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        );
                      });
                    })()}
                  </ul>
                )}
              </>
            ) : (
              <Link
                href={link.link}
                title={collapsed ? link.name : undefined}
                className={`flex items-center text-[14px] rounded-3xl transition-all duration-200 min-h-8.5
                  ${collapsed ? "justify-center px-2" : "gap-3"}
                  ${isActive ? activeClass : inactiveClass}`}
              >
                {link.icon}
                {!collapsed && <span className="whitespace-nowrap label-fade-in">{link.name}</span>}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
