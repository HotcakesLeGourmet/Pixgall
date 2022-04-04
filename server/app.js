import express from "express";
import postRoutes from "./routes/posts.routes.js";
import fileUpload from "express-fileupload";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const app = express();
const _dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }));

app.use(postRoutes);

console.log(_dirname);
app.use(express.static(join(_dirname, '../client/build')));
export default app;
