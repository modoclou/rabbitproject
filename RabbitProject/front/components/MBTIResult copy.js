import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MbtiResult = () => {
  const [movieList, setMovieList] = useState([]);
  const [hoveredMovie, setHoveredMovie] = useState(null);

  useEffect(() => {
    // 백엔드에서 MBTI 기반 추천 영화 데이터 5개를 가져옴
    const fetchMovies = async () => {
      try {
        const mbti = localStorage.getItem('mbti') || 'INFP';
        const response = await axios.get(`http://localhost:8080/api/ai-movie?mbti=${mbti}`);
        setMovieList(response.data); // data는 [{posterUrl, title, originalTitle, genre, country, runtime, description}, ...]
        setHoveredMovie(response.data[0]); // 첫 번째 영화로 초기 설정
      } catch (error) {
        console.error('영화 불러오기 실패:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="mbti-result-container">
      <div className="poster-list">
        {movieList.map((movie, index) => (
          <div
            key={index}
            className="poster-wrapper"
            onMouseEnter={() => setHoveredMovie(movie)}
          >
            <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
          </div>
        ))}
      </div>

      <div className="shine" style={{ transition: 'transform 0.2s ease-in-out' }}>
        {hoveredMovie && (
          <>
            <div className="movie-title">{hoveredMovie.title}</div>
            <div className="original-title">{hoveredMovie.originalTitle}</div>
            <div className="genre-info">
              {hoveredMovie.genre} · {hoveredMovie.country} · {hoveredMovie.runtime}
            </div>
            <div className="description">{hoveredMovie.description}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default MbtiResult;
