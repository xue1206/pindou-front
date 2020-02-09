import React from 'react';
import style from './index.module.scss';
import { Material } from '../../entity';

interface MaterialLogoProps{
  background: string,
  coverFilePath: string,
}

const MaterialLogo: React.FunctionComponent<MaterialLogoProps> = ({ background, coverFilePath }) => {
  return (
    <div className={style['material-logo']}>
      <div className={style['material-logo__background']} style={{background: background}}></div>
      <img className={style['material-logo__cover']} src={coverFilePath} alt=""/>
    </div>
  )
}

interface CommonMaterialCardProps{
  material: Material,
}

const CommonMaterialCard: React.FunctionComponent<CommonMaterialCardProps> = ({ material }) => {
  const { cover, background, title } = material;
  return (
    <div className={style['common-material-card'] + ' font-ly'}>
      <MaterialLogo background={background} coverFilePath={cover.filePath}/>
      <div className={style['common-material-card__title']}>{title}</div>
      <div className={style['common-material-card__authority']}>免费图纸</div>
      <div className={style['common-material-card__button']}>pick it!</div>
    </div>
  )
}

export default CommonMaterialCard;