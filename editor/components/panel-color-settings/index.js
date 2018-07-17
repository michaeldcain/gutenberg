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
import { Fragment } from '@wordpress/element';
import { ifCondition, compose } from '@wordpress/compose';
import { sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.scss';
import ColorPalette from '../color-palette';
import withColorContext from '../color-palette/with-color-context';
import { getColorName } from '../colors';

const ColorIndicatorWithColorContext = withColorContext( ( { value, colorIndicatorAriaLabel, colors } ) => {
	if ( ! value ) {
		return null;
	}

	const colorName = getColorName( colors, value );

	return (
		<ColorIndicator
			colorValue={ value }
			ariaLabel={ sprintf( colorIndicatorAriaLabel, colorName || value ) }
		/>
	);
} );

const ColorPaletteControl = ( { label, ...settings } ) => {
	const labelElement = (
		<Fragment>
			{ label }
			{ <ColorIndicatorWithColorContext { ...settings } /> }
		</Fragment>
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

export function PanelColorSettings( { title, colorSettings, children } ) {
	const className = 'editor-panel-color-settings';

	const titleElement = (
		<span className={ `${ className }__panel-title` }>
			{ title }
			{ colorSettings.map(
				( settings, index ) => (
					<ColorIndicatorWithColorContext key={ index } { ...settings } />
				)
			) }
		</span>
	);

	return (
		<PanelBody
			className={ className }
			title={ titleElement }
		>
			{ colorSettings.map( ( settings, index ) => (
				<ColorPaletteControl key={ index } { ...settings } />
			) ) }

			{ children }
		</PanelBody>
	);
}

export default compose( [
	withColorContext,
	ifCondition( ( { hasColorsToChoose } ) => hasColorsToChoose ),
] )( PanelColorSettings );
