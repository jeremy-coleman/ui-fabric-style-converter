import { styled } from '../../Utilities';
import { MarqueeSelectionBase } from './MarqueeSelection.base';
import { getStyles } from './MarqueeSelection.styles';
export const MarqueeSelection = styled(MarqueeSelectionBase, getStyles, undefined, {
    scope: 'MarqueeSelection'
});
