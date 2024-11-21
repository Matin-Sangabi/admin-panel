import {
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	Kbd,
} from '@nextui-org/react'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import routes from '../../constants/routes'
import useUser from '../../hooks/useUser'
import Cookies from 'js-cookie'

export default function Header() {
	const { pathname, replace } = useRouter()

	const user = useUser()


	const getRouter = useCallback((data) => {
		switch (data) {
			case routes.main: {
				return 'Dashboard'
			}
		}
	}, [])

	const switchAction = (e) => {
		switch (e) {
			case 'logout': {
				Cookies.remove('access_token')
				replace(routes.login)
			}
		}
	}

	return (
		<header className='flex items-center justify-between border-b border-dashed border-primary/40 px-4 py-3'>
			<div className='flex items-center gap-x-2 pb-1 text-slate-700'>
				<Kbd keys={['command']}>K</Kbd>
				{getRouter(pathname)}
			</div>
			<Dropdown placement='bottom-end' className=''>
				<DropdownTrigger>
					<Avatar
						src={user?.profile_image_url ?? '/images/avatar/av1.png'}
						isBordered
						as='button'
						size='sm'
					/>
				</DropdownTrigger>
				<DropdownMenu onAction={switchAction} aria-label='Profile Actions' variant='flat'>
					<DropdownSection showDivider>
						<DropdownItem textValue='profile' key='profile' className='h-14 gap-2'>
							<p className='font-semibold'>Signed in as</p>
							<p className='font-semibold'>{user?.email}</p>
						</DropdownItem>
						<DropdownItem textValue='role' key='role' className='h-8 gap-2'>
							<p className='font-semibold'> {user?.first_name} {user?.last_name}</p>
						</DropdownItem>
					</DropdownSection>
					<DropdownItem textValue='logout' key='logout' color='danger'>
						Log Out
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</header>
	)
}
