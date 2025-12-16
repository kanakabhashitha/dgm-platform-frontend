import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGroup, resetCreateStatus } from "../../store/group";

import { CustomInput, CustomButton, Loader, Alert } from "../../components";

const AddGroups = () => {
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.group.create);

  const [form, setForm] = useState({
    groupName: "",
    latitude: "",
    longitude: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFormErrors((prev) => ({ ...prev, [key]: "" })); // clear error as user types
  };

  // Validate fields
  const validateForm = () => {
    const errors = {};

    if (!form.groupName.trim()) {
      errors.groupName = "Group name is required";
    }

    return errors;
  };

  // Submit handler
  const handleSubmit = () => {
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length !== 0) return;

    const payload = {
      groupName: form.groupName,
      latitude: form.latitude,
      longitude: form.longitude,
    };

    dispatch(createGroup(payload));
  };

  // Reset form on success
  useEffect(() => {
    if (status === "success") {
      setForm({ groupName: "", latitude: "", longitude: "" });
      setFormErrors({});
      setTimeout(() => dispatch(resetCreateStatus()), 1000);
    }
  }, [status, dispatch]);

  return (
    <div className="flex flex-col gap-5">
      <div className="capitalize tracking-wide text-base text-gray-700 font-medium bg-white shadow-sm py-3 px-4">
        add group
      </div>

      <div className="bg-white shadow-sm py-8 px-4">
        <div className="w-1/2 h-full flex flex-col gap-4 relative">
          <CustomInput
            label="group name"
            type="text"
            placeholder="Enter group name"
            value={form.groupName}
            onChange={(value) => handleChange("groupName", value)}
            isRequired={true}
            error={formErrors.groupName}
            inputWidth="w-full"
            labelWidth="w-40"
          />

          <CustomInput
            label="group latitude"
            type="text"
            placeholder="Enter group latitude"
            value={form.latitude}
            onChange={(value) => handleChange("latitude", value)}
            inputWidth="w-full"
            labelWidth="w-40"
          />

          <CustomInput
            label="group longitude"
            type="text"
            placeholder="Enter group longitude"
            value={form.longitude}
            onChange={(value) => handleChange("longitude", value)}
            inputWidth="w-full"
            labelWidth="w-40"
          />

          {status === "loading" && <Loader />}
          {status === "failed" && (
            <Alert type="error" message={error?.message} />
          )}
          {status === "success" && (
            <Alert type="success" message="Group created successfully!" />
          )}

          <div className="flex gap-2 justify-end mt-4">
            <CustomButton variant="ghost">Cancel</CustomButton>

            <CustomButton
              variant="secondary"
              onClick={() => {
                setForm({ groupName: "", latitude: "", longitude: "" });
                setFormErrors({});
              }}
            >
              Reset
            </CustomButton>

            <CustomButton variant="primary" onClick={handleSubmit}>
              Submit
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGroups;
