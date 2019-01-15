import * as React from 'react';

import { BaseComponent, css } from '../../Utilities';
import { IDocumentCardStatusProps } from './DocumentCard.types';

import { Icon } from '../../Icon';

// import * as stylesImport from './DocumentCard.scss';
// const styles: any = stylesImport;

let styles

export class DocumentCardStatus extends BaseComponent<IDocumentCardStatusProps, any> {
  constructor(props: IDocumentCardStatusProps) {
    super(props);
  }

  public render() {
    const { statusIcon, status } = this.props;
    const iconProps = {
      iconName: statusIcon,
      styles: {
        root: { padding: '8px' }
      }
    };
    return (
      <div className={css('ms-DocumentCardStatus', styles.status)}>
        {statusIcon && <Icon {...iconProps} />}
        {status}
      </div>
    );
  }
}
