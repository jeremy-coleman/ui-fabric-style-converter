import { styled } from '../../../Utilities';
import { PersonaCoinBase } from './PersonaCoin.base';
import { getStyles } from './PersonaCoin.styles';
export const PersonaCoin = styled(PersonaCoinBase, getStyles, undefined, {
    scope: 'PersonaCoin'
});
