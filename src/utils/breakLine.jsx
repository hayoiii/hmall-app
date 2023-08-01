import { Fragment } from 'react';
export default function breakLine(str) {
  // 1. \n 찾기
  // 2. \n를 <br/>로 바꾸기
  // 1. 2. 을 계속 반복하기

  // String.split(seperator)
  // str1\nstr2\nstr3
  const sentences = str.split('\n') // [str1, str2, str3]

  // idx 0, 1, 2, ..., sentences.length - 1
  return (
    <>
      {sentences.map((value, idx)=>{
        return (
        <Fragment key={idx}>
          {value}
          {idx !== sentences.length - 1  && <br/> }
        </Fragment>
        )
      })}
    </>
  )
}

// 1. str에 \n이 없는 경우 => <>str</> jsx
// 2. str에 \n이 있는 경우 => <>str <br/> str </> jsx
// \n