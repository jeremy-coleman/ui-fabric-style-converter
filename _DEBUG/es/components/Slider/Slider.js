import { styled } from '../../Utilities';
import { SliderBase } from './Slider.base';
import { getStyles } from './Slider.styles';
export const Slider = styled(SliderBase, getStyles, undefined, {
    scope: 'Slider'
});
