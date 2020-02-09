import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from '../../store/modules/material';
import Swiper from  'swiper';
import CommonMaterialCard from '../../components/CommonMaterialCard';

const All: React.SFC = ()  => {
  const swiperRef = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<Swiper>();
  const dispatch = useDispatch();
  const allMaterials = useSelector(selectors.allMaterials);

  useEffect(() => {
    dispatch(actions.queryAllMaterials());
  }, [dispatch]);

  useEffect(() => {
    if (swiperRef.current && allMaterials.length > 0) {
      swiperInstance.current = new Swiper(swiperRef.current, {
        loop: true,
        slidesPerView: 5, // TODO 根据屏幕大小来设置
        centeredSlides: true,
        on: {
          slideChange(this: Swiper) {
            dispatch(actions.setCurrentMaterial(allMaterials[this.realIndex]));
          }
        }
      });
    }
  }, [allMaterials, dispatch]);

  return (
    <div className="swiper-container" ref={swiperRef}>
      <div className="swiper-wrapper">
        {
          allMaterials.map(material => (
            <div className="swiper-slide" key={material.id}>
              <CommonMaterialCard material={material}></CommonMaterialCard>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default All;