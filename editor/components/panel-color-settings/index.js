/**
 * WordPress dependencies
 */
import {
	PanelBody,
	BaseControl,
	ColorIndicator,
} from '@wordpress/components';
import { ifCondition, compose } from '@wordpress/compose';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.scss';
import ContrastChecker from '../contrast-checker';
import ColorPalette from '../color-palette';
import withColorContext from '../color-palette/with-color-context';
import { getColorName } from '../colors';

const getColorIndicatorProps = ( colors, colorValue, ariaLabelTemplate ) => {
	if ( ! colorValue ) {
		return;
	}

	const colorName = getColorName( colors, colorValue );

	return {
		colorValue,
		ariaLabel: sprintf( ariaLabelTemplate, colorName || colorValue ),
	};
};

const getTitle = ( className, title, colorIndicatorProps ) => (
	<span className={ className }>
		{ title }
		{ colorIndicatorProps.map( ( props, index ) => props && (
			<ColorIndicator
				key={ index }
				{ ...props }
			/>
		) ) }
	</span>
);

export function PanelColorSettings( { title, colors, backgroundColorProps, textColorProps, children } ) {
	const baseClassName = 'editor-panel-color-settings';
	const panelTitleClassName = `${ baseClassName }__panel-title`;
	const controlTitleClassName = `${ baseClassName }__control-title`;
	const colorPaletteClassName = `${ baseClassName }__color-palette`;

	// translators: %s: The name of the color e.g: "vivid red" or color hex code if name is not available e.g: "#f00".
	const backgroundAriaLabelTemplate = __( '(current background color: %s)' );
	const backgroundColorIndicatorProps = getColorIndicatorProps( colors, backgroundColorProps.value, backgroundAriaLabelTemplate );

	// translators: %s: The name of the color e.g: "vivid red" or color hex code if name is not available e.g: "#f00".
	const textAriaLabelTemplate = __( '(current text color: %s)' );
	const textColorIndicatorProps = getColorIndicatorProps( colors, textColorProps.value, textAriaLabelTemplate );

	return (
		<PanelBody
			className={ baseClassName }
			title={ getTitle( panelTitleClassName, title, [ backgroundColorIndicatorProps, textColorIndicatorProps ] ) }
		>
			<BaseControl
				label={ getTitle( controlTitleClassName, __( 'Background Color' ), [ backgroundColorIndicatorProps ] ) } >
				<ColorPalette className={ colorPaletteClassName } { ...backgroundColorProps } />
			</BaseControl>

			<BaseControl label={ getTitle( controlTitleClassName, __( 'Text Color' ), [ textColorIndicatorProps ] ) } >
				<ColorPalette className={ colorPaletteClassName } { ...textColorProps } />
			</BaseControl>

			{ children }
		</PanelBody>
	);
}

export default compose( [
	withColorContext,
	ifCondition( ( { hasColorsToChoose } ) => hasColorsToChoose ),
] )( PanelColorSettings );
