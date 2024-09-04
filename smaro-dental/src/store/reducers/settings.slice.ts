import {createSlice} from "@reduxjs/toolkit";

const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        profile: {
            navigation: "edit-profile",
        },
        sidebar: {
            collapse: false,
        }
    },
    reducers: {
        setCollapse: (state) => {
            state.sidebar.collapse = !state.sidebar.collapse;
        },
        setEditProfile: (state, action) => {
            state.profile.navigation = action.payload
        }
    }
});

export const {setCollapse, setEditProfile} = settingsSlice.actions;

export default settingsSlice.reducer;
