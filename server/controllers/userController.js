const User = require("../models/userModel");
const authMiddleware = require("../middleware/authMiddleware");

const Register = async (req, res) => {
    try {
        const { name, email, username, password, role } = req.body;
        let existingEmailUser = await User.findOne({ email });
        if (existingEmailUser) {
            return res.status(409).send("A user with that email has already been registered!");
        }
        let existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).send("A user with that username has already been registered!");
        } else {
            let passwordDigest = await authMiddleware.hashPassword(password);
            const userData = await User.create({
                name,
                email,
                username,
                password: passwordDigest,
                role,
            });
            res.status(201).send('user created successfully');
        }

    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
};

const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send('Invalid data');
        }
        const user = await User.findOne({ username });
        if (user) {
            let passwordMatched = await authMiddleware.comparePassword(
                user.password,
                password
            );
            if (passwordMatched) {
                let payload = {
                    id: user.id,
                };
                let token = authMiddleware.createToken(payload);
                return res.status(200).json({ token });
            }
        }
        res.status(401).send('Invalid Credentials!');
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
};

const GetUserRole = async (req, res) => {
    try {
        const userId = res.locals.payload.id;
        const user = await User.findById(userId);
        if (user) {
            return res.status(200).json({ role: user.role });
        }
        res.status(404).send('User not found');
    } catch (error) {
        res.status(500).send('Internal Server Error');
        throw error;
    }
};

const UpdateUser = async (req, res) => {
    try {
        const userId = res.locals.payload.id;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).send("User not found");
        }
        res.status(204).send("User info updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to update user info. Please try again later.");
    }
};

const GetProviders = async (req, res) => {
    try {
        const providers = await User.find({ role: 'service_provider' }).populate('services')
        res.status(200).json({ status: 200, message: "Providers Fetched Successfully", providers: providers })
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    Login,
    Register,
    GetUserRole,
    UpdateUser,
    GetProviders,
};
