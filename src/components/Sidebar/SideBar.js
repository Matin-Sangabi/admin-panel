import React, { useEffect, useState } from 'react'
import { Button, Image } from '@nextui-org/react'

import { sideBarRoutes } from '../../constants/routes'
import SidebarAccordion from './SidebarAccordion'
import SideBarLink from './SideBarLink'
import { Icon } from '@iconify/react'

export default function SideBar() {
	const [swapSidebar, setSwapSidebar] = useState(false)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const sidebar = JSON.parse(window.localStorage.getItem('sidebar'))
			if (!sidebar) {
				setSwapSidebar(true)
			} else {
				setSwapSidebar(false)
			}
		}
	}, [])

	const swapSideBarHandler = () => {
		setSwapSidebar(!swapSidebar)
		window.localStorage.setItem('sidebar', JSON.stringify(swapSidebar))
	}
	return (
		<div
			className={`border-primary/40 h-full w-full ${swapSidebar ? 'max-w-20' : 'max-w-64'} duration-250 border-r border-dashed px-2 py-2`}
		>
			<Button
				variant='faded'
				onClick={swapSideBarHandler}
				className={`fixed ${swapSidebar ? 'left-16' : 'left-60'} top-14 z-50 h-7 w-7 min-w-0 p-0 transition-all duration-200 ease-in-out`}
				radius='full'
				isIconOnly
			>
				<Icon
					className={`${swapSidebar ? 'rotate-180' : 'rotate-0'} duration-250 transition-all ease-in-out`}
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
