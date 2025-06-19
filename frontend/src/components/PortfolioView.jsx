import React, { useState, useMemo } from 'react';
import { Container, Text, Divider, TextInput, Group, Select, SimpleGrid, Box, UnstyledButton } from '@mantine/core';
import { usePortfolio } from '../context/PortfolioContext';
import PortfolioCard from './PortfolioViewItem'; 
import { IconSearch } from '@tabler/icons-react';

function PortfolioView() {
  const { categorizedItems } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); 

  const allCategories = useMemo(() => Object.keys(categorizedItems).sort(), [categorizedItems]);
  const categoryOptions = useMemo(() => [
    { value: '', label: 'All Categories' },
    ...allCategories.map(cat => ({ value: cat, label: cat }))
  ], [allCategories]);

  const allPortfolioItems = useMemo(() => {
    let items = [];
    for (const category in categorizedItems) {
      items = items.concat(categorizedItems[category].map(item => ({ ...item, category })));
    }
    return items;
  }, [categorizedItems]);

  const filteredItems = useMemo(() => {
    let items = allPortfolioItems;

    if (selectedCategory) {
      items = items.filter(item => item.category === selectedCategory);
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      items = items.filter(item =>
        item.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    return items;
  }, [allPortfolioItems, searchTerm, selectedCategory]);

  return (
    <Container size="xl" py="md">
      <Group mb="md" grow>
        <TextInput
          placeholder="Search portfolio items..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
        />
        <Select
          placeholder="Filter by category"
          data={categoryOptions}
          value={selectedCategory}
          onChange={setSelectedCategory}
          clearable
        />
      </Group>

      {filteredItems.length === 0 ? (
        <Text c="dimmed" size="lg" mt="xl" align="center">
          {searchTerm || selectedCategory
            ? "No items match your search or filter criteria."
            : "Your portfolio is empty. Upload some media to get started!"
          }
        </Text>
      ) : (
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3, lg: 4 }} 
          spacing="lg"
          verticalSpacing="lg"
        >
          {filteredItems.map((item, index) => (
            <PortfolioCard key={item.id || `${item.title}-${index}`} item={item} />
          ))}
        </SimpleGrid>
      )}
      <Divider my="xl" />
    </Container>
  );
}

export default PortfolioView;