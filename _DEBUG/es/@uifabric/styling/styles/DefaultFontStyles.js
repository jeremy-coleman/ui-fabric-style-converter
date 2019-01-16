import { fontFace } from '@uifabric/merge-styles';
import { createFontStyles, FontWeights, LocalizedFontFamilies, LocalizedFontNames } from './fonts';
import { getLanguage } from '@uifabric/utilities';
const DefaultBaseUrl = 'https://static2.sharepointonline.com/files/fabric/assets';
export const DefaultFontStyles = createFontStyles(getLanguage());
function _registerFontFace(fontFamily, url, fontWeight, localFontName) {
    fontFamily = `'${fontFamily}'`;
    const localFontSrc = localFontName !== undefined ? `local('${localFontName}'),` : '';
    fontFace({
        fontFamily,
        src: localFontSrc + `url('${url}.woff2') format('woff2'),` + `url('${url}.woff') format('woff')`,
        fontWeight,
        fontStyle: 'normal'
    });
}
function _registerFontFaceSet(baseUrl, fontFamily, cdnFolder, cdnFontName = 'segoeui', localFontName) {
    const urlBase = `${baseUrl}/${cdnFolder}/${cdnFontName}`;
    _registerFontFace(fontFamily, urlBase + '-light', FontWeights.light, localFontName && localFontName + ' Light');
    _registerFontFace(fontFamily, urlBase + '-semilight', FontWeights.semilight, localFontName && localFontName + ' SemiLight');
    _registerFontFace(fontFamily, urlBase + '-regular', FontWeights.regular, localFontName);
    _registerFontFace(fontFamily, urlBase + '-semibold', FontWeights.semibold, localFontName && localFontName + ' SemiBold');
}
export function registerDefaultFontFaces(baseUrl) {
    if (baseUrl) {
        const fontUrl = `${baseUrl}/fonts`;
        _registerFontFaceSet(fontUrl, LocalizedFontNames.Thai, 'leelawadeeui-thai', 'leelawadeeui');
        _registerFontFaceSet(fontUrl, LocalizedFontNames.Arabic, 'segoeui-arabic');
        _registerFontFaceSet(fontUrl, LocalizedFontNames.Cyrillic, 'segoeui-cyrillic');
        _registerFontFaceSet(fontUrl, LocalizedFontNames.EastEuropean, 'segoeui-easteuropean');
        _registerFontFaceSet(fontUrl, LocalizedFontNames.Greek, 'segoeui-greek');
        _registerFontFaceSet(fontUrl, LocalizedFontNames.Hebrew, 'segoeui-hebrew');
        _registerFontFaceSet(fontUrl, LocalizedFontNames.Vietnamese, 'segoeui-vietnamese');
        _registerFontFaceSet(fontUrl, LocalizedFontNames.WestEuropean, 'segoeui-westeuropean', 'segoeui', 'Segoe UI');
        _registerFontFaceSet(fontUrl, LocalizedFontFamilies.Selawik, 'selawik', 'selawik');
        _registerFontFace('Leelawadee UI Web', `${fontUrl}/leelawadeeui-thai/leelawadeeui-semilight`, FontWeights.light);
        _registerFontFace('Leelawadee UI Web', `${fontUrl}/leelawadeeui-thai/leelawadeeui-bold`, FontWeights.semibold);
    }
}
function _getFontBaseUrl() {
    let win = typeof window !== 'undefined' ? window : undefined;
    let fabricConfig = win ? win['FabricConfig'] : undefined;
    return fabricConfig && fabricConfig.fontBaseUrl !== undefined ? fabricConfig.fontBaseUrl : DefaultBaseUrl;
}
registerDefaultFontFaces(_getFontBaseUrl());
