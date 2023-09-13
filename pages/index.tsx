// pages/index.tsx

import AbstractFetcher from '../components/AbstractFetcher';
import { MantineProvider } from '@mantine/core';

function Home() {
  return (
    <div style={{ margin: "40px 50px 100px 50px" }}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <h1 style={{ textAlign: 'center' }}>Research Paper Abstract Fetcher</h1>
        <AbstractFetcher />
      </MantineProvider>
    </div>
  );
}

export default Home;


