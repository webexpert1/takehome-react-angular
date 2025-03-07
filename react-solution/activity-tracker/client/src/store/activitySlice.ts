import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Activity {
  id: string;
  message: string;
  timestamp: number;
}

interface ActivityState {
  activities: Activity[];
  searchTerm: string;
}

const initialState: ActivityState = {
  activities: [],
  searchTerm: '',
};

const activitySlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    addActivity: (state, action: PayloadAction<Activity>) => {
      state.activities.unshift(action.payload); // Add new activity at the beginning
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { addActivity, setSearchTerm } = activitySlice.actions;
export default activitySlice.reducer;
