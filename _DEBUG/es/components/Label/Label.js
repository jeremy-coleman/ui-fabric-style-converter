import { styled } from '../../Utilities';
import { LabelBase } from './Label.base';
import { getStyles } from './Label.styles';
export const Label = styled(LabelBase, getStyles, undefined, {
    scope: 'Label'
});
