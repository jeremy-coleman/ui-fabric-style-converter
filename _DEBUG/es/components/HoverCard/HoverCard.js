import { styled } from '../../Utilities';
import { getStyles } from './HoverCard.styles';
import { HoverCardBase } from './HoverCard.base';
export const HoverCard = styled(HoverCardBase, getStyles, undefined, {
    scope: 'HoverCard'
});
