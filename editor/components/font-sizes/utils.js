/**
 * External dependencies
 */
import { find, kebabCase } from 'lodash';

/**
 *  Returns the font size object based on an array of named font sizes and the namedFontSize and customFontSize values.
 * 	If namedFontSize is undefined or not found in fontSizes an object with just the size value based on customFontSize is returned.
 *
 * @param {Array}   fontSizes               Array of font size objects containing at least the "name" and "size" values as properties.
 * @param {?string} fontSizeAttribute       Content of the font size attribute (slug).
 * @param {?number} customFontSizeAttribute Contents of the custom font size attribute (value).
 *
 * @return {?string} If fontSizeAttribute is set and an equal slug is found in fontSizes it returns the font size object for that slug.
 * 					 Otherwise, an object with just the size value based on customFontSize is returned.
 */
export const getFontSize = ( fontSizes, fontSizeAttribute, customFontSizeAttribute ) => {
	if ( fontSizeAttribute ) {
		const fontSizeObject = find( fontSizes, { slug: fontSizeAttribute } );
		if ( fontSizeObject ) {
			return fontSizeObject;
		}
	}
	return {
		size: customFontSizeAttribute,
	};
};

/**
 * Returns a class based on fontSizeName.
 *
 * @param {string} fontSizeContext Context/place where the font size is being used, is used during class generation.
 *                                 Normally the value is "font-size".
 * @param {string} fontSizeSlug    Slug of the fontSize.
 *
 * @return {string} String with the class corresponding to the fontSize passed.
 */
export function getFontSizeClass( fontSizeContext, fontSizeSlug ) {
	if ( ! fontSizeSlug ) {
		return;
	}

	return `has-${ kebabCase( fontSizeSlug ) }-${ kebabCase( fontSizeContext ) }`;
}
