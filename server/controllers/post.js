import PostModel from "../models/PostModel.js";
import UserModel from "../models/UserModel.js";

export const getFeedPosts = async (req, res) => {
    try {
        const feedPosts = await PostModel.find();

        res.status(200).json(feedPosts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userPosts = await PostModel.find({ userId: userId });

        if (userPosts.length == 0) {
            return res.status(404).json({ message: "User has no posts" });
        }

        res.status(200).json(userPosts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    try {
        const {
            userId,
            picturePath,
            location,
            description,
            likes,
            comments
        } = req.body;

        const user = await UserModel.findById(userId);
        const newPost = new PostModel({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location,
            description,
            picturePath,
            userPicturePath: user.picturePath,
            likes,
            comments
        });

        const savedUser = await newPost.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const likePost = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.body.userId;

        const postToUpdate = await PostModel.findById(id);
        if (!postToUpdate) {
            return res.status(404).json({ message: "Post not found" });
        }

        const userWhoLiked = await UserModel.findById(userId);
        if (!userWhoLiked) {
            return res.status(404).json({ message: "User not found" });
        }

        const likes = postToUpdate.likes;

        if (likes.includes(userId)) {
            likes.splice(likes.indexOf(userId), 1);
        }
        else {
            likes.push(userId);
        }

        const updatedPost = await PostModel.findByIdAndUpdate(id, { likes: likes }, { new: true });

        res.status(203).json(updatedPost);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};