import http from "./http.request";

export async function getTicketLists() {
	const data = await http.get("/api/v1/administrator/tickets/")
	return data.data
}

export async function getTicketListsDetails(id) {
	const data = await http.get(`/api/v1/administrator/tickets/${id}/`)
	return data.data
}

export async function closeTicket(id) {
	const data = await http.put(`/api/v1/administrator/tickets/${id}/close/`)
	return data.data
}

export async function answerToTicket(value) {
	const data = await http.post(`/api/v1/administrator/tickets/messages/`  , value)
	return data.data
}
