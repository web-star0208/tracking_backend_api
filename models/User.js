var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  avatar: String,
  workinglimit: String,
  remindertime: String,
  breaktime: String,
	snoozetime: String,
	soundstate: Boolean,
	remindertime: String,
	notificationstate: Boolean,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
