import { genre } from '../constants/movie';
import { IMAGE_BASE_URL, POPULAR_MOVIES_URL, SEARCH_MOVIES_URL } from '../constants/url';
import { handleError } from '../errors/error';
import { IMovie, IMovieResponse, ISearchResult } from '../types/movie';


export const getPopularMovies = async (page: number): Promise<ISearchResult> => {
  const params = `?language=ko-KR&page=${page}`;
  const response = await fetch(POPULAR_MOVIES_URL + params, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      accept: 'application/json',
    },
  });

  const { results, total_pages } = await response.json();

  handleError(response.status);

  return { movies: results.map(parseMovieResponse), totalPages: total_pages };
};

export const searchMoviesByTitle = async (title: string, page: number): Promise<ISearchResult> => {
  const params = `?query=${title}&include_adult=false&language=en-US&page=${page}`;

  const response = await fetch(SEARCH_MOVIES_URL + params, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      accept: 'application/json',
    },
  });

  const { results, total_pages } = await response.json();

  handleError(response.status);

  return { movies: results.map(parseMovieResponse), totalPages: total_pages };
};

const parseMovieResponse = (movieResponse: IMovieResponse): IMovie => {
  const { id, title, poster_path, vote_average, genre_ids, overview } = movieResponse;
  const movie: IMovie = {
    id,
    title,
    imageSrc: `${IMAGE_BASE_URL}/original/${poster_path}`,
    score: vote_average,
    genre: genre_ids.map(genre_id => genre[genre_id]),
    description: overview,
  };
  return movie;
};
