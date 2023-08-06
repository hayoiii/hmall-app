import styled from '@emotion/styled';

const Recommend = styled.div`
    position: relative;
    .over-view {
        color: white;
        position: absolute;
        top: 0;
        text-align: center;
        width: 100%;
        height: 100%;
        opacity: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color:rgba(0,0,0, 0.5);
    }
    
    &:hover {
      .over-view {
        opacity: 1;
      }    
    }
`                                       //아이템하나만 렌더링
export default function RecommendItem({product, width, height}){
    return <Recommend>
      <img width={width} height={height} src={product.image} alt="" />
      <div className='over-view'>
          <div>
            <p>{product.brand_name}</p>
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
      </div>
    </Recommend>
}