import React from 'react';
import { Card, Image, Text, Group, Badge, Flex, Title, Modal, UnstyledButton, ScrollArea, Divider, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks'; 

function PortfolioViewItem({ item }) {
  const [opened, { open, close }] = useDisclosure(false); 
  const mediaBaseUrl = "http://localhost:8000/uploads/";

  return (
    <>
      <UnstyledButton onClick={open} style={{ display: 'flex', height: '100%', width: '100%' }}>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          style={{ height: '100%', display: 'flex', flexDirection: 'column', flex: 1, cursor: 'pointer' }}
        >
          <Card.Section>
            {item.media_type === 'image' ? (
              <Image
                src={`${mediaBaseUrl}${item.filename}`}
                alt={item.title || item.original_filename}
                height={160}
                fit="contain"
                fallbackSrc="https://via.placeholder.com/160x160?text=No+Image"
              />
            ) : (
              <video
                src={`${mediaBaseUrl}${item.filename}`}
                style={{ width: '100%', height: 160, objectFit: 'contain', backgroundColor: 'black' }}
                title={item.title || item.original_filename}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs" wrap="nowrap">
            <Title order={4} lineClamp={1} style={{ flexGrow: 1, marginRight: '8px' }}>
              {item.title || item.original_filename || 'Untitled'}
            </Title>
            {item.category && (
              <Badge color="blue" variant="light" size="sm">
                {item.category}
              </Badge>
            )}
          </Group>

          <Text size="sm" c="dimmed" style={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {item.description || 'No description provided.'}
          </Text>
        </Card>
      </UnstyledButton>

      <Modal
        opened={opened}
        onClose={close}
        title={item.title || item.original_filename || 'Portfolio Item Details'}
        size="xl" // Adjust modal size as needed
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        scrollAreaComponent={ScrollArea.Autosize} 
      >
        <Box>
          <Box style={{ marginBottom: 'md' }}>
            {item.media_type === 'image' ? (
              <Image
                src={`${mediaBaseUrl}${item.filename}`}
                alt={item.title || item.original_filename}
                style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain', margin: '0 auto' }}
                fallbackSrc="https://via.placeholder.com/400x300?text=No+Image"
              />
            ) : (
              <video
                src={`${mediaBaseUrl}${item.filename}`}
                controls 
                style={{ width: '100%', maxHeight: '60vh', objectFit: 'contain', backgroundColor: 'black', margin: '0 auto' }}
                title={item.title || item.original_filename}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </Box>

          <Divider my="md" />

          <ScrollArea style={{ maxHeight: '30vh', paddingRight: '10px' }}>
            <Group justify="space-between" align="center" mb="xs">
              <Title order={2}>{item.title || item.original_filename || 'Untitled'}</Title>
              {item.category && (
                <Badge color="blue" variant="light" size="lg">
                  {item.category}
                </Badge>
              )}
            </Group>

            <Text size="md" c="dimmed" mt="sm">
              {item.description || 'No description provided.'}
            </Text>

            {item.upload_date && (
              <Text size="sm" c="gray" mt="md">
                Uploaded: {new Date(item.upload_date).toLocaleDateString()}
              </Text>
            )}
            {item.tags && item.tags.length > 0 && (
              <Group mt="sm">
                {item.tags.map(tag => (
                  <Badge key={tag} variant="outline" color="gray">{tag}</Badge>
                ))}
              </Group>
            )}
          </ScrollArea>
        </Box>
      </Modal>
    </>
  );
}

export default PortfolioViewItem;