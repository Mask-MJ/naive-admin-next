export interface PostList {
  status: string;
  postId: string;
  postSort: number;
}

export interface PostParams {
  postCode?: string;
  postName?: string;
  status?: string;
}
