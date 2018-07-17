/**
 * External dependencies
 */
import { pick } from 'lodash';

/**
 * WordPress dependencies
 */
import {
	PanelBody,
	BaseControl,
	ColorIndicator,
} from '@wordpress/components';
import { ifCondition, compose } from '@wordpress/compose';
import { sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.scss';
import ColorPalette from '../color-palette';
import withColorContext from '../color-palette/with-color-context';
import { getColorName } from '../colors';

const getColorIndicatorProps = ( colors, { value, colorIndicatorAriaLabel } ) => {
	if ( ! value ) {
		return;
	}

	const colorName = getColorName( colors, value );

	return {
		colorValue: value,
		ariaLabel: sprintf( colorIndicatorAriaLabel, colorName || value ),
	};
};

const TextWithColorIndicators = ( { className, text, colorIndicatorProps } ) => (
	<span className={ className }>
		{ text }
		{ colorIndicatorProps.map( ( props, index ) => props && (
			<ColorIndicator
				key={ index }
				{ ...props }
			/>
		) ) }
	</span>
);

const ColorPaletteControl = ( { label, colors, ...settings } ) => {
	const colorIndicatorProps = getColorIndicatorProps( colors, settings );
	const labelElement = (
		<TextWithColorIndicators
			className="editor-panel-color-settings__color-palette"
			text={ label }
			colorIndicatorProps={ [ colorIndicatorProps ] }
		/>
	);

	return (
		<BaseControl
			label={ labelElement } >
			<ColorPalette
				className="editor-panel-color-settings__color-palette"
				{ ...pick( settings, [ 'value', 'onChange' ] ) }
			/>
		</BaseControl>
	);
};

export function PanelColorSettings( { title, colors, colorSettings, children } ) {
	const className = 'editor-panel-color-settings';

	const titleColorIndicatorProps = colorSettings.map( ( settings ) => {
		return getColorIndicatorProps( colors, settings );
	} );

	const titleElement = (
		<TextWithColorIndicators
			className="editor-panel-color-settings__panel-title"
			text={ title }
			colorIndicatorProps={ titleColorIndicatorProps }
		/>
	);

	return (
		<PanelBody
			className={ className }
			title={ titleElement }
		>

			{ colorSettings.map( ( settings, index ) => (
				<ColorPaletteControl
					key={ index }
					colors={ colors }
					{ ...settings } />
			) ) }

			{ children }
		</PanelBody>
	);
}

export default compose( [
	withColorContext,
	ifCondition( ( { hasColorsToChoose } ) => hasColorsToChoose ),
] )( PanelColorSettings );
