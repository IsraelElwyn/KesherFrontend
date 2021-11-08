import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    name?: { first: string; last: string };
    role?: string;
    schools?: []; //only for staff
    children?: string[]; //only for parents
    currentSchool?: string;
    currentChild?: string;
    daysSinceChangePassword?: number;
}

const initialState: UserState = {};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.name = action.payload.name;
            state.role = action.payload.role;
            state.schools = action.payload.schools;
            state.children = action.payload.children;
            state.daysSinceChangePassword =
                action.payload.daysSinceChangePassword;
        },
        updateCurrentChild(state, action: PayloadAction<UserState>) {
            state.currentChild = action.payload.currentChild;
        },
        updateCurrentSchool(state, action: PayloadAction<UserState>) {
            state.currentSchool = action.payload.currentSchool;
        },
        updateDaysSinceChangePassword(state, action: PayloadAction<UserState>) {
            state.daysSinceChangePassword =
                action.payload.daysSinceChangePassword;
        },
        resetUser(state) {
            state.role = undefined;
            state = {};
        },
    },
});

export const {
    resetUser,
    setUser,
    updateCurrentChild,
    updateCurrentSchool,
    updateDaysSinceChangePassword,
} = UserSlice.actions;

export default UserSlice.reducer;
