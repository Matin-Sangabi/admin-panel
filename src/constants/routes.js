const router = {
	login: '/auth/login',
	main: '/',
	user: {
		main: '/users',
		create() {
			return `${this.main}/create`
		},
	},
}

export default Object.freeze(router)

export const sideBarRoutes = [
	{ title: 'Dashboard', icon: 'solar:widget-4-bold-duotone', path: router.main },
	{
		title: 'Users',
		icon: 'solar:users-group-two-rounded-bold',
		children: [
			{ title: 'Lists', path: router.user.main },
			{ title: 'Create', path: router.user.create() },
		],
	},
]

export const quickItems = [
	{ title: 'Dashboard', icon: 'solar:widget-4-bold-duotone', path: router.main },
	{ title: 'Users Lists', icon: 'solar:users-group-two-rounded-bold', path: router.user.main },
	{
		title: 'Users Create',
		icon: 'solar:user-plus-rounded-bold-duotone',
		path: router.user.create(),
	},
]
