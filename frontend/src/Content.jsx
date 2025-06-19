import React, { useState, useEffect } from 'react';
import { Stepper, Button, Text, Group, Container, Box, Title, Grid } from '@mantine/core';
import { IconUpload, IconLayoutList, IconRocket, IconCheck } from '@tabler/icons-react';

import MediaUploadForm from './components/MediaUploadForm';
import PortfolioPreview from './components/PortfolioPreview';
import { usePortfolio } from './context/PortfolioContext';

function Content() {
  const [active, setActive] = useState(0);
  const [saved, setSaved] = useState(false); 

  const { handleSavePortfolio } = usePortfolio();

  const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const handleFinalizeAndSave = async () => {
    await handleSavePortfolio();
    setSaved(true); 
  };

  useEffect(() => { setSaved(false); }, [active])

  return (
    <Container size="xl" py="xl" >
      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}> 
          {active === 0 && (
            <Box mt="xl">
              <Text order={2} mb="md"
                variant="gradient"
                gradient={{ from: '#212ca6', to: '#c457ff', deg: 45 }}
                style={{
                  fontWeight: 500,
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  lineHeight: 1.2,
                }}
              >
                Upload your portfolio items. 
              </Text>
              <Text c="dimmed" mb="lg">
                Start by uploading the images and videos you want to feature in your portfolio.
              </Text>
              <MediaUploadForm />
            </Box>
          )}

          {active === 1 && (
            <Box mt="xl">
              <Text order={2} mb="md"
                variant="gradient"
                gradient={{ from: '#212ca6', to: '#c457ff', deg: 45 }}
                style={{
                  fontWeight: 500,
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  lineHeight: 1.2,
                }}
              >
                Curate and view your portfolio. 
              </Text>
              <Text c="dimmed" mb="lg">
                Make final adjustments to your portfolio content. 
              </Text>
              <PortfolioPreview />
            </Box>
          )}

          {active === 2 && (
            <Box mt="xl">
              <Text order={2} mb="md"
                variant="gradient"
                gradient={{ from: '#212ca6', to: '#c457ff', deg: 45 }}
                style={{
                  fontWeight: 500,
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  lineHeight: 1.2,
                }}
              >
                Your portfolio is complete. 
              </Text>
              <Text c="dimmed" mb="lg">
                Your portfolio is complete. Click "Save Portfolio Now" to store your work.
              </Text>
              <Group>
                <Button
                  onClick={handleFinalizeAndSave}
                  variant="default"
                  size="lg"
                  disabled={saved}
                >
                  Save Portfolio Now
                </Button>
                {saved && 
                  <Text c='green'>
                    Saved 
                  </Text>
                }
              </Group>
            </Box>
          )}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}> 
          <Stepper
            active={active}
            onStepClick={setActive}
            allowNextStepsSelect={true}
            iconPosition="right"
            color="#691b75"
            orientation="vertical"
          >
            <Stepper.Step
              label={<Text fw={500} size="md">Upload Media</Text>}
              description={<Text size="sm">Add your images & videos</Text>}
              icon={<IconUpload size="1.1rem" />}
            />
            <Stepper.Step
              label={<Text fw={500} size="md">Organize & Preview</Text>}
              description={<Text size="sm">Verify portfolio items</Text>}
              icon={<IconLayoutList size="1.1rem" />}
            />
            <Stepper.Step
              label={<Text fw={500} size="md">Finalize & Publish</Text>}
              description={<Text size="sm">Save your masterpiece</Text>}
              icon={<IconRocket size="1.1rem" />}
            />
            <Stepper.Completed>
            </Stepper.Completed>
          </Stepper>
        </Grid.Col>
      </Grid>

      <Group justify="flex-end" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}
            styles={(theme) => ({
                root: {
                    backgroundColor: theme.colors.dark[7],
                    borderColor: theme.colors.dark[5],
                    color: theme.colors.gray[0],
                    '&:hover': {
                        backgroundColor: theme.colors.dark[6],
                    }
                }
            })}
          >
            Back
          </Button>
        )}
        {active < 2 && (
          <Button onClick={nextStep}
            variant="gradient"
            gradient={{ from: 'blue', to: 'violet' }}
          >
            Next Step
          </Button>
        )}
      </Group>
    </Container>
  );
}

export default Content;