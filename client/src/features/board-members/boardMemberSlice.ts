import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { User } from '../account/models/User';
import { GroupDto, Mark } from '../common/dtos';

interface Notice {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface Board {
  _id?: string;
  title: string;
  semester: string;
  semesterYear: string;
  members: User[];
  groups: User[]
}


interface BoardMemberState {
  supervisors: User[];
  boardMember: Board | null;
  notices: Notice[];
  groups: GroupDto[];
  group: GroupDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: BoardMemberState = {
  supervisors: [],
  boardMember: null,
  notices: [],
  groups: [],
  loading: false,
  error: null,
  group: null

};

export const assignMarkToGroup = createAsyncThunk(
  'supervisor/assignMarkToGroup',
  async ({ groupId, boardMarks }: {  groupId: string, boardMarks: Mark}) => {
      const response = await axios.post<any>(`${BASE_URL}/api/boards/assignMarkToGroup/${groupId}`, { groupId, boardMarks });
      return response.data;
  }
);

export const fetchSupervisors = createAsyncThunk('boardMember/fetchSupervisors',
  async ({ semester, semesterYear }: { semester: string, semesterYear: string }) => {
    const response = await axios.get<User[]>(`${BASE_URL}/api/boards/supervisors?semester=${semester}&semesterYear=${semesterYear}`);
    return response.data;
  });

export const fetchBoardMember = createAsyncThunk('boardMember/fetchBoardMember',
  async () => {
    const response = await axios.get<Board>(`${BASE_URL}/api/boards`, { withCredentials: true });
    return response.data;
  });

export const fetchNotices = createAsyncThunk('boardMember/fetchNotices', async () => {
  const response = await axios.get<Notice[]>(`${BASE_URL}/api/boards/notices`, { withCredentials: true });
  return response.data;
});

export const fetchGroups = createAsyncThunk('boardMember/fetchGroups',
  async ({ semester, semesterYear }: { semester: string, semesterYear: string }) => {
    const response = await axios.get<GroupDto[]>(`${BASE_URL}/api/boards/groups?semester=${semester}&semesterYear=${semesterYear}`, { withCredentials: true });
    return response.data;
  });

export const fetchGroup = createAsyncThunk('boardMember/fetchGroup',
  async (groupId: string) => {
    const response = await axios.get<GroupDto>(`${BASE_URL}/api/boards/groups/${groupId}`);
    return response.data;
  });

const boardMemberSlice = createSlice({
  name: 'boardMemberSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupervisors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSupervisors.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.supervisors = action.payload;
      })
      .addCase(fetchSupervisors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch supervisors';
      });

    builder
      .addCase(fetchBoardMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBoardMember.fulfilled, (state, action: PayloadAction<Board>) => {
        state.loading = false;
        state.boardMember = action.payload;
      })
      .addCase(fetchBoardMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch board members';
      });

    builder
      .addCase(fetchNotices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotices.fulfilled, (state, action: PayloadAction<Notice[]>) => {
        state.loading = false;
        state.notices = action.payload;
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch notices';
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
      .addCase(fetchGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGroup.fulfilled, (state, action: PayloadAction<GroupDto>) => {
        state.loading = false;
        state.group = action.payload;
      })
      .addCase(fetchGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch groups';
      });

    builder.addCase(assignMarkToGroup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(assignMarkToGroup.fulfilled, (state, { payload }) => {
      state.loading = false;

      console.log(payload);
    });
    builder.addCase(assignMarkToGroup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

  },
});

export const boardMemberActions = boardMemberSlice.actions;

export default boardMemberSlice.reducer;
