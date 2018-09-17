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
		{
			title: string,
			description: string,
			starttime: string,
			time: string,
			priority: string,
			type: int,   ////(1/2/3) 1: meeting, 2: task, 3: break
			status: int ////(1/2/3) 1: starting, 2: pause, 3: completed
		},
		{
			title: "Break",
			type: 3,
			duration: string /// ex: (02.00:03.00pm) or 02:00pm~03:00pm
		}
	],
	workinglimit: string,
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
	date: string, /// current date ex: ( June 18 )
	tasks: [
		{
			title: string,
			description: string,
			starttime: string,
			duration: string, //// ex : (00:00:00)
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
	starttime: string, // first task start time
	endtime: string    // Daily working limit time
}

post /newmeeting 
{
	type: 1,  		////(1/2/3) 1: meeting, 2: task, 3: break
	starttime: string, // ex: ( 10:30am)
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
	starttime: string,   // first task start time
	endtime: string     // Daily working limit time
}

post /newtask
{
	type: 2,
	starttime: string,   // ex: ( 10:30am )
	title: string,
	description: string,
	priority: 1/2/3,
	pushnotification: true/false,
	customnotification: string,
	user_id: string
}
response   // current date
{
	success: true/false,
	errorMessage: string,
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
	avatar_url: string,
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
}
response
{
	status: 2 ////(1/2/3) 1: original, 2: starting 3: pause 4: completed
	/// task status updated "1"
}

post /saveworkingtimer
{
	task_id: string,
	startedtime: string,// 15:30:12
	endedtime: string,// 16:30:15 end current time
	// default: current date save in DB
}
response
{
	workingtime: string,   // ex: (0:00:00) workingtime = end_time - start_time
	status: 3 ////(1/2/3) 1: starting, 2: pause, 3: completed
	/// task status updated "2"
}

