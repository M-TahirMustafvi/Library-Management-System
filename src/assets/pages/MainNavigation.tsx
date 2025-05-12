import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

export function MainNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 p-4">
      <nav className="flex justify-between items-center text-white mx-auto">
        {/* Logo */}
        <div className="text-lg font-bold">
          <NavLink to="/">
            <p>Readers</p>
          </NavLink>
        </div>

        {/* Hamburger Button (Visible on Small Screens) */}
        <button
          className="sm:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        {/* Navigation Links */}
        <ul
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } sm:flex flex-col sm:flex-row absolute sm:static top-16 left-0 w-full sm:w-auto bg-gray-800 sm:bg-transparent p-4 sm:p-0 space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-300 ease-in-out`}
        >
          <li className="hover:text-gray-400">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'text-blue-400' : '')}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li className="hover:text-gray-400">
            <NavLink
              to="books"
              className={({ isActive }) => (isActive ? 'text-blue-400' : '')}
              onClick={() => setIsMenuOpen(false)}
            >
              Books
            </NavLink>
          </li>
          <li className="hover:text-gray-400">
            <NavLink
              to="requests"
              className={({ isActive }) => (isActive ? 'text-blue-400' : '')}
              onClick={() => setIsMenuOpen(false)}
            >
              Requests
            </NavLink>
          </li>
          <li className="hover:text-gray-400">
            <NavLink
              to="libraries"
              className={({ isActive }) => (isActive ? 'text-blue-400' : '')}
              onClick={() => setIsMenuOpen(false)}
            >
              Libraries
            </NavLink>
          </li>
          <li className="hover:text-gray-400">
            <NavLink
              to="members"
              className={({ isActive }) => (isActive ? 'text-blue-400' : '')}
              onClick={() => setIsMenuOpen(false)}
            >
              Members
            </NavLink>
          </li>
          <li className="hover:text-gray-400">
            <NavLink
              to="login"
              className={({ isActive }) => (isActive ? 'text-blue-400' : '')}
              onClick={() => setIsMenuOpen(false)}
            >
              Login/Signup
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}