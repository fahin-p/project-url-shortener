import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

//const API_BASE_URL = 'http://localhost:3001';
// This line should be used to make the deployed client work at vercel.Else to run locally the above line should be used and this should be commented out
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
console.log('API_BASE_URL:', API_BASE_URL);
function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/shorten`, { longUrl });
      const createdShortUrl = `${API_BASE_URL}/${response.data.shortCode}`;
      setShortUrl(createdShortUrl);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to shorten URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter a long URL to shorten..."
        />
        <button type="submit" disabled={!longUrl || isLoading}>
          {isLoading ? 'Shortening...' : 'Shorten'}
        </button>
      </form>

      {shortUrl && (
        <div className="result">
          <p>Your shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;