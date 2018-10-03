rest api 

post /signup

{
	name: string,
	email: string,
	password: string
}

response // current date
{
	success: true/false,
	errorMessage: string,
	user_id: string,
	avatar_url: string,
	date: string, /// current date
	tasks: [

	],
	workinglimit: string,
	availibletime: string,
	starttime: string,
	endtime: string
}

post /login

{
	name: string,
	password: string
}

response // current date
{
	success: true/false,
	errorMessage: string,
	user_id: string,
	avatar_url: string,
}

post /gethomedata
{
	user_id: string
}
response 
{
	date: string, /// current date ex: ( June 18 )
	tasks: [
		{
			title: string,
			description: string,
			starttime: string,
			time: string, //// ex : (00:00:00) // default: 00:00:00
			priority: 1/2/3,
			type: int, ////(1/2/3) 1: meeting, 2: task, 3: break
			status: int, ////(1/2/3/4) 1: priority 2: starting, 3: pause, 4: completed
			duration: string
		},
		{
			title: "Break",
			type: 3,
			duration: string /// ex: (02.00:03.00pm) or 02:00pm~03:00pm
		}
	],
	workinglimit: string,  // workinglimit = endtime - starttime - breaktime
	availibletime: string,/// availibletime = workinglimit - working all time /// default: 00:00:00
	starttime: string, // first task start time
	endtime: string    // Daily working limit time
}


post /newmeeting 
{
	type: 1,  		////(1/2/3) 1: meeting, 2: task, 3: break
	starttime: string, ////  ex: ( new Date() )
	durariontime: string ("1:00"), // standard time: ( 1:00 )
	title: string,
	description: string,
	priority: 1/2/3,
	pushnotification: true/false,
	customnotification: string,
	user_id: string
}
response  // current date
{
	success: true/false,
	errorMessage: string,
	date: string, /// current date  ex: ( June 18 )
	meeting_id: string,
	meeting_title: string,
	issamepriority: true/false,
	// if issamepriority == true ( time is same and priority is same ) false return nothing
	sameprioritytask: {
		title: string,
		task_id: string
	}
	////////////////
	tasks: [
		{
			title: string,
			description: string,
			starttime: string,  // ex: ( 10:30am)
			time: string,       // ex : (00:00:00)
			priority: 1/2/3,
			type: int, ////(1/2/3) 1: meeting, 2: task, 3: break
			status: int ////(1/2/3) 1: starting, 2: pause, 3: completed
		},
		{
			title: "Break",
			type: 3,
			duration: string /// ex: (02.00:03.00pm) or 02:00pm~03:00pm
		}
	],
	workinglimit: string,
	availibletime: string,
	starttime: string,   // first task start time
	endtime: string     // Daily working limit time
}
post /saveugency
{
	task_id: string,
	ugency: 2
}
response
{
	success: true/false,
	tasks:[
		{},{}
	]
}

post /newtask
{
	type: 2,
	starttime: string,   // ex: ( new Date())
	durationtime: string, //ex: ( 0:30 ) duration time
	title: string,
	description: string,
	priority: 1/2/3,
	pushnotification: true/false,
	customnotification: string,
	user_id: string,
	ugency: 1
}
response   // current date
{
	success: true/false,
	errorMessage: string,
	task_id: string,
	task_title: string,
	issamepriority: true/false,
	// if issamepriority == true ( time is same and priority is same )
	sameprioritytask: {
		title: string,
		task_id: string
	}
	////////////////
	date: string, /// current date  ex: ( June 18 )
	tasks: [
		{
			title: string,
			description: string,
			starttime: string,  // ex: ( 10:30am)
			time: string,				// ex: (00:00:00)
			priority: 1/2/3,
			type: int, ////(1/2/3) 1: meeting, 2: task, 3: break
			status: int ////(1/2/3) 1: starting, 2: pause, 3: completed
		},
		{
			title: "Break",
			type: 3,
			duration: string /// ex: (02.00:03.00pm) or 02:00pm~03:00pm
		}
	],
	workinglimit: string,
	availibletime: string,
	starttime: string,   // first task start time
	endtime: string     // Daily working limit time
}

post /newbreak
{
	user_id: string,
	starttime: string,
	endtime: string,
	type: 3
}
response
{
	success: true/false,
	errorMessage: string,
	date: string, /// current date  ex: ( June 18 )
	tasks: [
		{
			title: string,
			description: string,
			starttime: string,  // ex: ( 10:30am)
			time: string,		// ex: (00:00:00)
			priority: 1/2/3,
			type: int, ////(1/2/3) 1: meeting, 2: task, 3: break
			status: int ////(1/2/3) 1: starting, 2: pause, 3: completed
		},
		{
			title: "Break",
			type: 3,
			starttime: string, /// ex: (02.00:03.00pm) or 02:00pm~03:00pm
			endtime: string
		}
	],
	workinglimit: string,
	availibletime: string,
	starttime: string,   // first task start time
	endtime: string     // Daily working limit time
}

