import { Link } from 'react-router-dom';
import { FaGlobeAsia, FaMapMarkedAlt } from 'react-icons/fa';
import { IoArrowRedoOutline } from 'react-icons/io5';
import { MdOutlineQueryStats } from 'react-icons/md';
import Card from '../components/Card';

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card
          title="Incoming Adoptions by Country of Origin"
          description="Explore statistics on adoptions to the United States from other countries."
          link="/incoming"
          Icon={FaGlobeAsia}
        />
        <Card
          title="Incoming Adoptions by State"
          description="Analyze adoption statistics for different states within the United States."
          link="/by-state"
          Icon={FaMapMarkedAlt}
        />
        <Card
          title="Outgoing Adoptions"
          description="View data on adoptions from the United States to other countries."
          link="/outgoing"
          Icon={IoArrowRedoOutline}
        />
        <Card
          title="Adoption Trends"
          description="Analyze trends in intercountry adoptions over time."
          link="/trends"
          Icon={MdOutlineQueryStats}
        />
      </div>
    </div>
  );
};

export default Home;
