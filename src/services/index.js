import Axios from 'axios';

const baseAPIUrl = process.env.REACT_APP_API_URL;
const axios = Axios.create({
    baseURL: baseAPIUrl,
});

export const getAllFlashCards = (query) => axios.get(`${query ? `/api/cards/search?q=${query}` : '/api/cards'}`);
export const getFlashCardsWithPartTls = () => axios.get('/api/cards?filterby=parttls');
export const getFlashCardsWithFullTls = () => axios.get('/api/cards?filterby=fulltls');
export const getAllFlashCardSets = () => axios.get('/api/cardsets');
export const getAllLanguages = () => axios.get('/api/locales');
export const getAllEnabledLanguages = () => axios.get('/api/locales?enabled=true');
export const getDashboardFlashCards = () => axios.get('/dashboard/cards');
export const getDashboardFlashCardSets = () => axios.get('/dashboard/cardsets');

export const getFlashCardsByFuzzySearch = (searchterm) => axios.get(`/api/cards/search?q=${searchterm}`);
export const getTagCloud = () => axios.get('/api/cards/tagcloud');

export const createFlashCard = (data) => axios.post('/api/cards', data);
export const updateFlashCard = (data, id) => axios.put(`/api/cards/${id}`, data);
export const getFlashCardById = (id) => axios.get(`/api/cards/${id}`);

export const createFlashCardSets = (data) => axios.post('/api/cardsets', data);
export const updateFlashCardSets = (data, id) => axios.put(`/api/cardsets/${id}`, data);
export const getFlashCardSetsById = (id) => axios.get(`/api/cardsets/${id}`);

export const createLanguage = (data) => axios.post('/api/locales', data);
export const updateLanguage = (data, id) => axios.put(`/api/locales/${id}`, data);
export const getLanguageById = (id) => axios.get(`/api/locales/${id}`);

export const getLovFlashCardSets = () => axios.get('/lov/cardsets');
export const getLovLanguages = () => axios.get('/lov/locales');

export const addTranslation = (data, id) => axios.post(`/api/cards/${id}/tls`, data);
export const updateImage = (data) => axios.post(`/api/files/upload`, data, {
    headers: {
        'Content-Type': `multipart/form-data;`
    }
});
