import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
});

// Collection name হচ্ছে 'user'
const User = mongoose.models.user || mongoose.model("user", UserSchema);

export default User;
