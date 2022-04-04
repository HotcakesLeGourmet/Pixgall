import Post from "../models/post.model.js";
import { DeleteImage as deleteCloudImage, UploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra";
export const getPosts = async (req, res) => {
   try {
      const posts = await Post.find();
      res.send(posts);
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const createPost = async (req, res) => {
   try {
      let image;
      const { title, description } = req.body;

      if (req.files?.image) {
         const result = await UploadImage(req.files.image.tempFilePath);
         await fs.remove(req.files.image.tempFilePath);
         image = { url: result.url, public_id: result.public_id };
         const post = new Post({ title, description, image });
         await post.save();
         res.send(post);
      }else {
         const post = new Post({ title, description });
         await post.save();
         res.send(post);
      }
     
   } catch (error) {
      return res.status(500).json({ message: error.message});
   }
};

export const updatePost = async (req, res) => {
   try {
      const { id } = req.params;
      const { title, description, image } = req.body;

      const post = await Post.findByIdAndUpdate(
         id,
         {
            title,
            description,
            image,
         },
         { new: true }
      );
      res.send(post);
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const deletePost = async (req, res) => {
   try {
      const postRemoved = await Post.findByIdAndDelete(req.params.id);
      if (!postRemoved) return res.status(404).json({ message: "Post not found" });
      if(postRemoved.image.public_id) {
         await deleteCloudImage(postRemoved.image.public_id);
      }
      return res.sendStatus(204);
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const deleteAllPosts = async (req, res) => {
   try {
      await Post.deleteMany();
      res.send("All posts deleted");
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};

export const getPost = async (req, res) => {
   try {
      const { id } = req.params;
      const post = await Post.findById(id);
      res.send(post);
   } catch (error) {
      return res.status(500).json({ message: error.message });
   }
};
export const createDefaultPost = async (req, res) => {};
