import {configureStore} from "@reduxjs/toolkit";
import taskReducer from './Slices/taskSlice';
import userReducer from './Slices/userSlice';

const store = configureStore({
    reducer: {
        taskList: taskReducer,
        userList: userReducer,
    }
});

export default store;