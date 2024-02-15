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