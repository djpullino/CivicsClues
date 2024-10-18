import React, { useState } from 'react';

const FindLocalReps = () => {
  const [zipCode, setZipCode] = useState(''); // State for ZIP code input
  const [representatives, setRepresentatives] = useState([]); // State for representatives
  const [error, setError] = useState(''); // State for error handling
  
  const API_KEY = 'AIzaSyD6IjloqVqPb-iNrcLNmkBucYGEHA6M4w0'; // Replace with your Google Civics API key

  // Handle ZIP code input change
  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic ZIP code validation (ensure only numbers and 5 digits)
    if (!/^\d{5}$/.test(zipCode)) {
      setError('Please enter a valid 5-digit ZIP code.'); 
      return;
    }

    setError(''); // Clear previous errors

    try {
      // Make API call to Google Civics API
      const response = await fetch(
        `https://www.googleapis.com/civicinfo/v2/representatives?key=${API_KEY}&address=${zipCode}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      // Extract and map officials with their office titles
      const officialsWithTitles = data.officials.map((official) => {
        const officeTitles = data.offices
          .filter(office => office.officialIndices.includes(data.officials.indexOf(official)))
          .map(office => office.name)
          .join(', ');

        return {
          ...official,
          officeTitles
        };
      });

      setRepresentatives(officialsWithTitles);

    } catch (err) {
      setError('Error fetching representatives. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen bg-[#301952] text-white">
      <div className="w-1/3 p-6 border-r border-white"> {/* Left Column */}
        <header className="text-center mb-4">
          <h1 className="text-4xl font-bold">Find Your Local Representatives</h1>
          <br></br>
          <h2>Please Input a Valid Zip Code</h2>
        </header>
        <br></br>
        <form onSubmit={handleSubmit} className="text-center">
          <input 
            type="text" 
            id="flrInput" 
            value={zipCode} 
            onChange={handleZipCodeChange} 
            placeholder="Enter ZIP code"
            className="p-2 mb-4 border border-white text-black" // Input styling
          />
          <br></br>
          <button 
            type="submit" 
            className="mt-4 px-4 py-2 bg-[#301952] border border-white text-white rounded-lg shadow hover:bg-[#5B3B8C]" // Button styling
          >
            Submit
          </button>
        </form>

        {/* Display Error Message */}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      <div className="flex-grow p-6 overflow-y-auto"> {/* Right Column for API Output */}
        <div className="representatives-list">
          {representatives.length > 0 && representatives.map((rep, index) => (
            <div key={index} className="mb-4 p-4 border border-white bg-white text-[#301952] rounded">
              <h2 className="text-3xl font-bold">{rep.name}</h2>
              <p className="text-2xl">{rep.officeTitles}</p> {/* Display office titles */}
              <p className="text-xl">{rep.party}</p>
              {rep.phones && <p className="text-xl">Phone: {rep.phones[0]}</p>}
              {rep.urls && <p><a href={rep.urls[0]} className="text-xl text-[#301952] ">Website</a></p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindLocalReps;
