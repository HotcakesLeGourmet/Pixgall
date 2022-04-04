import axios from "axios";
import {Post} from '../interfaces/postsContext.interface'
export const getPostsRequest = async () => await axios.get("/posts");

export const createPostRequest = async (post:Post) => {
    const form  = new FormData();

    for (let key in post){
        form.append(key, post[key]);
    }
    return  await axios.post("/posts", form,{
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const deletePostRequest = async (id:string) => {
    const response = await axios.delete(`/posts/${id}`)
    return response
}

export const getPostRequest = async (id:string) => {
    const response = await axios.get(`/posts/${id}`)
    return response
}

export const updatePostRequest = async (id:string, post:Post) => {
    const response = await axios.put(`/posts/${id}`, post)
    return response
}