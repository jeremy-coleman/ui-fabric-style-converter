import { getGlobalClassNames } from '../../Styling';
const GlobalClassNames = {
    root: 'ms-TooltipHost'
};
export const getStyles = (props) => {
    const { className, theme } = props;
    const classNames = getGlobalClassNames(GlobalClassNames, theme);
    return {
        root: [
            classNames.root,
            {
                display: 'inline'
            },
            className
        ]
    };
};
