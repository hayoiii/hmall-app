import React from 'react';
import Header from './Header';
import MainSlider from '../components/MainSlider';
import HomeSlideImages from '../api/HomeSlideData.json'
import KeywordRanking from '../components/KeywordRanking';
import StyleSlider from '../components/StyleSlider';
import Coupon from '../components/Coupon';
import Footer from './Footer';

//'/'
export default function HomePage() {
  return (
    <>
      <Header />
      <MainSlider images={HomeSlideImages}/>
      <KeywordRanking/>
      <Coupon/>
      <StyleSlider/>
      <Footer/>
    </>
  );
}
