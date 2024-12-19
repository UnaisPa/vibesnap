import User from "../../models/userModel.js";
import { generateToken } from "../../utils/generateToken.js";

const authController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email) {
            const user = await User.findOne({ email: email });
            if (user) {
                const checkPassword = await User.matchPassword(password);
                if (checkPassword) {
                    // generate JWT token
                    const token = await generateToken(user._id);

                    //remove password from the response
                    const { password: pass, ...rest } = user._doc;
                    res.status(200).json({ status: true, user: rest, token });
                } else {
                    res.status(400).json({ status: false, message: 'Invalid password. Please try again.' })
                }

            } else {
                res.status(404).json({ status: false, message: 'User not found. Please check your credentials.' })
            }
        } else {
            res.status(400).json({ status: false, message: 'Email required' });
        }

    } catch (err) {
        console.log(err);
    }
}

export {authController}