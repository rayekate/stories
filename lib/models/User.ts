import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      select: false, // Don't return password by default
    },
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    role: {
      type: String,
      enum: ["writer", "admin"],
      default: "writer",
    },
  },
  { timestamps: true }
);

// Encrypt password before saving
UserSchema.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

// Compare password
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
