import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { User } from '../account/models/User';
import { Group, GroupRequest } from '../common/models';
import { GroupDto, GroupRequestDto } from '../common/dtos';

export interface Notice {
  id?: string;
  title: string;
  content: string;
  noticeFor: string;
  files?: FileList | null;
  createdAt?: string;
  attachments?: string []
}

export interface Board {
  _id?: string;
  title: string;
  semester: string;
  semesterYear: string;
  members: User[];
  groups: User[]
}

export interface SupervisorSemester {
  _id?: string;
  semester: string;
  semesterYear: string;
}

export interface BoardSemester {
  _id?: string;
  semester: string;
  semesterYear: string;
}

export interface GroupSemester {
  _id?: string;
  semester: string;
  semesterYear: string;
}


interface ThesisCommitteeState {
  supervisors: User[];
  boardMembers: Board[];
  notices: Notice[];
  groups: GroupDto[];
  pendingGroups: GroupRequestDto[]
  group: GroupDto | null;
  groupRequests: GroupRequestDto[];
  loading: boolean;
  error: string | null;
  semesterInfo: { semester: string, semesterYear: string },
  supervisorSemesters: SupervisorSemester[]
  boardSemesters: BoardSemester[];
  groupSemesters: GroupSemester[];
  operationSuccess: boolean;
  boardContacts: any;
  supervisorContacts: any;
}

const initialState: ThesisCommitteeState = {
  supervisors: [],
  boardMembers: [],
  notices: [],
  groups: [],
  pendingGroups: [],
  groupRequests: [],
  semesterInfo: { semester: '', semesterYear: '' },
  loading: false,
  error: null,
  group: null,
  supervisorSemesters: [],
  boardSemesters: [],
  groupSemesters: [],
  operationSuccess: false,
  boardContacts: [],
  supervisorContacts: []
};

export const fetchSupervisors = createAsyncThunk('thesisCommittee/fetchSupervisors',
  async ({ semester, semesterYear }: { semester: string, semesterYear: string }) => {
    const response = await axios.get<User[]>(`${BASE_URL}/api/committees/supervisors?semester=${semester}&semesterYear=${semesterYear}`);
    return response.data;
  });

export const fetchSupervisorSemesters = createAsyncThunk('thesisCommittee/fetchSupervisorSemesters',
  async () => {
    const response = await axios.get<SupervisorSemester[]>(`${BASE_URL}/api/committees/supervisors/semesters`);
    return response.data;
  });

export const createSupervisor = createAsyncThunk('thesisCommittee/createSupervisor', async (data: User) => {
  const response = await axios.post<User>(`${BASE_URL}/api/committees/supervisors`, data);
  return response.data;
});

export const fetchBoardMembers = createAsyncThunk('thesisCommittee/fetchBoardMembers',
  async ({ semester, semesterYear }: { semester: string, semesterYear: string }) => {
    const response = await axios.get<Board[]>(`${BASE_URL}/api/committees/boardMembers?semester=${semester}&semesterYear=${semesterYear}`);
    return response.data;
  });

export const fetchBoardSemesters = createAsyncThunk('thesisCommittee/fetchBoardSemesters',
  async () => {
    const response = await axios.get<BoardSemester[]>(`${BASE_URL}/api/committees/board/semesters`);
    return response.data;
  });

export const createBoardMember = createAsyncThunk('thesisCommittee/createBoardMember', async (data: User) => {
  const response = await axios.post<Board>(`${BASE_URL}/api/committees/boardMembers`, data);
  return response.data;
});

export const fetchNotices = createAsyncThunk('thesisCommittee/fetchNotices', async () => {
  const response = await axios.get<Notice[]>(`${BASE_URL}/api/committees/notices`);
  return response.data;
});

export const createNotice = createAsyncThunk('thesisCommittee/createNotice', async (data: Notice) => {
  const response = await axios.post<Notice>(`${BASE_URL}/api/committees/notices`, data);
  return response.data;
});

export const fetchGroups = createAsyncThunk('thesisCommittee/fetchGroups',
  async ({ semester, semesterYear }: { semester: string, semesterYear: string }) => {
    const response = await axios.get<GroupDto[]>(`${BASE_URL}/api/committees/groups?semester=${semester}&semesterYear=${semesterYear}`);
    return response.data;
  });

