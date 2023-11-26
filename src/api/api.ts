import axios from "axios";
import { tmdbApiKey } from './../env'
 
const baseUrl = "https://api.themoviedb.org/3/";

export const getUpcomingMovies = (pageParam: number) => {
  try {
    const response = axios.get(`${baseUrl}/movie/upcoming?api_key=${tmdbApiKey}&page=${pageParam}`);
    console.log('getUpcomingMovies')
    return response;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
