import getApiKey from "./env.js";

const apiKey = getApiKey();

const baseURL = `http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}`;

const dataFromServer = async () => {
  const response = await fetch(`${baseURL}`);
  const data = await response.json();

  console.log(data);
};

// dataFromServer()