export const fetchPendingGroups = createAsyncThunk('thesisCommittee/fetchPendingGroups',
  async ({ semester, semesterYear }: { semester: string, semesterYear: string }) => {
    const response = await axios.get<GroupRequestDto[]>(`${BASE_URL}/api/committees/pending-groups?semester=${semester}&semesterYear=${semesterYear}`);
    return response.data;
  });

export const fetchGroupSemesters = createAsyncThunk('thesisCommittee/fetchGroupSemesters',
  async () => {
    const response = await axios.get<GroupDto[]>(`${BASE_URL}/api/committees/group-semesters`);
    return response.data;
  });

export const fetchGroup = createAsyncThunk('thesisCommittee/fetchGroup',
  async (groupId: string) => {
    const response = await axios.get<GroupDto>(`${BASE_URL}/api/groups/${groupId}`);
    return response.data;
  });

export const fetchGroupRequests = createAsyncThunk('thesisCommittee/fetchGroupRequests',
  async ({ semester, semesterYear }: { semester: string, semesterYear: string }) => {
    const response = await axios.get<GroupRequestDto[]>(`${BASE_URL}/api/committees/groupRequests?semester=${semester}&semesterYear=${semesterYear}`);
    return response.data;
  });

export const assignSupervisorToGroup = createAsyncThunk(
  'thesisCommittee/assignSupervisorToGroup',
  async ({ groupId, supervisorId }: { groupId: string; supervisorId: string }) => {
    const response = await axios.post<Group>(`${BASE_URL}/api/committees/assignSupervisorToGroup`, { groupId, supervisorId });
    return response.data;
  }
);

export const assignSupervisorToPendingGroup = createAsyncThunk(
  'thesisCommittee/assignSupervisorToPendingGroup',
  async ({ groupRequestId, supervisorId }: { groupRequestId: string; supervisorId: string }) => {
    const response = await axios.post<GroupRequestDto>(`${BASE_URL}/api/committees/assignSupervisorToPendingGroup`, { groupRequestId, supervisorId });
    return response.data;
  }
);

export const assignBoardToGroup = createAsyncThunk(
  'thesisCommittee/assignBoardToGroup',
  async ({ groupId, boardId }: { groupId: string; boardId: string }) => {
    const response = await axios.post<Group>(`${BASE_URL}/api/committees/assignBoardToGroup`, { groupId, boardId });
    return response.data;
  }
);

export const approveGroupRequests = createAsyncThunk(
  'thesisCommittee/approveGroupRequests',
  async ({ requestId, isApproved }: { requestId: string; isApproved: boolean }) => {
    const response = await axios.post<GroupRequest>(`${BASE_URL}/api/committees/approveGroupRequests`, { requestId, isApproved });
    return response.data;
  }
);

export const deleteGroupRequest = createAsyncThunk('thesisCommittee/deleteGroupRequest', async (requestId: string) => {
  const response = await axios.delete<GroupRequest>(`/deleteGroupRequest/${requestId}`);
  return response.data;
});

export const fetchLatestSemester = createAsyncThunk('thesisCommittee/fetchLatestSemester', async () => {
  const response = await axios.get(`${BASE_URL}/api/committees/latest-semester`);
  return response.data;
});

export const fetchBoardUserContacts = createAsyncThunk('thesisCommittee/fetchBoardUserContacts', async (userId: string) => {
  const response = await axios.get(`${BASE_URL}/api/committees/board-contacts/${userId}`);
  return response.data;
});

export const fetchSupervisorUserContacts = createAsyncThunk('thesisCommittee/fetchSupervisorUserContacts', async (userId: string) => {
  const response = await axios.get(`${BASE_URL}/api/committees/supervisor-contacts/${userId}`);
  return response.data;
});

