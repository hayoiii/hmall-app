import React from 'react';
import Header from './Header';
import MainSlider from '../components/MainSlider';
import HomeSlideImages from '../api/HomeSlideImages.json'

//'/'
export default function HomePage() {
  return (
    <>
      <Header />
      <MainSlider images={HomeSlideImages}/>
      홈 페이지
    </>
  );
}
