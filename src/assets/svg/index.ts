import {FC} from 'react';
import {SvgProps} from 'react-native-svg';

export type IconsType = Record<string, FC<SvgProps>>;

export {default as Pencil} from './pencil.svg';
export {default as Cross} from './cross.svg';
export {default as ArrowLeft} from './arrow-left.svg';
export {default as ArrowRight} from './arrow-right.svg';
export {default as PlusSquared} from './plus-squared.svg';
export {default as HideEye} from './hide-eye.svg';
