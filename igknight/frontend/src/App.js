import React, { useState } from 'react';

function App() {
  const [idea, setIdea] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send user input to the backend
    const response = await fetch('http://localhost:5000/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea }),
    });
    const data = await response.json();
    setSuggestions(data.suggestions);
  };

  return (
    <div>
      <h1>Startup Idea Generator</h1>
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
