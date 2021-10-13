import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSubreddits } from '../api/reddit';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import type { Subreddit } from '../api/reddit';
import type { RootState } from './store';

interface SubredditsState {
  subreddits: Subreddit[];
  error: boolean;
  isLoading: boolean;
}

const initialState: SubredditsState = {
  subreddits: [],
  error: false,
  isLoading: false,
};

const subRedditSlice = createSlice({
  name: 'subreddits',
  initialState,
  reducers: {
    startGetSubreddits(state) {
      state.isLoading = true;
      state.error = false;
    },
    getSubredditsSuccess(state, action: PayloadAction<Subreddit[]>) {
      state.isLoading = false;
      state.subreddits = action.payload;
    },
    getSubredditsFailed(state) {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const { getSubredditsFailed, getSubredditsSuccess, startGetSubreddits } =
  subRedditSlice.actions;

export default subRedditSlice.reducer;

// This is a Redux Thunk that gets subreddits.
export const fetchSubreddits =
  (): ThunkAction<void, Subreddit[], unknown, AnyAction> =>
  async (useAppDispatch) => {
    try {
      useAppDispatch(startGetSubreddits());
      const subreddits = await getSubreddits();
      useAppDispatch(getSubredditsSuccess(subreddits));
    } catch (error) {
      useAppDispatch(getSubredditsFailed());
    }
  };

export const selectSubreddits = (state: RootState) =>
  state.subreddits.subreddits;
