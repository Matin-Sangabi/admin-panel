import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Divider } from '@nextui-org/react'

AppHeader.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string,
	size: PropTypes.string,
}

export default function AppHeader({ children, title, size = 'lg' }) {
	const sizeScreen = useCallback((size) => {
		switch (size) {
			case 'sm': {
				return 'max-w-screen-sm'
			}
			case 'md': {
				return 'max-w-screen-md'
			}
			case 'lg': {
				return 'max-w-screen-lg'
			}
			case 'xl': {
				return 'max-w-screen-xl'
			}
			case '2xl': {
				return 'max-w-screen-2xl'
			}
		}
	}, [])
	return (
		<div
			className={`mx-auto flex h-full w-full ${sizeScreen(size)} flex-col items-center gap-y-2`}
		>
			<h1 className='text-xl font-semibold text-slate-700'>{title}</h1>
			<Divider />
			{children}
		</div>
	)
}
