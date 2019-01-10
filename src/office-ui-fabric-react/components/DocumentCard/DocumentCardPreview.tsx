import * as React from 'react';
import { IDocumentCardPreviewProps, IDocumentCardPreviewImage } from './DocumentCard.types';
import { Image } from '../../Image';
import { Icon } from '../../Icon';
import { Link } from '../../Link';
import { BaseComponent, css } from '../../Utilities';
import * as stylesImport from './DocumentCard.scss';
const styles: any = stylesImport;

const LIST_ITEM_COUNT = 3;

export class DocumentCardPreview extends BaseComponent<IDocumentCardPreviewProps, any> {
  public render(): JSX.Element {
    const { previewImages } = this.props;
    let style, preview;
    let isFileList = false;

    if (previewImages.length > 1) {
      // Render a list of files
      preview = this._renderPreviewList(previewImages);
      isFileList = true;
    } else if (previewImages.length === 1) {
      // Render a single preview
      preview = this._renderPreviewImage(previewImages[0]);

      // Override the border color if an accent color was provided
      if (previewImages[0].accentColor) {
        style = {
          borderBottomColor: previewImages[0].accentColor
        };
      }
    }

    return (
      <div className={css('ms-DocumentCardPreview', styles.preview, isFileList && 'is-fileList ' + styles.previewIsFileList)} style={style}>
        {preview}
      </div>
    );
  }

  private _renderPreviewImage(previewImage: IDocumentCardPreviewImage): React.ReactElement<React.HTMLAttributes<HTMLDivElement>> {
    const { width, height, imageFit, previewIconProps, previewIconContainerClass } = previewImage;
    const iconContainerClass = previewIconContainerClass ? previewIconContainerClass : 'ms-DocumentCardPreview-iconContainer';

    if (previewIconProps) {
      return (
        <div className={css(iconContainerClass, styles.previewIconContainer)} style={{ width: width, height: height }}>
          <Icon {...previewIconProps} />
        </div>
      );
    }

    const image = <Image width={width} height={height} imageFit={imageFit} src={previewImage.previewImageSrc} role="presentation" alt="" />;

    let icon;
    if (previewImage.iconSrc) {
      icon = <Image className={css('ms-DocumentCardPreview-icon', styles.icon)} src={previewImage.iconSrc} role="presentation" alt="" />;
    }

    return (
      <div>
        {image}
        {icon}
      </div>
    );
  }

  private _renderPreviewList = (previewImages: IDocumentCardPreviewImage[]): React.ReactElement<React.HTMLAttributes<HTMLDivElement>> => {
    const { getOverflowDocumentCountText } = this.props;

    // Determine how many documents we won't be showing
    const overflowDocumentCount = previewImages.length - LIST_ITEM_COUNT;

    // Determine the overflow text that will be rendered after the preview list.
    const overflowText = overflowDocumentCount
      ? getOverflowDocumentCountText
        ? getOverflowDocumentCountText(overflowDocumentCount)
        : '+' + overflowDocumentCount
      : null;

    // Create list items for the documents to be shown
    const fileListItems = previewImages.slice(0, LIST_ITEM_COUNT).map((file, fileIndex) => (
      <li key={fileIndex}>
        <Image
          className={css('ms-DocumentCardPreview-fileListIcon', styles.fileListIcon)}
          src={file.iconSrc}
          role="presentation"
          alt=""
          width="16px"
          height="16px"
        />
        <Link {...(file.linkProps, { href: file.url || (file.linkProps && file.linkProps.href) })}>{file.name}</Link>
      </li>
    ));

    return (
      <div>
        <ul className={css('ms-DocumentCardPreview-fileList', styles.fileList)}>{fileListItems}</ul>
        {overflowText && <span className={css('ms-DocumentCardPreview-fileListMore', styles.fileListMore)}>{overflowText}</span>}
      </div>
    );
  };
}
