import cloudy from "@/assets/images/cloudy.png"
import not_found from "@/assets/images/not_found.png"
import drizzle from "@/assets/images/drizzle.png"
import foggy from "@/assets/images/foggy.png"
import rain from "@/assets/images/rain.png"
import snow from "@/assets/images/snow.png"
import sunny from "@/assets/images/sunny.png"
import thunderstorm from "@/assets/images/thunderstorm.png"
import tornado from "@/assets/images/tornado.png"
import windy from "@/assets/images/windy.png"
import humidity from "@/assets/images/humidity.png"
import temperature from "@/assets/images/temperature.png"
import pressure from "@/assets/images/pressure.png"
import location from "@/assets/images/location.png"

export const WeatherImageIdentifier = (weather = "") => {
  const weatherConditions = [
    { main: "thunderstorm", image: thunderstorm },
    { main: "drizzle", image: drizzle },
    { main: "rain", image: rain },
    { main: "snow", image: snow },
    { main: "clear", image: sunny },
    { main: "clouds", image: cloudy },
    { main: "mist", image: foggy },
    { main: "fog", image: foggy },
    { main: "tornado", image: tornado },
    { main: "windy", image: windy },
    { main: "humidity", image: humidity },
    { main: "temperature", image: temperature },
    { main: "pressure", image: pressure },
    { main: "location", image: location },
  ]
  const condition = weatherConditions.find(
    (c) => c.main === weather.trim().toLowerCase()
  )
  return condition ? condition.image : not_found
}
