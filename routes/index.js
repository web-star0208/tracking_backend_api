var express = require('express');
var bcrypt = require('bcrypt');
var multer  = require('multer');
var moment = require('moment');
var router = express.Router();
var User = require('../models/User.js');
var Task = require('../models/Task.js');
var dateOptions = {month: 'long', day: 'numeric' };
var currentDate = new Date().getFullYear() +"-"+ ((new Date().getMonth()+1) > 9 ? (new Date().getMonth()+1) : ("0"+(new Date().getMonth()+1))) +"-"+ ((new Date().getDate()) > 9 ? (new Date().getDate()) : ("0"+(new Date().getDate())));
var storage = multer.diskStorage(
	{
		destination: './uploads/',
		filename: function ( req, file, cb ) {
			cb( null, file.originalname);
		}
	}
);
var upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Save User */
router.post('/signup', function(req, res, next) {
	User.findOne({ "email": req.body.email}, function(err, user){
		if(user) {
			res.json({
		      success: false,
		      errorMessage: "Same email is already registered."
		    });

		} else {

			req.body.avatar = "";
			req.body.workinglimit = "00:00";
			req.body.breaktime    = "00:00";
			req.body.snoozetime   = "00:00";
			req.body.remindertime = "00:00";
			req.body.soundstate = false;
			req.body.notificationstate = false;

			bcrypt.hash(req.body.password, 10, function(err, hash) {
				if (err) return next(err);
				req.body.password = hash;
				User.create(req.body, function (err, user) {
					if (err) return next(err);

					res.json({
						success: true,
						user_id: user._id,
						date: new Date().toLocaleDateString('en-US', dateOptions),
						tasks: [],
						avatar_url: user.avatar,
						workinglimit: "00:00",
						starttime: "00:00",
						endtime: "00:00",
					});
				});
			});
		}
	});
});

/* Login User */
router.post('/login', function(req, res, next) {
	var availableTime = "";
	User.findOne({ "email": req.body.email}, function(err, user){
		if (user) {
				bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
					if (err) return next(err);
					if (isMatch) {
						var response = {
							success: true,
							user_id: user._id,
							avatar_url: user.avatar,
							date: new Date().toLocaleDateString('en-US', dateOptions),
							workinglimit: user.workinglimit,
							starttime: "00:00",
							endtime: user.workinglimit
						};
						Task.find({user_id: user._id, date: currentDate}).sort({starttime:1, priority:1}).exec(function(err, tasks){
							if (err) return next(err);
							for(var i in tasks){
								availableTime = parseInt(availableTime) + parseInt(tasks[i].duration);
								if(i == 0) response.starttime = moment(parseInt(tasks[i].starttime)).format('h:mma');
								tasks[i].starttime = tasks[i].starttime ? moment(parseInt(tasks[i].starttime)).format('h:mma') : "";
								tasks[i].endtime = tasks[i].endtime ? moment(parseInt(tasks[i].endtime)).format('h:mma') : "";
								tasks[i].duration = tasks[i].duration ? moment.utc(moment.duration(parseInt(tasks[i].duration)).asMilliseconds()).format("HH:mm:ss") : "";
							}
							response.tasks = tasks;
							response.availableTime = availableTime ? moment.utc(moment.duration(availableTime).asMilliseconds()).format("HH:mm:ss") : "";
							res.json(response);
						})
					} else {
						res.json({
							success: false,
							errorMessage: "password is not correct."
						});
					}
				});
		} else {
			res.json({
			success: false,
			errorMessage: "email is not registered"
			});
		}
	});
	  
});

