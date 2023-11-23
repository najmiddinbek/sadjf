import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
  {
    school: String,
    manzili: String,
    newSinfi: String,
    newDarsQoldirish: String,
    telephoneRaqami: String,
    newIsm: String,
    MFY: String,
    isChecked: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;
