export interface Coordinates {
    lat: number;
    lon: number;
}

export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface MainWeatherData {
    coord: Coordinates;
    weather: WeatherCondition[];
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    wind: {
        speed: number;
        deg: number;
    };
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    name: string;
    dt: number;
}

export interface ForecastData {
    city: {
        name: string;
        country: string;
        sunrise: number;
        sunset: number;
    };
    list: {
        dt: number;
        main: MainWeatherData["main"];
        weather: MainWeatherData["weather"];
        wind: MainWeatherData["wind"];
    }[];
}

export interface GeocodingResponse {
   name: string;
   country: string;
   state?: string;
   lat: number;
   lon: number;
   local_names?: Record<string, string>;
}