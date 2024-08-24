import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16">
        Intercountry Adoption Statistics Dashboard
      </h1>
      <p className="text-base md:text-lg text-center mb-28 max-w-3xl mx-auto text-gray-600">
        This dashboard provides comprehensive statistics on United States
        intercountry adoptions. Explore the data through various visualizations
        and tables.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card
          title="Incoming Adoptions by Country of Origin"
          description="Explore statistics on adoptions to the United States from other countries."
          link="/incoming"
        />
        <Card
          title="Incoming Adoptions by State"
          description="Analyze adoption statistics for different states within the United States."
          link="/by-state"
        />
        <Card
          title="Outgoing Adoptions"
          description="View data on adoptions from the United States to other countries."
          link="/outgoing"
        />
      </div>
    </div>
  );
};

const Card = ({ title, description, link }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-[400px]">
      <div className="p-8 flex flex-col justify-center flex-grow">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
          {title}
        </h2>
        <p className="text-base text-gray-600 text-center">{description}</p>
      </div>
      <Link
        to={link}
        className="bg-blue-500 text-white py-4 px-4 text-center hover:bg-blue-600 transition duration-300 text-lg"
      >
        View Details
      </Link>
    </div>
  );
};

export default Home;
