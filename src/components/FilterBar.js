import { useState, useRef } from "react";
import { IoCaretDownCircleOutline } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";

// -------------------- CUSTOM SELECT --------------------
const CustomSelect = ({ field }) => {
  const [open, setOpen] = useState(false);
  const options = field.options || [];
  const selectedOption =
    options.find((o) => o.value === field.value) || options[0];

  return (
    <div className="relative w-40">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between py-1 px-2 border border-gray-300 rounded-sm cursor-pointer bg-white"
      >
        <span
          className={
            selectedOption?.value === "" ? "text-gray-400" : "text-gray-700"
          }
        >
          {selectedOption?.label}
        </span>

        <IoMdArrowDropdown
          className={`text-xl transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {open && options.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-sm shadow-md z-20 max-h-40 overflow-y-auto">
          {options.map((opt, i) => {
            const isSelected = opt.value === field.value;
            return (
              <div
                key={i}
                onClick={() => {
                  field.onChange(opt.value);
                  setOpen(false);
                }}
                className={`px-2 py-1 cursor-pointer ${
                  isSelected ? "bg-cyan-md text-white" : "hover:bg-gray-100"
                }`}
              >
                {opt.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// -------------------- FILTER BAR --------------------
const FilterBar = ({ fields = [], onFilter, buttonLabel = "Filter" }) => {
  const [showMore, setShowMore] = useState(false);
  const contentRef = useRef(null);

  const firstRowFields = fields.slice(0, 4);
  const extraFields = fields.slice(4);
  const hasMore = fields.length > 4;

  return (
    <div className="p-4 bg-white shadow-md w-full">
      <div className="flex items-center gap-5 text-sm tracking-wider text-gray-700 flex-wrap w-full">
        {firstRowFields.map((field, index) => (
          <div key={index} className="flex items-center space-x-3">
            <label>{field.label}</label>

            {field.type === "select" ? (
              <CustomSelect field={field} />
            ) : (
              <input
                type={field.type || "text"}
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                className="py-1 px-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-0 focus:border-gray-500"
              />
            )}
          </div>
        ))}

        <button
          onClick={onFilter}
          className="px-3 py-1 text-sm tracking-wider text-white border rounded-sm border-cyan bg-cyan-md hover:bg-cyan"
        >
          {buttonLabel}
        </button>

        {hasMore && (
          <div
            className="ml-auto text-2xl cursor-pointer"
            onClick={() => setShowMore(!showMore)}
          >
            <div
              className={`transition-transform duration-300 ${
                showMore ? "rotate-180" : "rotate-0"
              }`}
            >
              <IoCaretDownCircleOutline />
            </div>
          </div>
        )}
      </div>

      <div
        ref={contentRef}
        className="transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: showMore ? contentRef.current?.scrollHeight : 0,
        }}
      >
        <div className="mt-4 flex items-center gap-5 text-sm tracking-wider text-gray-700 flex-wrap">
          {extraFields.map((field, index) => (
            <div key={index} className="flex items-center space-x-3">
              <label>{field.label}</label>

              {field.type === "select" ? (
                <CustomSelect field={field} />
              ) : (
                <input
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="py-1 px-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-0 focus:border-gray-500"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
