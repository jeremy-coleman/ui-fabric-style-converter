import { PersonaPresence, PersonaSize } from './Persona.types';
export var personaSize;
(function (personaSize) {
    personaSize.size10 = '20px';
    personaSize.size16 = '16px';
    personaSize.size24 = '24px';
    personaSize.size28 = '28px';
    personaSize.size32 = '32px';
    personaSize.size40 = '40px';
    personaSize.size48 = '48px';
    personaSize.size72 = '72px';
    personaSize.size100 = '100px';
})(personaSize || (personaSize = {}));
export var personaPresenceSize;
(function (personaPresenceSize) {
    personaPresenceSize.size6 = '6px';
    personaPresenceSize.size8 = '8px';
    personaPresenceSize.size12 = '12px';
    personaPresenceSize.size20 = '20px';
    personaPresenceSize.size28 = '28px';
    personaPresenceSize.border = '2px';
})(personaPresenceSize || (personaPresenceSize = {}));
export const sizeBoolean = (size) => ({
    isSize10: size === PersonaSize.size10 || size === PersonaSize.tiny,
    isSize16: size === PersonaSize.size16,
    isSize24: size === PersonaSize.size24 || size === PersonaSize.extraExtraSmall,
    isSize28: size === PersonaSize.size28 || size === PersonaSize.extraSmall,
    isSize32: size === PersonaSize.size32,
    isSize40: size === PersonaSize.size40 || size === PersonaSize.small,
    isSize48: size === PersonaSize.size48 || size === PersonaSize.regular,
    isSize72: size === PersonaSize.size72 || size === PersonaSize.large,
    isSize100: size === PersonaSize.size100 || size === PersonaSize.extraLarge
});
export const sizeToPixels = {
    [PersonaSize.tiny]: 10,
    [PersonaSize.extraExtraSmall]: 24,
    [PersonaSize.extraSmall]: 28,
    [PersonaSize.small]: 40,
    [PersonaSize.regular]: 48,
    [PersonaSize.large]: 72,
    [PersonaSize.extraLarge]: 100,
    [PersonaSize.size10]: 10,
    [PersonaSize.size16]: 16,
    [PersonaSize.size24]: 24,
    [PersonaSize.size28]: 28,
    [PersonaSize.size32]: 32,
    [PersonaSize.size40]: 40,
    [PersonaSize.size48]: 48,
    [PersonaSize.size72]: 72,
    [PersonaSize.size100]: 100
};
export const presenceBoolean = (presence) => ({
    isAvailable: presence === PersonaPresence.online,
    isAway: presence === PersonaPresence.away,
    isBlocked: presence === PersonaPresence.blocked,
    isBusy: presence === PersonaPresence.busy,
    isDoNotDisturb: presence === PersonaPresence.dnd,
    isOffline: presence === PersonaPresence.offline
});
