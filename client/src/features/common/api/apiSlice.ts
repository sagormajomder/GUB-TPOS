// apiSlice.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api', credentials: 'include' }),
    endpoints: () => ({}), // Empty initial endpoints
});
