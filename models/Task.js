var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
  user_id: String,
  date: { type: Date },
  type: Number,
  name: String,
  title: String,
  description: String,
  priority: Number,
  pushnotification: String,
  customnotification: String,
  starttime: String,
  endtime: String,
  duration: String,
  status: Number,
});

module.exports = mongoose.model('Task', taskSchema);