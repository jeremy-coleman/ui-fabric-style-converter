import { styled } from '../../Utilities';
import { ContextualMenuItemBase } from './ContextualMenuItem.base';
import { getItemStyles } from './ContextualMenu.classNames';
export const ContextualMenuItem = styled(ContextualMenuItemBase, getItemStyles, undefined, { scope: 'ContextualMenuItem' });
