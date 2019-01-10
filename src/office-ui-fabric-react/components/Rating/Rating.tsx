import { styled } from '../../Utilities';
import { IRatingProps, IRatingStyleProps, IRatingStyles } from './Rating.types';
import { getStyles } from './Rating.styles';
import { RatingBase } from './Rating.base';

export const Rating: (props: IRatingProps) => JSX.Element = styled<IRatingProps, IRatingStyleProps, IRatingStyles>(
  RatingBase,
  getStyles,
  undefined,
  { scope: 'Rating' }
);
