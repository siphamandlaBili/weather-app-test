import type { ForecastData } from "@/api/types"

interface HourlyTemperatureProps {
    data:ForecastData
}

const HourlyTemperature = ({data}:HourlyTemperatureProps) => {
  return (
    <div>
      Hourly Temperature
    </div>
  )
}

export default HourlyTemperature
