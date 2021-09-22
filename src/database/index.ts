import mongoose from "mongoose";

mongoose.connect("mongodb://mongo-decks:27017/decks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
