import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        Welcome to the Adoption Statistics Dashboard
      </h2>
      <p className="mb-4">
        This dashboard provides comprehensive statistics on intercountry
        adoptions. Explore the data through various visualizations and tables.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/incoming"
          className="bg-blue-100 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">Incoming Adoptions</h3>
          <p>
            Explore statistics on adoptions to the United States from other
            countries.
          </p>
        </Link>
        <Link
          to="/outgoing"
          className="bg-green-100 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">Outgoing Adoptions</h3>
          <p>
            View data on adoptions from the United States to other countries.
          </p>
        </Link>
        <Link
          to="/by-state"
          className="bg-yellow-100 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">Adoptions by State</h3>
          <p>
            Analyze adoption statistics for different states within the United
            States.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
