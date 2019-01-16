import { styled } from '../../Utilities';
import { FabricBase } from './Fabric.base';
import { getStyles } from './Fabric.styles';
export const Fabric = styled(FabricBase, getStyles, undefined, {
    scope: 'Fabric'
});
