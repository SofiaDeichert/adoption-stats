import { Link } from 'react-router-dom';
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Image,
  Button,
  Group,
} from '@mantine/core';

const Home = () => {
  return (
    <Container size="xl">
      <Title order={1} align="center" mt="xl" mb="md">
        Intercountry Adoption Statistics Dashboard
      </Title>
      <Text align="center" size="lg" mb="xl" pt={15}>
        This dashboard provides comprehensive statistics on United States
        intercountry adoptions. Explore the data through various visualizations
        and tables.
      </Text>

      <SimpleGrid
        cols={3}
        spacing="lg"
        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
        pt={100}
      >
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section></Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>Incoming Adoptions by Country of Origin</Text>
          </Group>

          <Text size="sm" c="dimmed">
            Explore statistics on adoptions to the United States from other
            countries.
          </Text>

          <Button
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            component={Link}
            to="/incoming"
          >
            View Details
          </Button>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section></Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>Incoming Adoptions by State</Text>
          </Group>

          <Text size="sm" c="dimmed">
            Analyze adoption statistics for different states within the United
            States.
          </Text>

          <Button
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            component={Link}
            to="/by-state"
          >
            View Details
          </Button>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section></Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>Outgoing Adoptions</Text>
          </Group>

          <Text size="sm" c="dimmed">
            View data on adoptions from the United States to other countries.
          </Text>

          <Button
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            component={Link}
            to="/outgoing"
          >
            View Details
          </Button>
        </Card>
      </SimpleGrid>
    </Container>
  );
};

export default Home;
