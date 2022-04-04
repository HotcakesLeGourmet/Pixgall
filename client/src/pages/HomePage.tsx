import { Link } from "react-router-dom";
import { PostCard } from "../components/PostCard";
import { usePosts } from "../context/postContext";

function HomePage() {
   const { posts } = usePosts();
   return (
      <div className=" flex flex-col justify-center items-center w-screen min-h-screen">
         <div className=" flex justify-center gap-2 items-center">
            <div className="text-3xl font-bold underline">Welcome to PiKceles</div>
         </div>
         <div className="grid grid-cols-3 gap-2 my-8 w-full ">
         {posts.map((post) => (
            <PostCard key={post._id} post={post}/>
         ))}
         </div>
         <Link to="/new">Go to New</Link>
      </div>
   );
}

export default HomePage;
