"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TablePagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  for (let page = 1; page <= Math.min(3, totalPages); page++) pages.push(page);

  const showEllipsis = totalPages > 4;
  const lastPage = totalPages;

  return (
    <div className="mb-6 mx-auto flex items-center justify-between sm:justify-center gap-6 sm:gap-10 bg-white rounded-full py-3 px-6">
      <button
        type="button"
        onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-1 text-[12px] font-normal grey-color cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:dark-blue-color transition-colors duration-150"
      >
        <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2} />
        Previous
      </button>

      <div className="flex items-center gap-3.5 text-[12px] font-normal">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange?.(page)}
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-150 cursor-pointer ${
              page === currentPage ? "bg-[#3B7FF7] text-white" : "primary-blue-color hover:bg-[#3B7FF7]/10"
            }`}
          >
            {String(page).padStart(2, "0")}
          </button>
        ))}

        {showEllipsis && (
          <>
            <span className="primary-blue-color">.....</span>
            <button
              type="button"
              onClick={() => onPageChange?.(lastPage)}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-150 cursor-pointer ${
                lastPage === currentPage ? "bg-[#3B7FF7] text-white" : "primary-blue-color hover:bg-[#3B7FF7]/10"
              }`}
            >
              {String(lastPage).padStart(2, "0")}
            </button>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 text-[12px] font-normal grey-color cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:dark-blue-color transition-colors duration-150"
      >
        Next
        <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
      </button>
    </div>
  );
}
