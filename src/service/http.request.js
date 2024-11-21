import axios from "axios";
import Cookies from "js-cookie";

const app = axios.create({
	baseURL : process.env.NEXT_PUBLIC_BASE_URL
})


app.interceptors.request.use(
	async (res) => {
		const token = Cookies.get('access_token')
		if (token) {
			res.headers.Authorization = `Bearer ${token}`
			return res
		}
		return res
	},
	(err) => Promise.reject(err)
)


const http = {
	get: app.get,
	post: app.post,
	put: app.put,
	delete: app.delete,
}

export default http
