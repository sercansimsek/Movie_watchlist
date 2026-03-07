import getApiKey from "./env.js";

const apiKey = getApiKey();

const baseURL = `http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}`;
