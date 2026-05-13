import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
  },
  reducers: {
    addNotification(state, action) {
      state.notifications.unshift({
        id: Date.now(),
        title: action.payload.title,
        message: action.payload.message,
        type: action.payload.type || "info",
        time: Date.now(),
        bg:
          action.payload.type === "success"
            ? "bg-green-100"
            : action.payload.type === "error"
              ? "bg-red-100"
              : "bg-blue-100",
        color:
          action.payload.type === "success"
            ? "text-green-700"
            : action.payload.type === "error"
              ? "text-red-700"
              : "text-blue-700",
        icon:
          action.payload.type === "success"
            ? "fa-check"
            : action.payload.type === "error"
              ? "fa-times"
              : "fa-bell",
      });
    },
    clearAllNotifications(state) {
      state.notifications = [];
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice;
