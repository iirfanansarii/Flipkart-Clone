// import mongoose
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// user model schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hashPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    contactNumber: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

// virtual method to bcrypt password
userSchema.virtual("password").set(function (password) {
  this.hashPassword = bcrypt.hashSync(password, 10);
});

// compare password while sign in
userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hashPassword);
  },
};

// virtual method to get full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// export model
module.exports = mongoose.model("User", userSchema);

// Note: timestamps is second object of the model
