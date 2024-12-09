import { defineStore } from "pinia";
import axiosConfig from "@/plugins";

export const useWeatherStore = defineStore("weatherStore", {
  state: () => ({
    data: [
        // default values of city information before fetching data
        // some cities may not be available using country code and city name as parameter
      [
        {
          country: "PH",
          city: "Manila",
          info: {
            cityname: "Loading...",
            description: "Loading...",
            temperature: "N/A",
            humidity: "N/A",
            windspeed: "N/A",
            hightemp: "N/A",
            lowtemp: "N/A",
          },
        },
        {
          country: "PH",
          city: "Batangas",
          info: {
            cityname: "Loading...",
            description: "Loading...",
            temperature: "N/A",
            humidity: "N/A",
            windspeed: "N/A",
            hightemp: "N/A",
            lowtemp: "N/A",
          },
        },
        {
          country: "PH",
          city: "Bohol",
          info: {
            cityname: "Loading...",
            description: "Loading...",
            temperature: "N/A",
            humidity: "N/A",
            windspeed: "N/A",
            hightemp: "N/A",
            lowtemp: "N/A",
          },
        },
        {
          country: "PH",
          city: "Rizal",
          info: {
            cityname: "Loading...",
            description: "Loading...",
            temperature: "N/A",
            humidity: "N/A",
            windspeed: "N/A",
            hightemp: "N/A",
            lowtemp: "N/A",
          },
        },
        {
          country: "PH",
          city: "Cebu",
          info: {
            cityname: "Loading...",
            description: "Loading...",
            temperature: "N/A",
            humidity: "N/A",
            windspeed: "N/A",
            hightemp: "N/A",
            lowtemp: "N/A",
          },
        },
        {
          country: "PH",
          city: "Quezon",
          info: {
            cityname: "Loading...",
            description: "Loading...",
            temperature: "N/A",
            humidity: "N/A",
            windspeed: "N/A",
            hightemp: "N/A",
            lowtemp: "N/A",
          },
        },
        {
          country: "PH",
          city: "San Jose",
          info: {
            cityname: "Loading...",
            description: "Loading...",
            temperature: "N/A",
            humidity: "N/A",
            windspeed: "N/A",
            hightemp: "N/A",
            lowtemp: "N/A",
          },
        },
        {
          country: "PH",
          city: "Calamba",
          info: {
            cityname: "Loading...",
            description: "Loading...",
            temperature: "N/A",
            humidity: "N/A",
            windspeed: "N/A",
            hightemp: "N/A",
            lowtemp: "N/A",
          },
        },
      ],
    ],
    loading: false,
    error: null,
  }),
  actions: {
    async loadCityWeather(country, city, apiKey) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axiosConfig.get(
          `/weather?q=${city},${country}&appid=${apiKey}&units=metric`
        );
        return response.data;
      } catch (err) {
        this.error = err.message;
        throw err; 
      } finally {
        this.loading = false;
      }
    },
  },
});
