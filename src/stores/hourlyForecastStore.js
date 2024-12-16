import { defineStore } from "pinia"
import axiosConfig from "@/plugins"

export const useHourlyForecastStore = defineStore("hourlyForecastStore", {
  state: () => ({
    hourlyData: [],
    loading: false,
    error: null,
  }),
  actions: {
    async loadHourlyForecasts(latitude, longitude, apiKey) {
      this.loading = true
      this.error = null
      try {
        const response = await axiosConfig.get(
          `/forecast/hourly?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        )
        this.hourlyData = response.data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },
  },
})
