import { useState, useContext, createContext, useEffect } from "react";
import {
   getPostsRequest,
   createPostRequest,
   deletePostRequest,
   getPostRequest,
   updatePostRequest,
} from "../api/posts";
import { Globalstate, Post } from "../interfaces/postsContext.interface";

export const postsContext = createContext(null as unknown as Globalstate);

export const usePosts = () => {
   const context = useContext(postsContext);
   return context;
};

export function PostProvider({ children }: { children: JSX.Element }) {
   const [posts, setPosts] = useState([] as any[]);

   const getPosts = async () => {
      const res = await getPostsRequest();
      setPosts(res.data);
   };

   const createPost = async (post: Post) => {
      try {
         const res = await createPostRequest(post);
         setPosts([...posts, res.data]);
      } catch (err) {
         console.log(err);
      }
   };

   const deletePost = async (id: string) => {
      const res = await deletePostRequest(id);
      if (res.status === 204) {
         setPosts(posts.filter((post: Post) => post._id !== id));
      }
   };

   const getPost = async (id: string): Promise<Post> => {
      const res = await getPostRequest(id);
      return res.data;
   };

   const updatePost = async (id: string, post: Post) => {
      const res = await updatePostRequest(id, post);
      if (res.status === 200) {
         setPosts(posts.map((post: Post) => (post._id === id ? res.data : post)));
      }
   };
   useEffect(() => {
      getPosts();
   }, []);

   return (
      <postsContext.Provider
         value={{ posts, setPosts, createPost, deletePost, getPost, updatePost }}
      >
         {children}
      </postsContext.Provider>
   );
}
