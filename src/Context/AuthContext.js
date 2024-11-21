import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@tanstack/react-query'
import { Image, Progress } from '@nextui-org/react'
import { useRouter } from 'next/router'

import routes from '../constants/routes'
import { getUser } from '../service/auth.service'

const initialState = {
	isLogin: false,
}

export const AuthContext = createContext({ ...initialState })

AuthProvider.propTypes = {
	children: PropTypes.node,
}

export default function AuthProvider({ children }) {
	const { pathname, push } = useRouter()
	const auth = pathname.includes(routes.auth)

	const { data, status, error } = useQuery({
		queryKey: ['get-user'],
		queryFn: getUser,
		retry: false,
		refetchOnWindowFocus: true,
	})

	if (status === 'pending') {
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
	}

	if (status === 'error') {
		if (error?.response.status === 401 && !auth) {
			push(routes.login)
		}
		console.log(error)
		return <AuthContext.Provider value={'empty'}>{children}</AuthContext.Provider>
	}

	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}
