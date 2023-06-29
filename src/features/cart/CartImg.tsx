import React from 'react';
import './CartImg.css';

type MyProps = {
  imgSrc: string;
};

export default function CartImg({ imgSrc }: MyProps):JSX.Element {
  return (
    <div className='cartImgDiv'>
      <img className='cartImgBig'
      src={imgSrc} alt="imgSrc" />
    </div>
  )
}
