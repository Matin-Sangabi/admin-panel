import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Image, Progress } from '@nextui-org/react'

LoadingProvider.propTypes = {
	children: PropTypes.node.isRequired,
}

const TIME = 2 * 1000

export default function LoadingProvider({ children }) {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let timing = setTimeout(() => {
			setLoading(false)
		}, TIME)
		return () => clearTimeout(timing)
	}, [])

	if (loading)
		return (
			<div className='relative z-[60] flex h-full min-h-screen w-full flex-col items-center justify-center gap-y-2'>
				<Image src={'/images/logo/logo.png'} alt='logo' width={120} height={120} />
				<Progress
					size='sm'
					isIndeterminate={true}
					aria-label='Loading...'
					className='max-w-sm'
				/>
			</div>
		)
	return children
}
