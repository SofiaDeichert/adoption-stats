import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const links = [
    { to: '/', label: 'Home' },
    { to: '/incoming', label: 'Incoming Adoptions' },
    { to: '/by-state', label: 'Adoptions by State' },
    { to: '/outgoing', label: 'Outgoing Adoptions' },
    { to: '/trends', label: 'Trends' },
  ];

  return (
    <header className="bg-blue-600 py-4 px-6 lg:px-12 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl lg:text-2xl font-bold">
          Intercountry Adoption Statistics Dashboard
        </h1>

        {/* Desktop menu */}
        <nav className="hidden lg:flex space-x-4">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium 2xl:text-lg"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Burger menu button */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-blue-600 z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <button
            className="text-white focus:outline-none mb-6"
            onClick={toggleMenu}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <nav className="flex flex-col space-y-4">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                onClick={toggleMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
