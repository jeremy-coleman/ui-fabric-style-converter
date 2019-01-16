import { styled } from '../../Utilities';
import { TextFieldBase } from './TextField.base';
import { getStyles } from './TextField.styles';
export const TextField = styled(TextFieldBase, getStyles, undefined, {
    scope: 'TextField'
});
