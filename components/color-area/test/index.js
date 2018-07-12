/**
 * External dependencies
 */
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import ColorArea from '../';

describe( 'ColorArea', () => {
	it( 'matches the snapshot', () => {
		const wrapper = shallow( <ColorArea ariaLabel="sample label" colorValue="#fff" /> );

		expect( wrapper ).toMatchSnapshot();
	} );
} );
