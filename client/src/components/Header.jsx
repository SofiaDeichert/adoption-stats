import { Link } from 'react-router-dom';
import { Menu, Group, Burger, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';

const links = [
  { link: '/', label: 'Home' },
  { link: '/incoming', label: 'Incoming Adoptions' },
  { link: '/by-state', label: 'Adoptions by State' },
  { link: '/outgoing', label: 'Outgoing Adoptions' },
];

const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
    >
      {link.label}
    </Link>
  ));

  return (
    <header className="bg-blue-600 py-4">
      <Container size="xl">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">
            Adoption Statistics Dashboard
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
