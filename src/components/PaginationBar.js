import { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { IoMdArrowDropdown } from "react-icons/io";

const PaginationBar = ({
  pageNumber,
  pageSize,
  totalPages,
  totalElements,
  onPageChange,
  onPageSizeChange,
}) => {
  const [open, setOpen] = useState(false);
  const options = [5, 10, 15, 20];

  const toggleDropdown = () => setOpen(!open);

  const handleSelect = (value) => {
    onPageSizeChange(value);
    setOpen(false);
  };

  const handlePrev = () => {
    if (pageNumber > 0) onPageChange(pageNumber - 1);
  };

  const handleNext = () => {
    if (pageNumber < totalPages - 1) onPageChange(pageNumber + 1);
  };

  return (
    <div className="flex justify-between pt-5 text-sm text-center capitalize text-gray-700 relative">
      <div className="flex items-center gap-1 ">
        <div>Total Items:</div>
        <span>{totalElements}</span>
      </div>

      {/* Pagination buttons */}
      <div className="flex items-center gap-3">
        <span
          onClick={handlePrev}
          className="text-sm px-1 py-1 flex items-center cursor-pointer hover:bg-cyan-sm"
        >
          <GrFormPrevious />
        </span>

        {/* Page numbers */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <span
              key={i}
              onClick={() => onPageChange(i)}
              className={`text-xs px-2 py-0.5 border cursor-pointer border-cyan-xsm rounded-sm hover:bg-cyan-md 
              ${pageNumber === i ? "bg-cyan-sm" : ""}`}
            >
              {i + 1}
            </span>
          ))}
        </div>

        <span
          onClick={handleNext}
          className="text-sm px-1 py-1 flex items-center cursor-pointer hover:bg-cyan-sm"
        >
          <GrFormNext />
        </span>
      </div>

      {/* Dropdown */}
      <div className="flex gap-2 items-center relative">
        <div>Show per page</div>

        <div
          onClick={toggleDropdown}
          className="flex text-xs items-center gap-1 justify-between px-2 py-0.5 border border-gray-300 rounded-sm cursor-pointer bg-white"
        >
          <span>{pageSize}</span>

          <IoMdArrowDropdown
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {open && (
          <div className="absolute top-7 right-0 bg-white border border-gray-300 rounded shadow-md w-[50px] z-10">
            {options.map((opt) => (
              <div
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`px-2 py-1 text-xs cursor-pointer hover:bg-cyan-sm 
                ${pageSize === opt ? "bg-cyan-sm" : ""}`}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaginationBar;
