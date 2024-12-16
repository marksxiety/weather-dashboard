import cloudy from "@/assets/weather_logo/cloudy.png";
import not_found from "@/assets/weather_logo/not_found.png";
import drizzle from "@/assets/weather_logo/drizzle.png";
import foggy from "@/assets/weather_logo/foggy.png";
import rain from "@/assets/weather_logo/rain.png";
import snow from "@/assets/weather_logo/snow.png";
import sunny from "@/assets/weather_logo/sunny.png";
import thunderstorm from "@/assets/weather_logo/thunderstorm.png";
import tornado from "@/assets/weather_logo/tornado.png";
import windy from "@/assets/weather_logo/windy.png";
import humidity from "@/assets/weather_logo/humidity.png";
import temperature from "@/assets/weather_logo/temperature.png";
import pressure from "@/assets/weather_logo/pressure.png";
import location from "@/assets/weather_logo/location.png";

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
  ];
  const condition = weatherConditions.find(
    (c) => c.main === weather.trim().toLowerCase()
  );
  return condition ? condition.image : not_found;
};
