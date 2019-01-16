import * as React from 'react';
import { Image } from '../../Image';
import { Icon } from '../../Icon';
import { Link } from '../../Link';
import { BaseComponent, css } from '../../Utilities';
let styles;
const LIST_ITEM_COUNT = 3;
export class DocumentCardPreview extends BaseComponent {
    constructor() {
        super(...arguments);
        this._renderPreviewList = (previewImages) => {
            const { getOverflowDocumentCountText } = this.props;
            const overflowDocumentCount = previewImages.length - LIST_ITEM_COUNT;
            const overflowText = overflowDocumentCount
                ? getOverflowDocumentCountText
                    ? getOverflowDocumentCountText(overflowDocumentCount)
                    : '+' + overflowDocumentCount
                : null;
            const fileListItems = previewImages.slice(0, LIST_ITEM_COUNT).map((file, fileIndex) => (React.createElement("li", { key: fileIndex },
                React.createElement(Image, { className: css('ms-DocumentCardPreview-fileListIcon', styles.fileListIcon), src: file.iconSrc, role: "presentation", alt: "", width: "16px", height: "16px" }),
                React.createElement(Link, Object.assign({}, (file.linkProps, { href: file.url || (file.linkProps && file.linkProps.href) })), file.name))));
            return (React.createElement("div", null,
                React.createElement("ul", { className: css('ms-DocumentCardPreview-fileList', styles.fileList) }, fileListItems),
                overflowText && React.createElement("span", { className: css('ms-DocumentCardPreview-fileListMore', styles.fileListMore) }, overflowText)));
        };
    }
    render() {
        const { previewImages } = this.props;
        let style, preview;
        let isFileList = false;
        if (previewImages.length > 1) {
            preview = this._renderPreviewList(previewImages);
            isFileList = true;
        }
        else if (previewImages.length === 1) {
            preview = this._renderPreviewImage(previewImages[0]);
            if (previewImages[0].accentColor) {
                style = {
                    borderBottomColor: previewImages[0].accentColor
                };
            }
        }
        return (React.createElement("div", { className: css('ms-DocumentCardPreview', styles.preview, isFileList && 'is-fileList ' + styles.previewIsFileList), style: style }, preview));
    }
    _renderPreviewImage(previewImage) {
        const { width, height, imageFit, previewIconProps, previewIconContainerClass } = previewImage;
        const iconContainerClass = previewIconContainerClass ? previewIconContainerClass : 'ms-DocumentCardPreview-iconContainer';
        if (previewIconProps) {
            return (React.createElement("div", { className: css(iconContainerClass, styles.previewIconContainer), style: { width: width, height: height } },
                React.createElement(Icon, Object.assign({}, previewIconProps))));
        }
        const image = React.createElement(Image, { width: width, height: height, imageFit: imageFit, src: previewImage.previewImageSrc, role: "presentation", alt: "" });
        let icon;
        if (previewImage.iconSrc) {
            icon = React.createElement(Image, { className: css('ms-DocumentCardPreview-icon', styles.icon), src: previewImage.iconSrc, role: "presentation", alt: "" });
        }
        return (React.createElement("div", null,
            image,
            icon));
    }
}
