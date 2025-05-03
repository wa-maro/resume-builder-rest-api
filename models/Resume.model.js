import mongoose from "mongoose";

// define a Resume schema
const ResumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true, default: "" },
    declaration: {
      statement: { type: String, trim: true, default: "" },
      signature: { type: String, trim: true, default: "" },
      date: {
        type: String,
        trim: true,
        validate: {
          validator: function (v) {
            return (
              !v || /^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/.test(v)
            );
          },
          message: (props) =>
            `${props.value} is not a valid date. Use DD/MM/YYYY format.`,
        },
      },
    },
    
  },
  { timestamps: true }
);

// define a Resume model
const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;
