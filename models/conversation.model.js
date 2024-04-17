import mongoose from "mongoose";

const conversationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    conversationType: {
      type: String,
      enum: ["group", "single"],
      default: "single",
      lowercase: true,
    },
    messagesIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Message",
    },
    userIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", conversationSchema);
