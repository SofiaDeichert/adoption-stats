import { FaGlobeAsia, FaMapMarkedAlt } from 'react-icons/fa';
import { IoArrowRedoOutline } from 'react-icons/io5';
import { MdOutlineQueryStats } from 'react-icons/md';
import Card from '../components/Card';

const Home = () => {
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-24 text-blue-800 leading-tight">
          Intercountry Adoption
          <br />
          <span className="text-blue-600">Statistics Dashboard</span>
        </h1>
        <p className="text-xl md:text-2xl text-center mb-32 max-w-3xl mx-auto text-gray-600 leading-relaxed">
          This dashboard provides comprehensive statistics on United States
          intercountry adoptions. Explore the data through various
          visualizations and tables.
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
    </div>
  );
};

export default Home;
