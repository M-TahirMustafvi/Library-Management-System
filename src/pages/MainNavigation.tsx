import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { DataContext } from '../store/data-context';
export function MainNavigation() {
  const dataCtx = useContext(DataContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);


  return (
    <header className="bg-gray-800 p-4">
      <nav className="flex justify-between items-center text-white mx-auto">
        <div className="text-lg font-bold">
          <NavLink to="/">Readers</NavLink>
        </div>

        <button
          className="sm:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        <ul className={`${isMenuOpen ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row absolute sm:static top-16 left-0 w-full sm:w-auto bg-gray-800 sm:bg-transparent p-4 sm:p-0 space-y-4 sm:space-y-0 sm:space-x-4`}>
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'text-blue-400' : ''}>Home</NavLink></li>
          <li><NavLink to="/books" className={({ isActive }) => isActive ? 'text-blue-400' : ''}>Books</NavLink></li>
          <li><NavLink to="/requests" className={({ isActive }) => isActive ? 'text-blue-400' : ''}>Requests</NavLink></li>
          <li><NavLink to="/libraries" className={({ isActive }) => isActive ? 'text-blue-400' : ''}>Libraries</NavLink></li>
          <li><NavLink to="/members" className={({ isActive }) => isActive ? 'text-blue-400' : ''}>Members</NavLink></li>

          <li className="relative">
            {!dataCtx.user.email ? (
              <NavLink
                to="/auth"
                className={({ isActive }) => (isActive ? 'text-blue-400' : '')}
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </NavLink>
            ) : (
              <div className="relative">
                <button onClick={toggleDropdown} className="flex items-center gap-2">
                  <span className="text-xl">👤</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded shadow-lg py-2 z-50">
                    <p className="px-4 py-2 text-sm font-medium border-b border-gray-200">{dataCtx.user.email}</p>
                    <button
                      onClick={dataCtx.logout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-900 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
