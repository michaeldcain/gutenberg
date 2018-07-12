/**
 * WordPress dependencies
 */
import {
	ifCondition,
	PanelBody,
	BaseControl,
	ColorArea,
} from '@wordpress/components';
import { compose } from '@wordpress/element';
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

const getTitle = ( className, title, colorAreaProps ) => (
	<span className={ className }>
		{ title }
		{ colorAreaProps.map( ( props, index ) => (
			props && <ColorArea
				key={ index }
				{ ...props }
			/>
		) ) }
	</span>
);

function PanelTextColor( { title, colors, backgroundColorProps, textColorProps, contrastCheckerProps } ) {
	const baseClassName = 'editor-panel-text-color';
	const panelTitleClassName = `${ baseClassName }__panel-title`;
	const controlTitleClassName = `${ baseClassName }__control-title`;
	const colorPaletteClassName = `${ baseClassName }__color-palette`;

	// translators: %s: The name of the color e.g: "vivid red" or color hex code if name is not available e.g: "#f00".
	const backgroundAriaLabelTemplate = __( '(current background color: %s)' );
	const backgroundColorAreaProps = getColorAreaProps( colors, backgroundColorProps.value, backgroundAriaLabelTemplate );

	// translators: %s: The name of the color e.g: "vivid red" or color hex code if name is not available e.g: "#f00".
	const textAriaLabelTemplate = __( '(current text color: %s)' );
	const textColorAreaProps = getColorAreaProps( colors, textColorProps.value, textAriaLabelTemplate );

	return (
		<PanelBody
			className="editor-panel-text-color"
			title={ getTitle( panelTitleClassName, title, [ backgroundColorAreaProps, textColorAreaProps ] ) }
		>
			<BaseControl
				label={ getTitle( controlTitleClassName, __( 'Background Color' ), [ backgroundColorAreaProps ] ) } >
				<ColorPalette className={ colorPaletteClassName } { ...backgroundColorProps } />
			</BaseControl>

			<BaseControl label={ getTitle( controlTitleClassName, __( 'Text Color' ), [ textColorAreaProps ] ) } >
				<ColorPalette className={ colorPaletteClassName } { ...textColorProps } />
			</BaseControl>

			<ContrastChecker { ...contrastCheckerProps } />
		</PanelBody>
	);
}

export default compose( [
	withColorContext,
	ifCondition( ( { hasColorsToChoose } ) => hasColorsToChoose ),
] )( PanelTextColor );
