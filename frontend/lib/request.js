import axios from "axios";

export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api"
  }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}

// Helper to make GET requests to Strapi with axios
export async function fetchAxiosAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await axios.get(requestUrl);
  return response.data;
}

// Helper to make Authenficated POST requests to Strapi with axios
export async function postAxiosAPI(path, data, userToken) {
  const requestUrl = getStrapiURL(path);
  const response = await axios.post(requestUrl, data, {
    headers: userToken && { Authorization: `Bearer ${userToken}` },
  });
  return response;
}

// Helper to make Authenficated DELETE requests to Strapi with axios
export async function deleteAxiosAPI(path, userToken) {
  const requestUrl = getStrapiURL(path);
  const response = await axios.delete(requestUrl, {
    headers: userToken && { Authorization: `Bearer ${userToken}` },
  });
  return response;
}

// Helper to make Authenficated PUT requests to Strapi with axios
export async function putAxiosAPI(path, data, userToken) {
  const requestUrl = getStrapiURL(path);
  const response = await axios.put(requestUrl, data, {
    headers: userToken && { Authorization: `Bearer ${userToken}` },
  });
  return response;
}

// Helper to make Authenficated get requests to Strapi with axios
export async function getAxiosAPI(path, userToken) {
  const requestUrl = getStrapiURL(path);
  const response = await axios.get(requestUrl, {
    headers: userToken && { Authorization: `Bearer ${userToken}` },
  });
  return response;
}
