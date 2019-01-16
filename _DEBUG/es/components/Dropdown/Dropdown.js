import { styled } from '../../Utilities';
import { DropdownBase } from './Dropdown.base';
import { getStyles } from './Dropdown.styles';
export const Dropdown = styled(DropdownBase, getStyles, undefined, {
    scope: 'Dropdown'
});
