import { defineStore } from "pinia"
import axiosConfig from "@/plugins"

export const useDailyForecastStore = defineStore("dailyForecastStore", {
  state: () => ({
    dailyData: [],
    loading: false,
    error: null,
  }),
  actions: {
    async loadDailyForecasts(latitude, longitude, count, apiKey) {
      this.loading = true
      this.error = null
      try {
        const response = await axiosConfig.get(
          `/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=${count}&appid=${apiKey}`
        )
        this.dailyData = response.data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },
  },
})
