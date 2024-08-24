import { Link } from 'react-router-dom';

const Card = ({ title, description, link, Icon }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border border-blue-100 hover:border-blue-300 flex flex-col h-full group">
      <div className="bg-blue-50 flex items-center justify-center py-8 group-hover:bg-blue-100 transition-colors duration-300">
        <div className="bg-blue-100 rounded-full p-6 group-hover:bg-blue-200 transition-colors duration-300">
          <Icon className="text-4xl text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
        </div>
      </div>
      <div className="flex-grow flex flex-col p-6">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4 h-16 flex items-center justify-center">
          {title}
        </h2>
        <p className="text-sm lg:text-base text-gray-600 text-center flex-grow">
          {description}
        </p>
      </div>
      <Link
        to={link}
        className="bg-blue-500 text-white py-3 px-4 text-center hover:bg-blue-600 transition duration-300 text-lg font-medium"
      >
        View Details
      </Link>
    </div>
  );
};

export default Card;
