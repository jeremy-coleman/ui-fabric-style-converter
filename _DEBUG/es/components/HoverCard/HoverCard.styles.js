import { getGlobalClassNames } from '../../Styling';
const GlobalClassNames = {
    host: 'ms-HoverCard-host'
};
export function getStyles(props) {
    const { className, theme } = props;
    const classNames = getGlobalClassNames(GlobalClassNames, theme);
    return {
        host: [classNames.host, className]
    };
}
