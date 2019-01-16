import { styled } from '../../Utilities';
import { CheckBase } from './Check.base';
import { getStyles } from './Check.styles';
export const Check = styled(CheckBase, getStyles, undefined, {
    scope: 'Check'
});
