import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
} from "@ionic/react";
import "./MovieCard.css";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie: movie }) => {
  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";
  const unavailablePoster = "assets/unavailableImage.png";
  console.log();
  return (
    <IonCard key={movie.id}>
      <img
        src={
          movie.poster_path
            ? `${posterBaseUrl}${movie.poster_path}`
            : unavailablePoster
        }
        alt="The Wisconsin State Capitol building in Madison, WI at night"
      ></img>
      <IonCardHeader>
        <IonCardTitle>{movie.title}</IonCardTitle>
        <IonCardSubtitle>{movie.release_date}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <p>Vote Average: {movie.vote_average}</p>
      </IonCardContent>
    </IonCard>
  );
};

export default MovieCard;
