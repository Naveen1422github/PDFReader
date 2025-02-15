import User from "../models/UserModel.js";

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({
        name,
        email,
        password,
    });
    try {
        await user.save();
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        console.error("Error in Create data:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const login = async (req, res) => { 
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Error in Fetching data:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}