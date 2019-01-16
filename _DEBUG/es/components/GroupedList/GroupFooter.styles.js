import { getGlobalClassNames } from '../../Styling';
const GlobalClassNames = {
    root: 'ms-groupFooter'
};
export const getStyles = (props) => {
    const { theme, className } = props;
    const classNames = getGlobalClassNames(GlobalClassNames, theme);
    return {
        root: [
            theme.fonts.medium,
            classNames.root,
            {
                position: 'relative',
                padding: '5px 38px'
            },
            className
        ]
    };
};
