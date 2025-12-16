import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { loadGroups, updateGroup, resetUpdateStatus } from "../../store/group";
import { closeViewModel } from "../../store/toggle";

import {
  DataTable,
  FilterBar,
  PaginationBar,
  Loader,
  Alert,
  CustomModel,
  CustomInput,
} from "../../components";

function Groups() {
  const dispatch = useDispatch();

  // ----- groups list state -----
  const {
    data: groups,
    pagination,
    status,
    error,
  } = useSelector((state) => state.group.list);
  const loading = status === "loading";

  // ----- modal state from toggle slice -----
  const { isViewModelOpen, selectedItem, mode } = useSelector(
    (state) => state.modelToggler
  );

  // ----- update slice to observe results -----
  const { status: updateStatus, error: updateError } = useSelector(
    (state) => state.group.update
  );

  // ----- local form state (only for edit mode) -----
  const [form, setForm] = useState({
    groupName: "",
    latitude: "",
    longitude: "",
    isActive: false,
  });

  // When edit modal opens, seed form from selectedItem
  useEffect(() => {
    if (mode === "edit" && selectedItem) {
      setForm({
        groupName: selectedItem.groupName ?? "",
        latitude: selectedItem.latitude ?? "",
        longitude: selectedItem.longitude ?? "",
        isActive:
          typeof selectedItem.isActive === "boolean"
            ? selectedItem.isActive
            : selectedItem.isActive === "true",
      });
    }
    if (mode === "view") {
      // reset local form when switching to view
      setForm({
        groupName: "",
        latitude: "",
        longitude: "",
        isActive: false,
      });
    }
  }, [mode, selectedItem]);

  // When update is successful, close modal and reset update status
  useEffect(() => {
    if (updateStatus === "success") {
      dispatch(closeViewModel());
      dispatch(resetUpdateStatus());
    }
  }, [updateStatus, dispatch]);

  // ----- Filters -----
  const [uiFilter, setUiFilter] = useState({
    groupName: "",
    organizationName: "",
    isActive: "",
  });

  const [apiFilter, setApiFilter] = useState({
    pageNumber: 0,
    pageSize: 5,
    groupName: "",
    organizationName: "",
    isActive: "",
  });

  const handleChange = (name, value) =>
    setUiFilter((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    const params = {
      pageNumber: apiFilter.pageNumber,
      pageSize: apiFilter.pageSize,
      sortBy: "groupId",
      sortOrder: "desc",
    };

    if (apiFilter.groupName) params.groupName = apiFilter.groupName;
    if (apiFilter.organizationName)
      params.organizationName = apiFilter.organizationName;
    if (apiFilter.isActive !== "")
      params.isActive = apiFilter.isActive === "true";

    dispatch(loadGroups(params));
  }, [apiFilter, dispatch]);

  const applyFilter = () => {
    setApiFilter((prev) => ({
      ...prev,
      pageNumber: 0,
      groupName: uiFilter.groupName,
      organizationName: uiFilter.organizationName,
      isActive: uiFilter.isActive,
    }));
  };

  const handlePageChange = (page) => {
    setApiFilter((prev) => ({ ...prev, pageNumber: page }));
  };

  // ----- Table columns -----
  const columns = useMemo(
    () => [
      { label: "Group Name", accessor: "groupName" },
      { label: "Organization Name", accessor: "organizationName" },
      { label: "Latitude", accessor: "latitude" },
      { label: "Longitude", accessor: "longitude" },
      {
        label: "Status",
        accessor: (row) => (row.isActive ? "Active" : "Inactive"),
      },
      {
        label: "Created Date",
        accessor: (row) => moment(row.createdAt).format("MMM Do YYYY, h:mm a"),
      },
      {
        label: "Updated Date",
        accessor: (row) => moment(row.updatedAt).format("MMM Do YYYY, h:mm a"),
      },
    ],
    []
  );

  // ----- FilterBar fields -----
  const filterFields = [
    {
      name: "groupName",
      label: "Group Name",
      placeholder: "group name",
      value: uiFilter.groupName,
      onChange: (v) => handleChange("groupName", v),
    },
    {
      name: "organizationName",
      label: "Organization Name",
      placeholder: "organization name",
      value: uiFilter.organizationName,
      onChange: (v) => handleChange("organizationName", v),
    },
    {
      name: "isActive",
      label: "Status",
      type: "select",
      value: uiFilter.isActive,
      onChange: (v) => handleChange("isActive", v),
      options: [
        { label: "-- status --", value: "" },
        { label: "Active", value: "true" },
        { label: "Inactive", value: "false" },
      ],
    },
  ];

  // ----- local edit handlers -----
  const handleEditChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Diff and dispatch updateGroup (send only changed fields)
  const handleUpdate = () => {
    if (!selectedItem) return;

    const dirty = {};
    if (form.groupName !== selectedItem.groupName)
      dirty.groupName = form.groupName;
    if ((form.latitude ?? "") !== (selectedItem.latitude ?? ""))
      dirty.latitude = form.latitude;
    if ((form.longitude ?? "") !== (selectedItem.longitude ?? ""))
      dirty.longitude = form.longitude;

    const selectedIsActive =
      typeof selectedItem.isActive === "boolean"
        ? selectedItem.isActive
        : selectedItem.isActive === "true";

    if (form.isActive !== selectedIsActive) dirty.isActive = form.isActive;

    if (Object.keys(dirty).length === 0) {
      dispatch(closeViewModel());
      return;
    }

    dispatch(updateGroup(selectedItem.groupId || selectedItem.id, dirty));
  };

  // ----- Build modal fields depending on mode -----
  const modelFields =
    mode === "view"
      ? [
          {
            component: CustomInput,
            props: {
              label: "Organization Name",
              value: selectedItem?.organizationName ?? "",
              inputWidth: "w-full",
              labelWidth: "w-56",
              isDisable: true,
            },
          },
          {
            component: CustomInput,
            props: {
              label: "Group Name",
              value: selectedItem?.groupName ?? "",
              inputWidth: "w-full",
              labelWidth: "w-56",
              isDisable: true,
            },
          },
          {
            component: CustomInput,
            props: {
              label: "Latitude",
              value: selectedItem?.latitude ?? "",
              inputWidth: "w-full",
              labelWidth: "w-56",
              isDisable: true,
            },
          },
          {
            component: CustomInput,
            props: {
              label: "Longitude",
              value: selectedItem?.longitude ?? "",
              inputWidth: "w-full",
              labelWidth: "w-56",
              isDisable: true,
            },
          },
          {
            component: CustomInput,
            props: {
              label: "Active Status",
              value: selectedItem
                ? selectedItem.isActive
                  ? "Active"
                  : "Inactive"
                : "",
              inputWidth: "w-full",
              labelWidth: "w-56",
              isDisable: true,
            },
          },

          {
            component: CustomInput,
            props: {
              label: "Updated Date & Time",
              value: moment(selectedItem?.updatedAt).format(
                "MMM Do YYYY, h:mm a"
              ),
              inputWidth: "w-full",
              labelWidth: "w-56",
              isDisable: true,
            },
          },
          {
            component: CustomInput,
            props: {
              label: "Created Date & Time",
              value: moment(selectedItem?.createdAt).format(
                "MMM Do YYYY, h:mm a"
              ),
              inputWidth: "w-full",
              labelWidth: "w-56",
              isDisable: true,
            },
          },
        ]
      : [
          {
            component: CustomInput,
            props: {
              label: "Group Name",
              value: form.groupName,
              inputWidth: "w-full",
              labelWidth: "w-56",
              isDisable: false,
              onChange: (v) => handleEditChange("groupName", v),
            },
          },
          {
            component: CustomInput,
            props: {
              label: "Latitude",
              value: form.latitude,
              inputWidth: "w-full",
              labelWidth: "w-56",
              isDisable: false,
              onChange: (v) => handleEditChange("latitude", v),
            },
          },
          {
            component: CustomInput,
            props: {
              label: "Longitude",
              value: form.longitude,
              inputWidth: "w-full",
              labelWidth: "w-56",
              isDisable: false,
              onChange: (v) => handleEditChange("longitude", v),
            },
          },
          {
            component: CustomInput,
            props: {
              label: "Active Status",
              isSelect: true,
              value: form.isActive ? "ACTIVE" : "INACTIVE",
              onChange: (val) => handleEditChange("isActive", val === "ACTIVE"),
              inputWidth: "w-full",
              labelWidth: "w-56",
              options: [
                { label: "Active", value: "ACTIVE" },
                { label: "Inactive", value: "INACTIVE" },
              ],
            },
          },
        ];

  const modalActions =
    mode === "view"
      ? [
          {
            label: "Close",
            variant: "outline",
            onClick: () => dispatch(closeViewModel()),
          },
        ]
      : [
          {
            label: "Cancel",
            variant: "outline",
            onClick: () => dispatch(closeViewModel()),
          },
          {
            label: updateStatus === "loading" ? "Updating..." : "Update",
            variant: "primary",
            onClick: handleUpdate,
          },
        ];

  return (
    <div className="flex flex-col gap-5 relative">
      {isViewModelOpen && (
        <CustomModel
          headerName="Group Details"
          fields={modelFields}
          actions={modalActions}
        />
      )}

      <FilterBar fields={filterFields} onFilter={applyFilter} />

      <div className="p-4 bg-white shadow-md relative">
        {loading && <Loader />}

        {error && !loading ? (
          <Alert type="info" message={error.message || error} />
        ) : (
          <div>
            <DataTable
              columns={columns}
              data={groups || []}
              pagination={pagination}
              loading={loading}
              onPageChange={handlePageChange}
              isShowActionSection={true}
              isShowViewBtn={true}
              isShowEditBtn={true}
              isShowDeleteBtn={true}
            />

            <div className="">
              <PaginationBar
                pageNumber={pagination?.pageNumber || 0}
                pageSize={apiFilter.pageSize}
                totalPages={pagination?.totalPages || 1}
                totalElements={pagination?.totalElements || 0}
                onPageChange={(page) =>
                  setApiFilter((prev) => ({ ...prev, pageNumber: page }))
                }
                onPageSizeChange={(size) =>
                  setApiFilter((prev) => ({
                    ...prev,
                    pageSize: size,
                    pageNumber: 0,
                  }))
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Groups;
