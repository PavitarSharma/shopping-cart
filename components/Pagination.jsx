"use client";
import { useCallback } from "react";
import Dropdown from "./Dropdown";
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
} from "react-icons/lu";

const Pagination = ({
  page,
  setPage,
  limit,
  setLimit,
  limits,
  totalPages,
  isFirst,
  isLast,
}) => {
  const handlePrevPage = useCallback(() => {
    setPage((prevPage) => (prevPage === 1 ? prevPage : prevPage - 1));
  }, [setPage]);

  const handleNextPage = useCallback(() => {
    setPage((prevPage) => (prevPage === totalPages ? prevPage : prevPage + 1));
  }, [setPage, totalPages]);

  const handleSetPage = useCallback(
    (page) => {
      setPage(page);
    },
    [setPage]
  );

  const handleSetLimit = useCallback(
    (limit) => {
      setPage(1);
      setLimit(limit);
    },
    [setPage, setLimit]
  );

  const handleFirstPage = useCallback(() => {
    setPage(1);
  }, [setPage]);

  const handleLastPage = useCallback(() => {
    setPage(totalPages);
  }, [setPage, totalPages]);

  const buttonClass =
    "w-10 h-10 rounded bg-white border border-gray-300 hover:bg-gray-200 transition flex items-center justify-center text-lg";

  // Determine the range of page numbers to display
  const numButtons = 5;
  const halfButtons = Math.floor(numButtons / 2);
  let startPage = Math.max(1, page - halfButtons);
  let endPage = Math.min(totalPages, page + halfButtons);

  // Adjust the range if there are not enough pages at the start or end
  if (page - halfButtons < 1) {
    endPage = Math.min(totalPages, endPage + (halfButtons - (page - 1)));
  } else if (page + halfButtons > totalPages) {
    startPage = Math.max(1, startPage - (page + halfButtons - totalPages));
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <p>
          Page {page} of {totalPages || 1}
        </p>
        <Dropdown
          placeholder="Select"
          value={limit}
          setValue={handleSetLimit}
          options={limits}
        />
      </div>

      <div className="md:flex hidden items-center gap-1">
        {isFirst && (
          <button onClick={handleFirstPage} className={buttonClass}>
            <LuChevronsLeft />
          </button>
        )}
        <button onClick={handlePrevPage} className={buttonClass}>
          <LuChevronLeft />
        </button>

        {startPage > 1 && (
          <>
            <button onClick={() => handleSetPage(1)} className={buttonClass}>
              1
            </button>
            {startPage > 2 && (
              <span className="text-gray-400">...</span>
            )}
          </>
        )}

        {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handleSetPage(pageNumber)}
            className={`${buttonClass} ${page === pageNumber ? "!bg-primary text-white" : ""}`}
          >
            {pageNumber}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="text-gray-400">...</span>
            )}
            <button onClick={() => handleSetPage(totalPages)} className={buttonClass}>
              {totalPages}
            </button>
          </>
        )}

        <button onClick={handleNextPage} className={buttonClass}>
          <LuChevronRight />
        </button>
        {isLast && (
          <button onClick={handleLastPage} className={buttonClass}>
            <LuChevronsRight />
          </button>
        )}
      </div>

      <div className="md:hidden flex items-center gap-2">
        <button onClick={handlePrevPage} className="border border-gray-300 p-2 rounded px-4 hover:bg-gray-200 transition">
          Prev
        </button>
        <button onClick={handleNextPage} className="border border-gray-300 p-2 rounded px-4 hover:bg-gray-200 transition">
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
