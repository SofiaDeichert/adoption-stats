import { Link } from 'react-router-dom';

const Card = ({ title, description, link, Icon }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-[400px] border border-blue-100">
      {/* Icon section */}
      <div className="bg-blue-50 flex items-center justify-center py-8">
        <div className="bg-blue-100 rounded-full p-6">
          <Icon className="text-5xl text-blue-500" />
        </div>
      </div>

      {/* Title and description section */}
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center h-14 flex items-center">
          {title}
        </h2>
        <p className="text-sm text-gray-600 text-center">{description}</p>
      </div>

      {/* View Details button section */}
      <Link
        to={link}
        className="bg-blue-500 text-white py-4 px-4 text-center hover:bg-blue-600 transition duration-300 text-lg"
      >
        View Details
      </Link>
    </div>
  );
};
export default Card;
