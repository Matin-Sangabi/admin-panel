import { NextUIProvider } from '@nextui-org/react'
import PropTypes from 'prop-types'

import ToastProvider from '../Provider/ToastProvider'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
	return (
		<NextUIProvider>
			<Component {...pageProps} />
			<ToastProvider />
		</NextUIProvider>
	)
}

App.propTypes = {
	Component: PropTypes.any,
	pageProps: PropTypes.any,
}
