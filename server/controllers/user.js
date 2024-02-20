import UserModel from "../models/UserModel.js";

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const friendIds = user.friends;
        if (friendIds.length == 0) {
            return res.status(404).json({ message: "User has no friends" });
        }

        const friends = [];
        const promises = friendIds.map(async friendId => {
            const iterFriend = await UserModel.findById(friendId);

            if (!iterFriend) {
                return res.status(404).json({ message: "User not found" });
            }

            friends.push(iterFriend);
        });

        Promise.all(promises).then(() => {
            res.status(200).json(friends);
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addRemoveFriend = async (req, res) => {
    try {
        const id = req.params.id;
        const friendId = req.params.friendId;

        const user = await UserModel.findById(id);
        const friend = await UserModel.findById(friendId);
        if (!user || !friend) {
            return res.status(404).json({ message: "User not found" });
        }

        const alreadyFriends = user.friends.includes(friendId);
        if (alreadyFriends) {
            user.friends.splice(user.friends.indexOf(friendId), 1);
        }
        else {
            user.friends.push(friendId);
        }

        const updatedUser = await UserModel.findByIdAndUpdate(id, { friends: user.friends }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};