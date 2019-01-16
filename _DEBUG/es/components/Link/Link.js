import { styled } from '../../Utilities';
import { LinkBase } from './Link.base';
import { getStyles } from './Link.styles';
export const Link = styled(LinkBase, getStyles, undefined, {
    scope: 'Link'
});
