import React from 'react';
import Header from './Header';
import MainSlider from '../components/MainSlider';
import HomeSlideImages from '../api/HomeSlideData.json'
import KeywordRanking from '../components/KeywordRanking';

//'/'
export default function HomePage() {
  return (
    <>
      <Header />
      <MainSlider images={HomeSlideImages}/>
      <KeywordRanking/>
      홈 페이지
    </>
  );
}
