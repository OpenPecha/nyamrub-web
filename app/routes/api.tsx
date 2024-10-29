import axios from 'axios';
import { json } from "@remix-run/node";

const BACKEND_ENDPOINT = process.env.BACKEND_ENDPOINT;

// GET SPEAK SOURCE: 
export const fetchSpeakSources = async (skip = 0) => {
    
    const url = `${BACKEND_ENDPOINT}/speak_resources/?skip=${skip}`
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching speak sources:", error);
        throw error;
    }
};

// CREATE USER 
export const createUser = async () => {
    const url = `${BACKEND_ENDPOINT}/users/`
    try {
        const response = await axios.post(url);
        return json({ success: true, item: response.data }); // Return the created item
    } catch (error) {
        return json({ error: 'Failed to create user' }, { status: 500 });
    }
}






