import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const CustomInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  isRequired = false,
  isDisable = false,
  error,
  inputWidth = "w-full",
  labelWidth = "w-32",
  isSelect = false,
  options = [],
}) => {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((o) => o.value === value) || {
    label: placeholder || "Select",
    value: "",
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center gap-5">
        <label
          className={`${labelWidth} capitalize text-sm tracking-wide text-gray-700 text-right`}
        >
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>

        <div className={`${inputWidth} relative`}>
          {/* error */}
          {error && <p className="text-xs text-red-500 py-1">{error}</p>}

          {/* -------------------- SELECT DROPDOWN -------------------- */}
          {isSelect ? (
            <div>
              <div
                onClick={() => !isDisable && setOpen(!open)}
                className={`flex items-center text-sm justify-between py-2 px-2.5 border rounded-md cursor-pointer bg-white
                  ${error ? "border-red-500" : "border-gray-300"}
                  ${isDisable ? "bg-gray-50 cursor-not-allowed" : ""}
                `}
              >
                <span
                  className={
                    selectedOption.value === ""
                      ? "text-gray-400"
                      : "text-gray-700"
                  }
                >
                  {selectedOption.label}
                </span>

                <IoMdArrowDropdown
                  className={`text-xl transition-transform duration-300 ${
                    open ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>

              {open && (
                <div className="absolute text-sm left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-md z-20 max-h-40 overflow-y-auto">
                  {options.map((opt, i) => {
                    const isSelected = opt.value === value;
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          onChange(opt.value);
                          setOpen(false);
                        }}
                        className={`px-3 py-2 cursor-pointer ${
                          isSelected
                            ? "bg-cyan-500 text-gray-900"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {opt.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* -------------------- NORMAL INPUT -------------------- */
            <input
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={isDisable}
              className={`w-full py-2 px-2.5 text-sm border rounded-md tracking-wide
                ${error ? "border-red-500" : "border-gray-300"}
                focus:outline-none focus:ring-0 
                ${error ? "focus:border-red-500" : "focus:border-gray-400"}
                text-gray-700
                ${isDisable ? "bg-gray-50" : ""}
              `}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomInput;
