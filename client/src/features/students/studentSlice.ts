import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessageDto } from "../common/dtos";
import { Chat, Task } from "../common/models";
import { BASE_URL } from "../../config";
import axios from "axios";

interface StudentState {
    chatMessages: ChatMessageDto[];
    tasks: Task[];
    studentLoading: boolean;
    error: string | null;

}

const initialState = {
    chatMessages: [],
    tasks: [],
    studentLoading: false,
    error: null
} as StudentState;

export const getChat = createAsyncThunk<Chat, string>("student/chats", async (groupId) => {
    const response = await axios.get(`${BASE_URL}/api/groups/${groupId}/chat`,);
    return response.data as Chat;
});

export const getTasks = createAsyncThunk<Task[], string>("student/tasks", async (groupId) => {
    const response = await axios.get(`${BASE_URL}/api/groups/${groupId}/tasks`,);
    return response.data as Task[];
});




export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        setStudentLoading(state) {
            state.studentLoading = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getChat.pending, (state) => {
            state.studentLoading = true;
        });
        builder.addCase(getChat.fulfilled, (state, { payload }) => {
            state.studentLoading = false;
            state.chatMessages = payload ? payload.messages as unknown as ChatMessageDto[] : [];

            console.log(payload);
        });
        builder.addCase(getChat.rejected, (state, action) => {
            state.studentLoading = false;
            state.error = action.payload as string;
        });


        builder.addCase(getTasks.pending, (state) => {
            state.studentLoading = true;
        });
        builder.addCase(getTasks.fulfilled, (state, { payload }) => {
            state.studentLoading = false;
            state.tasks = payload;
        });
        builder.addCase(getTasks.rejected, (state, action) => {
            state.studentLoading = false;
            state.error = action.payload as string;
        });
    }
});

export const { setStudentLoading } = studentSlice.actions;

export default studentSlice.reducer;
