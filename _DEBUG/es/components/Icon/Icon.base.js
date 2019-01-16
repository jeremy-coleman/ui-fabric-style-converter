import * as React from 'react';
import { IconType } from './Icon.types';
import { Image } from '../Image/Image';
import { ImageLoadState } from '../Image/Image.types';
import { getNativeProps, htmlElementProperties, BaseComponent, classNamesFunction } from '../../Utilities';
import { getIcon } from '../../Styling';
const getClassNames = classNamesFunction();
export class IconBase extends BaseComponent {
    constructor(props) {
        super(props);
        this.onImageLoadingStateChange = (state) => {
            if (this.props.imageProps && this.props.imageProps.onLoadingStateChange) {
                this.props.imageProps.onLoadingStateChange(state);
            }
            if (state === ImageLoadState.error) {
                this.setState({ imageLoadError: true });
            }
        };
        this.state = {
            imageLoadError: false
        };
    }
    render() {
        const { ariaLabel, className, styles, iconName, imageErrorAs } = this.props;
        const isPlaceholder = typeof iconName === 'string' && iconName.length === 0;
        const isImage = this.props.iconType === IconType.image || this.props.iconType === IconType.Image;
        const { iconClassName, children } = this._getIconContent(iconName);
        const classNames = getClassNames(styles, {
            className,
            iconClassName,
            isImage,
            isPlaceholder
        });
        const containerProps = ariaLabel
            ? {
                'aria-label': ariaLabel
            }
            : {
                role: 'presentation',
                'aria-hidden': true
            };
        const RootType = isImage ? 'div' : 'i';
        const nativeProps = getNativeProps(this.props, htmlElementProperties);
        const { imageLoadError } = this.state;
        const imageProps = { ...this.props.imageProps, onLoadingStateChange: this.onImageLoadingStateChange };
        const ImageType = (imageLoadError && imageErrorAs) || Image;
        return (React.createElement(RootType, Object.assign({ "data-icon-name": iconName }, nativeProps, containerProps, { className: classNames.root }), isImage ? React.createElement(ImageType, Object.assign({}, imageProps)) : children));
    }
    _getIconContent(name) {
        const iconDefinition = getIcon(name) || {
            subset: {
                className: undefined
            },
            code: undefined
        };
        return {
            children: iconDefinition.code,
            iconClassName: iconDefinition.subset.className
        };
    }
}
