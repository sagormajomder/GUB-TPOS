import { Notice } from '../../thesis-committees/thesisCommitteeSlice';
import { apiSlice } from './apiSlice';


export const groupsApi: any = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNotice: builder.mutation<void, Notice>({
      query: (data) => ({
        url: `committees/notices`,
        method: 'POST',
        body: data,
      }),
    })
  }),
});

export const {
  useCreateNoticeMutation,
} = groupsApi;
