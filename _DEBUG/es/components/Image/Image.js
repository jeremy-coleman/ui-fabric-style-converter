import { styled } from '../../Utilities';
import { ImageBase } from './Image.base';
import { getStyles } from './Image.styles';
export const Image = styled(ImageBase, getStyles, undefined, {
    scope: 'Image'
});
