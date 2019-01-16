import { styled } from '../../Utilities';
import { getStyles } from './GroupedList.styles';
import { GroupedListBase } from './GroupedList.base';
export const GroupedList = styled(GroupedListBase, getStyles, undefined, {
    scope: 'GroupedList'
});
