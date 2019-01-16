import { getGlobalClassNames, HighContrastSelector } from '../../../Styling';
const GlobalClassNames = {
    root: 'ms-PlainCard-root'
};
export function getStyles(props) {
    const { theme, className } = props;
    const classNames = getGlobalClassNames(GlobalClassNames, theme);
    return {
        root: [
            classNames.root,
            {
                pointerEvents: 'auto',
                boxShadow: '0 0 20px rgba(0, 0, 0, .2)',
                border: 'none',
                selectors: {
                    [HighContrastSelector]: {
                        border: '1px solid WindowText'
                    }
                }
            },
            className
        ]
    };
}
