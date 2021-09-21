import mongoose from "mongoose";

mongoose.connect("mongodb://mongo:123456@localhost:27017/decks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
