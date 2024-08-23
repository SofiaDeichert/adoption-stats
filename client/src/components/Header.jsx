import { Link } from 'react-router-dom';
import { Menu, Group, Burger, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';

const links = [
  { link: '/', label: 'Home' },
  { link: '/incoming', label: 'Incoming Adoptions' },
  { link: '/by-state', label: 'Adoptions by State' },
  { link: '/outgoing', label: 'Outgoing Adoptions' },
  { link: '/trends', label: 'Trends' },
];

const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className="text-white hover:bg-blue-700 px-3 py-4 rounded-md text-lg font-medium"
    >
      {link.label}
    </Link>
  ));

  return (
    <header className="bg-blue-600 py-4 px-12">
      <Container size="2xl">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">
            Intercountry Adoption Statistics Dashboard
          </h1>
          <nav className="hidden md:flex space-x-4">{items}</nav>
          <Burger
            opened={opened}
            onClick={toggle}
            className="md:hidden"
            color="white"
          />
        </div>
      </Container>
    </header>
  );
};

export default Header;
