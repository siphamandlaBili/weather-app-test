import { useTheme } from '@/context/theme-provider'
import { Moon, Sun, Star } from 'lucide-react';
import { Link } from 'react-router-dom'
import { CitySearch } from './city-search';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from './ui/dialog';
import { FavoriteCities } from './favorite-cities';
import * as React from 'react';
import { useFavorites } from '@/hooks/use-favorite';

const Header = () => {
   const {theme,setTheme} = useTheme();
   const isDark = theme === "dark";

  const { favorites } = useFavorites();
  const [open, setOpen] = React.useState(false);
  return (
  <header className='sticky top-0 z-[100] w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link to={'/'}>
            <p className='text-2xl flex justify-center align-center font-extrabold tracking-tight text-gray-500'>
              <span className="inline-block align-middle mr-1">🌦️</span>Weather 
            </p>
        </Link>

        <div className='flex gap-4 items-center'>
            {/* search */}
            <CitySearch/>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="relative p-2 rounded-full hover:bg-accent transition-colors" title="Show Favorites">
                  <Star className="h-6 w-6 text-yellow-500" />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[20px] flex items-center justify-center border border-white shadow">
                      {favorites.length}
                    </span>
                  )}
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-md w-full">
                <DialogHeader>
                  <DialogTitle>Favorites</DialogTitle>
                </DialogHeader>
                <div className="py-2">
                  <FavoriteCities onPick={() => setOpen(false)} />
                </div>
              </DialogContent>
            </Dialog>
            <div className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark?"rotate-180":"rotate-0"}`} onClick={()=> setTheme(isDark? "light":"dark")}>
                {isDark? <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all"/>: <Moon className="h-6 w-6 text-gray-500 rotate-0 transition-all"/>}
            </div>
        </div>
      </div>
    </header>
  )
}

export default Header
