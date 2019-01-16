import { getNeutralVariant, getSoftVariant, getStrongVariant } from './variants';
export function addVariants(theme) {
    theme.schemes = {
        strong: getStrongVariant(theme),
        soft: getSoftVariant(theme),
        neutral: getNeutralVariant(theme)
    };
}
