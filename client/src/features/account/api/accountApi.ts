// accountApiSlice.ts
import { User } from "../models/User";
import { apiSlice } from "../../common/api/apiSlice";

// types.ts
export interface RegistrationData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateProfileData {
  id: string;
  name: string;
}

export interface RegistrationResponse {
  id: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  id: string;
  email: string;
  role: string;
}

export const accountApi: any = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "/account/register",
        method: "POST",
        body: data,
      }),
    }),
    registerSupervisor: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "/account/register/supervisor",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginData>({
      query: (data) => ({
        url: "/account/login",
        method: "POST",
        body: data,
      }),
    }),
    updateProfile: builder.mutation<any, UpdateProfileData>({
      query: (data) => ({
        url: "/account/update-profile",
        method: "PUT",
        body: data,
      }),
    }),
    logout: builder.mutation<{}, {}>({
      query: (data) => ({
        url: "/account/logout",
        method: "POST",
        body: data,
      }),
    }),
    currentUser: builder.query<User, void>({
      query: () => "account/current-user",
    }),
    getSupervisors: builder.query<User[], void>({
      query: () => "account/supervisors",
    }),
  }),
});

export const {
  useRegisterMutation,
  useRegisterSupervisorMutation,
  useLoginMutation,
  useUpdateProfileMutation,
  useLogoutMutation,
  useCurrentUserQuery,
  useGetSupervisorsQuery
} = accountApi;
