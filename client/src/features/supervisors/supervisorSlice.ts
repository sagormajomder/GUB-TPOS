import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessageDto, GroupDto, Mark } from "../common/dtos";
import { Chat, Task } from "../common/models";
import { BASE_URL } from "../../config";
import axios from "axios";

interface SupervisorState {
    chatMessages: ChatMessageDto[];
    supervisorLoading: boolean;
    error: string | null;
    loading: boolean;
    groups: GroupDto[];
    tasks: Task[];
    operationSuccess: boolean;
}

const initialState = {
    chatMessages: [],
    supervisorLoading: false,
    error: null,
    loading: false,
    groups: [],
    operationSuccess: false,
    tasks: []
} as SupervisorState;

export const getChat = createAsyncThunk<Chat, string>("supervisor/chats", async (groupId) => {
    const response = await axios.get(`${BASE_URL}/api/groups/${groupId}/chat`,);
    return response.data as Chat;
});

export const assignMarkToGroup = createAsyncThunk(
    'supervisor/assignMarkToGroup',
    async ({ groupId, supervisorMarks }: {  groupId: string, supervisorMarks: Mark}) => {
        const response = await axios.post<any>(`${BASE_URL}/api/groups/assignMarkToGroup/${groupId}`, { groupId, supervisorMarks });
        return response.data;
    }
);

export const rejectGroupRequest = createAsyncThunk(
    'supervisor/rejectGroupRequest',
    async (requestId: string) => {
        const response = await axios.delete<any>(`${BASE_URL}/api/groups/group-requests/${requestId}/reject`);
        return response.data;
    }
);

export const fetchGroups = createAsyncThunk('supervisor/fetchGroups',
    async ({ semester, semesterYear }: { semester: string, semesterYear: string }) => {
        const response = await axios.get<GroupDto[]>(`${BASE_URL}/api/groups?semester=${semester}&semesterYear=${semesterYear}`, { withCredentials: true });
        return response.data;
});

export const fetchSupervisorTasks = createAsyncThunk('supervisor/fetchSupervisorTasks',
    async (supervisorId: string) => {
        const response = await axios.get<Task[]>(`${BASE_URL}/api/groups/supervisor/tasks/${supervisorId}`, { withCredentials: true });
        return response.data;
});


export const supervisorSlice = createSlice({
    name: "supervisor",
    initialState,
    reducers: {
        setStudentLoading(state) {
            state.supervisorLoading = true;
        },
        setMessages(state, action: PayloadAction<ChatMessageDto[]>) {
            state.chatMessages = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getChat.pending, (state) => {
            state.supervisorLoading = true;
        });
        builder.addCase(getChat.fulfilled, (state, { payload }) => {
            state.supervisorLoading = false;
            state.chatMessages = payload ? payload.messages as unknown as ChatMessageDto[] : [];

            console.log(payload);
        });
        builder.addCase(getChat.rejected, (state, action) => {
            state.supervisorLoading = false;
            state.error = action.payload as string;
        });

        builder.addCase(assignMarkToGroup.pending, (state) => {
            state.supervisorLoading = true;
        });
        builder.addCase(assignMarkToGroup.fulfilled, (state, { payload }) => {
            state.supervisorLoading = false;
            state.operationSuccess = true;
            console.log(payload);
        });
        builder.addCase(assignMarkToGroup.rejected, (state, action) => {
            state.supervisorLoading = false;
            state.error = action.payload as string;
        });

        builder.addCase(rejectGroupRequest.pending, (state) => {
            state.supervisorLoading = true;
        });
        builder.addCase(rejectGroupRequest.fulfilled, (state, { payload }) => {
            state.supervisorLoading = false;
            state.operationSuccess = true;
            console.log(payload);
        });
        builder.addCase(rejectGroupRequest.rejected, (state, action) => {
            state.supervisorLoading = false;
            state.error = action.payload as string;
        });

        builder
            .addCase(fetchGroups.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchGroups.fulfilled, (state, action: PayloadAction<GroupDto[]>) => {
                state.loading = false;
                state.groups = action.payload;
            })
            .addCase(fetchGroups.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch groups';
            });



            builder
            .addCase(fetchSupervisorTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSupervisorTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchSupervisorTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch groups';
            });
    }
});

export const { setStudentLoading, setMessages } = supervisorSlice.actions;

export default supervisorSlice.reducer;
