import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Başında ve sonunda boşlukları kaldır
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Küçük harfe çevir
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Şifre minimum 6 karakter olmalı
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Sadece "user" ve "admin" olabilir
      default: "user",
    },
    isAdmin: {
      type: Boolean,
      default: false, // Varsayılan olarak admin değil
    },
    phone: {
      type: String,
      default: "",
    },
    profileImage: {
      type: String, // Kullanıcı profil fotoğrafı URL olarak kaydedilecek
      default: "",
    },
  },
  { timestamps: true }
);

// 🔑 **Şifreyi Kaydetmeden Önce Hashle**
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;

