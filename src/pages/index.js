import React from 'react'
import AdminLayout from '../container/AdminLayout'

MainPage.getLayout = function getLayout(page) {
	return <AdminLayout>{page}</AdminLayout>
}

export default function MainPage() {
	return <div>hello</div>
}
