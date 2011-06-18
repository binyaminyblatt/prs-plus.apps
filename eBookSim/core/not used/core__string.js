// Name: String
// Description: String related methods
// Author: kartu
//
// History:
//	2010-03-14 kartu - Initial version, refactored from Utils

Core.string = {};

Core.string.compareStrings = function(a, b) {
	return a.localeCompare(b);
};

Core.string.startsWith = function(str, prefix) {
	return str.indexOf(prefix) === 0;
};

Core.string.endsWith = function(str, postfix) {
	return str.lastIndexOf(postfix) === str.length - postfix.length;
};

