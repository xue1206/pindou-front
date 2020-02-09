import React from 'react';
import style from './index.module.scss';
import { Material } from '../../entity';

function formateCategoryName(categoryName: string): string {
  return categoryName.split('').concat('系列'.split('')).join('·')
}

interface HotMaterialCardProps{
  material: Material,
}

const HotMaterialCard: React.FunctionComponent<HotMaterialCardProps> = ({ material }) => {
  const { cover, category, title } = material;
  return (
    <div className={style['hot-material-card']}>
      <div className={style['hot-material-card__cover']}>
        <img src={cover.filePath} alt=""></img>
      </div>
      <div className={style['hot-material-card__content'] + ' font-hxb'}>
        <div className={style['hot-material-card__category']}>{formateCategoryName(category.name)}</div>
        <div className={style['hot-material-card__title']}>{title}</div>
        <div className={style['hot-material-card__button']}>点击获取图纸</div>
      </div>
    </div>
  )
}

export default HotMaterialCard;