/* Create New Task */
router.post('/newtask', function(req, res, next) {
	var tasks = [];
	var availableTime = "";
	req.body.starttime = moment(req.body.starttime, 'h:mma').valueOf();
	req.body.date = currentDate;

	Task.find({user_id: req.body.user_id, date: currentDate}).sort({starttime:1, priority:1}).exec(function(err, exist_tasks){
		if (err) return next(err);

		User.findById(req.body.user_id, function(err, user){
			if (err) return next(err);
			if( user == null) return res.json({
				success: false,
				errorMessage: "User id is not invalid"
			});
			tasks = exist_tasks;
			if(exist_tasks[exist_tasks.length - 1] > req.body.starttime){
				return res.send({
					success: false,
					errorMessage: "Starttime is not last."
				});
			}

			Task.create(req.body, function(err, task){
				if (err) return next(err);
				tasks.push(task);

				var response = {
					success: true,
					date: new Date().toLocaleDateString('en-US', dateOptions),
					tasks: tasks,
					workinglimit: user.workinglimit,
					starttime: "00:00",
					endtime: user.workinglimit
				}
	
				for(var i in tasks){
					availableTime = parseInt(availableTime) + parseInt(tasks[i].duration);
					if(i == 0) response.starttime = moment(parseInt(tasks[i].starttime)).format('h:mma');
					tasks[i].starttime = tasks[i].starttime ? moment(parseInt(tasks[i].starttime)).format('h:mma') : "";
					tasks[i].endtime = tasks[i].endtime ? moment(parseInt(tasks[i].endtime)).format('h:mma') : "";
					tasks[i].duration = tasks[i].duration ? moment.utc(moment.duration(parseInt(tasks[i].duration)).asMilliseconds()).format("HH:mm:ss") : "";
				}
				response.availableTime = availableTime ? moment.utc(moment.duration(availableTime).asMilliseconds()).format("HH:mm:ss") : "";
				res.json(response);
			})

		})
	});
});

/* Create New Meeting */
router.post('/newmeeting', function(req, res, next) {
	var tasks = [];
	var availableTime = "";
	req.body.starttime = moment(req.body.starttime, 'h:mma').valueOf();
	req.body.date = currentDate;

	Task.find({user_id: req.body.user_id, date: currentDate}).sort({starttime:1, priority:1}).exec(function(err, exist_tasks){
		if (err) return next(err);

		User.findById(req.body.user_id, function(err, user){
			if (err) return next(err);
			if( user == null) return res.json({
				success: false,
				errorMessage: "User id is not invalid"
			});
			tasks = exist_tasks;
			if(exist_tasks[exist_tasks.length - 1] > req.body.starttime){
				return res.send({
					success: false,
					errorMessage: "Starttime is not last."
				});
			}

			Task.create(req.body, function(err, task){
				if (err) return next(err);
				tasks.push(task);

				var response = {
					success: true,
					date: new Date().toLocaleDateString('en-US', dateOptions),
					tasks: tasks,
					workinglimit: user.workinglimit,
					starttime: "00:00",
					endtime: user.workinglimit
				}
	
				for(var i in tasks){
					availableTime = parseInt(availableTime) + parseInt(tasks[i].duration);
					if(i == 0) response.starttime = moment(parseInt(tasks[i].starttime)).format('h:mma');
					tasks[i].starttime = tasks[i].starttime ? moment(parseInt(tasks[i].starttime)).format('h:mma') : "";
					tasks[i].endtime = tasks[i].endtime ? moment(parseInt(tasks[i].endtime)).format('h:mma') : "";
					tasks[i].duration = tasks[i].duration ? moment.utc(moment.duration(parseInt(tasks[i].duration)).asMilliseconds()).format("HH:mm:ss") : "";
				}
				response.availableTime = availableTime ? moment.utc(moment.duration(availableTime).asMilliseconds()).format("HH:mm:ss") : "";
				res.json(response);
			});

		})
	});
});

