import Header from './Header';
import Footer from './Footer';
import { MantineProvider } from '@mantine/core';

const Layout = ({ children }) => {
  return (
    <MantineProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </div>
    </MantineProvider>
  );
};

export default Layout;
