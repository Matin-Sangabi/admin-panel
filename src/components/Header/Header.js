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

export default function Header() {
	const router = useRouter()
	const pathname = router.pathname

	const getRouter = useCallback((data) => {
		switch (data) {
			case routes.main: {
				return 'Dashboard'
			}
			case routes.user.main: {
				return 'Users Lists'
			}
		}
	}, [])

	const switchAction = (e) => {
		switch (e) {
			case 'logout': {
				console.log('logout')
			}
		}
	}

	return (
		<header className='border-primary/40 flex items-center justify-between border-b border-dashed px-4 py-3'>
			<div className='flex items-center gap-x-2 pb-1 text-slate-700'>
				<Kbd keys={['command']}>K</Kbd>
				{getRouter(pathname)}
			</div>
			<Dropdown placement='bottom-end' className=''>
				<DropdownTrigger>
					<Avatar src='/images/avatar/av1.png' isBordered as='button' size='sm' />
				</DropdownTrigger>
				<DropdownMenu onAction={switchAction} aria-label='Profile Actions' variant='flat'>
					<DropdownSection showDivider>
						<DropdownItem textValue='profile' key='profile' className='h-14 gap-2'>
							<p className='font-semibold'>Signed in as</p>
							<p className='font-semibold'>{'user@email.com'}</p>
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
