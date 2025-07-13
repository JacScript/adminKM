import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
})

//API ENDPOINTS
//User endpoints
export const login = (data) => api.post("/api/auth/login", data);
export const logout = (data) => api.post("/api/auth/logout", data);
// console.log("Login request payload:", data);


//testimonial endpoints
export const getTestimonials = () => api.get("/api/testimonial");
export const createTestimonial = (data) => api.post("/api/testimonial", data);
export const deleteTestimonial = (id) => api.delete(`/api/testimonial/${id}`);
export const updateTestimonial = (id, data) => api.put(`/api/testimonial/${id}`, data);

//home endpoints
export const getHome = () => api.get("/api/home");
export const updateHome = (id,data) => api.put(`/api/home/${id}`, data);

//request endpoints
export const getRequests = () => api.get("/api/request");  

//package endpoint
export const getPackages = () => api.get("/api/package");
export const createPackage = (data) => api.post("/api/package", data);
export const deletePackage = (id) => api.delete(`/api/package/${id}`);
export const updatePackage = (id, data) => api.put(`/api/package/${id}`, data);