import { styled } from '../../Utilities';
import { CommandBarBase } from './CommandBar.base';
import { getStyles } from './CommandBar.styles';
export const CommandBar = styled(CommandBarBase, getStyles, undefined, {
    scope: 'CommandBar'
});
