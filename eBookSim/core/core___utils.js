// Name: Utils
// Description: Misceleraneous utilities
// Author: kartu
//
// History:
//	2010-07-21 kartu - Initial version

Core.utils = {
	/**
	* Calls each element of function array
	*
	* @param targets - array of functions, or array of objects, if funcName is defined
	* @param obj - object that will be passed as "this" to the functions
	* @param args - array of arguments to pass to the function
	* @param funcName - name of the function to call (if provided, targets is a list of objects) 
	*/
	callAll: function (targets, obj, args, funcName) {
		for (var i = 0, n = targets.length; i < n; i++) {
			try {
				var f = targets[i];
				if (funcName !== undefined) {
					f = f[funcName];
				}
				if (f !== undefined) {
					if (args !== undefined) {
						f.apply(obj, args);
					} else {
						f.call(obj);
					}
				}
			} catch (e) {
				// Core's log
				log.error("in callAll, idx " + i, e);
			}
		}

	}
};