// components/AbstractFetcher.tsx

import { useState } from 'react';
import axios from 'axios';

function AbstractFetcher() {
  const [doi, setDoi] = useState('');
  const [abstract, setAbstract] = useState('');

  // https://api.openalex.org/works/W2741809807
  // https://api.openalex.org/works/${doi}

  // const fetchAbstract = async () => {
  //   try {
  //     const response = await axios.get(`https://api.openalex.org/works/${doi}`);
  //     console.log(response)
  //     const { abstract_inverted_index } = response.data;

  //     // Implement the decompression logic for abstract_inverted_index if needed
  //     setAbstract(abstract_inverted_index);
  //   } catch (error) {
  //     console.error('Error fetching abstract:', error);
  //   }
  // };



  // const fetchAbstract = async () => {
  //   try {
  //     const response = await axios.get(`https://api.openalex.org/works/${doi}`);
  //     console.log(response);
  //     const { abstract_inverted_index } = response.data;
  
  //     if (typeof abstract_inverted_index === 'string') {
  //       // Implement the decompression logic for abstract_inverted_index if needed
  //       setAbstract(abstract_inverted_index);
  //     } else {
  //       console.error('Invalid abstract data:', abstract_inverted_index);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching abstract:', error);
  //   }
  // };



  const fetchAbstract = async () => {
    try {
      const response = await axios.get(`https://api.openalex.org/works/${doi}`);
      console.log(response);
      const { abstract_inverted_index } = response.data;
  
      // Check if abstract_inverted_index is an object (not a string)
      if (typeof abstract_inverted_index === 'object') {
        // You might need to convert the object to a string here
        // For example, using JSON.stringify()
        const abstractString = JSON.stringify(abstract_inverted_index);
  
        // Implement any further processing or decompression logic as needed
        setAbstract(abstractString);
      } else if (typeof abstract_inverted_index === 'string') {
        // If it's already a string, set it directly
        setAbstract(abstract_inverted_index);
      } else {
        console.error('Invalid abstract data:', abstract_inverted_index);
      }
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