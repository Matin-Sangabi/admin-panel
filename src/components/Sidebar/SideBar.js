import React from 'react'
import { Button, Image } from '@nextui-org/react'

import { sideBarRoutes } from '../../constants/routes'
import SidebarAccordion from './SidebarAccordion'
import SideBarLink from './SideBarLink'
import { Icon } from '@iconify/react'
import useTheme from '../../hooks/useTheme'
import useThemeDispatch from '../../hooks/useThemeDispatch'
import actions from '../../constants/actions'

export default function SideBar() {
	const theme = useTheme()
	const { sideBar: swapSidebar } = theme
	const dispatch = useThemeDispatch()

	const swapSideBarHandler = () => {
		dispatch({ type: actions.sidebar })
	}
	return (
		<div
			className={`h-full w-full border-primary/40 ${swapSidebar ? 'max-w-20' : 'max-w-64'} border-r border-dashed px-2 py-2 duration-250`}
		>
			<Button
				variant='faded'
				onClick={swapSideBarHandler}
				className={`fixed ${swapSidebar ? 'left-16' : 'left-60'} top-14  h-7 w-7 min-w-0 p-0 transition-all duration-200 ease-in-out`}
				radius='full'
				isIconOnly
			>
				<Icon
					className={`${swapSidebar ? 'rotate-180' : 'rotate-0'} transition-all duration-250 ease-in-out`}
					icon={'solar:alt-arrow-left-line-duotone'}
				/>
			</Button>
			<div className='flex h-full w-full flex-col justify-between py-2'>
				<div className='pb-10 text-3xl font-bold text-white'>
					<Image src='/images/logo/logo.png' className='w-10' alt='logo' />
				</div>
				<div className='flex w-full flex-1 flex-col gap-y-4'>
					{sideBarRoutes.map((item) =>
						item.children ? (
							<SidebarAccordion swapSideBar={swapSidebar} item={item} key={item.title} />
						) : (
							<SideBarLink swapSideBar={swapSidebar} key={item.title} item={item} />
						)
					)}
				</div>
				<div className='flex items-center justify-center text-white/60'>Admin Panel v1.0</div>
			</div>
		</div>
	)
}
