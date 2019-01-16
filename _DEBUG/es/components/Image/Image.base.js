import * as React from 'react';
import { BaseComponent, classNamesFunction, getNativeProps, imageProperties } from '../../Utilities';
import { ImageCoverStyle, ImageFit, ImageLoadState } from './Image.types';
const getClassNames = classNamesFunction();
const KEY_PREFIX = 'fabricImage';
export class ImageBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._coverStyle = ImageCoverStyle.portrait;
        this._imageElement = React.createRef();
        this._frameElement = React.createRef();
        this._onImageLoaded = (ev) => {
            const { src, onLoad } = this.props;
            if (onLoad) {
                onLoad(ev);
            }
            this._computeCoverStyle(this.props);
            if (src) {
                this.setState({
                    loadState: ImageLoadState.loaded
                });
            }
        };
        this._onImageError = (ev) => {
            if (this.props.onError) {
                this.props.onError(ev);
            }
            this.setState({
                loadState: ImageLoadState.error
            });
        };
        this.state = {
            loadState: ImageLoadState.notLoaded
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.src !== this.props.src) {
            this.setState({
                loadState: ImageLoadState.notLoaded
            });
        }
        else if (this.state.loadState === ImageLoadState.loaded) {
            this._computeCoverStyle(nextProps);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        this._checkImageLoaded();
        if (this.props.onLoadingStateChange && prevState.loadState !== this.state.loadState) {
            this.props.onLoadingStateChange(this.state.loadState);
        }
    }
    render() {
        const imageProps = getNativeProps(this.props, imageProperties, ['width', 'height']);
        const { src, alt, width, height, shouldFadeIn, shouldStartVisible, className, imageFit, role, maximizeFrame, styles, theme } = this.props;
        const { loadState } = this.state;
        const coverStyle = this.props.coverStyle !== undefined ? this.props.coverStyle : this._coverStyle;
        const classNames = getClassNames(styles, {
            theme: theme,
            className,
            width,
            height,
            maximizeFrame,
            shouldFadeIn,
            shouldStartVisible,
            isLoaded: loadState === ImageLoadState.loaded || (loadState === ImageLoadState.notLoaded && this.props.shouldStartVisible),
            isLandscape: coverStyle === ImageCoverStyle.landscape,
            isCenter: imageFit === ImageFit.center,
            isCenterCover: imageFit === ImageFit.centerCover,
            isContain: imageFit === ImageFit.contain,
            isCover: imageFit === ImageFit.cover,
            isNone: imageFit === ImageFit.none,
            isError: loadState === ImageLoadState.error,
            isNotImageFit: imageFit === undefined
        });
        return (React.createElement("div", { className: classNames.root, style: { width: width, height: height }, ref: this._frameElement },
            React.createElement("img", Object.assign({}, imageProps, { onLoad: this._onImageLoaded, onError: this._onImageError, key: KEY_PREFIX + this.props.src || '', className: classNames.image, ref: this._imageElement, src: src, alt: alt, role: role }))));
    }
    _checkImageLoaded() {
        const { src } = this.props;
        const { loadState } = this.state;
        if (loadState === ImageLoadState.notLoaded) {
            const isLoaded = this._imageElement.current
                ? (src && (this._imageElement.current.naturalWidth > 0 && this._imageElement.current.naturalHeight > 0)) ||
                    (this._imageElement.current.complete && ImageBase._svgRegex.test(src))
                : false;
            if (isLoaded) {
                this._computeCoverStyle(this.props);
                this.setState({
                    loadState: ImageLoadState.loaded
                });
            }
        }
    }
    _computeCoverStyle(props) {
        const { imageFit, width, height } = props;
        if ((imageFit === ImageFit.cover || imageFit === ImageFit.contain || imageFit === ImageFit.centerCover) &&
            this.props.coverStyle === undefined &&
            this._imageElement.current &&
            this._frameElement.current) {
            let desiredRatio;
            if (!!width && !!height && imageFit !== ImageFit.centerCover) {
                desiredRatio = width / height;
            }
            else {
                desiredRatio = this._frameElement.current.clientWidth / this._frameElement.current.clientHeight;
            }
            const naturalRatio = this._imageElement.current.naturalWidth / this._imageElement.current.naturalHeight;
            if (naturalRatio > desiredRatio) {
                this._coverStyle = ImageCoverStyle.landscape;
            }
            else {
                this._coverStyle = ImageCoverStyle.portrait;
            }
        }
    }
}
ImageBase.defaultProps = {
    shouldFadeIn: true
};
ImageBase._svgRegex = /\.svg$/i;
