import mongoose from "mongoose";

const savedCity = new mongoose.Schema({
  id: {
    type: String,
  },
  city: {
    type: String,
  },
  coords: {
    lat: {
      type: String,
    },
    lng: {
      type: String,
    },
  },
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    saved: [savedCity],
  },
  { timestamps: true } //timestamp
);

const User = mongoose.model("Users", userSchema);

export default User;
