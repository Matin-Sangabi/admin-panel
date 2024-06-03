import React from 'react'
import AdminLayout from '../../container/AdminLayout'
import Page from '../../Provider/Page'

UsersLists.getLayout = function getLayout(page) {
	return <AdminLayout>{page}</AdminLayout>
}

export default function UsersLists() {
	return <Page title='Users Lists'>hello Users</Page>
}
