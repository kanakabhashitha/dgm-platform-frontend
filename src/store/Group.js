import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const initialState = {
  list: {
    data: [],
    pagination: {
      pageNumber: 0,
      pageSize: 5,
      totalElements: 0,
      totalPages: 0,
      lastPage: true,
    },
    status: "idle", // idle | loading | success | failed
    error: null,
  },

  create: {
    data: null,
    status: "idle",
    error: null,
  },

  update: {
    data: null,
    status: "idle",
    error: null,
  },

  remove: {
    status: "idle",
    error: null,
  },
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    // --------------------------
    // LIST GROUPS
    // --------------------------
    groupListRequested: (state) => {
      state.list.status = "loading";
      state.list.error = null;
    },
    groupListReceived: (state, action) => {
      const payload = action.payload;

      state.list.data = payload.data;
      state.list.pagination = {
        pageNumber: payload.pageNumber,
        pageSize: payload.pageSize,
        totalElements: payload.totalElements,
        totalPages: payload.totalPages,
        lastPage: payload.lastPage,
      };

      state.list.status = "success";
      state.list.error = null;
    },
    groupListRequestFailed: (state, action) => {
      state.list.status = "failed";
      state.list.error = action.payload?.error || "Something went wrong";
    },

    // --------------------------
    // CREATE GROUP
    // --------------------------
    groupCreateRequested: (state) => {
      state.create.status = "loading";
      state.create.error = null;
    },
    groupCreated: (state, action) => {
      state.create.status = "success";
      state.create.data = action.payload;
      state.create.error = null;
    },
    groupCreateFailed: (state, action) => {
      state.create.status = "failed";
      state.create.error = action.payload?.error || "Failed to create group";
    },
    resetCreateStatus: (state) => {
      state.create = { data: null, status: "idle", error: null };
    },

    // --------------------------
    // UPDATE GROUP
    // --------------------------
    groupUpdateRequested: (state) => {
      state.update.status = "loading";
      state.update.error = null;
    },
    groupUpdated: (state, action) => {
      state.update.status = "success";
      state.update.data = action.payload;
    },
    groupUpdateFailed: (state, action) => {
      state.update.status = "failed";
      state.update.error = action.payload?.error;
    },
    resetUpdateStatus: (state) => {
      state.update = { data: null, status: "idle", error: null };
    },

    // --------------------------
    // DELETE GROUP
    // --------------------------
    groupDeleteRequested: (state) => {
      state.remove.status = "loading";
      state.remove.error = null;
    },
    groupDeleted: (state) => {
      state.remove.status = "success";
    },
    groupDeleteFailed: (state, action) => {
      state.remove.status = "failed";
      state.remove.error = action.payload?.error;
    },
    resetDeleteStatus: (state) => {
      state.remove = { status: "idle", error: null };
    },
  },
});

export default groupSlice.reducer;

export const {
  groupListRequested,
  groupListReceived,
  groupListRequestFailed,

  groupCreateRequested,
  groupCreated,
  groupCreateFailed,
  resetCreateStatus,

  groupUpdateRequested,
  groupUpdated,
  groupUpdateFailed,
  resetUpdateStatus,

  groupDeleteRequested,
  groupDeleted,
  groupDeleteFailed,
  resetDeleteStatus,
} = groupSlice.actions;

// ---------------------------------------
// API ACTIONS
// ---------------------------------------

const url = "/groups";

// LOAD GROUPS (LIST)
export const loadGroups = (params) =>
  apiCallBegan({
    url: `${url}?${new URLSearchParams(params).toString()}`,
    method: "GET",
    onStart: groupListRequested.type,
    onSuccess: groupListReceived.type,
    onError: groupListRequestFailed.type,
  });

// CREATE GROUP
export const createGroup = (data) =>
  apiCallBegan({
    url,
    method: "POST",
    data,
    onStart: groupCreateRequested.type,
    onSuccess: groupCreated.type,
    onError: groupCreateFailed.type,
  });

// UPDATE GROUP
export const updateGroup = (groupId, data) =>
  apiCallBegan({
    url: `${url}/${groupId}`,
    method: "PATCH",
    data,
    onStart: groupUpdateRequested.type,
    onSuccess: groupUpdated.type,
    onError: groupUpdateFailed.type,
  });

// DELETE GROUP
export const deleteGroup = (groupId) =>
  apiCallBegan({
    url: `${url}/${groupId}`,
    method: "DELETE",
    onStart: groupDeleteRequested.type,
    onSuccess: groupDeleted.type,
    onError: groupDeleteFailed.type,
  });
