import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeConfirmationModel } from "../store/toggle";
import { deleteGroup, resetDeleteStatus } from "../store/group";

import { CustomButton } from "../components";
import { RiDeleteBin6Line } from "react-icons/ri";

const ConfirmationModel = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const { selectedItem } = useSelector((state) => state.modelToggler);
  const { status: deleteStatus, error: deleteError } = useSelector(
    (state) => state.group.remove
  );

  useEffect(() => {
    setShow(true);
  }, []);

  // Close modal on successful delete
  useEffect(() => {
    if (deleteStatus === "success") {
      handleClose();
      dispatch(resetDeleteStatus());
    }
  }, [deleteStatus]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => dispatch(closeConfirmationModel()), 200);
  };

  const handleDelete = () => {
    if (!selectedItem) return;
    dispatch(deleteGroup(selectedItem.groupId || selectedItem.id));
  };

  return (
    <div
      className={`absolute inset-0 bg-black/30 flex justify-center items-start py-10 z-50
        transition-opacity duration-200 h-[82dvh]
        ${show ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`bg-white rounded shadow-md w-1/2 border-b-8 border-cyan-md 
          transform transition-all duration-200 items-center flex flex-col pt-10 pb-10
          ${show ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}
      >
        <span className="text-3xl border border-red-200 rounded-full bg-red-200 p-3 text-red-600">
          <RiDeleteBin6Line />
        </span>
        <div className="text-base font-semibold py-6">Are you sure?</div>
        <div className="text-sm text-gray-600">
          {" "}
          Are you sure you want to delete this record ?{" "}
        </div>{" "}
        <div className="text-sm text-gray-600 py-1">
          {" "}
          This action cannot be undone.{" "}
        </div>
        {deleteError && (
          <div className="text-sm text-red-500 mt-2">{deleteError}</div>
        )}
        <div className="flex pt-6 gap-3">
          <CustomButton onClick={handleClose} variant="secondary">
            Cancel
          </CustomButton>

          <CustomButton
            onClick={handleDelete}
            variant="danger"
            disabled={deleteStatus === "loading"}
          >
            {deleteStatus === "loading" ? "Deleting..." : "Delete"}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModel;
