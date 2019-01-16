import { styled } from '../../Utilities';
import { getStyles } from './ExpandingCard.styles';
import { ExpandingCardBase } from './ExpandingCard.base';
export const ExpandingCard = styled(ExpandingCardBase, getStyles, undefined, {
    scope: 'ExpandingCard'
});
