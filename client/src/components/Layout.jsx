import Header from './Header';
import Footer from './Footer';

import useResetScroll from '../hooks/useResetScroll';

const Layout = ({ children }) => {
  useResetScroll();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="flex-grow pt-20 pb-16"> {children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
