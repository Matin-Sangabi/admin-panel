import { Spinner } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function AuthPage() {
	const { query, replace } = useRouter()

	useEffect(() => {
		setTimeout(() => {
			window.location.href = '/'
		}, 1000)
	}, [query, replace])

	return (
		<div className='flex h-full min-h-[80vh] w-full items-center justify-center text-black'>
			<Spinner label='Loading' />
		</div>
	)
}
