import axios from 'axios';
import authHeader from './auth-header';

const API_URL = import.meta.env.VITE_API_ENDPOINT;

class RecipesService {
    getAll() {
        return axios.get(API_URL + '/recipes', { headers: authHeader() });
    }

    get(id) {
        return axios.get(API_URL + '/recipes/' + id, { headers: authHeader() });
    }

    create(data) {
        return axios.post(API_URL + '/recipes', data, { headers: authHeader() });
    }

    update(id, data) {
        return axios.put(API_URL + '/recipes/' + id, data, { headers: authHeader() });
    }

    delete(id) {
        return axios.delete(API_URL + '/recipes/' + id, { headers: authHeader() });
    }

    suggest(data) {
        return axios.post(API_URL + '/recipes/suggest', data, { headers: authHeader() });
    }

    getPairings(data) {
        return axios.post(API_URL + '/recipes/pairings', data, { headers: authHeader() });
    }

    getCalories(data) {
        return axios.post(API_URL + '/recipes/calories', data, { headers: authHeader() });
    }

    addToFav(data) {
        return axios.post(API_URL + '/recipes/favorites', data, { headers: authHeader() });
    }

    rateRecipe(id, data) {
        return axios.post(API_URL + '/recipes/' + id + '/ratings', data, { headers: authHeader() });
    }
}

export default new RecipesService();