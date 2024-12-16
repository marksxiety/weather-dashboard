import { defineStore } from "pinia"
import axiosConfig from "@/plugins"

export const useWeatherStore = defineStore("weatherStore", {
  state: () => ({
    // initial values for weather state
    data: [], 
    selectedCityWeather: null,
    loading: false,
    error: null,
  }),
  actions: {
    async loadCityWeather(country, city, apiKey) {
      this.loading = true
      this.error = null
      try {
        const response = await axiosConfig.get(
          `/weather?q=${city},${country}&appid=${apiKey}&units=metric`
        )
        return response.data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },
    ///ensure that the weather data for the specific city is stored in a dedicated place
    setSelectedCityWeather(cityWeatherData) {
      this.selectedCityWeather = cityWeatherData
    },
  },
})
