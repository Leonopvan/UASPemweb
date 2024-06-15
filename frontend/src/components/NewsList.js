import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css'; // Impor file CSS

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://192.168.18.12:5000/news'); // Ganti dengan IP yang sesuai
        console.log('API response:', response.data); // Log response
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching the news data:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h1>News List</h1>
      {news.length > 0 ? (
        news.map((item) => (
          <div key={item.id} className="news-item">
            <h2>{item.judul_berita}</h2>
            <p>{item.jenis_berita}</p>
            <p>{item.ringkasan}</p>
            <p>{Array.isArray(item.keywords) ? item.keywords.join(', ') : item.keywords}</p>
          </div>
        ))
      ) : (
        <p>No news available.</p>
      )}
    </div>
  );
};

export default NewsList;
