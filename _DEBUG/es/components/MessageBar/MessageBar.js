import { styled } from '../../Utilities';
import { MessageBarBase } from './MessageBar.base';
import { getStyles } from './MessageBar.styles';
export const MessageBar = styled(MessageBarBase, getStyles, undefined, {
    scope: 'MessageBar'
});
