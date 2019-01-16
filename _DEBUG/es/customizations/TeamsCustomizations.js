import { createTheme } from '../Styling';
export const TeamsCustomizations = {
    settings: {
        theme: createTheme({
            palette: {
                themePrimary: '#6061aa',
                themeLighterAlt: '#f7f7fc',
                themeLighter: '#e1e1f2',
                themeLight: '#c7c8e6',
                themeTertiary: '#9797cd',
                themeSecondary: '#6f70b5',
                themeDarkAlt: '#56579a',
                themeDark: '#494a82',
                themeDarker: '#363660',
                neutralLighterAlt: '#f8f8f8',
                neutralLighter: '#f4f4f4',
                neutralLight: '#eaeaea',
                neutralQuaternaryAlt: '#dadada',
                neutralQuaternary: '#d0d0d0',
                neutralTertiaryAlt: '#c8c8c8',
                neutralTertiary: '#b6b0b0',
                neutralSecondary: '#9f9797',
                neutralPrimaryAlt: '#877f7f',
                neutralPrimary: '#282424',
                neutralDark: '#585151',
                black: '#403b3b',
                white: '#fff'
            }
        })
    },
    scopedSettings: {
        PrimaryButton: {
            styles: {
                root: {
                    borderRadius: 3
                }
            }
        },
        DefaultButton: {
            styles: {
                root: {
                    background: 'transparent',
                    border: '2px solid #BDBDBD',
                    borderRadius: 3
                },
                rootHovered: {
                    background: 'transparent'
                }
            }
        }
    }
};
export default TeamsCustomizations;