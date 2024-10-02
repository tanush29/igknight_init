import React, { useState } from 'react';

function App() {
  const [idea, setIdea] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null); // State to hold error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before making a new request
    setSuggestions([]); // Clear previous suggestions

    try {
      const response = await fetch('http://127.0.0.1:5000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });

      if (!response.ok) {
        // If the response is not OK, throw an error to be caught below
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (err) {
      // Handle errors from the fetch request
      console.error('Frontend Error:', err);
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Igknight AI</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Enter your startup idea"
          required
        />
        <button type="submit">Generate Suggestions</button>
      </form>

      {error && (
        <div style={{ color: 'red', marginTop: '20px' }}>
          <p>Error: {error}</p>
        </div>
      )}

      {suggestions.length > 0 && (
        <div>
          <h2>Suggestions:</h2>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
