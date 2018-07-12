/**
 * External dependencies
 */
import { shallow } from 'enzyme';
import { noop } from 'lodash';

/**
 * Internal dependencies
 */
import { PanelColorSettings } from '../';

describe( 'PanelColorSettings', () => {
	it( 'matches the snapshot', () => {
		const wrapper = shallow(
			<PanelColorSettings
				title="Test Title"
				colors={ [] }
				backgroundColorProps={ {
					value: '#000',
					onChange: noop,
				} }
				textColorProps={ {
					value: '#111',
					onChange: noop,
				} }
				contrastCheckerProps={ {
					isLargeText: false,
					textColor: '#111',
					backgroundColor: '#000',
					fallbackTextColor: '#000',
					fallbackBackgroundColor: '#fff',
				} }
			/>
		);

		expect( wrapper ).toMatchSnapshot();
	} );
} );
