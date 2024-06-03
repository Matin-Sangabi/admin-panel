import React from 'react'
import PropTypes from 'prop-types'

import { Inter } from 'next/font/google'
import SideBar from '../components/Sidebar/SideBar'
import Header from '../components/Header/Header'

const inter = Inter({ subsets: ['latin'] })

AdminLayout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default function AdminLayout({ children }) {
	return (
		<div
			className={`h-screen max-h-screen w-full overflow-hidden bg-slate-100 ${inter.className}`}
		>
			<div className='flex h-full w-full'>
				{/* sidebar */}
				<SideBar />
				{/* content */}
				<div className='flex grow flex-col gap-y-5'>
					{/* header */}
					<Header />
					{/* children */}
					<div className='h-full w-full overflow-auto px-4 pt-10'>{children}</div>
				</div>
			</div>
		</div>
	)
}
