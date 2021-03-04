const activityRouter = [
	{
		path: 'register',
		name: 'register',
		component: () => import('@views/activity/DriverRegister'),
		meta: {
			title: '春节活动',
		},
	},
]
export default activityRouter
