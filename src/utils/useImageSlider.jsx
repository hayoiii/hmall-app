import { useState, useEffect, useRef } from 'react';
export default function useImageSlider({
  length,
  isAutoPlay,
  imageWidth,
  offset = '0px',
  numOfShown = 1,
}) {
  const [currentIdx, setCurrentIdx] = useState(numOfShown);
  const [autoPlay, setAutoPlay] = useState(isAutoPlay);
  const refTimer = useRef(null);
  const calculateTranslateX = (idx) => {
    return `translateX(calc(${-imageWidth * idx}px + ${offset}))`;
  };

  const [style, setStyle] = useState({
    transform: calculateTranslateX(numOfShown),
    transition: 'all 1s ease',
  });

  const handleClickIndicator = (idx) => {
    // currentIdx를 클릭한 idx로 바꿔준다
    setCurrentIdx(idx);
  };

  const back = () => {
    setCurrentIdx((prev) => {
      setStyle({
        transform: calculateTranslateX(prev - 1),
        transition: 'all 1s ease',
      });
      return prev - 1;
    });
  };

  const next = () => {
    setCurrentIdx((prev) => {
      setStyle({
        transform: calculateTranslateX(prev + 1),
        transition: 'all 1s ease',
      });
      return prev + 1;
    });
  };
  const handleClickArrow = (isBack) => {
    if (isBack) {
      back();
    } else if (!isBack) {
      next();
    }
  };

  useEffect(() => {
    if (autoPlay === true && refTimer.current === null) {
      const slideTimer = setInterval(() => next(), 3000);
      refTimer.current = slideTimer;
    } else if (autoPlay === false) {
      clearInterval(refTimer.current);
      refTimer.current = null;
    }
  }, [autoPlay, length]);

  useEffect(() => {
    const lastIdx = length - 1;
    // fake fake 0 1 2 fake fake
    //  0    1   2 3 4  5    6
    // lastIdx = 이미지의 마지막 index
    // numOfShown = 한 번에 보이는 이미지 수 = fake 이미지의 개수 / 2
    // numOfShown + imglength
    // numOfShown = 2    <= 1
    // numOfShown = 3    <= 2
    if (currentIdx <= numOfShown - 1 || currentIdx >= numOfShown + length) {
      carouselLoop();
    }
  }, [currentIdx]);

  const carouselLoop = () => {
    const lastIdx = length - 1;
    if (currentIdx === 0) {
      setCurrentIdx(lastIdx + 1);
      setTimeout(
        () =>
          setStyle({
            transform: calculateTranslateX(lastIdx + 1),
            transition: 'unset',
          }),
        1100,
      );
    } else if (currentIdx === lastIdx + 2) {
      setCurrentIdx(1);
      setTimeout(
        () =>
          setStyle({
            transform: calculateTranslateX(1),
            transition: 'unset',
          }),
        1100,
      );
    }
  };

  return {
    handleClickIndicator,
    handleClickArrow,
    currentIdx,
    setCurrentIdx,
    autoPlay,
    setAutoPlay,
    style,
    setStyle,
  };
}
