import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";

// Home

export const home = async(req, res) => {
    try {
        const videos = await Video.find({}).sort({"_id": -1});
        res.render("home", { pageTitle: "Home", videos });
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: [] });
    }
};

// Search

export const search = async(req, res) => {
    const {
        query: { term: searchingBy }
    } = req;
    let videos = [];
    try {
        videos =await Video.find({
            title:{ $regex: searchingBy, $options: "i" }
        });
    } catch (error) {
        console.log(error);
    }
    res.render("search", { pageTitle: "Search", searchingBy, videos });
}

// Upload

export const getUpload = (req, res) =>
    res.render("upload", { pageTitle: "Upload" });

export const postUpload = async(req, res) => {
    const {
        body: { title, description },
        file: { location }
    } = req;
    const newVideo = await Video.create({
        fileUrl: location,
        title,
        description,
        creator: req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    req.flash("success", "Video uploaded.");
    res.redirect(routes.videoDetail(newVideo.id));
}

// Video Detail

export const videoDetail = async(req, res) => {
    const {
        params: { id }
    } = req;

    try {
        const video = await Video.findById(id)
                        .populate("creator")
                        .populate({
                            path:"comments",
                            populate: { path:"creator"}
                        })
        const updatedDate = 
            `${video.createdAt.getFullYear()}.${video.createdAt.getMonth()+1 < 10 ? `0${video.createdAt.getMonth()+1}` : video.createdAt.getMonth()+1}.${video.createdAt.getDate() < 10 ? `0${video.createdAt.getDate()}` : video.createdAt.getDate()}`;

        video.updatedDate = updatedDate;
        res.render("videoDetail", { pageTitle: video.title, video });
    } catch (error) {
        req.flash("error", "Video not found.");
        res.redirect(routes.home);
    }
}

// Edit Video

export const getEditVideo = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        if (video.creator.toString() !== req.user.id) {
            throw Error();
        } else {
            res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
        }
    } catch (error) {
        req.flash("error", "Can't edit video.");
        res.redirect(routes.home);
    }
}

export const postEditVideo = async(req, res) => {
    const {
        params: { id },
        body: { title, description }
    } = req;
    try {
        await Video.findByIdAndUpdate({ _id:id }, { title, description });
        req.flash("success", "Video edited.");
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        req.flash("error", "Can't edit video.");
        res.redirect(routes.home);
    }
};

// Delete Video

export const deleteVideo = async(req, res) => {
    const {
        params: {id}
    } = req;
    try {
        const video = await Video.findById(id);
        if (video.creator.toString() !== req.user.id) {
            throw Error();
        } else {
            await Video.findByIdAndRemove({_id: id});
            req.flash("success", "Video deleted.");
        }
    } catch (error) {
        console.log(error);
        req.flash("error", "Can't delete video.");
    }
    res.redirect(routes.home);
}

// Register Video View

export const registerView = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        video.views += 1;
        video.save();
        res.status(200);
    } catch (error) {
        res.status(400);
    } finally {
        res.end();
    }
}

// Add Comment

export const postAddComment = async (req, res) => {
    const {
        params: { id },
        body: { comment },
        user
    } = req;
    try {
        const video = await Video.findById(id);
        const newComment = await Comment.create({
            text: comment,
            creator: user.id
        });
        video.comments.push(newComment.id);
        video.save();
        res.json({ id: newComment.id });
        res.status(200);
    } catch (error) {
        res.status(400);
    } finally {
        res.end();
    }
}

// Delete Comment

export const deleteComment = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        await Comment.findByIdAndRemove({_id: id});
        res.status(200);
    } catch (error) {
        res.status(400);
    } finally {
        res.end();
    }
}