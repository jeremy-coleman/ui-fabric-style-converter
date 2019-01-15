/// <reference types="node" />
/// <reference types="prop-types" />
/// <reference types="react" />

export declare type ICSSRule = 'initial' | 'inherit' | 'unset';
export declare type ICSSPercentageRule = string;
export declare type ICSSPixelUnitRule = string | number;
export declare type ICSSBaselinePositionRule = 'baseline' | 'last baseline' | 'first baseline';
export declare type ICSSOverflowAndSelfPositionRule = 'center' | 'start' | 'end' | 'self-start' | 'self-end' | 'flex-start' | 'flex-end' | 'safe center' | 'safe start' | 'safe end' | 'safe self-start' | 'safe self-end' | 'safe flex-start' | 'safe flex-end' | 'unsafe center' | 'unsafe start' | 'unsafe end' | 'unsafe self-start' | 'unsafe self-end' | 'unsafe flex-start' | 'unsafe flex-end';
export declare type ICSSDisplayRule = 'block' | 'inline' | 'run-in' | 'flow' | 'flow-root' | 'table' | 'flex' | 'grid' | 'ruby' | 'block flow' | 'inline table' | 'flex run-in' | 'list-item' | 'list-item block' | 'list-item inline' | 'list-item flow' | 'list-item flow-root' | 'list-item block flow' | 'list-item block flow-root' | 'flow list-item block' | 'table-row-group' | 'table-header-group' | 'table-footer-group' | 'table-row' | 'table-cell' | 'table-column-group' | 'table-column' | 'table-caption' | 'ruby-base' | 'ruby-text' | 'ruby-base-container' | 'ruby-text-container' | 'contents' | 'none' | 'inline-block' | 'inline-table' | 'inline-flex' | 'inline-grid';
export declare type IFontWeight = ICSSRule | 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | 100 | '200' | 200 | '300' | 300 | '400' | 400 | '500' | 500 | '600' | 600 | '700' | 700 | '800' | 800 | '900' | 900;
export declare type IMixBlendModes = ICSSRule | 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity';
/**
 * The base font style.
 */
export interface IRawFontStyle {
	/**
	 * The font property is shorthand that allows you to do one of two things: you can
	 * either set up six of the most mature font properties in one line, or you can set
	 *  one of a choice of keywords to adopt a system font setting.
	 */
	font?: ICSSRule | string;
	/**
	 * The font-family property allows one or more font family names and/or generic family
	 * names to be specified for usage on the selected element(s)' text. The browser then
	 * goes through the list; for each character in the selection it applies the first
	 * font family that has an available glyph for that character.
	 */
	fontFamily?: ICSSRule | string;
	/**
	 * The font-kerning property allows contextual adjustment of inter-glyph spacing, i.e.
	 * the spaces between the characters in text. This property controls <bold>metric
	 * kerning</bold> - that utilizes adjustment data contained in the font. Optical
	 * Kerning is not supported as yet.
	 */
	fontKerning?: ICSSRule | string;
	/**
	 * Specifies the size of the font. Used to compute em and ex units.
	 * See CSS 3 font-size property https://www.w3.org/TR/css-fonts-3/#propdef-font-size
	 */
	fontSize?: ICSSRule | 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' | 'larger' | 'smaller' | ICSSPixelUnitRule | ICSSPercentageRule;
	/**
	 * The font-size-adjust property adjusts the font-size of the fallback fonts defined
	 * with font-family, so that the x-height is the same no matter what font is used.
	 * This preserves the readability of the text when fallback happens.
	 * See CSS 3 font-size-adjust property
	 * https://www.w3.org/TR/css-fonts-3/#propdef-font-size-adjust
	 */
	fontSizeAdjust?: ICSSRule | 'none' | number;
	/**
	 * Allows you to expand or condense the widths for a normal, condensed, or expanded
	 * font face.
	 * See CSS 3 font-stretch property
	 * https://drafts.csswg.org/css-fonts-3/#propdef-font-stretch
	 */
	fontStretch?: ICSSRule | 'normal' | 'ultra-condensed' | 'extra-condensed' | 'condensed' | 'semi-condensed' | 'semi-expanded' | 'expanded' | 'extra-expanded' | 'ultra-expanded';
	/**
	 * The font-style property allows normal, italic, or oblique faces to be selected.
	 * Italic forms are generally cursive in nature while oblique faces are typically
	 * sloped versions of the regular face. Oblique faces can be simulated by artificially
	 * sloping the glyphs of the regular face.
	 * See CSS 3 font-style property https://www.w3.org/TR/css-fonts-3/#propdef-font-style
	 */
	fontStyle?: ICSSRule | 'normal' | 'italic' | 'oblique';
	/**
	 * This value specifies whether the user agent is allowed to synthesize bold or
	 *  oblique font faces when a font family lacks bold or italic faces.
	 */
	fontSynthesis?: ICSSRule | string;
	/**
	 * The font-variant property enables you to select the small-caps font within a font
	 * family.
	 */
	fontVariant?: ICSSRule | string;
	/**
	 * Fonts can provide alternate glyphs in addition to default glyph for a character.
	 * This property provides control over the selection of these alternate glyphs.
	 */
	fontVariantAlternates?: ICSSRule | string;
	/**
	 * Specifies the weight or boldness of the font.
	 * See CSS 3 'font-weight' property https://www.w3.org/TR/css-fonts-3/#propdef-font-weight
	 */
	fontWeight?: IFontWeight;
}
/**
 * Font face definition.
 *
 * @public
 */
export interface IFontFace extends IRawFontStyle {
	/**
	 * Specifies the src of the font.
	 */
	src?: string;
	/**
	 * unicode-range allows you to set a specific range of characters to be downloaded
	 * from a font (embedded using \@font-face) and made available for use on the current
	 * page.
	 */
	unicodeRange?: ICSSRule | string;
	/**
	 * Feature settings for the font.
	 */
	fontFeatureSettings?: string;
}
/**
 * All raw style properties.
 *
 * @public
 */
export interface IRawStyleBase extends IRawFontStyle {
	/**
	 * (Ms specific) constrast adjust rule.
	 */
	MsHighContrastAdjust?: ICSSRule | string;
	/**
	 * (Moz specific) font smoothing directive.
	 */
	MozOsxFontSmoothing?: 'none' | 'antialiased' | 'grayscale' | 'subpixel-antialiased';
	/**
	 * (Webkit specific) font smoothing directive.
	 */
	WebkitFontSmoothing?: 'none' | 'antialiased' | 'grayscale' | 'subpixel-antialiased';
	/**
	 * (Webkit specific) momentum scrolling on iOS devices
	 */
	WebkitOverflowScrolling?: 'auto' | 'touch';
	/**
	 * Aligns a flex container's lines within the flex container when there is extra space
	 * in the cross-axis, similar to how justify-content aligns individual items within the main-axis.
	 */
	alignContent?: ICSSRule | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';
	/**
	 * Sets the default alignment in the cross axis for all of the flex container's items,
	 * including anonymous flex items, similarly to how justify-content aligns items along the main axis.
	 */
	alignItems?: ICSSRule | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
	/**
	 * Aligns the box (as the alignment subject) within its containing block (as the alignment container)
	 * along the block/column/cross axis of the alignment container.
	 *
	 * See CSS align-self property
	 * https://www.w3.org/TR/css-align-3/#propdef-align-self
	 */
	alignSelf?: ICSSRule | 'auto' | 'normal' | 'stretch' | ICSSBaselinePositionRule | ICSSOverflowAndSelfPositionRule;
	/**
	 * This property allows precise alignment of elements, such as graphics, that do not
	 * have a baseline-table or lack the desired baseline in their baseline-table. With the
	 * alignment-adjust property, the position of the baseline identified by the
	 * alignment-baseline can be explicitly determined. It also determines precisely
	 * the alignment point for each glyph within a textual element.
	 */
	alignmentAdjust?: ICSSRule | string;
	/**
	 * Specifies how an object is aligned with respect to its parent. This property specifies
	 * which baseline of this element is to be aligned with the corresponding baseline of the
	 * parent. For example, this allows alphabetic baselines in Roman text to stay aligned
	 * across font size changes. It defaults to the baseline with the same name as the computed
	 * value of the alignment-baseline property.
	 */
	alignmentBaseline?: ICSSRule | string;
	/**
	 * The animation CSS property is a shorthand property for the various animation properties:
	 * `animation-name`, `animation-duration`, `animation-timing-function`, `animation-delay`,
	 * `animation-iteration-count`, `animation-direction`, `animation-fill-mode`, and
	 * `animation-play-state`.
	 */
	animation?: ICSSRule | string;
	/**
	 * Defines a length of time to elapse before an animation starts, allowing an animation to begin execution some time after it is applied.
	 */
	animationDelay?: ICSSRule | string;
	/**
	 * Defines whether an animation should run in reverse on some or all cycles.
	 */
	animationDirection?: ICSSRule | string;
	/**
	 * Specifies the length an animation takes to finish. Default value is 0, meaning
	 * there will be no animation.
	 */
	animationDuration?: ICSSRule | string;
	/**
	 * The animation-fill-mode CSS property specifies how a CSS animation should apply
	 * styles to its target before and after its execution.
	 */
	animationFillMode?: ICSSRule | 'none' | 'forwards' | 'backwards' | 'both';
	/**
	 * Specifies how many times an animation cycle should play.
	 */
	animationIterationCount?: ICSSRule | string;
	/**
	 * Defines the list of animations that apply to the element.
	 */
	animationName?: ICSSRule | string;
	/**
	 * Defines whether an animation is running or paused.
	 */
	animationPlayState?: ICSSRule | string;
	/**
	 * The animation-timing-function specifies the speed curve of an animation.
	 */
	animationTimingFunction?: ICSSRule | string;
	/**
	 * Allows changing the style of any element to platform-based interface elements or
	 * vice versa.
	 */
	appearance?: ICSSRule | string;
	/**
	 * Lets you apply graphical effects such as blurring or color shifting to the area
	 * behind an element. Because it applies to everything behind the element, to see
	 * the effect you must make the element or its background at least partially transparent.
	 */
	backdropFilter?: ICSSRule | string;
	/**
	 * Edge requires the -webkit prefix backdrop-filter.
	 */
	WebkitBackdropFilter?: ICSSRule | string;
	/**
	 * Determines whether or not the “back” side of a transformed element is visible when
	 * facing the viewer.
	 */
	backfaceVisibility?: ICSSRule | string;
	/**
	 * Shorthand property to set the values for one or more of:
	 * background-clip, background-color, background-image,
	 * background-origin, background-position, background-repeat,
	 * background-size, and background-attachment.
	 */
	background?: ICSSRule | string;
	/**
	 * If a background-image is specified, this property determines
	 * whether that image's position is fixed within the viewport,
	 * or scrolls along with its containing block.
	 * See CSS 3 background-attachment property https://drafts.csswg.org/css-backgrounds-3/#the-background-attachment
	 */
	backgroundAttachment?: ICSSRule | 'scroll' | 'fixed' | 'local';
	/**
	 * This property describes how the element's background images should blend with each
	 * other and the element's background color. The value is a list of blend modes that
	 * corresponds to each background image. Each element in the list will apply to the
	 * corresponding element of background-image. If a property doesn’t have enough
	 * comma-separated values to match the number of layers, the UA must calculate its
	 * used value by repeating the list of values until there are enough.
	 */
	backgroundBlendMode?: ICSSRule | string;
	/**
	 * The background-clip CSS property specifies if an element's background, whether a
	 * <color> or an <image>, extends underneath its border.
	 *
	 * \* Does not work in IE
	 *
	 * \* The `text` value is experimental and should not be used in production code.
	 */
	backgroundClip?: ICSSRule | 'border-box' | 'padding-box' | 'content-box' | 'text';
	/**
	 * Sets the background color of an element.
	 */
	backgroundColor?: ICSSRule | string;
	/**
	 * Sets a compositing style for background images and colors.
	 */
	backgroundComposite?: ICSSRule | string;
	/**
	 * Applies one or more background images to an element. These can be any valid CSS
	 * image, including url() paths to image files or CSS gradients.
	 */
	backgroundImage?: ICSSRule | string;
	/**
	 * Specifies what the background-position property is relative to.
	 */
	backgroundOrigin?: ICSSRule | string;
	/**
	 * Sets the position of a background image.
	 */
	backgroundPosition?: ICSSRule | string;
	/**
	 * Background-repeat defines if and how background images will be repeated after they
	 * have been sized and positioned
	 */
	backgroundRepeat?: ICSSRule | string;
	/**
	 * Sets the size of background images
	 */
	backgroundSize?: ICSSRule | string;
	/**
	 * Shorthand property that defines the different properties of all four sides of an
	 * element's border in a single declaration. It can be used to set border-width,
	 * border-style and border-color, or a subset of these.
	 */
	border?: ICSSRule | 0 | string;
	/**
	 * Shorthand that sets the values of border-bottom-color,
	 * border-bottom-style, and border-bottom-width.
	 */
	borderBottom?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * Sets the color of the bottom border of an element.
	 */
	borderBottomColor?: ICSSRule | string;
	/**
	 * Defines the shape of the border of the bottom-left corner.
	 */
	borderBottomLeftRadius?: ICSSRule | string;
	/**
	 * Defines the shape of the border of the bottom-right corner.
	 */
	borderBottomRightRadius?: ICSSRule | string;
	/**
	 * Sets the line style of the bottom border of a box.
	 */
	borderBottomStyle?: ICSSRule | string;
	/**
	 * Sets the width of an element's bottom border. To set all four borders, use the
	 * border-width shorthand property which sets the values simultaneously for
	 * border-top-width, border-right-width, border-bottom-width, and border-left-width.
	 */
	borderBottomWidth?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * Border-collapse can be used for collapsing the borders between table cells
	 */
	borderCollapse?: ICSSRule | string;
	/**
	 * The CSS border-color property sets the color of an element's four borders. This
	 * property can have from one to four values, made up of the elementary properties:
	 *      •       border-top-color
	 *      •       border-right-color
	 *      •       border-bottom-color
	 *      •       border-left-color The default color is the currentColor of each of
	 * these values.
	 * If you provide one value, it sets the color for the element. Two values set the
	 * horizontal and vertical values, respectively. Providing three values sets the top,
	 * vertical, and bottom values, in that order. Four values set all for sides: top,
	 * right, bottom, and left, in that order.
	 */
	borderColor?: ICSSRule | string;
	/**
	 * Specifies different corner clipping effects, such as scoop (inner curves), bevel
	 * (straight cuts) or notch (cut-off rectangles). Works along with border-radius to
	 * specify the size of each corner effect.
	 */
	borderCornerShape?: ICSSRule | string;
	/**
	 * The property border-image-source is used to set the image to be used instead of
	 * the border style. If this is set to none the border-style is used instead.
	 */
	borderImageSource?: ICSSRule | string;
	/**
	 * The border-image-width CSS property defines the offset to use for dividing the
	 * border image in nine parts, the top-left corner, central top edge, top-right-corner,
	 * central right edge, bottom-right corner, central bottom edge, bottom-left corner,
	 * and central right edge. They represent inward distance from the top, right, bottom,
	 * and left edges.
	 */
	borderImageWidth?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * Shorthand property that defines the border-width, border-style and border-color of
	 * an element's left border in a single declaration. Note that you can use the
	 * corresponding longhand properties to set specific individual properties of the left
	 * border — border-left-width, border-left-style and border-left-color.
	 */
	borderLeft?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * The CSS border-left-color property sets the color of an element's left border. This
	 *  page explains the border-left-color value, but often you will find it more
	 * convenient to fix the border's left color as part of a shorthand set, either
	 * border-left or border-color. Colors can be defined several ways. For more
	 * information, see Usage.
	 */
	borderLeftColor?: ICSSRule | string;
	/**
	 * Sets the style of an element's left border. To set all four borders, use the
	 * shorthand property, border-style. Otherwise, you can set the borders individually
	 * with border-top-style, border-right-style, border-bottom-style, border-left-style.
	 */
	borderLeftStyle?: ICSSRule | string;
	/**
	 * Sets the width of an element's left border. To set all four borders, use the
	 * border-width shorthand property which sets the values simultaneously for
	 * border-top-width, border-right-width, border-bottom-width, and border-left-width.
	 */
	borderLeftWidth?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * Defines how round the border's corners are.
	 */
	borderRadius?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * Shorthand property that defines the border-width, border-style and border-color of
	 * an element's right border in a single declaration. Note that you can use the
	 * corresponding longhand properties to set specific individual properties of the
	 * right border — border-right-width, border-right-style and border-right-color.
	 */
	borderRight?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * Sets the color of an element's right border. This page explains the
	 * border-right-color value, but often you will find it more convenient to fix the
	 * border's right color as part of a shorthand set, either border-right or border-color.
	 * Colors can be defined several ways. For more information, see Usage.
	 */
	borderRightColor?: ICSSRule | string;
	/**
	 * Sets the style of an element's right border. To set all four borders, use the
	 * shorthand property, border-style. Otherwise, you can set the borders individually
	 * with border-top-style, border-right-style, border-bottom-style, border-left-style.
	 */
	borderRightStyle?: ICSSRule | string;
	/**
	 * Sets the width of an element's right border. To set all four borders, use the
	 * border-width shorthand property which sets the values simultaneously for
	 * border-top-width, border-right-width, border-bottom-width, and border-left-width.
	 */
	borderRightWidth?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * Specifies the distance between the borders of adjacent cells.
	 */
	borderSpacing?: ICSSRule | string;
	/**
	 * Sets the style of an element's four borders. This property can have from one to
	 * four values. With only one value, the value will be applied to all four borders;
	 * otherwise, this works as a shorthand property for each of border-top-style,
	 *  border-right-style, border-bottom-style, border-left-style, where each border
	 *  style may be assigned a separate value.
	 */
	borderStyle?: ICSSRule | string;
	/**
	 * Shorthand property that defines the border-width, border-style and border-color of
	 * an element's top border in a single declaration. Note that you can use the
	 * corresponding longhand properties to set specific individual properties of the top
	 * border — border-top-width, border-top-style and border-top-color.
	 */
	borderTop?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * Sets the color of an element's top border. This page explains the border-top-color
	 * value, but often you will find it more convenient to fix the border's top color as
	 * part of a shorthand set, either border-top or border-color.
	 * Colors can be defined several ways. For more information, see Usage.
	 */
	borderTopColor?: ICSSRule | string;
	/**
	 * Sets the rounding of the top-left corner of the element.
	 */
	borderTopLeftRadius?: ICSSRule | string;
	/**
	 * Sets the rounding of the top-right corner of the element.
	 */
	borderTopRightRadius?: ICSSRule | string;
	/**
	 * Sets the style of an element's top border. To set all four borders, use the
	 * shorthand property, border-style. Otherwise, you can set the borders individually
	 * with border-top-style, border-right-style, border-bottom-style, border-left-style.
	 */
	borderTopStyle?: ICSSRule | string;
	/**
	 * Sets the width of an element's top border. To set all four borders, use the
	 * border-width shorthand property which sets the values simultaneously for
	 * border-top-width, border-right-width, border-bottom-width, and border-left-width.
	 */
	borderTopWidth?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * Sets the width of an element's four borders. This property can have from one to
	 * four values. This is a shorthand property for setting values simultaneously for
	 * border-top-width, border-right-width, border-bottom-width, and border-left-width.
	 */
	borderWidth?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * This property specifies how far an absolutely positioned box's bottom margin edge
	 * is offset above the bottom edge of the box's containing block. For relatively
	 * positioned boxes, the offset is with respect to the bottom edges of the box itself
	 * (i.e., the box is given a position in the normal flow, then offset from that
	 * position according to these properties).
	 */
	bottom?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * Breaks a box into fragments creating new borders, padding and repeating backgrounds
	 * or lets it stay as a continuous box on a page break, column break, or, for inline
	 * elements, at a line break.
	 */
	boxDecorationBreak?: ICSSRule | string;
	/**
	 * Cast a drop shadow from the frame of almost any element.
	 * MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow
	 */
	boxShadow?: ICSSRule | string;
	/**
	 * The CSS box-sizing property is used to alter the default CSS box model used to
	 * calculate width and height of the elements.
	 */
	boxSizing?: ICSSRule | 'border-box' | 'content-box';
	/**
	 * The CSS break-after property allows you to force a break on multi-column layouts.
	 * More specifically, it allows you to force a break after an element. It allows you
	 * to determine if a break should occur, and what type of break it should be. The
	 * break-after CSS property describes how the page, column or region break behaves
	 * after the generated box. If there is no generated box, the property is ignored.
	 */
	breakAfter?: ICSSRule | string;
	/**
	 * Control page/column/region breaks that fall above a block of content
	 */
	breakBefore?: ICSSRule | string;
	/**
	 * Control page/column/region breaks that fall within a block of content
	 */
	breakInside?: ICSSRule | string;
	/**
	 * The clear CSS property specifies if an element can be positioned next to or must be
	 * positioned below the floating elements that precede it in the markup.
	 */
	clear?: ICSSRule | string;
	/**
	 * Clipping crops an graphic, so that only a portion of the graphic is rendered, or
	 * filled. This clip-rule property, when used with the clip-path property, defines
	 * which clip rule, or algorithm, to use when filling the different parts of a graphics.
	 */
	clipRule?: ICSSRule | string;
	/**
	 * The color property sets the color of an element's foreground content (usually text),
	 * accepting any standard CSS color from keywords and hex values to RGB(a) and HSL(a).
	 */
	color?: ICSSRule | string;
	/**
	 * Describes the number of columns of the element.
	 * See CSS 3 column-count property https://www.w3.org/TR/css3-multicol/#cc
	 */
	columnCount?: ICSSRule | number | 'auto';
	/**
	 * Specifies how to fill columns (balanced or sequential).
	 */
	columnFill?: ICSSRule | string;
	/**
	 * The column-gap property controls the width of the gap between columns in multi-column
	 * elements.
	 */
	columnGap?: ICSSRule | string;
	/**
	 * Sets the width, style, and color of the rule between columns.
	 */
	columnRule?: ICSSRule | string;
	/**
	 * Specifies the color of the rule between columns.
	 */
	columnRuleColor?: ICSSRule | string;
	/**
	 * Specifies the width of the rule between columns.
	 */
	columnRuleWidth?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * The column-span CSS property makes it possible for an element to span across all
	 * columns when its value is set to all. An element that spans more than one column
	 * is called a spanning element.
	 */
	columnSpan?: ICSSRule | string;
	/**
	 * Specifies the width of columns in multi-column elements.
	 */
	columnWidth?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * This property is a shorthand property for setting column-width and/or column-count.
	 */
	columns?: ICSSRule | string;
	/**
	 * Content for pseudo selectors.
	 */
	content?: string;
	/**
	 * The counter-increment property accepts one or more names of counters (identifiers),
	 * each one optionally followed by an integer which specifies the value by which the
	 * counter should be incremented (e.g. if the value is 2, the counter increases by 2
	 * each time it is invoked).
	 */
	counterIncrement?: ICSSRule | string;
	/**
	 * The counter-reset property contains a list of one or more names of counters, each
	 * one optionally followed by an integer (otherwise, the integer defaults to 0.) Each
	 * time the given element is invoked, the counters specified by the property are set to the given integer.
	 */
	counterReset?: ICSSRule | string;
	/**
	 * The cue property specifies sound files (known as an "auditory icon") to be played by
	 * speech media agents before and after presenting an element's content; if only one
	 * file is specified, it is played both before and after. The volume at which the
	 * file(s) should be played, relative to the volume of the main element, may also be
	 * specified. The icon files may also be set separately with the cue-before and
	 * cue-after properties.
	 */
	cue?: ICSSRule | string;
	/**
	 * The cue-after property specifies a sound file (known as an "auditory icon") to be
	 * played by speech media agents after presenting an element's content; the volume at
	 * which the file should be played may also be specified. The shorthand property cue
	 * sets cue sounds for both before and after the element is presented.
	 */
	cueAfter?: ICSSRule | string;
	/**
	 * Specifies the mouse cursor displayed when the mouse pointer is over an element.
	 */
	cursor?: ICSSRule | string;
	/**
	 * The direction CSS property specifies the text direction/writing direction. The rtl
	 * is used for Hebrew or Arabic text, the ltr is for other languages.
	 */
	direction?: ICSSRule | string;
	/**
	 * This property specifies the type of rendering box used for an element. It is a
	 * shorthand property for many other display properties.
	 * W3: https://www.w3.org/TR/css-display-3/#the-display-properties
	 * MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/display
	 */
	display?: ICSSRule | ICSSDisplayRule;
	/**
	 * The ‘fill’ property paints the interior of the given graphical element. The area to
	 * be painted consists of any areas inside the outline of the shape. To determine the
	 * inside of the shape, all subpaths are considered, and the interior is determined
	 * according to the rules associated with the current value of the ‘fill-rule’
	 * property. The zero-width geometric outline of a shape is included in the area to be
	 * painted.
	 */
	fill?: ICSSRule | string;
	/**
	 * SVG: Specifies the opacity of the color or the content the current object is filled
	 * with.
	 * See SVG 1.1 https://www.w3.org/TR/SVG/painting.html#FillOpacityProperty
	 */
	fillOpacity?: ICSSRule | number;
	/**
	 * The ‘fill-rule’ property indicates the algorithm which is to be used to determine
	 * what parts of the canvas are included inside the shape. For a simple,
	 * non-intersecting path, it is intuitively clear what region lies "inside"; however,
	 * for a more complex path, such as a path that intersects itself or where one subpath
	 * encloses another, the interpretation of "inside" is not so obvious.
	 * The ‘fill-rule’ property provides two options for how the inside of a shape is
	 * determined:
	 */
	fillRule?: ICSSRule | string;
	/**
	 * Applies various image processing effects. This property is largely unsupported. See
	 * Compatibility section for more information.
	 */
	filter?: ICSSRule | string;
	/**
	 * Shorthand for `flex-grow`, `flex-shrink`, and `flex-basis`.
	 */
	flex?: ICSSRule | string | number;
	/**
	 * The flex-basis CSS property describes the initial main size of the flex item before
	 * any free space is distributed according to the flex factors described in the flex
	 * property (flex-grow and flex-shrink).
	 */
	flexBasis?: ICSSRule | string | number;
	/**
	 * The flex-direction CSS property describes how flex items are placed in the flex
	 * container, by setting the direction of the flex container's main axis.
	 */
	flexDirection?: ICSSRule | 'row' | 'row-reverse' | 'column' | 'column-reverse';
	/**
	 * The flex-flow CSS property defines the flex container's main and cross axis. It is
	 * a shorthand property for the flex-direction and flex-wrap properties.
	 */
	flexFlow?: ICSSRule | string;
	/**
	 * Specifies the flex grow factor of a flex item.
	 * See CSS flex-grow property https://drafts.csswg.org/css-flexbox-1/#flex-grow-property
	 */
	flexGrow?: ICSSRule | number | string;
	/**
	 * Specifies the flex shrink factor of a flex item.
	 * See CSS flex-shrink property https://drafts.csswg.org/css-flexbox-1/#flex-shrink-property
	 */
	flexShrink?: ICSSRule | number | string;
	/**
	 * Specifies whether flex items are forced into a single line or can be wrapped onto
	 * multiple lines. If wrapping is allowed, this property also enables you to control
	 * the direction in which lines are stacked.
	 * See CSS flex-wrap property https://drafts.csswg.org/css-flexbox-1/#flex-wrap-property
	 */
	flexWrap?: ICSSRule | 'nowrap' | 'wrap' | 'wrap-reverse';
	/**
	 * Elements which have the style float are floated horizontally. These elements can
	 * move as far to the left or right of the containing element. All elements after
	 * the floating element will flow around it, but elements before the floating element
	 * are not impacted. If several floating elements are placed after each other, they
	 * will float next to each other as long as there is room.
	 */
	float?: ICSSRule | string;
	/**
	 * Flows content from a named flow (specified by a corresponding flow-into) through
	 * selected elements to form a dynamic chain of layout regions.
	 */
	flowFrom?: ICSSRule | string;
	/**
	 * Lays out one or more grid items bound by 4 grid lines. Shorthand for setting
	 * grid-column-start, grid-column-end, grid-row-start, and grid-row-end in a single
	 * declaration.
	 */
	gridArea?: ICSSRule | string;
	/**
	 * Specifies the size of an implicitly-created grid column track
	 */
	gridAutoColumns?: ICSSRule | string;
	/**
	 * Controls how the auto-placement algorithm works,
	 * specifying exactly how auto-placed items get flowed into the grid.
	 */
	gridAutoFlow?: ICSSRule | string;
	/**
	 * Specifies the size of an implicitly-created grid column track
	 */
	gridAutoRows?: ICSSRule | string;
	/**
	 * Controls a grid item's placement in a grid area, particularly grid position and a
	 * grid span. Shorthand for setting grid-column-start and grid-column-end in a single
	 * declaration.
	 */
	gridColumn?: ICSSRule | string;
	/**
	 * Controls a grid item's placement in a grid area as well as grid position and a
	 * grid span. The grid-column-end property (with grid-row-start, grid-row-end, and
	 * grid-column-start) determines a grid item's placement by specifying the grid lines
	 * of a grid item's grid area.
	 */
	gridColumnEnd?: ICSSRule | string;
	/**
	 * Sets the size of the gap (gutter) between an element's columns
	 */
	gridColumnGap?: ICSSRule | string;
	/**
	 * Determines a grid item's placement by specifying the starting grid lines of a grid
	 * item's grid area . A grid item's placement in a grid area consists of a grid
	 * position and a grid span. See also ( grid-row-start, grid-row-end, and
	 * grid-column-end)
	 */
	gridColumnStart?: ICSSRule | string;
	/**
	 * Specifies the gaps (gutters) between grid rows and columns. It is a shorthand
	 * for grid-row-gap and grid-column-gap.
	 */
	gridGap?: ICSSRule | string;
	/**
	 * Gets or sets a value that indicates which row an element within a Grid should
	 * appear in. Shorthand for setting grid-row-start and grid-row-end in a single
	 * declaration.
	 */
	gridRow?: ICSSRule | string;
	/**
	 * Determines a grid item’s placement by specifying the block-end. A grid item's
	 * placement in a grid area consists of a grid position and a grid span. The
	 * grid-row-end property (with grid-row-start, grid-column-start, and grid-column-end)
	 * determines a grid item's placement by specifying the grid lines of a grid item's
	 * grid area.
	 */
	gridRowEnd?: ICSSRule | string;
	/**
	 * Sets the size of the gap (gutter) between an element's grid rows
	 */
	gridRowGap?: ICSSRule | string;
	/**
	 * Specifies a grid item’s start position within the grid row by contributing a line,
	 * a span, or nothing (automatic) to its grid placement, thereby specifying the
	 * inline-start edge of its grid area
	 */
	gridRowStart?: ICSSRule | string;
	/**
	 * Specifies a row position based upon an integer location, string value, or desired
	 * row size.
	 * css/properties/grid-row is used as short-hand for grid-row-position and
	 * grid-row-position
	 */
	gridRowPosition?: ICSSRule | string;
	/**
	 * Specifies named grid areas which are not associated with any particular grid item,
	 * but can be referenced from the grid-placement properties. The syntax of the
	 * grid-template-areas property also provides a visualization of the structure of the
	 * grid, making the overall layout of the grid container easier to understand.
	 */
	gridTemplate?: ICSSRule | string;
	/**
	 * Specifies named grid areas
	 */
	gridTemplateAreas?: ICSSRule | string;
	/**
	 * Specifies (with grid-template-rows) the line names and track sizing functions of
	 * the grid. Each sizing function can be specified as a length, a percentage of the
	 * grid container’s size, a measurement of the contents occupying the column or row,
	 * or a fraction of the free space in the grid.
	 */
	gridTemplateColumns?: ICSSRule | string;
	/**
	 * Specifies (with grid-template-columns) the line names and track sizing functions of
	 * the grid. Each sizing function can be specified as a length, a percentage of the
	 * grid container’s size, a measurement of the contents occupying the column or row,
	 * or a fraction of the free space in the grid.
	 */
	gridTemplateRows?: ICSSRule | string;
	/**
	 * Sets the height of an element. The content area of the element height does not
	 * include the padding, border, and margin of the element.
	 */
	height?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * Specifies the minimum number of characters in a hyphenated word
	 */
	hyphenateLimitChars?: ICSSRule | string;
	/**
	 * Indicates the maximum number of successive hyphenated lines in an element. The
	 * ‘no-limit’ value means that there is no limit.
	 */
	hyphenateLimitLines?: ICSSRule | string;
	/**
	 * Specifies the maximum amount of trailing whitespace (before justification) that may
	 * be left in a line before hyphenation is triggered to pull part of a word from the
	 * next line back up into the current one.
	 */
	hyphenateLimitZone?: ICSSRule | string;
	/**
	 * Specifies whether or not words in a sentence can be split by the use of a manual or
	 * automatic hyphenation mechanism.
	 */
	hyphens?: ICSSRule | string;
	/**
	 * Defines how the browser distributes space between and around flex items
	 * along the main-axis of their container.
	 * See CSS justify-content property
	 * https://www.w3.org/TR/css-flexbox-1/#justify-content-property
	 */
	justifyContent?: ICSSRule | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch';
	/**
	 * Justifies the box (as the alignment subject) within its containing block (as the alignment container)
	 * along the inline/row/main axis of the alignment container.
	 *
	 * See CSS jusitfy-self property
	 * https://www.w3.org/TR/css-align-3/#propdef-justify-self
	 */
	justifySelf?: ICSSRule | 'auto' | 'normal' | 'stretch' | ICSSBaselinePositionRule | ICSSOverflowAndSelfPositionRule | 'left' | 'right' | 'safe left' | 'safe right' | 'unsafe left' | 'unsafe right';
	/**
	 * Sets the left position of an element relative to the nearest anscestor that is set
	 * to position absolute, relative, or fixed.
	 */
	left?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * The letter-spacing CSS property specifies the spacing behavior between text
	 * characters.
	 */
	letterSpacing?: ICSSRule | string;
	/**
	 * Specifies the height of an inline block level element.
	 * See CSS 2.1 line-height property https://www.w3.org/TR/CSS21/visudet.html#propdef-line-height
	 */
	lineHeight?: ICSSRule | 'normal' | ICSSPixelUnitRule | ICSSPercentageRule;
	/**
	 * Shorthand property that sets the list-style-type, list-style-position and
	 * list-style-image properties in one declaration.
	 */
	listStyle?: ICSSRule | string;
	/**
	 * This property sets the image that will be used as the list item marker. When the
	 * image is available, it will replace the marker set with the 'list-style-type'
	 * marker. That also means that if the image is not available, it will show the style
	 * specified by list-style-property
	 */
	listStyleImage?: ICSSRule | string;
	/**
	 * Specifies if the list-item markers should appear inside or outside the content flow.
	 */
	listStylePosition?: ICSSRule | string;
	/**
	 * Specifies the type of list-item marker in a list.
	 */
	listStyleType?: ICSSRule | string;
	/**
	 * The margin property is shorthand to allow you to set all four margins of an element
	 * at once. Its equivalent longhand properties are margin-top, margin-right,
	 * margin-bottom and margin-left. Negative values are also allowed.
	 */
	margin?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * margin-bottom sets the bottom margin of an element.
	 */
	marginBottom?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * margin-left sets the left margin of an element.
	 */
	marginLeft?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * margin-right sets the right margin of an element.
	 */
	marginRight?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * margin-top sets the top margin of an element.
	 */
	marginTop?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * The marquee-direction determines the initial direction in which the marquee content moves.
	 */
	marqueeDirection?: ICSSRule | string;
	/**
	 * The 'marquee-style' property determines a marquee's scrolling behavior.
	 */
	marqueeStyle?: ICSSRule | string;
	/**
	 * This property is shorthand for setting mask-image, mask-mode, mask-repeat,
	 * mask-position, mask-clip, mask-origin, mask-composite and mask-size. Omitted
	 * values are set to their original properties' initial values.
	 */
	mask?: ICSSRule | string;
	/**
	 * This property is shorthand for setting mask-border-source, mask-border-slice,
	 * mask-border-width, mask-border-outset, and mask-border-repeat. Omitted values
	 * are set to their original properties' initial values.
	 */
	maskBorder?: ICSSRule | string;
	/**
	 * This property specifies how the images for the sides and the middle part of the
	 * mask image are scaled and tiled. The first keyword applies to the horizontal
	 * sides, the second one applies to the vertical ones. If the second keyword is
	 * absent, it is assumed to be the same as the first, similar to the CSS
	 * border-image-repeat property.
	 */
	maskBorderRepeat?: ICSSRule | string;
	/**
	 * This property specifies inward offsets from the top, right, bottom, and left
	 * edges of the mask image, dividing it into nine regions: four corners, four
	 * edges, and a middle. The middle image part is discarded and treated as fully
	 * transparent black unless the fill keyword is present. The four values set the
	 * top, right, bottom and left offsets in that order, similar to the CSS
	 * border-image-slice property.
	 */
	maskBorderSlice?: ICSSRule | string;
	/**
	 * Specifies an image to be used as a mask. An image that is empty, fails to
	 * download, is non-existent, or cannot be displayed is ignored and does not mask
	 * the element.
	 */
	maskBorderSource?: ICSSRule | string;
	/**
	 * This property sets the width of the mask box image, similar to the CSS
	 * border-image-width property.
	 */
	maskBorderWidth?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * Determines the mask painting area, which defines the area that is affected by
	 * the mask. The painted content of an element may be restricted to this area.
	 */
	maskClip?: ICSSRule | string;
	/**
	 * For elements rendered as a single box, specifies the mask positioning area. For
	 * elements rendered as multiple boxes (e.g., inline boxes on several lines, boxes
	 * on several pages) specifies which boxes box-decoration-break operates on to
	 * determine the mask positioning area(s).
	 */
	maskOrigin?: ICSSRule | string;
	/**
	 * This property must not be used. It is no longer included in any standard or
	 * standard track specification, nor is it implemented in any browser. It is only
	 * used when the text-align-last property is set to size. It controls allowed
	 * adjustments of font-size to fit line content.
	 */
	maxFontSize?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * Sets the maximum height for an element. It prevents the height of the element to
	 *  exceed the specified value. If min-height is specified and is greater than
	 * max-height, max-height is overridden.
	 */
	maxHeight?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * Sets the maximum width for an element. It limits the width property to be larger
	 * than the value specified in max-width.
	 */
	maxWidth?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * Sets the minimum height for an element. It prevents the height of the element to
	 * be smaller than the specified value. The value of min-height overrides both
	 * max-height and height.
	 */
	minHeight?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * Sets the minimum width of an element. It limits the width property to be not
	 * smaller than the value specified in min-width.
	 */
	minWidth?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * The mix-blend-mode CSS property describes how an element's content should blend
	 * with the content of the element's direct parent and the element's background.
	 */
	mixBlendMode?: ICSSRule | IMixBlendModes;
	/**
	 * Specifies the transparency of an element.
	 * See CSS 3 opacity property https://drafts.csswg.org/css-color-3/#opacity
	 */
	opacity?: ICSSRule | number | string;
	/**
	 * Specifies the order used to lay out flex items in their flex container.
	 * Elements are laid out in the ascending order of the order value.
	 * See CSS order property https://drafts.csswg.org/css-flexbox-1/#order-property
	 */
	order?: ICSSRule | number;
	/**
	 * In paged media, this property defines the minimum number of lines in
	 * a block container that must be left at the bottom of the page.
	 * See CSS 3 orphans, widows properties https://drafts.csswg.org/css-break-3/#widows-orphans
	 */
	orphans?: ICSSRule | number;
	/**
	 * The CSS outline property is a shorthand property for setting one or more of the
	 * individual outline properties outline-style, outline-width and outline-color in a
	 * single rule. In most cases the use of this shortcut is preferable and more
	 * convenient.
	 * Outlines differ from borders in the following ways:
	 *      •       Outlines do not take up space, they are drawn above the content.
	 *      •       Outlines may be non-rectangular. They are rectangular in
	 * Gecko/Firefox. Internet Explorer attempts to place the smallest contiguous outline
	 * around all elements or shapes that are indicated to have an outline. Opera draws a
	 * non-rectangular shape around a construct.
	 */
	outline?: ICSSRule | 0 | string;
	/**
	 * The outline-color property sets the color of the outline of an element. An
	 * outline is a line that is drawn around elements, outside the border edge, to make
	 * the element stand out.
	 */
	outlineColor?: ICSSRule | string;
	/**
	 * The outline-offset property offsets the outline and draw it beyond the border edge.
	 */
	outlineOffset?: ICSSRule | string;
	/**
	 * The overflow property controls how extra content exceeding the bounding box of an
	 * element is rendered. It can be used in conjunction with an element that has a
	 * fixed width and height, to eliminate text-induced page distortion.
	 */
	overflow?: ICSSRule | 'auto' | 'hidden' | 'scroll' | 'visible';
	/**
	 * Specifies the preferred scrolling methods for elements that overflow.
	 */
	overflowStyle?: ICSSRule | string;
	/**
	 * Specifies whether or not the browser should insert line breaks within words to
	 * prevent text from overflowing its content box. In contrast to word-break,
	 * overflow-wrap will only create a break if an entire word cannot be placed on its
	 * own line without overflowing.
	 */
	overflowWrap?: ICSSRule | 'normal' | 'break-word';
	/**
	 * Controls how extra content exceeding the x-axis of the bounding box of an element
	 * is rendered.
	 */
	overflowX?: ICSSRule | 'auto' | 'hidden' | 'scroll' | 'visible';
	/**
	 * Controls how extra content exceeding the y-axis of the bounding box of an element
	 * is rendered.
	 */
	overflowY?: ICSSRule | 'auto' | 'hidden' | 'scroll' | 'visible';
	/**
	 * The padding optional CSS property sets the required padding space on one to four
	 * sides of an element. The padding area is the space between an element and its
	 * border. Negative values are not allowed but decimal values are permitted. The
	 *  element size is treated as fixed, and the content of the element shifts toward the
	 * center as padding is increased. The padding property is a shorthand to avoid
	 * setting each side separately (padding-top, padding-right, padding-bottom,
	 * padding-left).
	 */
	padding?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * The padding-block-end CSS property defines the logical block end padding
	 * of an element, which maps to a physical padding depending on the element's
	 * writing mode, directionality, and text orientation. It corresponds to the
	 * padding-top, padding-right, padding-bottom, or padding-left property
	 * depending on the values defined for writing-mode, direction, and text-orientation.
	 */
	paddingBlockEnd?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * The padding-block-start CSS property defines the logical block start padding
	 * of an element, which maps to a physical padding depending on the element's
	 * writing mode, directionality, and text orientation. It corresponds to the
	 * padding-top, padding-right, padding-bottom, or padding-left property depending
	 * on the values defined for writing-mode, direction, and text-orientation.
	 */
	paddingBlockStart?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * The padding-left CSS property of an element sets the padding space required on the
	 * left side of an element. The padding area is the space between the content of the
	 * element and its border. Contrary to margin-left values, negative values of
	 * padding-left are invalid.
	 */
	paddingLeft?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * The padding-bottom CSS property of an element sets the padding space required on
	 * the bottom of an element. The padding area is the space between the content of the
	 * element and its border. Contrary to margin-bottom values, negative values of
	 * padding-bottom are invalid.
	 */
	paddingBottom?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * The padding-inline-end CSS property defines the logical inline end padding of an element,
	 * which maps to a physical padding depending on the element's writing mode, directionality,
	 * and text orientation. It corresponds to the padding-top, padding-right, padding-bottom,
	 * or padding-left property depending on the values defined for writing-mode, direction,
	 * and text-orientation.
	 */
	paddingInlineEnd?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * The padding-inline-start CSS property defines the logical inline start padding of
	 * an element, which maps to a physical padding depending on the element's writing mode,
	 * directionality, and text orientation. It corresponds to the padding-top, padding-right,
	 * padding-bottom, or padding-left property depending on the values defined for writing-mode,
	 * direction, and text-orientation.
	 */
	paddingInlineStart?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * The padding-right CSS property of an element sets the padding space required on the
	 * right side of an element. The padding area is the space between the content of the
	 * element and its border. Contrary to margin-right values, negative values of
	 * padding-right are invalid.
	 */
	paddingRight?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * The padding-top CSS property of an element sets the padding space required on the
	 * top of an element. The padding area is the space between the content of the element
	 * and its border. Contrary to margin-top values, negative values of padding-top are
	 * invalid.
	 */
	paddingTop?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * The page-break-after property is supported in all major browsers. With CSS3,
	 *  page-break-* properties are only aliases of the break-* properties. The CSS3
	 * Fragmentation spec defines breaks for all CSS box fragmentation.
	 */
	pageBreakAfter?: ICSSRule | string;
	/**
	 * The page-break-before property sets the page-breaking behavior before an element.
	 * With CSS3, page-break-* properties are only aliases of the break-* properties. The
	 * CSS3 Fragmentation spec defines breaks for all CSS box fragmentation.
	 */
	pageBreakBefore?: ICSSRule | string;
	/**
	 * Sets the page-breaking behavior inside an element. With CSS3, page-break-*
	 * properties are only aliases of the break-* properties. The CSS3 Fragmentation spec
	 * defines breaks for all CSS box fragmentation.
	 */
	pageBreakInside?: ICSSRule | string;
	/**
	 * The pause property determines how long a speech media agent should pause before and
	 * after presenting an element. It is a shorthand for the pause-before and pause-after
	 *  properties.
	 */
	pause?: ICSSRule | string;
	/**
	 * The pause-after property determines how long a speech media agent should pause after
	 * presenting an element. It may be replaced by the shorthand property pause, which
	 * sets pause time before and after.
	 */
	pauseAfter?: ICSSRule | string;
	/**
	 * The pause-before property determines how long a speech media agent should pause
	 * before presenting an element. It may be replaced by the shorthand property pause,
	 * which sets pause time before and after.
	 */
	pauseBefore?: ICSSRule | string;
	/**
	 * The perspective property defines how far an element is placed from the view on the
	 * z-axis, from the screen to the viewer. Perspective defines how an object is viewed.
	 * In graphic arts, perspective is the representation on a flat surface of what the
	 * viewer's eye would see in a 3D space. (See Wikipedia for more information about
	 * graphical perspective and for related illustrations.)
	 * The illusion of perspective on a flat surface, such as a computer screen, is created
	 * by projecting points on the flat surface as they would appear if the flat surface
	 * were a window through which the viewer was looking at the object. In discussion of
	 * virtual environments, this flat surface is called a projection plane.
	 */
	perspective?: ICSSRule | string;
	/**
	 * The perspective-origin property establishes the origin for the perspective property.
	 * It effectively sets the X and Y position at which the viewer appears to be looking
	 * at the children of the element.
	 * When used with perspective, perspective-origin changes the appearance of an object,
	 * as if a viewer were looking at it from a different origin. An object appears
	 * differently if a viewer is looking directly at it versus looking at it from below,
	 * above, or from the side. Thus, the perspective-origin is like a vanishing point.
	 * The default value of perspective-origin is 50% 50%. This displays an object as if
	 * the viewer's eye were positioned directly at the center of the screen, both
	 * top-to-bottom and left-to-right. A value of 0% 0% changes the object as if the
	 * viewer was looking toward the top left angle. A value of 100% 100% changes the
	 * appearance as if viewed toward the bottom right angle.
	 */
	perspectiveOrigin?: ICSSRule | string;
	/**
	 * The pointer-events property allows you to control whether an element can be the
	 * target for the pointing device (e.g, mouse, pen) events.
	 */
	pointerEvents?: ICSSRule | string;
	/**
	 * The position property controls the type of positioning used by an element within
	 * its parent elements. The effect of the position property depends on a lot of
	 * factors, for example the position property of parent elements.
	 */
	position?: ICSSRule | 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
	/**
	 * Sets the type of quotation marks for embedded quotations.
	 */
	quotes?: ICSSRule | string;
	/**
	 * Controls whether the last region in a chain displays additional 'overset' content
	 * according its default overflow property, or if it displays a fragment of content
	 * as if it were flowing into a subsequent region.
	 */
	regionFragment?: ICSSRule | string;
	/**
	 * The resize CSS sets whether an element is resizable, and if so, in which direction(s).
	 */
	resize?: ICSSRule | 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline';
	/**
	 * The rest-after property determines how long a speech media agent should pause after
	 * presenting an element's main content, before presenting that element's exit cue
	 * sound. It may be replaced by the shorthand property rest, which sets rest time
	 * before and after.
	 */
	restAfter?: ICSSRule | string;
	/**
	 * The rest-before property determines how long a speech media agent should pause after
	 * presenting an intro cue sound for an element, before presenting that element's main
	 * content. It may be replaced by the shorthand property rest, which sets rest time
	 * before and after.
	 */
	restBefore?: ICSSRule | string;
	/**
	 * Specifies the position an element in relation to the right side of the containing
	 * element.
	 */
	right?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * Defines the alpha channel threshold used to extract a shape from an image. Can be
	 * thought of as a "minimum opacity" threshold; that is, a value of 0.5 means that the
	 * shape will enclose all the pixels that are more than 50% opaque.
	 */
	shapeImageThreshold?: ICSSRule | string;
	/**
	 * A future level of CSS Shapes will define a shape-inside property, which will define
	 * a shape to wrap content within the element. See Editor's Draft
	 * <http://dev.w3.org/csswg/css-shapes/> and CSSWG wiki page on next-level plans
	 * <http://wiki.csswg.org/spec/css-shapes>
	 */
	shapeInside?: ICSSRule | string;
	/**
	 * Adds a margin to a shape-outside. In effect, defines a new shape that is the
	 * smallest contour around all the points that are the shape-margin distance outward
	 * perpendicular to each point on the underlying shape. For points where a
	 * perpendicular direction is not defined (e.g., a triangle corner), takes all
	 * points on a circle centered at the point and with a radius of the shape-margin
	 * distance. This property accepts only non-negative values.
	 */
	shapeMargin?: ICSSRule | string;
	/**
	 * Declares a shape around which text should be wrapped, with possible modifications
	 * from the shape-margin property. The shape defined by shape-outside and shape-margin
	 * changes the geometry of a float element's float area.
	 */
	shapeOutside?: ICSSRule | string;
	/**
	 * The speak property determines whether or not a speech synthesizer will read aloud
	 * the contents of an element.
	 */
	speak?: ICSSRule | string;
	/**
	 * The speak-as property determines how the speech synthesizer interprets the content:
	 * words as whole words or as a sequence of letters, numbers as a numerical value or a
	 * sequence of digits, punctuation as pauses in speech or named punctuation characters.
	 */
	speakAs?: ICSSRule | string;
	/**
	 * The stroke property in CSS is for adding a border to SVG shapes.
	 * See SVG 1.1 https://www.w3.org/TR/SVG/painting.html#Stroke
	 */
	stroke?: ICSSRule | string;
	/**
	 * SVG: The stroke-linecap attribute defines the shape to be used at the end of open subpaths when they are stroked.
	 * See SVG 1.1 https://www.w3.org/TR/SVG/painting.html#LineCaps
	 */
	strokeLinecap?: ICSSRule | 'butt' | 'round' | 'square';
	/**
	 * SVG: Specifies the opacity of the outline on the current object.
	 * See SVG 1.1 https://www.w3.org/TR/SVG/painting.html#StrokeOpacityProperty
	 */
	strokeOpacity?: ICSSRule | number;
	/**
	 * SVG: Specifies the width of the outline on the current object.
	 * See SVG 1.1 https://www.w3.org/TR/SVG/painting.html#StrokeWidthProperty
	 */
	strokeWidth?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * The tab-size CSS property is used to customise the width of a tab (U+0009) character.
	 */
	tabSize?: ICSSRule | string;
	/**
	 * The 'table-layout' property controls the algorithm used to lay out the table cells, rows, and columns.
	 */
	tableLayout?: ICSSRule | string;
	/**
	 * The text-align CSS property describes how inline content like text is aligned in its
	 * parent block element. text-align does not control the alignment of block elements
	 * itself, only their inline content.
	 */
	textAlign?: ICSSRule | string;
	/**
	 * The text-align-last CSS property describes how the last line of a block element or
	 * a line before line break is aligned in its parent block element.
	 */
	textAlignLast?: ICSSRule | string;
	/**
	 * The text-decoration CSS property is used to set the text formatting to underline,
	 * overline, line-through or blink. underline and overline decorations are positioned
	 * under the text, line-through over it.
	 */
	textDecoration?: ICSSRule | string;
	/**
	 * Sets the color of any text decoration, such as underlines, overlines, and strike
	 * throughs.
	 */
	textDecorationColor?: ICSSRule | string;
	/**
	 * Sets what kind of line decorations are added to an element, such as underlines,
	 * overlines, etc.
	 */
	textDecorationLine?: ICSSRule | string;
	/**
	 * Specifies what parts of an element’s content are skipped over when applying any
	 * text decoration.
	 */
	textDecorationSkip?: ICSSRule | string;
	/**
	 * This property specifies the style of the text decoration line drawn on the
	 * specified element. The intended meaning for the values are the same as those of
	 * the border-style-properties.
	 */
	textDecorationStyle?: ICSSRule | string;
	/**
	 * The text-emphasis property will apply special emphasis marks to the elements text.
	 * Slightly similar to the text-decoration property only that this property can have
	 * affect on the line-height. It also is noted that this is shorthand for
	 * text-emphasis-style and for text-emphasis-color.
	 */
	textEmphasis?: ICSSRule | string;
	/**
	 * The text-emphasis-color property specifies the foreground color of the emphasis
	 * marks.
	 */
	textEmphasisColor?: ICSSRule | string;
	/**
	 * The text-emphasis-style property applies special emphasis marks to an element's
	 * text.
	 */
	textEmphasisStyle?: ICSSRule | string;
	/**
	 * This property helps determine an inline box's block-progression dimension, derived
	 * from the text-height and font-size properties for non-replaced elements, the height
	 * or the width for replaced elements, and the stacked block-progression dimension for
	 * inline-block elements. The block-progression dimension determines the position of
	 * the padding, border and margin for the element.
	 */
	textHeight?: ICSSRule | string;
	/**
	 * Specifies the amount of space horizontally that should be left on the first line of
	 * the text of an element. This horizontal spacing is at the beginning of the first
	 * line and is in respect to the left edge of the containing block box.
	 */
	textIndent?: ICSSRule | string;
	/**
	 * The text-overflow shorthand CSS property determines how overflowed content that is
	 * not displayed is signaled to the users. It can be clipped, display an ellipsis
	 * ('…', U+2026 HORIZONTAL ELLIPSIS) or a Web author-defined string. It covers the
	 * two long-hand properties text-overflow-mode and text-overflow-ellipsis
	 */
	textOverflow?: ICSSRule | string;
	/**
	 * The text-overline property is the shorthand for the text-overline-style,
	 * text-overline-width, text-overline-color, and text-overline-mode properties.
	 */
	textOverline?: ICSSRule | string;
	/**
	 * Specifies the line color for the overline text decoration.
	 */
	textOverlineColor?: ICSSRule | string;
	/**
	 * Sets the mode for the overline text decoration, determining whether the text
	 * decoration affects the space characters or not.
	 */
	textOverlineMode?: ICSSRule | string;
	/**
	 * Specifies the line style for overline text decoration.
	 */
	textOverlineStyle?: ICSSRule | string;
	/**
	 * Specifies the line width for the overline text decoration.
	 */
	textOverlineWidth?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * The text-rendering CSS property provides information to the browser about how to
	 * optimize when rendering text. Options are: legibility, speed or geometric precision.
	 */
	textRendering?: ICSSRule | string;
	/**
	 * The CSS text-shadow property applies one or more drop shadows to the text and
	 * <text-decorations> of an element. Each shadow is specified as an offset from the
	 * text, along with optional color and blur radius values.
	 */
	textShadow?: ICSSRule | string;
	/**
	 * This property transforms text for styling purposes. (It has no effect on the
	 * underlying content.)
	 */
	textTransform?: ICSSRule | string;
	/**
	 * Unsupported.
	 * This property will add a underline position value to the element that has an
	 * underline defined.
	 */
	textUnderlinePosition?: ICSSRule | string;
	/**
	 * After review this should be replaced by text-decoration should it not?
	 * This property will set the underline style for text with a line value for
	 * underline, overline, and line-through.
	 */
	textUnderlineStyle?: ICSSRule | string;
	/**
	 * This property specifies how far an absolutely positioned box's top margin edge is
	 * offset below the top edge of the box's containing block. For relatively positioned
	 * boxes, the offset is with respect to the top edges of the box itself (i.e., the box
	 * is given a position in the normal flow, then offset from that position according to
	 * these properties).
	 */
	top?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * Determines whether touch input may trigger default behavior supplied by the user
	 * agent, such as panning or zooming.
	 */
	touchAction?: ICSSRule | string;
	/**
	 * CSS transforms allow elements styled with CSS to be transformed in two-dimensional
	 * or three-dimensional space. Using this property, elements can be translated,
	 * rotated, scaled, and skewed. The value list may consist of 2D and/or 3D transform
	 * values.
	 */
	transform?: ICSSRule | string;
	/**
	 * This property defines the origin of the transformation axes relative to the element
	 * to which the transformation is applied.
	 */
	transformOrigin?: ICSSRule | string;
	/**
	 * This property allows you to define the relative position of the origin of the
	 * transformation grid along the z-axis.
	 */
	transformOriginZ?: ICSSRule | string;
	/**
	 * This property specifies how nested elements are rendered in 3D space relative to their parent.
	 */
	transformStyle?: ICSSRule | string;
	/**
	 * The transition CSS property is a shorthand property for transition-property,
	 * transition-duration, transition-timing-function, and transition-delay. It allows to
	 * define the transition between two states of an element.
	 */
	transition?: ICSSRule | string;
	/**
	 * Defines when the transition will start. A value of ‘0s’ means the transition will
	 * execute as soon as the property is changed. Otherwise, the value specifies an
	 * offset from the moment the property is changed, and the transition will delay
	 * execution by that offset.
	 */
	transitionDelay?: ICSSRule | string;
	/**
	 * The 'transition-duration' property specifies the length of time a transition
	 * animation takes to complete.
	 */
	transitionDuration?: ICSSRule | string;
	/**
	 * The 'transition-property' property specifies the name of the CSS property to which
	 * the transition is applied.
	 */
	transitionProperty?: ICSSRule | string;
	/**
	 * Sets the pace of action within a transition
	 */
	transitionTimingFunction?: ICSSRule | string;
	/**
	 * The unicode-bidi CSS property specifies the level of embedding with respect to the bidirectional algorithm.
	 */
	unicodeBidi?: ICSSRule | string;
	/**
	 * This is for all the high level UX stuff.
	 */
	userFocus?: ICSSRule | string;
	/**
	 * For inputing user content
	 */
	userInput?: ICSSRule | string;
	/**
	 * Defines the text selection behavior.
	 */
	userSelect?: ICSSRule | 'none' | 'auto' | 'text' | 'all' | 'contain';
	/**
	 * The vertical-align property controls how inline elements or text are vertically
	 * aligned compared to the baseline. If this property is used on table-cells it
	 * controls the vertical alignment of content of the table cell.
	 */
	verticalAlign?: ICSSRule | string;
	/**
	 * The visibility property specifies whether the boxes generated by an element are rendered.
	 */
	visibility?: ICSSRule | string;
	/**
	 * The voice-balance property sets the apparent position (in stereo sound) of the synthesized voice for spoken media.
	 */
	voiceBalance?: ICSSRule | string;
	/**
	 * The voice-duration property allows the author to explicitly set the amount of time
	 * it should take a speech synthesizer to read an element's content, for example to
	 * allow the speech to be synchronized with other media. With a value of auto (the
	 * default) the length of time it takes to read the content is determined by the
	 * content itself and the voice-rate property.
	 */
	voiceDuration?: ICSSRule | string;
	/**
	 * The voice-family property sets the speaker's voice used by a speech media agent to
	 * read an element. The speaker may be specified as a named character (to match a
	 * voice option in the speech reading software) or as a generic description of the
	 * age and gender of the voice. Similar to the font-family property for visual media,
	 * a comma-separated list of fallback options may be given in case the speech reader
	 * does not recognize the character name or cannot synthesize the requested combination
	 * of generic properties.
	 */
	voiceFamily?: ICSSRule | string;
	/**
	 * The voice-pitch property sets pitch or tone (high or low) for the synthesized speech
	 * when reading an element; the pitch may be specified absolutely or relative to the
	 * normal pitch for the voice-family used to read the text.
	 */
	voicePitch?: ICSSRule | string;
	/**
	 * The voice-range property determines how much variation in pitch or tone will be
	 * created by the speech synthesize when reading an element. Emphasized text,
	 * grammatical structures and punctuation may all be rendered as changes in pitch,
	 * this property determines how strong or obvious those changes are; large ranges are
	 * associated with enthusiastic or emotional speech, while small ranges are associated
	 * with flat or mechanical speech.
	 */
	voiceRange?: ICSSRule | string;
	/**
	 * The voice-rate property sets the speed at which the voice synthesized by a speech
	 * media agent will read content.
	 */
	voiceRate?: ICSSRule | string;
	/**
	 * The voice-stress property sets the level of vocal emphasis to be used for
	 * synthesized speech reading the element.
	 */
	voiceStress?: ICSSRule | string;
	/**
	 * The voice-volume property sets the volume for spoken content in speech media. It
	 * replaces the deprecated volume property.
	 */
	voiceVolume?: ICSSRule | string;
	/**
	 * The white-space property controls whether and how white space inside the element is
	 * collapsed, and whether lines may wrap at unforced "soft wrap" opportunities.
	 */
	whiteSpace?: ICSSRule | string;
	/**
	 * In paged media, this property defines the mimimum number of lines that must be left
	 * at the top of the second page.
	 * See CSS 3 orphans, widows properties
	 * https://drafts.csswg.org/css-break-3/#widows-orphans
	 */
	widows?: ICSSRule | number;
	/**
	 * Specifies the width of the content area of an element. The content area of the element
	 * width does not include the padding, border, and margin of the element.
	 */
	width?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * The word-break property is often used when there is long generated content that is
	 * strung together without and spaces or hyphens to beak apart. A common case of this
	 * is when there is a long URL that does not have any hyphens. This case could
	 * potentially cause the breaking of the layout as it could extend past the parent
	 * element.
	 */
	wordBreak?: ICSSRule | string;
	/**
	 * The word-spacing CSS property specifies the spacing behavior between "words".
	 */
	wordSpacing?: ICSSRule | string;
	/**
	 * An alias of css/properties/overflow-wrap, word-wrap defines whether to break
	 * words when the content exceeds the boundaries of its container.
	 */
	wordWrap?: ICSSRule | string;
	/**
	 * Specifies how exclusions affect inline content within block-level elements. Elements
	 * lay out their inline content in their content area but wrap around exclusion areas.
	 */
	wrapFlow?: ICSSRule | string;
	/**
	 * Set the value that is used to offset the inner wrap shape from other shapes. Inline
	 * content that intersects a shape with this property will be pushed by this shape's
	 * margin.
	 */
	wrapMargin?: ICSSRule | string;
	/**
	 * writing-mode specifies if lines of text are laid out horizontally or vertically,
	 * and the direction which lines of text and blocks progress.
	 */
	writingMode?: ICSSRule | string;
	/**
	 * The z-index property specifies the z-order of an element and its descendants.
	 * When elements overlap, z-order determines which one covers the other.
	 * See CSS 2 z-index property https://www.w3.org/TR/CSS2/visuren.html#z-index
	 */
	zIndex?: ICSSRule | 'auto' | number;
	/**
	 * Sets the initial zoom factor of a document defined by @viewport.
	 * See CSS zoom descriptor https://drafts.csswg.org/css-device-adapt/#zoom-desc
	 */
	zoom?: ICSSRule | 'auto' | number | ICSSPercentageRule;
}
/**
 * IStyleObject extends a raw style objects, but allows selectors to be defined
 * under the selectors node.
 * @public
 */
export declare type IRawStyle = IRawStyleBase & {
	/**
	 * Display name for the style.
	 */
	displayName?: string;
	/**
	 * Custom selectors for the style.
	 */
	selectors?: {
		[key: string]: IStyle;
	};
};
export declare type IStyleBase = IRawStyle | string | false | null | undefined;
export interface IStyleBaseArray extends Array<IStyle> {
}
/**
 * IStyleObject extends a raw style objects, but allows selectors to be defined
 * under the selectors node.
 * @public
 */
export declare type IStyle = IStyleBase | IStyleBaseArray;
export declare type Diff<T extends keyof any, U extends keyof any> = ({
	[P in T]: P;
} & {
	[P in U]: never;
} & {
	[x: string]: never;
})[T];
export declare type Omit<U, K extends keyof U> = Pick<U, Diff<keyof U, K>>;
/**
 * Helper function whose role is supposed to express that regardless if T is a style object or style function,
 * it will always map to a style function.
 */
export declare type __MapToFunctionType<T> = Extract<T, Function> extends never ? (...args: any[]) => Partial<T> : Extract<T, Function>;
/**
 * A style set is a dictionary of display areas to IStyle objects.
 * It may optionally contain style functions for sub components in the special `subComponentStyles`
 * property.
 */
export declare type IStyleSet<TStyleSet extends IStyleSet<TStyleSet>> = {
	[P in keyof Omit<TStyleSet, 'subComponentStyles'>]: IStyle;
} & {
	subComponentStyles?: {
		[P in keyof TStyleSet['subComponentStyles']]: IStyleFunctionOrObject<any, IStyleSet<any>>;
	};
};
/**
 * A concatenated style set differs from `IStyleSet` in that subComponentStyles will always be a style function.
 */
export declare type IConcatenatedStyleSet<TStyleSet extends IStyleSet<TStyleSet>> = {
	[P in keyof Omit<TStyleSet, 'subComponentStyles'>]: IStyle;
} & {
	subComponentStyles?: {
		[P in keyof TStyleSet['subComponentStyles']]: IStyleFunction<any, IStyleSet<any>>;
	};
};
/**
 * A processed style set is one which the set of styles associated with each area has been converted
 * into a class name. Additionally, all subComponentStyles are style functions.
 */
export declare type IProcessedStyleSet<TStyleSet extends IStyleSet<TStyleSet>> = {
	[P in keyof Omit<TStyleSet, 'subComponentStyles'>]: string;
} & {
	subComponentStyles: {
		[P in keyof TStyleSet['subComponentStyles']]: __MapToFunctionType<TStyleSet['subComponentStyles'][P]>;
	};
};
/**
 * A style function takes in styleprops and returns a partial styleset.
 */
export declare type IStyleFunction<TStylesProps, TStyleSet extends IStyleSet<TStyleSet>> = (props: TStylesProps) => Partial<TStyleSet>;
/**
 * Represents either a style function that takes in style props and returns a partial styleset,
 * or a partial styleset object.
 */
export declare type IStyleFunctionOrObject<TStylesProps, TStyleSet extends IStyleSet<TStyleSet>> = IStyleFunction<TStylesProps, TStyleSet> | Partial<TStyleSet>;
/**
 * Bugs often appear in async code when stuff gets disposed, but async operations don't get canceled.
 * This Async helper class solves these issues by tying async code to the lifetime of a disposable object.
 *
 * Usage: Anything class extending from BaseModel can access this helper via this.async. Otherwise create a
 * new instance of the class and remember to call dispose() during your code's dispose handler.
 *
 * @public
 */
export declare class Async {
	private _timeoutIds;
	private _immediateIds;
	private _intervalIds;
	private _animationFrameIds;
	private _isDisposed;
	private _parent;
	private _onErrorHandler;
	private _noop;
	constructor(parent?: object, onError?: (e: any) => void);
	/**
	 * Dispose function, clears all async operations.
	 */
	dispose(): void;
	/**
	 * SetTimeout override, which will auto cancel the timeout during dispose.
	 * @param callback - Callback to execute.
	 * @param duration - Duration in milliseconds.
	 * @returns The setTimeout id.
	 */
	setTimeout(callback: () => void, duration: number): number;
	/**
	 * Clears the timeout.
	 * @param id - Id to cancel.
	 */
	clearTimeout(id: number): void;
	/**
	 * SetImmediate override, which will auto cancel the immediate during dispose.
	 * @param callback - Callback to execute.
	 * @returns The setTimeout id.
	 */
	setImmediate(callback: () => void): number;
	/**
	 * Clears the immediate.
	 * @param id - Id to cancel.
	 */
	clearImmediate(id: number): void;
	/**
	 * SetInterval override, which will auto cancel the timeout during dispose.
	 * @param callback - Callback to execute.
	 * @param duration - Duration in milliseconds.
	 * @returns The setTimeout id.
	 */
	setInterval(callback: () => void, duration: number): number;
	/**
	 * Clears the interval.
	 * @param id - Id to cancel.
	 */
	clearInterval(id: number): void;
	/**
	 * Creates a function that, when executed, will only call the func function at most once per
	 * every wait milliseconds. Provide an options object to indicate that func should be invoked
	 * on the leading and/or trailing edge of the wait timeout. Subsequent calls to the throttled
	 * function will return the result of the last func call.
	 *
	 * Note: If leading and trailing options are true func will be called on the trailing edge of
	 * the timeout only if the the throttled function is invoked more than once during the wait timeout.
	 *
	 * @param func - The function to throttle.
	 * @param wait - The number of milliseconds to throttle executions to. Defaults to 0.
	 * @param options - The options object.
	 * @returns The new throttled function.
	 */
	throttle<T extends Function>(func: T, wait?: number, options?: {
		leading?: boolean;
		trailing?: boolean;
	}): T | (() => void);
	/**
	 * Creates a function that will delay the execution of func until after wait milliseconds have
	 * elapsed since the last time it was invoked. Provide an options object to indicate that func
	 * should be invoked on the leading and/or trailing edge of the wait timeout. Subsequent calls
	 * to the debounced function will return the result of the last func call.
	 *
	 * Note: If leading and trailing options are true func will be called on the trailing edge of
	 * the timeout only if the the debounced function is invoked more than once during the wait
	 * timeout.
	 *
	 * @param func - The function to debounce.
	 * @param wait - The number of milliseconds to delay.
	 * @param options - The options object.
	 * @returns The new debounced function.
	 */
	debounce<T extends Function>(func: T, wait?: number, options?: {
		leading?: boolean;
		maxWait?: number;
		trailing?: boolean;
	}): ICancelable<T> & (() => void);
	requestAnimationFrame(callback: () => void): number;
	cancelAnimationFrame(id: number): void;
	protected _logError(e: any): void;
}
export declare type ICancelable<T> = {
	flush: () => T;
	cancel: () => void;
	pending: () => boolean;
};
/**
 * AutoScroll simply hooks up mouse events given a parent element, and scrolls the container
 * up/down depending on how close the mouse is to the top/bottom of the container.
 *
 * Once you don't want autoscroll any more, just dispose the helper and it will unhook events.
 *
 * @public
 */
export declare class AutoScroll {
	private _events;
	private _scrollableParent;
	private _scrollRect;
	private _scrollVelocity;
	private _timeoutId;
	constructor(element: HTMLElement);
	dispose(): void;
	private _onMouseMove;
	private _onTouchMove;
	private _computeScrollVelocity;
	private _startScroll;
	private _incrementScroll;
	private _stopScroll;
}
/**
 * EventRecord interface.
 *
 * @internal
 */
export interface IEventRecord {
	target: any;
	eventName: string;
	parent: any;
	callback: (args?: any) => void;
	elementCallback?: (...args: any[]) => void;
	objectCallback?: (args?: any) => void;
	useCapture: boolean;
}
/**
 * EventRecordsByName interface.
 *
 * @internal
 */
export interface IEventRecordsByName {
	[eventName: string]: IEventRecordList;
}
/**
 * EventRecordList interface.
 *
 * @internal
 */
export interface IEventRecordList {
	[id: string]: IEventRecord[] | number;
	count: number;
}
/**
 * DeclaredEventsByName interface.
 *
 * @internal
 */
export interface IDeclaredEventsByName {
	[eventName: string]: boolean;
}
/** An instance of EventGroup allows anything with a handle to it to trigger events on it.
 *  If the target is an HTMLElement, the event will be attached to the element and can be
 *  triggered as usual (like clicking for onclick).
 *  The event can be triggered by calling EventGroup.raise() here. If the target is an
 *  HTMLElement, the event gets raised and is handled by the browser. Otherwise, it gets
 *  handled here in EventGroup, and the handler is called in the context of the parent
 *  (which is passed in in the constructor).
 *
 * @public
 */
export declare class EventGroup {
	private static _uniqueId;
	private _parent;
	private _eventRecords;
	private _id;
	private _isDisposed;
	/** For IE8, bubbleEvent is ignored here and must be dealt with by the handler.
	 *  Events raised here by default have bubbling set to false and cancelable set to true.
	 *  This applies also to built-in events being raised manually here on HTMLElements,
	 *  which may lead to unexpected behavior if it differs from the defaults.
	 *
	 */
	static raise(target: any, eventName: string, eventArgs?: any, bubbleEvent?: boolean): boolean | undefined;
	static isObserved(target: any, eventName: string): boolean;
	/** Check to see if the target has declared support of the given event. */
	static isDeclared(target: any, eventName: string): boolean;
	static stopPropagation(event: any): void;
	private static _isElement;
	/** parent: the context in which events attached to non-HTMLElements are called */
	constructor(parent: any);
	dispose(): void;
	/** On the target, attach a set of events, where the events object is a name to function mapping. */
	onAll(target: any, events: {
		[key: string]: (args?: any) => void;
	}, useCapture?: boolean): void;
	/** On the target, attach an event whose handler will be called in the context of the parent
	 * of this instance of EventGroup.
	 */
	on(target: any, eventName: string, callback: (args?: any) => void, useCapture?: boolean): void;
	off(target?: any, eventName?: string, callback?: (args?: any) => void, useCapture?: boolean): void;
	/** Trigger the given event in the context of this instance of EventGroup. */
	raise(eventName: string, eventArgs?: any, bubbleEvent?: boolean): boolean | undefined;
	/** Declare an event as being supported by this instance of EventGroup. */
	declare(event: string | string[]): void;
}
/**
 * Disposable interface.
 *
 * @public
 */
export interface IDisposable {
	dispose: () => void;
}
export declare type ISettingsMap<T> = {
	[P in keyof T]?: string;
};
/**
 * Warns when a deprecated props are being used.
 *
 * @public
 * @param componentName - The name of the component being used.
 * @param props - The props passed into the component.
 * @param deprecationMap - The map of deprecations, where key is the prop name and the value is
 * either null or a replacement prop name.
 */
export declare function warnDeprecations<P>(componentName: string, props: P, deprecationMap: ISettingsMap<P>): void;
/**
 * Warns when two props which are mutually exclusive are both being used.
 *
 * @public
 * @param componentName - The name of the component being used.
 * @param props - The props passed into the component.
 * @param exclusiveMap - A map where the key is a parameter, and the value is the other parameter.
 */
export declare function warnMutuallyExclusive<P>(componentName: string, props: P, exclusiveMap: ISettingsMap<P>): void;
/**
 * Warns when props are required if a condition is met.
 *
 * @public
 * @param componentName - The name of the component being used.
 * @param props - The props passed into the component.
 * @param requiredProps - The name of the props that are required when the condition is met.
 * @param conditionalPropName - The name of the prop that the condition is based on.
 * @param condition - Whether the condition is met.
 */
export declare function warnConditionallyRequiredProps<P>(componentName: string, props: P, requiredProps: string[], conditionalPropName: string, condition: boolean): void;
/**
 * Sends a warning to console, if the api is present.
 *
 * @public
 * @param message - Warning message.
 */
export declare function warn(message: string): void;
/**
 * Configures the warning callback. Passing in undefined will reset it to use the default
 * console.warn function.
 *
 * @public
 * @param warningCallback - Callback to override the generated warnings.
 */
export declare function setWarningCallback(warningCallback?: (message: string) => void): void;
export declare type IRefObject<T> = React.RefObject<T> | RefObject<T> | ((ref: T | null) => void);
export declare type RefObject<T> = {
	(component: T | null): void;
	current: T | null;
	/**
	 * @deprecated Use .current as that is consistent the official React Api.
	 */
	value: T | null;
};
/**
 * @deprecated Use React.createRef.
 * May be removed in 6 months (Jan '19).
 */
export declare function createRef<T>(): RefObject<T>;
/**
 * BaseProps interface.
 *
 * @public
 */
export interface IBaseProps<T = any> {
	componentRef?: IRefObject<T>;
}
/**
 * BaseComponent class, which provides basic helpers for all components.
 *
 * @public
 */
export declare class BaseComponent<TProps extends IBaseProps = {}, TState = {}> extends React.Component<TProps, TState> {
	/**
	 * @deprecated Use React's error boundaries instead.
	 */
	static onError: ((errorMessage?: string, ex?: any) => void);
	/**
	 * Controls whether the componentRef prop will be resolved by this component instance. If you are
	 * implementing a passthrough (higher-order component), you would set this to false and pass through
	 * the props to the inner component, allowing it to resolve the componentRef.
	 */
	protected _skipComponentRefResolution: boolean;
	private __async;
	private __events;
	private __disposables;
	private __resolves;
	private __className;
	/**
	 * BaseComponent constructor
	 * @param props - The props for the component.
	 * @param context - The context for the component.
	 */
	constructor(props: TProps, context?: any);
	/**
	 * When the component receives props, make sure the componentRef is updated.
	 */
	componentDidUpdate(prevProps: TProps, prevState: TState): void;
	/**
	 * When the component has mounted, update the componentRef.
	 */
	componentDidMount(): void;
	/**
	 * If we have disposables, dispose them automatically on unmount.
	 */
	componentWillUnmount(): void;
	/**
	 * Gets the object's class name.
	 */
	readonly className: string;
	/**
	 * Allows subclasses to push things to this._disposables to be auto disposed.
	 */
	protected readonly _disposables: IDisposable[];
	/**
	 * Gets the async instance associated with the component, created on demand. The async instance gives
	 * subclasses a way to execute setTimeout/setInterval async calls safely, where the callbacks
	 * will be cleared/ignored automatically after unmounting. The helpers within the async object also
	 * preserve the this pointer so that you don't need to "bind" the callbacks.
	 */
	protected readonly _async: Async;
	/**
	 * Gets the event group instance assocaited with the component, created on demand. The event instance
	 * provides on/off methods for listening to DOM (or regular javascript object) events. The event callbacks
	 * will be automatically disconnected after unmounting. The helpers within the events object also
	 * preserve the this reference so that you don't need to "bind" the callbacks.
	 */
	protected readonly _events: EventGroup;
	/**
	 * Helper to return a memoized ref resolver function.
	 * @param refName - Name of the member to assign the ref to.
	 * @returns A function instance keyed from the given refname.
	 * @deprecated Use `createRef` from React.createRef.
	 */
	protected _resolveRef(refName: string): (ref: React.ReactNode) => React.ReactNode;
	/**
	 * Updates the componentRef (by calling it with "this" when necessary.)
	 */
	protected _updateComponentRef(currentProps: IBaseProps, newProps?: IBaseProps): void;
	/**
	 * Warns when a deprecated props are being used.
	 *
	 * @param deprecationMap - The map of deprecations, where key is the prop name and the value is
	 * either null or a replacement prop name.
	 */
	protected _warnDeprecations(deprecationMap: ISettingsMap<TProps>): void;
	/**
	 * Warns when props which are mutually exclusive with each other are both used.
	 *
	 * @param mutuallyExclusiveMap - The map of mutually exclusive props.
	 */
	protected _warnMutuallyExclusive(mutuallyExclusiveMap: ISettingsMap<TProps>): void;
	/**
	 * Warns when props are required if a condition is met.
	 *
	 * @param requiredProps - The name of the props that are required when the condition is met.
	 * @param conditionalPropName - The name of the prop that the condition is based on.
	 * @param condition - Whether the condition is met.
	 */
	protected _warnConditionallyRequiredProps(requiredProps: string[], conditionalPropName: string, condition: boolean): void;
	private _setComponentRef;
}
/**
 * Simple constant function for returning null, used to render empty templates in JSX.
 *
 * @public
 */
export declare function nullRender(): JSX.Element | null;
/**
 * @deprecated This function uses the legacy context API, which is deprecated and should not be
 * used in new code. Please migrate to the new context API. https://reactjs.org/docs/context.html
 */
export declare function provideContext<TContext, TProps>(contextTypes: PropTypes.ValidationMap<TContext>, mapPropsToContext: (props: TProps) => TContext): React.ComponentType<TProps>;
export declare type Settings = {
	[key: string]: any;
};
export declare type SettingsFunction = (settings: Settings) => Settings;
export interface ICustomizations {
	settings: Settings;
	scopedSettings: {
		[key: string]: Settings;
	};
	inCustomizerContext?: boolean;
}
export declare class Customizations {
	static reset(): void;
	static applySettings(settings: Settings): void;
	static applyScopedSettings(scopeName: string, settings: Settings): void;
	static getSettings(properties: string[], scopeName?: string, localSettings?: ICustomizations): any;
	static observe(onChange: () => void): void;
	static unobserve(onChange: () => void): void;
	private static _raiseChange;
}
export interface ICustomizerContext {
	customizations: ICustomizations;
}
export declare const CustomizerContext: React.Context<ICustomizerContext>;
export declare type ICustomizerProps = IBaseProps & Partial<{
	/**
	 * @description
	 * Settings are used as general settings for the React tree below.
	 * Components can subscribe to receive the settings by using `customizable`.
	 *
	 * @example
	 * Settings can be represented by a plain object that contains the key value pairs.
	 * ```
	 *  <Customizer settings={{ color: 'red' }} />
	 * ```
	 * or a function that receives the current settings and returns the new ones
	 * ```
	 *  <Customizer settings={(currentSettings) => ({ ...currentSettings, color: 'red' })} />
	 * ```
	 */
	settings: Settings | SettingsFunction;
	/**
	 * @description
	 * Scoped settings are settings that are scoped to a specific scope. The
	 * scope is the name that is passed to the `customizable` function when the
	 * the component is customized.
	 *
	 * @example
	 * Scoped settings can be represented by a plain object that contains the key value pairs.
	 * ```
	 *  const myScopedSettings = {
	 *    Button: { color: 'red' };
	 *  };
	 *
	 *  <Customizer scopedSettings={myScopedSettings} />
	 * ```
	 * or a function that receives the current settings and returns the new ones
	 * ```
	 *  const myScopedSettings = {
	 *    Button: { color: 'red' };
	 *  };
	 *
	 *  <Customizer scopedSettings={(currentScopedSettings) => ({ ...currentScopedSettings, ...myScopedSettings })} />
	 * ```
	 */
	scopedSettings: Settings | SettingsFunction;
}> & {
	/**
	 * Optional transform function for context. Any implementations should take care to return context without
	 * mutating it.
	 */
	contextTransform?: (context: Readonly<ICustomizerContext>) => ICustomizerContext;
};
/**
 * The Customizer component allows for default props to be mixed into components which
 * are decorated with the customizable() decorator, or use the styled HOC. This enables
 * injection scenarios like:
 *
 * 1. render svg icons instead of the icon font within all buttons
 * 2. inject a custom theme object into a component
 *
 * Props are provided via the settings prop which should be one of the following:
 * - A json map which contains 1 or more name/value pairs representing injectable props.
 * - A function that receives the current settings and returns the new ones that apply to the scope
 *
 * @public
 */
export declare class Customizer extends BaseComponent<ICustomizerProps> {
	private _changeCount;
	componentDidMount(): void;
	componentWillUnmount(): void;
	render(): React.ReactElement<{}>;
	private _onCustomizationChange;
}
/**
 * Merge props and customizations giving priority to props over context.
 * NOTE: This function will always perform multiple merge operations. Use with caution.
 * @param props - New settings to merge in.
 * @param parentContext - Context containing current settings.
 * @returns Merged customizations.
 */
export declare function mergeCustomizations(props: ICustomizerProps, parentContext: ICustomizerContext): ICustomizerContext;
/**
 * Merge new and old settings, giving priority to new settings.
 * New settings is optional in which case oldSettings is returned as-is.
 * @param oldSettings - Old settings to fall back to.
 * @param newSettings - New settings that will be merged over oldSettings.
 * @returns Merged settings.
 */
export declare function mergeSettings(oldSettings?: Settings, newSettings?: Settings | SettingsFunction): Settings;
/**
 * DelayedRender component props.
 *
 * @public
 */
export interface IDelayedRenderProps extends React.Props<{}> {
	/**
	 * Number of milliseconds to delay rendering children.
	 */
	delay?: number;
}
/**
 * DelayedRender component state.
 *
 * @internal
 */
export interface IDelayedRenderState {
	/**
	 * Whether the component is rendered or not.
	 */
	isRendered: boolean;
}
/**
 * Utility component for delaying the render of a child component after a given delay. This component
 * requires a single child component; don't pass in many components. Wrap multiple components in a DIV
 * if necessary.
 *
 * @public
 */
export declare class DelayedRender extends React.Component<IDelayedRenderProps, IDelayedRenderState> {
	static defaultProps: {
		delay: number;
	};
	private _timeoutId;
	constructor(props: IDelayedRenderProps);
	componentDidMount(): void;
	componentWillUnmount(): void;
	render(): React.ReactElement<{}> | null;
}
/**
 * PerfData interface.
 *
 * @internal
 */
export interface IPerfData {
	duration: number;
	timeStamp: number;
}
/**
 * PerfMeasurement interface.
 *
 * @internal
 */
export interface IPerfMeasurement {
	totalDuration: number;
	count: number;
	all: IPerfData[];
}
/**
 * PerfSummary interface.
 *
 * @internal
 */
export interface IPerfSummary {
	[key: string]: IPerfMeasurement;
}
/**
 * Performance helper class for measuring things.
 *
 * @public
 */
export declare class FabricPerformance {
	static summary: IPerfSummary;
	private static _timeoutId;
	/**
	 * Measures execution time of the given syncronous function. If the same logic is executed multiple times,
	 * each individual measurement will be collected as well the overall numbers.
	 * @param name - The name of this measurement
	 * @param func - The logic to be measured for execution time
	 */
	static measure(name: string, func: () => void): void;
	static reset(): void;
	static setPeriodicReset(): void;
}
/**
 * Storing global state in local module variables has issues when more than one copy
 * if the module gets loaded on the page (due to a bundling error or simply by consuming
 * a prebundled script.)
 *
 * This file contains helpers to deal with the getting and setting local state, and allows
 * callers to get called back when it mutates.
 */
/**
 * Change description used for change callbacks in GlobalSettings.
 *
 * @public
 */
export interface IChangeDescription {
	key: string;
	oldValue: any;
	value: any;
}
/**
 * Change event callback.
 *
 * @public
 */
export interface IChangeEventCallback {
	__id__?: string;
	(changeDescription?: IChangeDescription): void;
}
/**
 * Global settings helper, which stores settings in the global (window) namespace.
 * If window is not provided, it will store settings in module scope. Provides a
 * way to observe changes as well when their values change.
 *
 * @public
 */
export declare class GlobalSettings {
	static getValue<T>(key: string, defaultValue?: T | (() => T)): T;
	static setValue<T>(key: string, value: T): T;
	static addChangeListener(cb: IChangeEventCallback): void;
	static removeChangeListener(cb: IChangeEventCallback): void;
}
/**
 * @deprecated Use `IProcessedStyleSet` from @uifabric/styling or @uifabric/merge-styles instead.
 */
export declare type IClassNames<T> = {
	[key in keyof T]: string;
};
/**
 * Properties used by render function interface for providing overrideable render callbacks.
 *
 * @public
 */
export declare type IComponentAsProps<T> = T & {
	defaultRender?: React.ComponentType<T>;
};
/**
 * Render function interface for providing overrideable render callbacks.
 *
 * @public
 */
export declare type IComponentAs<T> = React.ComponentType<IComponentAsProps<T>>;
/**
 * Point interface.
 *
 * @public
 */
export interface IPoint {
	x: number;
	y: number;
}
/**
 * Rectangle interface.
 *
 * @public
 */
export interface IRectangle {
	left: number;
	top: number;
	width: number;
	height: number;
	right?: number;
	bottom?: number;
}
/**
 * An interface representing a component that will not output any DOM, will just render its children and
 * pass through items to modify the children.
 */
export interface IRenderComponent<TProps> {
	/**
	 * JSX.Element to return in this component's render() function.
	 */
	children: (props: TProps) => JSX.Element;
}
/**
 * Render function interface for providing overrideable render callbacks.
 *
 * @public
 */
export interface IRenderFunction<P> {
	(props?: P, defaultRender?: (props?: P) => JSX.Element | null): JSX.Element | null;
}
export interface ISize {
	width: number;
	height: number;
}
/**
 * Combine a set of styles together (but does not register css classes).
 * @param styleSet - The first style set to be concatenated.
 */
export declare function concatStyleSets<TStyleSet extends IStyleSet<TStyleSet>>(styleSet: TStyleSet | false | null | undefined): IConcatenatedStyleSet<TStyleSet>;
/**
 * Combine a set of styles together (but does not register css classes).
 * @param styleSet1 - The first style set to be concatenated.
 * @param styleSet2 - The second style set to be concatenated.
 */
export declare function concatStyleSets<TStyleSet1 extends IStyleSet<TStyleSet1>, TStyleSet2 extends IStyleSet<TStyleSet2>>(styleSet1: TStyleSet1 | false | null | undefined, styleSet2: TStyleSet2 | false | null | undefined): IConcatenatedStyleSet<TStyleSet1 & TStyleSet2>;
/**
 * Combine a set of styles together (but does not register css classes).
 * @param styleSet1 - The first style set to be concatenated.
 * @param styleSet2 - The second style set to be concatenated.
 * @param styleSet3 - The third style set to be concatenated.
 */
export declare function concatStyleSets<TStyleSet1 extends IStyleSet<TStyleSet1>, TStyleSet2 extends IStyleSet<TStyleSet2>, TStyleSet3 extends IStyleSet<TStyleSet3>>(styleSet1: TStyleSet1 | false | null | undefined, styleSet2: TStyleSet2 | false | null | undefined, styleSet3: TStyleSet3 | false | null | undefined): IConcatenatedStyleSet<TStyleSet1 & TStyleSet2 & TStyleSet3>;
/**
 * Combine a set of styles together (but does not register css classes).
 * @param styleSet1 - The first style set to be concatenated.
 * @param styleSet2 - The second style set to be concatenated.
 * @param styleSet3 - The third style set to be concatenated.
 * @param styleSet4 - The fourth style set to be concatenated.
 */
export declare function concatStyleSets<TStyleSet1 extends IStyleSet<TStyleSet1>, TStyleSet2 extends IStyleSet<TStyleSet2>, TStyleSet3 extends IStyleSet<TStyleSet3>, TStyleSet4 extends IStyleSet<TStyleSet4>>(styleSet1: TStyleSet1 | false | null | undefined, styleSet2: TStyleSet2 | false | null | undefined, styleSet3: TStyleSet3 | false | null | undefined, styleSet4: TStyleSet3 | false | null | undefined): IConcatenatedStyleSet<TStyleSet1 & TStyleSet2 & TStyleSet3 & TStyleSet4>;
/**
 * Combine a set of styles together (but does not register css classes).
 * @param styleSet1 - The first style set to be concatenated.
 * @param styleSet2 - The second style set to be concatenated.
 * @param styleSet3 - The third style set to be concatenated.
 * @param styleSet4 - The fourth style set to be concatenated.
 */
export declare function concatStyleSets<TStyleSet1 extends IStyleSet<TStyleSet1>, TStyleSet2 extends IStyleSet<TStyleSet2>, TStyleSet3 extends IStyleSet<TStyleSet3>, TStyleSet4 extends IStyleSet<TStyleSet4>>(styleSet1: TStyleSet1 | false | null | undefined, styleSet2: TStyleSet2 | false | null | undefined, styleSet3: TStyleSet3 | false | null | undefined, styleSet4: TStyleSet4 | false | null | undefined): IConcatenatedStyleSet<TStyleSet1 & TStyleSet2 & TStyleSet3 & TStyleSet4>;
/**
 * Combine a set of styles together (but does not register css classes).
 * @param styleSet1 - The first style set to be concatenated.
 * @param styleSet2 - The second style set to be concatenated.
 * @param styleSet3 - The third style set to be concatenated.
 * @param styleSet4 - The fourth style set to be concatenated.
 * @param styleSet5 - The fifth set to be concatenated.
 */
export declare function concatStyleSets<TStyleSet1 extends IStyleSet<TStyleSet1>, TStyleSet2 extends IStyleSet<TStyleSet2>, TStyleSet3 extends IStyleSet<TStyleSet3>, TStyleSet4 extends IStyleSet<TStyleSet4>, TStyleSet5 extends IStyleSet<TStyleSet5>>(styleSet1: TStyleSet1 | false | null | undefined, styleSet2: TStyleSet2 | false | null | undefined, styleSet3: TStyleSet3 | false | null | undefined, styleSet4: TStyleSet4 | false | null | undefined, styleSet5: TStyleSet5 | false | null | undefined): IConcatenatedStyleSet<TStyleSet1 & TStyleSet2 & TStyleSet3 & TStyleSet4 & TStyleSet5>;
/**
 * Combine a set of styles together (but does not register css classes).
 * @param styleSet1 - The first style set to be concatenated.
 * @param styleSet2 - The second style set to be concatenated.
 * @param styleSet3 - The third style set to be concatenated.
 * @param styleSet4 - The fourth style set to be concatenated.
 * @param styleSet5 - The fifth set to be concatenated.
 * @param styleSet6 - The sixth set to be concatenated.
 */
export declare function concatStyleSets<TStyleSet1 extends IStyleSet<TStyleSet1>, TStyleSet2 extends IStyleSet<TStyleSet2>, TStyleSet3 extends IStyleSet<TStyleSet3>, TStyleSet4 extends IStyleSet<TStyleSet4>, TStyleSet5 extends IStyleSet<TStyleSet5>, TStyleSet6 extends IStyleSet<TStyleSet6>>(styleSet1: TStyleSet1 | false | null | undefined, styleSet2: TStyleSet2 | false | null | undefined, styleSet3: TStyleSet3 | false | null | undefined, styleSet4: TStyleSet4 | false | null | undefined, styleSet5: TStyleSet5 | false | null | undefined, styleSet6: TStyleSet6 | false | null | undefined): IConcatenatedStyleSet<TStyleSet1 & TStyleSet2 & TStyleSet3 & TStyleSet4 & TStyleSet5 & TStyleSet6>;
/**
 * Combine a set of styles together (but does not register css classes).
 * @param styleSets - One or more stylesets to be merged (each param can also be falsy).
 */
export declare function concatStyleSets(...styleSets: (IStyleSet<any> | false | null | undefined)[]): IConcatenatedStyleSet<any>;
/**
 * Registers a font face.
 * @public
 */
export declare function fontFace(font: IFontFace): void;
/**
 * Registers keyframe definitions.
 *
 * @public
 */
export declare function keyframes(timeline: {
	[key: string]: {};
}): string;
/**
 * Concatination helper, which can merge class names together. Skips over falsey values.
 *
 * @public
 */
export declare function mergeStyles(...args: (IStyle | IStyleBaseArray | false | null | undefined)[]): string;
/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSet - The first style set to be merged and reigstered.
 */
export declare function mergeStyleSets<TStyleSet extends IStyleSet<TStyleSet>>(styleSet: TStyleSet | false | null | undefined): IProcessedStyleSet<TStyleSet>;
/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSet1 - The first style set to be merged.
 * @param styleSet2 - The second style set to be merged.
 */
export declare function mergeStyleSets<TStyleSet1 extends IStyleSet<TStyleSet1>, TStyleSet2 extends IStyleSet<TStyleSet2>>(styleSet1: TStyleSet1 | false | null | undefined, styleSet2: TStyleSet2 | false | null | undefined): IProcessedStyleSet<TStyleSet1 & TStyleSet2>;
/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSet1 - The first style set to be merged.
 * @param styleSet2 - The second style set to be merged.
 * @param styleSet3 - The third style set to be merged.
 */
export declare function mergeStyleSets<TStyleSet1 extends IStyleSet<TStyleSet1>, TStyleSet2 extends IStyleSet<TStyleSet2>, TStyleSet3 extends IStyleSet<TStyleSet3>>(styleSet1: TStyleSet1 | false | null | undefined, styleSet2: TStyleSet2 | false | null | undefined, styleSet3: TStyleSet3 | false | null | undefined): IProcessedStyleSet<TStyleSet1 & TStyleSet2 & TStyleSet3>;
/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSet1 - The first style set to be merged.
 * @param styleSet2 - The second style set to be merged.
 * @param styleSet3 - The third style set to be merged.
 * @param styleSet4 - The fourth style set to be merged.
 */
export declare function mergeStyleSets<TStyleSet1 extends IStyleSet<TStyleSet1>, TStyleSet2 extends IStyleSet<TStyleSet2>, TStyleSet3 extends IStyleSet<TStyleSet3>, TStyleSet4 extends IStyleSet<TStyleSet4>>(styleSet1: TStyleSet1 | false | null | undefined, styleSet2: TStyleSet2 | false | null | undefined, styleSet3: TStyleSet3 | false | null | undefined, styleSet4: TStyleSet4 | false | null | undefined): IProcessedStyleSet<TStyleSet1 & TStyleSet2 & TStyleSet3 & TStyleSet4>;
/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 */
export declare function mergeStyleSets(...styleSets: Array<IStyleSet<any> | undefined | false | null>): IProcessedStyleSet<any>;
export declare const InjectionMode: {
	/**
	 * Avoids style injection, use getRules() to read the styles.
	 */
	none: 0;
	/**
	 * Inserts rules using the insertRule api.
	 */
	insertNode: 1;
	/**
	 * Appends rules using appendChild.
	 */
	appendChild: 2;
};
export declare type InjectionMode = typeof InjectionMode[keyof typeof InjectionMode];
/**
 * Stylesheet config.
 *
 * @public
 */
export interface IStyleSheetConfig {
	/**
	 * Injection mode for how rules are inserted.
	 */
	injectionMode?: InjectionMode;
	/**
	 * Default 'displayName' to use for a className.
	 * @defaultvalue 'css'
	 */
	defaultPrefix?: string;
	/**
	 * Default 'namespace' to attach before the className.
	 */
	namespace?: string;
	/**
	 * Callback executed when a rule is inserted.
	 */
	onInsertRule?: (rule: string) => void;
}
/**
 * Represents the state of styles registered in the page. Abstracts
 * the surface for adding styles to the stylesheet, exposes helpers
 * for reading the styles registered in server rendered scenarios.
 *
 * @public
 */
export declare class Stylesheet {
	private _lastStyleElement?;
	private _styleElement?;
	private _rules;
	private _preservedRules;
	private _config;
	private _rulesToInsert;
	private _counter;
	private _keyToClassName;
	private _onResetCallbacks;
	private _classNameToArgs;
	/**
	 * Gets the singleton instance.
	 */
	static getInstance(): Stylesheet;
	constructor(config?: IStyleSheetConfig);
	/**
	 * Configures the stylesheet.
	 */
	setConfig(config?: IStyleSheetConfig): void;
	/**
	 * Configures a reset callback.
	 *
	 * @param callback - A callback which will be called when the Stylesheet is reset.
	 */
	onReset(callback: () => void): void;
	/**
	 * Generates a unique classname.
	 *
	 * @param displayName - Optional value to use as a prefix.
	 */
	getClassName(displayName?: string): string;
	/**
	 * Used internally to cache information about a class which was
	 * registered with the stylesheet.
	 */
	cacheClassName(className: string, key: string, args: IStyle[], rules: string[]): void;
	/**
	 * Gets the appropriate classname given a key which was previously
	 * registered using cacheClassName.
	 */
	classNameFromKey(key: string): string | undefined;
	/**
	 * Gets the arguments associated with a given classname which was
	 * previously registered using cacheClassName.
	 */
	argsFromClassName(className: string): IStyle[] | undefined;
	/**
	 * Gets the arguments associated with a given classname which was
	 * previously registered using cacheClassName.
	 */
	insertedRulesFromClassName(className: string): string[] | undefined;
	/**
	 * Inserts a css rule into the stylesheet.
	 * @param preserve - Preserves the rule beyond a reset boundary.
	 */
	insertRule(rule: string, preserve?: boolean): void;
	/**
	 * Gets all rules registered with the stylesheet; only valid when
	 * using InsertionMode.none.
	 */
	getRules(includePreservedRules?: boolean): string;
	/**
	 * Resets the internal state of the stylesheet. Only used in server
	 * rendered scenarios where we're using InsertionMode.none.
	 */
	reset(): void;
	resetKeys(): void;
	private _getStyleElement;
	private _createStyleElement;
}
/**
 * Simulated enum for keycodes. These will get inlined by uglify when used much like an enum
 *
 * @public
 */
export declare const KeyCodes: {
	backspace: 8;
	tab: 9;
	enter: 13;
	shift: 16;
	ctrl: 17;
	alt: 18;
	pauseBreak: 19;
	capslock: 20;
	escape: 27;
	space: 32;
	pageUp: 33;
	pageDown: 34;
	end: 35;
	home: 36;
	left: 37;
	up: 38;
	right: 39;
	down: 40;
	insert: 45;
	del: 46;
	zero: 48;
	one: 49;
	two: 50;
	three: 51;
	four: 52;
	five: 53;
	six: 54;
	seven: 55;
	eight: 56;
	nine: 57;
	a: 65;
	b: 66;
	c: 67;
	d: 68;
	e: 69;
	f: 70;
	g: 71;
	h: 72;
	i: 73;
	j: 74;
	k: 75;
	l: 76;
	m: 77;
	n: 78;
	o: 79;
	p: 80;
	q: 81;
	r: 82;
	s: 83;
	t: 84;
	u: 85;
	v: 86;
	w: 87;
	x: 88;
	y: 89;
	z: 90;
	leftWindow: 91;
	rightWindow: 92;
	select: 93;
	zero_numpad: 96;
	one_numpad: 97;
	two_numpad: 98;
	three_numpad: 99;
	four_numpad: 100;
	five_numpad: 101;
	six_numpad: 102;
	seven_numpad: 103;
	eight_numpad: 104;
	nine_numpad: 105;
	multiply: 106;
	add: 107;
	subtract: 109;
	decimalPoint: 110;
	divide: 111;
	f1: 112;
	f2: 113;
	f3: 114;
	f4: 115;
	f5: 116;
	f6: 117;
	f7: 118;
	f8: 119;
	f9: 120;
	f10: 121;
	f11: 122;
	f12: 123;
	numlock: 144;
	scrollLock: 145;
	semicolon: 186;
	equalSign: 187;
	comma: 188;
	dash: 189;
	period: 190;
	forwardSlash: 191;
	graveAccent: 192;
	openBracket: 219;
	backSlash: 220;
	closeBracket: 221;
	singleQuote: 222;
};
export declare type KeyCodes = number;
/**
 * Rectangle helper class.
 *
 * @public
 */
export declare class Rectangle {
	top: number;
	bottom: number;
	left: number;
	right: number;
	constructor(left?: number, right?: number, top?: number, bottom?: number);
	/**
	 * Calculated automatically by subtracting the right from left
	 */
	readonly width: number;
	/**
	 * Calculated automatically by subtracting the bottom from top.
	 */
	readonly height: number;
	/**
	 * Tests if another rect is approximately equal to this rect (within 4 decimal places.)
	 */
	equals(rect: Rectangle): boolean;
}
/**
 * ARIA helper to concatenate attributes, returning undefined if all attributes
 * are undefined. (Empty strings are not a valid ARIA attribute value.)
 *
 * NOTE: This function will NOT insert whitespace between provided attributes.
 *
 * @param ariaAttributes - ARIA attributes to merge
 */
export declare function mergeAriaAttributeValues(...ariaAttributes: (string | undefined)[]): string | undefined;
/**
 * Helper to find the index of an item within an array, using a callback to
 * determine the match.
 *
 * @public
 * @param array - Array to search.
 * @param cb - Callback which returns true on matches.
 */
export declare function findIndex<T>(array: T[], cb: (item: T, index: number) => boolean): number;
/**
 * Helper to find the first item within an array that satisfies the callback.
 * @param array - Array to search
 * @param cb - Callback which returns true on matches
 */
export declare function find<T>(array: T[], cb: (item: T, index: number) => boolean): T | undefined;
/**
 * Creates an array of a given size and helper method to populate.
 *
 * @public
 * @param size - Size of array.
 * @param getItem - Callback to populate given cell index.
 */
export declare function createArray<T>(size: number, getItem: (index: number) => T): T[];
/**
 * Convert the given array to a matrix with columnCount number
 * of columns.
 *
 * @public
 * @param items - The array to convert
 * @param columnCount - The number of columns for the resulting matrix
 * @returns A matrix of items
 */
export declare function toMatrix<T>(items: T[], columnCount: number): T[][];
/**
 * Given an array, it returns a new array that does not contain the item at the given index.
 * @param array - The array to operate on
 * @param index - The index of the element to remove
 */
export declare function removeIndex<T>(array: T[], index: number): T[];
/**
 * Given an array, this function returns a new array where the element at a given index has been replaced.
 * @param array - The array to operate on
 * @param newElement - The element that will be placed in the new array
 * @param index - The index of the element that should be replaced
 */
export declare function replaceElement<T>(array: T[], newElement: T, index: number): T[];
/**
 * Given an array, this function returns a new array where an element has been inserted at the given index.
 * @param array - The array to operate on
 * @param index - The index where an element should be inserted
 * @param itemToAdd - The element to insert
 */
export declare function addElementAtIndex<T>(array: T[], index: number, itemToAdd: T): T[];
/**
 * Given an array where each element is of type T or T[], flatten it into an array of T
 * @param array - The array where each element can optionally also be an array
 */
export declare function flatten<T>(array: (T | T[])[]): T[];
/**
 * Returns a boolean indicating if the two given arrays are equal in length and values.
 *
 * @param array1 - First array to compare
 * @param array2 - Second array to compare
 * @returns True if the arrays are the same length and have the same values in the same positions, false otherwise.
 */
export declare function arraysEqual<T>(array1: T[], array2: T[]): boolean;
export interface IAsAsyncOptions<TProps> {
	/**
	 * Callback which returns a promise resolving an object which exports the component.
	 */
	load: () => Promise<React.ReactType<TProps>>;
	/**
	 * Callback executed when async loading is complete.
	 */
	onLoad?: () => void;
	/**
	 * Callback when async loading fails.
	 */
	onError?: (error: Error) => void;
}
/**
 * Produces a component which internally loads the target component before first mount.
 * The component passes all props through to the loaded component.
 *
 * This overload accepts a module with a default export for the component.
 */
export declare function asAsync<TProps>(options: IAsAsyncOptions<TProps>): React.ComponentType<TProps & {
	asyncPlaceholder?: React.ReactType;
}>;
/**
 * AssertNever is a utility function that can be used for exhaustiveness checks in switch statements.
 *
 * @public
 */
export declare function assertNever(x: never): never;
/**
 * Autobind is a utility for binding methods in a class. This simplifies tagging methods as being "bound" to the this pointer
 * so that they can be used in scenarios that simply require a function callback.
 * @deprecated This has been deprecated in favor of using arrow function properties
 */
export declare function autobind<T extends Function>(target: any, key: string, descriptor: TypedPropertyDescriptor<T>): {
	configurable: boolean;
	get(): T;
	set(newValue: any): void;
} | void;
/**
 * Creates a getClassNames function which calls getStyles given the props, and injects them
 * into mergeStyleSets.
 */
export declare function classNamesFunction<TStyleProps extends {}, TStyleSet extends IStyleSet<TStyleSet>>(): (getStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet> | undefined, styleProps?: TStyleProps) => IProcessedStyleSet<TStyleSet>;
/**
 * Dictionary of booleans.
 *
 * @internal
 */
export interface IDictionary {
	[className: string]: boolean;
}
/**
 * Serializable object.
 *
 * @internal
 */
export interface ISerializableObject {
	toString?: () => string;
}
/**
 * css input type.
 *
 * @internal
 */
export declare type ICssInput = string | ISerializableObject | IDictionary | null | undefined | boolean;
/**
 * Concatination helper, which can merge class names together. Skips over falsey values.
 *
 * @public
 */
export declare function css(...args: ICssInput[]): string;
export declare function customizable(scope: string, fields: string[], concatStyles?: boolean): <P>(ComposedComponent: React.ComponentType<P>) => any;
export declare const DATA_PORTAL_ATTRIBUTE = "data-portal-element";
/**
 * Sets the virtual parent of an element.
 * Pass `undefined` as the `parent` to clear the virtual parent.
 *
 * @public
 */
export declare function setVirtualParent(child: HTMLElement, parent: HTMLElement): void;
/**
 * Gets the virtual parent given the child element, if it exists.
 *
 * @public
 */
export declare function getVirtualParent(child: HTMLElement): HTMLElement | undefined;
/**
 * Gets the element which is the parent of a given element.
 * If `allowVirtuaParents` is `true`, this method prefers the virtual parent over
 * real DOM parent when present.
 *
 * @public
 */
export declare function getParent(child: HTMLElement, allowVirtualParents?: boolean): HTMLElement | null;
/**
 * Gets the elements which are child elements of the given element.
 * If `allowVirtualChildren` is `true`, this method enumerates virtual child elements
 * after the original children.
 * @param parent - The element to get the children of.
 * @param allowVirtualChildren - true if the method should enumerate virtual child elements.
 */
export declare function getChildren(parent: HTMLElement, allowVirtualChildren?: boolean): HTMLElement[];
/**
 * Determines whether or not a parent element contains a given child element.
 * If `allowVirtualParents` is true, this method may return `true` if the child
 * has the parent in its virtual element hierarchy.
 *
 * @public
 */
export declare function elementContains(parent: HTMLElement | null, child: HTMLElement | null, allowVirtualParents?: boolean): boolean;
/**
 * Helper to set ssr mode to simulate no window object returned from getWindow helper.
 *
 * @public
 */
export declare function setSSR(isEnabled: boolean): void;
/**
 * Helper to get the window object.
 *
 * @public
 */
export declare function getWindow(rootElement?: Element | null): Window | undefined;
/**
 * Helper to get the document object.
 *
 * @public
 */
export declare function getDocument(rootElement?: HTMLElement | null): Document | undefined;
/**
 * Helper to get bounding client rect, works with window.
 *
 * @public
 */
export declare function getRect(element: HTMLElement | Window | null): IRectangle | undefined;
/**
 * Identify element as a portal by setting an attribute.
 * @param element - Element to mark as a portal.
 */
export declare function setPortalAttribute(element: HTMLElement): void;
/**
 * Determine whether a target is within a portal from perspective of root or optional parent.
 * This function only works against portal components that use the setPortalAttribute function.
 * If both parent and child are within the same portal this function will return false.
 * @param target - Element to query portal containment status of.
 * @param parent - Optional parent perspective. Search for containing portal stops at parent (or root if parent is undefined or invalid.)
 */
export declare function portalContainsElement(target: HTMLElement, parent?: HTMLElement): boolean;
/**
 * Finds the first parent element where the matchFunction returns true
 * @param element - element to start searching at
 * @param matchFunction - the function that determines if the element is a match
 * @returns the matched element or null no match was found
 */
export declare function findElementRecursive(element: HTMLElement | null, matchFunction: (element: HTMLElement) => boolean): HTMLElement | null;
/**
 * Determines if an element, or any of its ancestors, contain the given attribute
 * @param element - element to start searching at
 * @param attribute - the attribute to search for
 * @returns the value of the first instance found
 */
export declare function elementContainsAttribute(element: HTMLElement, attribute: string): string | null;
/**
 * Gets the first focusable element.
 *
 * @public
 */
export declare function getFirstFocusable(rootElement: HTMLElement, currentElement: HTMLElement, includeElementsInFocusZones?: boolean): HTMLElement | null;
/**
 * Gets the last focusable element.
 *
 * @public
 */
export declare function getLastFocusable(rootElement: HTMLElement, currentElement: HTMLElement, includeElementsInFocusZones?: boolean): HTMLElement | null;
/**
 * Gets the first tabbable element.
 * The difference between focusable and tabbable is that tabbable elements are focusable elements that also have tabIndex != -1.
 * @param rootElement - The parent element to search beneath.
 * @param currentElement - The descendant of rootElement to start the search at.  This element is the first one checked,
 * and iteration continues forward.  Typical use passes rootElement.firstChild.
 * @param includeElementsInFocusZones - true if traversal should go into FocusZone descendants.
 * @public
 */
export declare function getFirstTabbable(rootElement: HTMLElement, currentElement: HTMLElement, includeElementsInFocusZones?: boolean): HTMLElement | null;
/**
 * Gets the last tabbable element.
 * The difference between focusable and tabbable is that tabbable elements are focusable elements that also have tabIndex != -1.
 * @param rootElement - The parent element to search beneath.
 * @param currentElement - The descendant of rootElement to start the search at.  This element is the first one checked,
 * and iteration continues in reverse.  Typical use passes rootElement.lastChild.
 * @param includeElementsInFocusZones - true if traversal should go into FocusZone descendants.
 * @public
 */
export declare function getLastTabbable(rootElement: HTMLElement, currentElement: HTMLElement, includeElementsInFocusZones?: boolean): HTMLElement | null;
/**
 * Attempts to focus the first focusable element that is a child or child's child of the rootElement.
 *
 * @public
 * @param rootElement - Element to start the search for a focusable child.
 * @returns True if focus was set, false if it was not.
 */
export declare function focusFirstChild(rootElement: HTMLElement): boolean;
/**
 * Traverse to find the previous element.
 * If tabbable is true, the element must have tabIndex != -1.
 *
 * @public
 */
export declare function getPreviousElement(rootElement: HTMLElement, currentElement: HTMLElement | null, checkNode?: boolean, suppressParentTraversal?: boolean, traverseChildren?: boolean, includeElementsInFocusZones?: boolean, allowFocusRoot?: boolean, tabbable?: boolean): HTMLElement | null;
/**
 * Traverse to find the next focusable element.
 * If tabbable is true, the element must have tabIndex != -1.
 *
 * @public
 */
export declare function getNextElement(rootElement: HTMLElement, currentElement: HTMLElement | null, checkNode?: boolean, suppressParentTraversal?: boolean, suppressChildTraversal?: boolean, includeElementsInFocusZones?: boolean, allowFocusRoot?: boolean, tabbable?: boolean): HTMLElement | null;
/**
 * Determines if an element is visible.
 *
 * @public
 */
export declare function isElementVisible(element: HTMLElement | undefined | null): boolean;
/**
 * Determines if an element can receive focus programmatically or via a mouse click.
 * If checkTabIndex is true, additionally checks to ensure the element can be focused with the tab key, meaning tabIndex != -1.
 *
 * @public
 */
export declare function isElementTabbable(element: HTMLElement, checkTabIndex?: boolean): boolean;
/**
 * Determines if a given element is a focus zone.
 *
 * @public
 */
export declare function isElementFocusZone(element?: HTMLElement): boolean;
/**
 * Determines if a given element is a focus sub zone.
 *
 * @public
 */
export declare function isElementFocusSubZone(element?: HTMLElement): boolean;
/**
 * Determines if an element, or any of its children, contain focus.
 *
 * @public
 */
export declare function doesElementContainFocus(element: HTMLElement): boolean;
/**
 * Determines if an, or any of its ancestors, sepcificies that it doesn't want focus to wrap
 * @param element - element to start searching from
 * @param noWrapDataAttribute - the no wrap data attribute to match (either)
 * @returns true if focus should wrap, false otherwise
 */
export declare function shouldWrapFocus(element: HTMLElement, noWrapDataAttribute: 'data-no-vertical-wrap' | 'data-no-horizontal-wrap'): boolean;
/**
 * Sets focus to an element asynchronously. The focus will be set at the next browser repaint,
 * meaning it won't cause any extra recalculations. If more than one focusAsync is called during one frame,
 * only the latest called focusAsync element will actually be focused
 * @param element - The element to focus
 */
export declare function focusAsync(element: HTMLElement | {
	focus: () => void;
} | undefined | null): void;
/**
 * Allows you to hoist methods, except those in an exclusion set from a source object into a destination object.
 *
 * @public
 * @param destination - The instance of the object to hoist the methods onto.
 * @param source - The instance of the object where the methods are hoisted from.
 * @param exclusions - (Optional) What methods to exclude from being hoisted.
 * @returns An array of names of methods that were hoisted.
 */
export declare function hoistMethods(destination: any, source: any, exclusions?: string[]): string[];
/**
 * Provides a method for convenience to unhoist hoisted methods.
 *
 * @public
 * @param source - The source object upon which methods were hoisted.
 * @param methodNames - An array of method names to unhoist.
 */
export declare function unhoistMethods(source: any, methodNames: string[]): void;
/**
 * Allows you to hoist static functions in components.
 * Created for the purpose of fixing broken static functions in classes
 * that utilize decorators.
 *
 * @public
 * @param source - The object where the methods are hoisted from.
 * @param dest - The object to hoist the methods onto.
 * @returns The dest object with methods added
 */
export declare function hoistStatics<TSource, TDest>(source: TSource, dest: TDest): TDest;
export declare const IsFocusVisibleClassName = "ms-Fabric--isFocusVisible";
/**
 * Initializes the logic which:
 *
 * 1. Subscribes keydown and mousedown events. (It will only do it once per window,
 *    so it's safe to call this method multiple times.)
 * 2. When the user presses directional keyboard keys, adds the 'ms-Fabric--isFocusVisible' classname
 *    to the document body.
 * 3. When the user clicks a mouse button, we remove the classname if it exists.
 *
 * This logic allows components on the page to conditionally render focus treatments only
 * if the global classname exists, which simplifies logic overall.
 *
 * @param window - the window used to add the event listeners
 */
export declare function initializeFocusRects(window?: Window): void;
/**
 * Get (up to 2 characters) initials based on display name of the persona.
 *
 * @public
 */
export declare function getInitials(displayName: string | undefined | null, isRtl: boolean, allowPhoneInitials?: boolean): string;
/**
 * Returns true if the keycode is a directional keyboard key.
 */
export declare function isDirectionalKeyCode(which: number): boolean;
/**
 * Adds a keycode to the list of keys that, when pressed, should cause the focus outlines to be visible.
 * This can be used to add global shortcut keys that directionally move from section to section within
 * an app or between focus trap zones.
 */
export declare function addDirectionalKeyCode(which: number): void;
/**
 * Gets the rtl state of the page (returns true if in rtl.)
 *
 * @public
 */
export declare function getLanguage(): string | null;
/**
 * Sets the rtl state of the page (by adjusting the dir attribute of the html element.)
 *
 * @public
 */
export declare function setLanguage(language: string, avoidPersisting?: boolean): void;
/**
 * Determines the distance between two points.
 *
 * @public
 */
export declare function getDistanceBetweenPoints(point1: IPoint, point2: IPoint): number;
/**
 * The available fit modes. These should match the fit modes for CSS.
 */
export declare type FitMode = 'contain' | 'cover';
/**
 * Options for fitting content sizes into bounding sizes.
 */
export interface IFitContentToBoundsOptions {
	/**
	 * The size of the content to fit to the bounds.
	 * The output will be proportional to this value.
	 */
	contentSize: ISize;
	/**
	 * The size of the bounds.
	 */
	boundsSize: ISize;
	/**
	 * The fit mode to apply, either 'contain' or 'cover'.
	 */
	mode: FitMode;
	/**
	 * An optional maximum scale factor to apply. The default is 1.
	 * Use Infinity for an unbounded resize.
	 */
	maxScale?: number;
}
/**
 * Produces a proportionally-scaled version of an input content size when fit to a bounding size.
 * Given a `contentSize` and a `boundsSize`, this function scales `contentSize` proportionally
 * using either `contain` or `cover` fit behaviors.
 * Use this function to pre-calculate the layout for the CSS `object-fit` and `background-fit` behaviors.
 * With `contain`, the output size must be the largest it can be while completely within the `boundsSize`.
 * With `cover`, the output size must be the smallest it can be while completely around the `boundsSize`.
 * By default, there is a `maxScale` value of 1, which prevents the `contentSize` from being scaled larger.
 *
 * @param options - the options for the bounds fit operation
 */
export declare function fitContentToBounds(options: IFitContentToBoundsOptions): ISize;
/**
 * Calculates a number's precision based on the number of trailing
 * zeros if the number does not have a decimal indicated by a negative
 * precision. Otherwise, it calculates the number of digits after
 * the decimal point indicated by a positive precision.
 * @param value - the value to determine the precision of
 */
export declare function calculatePrecision(value: number | string): number;
/**
 * Rounds a number to a certain level of precision. Accepts negative precision.
 * @param value - The value that is being rounded.
 * @param precision - The number of decimal places to round the number to
 */
export declare function precisionRound(value: number, precision: number, base?: number): number;
/**
 *  Test utility for providing a custom weakmap.
 *
 * @internal
 * */
export declare function setMemoizeWeakMap(weakMap: any): void;
/**
 * Reset memoizations.
 */
export declare function resetMemoizations(): void;
/**
 * Memoize decorator to be used on class methods. Note that the "this" reference
 * will be inaccessible within a memoized method, given that a cached method's this
 * would not be instance specific.
 *
 * @public
 */
export declare function memoize<T extends Function>(target: any, key: string, descriptor: TypedPropertyDescriptor<T>): {
	configurable: boolean;
	get(): T;
};
/**
 * Memoizes a function; when you pass in the same parameters multiple times, it returns a cached result.
 * Be careful when passing in objects, you need to pass in the same INSTANCE for caching to work. Otherwise
 * it will grow the cache unnecessarily. Also avoid using default values that evaluate functions; passing in
 * undefined for a value and relying on a default function will execute it the first time, but will not
 * re-evaluate subsequent times which may have been unexpected.
 *
 * By default, the cache will reset after 100 permutations, to avoid abuse cases where the function is
 * unintendedly called with unique objects. Without a reset, the cache could grow infinitely, so we safeguard
 * by resetting. To override this behavior, pass a value of 0 to the maxCacheSize parameter.
 *
 * @public
 * @param cb - The function to memoize.
 * @param maxCacheSize - Max results to cache. If the cache exceeds this value, it will reset on the next call.
 * @returns A memoized version of the function.
 */
export declare function memoizeFunction<T extends (...args: any[]) => RET_TYPE, RET_TYPE>(cb: T, maxCacheSize?: number): T;
/**
 * Simple deep merge function. Takes all arguments and returns a deep copy of the objects merged
 * together in the order provided. If an object creates a circular reference, it will assign the
 * original reference.
 */
export declare function merge<T = {}>(target: Partial<T>, ...args: (Partial<T> | null | undefined | false)[]): T;
/**
 * Returns true if and only if the user is on a iOS device.
 * Used to determine whether iOS-specific behavior should be applied.
 */
export declare const isIOS: () => boolean;
/**
 * Compares a to b and b to a.
 *
 * @public
 */
export declare function shallowCompare<TA, TB>(a: TA, b: TB): boolean;
/**
 * Makes a resulting merge of a bunch of objects. Pass in the target object followed by 1 or more
 * objects as arguments and they will be merged sequentially into the target. Note that this will
 * shallow merge; it will not create new cloned values for target members.
 *
 * @public
 * @param target - Target object to merge following object arguments into.
 * @param args - One or more objects that will be mixed into the target in the order they are provided.
 * @returns Resulting merged target.
 */
export declare function assign(target: any, ...args: any[]): any;
/**
 * Makes a resulting merge of a bunch of objects, but allows a filter function to be passed in to filter
 * the resulting merges. This allows for scenarios where you want to merge "everything except that one thing"
 * or "properties that start with data-". Note that this will shallow merge; it will not create new cloned
 * values for target members.
 *
 * @public
 * @param isAllowed - Callback to determine if the given propName is allowed in the result.
 * @param target - Target object to merge following object arguments into.
 * @param args - One or more objects that will be mixed into the target in the order they are provided.
 * @returns Resulting merged target.
 */
export declare function filteredAssign(isAllowed: (propName: string) => boolean, target: any, ...args: any[]): any;
/**
 * Generates a unique id in the global scope (this spans across duplicate copies of the same library.)
 *
 * @public
 */
export declare function getId(prefix?: string): string;
/**
 * Resets id counter to an (optional) number.
 *
 * @public
 */
export declare function resetIds(counter?: number): void;
export declare function mapEnumByName<T>(theEnum: any, callback: (name?: string, value?: string | number) => T | undefined): (T | undefined)[] | undefined;
/**
 * Get all values in an object dictionary
 *
 * @param obj - The dictionary to get values for
 */
export declare function values<T>(obj: any): T[];
/**
 * Returns true if the user is on a Mac. Caches the result value.
 * @param reset - Reset the cached result value (mainly for testing).
 */
export declare function isMac(reset?: boolean): boolean;
/**
 * Detects whether an element's content has horizontal overflow
 *
 * @public
 * @param element - Element to check for overflow
 * @returns True if element's content overflows
 */
export declare function hasHorizontalOverflow(element: HTMLElement): boolean;
/**
 * Detects whether an element's content has vertical overflow
 *
 * @public
 * @param element - Element to check for overflow
 * @returns True if element's content overflows
 */
export declare function hasVerticalOverflow(element: HTMLElement): boolean;
/**
 * Detects whether an element's content has overflow in any direction
 *
 * @public
 * @param element - Element to check for overflow
 * @returns True if element's content overflows
 */
export declare function hasOverflow(element: HTMLElement): boolean;
/**
 * An array of events that are allowed on every html element type.
 *
 * @public
 */
export declare const baseElementEvents: string[];
/**
 * An array of element attributes which are allowed on every html element type.
 *
 * @public
 */
export declare const baseElementProperties: string[];
/**
 * An array of HTML element properties and events.
 *
 * @public
 */
export declare const htmlElementProperties: string[];
/**
 * An array of A tag properties and events.
 *
 * @public
 */
export declare const anchorProperties: string[];
/**
 * An array of BUTTON tag properties and events.
 *
 * @public
 */
export declare const buttonProperties: string[];
/**
 * An array of DIV tag properties and events.
 *
 * @public
 */
export declare const divProperties: string[];
/**
 * An array of INPUT tag properties and events.
 *
 * @public
 */
export declare const inputProperties: string[];
/**
 * An array of TEXTAREA tag properties and events.
 *
 * @public
 */
export declare const textAreaProperties: string[];
/**
 * An array of IMAGE tag properties and events.
 *
 * @public
 */
export declare const imageProperties: string[];
/**
 * Gets native supported props for an html element provided the allowance set. Use one of the property
 * sets defined (divProperties, buttonPropertes, etc) to filter out supported properties from a given
 * props set. Note that all data- and aria- prefixed attributes will be allowed.
 * NOTE: getNativeProps should always be applied first when adding props to a react component. The
 * non-native props should be applied second. This will prevent getNativeProps from overriding your custom props.
 * For example, if props passed to getNativeProps has an onClick function and getNativeProps is added to
 * the component after an onClick function is added, then the getNativeProps onClick will override it.
 *
 * @public
 * @param props - The unfiltered input props
 * @param allowedPropsNames-  The array of allowed propnames.
 * @returns The filtered props
 */
export declare function getNativeProps<T>(props: {}, allowedPropNames: string[], excludedPropNames?: string[]): T;
/** Sets the current base url used for fetching images. */
export declare function getResourceUrl(url: string): string;
/** Gets the current base url used for fetching images. */
export declare function setBaseUrl(baseUrl: string): void;
/**
 * Gets the rtl state of the page (returns true if in rtl.)
 */
export declare function getRTL(): boolean;
/**
 * Sets the rtl state of the page (by adjusting the dir attribute of the html element.)
 */
export declare function setRTL(isRTL: boolean, persistSetting?: boolean): void;
/**
 * Returns the given key, but flips right/left arrows if necessary.
 */
export declare function getRTLSafeKeyCode(key: number): number;
/**
 * Placing this attribute on scrollable divs optimizes detection to know
 * if the div is scrollable or not (given we can avoid expensive operations
 * like getComputedStyle.)
 *
 * @public
 */
export declare const DATA_IS_SCROLLABLE_ATTRIBUTE = "data-is-scrollable";
/**
 * Allows the user to scroll within a element,
 * while preventing the user from scrolling the body
 */
export declare const allowScrollOnElement: (element: HTMLElement, events: EventGroup) => void;
/**
 * Disables the body scrolling.
 *
 * @public
 */
export declare function disableBodyScroll(): void;
/**
 * Enables the body scrolling.
 *
 * @public
 */
export declare function enableBodyScroll(): void;
/**
 * Calculates the width of a scrollbar for the browser/os.
 *
 * @public
 */
export declare function getScrollbarWidth(): number;
/**
 * Traverses up the DOM for the element with the data-is-scrollable=true attribute, or returns
 * document.body.
 *
 * @public
 */
export declare function findScrollableParent(startingElement: HTMLElement | null): HTMLElement | null;
export declare function format(s: string, ...values: any[]): string;
export interface IPropsWithStyles<TStyleProps, TStyleSet extends IStyleSet<TStyleSet>> {
	styles?: IStyleFunctionOrObject<TStyleProps, TStyleSet>;
}
export interface ICustomizableProps {
	/**
	 * Name of scope, which can be targeted using the Customizer.
	 */
	scope: string;
	/**
	 * List of fields which can be customized.
	 * @defaultvalue [ 'theme', 'styles' ]
	 */
	fields?: string[];
}
/**
 * The styled HOC wrapper allows you to create a functional wrapper around a given component which will resolve
 * getStyles functional props, and mix customized props passed in using concatStyleSets.
 *
 * @example
 * ```tsx
 * export const Toggle = styled(
 *   ToggleBase,
 *   props => ({ root: { background: 'red' }})
 * );
 * ```
 * @param Component - The unstyled base component to render, which receives styles.
 * @param baseStyles - The styles which should be curried with the component.
 * @param getProps - A helper which provides default props.
 * @param customizable - An object which defines which props can be customized using the Customizer.
 */
export declare function styled<TComponentProps extends IPropsWithStyles<TStyleProps, TStyleSet>, TStyleProps, TStyleSet extends IStyleSet<TStyleSet>>(Component: React.ComponentClass<TComponentProps> | React.StatelessComponent<TComponentProps>, baseStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet>, getProps?: (props: TComponentProps) => Partial<TComponentProps>, customizable?: ICustomizableProps): (props: TComponentProps) => JSX.Element;
/**
 * All Fabric standard animations, exposed as json objects referencing predefined
 * keyframes. These objects can be mixed in with other class definitions.
 */
export interface IAnimationStyles {
	slideRightIn10: IRawStyle;
	slideRightIn20: IRawStyle;
	slideRightIn40: IRawStyle;
	slideRightIn400: IRawStyle;
	slideLeftIn10: IRawStyle;
	slideLeftIn20: IRawStyle;
	slideLeftIn40: IRawStyle;
	slideLeftIn400: IRawStyle;
	slideUpIn10: IRawStyle;
	slideUpIn20: IRawStyle;
	slideDownIn10: IRawStyle;
	slideDownIn20: IRawStyle;
	slideRightOut10: IRawStyle;
	slideRightOut20: IRawStyle;
	slideRightOut40: IRawStyle;
	slideRightOut400: IRawStyle;
	slideLeftOut10: IRawStyle;
	slideLeftOut20: IRawStyle;
	slideLeftOut40: IRawStyle;
	slideLeftOut400: IRawStyle;
	slideUpOut10: IRawStyle;
	slideUpOut20: IRawStyle;
	slideDownOut10: IRawStyle;
	slideDownOut20: IRawStyle;
	scaleUpIn100: IRawStyle;
	scaleDownIn100: IRawStyle;
	scaleUpOut103: IRawStyle;
	scaleDownOut98: IRawStyle;
	fadeIn100: IRawStyle;
	fadeIn200: IRawStyle;
	fadeIn400: IRawStyle;
	fadeIn500: IRawStyle;
	fadeOut100: IRawStyle;
	fadeOut200: IRawStyle;
	fadeOut400: IRawStyle;
	fadeOut500: IRawStyle;
	rotate90deg: IRawStyle;
	rotateN90deg: IRawStyle;
}
export interface IAnimationVariables {
	easeFunction1: string;
	easeFunction2: string;
	durationValue1: string;
	durationValue2: string;
	durationValue3: string;
	durationValue4: string;
}
/**
 * @internal
 * Experimental interface for decorative styling in a theme.
 */
export interface IEffects {
	/**
	 * Used to provide a visual affordance that this element is elevated above the surface it rests on.
	 * Usually a shadow. This is lower than elevations with a higher value, and higher than elevations with a lower value.
	 * Used for: cards, grid items
	 */
	elevation4: IRawStyle;
	/**
	 * Used to provide a visual affordance that this element is elevated above the surface it rests on.
	 * Usually a shadow. This is lower than elevations with a higher value, and higher than elevations with a lower value.
	 * Used for: menus, command surfaces
	 */
	elevation8: IRawStyle;
	/**
	 * Used to provide a visual affordance that this element is elevated above the surface it rests on.
	 * Usually a shadow. This is lower than elevations with a higher value, and higher than elevations with a lower value.
	 * Used for: search result dropdowns, hover cards, tooltips, help bubbles
	 */
	elevation16: IRawStyle;
	/**
	 * Used to provide a visual affordance that this element is elevated above the surface it rests on.
	 * Usually a shadow. This is lower than elevations with a higher value, and higher than elevations with a lower value.
	 * Used for: Panels, Dialogs
	 */
	elevation64: IRawStyle;
	/**
	 * How much corners should be rounded, for use with border-radius.
	 */
	roundedCorner2: number;
}
/**
 * The interface of window.FabricConfig, which can be burned on the page before script loading to preemptively
 * define default configurations.
 */
export interface IFabricConfig {
	/**
	 * An override for where the fonts should be downloaded from.
	 */
	fontBaseUrl?: string;
	/**
	 * The mergeStyles stylesheet config.
	 */
	mergeStyles?: IStyleSheetConfig;
}
/**
 * UI Fabric font set.
 */
export interface IFontStyles {
	tiny: IRawStyle;
	xSmall: IRawStyle;
	small: IRawStyle;
	smallPlus: IRawStyle;
	medium: IRawStyle;
	mediumPlus: IRawStyle;
	large: IRawStyle;
	xLarge: IRawStyle;
	xxLarge: IRawStyle;
	superLarge: IRawStyle;
	mega: IRawStyle;
}
/**
 * UI Fabric color palette.
 */
export interface IPalette {
	/**
	 * Color code for themeDarker.
	 */
	themeDarker: string;
	/**
	 * Color code for themeDark.
	 */
	themeDark: string;
	/**
	 * Color code for themeDarkAlt.
	 */
	themeDarkAlt: string;
	/**
	 * Color code for themePrimary.
	 */
	themePrimary: string;
	/**
	 * Color code for themeSecondary.
	 */
	themeSecondary: string;
	/**
	 * Color code for themeTertiary.
	 */
	themeTertiary: string;
	/**
	 * Color code for themeLight.
	 */
	themeLight: string;
	/**
	 * Color code for themeLighter.
	 */
	themeLighter: string;
	/**
	 * Color code for themeLighterAlt.
	 */
	themeLighterAlt: string;
	/**
	 * Color code for the strongest color, which is black in the default theme. This is a very light color in inverted themes.
	 */
	black: string;
	/**
	 * Color code for blackTranslucent40.
	 */
	blackTranslucent40: string;
	/**
	 * Color code for neutralDark.
	 */
	neutralDark: string;
	/**
	 * Color code for neutralPrimary.
	 */
	neutralPrimary: string;
	/**
	 * Color code for neutralPrimaryAlt.
	 */
	neutralPrimaryAlt: string;
	/**
	 * Color code for neutralSecondary.
	 */
	neutralSecondary: string;
	/**
	 * Color code for neutralSecondaryAlt.
	 */
	neutralSecondaryAlt: string;
	/**
	 * Color code for neutralTertiary.
	 */
	neutralTertiary: string;
	/**
	 * Color code for neutralTertiaryAlt.
	 */
	neutralTertiaryAlt: string;
	/**
	 * Color code for neutralQuaternary.
	 */
	neutralQuaternary: string;
	/**
	 * Color code for neutralQuaternaryAlt.
	 */
	neutralQuaternaryAlt: string;
	/**
	 * Color code for neutralLight.
	 */
	neutralLight: string;
	/**
	 * Color code for neutralLighter.
	 */
	neutralLighter: string;
	/**
	 * Color code for neutralLighterAlt.
	 */
	neutralLighterAlt: string;
	/**
	 * Color code for the accent.
	 */
	accent: string;
	/**
	 * Color code for the softest color, which is white in the default theme. This is a very dark color in dark themes.
	 * This is the page background.
	 */
	white: string;
	/**
	 * Color code for whiteTranslucent40
	 */
	whiteTranslucent40: string;
	/**
	 * Color code for yellow.
	 */
	yellow: string;
	/**
	 * Color code for yellowLight.
	 */
	yellowLight: string;
	/**
	 * Color code for orange.
	 */
	orange: string;
	/**
	 * Color code for orangeLight.
	 */
	orangeLight: string;
	/**
	 * Color code for orangeLighter.
	 */
	orangeLighter: string;
	/**
	 * Color code for redDark.
	 */
	redDark: string;
	/**
	 * Color code for red.
	 */
	red: string;
	/**
	 * Color code for magentaDark.
	 */
	magentaDark: string;
	/**
	 * Color code for magenta.
	 */
	magenta: string;
	/**
	 * Color code for magentaLight.
	 */
	magentaLight: string;
	/**
	 * Color code for purpleDark.
	 */
	purpleDark: string;
	/**
	 * Color code for purple.
	 */
	purple: string;
	/**
	 * Color code for purpleLight.
	 */
	purpleLight: string;
	/**
	 * Color code for blueDark.
	 */
	blueDark: string;
	/**
	 * Color code for blueMid.
	 */
	blueMid: string;
	/**
	 * Color code for blue.
	 */
	blue: string;
	/**
	 * Color code for blueLight.
	 */
	blueLight: string;
	/**
	 * Color code for tealDark.
	 */
	tealDark: string;
	/**
	 * Color code for teal.
	 */
	teal: string;
	/**
	 * Color code for tealLight.
	 */
	tealLight: string;
	/**
	 * Color code for greenDark.
	 */
	greenDark: string;
	/**
	 * Color code for green.
	 */
	green: string;
	/**
	 * Color code for greenLight.
	 */
	greenLight: string;
}
export interface ISemanticTextColors {
	/**
	 * The default color for text.
	 */
	bodyText: string;
	/**
	 * Checked text color, e.g. selected menu item text.
	 */
	bodyTextChecked: string;
	/**
	 * De-emphasized text; e.g. metadata, captions, placeholder text.
	 */
	bodySubtext: string;
	/**
	 * Neutral colored links and links for action buttons.
	 */
	actionLink: string;
	/**
	 * Hover state for neutral colored links and links for action buttons.
	 */
	actionLinkHovered: string;
	/**
	 * The color of a link.
	 */
	link: string;
	/**
	 * The color of a hovered link. Also used when the link is active.
	 */
	linkHovered: string;
	/**
	 * The default color for disabled text on top of disabledBackground; e.g. text in a disabled text field, disabled button text.
	 */
	disabledText: string;
	/**
	 * The default color for disabled text on the default background (bodyBackground).
	 */
	disabledBodyText: string;
	/**
	 * Disabled de-emphasized text, for use on disabledBackground.
	 */
	disabledSubtext: string;
	/**
	 * Disabled de-emphasized text, for use on the default background (bodyBackground).
	 */
	disabledBodySubtext: string;
	/**
	 * The default color of error text, used on bodyBackground.
	 */
	errorText: string;
	/**
	 * The color of text on errorBackground, warningBackground, blockingBackground, or successBackground.
	 */
	warningText: string;
	/**
	 * The color of input text.
	 */
	inputText: string;
	/**
	 * The color of input text on hover.
	 */
	inputTextHovered: string;
	/**
	 * The color of placeholder text.
	 */
	inputPlaceholderText: string;
	/**
	 * Color of text in a standard button
	 */
	buttonText: string;
	/**
	 * Color of text in a hovered standard button
	 */
	buttonTextHovered: string;
	/**
	 * Color of text in a checked standard button
	 */
	buttonTextChecked: string;
	/**
	 * Color of text in a checked and hovered standard button
	 */
	buttonTextCheckedHovered: string;
	/**
	 * Color of text in a pressed standard button; i.e. currently being clicked by mouse
	 */
	buttonTextPressed: string;
	/**
	 * Color of text in a disabled standard button
	 */
	buttonTextDisabled: string;
	/**
	 * Color of text in a primary button
	 */
	primaryButtonText: string;
	/**
	 * Color of text in a hovered primary button
	 */
	primaryButtonTextHovered: string;
	/**
	 * Color of text in a pressed primary button; i.e. currently being clicked by mouse
	 */
	primaryButtonTextPressed: string;
	/**
	 * Color of text in a disabled primary button
	 */
	primaryButtonTextDisabled: string;
	/**
	 * Color of text for accent button (kicker)
	 */
	accentButtonText: string;
	/**
	 * The default text color for list item titles and text in column fields.
	 */
	listText: string;
	/** @deprecated
	 * This slot was incorrectly named. Use listText instead. */
	listTextColor: string;
}
/**
 * The collection of all semantic slots for colors used in themes.
 *
 * Note: text colors are defined in ISemanticTextColors.ts.
 *
 * ## Naming Convention
 *
 * The name of a semantic slot can quickly tell you how it’s meant to be used. It generally follows this format:
 *
 * [category name][element name][checked state][hovered/pressed/disabled state]
 * [category name] – The “family” that this slot belongs to.
 * [element name] – The name of the thing being targeted, such as the background or border.
 * [checked state] – Whether the thing is checked. We assume things are unchecked by default, so no need to specify the unchecked state.
 * (We used “checked” to refer to anything that is on, selected, toggled, highlighted, emphasized, etc.)
 * [hovered/pressed/disabled state] – One of these states, if applicable. Each of these states are mutually exclusive.
 * Pressed styles overwrite hovered styles, and disabled elements cannot be hovered or pressed.
 *
 * ## Base Slots
 *
 * A basic set of slots that provide many default body styles, such as text, subtext, disabled colors, and so on.
 * If a category doesn't provide the slot you're looking for, use one from this category.
 * For example, the placeholder text on a text input field has no corresponding slot in its category,
 * so you'd use the bodySubtextColor from this category.
 *
 * ## Invariants
 *
 * When color has meaning, we do not want to change the color much theme to theme. For example, we
 * will always want errors to be some shade of red, but we will need to tweak the exact shade so it's
 * legible depending on whether it's an inverted theme or not.
 * Invariant colors should almost never be changed by the theme, the defaults should suffice.
 *
 * ## Input Controls
 *
 * This category contains input components commonly used to denote state, including radio buttons,
 * check boxes, toggle switches, sliders, progress bars, and more.
 *
 * ## Buttons
 *
 * Buttons! And all the flavors thereof.
 *
 * ## Menus
 *
 * Any kind of popup menus uses this category.
 *
 * ## Lists
 *
 * Lists differ from menus in that they are designed to show infinite amounts of items, often scroll,
 * and have a large and complex interaction surface.
 * This category covers all kinds of lists, whether they're typical one-item-per-row lists (like DetailsList) or ones with a tiled layout.
 */
export interface ISemanticColors extends ISemanticTextColors {
	/**
	 * The default color for backgrounds.
	 */
	bodyBackground: string;
	/**
	 * The standout color for highlighted content backgrounds.
	 * For highlighted content when there is no emphasis, use the neutral variant instead.
	 * This should be a shade darker than bodyBackground in light themes,
	 * and a shade lighter in inverted themes.
	 */
	bodyStandoutBackground: string;
	/**
	 * The color for chrome adjacent to an area with bodyBackground.
	 * This can be used to provide visual separation of zones when using stronger colors, when using a divider line is not desired.
	 * In most themes, this should match the color of bodyBackground.
	 * See also: bodyFrameDivider
	 */
	bodyFrameBackground: string;
	/**
	 * Used as the border between a zone with bodyFrameBackground and a zone with bodyBackground.
	 * If bodyBackground and bodyFrameBackground are different, this should be the same color as bodyFrameBackground
	 * in order to visually disappear.
	 * See also: bodyFrameBackground
	 */
	bodyFrameDivider: string;
	/**
	 * Divider lines; e.g. lines that separate sections in a menu, an <HR> element.
	 */
	bodyDivider: string;
	/**
	 * The default color for backgrounds of disabled controls; e.g. disabled text field.
	 */
	disabledBackground: string;
	/**
	 * The color of the outline around focused controls that don't already have a border; e.g. menu items
	 */
	focusBorder: string;
	/**
	 * The color of the border that provides contrast between an element, such as a card, and an emphasized background.
	 */
	variantBorder: string;
	/**
	 * Hover color of border that provides contrast between an element, such as a card, and an emphasized background.
	 */
	variantBorderHovered: string;
	/**
	 * Background color for default/empty state graphical elements; eg default icons, empty section that
	 * needs user to fill in content, placeholder graphics, empty seats, etc.
	 */
	defaultStateBackground: string;
	/**
	 * The background for errors, if necessary, or highlighting the section of the page where the error is present.
	 */
	errorBackground: string;
	/**
	 * Background for blocking issues, which is more severe than a warning, but not as bad as an error.
	 */
	blockingBackground: string;
	/**
	 * Background for warning messages.
	 */
	warningBackground: string;
	/**
	 * Foreground color for warning highlights
	 */
	warningHighlight: string;
	/**
	 * Background for success
	 */
	successBackground: string;
	/**
	 * The border of a large input control in its resting, state; e.g. the box of dropdown.
	 */
	inputBorder: string;
	/**
	 * The border of a small input control in its resting unchecked state; e.g. the box of an unchecked checkbox.
	 */
	smallInputBorder: string;
	/**
	 * The border color of a large hovered input control, such as textbox.
	 */
	inputBorderHovered: string;
	/**
	 * The background color of an input, e.g. textbox background.
	 */
	inputBackground: string;
	/**
	 * The background of a checked control; e.g. checked radio button's dot, checked toggle's background.
	 */
	inputBackgroundChecked: string;
	/**
	 * The background of a checked and hovered control; e.g. checked checkbox's background color on hover.
	 */
	inputBackgroundCheckedHovered: string;
	/**
	 * The foreground of a checked control; e.g. checked checkbox's checkmark color, checked toggle's thumb color,
	 * radio button's background color around the dot.
	 */
	inputForegroundChecked: string;
	/**
	 * The alternate focus border color for elements that already have a border; e.g. text field borders on focus.
	 */
	inputFocusBorderAlt: string;
	/**
	 * Background of a standard button
	 */
	buttonBackground: string;
	/**
	 * Background of a checked standard button; e.g. bold/italicize/underline text button in toolbar
	 */
	buttonBackgroundChecked: string;
	/**
	 * Background of a hovered standard button
	 */
	buttonBackgroundHovered: string;
	/**
	 * Background of a checked and hovered standard button; e.g. bold/italicize/underline text button in toolbar
	 */
	buttonBackgroundCheckedHovered: string;
	/**
	 * Background of a disabled standard button
	 */
	buttonBackgroundDisabled: string;
	/**
	 * Background of a pressed standard button; i.e. currently being clicked by mouse
	 */
	buttonBackgroundPressed: string;
	/**
	 * Border of a standard button
	 */
	buttonBorder: string;
	/**
	 * Border of a disabled standard button
	 */
	buttonBorderDisabled: string;
	/**
	 * Background of a primary button
	 */
	primaryButtonBackground: string;
	/**
	 * Background of a hovered primary button
	 */
	primaryButtonBackgroundHovered: string;
	/**
	 * Background of a pressed primary button; i.e. currently being clicked by mouse
	 */
	primaryButtonBackgroundPressed: string;
	/**
	 * Background of a disabled primary button
	 */
	primaryButtonBackgroundDisabled: string;
	/**
	 * Border of a primary button
	 */
	primaryButtonBorder: string;
	/**
	 * Background of an accent button (kicker)
	 */
	accentButtonBackground: string;
	/**
	 * The background of a menu.
	 */
	menuBackground: string;
	/**
	 * The divider between menu items.
	 */
	menuDivider: string;
	/**
	 * The default colors of icons in menus.
	 */
	menuIcon: string;
	/**
	 * The headers in menus that denote title of a section.
	 */
	menuHeader: string;
	/**
	 * The background of a hovered menu item.
	 */
	menuItemBackgroundHovered: string;
	/**
	 * The background of a pressed menu item.
	 */
	menuItemBackgroundPressed: string;
	/**
	 * The text color of a menu item.
	 */
	menuItemText: string;
	/**
	 * The text color of a hovered menu item.
	 */
	menuItemTextHovered: string;
	/**
	 * The background color for the entire list.
	 */
	listBackground: string;
	/**
	 * The default text color for list item titles and text in column fields.
	 */
	listText: string;
	/**
	 * The background color of a hovered list item.
	 */
	listItemBackgroundHovered: string;
	/**
	 * The background color of a checked list item.
	 */
	listItemBackgroundChecked: string;
	/**
	 * The background color of a checked and hovered list item.
	 */
	listItemBackgroundCheckedHovered: string;
	/**
	 * The background color for a hovered list header.
	 */
	listHeaderBackgroundHovered: string;
	/**
	 * The background color for a pressed list header.
	 */
	listHeaderBackgroundPressed: string;
	/**
	 * @deprecated
	 * (Checked menu items no longer get a background color.)
	 * The background of checked menu item; e.g. a menu item whose submenu is open, a selected dropdown item.
	 */
	menuItemBackgroundChecked: string;
}
/**
 * @internal This is an experimental interface and will be changed post design review.
 */
export interface ISpacing {
	s2: string;
	s1: string;
	m: string;
	l1: string;
	l2: string;
}
/**
 * @internal
 * Predefined scheme identifiers.
 * Schemes are is still in an experimental phase.
 * This interface's naming and values are not finalized and are subject to change.
 */
export declare type ISchemeNames = 'default' | 'neutral' | 'soft' | 'strong';
export interface IScheme {
	palette: IPalette;
	fonts: IFontStyles;
	semanticColors: ISemanticColors;
	isInverted: boolean;
	/**
	 * This setting is for a very narrow use case and you probably don't need to worry about,
	 * unless you share a environment with others that also use fabric.
	 * It is used for disabling global styles on fabric components. This will prevent global
	 * overrides that might have been set by other fabric users from applying to your components.
	 * When you set this setting to `true` on your theme the components in the subtree of your
	 * Customizer will not get the global styles applied to them.
	 */
	disableGlobalClassNames: boolean;
	/**
	 * @internal
	 * The spacing property is still in an experimental phase. The intent is to have it
	 * be used for padding and margin sizes in a future release, but it is still undergoing review.
	 * Avoid using it until it is finalized.
	 */
	spacing: ISpacing;
	effects: IEffects;
}
export interface ITheme extends IScheme {
	/**
	 * @internal
	 * The schemes property is still in an experimental phase. The intent is to have it work
	 * in conjunction with new 'schemes' prop that any component making use of Foundation can use.
	 * Alternative themes that can be referred to by name.
	 */
	schemes?: {
		[P in ISchemeNames]?: IScheme;
	};
}
export declare type IPartialTheme = {
	palette?: Partial<IPalette>;
	fonts?: Partial<IFontStyles>;
	/**
	 * Use this property to specify font property defaults.
	 */
	defaultFontStyle?: IRawStyle;
	semanticColors?: Partial<ISemanticColors>;
	isInverted?: boolean;
	disableGlobalClassNames?: boolean;
	spacing?: Partial<ISpacing>;
	effects?: Partial<IEffects>;
	schemes?: {
		[P in ISchemeNames]?: IScheme;
	};
};
export declare const AnimationClassNames: {
	[key in keyof IAnimationStyles]?: string;
};
export declare const FontClassNames: {
	[key in keyof IFontStyles]?: string;
};
export interface IColorClassNames {
	themeDarker: string;
	themeDarkerHover: string;
	themeDarkerBackground: string;
	themeDarkerBackgroundHover: string;
	themeDarkerBorder: string;
	themeDarkerBorderHover: string;
	themeDark: string;
	themeDarkHover: string;
	themeDarkBackground: string;
	themeDarkBackgroundHover: string;
	themeDarkBorder: string;
	themeDarkBorderHover: string;
	themeDarkAlt: string;
	themeDarkAltHover: string;
	themeDarkAltBackground: string;
	themeDarkAltBackgroundHover: string;
	themeDarkAltBorder: string;
	themeDarkAltBorderHover: string;
	themePrimary: string;
	themePrimaryHover: string;
	themePrimaryBackground: string;
	themePrimaryBackgroundHover: string;
	themePrimaryBorder: string;
	themePrimaryBorderHover: string;
	themeSecondary: string;
	themeSecondaryHover: string;
	themeSecondaryBackground: string;
	themeSecondaryBackgroundHover: string;
	themeSecondaryBorder: string;
	themeSecondaryBorderHover: string;
	themeTertiary: string;
	themeTertiaryHover: string;
	themeTertiaryBackground: string;
	themeTertiaryBackgroundHover: string;
	themeTertiaryBorder: string;
	themeTertiaryBorderHover: string;
	themeLight: string;
	themeLightHover: string;
	themeLightBackground: string;
	themeLightBackgroundHover: string;
	themeLightBorder: string;
	themeLightBorderHover: string;
	themeLighter: string;
	themeLighterHover: string;
	themeLighterBackground: string;
	themeLighterBackgroundHover: string;
	themeLighterBorder: string;
	themeLighterBorderHover: string;
	themeLighterAlt: string;
	themeLighterAltHover: string;
	themeLighterAltBackground: string;
	themeLighterAltBackgroundHover: string;
	themeLighterAltBorder: string;
	themeLighterAltBorderHover: string;
	black: string;
	blackHover: string;
	blackBackground: string;
	blackBackgroundHover: string;
	blackBorder: string;
	blackBorderHover: string;
	blackTranslucent40: string;
	blackTranslucent40Hover: string;
	blackTranslucent40Background: string;
	blackTranslucent40BackgroundHover: string;
	blackTranslucent40Border: string;
	blackTranslucent40BorderHover: string;
	neutralDark: string;
	neutralDarkHover: string;
	neutralDarkBackground: string;
	neutralDarkBackgroundHover: string;
	neutralDarkBorder: string;
	neutralDarkBorderHover: string;
	neutralPrimary: string;
	neutralPrimaryHover: string;
	neutralPrimaryBackground: string;
	neutralPrimaryBackgroundHover: string;
	neutralPrimaryBorder: string;
	neutralPrimaryBorderHover: string;
	neutralPrimaryAlt: string;
	neutralPrimaryAltHover: string;
	neutralPrimaryAltBackground: string;
	neutralPrimaryAltBackgroundHover: string;
	neutralPrimaryAltBorder: string;
	neutralPrimaryAltBorderHover: string;
	neutralSecondary: string;
	neutralSecondaryHover: string;
	neutralSecondaryBackground: string;
	neutralSecondaryBackgroundHover: string;
	neutralSecondaryBorder: string;
	neutralSecondaryBorderHover: string;
	neutralSecondaryAlt: string;
	neutralSecondaryAltHover: string;
	neutralSecondaryAltBackground: string;
	neutralSecondaryAltBackgroundHover: string;
	neutralSecondaryAltBorder: string;
	neutralSecondaryAltBorderHover: string;
	neutralTertiary: string;
	neutralTertiaryHover: string;
	neutralTertiaryBackground: string;
	neutralTertiaryBackgroundHover: string;
	neutralTertiaryBorder: string;
	neutralTertiaryBorderHover: string;
	neutralTertiaryAlt: string;
	neutralTertiaryAltHover: string;
	neutralTertiaryAltBackground: string;
	neutralTertiaryAltBackgroundHover: string;
	neutralTertiaryAltBorder: string;
	neutralTertiaryAltBorderHover: string;
	neutralQuaternary: string;
	neutralQuaternaryHover: string;
	neutralQuaternaryBackground: string;
	neutralQuaternaryBackgroundHover: string;
	neutralQuaternaryBorder: string;
	neutralQuaternaryBorderHover: string;
	neutralQuaternaryAlt: string;
	neutralQuaternaryAltHover: string;
	neutralQuaternaryAltBackground: string;
	neutralQuaternaryAltBackgroundHover: string;
	neutralQuaternaryAltBorder: string;
	neutralQuaternaryAltBorderHover: string;
	neutralLight: string;
	neutralLightHover: string;
	neutralLightBackground: string;
	neutralLightBackgroundHover: string;
	neutralLightBorder: string;
	neutralLightBorderHover: string;
	neutralLighter: string;
	neutralLighterHover: string;
	neutralLighterBackground: string;
	neutralLighterBackgroundHover: string;
	neutralLighterBorder: string;
	neutralLighterBorderHover: string;
	neutralLighterAlt: string;
	neutralLighterAltHover: string;
	neutralLighterAltBackground: string;
	neutralLighterAltBackgroundHover: string;
	neutralLighterAltBorder: string;
	neutralLighterAltBorderHover: string;
	white: string;
	whiteHover: string;
	whiteBackground: string;
	whiteBackgroundHover: string;
	whiteBorder: string;
	whiteBorderHover: string;
	whiteTranslucent40: string;
	whiteTranslucent40Hover: string;
	whiteTranslucent40Background: string;
	whiteTranslucent40BackgroundHover: string;
	whiteTranslucent40Border: string;
	whiteTranslucent40BorderHover: string;
	yellow: string;
	yellowHover: string;
	yellowBackground: string;
	yellowBackgroundHover: string;
	yellowBorder: string;
	yellowBorderHover: string;
	yellowLight: string;
	yellowLightHover: string;
	yellowLightBackground: string;
	yellowLightBackgroundHover: string;
	yellowLightBorder: string;
	yellowLightBorderHover: string;
	orange: string;
	orangeHover: string;
	orangeBackground: string;
	orangeBackgroundHover: string;
	orangeBorder: string;
	orangeBorderHover: string;
	orangeLight: string;
	orangeLightHover: string;
	orangeLightBackground: string;
	orangeLightBackgroundHover: string;
	orangeLightBorder: string;
	orangeLightBorderHover: string;
	orangeLighter: string;
	orangeLighterHover: string;
	orangeLighterBackground: string;
	orangeLighterBackgroundHover: string;
	orangeLighterBorder: string;
	orangeLighterBorderHover: string;
	redDark: string;
	redDarkHover: string;
	redDarkBackground: string;
	redDarkBackgroundHover: string;
	redDarkBorder: string;
	redDarkBorderHover: string;
	red: string;
	redHover: string;
	redBackground: string;
	redBackgroundHover: string;
	redBorder: string;
	redBorderHover: string;
	magentaDark: string;
	magentaDarkHover: string;
	magentaDarkBackground: string;
	magentaDarkBackgroundHover: string;
	magentaDarkBorder: string;
	magentaDarkBorderHover: string;
	magenta: string;
	magentaHover: string;
	magentaBackground: string;
	magentaBackgroundHover: string;
	magentaBorder: string;
	magentaBorderHover: string;
	magentaLight: string;
	magentaLightHover: string;
	magentaLightBackground: string;
	magentaLightBackgroundHover: string;
	magentaLightBorder: string;
	magentaLightBorderHover: string;
	purpleDark: string;
	purpleDarkHover: string;
	purpleDarkBackground: string;
	purpleDarkBackgroundHover: string;
	purpleDarkBorder: string;
	purpleDarkBorderHover: string;
	purple: string;
	purpleHover: string;
	purpleBackground: string;
	purpleBackgroundHover: string;
	purpleBorder: string;
	purpleBorderHover: string;
	purpleLight: string;
	purpleLightHover: string;
	purpleLightBackground: string;
	purpleLightBackgroundHover: string;
	purpleLightBorder: string;
	purpleLightBorderHover: string;
	blueDark: string;
	blueDarkHover: string;
	blueDarkBackground: string;
	blueDarkBackgroundHover: string;
	blueDarkBorder: string;
	blueDarkBorderHover: string;
	blueMid: string;
	blueMidHover: string;
	blueMidBackground: string;
	blueMidBackgroundHover: string;
	blueMidBorder: string;
	blueMidBorderHover: string;
	blue: string;
	blueHover: string;
	blueBackground: string;
	blueBackgroundHover: string;
	blueBorder: string;
	blueBorderHover: string;
	blueLight: string;
	blueLightHover: string;
	blueLightBackground: string;
	blueLightBackgroundHover: string;
	blueLightBorder: string;
	blueLightBorderHover: string;
	tealDark: string;
	tealDarkHover: string;
	tealDarkBackground: string;
	tealDarkBackgroundHover: string;
	tealDarkBorder: string;
	tealDarkBorderHover: string;
	teal: string;
	tealHover: string;
	tealBackground: string;
	tealBackgroundHover: string;
	tealBorder: string;
	tealBorderHover: string;
	tealLight: string;
	tealLightHover: string;
	tealLightBackground: string;
	tealLightBackgroundHover: string;
	tealLightBorder: string;
	tealLightBorderHover: string;
	greenDark: string;
	greenDarkHover: string;
	greenDarkBackground: string;
	greenDarkBackgroundHover: string;
	greenDarkBorder: string;
	greenDarkBorderHover: string;
	green: string;
	greenHover: string;
	greenBackground: string;
	greenBackgroundHover: string;
	greenBorder: string;
	greenBorderHover: string;
	greenLight: string;
	greenLightHover: string;
	greenLightBackground: string;
	greenLightBackgroundHover: string;
	greenLightBorder: string;
	greenLightBorderHover: string;
}
export declare const ColorClassNames: IColorClassNames;
/**
 * Exporting raw duraction values and easing functions to be used in custom animations
 */
export declare const AnimationVariables: IAnimationVariables;
/**
 * All Fabric standard animations, exposed as json objects referencing predefined
 * keyframes. These objects can be mixed in with other class definitions.
 */
export declare const AnimationStyles: IAnimationStyles;
export declare const DefaultPalette: IPalette;
export declare const DefaultFontStyles: IFontStyles;
export declare function registerDefaultFontFaces(baseUrl: string): void;
export declare namespace FontSizes {
	const mini: string;
	const xSmall: string;
	const small: string;
	const smallPlus: string;
	const medium: string;
	const mediumPlus: string;
	const icon: string;
	const large: string;
	const xLarge: string;
	const xxLarge: string;
	const superLarge: string;
	const mega: string;
}
export declare namespace FontWeights {
	const light: IFontWeight;
	const semilight: IFontWeight;
	const regular: IFontWeight;
	const semibold: IFontWeight;
	const bold: IFontWeight;
}
export declare namespace IconFontSizes {
	const xSmall: string;
	const small: string;
	const medium: string;
	const large: string;
}
export declare function createFontStyles(localeCode: string | null): IFontStyles;
/**
 * Generates a focus style which can be used to define an :after focus border.
 *
 * @param theme - The theme object to use.
 * @param inset - The number of pixels to inset the border.
 * @param position - The positioning applied to the container. Must
 * be 'relative' or 'absolute' so that the focus border can live around it.
 * @param highContrastStyle - Style for high contrast mode.
 * @param borderColor - Color of the border.
 * @param outlineColor - Color of the outline.
 * @param isFocusedOnly - If the styles should apply on focus or not.
 * @returns The style object.
 */
export declare function getFocusStyle(theme: ITheme, inset?: number, position?: 'relative' | 'absolute', highContrastStyle?: IRawStyle | undefined, borderColor?: string, outlineColor?: string, isFocusedOnly?: boolean): IRawStyle;
/**
 * Generates style to clear browser specific focus styles.
 */
export declare function focusClear(): IRawStyle;
export declare const hiddenContentStyle: IRawStyle;
declare function _continuousPulseAnimationDouble(beaconColorOne: string, beaconColorTwo: string, innerDimension: string, outerDimension: string, borderWidth: string): string;
declare function _continuousPulseAnimationSingle(beaconColorOne: string, beaconColorTwo: string, innerDimension: string, outerDimension: string, borderWidth: string): string;
declare function _createDefaultAnimation(animationName: string, delayLength?: string): IRawStyle;
export declare const PulsingBeaconAnimationStyles: {
	continuousPulseAnimationDouble: typeof _continuousPulseAnimationDouble;
	continuousPulseAnimationSingle: typeof _continuousPulseAnimationSingle;
	createDefaultAnimation: typeof _createDefaultAnimation;
};
export declare type GlobalClassNames<IStyles> = Record<keyof IStyles, string>;
/**
 * Checks for the `disableGlobalClassNames` property on the `theme` to determine if it should return `classNames`
 * Note that calls to this function are memoized.
 *
 * @param classNames - The collection of global class names that apply when the flag is false. Make sure to pass in
 * the same instance on each call to benefit from memoization.
 * @param theme - The theme to check the flag on
 * @param disableGlobalClassNames - Optional. Explicitly opt in/out of disabling global classnames. Defaults to false.
 */
export declare function getGlobalClassNames<T>(classNames: GlobalClassNames<T>, theme: ITheme, disableGlobalClassNames?: boolean): Partial<GlobalClassNames<T>>;
/**
 * @internal
 * This function is still in experimental phase in support of Foundation experimental development. Its API signature and existence
 * are subject to change.
 *
 * Modify context to activate the specified scheme or theme. For schemes, look in context (if available) and fall back to global
 * Customizations. If both scheme and theme are specified, scheme will be looked up in theme. In this case, scheme must be
 * present in theme arg, otherwise new context will default to theme arg (there is no fallback to settings to look up scheme.)
 *
 * @param context - Context in which to get schemed customizations.
 * @param scheme - Scheme to get customizations for from theme arg (if supplied) OR from context and global settings.
 * @param theme - Theme to merge into context.
 * @returns modified schemed context if scheme is valid and not already applied, unmodified context otherwise.
 */
export declare function getThemedContext(context: ICustomizerContext, scheme?: ISchemeNames, theme?: ITheme): ICustomizerContext;
export declare const ThemeSettingName = "theme";
/**
 * Gets the theme object
 * @param depComments - Whether to include deprecated tags as comments for deprecated slots.
 */
export declare function getTheme(depComments?: boolean): ITheme;
/**
 * Registers a callback that gets called whenever the theme changes.
 * This should only be used when the component cannot automatically get theme changes through its state.
 * This will not register duplicate callbacks.
 */
export declare function registerOnThemeChangeCallback(callback: (theme: ITheme) => void): void;
/**
 * See registerOnThemeChangeCallback().
 * Removes previously registered callbacks.
 */
export declare function removeOnThemeChangeCallback(callback: (theme: ITheme) => void): void;
/**
 * Applies the theme, while filling in missing slots.
 * @param theme - Partial theme object.
 * @param depComments - Whether to include deprecated tags as comments for deprecated slots.
 */
export declare function loadTheme(theme: IPartialTheme, depComments?: boolean): ITheme;
/**
 * Creates a custom theme definition which can be used with the Customizer.
 * @param theme - Partial theme object.
 * @param depComments - Whether to include deprecated tags as comments for deprecated slots.
 */
export declare function createTheme(theme: IPartialTheme, depComments?: boolean): ITheme;
export declare const HighContrastSelector = "@media screen and (-ms-high-contrast: active)";
export declare const HighContrastSelectorWhite = "@media screen and (-ms-high-contrast: black-on-white)";
export declare const HighContrastSelectorBlack = "@media screen and (-ms-high-contrast: white-on-black)";
export declare const ScreenWidthMinSmall = 320;
export declare const ScreenWidthMinMedium = 480;
export declare const ScreenWidthMinLarge = 640;
export declare const ScreenWidthMinXLarge = 1024;
export declare const ScreenWidthMinXXLarge = 1366;
export declare const ScreenWidthMinXXXLarge = 1920;
export declare const ScreenWidthMaxSmall: number;
export declare const ScreenWidthMaxMedium: number;
export declare const ScreenWidthMaxLarge: number;
export declare const ScreenWidthMaxXLarge: number;
export declare const ScreenWidthMaxXXLarge: number;
export declare const ScreenWidthMinUhfMobile = 768;
export declare function getScreenSelector(min: number, max: number): string;
export declare const normalize: IRawStyle;
export declare const noWrap: IRawStyle;
/**
 * - Generates a style used to fade out an overflowing content by defining a style for an :after pseudo element.
 * - Apply it to the :after selector for all combination of states the parent of content might have (normal, hover, selected, focus).
 * - Requires the target to have position set to relative and overflow set to hidden.
 *
 * @example
 * ```tsx
 * // Assuming the following DOM structure and the different background colors coming from the parent holding the content.
 * <div className={classNames.parent}>
 *   <span className={classNames.content}>Overflown Content</span>
 * </div>
 * ```
 * ```ts
 * // This is how the style set would look in Component.styles.ts
 * const { bodyBackground } = theme.semanticColors;
 * const { neutralLighter } = theme.palette;
 *
 * // The second argument of getFadedOverflowStyle function is a string representing a key of ISemanticColors or IPalette.
 *
 * const styles = {
 *   parent: [
 *     backgroundColor: bodyBackground,
 *     selectors: {
 *       '&:hover: {
 *         backgroundColor: neutralLighter
 *       },
 *       '$content:after': {
 *         ...getFadedOverflowStyle(theme, 'bodyBackground')
 *       },
 *       '&:hover $content:after': {
 *         ...getFadedOverflowStyle(theme, 'neutralLighter')
 *       }
 *     }
 *   ],
 *   content: [
 *     width: '100%',
 *     display: 'inline-block',
 *     position: 'relative',
 *     overflow: 'hidden'
 *   ]
 * }
 * ```
 * @param theme - The theme object to use.
 * @param color - The background color to fade out to. Accepts only keys of ISemanticColors or IPalette. Defaults to 'bodyBackground'.
 * @param direction - The direction of the overflow. Defaults to horizontal.
 * @param width - The width of the fading overflow. Vertical direction defaults it to 100% vs 20px when horizontal.
 * @param height - The Height of the fading overflow. Vertical direction defaults it to 50% vs 100% when horizontal.
 * @returns The style object.
 */
export declare function getFadedOverflowStyle(theme: ITheme, color?: keyof ISemanticColors | keyof IPalette, direction?: 'horizontal' | 'vertical', width?: string | number, height?: string | number): IRawStyle;
export declare namespace ZIndexes {
	const Nav: number;
	const ScrollablePane: number;
	const FocusStyle: number;
	const Coachmark: number;
	const Layer: number;
	const KeytipLayer: number;
}
/**
 * Builds a class names object from a given map.
 *
 * @param styles - Map of unprocessed styles.
 * @returns Map of property name to class name.
 */
export declare function buildClassMap<T>(styles: T): {
	[key in keyof T]?: string;
};
export interface IIconSubset {
	fontFace?: IFontFace;
	icons: {
		[key: string]: string | JSX.Element;
	};
	style?: IRawStyle;
}
export interface IIconSubsetRecord extends IIconSubset {
	isRegistered?: boolean;
	className?: string;
}
export interface IIconRecord {
	code: string | undefined;
	subset: IIconSubsetRecord;
}
export interface IIconOptions {
	/**
	 * By default, registering the same set of icons will generate a console warning per duplicate icon
	 * registered, because this scenario can create unexpected consequences.
	 *
	 * Some scenarios include:
	 *
	 * Icon set was previously registered using a different base url.
	 * Icon set was previously registered but a different version was provided.
	 * Icons in a previous registered set overlap with a new set.
	 *
	 * To simply ignore previously registered icons, you can specify to disable warnings. This means
	 * that if an icon which was previous registered is registered again, it will be silently ignored.
	 * However, consider whether the problems listed above will cause issues.
	 **/
	disableWarnings: boolean;
	/**
	 * @deprecated
	 * Use 'disableWarnings' instead.
	 */
	warnOnMissingIcons?: boolean;
}
/**
 * Registers a given subset of icons.
 *
 * @param iconSubset - the icon subset definition.
 */
export declare function registerIcons(iconSubset: IIconSubset, options?: Partial<IIconOptions>): void;
/**
 * Unregisters icons by name.
 *
 * @param iconNames - List of icons to unregister.
 */
export declare function unregisterIcons(iconNames: string[]): void;
/**
 * Remaps one icon name to another.
 */
export declare function registerIconAlias(iconName: string, mappedToName: string): void;
/**
 * Gets an icon definition. If an icon is requested but the subset has yet to be registered,
 * it will get registered immediately.
 *
 * @public
 * @param name - Name of icon.
 */
export declare function getIcon(name?: string): IIconRecord | undefined;
/**
 * Sets the icon options.
 *
 * @public
 */
export declare function setIconOptions(options: Partial<IIconOptions>): void;
/**
 * Gets an icon classname. You should be able to add this classname to an I tag with no
 * additional classnames, and render the icon.
 *
 * @public
 */
export declare function getIconClassName(name: string): string;
/**
 * Persona with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Styling)
 */
export declare class PersonaBase extends BaseComponent<IPersonaProps, {}> {
	static defaultProps: IPersonaProps;
	constructor(props: IPersonaProps);
	render(): JSX.Element;
	/**
	 * Renders various types of Text (primaryText, secondaryText, etc)
	 * based on the classNames passed
	 * @param classNames
	 * @param renderFunction
	 * @param defaultRenderFunction
	 */
	private _renderElement;
	/**
	 * Deprecation helper for getting text.
	 */
	private _getText;
	/**
	 * using closure to wrap the default render behavior
	 * to make it independent of the type of text passed
	 * @param text
	 */
	private _onRenderText;
}
export interface IImage {
}
export interface IImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	/**
	 * Optional callback to access the ICheckbox interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IImage>;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules
	 */
	styles?: IStyleFunctionOrObject<IImageStyleProps, IImageStyles>;
	/**
	 * Theme provided by HOC.
	 */
	theme?: ITheme;
	/**
	 * Additional css class to apply to the Component
	 * @defaultvalue undefined
	 */
	className?: string;
	/**
	 * If true, fades the image in when loaded.
	 * @defaultvalue true
	 */
	shouldFadeIn?: boolean;
	/**
	 * If true, the image starts as visible and is hidden on error. Otherwise, the image is hidden until
	 * it is successfully loaded. This disables shouldFadeIn.
	 * @defaultvalue false;
	 */
	shouldStartVisible?: boolean;
	/**
	 * Used to determine how the image is scaled and cropped to fit the frame.
	 *
	 * @defaultvalue If both dimensions are provided, then the image is fit using ImageFit.scale.
	 * Otherwise, the image won't be scaled or cropped.
	 */
	imageFit?: ImageFit;
	/**
	 * Deprecated at v1.3.6, to replace the src in case of errors, use `onLoadingStateChange` instead and
	 * rerender the Image with a difference src.
	 * @deprecated Use `onLoadingStateChange` instead and
	 * rerender the Image with a difference src.
	 */
	errorSrc?: string;
	/**
	 * If true, the image frame will expand to fill its parent container.
	 */
	maximizeFrame?: boolean;
	/**
	 * Optional callback method for when the image load state has changed.
	 * The 'loadState' parameter indicates the current state of the Image.
	 */
	onLoadingStateChange?: (loadState: ImageLoadState) => void;
	/**
	 * Specifies the cover style to be used for this image. If not
	 * specified, this will be dynamically calculated based on the
	 * aspect ratio for the image.
	 */
	coverStyle?: ImageCoverStyle;
}
/**
 * The possible methods that can be used to fit the image.
 */
export declare enum ImageFit {
	/**
	 * The image is not scaled. The image is centered and cropped within the content box.
	 */
	center = 0,
	/**
	 * The image is scaled to maintain its aspect ratio while being fully contained within the frame. The image will
	 * be centered horizontally and vertically within the frame. The space in the top and bottom or in the sides of
	 * the frame will be empty depending on the difference in aspect ratio between the image and the frame.
	 */
	contain = 1,
	/**
	 * The image is scaled to maintain its aspect ratio while filling the frame. Portions of the image will be cropped from
	 * the top and bottom, or from the sides, depending on the difference in aspect ratio between the image and the frame.
	 */
	cover = 2,
	/**
	 * Neither the image nor the frame are scaled. If their sizes do not match, the image will either be cropped or the
	 * frame will have empty space.
	 */
	none = 3,
	/**
	 * The image will be centered horizontally and vertically within the frame and maintains its aspect ratio. It will
	 * behave as ImageFit.center if the image's natural height or width is less than the Image frame's height or width,
	 * but if both natural height and width are larger than the frame it will behave as ImageFit.cover.
	 */
	centerCover = 4
}
/**
 * The cover style to be used on the image
 */
export declare enum ImageCoverStyle {
	/**
	 * The image will be shown at 100% height of container and the width will be scaled accordingly
	 */
	landscape = 0,
	/**
	 * The image will be shown at 100% width of container and the height will be scaled accordingly
	 */
	portrait = 1
}
export declare enum ImageLoadState {
	/**
	 * The image has not yet been loaded, and there is no error yet.
	 */
	notLoaded = 0,
	/**
	 * The image has been loaded successfully.
	 */
	loaded = 1,
	/**
	 * An error has been encountered while loading the image.
	 */
	error = 2,
	/**
	 * Deprecated at v1.3.6, to replace the src in case of errors, use `onLoadingStateChange` instead
	 * and rerender the Image with a difference src.
	 * @deprecated Use `onLoadingStateChange` instead
	 * and rerender the Image with a difference src.
	 */
	errorLoaded = 3
}
export interface IImageStyleProps {
	/**
	 * Accept theme prop.
	 */
	theme: ITheme;
	/**
	 * Accept custom classNames
	 */
	className?: string;
	/**
	 * If true, the image frame will expand to fill its parent container.
	 */
	maximizeFrame?: boolean;
	/**
	 * If true, the image is loaded
	 */
	isLoaded?: boolean;
	/**
	 * If true, fades the image in when loaded.
	 * @defaultvalue true
	 */
	shouldFadeIn?: boolean;
	/**
	 * If true, the image starts as visible and is hidden on error. Otherwise, the image is hidden until
	 * it is successfully loaded. This disables shouldFadeIn.
	 * @defaultvalue false;
	 */
	shouldStartVisible?: boolean;
	/**
	 * If true the image is coverStyle landscape instead of portrait
	 */
	isLandscape?: boolean;
	/**
	 * ImageFit booleans for center, cover, contain, centerCover, none
	 */
	isCenter?: boolean;
	isContain?: boolean;
	isCover?: boolean;
	isCenterCover?: boolean;
	isNone?: boolean;
	/**
	 * if true image load is in error
	 */
	isError?: boolean;
	/**
	 * if true, imageFit is undefined
	 */
	isNotImageFit?: boolean;
	/**
	 * Image width valye
	 */
	width?: number | string;
	/**
	 * Image height valye
	 */
	height?: number | string;
}
export interface IImageStyles {
	/**
	 * Style set for the root div element.
	 */
	root: IStyle;
	/**
	 * Style set for the img element.
	 */
	image: IStyle;
}
export declare const Image: (props: IImageProps) => JSX.Element;
export interface IImageState {
	loadState?: ImageLoadState;
}
export declare class ImageBase extends BaseComponent<IImageProps, IImageState> {
	static defaultProps: {
		shouldFadeIn: boolean;
	};
	private static _svgRegex;
	private _coverStyle;
	private _imageElement;
	private _frameElement;
	constructor(props: IImageProps);
	componentWillReceiveProps(nextProps: IImageProps): void;
	componentDidUpdate(prevProps: IImageProps, prevState: IImageState): void;
	render(): JSX.Element;
	private _onImageLoaded;
	private _checkImageLoaded;
	private _computeCoverStyle;
	private _onImageError;
}
export interface IPersonaState {
	isImageLoaded?: boolean;
	isImageError?: boolean;
}
/**
 * PersonaCoin with no default styles.
 * [Use the `getStyles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Styling)
 */
export declare class PersonaCoinBase extends BaseComponent<IPersonaCoinProps, IPersonaState> {
	static defaultProps: IPersonaCoinProps;
	constructor(props: IPersonaCoinProps);
	componentWillReceiveProps(nextProps: IPersonaCoinProps): void;
	render(): JSX.Element | null;
	private _onRenderCoin;
	/**
	 * Deprecation helper for getting text.
	 */
	private _getText;
	private _onRenderInitials;
	private _onPhotoLoadingStateChange;
}
export interface IPersona {
}
export interface IPersonaSharedProps extends React.HTMLAttributes<PersonaBase | PersonaCoinBase | HTMLDivElement> {
	/**
	 * Primary text to display, usually the name of the person.
	 */
	text?: string;
	/**
	 * Decides the size of the control.
	 * @defaultvalue PersonaSize.size48
	 */
	size?: PersonaSize;
	/**
	 * Optional custom renderer for the coin
	 */
	onRenderCoin?: IRenderFunction<IPersonaSharedProps>;
	/**
	 * If true, adds the css class 'is-fadeIn' to the image.
	 */
	imageShouldFadeIn?: boolean;
	/**
	 * If true, the image starts as visible and is hidden on error. Otherwise, the image is hidden until
	 * it is successfully loaded. This disables imageShouldFadeIn.
	 * @defaultvalue false
	 */
	imageShouldStartVisible?: boolean;
	/**
	 * Url to the image to use, should be a square aspect ratio and big enough to fit in the image area.
	 */
	imageUrl?: string;
	/**
	 * Alt text for the image to use. Defaults to an empty string.
	 */
	imageAlt?: string;
	/**
	 * The user's initials to display in the image area when there is no image.
	 * @defaultvalue [Derived from text]
	 */
	imageInitials?: string;
	/**
	 * Whether initials are calculated for phone numbers and number sequences.
	 * Example: Set property to true to get initials for project names consisting of numbers only.
	 * @defaultvalue false
	 */
	allowPhoneInitials?: boolean;
	/**
	 * Optional custom renderer for the initials
	 */
	onRenderInitials?: IRenderFunction<IPersonaSharedProps>;
	/**
	 * Optional callback for when loading state of the photo changes
	 */
	onPhotoLoadingStateChange?: (newImageLoadState: ImageLoadState) => void;
	/**
	 * The background color when the user's initials are displayed.
	 * @defaultvalue [Derived from text]
	 */
	initialsColor?: PersonaInitialsColor | string;
	/**
	 * Presence of the person to display - will not display presence if undefined.
	 * @defaultvalue PersonaPresence.none
	 */
	presence?: PersonaPresence;
	/**
	 * Secondary text to display, usually the role of the user.
	 */
	secondaryText?: string;
	/**
	 * Tertiary text to display, usually the status of the user.
	 */
	tertiaryText?: string;
	/**
	 * Optional text to display, usually a custom message set.
	 */
	optionalText?: string;
	/**
	 * Whether to not render persona details, and just render the persona image/initials.
	 */
	hidePersonaDetails?: boolean;
	showSecondaryText?: boolean;
	/**
	 * If true, show the special coin for unknown persona.
	 * It has '?' in place of initials, with static font and background colors
	 */
	showUnknownPersonaCoin?: boolean;
	/**
	 * If true renders the initials while the image is loading.
	 * This only applies when an imageUrl is provided.
	 * @defaultvalue false
	 */
	showInitialsUntilImageLoads?: boolean;
	/**
	 * Optional custom persona coin size in pixel.
	 */
	coinSize?: number;
	/**
	 * Optional HTML element props for Persona coin.
	 */
	coinProps?: IPersonaCoinProps;
	/**
	 * Theme provided by High-Order Component.
	 */
	theme?: ITheme;
	/**
	 * Primary text to display, usually the name of the person.
	 * @deprecated Use `text` instead.
	 */
	primaryText?: string;
}
export interface IPersonaProps extends IPersonaSharedProps {
	/**
	 * Optional callback to access the IPersona interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IPersona>;
	/**
	 * Additional CSS class(es) to apply to the Persona
	 */
	className?: string;
	/**
	 * Call to provide customized styling that will layer on top of variant rules
	 */
	styles?: IStyleFunctionOrObject<IPersonaStyleProps, IPersonaStyles>;
	/**
	 * Optional custom renderer for the primary text.
	 */
	onRenderPrimaryText?: IRenderFunction<IPersonaProps>;
	/**
	 * Optional custom renderer for the secondary text.
	 */
	onRenderSecondaryText?: IRenderFunction<IPersonaProps>;
	/**
	 * Optional custom renderer for the tertiary text.
	 */
	onRenderTertiaryText?: IRenderFunction<IPersonaProps>;
	/**
	 * Optional custom renderer for the optional text.
	 */
	onRenderOptionalText?: IRenderFunction<IPersonaProps>;
}
export interface IPersonaStyleProps {
	/**
	 * Theme provided by High-Order Component.
	 */
	theme: ITheme;
	/**
	 * Custom class name.
	 */
	className?: string;
	/**
	 * Optional custom persona coin size in pixel.
	 */
	coinSize?: number;
	/**
	 * Decides the size of the control.
	 * @defaultvalue PersonaSize.size48
	 */
	size?: PersonaSize;
	/**
	 * Presence of the person to display - will not display presence if undefined.
	 * @defaultvalue PersonaPresence.none
	 */
	presence?: PersonaPresence;
	showSecondaryText?: boolean;
}
export interface IPersonaStyles {
	root: IStyle;
	details: IStyle;
	primaryText: IStyle;
	secondaryText: IStyle;
	tertiaryText: IStyle;
	optionalText: IStyle;
	textContent: IStyle;
}
export interface IPersonaCoinProps extends IPersonaSharedProps {
	/**
	 * Gets the component ref.
	 */
	componentRef?: IRefObject<{}>;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules
	 */
	styles?: IStyleFunctionOrObject<IPersonaCoinStyleProps, IPersonaCoinStyles>;
	/**
	 * Additional css class to apply to the PersonaCoin
	 * @defaultvalue undefined
	 */
	className?: string;
}
export interface IPersonaCoinStyleProps {
	/**
	 * Theme provided by High-Order Component.
	 */
	theme: ITheme;
	/**
	 * Custom class name.
	 */
	className?: string;
	/**
	 * Decides the size of the control.
	 * @defaultvalue PersonaSize.size48
	 */
	size?: PersonaSize;
	/**
	 * Optional custom persona coin size in pixel.
	 */
	coinSize?: number;
	/**
	 * Decides whether to display coin for unknown persona
	 */
	showUnknownPersonaCoin?: boolean;
}
export interface IPersonaCoinStyles {
	coin: IStyle;
	imageArea: IStyle;
	image: IStyle;
	initials: IStyle;
	size10WithoutPresenceIcon: IStyle;
}
export interface IPersonaPresenceProps extends IPersonaSharedProps {
	/**
	 * Gets the component ref.
	 */
	componentRef?: IRefObject<{}>;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules
	 */
	styles?: IStyleFunctionOrObject<IPersonaPresenceStyleProps, IPersonaPresenceStyles>;
}
export interface IPersonaPresenceStyleProps {
	/**
	 * Theme provided by High-Order Component.
	 */
	theme: ITheme;
	/**
	 * Custom class name.
	 */
	className?: string;
	/**
	 * Presence of the person to display - will not display presence if undefined.
	 * @defaultvalue PersonaPresence.none
	 */
	presence?: PersonaPresence;
	/**
	 * Decides the size of the control.
	 * @defaultvalue PersonaSize.size48
	 */
	size?: PersonaSize;
}
export interface IPersonaPresenceStyles {
	presence: IStyle;
	presenceIcon: IStyle;
}
export declare enum PersonaSize {
	/**
	 * tiny size has been deprecated in favor of standardized numeric sizing. Use `size10` instead.
	 * @deprecated Use `size10` instead.
	 */
	tiny = 0,
	/**
	 *
	 * extraExtraSmall size has been deprecated in favor of standardized numeric sizing. Use `size24` instead.
	 * @deprecated Use `size24` instead.
	 */
	extraExtraSmall = 1,
	/**
	 * extraSmall size has been deprecated in favor of standardized numeric sizing. Use `size32` instead.
	 * @deprecated Use `size32` instead.
	 */
	extraSmall = 2,
	/**
	 * small size has been deprecated in favor of standardized numeric sizing. Use `size40` instead.
	 * @deprecated Use `size40` instead.
	 */
	small = 3,
	/**
	 * regular size has been deprecated in favor of standardized numeric sizing. Use `size48` instead.
	 * @deprecated Use `size48` instead.
	 */
	regular = 4,
	/**
	 * large size has been deprecated in favor of standardized numeric sizing. Use `size72` instead.
	 * @deprecated Use `size72` instead.
	 */
	large = 5,
	/**
	 * extraLarge size has been deprecated in favor of standardized numeric sizing. Use `size100` instead.
	 * @deprecated Use `size100` instead.
	 */
	extraLarge = 6,
	size28 = 7,
	size16 = 8,
	size10 = 9,
	size24 = 10,
	size32 = 11,
	size40 = 12,
	size48 = 13,
	size72 = 14,
	size100 = 15
}
export declare enum PersonaPresence {
	none = 0,
	offline = 1,
	online = 2,
	away = 3,
	dnd = 4,
	blocked = 5,
	busy = 6
}
export declare enum PersonaInitialsColor {
	lightBlue = 0,
	blue = 1,
	darkBlue = 2,
	teal = 3,
	lightGreen = 4,
	green = 5,
	darkGreen = 6,
	lightPink = 7,
	pink = 8,
	magenta = 9,
	purple = 10,
	/**
	 * Black is a color that can result in offensive persona coins with some initials combinations, so it can only be set with overrides
	 */
	black = 11,
	orange = 12,
	/**
	 * Red is a color that often has a special meaning, so it is considered a reserved color and can only be set with overrides
	 */
	red = 13,
	darkRed = 14,
	/**
	 * Transparent is not intended to be used with typical initials due to accessibility issues.
	 * Its primary use is for overflow buttons, so it is considered a reserved color and can only be set with overrides.
	 */
	transparent = 15,
	violet = 16
}
/**
 * Personas are used for rendering an individual's avatar, presence and details.
 * They are used within the PeoplePicker components.
 */
export declare const Persona: (props: IPersonaProps) => JSX.Element;
/**
 * PersonaCoin is used to render an individual's avatar and presence.
 */
export declare const PersonaCoin: (props: IPersonaCoinProps) => JSX.Element;
export declare namespace personaSize {
	const size10 = "20px";
	const size16 = "16px";
	const size24 = "24px";
	const size28 = "28px";
	const size32 = "32px";
	const size40 = "40px";
	const size48 = "48px";
	const size72 = "72px";
	const size100 = "100px";
}
export declare namespace personaPresenceSize {
	const size6 = "6px";
	const size8 = "8px";
	const size12 = "12px";
	const size20 = "20px";
	const size28 = "28px";
	const border = "2px";
}
export declare const sizeBoolean: (size: PersonaSize) => {
	isSize10: boolean;
	isSize16: boolean;
	isSize24: boolean;
	isSize28: boolean;
	isSize32: boolean;
	isSize40: boolean;
	isSize48: boolean;
	isSize72: boolean;
	isSize100: boolean;
};
export declare const sizeToPixels: {
	[key: number]: number;
};
export declare const presenceBoolean: (presence: PersonaPresence) => {
	isAvailable: boolean;
	isAway: boolean;
	isBlocked: boolean;
	isBusy: boolean;
	isDoNotDisturb: boolean;
	isOffline: boolean;
};
export interface IActivityItemProps extends React.AllHTMLAttributes<HTMLElement> {
	/**
	 * An element describing the activity that took place. If no activityDescription, activityDescriptionText, or
	 * onRenderActivityDescription are included, no description of the activity is shown.
	 */
	activityDescription?: React.ReactNode[] | React.ReactNode;
	/**
	 * Text describing the activity that occurred and naming the people involved in it.
	 * Deprecated, use `activityDescription` instead.
	 * @deprecated Use `activityDescription` instead.
	 */
	activityDescriptionText?: string;
	/**
	 * An element containing an icon shown next to the activity item.
	 */
	activityIcon?: React.ReactNode;
	/**
	 * If activityIcon is not set, then the persona props in this array will be used as the icon for the this activity item.
	 */
	activityPersonas?: Array<IPersonaSharedProps>;
	/**
	 * An element containing the text of comments or \@mention messages.
	 * If no comments, commentText, or onRenderComments are included, no comments are shown.
	 */
	comments?: React.ReactNode[] | React.ReactNode;
	/**
	 * Text of comments or \@mention messages.
	 * Deprecated, use `comments` instead.
	 * @deprecated Use `comments` instead.
	 */
	commentText?: string;
	/**
	 * Gets ref to component interface.
	 */
	componentRef?: IRefObject<{}>;
	/**
	 * Indicated if the compact styling should be used.
	 */
	isCompact?: boolean;
	/**
	 * A renderer for the description of the current activity.
	 */
	onRenderActivityDescription?: IRenderFunction<IActivityItemProps>;
	/**
	 * A renderer that adds the text of a comment below the activity description.
	 */
	onRenderComments?: IRenderFunction<IActivityItemProps>;
	/**
	 * A renderer to create the icon next to the activity item.
	 */
	onRenderIcon?: IRenderFunction<IActivityItemProps>;
	/**
	 * A renderer adds a time stamp. If not included, timeStamp is shown as plain text below the activity.
	 */
	onRenderTimeStamp?: IRenderFunction<IActivityItemProps>;
	/**
	 * Optional styling for the elements within the Activity Item.
	 */
	styles?: IActivityItemStyles;
	/**
	 * Element shown as a timestamp on this activity. If not included, no timestamp is shown.
	 */
	timeStamp?: string | React.ReactNode[] | React.ReactNode;
	/**
	 * Beacon color one
	 */
	beaconColorOne?: string;
	/**
	 * Beacon color two
	 */
	beaconColorTwo?: string;
	/**
	 * Enables/Disables the beacon that radiates
	 * from the center of the center of the activity icon. Signals an activity has started.
	 * @defaultvalue false
	 */
	animateBeaconSignal?: boolean;
}
export interface IActivityItemStyles {
	/**
	 * Styles applied to the root activity item container.
	 */
	root?: IStyle;
	/**
	 * Styles applied to the root activity item container.
	 */
	pulsingBeacon?: IStyle;
	/**
	 * Styles applied to the main container of the activity's description.
	 */
	activityContent?: IStyle;
	/**
	 * Styles applied to the persona of the user that did this activity.
	 */
	activityPersona?: IStyle;
	/**
	 * Styles applied to the activity's description.
	 */
	activityText?: IStyle;
	/**
	 * Styles applied to the icon indicating the type of the activity. Only shown when personas are unavailable.
	 */
	activityTypeIcon?: IStyle;
	/**
	 * Styles applied to the text of comments.
	 */
	commentText?: IStyle;
	/**
	 * Styles applied to personas when two users are involved in a single activity.
	 */
	doublePersona?: IStyle;
	/**
	 * Styles applied to root in the compact variant.
	 */
	isCompactRoot?: IStyle;
	/**
	 * Styles applied to personas and icons in the compact variant.
	 */
	isCompactIcon?: IStyle;
	/**
	 * Styles applied to main text container in the compact variant.
	 */
	isCompactContent?: IStyle;
	/**
	 * Styles applied to personas in the compact variant.
	 */
	isCompactPersona?: IStyle;
	/**
	 * Styles applied to a wrapper around personas in the compact variant.
	 */
	isCompactPersonaContainer?: IStyle;
	/**
	 * Styles applied to the container of the persona image or activity type icon.
	 */
	personaContainer?: IStyle;
	/**
	 * Styles applied to the timestamp at the end of each activity item.
	 */
	timeStamp?: IStyle;
	/**
	 * Styles applied to the timestamp in compact mode.
	 * This can occur if a host overrides the render behavior to force the timestamp to render.
	 */
	isCompactTimeStamp?: IStyle;
}
export declare class ActivityItem extends BaseComponent<IActivityItemProps, {}> {
	constructor(props: IActivityItemProps);
	render(): JSX.Element;
	private _onRenderIcon;
	private _onRenderActivityDescription;
	private _onRenderComments;
	private _onRenderTimeStamp;
	private _onRenderPersonaArray;
	private _getClassNames;
}
export interface IAutofill {
	/**
	 * The current index of the cursor in the input area. Returns -1 if the input element
	 * is not ready.
	 */
	cursorLocation: number | null;
	/**
	 * A boolean for whether or not there is a value selected in the input area.
	 */
	isValueSelected: boolean;
	/**
	 * The current text value that the user has entered.
	 */
	value: string;
	/**
	 * The current index of where the selection starts. Returns -1 if the input element
	 * is not ready.
	 */
	selectionStart: number | null;
	/**
	 * the current index of where the selection ends. Returns -1 if the input element
	 * is not ready.
	 */
	selectionEnd: number | null;
	/**
	 * The current input element.
	 */
	inputElement: HTMLInputElement | null;
	/**
	 * Focus the input element.
	 */
	focus(): void;
	/**
	 * Clear all text in the input. Sets value to '';
	 */
	clear(): void;
}
export interface IAutofillProps extends React.InputHTMLAttributes<HTMLInputElement | Autofill> {
	/**
	 * Gets the compoonent ref.
	 */
	componentRef?: IRefObject<IAutofill>;
	/**
	 * The suggested autofill value that will display.
	 */
	suggestedDisplayValue?: string;
	/**
	 * A callback for when the current input value changes.
	 */
	onInputValueChange?: (newValue?: string) => void;
	/**
	 * When the user uses left arrow, right arrow, clicks, or deletes text autofill is disabled
	 * Since the user has taken control. It is automatically reenabled when the user enters text and the
	 * cursor is at the end of the text in the input box. This specifies other key presses that will reenabled
	 * autofill.
	 * @defaultvalue [KeyCodes.down, KeyCodes.up]
	 */
	enableAutofillOnKeyPress?: KeyCodes[];
	/**
	 * The default value to be visible. This is different from placeholder
	 * because it actually sets the current value of the picker
	 * Note: This will only be set upon component creation
	 * and will not update with subsequent prop updates.
	 */
	defaultVisibleValue?: string;
	/**
	 * Handler for checking and updating the value if needed
	 * in componentWillReceiveProps
	 *
	 * @param defaultVisibleValue - The defaultVisibleValue that got passed
	 *  in to the auto fill's componentWillReceiveProps
	 * @returns - the updated value to set, if needed
	 */
	updateValueInWillReceiveProps?: () => string | null;
	/**
	 * Handler for checking if the full value of the input should
	 * be seleced in componentDidUpdate
	 *
	 * @returns - should the full value of the input be selected?
	 */
	shouldSelectFullInputValueInComponentDidUpdate?: () => boolean;
	/**
	 * A callback used to modify the input string.
	 */
	onInputChange?: (value: string) => string;
	/**
	 * Should the value of the input be selected? True if we're focused on our input, false otherwise.
	 * We need to explicitly not select the text in the autofill if we are no longer focused.
	 * In IE11, selecting a input will also focus the input, causing other element's focus to be stolen.
	 */
	preventValueSelection?: boolean;
}
/**
 * Deprecated, do not use.
 * @deprecated do not use, will be removed in 6.0
 */
export interface IBaseAutoFill extends IAutofill {
}
/**
 * Deprecated, do not use.
 * @deprecated do not use, will be removed in 6.0
 */
export interface IBaseAutoFillProps extends IAutofillProps {
}
export interface IAutofillState {
	displayValue?: string;
}
export declare class Autofill extends BaseComponent<IAutofillProps, IAutofillState> implements IAutofill {
	static defaultProps: {
		enableAutofillOnKeyPress: number[];
	};
	private _inputElement;
	private _autoFillEnabled;
	private _value;
	constructor(props: IAutofillProps);
	readonly cursorLocation: number | null;
	readonly isValueSelected: boolean;
	readonly value: string;
	readonly selectionStart: number | null;
	readonly selectionEnd: number | null;
	readonly inputElement: HTMLInputElement | null;
	componentWillReceiveProps(nextProps: IAutofillProps): void;
	componentDidUpdate(): void;
	render(): JSX.Element;
	focus(): void;
	clear(): void;
	private _onCompositionStart;
	private _onCompositionEnd;
	private _onClick;
	private _onKeyDown;
	private _onInputChanged;
	private _onChanged;
	private _getCurrentInputValue;
	/**
	 * Attempts to enable autofill. Whether or not autofill is enabled depends on the input value,
	 * whether or not any text is selected, and only if the new input value is longer than the old input value.
	 * Autofill should never be set to true if the value is composing. Once compositionEnd is called, then
	 * it should be completed.
	 * See https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent for more information on composition.
	 * @param newValue
	 * @param oldValue
	 * @param isComposing if true then the text is actively being composed and it has not completed.
	 * @param isComposed if the text is a composed text value.
	 */
	private _tryEnableAutofill;
	private _notifyInputChange;
	/**
	 * Updates the current input value as well as getting a new display value.
	 * @param newValue The new value from the input
	 */
	private _updateValue;
	/**
	 * Returns a string that should be used as the display value.
	 * It evaluates this based on whether or not the suggested value starts with the input value
	 * and whether or not autofill is enabled.
	 * @param inputValue the value that the input currently has.
	 * @param suggestedDisplayValue the possible full value
	 */
	private _getDisplayValue;
	private _doesTextStartWith;
}
/**
 *  @deprecated do not use.
 */
export declare class BaseAutoFill extends Autofill {
}
export interface IBreadCrumbData {
	props: IBreadcrumbProps;
	renderedItems: IBreadcrumbItem[];
	renderedOverflowItems: IBreadcrumbItem[];
}
export declare class BreadcrumbBase extends BaseComponent<IBreadcrumbProps, any> {
	static defaultProps: IBreadcrumbProps;
	private _classNames;
	private _focusZone;
	constructor(props: IBreadcrumbProps);
	/**
	 * Sets focus to the first breadcrumb link.
	 */
	focus(): void;
	render(): JSX.Element;
	componentWillReceiveProps(nextProps: IBreadcrumbProps): void;
	private _onReduceData;
	private _onRenderBreadcrumb;
	private _onRenderItem;
	private _onBreadcrumbClicked;
	/**
	 * Validate incoming props
	 * @param props Props to validate
	 */
	private _validateProps;
}
export declare enum IconType {
	/**
	 * Render using the fabric icon font.
	 */
	default = 0,
	/**
	 * Render using an image, where imageProps would be used.
	 */
	image = 1,
	/**
	 * Deprecated, use `default`.
	 * @deprecated Use `default`.
	 */
	Default = 100000,
	/**
	 * Deprecated, use `image`.
	 * @deprecated Use `image`.
	 */
	Image = 100001
}
export interface IIconProps extends IBaseProps, React.HTMLAttributes<HTMLElement> {
	/**
	 * The name of the icon to use from the icon font. If string is empty, a placeholder icon will be rendered the same width as an icon
	 */
	iconName?: string;
	/**
	 * The aria label of the button for the benefit of screen readers.
	 */
	ariaLabel?: string;
	/**
	 * The type of icon to render (image or icon font).
	 */
	iconType?: IconType;
	/**
	 * If rendering an image icon, these props will be passed to the Image component.
	 */
	imageProps?: IImageProps;
	/**
	 * If rendering an image icon, this function callback will be invoked in the event loading the image errors.
	 */
	imageErrorAs?: React.StatelessComponent<IImageProps> | React.ComponentClass<IImageProps>;
	/**
	 * Gets the styles for an Icon.
	 */
	styles?: IStyleFunctionOrObject<IIconStyleProps, IIconStyles>;
}
export interface IIconStyleProps {
	className?: string;
	iconClassName?: string;
	isPlaceholder: boolean;
	isImage: boolean;
	styles?: Partial<IIconStyles>;
}
export interface IIconStyles {
	root?: IStyle;
	/**
	 * Deprecated. Use `root`.
	 * @deprecated Use `root`.
	 */
	imageContainer?: IStyle;
}
/**
 * Icons are used for rendering an individual's avatar, presence and details.
 * They are used within the PeoplePicker components.
 */
export declare const Icon: (props: IIconProps) => JSX.Element;
export interface IIconState {
	imageLoadError: boolean;
}
export declare class IconBase extends BaseComponent<IIconProps, IIconState> {
	constructor(props: IIconProps);
	render(): JSX.Element;
	private onImageLoadingStateChange;
	private _getIconContent;
}
export interface IBreadcrumb {
	/**
	 * Sets focus to the first breadcrumb link.
	 */
	focus(): void;
}
export interface IBreadcrumbProps extends React.ClassAttributes<BreadcrumbBase> {
	/**
	 * Optional callback to access the IBreadcrumb interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IBreadcrumb>;
	/**
	 * Collection of breadcrumbs to render
	 */
	items: IBreadcrumbItem[];
	/**
	 * Optional root classname for the root breadcrumb element.
	 */
	className?: string;
	/**
	 * Render a custom divider in place of the default chevron `>`
	 */
	dividerAs?: IComponentAs<IDividerAsProps>;
	/**
	 * The maximum number of breadcrumbs to display before coalescing.
	 * If not specified, all breadcrumbs will be rendered.
	 */
	maxDisplayedItems?: number;
	/** Method to call when trying to render an item. */
	onRenderItem?: IRenderFunction<IBreadcrumbItem>;
	/**
	 * Method to call when reducing the length of the breadcrumb.
	 * Return undefined to never reduce breadcrumb length
	 */
	onReduceData?: (data: IBreadCrumbData) => IBreadCrumbData | undefined;
	/**
	 * Aria label to place on the navigation landmark for breadcrumb
	 */
	ariaLabel?: string;
	/**
	 * Optional name to use for aria label on overflow button.
	 */
	overflowAriaLabel?: string;
	/**
	 * Optional index where overflow items will be collapsed. Defaults to 0.
	 */
	overflowIndex?: number;
	styles?: IStyleFunctionOrObject<IBreadcrumbStyleProps, IBreadcrumbStyles>;
	theme?: ITheme;
}
export interface IBreadcrumbItem {
	/**
	 * Text to display to the user for the breadcrumb
	 */
	text: string;
	/**
	 * Arbitrary unique string associated with the breadcrumb
	 */
	key: string;
	/**
	 * Callback issued when the breadcrumb is selected.
	 */
	onClick?: (ev?: React.MouseEvent<HTMLElement>, item?: IBreadcrumbItem) => void;
	/**
	 * Url to navigate to when this breadcrumb is clicked.
	 */
	href?: string;
	/**
	 * If this breadcrumb item is the item the user is currently on, if set to true, aria-current="page" will be applied to this
	 * breadcrumb link
	 */
	isCurrentItem?: boolean;
}
export interface IDividerAsProps extends IIconProps {
	/**
	 * Optional breadcrumb item corresponds to left of the divider to be passed for custom rendering.
	 * For overflowed items, it will be last item in the list
	 */
	item?: IBreadcrumbItem;
}
export interface IBreadcrumbStyleProps {
	className?: string;
	theme: ITheme;
}
export interface IBreadcrumbStyles {
	root: IStyle;
	list: IStyle;
	listItem: IStyle;
	chevron: IStyle;
	overflow: IStyle;
	overflowButton: IStyle;
	itemLink: IStyle;
	item: IStyle;
}
export declare const Breadcrumb: React.StatelessComponent<IBreadcrumbProps>;
export declare const DirectionalHint: {
	/**
	 * Appear above the target element, with the left edges of the callout and target aligning.
	 */
	topLeftEdge: 0;
	/**
	 * Appear above the target element, with the centers of the callout and target aligning.
	 */
	topCenter: 1;
	/**
	 * Appear above the target element, with the right edges of the callout and target aligning.
	 */
	topRightEdge: 2;
	/**
	 * Appear above the target element, aligning with the target element such that the callout tends toward the center of the screen.
	 */
	topAutoEdge: 3;
	/**
	 * Appear below the target element, with the left edges of the callout and target aligning.
	 */
	bottomLeftEdge: 4;
	/**
	 * Appear below the target element, with the centers of the callout and target aligning.
	 */
	bottomCenter: 5;
	/**
	 * Appear below the target element, with the right edges of the callout and target aligning.
	 */
	bottomRightEdge: 6;
	/**
	 * Appear below the target element, aligning with the target element such that the callout tends toward the center of the screen.
	 */
	bottomAutoEdge: 7;
	/**
	 * Appear to the left of the target element, with the top edges of the callout and target aligning.
	 */
	leftTopEdge: 8;
	/**
	 * Appear to the left of the target element, with the centers of the callout and target aligning.
	 */
	leftCenter: 9;
	/**
	 * Appear to the left of the target element, with the bottom edges of the callout and target aligning.
	 */
	leftBottomEdge: 10;
	/**
	 * Appear to the right of the target element, with the top edges of the callout and target aligning.
	 */
	rightTopEdge: 11;
	/**
	 * Appear to the right of the target element, with the centers of the callout and target aligning.
	 */
	rightCenter: 12;
	/**
	 * Appear to the right of the target element, with the bottom edges of the callout and target aligning.
	 */
	rightBottomEdge: 13;
};
export declare type DirectionalHint = typeof DirectionalHint[keyof typeof DirectionalHint];
/**
 * FocusZone component class interface.
 */
export interface IFocusZone {
	/**
	 * Sets focus to the first tabbable item in the zone.
	 * @param forceIntoFirstElement - If true, focus will be forced into the first element, even
	 * if focus is already in the focus zone.
	 * @returns True if focus could be set to an active element, false if no operation was taken.
	 */
	focus(forceIntoFirstElement?: boolean): boolean;
	/**
	 * Sets focus to a specific child element within the zone. This can be used in conjunction with
	 * onBeforeFocus to created delayed focus scenarios (like animate the scroll position to the correct
	 * location and then focus.)
	 * @param element - The child element within the zone to focus.
	 * @returns True if focus could be set to an active element, false if no operation was taken.
	 */
	focusElement(childElement?: HTMLElement): boolean;
}
/**
 * FocusZone component props.
 */
export interface IFocusZoneProps extends React.HTMLAttributes<HTMLElement | FocusZone> {
	/**
	 * Optional callback to access the IFocusZone interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IFocusZone>;
	/**
	 * Additional class name to provide on the root element, in addition to the ms-FocusZone class.
	 */
	className?: string;
	/**
	 * Defines which arrows to react to.
	 * @defaultvalue FocusZoneDirection.bidirectional
	 */
	direction?: FocusZoneDirection;
	/**
	 * Optionally provide a selector for identifying the intial active element.
	 */
	defaultActiveElement?: string;
	/**
	 * If set, the FocusZone will not be tabbable and keyboard navigation will be disabled.
	 * This does not affect disabled attribute of any child.
	 */
	disabled?: boolean;
	/**
	 * Element type the root element will use. Default is "div".
	 */
	elementType?: keyof React.ReactHTML;
	/**
	 * If set, will cycle to the beginning of the targets once the user navigates to the
	 * next target while at the end, and to the end when navigate to the previous at the beginning.
	 */
	isCircularNavigation?: boolean;
	/**
	 * If provided, this callback will be executed on keypresses to determine if the user
	 * intends to navigate into the inner zone. Returning true will ask the first inner zone to
	 * set focus.
	 */
	isInnerZoneKeystroke?: (ev: React.KeyboardEvent<HTMLElement>) => boolean;
	/**
	 * Sets the aria-labelledby attribute.
	 */
	ariaLabelledBy?: string;
	/**
	 * Sets the aria-describedby attribute.
	 */
	ariaDescribedBy?: string;
	/**
	 * Callback for when one of immediate children elements gets active by getting focused
	 * or by having one of its respective children elements focused.
	 */
	onActiveElementChanged?: (element?: HTMLElement, ev?: React.FocusEvent<HTMLElement>) => void;
	/**
	 * Deprecated at v1.12.1. DIV props provided to the FocusZone will be mixed into the root element.
	 * @deprecated DIV props provided to the FocusZone will be mixed into the root element.
	 */
	rootProps?: React.HTMLAttributes<HTMLDivElement>;
	/**
	 * Callback method for determining if focus should indeed be set on the given element.
	 * @param element - The child element within the zone to focus.
	 * @returns True if focus should be set to the given element, false to avoid setting focus.
	 */
	onBeforeFocus?: (childElement?: HTMLElement) => boolean;
	/** Allow focus to move to root */
	allowFocusRoot?: boolean;
	/**
	 * Allows tab key to be handled to tab through a list of items in the focus zone,
	 * an unfortunate side effect is that users will not be able to tab out of the focus zone
	 * and have to hit escape or some other key.
	 * @deprecated Use `handleTabKey` instead.
	 *
	 */
	allowTabKey?: boolean;
	/**
	 * Allows tab key to be handled to tab through a list of items in the focus zone,
	 * an unfortunate side effect is that users will not be able to tab out of the focus zone
	 * and have to hit escape or some other key.
	 */
	handleTabKey?: FocusZoneTabbableElements;
	/**
	 * A callback method to determine if the input element should lose focus on arrow keys
	 *  @param inputElement - The input element which is to loose focus.
	 *  @returns True if input element should loose focus or false otherwise.
	 */
	shouldInputLoseFocusOnArrowKey?: (inputElement: HTMLInputElement) => boolean;
	/**
	 * Whether the to check for data-no-horizontal-wrap or data-no-vertical-wrap attributes
	 * when determining how to move focus
	 * @defaultvalue false
	 */
	checkForNoWrap?: boolean;
	/**
	 * Whether the FocusZone should allow focus events to propagate past the FocusZone
	 */
	doNotAllowFocusEventToPropagate?: boolean;
	/**
	 * Callback to notify creators that focus has been set on the FocusZone
	 */
	onFocusNotification?: () => void;
}
export declare const FocusZoneTabbableElements: {
	/** Tabbing is not allowed */
	none: 0;
	/** All tabbing action is allowed */
	all: 1;
	/** Tabbing is allowed only on input elements */
	inputOnly: 2;
};
export declare type FocusZoneTabbableElements = typeof FocusZoneTabbableElements[keyof typeof FocusZoneTabbableElements];
export declare enum FocusZoneDirection {
	/** Only react to up/down arrows. */
	vertical = 0,
	/** Only react to left/right arrows. */
	horizontal = 1,
	/** React to all arrows. */
	bidirectional = 2
}
export declare class FocusZone extends BaseComponent<IFocusZoneProps, {}> implements IFocusZone {
	static defaultProps: IFocusZoneProps;
	private _root;
	private _id;
	/** The most recently focused child element. */
	private _activeElement;
	/** The child element with tabindex=0. */
	private _defaultFocusElement;
	private _focusAlignment;
	private _isInnerZone;
	/** Used to allow us to move to next focusable element even when we're focusing on a input element when pressing tab */
	private _processingTabKey;
	constructor(props: IFocusZoneProps);
	componentDidMount(): void;
	componentWillUnmount(): void;
	render(): JSX.Element;
	/**
	 * Sets focus to the first tabbable item in the zone.
	 * @param forceIntoFirstElement - If true, focus will be forced into the first element, even
	 * if focus is already in the focus zone.
	 * @returns True if focus could be set to an active element, false if no operation was taken.
	 */
	focus(forceIntoFirstElement?: boolean): boolean;
	/**
	 * Sets focus to a specific child element within the zone. This can be used in conjunction with
	 * onBeforeFocus to created delayed focus scenarios (like animate the scroll position to the correct
	 * location and then focus.)
	 * @param element - The child element within the zone to focus.
	 * @returns True if focus could be set to an active element, false if no operation was taken.
	 */
	focusElement(element: HTMLElement): boolean;
	private _onFocus;
	/**
	 * Handle global tab presses so that we can patch tabindexes on the fly.
	 */
	private _onKeyDownCapture;
	private _onMouseDown;
	private _setActiveElement;
	/**
	 * Handle the keystrokes.
	 */
	private _onKeyDown;
	/**
	 * Walk up the dom try to find a focusable element.
	 */
	private _tryInvokeClickForFocusable;
	/**
	 * Traverse to find first child zone.
	 */
	private _getFirstInnerZone;
	private _moveFocus;
	private _moveFocusDown;
	private _moveFocusUp;
	private _moveFocusLeft;
	private _moveFocusRight;
	private _setFocusAlignment;
	private _isImmediateDescendantOfZone;
	private _getOwnerZone;
	private _updateTabIndexes;
	private _isElementInput;
	private _shouldInputLoseFocus;
	private _shouldWrapFocus;
}
declare enum RectangleEdge {
	top = 1,
	bottom = -1,
	left = 2,
	right = -2
}
declare enum Position {
	top = 0,
	bottom = 1,
	start = 2,
	end = 3
}
export interface IPositionedData {
	/**
	 * The new position of the element.
	 */
	elementPosition: IPosition;
	/**
	 * The finalized target edge that element is aligning to. For instance RectangleEdge.bottom would mean
	 * that the bottom edge of the target is being aligned to by the RectangleEdge.top of the element
	 * that is being positioned.
	 */
	targetEdge: RectangleEdge;
	/**
	 * The finalized alignment edge that the element is aligning too. For instance, RectangleEdge.left means
	 * that the left edge of the target should be in line with the left edge of the element being positioned.
	 */
	alignmentEdge?: RectangleEdge;
}
export interface ICalloutPositionedInfo extends IPositionedData {
	beakPosition: ICalloutBeakPositionedInfo;
}
export interface ICalloutBeakPositionedInfo extends IPositionedData {
	closestEdge: RectangleEdge;
}
/**
 * Gives the position of some element on the page. Only a pair of vertical and horizontal edges need to be
 * given. So top/left or bottom/left is sufficient.
 * The number given is the distance in pixels from whatever host was given..
 * So bottom: 100 would be 100px up from the bottom of the host while top: 100px from the top.
 */
export interface IPosition {
	top?: number;
	left?: number;
	bottom?: number;
	right?: number;
	[key: string]: number | undefined;
}
export declare type ILayerBaseState = {
	hasMounted: boolean;
};
export declare class LayerBase extends BaseComponent<ILayerProps, ILayerBaseState> {
	static defaultProps: ILayerProps;
	private _host;
	private _layerElement;
	private _rootElement;
	constructor(props: ILayerProps);
	componentWillMount(): void;
	componentWillUpdate(): void;
	componentDidMount(): void;
	componentWillUnmount(): void;
	componentDidUpdate(): void;
	render(): React.ReactNode;
	/**
	 * rootElement wrapper for setting virtual parent as soon as root element ref is available.
	 */
	private _handleRootElementRef;
	/**
	 * Helper to stop events from bubbling up out of Layer.
	 */
	private _filterEvent;
	private _getClassNames;
	private _setVirtualParent;
	private _getLayerElement;
	private _removeLayerElement;
	private _getHost;
}
export interface ILayer {
}
export interface ILayerProps extends React.HTMLAttributes<HTMLDivElement | LayerBase> {
	/**
	 * Optional callback to access the ILayer interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<ILayer>;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules
	 */
	styles?: IStyleFunctionOrObject<ILayerStyleProps, ILayerStyles>;
	/**
	 * Theme provided by HOC.
	 */
	theme?: ITheme;
	/**
	 * Additional css class to apply to the Layer
	 * @defaultvalue undefined
	 */
	className?: string;
	/** Callback for when the layer is mounted. */
	onLayerMounted?: () => void;
	/**
	 * Callback for when the layer is mounted.
	 */
	onLayerDidMount?: () => void;
	/**
	 * Callback for when the layer is unmounted.
	 */
	onLayerWillUnmount?: () => void;
	/**
	 * The optional id property provided on a LayerHost that this Layer should render within. The LayerHost does
	 * not need to be immediately available but once has been rendered, and if missing, we'll avoid trying
	 * to render the Layer content until the host is available. If an id is not provided, we will render the Layer
	 * content in a fixed position element rendered at the end of the document.
	 */
	hostId?: string;
	/**
	 * When enabled, Layer allows events to bubble up from Layer content.
	 * Traditionally Layer has not had this behavior. This prop preserves backwards compatibility by
	 * default while allowing users to opt in to the new event bubbling functionality.
	 */
	eventBubblingEnabled?: boolean;
}
export interface ILayerStyleProps {
	/**
	 * Accept theme prop.
	 */
	theme: ITheme;
	/**
	 * Accept custom classNames
	 */
	className?: string;
	/**
	 * Check if Host
	 */
	isNotHost?: boolean;
}
export interface ILayerStyles {
	/**
	 * Style for the root element when fixed.
	 */
	root?: IStyle;
	/**
	 * Style for the Fabric component.
	 */
	content?: IStyle;
}
export declare const Layer: (props: ILayerProps) => JSX.Element;
export interface ILayerHost {
}
export interface ILayerHostProps extends React.HTMLAttributes<HTMLElement> {
	/**
	 * Optional callback to access the ILayerHost interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<ILayerHost>;
	/**
	 * Defines the id for the layer host that Layers can target (using the hostId property.)
	 */
	id?: string;
}
export declare class LayerHost extends BaseComponent<ILayerHostProps> {
	shouldComponentUpdate(): boolean;
	componentDidMount(): void;
	componentWillUnmount(): void;
	render(): JSX.Element;
}
export interface ICallout {
}
export interface ICalloutProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Optional callback to access the ICallout interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<ICallout>;
	/**
	 * The target that the Callout should try to position itself based on.
	 * It can be either an Element a querySelector string of a valid Element
	 * or a MouseEvent. If MouseEvent is given then the origin point of the event will be used.
	 */
	target?: Element | string | MouseEvent | IPoint | null;
	/**
	 * How the element should be positioned
	 * @defaultvalue DirectionalHint.BottomAutoEdge
	 */
	directionalHint?: DirectionalHint;
	/**
	 * How the element should be positioned in RTL layouts.
	 * If not specified, a mirror of `directionalHint` will be used instead
	 */
	directionalHintForRTL?: DirectionalHint;
	/**
	 * The gap between the Callout and the target
	 * @defaultvalue 0
	 */
	gapSpace?: number;
	/**
	 * The width of the beak.
	 * @defaultvalue 16
	 */
	beakWidth?: number;
	/**
	 * Custom width for callout including borders. If value is 0, no width is applied.
	 * @defaultvalue 0
	 */
	calloutWidth?: number;
	/**
	 * Custom width for callout including borders. If value is 0, no width is applied.
	 * @defaultvalue 0
	 */
	calloutMaxWidth?: number;
	/**
	 * The background color of the Callout in hex format ie. #ffffff.
	 * @defaultvalue $ms-color-white
	 */
	backgroundColor?: string;
	/**
	 * The bounding rectangle for which  the contextual menu can appear in.
	 */
	bounds?: IRectangle;
	/**
	 * The minimum distance the callout will be away from the edge of the screen.
	 *  @defaultvalue 8
	 */
	minPagePadding?: number;
	/**
	 * If true then the beak is visible. If false it will not be shown.
	 * @defaultvalue true
	 */
	isBeakVisible?: boolean;
	/**
	 * If true then the callout will not dismiss on scroll
	 * @defaultvalue false
	 */
	preventDismissOnScroll?: boolean;
	/**
	 * If true then the callout will not dismiss when it loses focus
	 * @defaultvalue false
	 */
	preventDismissOnLostFocus?: boolean;
	/**
	 * If true the position returned will have the menu element cover the target.
	 * If false then it will position next to the target;
	 * @defaultvalue false
	 */
	coverTarget?: boolean;
	/**
	 * If true the positioning logic will prefer to flip edges rather than to nudge the rectangle to fit within bounds,
	 * thus making sure the element aligns perfectly with target's alignment edge
	 */
	alignTargetEdge?: boolean;
	/**
	 * Aria role assigned to the callout (Eg. dialog, alertdialog).
	 */
	role?: string;
	/**
	 * Accessible label text for callout.
	 */
	ariaLabel?: string;
	/**
	 *  Defines the element id referencing the element containing label text for callout.
	 */
	ariaLabelledBy?: string;
	/**
	 * Defines the element id referencing the element containing the description for the callout.
	 */
	ariaDescribedBy?: string;
	/**
	 * CSS class to apply to the callout.
	 * @defaultvalue null
	 */
	className?: string;
	/**
	 * CSS style to apply to the callout.
	 */
	style?: React.CSSProperties;
	/**
	 * Optional callback when the layer content has mounted.
	 */
	onLayerMounted?: () => void;
	/**
	 * Optional props to pass to the Layer component hosting the panel.
	 */
	layerProps?: ILayerProps;
	/**
	 * Optional callback that is called once the callout has been correctly positioned.
	 * @param positions - Gives the user information about how the callout is positioned such as the
	 * final edge of the target that it positioned against, the beak position, and the beaks relationship to the
	 * edges of the callout.
	 */
	onPositioned?: (positions?: ICalloutPositionedInfo) => void;
	/**
	 * Callback when the Callout tries to close.
	 */
	onDismiss?: (ev?: any) => void;
	/**
	 * If true do not render on a new layer. If false render on a new layer.
	 */
	doNotLayer?: boolean;
	/**
	 * If true the position will not change sides in an attempt to fit the callout within bounds.
	 * It will still attempt to align it to whatever bounds are given.
	 * @defaultvalue false
	 */
	directionalHintFixed?: boolean;
	/**
	 * Specify the final height of the content.
	 * To be used when expanding the content dynamically so that callout can adjust its position.
	 */
	finalHeight?: number;
	/**
	 * Manually set OverflowYHidden style prop to true on calloutMain element
	 * A variety of callout load animations will need this to hide the scollbar that can appear
	 */
	hideOverflow?: boolean;
	/**
	 * If true then the callout will attempt to focus the first focusable element that it contains.
	 * If it doesn't find an element, no focus will be set and the method will return false.
	 * This means that it's the contents responsibility to either set focus or have
	 * focusable items.
	 * @returns True if focus was set, false if it was not.
	 */
	setInitialFocus?: boolean;
	/**
	 * Set max height of callout
	 * When not set the callout will expand with contents up to the bottom of the screen
	 */
	calloutMaxHeight?: number;
	/**
	 * Callback when the Callout body is scrolled.
	 */
	onScroll?: () => void;
	/**
	 * Optional theme for component
	 */
	theme?: ITheme;
	/**
	 * Optional styles for the component.
	 */
	styles?: IStyleFunctionOrObject<ICalloutContentStyleProps, ICalloutContentStyles>;
	/**
	 * If specified, renders the Callout in a hidden state.
	 * Use this flag, rather than rendering a callout conditionally based on visibility,
	 * to improve rendering performance when it becomes visible.
	 * Note: When callout is hidden its content will not be rendered. It will only render
	 * once the callout is visible.
	 */
	hidden?: boolean;
}
export interface ICalloutContentStyleProps {
	/**
	 * Theme to apply to the calloutContent.
	 */
	theme: ITheme;
	/**
	 * Width for callout including borders.
	 */
	calloutWidth?: number;
	/**
	 * CSS class to apply to the callout.
	 */
	className?: string;
	/**
	 * Callout positioning data
	 */
	positions?: ICalloutPositionedInfo;
	/**
	 * Whether or not to clip content of the callout,
	 * if it overflows vertically.
	 */
	overflowYHidden?: boolean;
	/**
	 * Background color for the beak and callout.
	 */
	backgroundColor?: string;
	/**
	 * Width of Callout beak
	 */
	beakWidth?: number;
	/**
	 * Max width for callout including borders.
	 */
	calloutMaxWidth?: number;
}
export interface ICalloutContentStyles {
	/**
	 * Style for wrapper of Callout component.
	 */
	container: IStyle;
	/**
	 * Style for callout container root element.
	 */
	root: IStyle;
	/**
	 * Style for callout beak.
	 */
	beak: IStyle;
	/**
	 * Style for callout beak curtain.
	 */
	beakCurtain: IStyle;
	/**
	 * Style for content component of the callout.
	 */
	calloutMain: IStyle;
}
export interface ICalloutState {
	positions?: ICalloutPositionedInfo;
	slideDirectionalClassName?: string;
	calloutElementRect?: ClientRect;
	heightOffset?: number;
}
export declare class Callout extends BaseComponent<ICalloutProps, ICalloutState> {
	constructor(props: ICalloutProps);
	render(): JSX.Element;
}
export interface IFocusTrapZone {
	/**
	 * Sets focus to a descendant in the Trap Zone.
	 * See firstFocusableSelector and focusPreviouslyFocusedInnerElement for details.
	 */
	focus: () => void;
}
export interface IFocusTrapZoneProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Optional callback to access the IFocusTrapZone interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IFocusTrapZone>;
	/**
	 * Sets the HTMLElement to focus on when exiting the FocusTrapZone.
	 * @defaultvalue The element.target that triggered the FTZ.
	 */
	elementToFocusOnDismiss?: HTMLElement;
	/**
	 * Sets the aria-labelledby attribute.
	 */
	ariaLabelledBy?: string;
	/**
	 * Indicates if this Trap Zone will allow clicks outside the FocusTrapZone
	 * @defaultvalue false
	 */
	isClickableOutsideFocusTrap?: boolean;
	/**
	 * Indicates if this Trap Zone will ignore keeping track of HTMLElement that activated the Zone.
	 * @defaultvalue false
	 */
	ignoreExternalFocusing?: boolean;
	/**
	 * Indicates whether focus trap zone should force focus inside the focus trap zone
	 * @defaultvalue true
	 */
	forceFocusInsideTrap?: boolean;
	/**
	 * Indicates the selector for first focusable item.  Only applies if focusPreviouslyFocusedInnerElement == false.
	 */
	firstFocusableSelector?: string | (() => string);
	/**
	 * Do not put focus onto first element when render focus trap zone
	 * @defaultvalue false
	 */
	disableFirstFocus?: boolean;
	/**
	 * Specifies the algorithm used to determine which descendant element to focus when focus() is called.
	 * If false, the first focusable descendant, filtered by the firstFocusableSelector property if present, is chosen.
	 * If true, the element that was focused when the Trap Zone last had a focused descendant is chosen.
	 * If it has never had a focused descendant before, behavior falls back to the first focused descendant.
	 * @defaultvalue false
	 */
	focusPreviouslyFocusedInnerElement?: boolean;
}
export declare class FocusTrapZone extends BaseComponent<IFocusTrapZoneProps, {}> implements IFocusTrapZone {
	private static _focusStack;
	private _root;
	private _previouslyFocusedElementOutsideTrapZone;
	private _previouslyFocusedElementInTrapZone?;
	private _hasFocusHandler;
	private _hasClickHandler;
	componentDidMount(): void;
	componentWillReceiveProps(nextProps: IFocusTrapZoneProps): void;
	componentDidUpdate(prevProps: IFocusTrapZoneProps): void;
	componentWillUnmount(): void;
	render(): JSX.Element;
	focus(): void;
	private _bringFocusIntoZone;
	private _returnFocusToInitiator;
	private _updateEventHandlers;
	private _onFocusCapture;
	private _onKeyboardHandler;
	private _forceFocusInTrap;
	private _forceClickInTrap;
}
export interface IFocusTrapCalloutProps extends ICalloutProps {
	/**
	 * Optional props to be passed on to FocusTrapZone
	 */
	focusTrapProps?: IFocusTrapZoneProps;
}
/**
 * A special Callout that uses FocusTrapZone to trap focus
 * @param props - Props for the component
 */
export declare const FocusTrapCallout: React.StatelessComponent<IFocusTrapCalloutProps>;
export interface IWithResponsiveModeState {
	responsiveMode?: ResponsiveMode;
}
declare enum ResponsiveMode {
	small = 0,
	medium = 1,
	large = 2,
	xLarge = 3,
	xxLarge = 4,
	xxxLarge = 5
}
export interface IVerticalDividerProps {
	/**
	 * Optional function to generate the class names for the divider for custom styling
	 */
	getClassNames?: (theme: ITheme) => IVerticalDividerClassNames;
}
export interface IVerticalDividerClassNames {
	wrapper: string;
	divider: string;
}
export interface IContextualMenuRenderItem {
	/**
	 * Function to open this item's subMenu, if present.
	 */
	openSubMenu: () => void;
	/**
	 * Function to close this item's subMenu, if present.
	 */
	dismissSubMenu: () => void;
	/**
	 * Dismiss the menu this item belongs to.
	 */
	dismissMenu: (dismissAll?: boolean) => void;
}
export interface IContextualMenuItemProps extends React.HTMLAttributes<IContextualMenuItemProps> {
	/**
	 * Optional callback to access the IContextualMenuRenderItem interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IContextualMenuRenderItem>;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<IContextualMenuItemStyleProps, IContextualMenuItemStyles>;
	/**
	 * Theme provided by High-Order Component.
	 */
	theme?: ITheme;
	/**
	 * Additional css class to apply to the ContextualMenuItem
	 * @defaultvalue undefined
	 */
	className?: string;
	/**
	 * The item to display
	 */
	item: IContextualMenuItem;
	/**
	 * Classnames for different aspects of a menu item
	 */
	classNames: IMenuItemClassNames;
	/**
	 * Index of the item
	 */
	index: number;
	/**
	 * If this item has icons
	 */
	hasIcons: boolean | undefined;
	/**
	 * Click handler for the checkmark
	 */
	onCheckmarkClick?: ((item: IContextualMenuItem, ev: React.MouseEvent<HTMLElement>) => void);
	/**
	 * This prop will get set by ContextualMenu and can be called to open this item's subMenu, if present.
	 */
	openSubMenu?: (item: any, target: HTMLElement) => void;
	/**
	 * This prop will get set by ContextualMenu and can be called to close this item's subMenu, if present.
	 */
	dismissSubMenu?: () => void;
	/**
	 * This prop will get set by ContextualMenu and can be called to close the menu this item belongs to.
	 * If dismissAll is true, all menus will be closed.
	 */
	dismissMenu?: (ev?: any, dismissAll?: boolean) => void;
	/**
	 * This prop will get set by the wrapping component and will return the element that wraps this ContextualMenuItem.
	 * Used for openSubMenu.
	 */
	getSubmenuTarget?: () => HTMLElement | undefined;
}
export interface IContextualMenuItemStyleProps {
	/**
	 * Theme provided by High-Order Component.
	 */
	theme: ITheme;
	/**
	 * Accept custom classNames
	 */
	className?: string;
	/**
	 * Whether or not the menu item is disabled.
	 */
	disabled: boolean;
	/**
	 * Whether or not the menu item is expanded.
	 */
	expanded: boolean;
	/**
	 * Whether or not the menu item is checked.
	 */
	checked: boolean;
	/**
	 * Indicates if a menu item is an anchor link.
	 */
	isAnchorLink: boolean;
	/**
	 * Indicates if the icon used is of the known set of icons.
	 */
	knownIcon: boolean;
	/**
	 * The optional class name to apply to the item element.
	 */
	itemClassName?: string;
	/**
	 * The optional class name to apply to the divider element.
	 */
	dividerClassName?: string;
	/**
	 * The optional class name to apply to the icon element.
	 */
	iconClassName?: string;
	/**
	 * The optional class name to apply to the sub-menu if present.
	 */
	subMenuClassName?: string;
	/**
	 * Whether or not the primary section of a split menu item is disabled.
	 */
	primaryDisabled?: boolean;
}
export interface IContextualMenuItemStyles extends IButtonStyles {
	/**
	 * Style for the root element.
	 */
	root: IStyle;
	/**
	 * Styles for a menu item that is an anchor link.
	 */
	item: IStyle;
	/**
	 * Styles for a divider item of a ContextualMenu.
	 */
	divider: IStyle;
	/**
	 * Styles for the content inside the button/link of the menuItem.
	 */
	linkContent: IStyle;
	/**
	 * Styles for a menu item that is an anchor link.
	 */
	anchorLink: IStyle;
	/**
	 * Styles for the icon element of a menu item.
	 */
	icon: IStyle;
	/**
	 * Default icon color style for known icons.
	 */
	iconColor: IStyle;
	/**
	 * Default style for checkmark icons.
	 */
	checkmarkIcon: IStyle;
	/**
	 * Styles for the submenu icon of a menu item.
	 */
	subMenuIcon: IStyle;
	/**
	 * Styles for the label of a menu item.
	 */
	label: IStyle;
	/**
	 * Styles for the secondary text of a menu item.
	 */
	secondaryText: IStyle;
	/**
	 * Styles for the container of a split menu item.
	 */
	splitContainer: IStyle;
	/**
	 * Styles for the primary portion of a split menu item.
	 */
	splitPrimary: IStyle;
	/**
	 * Styles for the menu portion of a split menu item.
	 */
	splitMenu: IStyle;
	/**
	 * Styles for a menu item that is a link.
	 */
	linkContentMenu: IStyle;
}
/**
 * @deprecated in favor of mergeStyles API.
 */
export interface IContextualMenuClassNames {
	container: string;
	root: string;
	list: string;
	header: string;
	title: string;
	subComponentStyles?: IContextualMenuSubComponentStyles;
}
/**
 * @deprecated in favor of mergeStyles API.
 */
export interface IMenuItemClassNames {
	item: string;
	divider: string;
	root: string;
	linkContent: string;
	icon: string;
	checkmarkIcon: string;
	subMenuIcon: string;
	label: string;
	secondaryText: string;
	splitContainer: string;
	splitPrimary: string;
	splitMenu: string;
	linkContentMenu: string;
}
export interface IKeytip {
}
export interface IKeytipProps {
	/**
	 * Optional callback to access the Keytip component. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IKeytip>;
	/**
	 * Content to put inside the keytip
	 */
	content: string;
	/**
	 * Theme for the component
	 */
	theme?: ITheme;
	/**
	 * T/F if the corresponding control for this keytip is disabled
	 */
	disabled?: boolean;
	/**
	 * T/F if the keytip is visible
	 */
	visible?: boolean;
	/**
	 * Function to call when this keytip is activated.
	 * 'executeTarget' is the DOM element marked with 'data-ktp-execute-target'.
	 * 'target' is the DOM element marked with 'data-ktp-target'.
	 */
	onExecute?: (executeTarget: HTMLElement | null, target: HTMLElement | null) => void;
	/**
	 * Function to call when the keytip is the currentKeytip and a return sequence is pressed.
	 * 'executeTarget' is the DOM element marked with 'data-ktp-execute-target'.
	 * 'target' is the DOM element marked with 'data-ktp-target'.
	 */
	onReturn?: (executeTarget: HTMLElement | null, target: HTMLElement | null) => void;
	/**
	 * Array of KeySequences which is the full key sequence to trigger this keytip
	 * Should not include initial 'start' key sequence
	 */
	keySequences: string[];
	/**
	 * Full KeySequence of the overflow set button, will be set automatically if this keytip is inside an overflow
	 */
	overflowSetSequence?: string[];
	/**
	 * ICalloutProps to pass to the callout element
	 */
	calloutProps?: ICalloutProps;
	/**
	 * Optional styles for the component.
	 */
	styles?: IStyleFunctionOrObject<IKeytipStyleProps, IKeytipStyles>;
	/**
	 * Offset x and y for the keytip, added from the top-left corner
	 * By default the keytip will be anchored to the bottom-center of the element
	 */
	offset?: IPoint;
	/**
	 * Whether or not this keytip will have children keytips that are dynamically created (DOM is generated on keytip activation)
	 * Common cases are a Pivot or Modal
	 */
	hasDynamicChildren?: boolean;
	/**
	 * Whether or not this keytip belongs to a component that has a menu
	 * Keytip mode will stay on when a menu is opened, even if the items in that menu have no keytips
	 */
	hasMenu?: boolean;
}
/**
 * Props to style Keytip component
 */
export interface IKeytipStyleProps {
	/**
	 * The theme for the keytip.
	 */
	theme: ITheme;
	/**
	 * Whether the keytip is disabled or not.
	 */
	disabled?: boolean;
	/**
	 * T/F if the keytip is visible
	 */
	visible?: boolean;
}
export interface IKeytipStyles {
	/**
	 * Style for the div container surrounding the keytip content.
	 */
	container: IStyle;
	/**
	 * Style for the keytip content element.
	 */
	root: IStyle;
}
/**
 * A callout corresponding to another Fabric component to describe a key sequence that will activate that component
 */
export declare class Keytip extends BaseComponent<IKeytipProps, {}> implements IKeytip {
	render(): JSX.Element;
}
export declare enum ContextualMenuItemType {
	Normal = 0,
	Divider = 1,
	Header = 2,
	Section = 3
}
export interface IContextualMenu {
}
/**
 * React.Props is deprecated and we're removing it in 6.0. Usage of 'any' should go away with it.
 */
export interface IContextualMenuProps extends IBaseProps<IContextualMenu>, IWithResponsiveModeState {
	/**
	 * Optional callback to access the IContextualMenu interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IContextualMenu>;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<IContextualMenuStyleProps, IContextualMenuStyles>;
	/**
	 * Theme provided by High-Order Component.
	 */
	theme?: ITheme;
	/**
	 * Additional css class to apply to the ContextualMenu
	 * @defaultvalue undefined
	 */
	className?: string;
	/**
	 * The target that the ContextualMenu should try to position itself based on.
	 * It can be either an Element a querySelector string of a valid Element
	 * or a MouseEvent. If MouseEvent is given then the origin point of the event will be used.
	 */
	target?: Element | string | MouseEvent | IPoint | null;
	/**
	 * How the element should be positioned
	 * @defaultvalue DirectionalHint.bottomAutoEdge
	 */
	directionalHint?: DirectionalHint;
	/**
	 * How the element should be positioned in RTL layouts.
	 * If not specified, a mirror of `directionalHint` will be used instead
	 */
	directionalHintForRTL?: DirectionalHint;
	/**
	 * The gap between the ContextualMenu and the target
	 * @defaultvalue 0
	 */
	gapSpace?: number;
	/**
	 * The width of the beak.
	 * @defaultvalue 16
	 */
	beakWidth?: number;
	/**
	 * If true the context menu will render as the same width as the target element
	 * @defaultvalue false
	 */
	useTargetWidth?: boolean;
	/**
	 * If true the context menu will have a minimum width equal to the width of the target element
	 * @defaultvalue false
	 */
	useTargetAsMinWidth?: boolean;
	/**
	 * The bounding rectangle for which the contextual menu can appear in.
	 */
	bounds?: IRectangle;
	/**
	 * If true then the beak is visible. If false it will not be shown.
	 */
	isBeakVisible?: boolean;
	/**
	 * If true the position returned will have the menu element cover the target.
	 * If false then it will position next to the target;
	 * @defaultvalue false
	 */
	coverTarget?: boolean;
	/**
	 * If true the positioning logic will prefer to flip edges rather than to nudge the rectangle to fit within bounds,
	 * thus making sure the element aligns perfectly with target's alignment edge
	 */
	alignTargetEdge?: boolean;
	/**
	 * Collection of menu items.
	 * @defaultvalue []
	 */
	items: IContextualMenuItem[];
	/**
	 * Aria Labelled by labelElementId
	 * @defaultvalue null
	 */
	labelElementId?: string;
	/**
	 * Whether to focus on the menu when mounted.
	 * @defaultvalue true
	 */
	shouldFocusOnMount?: boolean;
	/**
	 * Whether to focus on the contextual menu container (as opposed to the first menu item).
	 * @defaultvalue null
	 */
	shouldFocusOnContainer?: boolean;
	/**
	 * Callback when the ContextualMenu tries to close. If dismissAll is true then all
	 * submenus will be dismissed.
	 */
	onDismiss?: (ev?: any, dismissAll?: boolean) => void;
	/**
	 * Click handler which is invoked if onClick is not passed for individual contextual
	 * menu item.
	 * Returning true will dismiss the menu even if ev.preventDefault() was called.
	 */
	onItemClick?: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem) => boolean | void;
	/**
	 * Whether this menu is a submenu of another menu or not.
	 */
	isSubMenu?: boolean;
	/**
	 * DOM id to tag the ContextualMenu with, for reference.
	 * Should be used for 'aria-owns' and other such uses, rather than direct reference for programmatic purposes.
	 */
	id?: string;
	/**
	 * Aria label for accessibility for the ContextualMenu.
	 * If none specified no aria label will be applied to the ContextualMenu.
	 */
	ariaLabel?: string;
	/**
	 * If true do not render on a new layer. If false render on a new layer.
	 * @defaultvalue false
	 */
	doNotLayer?: boolean;
	/**
	 * If true the position will not change sides in an attempt to fit the ContextualMenu within bounds.
	 * It will still attempt to align it to whatever bounds are given.
	 * @defaultvalue false
	 */
	directionalHintFixed?: boolean;
	/**
	 * Callback for when the contextualmenu has been opened.
	 */
	onMenuOpened?: (contextualMenu?: IContextualMenuProps) => void;
	/**
	 * Callback for when the contextualmenu is being closed (removing from the DOM)
	 */
	onMenuDismissed?: (contextualMenu?: IContextualMenuProps) => void;
	/**
	 * Pass in custom callout props
	 */
	calloutProps?: ICalloutProps;
	/**
	 * Optional title to be displayed on top of the menu.
	 */
	title?: string;
	/**
	 * Method to provide the classnames to style the contextual menu. Default value is the getMenuClassnames func
	 * defined in ContextualMenu.classnames.
	 * Deprecated, use `styles` prop of `IContextualMenuProps` to leverage mergeStyles API.
	 * @deprecated Use `styles` prop of `IContextualMenuProps` to leverage mergeStyles API.
	 */
	getMenuClassNames?: (theme: ITheme, className?: string) => IContextualMenuClassNames;
	/** Method to call when trying to render a submenu. */
	onRenderSubMenu?: IRenderFunction<IContextualMenuProps>;
	/**
	 * Method to override the render of the list of menu items.
	 */
	onRenderMenuList?: IRenderFunction<IContextualMenuListProps>;
	/**
	 * Delay (in milliseconds) to wait before expanding / dismissing a submenu on mouseEnter or mouseLeave
	 */
	subMenuHoverDelay?: number;
	/**
	 * Method to override the render of the individual menu items
	 * @defaultvalue ContextualMenuItem
	 */
	contextualMenuItemAs?: React.ComponentClass<IContextualMenuItemProps> | React.StatelessComponent<IContextualMenuItemProps>;
	/**
	 * Props to pass down to the FocusZone.
	 * NOTE: the default FocusZoneDirection will be used unless a direction
	 * is specified in the focusZoneProps (even if other focusZoneProps are defined)
	 * @defaultvalue \{direction: FocusZoneDirection.vertical\}
	 */
	focusZoneProps?: IFocusZoneProps;
	/**
	 * If specified, renders the ContextualMenu in a hidden state.
	 * Use this flag, rather than rendering a ContextualMenu conditionally based on visibility,
	 * to improve rendering performance when it becomes visible.
	 * Note: When ContextualMenu is hidden its content will not be rendered. It will only render
	 * once the ContextualMenu is visible.
	 */
	hidden?: boolean;
	/**
	 * If true, the contextual menu will not be updated until
	 * focus enters the menu via other means. This will only result
	 * in different behavior when shouldFocusOnMount = false
	 * @defaultvalue null
	 */
	delayUpdateFocusOnHover?: boolean;
}
export interface IContextualMenuListProps {
	items: IContextualMenuItem[];
	totalItemCount: number;
	hasCheckmarks: boolean;
	hasIcons: boolean;
}
export interface IContextualMenuItem {
	/**
	 * Optional callback to access the IContextualMenuRenderItem interface. This will get passed down to ContextualMenuItem.
	 */
	componentRef?: IRefObject<IContextualMenuRenderItem>;
	/**
	 * Unique id to identify the item
	 */
	key: string;
	/**
	 * Text description for the menu item to display
	 */
	text?: string;
	/**
	 * Seconday description for the menu item to display
	 */
	secondaryText?: string;
	itemType?: ContextualMenuItemType;
	/**
	 * Props that go to the IconComponent
	 */
	iconProps?: IIconProps;
	/**
	 * Custom render function for the menu item icon
	 */
	onRenderIcon?: IRenderFunction<IContextualMenuItemProps>;
	/**
	 * Props that go to the IconComponent used for the chevron.
	 */
	submenuIconProps?: IIconProps;
	/**
	 * Whether the menu item is disabled
	 * @defaultvalue false
	 */
	disabled?: boolean;
	/**
	 * If the menu item is a split button, this prop disables purely the primary action of the button.
	 * @defaultvalue false
	 */
	primaryDisabled?: boolean;
	/**
	 * [TODO] Not Yet Implemented
	 */
	shortCut?: string;
	/**
	 * Whether or not this menu item can be checked
	 * @defaultvalue false
	 */
	canCheck?: boolean;
	/**
	 * Whether or not this menu item is currently checked.
	 * @defaultvalue false
	 */
	checked?: boolean;
	/**
	 * Whether or not this menu item is a splitButton.
	 * @defaultvalue false
	 */
	split?: boolean;
	/**
	 * Any custom data the developer wishes to associate with the menu item.
	 */
	data?: any;
	/**
	 * Callback issued when the menu item is invoked. If ev.preventDefault() is called in onClick, click will not close menu.
	 * Returning true will dismiss the menu even if ev.preventDefault() was called.
	 */
	onClick?: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem) => boolean | void;
	/**
	 * An optional URL to navigate to upon selection
	 */
	href?: string;
	/**
	 * An optional target when using href
	 */
	target?: string;
	/**
	 * An optional rel when using href. If target is _blank rel is defaulted to a value to prevent clickjacking.
	 */
	rel?: string;
	/**
	 * Properties to apply to a submenu to this item.
	 *
	 * The ContextualMenu will provide default values for `target`, `onDismiss`, `isSubMenu`,
	 * `id`, `shouldFocusOnMount`, `directionalHint`, `className`, and `gapSpace`, all of which
	 * can be overridden.
	 */
	subMenuProps?: IContextualMenuProps;
	/**
	 * Method to provide the classnames to style the individual items inside a menu.
	 * Deprecated, use `styles` prop of `IContextualMenuItemProps` to leverage mergeStyles API.
	 * @deprecated Use `styles` prop of `IContextualMenuItemProps` to leverage mergeStyles API.
	 */
	getItemClassNames?: (theme: ITheme, disabled: boolean, expanded: boolean, checked: boolean, isAnchorLink: boolean, knownIcon: boolean, itemClassName?: string, dividerClassName?: string, iconClassName?: string, subMenuClassName?: string, primaryDisabled?: boolean) => IMenuItemClassNames;
	/**
	 * Optional IContextualMenuItemProps overrides to customize behaviors such as item styling via `styles`.
	 */
	itemProps?: Partial<IContextualMenuItemProps>;
	/**
	 * Method to provide the classnames to style the Vertical Divider of a split button inside a menu.
	 * Default value is the getVerticalDividerClassnames func defined in ContextualMenu.classnames
	 * @defaultvalue getSplitButtonVerticalDividerClassNames
	 */
	getSplitButtonVerticalDividerClassNames?: (theme: ITheme) => IVerticalDividerClassNames;
	/**
	 *  Properties to apply to render this item as a section.
	 *  This prop is mutually exclusive with subMenuProps.
	 */
	sectionProps?: IContextualMenuSection;
	/**
	 * Additional css class to apply to the menu item
	 * @defaultvalue undefined
	 */
	className?: string;
	/**
	 * Additional styles to apply to the menu item
	 * Deprecated, use `styles` instead.
	 * @defaultvalue undefined
	 * @deprecated in favor of the `styles` prop to leverage mergeStyles API.
	 */
	style?: React.CSSProperties;
	/**
	 * Optional accessibility label (aria-label) attribute that will be stamped on to the element.
	 * If none is specified, the aria-label attribute will contain the item name
	 */
	ariaLabel?: string;
	/**
	 * Optional title for displaying text when hovering over an item.
	 */
	title?: string;
	/**
	 * Method to custom render this menu item.
	 * For keyboard accessibility, the top-level rendered item should be a focusable element
	 * (like an anchor or a button) or have the `data-is-focusable` property set to true.
	 *
	 * The function receives a function that can be called to dismiss the menu as a second argument.
	 *  This can be used to make sure that a custom menu item click dismisses the menu.
	 * @defaultvalue undefined
	 */
	onRender?: (item: any, dismissMenu: (ev?: any, dismissAll?: boolean) => void) => React.ReactNode;
	/**
	 * A function to be executed onMouseDown. This is executed before an onClick event and can
	 * be used to interrupt native on click events as well. The click event should still handle
	 * the commands. This should only be used in special cases when react and non-react are mixed.
	 */
	onMouseDown?: (item: IContextualMenuItem, event: any) => void;
	/**
	 * Optional override for the role attribute on the menu button. If one is not provided, it will
	 * have a value of menuitem or menuitemcheckbox.
	 */
	role?: string;
	/**
	 * When rendering a custom component that is passed in, the component might also be a list of
	 * elements. We want to keep track of the correct index our menu is using based off of
	 * the length of the custom list. It is up to the user to increment the count for their list.
	 */
	customOnRenderListLength?: number;
	/**
	 * Keytip for this contextual menu item
	 */
	keytipProps?: IKeytipProps;
	/**
	 * Any additional properties to use when custom rendering menu items.
	 */
	[propertyName: string]: any;
	/**
	 * This prop is no longer used. All contextual menu items are now focusable when disabled.
	 * @deprecated in 6.38.2 will be removed in 7.0.0
	 */
	inactive?: boolean;
	/**
	 * Text description for the menu item to display
	 * Deprecated, use `text` instead.
	 * @deprecated Use `text` instead.
	 */
	name?: string;
}
/**
 * React.Props is deprecated and we're removing it in 6.0. Usage of 'any' should go away with it.
 */
export interface IContextualMenuSection extends React.ClassAttributes<any> {
	/**
	 * The items to include inside the section.
	 */
	items: IContextualMenuItem[];
	/**
	 * The optional section title.
	 */
	title?: string;
	/**
	 * If set to true, the section will display a divider at the top of the section.
	 */
	topDivider?: boolean;
	/**
	 * If set to true, the section will display a divider at the bottom of the section.
	 */
	bottomDivider?: boolean;
}
export interface IMenuItemStyles extends IButtonStyles {
	/**
	 * Styles for a menu item that is an anchor link.
	 */
	item: IStyle;
	/**
	 * Styles for the content inside the button/link of the menuItem.
	 */
	linkContent: IStyle;
	/**
	 * Styles for a menu item that is an anchor link.
	 */
	anchorLink: IStyle;
	/**
	 * Default icon color style for known icons.
	 */
	iconColor: IStyle;
	/**
	 * Default style for checkmark icons.
	 */
	checkmarkIcon: IStyle;
	/**
	 * Styles for the submenu icon of a menu item.
	 */
	subMenuIcon: IStyle;
	/**
	 * Styles for a divider item of a ConextualMenu.
	 */
	divider: IStyle;
}
export interface IContextualMenuStyleProps {
	/**
	 * Theme provided by High-Order Component.
	 */
	theme: ITheme;
	/**
	 * Accept custom classNames
	 */
	className?: string;
}
export interface IContextualMenuStyles {
	/**
	 * Style override for the contextual menu title.
	 */
	title: IStyle;
	/**
	 * Style for the container which parents all menu items.
	 */
	container: IStyle;
	/**
	 * Base styles for the root element of all ContextualMenus.
	 */
	root: IStyle;
	/**
	 * Styles for the header item of a ContextualMenu
	 */
	header: IStyle;
	/**
	 * Styles for the list that contains all menuItems.
	 */
	list: IStyle;
	/**
	 * SubComponent styles.
	 */
	subComponentStyles: IContextualMenuSubComponentStyles;
}
export interface IContextualMenuSubComponentStyles {
	/** Refers to the callout that hosts the ContextualMenu options */
	callout: IStyleFunctionOrObject<ICalloutContentStyleProps, any>;
	/** Refers to the item in the list */
	menuItem: IStyleFunctionOrObject<IContextualMenuItemStyleProps, any>;
}
/**
 * ContextualMenu description
 */
export declare const ContextualMenu: (props: IContextualMenuProps) => JSX.Element;
export interface IContextualMenuState {
	expandedMenuItemKey?: string;
	expandedByMouseClick?: boolean;
	dismissedMenuItemKey?: string;
	contextualMenuItems?: IContextualMenuItem[];
	contextualMenuTarget?: Element;
	submenuTarget?: Element;
	positions?: any;
	slideDirectionalClassName?: string;
	subMenuId?: string;
	submenuDirection?: DirectionalHint;
}
export declare function getSubmenuItems(item: IContextualMenuItem): any;
/**
 * Returns true if a list of menu items can contain a checkbox
 */
export declare function canAnyMenuItemsCheck(items: IContextualMenuItem[]): boolean;
export declare class ContextualMenuBase extends BaseComponent<IContextualMenuProps, IContextualMenuState> {
	static defaultProps: IContextualMenuProps;
	private _host;
	private _previousActiveElement;
	private _isFocusingPreviousElement;
	private _enterTimerId;
	private _targetWindow;
	private _target;
	private _isScrollIdle;
	private _scrollIdleTimeoutId;
	/** True if the most recent keydown event was for alt (option) or meta (command). */
	private _lastKeyDownWasAltOrMeta;
	private _shouldUpdateFocusOnMouseEvent;
	private _gotMouseMove;
	private _mounted;
	private _adjustedFocusZoneProps;
	private _classNames;
	constructor(props: IContextualMenuProps);
	dismiss: (ev?: any, dismissAll?: boolean) => void;
	componentWillUpdate(newProps: IContextualMenuProps): void;
	componentWillMount(): void;
	componentDidMount(): void;
	componentWillUnmount(): void;
	render(): JSX.Element | null;
	private _onMenuOpened;
	private _onMenuClosed;
	/**
	 * Gets the focusZoneDirection by using the arrowDirection if specified,
	 * the direction specificed in the focusZoneProps, or defaults to FocusZoneDirection.vertical
	 */
	private _getFocusZoneDirection;
	private _onRenderSubMenu;
	private _onRenderMenuList;
	private _renderMenuItem;
	private _renderSectionItem;
	private _renderListItem;
	private _renderSeparator;
	private _renderNormalItem;
	private _renderHeaderMenuItem;
	private _renderAnchorMenuItem;
	private _renderButtonItem;
	private _renderSplitButton;
	private _onKeyDown;
	private _shouldHandleKeyDown;
	private _onMenuFocusCapture;
	private _onKeyUp;
	/**
	 * We close the menu on key up only if ALL of the following are true:
	 * - Most recent key down was alt or meta (command)
	 * - The alt/meta key down was NOT followed by some other key (such as down/up arrow to
	 *   expand/collapse the menu)
	 * - We're not on a Mac (or iOS)
	 *
	 * This is because on Windows, pressing alt moves focus to the application menu bar or similar,
	 * closing any open context menus. There is not a similar behavior on Macs.
	 */
	private _shouldHandleKeyUp;
	/**
	 * Returns true if the key for the event is alt (Mac option) or meta (Mac command).
	 */
	private _isAltOrMeta;
	/**
	 * Calls `shouldHandleKey` to determine whether the keyboard event should be handled;
	 * if so, stops event propagation and dismisses menu(s).
	 * @param ev The keyboard event.
	 * @param shouldHandleKey Returns whether we should handle this keyboard event.
	 * @param dismissAllMenus If true, dismiss all menus. Otherwise, dismiss only the current menu.
	 * Only does anything if `shouldHandleKey` returns true.
	 * @returns Whether the event was handled.
	 */
	private _keyHandler;
	/**
	 * Checks if the submenu should be closed
	 */
	private _shouldCloseSubMenu;
	private _onMenuKeyDown;
	/**
	 * Scroll handler for the callout to make sure the mouse events
	 * for updating focus are not interacting during scroll
	 */
	private _onScroll;
	private _onItemMouseEnterBase;
	private _onItemMouseMoveBase;
	private _shouldIgnoreMouseEvent;
	private _onMouseItemLeave;
	/**
	 * Handles updating focus when mouseEnter or mouseMove fire.
	 * As part of updating focus, This function will also update
	 * the expand/collapse state accordingly.
	 */
	private _updateFocusOnMouseEvent;
	private _onItemMouseDown;
	private _onItemClick;
	private _onItemClickBase;
	private _onAnchorClick;
	private _executeItemClick;
	private _onItemKeyDown;
	private _cancelSubMenuTimer;
	private _onItemSubMenuExpand;
	private _getSubmenuProps;
	private _findItemByKey;
	/**
	 * Returns the item that mathes a given key if any.
	 * @param key The key of the item to match
	 * @param items The items to look for the key
	 */
	private _findItemByKeyFromItems;
	/**
	 * This function is called ASYNCHRONOUSLY, and so there is a chance it is called
	 * after the component is unmounted. The _mounted property is added to prevent
	 * from calling setState() after unmount. Do NOT copy this pattern in synchronous
	 * code.
	 */
	private _onSubMenuDismiss;
	private _setTargetWindowAndElement;
	private _getSubMenuId;
	private _onPointerAndTouchEvent;
}
/**
 * ContextualMenuItem description
 */
export declare const ContextualMenuItem: (props: IContextualMenuItemProps) => JSX.Element;
export declare class ContextualMenuItemBase extends BaseComponent<IContextualMenuItemProps, {}> {
	render(): JSX.Element;
	openSubMenu: () => void;
	dismissSubMenu: () => void;
	dismissMenu: (dismissAll?: boolean) => void;
}
/**
 * This class is deprecated. Use the individual *Button components instead.
 * @deprecated Use the individual *Button components instead.
 */
export declare class Button extends BaseComponent<IButtonProps, {}> {
	/**
	 * Set this BaseComponent._skipComponentRefResolution to true, bypassing resolution of componentRef.
	 */
	protected _skipComponentRefResolution: boolean;
	constructor(props: IButtonProps);
	render(): JSX.Element;
}
export interface IButtonClassNames {
	root?: string;
	flexContainer?: string;
	textContainer?: string;
	icon?: string;
	label?: string;
	menuIcon?: string;
	description?: string;
	screenReaderText?: string;
}
export interface ISplitButtonClassNames {
	root?: string;
	icon?: string;
	splitButtonContainer?: string;
	flexContainer?: string;
	divider?: string;
}
export interface IButton {
	/**
	 * Sets focus to the button.
	 */
	focus: () => void;
	/**
	 * If there is a menu associated with this button and it is visible, this will dismiss the menu
	 */
	dismissMenu: () => void;
	/**
	 * If there is a menu associated with this button and it is visible, this will open the menu.
	 * Params are optional overrides to the ones defined in 'menuProps' to apply to just this instance of opening the menu.
	 *
	 * @param shouldFocusOnContainer - override to the ContextualMenu shouldFocusOnContainer prop.
	 * BaseButton implementation defaults to 'undefined'.
	 * @param shouldFocusOnMount - override to the ContextualMenu shouldFocusOnMount prop. BaseButton implementation defaults to 'true'.
	 */
	openMenu: (shouldFocusOnContainer?: boolean, shouldFocusOnMount?: boolean) => void;
}
export interface IButtonProps extends React.AllHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button> {
	/**
	 * Optional callback to access the IButton interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IButton>;
	/**
	 * If provided, this component will be rendered as an anchor.
	 * @defaultvalue ElementType.anchor
	 */
	href?: string;
	/**
	 * Changes the visual presentation of the button to be emphasized (if defined)
	 * @defaultvalue false
	 */
	primary?: boolean;
	/**
	 * Unique id to identify the item. Typically a duplicate of key value.
	 */
	uniqueId?: string | number;
	/**
	 * Whether the button is disabled
	 */
	disabled?: boolean;
	/**
	 * Whether the button can have focus in disabled mode
	 */
	allowDisabledFocus?: boolean;
	/**
	 * If set to true and if this is a splitButton (split == true) then the primary action of a split button is disabled.
	 */
	primaryDisabled?: boolean;
	/**
	 * Custom styling for individual elements within the button DOM.
	 */
	styles?: IButtonStyles;
	/**
	 * Theme provided by HOC.
	 */
	theme?: ITheme;
	/**
	 * Whether the button is checked
	 */
	checked?: boolean;
	/**
	 * Whether button is a toggle button with distinct on and off states. This should be true for buttons that permanently
	 * change state when a press event finishes, such as a volume mute button.
	 */
	toggle?: boolean;
	/**
	 * If provided, additional class name to provide on the root element.
	 */
	className?: string;
	/**
	 * The aria label of the button for the benefit of screen readers.
	 */
	ariaLabel?: string;
	/**
	 * Detailed description of the button for the benefit of screen readers.
	 *
	 * Besides the compound button, other button types will need more information provided to screen reader.
	 */
	ariaDescription?: string;
	/**
	 * If provided and is true it adds an 'aria-hidden' attribute instructing screen readers to ignore the element.
	 */
	ariaHidden?: boolean;
	/**
	 * Text to render button label. If text is supplied, it will override any string in button children.
	 * Other children components will be passed through after the text.
	 */
	text?: string;
	/**
	 * The props for the icon shown in the button.
	 */
	iconProps?: IIconProps;
	/**
	 * Props for button menu. Providing this will default to showing the menu icon. See menuIconProps for overriding
	 * how the default icon looks. Providing this in addition of onClick and setting the split property to true will render a SplitButton.
	 */
	menuProps?: IContextualMenuProps;
	/**
	 * Callback that runs after Button's contextualmenu was closed (removed from the DOM)
	 */
	onAfterMenuDismiss?: () => void;
	/**
	 * If set to true, and if menuProps and onClick are provided, the button will render as a SplitButton. Defaults to false.
	 */
	split?: boolean;
	/**
	 * The props for the icon shown when providing a menu dropdown.
	 */
	menuIconProps?: IIconProps;
	/**
	 * Accessible label for the dropdown chevron button if this button is split.
	 */
	splitButtonAriaLabel?: string;
	/**
	 * Optional callback when menu is clicked.
	 */
	onMenuClick?: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, button?: IButtonProps) => void;
	/**
	 * Custom render function for the icon
	 */
	onRenderIcon?: IRenderFunction<IButtonProps>;
	/**
	 * Custom render function for the label text.
	 */
	onRenderText?: IRenderFunction<IButtonProps>;
	/**
	 * Custom render function for the desciption text.
	 */
	onRenderDescription?: IRenderFunction<IButtonProps>;
	/**
	 * Custom render function for the aria description element.
	 */
	onRenderAriaDescription?: IRenderFunction<IButtonProps>;
	/**
	 * Custom render function for rendering the button children.
	 */
	onRenderChildren?: IRenderFunction<IButtonProps>;
	/**
	 * Custom render function for button menu icon
	 */
	onRenderMenuIcon?: IRenderFunction<IButtonProps>;
	/**
	 * Deprecated at v6.3.2, to be removed at \>= v7.0.0. Use `menuAs` instead.
	 * @deprecated Use `menuAs` instead.
	 */
	onRenderMenu?: IRenderFunction<IContextualMenuProps>;
	/**
	 * Render a custom menu in place of the normal one.
	 */
	menuAs?: IComponentAs<IContextualMenuProps>;
	/**
	 * Description of the action this button takes.
	 * Only used for compound buttons
	 */
	secondaryText?: string;
	/**
	 * Deprecated at v1.2.3, to be removed at \>= v2.0.0. Use specific button component instead.
	 * @defaultvalue ButtonType.default
	 * @deprecated Use specific button component instead.
	 */
	buttonType?: ButtonType;
	/**
	 * Deprecated at v0.56.2, to be removed at \>= v1.0.0. Just pass in button props instead.
	 * they will be mixed into the button/anchor element rendered by the component.
	 * @deprecated Use button props instead.
	 */
	rootProps?: React.ButtonHTMLAttributes<HTMLButtonElement> | React.AnchorHTMLAttributes<HTMLAnchorElement>;
	/**
	 * Any custom data the developer wishes to associate with the menu item.
	 * Deprecated, use `checked` if setting state.
	 * @deprecated unused, use `checked` if setting state.
	 */
	toggled?: boolean;
	/**
	 * Any custom data the developer wishes to associate with the menu item.
	 */
	data?: any;
	/**
	 * Method to provide the classnames to style a button.
	 * The default value for this prop is the getClassnames func
	 * defined in BaseButton.classnames.
	 * @defaultvalue getBaseButtonClassNames
	 */
	getClassNames?: (theme: ITheme, className: string, variantClassName: string, iconClassName: string | undefined, menuIconClassName: string | undefined, disabled: boolean, checked: boolean, expanded: boolean, isSplit: boolean | undefined, allowDisabledFocus: boolean) => IButtonClassNames;
	/**
	 * Method to provide the classnames to style a button.
	 * The default value for this prop is the getClassnames func
	 * defined in BaseButton.classnames.
	 * @defaultvalue getBaseSplitButtonClassNames
	 */
	getSplitButtonClassNames?: (disabled: boolean, expanded: boolean, checked: boolean, allowDisabledFocus: boolean) => ISplitButtonClassNames;
	/**
	 * Provides a custom KeyCode that can be used to open the button menu.
	 * The default KeyCode is the down arrow. A value of null can be provided to disable the key codes for opening the button menu.
	 */
	menuTriggerKeyCode?: KeyCodes | null;
	/**
	 * Optional keytip for this button
	 */
	keytipProps?: IKeytipProps;
	/**
	 * Menu will not be created or destroyed when opened or closed, instead it
	 * will be hidden. This will improve perf of the menu opening but could potentially
	 * impact overall perf by having more elemnts in the dom. Should only be used
	 * when perf is important.
	 * Note: This may increase the amount of time it takes for the button itself to mount.
	 */
	persistMenu?: boolean;
	/**
	 * Style for the description text if applicable (for compound buttons.)
	 * Deprecated, use `secondaryText` instead.
	 * @deprecated Use `secondaryText` instead.
	 */
	description?: IStyle;
}
export declare enum ElementType {
	/** <button> element. */
	button = 0,
	/** <a> element. */
	anchor = 1
}
export declare enum ButtonType {
	normal = 0,
	primary = 1,
	hero = 2,
	compound = 3,
	command = 4,
	icon = 5,
	default = 6
}
export interface IButtonStyles {
	/**
	 * Style for the root element in the default enabled, non-toggled state.
	 */
	root?: IStyle;
	/**
	 * Style override for the root element in a checked state, layered on top of the root style.
	 */
	rootChecked?: IStyle;
	/**
	 * Style override for the root element in a disabled state, layered on top of the root style.
	 */
	rootDisabled?: IStyle;
	/**
	 * Style override applied to the root on hover in the default, enabled, non-toggled state.
	 */
	rootHovered?: IStyle;
	/**
	 * Style override applied to the root on focus in the default, enabled, non-toggled state.
	 */
	rootFocused?: IStyle;
	/**
	 * Style override applied to the root on pressed in the default, enabled, non-toggled state.
	 */
	rootPressed?: IStyle;
	/**
	 * Style override applied to the root on when menu is expanded in the default, enabled, non-toggled state.
	 */
	rootExpanded?: IStyle;
	/**
	 * Style override applied to the root on hover in a checked, enabled state
	 */
	rootCheckedHovered?: IStyle;
	/**
	 * Style override applied to the root on pressed in a checked, enabled state
	 */
	rootCheckedPressed?: IStyle;
	/**
	 * Style override applied to the root on hover in a checked, disabled state
	 */
	rootCheckedDisabled?: IStyle;
	/**
	 * Style override applied to the root on hover in a expanded state on hover
	 */
	rootExpandedHovered?: IStyle;
	/**
	 * Style for the flexbox container within the root element.
	 */
	flexContainer?: IStyle;
	/**
	 * Style for the text container within the flexbox container element (and contains the text and description).
	 */
	textContainer?: IStyle;
	/**
	 * Style for the icon on the near side of the label.
	 */
	icon?: IStyle;
	/**
	 * Style for the icon on the near side of the label on hover.
	 */
	iconHovered?: IStyle;
	/**
	 * Style for the icon on the near side of the label when pressed.
	 */
	iconPressed?: IStyle;
	/**
	 * Style for the icon on the near side of the label when expanded.
	 */
	iconExpanded?: IStyle;
	/**
	 * Style for the icon on the near side of the label when expanded and hovered.
	 */
	iconExpandedHovered?: IStyle;
	/**
	 * Style override for the icon when the button is disabled.
	 */
	iconDisabled?: IStyle;
	/**
	 * Style override for the icon when the button is checked.
	 */
	iconChecked?: IStyle;
	/**
	 * Style for the text content of the button.
	 */
	label?: IStyle;
	/**
	 * Style override for the text content when the button is hovered.
	 */
	labelHovered?: IStyle;
	/**
	 * Style override for the text content when the button is disabled.
	 */
	labelDisabled?: IStyle;
	/**
	 * Style override for the text content when the button is checked.
	 */
	labelChecked?: IStyle;
	/**
	 * Style for the menu chevron.
	 */
	menuIcon?: IStyle;
	/**
	 * Style for the menu chevron on hover.
	 */
	menuIconHovered?: IStyle;
	/**
	 * Style for the menu chevron when pressed.
	 */
	menuIconPressed?: IStyle;
	/**
	 * Style for the menu chevron when expanded.
	 */
	menuIconExpanded?: IStyle;
	/**
	 * Style for the menu chevron when expanded and hovered.
	 */
	menuIconExpandedHovered?: IStyle;
	/**
	 * Style override for the menu chevron when the button is disabled.
	 */
	menuIconDisabled?: IStyle;
	/**
	 * Style override for the menu chevron when the button is checked.
	 */
	menuIconChecked?: IStyle;
	/**
	 * Style for the description text if applicable (for compound buttons.)
	 */
	description?: IStyle;
	/**
	 * Style for the description text if applicable (for compound buttons.)
	 */
	secondaryText?: IStyle;
	/**
	 * Style override for the description text when the button is hovered.
	 */
	descriptionHovered?: IStyle;
	/**
	 * Style for the description text when the button is pressed.
	 */
	descriptionPressed?: IStyle;
	/**
	 * Style override for the description text when the button is disabled.
	 */
	descriptionDisabled?: IStyle;
	/**
	 * Style override for the description text when the button is checked.
	 */
	descriptionChecked?: IStyle;
	/**
	 * Style override for the screen reader text.
	 */
	screenReaderText?: IStyle;
	/**
	 * Style override for the container div around a SplitButton element
	 */
	splitButtonContainer?: IStyle;
	/**
	 * Style for container div around a SplitButton element when the button is hovered.
	 */
	splitButtonContainerHovered?: IStyle;
	/**
	 * Style for container div around a SplitButton element when the button is focused.
	 */
	splitButtonContainerFocused?: IStyle;
	/**
	 * Style for container div around a SplitButton element when the button is checked.
	 */
	splitButtonContainerChecked?: IStyle;
	/**
	 * Style for container div around a SplitButton element when the button is checked and hovered.
	 */
	splitButtonContainerCheckedHovered?: IStyle;
	/**
	 * Style override for the container div around a SplitButton element in a disabled state
	 */
	splitButtonContainerDisabled?: IStyle;
	/**
	 * Style override for the divider element that appears between the button and menu button
	 * for a split button.
	 */
	splitButtonDivider?: IStyle;
	/**
	 * Style override for the SplitButton menu button
	 */
	splitButtonMenuButton?: IStyle;
	/**
	 * Style override for the SplitButton menu button element in a disabled state.
	 */
	splitButtonMenuButtonDisabled?: IStyle;
	/**
	 * Style override for the SplitButton menu button element in a checked state
	 */
	splitButtonMenuButtonChecked?: IStyle;
	/**
	 * Style override for the SplitButton menu button element in an expanded state
	 */
	splitButtonMenuButtonExpanded?: IStyle;
	/**
	 * Style override for the SplitButton menu icon element
	 */
	splitButtonMenuIcon?: IStyle;
	/**
	 * Style override for the SplitButton menu icon element in a disabled state
	 */
	splitButtonMenuIconDisabled?: IStyle;
	/**
	 * Style override for the SplitButton FlexContainer.
	 */
	splitButtonFlexContainer?: IStyle;
}
export interface IBaseButtonProps extends IButtonProps {
	baseClassName?: string;
	variantClassName?: string;
}
export interface IBaseButtonState {
	menuProps?: IContextualMenuProps | null;
}
export declare class BaseButton extends BaseComponent<IBaseButtonProps, IBaseButtonState> implements IButton {
	private readonly _isSplitButton;
	private readonly _isExpanded;
	static defaultProps: Partial<IBaseButtonProps>;
	private _buttonElement;
	private _splitButtonContainer;
	private _labelId;
	private _descriptionId;
	private _ariaDescriptionId;
	private _classNames;
	private _processingTouch;
	private _lastTouchTimeoutId;
	constructor(props: IBaseButtonProps, rootClassName: string);
	render(): JSX.Element;
	componentDidMount(): void;
	componentDidUpdate(prevProps: IBaseButtonProps, prevState: IBaseButtonState): void;
	focus(): void;
	dismissMenu(): void;
	openMenu(shouldFocusOnContainer?: boolean, shouldFocusOnMount?: boolean): void;
	private _onRenderContent;
	private _onRenderIcon;
	private _onRenderTextContents;
	private _onRenderText;
	private _hasText;
	private _onRenderChildren;
	private _onRenderDescription;
	private _onRenderAriaDescription;
	private _onRenderMenuIcon;
	private _onRenderMenu;
	private _dismissMenu;
	private _openMenu;
	private _onToggleMenu;
	private _onRenderSplitButtonContent;
	private _onSplitContainerFocusCapture;
	private _onSplitButtonPrimaryClick;
	private _onRenderSplitButtonDivider;
	private _onRenderSplitButtonMenuButton;
	private _onKeyDown;
	private _onKeyUp;
	private _onKeyPress;
	private _onMouseUp;
	private _onMouseDown;
	private _onClick;
	private _onSplitButtonContainerKeyDown;
	private _onMenuKeyDown;
	private _onTouchStart;
	private _onPointerDown;
	private _handleTouchAndPointerEvent;
	/**
	 * Returns if the user hits a valid keyboard key to open the menu
	 * @param ev - the keyboard event
	 * @returns True if user clicks on custom trigger key if enabled or alt + down arrow if not. False otherwise.
	 */
	private _isValidMenuOpenKey;
	private _onMenuClick;
}
export declare class ActionButton extends BaseComponent<IButtonProps, {}> {
	/**
	 * Tell BaseComponent to bypass resolution of componentRef.
	 */
	protected _skipComponentRefResolution: boolean;
	render(): JSX.Element;
}
export declare class CommandBarButton extends BaseComponent<IButtonProps, {}> {
	/**
	 * Tell BaseComponent to bypass resolution of componentRef.
	 */
	protected _skipComponentRefResolution: boolean;
	render(): JSX.Element;
}
export declare const CommandButton: typeof ActionButton;
export declare class CompoundButton extends BaseComponent<IButtonProps, {}> {
	/**
	 * Tell BaseComponent to bypass resolution of componentRef.
	 */
	protected _skipComponentRefResolution: boolean;
	render(): JSX.Element;
}
export declare class DefaultButton extends BaseComponent<IButtonProps, {}> {
	/**
	 * Tell BaseComponent to bypass resolution of componentRef.
	 */
	protected _skipComponentRefResolution: boolean;
	render(): JSX.Element;
}
export declare class MessageBarButton extends BaseComponent<IButtonProps, {}> {
	render(): JSX.Element;
}
export declare class PrimaryButton extends BaseComponent<IButtonProps, {}> {
	/**
	 * Set this BaseComponent._skipComponentRefResolution to true, bypassing resolution of componentRef.
	 */
	protected _skipComponentRefResolution: boolean;
	render(): JSX.Element;
}
export declare class IconButton extends BaseComponent<IButtonProps, {}> {
	/**
	 * Tell BaseComponent to bypass resolution of componentRef.
	 */
	protected _skipComponentRefResolution: boolean;
	render(): JSX.Element;
}
/**
 * The days of the week
 */
export declare enum DayOfWeek {
	Sunday = 0,
	Monday = 1,
	Tuesday = 2,
	Wednesday = 3,
	Thursday = 4,
	Friday = 5,
	Saturday = 6
}
/**
 * First week of the year settings types
 */
export declare enum FirstWeekOfYear {
	FirstDay = 0,
	FirstFullWeek = 1,
	FirstFourDayWeek = 2
}
/**
 * The supported date range types
 */
export declare enum DateRangeType {
	Day = 0,
	Week = 1,
	Month = 2,
	WorkWeek = 3
}
export interface ICalendar {
	/** Sets focus to the selected date. */
	focus: () => void;
}
export interface ICalendarProps extends IBaseProps<ICalendar>, React.HTMLAttributes<HTMLElement> {
	/**
	 * Optional callback to access the ICalendar interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<ICalendar>;
	/**
	 * Optional class name to add to the root element.
	 */
	className?: string;
	/**
	 * Callback issued when a date is selected
	 * @param date - The date the user selected
	 * @param selectedDateRangeArray - The resultant list of dates that are selected based on the date range type set for the component.
	 */
	onSelectDate?: (date: Date, selectedDateRangeArray?: Date[]) => void;
	/**
	 * Callback issued when calendar is closed
	 */
	onDismiss?: () => void;
	/**
	 * Whether the month picker is shown beside the day picker or hidden.
	 * @defaultvalue true
	 */
	isMonthPickerVisible?: boolean;
	/**
	 * Whether the day picker is shown beside the month picker or hidden.
	 * @defaultvalue true
	 */
	isDayPickerVisible?: boolean;
	/**
	 * Show month picker on top of date picker when visible.
	 * @defaultvalue false
	 */
	showMonthPickerAsOverlay?: boolean;
	/**
	 * Value of today. If null, current time in client machine will be used.
	 */
	today?: Date;
	/**
	 * Default value of the Calendar, if any
	 */
	value?: Date;
	/**
	 * The first day of the week for your locale.
	 * @defaultvalue DayOfWeek.Sunday
	 */
	firstDayOfWeek?: DayOfWeek;
	/**
	 * The date range type indicating how  many days should be selected as the user
	 * selects days
	 * @defaultvalue DateRangeType.Day
	 */
	dateRangeType?: DateRangeType;
	/**
	 * Whether the month view should automatically navigate to the next or previous date range
	 * depending on the selected date. If this property is set to true and the currently displayed
	 * month is March 2017, if the user clicks on a day outside the month, i.e., April 1st, the
	 * picker will automatically navigate to the month of April.
	 * @defaultvalue false
	 */
	autoNavigateOnSelection?: boolean;
	/**
	 * Whether the "Go to today" link should be shown or not
	 */
	showGoToToday?: boolean;
	/**
	 * This property has been removed at 0.80.0 in place of the `focus` method, to be removed \@ 1.0.0.
	 * @deprecated Replaced with the `focus` method.
	 */
	shouldFocusOnMount?: boolean;
	/**
	 * Localized strings to use in the Calendar
	 */
	strings: ICalendarStrings | null;
	/**
	 * Whether the month picker should highlight the current month
	 * @defaultvalue false
	 */
	highlightCurrentMonth?: boolean;
	/**
	 * Whether the month picker should highlight the selected month
	 * @defaultvalue false
	 */
	highlightSelectedMonth?: boolean;
	/**
	 * Customize navigation icons using ICalendarIconStrings
	 */
	navigationIcons?: ICalendarIconStrings;
	/**
	 * Whether the calendar should show the week number (weeks 1 to 53) before each week row
	 * @defaultvalue false
	 */
	showWeekNumbers?: boolean;
	/**
	 * Defines when the first week of the year should start, FirstWeekOfYear.FirstDay,
	 * FirstWeekOfYear.FirstFullWeek or FirstWeekOfYear.FirstFourDayWeek are the possible values
	 * @defaultvalue FirstWeekOfYear.FirstDay
	 */
	firstWeekOfYear?: FirstWeekOfYear;
	/**
	 * Apply additional formating to dates, for example localized date formatting.
	 */
	dateTimeFormatter?: ICalendarFormatDateCallbacks;
	/**
	 * If set the Calendar will not allow navigation to or selection of a date earlier than this value.
	 */
	minDate?: Date;
	/**
	 * If set the Calendar will not allow navigation to or selection of a date later than this value.
	 */
	maxDate?: Date;
	/**
	 * If set the Calendar will not allow selection of dates in this array.
	 */
	restrictedDates?: Date[];
	/**
	 * Whether the calendar should show 6 weeks by default.
	 * @defaultvalue false
	 */
	showSixWeeksByDefault?: boolean;
	/**
	 * The days that are selectable when dateRangeType is WorkWeek. If dateRangeType is not WorkWeek this property does nothing.
	 * @defaultvalue [Monday,Tuesday,Wednesday,Thursday,Friday]
	 */
	workWeekDays?: DayOfWeek[];
	/**
	 * When clicking on "Today", select the date and close the calendar.
	 * @defaultvalue false
	 */
	selectDateOnClick?: boolean;
	/**
	 * Whether the close button should be shown or not
	 * @defaultvalue false
	 */
	showCloseButton?: boolean;
	/**
	 * Allows all dates and buttons to be focused, including disabled ones
	 * @defaultvalue false
	 */
	allFocusable?: boolean;
	/**
	 * Whether the year picker is enabled
	 * @defaultvalue false
	 */
	yearPickerHidden?: boolean;
}
export interface ICalendarStrings {
	/**
	 * An array of strings for the full names of months.
	 * The array is 0-based, so months[0] should be the full name of January.
	 */
	months: string[];
	/**
	 * An array of strings for the short names of months.
	 * The array is 0-based, so shortMonths[0] should be the short name of January.
	 */
	shortMonths: string[];
	/**
	 * An array of strings for the full names of days of the week.
	 * The array is 0-based, so days[0] should be the full name of Sunday.
	 */
	days: string[];
	/**
	 * An array of strings for the initials of the days of the week.
	 * The array is 0-based, so days[0] should be the initial of Sunday.
	 */
	shortDays: string[];
	/**
	 * String to render for button to direct the user to today's date.
	 */
	goToToday: string;
	/**
	 * Aria-label for the "previous month" button.
	 */
	prevMonthAriaLabel?: string;
	/**
	 * Aria-label for the "next month" button.
	 */
	nextMonthAriaLabel?: string;
	/**
	 * Aria-label for the "previous year" button.
	 */
	prevYearAriaLabel?: string;
	/**
	 * Aria-label for the "next year" button.
	 */
	nextYearAriaLabel?: string;
	/**
	 * Aria-label for the "close" button.
	 */
	closeButtonAriaLabel?: string;
	/**
	 * Aria-label format string for the week number header. Should have 1 string param e.g. "week number \{0\}"
	 */
	weekNumberFormatString?: string;
}
export interface ICalendarIconStrings {
	/**
	 * FabricMDL2Icons name for the left navigation icon.  Previous default: ChevronLeft.
	 * @defaultvalue 'Up'
	 */
	leftNavigation?: string;
	/**
	 * FabricMDL2Icons name for the right navigation icon.  Previous default: ChevronRight.
	 * @defaultvalue 'Down'
	 */
	rightNavigation?: string;
	/**
	 * Close icon
	 * @defaultvalue 'CalculatorMultiply'
	 */
	closeIcon?: string;
}
export interface ICalendarFormatDateCallbacks {
	/**
	 * Callback to apply formatting to mmmm d, yyyy formated dates
	 */
	formatMonthDayYear: (date: Date, strings?: ICalendarStrings) => string;
	/**
	 * Callback to apply formatting to the month and year in the Day Picker header
	 */
	formatMonthYear: (date: Date, strings?: ICalendarStrings) => string;
	/**
	 * Callback to apply formatting to the days in the Day Picker calendar
	 */
	formatDay: (date: Date) => string;
	/**
	 * Callback to apply formatting to the year in the Month Picker header
	 */
	formatYear: (date: Date) => string;
}
export interface ICalendarState {
	/** The currently focused date in the day picker, but not necessarily selected */
	navigatedDayDate?: Date;
	/** The currently focused date in the month picker, but not necessarily selected */
	navigatedMonthDate?: Date;
	/** The currently selected date in the calendar */
	selectedDate?: Date;
	/** State used to show/hide month picker */
	isMonthPickerVisible?: boolean;
	/** State used to show/hide day picker */
	isDayPickerVisible?: boolean;
}
export declare class Calendar extends BaseComponent<ICalendarProps, ICalendarState> implements ICalendar {
	static defaultProps: ICalendarProps;
	private _dayPicker;
	private _monthPicker;
	private _focusOnUpdate;
	constructor(props: ICalendarProps);
	componentWillReceiveProps(nextProps: ICalendarProps): void;
	componentDidUpdate(): void;
	render(): JSX.Element;
	focus(): void;
	private _navigateDayPickerDay;
	private _navigateMonthPickerDay;
	private _onNavigateDayDate;
	private _onNavigateMonthDate;
	private _onSelectDate;
	private _onHeaderSelect;
	private _onGotoToday;
	private _onGotoTodayClick;
	private _onGotoTodayKeyDown;
	private _onDatePickerPopupKeyDown;
	private _handleEscKey;
}
export declare class CheckBase extends BaseComponent<ICheckProps, {}> {
	static defaultProps: ICheckProps;
	shouldComponentUpdate(newProps: ICheckProps): boolean;
	render(): JSX.Element;
}
export interface ICheckProps extends React.ClassAttributes<CheckBase> {
	/**
	 * Gets the component ref.
	 */
	componentRef?: IRefObject<ICheckProps>;
	/**
	 * Whether or not this menu item is currently checked.
	 * @defaultvalue false
	 */
	checked?: boolean;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules
	 */
	styles?: IStyleFunctionOrObject<ICheckStyleProps, ICheckStyles>;
	/**
	 * Flag to always show the check icon. Not currently working.
	 */
	alwaysShowCheck?: boolean;
	/**
	 * Theme provided by HOC.
	 */
	theme?: ITheme;
	/**
	 * Additional css class to apply to the Check
	 * @defaultvalue undefined
	 */
	className?: string;
}
export interface ICheckStyleProps {
	/**
	 * Accept theme prop.
	 */
	theme: ITheme;
	/**
	 * Accept custom classNames
	 */
	className?: string;
	/**
	 * Accept custom checkBox size in pixels.
	 * @defaultvalue '18px'
	 */
	checkBoxHeight?: string;
	checked?: boolean;
}
export interface ICheckStyles {
	/**
	 * Style for the root element.
	 */
	root: IStyle;
	/**
	 * The 'check' icon styles.
	 */
	check: IStyle;
	/**
	 * The 'circle' icon styles.
	 */
	circle: IStyle;
	/**
	 * Check host style
	 */
	checkHost: IStyle;
}
export declare const Check: (props: ICheckProps) => JSX.Element;
/**
 * Checkbox class interface.
 */
export interface ICheckbox {
	/** Gets the current checked state. */
	checked: boolean;
	/** Sets focus to the checkbox. */
	focus: () => void;
}
/**
 * Checkbox properties.
 */
export interface ICheckboxProps extends React.ButtonHTMLAttributes<HTMLElement | HTMLInputElement> {
	/**
	 * Optional callback to access the ICheckbox interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<ICheckbox>;
	/**
	 * Additional class name to provide on the root element, in addition to the ms-Checkbox class.
	 */
	className?: string;
	/**
	 * Checked state. Mutually exclusive to "defaultChecked". Use this if you control the checked state at a higher
	 * level and plan to pass in the correct value based on handling onChange events and re-rendering.
	 */
	checked?: boolean;
	/**
	 * Default checked state. Mutually exclusive to "checked". Use this if you want an uncontrolled component, and
	 * want the Checkbox instance to maintain its own state.
	 */
	defaultChecked?: boolean;
	/**
	 * Label to display next to the checkbox.
	 */
	label?: string;
	/**
	 * Disabled state of the checkbox.
	 */
	disabled?: boolean;
	/**
	 * Callback that is called when the checked value has changed.
	 */
	onChange?: (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => void;
	/**
	 * Optional input props that will be mixed into the input element, *before* other props are applied. This allows
	 * you to extend the input element with additional attributes, such as data-automation-id needed for automation.
	 * Note that if you provide, for example, "disabled" as well as "inputProps.disabled", the former will take
	 * precedence over the later.
	 */
	inputProps?: React.ButtonHTMLAttributes<HTMLElement | HTMLButtonElement>;
	/**
	 * Allows you to set the checkbox to be at the before (start) or after (end) the label.
	 * @defaultvalue 'start'
	 */
	boxSide?: 'start' | 'end';
	/**
	 * Theme provided by HOC.
	 */
	theme?: ITheme;
	/**
	 * Accessible label for the checkbox.
	 */
	ariaLabel?: string;
	/**
	 * ID for element that contains label information for the checkbox.
	 */
	ariaLabelledBy?: string;
	/**
	 * ID for element that provides extended information for the checkbox.
	 */
	ariaDescribedBy?: string;
	/**
	 * The position in the parent set (if in a set) for aria-posinset.
	 */
	ariaPositionInSet?: number;
	/**
	 * The total size of the parent set (if in a set) for aria-setsize.
	 */
	ariaSetSize?: number;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<ICheckboxStyleProps, ICheckboxStyles>;
	/**
	 * Custom render function for the label.
	 */
	onRenderLabel?: IRenderFunction<ICheckboxProps>;
	/**
	 * Custom icon props for the check mark rendered by the checkbox
	 */
	checkmarkIconProps?: IIconProps;
	/**
	 * Optional keytip for this checkbox
	 */
	keytipProps?: IKeytipProps;
}
export interface ICheckboxStyleProps {
	theme: ITheme;
	className?: string;
	disabled?: boolean;
	checked?: boolean;
	reversed?: boolean;
	isUsingCustomLabelRender: boolean;
}
export interface ICheckboxStyles {
	/**
	 * Style for the root element (a button) of the checkbox component in the default enabled/unchecked state.
	 */
	root?: IStyle;
	/**
	 * INTERNAL: This is mostly an internal implementation detail which you should avoid styling.
	 * This refers to the <input type="checkbox"> element that is typically hidden and not rendered on screen.
	 */
	input?: IStyle;
	/**
	 * Style for the label part (contains the customized checkbox + text) when enabled.
	 */
	label?: IStyle;
	/**
	 * Style for checkbox in its default unchecked/enabled state.
	 */
	checkbox?: IStyle;
	/**
	 * Style for the checkmark in the default enabled/unchecked state.
	 */
	checkmark?: IStyle;
	/**
	 * Style for text appearing with the checkbox in its default enabled state.
	 */
	text?: IStyle;
}
export declare const Checkbox: (props: ICheckboxProps) => JSX.Element;
export interface ICheckboxState {
	/** Is true when Uncontrolled control is checked. */
	isChecked?: boolean;
}
export declare class CheckboxBase extends BaseComponent<ICheckboxProps, ICheckboxState> implements ICheckbox {
	static defaultProps: ICheckboxProps;
	private _checkBox;
	private _id;
	private _classNames;
	/**
	 * Initialize a new instance of the Checkbox
	 * @param props - Props for the component
	 * @param context - Context or initial state for the base component.
	 */
	constructor(props: ICheckboxProps, context?: any);
	componentWillReceiveProps(newProps: ICheckboxProps): void;
	/**
	 * Render the Checkbox based on passed props
	 */
	render(): JSX.Element;
	readonly checked: boolean;
	focus(): void;
	private _onFocus;
	private _onBlur;
	private _onChange;
	private _onRenderLabel;
}
export interface IChoiceGroup {
	/**
	 * Sets focus to the choiceGroup.
	 */
	focus: () => void;
}
export interface IChoiceGroupProps extends React.InputHTMLAttributes<HTMLElement | HTMLInputElement> {
	/**
	 * Optional callback to access the IChoiceGroup interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IChoiceGroup>;
	/**
	 * The options for the choice group.
	 */
	options?: IChoiceGroupOption[];
	/**
	 * The key of the option that will be initially checked.
	 */
	defaultSelectedKey?: string | number;
	/**
	 * The key of the selected option. If you provide this, you must maintain selection
	 * state by observing onChange events and passing a new value in when changed.
	 */
	selectedKey?: string | number;
	/**
	 * A callback for receiving a notification when the choice has been changed.
	 */
	onChange?: (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => void;
	/**
	 * Descriptive label for the choice group.
	 */
	label?: string;
	/**
	 * Deprecated and will be removed by 07/17/2017. Use `onChange` instead.
	 * @deprecated Use `onChange` instead.
	 */
	onChanged?: (option: IChoiceGroupOption, evt?: React.FormEvent<HTMLElement | HTMLInputElement>) => void;
	/**
	 * Theme (provided through customization.)
	 */
	theme?: ITheme;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<IChoiceGroupStyleProps, IChoiceGroupStyles>;
	/**
	 * Aria labelled by prop for the ChoiceGroup itself
	 */
	ariaLabelledBy?: string;
}
export interface IChoiceGroupOption extends React.HTMLAttributes<HTMLElement | HTMLInputElement> {
	/**
	 * A required key to uniquely identify the option.
	 */
	key: string;
	/**
	 * The text string for the option.
	 */
	text: string;
	/**
	 * Optional override of option render
	 */
	onRenderField?: IRenderFunction<IChoiceGroupOption>;
	/**
	 * Optional override of label render
	 */
	onRenderLabel?: (option: IChoiceGroupOption) => JSX.Element;
	/**
	 * The Icon component props for choice field
	 */
	iconProps?: IIconProps;
	/**
	 * The src of image for choice field.
	 */
	imageSrc?: string;
	/**
	 * The alt of image for choice field. Defaults to '' if not set.
	 */
	imageAlt?: string;
	/**
	 * The src of image for choice field which is selected.
	 */
	selectedImageSrc?: string;
	/**
	 * The width and height of the image in px for choice field.
	 * @defaultvalue \{ width: 32, height: 32 \}
	 */
	imageSize?: {
		width: number;
		height: number;
	};
	/**
	 * Whether or not the option is disabled.
	 */
	disabled?: boolean;
	/**
	 * Whether or not the option is checked.
	 */
	checked?: boolean;
	/**
	 * DOM id to tag the ChoiceGroup input with, for reference.
	 * Should be used for 'aria-owns' and other such uses, rather than direct reference for programmatic purposes.
	 */
	id?: string;
	/**
	 * DOM id to tag the ChoiceGroup label with, for reference.
	 * Should be used for 'aria-owns' and other such uses, rather than direct reference for programmatic purposes.
	 */
	labelId?: string;
	/**
	 * The aria label of the ChoiceGroupOption for the benefit of screen readers.
	 */
	ariaLabel?: string;
}
export interface IChoiceGroupStyleProps {
	theme: ITheme;
	className?: string;
	optionsContainIconOrImage?: boolean;
}
export interface IChoiceGroupStyles {
	applicationRole?: IStyle;
	root?: IStyle;
	label?: IStyle;
	flexContainer?: IStyle;
}
export declare const ChoiceGroup: (props: IChoiceGroupProps) => JSX.Element;
export interface IChoiceGroupState {
	keyChecked: string | number;
	/** Is true when the control has focus. */
	keyFocused?: string | number;
}
export declare class ChoiceGroupBase extends BaseComponent<IChoiceGroupProps, IChoiceGroupState> implements IChoiceGroup {
	static defaultProps: IChoiceGroupProps;
	private _id;
	private _labelId;
	private _inputElement;
	private focusedVars;
	private changedVars;
	constructor(props: IChoiceGroupProps);
	componentWillReceiveProps(newProps: IChoiceGroupProps): void;
	render(): JSX.Element;
	focus(): void;
	private _onFocus;
	private _onBlur;
	private _onChange;
	private _getKeyChecked;
}
export declare type OnFocusCallback = (ev?: React.FocusEvent<HTMLElement | HTMLInputElement>, props?: IChoiceGroupOption) => void | undefined;
export declare type OnChangeCallback = (evt?: React.FormEvent<HTMLElement | HTMLInputElement>, props?: IChoiceGroupOption) => void;
export interface IChoiceGroupOptionProps extends IChoiceGroupOption {
	/**
	 * Optional callback to access the IChoiceGroup interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IChoiceGroupOption>;
	/**
	 * A callback for receiving a notification when the choice has been changed.
	 */
	onChange?: OnChangeCallback;
	/**
	 * A callback for receiving a notification when the choice has received focus.
	 */
	onFocus?: OnFocusCallback;
	/**
	 * A callback for receiving a notification when the choice has lost focus.
	 */
	onBlur?: (ev: React.FocusEvent<HTMLElement>, props?: IChoiceGroupOption) => void;
	/**
	 * Indicates if the ChoiceGroupOption should appear focused, visually
	 */
	focused?: boolean;
	/**
	 * Theme (provided through customization.)
	 */
	theme?: ITheme;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles>;
	/**
	 * If true, it specifies that an option must be selected in the ChoiceGroup before submitting the form
	 */
	required?: boolean;
	/**
	 * This value is used to group each ChoiceGroupOption into the same logical ChoiceGroup
	 */
	name?: string;
}
export interface IChoiceGroupOptionStyleProps {
	theme: ITheme;
	hasIcon?: boolean;
	hasImage?: boolean;
	checked?: boolean;
	disabled?: boolean;
	imageIsLarge?: boolean;
	focused?: boolean;
}
export interface IChoiceGroupOptionStyles {
	root?: IStyle;
	choiceFieldWrapper?: IStyle;
	input?: IStyle;
	field?: IStyle;
	innerField?: IStyle;
	imageWrapper?: IStyle;
	selectedImageWrapper?: IStyle;
	iconWrapper?: IStyle;
	labelWrapper?: IStyle;
}
export declare const ChoiceGroupOption: (props: IChoiceGroupOptionProps) => JSX.Element;
export interface IPositioningContainer {
}
export interface IPositioningContainerProps extends IBaseProps<IPositioningContainer> {
	/**
	 * All props for your component are to be defined here.
	 */
	componentRef?: IRefObject<IPositioningContainer>;
	/**
	 * The target that the positioningContainer should try to position itself based on.
	 * It can be either an HTMLElement a querySelector string of a valid HTMLElement
	 * or a MouseEvent. If MouseEvent is given then the origin point of the event will be used.
	 */
	target?: HTMLElement | string | MouseEvent | IPoint | null;
	/**
	 * How the element should be positioned
	 * @defaultvalue DirectionalHint.BottomAutoEdge
	 */
	directionalHint?: DirectionalHint;
	/**
	 * How the element should be positioned in RTL layouts.
	 * If not specified, a mirror of `directionalHint` will be used instead
	 */
	directionalHintForRTL?: DirectionalHint;
	/**
	 * The gap between the positioningContainer and the target
	 * @defaultvalue 0
	 */
	offsetFromTarget?: number;
	/**
	 * Custom width for positioningContainer including borders. If value is 0, no width is applied.
	 * @defaultvalue 0
	 */
	positioningContainerWidth?: number;
	/**
	 * The background color of the positioningContainer in hex format ie. #ffffff.
	 * @defaultvalue $ms-color-white
	 */
	backgroundColor?: string;
	/**
	 * The bounding rectangle for which the contextual menu can appear in.
	 */
	bounds?: IRectangle;
	/**
	 * The minimum distance the positioningContainer will be away from the edge of the screen.
	 *  @defaultvalue 8
	 */
	minPagePadding?: number;
	/**
	 * If true use a point rather than rectangle to position the positioningContainer.
	 * For example it can be used to position based on a click.
	 * @deprecated Do not use.
	 */
	useTargetPoint?: boolean;
	/**
	 * Point used to position the positioningContainer.
	 * Deprecated, use `target` instead.
	 * @deprecated Use `target` instead.
	 */
	targetPoint?: IPoint;
	/**
	 * If true then the onClose will not not dismiss on scroll
	 * @defaultvalue false
	 */
	preventDismissOnScroll?: boolean;
	/**
	 * If true the position returned will have the menu element cover the target.
	 * If false then it will position next to the target;
	 * @defaultvalue false
	 */
	coverTarget?: boolean;
	/**
	 * Aria role assigned to the positioningContainer (Eg. dialog, alertdialog).
	 */
	role?: string;
	/**
	 * Accessible label text for positioningContainer.
	 */
	ariaLabel?: string;
	/**
	 *  Defines the element id referencing the element containing label text for positioningContainer.
	 */
	ariaLabelledBy?: string;
	/**
	 * Defines the element id referencing the element containing the description for the positioningContainer.
	 */
	ariaDescribedBy?: string;
	/**
	 * CSS class to apply to the positioningContainer.
	 * @defaultvalue null
	 */
	className?: string;
	/**
	 * Optional callback when the layer content has mounted.
	 */
	onLayerMounted?: () => void;
	/**
	 * Optional callback that is called once the positioningContainer has been correctly positioned.
	 * @param positions - gives the user information about how the container is positioned such
	 * as the element position, the target edge, and the alignment edge of the container.
	 */
	onPositioned?: (positions?: IPositionedData) => void;
	/**
	 * Callback when the positioningContainer tries to close.
	 */
	onDismiss?: (ev?: any) => void;
	/**
	 * If true do not render on a new layer. If false render on a new layer.
	 */
	doNotLayer?: boolean;
	/**
	 * If true the position will not change sides in an attempt to fit the positioningContainer within bounds.
	 * It will still attempt to align it to whatever bounds are given.
	 * @defaultvalue false
	 */
	directionalHintFixed?: boolean;
	/**
	 * Specify the final height of the content.
	 * To be used when expanding the content dynamically so that positioningContainer can adjust its position.
	 */
	finalHeight?: number;
	/**
	 * If true then the positioningContainer will attempt to focus the first focusable element that it contains.
	 * If it doesn't find an element, no focus will be set and the method will return false.
	 * This means that it's the contents responsibility to either set focus or have
	 * focusable items.
	 * @returns True if focus was set, false if it was not.
	 */
	setInitialFocus?: boolean;
	/**
	 * Set max height of positioningContainer
	 * When not set the positioningContainer will expand with contents up to the bottom of the screen
	 */
	positioningContainerMaxHeight?: number;
}
/** @deprecated Use `IPositioningContainerProps` */
export declare type IPositioningContainerTypes = IPositioningContainerProps;
export declare const COACHMARK_ATTRIBUTE_NAME = "data-coachmarkid";
/**
 * An interface for the cached dimensions of entity inner host.
 */
export interface IEntityRect {
	width: number;
	height: number;
}
export interface ICoachmarkState {
	/**
	 * Is the Coachmark currently collapsed into
	 * a tear drop shape
	 */
	isCollapsed: boolean;
	/**
	 * Enables/Disables the beacon that radiates
	 * from the center of the coachmark.
	 */
	isBeaconAnimating: boolean;
	/**
	 * Is the teaching bubble currently retreiving the
	 * original dimensions of the hosted entity.
	 */
	isMeasuring: boolean;
	/**
	 * Is the Coachmark done measuring the hosted entity
	 */
	isMeasured: boolean;
	/**
	 * Cached width and height of _entityInnerHostElement
	 */
	entityInnerHostRect: IEntityRect;
	/**
	 * Is the mouse in proximity of the default target element
	 */
	isMouseInProximity: boolean;
	/**
	 * The left position of the beak
	 */
	beakLeft?: string;
	/**
	 * The right position of the beak
	 */
	beakTop?: string;
	/**
	 * The right position of the beak
	 */
	beakRight?: string;
	/**
	 * The bottom position of the beak
	 */
	beakBottom?: string;
	/**
	 * Alignment edge of callout in relation to target
	 */
	targetAlignment?: RectangleEdge;
	/**
	 * Position of Coachmark/TeachingBubble in relation to target
	 */
	targetPosition?: RectangleEdge;
	/**
	 * Transform origin of teaching bubble callout
	 */
	transformOrigin?: string;
	/**
	 * ARIA alert text to read aloud with Narrator once the Coachmark is mounted
	 */
	alertText?: string;
}
export declare class CoachmarkBase extends BaseComponent<ICoachmarkProps, ICoachmarkState> implements ICoachmark {
	static defaultProps: Partial<ICoachmarkProps>;
	/**
	 * The cached HTMLElement reference to the Entity Inner Host
	 * element.
	 */
	private _entityHost;
	private _entityInnerHostElement;
	private _translateAnimationContainer;
	private _ariaAlertContainer;
	private _childrenContainer;
	private _positioningContainer;
	/**
	 * The target element the mouse would be in
	 * proximity to
	 */
	private _targetElementRect;
	constructor(props: ICoachmarkProps);
	private readonly _beakDirection;
	render(): JSX.Element;
	componentWillReceiveProps(newProps: ICoachmarkProps): void;
	shouldComponentUpdate(newProps: ICoachmarkProps, newState: ICoachmarkState): boolean;
	componentDidUpdate(prevProps: ICoachmarkProps, prevState: ICoachmarkState): void;
	componentDidMount(): void;
	dismiss: (ev?: Event | React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement, MouseEvent>) => void;
	private _addListeners;
	private _dismissOnLostFocus;
	private _onKeyDown;
	private _onFocusHandler;
	private _onPositioned;
	private _getBounds;
	private _setBeakPosition;
	private _openCoachmark;
	private _addProximityHandler;
	private _setTargetElementRect;
	private _isInsideElement;
}
export interface ITeachingBubbleState {
	isTeachingBubbleVisible?: boolean;
}
export declare class TeachingBubbleBase extends BaseComponent<ITeachingBubbleProps, ITeachingBubbleState> {
	static defaultProps: {
		/**
		 * Default calloutProps is deprecated in favor of private `_defaultCalloutProps`.
		 * Remove in next release.
		 * @deprecated In favor of private `_defaultCalloutProps`.
		 */
		calloutProps: {
			beakWidth: number;
			gapSpace: number;
			setInitialFocus: boolean;
			doNotLayer: boolean;
			directionalHint: 12;
		};
	};
	rootElement: import("../../Utilities").RefObject<HTMLDivElement>;
	private _defaultCalloutProps;
	constructor(props: ITeachingBubbleProps);
	focus(): void;
	render(): JSX.Element;
}
export declare class TeachingBubbleContentBase extends BaseComponent<ITeachingBubbleProps, ITeachingBubbleState> {
	static defaultProps: {
		hasCondensedHeadline: boolean;
		imageProps: {
			imageFit: ImageFit;
			width: number;
			height: number;
		};
	};
	rootElement: import("../../Utilities").RefObject<HTMLDivElement>;
	constructor(props: ITeachingBubbleProps);
	componentDidMount(): void;
	componentWillUnmount(): void;
	focus(): void;
	render(): JSX.Element;
	private _onKeyDown;
}
export interface IAccessiblePopupProps {
	/**
	 * Sets the HTMLElement to focus on when exiting the FocusTrapZone.
	 * @defaultvalue The element.target that triggered the Panel.
	 */
	elementToFocusOnDismiss?: HTMLElement;
	/**
	 * Indicates if this dialog will ignore keeping track of HTMLElement that activated the Zone.
	 * @defaultvalue false
	 */
	ignoreExternalFocusing?: boolean;
	/**
	 * Indicates whether dialog should force focus inside the focus trap zone
	 * @defaultvalue true
	 */
	forceFocusInsideTrap?: boolean;
	/**
	 * Indicates the selector for first focusable item
	 */
	firstFocusableSelector?: string | (() => string);
	/**
	 * Aria label on close button
	 */
	closeButtonAriaLabel?: string;
	/**
	 * Indicates if this dialog will allow clicks outside the FocusTrapZone
	 * @defaultvalue false
	 */
	isClickableOutsideFocusTrap?: boolean;
}
export interface ITeachingBubble {
	/** Sets focus to the TeachingBubble root element */
	focus(): void;
}
/**
 * TeachingBubble component props.
 */
export interface ITeachingBubbleProps extends React.Props<TeachingBubbleBase | TeachingBubbleContentBase>, IAccessiblePopupProps {
	/**
	 * Optional callback to access the ITeachingBubble interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<ITeachingBubble>;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<ITeachingBubbleStyleProps, ITeachingBubbleStyles>;
	/**
	 * Theme provided by High-Order Component.
	 */
	theme?: ITheme;
	/**
	 * Properties to pass through for Callout, reference detail properties in ICalloutProps
	 */
	calloutProps?: ICalloutProps;
	/**
	 * A headline for the Teaching Bubble.
	 */
	headline?: string;
	/**
	 * A variation with smaller bold headline and no margins.
	 */
	hasCondensedHeadline?: boolean;
	/**
	 * Does the TeachingBubble have a close button in the top right corner?
	 */
	hasCloseIcon?: boolean;
	/**
	 * An Image for the Teaching Bubble.
	 */
	illustrationImage?: IImageProps;
	/**
	 * The Primary interaction button
	 */
	primaryButtonProps?: IButtonProps;
	/**
	 * The Secondary interaction button
	 */
	secondaryButtonProps?: IButtonProps;
	/**
	 * Element to anchor the TeachingBubble to.
	 */
	targetElement?: HTMLElement;
	/**
	 * Callback when the TeachingBubble tries to close.
	 */
	onDismiss?: (ev?: any) => void;
	/**
	 * Whether or not the Teaching Bubble is wide, with image on the left side.
	 */
	isWide?: boolean;
	/**
	 * A variation with smaller bold headline and margins to the body (hasCondensedHeadline takes precedence if it is also set to true).
	 */
	hasSmallHeadline?: boolean;
	/**
	 *  Defines the element id referencing the element containing label text for TeachingBubble.
	 */
	ariaLabelledBy?: string;
	/**
	 * Defines the element id referencing the element containing the description for the TeachingBubble.
	 */
	ariaDescribedBy?: string;
}
export declare type ITeachingBubbleStyleProps = Required<Pick<ITeachingBubbleProps, 'theme'>> & Pick<ITeachingBubbleProps, 'hasCondensedHeadline' | 'hasSmallHeadline' | 'isWide'> & {
	/** Class name for callout. */
	calloutClassName?: string;
	/** Class name for primary button. */
	primaryButtonClassName?: string;
	/** Class name for secondary button. */
	secondaryButtonClassName?: string;
};
export interface ITeachingBubbleStyles {
	root: IStyle;
	body: IStyle;
	bodyContent: IStyle;
	closeButton: IStyle;
	content: IStyle;
	footer: IStyle;
	header: IStyle;
	headline: IStyle;
	imageContent: IStyle;
	primaryButton: IStyle;
	secondaryButton: IStyle;
	subText: IStyle;
	subComponentStyles?: ITeachingBubbleSubComponentStyles;
}
export interface ITeachingBubbleSubComponentStyles {
	/** Refers to the callout that hosts the teaching bubble. */
	callout: IStyleFunctionOrObject<any, any>;
}
export declare const TeachingBubble: (props: ITeachingBubbleProps) => JSX.Element;
export declare const TeachingBubbleContent: (props: ITeachingBubbleProps) => JSX.Element;
export interface ICoachmark {
	/**
	 * Forces the Coachmark to dismiss
	 */
	dismiss?: (ev?: any) => void;
}
/** Coachmark component props */
export interface ICoachmarkProps extends React.ClassAttributes<CoachmarkBase> {
	/**
	 * Optional callback to access the ICoachmark interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<ICoachmark>;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules
	 */
	styles?: IStyleFunctionOrObject<ICoachmarkStyleProps, ICoachmarkStyles>;
	/**
	 * The target that the Coachmark should try to position itself based on.
	 */
	target: HTMLElement | string | null;
	/**
	 * Props to pass to the PositioningContainer component. Specify the `directionalHint` to indicate
	 * on which edge the Coachmark/TeachingBubble should be positioned.
	 * @defaultvalue directionalHint: DirectionalHint.bottomAutoEdge
	 */
	positioningContainerProps?: IPositioningContainerProps;
	/**
	 * Whether or not to force the Coachmark/TeachingBubble content to fit within the window bounds.
	 * @defaultvalue true
	 */
	isPositionForced?: boolean;
	/**
	 * The starting collapsed state for the Coachmark.  Use `isCollapsed` instead.
	 * @defaultvalue true
	 * @deprecated Use `isCollapsed` instead.
	 */
	collapsed?: boolean;
	/**
	 * The starting collapsed state for the Coachmark.
	 * @defaultvalue true
	 */
	isCollapsed?: boolean;
	/**
	 * The distance in pixels the mouse is located
	 * before opening up the Coachmark.
	 * @defaultvalue 10
	 */
	mouseProximityOffset?: number;
	/**
	 * Callback when the opening animation begins.
	 */
	onAnimationOpenStart?: () => void;
	/**
	 * Callback when the opening animation completes.
	 */
	onAnimationOpenEnd?: () => void;
	/**
	 * The width of the Beak component.
	 * @deprecated No longer used.
	 */
	beakWidth?: number;
	/**
	 * The height of the Beak component.
	 * @deprecated No longer used.
	 */
	beakHeight?: number;
	/**
	 * Delay before allowing mouse movements to open the Coachmark.
	 * @defaultvalue 3600
	 */
	delayBeforeMouseOpen?: number;
	/**
	 * Delay in milliseconds before Coachmark animation appears.
	 * @defaultvalue 0
	 */
	delayBeforeCoachmarkAnimation?: number;
	/**
	 * Callback to run when the mouse moves.
	 */
	onMouseMove?: (e: MouseEvent) => void;
	/**
	 * The width of the Coachmark.
	 * @deprecated No longer used.
	 */
	width?: number;
	/**
	 * The height of the Coachmark.
	 * @deprecated No longer used.
	 */
	height?: number;
	/**
	 * Color of the Coachmark/TeachingBubble.
	 */
	color?: string;
	/**
	 * Beacon color one.
	 */
	beaconColorOne?: string;
	/**
	 * Beacon color two.
	 */
	beaconColorTwo?: string;
	/**
	 * Text to announce to screen reader / narrator when Coachmark is displayed
	 */
	ariaAlertText?: string;
	/**
	 * Ref for TeachingBubble
	 * @deprecated Coachmark uses `focusFirstChild` utility instead to focus on TeachingBubbleContent
	 */
	teachingBubbleRef?: ITeachingBubble;
	/**
	 *  Defines the element id referencing the element containing label text for Coachmark.
	 */
	ariaLabelledBy?: string;
	/**
	 * Defines the element id referencing the element containing the description for the Coachmark.
	 */
	ariaDescribedBy?: string;
	/**
	 *  Defines the text content for the ariaLabelledBy element
	 */
	ariaLabelledByText?: string;
	/**
	 * Defines the text content for the ariaDescribedBy element
	 */
	ariaDescribedByText?: string;
	/**
	 * If true then the Coachmark will not dismiss when it loses focus
	 * @defaultvalue false
	 */
	preventDismissOnLostFocus?: boolean;
	/**
	 * If true then focus will not be set to the Coachmark when it mounts. Useful in cases where focus on coachmark
	 * is causing other components in page to dismiss upon losing focus.
	 * @defaultvalue false
	 */
	preventFocusOnMount?: boolean;
	/**
	 * Callback when the Coachmark tries to close.
	 */
	onDismiss?: (ev?: any) => void;
}
/** The props needed to construct styles. */
export interface ICoachmarkStyleProps {
	/**
	 * Is the Coachmark collapsed.
	 * Deprecated, use `isCollapsed` instead.
	 * @deprecated Use `isCollapsed` instead.
	 */
	collapsed?: boolean;
	/**
	 * Is the Coachmark collapsed
	 */
	isCollapsed: boolean;
	/**
	 * Is the beacon currently animating.
	 */
	isBeaconAnimating: boolean;
	/**
	 * Is the component taking measurements
	 */
	isMeasuring: boolean;
	/**
	 * Is the Coachmark finished measuring the dimensions of innerHostElement
	 */
	isMeasured: boolean;
	/**
	 * The height measured before the component has been mounted
	 * in pixels
	 */
	entityHostHeight?: string;
	/**
	 * The width measured in pixels
	 */
	entityHostWidth?: string;
	/**
	 * Width of the coachmark
	 */
	width?: string;
	/**
	 * Height of the coachmark
	 */
	height?: string;
	/**
	 * Color
	 */
	color?: string;
	/**
	 * Beacon color one
	 */
	beaconColorOne?: string;
	/**
	 * Beacon color two
	 */
	beaconColorTwo?: string;
	/**
	 * Transform origin for teaching bubble content
	 */
	transformOrigin?: string;
	/**
	 * Delay time for the animation to start
	 */
	delayBeforeCoachmarkAnimation?: string;
}
/** Represents the stylable areas of the control. */
export interface ICoachmarkStyles {
	/**
	 * Style for the root element in the default enabled/unchecked state.
	 */
	root?: IStyle;
	/**
	 * The pulsing beacon that animates when the Coachmark is collapsed.
	 */
	pulsingBeacon?: IStyle;
	/**
	 * The layer, or div, that the translate animation will be applied to.
	 */
	translateAnimationContainer?: IStyle;
	/**
	 * The layer the Scale animation will be applied to.
	 */
	scaleAnimationLayer?: IStyle;
	/**
	 * The layer the Rotate animation will be applied to.
	 */
	rotateAnimationLayer?: IStyle;
	/**
	 * The layer that content/components/elements will be hosted in.
	 */
	entityHost?: IStyle;
	/**
	 * The inner layer that components will be hosted in
	 * and primary purpose is scaling the layer down while the
	 * Coachmark collapsed.
	 */
	entityInnerHost: IStyle;
	/**
	 * The layer that directly contains the TeachingBubbleContent
	 */
	childrenContainer: IStyle;
	/**
	 * The styles applied when the Coachmark has collapsed.
	 */
	collapsed?: IStyle;
	/**
	 * The styles applied to the ARIA attribute container
	 */
	ariaContainer?: IStyle;
}
/** @deprecated */
export declare type ICoachmarkTypes = ICoachmarkProps;
export declare const Coachmark: (props: ICoachmarkProps) => JSX.Element;
export declare const MAX_COLOR_SATURATION = 100;
export declare const MAX_COLOR_HUE = 359;
export declare const MAX_COLOR_VALUE = 100;
export declare const MAX_COLOR_RGBA = 255;
export interface IRGB {
	r: number;
	g: number;
	b: number;
	a?: number;
}
export interface IHSV {
	h: number;
	s: number;
	v: number;
}
export interface IHSL {
	h: number;
	s: number;
	l: number;
}
export interface IColor extends IRGB, IHSV {
	hex: string;
	str: string;
}
export declare function cssColor(color: string): IRGB | undefined;
export declare function rgb2hex(r: number, g: number, b: number): string;
export declare function hsv2hex(h: number, s: number, v: number): string;
export declare function rgb2hsv(r: number, g: number, b: number): IHSV;
export declare function hsl2hsv(h: number, s: number, l: number): IHSV;
export declare function hsv2hsl(h: number, s: number, v: number): {
	h: number;
	s: number;
	l: number;
};
export declare function hsl2rgb(h: number, s: number, l: number): IRGB;
export declare function hsv2rgb(h: number, s: number, v: number): IRGB;
export declare function getColorFromString(inputColor: string): IColor | undefined;
export declare function getColorFromRGBA(rgba: {
	r: number;
	g: number;
	b: number;
	a: number;
}): IColor;
export declare function getFullColorString(color: IColor): string;
export declare function updateSV(color: IColor, s: number, v: number): IColor;
export declare function updateH(color: IColor, h: number): IColor;
export declare function updateA(color: IColor, a: number): IColor;
/** Shades of a given color, from softest to strongest. */
export declare enum Shade {
	Unshaded = 0,
	Shade1 = 1,
	Shade2 = 2,
	Shade3 = 3,
	Shade4 = 4,
	Shade5 = 5,
	Shade6 = 6,
	Shade7 = 7,
	Shade8 = 8
}
/**
 * Returns true if the argument is a valid Shade value
 * @param shade - The Shade value to validate.
 */
export declare function isValidShade(shade?: Shade): boolean;
export declare function isDark(color: IColor): boolean;
/**
 * Given a color and a shade specification, generates the requested shade of the color.
 * Logic:
 * if white
 *  darken via tables defined above
 * if black
 *  lighten
 * if light
 *  strongen
 * if dark
 *  soften
 * else default
 *  soften or strongen depending on shade#
 * @param color - The base color whose shade is to be computed
 * @param shade - The shade of the base color to compute
 * @param isInverted - Default false. Whether the given theme is inverted (reverse strongen/soften logic)
 */
export declare function getShade(color: IColor, shade: Shade, isInverted?: boolean): IColor | null;
export declare function getBackgroundShade(color: IColor, shade: Shade, isInverted?: boolean): IColor | null;
export declare function getContrastRatio(color1: IColor, color2: IColor): number;
export interface IColorPicker {
}
export interface IColorPickerProps extends IBaseProps<IColorPicker> {
	/**
	 * Gets the component ref.
	 */
	componentRef?: IRefObject<IColorPicker>;
	/**
	 * CSS-compatible string to describe the initial color.
	 */
	color: string;
	/**
	 * Callback issued when the user changes the color.
	 */
	onColorChanged?: (color: string, colorObject: IColor) => void;
	/**
	 * The setting of whether to hide the alpha control slider.
	 */
	alphaSliderHidden?: boolean;
	/**
	 * Label for the hex textfield.
	 * @defaultvalue Hex
	 */
	hexLabel?: string;
	/**
	 * Label for the red textfield.
	 * @defaultvalue Red
	 */
	redLabel?: string;
	/**
	 * Label for the green textfield.
	 * @defaultvalue Green
	 */
	greenLabel?: string;
	/**
	 * Label for the blue textfield.
	 * @defaultvalue Blue
	 */
	blueLabel?: string;
	/**
	 * Label for the alpha textfield.
	 * @defaultvalue Alpha
	 */
	alphaLabel?: string;
	/**
	 * Additional CSS class(es) to apply to the ColorPicker.
	 */
	className?: string;
	/**
	 * Theme (provided through customization).
	 */
	theme?: ITheme;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<IColorPickerStyleProps, IColorPickerStyles>;
}
export interface IColorPickerStyleProps {
	/**
	 * Theme (provided through customization).
	 */
	theme: ITheme;
	/**
	 * Additional CSS class(es) to apply to the ColorPicker.
	 */
	className?: string;
}
export interface IColorPickerStyles {
	/**
	 * Style set for the root element.
	 */
	root?: IStyle;
	/**
	 * Style set for the panel element that contains the color rectangle.
	 */
	panel?: IStyle;
	/**
	 * Style set for the table element that contains the color sliders and inputs.
	 */
	table?: IStyle;
	/**
	 * Style set for the table header that contains the labels.
	 */
	tableHeader?: IStyle;
	/**
	 * Style set for the table cell that contains the hex label.
	 */
	tableHexCell?: IStyle;
	/**
	 * Style set for each text field input.
	 */
	input?: IStyle;
}
export declare const ColorPicker: (props: IColorPickerProps) => JSX.Element;
export interface IColorPickerState {
	isOpen: boolean;
	color: IColor;
}
export declare class ColorPickerBase extends BaseComponent<IColorPickerProps, IColorPickerState> {
	static defaultProps: {
		hexLabel: string;
		redLabel: string;
		greenLabel: string;
		blueLabel: string;
		alphaLabel: string;
	};
	private _hexText;
	private _rText;
	private _gText;
	private _bText;
	private _aText;
	constructor(props: IColorPickerProps);
	componentWillReceiveProps(newProps: IColorPickerProps): void;
	render(): JSX.Element;
	private _onSVChanged;
	private _onHChanged;
	private _onAChanged;
	private _onHexChanged;
	private _onRGBAChanged;
	private _updateColor;
}
export interface IColorRectangle {
}
export interface IColorRectangleProps extends IBaseProps<IColorRectangle> {
	/**
	 * Gets the component ref.
	 */
	componentRef?: IRefObject<IColorRectangle>;
	/**
	 * Current color of the rectangle.
	 */
	color: IColor;
	/**
	 * Minimum width and height.
	 */
	minSize?: number;
	/**
	 * Additional CSS class(es) to apply to the ColorRectangle.
	 */
	className?: string;
	/**
	 * Theme (provided through customization).
	 */
	theme?: ITheme;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<IColorRectangleStyleProps, IColorRectangleStyles>;
	/**
	 * Callback issued when the color changes.
	 */
	onSVChanged?: (s: number, v: number) => void;
}
export interface IColorRectangleStyleProps {
	/**
	 * Theme (provided through customization).
	 */
	theme: ITheme;
	/**
	 * Additional CSS class(es) to apply to the ColorRectangle.
	 */
	className?: string;
}
export interface IColorRectangleStyles {
	/**
	 * Style set for the root element.
	 */
	root?: IStyle;
	/**
	 * Style set for the light-colored rectangle.
	 */
	light?: IStyle;
	/**
	 * Style set for the dark-colored rectangle.
	 */
	dark?: IStyle;
	/**
	 * Style set for the draggable thumb element.
	 */
	thumb?: IStyle;
}
export interface IColorSlider {
}
export interface IColorSliderProps extends IBaseProps<IColorSlider> {
	/**
	 * Gets the component ref.
	 */
	componentRef?: IRefObject<IColorSlider>;
	/**
	 * Minimum value of the slider.
	 */
	minValue?: number;
	/**
	 * Maximum value of the slider.
	 */
	maxValue?: number;
	/**
	 * Current value of the slider.
	 */
	value?: number;
	/**
	 * CSS-compatible string for the color of the thumb element.
	 */
	thumbColor?: string;
	/**
	 * Custom style for the overlay element.
	 */
	overlayStyle?: any;
	/**
	 * Callback issued when the value changes.
	 */
	onChange?: (event: React.MouseEvent<HTMLElement>, newValue?: number) => void;
	/**
	 * Deprecated, use `onChange` instead.
	 * @deprecated Use `onChange` instead.
	 */
	onChanged?: (newValue: number) => void;
	/**
	 * If true, the slider represents an alpha slider.
	 * Otherwise, the slider represents a hue slider.
	 */
	isAlpha?: boolean;
	/**
	 * Additional CSS class(es) to apply to the ColorSlider.
	 */
	className?: string;
	/**
	 * Theme (provided through customization).
	 */
	theme?: ITheme;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<IColorSliderStyleProps, IColorSliderStyles>;
}
export interface IColorSliderStyleProps {
	/**
	 * Theme (provided through customization).
	 */
	theme: ITheme;
	/**
	 * Additional CSS class(es) to apply to the ColorSlider.
	 */
	className?: string;
}
export interface IColorSliderStyles {
	/**
	 * Style set for the root element.
	 */
	root?: IStyle;
	/**
	 * Style set for the draggable thumb element.
	 */
	sliderThumb?: IStyle;
	/**
	 * Style set for the overlay element.
	 */
	sliderOverlay?: IStyle;
}
export interface ISelectableOption {
	/**
	 * Arbitrary string associated with this option.
	 */
	key: string | number;
	/**
	 * Text to render for this option
	 */
	text: string;
	/**
	 * Title attribute (built in tooltip) for a given option.
	 */
	title?: string;
	/**
	 * Text to render for this option
	 */
	itemType?: SelectableOptionMenuItemType;
	/**
	 * Index for this option
	 */
	index?: number;
	/**
	 * The aria label for the dropdown option. If not present, the `text` will be used.
	 */
	ariaLabel?: string;
	/** If option is selected. */
	selected?: boolean;
	/**
	 * Whether the option is disabled
	 * @defaultvalue false
	 */
	disabled?: boolean;
	/**
	 * Data available to custom onRender functions.
	 */
	data?: any;
}
export declare enum SelectableOptionMenuItemType {
	Normal = 0,
	Divider = 1,
	Header = 2
}
export interface IPanelState {
	isFooterSticky?: boolean;
	isOpen?: boolean;
	isAnimating?: boolean;
	id?: string;
}
declare class PanelBase extends BaseComponent<IPanelProps, IPanelState> implements IPanel {
	static defaultProps: IPanelProps;
	private _panel;
	private _classNames;
	private _scrollableContent;
	constructor(props: IPanelProps);
	componentDidMount(): void;
	componentDidUpdate(previousProps: IPanelProps): void;
	componentWillReceiveProps(newProps: IPanelProps): void;
	render(): JSX.Element | null;
	open(): void;
	dismiss: (ev?: React.SyntheticEvent<HTMLElement, Event>) => void;
	private _allowScrollOnPanel;
	private _shouldListenForOuterClick;
	private _onRenderNavigation;
	private _onRenderHeader;
	private _onRenderBody;
	private _onRenderFooter;
	private _updateFooterPosition;
	private _dismissOnOuterClick;
	private _onPanelClick;
	private _onTransitionComplete;
}
export interface IPanel {
	/**
	 * Forces the panel to open.
	 */
	open: () => void;
	/**
	 * Forces the panel to dismiss.
	 */
	dismiss: (ev?: React.KeyboardEvent<HTMLElement>) => void;
}
export interface IPanelProps extends React.HTMLAttributes<PanelBase> {
	/**
	 * Optional callback to access the IPanel interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IPanel>;
	/**
	 * Whether the panel is displayed.
	 * @defaultvalue false
	 */
	isOpen?: boolean;
	/**
	 * Has the close button visible.
	 * @defaultvalue true
	 */
	hasCloseButton?: boolean;
	/**
	 * Whether the panel can be light dismissed.
	 * @defaultvalue false
	 */
	isLightDismiss?: boolean;
	/**
	 * Whether the panel is hidden on dismiss, instead of destroyed in the DOM.
	 * Protects the contents from being destroyed when the panel is dismissed.
	 * @defaultvalue false
	 */
	isHiddenOnDismiss?: boolean;
	/**
	 * Whether the panel uses a modal overlay or not
	 * @defaultvalue true
	 */
	isBlocking?: boolean;
	/**
	 * Determines if content should stretch to fill available space putting footer at the bottom of the page
	 * @defaultvalue false
	 */
	isFooterAtBottom?: boolean;
	/**
	 * Header text for the Panel.
	 * @defaultvalue ""
	 */
	headerText?: string;
	/**
	 * A callback function for when the panel is closed, before the animation completes.
	 * If the panel should NOT be dismissed based on some keyboard event, then simply call ev.preventDefault() on it
	 */
	onDismiss?: (ev?: React.SyntheticEvent<HTMLElement>) => void;
	/**
	 * A callback function which is called after the Panel is dismissed and the animation is complete.
	 */
	onDismissed?: () => void;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<IPanelStyleProps, IPanelStyles>;
	/**
	 * Theme provided by High-Order Component.
	 */
	theme?: ITheme;
	/**
	 * Additional css class to apply to the Panel
	 * @defaultvalue undefined
	 */
	className?: string;
	/**
	 * Type of the panel.
	 * @defaultvalue PanelType.smallFixedRight
	 */
	type?: PanelType;
	/**
	 * Custom panel width, used only when type is set to PanelType.custom.
	 */
	customWidth?: string;
	/**
	 * Aria label on close button
	 */
	closeButtonAriaLabel?: string;
	/**
	 * Optional parameter to provider the class name for header text
	 */
	headerClassName?: string;
	/**
	 * Sets the HTMLElement to focus on when exiting the FocusTrapZone.
	 * @defaultvalue The element.target that triggered the Panel.
	 */
	elementToFocusOnDismiss?: HTMLElement;
	/**
	 * Indicates if this Panel will ignore keeping track of HTMLElement that activated the Zone.
	 * Deprecated, use `focusTrapZoneProps`.
	 * @defaultvalue false
	 * @deprecated Use `focusTrapZoneProps`.
	 */
	ignoreExternalFocusing?: boolean;
	/**
	 * Indicates whether Panel should force focus inside the focus trap zone.
	 * If not explicitly specified, behavior aligns with FocusTrapZone's default behavior.
	 * Deprecated, use `focusTrapZoneProps`.
	 * @deprecated Use `focusTrapZoneProps`.
	 */
	forceFocusInsideTrap?: boolean;
	/**
	 * Indicates the selector for first focusable item.
	 * Deprecated, use `focusTrapZoneProps`.
	 * @deprecated Use `focusTrapZoneProps`.
	 */
	firstFocusableSelector?: string;
	/**
	 * Optional props to pass to the FocusTrapZone component to manage focus in the panel.
	 */
	focusTrapZoneProps?: IFocusTrapZoneProps;
	/**
	 * Optional props to pass to the Layer component hosting the panel.
	 */
	layerProps?: ILayerProps;
	/**
	 * Optional custom function to handle clicks outside the panel in lightdismiss mode
	 */
	onLightDismissClick?: () => void;
	/**
	 * Optional custom function to handle clicks outside this component
	 */
	onOuterClick?: () => void;
	/**
	 * Optional custom renderer navigation region. Replaces current close button.
	 */
	onRenderNavigation?: IRenderFunction<IPanelProps>;
	/**
	 * Optional custom renderer for header region. Replaces current title
	 */
	onRenderHeader?: IPanelHeaderRenderer;
	/**
	 * Optional custom renderer for body region. Replaces any children passed into the component.
	 */
	onRenderBody?: IRenderFunction<IPanelProps>;
	/**
	 * Optional custom renderer for footer region. Replaces sticky footer.
	 */
	onRenderFooter?: IRenderFunction<IPanelProps>;
	/**
	 * Custom renderer for content in the sticky footer
	 */
	onRenderFooterContent?: IRenderFunction<IPanelProps>;
	/**
	 * Deprecated property. Serves no function.
	 * @deprecated Serves no function.
	 */
	componentId?: string;
}
/**
 * Renderer function which takes an additional parameter, the ID to use for the element containing
 * the panel's title. This allows the `aria-labelledby` for the panel popup to work correctly.
 * Note that if `headerTextId` is provided, it **must** be used on an element, or screen readers
 * will be confused by the reference to a nonexistent ID.
 */
export interface IPanelHeaderRenderer extends IRenderFunction<IPanelProps> {
	/**
	 * @param props - Props given to the panel
	 * @param defaultRender - Default header renderer. If using this renderer in code that does not
	 * assign `headerTextId` to an element elsewhere, it **must** be passed to this function.
	 * @param headerTextId - If provided, this **must** be used as the ID of an element containing the
	 * panel's title, because the panel popup uses this ID as its aria-labelledby.
	 */
	(props?: IPanelProps, defaultRender?: IPanelHeaderRenderer, headerTextId?: string | undefined): JSX.Element | null;
}
export declare enum PanelType {
	/**
	 * Renders the panel in 'small' mode, anchored to the far side (right in LTR mode), and has a fluid width.
	 * Only used on Small screen breakpoints.
	 * Small: 320-479px width (full screen), 16px Left/Right padding
	 * Medium: \<unused\>
	 * Large: \<unused\>
	 * XLarge: \<unused\>
	 * XXLarge: \<unused\>
	 */
	smallFluid = 0,
	/**
	 * Renders the panel in 'small' mode, anchored to the far side (right in LTR mode), and has a fixed width.
	 * Small: 272px width, 16px Left/Right padding
	 * Medium: 340px width, 16px Left/Right padding
	 * Large: 340px width, 32px Left/Right padding
	 * XLarge: 340px width, 32px Left/Right padding
	 * XXLarge: 340px width, 40px Left/Right padding
	 */
	smallFixedFar = 1,
	/**
	 * Renders the panel in 'small' mode, anchored to the near side (left in LTR mode), and has a fixed width.
	 * Small: 272px width, 16px Left/Right padding
	 * Medium: 272px width, 16px Left/Right padding
	 * Large: 272px width, 32px Left/Right padding
	 * XLarge: 272px width, 32px Left/Right padding
	 * XXLarge: 272px width, 32px Left/Right padding
	 */
	smallFixedNear = 2,
	/**
	 * Renders the panel in 'medium' mode, anchored to the far side (right in LTR mode).
	 * Small: \<adapts to smallFluid\>
	 * Medium: \<adapts to smallFixedFar\>
	 * Large: 48px fixed left margin, 32px Left/Right padding
	 * XLarge: 644px width, 32px Left/Right padding
	 * XXLarge: 643px width, 40px Left/Right padding
	 */
	medium = 3,
	/**
	 * Renders the panel in 'large' mode, anchored to the far side (right in LTR mode), and is fluid at XXX-Large breakpoint.
	 * Small: \<adapts to smallFluid\>
	 * Medium:  \<adapts to smallFixedFar\>
	 * Large: \<adapts to medium\>
	 * XLarge: 48px fixed left margin, 32px Left/Right padding
	 * XXLarge: 48px fixed left margin, 32px Left/Right padding
	 * XXXLarge: 48px fixed left margin, (no redlines for padding, assuming previous breakpoint)
	 */
	large = 4,
	/**
	 * Renders the panel in 'large' mode, anchored to the far side (right in LTR mode), and is fixed at XXX-Large breakpoint.
	 * Small: \<adapts to smallFluid\>
	 * Medium: \<adapts to smallFixedFar\>
	 * Large: \<adapts to medium\>
	 * XLarge: 48px fixed left margin, 32px Left/Right padding
	 * XXLarge: 48px fixed left margin, 32px Left/Right padding
	 * XXXLarge: 940px width, (no redlines for padding, assuming previous breakpoint)
	 */
	largeFixed = 5,
	/**
	 * Renders the panel in 'extra large' mode, anchored to the far side (right in LTR mode).
	 * Small: \<adapts to smallFluid\>
	 * Medium: \<adapts to smallFixedFar\>
	 * Large: \<adapts to medium\>
	 * XLarge: \<adapts to large\>
	 * XXLarge: 176px fixed left margin, 40px Left/Right padding
	 * XXXLarge: 176px fixed left margin, 40px Left/Right padding
	 */
	extraLarge = 6,
	/**
	 * Renders the panel in 'custom' mode using customWidth, anchored to the far side (right in LTR mode).
	 * Small: \<adapts to smallFluid\>
	 * Medium: \<adapts to smallFixedFar\>
	 * Large: 48px fixed left margin, 32px Left/Right padding
	 * XLarge: 644px width, 32px Left/Right padding
	 * XXLarge: 643px width, 40px Left/Right padding
	 */
	custom = 7
}
export interface IPanelStyleProps {
	/**
	 * Theme provided by High-Order Component.
	 */
	theme: ITheme;
	/**
	 * Accept custom classNames
	 */
	className?: string;
	/**
	 * Is Panel open
	 */
	isOpen?: boolean;
	/**
	 * Is animation currently running
	 */
	isAnimating?: boolean;
	/**
	 * Is panel on right side
	 */
	isOnRightSide?: boolean;
	/**
	 * Is panel hidden on dismiss
	 */
	isHiddenOnDismiss?: boolean;
	/**
	 * Classname for FocusTrapZone element
	 */
	focusTrapZoneClassName?: string;
	/**
	 * Determines if content should stretch to fill available space putting footer at the bottom of the page
	 */
	isFooterAtBottom?: boolean;
	/**
	 * Based on state value setting footer to sticky or not
	 */
	isFooterSticky?: boolean;
	/**
	 * Panel has close button
	 */
	hasCloseButton?: boolean;
	/**
	 * Type of the panel.
	 */
	type?: PanelType;
	/**
	 * Optional parameter to provider the class name for header text
	 */
	headerClassName?: string;
}
export interface IPanelStyles {
	/**
	 * Style for the root element.
	 */
	root: IStyle;
	/**
	 * Style for the overlay element.
	 */
	overlay: IStyle;
	/**
	 * Style for the hidden element.
	 */
	hiddenPanel: IStyle;
	/**
	 * Style for the main section element.
	 */
	main: IStyle;
	/**
	 * Style for the navigation container element.
	 */
	commands: IStyle;
	/**
	 * Style for the Body and Footer container element.
	 */
	contentInner: IStyle;
	/**
	 * Style for the scrollable content area container element.
	 */
	scrollableContent: IStyle;
	/**
	 * Style for the close button container element.
	 */
	navigation: IStyle;
	/**
	 * Style for the close button IconButton element.
	 */
	closeButton: IStyle;
	/**
	 * Style for the header container div element.
	 */
	header: IStyle;
	/**
	 * Style for the header inner p element.
	 */
	headerText: IStyle;
	/**
	 * Style for the body div element.
	 */
	content: IStyle;
	/**
	 * Style for the footer div element.
	 */
	footer: IStyle;
	/**
	 * Style for the inner footer div element.
	 */
	footerInner: IStyle;
}
/**
 * Panel description
 */
export declare const Panel: (props: IPanelProps) => JSX.Element;
/**
 * TComponent - Component used for reference properties, such as componentRef
 * TListenerElement - Listener element associated with HTML event callbacks. Optional. If not provided, TComponent is assumed.
 */
export interface ISelectableDroppableTextProps<TComponent, TListenerElement = TComponent> extends React.HTMLAttributes<TListenerElement> {
	/**
	 * Optional callback to access the ISelectableDroppableText interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<TComponent>;
	/**
	 * Descriptive label for the ISelectableDroppableText
	 */
	label?: string;
	/**
	 * Aria Label for the ISelectableDroppableText for screen reader users.
	 */
	ariaLabel?: string;
	/**
	 * Id of the ISelectableDroppableText
	 */
	id?: string;
	/**
	 * If provided, additional class name to provide on the root element.
	 */
	className?: string;
	/**
	 * The key(s) that will be initially used to set a selected item.
	 */
	defaultSelectedKey?: string | number | string[] | number[];
	/**
	 * The key(s) of the selected item. If you provide this, you must maintain selection
	 * state by observing onChange events and passing a new value in when changed.
	 */
	selectedKey?: string | number | string[] | number[];
	/**
	 * Collection of options for this ISelectableDroppableText
	 */
	options?: any;
	/**
	 * Optional custom renderer for the ISelectableDroppableText container
	 */
	onRenderContainer?: IRenderFunction<ISelectableDroppableTextProps<TComponent>>;
	/**
	 * Optional custom renderer for the ISelectableDroppableText list
	 */
	onRenderList?: IRenderFunction<ISelectableDroppableTextProps<TComponent>>;
	/**
	 * Optional custom renderer for the ISelectableDroppableText options
	 */
	onRenderItem?: IRenderFunction<ISelectableOption>;
	/**
	 * Optional custom renderer for the ISelectableDroppableText option content
	 */
	onRenderOption?: IRenderFunction<ISelectableOption>;
	/**
	 * Whether or not the ISelectableDroppableText is disabled.
	 */
	disabled?: boolean;
	/**
	 * Whether or not the ISelectableDroppableText is required.
	 */
	required?: boolean;
	/**
	 * Custom properties for ISelectableDroppableText's Callout used to render options.
	 */
	calloutProps?: ICalloutProps;
	/**
	 * Custom properties for ISelectableDroppableText's Panel used to render options on small devices.
	 */
	panelProps?: IPanelProps;
	/**
	 * Descriptive label for the ISelectableDroppableText Error Message
	 */
	errorMessage?: string;
	/**
	 * Input placeholder text. Displayed until option is selected.
	 */
	placeholder?: string;
}
export interface IComboBoxClassNames {
	container: string;
	label: string;
	root: string;
	input: string;
	errorMessage: string;
	callout: string;
	optionsContainer: string;
	header: string;
	divider: string;
	optionsContainerWrapper: string;
}
export interface IComboBox {
	/**
	 * If there is a menu open this will dismiss the menu
	 */
	dismissMenu: () => void;
	/**
	 * Sets focus to the input in the comboBox
	 * @param shouldOpenOnFocus - Determines if we should open the ComboBox menu when the input gets focus
	 * @param useFocusAsync - Determines if we should focus the input asynchronously
	 * @returns True if focus could be set, false if no operation was taken.
	 */
	focus(shouldOpenOnFocus?: boolean, useFocusAsync?: boolean): boolean;
}
export interface IComboBoxOption extends ISelectableOption {
	/**
	 * Specific styles for each comboBox option. If you intend to give
	 * common styles to all comboBox option please use
	 * the prop comboBoxOptionStyles
	 */
	styles?: Partial<IComboBoxOptionStyles>;
	/**
	 * In scenarios where embedded data is used at the text prop, we will use the ariaLabel prop
	 * to set the aria-label and preview text. Default to false
	 * @defaultvalue false;
	 */
	useAriaLabelAsText?: boolean;
}
export interface IComboBoxProps extends ISelectableDroppableTextProps<IComboBox> {
	/**
	 * Optional callback to access the IComboBox interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IComboBox>;
	/**
	 * Collection of options for this ComboBox
	 */
	options: IComboBoxOption[];
	/**
	 * Callback issued when a ComboBox item is clicked.
	 */
	onItemClick?: (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number) => void;
	/**
	 * Callback issued when either:
	 * 1) the selected option changes
	 * 2) a manually edited value is submitted. In this case there may not be a matched option if allowFreeform is also true
	 *    (and hence only value would be true, the other parameter would be null in this case)
	 */
	onChange?: (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => void;
	/**
	 * Deprecated, use `onChange` instead.
	 * @deprecated Use `onChange` instead.
	 */
	onChanged?: (option?: IComboBoxOption, index?: number, value?: string, submitPendingValueEvent?: any) => void;
	/**
	 * Callback issued when the user changes the pending value in ComboBox
	 */
	onPendingValueChanged?: (option?: IComboBoxOption, index?: number, value?: string) => void;
	/**
	 * Function that gets invoked when the ComboBox menu is launched
	 */
	onMenuOpen?: () => void;
	/**
	 * Function that gets invoked when the ComboBox menu is dismissed
	 */
	onMenuDismissed?: () => void;
	/**
	 * Callback issued when the options should be resolved, if they have been updated or
	 * if they need to be passed in the first time
	 */
	onResolveOptions?: (options: IComboBoxOption[]) => IComboBoxOption[] | PromiseLike<IComboBoxOption[]>;
	/**
	 * Callback issued when the ComboBox requests the list to scroll to a specific element
	 */
	onScrollToItem?: (itemIndex: number) => void;
	/**
	 * Whether the ComboBox is free form, meaning that the user input is not bound to provided options. Defaults to false.
	 */
	allowFreeform?: boolean;
	/**
	 * Whether the ComboBox auto completes. As the user is inputing text, it will be suggested potential matches from the list of options. If
	 * the combo box is expanded, this will also scroll to the suggested option, and give it a selected style.
	 *
	 * @defaultvalue "on"
	 */
	autoComplete?: 'on' | 'off';
	/**
	 * Value to show in the input, does not have to map to a combobox option
	 */
	text?: string;
	/**
	 * The IconProps to use for the button aspect of the combobox
	 */
	buttonIconProps?: IIconProps;
	/**
	 * Theme provided by HOC.
	 */
	theme?: ITheme;
	/**
	 * Custom styles for this component
	 */
	styles?: Partial<IComboBoxStyles>;
	/**
	 * Custom function for providing the classNames for the ComboBox. Can be used to provide
	 * all styles for the component instead of applying them on top of the default styles.
	 */
	getClassNames?: (theme: ITheme, isOpen: boolean, disabled: boolean, required: boolean, focused: boolean, allowFreeForm: boolean, hasErrorMessage: boolean, className?: string) => IComboBoxClassNames;
	/**
	 * Styles for the caret down button.
	 */
	caretDownButtonStyles?: Partial<IButtonStyles>;
	/**
	 * Default styles that should be applied to ComboBox options,
	 * in case an option does not come with user-defined custom styles
	 */
	comboBoxOptionStyles?: Partial<IComboBoxOptionStyles>;
	/**
	 * When options are scrollable the selected option is positioned at the top of the callout when it is opened
	 * (unless it has reached the end of the scrollbar).
	 * @defaultvalue false;
	 */
	scrollSelectedToTop?: boolean;
	/**
	 * Add additional content below the callout list.
	 */
	onRenderLowerContent?: IRenderFunction<IComboBoxProps>;
	/**
	 * Custom width for dropdown (unless useComboBoxAsMenuWidth is undefined or false)
	 */
	dropdownWidth?: number;
	/**
	 * Whether to use the ComboBoxes width as the menu's width
	 */
	useComboBoxAsMenuWidth?: boolean;
	/**
	 * Custom max width for dropdown
	 */
	dropdownMaxWidth?: number;
	/**
	 * Optional mode indicates if multi-choice selections is allowed.  Default to false
	 */
	multiSelect?: boolean;
	/**
	 * Sets the 'aria-hidden' attribute on the ComboBox's button element instructing screen readers how to handle the element.
	 * This element is hidden by default because all functionality is handled by the input element and the arrow button is
	 * only meant to be decorative.
	 * @defaultvalue true
	 */
	isButtonAriaHidden?: boolean;
	/**
	 * Optional keytip for this combo box
	 */
	keytipProps?: IKeytipProps;
	/**
	 * Value to show in the input, does not have to map to a combobox option
	 * Deprecated, use `text` instead.
	 * @deprecated Use `text` instead.
	 */
	value?: string;
}
export interface IComboBoxStyles {
	/**
	 * Style for the container which has the ComboBox and the label
	 */
	container: IStyle;
	/**
	 * Style for the label element of the ComboBox.
	 */
	label: IStyle;
	/**
	 * Style for the label element of the ComboBox in the disabled state.
	 */
	labelDisabled: IStyle;
	/**
	 * Base styles for the root element of all ComboBoxes.
	 */
	root: IStyle;
	/**
	 * Styles for the root element for variant of ComboBox with an errorMessage in the props.
	 */
	rootError: IStyle;
	/**
	 * Styles for variant of ComboBox where allowFreeForm is false in the props.
	 */
	rootDisallowFreeForm: IStyle;
	/**
	 * Styles for when the ComboBox is hovered. These styles are applied for all comboBoxes except when
	 * the comboBox is disabled.
	 */
	rootHovered: IStyle;
	/**
	 * Styles for when the ComboBox is active. These styles are applied for all comboBoxes except when
	 * the comboBox is disabled.
	 */
	rootPressed: IStyle;
	/**
	 * Styles for when the ComboBox is focused. These styles are applied for all comboBoxes except when
	 * the comboBox is disabled.
	 */
	rootFocused: IStyle;
	/**
	 * Styles for when the comboBox is disabled. These styles override all the other styles.
	 * NOTE : Hover (or) Focused (or) active styles are not applied for disabled comboBoxes.
	 */
	rootDisabled: IStyle;
	/**
	 * Base styles for the input element - which contains the currently selected
	 * option.
	 */
	input: IStyle;
	/**
	 * Style override for the input element when comboBox is disabled.
	 */
	inputDisabled: IStyle;
	/**
	 * Styles for the error Message text of the comboBox.
	 */
	errorMessage: IStyle;
	/**
	 * Styles for the callout.
	 */
	callout: IStyle;
	/**
	 * Styles for the optionsContainerWrapper.
	 */
	optionsContainerWrapper: IStyle;
	/**
	 * Styles for the container of all the Combobox options
	 * Includes the headers and dividers.
	 */
	optionsContainer: IStyle;
	/**
	 * Styles for a header in the options.
	 */
	header: IStyle;
	/**
	 * Styles for a divider in the options.
	 */
	divider: IStyle;
}
export interface IComboBoxOptionStyles extends IButtonStyles {
	/**
	 * Styles for the text inside the comboBox option.
	 * This should be used instead of the description
	 * inside IButtonStyles because we custom render the text
	 * in the comboBox options.
	 */
	optionText: IStyle;
	/**
	 * Styles for the comboBox option text's wrapper.
	 */
	optionTextWrapper: IStyle;
}
export interface IComboBoxState {
	/** The open state */
	isOpen?: boolean;
	/** The currently selected indices */
	selectedIndices?: number[];
	/** The focused state of the comboBox */
	focused?: boolean;
	/** This value is used for the autocomplete hint value */
	suggestedDisplayValue?: string;
	/** The options currently available for the callout */
	currentOptions: IComboBoxOption[];
	/**
	 * When taking input, this will store the index that the options input matches
	 * (-1 if no input or match)
	 */
	currentPendingValueValidIndex: number;
	/**
	 * Stores the hovered over value in the dropdown
	 * (used for styling the options without updating the input)
	 */
	currentPendingValueValidIndexOnHover: number;
	/** When taking input, this will store the actual text that is being entered */
	currentPendingValue?: string;
}
export declare class ComboBox extends BaseComponent<IComboBoxProps, IComboBoxState> {
	static defaultProps: IComboBoxProps;
	private _root;
	/** The input aspect of the comboBox */
	private _autofill;
	/** The wrapping div of the input and button */
	private _comboBoxWrapper;
	/** The callout element */
	private _comboBoxMenu;
	/** The menu item element that is currently selected */
	private _selectedElement;
	/** The base id for the comboBox */
	private _id;
	/**
	 * After a character is inserted when autocomplete is true and allowFreeform is false,
	 * remember the task that will clear the pending string of characters.
	 */
	private _lastReadOnlyAutoCompleteChangeTimeoutId;
	/** Promise used when resolving the comboBox options */
	private _currentPromise;
	/** The current visible value sent to the auto fill on render */
	private _currentVisibleValue;
	private _classNames;
	private _isScrollIdle;
	private _hasPendingValue;
	private _scrollIdleTimeoutId;
	private _processingTouch;
	private _lastTouchTimeoutId;
	/** True if the most recent keydown event was for alt (option) or meta (command). */
	private _lastKeyDownWasAltOrMeta;
	/**
	 * Determines if we should be setting focus back to the input when the menu closes.
	 * The general rule of thumb is if the menu was launched via the keyboard focus should go back
	 * to the input, if it was dropped via the mouse focus should not be forced back to the input.
	 */
	private _focusInputAfterClose;
	/** Flag for when we get the first mouseMove */
	private _gotMouseMove;
	private _processingClearPendingInfo;
	constructor(props: IComboBoxProps);
	componentDidMount(): void;
	componentWillReceiveProps(newProps: IComboBoxProps): void;
	componentDidUpdate(prevProps: IComboBoxProps, prevState: IComboBoxState): void;
	componentWillUnmount(): void;
	render(): JSX.Element;
	/**
	 * {@inheritdoc}
	 */
	focus: (shouldOpenOnFocus?: boolean, useFocusAsync?: boolean) => void;
	/**
	 * Close menu callout if it is open
	 */
	dismissMenu: () => void;
	/**
	 * componentWillReceiveProps handler for the auto fill component
	 * Checks/updates the iput value to set, if needed
	 * @param defaultVisibleValue - the defaultVisibleValue that got passed
	 *  in to the auto fill's componentWillReceiveProps
	 * @returns - the updated value to set, if needed
	 */
	private _onUpdateValueInAutofillWillReceiveProps;
	/**
	 * componentDidUpdate handler for the auto fill component
	 *
	 * @param defaultVisibleValue - the current defaultVisibleValue in the auto fill's componentDidUpdate
	 * @param suggestedDisplayValue - the current suggestedDisplayValue in the auto fill's componentDidUpdate
	 * @returns - should the full value of the input be selected?
	 * True if the defaultVisibleValue equals the suggestedDisplayValue, false otherwise
	 */
	private _onShouldSelectFullInputValueInAutofillComponentDidUpdate;
	/**
	 * Get the correct value to pass to the input
	 * to show to the user based off of the current props and state
	 * @returns the value to pass to the input
	 */
	private _getVisibleValue;
	/**
	 * Is the index within the bounds of the array?
	 * @param options - options to check if the index is valid for
	 * @param index - the index to check
	 * @returns - true if the index is valid for the given options, false otherwise
	 */
	private _indexWithinBounds;
	/**
	 * Handler for typing changes on the input
	 * @param updatedValue - the newly changed value
	 */
	private _onInputChange;
	/**
	 * Process the new input's new value when the comboBox
	 * allows freeform entry
	 * @param updatedValue - the input's newly changed value
	 */
	private _processInputChangeWithFreeform;
	/**
	 * Process the new input's new value when the comboBox
	 * does not allow freeform entry
	 * @param updatedValue - the input's newly changed value
	 */
	private _processInputChangeWithoutFreeform;
	private _getFirstSelectedIndex;
	/**
	 * Walk along the options starting at the index, stepping by the delta (positive or negative)
	 * looking for the next valid selectable index (e.g. skipping headings and dividers)
	 * @param index - the index to get the next selectable index from
	 * @param delta - optional delta to step by when finding the next index, defaults to 0
	 * @returns - the next valid selectable index. If the new index is outside of the bounds,
	 * it will snap to the edge of the options array. If delta == 0 and the given index is not selectable
	 */
	private _getNextSelectableIndex;
	/**
	 * Set the selected index. Note, this is
	 * the "real" selected index, not the pending selected index
	 * @param index - the index to set (or the index to set from if a search direction is provided)
	 * @param searchDirection - the direction to search along the options from the given index
	 */
	private _setSelectedIndex;
	/**
	 * Focus (and select) the content of the input
	 * and set the focused state
	 */
	private _select;
	/**
	 * Callback issued when the options should be resolved, if they have been updated or
	 * if they need to be passed in the first time. This only does work if an onResolveOptions
	 * callback was passed in
	 */
	private _onResolveOptions;
	/**
	 * OnBlur handler. Set the focused state to false
	 * and submit any pending value
	 */
	private _onBlur;
	/**
	 * Submit a pending value if there is one
	 */
	private _submitPendingValue;
	private _onRenderContainer;
	private _onLayerMounted;
	private _onRenderList;
	private _onRenderItem;
	private _onRenderLowerContent;
	private _renderSeparator;
	private _renderHeader;
	private _renderOption;
	/**
	 * If we are coming from a mouseOut:
	 * there is no visible selected option.
	 *
	 * Else if We are hovering over an item:
	 * that gets the selected look.
	 *
	 * Else:
	 * Use the current valid pending index if it exists OR
	 * we do not have a valid index and we currently have a pending input value,
	 * otherwise use the selected index
	 * */
	private _isOptionSelected;
	/**
	 * Gets the pending selected index taking into account hover, valueValidIndex, and selectedIndex
	 * @param includeCurrentPendingValue - Should we include the currentPendingValue when
	 * finding the index
	 */
	private _getPendingSelectedIndex;
	/**
	 * Scroll handler for the callout to make sure the mouse events
	 * for updating focus are not interacting during scroll
	 */
	private _onScroll;
	/**
	 * Scroll the selected element into view
	 */
	private _scrollIntoView;
	private _onRenderOptionContent;
	/**
	 * Click handler for the menu items
	 * to select the item and also close the menu
	 * @param index - the index of the item that was clicked
	 */
	private _onItemClick;
	/**
	 * Handles dismissing (cancelling) the menu
	 */
	private _onDismiss;
	/**
	 * Get the index of the option that is marked as selected
	 * @param options - the comboBox options
	 * @param selectedKeys - the known selected key to find
	 * @returns - the index of the selected option, -1 if not found
	 */
	private _getSelectedIndices;
	/**
	 * Reset the selected index by clearing the
	 * input (of any pending text), clearing the pending state,
	 * and setting the suggested display value to the last
	 * selected state text
	 */
	private _resetSelectedIndex;
	/**
	 * Clears the pending info state
	 */
	private _clearPendingInfo;
	private _onAfterClearPendingInfo;
	/**
	 * Set the pending info
	 * @param currentPendingValue - new pending value to set
	 * @param currentPendingValueValidIndex - new pending value index to set
	 * @param suggestedDisplayValue - new suggest display value to set
	 */
	private _setPendingInfo;
	/**
	 * Set the pending info from the given index
	 * @param index - the index to set the pending info from
	 */
	private _setPendingInfoFromIndex;
	/**
	 * Sets the pending info for the comboBox
	 * @param index - the index to search from
	 * @param searchDirection - the direction to search
	 */
	private _setPendingInfoFromIndexAndDirection;
	private _notifyPendingValueChanged;
	/**
	 * Sets the isOpen state and updates focusInputAfterClose
	 */
	private _setOpenStateAndFocusOnClose;
	/**
	 * Handle keydown on the input
	 * @param ev - The keyboard event that was fired
	 */
	private _onInputKeyDown;
	/**
	 * Returns true if the key for the event is alt (Mac option) or meta (Mac command).
	 */
	private _isAltOrMeta;
	/**
	 * Handle keyup on the input
	 * @param ev - the keyboard event that was fired
	 */
	private _onInputKeyUp;
	private _onOptionMouseEnter;
	private _onOptionMouseMove;
	private _onOptionMouseLeave;
	private _shouldIgnoreMouseEvent;
	/**
	 * Handle dismissing the menu and
	 * eating the required key event when disabled
	 * @param ev - the keyboard event that was fired
	 */
	private _handleInputWhenDisabled;
	/**
	 * Click handler for the button of the comboBox
	 * and the input when not allowing freeform. This
	 * toggles the expand/collapse state of the comboBox (if enbled)
	 */
	private _onComboBoxClick;
	/**
	 * Click handler for the autofill.
	 */
	private _onAutofillClick;
	private _onTouchStart;
	private _onPointerDown;
	private _handleTouchAndPointerEvent;
	/**
	 * Get the styles for the current option.
	 * @param item Item props for the current option
	 */
	private _getCaretButtonStyles;
	/**
	 * Get the styles for the current option.
	 * @param item Item props for the current option
	 */
	private _getCurrentOptionStyles;
	/**
	 * Get the aria-activedescendant value for the comboxbox.
	 * @returns the id of the current focused combo item, otherwise the id of the currently selected element, null otherwise
	 */
	private _getAriaActiveDescentValue;
	/**
	 * Get the aria autocomplete value for the Combobox
	 * @returns 'inline' if auto-complete automatically dynamic, 'both' if we have a list of possible values to pick from and can
	 * dynamically populate input, and 'none' if auto-complete is not enabled as we can't give user inputs.
	 */
	private _getAriaAutoCompleteValue;
	private _isPendingOption;
	/**
	 * Given default selected key(s) and selected key(s), return the selected keys(s).
	 * When default selected key(s) are available, they take precedence and return them instead of selected key(s).
	 *
	 * @returns No matter what specific types the input parameters are, always return an array of
	 *  either strings or numbers instead of premitive type.  This normlization makes caller's logic easier.
	 */
	private _buildDefaultSelectedKeys;
	private _buildSelectedKeys;
	private _getPreviewText;
	private _normalizeToString;
	private _removeZeroWidthSpaces;
}
export declare class VirtualizedComboBox extends BaseComponent<IComboBoxProps, {}> implements IComboBox {
	/** The combo box element */
	private _comboBox;
	/** The virtualized list element */
	private _list;
	dismissMenu(): void;
	focus(): boolean;
	render(): JSX.Element;
	protected _onRenderList: (props: IComboBoxProps) => JSX.Element;
	protected _onScrollToItem: (itemIndex: number) => void;
}
export interface ICommandBarData {
	/**
	 * Items being rendered in the primary region
	 */
	primaryItems: ICommandBarItemProps[];
	/**
	 * Items being rendered in the overflow
	 */
	overflowItems: ICommandBarItemProps[];
	/**
	 * Items being rendered on the far side
	 */
	farItems: ICommandBarItemProps[] | undefined;
	/**
	 * Length of original overflowItems to ensure that they are not moved into primary region on resize
	 */
	minimumOverflowItems: number;
	/**
	 * Unique string used to cache the width of the command bar
	 */
	cacheKey: string;
}
export declare class CommandBarBase extends BaseComponent<ICommandBarProps, {}> implements ICommandBar {
	static defaultProps: ICommandBarProps;
	private _overflowSet;
	private _resizeGroup;
	private _classNames;
	render(): JSX.Element;
	focus(): void;
	remeasure(): void;
	private _onRenderData;
	private _onRenderItem;
	private _onButtonClick;
	private _onRenderOverflowButton;
	private _computeCacheKey;
	private _onReduceData;
	private _onGrowData;
}
export declare class TooltipBase extends BaseComponent<ITooltipProps, any> {
	static defaultProps: Partial<ITooltipProps>;
	private _classNames;
	render(): JSX.Element;
	private _onRenderContent;
}
export interface ITooltip {
}
/**
 * Tooltip component props.
 */
export interface ITooltipProps extends React.HTMLAttributes<HTMLDivElement | TooltipBase> {
	/**
	 * Optional callback to access the ITooltip interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<ITooltip>;
	/**
	 * Properties to pass through for Callout, reference detail properties in ICalloutProps
	 * @defaultvalue isBeakVisible: true, beakWidth: 16, gapSpace: 0, setInitialFocus: true, doNotLayer: false
	 */
	calloutProps?: ICalloutProps;
	/**
	 *  String to be passed to the tooltip
	 */
	content?: string;
	/**
	 *  Render function to populate content area
	 */
	onRenderContent?: IRenderFunction<ITooltipProps>;
	/**
	 * Length of delay. Can be set to zero if you do not want a delay.
	 * @defaultvalue medium
	 */
	delay?: TooltipDelay;
	/**
	 * Max width of tooltip
	 * @defaultvalue 364px
	 */
	maxWidth?: string | null;
	/**
	 * Element to anchor the Tooltip to.
	 */
	targetElement?: HTMLElement;
	/**
	 * Indicator of how the tooltip should be anchored to its targetElement.
	 * @defaultvalue DirectionalHint.topCenter
	 */
	directionalHint?: DirectionalHint;
	/**
	 * How the element should be positioned in RTL layouts.
	 * If not specified, a mirror of `directionalHint` will be used instead
	 */
	directionalHintForRTL?: DirectionalHint;
	/**
	 * Theme to apply to the component.
	 */
	theme?: ITheme;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<ITooltipStyleProps, ITooltipStyles>;
}
export declare enum TooltipDelay {
	zero = 0,
	medium = 1,
	long = 2
}
export interface ITooltipStyleProps {
	/**
	 * Accept theme prop.
	 */
	theme: ITheme;
	/**
	 * Accept custom classNames
	 */
	className?: string;
	/**
	 * Delay before tooltip appears.
	 */
	delay?: TooltipDelay;
	/**
	 * Maximum width of tooltip.
	 */
	maxWidth?: string;
}
export interface ITooltipStyles {
	/**
	 * Style for the root element.
	 */
	root: IStyle;
	/**
	 * Style for the content element.
	 */
	content: IStyle;
	/**
	 * Style for the subtext element.
	 */
	subText: IStyle;
}
export declare const Tooltip: (props: ITooltipProps) => JSX.Element;
export interface ITooltipHostState {
	isTooltipVisible: boolean;
}
export declare class TooltipHostBase extends BaseComponent<ITooltipHostProps, ITooltipHostState> implements ITooltipHost {
	static defaultProps: {
		delay: TooltipDelay;
	};
	private static _currentVisibleTooltip;
	private _tooltipHost;
	private _classNames;
	private _closingTimer;
	constructor(props: ITooltipHostProps);
	render(): JSX.Element;
	componentWillUnmount(): void;
	show: () => void;
	dismiss: () => void;
	private _getTargetElement;
	private _onTooltipMouseEnter;
	private _onTooltipMouseLeave;
	private _clearDismissTimer;
	private _hideTooltip;
	private _toggleTooltip;
}
export interface ITooltipHost {
	/**
	 * Shows the tooltip.
	 */
	show: () => void;
	/**
	 * Dismisses the tooltip.
	 */
	dismiss: () => void;
}
export declare enum TooltipOverflowMode {
	/** Only show tooltip if parent DOM element is overflowing */
	Parent = 0,
	/** Only show tooltip if tooltip host's content is overflowing */
	Self = 1
}
/**
 * Tooltip component props.
 */
export interface ITooltipHostProps extends React.HTMLAttributes<HTMLDivElement | TooltipHostBase> {
	/**
	 * Optional callback to access the ITooltipHost interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<ITooltipHost>;
	/**
	 * Additional properties to pass through for Callout, reference detail properties in ICalloutProps
	 */
	calloutProps?: ICalloutProps;
	/**
	 * Optionally a number of milliseconds to delay closing the tooltip, so that
	 * the user has time to hover over the tooltip and interact with it. Hovering
	 * over the tooltip will count as hovering over the host, so that the tooltip
	 * will stay open if the user is actively interacting with it.
	 */
	closeDelay?: number;
	/**
	 * String to be passed to the tooltip
	 */
	content?: string;
	/**
	 * Length of delay
	 * @defaultvalue medium
	 */
	delay?: TooltipDelay;
	/**
	 * Indicator of how the tooltip should be anchored to its targetElement.
	 */
	directionalHint?: DirectionalHint;
	/**
	 * How the element should be positioned in RTL layouts.
	 * If not specified, a mirror of `directionalHint` will be used instead
	 */
	directionalHintForRTL?: DirectionalHint;
	/**
	 * Optional class name to apply to tooltip host.
	 */
	hostClassName?: string;
	/**
	 * Only show if there is overflow. If set, the tooltip hosts observes  and only shows the tooltip if this element has overflow.
	 * It also uses the parent as target element for the tooltip.
	 */
	overflowMode?: TooltipOverflowMode;
	/**
	 * Whether or not to mark the container as described by the tooltip.
	 * If not specified, the caller should mark as element as described by the tooltip id.
	 */
	setAriaDescribedBy?: boolean;
	/**
	 * Additional properties to pass through for Tooltip, reference detail properties in ITooltipProps
	 */
	tooltipProps?: ITooltipProps;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<ITooltipHostStyleProps, ITooltipHostStyles>;
	/**
	 * Theme provided by High-Order Component.
	 */
	theme?: ITheme;
	/**
	 * Notifies when tooltip becomes visible or hidden, whatever the trigger was.
	 */
	onTooltipToggle?(isTooltipVisible: boolean): void;
}
export interface ITooltipHostStyleProps {
	/**
	 * Accept theme prop.
	 */
	theme: ITheme;
	/**
	 * Accept optional classNames for the host wrapper
	 */
	className?: string;
}
export interface ITooltipHostStyles {
	/**
	 * Style for the host wrapper element.
	 */
	root: IStyle;
}
export declare const TooltipHost: (props: ITooltipHostProps) => JSX.Element;
export interface ICommandBar {
	/**
	 * Sets focus to the active command in the list.
	 */
	focus(): void;
	/**
	 * Remeasures the available space.
	 */
	remeasure(): void;
}
export interface ICommandBarProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Optional callback to access the ICommandBar interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<ICommandBar>;
	/**
	 * Items to render. ICommandBarItemProps extend IContextualMenuItem
	 */
	items: ICommandBarItemProps[];
	/**
	 * Items to render on the right side (or left, in RTL). ICommandBarItemProps extend IContextualMenuItem
	 */
	farItems?: ICommandBarItemProps[];
	/**
	 * Default items to have in the overflow menu. ICommandBarItemProps extend IContextualMenuItem
	 */
	overflowItems?: ICommandBarItemProps[];
	/**
	 * Props to be passed to overflow button.
	 * If menuProps are passed through this prop, any items provided will be prepended to the top of the existing menu.
	 */
	overflowButtonProps?: IButtonProps;
	/**
	 * Custom button to be used as oveflow button
	 */
	overflowButtonAs?: IComponentAs<IButtonProps>;
	/**
	 * Custom button to be used as near and far items
	 */
	buttonAs?: IComponentAs<IButtonProps>;
	/**
	 * When true, items will be 'shifted' off the front of the array when reduced, and unshifted during grow
	 */
	shiftOnReduce?: Boolean;
	/**
	 * Custom function to reduce data if items do not fit in given space. Return `undefined`
	 * if no more steps can be taken to avoid infinate loop.
	 */
	onReduceData?: (data: ICommandBarData) => ICommandBarData;
	/**
	 * Custom function to grow data if items are too small for the given space.
	 * Return `undefined` if no more steps can be taken to avoid infinate loop.
	 */
	onGrowData?: (data: ICommandBarData) => ICommandBarData;
	/**
	 * Function callback invoked when data has been reduced.
	 */
	onDataReduced?: (movedItem: ICommandBarItemProps) => void;
	/**
	 * Function callback invoked when data has been grown.
	 */
	onDataGrown?: (movedItem: ICommandBarItemProps) => void;
	/**
	 * Additional css class to apply to the command bar
	 * @defaultvalue undefined
	 */
	className?: string;
	/**
	 * Accessibility text to be read by the screen reader when the user's
	 * focus enters the command bar. The screen reader will read this text
	 * after reading information about the first focusable item in the command
	 * bar.
	 */
	ariaLabel?: string;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules
	 */
	styles?: IStyleFunctionOrObject<ICommandBarStyleProps, ICommandBarStyles>;
	/**
	 * Theme provided by HOC.
	 */
	theme?: ITheme;
}
export interface ICommandBarItemProps extends IContextualMenuItem {
	/**
	 * Remove text when button is not in the overflow
	 * @defaultvalue false
	 */
	iconOnly?: boolean;
	/**
	 * Props to pass into tooltip during iconOnly
	 */
	tooltipHostProps?: ITooltipHostProps;
	/**
	 * Custom styles for individual button
	 */
	buttonStyles?: IButtonStyles;
	/**
	 * A custom cache key to be used for this item. If cacheKey is changed, the cache will invalidate. Defaults to key value;
	 */
	cacheKey?: string;
	/**
	 * Context under which the item is being rendered
	 * This value is controlled by the component and useful for adjusting onRender function
	 */
	renderedInOverflow?: boolean;
	/**
	 * Method to override the render of the individual command bar button. Note, is not used when rendered in overflow
	 * @defaultvalue CommandBarButton
	 */
	commandBarButtonAs?: IComponentAs<ICommandBarItemProps>;
}
export interface ICommandBarStyleProps {
	theme: ITheme;
	className?: string;
}
export interface ICommandBarStyles {
	root?: IStyle;
	primarySet?: IStyle;
	secondarySet?: IStyle;
}
export declare const CommandBar: (props: ICommandBarProps) => JSX.Element;
export interface IDatePicker {
	/** Sets focus to the text field */
	focus(): void;
	/** Reset the state of the picker to the default */
	reset(): void;
}
export interface IDatePickerProps extends IBaseProps<IDatePicker>, React.HTMLAttributes<HTMLElement> {
	/**
	 * Optional callback to access the IDatePicker interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IDatePicker>;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunction<IDatePickerStyleProps, IDatePickerStyles>;
	/**
	 * Theme provided by High-Order Component.
	 */
	theme?: ITheme;
	/**
	 * Pass callout props to callout component
	 */
	calloutProps?: ICalloutProps;
	/**
	 * Pass calendar props to calendar component
	 */
	calendarProps?: ICalendarProps;
	/**
	 * Custom Calendar to be used for date picking
	 */
	calendarAs?: IComponentAs<ICalendarProps>;
	/**
	 * Callback issued when a date is selected
	 */
	onSelectDate?: (date: Date | null | undefined) => void;
	/**
	 * Label for the DatePicker
	 */
	label?: string;
	/**
	 * Whether the DatePicker is a required field or not
	 * @defaultvalue false
	 */
	isRequired?: boolean;
	/**
	 * Disabled state of the DatePicker.
	 * @defaultvalue false
	 */
	disabled?: boolean;
	/**
	 * Aria Label for TextField of the DatePicker for screen reader users.
	 */
	ariaLabel?: string;
	/**
	 * Whether or not the Textfield of the DatePicker is underlined.
	 * @defaultvalue false
	 */
	underlined?: boolean;
	/**
	 * Aria label for date picker popup for screen reader users.
	 * @defaultvalue Calendar
	 */
	pickerAriaLabel?: string;
	/**
	 * Whether the month picker is shown beside the day picker or hidden.
	 * @defaultvalue true
	 */
	isMonthPickerVisible?: boolean;
	/**
	 * Show month picker on top of date picker when visible.
	 * @defaultvalue false
	 */
	showMonthPickerAsOverlay?: boolean;
	/**
	 * Whether the DatePicker allows input a date string directly or not
	 * @defaultvalue false
	 */
	allowTextInput?: boolean;
	/**
	 * Whether the DatePicker should open automatically when the control is focused
	 * @defaultvalue false
	 */
	disableAutoFocus?: boolean;
	/**
	 * Placeholder text for the DatePicker
	 */
	placeholder?: string;
	/**
	 * Value of today. If null, current time in client machine will be used.
	 */
	today?: Date;
	/**
	 * Default value of the DatePicker, if any
	 */
	value?: Date;
	/**
	 * Optional method to format the chosen date to a string to display in the DatePicker
	 * @defaultvalue date.toString()
	 */
	formatDate?: (date?: Date) => string;
	/**
	 * Optional method to parse the text input value to date, it is only useful when allowTextInput is set to true
	 * @defaultvalue new Date(Date.parse(dateStr))
	 */
	parseDateFromString?: (dateStr: string) => Date | null;
	/**
	 * The first day of the week for your locale.
	 * @defaultvalue DayOfWeek.Sunday
	 */
	firstDayOfWeek?: DayOfWeek;
	/**
	 * Localized strings to use in the DatePicker
	 */
	strings?: IDatePickerStrings;
	/**
	 * Whether the month picker should highlight the current month
	 * @defaultvalue false
	 */
	highlightCurrentMonth?: boolean;
	/**
	 * Whether the month picker should highlight the selected month
	 * @defaultvalue false
	 */
	highlightSelectedMonth?: boolean;
	/**
	 * Whether the calendar should show the week number (weeks 1 to 53) before each week row
	 * @defaultvalue false
	 */
	showWeekNumbers?: boolean;
	/**
	 * Defines when the first week of the year should start, FirstWeekOfYear.FirstDay,
	 * FirstWeekOfYear.FirstFullWeek or FirstWeekOfYear.FirstFourDayWeek are the possible values
	 * @defaultvalue FirstWeekOfYear.FirstFullWeek
	 */
	firstWeekOfYear?: FirstWeekOfYear;
	/**
	 * Whether the "Go to today" link should be shown or not
	 */
	showGoToToday?: boolean;
	/**
	 * Determines if DatePicker has a border.
	 * @defaultvalue false
	 */
	borderless?: boolean;
	/**
	 * Optional Classname for datepicker root element .
	 */
	className?: string;
	/**
	 * Apply additional formating to dates, for example localized date formatting.
	 */
	dateTimeFormatter?: ICalendarFormatDateCallbacks;
	/**
	 * The minimum allowable date.
	 */
	minDate?: Date;
	/**
	 * The maximum allowable date.
	 */
	maxDate?: Date;
	/**
	 * The initially highlighted date in the calendar picker
	 */
	initialPickerDate?: Date;
	/**
	 * Allows all elements to be focused, including disabled ones
	 * @defaultvalue false
	 */
	allFocusable?: boolean;
	/**
	 * Callback that runs after DatePicker's menu (Calendar) is closed
	 */
	onAfterMenuDismiss?: () => void;
	/**
	 * Whether the CalendarDay close button should be shown or not.
	 */
	showCloseButton?: boolean;
	/**
	 * The tabIndex of the TextField
	 */
	tabIndex?: number;
}
export interface IDatePickerStrings {
	/**
	 * An array of strings for the full names of months.
	 * The array is 0-based, so months[0] should be the full name of January.
	 */
	months: string[];
	/**
	 * An array of strings for the short names of months.
	 * The array is 0-based, so shortMonths[0] should be the short name of January.
	 */
	shortMonths: string[];
	/**
	 * An array of strings for the full names of days of the week.
	 * The array is 0-based, so days[0] should be the full name of Sunday.
	 */
	days: string[];
	/**
	 * An array of strings for the initials of the days of the week.
	 * The array is 0-based, so days[0] should be the initial of Sunday.
	 */
	shortDays: string[];
	/**
	 * String to render for button to direct the user to today's date.
	 */
	goToToday: string;
	/**
	 * Error message to render for TextField if isRequired validation fails.
	 */
	isRequiredErrorMessage?: string;
	/**
	 * Error message to render for TextField if input date string parsing fails.
	 */
	invalidInputErrorMessage?: string;
	/**
	 * Error message to render for TextField if date boundary (minDate, maxDate) validation fails.
	 */
	isOutOfBoundsErrorMessage?: string;
	/**
	 * Aria-label for the "previous month" button.
	 */
	prevMonthAriaLabel?: string;
	/**
	 * Aria-label for the "next month" button.
	 */
	nextMonthAriaLabel?: string;
	/**
	 * Aria-label for the "previous year" button.
	 */
	prevYearAriaLabel?: string;
	/**
	 * Aria-label for the "next year" button.
	 */
	nextYearAriaLabel?: string;
	/**
	 * Aria-label for the "close" button.
	 */
	closeButtonAriaLabel?: string;
}
export interface IDatePickerStyleProps {
	/**
	 * Theme provided by High-Order Component.
	 */
	theme: ITheme;
	/**
	 * Accept custom classNames
	 */
	className?: string;
	disabled?: boolean;
	label?: boolean;
	isDatePickerShown?: boolean;
}
export interface IDatePickerStyles {
	/**
	 * Style for the root element.
	 */
	root: IStyle;
	textField: IStyle;
	callout: IStyle;
	icon: IStyle;
}
/**
 * DatePicker description
 */
export declare const DatePicker: (props: IDatePickerProps) => JSX.Element;
export interface IDatePickerState {
	selectedDate?: Date;
	formattedDate?: string;
	isDatePickerShown?: boolean;
	errorMessage?: string;
}
export declare class DatePickerBase extends BaseComponent<IDatePickerProps, IDatePickerState> implements IDatePicker {
	static defaultProps: IDatePickerProps;
	private _calendar;
	private _datePickerDiv;
	private _textField;
	private _preventFocusOpeningPicker;
	private _id;
	constructor(props: IDatePickerProps);
	componentWillReceiveProps(nextProps: IDatePickerProps): void;
	componentDidUpdate(prevProps: IDatePickerProps, prevState: IDatePickerState): void;
	render(): JSX.Element;
	focus(): void;
	reset(): void;
	private _onSelectDate;
	private _onCalloutPositioned;
	private _onTextFieldFocus;
	private _onTextFieldBlur;
	private _onTextFieldChanged;
	private _onTextFieldKeyDown;
	private _onTextFieldClick;
	private _onIconClick;
	private _showDatePickerPopup;
	private _dismissDatePickerPopup;
	/**
	 * Callback for closing the calendar callout
	 */
	private _calendarDismissed;
	private _handleEscKey;
	private _validateTextInput;
	private _getDefaultState;
	private _isDateOutOfBounds;
}
export interface IObjectWithKey {
	key?: string | number;
}
export declare const SELECTION_CHANGE = "change";
export declare enum SelectionMode {
	none = 0,
	single = 1,
	multiple = 2
}
export interface ISelection {
	count: number;
	mode: SelectionMode;
	canSelectItem: (item: IObjectWithKey, index?: number) => boolean;
	setChangeEvents(isEnabled: boolean, suppressChange?: boolean): void;
	setItems(items: IObjectWithKey[], shouldClear: boolean): void;
	getItems(): IObjectWithKey[];
	getSelection(): IObjectWithKey[];
	getSelectedIndices(): number[];
	getSelectedCount(): number;
	isRangeSelected(fromIndex: number, count: number): boolean;
	isAllSelected(): boolean;
	isKeySelected(key: string): boolean;
	isIndexSelected(index: number): boolean;
	isModal?(): boolean;
	setAllSelected(isAllSelected: boolean): void;
	setKeySelected(key: string, isSelected: boolean, shouldAnchor: boolean): void;
	setIndexSelected(index: number, isSelected: boolean, shouldAnchor: boolean): void;
	setModal?(isModal: boolean): void;
	selectToKey(key: string, clearSelection?: boolean): void;
	selectToIndex(index: number, clearSelection?: boolean): void;
	toggleAllSelected(): void;
	toggleKeySelected(key: string): void;
	toggleIndexSelected(index: number): void;
	toggleRangeSelected(fromIndex: number, count: number): void;
}
export declare enum SelectionDirection {
	horizontal = 0,
	vertical = 1
}
export interface ISelectionOptions {
	onSelectionChanged?: () => void;
	getKey?: (item: IObjectWithKey, index?: number) => string | number;
	canSelectItem?: (item: IObjectWithKey, index?: number) => boolean;
	selectionMode?: SelectionMode;
}
export declare class Selection implements ISelection {
	count: number;
	readonly mode: SelectionMode;
	private _getKey;
	private _canSelectItem;
	private _changeEventSuppressionCount;
	private _items;
	private _selectedItems;
	private _selectedIndices;
	private _isAllSelected;
	private _exemptedIndices;
	private _exemptedCount;
	private _keyToIndexMap;
	private _anchoredIndex;
	private _onSelectionChanged;
	private _hasChanged;
	private _unselectableIndices;
	private _unselectableCount;
	private _isModal;
	constructor(options?: ISelectionOptions);
	canSelectItem(item: IObjectWithKey, index?: number): boolean;
	getKey(item: IObjectWithKey, index?: number): string;
	setChangeEvents(isEnabled: boolean, suppressChange?: boolean): void;
	isModal(): boolean;
	setModal(isModal: boolean): void;
	/**
	 * Selection needs the items, call this method to set them. If the set
	 * of items is the same, this will re-evaluate selection and index maps.
	 * Otherwise, shouldClear should be set to true, so that selection is
	 * cleared.
	 */
	setItems(items: IObjectWithKey[], shouldClear?: boolean): void;
	getItems(): IObjectWithKey[];
	getSelection(): IObjectWithKey[];
	getSelectedCount(): number;
	getSelectedIndices(): number[];
	isRangeSelected(fromIndex: number, count: number): boolean;
	isAllSelected(): boolean;
	isKeySelected(key: string): boolean;
	isIndexSelected(index: number): boolean;
	setAllSelected(isAllSelected: boolean): void;
	setKeySelected(key: string, isSelected: boolean, shouldAnchor: boolean): void;
	setIndexSelected(index: number, isSelected: boolean, shouldAnchor: boolean): void;
	selectToKey(key: string, clearSelection?: boolean): void;
	selectToIndex(index: number, clearSelection?: boolean): void;
	toggleAllSelected(): void;
	toggleKeySelected(key: string): void;
	toggleIndexSelected(index: number): void;
	toggleRangeSelected(fromIndex: number, count: number): void;
	private _updateCount;
	private _change;
}
export interface ISelectionZone {
	ignoreNextFocus: () => void;
}
export interface ISelectionZoneProps extends React.Props<SelectionZone> {
	componentRef?: () => void;
	selection: ISelection;
	/**
	 * @deprecated No longer in use, focus is now managed by FocusZone
	 */
	layout?: {};
	selectionMode?: SelectionMode;
	selectionPreservedOnEmptyClick?: boolean;
	disableAutoSelectOnInputElements?: boolean;
	enterModalOnTouch?: boolean;
	isSelectedOnFocus?: boolean;
	onItemInvoked?: (item?: IObjectWithKey, index?: number, ev?: Event) => void;
	onItemContextMenu?: (item?: any, index?: number, ev?: Event) => void | boolean;
}
export declare class SelectionZone extends BaseComponent<ISelectionZoneProps, {}> {
	static defaultProps: {
		isMultiSelectEnabled: boolean;
		isSelectedOnFocus: boolean;
		selectionMode: SelectionMode;
	};
	private _root;
	private _isCtrlPressed;
	private _isShiftPressed;
	private _isMetaPressed;
	private _isTabPressed;
	private _shouldHandleFocus;
	private _shouldHandleFocusTimeoutId;
	private _isTouch;
	private _isTouchTimeoutId;
	componentDidMount(): void;
	render(): JSX.Element;
	/**
	 * In some cases, the consuming scenario requires to set focus on a row without having SelectionZone
	 * react to the event. Note that focus events in IE \<= 11 will occur asynchronously after .focus() has
	 * been called on an element, so we need a flag to store the idea that we will bypass the "next"
	 * focus event that occurs. This method does that.
	 */
	ignoreNextFocus: () => void;
	private _onMouseDownCapture;
	/**
	 * When we focus an item, for single/multi select scenarios, we should try to select it immediately
	 * as long as the focus did not originate from a mouse down/touch event. For those cases, we handle them
	 * specially.
	 */
	private _onFocus;
	private _onMouseDown;
	private _onTouchStartCapture;
	private _onClick;
	private _onContextMenu;
	private _isSelectionDisabled;
	/**
	 * In multi selection, if you double click within an item's root (but not within the invoke element or input elements),
	 * we should execute the invoke handler.
	 */
	private _onDoubleClick;
	private _onKeyDownCapture;
	private _onKeyDown;
	private _onToggleAllClick;
	private _onToggleClick;
	private _onInvokeClick;
	private _onItemSurfaceClick;
	private _onInvokeMouseDown;
	private _tryClearOnEmptyClick;
	private _clearAndSelectIndex;
	/**
	 * We need to track the modifier key states so that when focus events occur, which do not contain
	 * modifier states in the Event object, we know how to behave.
	 */
	private _updateModifiers;
	private _findItemRoot;
	private _getItemIndex;
	private _shouldAutoSelect;
	private _hasAttribute;
	private _isInputElement;
	private _isNonHandledClick;
	private _handleNextFocus;
	private _setIsTouch;
	private _getSelectionMode;
}
export declare const ScrollToMode: {
	/**
	 * Does not make any consideration to where in the viewport the item should align to.
	 */
	auto: 0;
	/**
	 * Attempts to scroll the list so the top of the desired item is aligned with the top of the viewport.
	 */
	top: 1;
	/**
	 * Attempts to scroll the list so the bottom of the desired item is aligned with the bottom of the viewport.
	 */
	bottom: 2;
	/**
	 * Attempts to scroll the list so the desired item is in the exact center of the viewport.
	 */
	center: 3;
};
export declare type ScrollToMode = typeof ScrollToMode[keyof typeof ScrollToMode];
export interface IList {
	/**
	 * Force the component to update.
	 */
	forceUpdate: () => void;
	/**
	 * Scroll to the given index. By default will bring the page the specified item is on into the view. If a callback
	 * to measure the height of an individual item is specified, will only scroll to bring the specific item into view.
	 *
	 * Note: with items of variable height and no passed in `getPageHeight` method, the list might jump after scrolling
	 * when windows before/ahead are being rendered, and the estimated height is replaced using actual elements.
	 *
	 * @param index - Index of item to scroll to
	 * @param measureItem - Optional callback to measure the height of an individual item
	 * @param scrollToMode - Optional defines the behavior of the scrolling alignment. Defaults to auto.
	 *  Note: The scrollToMode requires the measureItem callback is provided to function.
	 */
	scrollToIndex: (index: number, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode) => void;
	/**
	 * Get the start index of the page that is currently in view
	 */
	getStartItemIndexInView: () => number;
}
export interface IListProps extends React.HTMLAttributes<List | HTMLDivElement> {
	/**
	 * Optional callback to access the IList interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IList>;
	/** Optional classname to append to root list. */
	className?: string;
	/** Items to render. */
	items?: any[];
	/**
	 * Method to call when trying to render an item.
	 * @param item - The the data associated with the cell that is being rendered.
	 * @param index - The index of the cell being rendered.
	 * @param isScrolling - True if the list is being scrolled. May be useful for rendering a placeholder if your cells are complex.
	 */
	onRenderCell?: (item?: any, index?: number, isScrolling?: boolean) => React.ReactNode;
	/**
	 * Optional callback invoked when List rendering completed.
	 * This can be on initial mount or on re-render due to scrolling.
	 * This method will be called as a result of changes in List pages (added or removed),
	 * and after ALL the changes complete.
	 * To track individual page Add / Remove use onPageAdded / onPageRemoved instead.
	 * @param pages - The current array of pages in the List.
	 */
	onPagesUpdated?: (pages: IPage[]) => void;
	/** Optional callback for monitoring when a page is added. */
	onPageAdded?: (page: IPage) => void;
	/** Optional callback for monitoring when a page is removed. */
	onPageRemoved?: (page: IPage) => void;
	/** Optional callback to get the item key, to be used on render. */
	getKey?: (item: any, index?: number) => string;
	/**
	 * Called by the list to get the specification for a page.
	 * Use this method to provide an allocation of items per page,
	 * as well as an estimated rendered height for the page.
	 * The list will use this to optimize virtualization.
	 */
	getPageSpecification?: (itemIndex?: number, visibleRect?: IRectangle) => IPageSpecification;
	/**
	 * Method called by the list to get how many items to render per page from specified index.
	 * In general, use `getPageSpecification` instead.
	 */
	getItemCountForPage?: (itemIndex?: number, visibleRect?: IRectangle) => number;
	/**
	 * Method called by the list to get the pixel height for a given page. By default, we measure the first
	 * page's height and default all other pages to that height when calculating the surface space. It is
	 * ideal to be able to adequately predict page heights in order to keep the surface space from jumping
	 * in pixels, which has been seen to cause browser performance issues.
	 * In general, use `getPageSpecification` instead.
	 */
	getPageHeight?: (itemIndex?: number, visibleRect?: IRectangle) => number;
	/**
	 * Method called by the list to derive the page style object. For spacer pages, the list will derive
	 * the height and passed in heights will be ignored.
	 */
	getPageStyle?: (page: IPage) => any;
	/**
	 * In addition to the visible window, how many windowHeights should we render ahead.
	 * @defaultvalue 2
	 */
	renderedWindowsAhead?: number;
	/**
	 * In addition to the visible window, how many windowHeights should we render behind.
	 * @defaultvalue 2
	 */
	renderedWindowsBehind?: number;
	/** Index in items array to start rendering from. Defaults to 0. */
	startIndex?: number;
	/** Number of items to render. Defaults to items.length. */
	renderCount?: number;
	/**
	 * Boolean value to enable render page caching. This is an experimental performance optimization
	 * that is off by default.
	 * @defaultvalue false
	 */
	usePageCache?: boolean;
	/**
	 * Optional callback to determine whether the list should be rendered in full, or virtualized.
	 * Virtualization will add and remove pages of items as the user scrolls them into the visible range.
	 * This benefits larger list scenarios by reducing the DOM on the screen, but can negatively affect performance for smaller lists.
	 * The default implementation will virtualize when this callback is not provided.
	 */
	onShouldVirtualize?: (props: IListProps) => boolean;
	/**
	 * The role to assign to the list root element.
	 * Use this to override the default assignment of 'list' to the root and 'listitem' to the cells.
	 */
	role?: string;
	/**
	 * Called when the List will render a page.
	 * Override this to control how cells are rendered within a page.
	 */
	onRenderPage?: (pageProps: IPageProps, defaultRender?: IRenderFunction<IPageProps>) => React.ReactNode;
}
export interface IPage {
	key: string;
	items: any[] | undefined;
	startIndex: number;
	itemCount: number;
	style: any;
	top: number;
	height: number;
	data?: any;
	isSpacer?: boolean;
}
export interface IPageProps extends React.HTMLAttributes<HTMLDivElement>, React.ClassAttributes<HTMLDivElement> {
	/**
	 * The role being assigned to the rendered page element by the list.
	 */
	role?: string;
	/**
	 * The allocation data for the page.
	 */
	page: IPage;
}
export interface IPageSpecification {
	/**
	 * The number of items to allocate to the page.
	 */
	itemCount?: number;
	/**
	 * The estimated pixel height of the page.
	 */
	height?: number;
	/**
	 * Data to pass through to the page when rendering.
	 */
	data?: any;
	/**
	 * The key to use when creating the page.
	 */
	key?: string;
}
export interface IListState {
	pages?: IPage[];
	/** The last versionstamp for  */
	measureVersion?: number;
	isScrolling?: boolean;
}
/**
 * The List renders virtualized pages of items. Each page's item count is determined by the getItemCountForPage callback if
 * provided by the caller, or 10 as default. Each page's height is determined by the getPageHeight callback if provided by
 * the caller, or by cached measurements if available, or by a running average, or a default fallback.
 *
 * The algorithm for rendering pages works like this:
 *
 * 1. Predict visible pages based on "current measure data" (page heights, surface position, visible window)
 * 2. If changes are necessary, apply changes (add/remove pages)
 * 3. For pages that are added, measure the page heights if we need to using getBoundingClientRect
 * 4. If measurements don't match predictions, update measure data and goto step 1 asynchronously
 *
 * Measuring too frequently can pull performance down significantly. To compensate, we cache measured values so that
 * we can avoid re-measuring during operations that should not alter heights, like scrolling.
 *
 * To optimize glass rendering performance, onShouldVirtualize can be set. When onShouldVirtualize return false,
 * List will run in fast mode (not virtualized) to render all items without any measurements to improve page load time. And we
 * start doing measurements and rendering in virtualized mode when items grows larger than this threshold.
 *
 * However, certain operations can make measure data stale. For example, resizing the list, or passing in new props,
 * or forcing an update change cause pages to shrink/grow. When these operations occur, we increment a measureVersion
 * number, which we associate with cached measurements and use to determine if a remeasure should occur.
 */
export declare class List extends BaseComponent<IListProps, IListState> implements IList {
	static defaultProps: {
		startIndex: number;
		onRenderCell: (item: any, index: number, containsFocus: boolean) => JSX.Element;
		renderedWindowsAhead: number;
		renderedWindowsBehind: number;
	};
	refs: {
		[key: string]: React.ReactInstance;
	};
	private _root;
	private _surface;
	private _estimatedPageHeight;
	private _totalEstimates;
	private _cachedPageHeights;
	private _focusedIndex;
	private _scrollElement;
	private _hasCompletedFirstRender;
	private _surfaceRect;
	private _requiredRect;
	private _allowedRect;
	private _materializedRect;
	private _requiredWindowsAhead;
	private _requiredWindowsBehind;
	private _measureVersion;
	private _scrollHeight;
	private _scrollTop;
	private _pageCache;
	constructor(props: IListProps);
	/**
	 * Scroll to the given index. By default will bring the page the specified item is on into the view. If a callback
	 * to measure the height of an individual item is specified, will only scroll to bring the specific item into view.
	 *
	 * Note: with items of variable height and no passed in `getPageHeight` method, the list might jump after scrolling
	 * when windows before/ahead are being rendered, and the estimated height is replaced using actual elements.
	 *
	 * @param index - Index of item to scroll to
	 * @param measureItem - Optional callback to measure the height of an individual item
	 * @param scrollToMode - Optional defines where in the window the item should be positioned to when scrolling
	 */
	scrollToIndex(index: number, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode): void;
	getStartItemIndexInView(measureItem?: (itemIndex: number) => number): number;
	componentDidMount(): void;
	componentWillReceiveProps(newProps: IListProps): void;
	shouldComponentUpdate(newProps: IListProps, newState: IListState): boolean;
	forceUpdate(): void;
	render(): JSX.Element;
	private _shouldVirtualize;
	/**
	 * when props.items change or forceUpdate called, throw away cached pages
	 */
	private _invalidatePageCache;
	private _renderPage;
	/** Generate the style object for the page. */
	private _getPageStyle;
	private _onRenderPage;
	/** Track the last item index focused so that we ensure we keep it rendered. */
	private _onFocus;
	/**
	 * Called synchronously to reset the required render range to 0 on scrolling. After async scroll has executed,
	 * we will call onAsyncIdle which will reset it back to it's correct value.
	 */
	private _onScroll;
	private _resetRequiredWindows;
	/**
	 * Debounced method to asynchronously update the visible region on a scroll event.
	 */
	private _onAsyncScroll;
	/**
	 * This is an async debounced method that will try and increment the windows we render. If we can increment
	 * either, we increase the amount we render and re-evaluate.
	 */
	private _onAsyncIdle;
	/**
	 * Function to call when the list is done scrolling.
	 * This function is debounced.
	 */
	private _onScrollingDone;
	private _onAsyncResize;
	private _updatePages;
	/**
	 * Notify consumers that the rendered pages have changed
	 * @param oldPages - The old pages
	 * @param newPages - The new pages
	 * @param props - The props to use
	 */
	private _notifyPageChanges;
	private _updatePageMeasurements;
	/**
	 * Given a page, measure its dimensions, update cache.
	 * @returns True if the height has changed.
	 */
	private _measurePage;
	/** Called when a page has been added to the DOM. */
	private _onPageAdded;
	/** Called when a page has been removed from the DOM. */
	private _onPageRemoved;
	/** Build up the pages that should be rendered. */
	private _buildPages;
	private _getPageSpecification;
	/**
	 * Get the pixel height of a give page. Will use the props getPageHeight first, and if not provided, fallback to
	 * cached height, or estimated page height, or default page height.
	 */
	private _getPageHeight;
	private _getItemCountForPage;
	private _createPage;
	private _getRenderCount;
	/** Calculate the visible rect within the list where top: 0 and left: 0 is the top/left of the list. */
	private _updateRenderRects;
}
export interface IGroupedListState {
	lastWidth?: number;
	lastSelectionMode?: SelectionMode;
	groups?: IGroup[];
}
export declare class GroupedListBase extends BaseComponent<IGroupedListProps, IGroupedListState> implements IGroupedList {
	static defaultProps: {
		selectionMode: SelectionMode;
		isHeaderVisible: boolean;
		groupProps: {};
		compact: boolean;
	};
	refs: {
		[key: string]: React.ReactInstance;
	};
	private _classNames;
	private _list;
	private _isSomeGroupExpanded;
	constructor(props: IGroupedListProps);
	scrollToIndex(index: number, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode): void;
	getStartItemIndexInView(): number;
	componentWillReceiveProps(newProps: IGroupedListProps): void;
	render(): JSX.Element;
	forceUpdate(): void;
	toggleCollapseAll(allCollapsed: boolean): void;
	private _renderGroup;
	private _returnOne;
	private _getPageHeight;
	private _getGroupKey;
	private _getGroupNestingDepth;
	private _onToggleCollapse;
	private _onToggleSelectGroup;
	private _forceListUpdates;
	private _onToggleSummarize;
	private _getPageSpecification;
	private _computeIsSomeGroupExpanded;
	private _updateIsSomeGroupExpanded;
}
export interface IDragDropHelper {
	subscribe: (root: HTMLElement, events: EventGroup, options: IDragDropOptions) => {
		key: string;
		dispose: () => void;
	};
	unsubscribe: (root: HTMLElement, key: string) => void;
	dispose: () => void;
}
export interface IDragDropEvents {
	canDrop?: (dropContext?: IDragDropContext, dragContext?: IDragDropContext) => boolean;
	canDrag?: (item?: any) => boolean;
	onDragEnter?: (item?: any, event?: DragEvent) => string;
	onDragLeave?: (item?: any, event?: DragEvent) => void;
	onDrop?: (item?: any, event?: DragEvent) => void;
	onDragStart?: (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent) => void;
	onDragEnd?: (item?: any, event?: DragEvent) => void;
}
export interface IDragDropContext {
	data: any;
	index: number;
	isGroup?: boolean;
}
export interface IDragDropOptions {
	key?: string;
	eventMap?: {
		eventName: string;
		callback: (context: IDragDropContext, event?: any) => void;
	}[];
	selectionIndex: number;
	context: IDragDropContext;
	updateDropState: (isDropping: boolean, event: DragEvent) => void;
	canDrop?: (dropContext?: IDragDropContext, dragContext?: IDragDropContext) => boolean;
	canDrag?: (item?: any) => boolean;
	onDragStart?: (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent) => void;
	onDrop?: (item?: any, event?: DragEvent) => void;
	onDragEnd?: (item?: any, event?: DragEvent) => void;
	onDragOver?: (item?: any, event?: DragEvent) => void;
}
export interface IViewport {
	width: number;
	height: number;
}
export interface IWithViewportProps {
	skipViewportMeasures?: boolean;
}
export declare enum CollapseAllVisibility {
	hidden = 0,
	visible = 1
}
export interface IGroupedList extends IList {
	/**
	 * Ensures that the list content is updated. Call this in cases where the list prop updates don't change, but the list
	 * still needs to be re-evaluated. For example, if a sizer bar is adjusted and causes the list width to change, you can
	 * call this to force a re-evaluation. Be aware that this can be an expensive operation and should be done sparingly.
	 */
	forceUpdate: () => void;
	/**
	 * Toggles the collapsed state of all the groups in the list.
	 */
	toggleCollapseAll: (allCollapsed: boolean) => void;
}
export interface IGroupedListProps extends React.ClassAttributes<GroupedListBase> {
	/**
	 * Theme that is passed in from Higher Order Component
	 */
	theme?: ITheme;
	/**
	 * Style function to be passed in to override the themed or default styles
	 */
	styles?: IStyleFunctionOrObject<IGroupedListStyleProps, IGroupedListStyles>;
	/**
	 * Optional callback to access the IGroupedList interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IGroupedList>;
	/** Optional class name to add to the root element. */
	className?: string;
	/** Boolean value to indicate if the component should render in compact mode. Set to false by default */
	compact?: boolean;
	/** Map of callback functions related to drag and drop functionality. */
	dragDropEvents?: IDragDropEvents;
	/** helper to manage drag/drop across item and groups */
	dragDropHelper?: IDragDropHelper;
	/** Event names and corresponding callbacks that will be registered to groups and rendered elements */
	eventsToRegister?: {
		eventName: string;
		callback: (context: IDragDropContext, event?: any) => void;
	}[];
	/** Optional override properties to render groups. */
	groupProps?: IGroupRenderProps;
	/** Optional grouping instructions. */
	groups?: IGroup[];
	/** List of items to render. */
	items: any[];
	/** Optional properties to pass through to the list components being rendered. */
	listProps?: IListProps;
	/** Rendering callback to render the group items. */
	onRenderCell: (nestingDepth?: number, item?: any, index?: number) => React.ReactNode;
	/** Optional selection model to track selection state.  */
	selection?: ISelection;
	/** Controls how/if the list manages selection. */
	selectionMode?: SelectionMode;
	/** Optional Viewport, provided by the parent component. */
	viewport?: IViewport;
	/** Optional callback when the group expand state changes between all collapsed and at least one group is expanded. */
	onGroupExpandStateChanged?: (isSomeGroupExpanded: boolean) => void;
	/**
	 * boolean to control if pages containing unchanged items should be cached, this is a perf optimization
	 * The same property in List.Props
	 */
	usePageCache?: boolean;
	/**
	 * Optional callback to determine whether the list should be rendered in full, or virtualized.
	 * Virtualization will add and remove pages of items as the user scrolls them into the visible range.
	 * This benefits larger list scenarios by reducing the DOM on the screen, but can negatively affect performance for smaller lists.
	 * The default implementation will virtualize when this callback is not provided.
	 */
	onShouldVirtualize?: (props: IListProps) => boolean;
	/**
	 * Optional function which will be called to estimate the height (in pixels) of the given group.
	 *
	 * By default, scrolling through a large virtualized GroupedList will often "jump" due to the order
	 * in which heights are calculated. For more details, see https://github.com/OfficeDev/office-ui-fabric-react/issues/5094
	 *
	 * Pass this prop to ensure the list uses the computed height rather than cached DOM measurements,
	 * avoiding the scroll jumping issue.
	 */
	getGroupHeight?: (group: IGroup, groupIndex: number) => number;
}
export interface IGroup {
	/**
	 * Unique identifier for the group.
	 */
	key: string;
	/**
	 * Display name for the group, rendered on the header.
	 */
	name: string;
	/**
	 * Start index for the group within the given items.
	 */
	startIndex: number;
	/**
	 * How many items should be rendered within the group.
	 */
	count: number;
	/**
	 * Nested groups, if any.
	 */
	children?: IGroup[];
	/**
	 * Number indicating the level of nested groups.
	 */
	level?: number;
	/**
	 * Deprecated at 1.0.0, selection state will be controled by the selection store only.
	 * @deprecated At 1.0.0, selection state wil be controlled by the selection store only.
	 */
	isSelected?: boolean;
	/**
	 * If all the items in the group are collapsed.
	 */
	isCollapsed?: boolean;
	/**
	 * If the items within the group are summarized or showing all.
	 */
	isShowingAll?: boolean;
	/**
	 * If drag/drop is enabled for the group header.
	 */
	isDropEnabled?: boolean;
	/**
	 * Arbitrary data required to be preserved by the caller.
	 */
	data?: any;
	/**
	 * Optional accessibility label (aria-label) attribute that will be stamped on to the element.
	 * If none is specified, the arai-label attribute will contain the group name
	 */
	ariaLabel?: string;
	/**
	 * Optional flag to indicate the group has more data to load than the current group count indicated.
	 * This can be used to indicate that a plus should be rendered next to the group count in the header.
	 */
	hasMoreData?: boolean;
}
export interface IGroupRenderProps {
	/** Boolean indicating if all groups are in collapsed state. */
	isAllGroupsCollapsed?: boolean;
	/** Grouping item limit. */
	getGroupItemLimit?: (group: IGroup) => number;
	/** Callback for when all groups are expanded or collapsed. */
	onToggleCollapseAll?: (isAllCollapsed: boolean) => void;
	/** Information to pass in to the group header. */
	headerProps?: IGroupDividerProps;
	/** Information to pass in to the group Show all footer. */
	showAllProps?: IGroupDividerProps;
	/** Information to pass in to the group footer. */
	footerProps?: IGroupDividerProps;
	/**
	 * Override which allows the caller to provide a custom header.
	 */
	onRenderHeader?: IRenderFunction<IGroupDividerProps>;
	/**
	 * Override which allows the caller to provide a custom Show All link.
	 */
	onRenderShowAll?: IRenderFunction<IGroupDividerProps>;
	/**
	 * Override which allows the caller to provide a custom footer.
	 */
	onRenderFooter?: IRenderFunction<IGroupDividerProps>;
	/**
	 * Flag to indicate whether to ignore the collapsing icon on header.
	 * @defaultvalue CheckboxVisibility.visible
	 */
	collapseAllVisibility?: CollapseAllVisibility;
	/**
	 * Boolean indicating if empty groups are shown
	 * @defaultvalue false
	 */
	showEmptyGroups?: boolean;
}
export interface IGroupDividerProps {
	componentRef?: IRefObject<{}>;
	/** Boolean value to indicate if the component should render in compact mode. Set to false by default */
	compact?: boolean;
	/** Callback to determine if a group has missing items and needs to load them from the server. */
	isGroupLoading?: (group: IGroup) => boolean;
	/** Text shown on group headers to indicate the group is being loaded. */
	loadingText?: string;
	/** The group to be rendered by the header. */
	group?: IGroup;
	/** The index of the group. */
	groupIndex?: number;
	/** The indent level of the group. */
	groupLevel?: number;
	/** Width corresponding to a single level. This is multiplied by the groupLevel to get the full spacer width for the group. */
	indentWidth?: number;
	/** If all items in the group are selected. */
	selected?: boolean;
	/**
	 * Deprecated at v.65.1 and will be removed by v 1.0. Use `selected` instead.
	 * @deprecated Use `selected` instead.
	 */
	isSelected?: boolean;
	/** A reference to the viewport in which the header is rendered. */
	viewport?: IViewport;
	/** The selection mode of the list the group lives within. */
	selectionMode?: SelectionMode;
	/** Text to display for the group footer. */
	footerText?: string;
	/** Text to display for the group "Show All" link. */
	showAllLinkText?: string;
	/** Callback for when the group "Show All" link is clicked */
	onToggleSummarize?: (group: IGroup) => void;
	/** Callback for when the group header is clicked. */
	onGroupHeaderClick?: (group: IGroup) => void;
	/** Callback for when the group is expanded or collapsed. */
	onToggleCollapse?: (group: IGroup) => void;
	/** Callback for when the group is selected. */
	onToggleSelectGroup?: (group: IGroup) => void;
	/** Determines if the group selection check box is shown for collapsed groups. */
	isCollapsedGroupSelectVisible?: boolean;
	/** Override which allows the caller to provider a custom title. */
	onRenderTitle?: IRenderFunction<IGroupDividerProps>;
	/** Props for expand/collapse button */
	expandButtonProps?: React.HTMLAttributes<HTMLButtonElement>;
	/** Stores parent group's children. */
	groups?: IGroup[];
}
export declare type IGroupedListStyleProps = Required<Pick<IGroupedListProps, 'theme'>> & Pick<IGroupedListProps, 'className'> & {
	/** whether or not the group is collapsed */
	isCollapsed?: boolean;
	/** Whether the group is in compact mode or not */
	compact?: boolean;
};
export interface IGroupedListStyles {
	root: IStyle;
	group: IStyle;
	groupIsDropping: IStyle;
}
export interface IDetailsRowCheckProps extends React.HTMLAttributes<HTMLElement> {
	/**
	 * Theme provided by High-Order Component.
	 */
	theme?: ITheme;
	/**
	 * Style override
	 */
	styles?: IStyleFunctionOrObject<IDetailsRowCheckStyleProps, IDetailsRowCheckStyles>;
	/**
	 * Is the check part of the header in a DetailsList
	 */
	isHeader?: boolean;
	/**
	 * Whether or not this check is selected
	 */
	selected?: boolean;
	/**
	 * Deprecated, use `selected` instead.
	 * @deprecated Use `selected` instead.
	 */
	isSelected?: boolean;
	/**
	 * Is any selected - also true for isSelectionModal
	 */
	anySelected?: boolean;
	/**
	 * Can this checkbox be selectable
	 */
	canSelect: boolean;
	/**
	 * Is this in compact mode?
	 */
	compact?: boolean;
	/**
	 * Optional className to attach to the slider root element.
	 */
	className?: string;
	/**
	 * The classname to be passed down to Check component
	 */
	checkClassName?: string;
	/**
	 * Whether or not this checkbox is visible
	 */
	isVisible?: boolean;
}
export declare type IDetailsRowCheckStyleProps = Required<Pick<IDetailsRowCheckProps, 'theme'>> & Pick<IDetailsRowCheckProps, 'compact' | 'isHeader' | 'selected' | 'anySelected' | 'canSelect' | 'className'> & {
	/** Is checkbox visible */
	isVisible?: boolean;
};
export interface IDetailsRowCheckStyles {
	root: IStyle;
	check: IStyle;
	isDisabled: IStyle;
}
export interface IDetailsRowSelectionState {
	isSelected: boolean;
	isSelectionModal: boolean;
}
export interface IDetailsRowState {
	selectionState?: IDetailsRowSelectionState;
	columnMeasureInfo?: {
		index: number;
		column: IColumn;
		onMeasureDone: (measuredWidth: number) => void;
	};
	isDropping?: boolean;
	groupNestingDepth?: number;
}
export declare class DetailsRowBase extends BaseComponent<IDetailsRowBaseProps, IDetailsRowState> {
	private _root;
	private _cellMeasurer;
	private _focusZone;
	private _droppingClassNames;
	private _hasMounted;
	private _dragDropSubscription;
	constructor(props: IDetailsRowBaseProps);
	componentDidMount(): void;
	componentDidUpdate(previousProps: IDetailsRowBaseProps): void;
	componentWillUnmount(): void;
	componentWillReceiveProps(newProps: IDetailsRowBaseProps): void;
	shouldComponentUpdate(nextProps: IDetailsRowBaseProps, nextState: IDetailsRowState): boolean;
	render(): JSX.Element;
	/**
	 * measure cell at index. and call the call back with the measured cell width when finish measure
	 *
	 * @param index - The cell index
	 * @param onMeasureDone - The call back function when finish measure
	 */
	measureCell(index: number, onMeasureDone: (width: number) => void): void;
	focus(forceIntoFirstElement?: boolean): boolean;
	protected _onRenderCheck(props: IDetailsRowCheckProps): JSX.Element;
	private _getSelectionState;
	private _onSelectionChanged;
	private _onToggleSelection;
	private _onRootRef;
	private _getRowDragDropOptions;
	/**
	 * update isDropping state based on the input value, which is used to change style during drag and drop
	 *
	 * when change to true, that means drag enter. we will add default dropping class name
	 * or the custom dropping class name (return result from onDragEnter) to the root elemet.
	 *
	 * when change to false, that means drag leave. we will remove the dropping class name from root element.
	 *
	 * @private
	 * @param newValue - New isDropping state value
	 * @param event - The event trigger dropping state change which can be dragenter, dragleave etc
	 */
	private _updateDroppingState;
}
export interface IDetailsRowFields {
}
export interface IDetailsRowFieldsProps extends IBaseProps<IDetailsRowFields> {
	/**
	 * Ref of component
	 */
	componentRef?: IRefObject<IDetailsRowFields>;
	/**
	 * Data source for this component
	 */
	item: any;
	/**
	 * The item index of the collection for the DetailsList
	 */
	itemIndex: number;
	/**
	 * Index to start for the column
	 */
	columnStartIndex: number;
	/**
	 * Columns metadata
	 */
	columns: IColumn[];
	/**
	 * whether to render as a compact field
	 */
	compact?: boolean;
	/**
	 * Callback for rendering an item column
	 */
	onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => any;
	/**
	 * Whether to show shimmer
	 */
	shimmer?: boolean;
	/**
	 * Required prop to be passed in from the parent DetailsRow a map of classNames and its mergestyle-created classNames
	 */
	rowClassNames: {
		[className in keyof IDetailsRowStyles]: string;
	};
	cellStyleProps?: ICellStyleProps;
}
export interface IDetailsRow {
}
export interface IDetailsItemProps {
	/**
	 * Column metadata
	 */
	columns?: IColumn[];
	/**
	 * Nesting depth of a grouping
	 */
	groupNestingDepth?: number;
	/**
	 * How much to indent
	 */
	indentWidth?: number | undefined;
	/**
	 * Selection from utilities
	 */
	selection?: ISelection | undefined;
	/**
	 * Selection mode
	 */
	selectionMode?: SelectionMode | undefined;
	/**
	 * View port of the virtualized list
	 */
	viewport?: IViewport | undefined;
	/**
	 * Checkbox visibility
	 */
	checkboxVisibility?: CheckboxVisibility | undefined;
	/**
	 * Rules for rendering column cells.
	 */
	cellStyleProps?: ICellStyleProps;
}
export interface IDetailsRowBaseProps extends IBaseProps<IDetailsRow>, IDetailsItemProps {
	/**
	 * Theme provided by styled() function
	 */
	theme?: ITheme;
	/**
	 * Overriding styles to this row
	 */
	styles?: IStyleFunctionOrObject<IDetailsRowStyleProps, IDetailsRowStyles>;
	/**
	 * Ref of the component
	 */
	componentRef?: IRefObject<IDetailsRow>;
	/**
	 * Data source for this component
	 */
	item: any;
	/**
	 * Index of the collection of items of the DetailsList
	 */
	itemIndex: number;
	/**
	 * Whether to render in compact mode
	 */
	compact?: boolean;
	/**
	 * A list of events to register
	 */
	eventsToRegister?: {
		eventName: string;
		callback: (item?: any, index?: number, event?: any) => void;
	}[];
	/**
	 * Callback for did mount for parent
	 */
	onDidMount?: (row?: DetailsRowBase) => void;
	/**
	 * Callback for will mount for parent
	 */
	onWillUnmount?: (row?: DetailsRowBase) => void;
	/**
	 * Callback for rendering a checkbox
	 */
	onRenderCheck?: (props: IDetailsRowCheckProps) => JSX.Element;
	/**
	 * Callback for rendering an item column
	 */
	onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => any;
	/**
	 * Handling drag and drop events
	 */
	dragDropEvents?: IDragDropEvents;
	/**
	 * Helper for the drag and drop
	 */
	dragDropHelper?: IDragDropHelper;
	/**
	 * Collapse all visibility
	 */
	collapseAllVisibility?: CollapseAllVisibility;
	/**
	 * Callback for getting the row aria label
	 */
	getRowAriaLabel?: (item: any) => string;
	/**
	 * Callback for getting the row aria-describedby
	 */
	getRowAriaDescribedBy?: (item: any) => string;
	/**
	 * Check button's aria label
	 */
	checkButtonAriaLabel?: string;
	/**
	 * Class name for the checkbox cell
	 */
	checkboxCellClassName?: string;
	/**
	 * DOM element into which to render row field
	 */
	rowFieldsAs?: React.StatelessComponent<IDetailsRowFieldsProps> | React.ComponentClass<IDetailsRowFieldsProps>;
	/**
	 * Overriding class name
	 */
	className?: string;
	/**
	 * Whether to render shimmer
	 */
	shimmer?: boolean;
	/**
	 * Rerender DetailsRow only when props changed. Might cause regression when depending on external updates.
	 * @defaultvalue false
	 */
	useReducedRowRenderer?: boolean;
}
export interface IDetailsRowProps extends IDetailsRowBaseProps {
	/**
	 * Column metadata
	 */
	columns: IColumn[];
	/**
	 * Selection from utilities
	 */
	selection: ISelection;
	/**
	 * Selection mode
	 */
	selectionMode: SelectionMode;
}
export declare type IDetailsRowStyleProps = Required<Pick<IDetailsRowProps, 'theme'>> & {
	/** Whether the row is selected  */
	isSelected?: boolean;
	/** Whether there are any rows in the list selected */
	anySelected?: boolean;
	/** Whether this row can be selected */
	canSelect?: boolean;
	/** Class name of when this becomes a drop target. */
	droppingClassName?: string;
	/** Is the checkbox visible */
	isCheckVisible?: boolean;
	/** Is this a row header */
	isRowHeader?: boolean;
	/** A class name from the checkbox cell, so proper styling can be targeted */
	checkboxCellClassName?: string;
	/** CSS class name for the component */
	className?: string;
	/** Is list in compact mode */
	compact?: boolean;
	cellStyleProps?: ICellStyleProps;
};
export interface ICellStyleProps {
	cellLeftPadding: number;
	cellRightPadding: number;
	cellExtraRightPadding: number;
}
export interface IDetailsRowStyles {
	root: IStyle;
	cell: IStyle;
	cellUnpadded: IStyle;
	cellPadded: IStyle;
	checkCell: IStyle;
	isRowHeader: IStyle;
	isMultiline: IStyle;
	fields: IStyle;
	cellMeasurer: IStyle;
	checkCover: IStyle;
	shimmer: IStyle;
	shimmerIconPlaceholder: IStyle;
	shimmerLeftBorder: IStyle;
	shimmerBottomBorder: IStyle;
	check: IStyle;
}
export interface IDetailsListState {
	focusedItemIndex: number;
	lastWidth?: number;
	lastSelectionMode?: SelectionMode;
	adjustedColumns: IColumn[];
	isCollapsed?: boolean;
	isSizing?: boolean;
	isDropping?: boolean;
	isSomeGroupExpanded?: boolean;
}
export declare class DetailsListBase extends BaseComponent<IDetailsListProps, IDetailsListState> implements IDetailsList {
	static defaultProps: {
		layoutMode: DetailsListLayoutMode;
		selectionMode: SelectionMode;
		constrainMode: ConstrainMode;
		checkboxVisibility: CheckboxVisibility;
		isHeaderVisible: boolean;
		enableShimmer: boolean;
		compact: boolean;
	};
	private _root;
	private _header;
	private _groupedList;
	private _list;
	private _focusZone;
	private _selectionZone;
	private _selection;
	private _activeRows;
	private _dragDropHelper;
	private _initialFocusedIndex;
	private _pendingForceUpdate;
	private _columnOverrides;
	constructor(props: IDetailsListProps);
	scrollToIndex(index: number, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode): void;
	focusIndex(index: number, forceIntoFirstElement?: boolean, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode): void;
	getStartItemIndexInView(): number;
	componentWillUnmount(): void;
	componentDidUpdate(prevProps: any, prevState: any): void;
	componentWillReceiveProps(newProps: IDetailsListProps): void;
	componentWillUpdate(): void;
	render(): JSX.Element;
	forceUpdate(): void;
	protected _onRenderRow: (props: IDetailsRowProps, defaultRender?: any) => JSX.Element;
	private _onRenderDetailsHeader;
	private _onRenderDetailsFooter;
	private _onRenderListCell;
	private _onRenderCell;
	private _onGroupExpandStateChanged;
	private _onColumnIsSizingChanged;
	private _onHeaderKeyDown;
	private _onContentKeyDown;
	private _getGroupNestingDepth;
	private _onRowDidMount;
	private _setFocusToRowIfPending;
	private _setFocusToRow;
	private _onRowWillUnmount;
	private _onToggleCollapse;
	private _onColumnDragEnd;
	private _forceListUpdates;
	private _notifyColumnsResized;
	private _adjustColumns;
	/** Returns adjusted columns, given the viewport size and layout mode. */
	private _getAdjustedColumns;
	/** Builds a set of columns based on the given columns mixed with the current overrides. */
	private _getFixedColumns;
	private _getJustifiedColumnsAfterResize;
	/** Builds a set of columns to fix within the viewport width. */
	private _getJustifiedColumns;
	private _onColumnResized;
	private _rememberCalculatedWidth;
	private _getColumnOverride;
	/**
	 * Callback function when double clicked on the details header column resizer
	 * which will measure the column cells of all the active rows and resize the
	 * column to the max cell width.
	 *
	 * @private
	 * @param {IColumn} column (double clicked column definition)
	 * @param {number} columnIndex (double clicked column index)
	 * @todo min width 100 should be changed to const value and should be consistent with the
	 * value used on _onSizerMove method in DetailsHeader
	 */
	private _onColumnAutoResized;
	/**
	 * Call back function when an element in FocusZone becomes active. It will translate it into item
	 * and call onActiveItemChanged callback if specified.
	 *
	 * @private
	 * @param {el} row element that became active in Focus Zone
	 * @param {ev} focus event from Focus Zone
	 */
	private _onActiveRowChanged;
	private _onBlur;
	private _getItemKey;
	private _getDetailsFooterProps;
	private _getColumnReorderProps;
	private _getGroupProps;
}
export declare function buildColumns(items: any[], canResizeColumns?: boolean, onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => any, sortedColumnKey?: string, isSortedDescending?: boolean, groupedColumnKey?: string, isMultiline?: boolean): IColumn[];
export declare const GroupedList: (props: IGroupedListProps) => JSX.Element;
export declare const DetailsRow: (props: IDetailsRowBaseProps) => JSX.Element;
export interface IDetailsHeader {
	focus: () => boolean;
}
export interface IDetailsHeaderState {
	columnReorderProps?: IColumnReorderHeaderProps;
	columnResizeDetails?: IColumnResizeDetails;
	isAllSelected?: boolean;
	isSizing?: boolean;
	groupNestingDepth?: number;
	isAllCollapsed?: boolean;
}
declare class DetailsHeaderBase extends BaseComponent<IDetailsHeaderBaseProps, IDetailsHeaderState> implements IDetailsHeader {
	static defaultProps: {
		selectAllVisibility: SelectAllVisibility;
		collapseAllVisibility: CollapseAllVisibility;
	};
	private _classNames;
	private _rootElement;
	private _rootComponent;
	private _id;
	private _draggedColumnIndex;
	private _dropHintDetails;
	private _dragDropHelper;
	private _currentDropHintIndex;
	private _subscriptionObject;
	private _onDropIndexInfo;
	constructor(props: IDetailsHeaderBaseProps);
	componentDidMount(): void;
	componentDidUpdate(prevProps: IDetailsHeaderBaseProps): void;
	componentWillReceiveProps(newProps: IDetailsHeaderBaseProps): void;
	componentWillUnmount(): void;
	render(): JSX.Element;
	/** Set focus to the active thing in the focus area. */
	focus(): boolean;
	private _getHeaderDragDropOptions;
	private _updateDroppingState;
	private _isValidCurrentDropHintIndex;
	private _onDragOver;
	private _onDrop;
	/**
	 * @returns whether or not the "Select All" checkbox column is hidden.
	 */
	private _isCheckboxColumnHidden;
	private _updateDragInfo;
	private _resetDropHints;
	private _updateDropHintElement;
	private _getDropHintPositions;
	private _liesBetween;
	private _isBefore;
	private _isAfter;
	/**
	 * Based on the given cursor position, finds the nearest drop hint and updates the state to make it visible
	 *
	 */
	private _computeDropHintToBeShown;
	private _isEventOnHeader;
	private _renderColumnSizer;
	private _renderColumnDivider;
	private _renderDropHint;
	private _onRenderColumnHeaderTooltip;
	/**
	 * double click on the column sizer will auto ajust column width
	 * to fit the longest content among current rendered rows.
	 *
	 * @private
	 * @param {number} columnIndex (index of the column user double clicked)
	 * @param {React.MouseEvent} ev (mouse double click event)
	 */
	private _onSizerDoubleClick;
	/**
	 * Called when the select all toggle is clicked.
	 */
	private _onSelectAllClicked;
	private _onRootMouseDown;
	private _onRootMouseMove;
	private _onRootRef;
	private _onRootKeyDown;
	/**
	 * mouse move event handler in the header
	 * it will set isSizing state to true when user clicked on the sizer and move the mouse.
	 *
	 * @private
	 * @param {React.MouseEvent} ev (mouse move event)
	 */
	private _onSizerMouseMove;
	private _onSizerBlur;
	/**
	 * mouse up event handler in the header
	 * clear the resize related state.
	 * This is to ensure we can catch double click event
	 *
	 * @private
	 * @param {React.MouseEvent} ev (mouse up event)
	 */
	private _onSizerMouseUp;
	private _onSelectionChanged;
	private _onToggleCollapseAll;
}
export interface IDetailsHeader {
	/** sets focus into the header */
	focus: () => boolean;
}
export interface IDetailsHeaderBaseProps extends React.ClassAttributes<DetailsHeaderBase>, IDetailsItemProps {
	/** Theme from the Higher Order Component */
	theme?: ITheme;
	/** Call to provide customized styling that will layer on top of the variant rules. */
	styles?: IStyleFunctionOrObject<IDetailsHeaderStyleProps, IDetailsHeaderStyles>;
	/** Ref to the component itself */
	componentRef?: IRefObject<IDetailsHeader>;
	/** Layout mode - fixedColumns or justified */
	layoutMode: DetailsListLayoutMode;
	/** Callback for when column sizing has changed */
	onColumnIsSizingChanged?: (column: IColumn, isSizing: boolean) => void;
	/** Callback for when column is resized */
	onColumnResized?: (column: IColumn, newWidth: number, columnIndex: number) => void;
	/** Callback for when column is automatically resized */
	onColumnAutoResized?: (column: IColumn, columnIndex: number) => void;
	/** Callback for when the column is clicked */
	onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void;
	/** Callback for when the column needs to show a context menu */
	onColumnContextMenu?: (column: IColumn, ev: React.MouseEvent<HTMLElement>) => void;
	/** Callback to render a tooltip for the column header */
	onRenderColumnHeaderTooltip?: IRenderFunction<ITooltipHostProps>;
	/** Whether to collapse for all visibility */
	collapseAllVisibility?: CollapseAllVisibility;
	/** Whether or not all is collapsed */
	isAllCollapsed?: boolean;
	/** Callback for when collapse all is toggled */
	onToggleCollapseAll?: (isAllCollapsed: boolean) => void;
	/** ariaLabel for the entire header */
	ariaLabel?: string;
	/** ariaLabel for the header checkbox that selects or deselects everything */
	ariaLabelForSelectAllCheckbox?: string;
	/** ariaLabel for the selection column */
	ariaLabelForSelectionColumn?: string;
	/** Select all button visibility */
	selectAllVisibility?: SelectAllVisibility;
	/** Column reordering options */
	columnReorderOptions?: IColumnReorderOptions;
	/** Column reordering options */
	columnReorderProps?: IColumnReorderHeaderProps;
	/** Minimum pixels to be moved before dragging is registered */
	minimumPixelsForDrag?: number;
	/** Overriding class name */
	className?: string;
}
export interface IDetailsHeaderProps extends IDetailsHeaderBaseProps {
	/**
	 * Column metadata
	 */
	columns: IColumn[];
	/**
	 * Selection from utilities
	 */
	selection: ISelection;
	/**
	 * Selection mode
	 */
	selectionMode: SelectionMode;
}
declare enum SelectAllVisibility {
	none = 0,
	hidden = 1,
	visible = 2
}
export interface IColumnResizeDetails {
	columnIndex: number;
	originX?: number;
	columnMinWidth: number;
}
export interface IColumnReorderHeaderProps extends IColumnReorderOptions {
	/** Callback to notify the column dragEnd event to List
	 * Need this to check whether the dragEnd has happened on
	 * corresponding list or outside of the list
	 */
	onColumnDragEnd?: (props: {
		dropLocation?: ColumnDragEndLocation;
	}, event: MouseEvent) => void;
}
export declare type IDetailsHeaderStyleProps = Required<Pick<IDetailsHeaderProps, 'theme'>> & Pick<IDetailsHeaderProps, 'className'> & {
	/** Whether to hide select all checkbox */
	isSelectAllHidden?: boolean;
	/** Whether the "select all" checkbox is checked */
	isAllSelected?: boolean;
	/** Is column being resized */
	isResizingColumn?: boolean;
	/** Are all columns collapsed */
	isAllCollapsed?: boolean;
	/** Whether the header is sizing */
	isSizing?: boolean;
	/** Whether checkbox is hidden  */
	isCheckboxHidden?: boolean;
	cellStyleProps?: ICellStyleProps;
};
export interface IDetailsHeaderStyles {
	root: IStyle;
	check: IStyle;
	cellWrapperPadded: IStyle;
	cellIsCheck: IStyle;
	cellIsActionable: IStyle;
	cellIsEmpty: IStyle;
	cellSizer: IStyle;
	cellSizerStart: IStyle;
	cellSizerEnd: IStyle;
	cellIsResizing: IStyle;
	cellIsGroupExpander: IStyle;
	collapseButton: IStyle;
	checkTooltip: IStyle;
	sizingOverlay: IStyle;
	dropHintCircleStyle: IStyle;
	dropHintCaretStyle: IStyle;
	dropHintLineStyle: IStyle;
	dropHintStyle: IStyle;
	accessibleLabel: IStyle;
}
export interface IDetailsFooterBaseProps extends IDetailsItemProps {
}
export interface IDetailsFooterProps extends IDetailsFooterBaseProps {
	/**
	 * Column metadata
	 */
	columns: IColumn[];
	/**
	 * Selection from utilities
	 */
	selection: ISelection;
	/**
	 * Selection mode
	 */
	selectionMode: SelectionMode;
}
declare class DetailsColumnBase extends BaseComponent<IDetailsColumnProps> {
	private _root;
	private _dragDropSubscription;
	private _classNames;
	constructor(props: IDetailsColumnProps);
	render(): JSX.Element;
	componentDidMount(): void;
	componentWillUnmount(): void;
	componentDidUpdate(): void;
	private _onRenderColumnHeaderTooltip;
	private _onColumnClick;
	private _getColumnDragDropOptions;
	private _hasAccessibleLabel;
	private _renderAccessibleLabel;
	private _onDragStart;
	private _onDragEnd;
	private _updateHeaderDragInfo;
	private _onColumnContextMenu;
	private _onRootMouseDown;
}
export interface IDetailsColumnProps extends React.ClassAttributes<DetailsColumnBase> {
	theme?: ITheme;
	styles?: IStyleFunctionOrObject<IDetailsColumnStyleProps, IDetailsColumnStyles>;
	componentRef?: () => void;
	column: IColumn;
	columnIndex: number;
	parentId?: string;
	onRenderColumnHeaderTooltip?: IRenderFunction<ITooltipHostProps>;
	onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void;
	onColumnContextMenu?: (column: IColumn, ev: React.MouseEvent<HTMLElement>) => void;
	dragDropHelper?: IDragDropHelper | null;
	isDraggable?: boolean;
	setDraggedItemIndex?: (itemIndex: number) => void;
	updateDragInfo?: (props: {
		itemIndex: number;
	}, event?: MouseEvent) => void;
	isDropped?: boolean;
	cellStyleProps?: ICellStyleProps;
}
export declare type IDetailsColumnStyleProps = Required<Pick<IDetailsColumnProps, 'theme' | 'cellStyleProps'>> & {
	headerClassName?: string;
	isActionable?: boolean;
	isEmpty?: boolean;
	isIconVisible?: boolean;
	isPadded?: boolean;
	isIconOnly?: boolean;
	iconClassName?: string;
	transitionDurationDrag?: number;
	transitionDurationDrop?: number;
};
export interface IDetailsColumnStyles {
	root: IStyle;
	gripperBarVerticalStyle: IStyle;
	cellTooltip: IStyle;
	cellTitle: IStyle;
	cellName: IStyle;
	iconClassName: IStyle;
	nearIcon: IStyle;
	accessibleLabel: IStyle;
	sortIcon: IStyle;
	filterChevron: IStyle;
	borderAfterDropping: IStyle;
	noBorderAfterDropping: IStyle;
	borderWhileDragging: IStyle;
	noBorderWhileDragging: IStyle;
}
export interface IDetailsList extends IList {
	/**
	 * Ensures that the list content is updated. Call this in cases where the list prop updates don't change, but the list
	 * still needs to be re-evaluated. For example, if a sizer bar is adjusted and causes the list width to change, you can
	 * call this to force a re-evaluation. Be aware that this can be an expensive operation and should be done sparingly.
	 */
	forceUpdate: () => void;
	/**
	 * Scroll to and focus the item at the given index. focusIndex will call scrollToIndex on the specified index.
	 *
	 * @param index - Index of item to scroll to
	 * @param forceIntoFirstElement - If true, focus will be set to the first focusable child element of the item rather
	 *  than the item itself.
	 * @param measureItem - Optional callback to measure the height of an individual item
	 * @param scrollToMode - Optional setting to determine where in the window the item should be scrolled to when focused.
	 */
	focusIndex: (index: number, forceIntoFirstElement?: boolean, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode) => void;
	/**
	 * Get the start index of the page that is currently in view
	 */
	getStartItemIndexInView: () => number;
}
export interface IDetailsListProps extends IBaseProps<IDetailsList>, IWithViewportProps {
	/**
	 * Theme provided by the Higher Order Component
	 */
	theme?: ITheme;
	/**
	 * Style function to be passed in to override the themed or default styles
	 */
	styles?: IStyleFunctionOrObject<IDetailsListStyleProps, IDetailsListStyles>;
	/**
	 * Optional callback to access the IDetailsList interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IDetailsList>;
	/** A key that uniquely identifies the given items. If provided, the selection will be reset when the key changes. */
	setKey?: string;
	/** The items to render. */
	items: any[];
	/** Optional properties to pass through to the list components being rendered. */
	listProps?: IListProps;
	/**
	 * Optional default focused index to set focus to once the items have rendered and the index exists.
	 */
	initialFocusedIndex?: number;
	/** Optional class name to add to the root element. */
	className?: string;
	/** Optional grouping instructions. The definition for IGroup can be found under the GroupedList component. */
	groups?: IGroup[];
	/** Optional override properties to render groups. The definition for IGroupRenderProps can be found under the GroupedList component. */
	groupProps?: IDetailsGroupRenderProps;
	/** Optional override for the indent width used for group nesting. */
	indentWidth?: number;
	/** Optional selection model to track selection state.  */
	selection?: ISelection;
	/** Controls how/if the details list manages selection. Options include none, single, multiple */
	selectionMode?: SelectionMode;
	/**
	 * By default, selection is cleared when clicking on an empty (non-focusable) section of the screen. Setting this value to true
	 * overrides that behavior and maintains selection.
	 * @defaultvalue false
	 **/
	selectionPreservedOnEmptyClick?: boolean;
	/**
	 * Addition props to pass through to the selection zone created by default.
	 */
	selectionZoneProps?: ISelectionZoneProps;
	/** Controls how the columns are adjusted. */
	layoutMode?: DetailsListLayoutMode;
	/**
	 * Controls the visibility of selection check box.
	 * @defaultvalue CheckboxVisibility.onHover
	 */
	checkboxVisibility?: CheckboxVisibility;
	/**
	 * Controls the visibility of the details header.
	 * @defaultvalue true
	 */
	isHeaderVisible?: boolean;
	/** Given column defitions. If none are provided, default columns will be created based on the item's properties. */
	columns?: IColumn[];
	/** Controls how the list contrains overflow. */
	constrainMode?: ConstrainMode;
	/** Event names and corresponding callbacks that will be registered to rendered row elements. */
	rowElementEventMap?: {
		eventName: string;
		callback: (context: IDragDropContext, event?: any) => void;
	}[];
	/** Callback for when the details list has been updated. Useful for telemetry tracking externally. */
	onDidUpdate?: (detailsList?: DetailsListBase) => any;
	/** Callback for when a given row has been mounted. Useful for identifying when a row has been rendered on the page. */
	onRowDidMount?: (item?: any, index?: number) => void;
	/** Callback for when a given row has been unmounted. Useful for identifying when a row has been removed from the page. */
	onRowWillUnmount?: (item?: any, index?: number) => void;
	/** Callback for when the user clicks on the column header. */
	onColumnHeaderClick?: (ev?: React.MouseEvent<HTMLElement>, column?: IColumn) => void;
	/** Callback for when the user asks for a contextual menu (usually via right click) from a column header. */
	onColumnHeaderContextMenu?: (column?: IColumn, ev?: React.MouseEvent<HTMLElement>) => void;
	/** Callback fired on column resize */
	onColumnResize?: (column?: IColumn, newWidth?: number, columnIndex?: number) => void;
	/** Callback for when a given row has been invoked (by pressing enter while it is selected.) */
	onItemInvoked?: (item?: any, index?: number, ev?: Event) => void;
	/**
	 * Callback for when the context menu of an item has been accessed.
	 * If undefined or false are returned, ev.preventDefault() will be called.
	 */
	onItemContextMenu?: (item?: any, index?: number, ev?: Event) => void | boolean;
	/**
	 *  If provided, will allow the caller to override the default row rendering.
	 */
	onRenderRow?: IRenderFunction<IDetailsRowProps>;
	/**
	 * If provided, will be the "default" item column renderer method. This affects cells within the rows; not the rows themselves.
	 * If a column definition provides its own onRender method, that will be used instead of this.
	 */
	onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => any;
	/** Map of callback functions related to row drag and drop functionality. */
	dragDropEvents?: IDragDropEvents;
	/** Callback for what to render when the item is missing. */
	onRenderMissingItem?: (index?: number, rowProps?: IDetailsRowProps) => React.ReactNode;
	/**
	 * If set to true and we provide an empty array, it will render 10 lines of whatever provided in onRenderMissingItem.
	 * @defaultvalue false
	 */
	enableShimmer?: boolean;
	/**
	 * An override to render the details header.
	 */
	onRenderDetailsHeader?: IRenderFunction<IDetailsHeaderProps>;
	/**
	 * An override to render the details footer.
	 */
	onRenderDetailsFooter?: IRenderFunction<IDetailsFooterProps>;
	/** Viewport, provided by the withViewport decorator. */
	viewport?: IViewport;
	/** Callback for when an item in the list becomes active by clicking anywhere inside the row or navigating to it with keyboard. */
	onActiveItemChanged?: (item?: any, index?: number, ev?: React.FocusEvent<HTMLElement>) => void;
	/** The aria-label attribute to stamp out on the list header */
	ariaLabelForListHeader?: string;
	/** The aria-label attribute to stamp out on select all checkbox for the list */
	ariaLabelForSelectAllCheckbox?: string;
	/**
	 * An ARIA label for the name of the selection column, for localization.
	 */
	ariaLabelForSelectionColumn?: string;
	/** Optional callback to get the aria-label string for a given item. */
	getRowAriaLabel?: (item: any) => string;
	/** Optional callback to get the aria-describedby IDs (space separated strings) of the elements that describe the item. */
	getRowAriaDescribedBy?: (item: any) => string;
	/** Optional callback to get the item key, to be used in the selection and on render. */
	getKey?: (item: any, index?: number) => string;
	/** A text summary of the table set via aria-label. */
	ariaLabel?: string;
	/** Check button aria label for details list. */
	checkButtonAriaLabel?: string;
	/** Aria label for grid in details list. */
	ariaLabelForGrid?: string;
	/** Boolean value to indicate if the role application should be applied on details list. Set to false by default */
	shouldApplyApplicationRole?: boolean;
	/**
	 * The minimum mouse move distance to interpret the action as drag event.
	 * @defaultvalue 5
	 */
	minimumPixelsForDrag?: number;
	/** Boolean value to indicate if the component should render in compact mode. Set to false by default */
	compact?: boolean;
	/**
	 * Boolean value to enable render page caching. This is an experimental performance optimization
	 * that is off by default.
	 * @defaultvalue false
	 */
	usePageCache?: boolean;
	/**
	 * Optional callback to determine whether the list should be rendered in full, or virtualized.
	 * Virtualization will add and remove pages of items as the user scrolls them into the visible range.
	 * This benefits larger list scenarios by reducing the DOM on the screen, but can negatively affect performance for smaller lists.
	 * The default implementation will virtualize when this callback is not provided.
	 */
	onShouldVirtualize?: (props: IListProps) => boolean;
	/**
	 * Optional class name to add to the cell of a checkbox
	 */
	checkboxCellClassName?: string;
	/**
	 * Whether or not the selection zone should enter modal state on touch.
	 */
	enterModalSelectionOnTouch?: boolean;
	/**
	 * Options for column re-order using drag and drop
	 */
	columnReorderOptions?: IColumnReorderOptions;
	/**
	 * Optional function which will be called to estimate the height (in pixels) of the given group.
	 *
	 * By default, scrolling through a large virtualized GroupedList will often "jump" due to the order
	 * in which heights are calculated. For more details, see https://github.com/OfficeDev/office-ui-fabric-react/issues/5094
	 *
	 * Pass this prop to ensure the list uses the computed height rather than cached DOM measurements,
	 * avoiding the scroll jumping issue.
	 */
	getGroupHeight?: (group: IGroup, groupIndex: number) => number;
	/**
	 * Rerender DetailsRow only when props changed. Might cause regression when depending on external updates.
	 * @defaultvalue false
	 */
	useReducedRowRenderer?: boolean;
	/**
	 * Props impacting the render style of cells. Since these have an impact on calculated column widths, they are
	 * handled separately from normal theme styling, but they are passed to the styling system.
	 */
	cellStyleProps?: ICellStyleProps;
	/**
	 * Whether or not to disable the built-in SelectionZone, so the host component can provide its own.
	 */
	disableSelectionZone?: boolean;
}
export interface IColumn {
	/**
	 * A unique key for identifying the column.
	 */
	key: string;
	/**
	 * Name to render on the column header.
	 */
	name: string;
	/**
	 * The field to pull the text value from for the column. This can be null if a custom
	 * onRender method is provided.
	 */
	fieldName?: string;
	/**
	 * An optional class name to stick on the column cell within each row.
	 */
	className?: string;
	/**
	 * Minimum width for the column.
	 */
	minWidth: number;
	/**
	 * Optional accessibility label (aria-label) attribute that will be stamped on to the element.
	 * If none is specified, the arai-label attribute will contain the column name
	 */
	ariaLabel?: string;
	/**
	 * Optional flag on whether the column is a header for the given row. There should be only one column with
	 * row header set to true.
	 * @defaultvalue false
	 */
	isRowHeader?: boolean;
	/**
	 * Maximum width for the column, if stretching is allowed in justified scenarios.
	 */
	maxWidth?: number;
	/**
	 * Defines how the column's header should render.
	 * @defaultvalue ColumnActionsMode.clickable
	 */
	columnActionsMode?: ColumnActionsMode;
	/**
	 * Optional iconName to use for the column header.
	 */
	iconName?: string;
	/**
	 * Whether or not only the icon is used in the column header.
	 * Set this to true so the column name and dropdown chevron are not displayed.
	 */
	isIconOnly?: boolean;
	/**
	 * Class name to add to the Icon component.
	 */
	iconClassName?: string;
	/**
	 * If specified will allow the column to be collapsed when rendered in justified layout.
	 * @deprecated Use `isCollapsible`
	 */
	isCollapsable?: boolean;
	/**
	 * If specified will allow the column to be collapsed when rendered in justified layout.
	 */
	isCollapsible?: boolean;
	/**
	 * Determines if the column is currently sorted. Renders a sort arrow in the column header.
	 */
	isSorted?: boolean;
	/**
	 * Determines if the arrow is pointed down (descending) or up.
	 */
	isSortedDescending?: boolean;
	/**
	 * Determines if the column can be resized.
	 */
	isResizable?: boolean;
	/**
	 * Determines if the column can render multi-line text.
	 */
	isMultiline?: boolean;
	/**
	 * If provided uses this method to render custom cell content, rather than the default text rendering.
	 */
	onRender?: (item?: any, index?: number, column?: IColumn) => any;
	/**
	 * If provider, can be used to render a custom column header divider
	 */
	onRenderDivider?: IRenderFunction<IDetailsColumnProps>;
	/**
	 * Determines if the column is filtered, and if so shows a filter icon.
	 */
	isFiltered?: boolean;
	/**
	 * If provided, will be executed when the user clicks on the column header.
	 */
	onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => any;
	/**
	 * If provided, will be executed when the user accesses the contextmenu on a column header.
	 */
	onColumnContextMenu?: (column?: IColumn, ev?: React.MouseEvent<HTMLElement>) => any;
	/**
	 * If provided, will be executed when the column is resized with the column's current width.
	 * Prefer this callback over `DetailsList` `onColumnResize` if you require the `IColumn` to
	 * report its width after every resize event. Consider debouncing the callback if resize events
	 * occur frequently.
	 */
	onColumnResize?: (width?: number) => void;
	/**
	 * If set will show a grouped icon next to the column header name.
	 */
	isGrouped?: boolean;
	/**
	 * Arbitrary data passthrough which can be used by the caller.
	 */
	data?: any;
	/**
	 * Internal only value.
	 */
	calculatedWidth?: number;
	/**
	 * Internal only value.
	 * Remembers the actual witdh of the column on any case.
	 * On the other hand, calculatedWidth is only saved when it's defined by user, not for justified calculations.
	 */
	currentWidth?: number;
	/**
	 * An optional class name to stick on the column cell within each header.
	 */
	headerClassName?: string;
	/**
	 * If set, will add additional LTR padding-right to column and cells.
	 */
	isPadded?: boolean;
	/**
	 * ARIA label for the sort order of this column when sorted ascending.
	 */
	sortAscendingAriaLabel?: string;
	/**
	 * ARIA label for the sort order of this column when sorted descending.
	 */
	sortDescendingAriaLabel?: string;
	/**
	 * ARIA label for the status of this column when grouped.
	 */
	groupAriaLabel?: string;
	/**
	 * ARIA label for the status of this column when filtered.
	 */
	filterAriaLabel?: string;
}
/**
 * Enum to describe how a particular column header behaves.... This enum is used to
 * to specify the property IColumn:columnActionsMode.
 * If IColumn:columnActionsMode is undefined, then it's equivalent to ColumnActionsMode.clickable
 */
export declare enum ColumnActionsMode {
	/**
	 * Renders the column header as disabled.
	 */
	disabled = 0,
	/**
	 * Renders the column header is clickable.
	 */
	clickable = 1,
	/**
	 * Renders the column header ias clickable and displays the dropdown cheveron.
	 */
	hasDropdown = 2
}
export declare enum ConstrainMode {
	/** If specified, lets the content grow which allows the page to manage scrolling. */
	unconstrained = 0,
	/**
	 * If specified, constrains the list to the given layout space.
	 */
	horizontalConstrained = 1
}
export interface IColumnReorderOptions {
	/**
	 * Specifies the number fixed columns from left(0th index)
	 * @defaultvalue 0
	 */
	frozenColumnCountFromStart?: number;
	/**
	 * Specifies the number fixed columns from right
	 * @defaultvalue 0
	 */
	frozenColumnCountFromEnd?: number;
	/**
	 * Callback to handle the column dragstart
	 * draggedStarted indicates that the column drag has been started on DetailsHeader
	 */
	onColumnDragStart?: (dragStarted: boolean) => void;
	/**
	 * Callback to handle the column reorder
	 * draggedIndex is the source column index, that need to be placed in targetIndex
	 * Deprecated, use `onColumnDrop` instead.
	 * @deprecated Use `onColumnDrop` instead.
	 */
	handleColumnReorder?: (draggedIndex: number, targetIndex: number) => void;
	/**
	 * Callback to handle the column reorder
	 * draggedIndex is the source column index, that need to be placed in targetIndex
	 */
	onColumnDrop?: (dragDropDetails: IColumnDragDropDetails) => void;
	/**
	 * Callback to handle the column reorder
	 */
	onDragEnd?: (columnDropLocationDetails: ColumnDragEndLocation) => void;
}
export interface IColumnDragDropDetails {
	/**
	 * Specifies the source column index
	 * @defaultvalue -1
	 */
	draggedIndex: number;
	/**
	 * Specifies the target column index
	 * @defaultvalue -1
	 */
	targetIndex: number;
}
/**
 * Enum to describe where the column has been dropped, after starting the drag
 */
export declare enum ColumnDragEndLocation {
	/**
	 * Drag ended outside of current list
	 */
	outside = 0,
	/**
	 * Drag ended on current List
	 */
	surface = 1,
	/**
	 * Drag ended on Header
	 */
	header = 2
}
export declare enum DetailsListLayoutMode {
	/**
	 * Lets the user resize columns and makes not attempt to fit them.
	 */
	fixedColumns = 0,
	/**
	 * Manages which columns are visible, tries to size them according to their min/max rules and drops
	 * off columns that can't fit and have isCollapsible set.
	 */
	justified = 1
}
export declare enum CheckboxVisibility {
	/**
	 * Visible on hover.
	 */
	onHover = 0,
	/**
	 * Visible always.
	 */
	always = 1,
	/**
	 * Hide checkboxes.
	 */
	hidden = 2
}
export declare type IDetailsListStyleProps = Required<Pick<IDetailsListProps, 'theme'>> & Pick<IDetailsListProps, 'className'> & {
	/** Whether the the list is horizontally constrained */
	isHorizontalConstrained?: boolean;
	/** Whether the list is in compact mode */
	compact?: boolean;
	/** Whether the list is fixed in size */
	isFixed?: boolean;
};
export interface IDetailsListStyles {
	root: IStyle;
	focusZone: IStyle;
	headerWrapper: IStyle;
	contentWrapper: IStyle;
}
export interface IDetailsGroupRenderProps extends IGroupRenderProps {
	onRenderFooter?: IRenderFunction<IDetailsGroupDividerProps>;
	onRenderHeader?: IRenderFunction<IDetailsGroupDividerProps>;
}
export interface IDetailsGroupDividerProps extends IGroupDividerProps, IDetailsItemProps {
}
export declare const DetailsList: (props: IDetailsListProps) => JSX.Element;
export declare const DetailsRowCheck: (props: IDetailsRowCheckProps) => JSX.Element;
export interface IDialogState {
	isOpen?: boolean;
	isVisible?: boolean;
	isVisibleClose?: boolean;
	id?: string;
	hasBeenOpened?: boolean;
	modalRectangleTop?: number;
}
export declare class ModalBase extends BaseComponent<IModalProps, IDialogState> implements IModal {
	static defaultProps: IModalProps;
	private _onModalCloseTimer;
	private _focusTrapZone;
	private _scrollableContent;
	constructor(props: IModalProps);
	componentWillReceiveProps(newProps: IModalProps): void;
	componentDidUpdate(prevProps: IModalProps, prevState: IDialogState): void;
	render(): JSX.Element | null;
	focus(): void;
	private _allowScrollOnModal;
	private _onModalClose;
}
export interface IModal {
	/**
	 * Sets focus on the first focusable, or configured, child in focus trap zone
	 */
	focus: () => void;
}
export interface IModalProps extends React.ClassAttributes<ModalBase>, IWithResponsiveModeState, IAccessiblePopupProps {
	/**
	 * Optional callback to access the IDialog interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IModal>;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<IModalStyleProps, IModalStyles>;
	/**
	 * Theme provided by High-Order Component.
	 */
	theme?: ITheme;
	/**
	 * Whether the dialog is displayed.
	 * @defaultvalue false
	 */
	isOpen?: boolean;
	/**
	 * Whether the overlay is dark themed.
	 * @defaultvalue true
	 */
	isDarkOverlay?: boolean;
	/**
	 * A callback function for when the Modal is dismissed light dismiss, before the animation completes.
	 */
	onDismiss?: (ev?: React.MouseEvent<HTMLButtonElement>) => any;
	/**
	 * A callback function which is called after the Modal is dismissed and the animation is complete.
	 */
	onDismissed?: () => any;
	/**
	 * Props to be passed through to Layer
	 */
	layerProps?: ILayerProps;
	/**
	 * Whether the dialog can be light dismissed by clicking outside the dialog (on the overlay).
	 * @defaultvalue false
	 */
	isBlocking?: boolean;
	/**
	 * Optional class name to be added to the root class
	 */
	className?: string;
	/**
	 * Optional override for container class
	 */
	containerClassName?: string;
	/**
	 * Optional override for scrollable content class
	 */
	scrollableContentClassName?: string;
	/**
	 * A callback function for when the Modal content is mounted on the overlay layer
	 * @deprecated Use layerProps.onLayerDidMount instead
	 */
	onLayerDidMount?: () => void;
	/**
	 * ARIA id for the title of the Modal, if any
	 */
	titleAriaId?: string;
	/**
	 * ARIA id for the subtitle of the Modal, if any
	 */
	subtitleAriaId?: string;
	/**
	 * Whether the modal should have top offset fixed once opened and expand from the bottom only
	 * when the content changes dynamically.
	 */
	topOffsetFixed?: boolean;
}
export declare type IModalStyleProps = Required<Pick<IModalProps, 'theme'>> & Pick<IModalProps, 'className' | 'containerClassName' | 'scrollableContentClassName' | 'topOffsetFixed'> & {
	/** Modal open state. */
	isOpen?: boolean;
	/** Modal visible state. */
	isVisible?: boolean;
	/** Modal has been opened state. */
	hasBeenOpened?: boolean;
	/** Positioning of modal on first render */
	modalRectangleTop?: number;
};
export interface IModalStyles {
	root: IStyle;
	main: IStyle;
	scrollableContent: IStyle;
}
export declare const Modal: (props: IModalProps) => JSX.Element;
export declare class DialogBase extends BaseComponent<IDialogProps, {}> {
	static defaultProps: IDialogProps;
	private _id;
	private _defaultTitleTextId;
	private _defaultSubTextId;
	constructor(props: IDialogProps);
	render(): JSX.Element;
	private _getSubTextId;
	private _getTitleTextId;
}
export declare class DialogContentBase extends BaseComponent<IDialogContentProps, {}> {
	static defaultProps: IDialogContentProps;
	constructor(props: IDialogContentProps);
	render(): JSX.Element;
	private _groupChildren;
}
export interface IDialogContent {
}
export interface IDialogContentProps extends React.ClassAttributes<DialogContentBase> {
	/**
	 * Optional callback to access the IDialogContent interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IDialogContent>;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules
	 */
	styles?: IStyleFunctionOrObject<IDialogContentStyleProps, IDialogContentStyles>;
	/**
	 * Theme provided by HOC.
	 */
	theme?: ITheme;
	/**
	 * Is inside a multiline wrapper
	 */
	isMultiline?: boolean;
	/**
	 * Show an 'x' close button in the upper-right corner
	 */
	showCloseButton?: boolean;
	/**
	 * Other top buttons that will show up next to the close button
	 */
	topButtonsProps?: IButtonProps[];
	/**
	 * Optional override class name
	 */
	className?: string;
	/**
	 * A callback function for when the Dialog is dismissed from the close button or light dismiss, before the animation completes.
	 */
	onDismiss?: (ev?: React.MouseEvent<HTMLButtonElement>) => any;
	/**
	 * The Id for subText container
	 */
	subTextId?: string;
	/**
	 * The subtext to display in the dialog
	 */
	subText?: string;
	/**
	 * The Id for title container
	 */
	titleId?: string;
	/**
	 * The title text to display at the top of the dialog.
	 */
	title?: string;
	/**
	 * Responsive mode passed in from decorator.
	 */
	responsiveMode?: ResponsiveMode;
	/**
	 * Label to be passed to to aria-label of close button
	 * @defaultvalue Close
	 */
	closeButtonAriaLabel?: string;
	/**
	 * The type of Dialog to display.
	 * @defaultvalue DialogType.normal
	 */
	type?: DialogType;
}
export declare enum DialogType {
	/** Standard dialog */
	normal = 0,
	/** Dialog with large header banner */
	largeHeader = 1,
	/** Dialog with an 'x' close button in the upper-right corner */
	close = 2
}
export interface IDialogContentStyleProps {
	/**
	 * Accept theme prop.
	 */
	theme: ITheme;
	/**
	 * Accept custom classNames
	 */
	className?: string;
	isLargeHeader?: boolean;
	isClose?: boolean;
	hidden?: boolean;
	/**
	 * Is inside a multiline wrapper
	 */
	isMultiline?: boolean;
}
export interface IDialogContentStyles {
	/**
	 * Style for the content element.
	 */
	content: IStyle;
	subText: IStyle;
	header: IStyle;
	button: IStyle;
	inner: IStyle;
	innerContent: IStyle;
	title: IStyle;
	topButton: IStyle;
}
export interface IDialog {
}
export interface IDialogProps extends React.ClassAttributes<DialogBase>, IWithResponsiveModeState, IAccessiblePopupProps {
	/**
	 * Optional callback to access the IDialog interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IDialog>;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules
	 */
	styles?: IStyleFunctionOrObject<IDialogStyleProps, IDialogStyles>;
	/**
	 * Theme provided by HOC.
	 */
	theme?: ITheme;
	/**
	 * Props to be passed through to Dialog Content
	 */
	dialogContentProps?: IDialogContentProps;
	/**
	 * A callback function for when the Dialog is dismissed from the close button or light dismiss.
	 * Can also be specified separately in content and modal.
	 */
	onDismiss?: (ev?: React.MouseEvent<HTMLButtonElement>) => any;
	/**
	 * Whether the dialog is hidden.
	 * @defaultvalue true
	 */
	hidden?: boolean;
	/**
	 * Props to be passed through to Modal
	 */
	modalProps?: IModalProps;
	/**
	 * Whether the dialog is displayed.
	 * Deprecated, use `hidden` instead.
	 * @defaultvalue false
	 * @deprecated Use `hidden` instead
	 */
	isOpen?: boolean;
	/**
	 * Whether the overlay is dark themed.
	 * @defaultvalue true
	 * @deprecated Pass through via `modalProps` instead
	 */
	isDarkOverlay?: boolean;
	/**
	 * A callback function which is called after the Dialog is dismissed and the animation is complete.
	 * @deprecated Pass through via `modalProps` instead
	 */
	onDismissed?: () => any;
	/**
	 * Whether the dialog can be light dismissed by clicking outside the dialog (on the overlay).
	 * @defaultvalue false
	 * @deprecated Pass through via `modalProps` instead
	 */
	isBlocking?: boolean;
	/**
	 * Optional class name to be added to the root class
	 * @deprecated Pass through via `modalProps.className` instead
	 */
	className?: string;
	/**
	 * Optional override for container class
	 * @deprecated Pass through via `modalProps.className` instead
	 */
	containerClassName?: string;
	/**
	 * A callback function for when the Dialog content is mounted on the overlay layer
	 * @deprecated Pass through via `modalProps.layerProps` instead
	 */
	onLayerDidMount?: () => void;
	/**
	 * Deprecated at 0.81.2, use `onLayerDidMount` instead.
	 * @deprecated Use `onLayerDidMount` instead.
	 */
	onLayerMounted?: () => void;
	/**
	 * The type of Dialog to display.
	 * @defaultvalue DialogType.normal
	 * @deprecated Pass through via `dialogContentProps` instead.
	 */
	type?: DialogType;
	/**
	 * The title text to display at the top of the dialog.
	 * @deprecated Pass through via `dialogContentProps` instead.
	 */
	title?: string;
	/**
	 * The subtext to display in the dialog.
	 * @deprecated Pass through via `dialogContentProps` instead.
	 */
	subText?: string;
	/**
	 * Optional override content class
	 * @deprecated Pass through via `dialogContentProps` instead as `className`.
	 */
	contentClassName?: string;
	/**
	 * Other top buttons that will show up next to the close button
	 * @deprecated Pass through via `dialogContentProps` instead.
	 */
	topButtonsProps?: IButtonProps[];
	/**
	 * Optional id for aria-LabelledBy
	 * @deprecated Pass through via `modalProps.titleAriaId` instead.
	 */
	ariaLabelledById?: string;
	/**
	 * Optional id for aria-DescribedBy
	 * @deprecated Pass through via `modalProps.subtitleAriaId` instead.
	 */
	ariaDescribedById?: string;
	/**
	 * Sets the minimum width of the dialog. It limits the width property to be not
	 * smaller than the value specified in min-width.
	 */
	minWidth?: ICSSRule | ICSSPixelUnitRule;
	/**
	 * Sets the maximum width for the dialog. It limits the width property to be larger
	 * than the value specified in max-width.
	 */
	maxWidth?: ICSSRule | ICSSPixelUnitRule;
}
export interface IDialogStyleProps {
	/**
	 * Accept theme prop.
	 */
	theme: ITheme;
	/**
	 * Accept custom classNames
	 */
	className?: string;
	/**
	 * Optional override for container class
	 * @deprecated Pass through via `modalProps.className` instead.
	 */
	containerClassName?: string;
	/**
	 * Optional override content class
	 * @deprecated Pass through via `dialogContentProps` instead as `className`.
	 */
	contentClassName?: string;
	/**
	 * Whether the dialog is hidden.
	 * @defaultvalue false
	 */
	hidden?: boolean;
	/**
	 * Default min-width for the dialog box.
	 * @defaultvalue '288px'
	 */
	dialogDefaultMinWidth?: string | ICSSRule | ICSSPixelUnitRule;
	/**
	 * Default max-width for the dialog box.
	 * @defaultvalue '340px'
	 */
	dialogDefaultMaxWidth?: string | ICSSRule | ICSSPixelUnitRule;
}
export interface IDialogStyles {
	/**
	 * Style for the root element.
	 */
	root: IStyle;
	main: IStyle;
}
export declare const Dialog: React.StatelessComponent<IDialogProps>;
export declare const DialogContent: (props: IDialogContentProps) => JSX.Element;
export declare class DialogFooterBase extends BaseComponent<IDialogFooterProps, {}> {
	private _classNames;
	render(): JSX.Element;
	private _renderChildrenAsActions;
}
export interface IDialogFooter {
}
export interface IDialogFooterProps extends React.Props<DialogFooterBase> {
	/**
	 * Gets the component ref.
	 */
	componentRef?: IRefObject<IDialogFooter>;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules
	 */
	styles?: IStyleFunctionOrObject<IDialogFooterStyleProps, IDialogFooterStyles>;
	/**
	 * Theme provided by HOC.
	 */
	theme?: ITheme;
	/**
	 * Optional override class name
	 */
	className?: string;
}
export interface IDialogFooterStyleProps {
	/**
	 * Accept theme prop.
	 */
	theme: ITheme;
	/**
	 * Optional override class name
	 */
	className?: string;
}
export interface IDialogFooterStyles {
	/**
	 * Style for the actions element.
	 */
	actions: IStyle;
	actionsRight: IStyle;
	action: IStyle;
}
export declare const DialogFooter: (props: IDialogFooterProps) => JSX.Element;
export declare const VerticalDivider: (props: IVerticalDividerProps) => JSX.Element;
export interface IDocumentCardTitleState {
	truncatedTitleFirstPiece?: string;
	truncatedTitleSecondPiece?: string;
}
export declare class DocumentCardTitle extends BaseComponent<IDocumentCardTitleProps, IDocumentCardTitleState> {
	private _titleElement;
	private _scrollTimerId;
	private _truncatedTitleAtWidth;
	private _isTruncated;
	constructor(props: IDocumentCardTitleProps);
	componentDidMount(): void;
	componentWillReceiveProps(newProps: IDocumentCardTitleProps): void;
	componentDidUpdate(): void;
	render(): JSX.Element;
	private _startTruncation;
	private _shrinkTitle;
	private _doesTitleOverflow;
	private _updateTruncation;
}
export declare class DocumentCardLocation extends BaseComponent<IDocumentCardLocationProps, any> {
	render(): JSX.Element;
}
export declare class DocumentCardActivity extends BaseComponent<IDocumentCardActivityProps, any> {
	render(): JSX.Element | null;
	private _renderAvatars;
	private _renderAvatar;
	private _getNameString;
}
export declare class DocumentCardActions extends BaseComponent<IDocumentCardActionsProps, any> {
	render(): JSX.Element;
}
export declare class DocumentCardLogo extends BaseComponent<IDocumentCardLogoProps, any> {
	render(): JSX.Element;
}
export declare class DocumentCardStatus extends BaseComponent<IDocumentCardStatusProps, any> {
	constructor(props: IDocumentCardStatusProps);
	render(): JSX.Element;
}
export declare class LinkBase extends BaseComponent<ILinkProps, any> implements ILink {
	private _link;
	render(): JSX.Element;
	focus(): void;
	private _onClick;
	private _removeInvalidPropsForRootType;
	private _getRootType;
}
export interface ILink {
	/** Sets focus to the link. */
	focus(): void;
}
export interface ILinkHTMLAttributes<T> extends React.HTMLAttributes<T> {
	type?: string;
	download?: any;
	href?: string;
	hrefLang?: string;
	media?: string;
	rel?: string;
	target?: string;
	autoFocus?: boolean;
	disabled?: boolean;
	form?: string;
	formAction?: string;
	formEncType?: string;
	formMethod?: string;
	formNoValidate?: boolean;
	formTarget?: string;
	name?: string;
	value?: string | string[] | number;
	[index: string]: any;
}
export interface ILinkProps extends ILinkHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLElement | LinkBase> {
	/**
	 * Optional callback to access the ILink interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<ILink>;
	/**
	 * Whether the link is disabled
	 */
	disabled?: boolean;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<ILinkStyleProps, ILinkStyles>;
	/**
	 * Theme (provided through customization.)
	 */
	theme?: ITheme;
	/**
	 * A component that should be used as the root element of the link returned from the Link component.
	 */
	as?: string | React.ComponentClass | React.StatelessComponent;
	/**
	 * Optional keytip for this Link
	 */
	keytipProps?: IKeytipProps;
}
export interface ILinkStyleProps {
	className?: string;
	isButton?: boolean;
	isDisabled?: boolean;
	theme: ITheme;
}
export interface ILinkStyles {
	root: IStyle;
}
export declare const Link: React.StatelessComponent<ILinkProps>;
export interface IDocumentCard {
	/**
	 * Sets focus to the DocumentCard.
	 */
	focus: () => void;
}
export interface IDocumentCardProps extends IBaseProps<IDocumentCard> {
	/**
	 * Optional callback to access the IDocumentCard interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IDocumentCard>;
	/**
	 * The type of DocumentCard to display.
	 * @defaultvalue DocumentCardType.normal
	 */
	type?: DocumentCardType;
	/**
	 * Function to call when the card is clicked or keyboard Enter/Space is pushed.
	 */
	onClick?: (ev?: React.SyntheticEvent<HTMLElement>) => void;
	/**
	 * A URL to navigate to when the card is clicked. If a function has also been provided,
	 * it will be used instead of the URL.
	 */
	onClickHref?: string;
	/**
	 * Optional class for document card.
	 */
	className?: string;
	/**
	 * Aria role assigned to the documentCard (Eg. button, link).
	 * Use this to override the default assignment.
	 * @defaultvalue When `onClick` is provided, default role will be 'button'. When `onClickHref` is provided, default role will be 'link'.
	 */
	role?: string;
	/**
	 * Hex color value of the line below the card, which should correspond to the document type.
	 * This should only be supplied when using the 'compact' card layout.
	 *
	 * Deprecated at v4.17.1, to be removed at \>= v5.0.0.
	 * @deprecated To be removed at v5.0.0.
	 */
	accentColor?: string;
}
export declare enum DocumentCardType {
	/**
	 * Standard DocumentCard.
	 */
	normal = 0,
	/**
	 * Compact layout. Displays the preview beside the details, rather than above.
	 */
	compact = 1
}
export interface IDocumentCardPreviewProps extends IBaseProps<{}> {
	/**
	 * Gets the component ref.
	 */
	componentRef?: IRefObject<{}>;
	/**
	 * One or more preview images to display.
	 */
	previewImages: IDocumentCardPreviewImage[];
	/**
	 * The function return string that will describe the number of overflow documents.
	 * such as  (overflowCount: number) =\> `+${ overflowCount } more`,
	 */
	getOverflowDocumentCountText?: (overflowCount: number) => string;
}
export interface IDocumentCardPreviewImage {
	/**
	 * Gets the component ref.
	 */
	componentRef?: IRefObject<{}>;
	/**
	 * File name for the document this preview represents.
	 */
	name?: string;
	/**
	 * URL to view the file.
	 * @deprecated Use `href` inside of `linkProps` instead.
	 */
	url?: string;
	/**
	 * Props to pass to Link component
	 */
	linkProps?: ILinkProps;
	/**
	 * Path to the preview image.
	 */
	previewImageSrc?: string;
	/**
	 * Deprecated at v1.3.6, to be removed at \>= v2.0.0.
	 * @deprecated To be removed at v2.0.0.
	 */
	errorImageSrc?: string;
	/**
	 * Path to the icon associated with this document type.
	 *
	 */
	iconSrc?: string;
	/**
	 * If provided, forces the preview image to be this width.
	 */
	width?: number;
	/**
	 * If provided, forces the preview image to be this height.
	 */
	height?: number;
	/**
	 * Used to determine how to size the image to fit the dimensions of the component.
	 * If both dimensions are provided, then the image is fit using ImageFit.scale, otherwise ImageFit.none is used.
	 */
	imageFit?: ImageFit;
	/**
	 * Hex color value of the line below the preview, which should correspond to the document type.
	 *
	 * Deprecated at v4.17.1, to be removed at \>= v5.0.0.
	 * @deprecated To be removed at v5.0.0.
	 */
	accentColor?: string;
	/**
	 * The props for the preview icon.
	 * If provided, icon will be rendered instead of image.
	 */
	previewIconProps?: IIconProps;
	/**
	 * The props for the preview icon container classname.
	 * If provided, icon container classname will be used..
	 */
	previewIconContainerClass?: string;
}
export interface IDocumentCardTitleProps extends React.ClassAttributes<DocumentCardTitle> {
	/**
	 * Gets the component ref.
	 */
	componentRef?: IRefObject<{}>;
	/**
	 * Title text. If the card represents more than one document, this should be the title of one document and a "+X" string.
	 * For example, a collection of four documents would have a string of "Document.docx +3".
	 */
	title: string;
	/**
	 * Whether we truncate the title to fit within the box. May have a performance impact.
	 * @defaultvalue true
	 */
	shouldTruncate?: boolean;
	/**
	 * Whether show as title as secondary title style such as smaller font and lighter color.
	 * @defaultvalue false
	 */
	showAsSecondaryTitle?: boolean;
}
export interface IDocumentCardLocationProps extends React.ClassAttributes<DocumentCardLocation> {
	/**
	 * Gets the component ref.
	 */
	componentRef?: IRefObject<{}>;
	/**
	 * Text for the location of the document.
	 */
	location: string;
	/**
	 * URL to navigate to for this location.
	 */
	locationHref?: string;
	/**
	 * Function to call when the location is clicked.
	 */
	onClick?: (ev?: React.MouseEvent<HTMLElement>) => void;
	/**
	 * Aria label for the link to the document location.
	 */
	ariaLabel?: string;
}
export interface IDocumentCardActivityProps extends React.ClassAttributes<DocumentCardActivity> {
	/**
	 * Gets the component ref.
	 */
	componentRef?: IRefObject<{}>;
	/**
	 * Describes the activity that has taken place, such as "Created Feb 23, 2016".
	 */
	activity: string;
	/**
	 * One or more people who are involved in this activity.
	 */
	people: IDocumentCardActivityPerson[];
}
export interface IDocumentCardActivityPerson {
	/**
	 * The name of the person.
	 */
	name: string;
	/**
	 * Path to the profile photo of the person.
	 */
	profileImageSrc: string;
	/**
	 * The user's initials to display in the profile photo area when there is no image.
	 */
	initials?: string;
	/**
	 * Whether initials are calculated for phone numbers and number sequences.
	 * Example: Set property to true to get initials for project names consisting of numbers only.
	 * @defaultvalue false
	 */
	allowPhoneInitials?: boolean;
	/**
	 * The background color when the user's initials are displayed.
	 * @defaultvalue PersonaInitialsColor.blue
	 */
	initialsColor?: PersonaInitialsColor;
}
export interface IDocumentCardActionsProps extends React.ClassAttributes<DocumentCardActions> {
	/**
	 * Gets the component ref.
	 */
	componentRef?: IRefObject<{}>;
	/**
	 * The actions available for this document.
	 */
	actions: IButtonProps[];
	/**
	 * The number of views this document has received.
	 */
	views?: Number;
}
export interface IDocumentCardLogoProps extends React.ClassAttributes<DocumentCardLogo> {
	/**
	 * Gets the component ref.
	 */
	componentRef?: IRefObject<{}>;
	/**
	 * Describes DocumentCard Logo badge.
	 */
	logoIcon: string;
	/**
	 * Describe Logo name, optional.
	 */
	logoName?: string;
}
export interface IDocumentCardStatusProps extends React.ClassAttributes<DocumentCardStatus> {
	/**
	 * Gets the component ref.
	 */
	componentRef?: IRefObject<{}>;
	/**
	 * Describes DocumentCard status icon.
	 */
	statusIcon?: string;
	/**
	 * Describe status information. Required field.
	 */
	status: string;
}
export declare class DocumentCard extends BaseComponent<IDocumentCardProps, any> implements IDocumentCard {
	static defaultProps: IDocumentCardProps;
	private _rootElement;
	constructor(props: IDocumentCardProps);
	render(): JSX.Element;
	focus(): void;
	private _onClick;
	private _onKeyDown;
	private _onAction;
}
export declare class DocumentCardPreview extends BaseComponent<IDocumentCardPreviewProps, any> {
	render(): JSX.Element;
	private _renderPreviewImage;
	private _renderPreviewList;
}
export interface ILabel {
}
export interface ILabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	/**
	 * Render the root element as another type.
	 */
	as?: IComponentAs<React.AllHTMLAttributes<HTMLElement>>;
	/**
	 * Optional callback to access the ILabel interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<ILabel>;
	/**
	 * Whether the associated form field is required or not
	 * @defaultvalue false
	 */
	required?: boolean;
	/**
	 * Renders the label as disabled.
	 */
	disabled?: boolean;
	/**
	 * Theme provided by HOC.
	 */
	theme?: ITheme;
	/**
	 * Styles for the label.
	 */
	styles?: IStyleFunctionOrObject<ILabelStyleProps, ILabelStyles>;
}
export interface ILabelStyles {
	/**
	 * Styles for the root element.
	 */
	root: IStyle;
}
export interface ILabelStyleProps {
	/**
	 *
	 */
	theme: ITheme;
	className?: string;
	disabled?: boolean;
	required?: boolean;
}
export declare class LabelBase extends BaseComponent<ILabelProps, {}> {
	render(): JSX.Element;
}
export declare const Label: (props: ILabelProps) => JSX.Element;
export interface IDropdown {
	focus: (shouldOpenOnFocus?: boolean) => void;
}
export interface IDropdownProps extends ISelectableDroppableTextProps<IDropdown, HTMLDivElement> {
	/**
	 * Input placeholder text. Displayed until option is selected.
	 * @deprecated Use `placeholder`
	 */
	placeHolder?: string;
	/**
	 * Options for the dropdown. If using `defaultSelectedKey` or `defaultSelectedKeys`, options must be
	 * pure for correct behavior.
	 */
	options: IDropdownOption[];
	/**
	 * Callback issued when the selected option changes.
	 */
	onChange?: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => void;
	/**
	 * @deprecated Use `onChange` instead.
	 */
	onChanged?: (option: IDropdownOption, index?: number) => void;
	/**
	 * Callback issues when the options callout is dismissed
	 */
	onDismiss?: () => void;
	/**
	 * Optional custom renderer for placeholder text
	 */
	onRenderPlaceHolder?: IRenderFunction<IDropdownProps>;
	/**
	 * Optional custom renderer for selected option displayed in input
	 */
	onRenderTitle?: IRenderFunction<IDropdownOption | IDropdownOption[]>;
	/**
	 * Optional custom renderer for chevron icon
	 */
	onRenderCaretDown?: IRenderFunction<IDropdownProps>;
	/**
	 * Custom width for dropdown. If value is 0, width of the input field is used.
	 * @defaultvalue 0
	 */
	dropdownWidth?: number;
	/**
	 * Pass in ResponsiveMode to manually overwrite the way the Dropdown renders.
	 * ResponsiveMode.Large would, for instance, disable the behavior where Dropdown options
	 * get rendered into a Panel while ResponsiveMode.Small would result in the Dropdown
	 * options always getting rendered in a Panel.
	 */
	responsiveMode?: ResponsiveMode;
	/**
	 * Optional mode indicates if multi-choice selections is allowed.  Default to false
	 */
	multiSelect?: boolean;
	/**
	 * Keys that will be initially used to set selected items.
	 */
	defaultSelectedKeys?: string[] | number[];
	/**
	 * Keys of the selected items. If you provide this, you must maintain selection
	 * state by observing onChange events and passing a new value in when changed.
	 */
	selectedKeys?: string[] | number[];
	/**
	 * When multiple items are selected, this still will be used to separate values in
	 * the dropdown title.
	 *
	 * @defaultvalue ", "
	 */
	multiSelectDelimiter?: string;
	/**
	 * Optional preference to have onChanged still be called when an already selected item is
	 * clicked in single select mode.  Default to false
	 */
	notifyOnReselect?: boolean;
	/**
	 * Deprecated at v0.52.0, use `disabled` instead.
	 * @deprecated Use `disabled` instead.
	 */
	isDisabled?: boolean;
	/**
	 * Optional keytip for this dropdown
	 */
	keytipProps?: IKeytipProps;
	/**
	 * Theme provided by higher order component.
	 */
	theme?: ITheme;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<IDropdownStyleProps, IDropdownStyles>;
}
export interface IDropdownOption extends ISelectableOption {
	/**
	 * Deprecated at v.65.1, use `selected` instead.
	 * @deprecated Use `selected` instead.
	 */
	isSelected?: boolean;
}
/**
 * The props needed to construct styles. This represents the simplified set of immutable things which control the class names.
 */
export declare type IDropdownStyleProps = Pick<IDropdownProps, 'theme' | 'className' | 'disabled' | 'required'> & {
	/**
	 * Whether the dropdown is in an error state.
	 */
	hasError: boolean;
	/**
	 * Whether the dropdown is in an opened state.
	 */
	isOpen: boolean;
	/**
	 * Whether the dropdown is presently rendering a placeholder.
	 */
	isRenderingPlaceholder: boolean;
	/**
	 * Optional custom classname for the panel that displays in small viewports, hosting the Dropdown options.
	 * This is primarily provided for backwards compatibility.
	 */
	panelClassName?: string;
	/**
	 * Optional custom classname for the callout that displays in larger viewports, hosting the Dropdown options.
	 * This is primarily provided for backwards compatibility.
	 */
	calloutClassName?: string;
	/**
	 * Prop to notify on what edge the dropdown callout was positioned respective to the title.
	 */
	calloutRenderEdge?: RectangleEdge;
};
/**
 * Represents the stylable areas of the control.
 */
export interface IDropdownStyles {
	/** Root element of the Dropdown (includes Label and the actual Dropdown). */
	root: IStyle;
	/** Refers to the label associated with the dropdown. This is enclosed by the root. */
	label: IStyle;
	/** Refers to the actual Dropdown element. */
	dropdown: IStyle;
	/** Refers to the primary title of the Dropdown (rendering the selected options/placeholder/etc.). */
	title: IStyle;
	/** Refers to the wrapping container around the downward pointing caret users click on to expand the Dropdown. */
	caretDownWrapper: IStyle;
	/** Refers to the downward pointing caret icon users click on to expand the Dropdown. */
	caretDown: IStyle;
	/** Refers to the error message being rendered under the Dropdown (if any). */
	errorMessage: IStyle;
	/** Refers to the element that wraps `dropdownItems`. */
	dropdownItemsWrapper: IStyle;
	/** Refers to the FocusZone wrapping the individual dropdown items. */
	dropdownItems: IStyle;
	/** Refers to the individual dropdown item. */
	dropdownItem: IStyle;
	/** Style for a dropdown item when it is being selected. */
	dropdownItemSelected: IStyle;
	/** Style for a dropdown item when it is disabled. */
	dropdownItemDisabled: IStyle;
	/** Style for a dropdown item when it is both selected and disabled. */
	dropdownItemSelectedAndDisabled: IStyle;
	/**
	 * Refers to the text element that renders the actual dropdown item/option text. This would be wrapped by the element
	 * referred to by `dropdownItem`.
	 */
	dropdownOptionText: IStyle;
	/** Refers to the dropdown seperator. */
	dropdownDivider: IStyle;
	/** Refers to the individual dropdown items that are being rendered as a header. */
	dropdownItemHeader: IStyle;
	/**
	 * Refers to the panel that hosts the Dropdown options in small viewports.
	 * Note: This will be deprecated when Panel supports JS Styling.
	 */
	panel: IStyle;
	/** Refers to the callout that hosts Dropdown options in larger viewports. */
	callout: IStyle;
	/** Subcomponent styles. */
	subComponentStyles: IDropdownSubComponentStyles;
}
export interface IDropdownSubComponentStyles {
	/** Refers to the panel that hosts the Dropdown options in small viewports. */
	/** Refers to the primary label for the Dropdown. */
	label: IStyleFunctionOrObject<ILabelStyleProps, any>;
}
export declare const Dropdown: (props: IDropdownProps) => JSX.Element;
/** Internal only props interface to support mixing in responsive mode */
export interface IDropdownInternalProps extends IDropdownProps, IWithResponsiveModeState {
}
export interface IDropdownState {
	isOpen: boolean;
	selectedIndices: number[];
	/** Whether the root dropdown element has focus. */
	hasFocus: boolean;
	calloutRenderEdge?: RectangleEdge;
}
export declare class DropdownBase extends BaseComponent<IDropdownInternalProps, IDropdownState> {
	static defaultProps: {
		options: any[];
	};
	private _host;
	private _focusZone;
	private _dropDown;
	private _id;
	private _isScrollIdle;
	private readonly _scrollIdleDelay;
	private _scrollIdleTimeoutId;
	/** True if the most recent keydown event was for alt (option) or meta (command). */
	private _lastKeyDownWasAltOrMeta;
	private _sizePosCache;
	private _classNames;
	/** Flag for when we get the first mouseMove */
	private _gotMouseMove;
	constructor(props: IDropdownProps);
	componentWillReceiveProps(newProps: IDropdownProps): void;
	componentDidUpdate(prevProps: IDropdownProps, prevState: IDropdownState): void;
	render(): JSX.Element;
	focus(shouldOpenOnFocus?: boolean): void;
	setSelectedIndex(event: React.FormEvent<HTMLDivElement>, index: number): void;
	/** Get either props.placeholder (new name) or props.placeHolder (old name) */
	private readonly _placeholder;
	private _copyArray;
	/**
	 * Finds the next valid Dropdown option and sets the selected index to it.
	 * @param stepValue Value of how many items the function should traverse.  Should be -1 or 1.
	 * @param index Index of where the search should start
	 * @param selectedIndex The selectedIndex Dropdown's state
	 * @returns The next valid dropdown option's index
	 */
	private _moveIndex;
	/** Render text in dropdown input */
	private _onRenderTitle;
	/** Render placeholder text in dropdown input */
	private _onRenderPlaceholder;
	/** Render Callout or Panel container and pass in list */
	private _onRenderContainer;
	/** Render Caret Down Icon */
	private _onRenderCaretDown;
	/** Wrap item list in a FocusZone */
	private _renderFocusableList;
	/** Render List of items */
	private _onRenderList;
	private _onRenderItem;
	private _renderSeparator;
	private _renderHeader;
	private _renderOption;
	/** Render content of item (i.e. text/icon inside of button) */
	private _onRenderOption;
	/** Render custom label for drop down item */
	private _onRenderLabel;
	private _onPositioned;
	private _onItemClick;
	/**
	 * Scroll handler for the callout to make sure the mouse events
	 * for updating focus are not interacting during scroll
	 */
	private _onScroll;
	private _onItemMouseEnter;
	private _onItemMouseMove;
	private _onMouseItemLeave;
	private _shouldIgnoreMouseEvent;
	private _onDismiss;
	/** Get all selected indexes for multi-select mode */
	private _getSelectedIndexes;
	/** Get all selected options for multi-select mode */
	private _getAllSelectedOptions;
	private _getAllSelectedIndices;
	private _getSelectedIndex;
	private _onDropdownBlur;
	private _onDropdownKeyDown;
	private _onDropdownKeyUp;
	/**
	 * Returns true if the key for the event is alt (Mac option) or meta (Mac command).
	 */
	private _isAltOrMeta;
	/**
	 * We close the menu on key up only if ALL of the following are true:
	 * - Most recent key down was alt or meta (command)
	 * - The alt/meta key down was NOT followed by some other key (such as down/up arrow to
	 *   expand/collapse the menu)
	 * - We're not on a Mac (or iOS)
	 *
	 * This is because on Windows, pressing alt moves focus to the application menu bar or similar,
	 * closing any open context menus. There is not a similar behavior on Macs.
	 */
	private _shouldHandleKeyUp;
	private _onZoneKeyDown;
	private _onZoneKeyUp;
	private _onDropdownClick;
	private _onFocus;
	/**
	 * Because the isDisabled prop is deprecated, we have had to repeat this logic all over the place.
	 * This helper method avoids all the repetition.
	 */
	private _isDisabled;
}
export interface ISpinner {
}
/**
 * Spinner component props.
 */
export interface ISpinnerProps extends React.HTMLAttributes<HTMLElement> {
	/**
	 * Optional callback to access the ISpinner interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<ISpinner>;
	/**
	 * Deprecated and will be removed at \>= 2.0.0. Use `SpinnerSize` instead.
	 * @deprecated Use `SpinnerSize` instead.
	 */
	type?: SpinnerType;
	/**
	 * The size of Spinner to render. \{ extraSmall, small, medium, large \}
	 * @defaultvalue SpinnerType.medium
	 */
	size?: SpinnerSize;
	/**
	 * The label to show next to the Spinner. Label updates will be announced to the screen readers.
	 * Use ariaLive to control politeness level.
	 */
	label?: string;
	/**
	 * Additional CSS class(es) to apply to the Spinner.
	 */
	className?: string;
	/**
	 * Politeness setting for label update announcement.
	 * @defaultvalue polite
	 */
	ariaLive?: 'assertive' | 'polite' | 'off';
	/**
	 * Alternative status label for screen reader
	 */
	ariaLabel?: string;
	/**
	 * Theme (provided through customization.)
	 */
	theme?: ITheme;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<ISpinnerStyleProps, ISpinnerStyles>;
	/**
	 * The position of the label in regards of the spinner animation.
	 * @defaultvalue SpinnerLabelPosition.bottom
	 */
	labelPosition?: SpinnerLabelPosition;
}
/**
 * Possible variations of the spinner circle size.
 */
export declare enum SpinnerSize {
	/**
	 * 12px Spinner diameter
	 */
	xSmall = 0,
	/**
	 * 16px Spinner diameter
	 */
	small = 1,
	/**
	 * 20px Spinner diameter
	 */
	medium = 2,
	/**
	 * 28px Spinner diameter
	 */
	large = 3
}
/**
 * Possible locations of the label in regards to the spinner
 * @defaultvalue bottom
 */
export declare type SpinnerLabelPosition = 'top' | 'right' | 'bottom' | 'left';
/**
 * Deprecated at v2.0.0, use `SpinnerSize` instead.
 * @deprecated Use `SpinnerSize` instead.
 */
export declare enum SpinnerType {
	/**
	 * Deprecated and will be removed at \>= 2.0.0. Use `SpinnerSize.medium` instead.
	 * @deprecated Use `SpinnerSize.medium` instead.
	 */
	normal = 0,
	/**
	 * Deprecated and will be removed at \>= 2.0.0. Use `SpinnerSize.large` instead.
	 * @deprecated Use `SpinnerSize.large` instead.
	 */
	large = 1
}
/**
 * The props needed to construct styles. This represents the simplified set of immutable things which control the class names.
 */
export interface ISpinnerStyleProps {
	/** Theme provided by High-Order Component. */
	theme: ITheme;
	/** Size of the spinner animation. */
	size?: SpinnerSize;
	/** CSS class name for the component attached to the root stylable area. */
	className?: string;
	/** Position of the label in regards to the spinner animation. */
	labelPosition?: SpinnerLabelPosition;
}
/**
 * Represents the stylable areas of the control.
 */
export interface ISpinnerStyles {
	/** Styles for the root element. Refers to the wrapper containing both the circle and the label. */
	root?: IStyle;
	/** Styles for the spinner circle animation. */
	circle?: IStyle;
	/** Styles for the label accompanying the circle. */
	label?: IStyle;
	/** Styles for the hidden helper element to aid with screen readers. */
	screenReaderText?: IStyle;
}
/** Suggestions component. */
export interface ISuggestions<T> {
	/** Execute the action selected. Can be SearchMore or ForceResolve actions. */
	executeSelectedAction: () => void;
	/** Focus on the ForceResolve action above the suggestions. If not available then focus on SearchMore action. */
	focusAboveSuggestions: () => void;
	/** Focus on the SearchMore action below the suggestions. If not available then focus on ForceResolve action. */
	focusBelowSuggestions: () => void;
	/** Focus the SearchMore action button. */
	focusSearchForMoreButton: () => void;
	/** Whether it has any suggested actions like ForceResolve or SearchMore. */
	hasSuggestedAction: () => boolean;
	/** Whether any of the suggested actions (ForceResolve or SearchMore) is selected. */
	hasSuggestedActionSelected: () => boolean;
	/** Returns true if the event was handled, false otherwise. */
	tryHandleKeyDown: (keyCode: number, currentSuggestionIndex: number) => boolean;
}
/**
 * Suggestions props interface. Refers to the entire container holding all the suggestions.
 * Type T is the type of the items that are displayed.
 */
export interface ISuggestionsProps<T> extends React.Props<any> {
	/**
	 * Optional callback to access the ISuggestions interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<ISuggestions<T>>;
	/**
	 * How the suggestion should look in the suggestion list.
	 */
	onRenderSuggestion?: (props: T, suggestionItemProps: T) => JSX.Element;
	/**
	 * What should occur when a suggestion is clicked
	 */
	onSuggestionClick: (ev?: React.MouseEvent<HTMLElement>, item?: any, index?: number) => void;
	/**
	 * The list of Suggestions that will be displayed
	 */
	suggestions: ISuggestionModel<T>[];
	/**
	 * How the "no result found" should look in the suggestion list.
	 */
	onRenderNoResultFound?: IRenderFunction<void>;
	/**
	 * The text that appears at the top of the suggestions list.
	 */
	suggestionsHeaderText?: string;
	/**
	 * The text that should appear at the top of the most recently used box.
	 */
	mostRecentlyUsedHeaderText?: string;
	/**
	 * The text that appears indicating to the user that they can search for more results.
	 */
	searchForMoreText?: string;
	/**
	 * The callback that should be called when the user attempts to get more results
	 */
	onGetMoreResults?: () => void;
	/**
	 * The text that appears indicating to the use to force resolve the input
	 */
	forceResolveText?: string;
	/**
	 * The callback that should be called to see if the force resolve command should be shown
	 */
	showForceResolve?: () => boolean;
	/**
	 * The callback that should be called when the user attempts to use the input text as as item
	 */
	createGenericItem?: () => void;
	/**
	 * The CSS className of the suggestions root.
	 */
	className?: string;
	/**
	 * The CSS className of the suggestions list
	 */
	suggestionsClassName?: string;
	/**
	 * The text that should appear if there is a search error.
	 */
	searchErrorText?: string;
	/**
	 * The text that should appear if no results are found when searching.
	 */
	noResultsFoundText?: string;
	/**
	 * The className of the suggestion item.
	 */
	suggestionsItemClassName?: string;
	/**
	 * Used to indicate whether or not the user can request more suggestions.
	 * Dictates whether or not the searchForMore button is displayed.
	 */
	moreSuggestionsAvailable?: boolean;
	/**
	 * Used to indicate whether or not the suggestions are loading.
	 */
	isLoading?: boolean;
	/**
	 * Used to indicate whether or not the component is searching for more results.
	 */
	isSearching?: boolean;
	/**
	 * The text to display while the results are loading.
	 */
	loadingText?: string;
	/**
	 * The text to display while searching for more results in a limited suggestions list.
	 */
	searchingText?: string;
	/**
	 * Indicates if a short list of recent suggestions should be shown.
	 */
	isMostRecentlyUsedVisible?: boolean;
	/**
	 * Function to fire when one of the optional remove buttons on a suggestion is clicked.
	 */
	onSuggestionRemove?: (ev?: React.MouseEvent<HTMLElement>, item?: IPersonaProps, index?: number) => void;
	/**
	 * Indicates if the text in resultsFooter or resultsFooterFull should be shown at the end of the suggestion list.
	 * @defaultvalue true
	 */
	isResultsFooterVisible?: boolean;
	/**
	 * Maximum number of suggestions to show in the full suggestion list.
	 */
	resultsMaximumNumber?: number;
	/**
	 * A renderer that adds an element at the end of the suggestions list it has more items than resultsMaximumNumber.
	 */
	resultsFooterFull?: (props: ISuggestionsProps<T>) => JSX.Element;
	/**
	 * A renderer that adds an element at the end of the suggestions list it has fewer items than resultsMaximumNumber.
	 */
	resultsFooter?: (props: ISuggestionsProps<T>) => JSX.Element;
	/**
	 * Indicates whether to show a button with each suggestion to remove that suggestion.
	 */
	showRemoveButtons?: boolean;
	/**
	 * Screen reader message to read when there are suggestions available.
	 */
	suggestionsAvailableAlertText?: string;
	/**
	 * A function that resets focus to the expected item in the suggestion list
	 */
	refocusSuggestions?: (keyCode: KeyCodes) => void;
	/**
	 * An ARIA label for the container that is the parent of the suggestions.
	 */
	suggestionsContainerAriaLabel?: string;
	/**
	 * An ARIA label to use for the buttons to remove individual suggestions.
	 */
	removeSuggestionAriaLabel?: string;
	/**
	 * The string that will be used as the suggestionsListId.
	 * Will be used by the BasePicker to keep track of the list for aria.
	 */
	suggestionsListId?: string;
	/** Call to provide customized styling that will layer on top of the variant rules. */
	styles?: IStyleFunctionOrObject<{}, {}>;
	/** Theme provided by High-Order Component. */
	theme?: ITheme;
}
/** The props needed to construct Suggestions styles. */
export declare type ISuggestionsStyleProps = Required<Pick<ISuggestionsProps<any>, 'theme'>> & Pick<ISuggestionsProps<any>, 'className' | 'suggestionsClassName'> & {
	/** Whether the forceResolve actionButton is selected. */
	forceResolveButtonSelected?: boolean;
	/** Whether the searchForMore actionButton is selected. */
	searchForMoreButtonSelected?: boolean;
};
/** Represents the stylable areas of the Suggestions. */
export interface ISuggestionsStyles {
	/** Root element of the suggestions outer wrapper. */
	root: IStyle;
	/** Refers to the suggestions container. */
	suggestionsContainer: IStyle;
	/** Refers to the title rendered for suggestions container header and/or footer (if provided). */
	title: IStyle;
	/** Refers to the 'Force resolve' actionButton. */
	forceResolveButton: IStyle;
	/** Refers to the 'Search for more' actionButton. */
	searchForMoreButton: IStyle;
	/** Refers to the text rendered when no suggestions are found. */
	noSuggestions: IStyle;
	/** Refers to the text displaying if more suggestions available. */
	suggestionsAvailable: IStyle;
	/** SubComponents (Spinner) styles. */
	subComponentStyles: ISuggestionsSubComponentStyles;
}
/** Styles interface of the SubComponents rendered within PeoplePickerItemSelected. */
export interface ISuggestionsSubComponentStyles {
	/** Refers to the Spinner rendered within the Suggestions when searching or loading suggestions. */
	spinner: IStyleFunctionOrObject<ISpinnerStyleProps, any>;
}
/**
 * SuggestionModel interface.
 * Type T is the type of the item that is suggested (Persona, Tag or any other custom picker).
 */
export interface ISuggestionModel<T> {
	/** The suggested item of the type T */
	item: T;
	/** Whether the suggested item is selected or not. */
	selected: boolean;
	/** Aria-label string for each suggested item. */
	ariaLabel?: string;
}
/** Enum to help identify which suggestions action button is selected. */
export declare enum SuggestionActionType {
	/** None of the actions is selected. */
	none = 0,
	/** ForceResolve action is selected. */
	forceResolve = 1,
	/** SearchMore action is selected. */
	searchMore = 2
}
export interface ISuggestionsState {
	selectedActionType: SuggestionActionType;
}
export declare class Suggestions<T> extends BaseComponent<ISuggestionsProps<T>, ISuggestionsState> {
	protected _forceResolveButton: React.RefObject<IButton>;
	protected _searchForMoreButton: React.RefObject<IButton>;
	protected _selectedElement: React.RefObject<HTMLDivElement>;
	private SuggestionsItemOfProperType;
	private activeSelectedElement;
	private _classNames;
	constructor(suggestionsProps: ISuggestionsProps<T>);
	componentDidMount(): void;
	componentDidUpdate(): void;
	render(): JSX.Element;
	/**
	 * Returns true if the event was handled, false otherwise
	 */
	tryHandleKeyDown: (keyCode: number, currentSuggestionIndex: number) => boolean;
	hasSuggestedAction(): boolean;
	hasSuggestedActionSelected(): boolean;
	executeSelectedAction(): void;
	focusAboveSuggestions(): void;
	focusBelowSuggestions(): void;
	focusSearchForMoreButton(): void;
	scrollSelected(): void;
	private _renderSuggestions;
	private _getMoreResults;
	private _forceResolve;
	private _shouldShowForceResolve;
	private _onClickTypedSuggestionsItem;
	private _refocusOnSuggestions;
	private _onRemoveTypedSuggestionsItem;
}
/** SuggestionItem component. */
export interface ISuggestionsItem {
}
/**
 * Suggestion item props. Refers to the each individual suggested items rendered within Suggestions callout.
 * Type T is the type of the item that is displayed.
 */
export interface ISuggestionItemProps<T> {
	/**
	 * Optional callback to access the ISuggestionItem interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<ISuggestionsItem>;
	/** Individual suggestion object containing its properties. */
	suggestionModel: ISuggestionModel<T>;
	/** Optional renderer to override the default one for each type of picker. */
	RenderSuggestion: (item: T, suggestionItemProps?: ISuggestionItemProps<T>) => JSX.Element;
	/** Callback for when the user clicks on the suggestion. */
	onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
	/** Callback for when the item is removed from the array of suggested items. */
	onRemoveItem: (ev: React.MouseEvent<HTMLButtonElement>) => void;
	/** Optional className for the root element of the suggestion item. */
	className?: string;
	/** Unique id of the suggested item. */
	id?: string;
	/** Whether the remove button should be rendered or not. */
	showRemoveButton?: boolean;
	/** An override for the 'selected' property of the SuggestionModel. */
	isSelectedOverride?: boolean;
	/**
	 * The ARIA label for the button to remove the suggestion from the list.
	 */
	removeButtonAriaLabel?: string;
	/** Call to provide customized styling that will layer on top of the variant rules. */
	styles?: IStyleFunctionOrObject<ISuggestionsItemStyleProps, ISuggestionsItemStyles>;
	/** Theme provided by High-Order Component. */
	theme?: ITheme;
}
/** The props needed to construct SuggestionItem styles. */
export declare type ISuggestionsItemStyleProps = Required<Pick<ISuggestionItemProps<any>, 'theme'>> & Pick<ISuggestionItemProps<any>, 'className'> & {
	/** Whether the suggestion item is selected or not. */
	suggested?: boolean;
};
/** Represents the stylable areas of the SuggestionItem. */
export interface ISuggestionsItemStyles {
	/** Root element of the suggested item. */
	root: IStyle;
	/** Refers to the CommandButton holding the content of the suggested item. */
	itemButton: IStyle;
	/** Refers to the remove button in case it's rendered. */
	closeButton: IStyle;
}
export declare class SuggestionsItem<T> extends BaseComponent<ISuggestionItemProps<T>, {}> {
	render(): JSX.Element;
}
export declare class SuggestionsController<T> {
	currentIndex: number;
	currentSuggestion: ISuggestionModel<T> | undefined;
	suggestions: ISuggestionModel<T>[];
	constructor();
	updateSuggestions(newSuggestions: T[], selectedIndex?: number): void;
	/**
	 * Increments the suggestion index and gets the next suggestion in the list.
	 */
	nextSuggestion(): boolean;
	/**
	 * Decrements the suggestion index and gets the previous suggestion in the list.
	 */
	previousSuggestion(): boolean;
	getSuggestions(): ISuggestionModel<T>[];
	getCurrentItem(): ISuggestionModel<T>;
	getSuggestionAtIndex(index: number): ISuggestionModel<T>;
	hasSelectedSuggestion(): boolean;
	removeSuggestion(index: number): void;
	createGenericSuggestion(itemToConvert: ISuggestionModel<T> | T): void;
	convertSuggestionsToSuggestionItems(suggestions: Array<ISuggestionModel<T> | T>): ISuggestionModel<T>[];
	deselectAllSuggestions(): void;
	setSelectedSuggestion(index: number): void;
	private _isSuggestionModel;
	private _ensureSuggestionModel;
}
/** PickerItem component. */
export interface IPickerItem {
}
/** PickerItem props common for any type of items. */
export interface IPickerItemProps<T> extends React.AllHTMLAttributes<HTMLElement> {
	/**
	 * Optional callback to access the IPickerItem interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IPickerItem>;
	/** The item of Type T (Persona, Tag, or any other custom item provided). */
	item: T;
	/** Index number of the item in the array of picked items. */
	index: number;
	/** Wether the picked item is selected or not. */
	selected?: boolean;
	/** Callback issued when the item is removed from the array of picked items. */
	onRemoveItem?: () => void;
	/**
	 * Internal Use only, gives a callback to the renderer to call when an item has changed.
	 * This allows the base picker to keep track of changes in the items.
	 */
	onItemChange?: (item: T, index: number) => void;
	/** Unique key for each picked item. */
	key?: string | number;
	/** Aria-label for the picked item remove button. */
	removeButtonAriaLabel?: string;
}
/** BasePicker component. */
export interface IBasePicker<T> {
	/** Gets the current value of the input. */
	items: T[] | undefined;
	/** Sets focus to the focus zone. */
	focus: () => void;
	/** Set focus to the input */
	focusInput: () => void;
}
export interface IBasePickerProps<T> extends React.Props<any> {
	/**
	 * Optional callback to access the IBasePicker interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IBasePicker<T>>;
	/**
	 * Function that specifies how the selected item will appear.
	 */
	onRenderItem?: (props: IPickerItemProps<T>) => JSX.Element;
	/**
	 * Function that specifies how an individual suggestion item will appear.
	 */
	onRenderSuggestionsItem?: (props: T, itemProps: any) => JSX.Element;
	/**
	 * A callback for what should happen when a person types text into the input.
	 * Returns the already selected items so the resolver can filter them out.
	 * If used in conjunction with resolveDelay this will ony kick off after the delay throttle.
	 */
	onResolveSuggestions: (filter: string, selectedItems?: T[]) => T[] | PromiseLike<T[]>;
	/**
	 * The delay time in ms before resolving suggestions, which is kicked off when input has been changed.
	 * e.g. If a second input change happens within the resolveDelay time, the timer will start over.
	 * Only until after the timer completes will onResolveSuggestions be called.
	 */
	resolveDelay?: number;
	/**
	 * A callback for what should happen when a user clicks the input.
	 */
	onEmptyInputFocus?: (selectedItems?: T[]) => T[] | PromiseLike<T[]>;
	/**
	 * Initial items that have already been selected and should appear in the people picker.
	 */
	defaultSelectedItems?: T[];
	/**
	 * A callback for when the selected list of items changes.
	 */
	onChange?: (items?: T[]) => void;
	/**
	 * A callback for when the user put focus on the picker
	 */
	onFocus?: React.FocusEventHandler<HTMLInputElement | BaseAutoFill>;
	/**
	 * A callback for when the user moves the focus away from the picker
	 */
	onBlur?: React.FocusEventHandler<HTMLInputElement | BaseAutoFill>;
	/**
	 * A callback to get text from an item. Used to autofill text in the pickers.
	 */
	getTextFromItem?: (item: T, currentValue?: string) => string;
	/**
	 * A callback that gets the rest of the results when a user clicks get more results.
	 */
	onGetMoreResults?: (filter: string, selectedItems?: T[]) => T[] | PromiseLike<T[]>;
	/**
	 * ClassName for the picker.
	 */
	className?: string;
	/**
	 * The properties that will get passed to the Suggestions component.
	 */
	pickerSuggestionsProps?: IBasePickerSuggestionsProps;
	/**
	 * The properties that will get passed to the Callout component.
	 */
	pickerCalloutProps?: ICalloutProps;
	/**
	 * AutoFill input native props
	 * @defaultvalue undefined
	 */
	inputProps?: IInputProps;
	/**
	 * A callback for when a persona is removed from the suggestion list
	 */
	onRemoveSuggestion?: (item: IPersonaProps) => void;
	/**
	 * A function used to validate if raw text entered into the well can be added into the selected items list
	 */
	onValidateInput?: (input: string) => ValidationState;
	/**
	 * The text to display while searching for more results in a limited suggestions list
	 */
	searchingText?: ((props: {
		input: string;
	}) => string) | string;
	/**
	 * Flag for disabling the picker.
	 * @defaultvalue false
	 */
	disabled?: boolean;
	/**
	 * Restrict the amount of selectable items.
	 * @defaultvalue undefined
	 */
	itemLimit?: number;
	/**
	 * Function that specifies how arbitrary text entered into the well is handled.
	 */
	createGenericItem?: (input: string, ValidationState: ValidationState) => ISuggestionModel<T> | T;
	/**
	 * Aria label for the "X" button in the selected item component.
	 * @defaultvalue ''
	 */
	removeButtonAriaLabel?: string;
	/**
	 * A callback to process a selection after the user selects something from the picker. If the callback returns null,
	 * the item will not be added to the picker.
	 */
	onItemSelected?: (selectedItem?: T) => T | PromiseLike<T> | null;
	/**
	 * The items that the base picker should currently display as selected.
	 * If this is provided then the picker will act as a controlled component.
	 */
	selectedItems?: T[];
	/**
	 * A callback used to modify the input string.
	 */
	onInputChange?: (input: string) => string;
	/**
	 * A callback to override the default behavior of adding the selected suggestion on dismiss.
	 */
	onDismiss?: (ev?: any, selectedItem?: T) => void;
	/**
	 * Adds an additional alert for the currently selected suggestion. This prop should be set to true for IE11 and below, as it
	 * enables proper screen reader behavior for each suggestion (since aria-activedescendant does not work with IE11).
	 * It should not be set for modern browsers (Edge, Chrome).
	 * @defaultvalue false
	 */
	enableSelectedSuggestionAlert?: boolean;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<IBasePickerStyleProps, IBasePickerStyles>;
	/**
	 * Theme provided by styled() function.
	 */
	theme?: ITheme;
}
export interface IBasePickerSuggestionsProps {
	/**
	 * Function that specifies what to render when no results are found.
	 */
	onRenderNoResultFound?: IRenderFunction<void>;
	/**
	 * The text that should appear at the top of the suggestion box.
	 */
	suggestionsHeaderText?: string;
	/**
	 * The text that should appear at the top of the most recently used box.
	 */
	mostRecentlyUsedHeaderText?: string;
	/**
	 * The text that should appear when no results are returned.
	 */
	noResultsFoundText?: string;
	/**
	 * Suggestions root className.
	 */
	className?: string;
	/**
	 * Suggestions List className.
	 */
	suggestionsClassName?: string;
	/**
	 * ClassName for suggestion items.
	 */
	suggestionsItemClassName?: string;
	/**
	 * The text that should appear on the button to search for more.
	 */
	searchForMoreText?: string;
	/**
	 * The text that appears indicating to the use to force resolve the input
	 */
	forceResolveText?: string;
	/**
	 * The text to display while the results are loading.
	 */
	loadingText?: string;
	/**
	 * The text to display while searching for more results in a limited suggestions list.
	 */
	searchingText?: string;
	/**
	 * A renderer that adds an element at the end of the suggestions list if it has more items than resultsMaximumNumber.
	 */
	resultsFooterFull?: () => JSX.Element;
	/**
	 * A renderer that adds an element at the end of the suggestions list when there are fewer than resultsMaximumNumber.
	 */
	resultsFooter?: () => JSX.Element;
	/**
	 * Maximum number of suggestions to show in the full suggestion list.
	 */
	resultsMaximumNumber?: number;
	/**
	 * Indicates whether to show a button with each suggestion to remove that suggestion.
	 */
	showRemoveButtons?: boolean;
	/**
	 * Screen reader message to read when there are suggestions available.
	 */
	suggestionsAvailableAlertText?: string;
	/**
	 * An ARIA label for the container that is the parent of the suggestions.
	 */
	suggestionsContainerAriaLabel?: string;
}
/** Validation state of the user's input. */
export declare enum ValidationState {
	/** User input is valid. */
	valid = 0,
	/** User input could be valid or invalid, its state is not known yet. */
	warning = 1,
	/** User input is invalid. */
	invalid = 2
}
/** Pickers' input props interface */
export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	/**
	 * Screen reader label to apply to an input element.
	 */
	'aria-label'?: string;
	/**
	 * The default value to be visible when the autofill first created.
	 * This is different than placeholder text because the placeholder text will disappear and re-appear. This
	 * text persists until deleted or changed.
	 */
	defaultVisibleValue?: string;
}
/** The props needed to construct styles. */
export declare type IBasePickerStyleProps = Pick<IBasePickerProps<any>, 'theme' | 'className'> & {
	/** Whether text style area is focused */
	isFocused?: boolean;
	/** Optional pickerInput className */
	inputClassName?: string;
};
/** Represents the stylable areas of the control. */
export interface IBasePickerStyles {
	/** Root element of any picker extending from BasePicker (wraps all the elements). */
	root: IStyle;
	/** Refers to the elements already selected(picked) wrapped by `itemsWrapper` along with the input to type new selection. */
	text: IStyle;
	/** Refers to the items already selected(picked). */
	itemsWrapper: IStyle;
	/** Refers to the input were to type new selections(picks). */
	input: IStyle;
	/** Refers to helper element used for accessibility tools (hidden from view on screen). */
	screenReaderText: IStyle;
}
export interface IBasePickerState {
	items?: any;
	suggestedDisplayValue?: string;
	moreSuggestionsAvailable?: boolean;
	isFocused?: boolean;
	isSearching?: boolean;
	isMostRecentlyUsedVisible?: boolean;
	suggestionsVisible?: boolean;
	suggestionsLoading?: boolean;
	isResultsFooterVisible?: boolean;
	selectedIndices?: number[];
}
/**
 * Aria id's for internal picker components
 */
export declare type IPickerAriaIds = {
	/**
	 * Aria id for selected suggestion alert component
	 */
	selectedSuggestionAlert: string;
	/**
	 * Aria id for selected items container component
	 */
	selectedItems: string;
	/**
	 * Aria id for suggestions list component
	 */
	suggestionList: string;
};
export declare class BasePicker<T, P extends IBasePickerProps<T>> extends BaseComponent<P, IBasePickerState> implements IBasePicker<T> {
	protected root: React.RefObject<HTMLDivElement>;
	protected input: React.RefObject<IAutofill>;
	protected focusZone: React.RefObject<IFocusZone>;
	protected suggestionElement: React.RefObject<ISuggestions<T>>;
	protected selection: Selection;
	protected suggestionStore: SuggestionsController<T>;
	protected SuggestionOfProperType: new (props: ISuggestionsProps<T>) => Suggestions<T>;
	protected currentPromise: PromiseLike<any> | undefined;
	protected _ariaMap: IPickerAriaIds;
	private _id;
	constructor(basePickerProps: P);
	readonly items: T[];
	componentWillUpdate(newProps: P, newState: IBasePickerState): void;
	componentDidMount(): void;
	componentWillReceiveProps(newProps: P): void;
	componentWillUnmount(): void;
	focus(): void;
	focusInput(): void;
	dismissSuggestions: (ev?: any) => void;
	completeSuggestion(): void;
	refocusSuggestions: (keyCode: number) => void;
	render(): JSX.Element;
	protected canAddItems(): boolean;
	protected renderSuggestions(): JSX.Element | null;
	protected renderItems(): JSX.Element[];
	protected resetFocus(index?: number): void;
	protected onSuggestionSelect(): void;
	protected onSelectionChange(): void;
	protected updateSuggestions(suggestions: any[]): void;
	protected onEmptyInputFocus(): void;
	protected updateValue(updatedValue: string): void;
	protected updateSuggestionsList(suggestions: T[] | PromiseLike<T[]>, updatedValue?: string): void;
	protected resolveNewValue(updatedValue: string, suggestions: T[]): void;
	protected onChange(items?: T[]): void;
	protected onInputChange: (value: string) => void;
	protected onSuggestionClick: (ev: React.MouseEvent<HTMLElement, MouseEvent>, item: any, index: number) => void;
	protected onSuggestionRemove: (ev: React.MouseEvent<HTMLElement, MouseEvent>, item: IPersonaProps, index: number) => void;
	protected onInputFocus: (ev: React.FocusEvent<HTMLInputElement | Autofill>) => void;
	protected onInputBlur: (ev: React.FocusEvent<HTMLInputElement | Autofill>) => void;
	protected onKeyDown: (ev: React.KeyboardEvent<HTMLElement>) => void;
	protected onItemChange: (changedItem: T, index: number) => void;
	protected onGetMoreResults: () => void;
	protected addItemByIndex: (index: number) => void;
	protected addItem: (item: T) => void;
	protected removeItem: (item: IPickerItemProps<T>, focusNextItem?: boolean) => void;
	protected removeItems: (itemsToRemove: any[]) => void;
	protected onBackspace(ev: React.KeyboardEvent<HTMLElement>): void;
	protected _isFocusZoneInnerKeystroke: (ev: React.KeyboardEvent<HTMLElement>) => boolean;
	protected getActiveDescendant(): string;
	protected getSuggestionsAlert(suggestionAlertClassName?: string): JSX.Element;
	/**
	 * Takes in the current updated value and either resolves it with the new suggestions
	 * or if updated value is undefined then it clears out currently suggested items
	 */
	private _updateAndResolveValue;
	/**
	 * Controls what happens whenever there is an action that impacts the selected items.
	 * If selectedItems is provided as a property then this will act as a controlled component and it will not update it's own state.
	 */
	private _updateSelectedItems;
	private _onSelectedItemsUpdated;
	private _onResolveSuggestions;
	private _onValidateInput;
	private _getTextFromItem;
}
export declare class BasePickerListBelow<T, P extends IBasePickerProps<T>> extends BasePicker<T, P> {
	render(): JSX.Element;
	protected onBackspace(ev: React.KeyboardEvent<HTMLElement>): void;
}
/** Common props in between IPeoplePickerItemSelectedProps, IPeoplePickerItemWithMenuProps and IPeoplePickerItemSuggestionProps. */
export interface IPeoplePickerItemSharedProps {
	/** Additional CSS class(es) to apply to the PeoplePickerItem root element. */
	className?: string;
	/** Theme provided by High-Order Component. */
	theme?: ITheme;
}
/** PeoplePickerItemSelected props interface. Refers to the PeoplePicker items that have been picked already. */
export interface IPeoplePickerItemSelectedProps extends IPickerItemProps<IPersonaProps & {
	ValidationState: ValidationState;
}>, IPeoplePickerItemSharedProps {
	/** Call to provide customized styling that will layer on top of the variant rules. */
	styles?: IStyleFunctionOrObject<IPeoplePickerItemSelectedStyleProps, IPeoplePickerItemSelectedStyles>;
}
/** Props needed to construct PeoplePickerItemSelected styles. */
export declare type IPeoplePickerItemSelectedStyleProps = Required<Pick<IPeoplePickerItemSelectedProps, 'theme'>> & Pick<IPeoplePickerItemSelectedProps, 'className' | 'selected'> & {
	/** Whether it's invalid. */
	invalid?: boolean;
};
/** Represents the stylable areas of the PeoplePickerItemSelected. */
export interface IPeoplePickerItemSelectedStyles {
	/** Root element of picked PeoplePicker item */
	root: IStyle;
	/** Refers to the element holding the content (Persona) of the PeoplePicker item already picked. */
	itemContent: IStyle;
	/** Refers to the remove action button on a picked PeoplePicker item. */
	removeButton: IStyle;
	/** SubComponent (Persona, PersonaCoin) styles. */
	subComponentStyles: IPeoplePickerItemSelectedSubComponentStyles;
}
/** Styles interface of the SubComponents rendered within PeoplePickerItemSelected. */
export interface IPeoplePickerItemSelectedSubComponentStyles {
	/** Refers to the Persona rendered within the PeoplePickerItemSelected */
	persona: IStyleFunctionOrObject<IPersonaStyleProps, any>;
	/** Refers to the PersonaCoin in the Persona rendered within the PeoplePickerItemSelected */
	personaCoin: IStyleFunctionOrObject<IPersonaCoinStyleProps, any>;
}
/** PeoplePickerItemSuggestion props interface. Refers to the PeoplePicker items that are suggested for picking. */
export interface IPeoplePickerItemSuggestionProps extends IPeoplePickerItemSharedProps {
	/** Persona props for each suggested for picking PeoplePicker item. */
	personaProps?: IPersonaProps;
	/** Call to provide customized styling that will layer on top of the variant rules. */
	styles?: IStyleFunctionOrObject<IPeoplePickerItemSuggestionStyleProps, IPeoplePickerItemSuggestionStyles>;
	/** General common props for all PeoplePicker items suggestions. */
	suggestionsProps?: IBasePickerSuggestionsProps;
	/**
	 * Flag that controls whether each suggested PeoplePicker item (Persona) is rendered with or without secondary text for compact look.
	 * @defaultvalue false
	 */
	compact?: boolean;
}
/** Props needed to construct PeoplePickerItemSuggestion styles. */
export declare type IPeoplePickerItemSuggestionStyleProps = Required<Pick<IPeoplePickerItemSuggestionProps, 'theme'>> & Pick<IPeoplePickerItemSuggestionProps, 'className'> & {};
/** Represents the stylable areas of the PeoplePickerItemSuggestion. */
export interface IPeoplePickerItemSuggestionStyles {
	/** Root container element of a suggested PeoplePicker item. */
	root: IStyle;
	/** Refers to the element wrapping the Persona of the suggested PeoplePicker item. */
	personaWrapper: IStyle;
}
/**
 * PeoplePickerItemWithMenu props interface.
 * @deprecated Do not use. Will be removed in Fabric 7.0
 */
export interface IPeoplePickerItemWithMenuProps extends IPickerItemProps<IPersonaWithMenu> {
}
/**
 * Extended interface from IPersonaProps to add `menuItems` property PeoplePickerItemWithMenu items.
 * @deprecated Do not use. Will be removed in Fabric 7.0
 */
export interface IPersonaWithMenu extends IPersonaProps {
	/** Additional menuItems to be rendered in a contextualMenu for each Persona. */
	menuItems?: IContextualMenuItem[];
}
/** PeoplePicker props interface which renders Personas as items. */
export interface IPeoplePickerProps extends IBasePickerProps<IPersonaProps> {
}
export declare class BasePeoplePicker extends BasePicker<IPersonaProps, IPeoplePickerProps> {
}
export declare class MemberListPeoplePicker extends BasePickerListBelow<IPersonaProps, IPeoplePickerProps> {
}
/**
 * Standard People Picker.
 */
export declare class NormalPeoplePickerBase extends BasePeoplePicker {
	/** Default props for NormalPeoplePicker. */
	static defaultProps: {
		onRenderItem: (props: IPeoplePickerItemSelectedProps) => JSX.Element;
		onRenderSuggestionsItem: (personaProps: IPersonaProps, suggestionsProps?: IBasePickerSuggestionsProps) => JSX.Element;
		createGenericItem: typeof createGenericItem;
	};
}
/**
 * Compact layout. It uses personas without secondary text when displaying search results.
 */
export declare class CompactPeoplePickerBase extends BasePeoplePicker {
	/** Default props for CompactPeoplePicker. */
	static defaultProps: {
		onRenderItem: (props: IPeoplePickerItemSelectedProps) => JSX.Element;
		onRenderSuggestionsItem: (personaProps: IPersonaProps, suggestionsProps?: IBasePickerSuggestionsProps) => JSX.Element;
		createGenericItem: typeof createGenericItem;
	};
}
/**
 * MemberList layout. The selected people show up below the search box.
 */
export declare class ListPeoplePickerBase extends MemberListPeoplePicker {
	/** Default props for ListPeoplePicker. */
	static defaultProps: {
		onRenderItem: (props: IPeoplePickerItemSelectedProps) => JSX.Element;
		onRenderSuggestionsItem: (personaProps: IPersonaProps, suggestionsProps?: IBasePickerSuggestionsProps) => JSX.Element;
		createGenericItem: typeof createGenericItem;
	};
}
export interface IGenericItem {
	primaryText: string;
	imageInitials: string;
	ValidationState: ValidationState;
}
export declare function createGenericItem(name: string, currentValidationState: ValidationState): IGenericItem & {
	key: React.Key;
};
export declare const NormalPeoplePicker: (props: IPeoplePickerProps) => JSX.Element;
export declare const CompactPeoplePicker: (props: IPeoplePickerProps) => JSX.Element;
export declare const ListPeoplePicker: (props: IPeoplePickerProps) => JSX.Element;
export declare const PeoplePickerItemBase: (props: IPeoplePickerItemSelectedProps) => JSX.Element;
export declare const PeoplePickerItem: (props: IPeoplePickerItemSelectedProps) => JSX.Element;
export declare const PeoplePickerItemSuggestionBase: (props: IPeoplePickerItemSuggestionProps) => JSX.Element;
export declare const PeoplePickerItemSuggestion: (props: IPeoplePickerItemSuggestionProps) => JSX.Element;
/** TagPickerItem item interface. */
export interface ITag {
	/** Name of the item. */
	name: string;
	/** Unique key for the item. */
	key: string;
}
/** TagPicker component props */
export interface ITagPickerProps extends IBasePickerProps<ITag> {
}
/** TagItem component props */
export interface ITagItemProps extends IPickerItemProps<ITag> {
	/** Additional CSS class(es) to apply to the TagItem root element. */
	className?: string;
	/**
	 * Enable or not focus on TagItem when TagPicker is disabled.
	 * @defaultvalue false
	 */
	enableTagFocusInDisabledPicker?: boolean;
	/** Call to provide customized styling that will layer on top of the variant rules. */
	styles?: IStyleFunctionOrObject<ITagItemStyleProps, ITagItemStyles>;
	/** Theme provided by High-Order Component. */
	theme?: ITheme;
}
/** The props needed to construct TagItem styles. */
export declare type ITagItemStyleProps = Required<Pick<ITagItemProps, 'theme'>> & Pick<ITagItemProps, 'className' | 'selected'> & {};
/** Represents the stylable areas of the TagItem. */
export interface ITagItemStyles {
	/** Root element of picked TagItem */
	root: IStyle;
	/** Refers to the text element of the TagItem already picked. */
	text: IStyle;
	/** Refers to the cancel action button on a picked TagItem. */
	close: IStyle;
}
/** TagItemSuggestion component props */
export interface ITagItemSuggestionProps extends React.AllHTMLAttributes<HTMLElement> {
	/** Additional CSS class(es) to apply to the TagItemSuggestion div element */
	className?: string;
	/** Call to provide customized styling that will layer on top of the variant rules. */
	styles?: IStyleFunctionOrObject<ITagItemSuggestionStyleProps, ITagItemSuggestionStyles>;
	/** Theme provided by High-Order Component. */
	theme?: ITheme;
}
/** The props needed to construct TagItemSuggestion styles. */
export declare type ITagItemSuggestionStyleProps = Required<Pick<ITagItemSuggestionProps, 'theme'>> & Pick<ITagItemSuggestionProps, 'className'> & {};
/** Represents the stylable areas of the TagItemSuggestion */
export interface ITagItemSuggestionStyles {
	/** Refers to the text element of the TagItemSuggestion */
	suggestionTextOverflow?: IStyle;
}
export declare class TagPickerBase extends BasePicker<ITag, ITagPickerProps> {
	static defaultProps: {
		onRenderItem: (props: ITagItemProps) => JSX.Element;
		onRenderSuggestionsItem: (props: ITag) => JSX.Element;
	};
}
export declare const TagPicker: (props: ITagPickerProps) => JSX.Element;
export declare const TagItemBase: (props: ITagItemProps) => JSX.Element;
export declare const TagItem: (props: ITagItemProps) => JSX.Element;
export declare const TagItemSuggestionBase: (props: ITagItemSuggestionProps) => JSX.Element;
export declare const TagItemSuggestion: (props: ITagItemSuggestionProps) => JSX.Element;
export interface ISuggestionsCoreProps<T> extends React.ClassAttributes<any> {
	/**
	 * Gets the component ref.
	 */
	componentRef?: IRefObject<{}>;
	/**
	 * How the suggestion should look in the suggestion list.
	 */
	onRenderSuggestion?: (props: T, suggestionItemProps: T) => JSX.Element;
	/**
	 * What should occur when a suggestion is clicked
	 */
	onSuggestionClick: (ev?: React.MouseEvent<HTMLElement>, item?: any, index?: number) => void;
	/**
	 * The list of Suggestions that will be displayed
	 */
	suggestions: ISuggestionModel<T>[];
	/**
	 * Function to fire when one of the optional remove buttons on a suggestion is clicked.
	 */
	onSuggestionRemove?: (ev?: React.MouseEvent<HTMLElement>, item?: IPersonaProps, index?: number) => void;
	/**
	 * Screen reader message to read when there are suggestions available.
	 */
	suggestionsAvailableAlertText?: string;
	/**
	 * An ARIA label for the container that is the parent of the suggestions.
	 */
	suggestionsContainerAriaLabel?: string;
	/**
	 * the classname of the suggestionitem.
	 */
	suggestionsItemClassName?: string;
	/**
	 * Maximum number of suggestions to show in the full suggestion list.
	 */
	resultsMaximumNumber?: number;
	/**
	 * Indicates whether to show a button with each suggestion to remove that suggestion.
	 */
	showRemoveButtons?: boolean;
	/**
	 * Indicates whether to loop around to the top or bottom of the the suggestions
	 * on calling nextSuggestion and previousSuggestion, respectively
	 */
	shouldLoopSelection: boolean;
}
export interface ISuggestionsControlProps<T> extends React.ClassAttributes<any>, ISuggestionsCoreProps<T> {
	/**
	 * An ARIA label for the container that is the parent of the suggestions header items.
	 */
	suggestionsHeaderContainerAriaLabel?: string;
	/**
	 * An ARIA label for the container that is the parent of the suggestions footer items.
	 */
	suggestionsFooterContainerAriaLabel?: string;
	/**
	 * The header items props
	 */
	headerItemsProps?: ISuggestionsHeaderFooterProps[];
	/**
	 * The footer items props
	 */
	footerItemsProps?: ISuggestionsHeaderFooterProps[];
	/**
	 * Whether or not the first selectable item in the suggestions list should be selected
	 */
	shouldSelectFirstItem?: () => boolean;
	/**
	 * The CSS classname of the suggestions list.
	 */
	className?: string;
	/**
	 * Completes the suggestion
	 */
	completeSuggestion: () => void;
}
export interface ISuggestionsHeaderFooterProps {
	renderItem: () => JSX.Element;
	onExecute?: () => void;
	className?: string;
	ariaLabel?: string;
	shouldShow: () => boolean;
}
export interface ISuggestionsHeaderFooterItemProps {
	componentRef?: IRefObject<{}>;
	renderItem: () => JSX.Element;
	onExecute?: () => void;
	isSelected: boolean;
	id: string;
	className: string | undefined;
}
export declare class SuggestionsStore<T> {
	suggestions: ISuggestionModel<T>[];
	constructor();
	updateSuggestions(newSuggestions: T[]): void;
	getSuggestions(): ISuggestionModel<T>[];
	getSuggestionAtIndex(index: number): ISuggestionModel<T>;
	removeSuggestion(index: number): void;
	convertSuggestionsToSuggestionItems(suggestions: Array<ISuggestionModel<T> | T>): ISuggestionModel<T>[];
	private _isSuggestionModel;
	private _ensureSuggestionModel;
}
export interface IBaseFloatingPicker {
	/** Whether the suggestions are shown */
	isSuggestionsShown: boolean;
	/** On queryString changed */
	onQueryStringChanged: (input: string) => void;
	/** Hides the picker */
	hidePicker: () => void;
	/** Shows the picker
	 * @param updateValue - Optional param to indicate whether to update the query string
	 */
	showPicker: (updateValue?: boolean) => void;
	/** Gets the suggestions */
	suggestions: any[];
	/** Gets the input text */
	inputText: string;
}
export interface IBaseFloatingPickerProps<T> extends React.ClassAttributes<any> {
	componentRef?: IRefObject<IBaseFloatingPicker>;
	/**
	 * The suggestions store
	 */
	suggestionsStore: SuggestionsStore<T>;
	/**
	 * The suggestions to show on zero query, return null if using as a controlled component
	 */
	onZeroQuerySuggestion?: (selectedItems?: T[]) => T[] | PromiseLike<T[]> | null;
	/**
	 * The input element to listen on events
	 */
	inputElement?: HTMLInputElement | null;
	/**
	 * Function that specifies how an individual suggestion item will appear.
	 */
	onRenderSuggestionsItem?: (props: T, itemProps: any) => JSX.Element;
	/**
	 * A callback for what should happen when a person types text into the input.
	 * Returns the already selected items so the resolver can filter them out.
	 * If used in conjunction with resolveDelay this will ony kick off after the delay throttle.
	 * Return null if using as a controlled component
	 */
	onResolveSuggestions: (filter: string, selectedItems?: T[]) => T[] | PromiseLike<T[]> | null;
	/**
	 * A callback for when the input has been changed
	 */
	onInputChanged?: (filter: string) => void;
	/**
	 * The delay time in ms before resolving suggestions, which is kicked off when input has been changed.
	 * e.g. If a second input change happens within the resolveDelay time, the timer will start over.
	 * Only until after the timer completes will onResolveSuggestions be called.
	 */
	resolveDelay?: number;
	/**
	 * A callback for when a suggestion is clicked
	 */
	onChange?: (item: T) => void;
	/**
	 * ClassName for the picker.
	 */
	className?: string;
	/**
	 * The properties that will get passed to the Suggestions component.
	 */
	pickerSuggestionsProps?: IBaseFloatingPickerSuggestionProps;
	/**
	 * A callback for when a persona is removed from the suggestion list
	 */
	onRemoveSuggestion?: (item: IPersonaProps) => void;
	/**
	 * A function used to validate if raw text entered into the well can be added
	 */
	onValidateInput?: (input: string) => boolean;
	/**
	 * The text to display while searching for more results in a limited suggestions list
	 */
	searchingText?: ((props: {
		input: string;
	}) => string) | string;
	/**
	 * Function that specifies how arbitrary text entered into the well is handled.
	 */
	createGenericItem?: (input: string, isValid: boolean) => ISuggestionModel<T>;
	/**
	 * The callback that should be called to see if the force resolve command should be shown
	 */
	showForceResolve?: () => boolean;
	/**
	 * The items that the base picker should currently display as selected. If this is provided then the picker will act as a controlled
	 * component.
	 */
	selectedItems?: T[];
	/**
	 * A callback to get text from an item. Used to autofill text in the pickers.
	 */
	getTextFromItem?: (item: T, currentValue?: string) => string;
	/**
	 * Width for the suggestions callout
	 */
	calloutWidth?: number;
	/**
	 * The callback that should be called when the suggestions are shown
	 */
	onSuggestionsShown?: () => void;
	/**
	 * The callback that should be called when the suggestions are hiden
	 */
	onSuggestionsHidden?: () => void;
	/**
	 * If using as a controlled component, the items to show in the suggestion list
	 */
	suggestionItems?: T[];
}
export interface IBaseFloatingPickerSuggestionProps {
	/**
	 * Whether or not the first selectable item in the suggestions list should be selected
	 */
	shouldSelectFirstItem?: () => boolean;
	/**
	 * The header items props
	 */
	headerItemsProps?: ISuggestionsHeaderFooterProps[];
	/**
	 * The footer items props
	 */
	footerItemsProps?: ISuggestionsHeaderFooterProps[];
}
/**
 * Class when used with SuggestionsStore, renders a basic suggestions control
 */
export declare class SuggestionsCore<T> extends BaseComponent<ISuggestionsCoreProps<T>, {}> {
	currentIndex: number;
	currentSuggestion: ISuggestionModel<T> | undefined;
	protected _selectedElement: HTMLDivElement;
	private SuggestionsItemOfProperType;
	constructor(suggestionsProps: ISuggestionsCoreProps<T>);
	/**
	 * Increments the selected suggestion index
	 */
	nextSuggestion(): boolean;
	/**
	 * Decrements the selected suggestion index
	 */
	previousSuggestion(): boolean;
	readonly selectedElement: HTMLDivElement | undefined;
	getCurrentItem(): ISuggestionModel<T>;
	getSuggestionAtIndex(index: number): ISuggestionModel<T>;
	hasSuggestionSelected(): boolean;
	removeSuggestion(index: number): void;
	deselectAllSuggestions(): void;
	setSelectedSuggestion(index: number): void;
	componentDidUpdate(): void;
	render(): JSX.Element;
	scrollSelected(): void;
	private _onClickTypedSuggestionsItem;
	private _onRemoveTypedSuggestionsItem;
}
export declare enum SuggestionItemType {
	header = 0,
	suggestion = 1,
	footer = 2
}
export interface ISuggestionsControlState<T> {
	selectedHeaderIndex: number;
	selectedFooterIndex: number;
	suggestions: ISuggestionModel<T>[];
}
export declare class SuggestionsHeaderFooterItem extends BaseComponent<ISuggestionsHeaderFooterItemProps, {}> {
	render(): JSX.Element;
}
/**
 * Class when used with SuggestionsStore, renders a suggestions control with customizable headers and footers
 */
export declare class SuggestionsControl<T> extends BaseComponent<ISuggestionsControlProps<T>, ISuggestionsControlState<T>> {
	protected _forceResolveButton: IButton;
	protected _searchForMoreButton: IButton;
	protected _selectedElement: HTMLDivElement;
	protected _suggestions: SuggestionsCore<T>;
	private SuggestionsOfProperType;
	constructor(suggestionsProps: ISuggestionsControlProps<T>);
	componentDidMount(): void;
	componentDidUpdate(): void;
	componentWillReceiveProps(newProps: ISuggestionsControlProps<T>): void;
	componentWillUnmount(): void;
	render(): JSX.Element;
	readonly currentSuggestion: ISuggestionModel<T>;
	readonly currentSuggestionIndex: number;
	readonly selectedElement: HTMLDivElement | undefined;
	hasSuggestionSelected(): boolean;
	hasSelection(): boolean;
	executeSelectedAction(): void;
	removeSuggestion(index?: number): void;
	/**
	 * Handles the key down, returns true, if the event was handled, false otherwise
	 * @param keyCode - The keyCode to handle
	 */
	handleKeyDown(keyCode: number): boolean;
	scrollSelected(): void;
	protected renderHeaderItems(): JSX.Element | null;
	protected renderFooterItems(): JSX.Element | null;
	protected _renderSuggestions(): JSX.Element;
	/**
	 * Selects the next selectable item
	 */
	protected selectNextItem(itemType: SuggestionItemType, originalItemType?: SuggestionItemType): void;
	/**
	 * Selects the previous selectable item
	 */
	protected selectPreviousItem(itemType: SuggestionItemType, originalItemType?: SuggestionItemType): void;
	/**
	 * Resets the selected state and selects the first selectable item
	 */
	protected resetSelectedItem(): void;
	/**
	 * Selects the first item
	 */
	protected selectFirstItem(): void;
	/**
	 * Selects the last item
	 */
	protected selectLastItem(): void;
	/**
	 * Selects the next item in the suggestion item type group, given the current index
	 * If none is able to be selected, returns false, otherwise returns true
	 * @param itemType - The suggestion item type
	 * @param currentIndex - The current index, default is -1
	 */
	private _selectNextItemOfItemType;
	/**
	 * Selects the previous item in the suggestion item type group, given the current index
	 * If none is able to be selected, returns false, otherwise returns true
	 * @param itemType - The suggestion item type
	 * @param currentIndex - The current index. If none is provided, the default is the items length of specified type
	 */
	private _selectPreviousItemOfItemType;
	private _getCurrentIndexForType;
	private _getNextItemSectionType;
	private _getPreviousItemSectionType;
}
export interface IBaseFloatingPickerState {
	queryString: string;
	suggestionsVisible?: boolean;
	didBind: boolean;
}
export declare class BaseFloatingPicker<T, P extends IBaseFloatingPickerProps<T>> extends BaseComponent<P, IBaseFloatingPickerState> implements IBaseFloatingPicker {
	protected selection: Selection;
	protected root: React.RefObject<HTMLDivElement>;
	protected suggestionStore: SuggestionsStore<T>;
	protected suggestionsControl: SuggestionsControl<T>;
	protected SuggestionsControlOfProperType: new (props: ISuggestionsControlProps<T>) => SuggestionsControl<T>;
	protected currentPromise: PromiseLike<any>;
	constructor(basePickerProps: P);
	readonly inputText: string;
	readonly suggestions: any[];
	forceResolveSuggestion(): void;
	readonly currentSelectedSuggestionIndex: number;
	readonly isSuggestionsShown: boolean;
	onQueryStringChanged: (queryString: string) => void;
	hidePicker: () => void;
	showPicker: (updateValue?: boolean) => void;
	componentDidMount(): void;
	componentDidUpdate(): void;
	componentWillUnmount(): void;
	componentWillReceiveProps(newProps: P): void;
	completeSuggestion: () => void;
	updateSuggestions(suggestions: T[], forceUpdate?: boolean): void;
	render(): JSX.Element;
	protected renderSuggestions(): JSX.Element | null;
	protected onSelectionChange(): void;
	protected updateValue(updatedValue: string): void;
	protected updateSuggestionWithZeroState(): void;
	protected updateSuggestionsList(suggestions: T[] | PromiseLike<T[]>): void;
	protected onChange(item: T): void;
	protected onSuggestionClick: (ev: React.MouseEvent<HTMLElement, MouseEvent>, item: T, index: number) => void;
	protected onSuggestionRemove: (ev: React.MouseEvent<HTMLElement, MouseEvent>, item: T, index: number) => void;
	protected onKeyDown: (ev: MouseEvent) => void;
	private _updateActiveDescendant;
	private _onResolveSuggestions;
	private _onValidateInput;
	private _updateSuggestionsVisible;
	private _bindToInputElement;
	private _unbindFromInputElement;
}
export interface IPeopleFloatingPickerProps extends IBaseFloatingPickerProps<IPersonaProps> {
}
export declare class BaseFloatingPeoplePicker extends BaseFloatingPicker<IPersonaProps, IPeopleFloatingPickerProps> {
}
export declare class FloatingPeoplePicker extends BaseFloatingPeoplePicker {
	static defaultProps: any;
}
export declare function createItem(name: string, isValid: boolean): ISuggestionModel<IPersonaProps>;
export interface IBaseSelectedItemsList<T> {
	/** Gets the current value of the input. */
	items: T[] | undefined;
	addItems: (items: T[]) => void;
}
export interface ISelectedItemProps<T> extends IPickerItemProps<T> {
	onCopyItem: (item: T) => void;
}
export interface IBaseSelectedItemsListProps<T> extends React.ClassAttributes<any> {
	componentRef?: IRefObject<IBaseSelectedItemsList<T>>;
	/**
	 * The selection
	 */
	selection?: Selection;
	/**
	 * A callback for when items are copied
	 */
	onCopyItems?: (items: T[]) => string;
	/**
	 * Function that specifies how the selected item will appear.
	 */
	onRenderItem?: (props: ISelectedItemProps<T>) => JSX.Element;
	/**
	 * Initial items that have already been selected and should appear in the people picker.
	 */
	defaultSelectedItems?: T[];
	/**
	 * A callback for when the selected list of items changes.
	 */
	onChange?: (items?: T[]) => void;
	/**
	 * Function that specifies how arbitrary text entered into the well is handled.
	 */
	createGenericItem?: (input: string, ValidationState: ValidationState) => ISuggestionModel<T>;
	/**
	 * A callback to process a selection after the user selects something from the picker.
	 */
	onItemSelected?: (selectedItem?: T) => T | PromiseLike<T>;
	/**
	 * The items that the base picker should currently display as selected. If this is provided then the picker will act as a
	 * controlled component.
	 */
	selectedItems?: T[];
	/**
	 * Aria label for the 'X' button in the selected item component.
	 * @defaultvalue ''
	 */
	removeButtonAriaLabel?: string;
	/**
	 * A callback when an item is deleted
	 * @deprecated Use `onItemsDeleted` instead.
	 */
	onItemDeleted?: (deletedItem: T) => void;
	/**
	 * A callback when and item or items are deleted
	 */
	onItemsDeleted?: (deletedItems: T[]) => void;
	/**
	 * A callback on whether this item can be deleted
	 */
	canRemoveItem?: (item: T) => boolean;
}
export interface IBaseSelectedItemsListState {
	items?: any;
}
export declare class BaseSelectedItemsList<T, P extends IBaseSelectedItemsListProps<T>> extends BaseComponent<P, IBaseSelectedItemsListState> implements IBaseSelectedItemsList<T> {
	protected root: HTMLElement;
	protected selection: Selection;
	constructor(basePickerProps: P);
	readonly items: T[];
	addItems: (items: T[]) => void;
	removeItemAt: (index: number) => void;
	removeItem: (item: ISelectedItemProps<T>) => void;
	removeItems: (itemsToRemove: any[]) => void;
	removeSelectedItems(): void;
	/**
	 * Controls what happens whenever there is an action that impacts the selected items.
	 * If selectedItems is provided as a property then this will act as a controlled component and it will not update it's own state.
	 */
	updateItems(items: T[], focusIndex?: number): void;
	onCopy: (ev: React.ClipboardEvent<HTMLElement>) => void;
	hasSelectedItems(): boolean;
	unselectAll(): void;
	highlightedItems(): T[];
	componentWillUpdate(newProps: P, newState: IBaseSelectedItemsListState): void;
	componentDidMount(): void;
	componentWillReceiveProps(newProps: P): void;
	render(): any;
	protected renderItems: () => JSX.Element[];
	protected onSelectionChanged: () => void;
	protected onChange(items?: T[]): void;
	protected onItemChange: (changedItem: T, index: number) => void;
	protected copyItems(items: T[]): void;
	private _onSelectedItemsUpdated;
	private _canRemoveItem;
}
export interface IExtendedPersonaProps extends IPersonaProps {
	isValid: boolean;
	blockRecipientRemoval?: boolean;
	shouldBlockSelection?: boolean;
	canExpand?: boolean;
	isEditing?: boolean;
}
export interface ISelectedPeopleItemProps extends ISelectedItemProps<IExtendedPersonaProps> {
	onExpandItem?: () => void;
	renderPersonaCoin?: IRenderFunction<IPersonaProps>;
	renderPrimaryText?: IRenderFunction<IPersonaProps>;
}
export interface ISelectedPeopleProps extends IBaseSelectedItemsListProps<IExtendedPersonaProps> {
	onExpandGroup?: (item: IExtendedPersonaProps) => void;
	removeMenuItemText?: string;
	copyMenuItemText?: string;
	editMenuItemText?: string;
	getEditingItemText?: (item: IExtendedPersonaProps) => string;
	onRenderFloatingPicker?: (props: IBaseFloatingPickerProps<IPersonaProps>) => JSX.Element;
	floatingPickerProps?: IBaseFloatingPickerProps<IPersonaProps>;
}
export declare class BasePeopleSelectedItemsList extends BaseSelectedItemsList<IExtendedPersonaProps, ISelectedPeopleProps> {
}
/**
 * Standard People Picker.
 */
export declare class SelectedPeopleList extends BasePeopleSelectedItemsList {
	static defaultProps: any;
	replaceItem: (itemToReplace: IExtendedPersonaProps, itemsToReplaceWith: IExtendedPersonaProps[]) => void;
	protected renderItems: () => JSX.Element[];
	private _renderItem;
	private _beginEditing;
	private _completeEditing;
	private _createMenuItems;
}
export interface IPeoplePickerItemState {
	contextualMenuVisible: boolean;
}
export declare class ExtendedSelectedItem extends BaseComponent<ISelectedPeopleItemProps, IPeoplePickerItemState> {
	protected persona: React.RefObject<HTMLDivElement>;
	constructor(props: ISelectedPeopleItemProps);
	render(): JSX.Element;
	private _onClickIconButton;
}
export interface IBaseExtendedPicker<T> {
	/** Forces the picker to resolve */
	forceResolve?: () => void;
	/** Gets the current value of the input. */
	items: T[] | undefined;
	/** Sets focus to the input. */
	focus: () => void;
}
export interface IBaseExtendedPickerProps<T> {
	/**
	 * Ref of the component
	 */
	componentRef?: IRefObject<IBaseExtendedPicker<T>>;
	/**
	 * Header/title element for the picker
	 */
	headerComponent?: JSX.Element;
	/**
	 * Initial items that have already been selected and should appear in the people picker.
	 */
	defaultSelectedItems?: T[];
	/**
	 * A callback for when the selected list of items changes.
	 */
	onChange?: (items?: T[]) => void;
	/**
	 * A callback for when text is pasted into the input
	 */
	onPaste?: (pastedText: string) => T[];
	/**
	 * A callback for when the user put focus on the picker
	 */
	onFocus?: React.FocusEventHandler<HTMLInputElement | Autofill>;
	/**
	 * A callback for when the user moves the focus away from the picker
	 */
	onBlur?: React.FocusEventHandler<HTMLInputElement | Autofill>;
	/**
	 * ClassName for the picker.
	 */
	className?: string;
	/**
	 * Function that specifies how the floating picker will appear.
	 */
	onRenderFloatingPicker: (props: IBaseFloatingPickerProps<T>) => JSX.Element;
	/**
	 * Function that specifies how the floating picker will appear.
	 */
	onRenderSelectedItems: (props: IBaseSelectedItemsListProps<T>) => JSX.Element;
	/**
	 * Floating picker properties
	 */
	floatingPickerProps: IBaseFloatingPickerProps<T>;
	/**
	 * Selected items list properties
	 */
	selectedItemsListProps: IBaseSelectedItemsListProps<T>;
	/**
	 * Autofill input native props
	 * @defaultvalue undefined
	 */
	inputProps?: IInputProps;
	/**
	 * Flag for disabling the picker.
	 * @defaultvalue false
	 */
	disabled?: boolean;
	/**
	 * Restrict the amount of selectable items.
	 * @defaultvalue undefined
	 */
	itemLimit?: number;
	/**
	 * A callback to process a selection after the user selects a suggestion from the picker.
	 * The returned item will be added to the selected items list
	 */
	onItemSelected?: (selectedItem?: T) => T | PromiseLike<T>;
	/**
	 * A callback on when an item was added to the selected item list
	 */
	onItemAdded?: (addedItem: T) => void;
	/**
	 * A callback on when an item or items were removed from the selected item list
	 */
	onItemsRemoved?: (removedItems: T[]) => void;
	/**
	 * If using as a controlled component use selectedItems here instead of the SelectedItemsList
	 */
	selectedItems?: T[];
	/**
	 * If using as a controlled component use suggestionItems here instead of FloatingPicker
	 */
	suggestionItems?: T[];
	/**
	 * Focus zone props
	 */
	focusZoneProps?: IFocusZoneProps;
	/**
	 * Current rendered query string that's corealte to current rendered result
	 **/
	currentRenderedQueryString?: string;
}
export interface IBaseExtendedPickerState<T> {
	queryString: string | null;
	selectedItems: T[] | null;
	suggestionItems: T[] | null;
}
export declare class BaseExtendedPicker<T, P extends IBaseExtendedPickerProps<T>> extends BaseComponent<P, IBaseExtendedPickerState<T>> implements IBaseExtendedPicker<T> {
	floatingPicker: React.RefObject<BaseFloatingPicker<T, IBaseFloatingPickerProps<T>>>;
	selectedItemsList: React.RefObject<BaseSelectedItemsList<T, IBaseSelectedItemsListProps<T>>>;
	protected root: React.RefObject<HTMLDivElement>;
	protected input: React.RefObject<Autofill>;
	protected selection: Selection;
	protected floatingPickerProps: IBaseFloatingPickerProps<T>;
	protected selectedItemsListProps: IBaseSelectedItemsListProps<T>;
	constructor(basePickerProps: P);
	readonly items: any;
	componentDidMount(): void;
	componentWillReceiveProps(newProps: P): void;
	focus(): void;
	clearInput(): void;
	readonly inputElement: HTMLInputElement | null;
	readonly highlightedItems: T[];
	render(): JSX.Element;
	protected onSelectionChange: () => void;
	protected canAddItems(): boolean;
	protected renderSuggestions(): JSX.Element;
	protected renderSelectedItemsList(): JSX.Element;
	protected onInputChange: (value: string) => void;
	protected onInputFocus: (ev: React.FocusEvent<HTMLInputElement | Autofill>) => void;
	protected onInputClick: (ev: React.MouseEvent<HTMLInputElement | Autofill, MouseEvent>) => void;
	protected onBackspace: (ev: React.KeyboardEvent<HTMLElement>) => void;
	protected onCopy: (ev: React.ClipboardEvent<HTMLElement>) => void;
	protected onPaste: (ev: React.ClipboardEvent<HTMLInputElement | Autofill>) => void;
	protected _onSuggestionSelected: (item: T) => void;
	protected _onSelectedItemsChanged: () => void;
	private _addProcessedItem;
}
export interface IPeoplePickerItemProps extends IPickerItemProps<IExtendedPersonaProps> {
}
export interface IExtendedPeoplePickerProps extends IBaseExtendedPickerProps<IPersonaProps> {
}
export declare class BaseExtendedPeoplePicker extends BaseExtendedPicker<IPersonaProps, IExtendedPeoplePickerProps> {
}
export declare class ExtendedPeoplePicker extends BaseExtendedPeoplePicker {
}
export interface IFabricProps extends React.HTMLAttributes<HTMLDivElement> {
	componentRef?: IRefObject<{}>;
	theme?: ITheme;
	styles?: IStyleFunctionOrObject<IFabricStyleProps, IFabricStyles>;
}
export interface IFabricStyleProps extends IFabricProps {
	theme: ITheme;
	isFocusVisible: boolean;
}
export interface IFabricStyles {
	root: IStyle;
}
export declare const Fabric: (props: IFabricProps) => JSX.Element;
export declare class FabricBase extends BaseComponent<IFabricProps, {
	isFocusVisible: boolean;
}> {
	private _rootElement;
	constructor(props: IFabricProps);
	render(): JSX.Element;
	componentDidMount(): void;
	private _onMouseDown;
	private _onKeyDown;
}
/**
 * FacePile with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling)
 */
export declare class FacepileBase extends BaseComponent<IFacepileProps, {}> {
	static defaultProps: IFacepileProps;
	private _ariaDescriptionId;
	private _classNames;
	constructor(props: IFacepileProps);
	render(): JSX.Element;
	protected onRenderAriaDescription(): JSX.Element;
	private _onRenderVisiblePersonas;
	private _getPersonaControl;
	private _getPersonaCoinControl;
	private _getElementWithOnClickEvent;
	private _getElementWithoutOnClickEvent;
	private _getElementProps;
	private _getOverflowElement;
	private _getDescriptiveOverflowElement;
	private _getIconElement;
	private _getAddNewElement;
	private _onPersonaClick;
	private _onPersonaMouseMove;
	private _onPersonaMouseOut;
	private _renderInitials;
	private _renderInitialsNotPictured;
}
export interface IFacepile {
}
export interface IFacepileProps extends React.ClassAttributes<FacepileBase> {
	/**
	 * Optional callback to access the IFacepile interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IFacepile>;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<IFacepileStyleProps, IFacepileStyles>;
	/**
	 * Theme provided by High-Order Component.
	 */
	theme?: ITheme;
	/**
	 * Additional css class to apply to the Facepile
	 * @defaultvalue undefined
	 */
	className?: string;
	/**
	 * Array of IPersonaProps that define each Persona.
	 */
	personas: IFacepilePersona[];
	/**
	 * Personas to place in the overflow
	 */
	overflowPersonas?: IFacepilePersona[];
	/** Maximum number of personas to show */
	maxDisplayablePersonas?: number;
	/** Size to display the personas */
	personaSize?: PersonaSize;
	/** ARIA label for persona list */
	ariaDescription?: string;
	/** Show add person button */
	showAddButton?: boolean;
	/** Button properties for the add face button */
	addButtonProps?: IButtonProps;
	/**
	 * Deprecated at v0.70, use `overflowButtonProps` instead.
	 * @deprecated Use `overflowButtonProps` instead.
	 */
	chevronButtonProps?: IButtonProps;
	/** Properties for the overflow icon */
	overflowButtonProps?: IButtonProps;
	/** Type of overflow icon to use */
	overflowButtonType?: OverflowButtonType;
	/** Method to access properties on the underlying Persona control */
	getPersonaProps?: (persona: IFacepilePersona) => IPersonaSharedProps;
}
export interface IFacepilePersona extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLDivElement> {
	/**
	 * Name of the person.
	 */
	personaName?: string;
	/**
	 * Url to the image to use, should be a square aspect ratio and big enough to fit in the image area.
	 */
	imageUrl?: string;
	/**
	 * The user's initials to display in the image area when there is no image.
	 * @defaultvalue [Derived from personaName]
	 */
	imageInitials?: string;
	/**
	 * Whether initials are calculated for phone numbers and number sequences.
	 * Example: Set property to true to get initials for project names consisting of numbers only.
	 * @defaultvalue false
	 */
	allowPhoneInitials?: boolean;
	/**
	 * The background color when the user's initials are displayed.
	 * @defaultvalue [Derived from personaName]
	 */
	initialsColor?: PersonaInitialsColor;
	/**
	 * If provided, persona will be rendered with cursor:pointer and the handler will be
	 * called on click.
	 */
	onClick?: (ev?: React.MouseEvent<HTMLElement>, persona?: IFacepilePersona) => void;
	/**
	 * If provided, the handler will be called on mouse move.
	 */
	onMouseMove?: (ev?: React.MouseEvent<HTMLElement>, persona?: IFacepilePersona) => void;
	/**
	 * If provided, the handler will be called when mouse moves out of the component.
	 */
	onMouseOut?: (ev?: React.MouseEvent<HTMLElement>, persona?: IFacepilePersona) => void;
	/**
	 * Extra data - not used directly but can be handy for passing additional data to custom event
	 * handlers.
	 */
	data?: any;
	/**
	 * Optional keytip for this button that is only added when 'onClick' is defined for the persona
	 */
	keytipProps?: IKeytipProps;
}
export declare enum OverflowButtonType {
	/** No overflow */
	none = 0,
	/** +1 overflow icon */
	descriptive = 1,
	/** More overflow icon */
	more = 2,
	/** Chevron overflow icon */
	downArrow = 3
}
export interface IFacepileStyleProps {
	/**
	 * Theme provided by High-Order Component.
	 */
	theme: ITheme;
	/**
	 * Accept custom classNames
	 */
	className?: string;
	/**
	 * Pixel value for spacing around button. Number value set in pixels
	 */
	spacingAroundItemButton?: number;
}
export interface IFacepileStyles {
	/**
	 * Style for the root element.
	 */
	root: IStyle;
	addButton: IStyle;
	descriptiveOverflowButton: IStyle;
	itemContainer: IStyle;
	itemButton: IStyle;
	members: IStyle;
	member: IStyle;
	overflowButton: IStyle;
	overflowInitialsIcon: IStyle;
	screenReaderOnly: IStyle;
}
/**
 * The Facepile shows a list of faces or initials in a horizontal lockup. Each circle represents a person.
 */
export declare const Facepile: (props: IFacepileProps) => JSX.Element;
export interface IGrid {
}
export interface IGridProps {
	/**
	 * Gets the component ref.
	 */
	componentRef?: IRefObject<IGrid>;
	/**
	 * The items to turn into a grid
	 */
	items: any[];
	/**
	 * The number of columns
	 */
	columnCount: number;
	/**
	 * Custom renderer for the individual items
	 */
	onRenderItem: (item: any, index: number) => JSX.Element;
	/**
	 * Boolean indicating if the focus should support circular navigation.
	 * This prop is only relevant if doNotcontainWithinFocusZone is not true
	 */
	shouldFocusCircularNavigate?: boolean;
	/**
	 * If true do not contain the grid inside of a FocusZone.
	 * If false contain the grid inside of a FocusZone.
	 */
	doNotContainWithinFocusZone?: boolean;
	/**
	 * Optional, class name for the FocusZone container for the grid
	 * @deprecated Use `styles` and `IGridStyles` to define a styling for the focus zone container with
	 * focusedContainer property.
	 */
	containerClassName?: string;
	/**
	 * Optional, handler for when the grid should blur
	 */
	onBlur?: () => void;
	/**
	 * The optional position this grid is in the parent set (index in a parent menu, for example)
	 */
	positionInSet?: number;
	/**
	 * The optional size of the parent set (size of parent menu, for example)
	 */
	setSize?: number;
	/**
	 * Theme to apply to the component.
	 */
	theme?: ITheme;
	/**
	 * Optional styles for the component.
	 */
	styles?: IStyleFunctionOrObject<IGridStyleProps, IGridStyles>;
}
/**
 * Properties required to build the styles for the grid component.
 */
export interface IGridStyleProps {
	/**
	 * Theme to apply to the grid
	 */
	theme: ITheme;
}
/**
 * Styles for the Grid Component.
 */
export interface IGridStyles {
	/**
	 * Style for the table container of a grid.
	 */
	root: IStyle;
	/**
	 * Style for the table cells of the grid.
	 */
	tableCell: IStyle;
	/**
	 * Optional, style for the FocusZone container for the grid
	 */
	focusedContainer?: IStyle;
}
export declare const Grid: (props: IGridProps) => JSX.Element;
export interface IGridCellProps<T> {
	/**
	 * The option that will be made available to the user
	 */
	item: T;
	/**
	 * Arbitrary unique string associated with this option
	 */
	id: string;
	/**
	 * Optional, if the this option should be diabled
	 */
	disabled?: boolean;
	/**
	 * Optional, if the cell is currently selected
	 */
	selected?: boolean;
	/**
	 * The on click handler
	 */
	onClick?: (item: T) => void;
	/**
	 * The render callback to handle rendering the item
	 */
	onRenderItem: (item: T) => JSX.Element;
	/**
	 * Optional, the onHover handler
	 */
	onHover?: (item?: T) => void;
	/**
	 * Optional, the onFocus handler
	 */
	onFocus?: (item: T) => void;
	/**
	 * The accessible role for this option
	 */
	role?: string;
	/**
	 * Optional, className(s) to apply
	 */
	className?: string;
	/**
	 * Optional, the CSS class used for when the cell is disabled
	 */
	cellDisabledStyle?: string[];
	/**
	 * Optional, the CSS class used for when the cell is selected
	 */
	cellIsSelectedStyle?: string[];
	/**
	 * Index for this option
	 */
	index?: number;
	/**
	 * The label for this item.
	 * Visible text if this item is a header,
	 * tooltip if is this item is normal
	 */
	label?: string;
	/**
	 * Method to provide the classnames to style a button.
	 * The default value for this prop is the getClassnames func
	 * defined in BaseButton.classnames.
	 */
	getClassNames?: (theme: ITheme, className: string, variantClassName: string, iconClassName: string | undefined, menuIconClassName: string | undefined, disabled: boolean, checked: boolean, expanded: boolean, isSplit: boolean | undefined) => IButtonClassNames;
	/**
	 * Optional, mouseEnter handler.
	 * @returns true if the event should be processed, false otherwise
	 */
	onMouseEnter?: (ev: React.MouseEvent<HTMLButtonElement>) => boolean;
	/**
	 * Optional, mouseMove handler
	 * @returns true if the event should be processed, false otherwise
	 */
	onMouseMove?: (ev: React.MouseEvent<HTMLButtonElement>) => boolean;
	/**
	 * Optional, mouseLeave handler
	 */
	onMouseLeave?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
	/**
	 * Optional, onWheel handler
	 */
	onWheel?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
	/**
	 * Optional, onkeydown handler
	 */
	onKeyDown?: (ev: React.KeyboardEvent<HTMLButtonElement>) => void;
}
export declare class GridCell<T, P extends IGridCellProps<T>> extends React.Component<P, {}> {
	static defaultProps: {
		disabled: boolean;
		id: string;
	};
	render(): JSX.Element;
	private _onClick;
	private _onMouseEnter;
	private _onMouseMove;
	private _onMouseLeave;
	private _onFocus;
}
/**
 * Interface containing props common for all types of cards.
 */
export interface IBaseCardProps<TComponent, TStyles, TStyleProps> extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Optional callback to access the TComponent interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<TComponent>;
	/**
	 * Additional CSS class(es) to apply to the Card content wrapper div.
	 */
	className?: string;
	/**
	 * How the element should be positioned
	 * @defaultvalue DirectionalHint.bottomLeftEdge
	 */
	directionalHint?: DirectionalHint;
	/**
	 * Make callout content show on the set side
	 * @defaultvalue true
	 */
	directionalHintFixed?: boolean;
	/**
	 * Focus on first element by default on card or not
	 */
	firstFocus?: boolean;
	/**
	 * The gap between the card and the target
	 * @defaultvalue 0
	 */
	gapSpace?: number;
	/**
	 * Callback upon focus or mouse enter event
	 */
	onEnter?: (ev?: any) => void;
	/**
	 * Callback upon blur or mouse leave event
	 */
	onLeave?: (ev?: any) => void;
	/**
	 *  Item to be returned with onRender functions
	 */
	renderData?: any;
	/**
	 * Custom styles for this component
	 */
	styles?: IStyleFunctionOrObject<TStyleProps, {
		[P in keyof TStyles]: IStyle;
	}>;
	/**
	 * Element to anchor the card to.
	 */
	targetElement?: HTMLElement;
	/**
	 * Theme provided by HOC.
	 */
	theme?: ITheme;
	/**
	 * Trap focus or not
	 */
	trapFocus?: boolean;
}
/**
 * Interface containing styleProps common for all types of cards.
 */
export interface IBaseCardStyleProps {
	/**
	 * ClassName to inject into wrapper div of the content.
	 */
	className?: string;
	/**
	 * Theme provided by High-Order Component.
	 */
	theme: ITheme;
}
/**
 * Interface containing style sections common for all types of cards.
 */
export interface IBaseCardStyles {
	/**
	 * Style for the root element in the default enabled, non-toggled state.
	 */
	root?: IStyle;
}
export interface IExpandingCard {
}
/**
 * ExpandingCard component props.
 */
export interface IExpandingCardProps extends IBaseCardProps<IExpandingCard, IExpandingCardStyles, IExpandingCardStyleProps> {
	/**
	 * Height of compact card
	 * @defaultvalue 156
	 */
	compactCardHeight?: number;
	/**
	 * Height of expanded card
	 * @defaultvalue 384
	 */
	expandedCardHeight?: number;
	/**
	 * Use to open the card in expanded format and not wait for the delay
	 * @defaultvalue ExpandingCardMode.compact
	 */
	mode?: ExpandingCardMode;
	/**
	 *  Render function to populate compact content area
	 */
	onRenderCompactCard?: IRenderFunction<any>;
	/**
	 *  Render function to populate expanded content area
	 */
	onRenderExpandedCard?: IRenderFunction<any>;
}
export declare enum ExpandingCardMode {
	/**
	 * To have top compact card only
	 */
	compact = 0,
	/**
	 * To have both top compact and bottom expanded card
	 */
	expanded = 1
}
export interface IExpandingCardStyleProps extends IBaseCardStyleProps {
	/**
	 * Height of the compact section of the card.
	 */
	compactCardHeight?: number;
	/**
	 * Boolean flag that expanded card is in Expanded.mode === expanded && first frame was rendered.
	 */
	expandedCardFirstFrameRendered?: boolean;
	/**
	 * Height of the expanded section of the card.
	 */
	expandedCardHeight?: number;
	/**
	 * Whether the content of the expanded card overflows vertically.
	 */
	needsScroll?: boolean;
}
export interface IExpandingCardStyles extends IBaseCardStyles {
	/**
	 * Style for the main card element.
	 */
	compactCard?: IStyle;
	/**
	 * Base Style for the expanded card content.
	 */
	expandedCard?: IStyle;
	/**
	 * Style for the expanded card scroll content.
	 */
	expandedCardScroll?: IStyle;
}
export interface IPlainCard {
}
/**
 * PlainCard component props.
 */
export interface IPlainCardProps extends IBaseCardProps<IPlainCard, IPlainCardStyles, IPlainCardStyleProps> {
	/**
	 *  Render function to populate compact content area
	 */
	onRenderPlainCard?: IRenderFunction<any>;
}
export interface IPlainCardStyleProps extends IBaseCardStyleProps {
}
export interface IPlainCardStyles extends IBaseCardStyles {
}
export interface IHoverCard {
}
/**
 * HoverCard component props.
 */
export interface IHoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Optional callback to access the IHoverCardHost interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IHoverCard>;
	/**
	 * Additional CSS class(es) to apply to the HoverCard root element.
	 */
	className?: string;
	/**
	 * Length of card dismiss delay. A min number is necessary for pointer to hop between target and card
	 * @defaultvalue 100
	 */
	cardDismissDelay?: number;
	/**
	 * Length of compact card delay
	 * @defaultvalue 500
	 */
	cardOpenDelay?: number;
	/**
	 * Time in ms when expanded card should open after compact card
	 * @defaultvalue 1500
	 */
	expandedCardOpenDelay?: number;
	/**
	 * Additional ExpandingCard props to pass through HoverCard like renderers, target. gapSpace etc.
	 * Used along with 'type' prop set to HoverCardType.expanding.
	 * Reference detail properties in ICardProps and IExpandingCardProps.
	 */
	expandingCardProps?: IExpandingCardProps;
	/**
	 * Enables instant open of the full card upon click
	 * @defaultvalue false
	 */
	instantOpenOnClick?: boolean;
	/**
	 * Callback when card becomes visible
	 */
	onCardVisible?: () => void;
	/**
	 * Callback when card hides
	 */
	onCardHide?: () => void;
	/**
	 * HotKey used for opening the HoverCard when tabbed to target.
	 * @defaultvalue 'KeyCodes.c'
	 */
	openHotKey?: KeyCodes;
	/**
	 * Additional PlainCard props to pass through HoverCard like renderers, target, gapSpace etc.
	 * Used along with 'type' prop set to HoverCardType.plain.
	 * See for more details ICardProps and IPlainCardProps interfaces.
	 */
	plainCardProps?: IPlainCardProps;
	/**
	 * Whether or not to mark the container as described by the hover card.
	 * If not specified, the caller should mark as element as described by the hover card id.
	 */
	setAriaDescribedBy?: boolean;
	/**
	 * Callback when visible card is expanded.
	 */
	onCardExpand?: () => void;
	/**
	 * Set to true to set focus on the first focusable element in the card. Works in pair with the 'trapFocus' prop.
	 * @defaultvalue false
	 */
	setInitialFocus?: boolean;
	/**
	 * Should block hover card or not
	 */
	shouldBlockHoverCard?: () => void;
	/**
	 * If true disables Card dismiss upon mouse leave, so that card sticks around.
	 * @defaultvalue false
	 */
	sticky?: boolean;
	/**
	 * Custom styles for this component
	 */
	styles?: IStyleFunctionOrObject<IHoverCardStyleProps, IHoverCardStyles>;
	/**
	 * Optional target element to tag hover card on.
	 * If not provided and using HoverCard as a wrapper, don't set 'data-is-focusable=true' attribute to the root of the wrapped child.
	 * When no target given, HoverCard will use it's root as a target and become the focusable element with a focus listener attached to it.
	 */
	target?: HTMLElement | string;
	/**
	 * Theme provided by higher order component.
	 */
	theme?: ITheme;
	/**
	 * Set to true if you want to render the content of the HoverCard in a FocusTrapZone for accessibility reasons.
	 * Optionally 'setInitialFocus' prop can be set to true to move focus inside the FocusTrapZone.
	 */
	trapFocus?: boolean;
	/**
	 * Type of the hover card to render.
	 * @defaultvalue HoverCardType.expanding
	 */
	type?: HoverCardType;
}
export declare enum OpenCardMode {
	/**
	 * Open card by hover
	 */
	hover = 0,
	/**
	 * Open card by hot key
	 */
	hotKey = 1
}
export declare enum HoverCardType {
	/**
	 * Plain card consisting of one part responsive to the size of content.
	 */
	plain = "PlainCard",
	/**
	 * File card consisting of two parts: compact and expanded. Has some default sizes if not specified.
	 */
	expanding = "ExpandingCard"
}
export interface IHoverCardStyleProps {
	/**
	 * Theme provided by High-Order Component.
	 */
	theme: ITheme;
	/**
	 * Optional className(s) for the host div of HoverCard.
	 */
	className?: string;
}
export interface IHoverCardStyles {
	/**
	 * Style for the host element in the default enabled, non-toggled state.
	 */
	host?: IStyle;
}
export declare const HoverCard: (props: IHoverCardProps) => JSX.Element;
export interface IHoverCardState {
	isHoverCardVisible?: boolean;
	mode?: ExpandingCardMode;
	openMode?: OpenCardMode;
}
export declare class HoverCardBase extends BaseComponent<IHoverCardProps, IHoverCardState> {
	static defaultProps: {
		cardOpenDelay: number;
		cardDismissDelay: number;
		expandedCardOpenDelay: number;
		instantOpenOnClick: boolean;
		setInitialFocus: boolean;
		openHotKey: number;
		type: HoverCardType;
	};
	private _hoverCard;
	private _dismissTimerId;
	private _openTimerId;
	private _currentMouseTarget;
	private _classNames;
	constructor(props: IHoverCardProps);
	componentDidMount(): void;
	componentDidUpdate(prevProps: IHoverCardProps, prevState: IHoverCardState): void;
	render(): JSX.Element;
	private _getTargetElement;
	private _shouldBlockHoverCard;
	private _cardOpen;
	private _executeCardOpen;
	private _cardDismiss;
	private _executeCardDismiss;
	private _instantOpenAsExpanded;
}
export declare const ExpandingCard: (props: IExpandingCardProps) => JSX.Element;
export interface IExpandingCardState {
	firstFrameRendered: boolean;
	needsScroll: boolean;
}
export declare class ExpandingCardBase extends BaseComponent<IExpandingCardProps, IExpandingCardState> {
	static defaultProps: {
		compactCardHeight: number;
		expandedCardHeight: number;
		directionalHintFixed: boolean;
	};
	private _classNames;
	private _expandedElem;
	constructor(props: IExpandingCardProps);
	componentDidMount(): void;
	componentWillUnmount(): void;
	render(): JSX.Element;
	private _onKeyDown;
	private _onRenderCompactCard;
	private _onRenderExpandedCard;
	private _checkNeedsScroll;
}
export declare const PlainCard: (props: IPlainCardProps) => JSX.Element;
export declare class PlainCardBase extends BaseComponent<IPlainCardProps, {}> {
	private _classNames;
	render(): JSX.Element;
	private _onKeyDown;
}
export interface IKeytip {
}
export interface IKeytipDataProps extends IBaseProps<IKeytip> {
	/**
	 * IKeytipProps to create from this KeytipData
	 * If no keytipProps are defined, a keytip won't be registered
	 */
	keytipProps?: IKeytipProps;
	/**
	 * String to add to the aria-describedby generated by this KeytipData
	 * It will prepend this string to the generated aria-describedby property
	 */
	ariaDescribedBy?: string;
	/**
	 * T/F if this keytip should be disabled upon creation
	 */
	disabled?: boolean;
}
/**
 * A small element to help the target component correctly read out its aria-describedby for its Keytip
 */
export declare class KeytipData extends BaseComponent<IKeytipDataProps & IRenderComponent<{}>, {}> {
	private _uniqueId;
	private _keytipManager;
	componentDidMount(): void;
	componentWillUnmount(): void;
	componentDidUpdate(): void;
	render(): JSX.Element;
	private _getKtpProps;
	/**
	 * Gets the aria- and data- attributes to attach to the component
	 * @param keytipProps
	 * @param describedByPrepend
	 */
	private _getKtpAttrs;
}
declare enum KeytipTransitionModifier {
	shift,
	ctrl,
	alt,
	meta
}
export interface IKeytipTransitionKey {
	key: string;
	modifierKeys?: KeytipTransitionModifier[];
}
export interface IKeytipLayer {
}
export interface IKeytipLayerProps extends React.ClassAttributes<IKeytipLayer> {
	/**
	 * Optional callback to access the KeytipLayer component. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IKeytipLayer>;
	/**
	 * String to put inside the layer to be used for the aria-describedby for the component with the keytip
	 * Should be one of the starting sequences
	 */
	content: string;
	/**
	 * List of key sequences that will start keytips mode
	 */
	keytipStartSequences?: IKeytipTransitionKey[];
	/**
	 * List of key sequences that execute the return functionality in keytips (going back to the previous level of keytips)
	 */
	keytipReturnSequences?: IKeytipTransitionKey[];
	/**
	 * List of key sequences that will exit keytips mode
	 */
	keytipExitSequences?: IKeytipTransitionKey[];
	/**
	 * Callback function triggered when keytip mode is exited.
	 * ev is the Mouse or Keyboard Event that triggered the exit, if any.
	 */
	onExitKeytipMode?: (ev?: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>) => void;
	/**
	 * Callback function triggered when keytip mode is entered
	 */
	onEnterKeytipMode?: () => void;
	/**
	 * (Optional) Call to provide customized styling.
	 */
	styles?: IStyleFunctionOrObject<IKeytipLayerStyleProps, IKeytipLayerStyles>;
}
export interface IKeytipLayerStyles {
	innerContent: IStyle;
}
export interface IKeytipLayerStyleProps {
}
export declare const KeytipLayer: (props: IKeytipLayerProps) => JSX.Element;
export interface IKeytipTreeNode {
	/**
	 * ID of the <Keytip> DOM element. Needed to locate the correct keytip in the KeytipLayer's 'keytip' state array
	 */
	id: string;
	/**
	 * KeySequence that invokes this KeytipTreeNode's onExecute function
	 */
	keySequences: string[];
	/**
	 * Overflow set sequence for this keytip
	 */
	overflowSetSequence?: string[];
	/**
	 * Control's execute function for when keytip is invoked, passed from the component to the Manager in the IKeytipProps
	 */
	onExecute?: (executeTarget: HTMLElement | null, target: HTMLElement | null) => void;
	/**
	 * Function to execute when we return to this keytip
	 */
	onReturn?: (executeTarget: HTMLElement | null, target: HTMLElement | null) => void;
	/**
	 * List of keytip IDs that should become visible when this keytip is pressed, can be empty
	 */
	children: string[];
	/**
	 * Parent keytip ID
	 */
	parent: string;
	/**
	 * Whether or not this keytip will have children keytips that are dynamically created (DOM is generated on keytip activation)
	 * Common cases are keytips in a menu or modal
	 */
	hasDynamicChildren?: boolean;
	/**
	 * Whether or not this keytip belongs to a component that has a menu
	 * Keytip mode will stay on when a menu is opened, even if the items in that menu have no keytips
	 */
	hasMenu?: boolean;
	/**
	 * T/F if this keytip's component is currently disabled
	 */
	disabled?: boolean;
	/**
	 * T/F if this keytip is a persisted keytip
	 */
	persisted?: boolean;
}
declare class KeytipTree {
	currentKeytip?: IKeytipTreeNode;
	root: IKeytipTreeNode;
	nodeMap: {
		[nodeId: string]: IKeytipTreeNode;
	};
	/**
	 * KeytipTree constructor
	 */
	constructor();
	/**
	 * Add a keytip node to this KeytipTree
	 *
	 * @param keytipProps - Keytip to add to the Tree
	 * @param uniqueID - Unique ID for this keytip
	 * @param persisted - T/F if this keytip should be marked as persisted
	 */
	addNode(keytipProps: IKeytipProps, uniqueID: string, persisted?: boolean): void;
	/**
	 * Updates a node in the tree
	 *
	 * @param keytipProps - Keytip props to update
	 * @param uniqueID - Unique ID for this keytip
	 */
	updateNode(keytipProps: IKeytipProps, uniqueID: string): void;
	/**
	 * Removes a node from the KeytipTree
	 *
	 * @param sequence - full string of the node to remove
	 */
	removeNode(keytipProps: IKeytipProps, uniqueID: string): void;
	/**
	 * Searches the currentKeytip's children to exactly match a sequence. Will not match disabled nodes but
	 * will match persisted nodes
	 *
	 * @param keySequence - string to match
	 * @param currentKeytip - The keytip whose children will try to match
	 * @returns The node that exactly matched the keySequence, or undefined if none matched
	 */
	getExactMatchedNode(keySequence: string, currentKeytip: IKeytipTreeNode): IKeytipTreeNode | undefined;
	/**
	 * Searches the currentKeytip's children to find nodes that start with the given sequence. Will not match
	 * disabled nodes but will match persisted nodes
	 *
	 * @param keySequence - string to partially match
	 * @param currentKeytip - The keytip whose children will try to partially match
	 * @returns List of tree nodes that partially match the given sequence
	 */
	getPartiallyMatchedNodes(keySequence: string, currentKeytip: IKeytipTreeNode): IKeytipTreeNode[];
	/**
	 * Get the non-persisted children of the give node
	 * If no node is given, will use the 'currentKeytip'
	 *
	 * @param node - Node to get the children for
	 * @returns List of node IDs that are the children of the node
	 */
	getChildren(node?: IKeytipTreeNode): string[];
	/**
	 * Gets all nodes from their IDs
	 *
	 * @param ids List of keytip IDs
	 * @returns Array of nodes that match the given IDs, can be empty
	 */
	getNodes(ids: string[]): IKeytipTreeNode[];
	/**
	 * Gets a single node from its ID
	 *
	 * @param id - ID of the node to get
	 * @returns Node with the given ID, if found
	 */
	getNode(id: string): IKeytipTreeNode | undefined;
	/**
	 * Tests if the currentKeytip in this.keytipTree is the parent of 'keytipProps'
	 *
	 * @param keytipProps - Keytip to test the parent for
	 * @returns T/F if the currentKeytip is this keytipProps' parent
	 */
	isCurrentKeytipParent(keytipProps: IKeytipProps): boolean;
	private _getParentID;
	private _getFullSequence;
	private _getNodeSequence;
	private _createNode;
}
export interface IKeytipLayerState {
	inKeytipMode: boolean;
	keytips: IKeytipProps[];
	visibleKeytips: IKeytipProps[];
}
/**
 * A layer that holds all keytip items
 */
export declare class KeytipLayerBase extends BaseComponent<IKeytipLayerProps, IKeytipLayerState> {
	static defaultProps: IKeytipLayerProps;
	private _keytipTree;
	private _keytipManager;
	private _classNames;
	private _currentSequence;
	private _newCurrentKeytipSequences?;
	private _delayedKeytipQueue;
	private _delayedQueueTimeout;
	private _keyHandled;
	constructor(props: IKeytipLayerProps, context: any);
	render(): JSX.Element;
	componentDidMount(): void;
	componentWillUnmount(): void;
	getCurrentSequence(): string;
	getKeytipTree(): KeytipTree;
	/**
	 * Processes an IKeytipTransitionKey entered by the user
	 *
	 * @param transitionKey - IKeytipTransitionKey received by the layer to process
	 */
	processTransitionInput(transitionKey: IKeytipTransitionKey, ev?: React.KeyboardEvent<HTMLElement>): void;
	/**
	 * Processes inputs from the document listener and traverse the keytip tree
	 *
	 * @param key - Key pressed by the user
	 */
	processInput(key: string, ev?: React.KeyboardEvent<HTMLElement>): void;
	/**
	 * Show the given keytips and hide all others
	 *
	 * @param ids - Keytip IDs to show
	 */
	showKeytips(ids: string[]): void;
	/**
	 * Enters keytip mode for this layer
	 */
	private _enterKeytipMode;
	/**
	 * Exits keytip mode for this layer
	 */
	private _exitKeytipMode;
	/**
	 * Sets the keytips state property
	 *
	 * @param keytipProps - Keytips to set in this layer
	 */
	private _setKeytips;
	/**
	 * Callback function to use for persisted keytips
	 *
	 * @param overflowButtonSequences - The overflow button sequence to execute
	 * @param keytipSequences - The keytip that should become the 'currentKeytip' when it is registered
	 */
	private _persistedKeytipExecute;
	private _getVisibleKeytips;
	private _onDismiss;
	private _onKeyDown;
	/**
	 * Gets the ModifierKeyCodes based on the keyboard event
	 *
	 * @param ev - React.KeyboardEvent
	 * @returns List of ModifierKeyCodes that were pressed
	 */
	private _getModifierKey;
	private _onKeyPress;
	private _onKeytipAdded;
	private _onKeytipUpdated;
	private _onKeytipRemoved;
	private _onPersistedKeytipAdded;
	private _onPersistedKeytipRemoved;
	private _onPersistedKeytipExecute;
	/**
	 * Trigger a keytip immediately and set it as the current keytip
	 *
	 * @param keytipProps - Keytip to trigger immediately
	 */
	private _triggerKeytipImmediately;
	private _addKeytipToQueue;
	private _removeKeytipFromQueue;
	private _getKtpExecuteTarget;
	private _getKtpTarget;
	/**
	 * Returns T/F if the keytipProps keySequences match the currentKeytip, and the currentKeytip is in an overflow well
	 * This will make 'keytipProps' the new currentKeytip
	 *
	 * @param keytipProps - Keytip props to check
	 * @returns - T/F if this keytip should become the currentKeytip
	 */
	private _isCurrentKeytipAnAlias;
	/**
	 * Sets if we are in keytip mode.
	 * Note, this sets both the state for the layer as well as
	 * the value that the manager will expose externally.
	 * @param inKeytipMode - Boolean so set whether we are in keytip mode or not
	 */
	private _setInKeytipMode;
	/**
	 * Emits a warning if duplicate keytips are found for the children of the current keytip
	 */
	private _warnIfDuplicateKeytips;
	/**
	 * Returns duplicates among keytip IDs
	 * If the returned array is empty, no duplicates were found
	 *
	 * @param keytipIds - Array of keytip IDs to find duplicates for
	 * @returns - Array of duplicates that were found. If multiple duplicates were found it will only be added once to this array
	 */
	private _getDuplicateIds;
}
export interface IMarqueeSelection {
}
export interface IMarqueeSelectionProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Optional callback to access the IMarqueeSelection interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IMarqueeSelection>;
	/**
	 * The selection object to interact with when updating selection changes.
	 */
	selection: ISelection;
	/**
	 * Optional props to mix into the root DIV element.
	 */
	rootProps?: React.HTMLAttributes<HTMLDivElement>;
	/**
	 * Optional callback that is called, when the mouse down event occurs, in order to determine
	 * if we should start a marquee selection. If true is returned, we will cancel the mousedown
	 * event to prevent upstream mousedown handlers from executing.
	 */
	onShouldStartSelection?: (ev: MouseEvent) => boolean;
	/**
	 * Optional flag to control the enabled state of marquee selection. This allows you to render
	 * it and have events all ready to go, but conditionally disable it. That way transitioning
	 * between enabled/disabled generate no difference in the DOM.
	 * @defaultvalue true
	 */
	isEnabled?: boolean;
	/**
	 * Optional flag to restrict the drag rect to the root element, instead of allowing the drag
	 * rect to start outside of the root element boundaries.
	 * @defaultvalue false
	 */
	isDraggingConstrainedToRoot?: boolean;
	/**
	 * Additional CSS class(es) to apply to the MarqueeSelection.
	 */
	className?: string;
	/**
	 * Theme (provided through customization.)
	 */
	theme?: ITheme;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunction<IMarqueeSelectionStyleProps, IMarqueeSelectionStyles>;
}
export interface IMarqueeSelectionStyleProps {
	theme: ITheme;
	className?: string;
}
export interface IMarqueeSelectionStyles {
	root?: IStyle;
	dragMask?: IStyle;
	box?: IStyle;
	boxFill?: IStyle;
}
export declare const MarqueeSelection: (props: IMarqueeSelectionProps) => JSX.Element;
export interface IMessageBar {
}
export interface IMessageBarProps extends React.HTMLAttributes<HTMLElement> {
	/**
	 * Optional callback to access the IMessageBar interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IMessageBar>;
	/**
	 * The type of MessageBar to render.
	 * @defaultvalue MessageBarType.info
	 */
	messageBarType?: MessageBarType;
	/**
	 * The actions you want to show on the other side.
	 */
	actions?: JSX.Element;
	/**
	 * A description of the message bar for the benefit of screen readers.
	 */
	ariaLabel?: string;
	/**
	 * Whether the message bar has a dismiss button and its callback.
	 * If null, we don't show a dismiss button.
	 * @defaultvalue null
	 */
	onDismiss?: (ev?: React.MouseEvent<HTMLButtonElement | BaseButton | HTMLAnchorElement | HTMLDivElement | Button>) => any;
	/**
	 * Determines if the message bar is multi lined.
	 * If false, and the text overflows over buttons or to another line, it is clipped.
	 * @defaultvalue true
	 */
	isMultiline?: boolean;
	/**
	 * Aria label on dismiss button if onDismiss is defined.
	 */
	dismissButtonAriaLabel?: string;
	/**
	 * Determines if the message bar text is truncated.
	 * If true, a button will render to toggle between a single line view and multiline view.
	 * This prop is for single line message bars with no buttons only in a limited space scenario.
	 * @defaultvalue false
	 */
	truncated?: boolean;
	/**
	 * Aria label on overflow button if truncated is defined.
	 */
	overflowButtonAriaLabel?: string;
	/**
	 * Additional CSS class(es) to apply to the MessageBar.
	 */
	className?: string;
	/**
	 * Theme (provided through customization.)
	 */
	theme?: ITheme;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<IMessageBarStyleProps, IMessageBarStyles>;
}
export interface IMessageBarStyleProps {
	/**
	 * Theme (provided through customization).
	 */
	theme: ITheme;
	/**
	 * Additional CSS class(es).
	 */
	className?: string;
	/**
	 * Type of the MessageBar.
	 */
	messageBarType?: MessageBarType;
	/**
	 * Whether the MessageBar contains a dismiss button.
	 */
	onDismiss?: boolean;
	/**
	 * Whether the text is truncated.
	 */
	truncated?: boolean;
	/**
	 * Whether the MessageBar is rendered in multi line (as opposed to single line) mode.
	 */
	isMultiline?: boolean;
	/**
	 * Whether the single line MessageBar is being expanded.
	 */
	expandSingleLine?: boolean;
	/**
	 * Whether the MessageBar contains any action elements.
	 */
	actions?: boolean;
}
export interface IMessageBarStyles {
	/**
	 * Style set for the root element.
	 */
	root?: IStyle;
	/**
	 * Style set for the element containing the icon, text, and optional dismiss button.
	 */
	content?: IStyle;
	/**
	 * Style set for the element containing the icon.
	 */
	iconContainer?: IStyle;
	/**
	 * Style set for the icon.
	 */
	icon?: IStyle;
	/**
	 * Style set for the element containing the text.
	 */
	text?: IStyle;
	/**
	 * Style set for the text.
	 */
	innerText?: IStyle;
	/**
	 * Style set for the optional dismiss button.
	 */
	dismissal?: IStyle;
	/**
	 * Style set for the icon used to expand and collapse the MessageBar.
	 */
	expand?: IStyle;
	/**
	 * Style set for the element containing the dismiss button.
	 */
	dismissSingleLine?: IStyle;
	/**
	 * Style set for the element containing the expand icon.
	 */
	expandSingleLine?: IStyle;
	/**
	 * Style set for the optional element containing the action elements.
	 */
	actions?: IStyle;
}
export declare enum MessageBarType {
	/** Info styled MessageBar */
	info = 0,
	/** Error styled MessageBar */
	error = 1,
	/** Blocked styled MessageBar */
	blocked = 2,
	/** SevereWarning styled MessageBar */
	severeWarning = 3,
	/** Success styled MessageBar */
	success = 4,
	/** Warning styled MessageBar */
	warning = 5,
	/**
	 * Deprecated at v0.48.0, to be removed at \>= v1.0.0. Use `blocked` instead.
	 * @deprecated Use `blocked` instead.
	 */
	remove = 90000
}
export declare const MessageBar: (props: IMessageBarProps) => JSX.Element;
export interface IMessageBarState {
	labelId?: string;
	showContent?: boolean;
	expandSingleLine?: boolean;
}
export declare class MessageBarBase extends BaseComponent<IMessageBarProps, IMessageBarState> {
	static defaultProps: IMessageBarProps;
	private ICON_MAP;
	private _classNames;
	constructor(props: IMessageBarProps);
	render(): JSX.Element;
	private _getActionsDiv;
	private _getDismissDiv;
	private _getDismissSingleLine;
	private _getExpandSingleLine;
	private _getIconSpan;
	private _renderMultiLine;
	private _renderSingleLine;
	private _renderInnerText;
	private _getClassNames;
	private _getAnnouncementPriority;
	private _onClick;
}
export interface INav {
	/**
	 * The meta 'key' property of the currently selected NavItem of the Nav. Can return
	 * undefined if the currently selected nav item has no populated key property. Be aware
	 * that in order for Nav to properly understand which key is selected all NavItems in
	 * all groups of the Nav must have populated key properties.
	 */
	selectedKey: string | undefined;
}
export interface INavProps {
	/**
	 * Optional callback to access the INav interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<INav>;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules
	 */
	styles?: IStyleFunctionOrObject<INavStyleProps, INavStyles>;
	/**
	 * Theme provided by HOC.
	 */
	theme?: ITheme;
	/**
	 * Additional css class to apply to the Nav
	 * @defaultvalue undefined
	 */
	className?: string;
	/**
	 * A collection of link groups to display in the navigation bar
	 */
	groups: INavLinkGroup[] | null;
	/**
	 * Used to customize how content inside the group header is rendered
	 * @defaultvalue Default group header rendering
	 */
	onRenderGroupHeader?: IRenderFunction<INavLinkGroup>;
	/**
	 * Render a custom link in place of the normal one.
	 * This replaces the entire button rather than simply button content
	 */
	linkAs?: IComponentAs<IButtonProps>;
	/**
	 * Used to customize how content inside the link tag is rendered
	 * @defaultvalue Default link rendering
	 */
	onRenderLink?: IRenderFunction<INavLink>;
	/**
	 * Function callback invoked when a link in the navigation is clicked
	 */
	onLinkClick?: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => void;
	/**
	 * Function callback invoked when the chevron on a link is clicked
	 */
	onLinkExpandClick?: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => void;
	/**
	 * Indicates whether the navigation component renders on top of other content in the UI
	 */
	isOnTop?: boolean;
	/**
	 * (Optional) The key of the nav item initially selected.
	 */
	initialSelectedKey?: string;
	/**
	 * (Optional) The key of the nav item selected by caller.
	 */
	selectedKey?: string;
	/**
	 * (Optional) The nav container aria label.
	 */
	ariaLabel?: string;
	/**
	 * (Optional) The nav container aria label.
	 */
	expandButtonAriaLabel?: string;
	/**
	 * Deprecated at v0.68.1 and will be removed at \>= v1.0.0.
	 * @deprecated Removed at v1.0.0.
	 **/
	expandedStateText?: string;
	/**
	 * Deprecated at v0.68.1 and will be removed at \>= v1.0.0.
	 * @deprecated Removed at v1.0.0.
	 **/
	collapsedStateText?: string;
}
export interface INavLinkGroup {
	/**
	 * Text to render as the header of a group
	 */
	name?: string;
	/**
	 * Links to render within this group
	 */
	links: INavLink[];
	/**
	 * The name to use for functional automation tests
	 */
	automationId?: string;
	/**
	 * If true, the group should render collapsed by default
	 */
	collapseByDefault?: boolean;
	/**
	 * Callback invoked when a group header is clicked
	 */
	onHeaderClick?: (ev?: React.MouseEvent<HTMLElement>, isCollapsing?: boolean) => void;
}
export interface INavLink {
	/**
	 * Text to render for this link
	 */
	name: string;
	/**
	 * URL to navigate to for this link
	 */
	url: string;
	/**
	 * Unique, stable key for the link, used when rendering the list of links and for tracking
	 * the currently selected link.
	 */
	key?: string;
	/**
	 * Child links to this link, if any
	 */
	links?: INavLink[];
	/**
	 * Callback invoked when this link is clicked. Providing this callback will cause the link
	 * to render as a button (rather than an anchor) unless forceAnchor is set to true.
	 */
	onClick?: (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => void;
	/**
	 * Name of an icon to render next to the link button.
	 */
	icon?: string;
	/**
	 * Deprecated. Use `iconProps.className` instead.
	 * @deprecated Use `iconProps.className` instead.
	 */
	iconClassName?: string;
	/**
	 * Props for an icon to render next to the link button.
	 */
	iconProps?: IIconProps;
	/**
	 * Deprecated at v0.68.1 and will be removed at \>= v1.0.0.
	 * @deprecated Removed at v1.0.0.
	 */
	engagementName?: string;
	/**
	 * Deprecated at v0.68.1 and will be removed at \>= v1.0.0.
	 * @deprecated Removed at v1.0.0.
	 */
	altText?: string;
	/**
	 * The name to use for functional automation tests
	 */
	automationId?: string;
	/**
	 * Whether or not the link is in an expanded state
	 */
	isExpanded?: boolean;
	/**
	 * Aria label for nav link
	 */
	ariaLabel?: string;
	/**
	 * Text for title tooltip and ARIA description.
	 */
	title?: string;
	/**
	 * Link <a> target.
	 */
	target?: string;
	/**
	 * @deprecated Not used in the Nav control or anywhere else in office-ui-fabric-react.
	 */
	parentId?: string;
	/**
	 * (Optional) By default, any link with onClick defined will render as a button.
	 * Set this property to true to override that behavior. (Links without onClick defined
	 * will render as anchors by default.)
	 */
	forceAnchor?: boolean;
	/**
	 * (Optional) Any additional properties to apply to the rendered links.
	 */
	[propertyName: string]: any;
}
export interface INavStyleProps {
	/**
	 * Accept theme prop.
	 */
	theme: ITheme;
	/**
	 * Accept custom classNames
	 */
	className?: string;
	/**
	 * is element on top boolean
	 */
	isOnTop?: boolean;
	/**
	 * is element a link boolean
	 */
	isLink?: boolean;
	/**
	 * is element a group boolean
	 */
	isGroup?: boolean;
	/**
	 * is element expanded boolean
	 */
	isExpanded?: boolean;
	/**
	 * is element selected boolean
	 */
	isSelected?: boolean;
	/**
	 * is button
	 */
	isButtonEntry?: boolean;
	/**
	 * Nav height value
	 */
	navHeight?: number;
	/**
	 * left padding value
	 */
	leftPadding?: number;
	/**
	 * left padding when expanded value
	 */
	leftPaddingExpanded?: number;
	/**
	 * right padding value
	 */
	rightPadding?: number;
	/**
	 * position value
	 */
	position?: number;
	/**
	 * Inherited from INavProps
	 * A collection of link groups to display in the navigation bar
	 */
	groups: INavLinkGroup[] | null;
}
export interface INavStyles {
	/**
	 * Style set for the root element.
	 */
	root: IStyle;
	/**
	 * Style set for the link text container div element.
	 */
	linkText: IStyle;
	/**
	 * Style set for the link element extending the
	 * root style set for ActionButton component.
	 */
	link: IStyle;
	/**
	 * Style set for the composite link container div element
	 */
	compositeLink: IStyle;
	/**
	 * Style set for the chevron button inside the composite
	 * link and group elements.
	 */
	chevronButton: IStyle;
	/**
	 * Style set for the chevron icon inside the composite
	 * link and group elements.
	 */
	chevronIcon: IStyle;
	/**
	 * Style set for the nav links ul element.
	 */
	navItems: IStyle;
	/**
	 * Style set for the nav links li element.
	 */
	navItem: IStyle;
	/**
	 * Style set for the group root div.
	 */
	group: IStyle;
	/**
	 * Style set for the group content div inside group.
	 */
	groupContent: IStyle;
}
export declare const Nav: (props: INavProps) => JSX.Element;
export declare function isRelativeUrl(url: string): boolean;
export interface INavState {
	isGroupCollapsed?: {
		[key: string]: boolean;
	};
	isLinkExpandStateChanged?: boolean;
	selectedKey?: string;
}
export declare class NavBase extends BaseComponent<INavProps, INavState> implements INav {
	static defaultProps: INavProps;
	constructor(props: INavProps);
	componentWillReceiveProps(newProps: INavProps): void;
	render(): JSX.Element | null;
	readonly selectedKey: string | undefined;
	private _onRenderLink;
	private _renderNavLink;
	private _renderCompositeLink;
	private _renderLink;
	private _renderLinks;
	private _renderGroup;
	private _renderGroupHeader;
	private _onGroupHeaderClicked;
	private _onLinkExpandClicked;
	private _onNavAnchorLinkClicked;
	private _onNavButtonLinkClicked;
	private _isLinkSelected;
}
export declare class OverflowSetBase extends BaseComponent<IOverflowSetProps, {}> implements IOverflowSet {
	static defaultProps: Pick<IOverflowSetProps, 'vertical' | 'role'>;
	private _focusZone;
	private _persistedKeytips;
	private _keytipManager;
	private _divContainer;
	private _classNames;
	constructor(props: IOverflowSetProps);
	render(): JSX.Element;
	/**
	 * Sets focus to the first tabbable item in the OverflowSet.
	 * @param forceIntoFirstElement - If true, focus will be forced into the first element,
	 * even if focus is already in theOverflowSet
	 * @returns True if focus could be set to an active element, false if no operation was taken.
	 */
	focus(forceIntoFirstElement?: boolean): boolean;
	/**
	 * Sets focus to a specific child element within the OverflowSet.
	 * @param childElement - The child element within the zone to focus.
	 * @returns True if focus could be set to an active element, false if no operation was taken.
	 */
	focusElement(childElement?: HTMLElement): boolean;
	componentDidMount(): void;
	componentWillUnmount(): void;
	componentWillUpdate(): void;
	componentDidUpdate(): void;
	private _registerPersistedKeytips;
	private _unregisterPersistedKeytips;
	private _onRenderItems;
	private _onRenderOverflowButtonWrapper;
	/**
	 * Gets the subMenu for an overflow item
	 * Checks if itemSubMenuProvider has been defined, if not defaults to subMenuProps
	 */
	private _getSubMenuForItem;
}
export interface IOverflowSet {
	/**
	 * Sets focus to the first tabbable item in the zone.
	 * @param forceIntoFirstElement - If true, focus will be forced into the first element, even if
	 * focus is already in the focus zone.
	 * @returns True if focus could be set to an active element, false if no operation was taken.
	 */
	focus(forceIntoFirstElement?: boolean): boolean;
	/**
	 * Sets focus to a specific child element within the zone. This can be used in conjunction with
	 * onBeforeFocus to created delayed focus scenarios (like animate the scroll position to the correct
	 * location and then focus.)
	 * @param childElement - The child element within the zone to focus.
	 * @returns True if focus could be set to an active element, false if no operation was taken.
	 */
	focusElement(childElement?: HTMLElement): boolean;
}
export interface IOverflowSetProps extends React.ClassAttributes<OverflowSetBase> {
	/**
	 * Gets the component ref.
	 */
	componentRef?: IRefObject<IOverflowSet>;
	/**
	 * Class name
	 */
	className?: string;
	/**
	 * An array of items to be rendered by your onRenderItem function in the primary content area
	 */
	items?: IOverflowSetItemProps[];
	/**
	 * Change item layout direction to vertical/stacked.
	 * @defaultvalue false
	 */
	vertical?: boolean;
	/**
	 * An array of items to be passed to overflow contextual menu
	 */
	overflowItems?: IOverflowSetItemProps[];
	/**
	 * Method to call when trying to render an item.
	 */
	onRenderItem: (item: IOverflowSetItemProps) => any;
	/**
	 * Rendering method for overflow button and contextual menu. The argument to the function is
	 * the overflowItems passed in as props to this function.
	 */
	onRenderOverflowButton: IRenderFunction<any[]>;
	/**
	 * Custom properties for OverflowSet's FocusZone.
	 * If doNotContainWithinFocusZone is set to true focusZoneProps will be ignored.
	 * Use one or the other.
	 */
	focusZoneProps?: IFocusZoneProps;
	/**
	 * If true do not contain the OverflowSet inside of a FocusZone,
	 * otherwise the OverflowSet will contain a FocusZone.
	 * If this is set to true focusZoneProps will be ignored.
	 * Use one or the other.
	 */
	doNotContainWithinFocusZone?: boolean;
	/**
	 * The role for the OverflowSet.
	 * @defaultvalue 'menubar'
	 */
	role?: string;
	/**
	 * Optional full keytip sequence for the overflow button, if it will have a keytip.
	 */
	keytipSequences?: string[];
	/**
	 * Function that will take in an IOverflowSetItemProps and return the subMenu for that item.
	 * If not provided, will use 'item.subMenuProps.items' by default.
	 * This is only used if your overflow set has keytips.
	 */
	itemSubMenuProvider?: (item: IOverflowSetItemProps) => any[] | undefined;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<IOverflowSetProps, IOverflowSetStyles>;
}
export interface IOverflowSetStyles {
	/** The style that is layered onto the root element of OverflowSet. */
	root?: IStyle;
	/** The style that is layered onto each individual item in the overflow set. */
	item?: IStyle;
	/** The style that is layered onto the overflow button for the overflow set. */
	overflowButton?: IStyle;
}
/**
 * The props needed to construct styles. This represents the simplified set of immutable things which control the class names.
 */
export declare type IOverflowSetStyleProps = Pick<IOverflowSetProps, 'vertical' | 'className'>;
export interface IOverflowSetItemProps {
	/**
	 * Unique id to identify the item.
	 */
	key: string;
	/**
	 * Optional keytip for the overflowSetItem.
	 */
	keytipProps?: IKeytipProps;
	/**
	 * Any additional properties to use when custom rendering menu items.
	 */
	[propertyName: string]: any;
}
export declare const OverflowSet: (props: IOverflowSetProps) => JSX.Element;
export interface IOverlay {
}
export interface IOverlayProps extends React.HTMLAttributes<HTMLElement> {
	/**
	 * Gets the component ref.
	 */
	componentRef?: IRefObject<IOverlay>;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules
	 */
	styles?: IStyleFunctionOrObject<IOverlayStyleProps, IOverlayStyles>;
	/**
	 * Theme provided by HOC.
	 */
	theme?: ITheme;
	/**
	 * Additional css class to apply to the Overlay
	 * @defaultvalue undefined
	 */
	className?: string;
	/**
	 * Whether to use the dark-themed overlay.
	 * @defaultvalue false
	 */
	isDarkThemed?: boolean;
	onClick?: () => void;
}
export interface IOverlayStyleProps {
	/**
	 * Accept theme prop.
	 */
	theme: ITheme;
	/**
	 * Accept custom classNames
	 */
	className?: string;
	/**
	 * Is overlay visible
	 */
	isNone?: boolean;
	/**
	 * Is overlay dark themed
	 */
	isDark?: boolean;
}
export interface IOverlayStyles {
	/**
	 * Style for the root element.
	 */
	root: IStyle;
}
export declare const Overlay: (props: IOverlayProps) => JSX.Element;
export declare class OverlayBase extends BaseComponent<IOverlayProps, {}> {
	componentDidMount(): void;
	componentWillUnmount(): void;
	render(): JSX.Element;
}
export interface IPivotItemProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Gets the component ref.
	 */
	componentRef?: IRefObject<{}>;
	/**
	 * The text displayed of each pivot link - renaming to `headerText`.
	 * @deprecated Use `headerText` instead.
	 */
	linkText?: string;
	/**
	 * The text displayed of each pivot link.
	 */
	headerText?: string;
	/**
	 * Props for the header command button supporting native props - data-* and aria-* - for each pivot header/link element
	 */
	headerButtonProps?: {
		[key: string]: string | number | boolean;
	};
	/**
	 * An required key to uniquely identify a pivot item.
	 *
	 * Note: The 'key' from react props cannot be used inside component.
	 */
	itemKey?: string;
	/**
	 * The aria label of each pivot link which will read by screen reader instead of linkText.
	 *
	 * Note that unless you have compelling requirements you should not override aria-label.
	 */
	ariaLabel?: string;
	/**
	 * An optional item count that gets displayed just after the linkText(itemCount)
	 *
	 * Example: completed(4)
	 */
	itemCount?: number;
	/**
	 * An optional icon to show next to the pivot link.
	 */
	itemIcon?: string;
	/**
	 * Optional custom renderer for the pivot item link
	 */
	onRenderItemLink?: IRenderFunction<IPivotItemProps>;
	/**
	 * Optional keytip for this PivotItem
	 */
	keytipProps?: IKeytipProps;
}
/**
 *  Usage:
 *
 *   <Pivot>
 *     <PivotItem linkText="Foo">
 *       <Label>Pivot #1</Label>
 *     </PivotItem>
 *     <PivotItem linkText="Bar">
 *       <Label>Pivot #2</Label>
 *     </PivotItem>
 *     <PivotItem linkText="Bas">
 *       <Label>Pivot #3</Label>
 *     </PivotItem>
 *   </Pivot>
 */
export interface IPivotState {
	links: IPivotItemProps[];
	selectedKey: string;
	selectedTabId: string;
}
export declare class PivotBase extends BaseComponent<IPivotProps, IPivotState> {
	private _keyToIndexMapping;
	private _keyToTabIds;
	private _pivotId;
	private focusZone;
	private _classNames;
	constructor(props: IPivotProps);
	componentWillReceiveProps(nextProps: IPivotProps): void;
	/**
	 * Sets focus to the first pivot tab.
	 */
	focus(): void;
	render(): JSX.Element;
	/**
	 * Renders the set of links to route between pivots
	 */
	private _renderPivotLinks;
	private _renderPivotLink;
	private _renderLinkContent;
	/**
	 * Renders the current Pivot Item
	 */
	private _renderPivotItem;
	/**
	 * Gets the set of PivotLinks as arrary of IPivotItemProps
	 * The set of Links is determined by child components of type PivotItem
	 */
	private _getPivotLinks;
	/**
	 * Generates the Id for the tab button.
	 */
	private _getTabId;
	/**
	 * whether the key exists in the pivot items.
	 */
	private _isKeyValid;
	/**
	 * Handles the onClick event on PivotLinks
	 */
	private _onLinkClick;
	/**
	 * Handle the onKeyPress eventon the PivotLinks
	 */
	private _onKeyPress;
	/**
	 * Updates the state with the new selected index
	 */
	private _updateSelectedItem;
	private _getClassNames;
}
export declare class PivotItem extends BaseComponent<IPivotItemProps, {}> {
	render(): JSX.Element;
}
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
export declare type IPivotStyleProps = Required<Pick<IPivotProps, 'theme'>> & Pick<IPivotProps, 'className'> & {
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
export declare enum PivotLinkFormat {
	/**
	 * Display Pivot Links as links
	 */
	links = 0,
	/**
	 * Display Pivot Links as Tabs
	 */
	tabs = 1
}
export declare enum PivotLinkSize {
	/**
	 * Display Link using normal font size
	 */
	normal = 0,
	/**
	 * Display links using large font size
	 */
	large = 1
}
/**
 * The Pivot control and related tabs pattern are used for navigating frequently accessed,
 * distinct content categories. Pivots allow for navigation between two or more content
 * views and relies on text headers to articulate the different sections of content.
 */
export declare const Pivot: (props: IPivotProps) => JSX.Element;
export interface IPopup {
}
export interface IPopupProps extends React.HTMLAttributes<Popup> {
	/**
	 * Optional callback to access the IPopup interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IPopup>;
	/**
	 * Aria role for popup
	 */
	role?: string;
	/**
	 * Accessible label text for the popup.
	 */
	ariaLabel?: string;
	/**
	 *  Defines the element id referencing the element containing label text for popup.
	 */
	ariaLabelledBy?: string;
	/**
	 * Defines the element id referencing the element containing the description for the popup.
	 */
	ariaDescribedBy?: string;
	/**
	 * A callback function for when the popup is dismissed from the close button or light dismiss. If provided, will
	 * handle escape keypresses and call this. The event will be stopped/canceled.
	 */
	onDismiss?: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => any;
	/**
	 *  Optional class name for the root popup div.
	 */
	className?: string;
	/**
	 * If true, the unmounting of this component will cause focus to be restored to the element that had focus when first mounted.
	 * @defaultvalue true
	 */
	shouldRestoreFocus?: boolean;
}
export interface IPopupState {
	needsVerticalScrollBar?: boolean;
}
/**
 * This adds accessibility to Dialog and Panel controls
 */
export declare class Popup extends BaseComponent<IPopupProps, IPopupState> {
	static defaultProps: IPopupProps;
	_root: React.RefObject<HTMLDivElement>;
	private _originalFocusedElement;
	private _containsFocus;
	constructor(props: IPopupProps);
	componentWillMount(): void;
	componentDidMount(): void;
	componentDidUpdate(): void;
	componentWillUnmount(): void;
	render(): JSX.Element;
	private _onKeyDown;
	private _updateScrollBarAsync;
	private _getScrollBar;
	private _onFocus;
	private _onBlur;
}
export interface IPositioningContainerState {
	/**
	 * Current set of calcualted positions for the outermost parent container.
	 */
	positions?: IPositionedData;
	/**
	 * Tracks the current height offset and updates during
	 * the height animation when props.finalHeight is specified.
	 */
	heightOffset?: number;
}
export declare class PositioningContainer extends BaseComponent<IPositioningContainerProps, IPositioningContainerState> implements PositioningContainer {
	static defaultProps: IPositioningContainerProps;
	private _didSetInitialFocus;
	/**
	 * The primary positioned div.
	 */
	private _positionedHost;
	private _contentHost;
	/**
	 * Stores an instance of Window, used to check
	 * for server side rendering and if focus was lost.
	 */
	private _targetWindow;
	/**
	 * The bounds used when determing if and where the
	 * PositioningContainer should be placed.
	 */
	private _positioningBounds;
	/**
	 * The maximum height the PositioningContainer can grow to
	 * without going being the window or target bounds
	 */
	private _maxHeight;
	private _positionAttempts;
	private _target;
	private _setHeightOffsetTimer;
	constructor(props: IPositioningContainerProps);
	componentWillMount(): void;
	componentDidMount(): void;
	componentDidUpdate(): void;
	componentWillUpdate(newProps: IPositioningContainerProps): void;
	render(): JSX.Element | null;
	/**
	 * Deprecated, use `onResize` instead.
	 * @deprecated Use `onResize` instead.
	 */
	dismiss: (ev?: Event | React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement, MouseEvent>) => void;
	onResize: (ev?: Event | React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement, MouseEvent>) => void;
	protected _dismissOnScroll(ev: Event): void;
	protected _dismissOnLostFocus(ev: Event): void;
	protected _setInitialFocus: () => void;
	protected _onComponentDidMount: () => void;
	private _updateAsyncPosition;
	private _updatePosition;
	private _getBounds;
	/**
	 * Return the maximum height the container can grow to
	 * without going out of the specified bounds
	 */
	private _getMaxHeight;
	private _arePositionsEqual;
	private _comparePositions;
	private _setTargetWindowAndElement;
	/**
	 * Animates the height if finalHeight was given.
	 */
	private _setHeightOffsetEveryFrame;
	private _getTarget;
}
/**
 * ProgressIndicator with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Styling)
 */
export declare class ProgressIndicatorBase extends BaseComponent<IProgressIndicatorProps, {}> {
	static defaultProps: {
		label: string;
		description: string;
		width: number;
	};
	constructor(props: IProgressIndicatorProps);
	render(): JSX.Element;
	private _onRenderProgress;
}
export interface IProgressIndicator {
	focus: () => void;
}
export interface IProgressIndicatorProps extends React.ClassAttributes<ProgressIndicatorBase> {
	/**
	 * Gets the component ref.
	 */
	componentRef?: IRefObject<IProgressIndicator>;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<IProgressIndicatorStyleProps, IProgressIndicatorStyles>;
	/**
	 * Theme provided by High-Order Component.
	 */
	theme?: ITheme;
	/**
	 * Additional css class to apply to the ProgressIndicator
	 * @defaultvalue undefined
	 */
	className?: string;
	/**
	 * Label to display above the control. May be a string or React virtual elements.
	 */
	label?: React.ReactNode;
	/**
	 * Text describing or supplementing the operation. May be a string or React virtual elements.
	 */
	description?: React.ReactNode;
	/**
	 * Percentage of the operation's completeness. If this is not set, the indeterminate progress animation will be shown instead.
	 */
	percentComplete?: number;
	/**
	 * Whether or not to hide the progress state.
	 */
	progressHidden?: boolean;
	/**
	 * A render override for the progress track.
	 */
	onRenderProgress?: IRenderFunction<IProgressIndicatorProps>;
	/**
	 * Text alternative of the progress status, used by screen readers for reading the value of the progress.
	 */
	ariaValueText?: string;
	/**
	 * Deprecated at v0.43.0, to be removed at \>= v0.53.0. Use `label` instead.
	 * @deprecated Use `label` instead.
	 */
	title?: string;
	/**
	 * Height of the ProgressIndicator
	 * @defaultvalue 2
	 */
	barHeight?: number;
}
export interface IProgressIndicatorStyleProps {
	/**
	 * Theme provided by High-Order Component.
	 */
	theme: ITheme;
	/**
	 * Accept custom classNames
	 */
	className?: string;
	indeterminate?: boolean;
	barHeight?: number;
}
export interface IProgressIndicatorStyles {
	/**
	 * Style for the root element.
	 */
	root: IStyle;
	itemName: IStyle;
	itemDescription: IStyle;
	itemProgress: IStyle;
	progressTrack: IStyle;
	progressBar: IStyle;
}
/**
 * ProgressIndicator description
 */
export declare const ProgressIndicator: (props: IProgressIndicatorProps) => JSX.Element;
export interface IRating {
}
/**
 * Rating component props.
 */
export interface IRatingProps extends React.AllHTMLAttributes<HTMLElement> {
	/**
	 * Optional callback to access the IRating interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IRating>;
	/**
	 * Selected rating, has to be an integer between min and max
	 */
	rating?: number;
	/**
	 * Minimum rating, defaults to 1, has to be \>= 0
	 * @deprecated No longer used.
	 */
	min?: number;
	/**
	 * Maximum rating, defaults to 5, has to be \>= min
	 */
	max?: number;
	/**
	 * Allow the rating value to be set to 0 instead of a minimum of 1.
	 */
	allowZeroStars?: boolean;
	/**
	 * Custom icon
	 * @defaultvalue FavoriteStarFill
	 */
	icon?: string;
	/**
	 * Custom icon for unselected rating elements.
	 * If an `icon` property is provided, defaults to the value of the `icon` property.
	 * @defaultvalue FavoriteStarFill
	 */
	unselectedIcon?: string;
	/**
	 * Size of rating, defaults to small
	 */
	size?: RatingSize;
	/**
	 * Callback issued when the rating changes.
	 */
	onChange?: (event: React.FocusEvent<HTMLElement>, rating?: number) => void;
	/**
	 * @deprecated Use `onChange` instead.
	 */
	onChanged?: (rating: number) => void;
	/**
	 * Optional label format for star ratings, will be read by screen readers, defaults to ''.
	 * Can be used like "\{0\} of \{1\} stars selected".
	 * Where \{0\} will be subsituted by the current rating and \{1\} will be subsituted by the max rating.
	 */
	ariaLabelFormat?: string;
	/**
	 * Deprecated: Optional id of label describing this instance of Rating. Use `getAriaLabel` instead.
	 * @deprecated Use `getAriaLabel` instead.
	 */
	ariaLabelId?: string;
	/**
	 * Optional flag to mark rating control as readOnly
	 */
	readOnly?: boolean;
	getAriaLabel?: (rating: number, max: number) => string;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<IRatingStyleProps, IRatingStyles>;
	/**
	 * Theme (provided through customization.)
	 */
	theme?: ITheme;
}
export declare enum RatingSize {
	Small = 0,
	Large = 1
}
export interface IRatingStyleProps {
	disabled?: boolean;
	readOnly?: boolean;
	theme: ITheme;
}
export interface IRatingStyles {
	root: IStyle;
	ratingStar: IStyle;
	ratingStarBack: IStyle;
	ratingStarFront: IStyle;
	ratingButton: IStyle;
	ratingStarIsSmall: IStyle;
	ratingStarIsLarge: IStyle;
	rootIsSmall: IStyle;
	rootIsLarge: IStyle;
	labelText: IStyle;
	ratingFocusZone: IStyle;
}
export declare const Rating: (props: IRatingProps) => JSX.Element;
export interface IRatingState {
	rating: number | null | undefined;
}
export declare class RatingBase extends BaseComponent<IRatingProps, IRatingState> {
	static defaultProps: IRatingProps;
	private _id;
	private _min;
	private _labelId;
	private _classNames;
	constructor(props: IRatingProps);
	componentWillReceiveProps(nextProps: IRatingProps): void;
	render(): JSX.Element;
	private _getStarId;
	private _onFocus;
	private _getLabel;
	private _getInitialValue;
	private _getClampedRating;
	private _getFillingPercentage;
}
export interface IResizeGroup {
	/**
	 * Remeasures the available space.
	 */
	remeasure(): void;
}
export interface IResizeGroupProps extends React.HTMLAttributes<ResizeGroupBase | HTMLElement> {
	/**
	 * Optional callback to access the IResizeGroup interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IResizeGroup>;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules
	 * @deprecated Removed to reduce bundle size.  Please use `className` and add css rules to `className` instead.
	 */
	styles?: IStyleFunctionOrObject<IResizeGroupStyleProps, IResizeGroupStyles>;
	/**
	 * Theme provided by HOC.
	 */
	theme?: ITheme;
	/**
	 * Additional css class to apply to the Component
	 * @defaultvalue undefined
	 */
	className?: string;
	/**
	 * Initial data to be passed to the onRenderData function. When there is no onGrowData provided, this data should represent what should
	 * be passed to the render function when the parent container of the ResizeGroup is at it's maximum supported width. A cacheKey property
	 * may optionally be included as part of the data. Two data objects with the same cacheKey will be assumed to take up the
	 * same width and will prevent measurements. The type of cacheKey is a string.
	 */
	data: any;
	/**
	 * Function to render the data. Called when rendering the contents to the screen and when
	 * rendering in a hidden div to measure the size of the contents.
	 */
	onRenderData: (data: any) => JSX.Element;
	/**
	 * Function to be performed on the data in order to reduce its width and make it fit into the given space.
	 * If there are no more scaling steps to apply, it should return undefined to prevent
	 * an infinite render loop.
	 */
	onReduceData: (prevData: any) => any;
	/**
	 * Function to be performed on the data in order to increase its width. It is called in scenarios where the
	 * container has more room than the previous render and we may be able to fit more content. If there are no more
	 * scaling operations to perform on teh data, it should return undefined to prevent an infinite render loop.
	 */
	onGrowData?: (prevData: any) => any;
	/**
	 * Function to be called every time data is rendered. It provides the data that was actually rendered.
	 * A use case would be adding telemetry when a particular control is shown in an overflow well or
	 * dropped as a result of onReduceData or to count the number of renders that an implementation of
	 * onReduceData triggers.
	 */
	dataDidRender?: (renderedData: any) => void;
}
export interface IResizeGroupStyleProps {
	/**
	 * Accept theme prop.
	 */
	theme: ITheme;
	/**
	 * Accept custom classNames
	 */
	className?: string;
}
export interface IResizeGroupStyles {
	/**
	 * Style for the root element.
	 */
	root: IStyle;
}
export interface IResizeGroupState {
	/**
	 * Final data used to render proper sized component
	 */
	renderedData?: any;
	/**
	 * Data to render in a hidden div for measurement
	 */
	dataToMeasure?: any;
	/**
	 * Set to true when the content container might have new dimensions and should
	 * be remeasured.
	 */
	measureContainer?: boolean;
	/**
	 * Are we resizing to accommodate having more or less available space?
	 * The 'grow' direction is when the container may have more room than the last render,
	 * such as when a window resize occurs. This means we will try to fit more content in the window.
	 * The 'shrink' direction is when the contents don't fit in the container and we need
	 * to find a transformation of the data that makes everything fit.
	 */
	resizeDirection?: 'grow' | 'shrink';
}
/**
 * Returns a simple object is able to store measurements with a given key.
 */
export declare const getMeasurementCache: () => {
	/**
	 * Checks if the provided data has a cacheKey. If it has a cacheKey and there is a
	 * corresponding entry in the measurementsCache, then it will return that value.
	 * Returns undefined otherwise.
	 */
	getCachedMeasurement: (data: any) => number;
	/**
	 * Should be called whenever there is a new measurement associated with a given data object.
	 * If the data has a cacheKey, store that measurement in the measurementsCache.
	 */
	addMeasurementToCache: (data: any, measurement: number) => void;
};
/**
 * Returns a function that is able to compute the next state for the ResizeGroup given the current
 * state and any measurement updates.
 */
export declare const getNextResizeGroupStateProvider: (measurementCache?: {
	/**
	 * Checks if the provided data has a cacheKey. If it has a cacheKey and there is a
	 * corresponding entry in the measurementsCache, then it will return that value.
	 * Returns undefined otherwise.
	 */
	getCachedMeasurement: (data: any) => number;
	/**
	 * Should be called whenever there is a new measurement associated with a given data object.
	 * If the data has a cacheKey, store that measurement in the measurementsCache.
	 */
	addMeasurementToCache: (data: any, measurement: number) => void;
}) => {
	getNextState: (props: IResizeGroupProps, currentState: IResizeGroupState, getElementToMeasureWidth: () => number, newContainerWidth?: number) => IResizeGroupState;
	shouldRenderDataForMeasurement: (dataToMeasure: any) => boolean;
	getInitialResizeGroupState: (data: any) => IResizeGroupState;
};
export declare class ResizeGroupBase extends BaseComponent<IResizeGroupProps, IResizeGroupState> {
	private _nextResizeGroupStateProvider;
	private _root;
	private _initialHiddenDiv;
	private _updateHiddenDiv;
	private _hasRenderedContent;
	constructor(props: IResizeGroupProps);
	render(): JSX.Element;
	componentDidMount(): void;
	componentWillReceiveProps(nextProps: IResizeGroupProps): void;
	componentDidUpdate(prevProps: IResizeGroupProps): void;
	remeasure(): void;
	private _afterComponentRendered;
	private _onResize;
}
export declare const ResizeGroup: typeof ResizeGroupBase;
export interface IStickyProps extends React.Props<Sticky> {
	/**
	 * Gets ref to component interface.
	 */
	componentRef?: IRefObject<IStickyProps>;
	/**
	 * Class name to apply to the sticky element if component is sticky.
	 */
	stickyClassName?: string;
	/**
	 * color to apply as 'background-color' style for sticky element.
	 */
	stickyBackgroundColor?: string;
	/**
	 * Region to render sticky component in.
	 * @defaultvalue Both
	 */
	stickyPosition?: StickyPositionType;
	/**
	 * If true, then match scrolling position of placeholder element in Sticky.
	 * @defaultvalue true
	 */
	isScrollSynced?: boolean;
}
export declare enum StickyPositionType {
	Both = 0,
	Header = 1,
	Footer = 2
}
export interface IStickyState {
	isStickyTop: boolean;
	isStickyBottom: boolean;
}
export interface IStickyContext {
	scrollablePane: PropTypes.Requireable<object>;
}
export declare class Sticky extends BaseComponent<IStickyProps, IStickyState> {
	static defaultProps: IStickyProps;
	static contextTypes: IStickyContext;
	context: IScrollablePaneContext;
	distanceFromTop: number;
	private _root;
	private _stickyContentTop;
	private _stickyContentBottom;
	private _nonStickyContent;
	private _placeHolder;
	constructor(props: IStickyProps);
	readonly root: HTMLDivElement | null;
	readonly placeholder: HTMLDivElement | null;
	readonly stickyContentTop: HTMLDivElement | null;
	readonly stickyContentBottom: HTMLDivElement | null;
	readonly nonStickyContent: HTMLDivElement | null;
	readonly canStickyTop: boolean;
	readonly canStickyBottom: boolean;
	syncScroll: (container: HTMLElement) => void;
	componentDidMount(): void;
	componentWillUnmount(): void;
	componentDidUpdate(prevProps: IStickyProps, prevState: IStickyState): void;
	shouldComponentUpdate(nextProps: IStickyProps, nextState: IStickyState): boolean;
	render(): JSX.Element;
	addSticky(stickyContent: HTMLDivElement): void;
	resetSticky(): void;
	setDistanceFromTop(container: HTMLDivElement): void;
	private _setDistanceFromTop;
	private _getContentStyles;
	private _getStickyPlaceholderHeight;
	private _getNonStickyPlaceholderHeight;
	private _onScrollEvent;
	private _getStickyDistanceFromTop;
	private _getStickyDistanceFromTopForFooter;
	private _getNonStickyDistanceFromTop;
	private _getBackground;
}
export interface IScrollablePaneContext {
	scrollablePane?: {
		subscribe: (handler: (container: HTMLElement, stickyContainer: HTMLElement) => void) => void;
		unsubscribe: (handler: (container: HTMLElement, stickyContainer: HTMLElement) => void) => void;
		addSticky: (sticky: Sticky) => void;
		removeSticky: (sticky: Sticky) => void;
		updateStickyRefHeights: () => void;
		sortSticky: (sticky: Sticky, sortAgain?: boolean) => void;
		notifySubscribers: (sort?: boolean) => void;
		syncScrollSticky: (sticky: Sticky) => void;
	};
}
export interface IScrollablePaneState {
	stickyTopHeight: number;
	stickyBottomHeight: number;
	scrollbarWidth: number | undefined;
	scrollbarHeight: number | undefined;
}
export declare class ScrollablePaneBase extends BaseComponent<IScrollablePaneProps, IScrollablePaneState> implements IScrollablePane {
	static childContextTypes: React.ValidationMap<IScrollablePaneContext>;
	private _root;
	private _stickyAboveRef;
	private _stickyBelowRef;
	private _contentContainer;
	private _subscribers;
	private _stickies;
	private _mutationObserver;
	private _notifyThrottled;
	constructor(props: IScrollablePaneProps);
	readonly root: HTMLDivElement | null;
	readonly stickyAbove: HTMLDivElement | null;
	readonly stickyBelow: HTMLDivElement | null;
	readonly contentContainer: HTMLDivElement | null;
	getChildContext(): IScrollablePaneContext;
	componentDidMount(): void;
	componentWillUnmount(): void;
	shouldComponentUpdate(nextProps: IScrollablePaneProps, nextState: IScrollablePaneState): boolean;
	componentDidUpdate(prevProps: IScrollablePaneProps, prevState: IScrollablePaneState): void;
	render(): JSX.Element;
	setStickiesDistanceFromTop(): void;
	forceLayoutUpdate(): void;
	subscribe: (handler: Function) => void;
	unsubscribe: (handler: Function) => void;
	addSticky: (sticky: Sticky) => void;
	removeSticky: (sticky: Sticky) => void;
	sortSticky: (sticky: Sticky, sortAgain?: boolean) => void;
	updateStickyRefHeights: () => void;
	notifySubscribers: () => void;
	getScrollPosition: () => number;
	syncScrollSticky: (sticky: Sticky) => void;
	private _checkStickyStatus;
	private _addToStickyContainer;
	private _removeStickyFromContainers;
	private _onWindowResize;
	private _getStickyContainerStyle;
	private _getScrollbarWidth;
	private _getScrollbarHeight;
	private _onScroll;
}
export interface IScrollablePane {
	/** Triggers a layout update for the pane. */
	forceLayoutUpdate(): void;
	/** Gets the current scroll position of the scrollable pane */
	getScrollPosition(): number;
}
export interface IScrollablePaneProps extends React.HTMLAttributes<HTMLElement | ScrollablePaneBase> {
	/**
	 * Optional callback to access the IScrollablePane interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IScrollablePane>;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules
	 */
	styles?: IStyleFunctionOrObject<IScrollablePaneStyleProps, IScrollablePaneStyles>;
	/**
	 * Theme provided by HOC.
	 */
	theme?: ITheme;
	/**
	 * Additional css class to apply to the ScrollablePane
	 * @defaultvalue undefined
	 */
	className?: string;
	/**
	 * Sets the initial scroll position of the ScrollablePane
	 */
	initialScrollPosition?: number;
	scrollbarVisibility?: ScrollbarVisibility;
}
export interface IScrollablePaneStyleProps {
	/**
	 * Accept theme prop.
	 */
	theme: ITheme;
	/**
	 * Accept custom classNames
	 */
	className?: string;
	scrollbarVisibility?: IScrollablePaneProps['scrollbarVisibility'];
}
export interface IScrollablePaneStyles {
	/**
	 * Style set for the root element.
	 */
	root: IStyle;
	/**
	 * Style set for the stickyAbove element.
	 */
	stickyAbove: IStyle;
	/**
	 * Style set for the stickyBelow element.
	 */
	stickyBelow: IStyle;
	/**
	 * Style set for the stickyBelowItems element.
	 */
	stickyBelowItems: IStyle;
	/**
	 * Style set for the contentContainer element.
	 */
	contentContainer: IStyle;
}
export declare const ScrollbarVisibility: {
	auto: "auto";
	always: "always";
};
export declare type ScrollbarVisibility = typeof ScrollbarVisibility[keyof typeof ScrollbarVisibility];
export declare const ScrollablePane: (props: IScrollablePaneProps) => JSX.Element;
export interface ISearchBox {
	/**
	 * Sets focus inside the search input box.
	 */
	focus(): void;
	/**
	 * Returns whether or not the SearchBox has focus
	 */
	hasFocus(): boolean;
}
export interface ISearchBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	/**
	 * Optional callback to access the ISearchBox interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<ISearchBox>;
	/**
	 * Placeholder for the search box.
	 */
	placeholder?: string;
	/**
	 * Deprecated. Use `placeholder` instead.
	 * @deprecated Use `placeholder` instead.
	 */
	labelText?: string;
	/**
	 * Callback function for when the typed input for the SearchBox has changed.
	 */
	onChange?: (newValue: any) => void;
	/**
	 * Callback executed when the user presses enter in the search box.
	 */
	onSearch?: (newValue: any) => void;
	/**
	 * Callback executed when the user clears the search box by either clicking 'X' or hitting escape.
	 */
	onClear?: (ev?: any) => void;
	/**
	 * Callback executed when the user presses escape in the search box.
	 */
	onEscape?: (ev?: any) => void;
	/**
	 * Deprecated at v0.52.2, use `onChange` instead.
	 * @deprecated Use `onChange` instead.
	 */
	onChanged?: (newValue: any) => void;
	/**
	 * The value of the text in the SearchBox.
	 */
	value?: string;
	/**
	 * The default value of the text in the SearchBox, in the case of an uncontrolled component.
	 * This prop is being deprecated since so far, uncontrolled behavior has not been implemented.
	 * @deprecated Not implemented.
	 */
	defaultValue?: string;
	/**
	 * CSS class to apply to the SearchBox.
	 */
	className?: string;
	/**
	 * The aria label of the SearchBox for the benefit of screen readers.
	 * @defaultvalue placeholder
	 */
	ariaLabel?: string;
	/**
	 * The props for the clear button.
	 */
	clearButtonProps?: IButtonProps;
	/**
	 * The props for the icon.
	 */
	iconProps?: Pick<IIconProps, Exclude<keyof IIconProps, 'className'>>;
	/**
	 * Whether or not the SearchBox is underlined.
	 * @defaultvalue false
	 */
	underlined?: boolean;
	/**
	 * Theme (provided through customization).
	 */
	theme?: ITheme;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<ISearchBoxStyleProps, ISearchBoxStyles>;
	/**
	 * Whether or not to animate the SearchBox icon on focus.
	 * @defaultvalue false
	 */
	disableAnimation?: boolean;
}
export interface ISearchBoxStyleProps {
	theme: ITheme;
	className?: string;
	disabled?: boolean;
	hasFocus?: boolean;
	underlined?: boolean;
	hasInput?: boolean;
	disableAnimation?: boolean;
}
export interface ISearchBoxStyles {
	root?: IStyle;
	iconContainer?: IStyle;
	icon?: IStyle;
	field?: IStyle;
	clearButton?: IStyle;
}
export declare const SearchBox: (props: ISearchBoxProps) => JSX.Element;
export interface ISearchBoxState {
	value?: string;
	hasFocus?: boolean;
	id?: string;
}
export declare class SearchBoxBase extends BaseComponent<ISearchBoxProps, ISearchBoxState> {
	static defaultProps: Pick<ISearchBoxProps, 'disableAnimation' | 'clearButtonProps'>;
	private _rootElement;
	private _inputElement;
	private _latestValue;
	constructor(props: ISearchBoxProps);
	componentWillReceiveProps(newProps: ISearchBoxProps): void;
	render(): JSX.Element;
	/**
	 * Sets focus to the search box input field
	 */
	focus(): void;
	/**
	 * Returns whether or not the SearchBox has focus
	 */
	hasFocus(): boolean;
	private _onClear;
	private _onClickFocus;
	private _onFocusCapture;
	private _onClearClick;
	private _onKeyDown;
	private _onBlur;
	private _onInputChange;
	private _callOnChange;
}
export interface IShimmer {
}
/**
 * Shimmer component props.
 */
export interface IShimmerProps extends React.AllHTMLAttributes<HTMLElement> {
	/**
	 * Optional callback to access the IShimmer interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IShimmer>;
	/**
	 * Sets the width value of the shimmer wave wrapper.
	 * @defaultvalue 100%
	 */
	width?: number | string;
	/**
	 * Controls when the shimmer is swapped with actual data through an animated transition.
	 * @defaultvalue false
	 */
	isDataLoaded?: boolean;
	/**
	 * Elements to render in one line of the Shimmer.
	 */
	shimmerElements?: IShimmerElement[];
	/**
	 * Custom elements when necessary to build complex placeholder skeletons.
	 */
	customElementsGroup?: React.ReactNode;
	/**
	 * Localized string of the status label for screen reader
	 */
	ariaLabel?: string;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<IShimmerStyleProps, IShimmerStyles>;
	/**
	 * Additional CSS class(es) to apply to the Shimmer container.
	 */
	className?: string;
	/**
	 * Theme provided by High-Order Component.
	 */
	theme?: ITheme;
}
/**
 * Shimmer Elements Interface
 */
export interface IShimmerElement {
	/**
	 * Required for every element you intend to use.
	 */
	type: ShimmerElementType;
	/**
	 * The height of the element (ICircle, ILine, IGap) in pixels.
	 * Read more details for each specific element.
	 */
	height?: number;
	/**
	 * The width value of the element (ILine, IGap) in pixels.
	 * Read more details for each specific element.
	 */
	width?: number | string;
	/**
	 * The vertical alignemt of the element (ICircle, ILine).
	 * @defaultvalue center
	 */
	verticalAlign?: 'top' | 'center' | 'bottom';
}
export interface ILine extends IShimmerElement {
	/**
	 * Sets the height of the shimmer line in pixels.
	 * @defaultvalue 16px
	 */
	height?: number;
	/**
	 * Line width value.
	 * @defaultvalue 100%
	 */
	width?: number | string;
}
export interface ICircle extends IShimmerElement {
	/**
	 * Sets the height of the shimmer circle in pixels.
	 * Minimum supported 10px.
	 * @defaultvalue 24px
	 */
	height?: number;
}
export interface IGap extends IShimmerElement {
	/**
	 * Sets the height of the shimmer gap in pixels.
	 * @defaultvalue 16px
	 */
	height?: number;
	/**
	 * Gap width value.
	 * @defaultvalue 10px
	 */
	width?: number | string;
}
export interface IShimmerStyleProps {
	isDataLoaded?: boolean;
	className?: string;
	theme: ITheme;
	transitionAnimationInterval?: number;
}
export interface IShimmerStyles {
	root?: IStyle;
	shimmerWrapper?: IStyle;
	dataWrapper?: IStyle;
	screenReaderText?: IStyle;
}
export declare enum ShimmerElementType {
	/**
	 * Line element type
	 */
	line = 1,
	/**
	 * Circle element type
	 */
	circle = 2,
	/**
	 * Gap element type
	 */
	gap = 3
}
export declare enum ShimmerElementsDefaultHeights {
	/**
	 * Default height of the line element when not provided by user: 16px
	 */
	line = 16,
	/**
	 * Default height of the gap element when not provided by user: 16px
	 */
	gap = 16,
	/**
	 * Default height of the circle element when not provided by user: 24px
	 */
	circle = 24
}
export declare const Shimmer: (props: IShimmerProps) => JSX.Element;
export interface IShimmerState {
	/**
	 * Flag for knowing when to remove the shimmerWrapper from the DOM.
	 */
	contentLoaded?: boolean;
}
export declare class ShimmerBase extends BaseComponent<IShimmerProps, IShimmerState> {
	static defaultProps: IShimmerProps;
	private _classNames;
	private _lastTimeoutId;
	constructor(props: IShimmerProps);
	componentWillReceiveProps(nextProps: IShimmerProps): void;
	render(): JSX.Element;
}
export interface IShimmerLine {
}
/**
 * ShimmerLine component props.
 */
export interface IShimmerLineProps extends React.AllHTMLAttributes<HTMLElement> {
	/**
	 * Optional callback to access the IShimmerLine interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IShimmerLine>;
	/**
	 * Sets the height of the rectangle.
	 * @defaultvalue 16px
	 */
	height?: number;
	/**
	 * Sets width value of the line.
	 * @defaultvalue 100%
	 */
	width?: number | string;
	/**
	 * Theme provided by High-Order Component.
	 */
	theme?: ITheme;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<IShimmerLineStyleProps, IShimmerLineStyles>;
	/**
	 * Use to set custom styling of the shimmerLine borders.
	 * @deprecated Use `styles` prop to leverage mergeStyle API.
	 */
	borderStyle?: IRawStyle;
}
/**
 * Props needed to construct styles.
 */
export declare type IShimmerLineStyleProps = {
	/**
	 * Theme values passed to the component.
	 */
	theme: ITheme;
	/**
	 * Needed to provide a height to the root of the control.
	 */
	height?: number;
	/**
	 * Styles to override borderStyles with custom ones.
	 * @deprecated in favor of mergeStyles API.
	 */
	borderStyle?: IRawStyle;
};
/**
 * Represents the stylable areas of the control.
 */
export interface IShimmerLineStyles {
	/**
	 * Root of the ShimmerLine component.
	 */
	root?: IStyle;
	/**
	 * Top-left corner SVG of the ShimmerLine component.
	 */
	topLeftCorner?: IStyle;
	/**
	 * Top-right corner SVG of the ShimmerLine component.
	 */
	topRightCorner?: IStyle;
	/**
	 * Bottom-right corner SVG of the ShimmerLine component.
	 */
	bottomRightCorner?: IStyle;
	/**
	 * Bottom-left corner SVG of the ShimmerLine component.
	 */
	bottomLeftCorner?: IStyle;
}
export declare const ShimmerLine: (props: IShimmerLineProps) => JSX.Element;
export declare class ShimmerLineBase extends BaseComponent<IShimmerLineProps, {}> {
	private _classNames;
	constructor(props: IShimmerLineProps);
	render(): JSX.Element;
}
export interface IShimmerCircle {
}
/**
 * ShimmerCircle component props.
 */
export interface IShimmerCircleProps extends React.AllHTMLAttributes<HTMLElement> {
	/**
	 * Optional callback to access the IShimmerCircle interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IShimmerCircle>;
	/**
	 * Sets the height of the circle.
	 * @defaultvalue 24px
	 */
	height?: number;
	/**
	 * Theme provided by High-Order Component.
	 */
	theme?: ITheme;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<IShimmerCircleStyleProps, IShimmerCircleStyles>;
	/**
	 * Use to set custom styling of the shimmerCircle borders.
	 * @deprecated Use `styles` prop to leverage mergeStyle API.
	 */
	borderStyle?: IRawStyle;
}
/**
 * Props needed to construct styles.
 */
export declare type IShimmerCircleStyleProps = {
	/**
	 * Theme values passed to the component.
	 */
	theme: ITheme;
	/**
	 * Needed to provide a height to the root of the control.
	 */
	height?: number;
	/**
	 * Styles to override borderStyles with custom ones.
	 * @deprecated in favor of mergeStyles API.
	 */
	borderStyle?: IRawStyle;
};
/**
 * Represents the stylable areas of the control.
 */
export interface IShimmerCircleStyles {
	/**
	 * Root of the ShimmerCircle component.
	 */
	root?: IStyle;
	/**
	 * Style for the circle SVG of the ShimmerCircle component.
	 */
	svg?: IStyle;
}
export declare const ShimmerCircle: (props: IShimmerCircleProps) => JSX.Element;
export declare class ShimmerCircleBase extends BaseComponent<IShimmerCircleProps, {}> {
	private _classNames;
	constructor(props: IShimmerCircleProps);
	render(): JSX.Element;
}
export interface IShimmerGap {
}
/**
 * ShimmerGap component props.
 */
export interface IShimmerGapProps extends React.AllHTMLAttributes<HTMLElement> {
	/**
	 * Optional callback to access the IShimmerGap interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IShimmerGap>;
	/**
	 * Sets the height of the gap.
	 * @defaultvalue 16px
	 */
	height?: number;
	/**
	 * Sets width value of the gap.
	 * @defaultvalue 10px
	 */
	width?: number | string;
	/**
	 * Theme provided by High-Order Component.
	 */
	theme?: ITheme;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<IShimmerGapStyleProps, IShimmerGapStyles>;
	/**
	 * Use to set custom styling of the shimmerGap borders.
	 * @deprecated Use `styles` prop to leverage mergeStyle API.
	 */
	borderStyle?: IRawStyle;
}
/**
 * Props needed to construct styles.
 */
export declare type IShimmerGapStyleProps = {
	/**
	 * Theme values passed to the component.
	 */
	theme: ITheme;
	/**
	 * Needed to provide a height to the root of the control.
	 */
	height?: number;
	/**
	 * Styles to override borderStyles with custom ones.
	 * @deprecated in favor of mergeStyles API.
	 */
	borderStyle?: IRawStyle;
};
/**
 * Represents the stylable areas of the control.
 */
export interface IShimmerGapStyles {
	/**
	 * Root of the ShimmerGap component.
	 */
	root?: IStyle;
}
export declare const ShimmerGap: (props: IShimmerGapProps) => JSX.Element;
export declare class ShimmerGapBase extends BaseComponent<IShimmerGapProps, {}> {
	private _classNames;
	constructor(props: IShimmerGapProps);
	render(): JSX.Element;
}
export interface IShimmerElementsGroup {
}
/**
 * ShimmerElementsGroup component props.
 */
export interface IShimmerElementsGroupProps extends React.AllHTMLAttributes<HTMLElement> {
	/**
	 * Optional callback to access the IShimmerElementsGroup interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IShimmerElementsGroup>;
	/**
	 * Optional maximum row height of the shimmerElements container.
	 */
	rowHeight?: number;
	/**
	 * Elements to render in one group of the Shimmer.
	 */
	shimmerElements?: IShimmerElement[];
	/**
	 * Optional boolean for enabling flexWrap of the container containing the shimmerElements.
	 * @defaultvalue false
	 */
	flexWrap?: boolean;
	/**
	 * Optional width for ShimmerElements container.
	 */
	width?: string;
	/**
	 * Theme provided by High-Order Component.
	 */
	theme?: ITheme;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<IShimmerElementsGroupStyleProps, IShimmerElementsGroupStyles>;
}
export interface IShimmerElementsGroupStyleProps {
	flexWrap?: boolean;
	theme: ITheme;
}
export interface IShimmerElementsGroupStyles {
	root?: IStyle;
}
export declare const ShimmerElementsGroup: (props: IShimmerElementsGroupProps) => JSX.Element;
export declare class ShimmerElementsGroupBase extends BaseComponent<IShimmerElementsGroupProps, {}> {
	static defaultProps: IShimmerElementsGroupProps;
	private _classNames;
	constructor(props: IShimmerElementsGroupProps);
	render(): JSX.Element;
	private _getRenderedElements;
	private _getBorderStyles;
	/**
	 * User should not worry to provide which of the elements is the highest, we do the calculation for him.
	 * Plus if user forgot to specify the height we assign their defaults.
	 */
	private _findMaxElementHeight;
}
export interface IShimmeredDetailsListProps extends IDetailsListProps {
	/** The theme provided by context */
	theme?: ITheme;
	/** Overridable styles */
	styles?: IStyleFunctionOrObject<IShimmeredDetailsListStyleProps, IShimmeredDetailsListStyles>;
	/** Number of shimmer lines to show */
	shimmerLines?: number;
	/** Placeholder renderer */
	onRenderCustomPlaceholder?: () => React.ReactNode;
}
export declare type IShimmeredDetailsListStyleProps = Required<Pick<IShimmeredDetailsListProps, 'theme'>> & Pick<IShimmeredDetailsListProps, 'className' | 'enableShimmer'>;
export interface IShimmeredDetailsListStyles {
	root: IStyle;
}
export declare const ShimmeredDetailsList: (props: IShimmeredDetailsListProps) => JSX.Element;
export declare class ShimmeredDetailsListBase extends BaseComponent<IShimmeredDetailsListProps, {}> {
	private _shimmerItems;
	constructor(props: IShimmeredDetailsListProps);
	render(): JSX.Element;
	private _onRenderShimmerPlaceholder;
	private _renderDefaultShimmerPlaceholder;
}
export interface ISliderState {
	value?: number;
	renderedValue?: number;
}
/**
 * @deprecated Unused.
 */
export declare enum ValuePosition {
	Previous = 0,
	Next = 1
}
export declare class SliderBase extends BaseComponent<ISliderProps, ISliderState> implements ISlider {
	static defaultProps: ISliderProps;
	private _sliderLine;
	private _thumb;
	private _id;
	constructor(props: ISliderProps);
	/**
	 * Invoked when a component is receiving new props. This method is not called for the initial render.
	 */
	componentWillReceiveProps(newProps: ISliderProps): void;
	render(): React.ReactElement<{}>;
	focus(): void;
	readonly value: number | undefined;
	private _getAriaValueText;
	private _getThumbStyle;
	private _onMouseDownOrTouchStart;
	private _onMouseMoveOrTouchMove;
	private _getPosition;
	private _updateValue;
	private _onMouseUpOrTouchEnd;
	private _onKeyDown;
}
export interface ISlider {
	value: number | undefined;
	focus: () => void;
}
export interface ISliderProps extends React.ClassAttributes<SliderBase> {
	/**
	 * Optional callback to access the ISlider interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<ISlider>;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<ISliderStyleProps, ISliderStyles>;
	/**
	 * Theme provided by High-Order Component.
	 */
	theme?: ITheme;
	/**
	 * Description label of the Slider
	 */
	label?: string;
	/**
	 * The initial value of the Slider. Use this if you intend for the Slider to be an uncontrolled component.
	 * This value is mutually exclusive to value. Use one or the other.
	 */
	defaultValue?: number;
	/**
	 * The initial value of the Slider. Use this if you intend to pass in a new value as a result of onChange events.
	 * This value is mutually exclusive to defaultValue. Use one or the other.
	 */
	value?: number;
	/**
	 * The min value of the Slider
	 * @defaultvalue 0
	 */
	min?: number;
	/**
	 * The max value of the Slider
	 * @defaultvalue 10
	 */
	max?: number;
	/**
	 * The difference between the two adjacent values of the Slider
	 * @defaultvalue 1
	 */
	step?: number;
	/**
	 * Whether to show the value on the right of the Slider.
	 * @defaultvalue true
	 */
	showValue?: boolean;
	/**
	 * Callback when the value has been changed
	 */
	onChange?: (value: number) => void;
	/**
	 * Callback on mouse up or touch end
	 */
	onChanged?: (event: MouseEvent | TouchEvent, value: number) => void;
	/**
	 * A description of the Slider for the benefit of screen readers.
	 */
	ariaLabel?: string;
	/**
	 * A text description of the Slider number value for the benefit of screen readers.
	 * This should be used when the Slider number value is not accurately represented by a number.
	 */
	ariaValueText?: (value: number) => string;
	/**
	 * Optional flag to render the slider vertically. Defaults to rendering horizontal.
	 */
	vertical?: boolean;
	/**
	 * Optional flag to render the Slider as disabled.
	 */
	disabled?: boolean;
	/**
	 * Optional className to attach to the slider root element.
	 */
	className?: string;
	/**
	 * Optional mixin for additional props on the thumb button within the slider.
	 */
	buttonProps?: React.HTMLAttributes<HTMLButtonElement>;
	/**
	 * Optional function to format the slider value.
	 */
	valueFormat?: (value: number) => string;
}
export declare type ISliderStyleProps = Required<Pick<ISliderProps, 'theme'>> & Pick<ISliderProps, 'className' | 'disabled' | 'vertical'> & {
	showTransitions?: boolean;
	showValue?: boolean;
	titleLabelClassName?: string;
};
export interface ISliderStyles {
	root: IStyle;
	titleLabel: IStyle;
	container: IStyle;
	slideBox: IStyle;
	line: IStyle;
	thumb: IStyle;
	lineContainer: IStyle;
	activeSection: IStyle;
	inactiveSection: IStyle;
	valueLabel: IStyle;
}
export declare const Slider: (props: ISliderProps) => JSX.Element;
export interface ISpinButtonClassNames {
	root: string;
	labelWrapper: string;
	icon: string;
	label: string;
	spinButtonWrapper: string;
	input: string;
	arrowBox: string;
}
export interface ISpinButton {
	/**
	 * The value of the SpinButton. Use this if you intend to pass in a new value as a result of onChange events.
	 * This value is mutually exclusive to defaultValue. Use one or the other.
	 */
	value?: string;
	/**
	 * Sets focus to the spin button.
	 */
	focus: () => void;
}
export interface ISpinButtonProps {
	/**
	 * Gets the component ref.
	 */
	componentRef?: (component?: ISpinButton | null) => void;
	/**
	 * The initial value of the SpinButton. Use this if you intend for the SpinButton to be an uncontrolled component.
	 * This value is mutually exclusive to value. Use one or the other.
	 * @defaultvalue 0
	 */
	defaultValue?: string;
	/**
	 * The value of the SpinButton. Use this if you intend to pass in a new value as a result of onChange events.
	 * This value is mutually exclusive to defaultValue. Use one or the other.
	 */
	value?: string;
	/**
	 * The min value of the SpinButton.
	 * @defaultvalue 0
	 */
	min?: number;
	/**
	 * The max value of the SpinButton.
	 * @defaultvalue 10
	 */
	max?: number;
	/**
	 * The difference between the two adjacent values of the SpinButton.
	 * This value is sued to calculate the precision of the input if no
	 * precision is given. The precision calculated this way will always
	 * be \>= 0.
	 * @defaultvalue 1
	 */
	step?: number;
	/**
	 * A description of the SpinButton for the benefit of screen readers.
	 */
	ariaLabel?: string;
	/**
	 * A title for the SpinButton used for a more descriptive name that's also visible on its tooltip.
	 */
	title?: string;
	/**
	 * Whether or not the SpinButton is disabled.
	 */
	disabled?: boolean;
	/**
	 * Optional className for SpinButton.
	 */
	className?: string;
	/**
	 * Descriptive label for the SpinButton.
	 */
	label: string;
	/**
	 * @defaultvalue Left
	 */
	labelPosition?: Position;
	/**
	 * Icon that goes along with the label for the whole SpinButton
	 */
	iconProps?: IIconProps;
	/**
	 * This callback is triggered when the value inside the SpinButton should be validated.
	 * @param value - The value entered in the SpinButton to validate
	 * @param event - The event that triggered this validate, if any. (For accessibility)
	 * @returns If a string is returned, it will be used as the value of the SpinButton.
	 */
	onValidate?: (value: string, event?: React.SyntheticEvent<HTMLElement>) => string | void;
	/**
	 * This callback is triggered when the increment button is pressed or if the user presses up arrow
	 * with focus on the input of the spinButton
	 * @returns If a string is returned, it will be used as the value of the SpinButton.
	 */
	onIncrement?: (value: string) => string | void;
	/**
	 * This callback is triggered when the decrement button is pressed or if the user presses down arrow
	 * with focus on the input of the spinButton
	 * @returns If a string is returned, it will be used as the value of the SpinButton.
	 */
	onDecrement?: (value: string) => string | void;
	/**
	 * A callback for when the user put focus on the picker
	 */
	onFocus?: React.FocusEventHandler<HTMLInputElement>;
	/**
	 * A callback for when the user moves the focus away from the picker
	 */
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	/**
	 * Icon for the increment button of the spinButton
	 */
	incrementButtonIcon?: IIconProps;
	/**
	 * Icon for the decrement button of the spinButton
	 */
	decrementButtonIcon?: IIconProps;
	/**
	 * Custom styling for individual elements within the button DOM.
	 */
	styles?: Partial<ISpinButtonStyles>;
	/**
	 * Custom function for providing the classNames for the spinbutton. Can be used to provide
	 * all styles for the component instead of applying them on top of the default styles.
	 */
	getClassNames?: (theme: ITheme, disabled: boolean, isFocused: boolean, keyboardSpinDirection: KeyboardSpinDirection, labelPosition?: Position, className?: string) => ISpinButtonClassNames;
	/**
	 * Custom styles for the upArrow button.
	 *
	 * Note: The buttons are in a checked state when arrow keys are used to
	 * incremenent/decrement the spinButton. Use rootChecked instead of rootPressed
	 * for styling when that is the case.
	 */
	upArrowButtonStyles?: Partial<IButtonStyles>;
	/**
	 * Custom styles for the downArrow button.
	 *
	 * Note: The buttons are in a checked state when arrow keys are used to
	 * incremenent/decrement the spinButton. Use rootChecked instead of rootPressed
	 * for styling when that is the case.
	 */
	downArrowButtonStyles?: Partial<IButtonStyles>;
	/**
	 * Theme provided by HOC.
	 */
	theme?: ITheme;
	/**
	 * Accessibile label text for the increment button for the benefit of the screen reader.
	 */
	incrementButtonAriaLabel?: string;
	/**
	 * Accessibile label text for the decrement button for the benefit of the screen reader.
	 */
	decrementButtonAriaLabel?: string;
	/**
	 * To how many decimal places the value should be rounded to.
	 * The default value is calculated based on the precision of step.
	 * IE: if step = 1, precision = 0. step = 0.0089, precision = 4. step = 300, precision = 2. step = 23.00, precision = 2.
	 */
	precision?: number;
	/**
	 * The position in the parent set (if in a set) for aria-posinset.
	 */
	ariaPositionInSet?: number;
	/**
	 * The total size of the parent set (if in a set) for aria-setsize.
	 */
	ariaSetSize?: number;
	/**
	 * Sets the aria-valuenow of the spin button. The component must be
	 * controlled by the creator who controls the value externally.
	 * ariaValueNow would be the numeric form of value.
	 */
	ariaValueNow?: number;
	ariaValueText?: string;
	/**
	 * Optional keytip for this spin button
	 */
	keytipProps?: IKeytipProps;
}
export interface ISpinButtonStyles {
	/**
	 * Styles for the root of the spin button component.
	 */
	root: IStyle;
	/**
	 * Style for the label wrapper element of the component
	 * The label wrapper contains the icon and the label.
	 */
	labelWrapper: IStyle;
	/**
	 * Style override when the label is positioned at the start.
	 */
	labelWrapperStart: IStyle;
	/**
	 * Style override when the label is positioned at the end.
	 */
	labelWrapperEnd: IStyle;
	/**
	 * Style override when the label is positioned at the top.
	 */
	labelWrapperTop: IStyle;
	/**
	 * Style override when the label is positioned at the bottom.
	 */
	labelWrapperBottom: IStyle;
	/**
	 * Style for the icon.
	 */
	icon: IStyle;
	/**
	 * Style for the icon.
	 */
	iconDisabled: IStyle;
	/**
	 * Style for the label text
	 */
	label: IStyle;
	/**
	 * Style for the label text
	 */
	labelDisabled: IStyle;
	/**
	 * Style for spinButtonWrapper when enabled.
	 */
	spinButtonWrapper: IStyle;
	/**
	 * Style override when label is positioned at the top/bottom.
	 */
	spinButtonWrapperTopBottom: IStyle;
	/**
	 * Style override when spinButton is enabled/hovered.
	 */
	spinButtonWrapperHovered: IStyle;
	/**
	 * Style override when spinButton is enabled/focused.
	 */
	spinButtonWrapperFocused: IStyle;
	/**
	 * Style override when spinButton is disabled.
	 */
	spinButtonWrapperDisabled: IStyle;
	/**
	 * Styles for the input.
	 */
	input: IStyle;
	/**
	 * Style override for ::selection
	 */
	inputTextSelected: IStyle;
	/**
	 * Style override when spinButton is disabled.
	 */
	inputDisabled: IStyle;
	/**
	 * Styles for the arrowButtonsContainer
	 */
	arrowButtonsContainer: IStyle;
	/**
	 * Style override for the arrowButtonsContainer when spin button is disabled.
	 */
	arrowButtonsContainerDisabled: IStyle;
}
export declare enum KeyboardSpinDirection {
	down = -1,
	notSpinning = 0,
	up = 1
}
export interface ISpinButtonState {
	/**
	 * Is true when the control has focus.
	 */
	isFocused: boolean;
	/**
	 * the value of the spin button
	 */
	value: string;
	/**
	 * keyboard spin direction, used to style the up or down button
	 * as active when up/down arrow is pressed
	 */
	keyboardSpinDirection: KeyboardSpinDirection;
	/**
	 * The calculated precision for the value.
	 */
	precision: number;
}
export declare class SpinButton extends BaseComponent<ISpinButtonProps, ISpinButtonState> implements ISpinButton {
	static defaultProps: ISpinButtonProps;
	private _input;
	private _inputId;
	private _labelId;
	private _lastValidValue;
	private _spinningByMouse;
	private _valueToValidate;
	private _currentStepFunctionHandle;
	private _initialStepDelay;
	private _stepDelay;
	constructor(props: ISpinButtonProps);
	/**
	 * Invoked when a component is receiving new props. This method is not called for the initial render.
	 */
	componentWillReceiveProps(newProps: ISpinButtonProps): void;
	render(): JSX.Element;
	focus(): void;
	private _onFocus;
	private _onBlur;
	/**
	 * Gets the value of the spin button.
	 */
	readonly value: string | undefined;
	private _onValidate;
	/**
	 * Validate function to use if one is not passed in
	 */
	private _defaultOnValidate;
	private _onIncrement;
	/**
	 * Increment function to use if one is not passed in
	 */
	private _defaultOnIncrement;
	private _onDecrement;
	/**
	 * Increment function to use if one is not passed in
	 */
	private _defaultOnDecrement;
	private _onChange;
	/**
	 * This is used when validating text entry
	 * in the input (not when changed via the buttons)
	 * @param event - the event that fired
	 */
	private _validate;
	/**
	 * The method is needed to ensure we are updating the actual input value.
	 * without this our value will never change (and validation will not have the correct number)
	 * @param event - the event that was fired
	 */
	private _onInputChange;
	/**
	 * Update the value with the given stepFunction
	 * @param shouldSpin - should we fire off another updateValue when we are done here? This should be true
	 * when spinning in response to a mouseDown
	 * @param stepFunction - function to use to step by
	 */
	private _updateValue;
	/**
	 * Stop spinning (clear any currently pending update and set spinning to false)
	 */
	private _stop;
	/**
	 * Handle keydown on the text field. We need to update
	 * the value when up or down arrow are depressed
	 * @param event - the keyboardEvent that was fired
	 */
	private _handleKeyDown;
	/**
	 * Make sure that we have stopped spinning on keyUp
	 * if the up or down arrow fired this event
	 * @param event stop spinning if we
	 */
	private _handleKeyUp;
	private _onIncrementMouseDown;
	private _onDecrementMouseDown;
}
export declare const Spinner: (props: ISpinnerProps) => JSX.Element;
export declare class SpinnerBase extends BaseComponent<ISpinnerProps, any> {
	static defaultProps: ISpinnerProps;
	render(): JSX.Element;
}
export interface IColorPickerGridCellProps {
	/**
	 * Item to render
	 */
	item: IColorCellProps;
	/**
	 * Arbitrary unique string associated with this option
	 */
	id: string;
	/**
	 * The label for this item.
	 * Visible text if this item is a header,
	 * tooltip if is this item is normal
	 */
	label?: string;
	/**
	 * The CSS-compatible string to describe the color
	 */
	color?: string;
	/**
	 * Index for this option
	 */
	index?: number;
	/**
	 * The theme object to use for styling.
	 */
	theme?: ITheme;
	/**
	 * Wheter or not colorOption should be rendered as a circle or square.
	 */
	circle?: boolean;
	/**
	 * Optional, if the this option should be disabled
	 */
	disabled?: boolean;
	/**
	 * Optional, if the cell is currently selected
	 */
	selected: boolean;
	/**
	 * Height of the cell, in pixels
	 * @defaultvalue 20
	 */
	height?: number;
	/**
	 * Width of the cell, in pixels
	 * @defaultvalue 20
	 */
	width?: number;
	/**
	 * Width of the border that indicates a selected/hovered cell, in pixels
	 * @defaultvalue 2
	 */
	borderWidth?: number;
	/**
	 * The on click handler
	 */
	onClick?: (item: IColorCellProps) => void;
	/**
	 * Optional, the onHover handler
	 */
	onHover?: (item?: IColorCellProps) => void;
	/**
	 * Optional, the onFocus handler
	 */
	onFocus?: (item: IColorCellProps) => void;
	/**
	 * Optional styles for the component.
	 */
	styles?: IStyleFunctionOrObject<IColorPickerGridCellStyleProps, IColorPickerGridCellStyles>;
	/**
	 * Optional, mouseEnter handler.
	 * @returns true if the event should be processed, false otherwise
	 */
	onMouseEnter?: (ev: React.MouseEvent<HTMLButtonElement>) => boolean;
	/**
	 * Optional, mouseMove handler
	 * @returns true if the event should be processed, false otherwise
	 */
	onMouseMove?: (ev: React.MouseEvent<HTMLButtonElement>) => boolean;
	/**
	 * Optional, mouseLeave handler
	 */
	onMouseLeave?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
	/**
	 * Optional, onWheel handler
	 */
	onWheel?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
	/**
	 * Optional, onkeydown handler
	 */
	onKeyDown?: (ev: React.KeyboardEvent<HTMLButtonElement>) => void;
}
export interface IColorCellProps {
	/**
	 * Arbitrary unique string associated with this option
	 */
	id: string;
	/**
	 * The label for this item.
	 * Visible text if this item is a header,
	 * tooltip if is this item is normal
	 */
	label?: string;
	/**
	 * The CSS-compatible string to describe the color
	 */
	color?: string;
	/**
	 * Index for this option
	 */
	index?: number;
}
/**
 * Properties required to build the styles for the color picker component.
 */
export interface IColorPickerGridCellStyleProps {
	/**
	 * Theme to apply to the cell.
	 */
	theme: ITheme;
	/**
	 * Whether the component is disabled or not.
	 */
	disabled?: boolean;
	/**
	 * Whether the cell is currently selected or not.
	 */
	selected?: boolean;
	/**
	 * Whether the svg color element should be rendered as a circle or not.
	 */
	circle?: boolean;
	/**
	 * Whether the color being rendered is white or not. If it is white we show a border around it.
	 */
	isWhite?: boolean;
	/**
	 * The height of this cell, in pixels.
	 */
	height?: number;
	/**
	 * The width of this cell, in pixels.
	 */
	width?: number;
	/**
	 * The width of the border indicating a hovered or selected cell, in pixels.
	 */
	borderWidth?: number;
}
/**
 * Styles for the Color Picker Component.
 */
export interface IColorPickerGridCellStyles {
	/**
	 * Style to apply to a colorCell in the color picker.
	 */
	colorCell: IStyle;
	/**
	 * Style to apply to the svg element that renders the color.
	 */
	svg: IStyle;
}
export interface ISwatchColorPicker {
}
export interface ISwatchColorPickerProps {
	/**
	 * Gets the component ref.
	 */
	componentRef?: IRefObject<ISwatchColorPicker>;
	/**
	 * the number of columns for the swatch color picker
	 */
	columnCount: number;
	/**
	 * The id for the swatch color picker
	 */
	id?: string;
	/**
	 * Additional class name to provide on the root element
	 */
	className?: string;
	/**
	 * The shape of the color cells, defaults to circle
	 */
	cellShape?: 'circle' | 'square';
	/**
	 * The id of color cell that is currently selected
	 */
	selectedId?: string;
	/**
	 * The color cells that will be made available to the user
	 */
	colorCells: IColorCellProps[];
	/**
	 * Callback issued when the user changes the color.
	 * Note, if no id or color is given, there is no selected cell
	 * (e.g. the user executed the currently selected cell to unselect it)
	 */
	onColorChanged?: (id?: string, color?: string) => void;
	/**
	 * Callback issued when the user hovers over a color cell.
	 * Note, if no id or color is given, cells are not longer being hovered
	 */
	onCellHovered?: (id?: string, color?: string) => void;
	/**
	 * Callback issued when the user focuses a color cell.
	 * Note, if no id or color is given, cells are not longer being focused
	 */
	onCellFocused?: (id?: string, color?: string) => void;
	/**
	 * Is this swatch color picker disabled?
	 */
	disabled?: boolean;
	/**
	 * The optional position this grid is in the parent set (index in a parent menu, for example)
	 */
	positionInSet?: number;
	/**
	 * The optional size of the parent set (size of parent menu, for example)
	 */
	setSize?: number;
	/**
	 * Should focus cycle to the beginning of once the user navigates past the end (and vice versa).
	 * This prop is only relevant if doNotcontainWithinFocusZone is not true
	 * @defaultvalue true
	 */
	shouldFocusCircularNavigate?: boolean;
	/**
	 * If true do not contain the grid inside of a FocusZone.
	 * If false contain the grid inside of a FocusZone.
	 */
	doNotContainWithinFocusZone?: boolean;
	/**
	 * The distance between cells, in pixels
	 * @defaultvalue 10
	 */
	cellMargin?: number;
	/**
	 * Height of an individual cell, in pixels
	 * @defaultvalue 20
	 */
	cellHeight?: number;
	/**
	 * Width of an individual cell, in pixels
	 * @defaultvalue 20
	 */
	cellWidth?: number;
	/**
	 * Width of the border indicating a hovered/selected cell, in pixels
	 * @defaultvalue 2
	 */
	cellBorderWidth?: number;
	/**
	 * Theme to apply to the component.
	 */
	theme?: ITheme;
	/**
	 * Optional styles for the component.
	 */
	styles?: IStyleFunctionOrObject<ISwatchColorPickerStyleProps, ISwatchColorPickerStyles>;
	/**
	 * Optional styles for the component.
	 */
	getColorGridCellStyles?: IStyleFunctionOrObject<IColorPickerGridCellStyleProps, IColorPickerGridCellStyles>;
	/**
	 * Optional, whether to update focus when a cell is hovered.
	 * @defaultvalue false
	 */
	focusOnHover?: boolean;
	/**
	 * Selector to focus on mouseLeave
	 * SHOULD ONLY BE USED IN CONJUNCTION WITH focusOnHover
	 */
	mouseLeaveParentSelector?: string | undefined;
}
/**
 * Properties required to build the styles for the color picker component.
 */
export interface ISwatchColorPickerStyleProps {
	/**
	 * Theme to apply to the container
	 */
	theme: ITheme;
	/**
	 * Custom className to apply to the container.
	 */
	className?: string;
	/**
	 * The distance between cells
	 */
	cellMargin?: number;
}
/**
 * Styles for the Color Picker Component.
 */
export interface ISwatchColorPickerStyles {
	/**
	 * Style applied to the container grid of the swatchColorPicker
	 */
	root: IStyle;
	/**
	 * Style for the table cells of the grid.
	 */
	tableCell: IStyle;
	/**
	 * Optional, style for the FocusZone container for the grid
	 */
	focusedContainer?: IStyle;
}
export declare const SwatchColorPicker: (props: ISwatchColorPickerProps) => JSX.Element;
export interface ISwatchColorPickerState {
	selectedIndex?: number;
}
export declare class SwatchColorPickerBase extends BaseComponent<ISwatchColorPickerProps, ISwatchColorPickerState> implements ISwatchColorPicker {
	static defaultProps: ISwatchColorPickerProps;
	private _id;
	private _cellFocused;
	private navigationIdleTimeoutId;
	private isNavigationIdle;
	private readonly navigationIdleDelay;
	private async;
	constructor(props: ISwatchColorPickerProps);
	componentWillReceiveProps(newProps: ISwatchColorPickerProps): void;
	componentWillUnmount(): void;
	render(): JSX.Element | null;
	/**
	 * When the whole swatchColorPicker is blurred,
	 * make sure to clear the pending focused stated
	 */
	private _onSwatchColorPickerBlur;
	/**
	 * Get the selected item's index
	 * @param items - The items to search
	 * @param selectedId - The selected item's id to find
	 * @returns - The index of the selected item's id, -1 if there was no match
	 */
	private _getSelectedIndex;
	/**
	 * Render a color cell
	 * @param item - The item to render
	 * @returns - Element representing the item
	 */
	private _renderOption;
	/**
	 * Callback passed to the GridCell that will manage triggering the onCellHovered callback for mouseEnter
	 */
	private _onMouseEnter;
	/**
	 * Callback passed to the GridCell that will manage Hover/Focus updates
	 */
	private _onMouseMove;
	/**
	 * Callback passed to the GridCell that will manage Hover/Focus updates
	 */
	private _onMouseLeave;
	/**
	 * Callback to make sure we don't update the hovered element during mouse wheel
	 */
	private _onWheel;
	/**
	 * Callback that
	 */
	private _onKeyDown;
	/**
	 * Sets a timeout so we won't process any mouse "hover" events
	 * while navigating (via mouseWheel or arrowKeys)
	 */
	private setNavigationTimeout;
	/**
	 * Callback passed to the GridCell class that will trigger the onCellHovered callback of the SwatchColorPicker
	 * NOTE: This will not be triggered if shouldFocusOnHover === true
	 */
	private _onGridCellHovered;
	/**
	 * Callback passed to the GridCell class that will trigger the onCellFocus callback of the SwatchColorPicker
	 */
	private _onGridCellFocused;
	/**
	 * Handle the click on a cell
	 * @param item - The cell that the click was fired against
	 */
	private _onCellClick;
}
export declare const ColorPickerGridCell: (props: IColorPickerGridCellProps) => JSX.Element;
export declare class ColorPickerGridCellBase extends React.Component<IColorPickerGridCellProps, {}> {
	static defaultProps: IColorPickerGridCellProps;
	private _classNames;
	render(): JSX.Element;
	/**
	 * Render the core of a color cell
	 * @returns - Element representing the core of the item
	 */
	private _onRenderColorOption;
	/**
	 * Validate if the cell's color is white or not to apply whiteCell style
	 * @param inputColor - The color of the current cell
	 * @returns - Whether the cell's color is white or not.
	 */
	private _isWhiteCell;
	/**
	 * Method to override the getClassNames func in a button.
	 */
	private _getClassNames;
}
export interface ITextField {
	/** Gets the current value of the input. */
	value: string | undefined;
	/** Sets focus to the input. */
	focus: () => void;
	/** Blurs the input */
	blur: () => void;
	/** Select the value of the text field. */
	select: () => void;
	/** Sets the selection start of the text field to a specified value. */
	setSelectionStart: (value: number) => void;
	/** Sets the selection end of the text field to a specified value. */
	setSelectionEnd: (value: number) => void;
	/**
	 * Sets the start and end positions of a selection in a text field.
	 * Call with start and end set to the same value to set the cursor position.
	 * @param start - Index of the start of the selection.
	 * @param end - Index of the end of the selection.
	 */
	setSelectionRange: (start: number, end: number) => void;
	/** Gets the selection start of the text field. Returns -1 if there is no selection. */
	selectionStart: number | null;
	/** Gets the selection end of the text field. Returns -1 if there is no selection. */
	selectionEnd: number | null;
}
/**
 * TextField component props.
 */
export interface ITextFieldProps extends React.AllHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
	/**
	 * Optional callback to access the ITextField component. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<ITextField>;
	/**
	 * Whether or not the text field is a multiline text field.
	 * @defaultvalue false
	 */
	multiline?: boolean;
	/**
	 * Whether or not the multiline text field is resizable.
	 * @defaultvalue true
	 */
	resizable?: boolean;
	/**
	 * Whether or not to auto adjust text field height. Applies only to multiline text field.
	 * @defaultvalue false
	 */
	autoAdjustHeight?: boolean;
	/**
	 * Whether or not the text field is underlined.
	 * @defaultvalue false
	 */
	underlined?: boolean;
	/**
	 * Whether or not the text field is borderless.
	 * @defaultvalue false
	 */
	borderless?: boolean;
	/**
	 * Label displayed above the text field (and read by screen readers).
	 */
	label?: string;
	/**
	 * Custom renderer for the label.
	 */
	onRenderLabel?: IRenderFunction<ITextFieldProps>;
	/**
	 * Description displayed below the text field to provide additional details about what text to enter.
	 */
	description?: string;
	/**
	 * Custom renderer for the description.
	 */
	onRenderDescription?: IRenderFunction<ITextFieldProps>;
	/**
	 * @deprecated Use `prefix` instead.
	 */
	addonString?: string;
	/**
	 * Prefix displayed before the text field contents. This is not included in the value.
	 */
	prefix?: string;
	/**
	 * Suffix displayed after the text field contents. This is not included in the value.
	 */
	suffix?: string;
	/**
	 * @deprecated Use `onRenderPrefix` instead.
	 */
	onRenderAddon?: IRenderFunction<ITextFieldProps>;
	/**
	 * Custom render function for prefix.
	 */
	onRenderPrefix?: IRenderFunction<ITextFieldProps>;
	/**
	 * Custom render function for suffix.
	 */
	onRenderSuffix?: IRenderFunction<ITextFieldProps>;
	/**
	 * Props for an optional icon, displayed in the far right end of the text field.
	 */
	iconProps?: IIconProps;
	/**
	 * Default value of the text field. Only provide this if the text field is an uncontrolled component;
	 * otherwise, use the `value` property.
	 */
	defaultValue?: string;
	/**
	 * Current value of the text field. Only provide this if the text field is a controlled component where you
	 * are maintaining its current state; otherwise, use the `defaultValue` property.
	 */
	value?: string;
	/**
	 * Disabled state of the text field.
	 * @defaultvalue false
	 */
	disabled?: boolean;
	/**
	 * If true, the text field is readonly.
	 * @defaultvalue false
	 */
	readOnly?: boolean;
	/**
	 * Static error message displayed below the text field. Use `onGetErrorMessage` to dynamically
	 * change the error message displayed (if any) based on the current value.
	 */
	errorMessage?: string;
	/**
	 * Callback for when the input value changes.
	 */
	onChange?: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
	/**
	 * @deprecated Use `onChange` instead.
	 */
	onChanged?: (newValue: any) => void;
	/**
	 * Called after the input's value updates but before re-rendering.
	 * @param newValue - The new value. Type should be string.
	 */
	onBeforeChange?: (newValue: any) => void;
	/**
	 * Function called after validation completes.
	 */
	onNotifyValidationResult?: (errorMessage: string, value: string | undefined) => void;
	/**
	 * Function used to determine whether the input value is valid and get an error message if not.
	 *
	 *   When it returns string:
	 *   - If valid, it returns empty string.
	 *   - If invalid, it returns the error message string and the text field will
	 *     show a red border and show an error message below the text field.
	 *
	 *   When it returns Promise<string>:
	 *   - The resolved value is display as error message.
	 *   - The rejected, the value is thrown away.
	 *
	 */
	onGetErrorMessage?: (value: string) => string | PromiseLike<string> | undefined;
	/**
	 * Text field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
	 * @defaultvalue 200
	 */
	deferredValidationTime?: number;
	/**
	 * Optional class name that is added to the container of the component.
	 */
	className?: string;
	/**
	 * Optional class name that is added specifically to the input/textarea element.
	 */
	inputClassName?: string;
	/**
	 * Aria label for the text field.
	 */
	ariaLabel?: string;
	/**
	 * Run validation only on input focus.
	 * @defaultvalue false
	 */
	validateOnFocusIn?: boolean;
	/**
	 * Run validation only on input focus out.
	 * @defaultvalue false
	 */
	validateOnFocusOut?: boolean;
	/**
	 * Disable on-load validation.
	 * @defaultvalue true
	 */
	validateOnLoad?: boolean;
	/**
	 * Theme (provided through customization).
	 */
	theme?: ITheme;
	/**
	 * Call to provide customized styling that will layer on top of the variant rules.
	 */
	styles?: IStyleFunctionOrObject<ITextFieldStyleProps, ITextFieldStyles>;
	/**
	 * @deprecated Use `iconProps` instead.
	 */
	iconClass?: string;
	/**
	 * Whether the input field should have autocomplete enabled.
	 * This tells the browser to display options based on earlier typed values.
	 */
	autoComplete?: 'on' | 'off';
	/**
	 * The masking string that defines the mask's behavior.
	 * A backslash will escape any character.
	 * Special format characters are:
	 * '9': [0-9]
	 * 'a': [a-zA-Z]
	 * '*': [a-zA-Z0-9]
	 *
	 * @example `Phone Number: (999) 999-9999`
	 */
	mask?: string;
	/**
	 * The character to show in place of unfilled characters of the mask.
	 * @defaultvalue '_'
	 */
	maskChar?: string;
	/**
	 * An object defining the format characters and corresponding regexp values.
	 * Default format characters: \{
	 *  '9': /[0-9]/,
	 *  'a': /[a-zA-Z]/,
	 *  '*': /[a-zA-Z0-9]/
	 * \}
	 */
	maskFormat?: {
		[key: string]: RegExp;
	};
	/**
	 * @deprecated Serves no function.
	 */
	componentId?: string;
}
export declare type ITextFieldStyleProps = Required<Pick<ITextFieldProps, 'theme'>> & Pick<ITextFieldProps, 'className' | 'disabled' | 'inputClassName' | 'required' | 'multiline' | 'borderless' | 'resizable' | 'underlined' | 'iconClass' | 'autoAdjustHeight'> & {
	/** Element has an error message. */
	hasErrorMessage?: boolean;
	/** Element has an icon. */
	hasIcon?: boolean;
	/** Element has a label. */
	hasLabel?: boolean;
	/** Element has focus. */
	focused?: boolean;
};
export interface ITextFieldSubComponentStyles {
	/**
	 * Styling for Label child component.
	 */
	label: IStyleFunctionOrObject<any, any>;
}
export interface ITextFieldStyles extends IStyleSet<ITextFieldStyles> {
	/**
	 * Style for root element.
	 */
	root: IStyle;
	/**
	 * Style for field group encompassing entry area (prefix, field, icon and suffix).
	 */
	fieldGroup: IStyle;
	/**
	 * Style for prefix element.
	 */
	prefix: IStyle;
	/**
	 * Style for suffix element.
	 */
	suffix: IStyle;
	/**
	 * Style for main field entry element.
	 */
	field: IStyle;
	/**
	 * Style for icon prop element.
	 */
	icon: IStyle;
	/**
	 * Style for description element.
	 */
	description: IStyle;
	/**
	 * Style for TextField wrapper element.
	 */
	wrapper: IStyle;
	/**
	 * Style for error message element.
	 */
	errorMessage: IStyle;
	/**
	 * Styling for subcomponents.
	 */
	subComponentStyles: ITextFieldSubComponentStyles;
}
export declare const TextField: (props: ITextFieldProps) => JSX.Element;
export interface ITextFieldState {
	value: string;
	/** Is true when the control has focus. */
	isFocused: boolean;
	/**
	 * The validation error message.
	 *
	 * - If there is no validation error or we have not validated the input value, errorMessage is an empty string.
	 * - If we have done the validation and there is validation error, errorMessage is the validation error message.
	 */
	errorMessage: string;
}
export declare class TextFieldBase extends BaseComponent<ITextFieldProps, ITextFieldState> implements ITextField {
	static defaultProps: ITextFieldProps;
	private _id;
	private _descriptionId;
	private _delayedValidate;
	private _isMounted;
	private _lastValidation;
	private _latestValue;
	private _latestValidateValue;
	private _textElement;
	private _classNames;
	/**
	 * If true, the text field is changing between single- and multi-line, so we'll need to reset
	 * focus after the change completes.
	 */
	private _shouldResetFocusAfterRender;
	/**
	 * If set, the text field is changing between single- and multi-line, so we'll need to reset
	 * selection/cursor after the change completes.
	 */
	private _selectionBeforeInputTypeChange;
	constructor(props: ITextFieldProps);
	/**
	 * Gets the current value of the text field.
	 */
	readonly value: string | undefined;
	componentDidMount(): void;
	componentWillReceiveProps(newProps: ITextFieldProps): void;
	componentDidUpdate(): void;
	componentWillUnmount(): void;
	render(): JSX.Element;
	/**
	 * Sets focus on the text field
	 */
	focus(): void;
	/**
	 * Blurs the text field.
	 */
	blur(): void;
	/**
	 * Selects the text field
	 */
	select(): void;
	/**
	 * Sets the selection start of the text field to a specified value
	 */
	setSelectionStart(value: number): void;
	/**
	 * Sets the selection end of the text field to a specified value
	 */
	setSelectionEnd(value: number): void;
	/**
	 * Gets the selection start of the text field
	 */
	readonly selectionStart: number | null;
	/**
	 * Gets the selection end of the text field
	 */
	readonly selectionEnd: number | null;
	/**
	 * Sets the start and end positions of a selection in a text field.
	 * @param start - Index of the start of the selection.
	 * @param end - Index of the end of the selection.
	 */
	setSelectionRange(start: number, end: number): void;
	private _setValue;
	private _onFocus;
	private _onBlur;
	private _onRenderLabel;
	private _onRenderDescription;
	private _onRenderAddon;
	private _onRenderPrefix;
	private _onRenderSuffix;
	private readonly _errorMessage;
	/**
	 * If a custom description render function is supplied then treat description as always available.
	 * Otherwise defer to the presence of description or error message text.
	 */
	private readonly _isDescriptionAvailable;
	private _renderTextArea;
	private _renderInput;
	private _onInputChange;
	private _validate;
	private _notifyAfterValidate;
	private _adjustInputHeight;
}
/**
 * State for the MaskedTextField component.
 */
export interface IMaskedTextFieldState {
	/**
	 * The mask string formatted with the input value.
	 * This is what is displayed inside the TextField
	 * @example
	 *  `Phone Number: 12_ - 4___`
	 */
	displayValue: string;
	/** The index into the rendered value of the first unfilled format character */
	maskCursorPosition?: number;
}
export declare const DEFAULT_MASK_CHAR = "_";
export declare class MaskedTextField extends BaseComponent<ITextFieldProps, IMaskedTextFieldState> implements ITextField {
	static defaultProps: ITextFieldProps;
	/**
	 * Tell BaseComponent to bypass resolution of componentRef.
	 */
	protected _skipComponentRefResolution: boolean;
	private _textField;
	/**
	 *  An array of data containing information regarding the format characters,
	 *  their indices inside the display text, and their corresponding values.
	 * @example
	 * ```
	 *  [
	 *    { value: '1', displayIndex: 16, format: /[0-9]/ },
	 *    { value: '2', displayIndex: 17, format: /[0-9]/ },
	 *    { displayIndex: 18, format: /[0-9]/ },
	 *    { value: '4', displayIndex: 22, format: /[0-9]/ },
	 *    ...
	 *  ]
	 * ```
	 */
	private _maskCharData;
	/** True if the TextField is focused */
	private _isFocused;
	/** True if the TextField was not focused and it was clicked into */
	private _moveCursorOnMouseUp;
	/** The stored selection data prior to input change events. */
	private _changeSelectionData;
	constructor(props: ITextFieldProps);
	componentWillReceiveProps(newProps: ITextFieldProps): void;
	componentDidUpdate(): void;
	render(): JSX.Element;
	/**
	 * @returns The value of all filled format characters or undefined if not all format characters are filled
	 */
	readonly value: string | undefined;
	/**
	 *
	 */
	setValue(newValue: string): void;
	focus(): void;
	blur(): void;
	select(): void;
	setSelectionStart(value: number): void;
	setSelectionEnd(value: number): void;
	setSelectionRange(start: number, end: number): void;
	readonly selectionStart: number | null;
	readonly selectionEnd: number | null;
	private _onFocus;
	private _onBlur;
	private _onMouseDown;
	private _onMouseUp;
	private _onBeforeChange;
	private _onInputChange;
	private _onKeyDown;
	private _onPaste;
}
export interface IThemeSlotRule {
	name: string;
	color?: IColor;
	value?: string;
	inherits?: IThemeSlotRule;
	asShade?: Shade;
	isBackgroundShade?: boolean;
	isCustomized?: boolean;
	dependentRules: IThemeSlotRule[];
}
export interface IThemeRules {
	[key: string]: IThemeSlotRule;
}
export declare class ThemeGenerator {
	static setSlot(rule: IThemeSlotRule, color: string | IColor, isInverted?: boolean, isCustomization?: boolean, overwriteCustomColor?: boolean): void;
	static insureSlots(slotRules: IThemeRules, isInverted: boolean): void;
	static getThemeAsJson(slotRules: IThemeRules): any;
	static getThemeAsCode(slotRules: IThemeRules): any;
	static getThemeAsSass(slotRules: IThemeRules): any;
	static getThemeForPowerShell(slotRules: IThemeRules): any;
	private static _setSlot;
}
export declare enum BaseSlots {
	primaryColor = 0,
	backgroundColor = 1,
	foregroundColor = 2
}
export declare enum FabricSlots {
	themePrimary = 0,
	themeLighterAlt = 1,
	themeLighter = 2,
	themeLight = 3,
	themeTertiary = 4,
	themeSecondary = 5,
	themeDarkAlt = 6,
	themeDark = 7,
	themeDarker = 8,
	neutralLighterAlt = 9,
	neutralLighter = 10,
	neutralLight = 11,
	neutralQuaternaryAlt = 12,
	neutralQuaternary = 13,
	neutralTertiaryAlt = 14,
	neutralTertiary = 15,
	neutralSecondary = 16,
	neutralPrimaryAlt = 17,
	neutralPrimary = 18,
	neutralDark = 19,
	black = 20,
	white = 21
}
export declare enum SemanticColorSlots {
	bodyBackground = 0,
	bodyText = 1,
	disabledBackground = 2,
	disabledText = 3
}
export declare function themeRulesStandardCreator(): IThemeRules;
export interface IToggle {
	focus: () => void;
}
/**
 * Toggle component props.
 */
export interface IToggleProps extends React.HTMLAttributes<HTMLElement> {
	/**
	 * Render the root element as another type.
	 */
	as?: IComponentAs<React.HTMLAttributes<HTMLElement>>;
	/**
	 * Optional callback to access the IToggle interface. Use this instead of ref for accessing
	 * the public methods and properties of the component.
	 */
	componentRef?: IRefObject<IToggle>;
	/**
	 * A label for the toggle.
	 */
	label?: string;
	/**
	 * Text to display when toggle is ON.
	 */
	onText?: string;
	/**
	 * Text to display when toggle is OFF.
	 */
	offText?: string;
	/**
	 * Text for screen-reader to announce as the name of the toggle.
	 */
	ariaLabel?: string;
	/**
	 * @deprecated Use `ariaLabel` for name, and let the metadata convey state
	 */
	onAriaLabel?: string;
	/**
	 * @deprecated Use `ariaLabel` for name, and let the metadata convey state
	 */
	offAriaLabel?: string;
	/**
	 * Checked state of the toggle. If you are maintaining state yourself, use this property. Otherwise refer to `defaultChecked`.
	 */
	checked?: boolean;
	/**
	 * Initial state of the toggle. If you want the toggle to maintain its own state, use this. Otherwise refer to `checked`.
	 */
	defaultChecked?: boolean;
	/**
	 * Optional disabled flag.
	 */
	disabled?: boolean;
	/**
	 * Callback issued when the value changes.
	 */
	onChange?: (event: React.MouseEvent<HTMLElement>, checked?: boolean) => void;
	/**
	 * @deprecated Use `onChange` instead.
	 */
	onChanged?: (checked: boolean) => void;
	/**
	 * Theme provided by HOC.
	 */
	theme?: ITheme;
	/**
	 * Optional styles for the component.
	 */
	styles?: IStyleFunctionOrObject<IToggleStyleProps, IToggleStyles>;
	/**
	 * Optional keytip for this toggle
	 */
	keytipProps?: IKeytipProps;
}
/**
 * Properties required to build the styles for the Toggle component.
 */
export interface IToggleStyleProps {
	/**
	 * Theme values.
	 */
	theme: ITheme;
	/**
	 * Root element class name.
	 */
	className?: string;
	/**
	 * Component is disabled.
	 */
	disabled?: boolean;
	/**
	 * Component is checked.
	 */
	checked?: boolean;
}
/**
 * Styles for the Toggle component.
 */
export interface IToggleStyles {
	/** Root element. */
	root: IStyle;
	/**
	 * Label element above the toggle.
	 */
	label: IStyle;
	/**
	 * Container for the toggle pill and the text next to it.
	 */
	container: IStyle;
	/**
	 * Pill, rendered as a button.
	 */
	pill: IStyle;
	/**
	 * Thumb inside of the pill.
	 */
	thumb: IStyle;
	/**
	 * Text next to the pill.
	 */
	text: IStyle;
}
export declare const Toggle: React.StatelessComponent<IToggleProps>;
export interface IToggleState {
	checked: boolean;
}
export declare class ToggleBase extends BaseComponent<IToggleProps, IToggleState> implements IToggle {
	private _id;
	private _toggleButton;
	constructor(props: IToggleProps);
	/**
	 * Gets the current checked state of the toggle.
	 */
	readonly checked: boolean;
	componentWillReceiveProps(newProps: IToggleProps): void;
	render(): JSX.Element;
	focus(): void;
	private _onClick;
	private _noop;
}