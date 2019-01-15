import * as React from 'react';
import { PivotBase } from './Pivot.base';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import { PivotItem } from './PivotItem';

export interface IPivot {
  /**
   * Sets focus to the first pivot tab.
   */
  focus(): void;
}

export interface IPivotProps extends React.ClassAttributes<PivotBase>, React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the IPivot interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IPivot>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IPivotStyleProps, IPivotStyles>;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Additional css class to apply to the Pivot
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * The index of the pivot item initially selected.
   *
   * It only works when initialSelectedKey is not defined. You must not use them together.
   */
  initialSelectedIndex?: number;

  /**
   * The key of the pivot item initially selected.
   *
   * It will make initialSelectedIndex not work. You must not use them together.
   */
  initialSelectedKey?: string;

  /**
   * The key of the selected pivot item.
   *
   * If set, this will override the Pivot's selected item state.
   */
  selectedKey?: string;

  /**
   * Callback issued when the selected pivot item is changed
   */
  onLinkClick?: (item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) => void;

  /**
   * Specify the PivotLinkSize to use (normal, large)
   */
  linkSize?: PivotLinkSize;

  /**
   * Specify the PivotLinkFormat to use (links, tabs)
   */
  linkFormat?: PivotLinkFormat;

  /**
   * Specify whether to skip rendering the tabpanel with the content of the selected tab.
   * Use this prop if you plan to separately render the tab content
   * and don't want to leave an empty tabpanel in the page that may confuse Screen Readers.
   */
  headersOnly?: boolean;

  /**
   * Optional. Specify how IDs are generated for each tab header.
   * Useful if you're rendering content outside and need to connect aria-labelledby.
   */
  getTabId?: (itemKey: string, index: number) => string;
}

export type IPivotStyleProps = Required<Pick<IPivotProps, 'theme'>> &
  Pick<IPivotProps, 'className'> & {
    /** Indicates whether Pivot has large format. */
    rootIsLarge?: boolean;
    /** Indicates whether Pivot has tabbed format. */
    rootIsTabs?: boolean;
    /**
     * Indicates whether Pivot link is selected.
     * @deprecated Is not populated with valid value. Specify `linkIsSelected` styling instead.
     */
    linkIsSelected?: boolean;
  };

export interface IPivotStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;
  link: IStyle;
  linkContent: IStyle;
  linkIsSelected: IStyle;
  text: IStyle;
  count: IStyle;
  icon: IStyle;
}

export enum PivotLinkFormat {
  /**
   * Display Pivot Links as links
   */
  links = 0,

  /**
   * Display Pivot Links as Tabs
   */
  tabs = 1
}

export enum PivotLinkSize {
  /**
   * Display Link using normal font size
   */
  normal = 0,

  /**
   * Display links using large font size
   */
  large = 1
}
