import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    taskId: "",
    title: "",
    description: "",
    createdAt: "",
    createdBy: "",
    column: "todo",
  },
  reducers: {
    createTask: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateTask: (state, action) => {
      return { ...state, ...action.payload };
    },
    deleteTask: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { createTask,  updateTask, deleteTask} = taskSlice.actions;
// export const userInfo = (state) => state.user;
export default taskSlice.reducer;
