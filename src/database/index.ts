import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/decks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
