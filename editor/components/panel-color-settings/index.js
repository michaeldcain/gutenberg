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

const ColorPalleteControl = ( { label, colors, ...settings } ) => {
	const colorIndicatorProps = getColorIndicatorProps( colors, settings );
	const labelElement = getTitle( 'editor-panel-color-settings__color-pallete', label, [ colorIndicatorProps ] );

	return (
		<BaseControl
			label={ labelElement } >
			<ColorPalette
				className="editor-panel-color-settings__color-pallete"
				{ ...pick( settings, [ 'value', 'onChange' ] ) }
			/>
		</BaseControl>
	);
};

export function PanelColorSettings( { title, colors, colorSettings, children } ) {
	const baseClassName = 'editor-panel-color-settings';
	const panelTitleClassName = `${ baseClassName }__panel-title`;

	const titleColorIndicatorProps = colorSettings.map( ( settings ) => {
		return getColorIndicatorProps( colors, settings );
	} );

	return (
		<PanelBody
			className={ baseClassName }
			title={ getTitle( panelTitleClassName, title, titleColorIndicatorProps ) }
		>

			{ colorSettings.map( ( settings, index ) => (
				<ColorPalleteControl
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
