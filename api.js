import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5/weather?q=',
});


export default {
    get: data => {
        const newUrl = instance.defaults.baseURL + data;
        return instance.get(newUrl)
    }
}