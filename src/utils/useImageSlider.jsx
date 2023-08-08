import { useState, useEffect, useRef} from 'react';
export default function useImageSlider({length, isAutoPlay}) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [autoPlay, setAutoPlay] = useState(isAutoPlay); 
    const refTimer = useRef(null);

    const handleClickArrow = (isBack) => {
        //boolean -> true / false
        // currentIdx++
    
        //isBack을 인자로 받아서 isBack이 true라면 setcurrentidx를 -1해서 한칸 왼쪾으로 이동하게함.
        //근데 currentidx가 0이랑 같다면? 이동하지 않고 반환해준다
        if (isBack) {
          // 왼쪽으로 이동
          if (currentIdx === 0) return;
          setCurrentIdx(currentIdx - 1);
        } else if (!isBack) {
          // 오른쪽으로 이동
          //length를쓰면 0부터가 아니라 1부터 세기때문에 -1을 해준값을 lastIdx에 넣어줌!
          const lastIdx = length - 1;
          //currentIdx가 lastIdx와 같거나 크면 리턴
          if (currentIdx >= lastIdx) return;
          //그게 아니라면 setCurrentIdx에 +1을 해준다
          setCurrentIdx(currentIdx + 1);
        }
    };

    useEffect(()=>{
        if(autoPlay === true && refTimer.current === null){
          // 2초마다 currentIdx를 1 증가시킨다.
          // 0, 1, ..., images.length - 1
          const newTimer = setInterval(() => {
            const lastIndex = length - 1;
            setCurrentIdx(prev => {
              if(prev >= lastIndex) {
                return 0
              }
              return prev + 1
            })}, 3 * 1000)
          refTimer.current = newTimer
        } else if(autoPlay === false) {
          // 타이머를 취소한다
          clearInterval(refTimer.current)
          refTimer.current = null;
        }
      },[autoPlay,length])

	return {
        handleClickArrow,currentIdx,setCurrentIdx,autoPlay, setAutoPlay
    }
}