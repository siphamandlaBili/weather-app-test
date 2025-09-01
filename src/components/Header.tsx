import { useTheme } from '@/context/theme-provider'
import { Moon, Sun, Star, Menu, X, Home, MapPin, Settings } from 'lucide-react';
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
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  
  // Close sidebar when a link is clicked
  const closeSidebar = () => setSidebarOpen(false);
  
  return (
    <header className='sticky top-0 z-[100] w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link to={'/'}>
          <p className='text-2xl flex justify-center align-center font-extrabold tracking-tight text-gray-500'>
            <span className="inline-block align-middle mr-1">🌦️</span>Weather
          </p>
        </Link>

        {/* Desktop header options */}
        <div className='hidden md:flex gap-4 items-center'>
          <CitySearch />
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
          <div className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark ? "rotate-180" : "rotate-0"}`} onClick={() => setTheme(isDark ? "light" : "dark")}> 
            {isDark ? <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" /> : <Moon className="h-6 w-6 text-gray-500 rotate-0 transition-all" />}
          </div>
        </div>

        {/* Hamburger menu for mobile/tablet */}
        <button className='md:hidden p-2 rounded-full hover:bg-accent transition-colors' onClick={() => setSidebarOpen(true)} aria-label="Open menu">
          <Menu className='h-6 w-6' />
        </button>
      </div>

      {/* Enhanced Sidebar Drawer for mobile/tablet */}
      <div className={`fixed inset-0 z-[9999] transition-all duration-300 ${sidebarOpen ? 'bg-black/60 backdrop-blur-sm' : 'bg-transparent pointer-events-none'}`}>
        <aside className={`fixed top-0 left-0 h-screen w-80 max-w-[85vw] bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out z-[10000] border-r border-gray-200 dark:border-gray-700 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* Sidebar Header */}
          <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <Link to="/" onClick={closeSidebar} className="flex items-center gap-2">
              <span className="text-3xl">🌦️</span>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">WeatherPro</span>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Sidebar Content */}
          <div className="flex flex-col gap-2 p-5 flex-1 overflow-y-auto">
            {/* Navigation Links */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 pl-2">Navigation</h3>
              
              <Link 
                to="/" 
                onClick={closeSidebar}
                className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white dark:hover:bg-gray-700/50 transition-all duration-200 group border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg group-hover:scale-110 transition-transform">
                  <Home className="h-5 w-5 text-blue-500" />
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-200">Home</span>
              </Link>
              
              <button
                className="w-full bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-left font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mb-2"
                onClick={() => {
                  setSidebarOpen(false);
                  setSearchOpen(true);
                }}
              >
                <span className="inline-block mr-2 align-middle">🔍</span>Search Cities
              </button>
              <button 
                className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white dark:hover:bg-gray-700/50 transition-all duration-200 group border border-transparent hover:border-gray-200 dark:hover:border-gray-600 mt-2"
                onClick={() => {
                  setSidebarOpen(false);
                  setOpen(true);
                }}
              >
                <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg group-hover:scale-110 transition-transform">
                  <Star className="h-5 w-5 text-amber-500" />
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-200">Favorites</span>
                {favorites.length > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>
            </div>
            
            {/* Search Section */}
            {/* Remove duplicate search section here */}
            
            {/* Theme Toggle */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 pl-2">Appearance</h3>
              
              <button 
                className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white dark:hover:bg-gray-700/50 transition-all duration-200 group border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                onClick={() => setTheme(isDark ? "light" : "dark")}
              >
                <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg group-hover:scale-110 transition-transform">
                  {isDark ? (
                    <Sun className="h-5 w-5 text-purple-500" />
                  ) : (
                    <Moon className="h-5 w-5 text-purple-500" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <span className="font-medium text-gray-700 dark:text-gray-200">{isDark ? 'Light' : 'Dark'} Mode</span>
                </div>
                <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${isDark ? 'bg-purple-600 justify-end' : 'bg-gray-300 justify-start'}`}>
                  <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
                </div>
              </button>
            </div>
            
            {/* Additional Options */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 pl-2">More</h3>
              
              <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white dark:hover:bg-gray-700/50 transition-all duration-200 group border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg group-hover:scale-110 transition-transform">
                  <MapPin className="h-5 w-5 text-green-500" />
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-200">Saved Locations</span>
              </button>
              
              <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white dark:hover:bg-gray-700/50 transition-all duration-200 group border border-transparent hover:border-gray-200 dark:hover:border-gray-600 mt-2">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:scale-110 transition-transform">
                  <Settings className="h-5 w-5 text-gray-500" />
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-200">Settings</span>
              </button>
            </div>
          </div>
          
          {/* Sidebar Footer */}
          <div className="p-5 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              WeatherPro © {new Date().getFullYear()}
            </p>
            <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-1">
              v1.2.0
            </p>
          </div>
        </aside>
        
        {/* Click outside to close */}
        <div 
          className={`flex-1 h-full transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`} 
          onClick={() => setSidebarOpen(false)} 
        />
      </div>

      {/* Dialog for favorites (still works on mobile) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Favorites</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <FavoriteCities onPick={() => {
              setOpen(false);
            }} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog for search (mobile) */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Search Cities</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <CitySearch />
          </div>
        </DialogContent>
      </Dialog>
    </header>
  )
}

export default Header;