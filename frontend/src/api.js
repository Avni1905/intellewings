import axios from "axios";

const api = axios.create({
    baseURL: "https://intellewings-assignment-pobb.onrender.com/api/contacts",
});

export const fetchContacts = async() => api.get("/");
export const addContact = async(contact) => api.post("/", contact);
export const updateContact = async(id, contact) => api.put(`/${id}`, contact);
export const deleteContact = async(id) => api.delete(`/${id}`);
export const searchContacts = async(query) => api.get(`/?search=${query}`);

export default api;