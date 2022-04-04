import { Link, useParams, useNavigate } from "react-router-dom";
import { usePosts } from "../context/postContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

function PostForm() {
   const { createPost, getPost, updatePost } = usePosts();
   const navigate = useNavigate();
   const params = useParams();
   const [post, setPost] = useState({
      title: "Totoro",
      description: "My champ",
   });

   useEffect(() => {
      (async () => {
         if (params.id) {
            
            const res = await getPost(params.id);
            setPost(res);
         }
      })();
   }, []);

   return (

      <div className=" flex justify-center items-center h-screen">
         <div className="flex flex-col bg-zinc-700 p-10 shadow-md shadow-black">
            <header className=" flex justify-between items-center">
               <h3>New Post</h3>
               <Link to="/" className=" text-gray-400 hover:text-gray-300 text-sm">
                  Go back
               </Link>
            </header>
            <Formik
               initialValues={post}
               validationSchema={Yup.object({
                  title: Yup.string().required("An title is required"),
                  description: Yup.string().required("You must describe your your image"),
               })}
               onSubmit={async (values, actions) => {
                  if (params.id) {
                     await updatePost(params.id, values);
                  } else {
                     await createPost(values);
                  }
                  navigate("/");
               }}
               enableReinitialize={true}
            >
               {({ handleSubmit, setFieldValue }) => (
                  <Form className="flex flex-col gap-y-2  p-4 rounded">
                     <label htmlFor="title" className="text-white text-sm font-bold block ">
                        Title
                     </label>
                     <Field name="title" placeholder="title" className=" rounded px-2 " />
                     <ErrorMessage component="p" name="title" className="text-xs text-" />
                     <label htmlFor="description" className="text-white text-sm font-bold">
                        Description
                     </label>
                     <Field
                        component="textarea"
                        name="description"
                        placeholder="description"
                        className=" rounded px-2 "
                        row={3}
                     />
                     <ErrorMessage component="p" name="description" className=" text-xs" />
                     <input
                        type="file"
                        name="image"
                        className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                        onChange={(e) => {
                           if (e.target.files) {
                              setFieldValue("image", e.target.files[0]);
                           }
                        }}
                     />
                     <button
                        type="submit"
                        className=" bg-slate-600 rounded-lg text-white hover:bg-slate-500 px-4 py-2 mt-2 focus:outline-none disabled:bg-slate-400"
                     >
                        Save
                     </button>
                  </Form>
               )}
            </Formik>
         </div>
      </div>
   );
}

export default PostForm;
