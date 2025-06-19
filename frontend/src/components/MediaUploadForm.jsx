import React, { useState, useMemo } from 'react';
import { Button, TextInput, Textarea, Select, Group, Paper, Text, Stack, Box, Grid } from '@mantine/core'; // Import Grid
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconPhoto, IconVideo, IconUpload, IconX, IconFile } from '@tabler/icons-react';
import { useForm } from '@mantine/form';

import { uploadFile } from '../api';
import { usePortfolio } from '../context/PortfolioContext';


function MediaUploadForm() {
  const { addMediaItem } = usePortfolio();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      category: 'Uncategorized', 
    },
    validate: {
      title: (value) => (value.trim().length > 0 ? null : 'Title is required'),
    },
  });

  const handleDrop = (files) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      form.setFieldError('file', null); 
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (values) => {
    if (!selectedFile) {
      form.setFieldError('file', 'Please select a file to upload');
      return;
    }

    setIsUploading(true);
    try {
      const uploadResponse = await uploadFile(selectedFile);

      const newMediaItem = {
        id: uploadResponse.id,
        filename: uploadResponse.filename,
        original_filename: uploadResponse.original_filename,
        media_type: uploadResponse.media_type,
        url: uploadResponse.url, 
        title: values.title,
        description: values.description,
        category: values.category,
      };

      addMediaItem(newMediaItem);

      form.reset();
      setSelectedFile(null);
    } catch (error) {
      console.error('Failed to add media item:', error);
      form.setFieldError('submit', 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const categories = useMemo(() => ([
    'Photography', 'Video Work', 'Design', 'Development', 'Art', 'Uncategorized'
  ]), []);

  // Determine the appropriate icon for the Dropzone based on file type
  const dropzoneIcon = useMemo(() => {
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        return <IconPhoto size="3.2rem" stroke={1.5} />;
      }
      if (selectedFile.type.startsWith('video/')) {
        return <IconVideo size="3.2rem" stroke={1.5} />;
      }
      return <IconFile size="3.2rem" stroke={1.5} />; 
    }
    return <IconPhoto size="3.2rem" stroke={1.5} />; 
  }, [selectedFile]);

  const renderFilePreview = () => {
    if (!selectedFile) return null;

    const fileUrl = URL.createObjectURL(selectedFile);

    return (
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 200,
          overflow: 'hidden',
          border: '1px solid var(--mantine-color-gray-3)',
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'var(--mantine-color-dark-7)',
        }}
      >
        {selectedFile.type.startsWith('image/') ? (
          <img
            src={fileUrl}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            onLoad={() => URL.revokeObjectURL(fileUrl)} 
          />
        ) : selectedFile.type.startsWith('video/') ? (
          <video
            src={fileUrl}
            controls
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            onLoadedData={() => URL.revokeObjectURL(fileUrl)}
          />
        ) : (
          <Text c="dimmed">No preview available for this file type.</Text>
        )}
      </Box>
    );
  };

  return (
    <Paper shadow="xs" p="md" withBorder>
      <Text size="lg" weight={700} mb="md">Upload New Media</Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}> 
            <Stack spacing="md">
              <TextInput
                label="Title"
                placeholder="e.g., Project A"
                {...form.getInputProps('title')}
                required
              />
              <Select
                label="Category"
                placeholder="Select a category"
                data={categories}
                {...form.getInputProps('category')}
              />
              <Textarea
                label="Description"
                placeholder="A brief description of your work."
                minRows={5}
                autosize
                {...form.getInputProps('description')}
              />
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}> 
            <Stack spacing="md" align="center">
            <Dropzone
              onDrop={handleDrop}
              onReject={(files) => {
                console.log('Rejected files:', files);
                form.setFieldError('file', 'File rejected. Max size 5MB, accepted formats: images/videos.');
              }}
              maxFiles={1}
              multiple={false}
              accept={[MIME_TYPES.jpeg, MIME_TYPES.png, MIME_TYPES.gif, MIME_TYPES.mp4, MIME_TYPES.webm]}
              maxSize={5 * 1024 ** 2}
            >
              <Group
                position="center"
                spacing="xl"
                style={{
                  minHeight: 140,
                  pointerEvents: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Dropzone.Accept>
                  <IconUpload
                    size={"5rem"}
                    stroke={1.5}
                    style={{
                      background: 'linear-gradient(135deg, #12c2e9, #c471ed, #f64f59)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    size="5rem"
                    stroke={1.5}
                    style={{
                      background: 'linear-gradient(135deg, #ff416c, #ff4b2b)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <div style={{ fontSize: '5rem' }}>
                    {dropzoneIcon}
                  </div>
                </Dropzone.Idle>

                <div style={{ textAlign: 'center' }}>
                  <Text size="xl" inline>
                    Drag {selectedFile ? 'new file' : 'images or videos'} here or click to select
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    {selectedFile ? `Selected: ${selectedFile.name}` : 'Attach up to 5MB file'}
                  </Text>
                  {form.errors.file && (
                    <Text size="sm" c="red" mt={5}>
                      {form.errors.file}
                    </Text>
                  )}
                </div>
              </Group>
            </Dropzone>
            {renderFilePreview()}
          </Stack>
          </Grid.Col>
        </Grid>

        <Group position="right" mt="md">
          <Button type="submit" loading={isUploading}>
            Add to Portfolio
          </Button>
          {form.errors.submit && (
            <Text c="red" size="sm">{form.errors.submit}</Text>
          )}
        </Group>
      </form>
    </Paper>
  );
}

export default MediaUploadForm;