import axios from "axios";

const getheaders = key => ({
    "api_key": key,
    "Content-Type": "application/json"
});

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return error.response || Promise.reject(error);
});

class PetStoreAPI {
    constructor() {
        this.storeURL = process.env.STORE_URL;
    }


    async createPet(key, petBody) {
        const storeURL = `${this.storeURL}/pet`;
        return axios.post(storeURL, petBody, getheaders(key))

    }

    async updatePet(key, petBody) {
        const storeURL = `${this.storeURL}/pet`;
        return axios.put(storeURL, petBody, getheaders(key))

    }

    async getPet(key, petID) {
        const storeURL = `${this.storeURL}/pet/${petID}`;
        return axios.get(storeURL, getheaders(key));
    }

    async deletePet(key, petID) {
        const storeURL = `${this.storeURL}/pet/${petID}`;
        return axios.delete(storeURL, getheaders(key));
    }
}

export default PetStoreAPI;