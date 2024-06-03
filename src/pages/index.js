import React from 'react'
import AdminLayout from '../container/AdminLayout'
import AppHeader from '../components/AppHeader/AppHeader'
import { appText } from '../locales'
import QuickActions from '../components/Sections/Main/QuickActions'
import Page from '../Provider/Page'

MainPage.getLayout = function getLayout(page) {
	return <AdminLayout>{page}</AdminLayout>
}

export default function MainPage() {
	return (
		<Page title='Dashboard'>
			<AppHeader title={appText.quickAccess}>
				<QuickActions />
			</AppHeader>
		</Page>
	)
}
