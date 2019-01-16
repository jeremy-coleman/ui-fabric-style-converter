import { getGlobalClassNames } from '../../../../Styling';
const GlobalClassNames = {
    root: 'ms-PeoplePicker-personaContent',
    personaWrapper: 'ms-PeoplePicker-Persona'
};
export function getStyles(props) {
    const { className, theme } = props;
    const classNames = getGlobalClassNames(GlobalClassNames, theme);
    return {
        root: [
            classNames.root,
            {
                width: '100%',
                padding: '7px 12px'
            },
            className
        ],
        personaWrapper: [
            classNames.personaWrapper,
            {
                width: 180
            }
        ]
    };
}
