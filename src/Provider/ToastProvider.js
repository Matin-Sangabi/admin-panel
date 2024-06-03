import React from 'react'
import { Toaster } from 'react-hot-toast'

export default function ToastProvider() {
	return <Toaster toastOptions={{ position: 'top-left' }} />
}