post /history
{
	date: string,
	user_id: string
}
response
{
	date: string, /// selected date (June 12)
	tasks: [
		{
			title: string,
			description: string,
			starttime: string,   // ex: (10:30am)
			time: string,   // ex: (00:00:00)
			priority: 1/2/3,
			type: int, ////(1/2/3) 1: meeting, 2: task, 3: break
			status: int ////(1/2/3) 1: starting, 2: pause, 3: completed
		},
		{
			title: "Break",
			type: 3,
			duration: string /// ex: (02.00:03.00pm) or 02:00pm~03:00pm
		}
	],
	workinglimit: string,
	availibletime: string,
	starttime: string,   // first task start time
	endtime: string     // Daily working limit time
}

post /account 
{
	user_id: string
}
response
{
	name: string,
	avatar: string,
	breaktime: string,  // ex: 00:00
	snoozetime: string,  // ex: 00:00
	workinglimit: string, //ex: 00:00
	soundstate: true/false,
	remindertime: string,  //ex: 00:00
	notificationstate: true/false
}

post /updateavatar
{
	user_id: string,
	avatar: file(base64)
}
response
{
	avatar_url: string,
	success: true/false,
	errorMessage: ""
}

post /setworkinglimit
{
	user_id: string,
	workinglimit: string
}
response
{
	success: true/false,
	errorMessage: string
}

post /workinglimit
{
	user_id: string
}
response
{
	avatar_url: string,
	workinglimit: string
}

post /setreminder
{
	user_id: string,
	remindertime: string
}
response
{
	success: true/false,
	errorMessage: string
}

post /reminder
{
	user_id: string
}
response
{
	avatar_url: string,
	remindertime: string
}

post /selecttracking
{
	user_id: string,
	status: 1
}
response
{
	tasks: [
		{
			title: string,
			description: string,
			starttime: string,   // ex: (10:30am)
			workingtime: string,   // ex: (00:00:00)
			priority: 1/2/3,
			type: int, ////(1/2/3) 1: meeting, 2: task, 3: break
			status: int ////(1/2/3) 1: starting, 2: pause, 3: completed
		},
	]
}

post /starttrack
{
	task_id: string
}
response
{
	title: string,
	description: string,
	starttime: string,   // ex: (10:30am)
	workingtime: string,   // ex: (00:00:00)
	priority: 1/2/3,
	type: int, ////(1/2/3) 1: meeting, 2: task, 3: break
	status: int, ////(1/2/3) 1: starting, 2: pause, 3: completed
	snoozetime: string, /// ex: "00:30"

}

post /setsnooze
{
	user_id: string,
	snoozetime: string
}
response
{
	success: true/false,
	errorMessage: "",
}

post /startworkingtimer
{
	task_id: string,
	starttime: new Date()
}
response
{
	status: 2 /////(1/2/3/4) 1: original state 2: starting, 3: pause, 4: completed --- task status updated "1"
	tasks: [
		{
			title: string,
			description: string,
			starttime: string,
			time: string, //// ex : (00:00:00)
			priority: 1/2/3,
			type: int, ////(1/2/3) 1: meeting, 2: task, 3: break
			status: int /////(1/2/3/4) 1: original state 2: starting, 3: pause, 4: completed
		},
		{
			title: "Break",
			type: 3,
			duration: string /// ex: (02.00:03.00pm) or 02:00pm~03:00pm
		}
	],
	availibletime: string,/// availibletime = workinglimit - working all time (ex: 0:04:30) (hh:mm:ss)
}

post /saveworkingtimer
{
	task_id: string,
	endedtime: string,// 16:30:15 end current time
	// default: current date save in DB
}
response
{
	workingtime: string,   // ex: (0:00:00) workingtime = end_time - start_time
	status: 3, ////(1/2/3/4) 1: original state 2: starting, 3: pause, 4: completed ---- task status updated "2"
	tasks: [  /// after update return tasks
		{
			title: string,
			description: string,
			starttime: string,
			time: string, //// ex : (00:00:00)
			priority: 1/2/3,
			type: int, ////(1/2/3) 1: meeting, 2: task, 3: break
			status: int /////(1/2/3/4) 1: original state 2: starting, 3: pause, 4: completed
		},
		{
			title: "Break",
			type: 3,
			duration: string /// ex: (02.00:03.00pm) or 02:00pm~03:00pm
		}
	],
	availibletime: string,/// availibletime = workinglimit - working all time (ex: 0:04:30) (hh:mm:ss)
}

