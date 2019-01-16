import { styled } from '../../Utilities';
import { TooltipBase } from './Tooltip.base';
import { getStyles } from './Tooltip.styles';
export const Tooltip = styled(TooltipBase, getStyles, undefined, {
    scope: 'Tooltip'
});
