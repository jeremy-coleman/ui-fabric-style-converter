import { styled } from '../../Utilities';
import { ModalBase } from './Modal.base';
import { getStyles } from './Modal.styles';
export const Modal = styled(ModalBase, getStyles, undefined, {
    scope: 'Modal'
});
