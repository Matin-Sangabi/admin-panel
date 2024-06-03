import { NextUIProvider } from '@nextui-org/react'
import PropTypes from 'prop-types'

import ToastProvider from '../Provider/ToastProvider'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
	const getLayout = Component.getLayout ?? ((page) => page)

	return (
		<NextUIProvider>
			{getLayout(<Component {...pageProps} />)}
			<ToastProvider />
		</NextUIProvider>
	)
}

App.propTypes = {
	Component: PropTypes.any,
	pageProps: PropTypes.any,
}
