import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    bio:{
        type:String,
    },
    password: {
        type: String,
    },
    profilePicture: {
        type: String,
        default: ''
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post' // This tells Mongoose to use the Post model for population
    }],

}, {
    timestamps: true  // Adds createdAt and updatedAt timestamps
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
})
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

// Create the model from the schema and export it
const User = mongoose.model('User', userSchema);

export default User