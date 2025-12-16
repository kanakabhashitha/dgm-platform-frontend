import { MdOutlineClose } from "react-icons/md";
import { LuCheck } from "react-icons/lu";
import { CustomButton } from "../components";
import { useDispatch } from "react-redux";
import { closeViewModel } from "../store/toggle";
import { useEffect, useState } from "react";

const CustomModel = ({ headerName = "Modal", fields = [], actions = [] }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => dispatch(closeViewModel()), 200);
  };

  return (
    <div
      className={`absolute inset-0 bg-black/30 flex justify-center items-start z-50 py-10 
        transition-opacity duration-200 h-[82dvh]
        ${show ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`bg-white rounded shadow-md w-1/2 border-b-8 border-cyan-md 
          transform transition-all duration-200
          ${show ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}
      >
        {/* Header */}
        <div className="bg-cyan-md rounded-t flex justify-between px-5 py-4">
          <div className="font-semibold text-white text-base capitalize tracking-wide">
            {headerName}
          </div>

          <div
            onClick={handleClose}
            className="text-lg text-gray-900 hover:bg-red-300 p-1 border border-cyan rounded-sm cursor-pointer hover:border-red-500"
          >
            <MdOutlineClose />
          </div>
        </div>

        {/* Fields */}
        <div className="px-5 py-7 flex flex-col gap-3">
          {fields.map((field, index) => (
            <field.component key={index} {...field.props} />
          ))}

          {/* Confirmation dialog */}
          {showConfirm && (
            <div className="bg-cyan-xsm border flex items-center justify-between border-cyan-md p-5 mt-3">
              <div className="text-sm font-semibold text-cyan">
                Do you want to save the changes?
              </div>
              <div className="flex gap-3">
                <div
                  onClick={() => setShowConfirm(false)}
                  className="text-base text-red-900 bg-red-300 hover:bg-red-500 p-1 border border-red-400 rounded-sm cursor-pointer"
                >
                  <MdOutlineClose />
                </div>

                <div
                  onClick={() => {
                    const updateAction = actions.find((a) =>
                      a.label.toLowerCase().includes("update")
                    );
                    if (updateAction && updateAction.onClick)
                      updateAction.onClick();
                    setShowConfirm(false);
                  }}
                  className="text-base text-green-900 bg-cyan-sm hover:bg-cyan p-1 border border-cyan-md rounded-sm cursor-pointer"
                >
                  <LuCheck />
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-2 justify-end mt-2">
            {actions.map((btn, index) => {
              if (btn.label.toLowerCase().includes("update")) {
                return (
                  <CustomButton
                    key={index}
                    variant={btn.variant}
                    onClick={() => setShowConfirm(true)}
                  >
                    {btn.label}
                  </CustomButton>
                );
              }
              return (
                <CustomButton
                  key={index}
                  variant={btn.variant}
                  onClick={btn.onClick}
                >
                  {btn.label}
                </CustomButton>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModel;
