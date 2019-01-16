import { styled } from '../../Utilities';
import { PanelBase } from './Panel.base';
import { getStyles } from './Panel.styles';
export const Panel = styled(PanelBase, getStyles, undefined, {
    scope: 'Panel'
});
