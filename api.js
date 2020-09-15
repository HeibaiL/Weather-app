import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5/weather?q=',
});


export default {
    get: params => {
        const newUrl = instance.defaults.baseURL + params;
        return instance.get(newUrl)
    }
}