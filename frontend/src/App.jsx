import { useState } from 'react';
import { AppShell, rem } from '@mantine/core';
import Header from './Header';
import Content from './Content';
import Home from './Home';
import PortfolioView from './components/PortfolioView';

function App() {
  const [goToContent, setGoToContent] = useState(false);
  const [goToView, setGoToView] = useState(false);

  return (
    <AppShell
      header={{ height: rem(60) }}
      padding={0}
    >
      <AppShell.Header>
        <Header setGoToContent={setGoToContent} setGoToView={setGoToView} />
      </AppShell.Header>

      <AppShell.Main style={{ position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 0,
            right: 0,
            bottom: 0,
            overflowY: 'auto',
            opacity: goToContent || goToView ? 0 : 1,
            transform: goToContent || goToView ? 'translateX(-100%)' : 'translateX(0)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            pointerEvents: goToContent || goToView ? 'none' : 'auto',
          }}
        >
          <Home setGoToContent={setGoToContent} setGoToView={setGoToView} />
        </div>

        {/* Content View */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 0,
            right: 0,
            bottom: 0,
            overflowY: 'auto',
            opacity: goToContent ? 1 : 0,
            transform: goToContent ? 'translateX(0)' : 'translateX(100%)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            pointerEvents: goToContent ? 'auto' : 'none',
          }}
        >
          <Content />
        </div>

         <div
          style={{
            position: 'absolute',
            top: 60,
            left: 0,
            right: 0,
            bottom: 0,
            overflowY: 'auto',
            opacity: goToView ? 1 : 0,
            transform: goToView ? 'translateX(0)' : 'translateX(100%)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            pointerEvents: goToView ? 'auto' : 'none',
          }}
        >
          <PortfolioView />
        </div>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
