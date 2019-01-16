import { styled } from '../../Utilities';
import { OverlayBase } from './Overlay.base';
import { getStyles } from './Overlay.styles';
export const Overlay = styled(OverlayBase, getStyles, undefined, {
    scope: 'Overlay'
});
