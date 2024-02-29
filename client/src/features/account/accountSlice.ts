import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { User } from "./models/User";

export interface UserData {
    page: number;
    pageSize: number;
    count: number;
    data: User[]
}

interface AuthState {
    data: UserData;
    users: User[]
    user: null | User;
    loginUser: null | User; // for two-factor authentication
    accountLoading: boolean;
    error: undefined | string
}

const initialState = {
    data: {
        page: 1,
        pageSize: 10,
        count: 0,
        data: []
    },
    users: [],
    user: null,
    loginUser: null,
    accountLoading: true,
    error: undefined
} as AuthState;



export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setLoading(state) {
            state.accountLoading = true;
        },
        setUser(state, action: PayloadAction<User | null>) {
            state.accountLoading = false;
            state.user = action.payload;
        }
    }
});

export const {setUser, setLoading} = accountSlice.actions;

export default accountSlice.reducer;
