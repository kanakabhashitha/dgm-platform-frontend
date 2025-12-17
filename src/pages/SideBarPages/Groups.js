import { useEffect, useState, useMemo, useCallback } from "react";
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
  ConfirmationModel,
} from "../../components";

function Groups() {
  const dispatch = useDispatch();

  // -------------------- REDUX STATE --------------------
  const { data, pagination, status, error } = useSelector(
    (state) => state.group.list
  );
  const { status: updateStatus } = useSelector((state) => state.group.update);
  const { status: deleteStatus } = useSelector((state) => state.group.remove);

  const { isViewModelOpen, isConfirmationModelOpen, selectedItem, mode } =
    useSelector((state) => state.modelToggler);

  const loading = status === "loading";

  // -------------------- FILTER STATE --------------------
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

  // -------------------- FORM STATE --------------------
  const [form, setForm] = useState({
    groupName: "",
    latitude: "",
    longitude: "",
    isActive: false,
  });

  // -------------------- HELPERS --------------------
  const buildParams = useCallback(() => {
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

    return params;
  }, [apiFilter]);

  const reloadGroups = useCallback(() => {
    dispatch(loadGroups(buildParams()));
  }, [dispatch, buildParams]);

  // -------------------- EFFECTS --------------------
  useEffect(() => {
    reloadGroups();
  }, [reloadGroups]);

  useEffect(() => {
    if (updateStatus === "success") {
      dispatch(closeViewModel());
      dispatch(resetUpdateStatus());
      reloadGroups();
    }
  }, [updateStatus, dispatch, reloadGroups]);

  useEffect(() => {
    if (deleteStatus === "success") {
      reloadGroups();
    }
  }, [deleteStatus, reloadGroups]);

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
  }, [mode, selectedItem]);

  // -------------------- HANDLERS --------------------
  const handleEditChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilter = () => {
    setApiFilter((prev) => ({
      ...prev,
      pageNumber: 0,
      ...uiFilter,
    }));
  };

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

  // -------------------- ERROR MESSAGE --------------------
  const errorMessage = useMemo(() => {
    if (!error) return "";

    if (typeof error === "string") return error;

    if (typeof error === "object") {
      return error.message || "Something went wrong";
    }

    return "Unexpected error occurred";
  }, [error]);

  // -------------------- TABLE --------------------
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

  // -------------------- FILTER BAR --------------------
  const filterFields = [
    {
      name: "groupName",
      label: "Group Name",
      value: uiFilter.groupName,
      onChange: (v) => setUiFilter((p) => ({ ...p, groupName: v })),
    },
    {
      name: "organizationName",
      label: "Organization Name",
      value: uiFilter.organizationName,
      onChange: (v) => setUiFilter((p) => ({ ...p, organizationName: v })),
    },
    {
      name: "isActive",
      label: "Status",
      type: "select",
      value: uiFilter.isActive,
      onChange: (v) => setUiFilter((p) => ({ ...p, isActive: v })),
      options: [
        { label: "-- status --", value: "" },
        { label: "Active", value: "true" },
        { label: "Inactive", value: "false" },
      ],
    },
  ];

  // -------------------- MODAL FIELDS (YOUR VERSION) --------------------
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
              value: selectedItem?.isActive ? "Active" : "Inactive",
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
              onChange: (v) => handleEditChange("longitude", v),
            },
          },
          {
            component: CustomInput,
            props: {
              label: "Active Status",
              isSelect: true,
              value: form.isActive ? "ACTIVE" : "INACTIVE",
              onChange: (v) => handleEditChange("isActive", v === "ACTIVE"),
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

  // -------------------- RENDER --------------------
  return (
    <div className="flex flex-col gap-5 relative">
      {isViewModelOpen && (
        <CustomModel
          headerName="Group Details"
          fields={modelFields}
          actions={modalActions}
        />
      )}

      {isConfirmationModelOpen && <ConfirmationModel />}

      <FilterBar fields={filterFields} onFilter={applyFilter} />

      <div className="p-4 bg-white shadow-md relative">
        {loading && <Loader />}

        {errorMessage && !loading ? (
          <Alert type="error" message={errorMessage} />
        ) : (
          <>
            <DataTable
              columns={columns}
              data={data || []}
              isShowActionSection
              isShowViewBtn
              isShowEditBtn
              isShowDeleteBtn
            />

            <PaginationBar
              pageNumber={pagination.pageNumber}
              pageSize={apiFilter.pageSize}
              totalPages={pagination.totalPages}
              totalElements={pagination.totalElements}
              onPageChange={(page) =>
                setApiFilter((p) => ({ ...p, pageNumber: page }))
              }
              onPageSizeChange={(size) =>
                setApiFilter({ ...apiFilter, pageSize: size, pageNumber: 0 })
              }
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Groups;
