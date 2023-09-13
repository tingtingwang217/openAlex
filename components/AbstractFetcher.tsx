// components/AbstractFetcher.tsx

import { useState } from 'react';
import axios from 'axios';
import { Button } from '@mantine/core';

function AbstractFetcher() {
  const [doi, setDoi] = useState('');
  const [abstract, setAbstract] = useState("Please enter a valid DOI.");

  type InvertedIndex = Record<string, number[]>;

  function convertToString(invertedIndex: InvertedIndex): string {
    const results = Object.keys(invertedIndex);//store all key in an array
    // Initialize an empty array to store the reconstructed paragraph
    const paragraphArray: string[] = [];

    // Iterate through the inverted index entries
    for (const w in invertedIndex) {
      if (invertedIndex.hasOwnProperty(w)) { //if it has word property
        const positions = invertedIndex[w]; //get the positions array
        for (const position of positions) {
           //set the string in a position to that word
           paragraphArray[position] = w;
        }
      }
    }

    // join string in array paragraph
    const paragraph: string = paragraphArray.join(" ");
    return paragraph;
  }


  const fetchAbstract = async () => {
    try {
      const response = await axios.get(`https://api.openalex.org/works/https://doi.org/${doi}`);
      console.log(response);
      const { abstract_inverted_index } = response.data;

      // Check if abstract_inverted_index is an object (not a string)
      if (typeof abstract_inverted_index === 'object') {
        //convert index to string
        const paragraph: string = convertToString(abstract_inverted_index);
        console.log(paragraph);
        setAbstract(paragraph);
      } else {
        setAbstract("Please enter a valid DOI.");
        console.error('Invalid abstract data:', abstract_inverted_index);
      }
    } catch (error) {
      setAbstract("Please enter a valid DOI.");
      console.error('Error fetching abstract:', error);
    }
  };



  return (
    <div style={{ textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Enter DOI"
        value={doi}
        onChange={(e) => setDoi(e.target.value)}
      />
      <Button onClick={fetchAbstract}>Get Abstract</Button>
      <p style={{ backgroundColor: 'lightgray' }}>{abstract}</p >
    </div>
  );



}

export default AbstractFetcher;






