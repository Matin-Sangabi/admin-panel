const router = {
	login: '/auth/login',
	main: '/',
	user: {
		main: '/user',
		create() {
			return `${this.main}/create`
		},
	},
}

export default Object.freeze(router)

export const sideBarRoutes = [
	{ title: 'Dashboard', icon: 'solar:widget-4-bold-duotone', path: router.main },
	{
		title: 'User',
		icon: 'solar:users-group-two-rounded-bold',
		children: [
			{ title: 'Lists', path: router.user.main },
			{ title: 'Create', path: router.user.create() },
		],
	},
]
