export const API_ROOT: string = 'https://www.reddit.com';

export interface SubredditPosts {
  data: { children: { data: RedditPost }[] };
}

export interface RedditPost {
  id: number;
  ups: number;
  title: string;
  url: string;
  author: string;
  created_utc: number;
  permalink: string;
  num_comments: number;
  showingComments: boolean;
  comments: RedditComment[];
  loadingComments: boolean;
  errorComments: boolean;
}

export interface Subreddits {
  data: { children: { data: Subreddit }[] };
}

export interface Subreddit {
  id: number;
  url: string;
  icon_img: string;
  display_name: string;
  primary_color: string;
}

export interface PostComment {
  data: { children: { data: RedditComment }[] };
}

export interface RedditComment {
  id: number;
  author: string;
  created_utc: number;
  body: string;
}

export const getSubredditPosts = async (subreddit: string) => {
  const response = await fetch(`${API_ROOT}${subreddit}.json`);
  const json: SubredditPosts = await response.json();

  return json.data.children.map((post) => post.data);
};

export const getSubreddits = async () => {
  const response = await fetch(`${API_ROOT}/subreddits.json`);
  const json: Subreddits = await response.json();

  return json.data.children.map((subreddit) => subreddit.data);
};

export const getPostComments = async (permalink: string) => {
  const response = await fetch(`${API_ROOT}${permalink}.json`);
  const json: PostComment[] = await response.json();

  return json[1].data.children.map((subreddit) => subreddit.data);
};
