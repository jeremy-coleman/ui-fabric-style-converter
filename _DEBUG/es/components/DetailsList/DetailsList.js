import { styled } from '../../Utilities';
import { DetailsListBase } from './DetailsList.base';
import { getStyles } from './DetailsList.styles';
export const DetailsList = styled(DetailsListBase, getStyles, undefined, {
    scope: 'DetailsList'
});
