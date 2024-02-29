import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config";

export interface Notification {
    _id: string;
    title: string;
    description: string;
    viewed: boolean;
    from: string;
    to: string;
    group: string;
}

interface NotificationState {
    unreadNotifications: number;
    notifications: Notification[]
    loading: boolean;
    error: string | undefined;
}

const initialState = {
    unreadNotifications: 0,
    notifications: [],
    loading: false,
    error: undefined
} as NotificationState;


// First, create the thunk
export const getNotifications = createAsyncThunk<any>("notification/list", async () => {
    const response = await axios.get(
        `${BASE_URL}/api/notifications`, { withCredentials: true }
    );
    return response.data;
});

export const getUnreadNotifications = createAsyncThunk<any>("notification/unread-notifications", async () => {
    const response = await axios.get(
        `${BASE_URL}/api/notifications/unread-notifications`, { withCredentials: true }
    );
    return response.data;
});


export const NotificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setLoading(state) {
            state.loading = true;
        },
    },
    extraReducers: (builder) => {
        // Notification List
        builder.addCase(getNotifications.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getNotifications.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.notifications = payload || [];
        });
        builder.addCase(getNotifications.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(getUnreadNotifications.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUnreadNotifications.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.unreadNotifications = payload.count;
        });
        builder.addCase(getUnreadNotifications.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export const {
    setLoading
} = NotificationSlice.actions;

export default NotificationSlice.reducer;
