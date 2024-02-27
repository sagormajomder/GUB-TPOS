import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import accountReducer from "./features/account/accountSlice";
import studentReducer from "./features/students/studentSlice";
import supervisorReducer from "./features/supervisors/supervisorSlice";
import notificationReducer from "./features/notifications/notificationSlice";
import committeesReducer from "./features/thesis-committees/thesisCommitteeSlice";
import boardsReducer from "./features/board-members/boardMemberSlice";
import { apiSlice } from "./features/common/api/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        account: accountReducer,
        students: studentReducer,
        supervisors: supervisorReducer,
        notifications: notificationReducer,
        committees: committeesReducer,
        boards: boardsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
