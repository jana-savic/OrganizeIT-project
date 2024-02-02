import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function Visitor() {
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  const fetchRandomQuote = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://type.fit/api/quotes');
      const number= Math.floor(Math.random()*16)
      const { text, author } = response.data[number];
      setQuote({ text, author });
      setLoading(false);
    } catch (error) {
      setError('Error fetching quote');
      setLoading(false);
      console.error('Error fetching quote: ', error);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);


  return (
    <div>
      <Link to="/auth">
        <div className="login-signup-container">
        <button className="login-signup">Sign Up/Log In</button>
        </div>
      </Link>
      <h1>Random Quote:</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>{quote.text}</p>
          <p>- {quote.author}</p>
        </>
      )}
       <Footer />
    </div>
  );
}

export default Visitor