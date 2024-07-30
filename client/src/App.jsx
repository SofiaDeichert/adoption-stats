import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import IncomingAdoptions from './pages/IncomingAdoptions';
import OutgoingAdoptions from './pages/OutgoingAdoptions';
import AdoptionsByState from './pages/AdoptionsByState';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/incoming" element={<IncomingAdoptions />} />
          <Route path="/outgoing" element={<OutgoingAdoptions />} />
          <Route path="/by-state" element={<AdoptionsByState />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
