import React from 'react'
import { Image } from '@nextui-org/react'

import { sideBarRoutes } from '../../constants/routes'
import SidebarAccordion from './SidebarAccordion'
import SideBarLink from './SideBarLink'

export default function SideBar() {
	return (
		<div className='border-primary/40 h-full w-full max-w-64 border-r border-dashed px-4 py-2'>
			<div className='flex h-full w-full flex-col justify-between py-2'>
				<div className='pb-10 text-3xl font-bold text-white'>
					<Image src='/images/logo/logo.png' className='w-10' alt='logo' />
				</div>
				<div className='flex w-full flex-1 flex-col gap-y-4'>
					{sideBarRoutes.map((item) =>
						item.children ? (
							<SidebarAccordion item={item} key={item.title} />
						) : (
							<SideBarLink key={item.title} item={item} />
						)
					)}
				</div>
				<div className='flex items-center justify-center text-white/60'>Admin Panel v1.0</div>
			</div>
		</div>
	)
}
