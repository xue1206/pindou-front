import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from '../../store/modules/material';
import HotMaterialCard from '../../components/HotMaterialCard';
import Swiper from  'swiper';

const New: React.SFC = ()  => {
  const swiperRef = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<Swiper>();
  const dispatch = useDispatch();
  const hotMaterials = useSelector(selectors.hotMaterials);

  useEffect(() => {
    dispatch(actions.queryHotMaterials());
  }, [dispatch]);

  useEffect(() => {
    if (swiperRef.current && hotMaterials.length > 0) {
      swiperInstance.current = new Swiper(swiperRef.current, {
        loop: true,
        on: {
          slideChange(this: Swiper) {
            dispatch(actions.setCurrentMaterial(hotMaterials[this.realIndex]));
          }
        }
      });
    }
  }, [hotMaterials, dispatch]);

  return (
    <div className="swiper-container" ref={swiperRef}>
      <div className="swiper-wrapper">
        {
          hotMaterials.map(material => (
            <div className="swiper-slide" key={material.id}>
              <HotMaterialCard material={material}></HotMaterialCard>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default New;