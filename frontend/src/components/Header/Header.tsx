
import { Moon, Sun, Search, BookOpen, Languages, Brain, Menu } from 'lucide-react';
import { PDFControls } from '../PDFViewer/PDFControls';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  searchText: string;
  setSearchText: (value: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
  scale: number;
  onScaleChange: (newScale: number) => void;
}

export function Header({
  darkMode,
  setDarkMode,
  searchText,
  setSearchText,
  mobileMenuOpen,
  setMobileMenuOpen,
  scale,
  onScaleChange,
}: HeaderProps) {
  return (
    <header className={`fixed top-0 w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md z-50`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-6 h-6" />
            <h1 className="text-xl font-bold">PDF Reader</h1>
            
          </div>
          
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden md:flex items-center space-x-4">

          {/* <PDFControls scale={scale} onScaleChange={onScaleChange} darkMode={darkMode} /> */}
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            

            <div className="relative">
              <input
                type="text"
                placeholder="Search in document..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            </div>

            <button
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              title="Translate"
            >
              <Languages className="w-5 h-5" />
            </button>

            <button
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              title="AI Analysis"
            >
              <Brain className="w-5 h-5" />
            </button>
          </div>
        </div>

     

      </div>
    </header>
  );
}


