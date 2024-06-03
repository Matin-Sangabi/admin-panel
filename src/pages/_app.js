import { NextUIProvider } from '@nextui-org/react'
import PropTypes from 'prop-types'

import ToastProvider from '../Provider/ToastProvider'
import '../styles/globals.css'
import Head from 'next/head'
import { appText } from '../locales'

export default function App({ Component, pageProps }) {
	const getLayout = Component.getLayout ?? ((page) => page)

	return (
		<>
			<Head>
				<meta name='viewport' content='initial-scale=1, width=device-width' />
				<title>{appText.title}</title>
			</Head>
			<NextUIProvider>
				{getLayout(<Component {...pageProps} />)}
				<ToastProvider />
			</NextUIProvider>
		</>
	)
}

App.propTypes = {
	Component: PropTypes.any,
	pageProps: PropTypes.any,
}
