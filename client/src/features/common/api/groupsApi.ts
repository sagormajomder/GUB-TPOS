import { GroupRequestDto } from '../dtos';
import { Chat, ChatMessage, Group, GroupRequest, Task } from '../models';
import { apiSlice } from './apiSlice';


export const groupsApi: any = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGroup: builder.mutation<void, GroupRequestDto>({
      query: (data) => ({
        url: `groups/group-requests/${data._id}/accept`,
        method: 'POST',
        body: data,
      }),
    }),
    getGroups: builder.query<Group[], void>({
      query: () => 'groups',
    }),
    getGroup: builder.query<Group, string>({
      query: (groupId) => `groups/${groupId}`,
    }),
    getStudentGroup: builder.query<Group, string>({
      query: (studentId) => `groups/student/${studentId}`,
    }),
    getGroupRequests: builder.query<GroupRequest[], string>({
      query: (supervisorId) => `groups/group-requests/${supervisorId}`,
    }),
    createGroupRequest: builder.mutation<void, GroupRequest>({
      query: (data) => ({
        url: 'groups/group-requests',
        method: 'POST',
        body: data,
      }),
    }),
    acceptGroupRequest: builder.mutation<void, string>({
      query: (requestId) => `group-requests/${requestId}/accept`,
    }),
    createTask: builder.mutation<void, FormData>({
      query: (data) => ({
        url: `groups/${data.get("group")}/tasks`,
        method: 'POST',
        body: data,
      }),
    }),
    createGroupsTask: builder.mutation<void, FormData>({
      query: (data) => ({
        url: `groups/tasks`,
        method: 'POST',
        body: data,
      }),
    }),
    getTasks: builder.query<Task[], string>({
      query: (groupId) => `groups/${groupId}/tasks`,
    }),
    getSupervisorTasks: builder.query<Task[], string>({
      query: (supervisorId) => `groups/supervisor/tasks/${supervisorId}`,
    }),
    getChat: builder.query<Chat, string>({
      query: (groupId) => `groups/${groupId}/chat`,
    }),
    addMessageToChat: builder.mutation<void, ChatMessage>({
      query: (data) => ({
        url: `groups/${data.group}/chat/messages`,
        method: 'POST',
        body: data,
      }),
    }),
    submitTask: builder.mutation<void, { taskId: string, data: FormData }>({
      query: ({ taskId, data }) => ({
        url: `groups/tasks/${taskId}/submit-task`,
        method: 'PUT', // Use the appropriate HTTP method for updating
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateGroupMutation,
  useGetGroupsQuery,
  useGetGroupQuery,
  useGetStudentGroupQuery,
  useGetGroupRequestsQuery,
  useCreateGroupRequestMutation,
  useAcceptGroupRequestMutation,
  useCreateTaskMutation,
  useCreateGroupsTaskMutation,
  useGetChatQuery,
  useGetTasksQuery,
  useGetSupervisorTasksQuery,
  useAddMessageToChatMutation,
  useSubmitTaskMutation
} = groupsApi;
