import React, { useState } from 'react';

const FindLocalReps = () => {
  const [zipCode, setZipCode] = useState(''); //const that is used to store the zip code value
  const [representatives, setRepresentatives] = useState([]); //const that is used for displaying reps
  const [error, setError] = useState(''); //error handling
  
  const API_KEY = 'AIzaSyD6IjloqVqPb-iNrcLNmkBucYGEHA6M4w0'; // Replace with your Google Civics API key

  // Handle ZIP code input change
  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value); //sets a parameter e to the target value of the input
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic ZIP code validation (ensure only numbers and 5 digits)
    if (!/^\d{5}$/.test(zipCode)) {
      setError('Please enter a valid 5-digit ZIP code.'); //when the submit button is pressed we first check if the zip code is valid
      return;
    }

    setError(''); // Clear previous errors

    try {
      // Make API call to Google Civics API if there is no error
      const response = await fetch(
        `https://www.googleapis.com/civicinfo/v2/representatives?key=${API_KEY}&address=${zipCode}`
        //this uses the function representativeinfobyaddress by calling its endpoint and inserting our values
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data'); //error message if no data is available
      }

      const data = await response.json();

      // Extract and map officials with their office titles
      const officialsWithTitles = data.officials.map((official) => {
        // Find the office titles for the official
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
    <>
     <div className="text-white border-4 border-red-500 min-h-screen p-4 bg-blue-500 text-center">
      <head>
        <title>Representatives / CC</title>
      </head>
      <div className="flr-container">
        <header>Find Your Local Representatives</header>
        <h1>Please Input a Valid Zip Code</h1>
        <form onSubmit={handleSubmit}> 
          <input 
            type="text" 
            id="flrInput" 
            value={zipCode}  //gives it the value zipCode and calls the zipCode value storage function below
            onChange={handleZipCodeChange} 
            placeholder="Enter ZIP code"
            //calls handleSubmit when button is pushed
          />
          <button type="submit">Submit</button> 
          
        </form>

        {/* Display Error Message */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Display Representatives */}
        <div className="representatives-list">
          {representatives.length > 0 && representatives.map((rep, index) => (
            <div key={index}>
              <h2>{rep.name}</h2>
              <p>{rep.officeTitles}</p> {/* Display office titles */}
              <p>{rep.party}</p>
              {rep.phones && <p>Phone: {rep.phones[0]}</p>}
              {rep.urls && <p><a href={rep.urls[0]}>Website</a></p>}
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default FindLocalReps;
