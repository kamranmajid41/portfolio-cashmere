import { Container, Text, Accordion, Divider } from '@mantine/core';
import { usePortfolio } from '../context/PortfolioContext';
import PortfolioSection from './PortfolioSection';


function PortfolioPreview() {
  const { categorizedItems } = usePortfolio();
  const categories = Object.keys(categorizedItems).sort(); 

  return (
    <Container size="xl" py="md">

      {categories.length === 0 ? (
        <Text c="dimmed" size="lg" mt="xl" align="center">
          Your portfolio is empty. Upload some media to get started!
        </Text>
      ) : (
        <Accordion defaultValue={categories[0]} multiple>
          {categories.map((category) => (
            <PortfolioSection key={category} category={category} items={categorizedItems[category]} />
          ))}
        </Accordion>
      )}
      <Divider my="xl" />
    </Container>
  );
}

export default PortfolioPreview;