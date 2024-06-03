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
}

export default function SideBarLink({ item }) {
	const { pathname } = useRouter()

	return (
		<Link
			href={item.path}
			className={`text-medium hover:bg-secondary/20 flex w-full items-center gap-x-3 rounded-lg px-2 py-[10px] font-normal ${pathname === item.path ? 'bg-secondary/10 text-secondary' : 'text-slate-600'}`}
			key={item.title}
		>
			<Icon icon={item.icon} width={22} />
			<span>{item.title}</span>
		</Link>
	)
}