const thesisCommitteeSlice = createSlice({
  name: 'thesisCommittee',
  initialState,
  reducers: {
    resetOperationSuccess(state) {
      state.operationSuccess = false;
    }
  },
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
      .addCase(fetchSupervisorSemesters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSupervisorSemesters.fulfilled, (state, action: PayloadAction<SupervisorSemester[]>) => {
        state.loading = false;
        state.supervisorSemesters = action.payload;
      })
      .addCase(fetchSupervisorSemesters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch supervisors';
      });

    builder
      .addCase(createSupervisor.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSupervisor.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.supervisors.push(action.payload);
      })
      .addCase(createSupervisor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create supervisor';
      });

    builder
      .addCase(fetchBoardMembers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBoardMembers.fulfilled, (state, action: PayloadAction<Board[]>) => {
        state.loading = false;
        state.boardMembers = action.payload;
      })
      .addCase(fetchBoardMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch board members';
      });

    builder
      .addCase(fetchBoardSemesters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBoardSemesters.fulfilled, (state, action: PayloadAction<BoardSemester[]>) => {
        state.loading = false;
        state.boardSemesters = action.payload;
      })
      .addCase(fetchBoardSemesters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch board members';
      });

    builder
      .addCase(createBoardMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBoardMember.fulfilled, (state, action: PayloadAction<Board>) => {
        state.loading = false;
      })
      .addCase(createBoardMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create board member';
      });

    builder
      .addCase(fetchNotices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotices.fulfilled, (state, action: PayloadAction<Notice[]>) => {
        state.loading = false;
        console.log(action.payload);
        state.notices = action.payload;
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch notices';
      });

    builder
      .addCase(createNotice.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNotice.fulfilled, (state, action: PayloadAction<Notice>) => {
        state.loading = false;
        state.notices.push(action.payload);
      })
      .addCase(createNotice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create notice';
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
      .addCase(fetchPendingGroups.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPendingGroups.fulfilled, (state, action: PayloadAction<GroupRequestDto[]>) => {
        state.loading = false;
        state.pendingGroups = action.payload;
      })
      .addCase(fetchPendingGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch groups';
      });

    builder
      .addCase(fetchGroupSemesters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGroupSemesters.fulfilled, (state, action: PayloadAction<GroupSemester[]>) => {
        state.loading = false;
        state.groupSemesters = action.payload;
      })
      .addCase(fetchGroupSemesters.rejected, (state, action) => {
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

    builder
      .addCase(fetchGroupRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGroupRequests.fulfilled, (state, action: PayloadAction<GroupRequestDto[]>) => {
        state.loading = false;
        state.groupRequests = action.payload;
      })
      .addCase(fetchGroupRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch group requests';
      });

    builder
      .addCase(assignSupervisorToGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(assignSupervisorToGroup.fulfilled, (state, action: PayloadAction<Group>) => {
        state.loading = false;
        state.operationSuccess = true;
      })
      .addCase(assignSupervisorToGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to assign supervisor to group';
      });

    builder
      .addCase(assignSupervisorToPendingGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(assignSupervisorToPendingGroup.fulfilled, (state, action: PayloadAction<GroupRequestDto>) => {
        state.loading = false;
        state.operationSuccess = true;
      })
      .addCase(assignSupervisorToPendingGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to assign supervisor to group';
      });

    builder
      .addCase(approveGroupRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(approveGroupRequests.fulfilled, (state, action: PayloadAction<GroupRequest>) => {
        state.loading = false;
        state.operationSuccess = true;
      })
      .addCase(approveGroupRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to approve group request';
      });

    builder
      .addCase(deleteGroupRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteGroupRequest.fulfilled, (state, action: PayloadAction<GroupRequest>) => {
        state.loading = false;
        // Remove the deleted group request from the state

      })
      .addCase(deleteGroupRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete group request';
      });

    builder
      .addCase(fetchLatestSemester.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLatestSemester.fulfilled, (state, action: PayloadAction<{ semester: string, semesterYear: string }>) => {
        state.loading = false;
        // Remove the deleted group request from the state
        console.log(action.payload);
        state.semesterInfo = action.payload;
      })
      .addCase(fetchLatestSemester.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get latest semester';
      });


      builder
      .addCase(fetchBoardUserContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBoardUserContacts.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.boardContacts = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchBoardUserContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get latest semester';
      });

      builder
      .addCase(fetchSupervisorUserContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSupervisorUserContacts.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        // Remove the deleted group request from the state
        state.supervisorContacts = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchSupervisorUserContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to get latest semester';
      });
  },
});

export const {resetOperationSuccess} = thesisCommitteeSlice.actions;

export default thesisCommitteeSlice.reducer;
