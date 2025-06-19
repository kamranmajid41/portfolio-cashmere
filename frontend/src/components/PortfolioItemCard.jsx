import React, { useState } from 'react';
import { Card, Image, Text, Group, Button, Badge, ActionIcon, Flex } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { usePortfolio } from '../context/PortfolioContext';

function PortfolioItemCard({ item }) {
  const { removeMediaItem, updateMediaItem } = usePortfolio();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);
  const [editedDescription, setEditedDescription] = useState(item.description);

  const handleEditSave = () => {
    updateMediaItem(item.id, { title: editedTitle, description: editedDescription });
    setIsEditing(false);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder key={item.id} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Card.Section>
        {item.media_type === 'image' ? (
          <Image
            src={`http://localhost:8000/uploads/${item.filename}`} 
            alt={item.title || item.original_filename}
            height={160}
            fit="contain"
            fallbackSrc="https://via.placeholder.com/160x160?text=No+Image"
          />
        ) : (
          <video
            src={`http://localhost:8000/uploads/${item.filename}`} 
            controls
            style={{ width: '100%', height: 160, objectFit: 'contain', backgroundColor: 'black' }}
            title={item.title || item.original_filename}
          >
            Your browser does not support the video tag.
          </video>
        )}
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        {isEditing ? (
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            style={{ width: '70%', padding: '4px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        ) : (
          <Text weight={500}>{item.title || item.original_filename}</Text>
        )}
        <Badge color="blue" variant="light">
          {item.category}
        </Badge>
      </Group>

      {isEditing ? (
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          rows={3}
          style={{ width: '100%', padding: '4px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}
        />
      ) : (
        <Text size="sm" c="dimmed" style={{ flexGrow: 1 }}>
          {item.description || 'No description provided.'}
        </Text>
      )}

      <Flex justify="flex-end" align="center" gap="xs" mt="md">
        {isEditing ? (
          <Button size="xs" onClick={handleEditSave}>Save</Button>
        ) : (
          <ActionIcon onClick={() => setIsEditing(true)} variant="light" color="blue" title="Edit">
            <IconEdit size="1rem" />
          </ActionIcon>
        )}
        <ActionIcon onClick={() => removeMediaItem(item.id)} variant="light" color="red" title="Delete">
          <IconTrash size="1rem" />
        </ActionIcon>
      </Flex>
    </Card>
  );
}

export default PortfolioItemCard;