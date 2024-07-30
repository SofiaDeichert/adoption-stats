import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Adoption Statistics Dashboard
            </h1>
            <p className="text-sm">
              Department of State | Overseas Citizen Services
            </p>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/incoming" className="hover:underline">
                  Incoming Adoptions
                </Link>
              </li>
              <li>
                <Link to="/outgoing" className="hover:underline">
                  Outgoing Adoptions
                </Link>
              </li>
              <li>
                <Link to="/by-state" className="hover:underline">
                  Adoptions by State
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
