import { styled } from '../../../Utilities';
import { getStyles } from './PlainCard.styles';
import { PlainCardBase } from './PlainCard.base';
export const PlainCard = styled(PlainCardBase, getStyles, undefined, {
    scope: 'PlainCard'
});
