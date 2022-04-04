import toast from "react-hot-toast";
import { usePosts } from "../context/postContext";
import { Post } from "../interfaces/postsContext.interface";
import { useNavigate } from "react-router-dom";

export function PostCard({ post }: { post: Post }) {
   const { deletePost }: { deletePost?: any } = usePosts();
   const navigate = useNavigate();
   const handleDelete = (id: any) => {
      toast((t) => (
         <div className="flex flex-col justify-center gap-4">
            <p>
               Do you want to delete? <strong>{id} </strong>
            </p>
            <div className=" flex justify-around">
               <button
                  className=" text-white rounded px-4 py-2 text-center bg-slate-600 hover:bg-slate-500"
                  onClick={() => {
                     deletePost(id);
                     toast.dismiss(t.id);
                  }}
               >
                  {" "}
                  Delete
               </button>
               <button
                  className="  rounded px-4 py-2 text-center border border-black hover:border-gray-500 hover:text-gray-500"
                  onClick={() => toast.dismiss(t.id)}
               >
                  Cancel
               </button>
            </div>
         </div>
      ));
   };
   return (
      <div
         className=" bg-zinc-800 text-white rounded-lg shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer"
         onClick={() => {
            navigate(`/posts/${post._id}`);
         }}
      >
         <div className="px-4- py-7 text-center flex flex-col n mx-2">
            <div className="flex justify-between ">
               <h3>{post.title}</h3>
               <button
                  className="bg-red-600 text-sm px-2 py-1 rounded-sm"
                  onClick={() => handleDelete(post._id)}
               >
                  Delete
               </button>
            </div>
            <p>{post.description}</p>
            {post.image && <img src={post.image.url} alt="post" />}
         </div>
      </div>
   );
}
