import { HomePage, PostForm, NotFoundPage } from "./pages";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { PostProvider } from "./context/postContext";
import { Toaster } from "react-hot-toast";
function App() {
   return (
      <PostProvider>
         <>
            <Routes>
               <Route path="/" element={<HomePage />}></Route>
               <Route path="/new" element={<PostForm />}></Route>
               <Route path="/posts/:id" element={<PostForm />}></Route>
               <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
            <Toaster />
         </>
      </PostProvider>
   );
}

export default App;