router.post('/newbreak', function(req, res, next){
	var tasks = [];
	var availableTime = "";
	req.body.starttime = moment(req.body.starttime, 'h:mma').valueOf();
	req.body.endtime = moment(req.body.endtime, 'h:mma').valueOf();
	req.body.date = currentDate;

	Task.find({user_id: req.body.user_id, date: currentDate}).sort({starttime:1, priority:1}).exec(function(err, exist_tasks){
		if (err) return next(err);

		User.findById(req.body.user_id, function(err, user){
			if (err) return next(err);
			if( user == null) return res.json({
				success: false,
				errorMessage: "User id is not invalid"
			});
			tasks = exist_tasks;

			var isExist = tasks.filter(function(task) { return task.type === 3; });

			if(isExist[0]){
				return res.send({
					success: false,
					errorMessage: "Already break is existed."
				});
			}

			Task.create(req.body, function(err, task){
				if (err) return next(err);
				tasks.push(task);

				var response = {
					success: true,
					date: new Date().toLocaleDateString('en-US', dateOptions),
					tasks: tasks,
					workinglimit: user.workinglimit,
					starttime: "00:00",
					endtime: user.workinglimit
				}
	
				for(var i in tasks){
					availableTime = parseInt(availableTime) + parseInt(tasks[i].duration);
					if(i == 0) response.starttime = moment(parseInt(tasks[i].starttime)).format('h:mma');
					tasks[i].starttime = tasks[i].starttime ? moment(parseInt(tasks[i].starttime)).format('h:mma') : "";
					tasks[i].endtime = tasks[i].endtime ? moment(parseInt(tasks[i].endtime)).format('h:mma') : "";
					tasks[i].duration = tasks[i].duration ? moment.utc(moment.duration(parseInt(tasks[i].duration)).asMilliseconds()).format("HH:mm:ss") : "";
				}
				response.availableTime = availableTime ? moment.utc(moment.duration(availableTime).asMilliseconds()).format("HH:mm:ss") : "";
				res.json(response);
			});

		})
	});
})

/* Get User History */
router.post('/history', function(req, res, next){
	Task.find({user_id: req.body.user_id, date: req.body.date}).sort({starttime:1, priority:1}).exec(function(err, tasks){
		if (err) return next(err);
		User.findById(req.body.user_id, function(err, user){
			if (err) return next(err);
			if( user == null) return res.json({
				success: false,
				errorMessage: "User id is not invalid"
			});

			var tempDate = req.body.date.split('-');

			var response = {
				date: new Date(tempDate[0], tempDate[1] - 1, tempDate[2]).toLocaleDateString('en-US', dateOptions),
				tasks: tasks,
				workinglimit: user.workinglimit,
				starttime: "00:00",
				endtime: user.workinglimit
			}

			for(var i in tasks){
				if(i == 0) response.starttime = moment(parseInt(tasks[i].starttime)).format('h:mma');
				tasks[i].starttime = tasks[i].starttime ? moment(parseInt(tasks[i].starttime)).format('h:mma') : "";
				tasks[i].endtime = tasks[i].endtime ? moment(parseInt(tasks[i].endtime)).format('h:mma') : "";
				tasks[i].duration = tasks[i].duration ? moment.utc(moment.duration(parseInt(tasks[i].duration)).asMilliseconds()).format("HH:mm:ss") : "";
			}
			res.json(response);
		});
	});
});

/* Get User Account */
router.post('/account', function(req, res, next) {
	User.findById(req.body.user_id, function (err, user) {
		if (err) return next(err);
		if( user == null) return res.json({
			success: false,
			errorMessage: "User id is not invalid"
		})
		res.json(user);
	});
});

/* Set Daily Working Limit */
router.post('/setworkinglimit', function(req, res, next) {
	User.findByIdAndUpdate(req.body.user_id, req.body, function (err, user) {
		if (err) return next(err);
		res.json({
			success: true
		});
	});
});

/* Get Daily Working Limit */
router.post('/workinglimit', function(req, res, next) {
	User.findById(req.body.user_id, function (err, user) {
		if (err) return next(err);
		if( user == null) return res.json({
			success: false,
			errorMessage: "User id is not invalid"
		})
		res.json({
			workinglimit: user.workinglimit
		});
	});
});

