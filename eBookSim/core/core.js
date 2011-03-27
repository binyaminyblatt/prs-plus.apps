// Name: Core
// Description: controls PRS+ initialization 
// Author: kartu
//
// History:
//	2010-03-14 kartu - Initial version, refactored from Utils

var log;

// Localize
var str = {
	NODE_PRSP_SETTINGS: "PRS+ Settings"
};

var L = function (key) {
	if (str.hasOwnProperty(key)) {
		return str[key];
	} else {
		return "Core." + key;
	}
};

// Calls given method for all array objects, passing arg as argument
// Arguments:
//	objArray - array of objects to call
//	methodName - name of the method to call
//	arg - argument to pass to <methodName> function
//
var core_callMethodForAll = function (objArray, methodName, arg) {
	if (!objArray) {
		return;
	}
	for (var i = 0, n = objArray.length; i < n; i++) {
		var obj = objArray[i];
		var func = obj[methodName];
		if (typeof func === "function") {
			try {
				func.call(obj, arg);
			} catch (e) {
				try {
					if (typeof obj != "undefined" && obj.hasOwnProperty("name")) {
						log.error("error when calling method " + methodName + " on " + obj.name + ": " + e);
					} else {
						log.error("error when calling method " + methodName + " on object [" + i + "]: " + e);
					}
				} catch (ignore) {
				}
			}
		}
	}
};

//--------------------------------------------------------------------------------------------------------------------
// SYSTEM - Addon nodes & settings
//--------------------------------------------------------------------------------------------------------------------

// Initialize function, called by autorun.js
//
Core.initialize = function () {
	try {
		log = Core.log.getLogger("core");

		// Root settings node, located "Settings" => "Addon Settings"
/*		Core.ui.nodes.addonSettingsNode = Core.ui.createContainerNode({
			parent: Core.ui.nodes.settings,
			title: L("NODE_PRSP_SETTINGS"),
			kind: Core.ui.NodeKinds.SETTINGS,
			comment: ""
		});
		Core.ui.nodes.settings.nodes.splice(0, 0, Core.ui.nodes.addonSettingsNode);
*/

		var utils = this.utils;
		var addons = this.addons;
		var all = utils.concat(addons);
		
		// All addon's are loaded, call preInit (some addon's might change option defs)
		core_callMethodForAll(all, "onPreInit");
		
/*		// Load options 
		for (var i = 0, n = all.length; i < n; i++) {
			try {
				Core.settings.loadOptions(all[i]);
			} catch (e0) {
				log.warn("error loading settings for addon " + all[i].name + ": " + e0);
			}
		}
*/		
		// Addons and options are loaded, call init
		core_callMethodForAll(all, "onInit");
		//	log.trace(Core.debug.dumpToString(this,"this",1));
		
		// Create addon nodes and addon option nodes
/*		for (i = 0, n = all.length; i < n; i++) {
			Core.settings.createAddonNodes(all[i]);
			Core.settings.createAddonSettings(all[i]);
		}
*/		
	} catch (e) {
		log.error(e);
	}
};