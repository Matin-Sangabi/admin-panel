import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

SideBarLink.propTypes = {
	item: PropTypes.shape({
		title: PropTypes.string,
		icon: PropTypes.string,
		path: PropTypes.string,
	}),
	swapSideBar: PropTypes.bool,
}

export default function SideBarLink({ item, swapSideBar = false }) {
	const { pathname } = useRouter()

	return (
		<Link
			href={item.path}
			className={`text-medium hover:bg-secondary/20 flex ${swapSideBar ? 'w-full flex-col py-1' : 'flex-row py-[10px]'} w-full items-center gap-x-3 rounded-lg px-2 font-normal ${pathname === item.path ? 'bg-secondary/10 text-secondary' : 'text-slate-600'}`}
			key={item.title}
		>
			<Icon icon={item.icon} width={22} />
			<span className={`${swapSideBar ? 'text-[10px]' : ''}`}>{item.title}</span>
		</Link>
	)
}
