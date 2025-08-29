import { Button } from '@/components/ui/button';
import { useGeoLocation } from '@/hooks/use-geolocation';
import { AlertTriangle, MapPin, RefreshCw } from 'lucide-react';
import LoadingSkeleton from "../components/LoadingSkeleton"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather';

const WeatherDashboard = () => {
  const { coordinates, error:locationError, isLoading:locationLoading, getLocation } = useGeoLocation();
 
  const locationQuery = useReverseGeocodeQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);

  const handleRefresh = () => {
    getLocation();

    if(coordinates){
        weatherQuery.refetch();
        forecastQuery.refetch();
        locationQuery.refetch();
    }
  };

  if(locationLoading){
    return <LoadingSkeleton/>
  }

  if(locationError){
    return <Alert variant="destructive">
        <AlertTriangle className='h-4 w-4'/>
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>{locationError}</p>  
          <Button onClick={()=>getLocation()} variant={'outline'} className='w-fit'>
            <MapPin className='mr-2 h-4 w-4'/>
            Enable Location
          </Button>
        </AlertDescription>
    </Alert>
  }

  if(!coordinates){
    return <Alert variant="destructive">
        
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>Please enable Location</p>  
          <Button onClick={getLocation} variant={'outline'} className='w-fit'>
            <MapPin className='mr-2 h-4 w-4'/>
            Enable Location
          </Button>
        </AlertDescription>
    </Alert>
  }

  const locationName = locationQuery.data?.[0];
  
  if(weatherQuery.error || forecastQuery.error){
    return <Alert variant="destructive">
        <AlertTriangle className='h-4 w-4'/>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>Failed to fetch weather data, Please try again</p>  
          <Button onClick={()=>handleRefresh()} variant={'outline'} className='w-fit'>
            <RefreshCw className='mr-2 h-4 w-4'/>
            Retry
          </Button>
        </AlertDescription>
    </Alert>
  }

  if(!weatherQuery.data || !forecastQuery.data){
    return <LoadingSkeleton/>
  }
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between '>
        <h1 className='text-xl font-bold tracking-tight'>My Location</h1>
        <Button 
        variant={'outline'}
        size={'icon'}
        onClick={handleRefresh}
        disabled={weatherQuery.isFetching || forecastQuery.isFetching || locationQuery.isFetching}
        >
            <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching?"animate-spin":""}`}/>
        </Button>
      </div>
    </div>
  )
}

export default WeatherDashboard;
