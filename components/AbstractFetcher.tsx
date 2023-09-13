// components/AbstractFetcher.tsx

import { useState } from 'react';
import axios from 'axios';

function AbstractFetcher() {
  const [doi, setDoi] = useState('');
  const [abstract, setAbstract] = useState('');

  const fetchAbstract = async () => {
    try {
      const response = await axios.get(`https://api.openalex.org/works/${doi}`);
      const { abstract_inverted_index } = response.data;
      // Implement the decompression logic for abstract_inverted_index if needed
      setAbstract(abstract_inverted_index);
    } catch (error) {
      console.error('Error fetching abstract:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter DOI"
        value={doi}
        onChange={(e) => setDoi(e.target.value)}
      />
      <button onClick={fetchAbstract}>Get Abstract</button>
      <p>{abstract}</p >
    </div>
  );
}

export default AbstractFetcher;