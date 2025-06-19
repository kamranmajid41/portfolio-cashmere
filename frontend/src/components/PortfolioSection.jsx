import React from 'react';
import { Accordion, SimpleGrid, Title } from '@mantine/core';
import PortfolioItemCard from './PortfolioItemCard';

function PortfolioSection({ category, items }) {
  return (
    <Accordion.Item value={category}>
      <Accordion.Control>
        <Title order={3}>{category} ({items.length})</Title>
      </Accordion.Control>
      <Accordion.Panel>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing="lg"
          verticalSpacing="lg"
        >
          {items.map((item) => (
            <PortfolioItemCard key={item.id} item={item} />
          ))}
        </SimpleGrid>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

export default PortfolioSection;