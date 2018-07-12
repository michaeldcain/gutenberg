/**
 * WordPress dependencies
 */
import {
	ifCondition,
	PanelBody,
	BaseControl,
	ColorArea,
} from '@wordpress/components';
import { compose, Fragment } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.scss';
import ContrastChecker from '../contrast-checker';
import ColorPalette from '../color-palette';
import withColorContext from '../color-palette/with-color-context';
import { getColorName } from '../colors';

const getColorAreaProps = ( colors, colorValue, ariaLabelTemplate ) => {
	if ( ! colorValue ) {
		return;
	}

	const colorName = getColorName( colors, colorValue );

	return {
		colorValue,
		ariaLabel: sprintf( ariaLabelTemplate, colorName || colorValue ),
	};
};

const getTitle = ( title, colorAreaProps, colorAreaClassName ) => (
	<Fragment>
		{ title }
		{ colorAreaProps.map( ( props, index ) => (
			props && <ColorArea
				key={ index }
				className={ colorAreaClassName }
				{ ...props }
			/>
		) ) }
	</Fragment>
);

function PanelTextColor( { title, colors, backgroundColorProps, textColorProps, contrastCheckerProps } ) {
	const baseClassName = 'editor-panel-text-color';
	const titleColorAreaClasses = `${ baseClassName }__panel-color-area`;
	const controlColorAreaClasses = `${ baseClassName }__control-color-area`;
	const colorPaletteClasses = `${ baseClassName }__color-palette`;

	// translators: %s: The name of the color e.g: "vivid red" or color hex code if name is not available e.g: "#f00".
	const backgroundAriaLabelTemplate = __( '(current background color: %s)' );
	const backgroundColorValue = backgroundColorProps.value;
	const backgroundColorAreaProps = getColorAreaProps( colors, backgroundColorValue, backgroundAriaLabelTemplate );

	// translators: %s: The name of the color e.g: "vivid red" or color hex code if name is not available e.g: "#f00".
	const textAriaLabelTemplate = __( '(current text color: %s)' );
	const textColorValue = textColorProps.value;
	const textColorAreaProps = getColorAreaProps( colors, textColorValue, textAriaLabelTemplate );

	return (
		<PanelBody
			className="editor-panel-text-color"
			title={ getTitle( title, [ backgroundColorAreaProps, textColorAreaProps ], titleColorAreaClasses ) }
		>
			<BaseControl
				label={ getTitle( __( 'Background Color' ), [ backgroundColorAreaProps ], controlColorAreaClasses ) } >
				<ColorPalette className={ colorPaletteClasses } { ...backgroundColorProps } />
			</BaseControl>

			<BaseControl label={ getTitle( __( 'Text Color' ), [ textColorAreaProps ], controlColorAreaClasses ) } >
				<ColorPalette className={ colorPaletteClasses } { ...textColorProps } />
			</BaseControl>

			<ContrastChecker { ...contrastCheckerProps } />
		</PanelBody>
	);
}

export default compose( [
	withColorContext,
	ifCondition( ( { hasColorsToChoose } ) => hasColorsToChoose ),
] )( PanelTextColor );
