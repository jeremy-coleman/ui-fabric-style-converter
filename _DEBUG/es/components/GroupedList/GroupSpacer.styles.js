import { getGlobalClassNames } from '../../Styling';
const GlobalClassNames = {
    root: 'ms-GroupSpacer'
};
export const getStyles = (props) => {
    const { theme } = props;
    const classNames = getGlobalClassNames(GlobalClassNames, theme);
    return {
        root: [classNames.root, theme.fonts.medium, { display: 'inline-block' }]
    };
};