/* Set Reminder */
router.post('/setreminder', function(req, res, next) {
	User.findByIdAndUpdate(req.body.user_id, req.body, function (err, user) {
		if (err) return next(err);
		res.json({
			success: true
		});
	});
});

/* Get Reminder */
router.post('/reminder', function(req, res, next) {
	User.findById(req.body.user_id, function (err, user) {
		if (err) return next(err);
		if( user == null) return res.json({
			success: false,
			errorMessage: "User id is not invalid"
		})
		res.json({
			remindertime: user.remindertime
		});
	});
});

/* Udate User Avatar */
router.post('/updateavatar', upload.single('avatar'), function(req, res, next) {
	var avatarPath = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
  	User.findByIdAndUpdate(req.body.user_id, { avatar: avatarPath }, function (err, user) {
		if (err) return next(err);
		res.json({
			success: true,
			avatar_url: avatarPath
		});
	});
});

/* Select tasks */
router.post('/selecttracking', function(req, res, next){
	Task.find({user_id: req.body.user_id, date: currentDate, status: 1}).sort({starttime:1, priority:1}).exec(function(err, tasks){
		if (err) return next(err);
		User.findById(req.body.user_id, function(err, user){
			if (err) return next(err);
			if( user == null) return res.json({
				success: false,
				errorMessage: "User id is not invalid"
			})

			var response = {
				tasks: tasks,
			}

			for(var i in tasks){
				tasks[i].starttime = tasks[i].starttime ? moment(parseInt(tasks[i].starttime)).format('h:mma') : "";
				tasks[i].endtime = tasks[i].endtime ? moment(parseInt(tasks[i].endtime)).format('h:mma') : "";
			}
			res.json(response);
		});
	});
});

/* Get starting track */
router.post('/starttrack', function(req, res, next) {
	Task.findById(req.body.task_id, function (err, task) {
		if (err) return next(err);
		
		task.starttime = moment(parseInt(task.starttime)).format('h:mma');
		task.endtime ? moment(parseInt(task.endtime)).format('h:mma') : "";

	  	res.json(task);
	});
  });

/* Display User Avatar */
router.get('/uploads/:file_name', function(req, res){
	res.sendFile(req.url, { root: '.' });
});

router.post('/setsnooze', function(req, res, next){
	User.findByIdAndUpdate(req.body.user_id, req.body, function (err, user) {
		if (err) return next(err);
		res.json({
			success: true
		});
	});
});

router.post('/startworkingtimer', function(req, res, next){

	Task.findByIdAndUpdate(req.body.task_id, {status: 2}, function (err, task) {
		if (err) return next(err);
		res.json({
			success: true,
			status: 2,
		});
	});
});

router.post('/saveworkingtimer', function(req, res, next){

	var durationStamp = parseInt(new Date(req.body.endedtime) - new Date(req.body.startedtime));

	if(parseInt(durationStamp) < 0){
		return res.json({
			success: false,
			errorMessage: "Startedtime is wrong."
		});
	}
	
	Task.findById(req.body.task_id, function (err, task) {
		if (err) return next(err);
		task.status = 3;
		if(!isNaN(task.duration)){
			task.duration = parseInt(task.duration) +  durationStamp;
		}
		else{
			task.duration = durationStamp;
		}
		task.save(function(err, newTask){
			res.json({
				success: true,
				workingtime: moment.utc(moment.duration(parseInt(newTask.duration)).asMilliseconds()).format("HH:mm:ss"),
				status: 3,
			});
		});
	});
});

router.post('/deletetask', function(req, res, next){
	
	Task.deleteOne( { _id : req.body.task_id }, function(err, task){
		if (err) return next(err);
		res.json({
			success: true
		});
	} );
	
});

module.exports = router;
