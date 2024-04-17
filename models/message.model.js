import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    body: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: null,
    },
    seenIds: {
      type: [mongoose.Schema.Types.ObjectId],
      default: null,
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Conversation id is required"],
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Sender id is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", messageSchema);
