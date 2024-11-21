const router = {
	auth :"/auth",
	login: '/auth/login',
	main: '/',
	user: {
		main: '/users',
		create() {
			return `${this.main}/create`
		},
	},
	ticket : {
		lists : "/ticket/lists"
	}
}

export default Object.freeze(router)

export const sideBarRoutes = [
	{ title: 'Dashboard', icon: 'solar:widget-4-bold-duotone', path: router.main },
	{
		title: 'Ticket',
		icon: 'ri:headphone-fill',
		children: [
			{ title: 'Lists', path: router.ticket.lists },
			{ title: 'Create', path: router.user.create() },
		],
	},
]

export const quickItems = [
	{ title: 'Dashboard', icon: 'solar:widget-4-bold-duotone', path: router.main },
	{title : "Ticket List" , icon : "ri:headphone-fill" , path : router.ticket.lists}
]
