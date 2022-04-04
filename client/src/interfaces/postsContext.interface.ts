export interface Globalstate {
   posts: Post[];
   setPosts: React.Dispatch<React.SetStateAction<any[]>>;
   getPosts?: () => Promise<any>;
   createPost: CreatePost;
   deletePost: DeletePost;
   getPost: GetPost;
   updatePost: UpdatePost;
}

export interface CreatePost {
   (post:Post): Promise<void>
}
export interface DeletePost {
   ( id: string) : Promise<void>
}
export interface GetPost {
   ( id: string) : Promise<Post>
}
export interface UpdatePost {
   ( id: string, post: Post) : Promise<void>
}
export interface Post {
   [key: string]: any;
   description: string;
   title: string;
   _id?: string;
   image?: {
      url: string;
      public_id: string;
   }
}
