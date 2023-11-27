import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Upcoming.css";
import React from "react";
import { getUpcomingMovies } from "./../api/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import MovieCard from "./../components/MovieCard";
import type { Movie } from "./../components/MovieCard";
import { Virtuoso } from "react-virtuoso";

const Upcoming: React.FC = () => {
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    isFetchingNextPage,
    fetchStatus,
    ...result
  } = useInfiniteQuery({
    queryKey: ["upcomingMovies"],
    queryFn: ({ pageParam }) => getUpcomingMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      let customHasNextPage = lastPage.data.page < lastPage.data.total_pages;
      return customHasNextPage ? lastPage.data.page + 1 : undefined;
    },
  });
  console.log(result);

  const flattenedData = result.data?.pages.flatMap((page) => page.data.results);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Upcoming</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Upcoming</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h1>Infinite Loading</h1>
        {result.status === "pending" ? (
          <p>Loading...</p>
        ) : result.status === "error" ? (
          <span>Error: {result.error.message}</span>
        ) : (
          /* <>
            {result.data.pages.map((page) => (
              <React.Fragment key={page.data.pages}>
                {page.data.results.map((movie: Movie) => (
                  <MovieCard movie={movie} />
                ))}
              </React.Fragment>
            ))}
            </>*/
          <Virtuoso
            data={flattenedData}
            endReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            //overscan={200}
            itemContent={(index, movie: Movie) => {
              return <MovieCard movie={movie} />;
            }}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Upcoming;
