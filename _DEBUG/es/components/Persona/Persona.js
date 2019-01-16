import { styled } from '../../Utilities';
import { PersonaBase } from './Persona.base';
import { getStyles } from './Persona.styles';
export const Persona = styled(PersonaBase, getStyles, undefined, {
    scope: 'Persona'
});
