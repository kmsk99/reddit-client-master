import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { getSubredditPosts, getPostComments } from '../api/reddit';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import type { RedditPost, RedditComment } from '../api/reddit';
import type { RootState } from './store';

interface RedditsState {
  posts: RedditPost[];
  error: boolean;
  isLoading: boolean;
  searchTerm: string;
  selectedSubreddit: string;
}

const initialState: RedditsState = {
  posts: [],
  error: false,
  isLoading: false,
  searchTerm: '',
  selectedSubreddit: '/r/pics/',
};

const redditSlice = createSlice({
  name: 'redditPosts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<RedditPost[]>) {
      state.posts = action.payload;
    },
    startGetPosts(state) {
      state.isLoading = true;
      state.error = false;
    },
    getPostsSuccess(state, action: PayloadAction<RedditPost[]>) {
      state.isLoading = false;
      state.posts = action.payload;
    },
    getPostsFailed(state) {
      state.isLoading = false;
      state.error = true;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setSelectedSubreddit(state, action: PayloadAction<string>) {
      state.selectedSubreddit = action.payload;
      state.searchTerm = '';
    },
    toggleShowingComments(state, action: PayloadAction<number>) {
      state.posts[action.payload].showingComments =
        !state.posts[action.payload].showingComments;
    },
    startGetComments(state, action: PayloadAction<number>) {
      // If we're hiding comment, don't fetch the comments.
      state.posts[action.payload].showingComments =
        !state.posts[action.payload].showingComments;
      if (!state.posts[action.payload].showingComments) {
        return;
      }
      state.posts[action.payload].loadingComments = true;
      state.posts[action.payload].errorComments = false;
    },
    getCommentsSuccess(
      state,
      action: PayloadAction<{ index: number; comments: RedditComment[] }>
    ) {
      state.posts[action.payload.index].loadingComments = false;
      state.posts[action.payload.index].comments = action.payload.comments;
    },
    getCommentsFailed(state, action: PayloadAction<number>) {
      state.posts[action.payload].loadingComments = false;
      state.posts[action.payload].errorComments = true;
    },
  },
});

export const {
  setPosts,
  getPostsFailed,
  getPostsSuccess,
  startGetPosts,
  setSearchTerm,
  setSelectedSubreddit,
  toggleShowingComments,
  getCommentsFailed,
  getCommentsSuccess,
  startGetComments,
} = redditSlice.actions;

export default redditSlice.reducer;

// This is a Redux Thunk that gets posts from a subreddit.
export const fetchPosts =
  (subreddit: string): ThunkAction<void, RedditPost[], unknown, AnyAction> =>
  async (dispatch) => {
    try {
      dispatch(startGetPosts());
      const posts = await getSubredditPosts(subreddit);

      // We are adding showingComments and comments as additional fields to handle showing them when the user wants to. We need to do this because we need to call another API endpoint to get the comments for each post.
      const postsWithMetadata = posts.map((post) => ({
        ...post,
        showingComments: false,
        comments: [],
        loadingComments: false,
        errorComments: false,
      }));
      dispatch(getPostsSuccess(postsWithMetadata));
    } catch (error) {
      dispatch(getPostsFailed());
    }
  };

export const fetchComments =
  (
    index: number,
    permalink: string
  ): ThunkAction<void, RedditPost[], unknown, AnyAction> =>
  async (dispatch) => {
    try {
      dispatch(startGetComments(index));
      const comments = await getPostComments(permalink);
      dispatch(getCommentsSuccess({ index, comments }));
    } catch (error) {
      dispatch(getCommentsFailed(index));
    }
  };

export const selectReddit = (state: RootState) => state.reddit;
export const selectPosts = (state: RootState) => state.reddit.posts;
export const selectSearchTerm = (state: RootState) => state.reddit.searchTerm;
export const selectSelectedSubreddit = (state: RootState) =>
  state.reddit.selectedSubreddit;

export const selectFilteredPosts = createSelector(
  [selectPosts, selectSearchTerm],
  (posts, searchTerm) => {
    if (searchTerm !== '') {
      return posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return posts;
  }
);
