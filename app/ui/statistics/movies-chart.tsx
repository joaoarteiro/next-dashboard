"use client";

import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import { lusitana } from "@/app/ui/fonts";

import dynamic from "next/dynamic";

// Dynamically import ApexCharts with SSR disabled for Next.js compatibility
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const MoviesChart = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const movieTitles: string[] = [];
  const movieScores: number[] = [];

  if (topMovies) {
    topMovies.forEach(({ original_title, vote_average }) => {
      movieTitles.push(original_title);
      movieScores.push(vote_average);
    });
  }

  const series = [
    {
      name: "Rating",
      data: movieScores,
    },
  ];

  const options: ApexOptions = {
    chart: {
      height: 400,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Top Rated Movies",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: movieTitles,
    },
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      /* const Authorization: string | undefined =
        process.env.TMDB_ACCESS_TOKEN || ""; */

      const options = {
        method: "GET",
        headers: {
          "Cache-Control": "no-store",
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGM4MGM4YTI1ZTQ5OTMwODE0ZDRlM2I2Mzg5ZjU0NyIsIm5iZiI6MTU4NDQ2MTA1NC4xMTAwMDAxLCJzdWIiOiI1ZTcwZjRmZTJmM2IxNzAwMTk0ODZmZjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YTvDw0iXBtq_XKcCNS75ueKVvnU6TakBj1teWM-j4xA",
        },
      };

      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
          options
        );
        if (response.ok) {
          const responseData = await response.json();
          console.log("Response: ", responseData);

          if (responseData.results.length > 0) {
            setTopMovies(responseData.results);
          }
          setIsLoading(false);
        } else {
          if (response.status === 500) {
            console.log("Erro");
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error: any) {
        setIsLoading(false);
        console.error("Error:", error.message);
      }
    };
    fetchMovies();
  }, []);

  if (isLoading) {
    return (
      <div className="empty">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Client-side chart
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="bg-white">
          <Chart options={options} series={series} type="line" height="400" />
        </div>
      </div>
    </div>
  );
};

export default MoviesChart;
