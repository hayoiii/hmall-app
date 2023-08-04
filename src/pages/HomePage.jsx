import React from 'react';
import Header from './Header';
import MainSlider from '../components/MainSlider';
import HomeSlideImages from '../api/HomeSlideData.json'
import KeywordRanking from '../components/KeywordRanking';
import StyleSlider from '../components/StyleSlider';

//'/'
export default function HomePage() {
  return (
    <>
      <Header />
      <MainSlider images={HomeSlideImages}/>
      <KeywordRanking/>
      <StyleSlider/>
      홈 페이지
    </>
  );
}
