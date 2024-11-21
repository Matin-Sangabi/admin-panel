import http from './http.request'

export async function login(value) {
	const data = await http.post('/api/v1/users/token/', value)
	return data.data
}


export async function getUser() {
	const response = http.get("/api/v1/users/info/")
	return (await response).data
}
