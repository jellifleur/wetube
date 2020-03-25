import express from "express";
import routes from "../routes";
import { registerView, postAddComment, deleteComment } from "../controller/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerVIew, registerView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.get(routes.deleteComment, deleteComment);

export default apiRouter;