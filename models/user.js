import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const UserCheme = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  secret: String, 
  img: {
    type:String,
    default:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/800px-User-avatar.svg.png',
  },
  role: {
    type: String,
    default: "member",
  },
  refreshToken: {
    type: String,
},
  phoneNumber: String
},{
  timestamps: true
});
UserCheme.methods = {
  isCorrectPassword: async function (password) {
      return await bcrypt.compare(password, this.password)
  }
}
export default mongoose.model("User", UserCheme);