// Name: PRS+ Settings
// Description: PRS+ Settings engine
// Author: kartu
//
// History:
//	2010-03-14 kartu - Initial version, refactored from Utils

Core.settings = {};

// Creates entry under "Games & Utilities" corresponding to the addon.
// Arguments:
//	addon - addon variable
Core.settings.createAddonNodes = function(addon) {
	if(addon && addon.activate) {
		var kind = Core.ui.NodeKinds.getIcon(addon.icon);
		var title = addon.hasOwnProperty("title") ? addon.title : addon.name;
		var node = Core.ui.createContainerNode({
				parent: Core.ui.nodes.gamesAndUtils,
				title: title,
				kind: kind,
				comment: addon.comment ? addon.comment : ""
		});
		node.enter = function() {
			addon.activate();
		};
		if(!Core.ui.nodes.gamesAndUtils.hasOwnProperty("nodes")) {
			Core.ui.nodes.gamesAndUtils.nodes = [];
		}
		Core.ui.nodes.gamesAndUtils.nodes.push(node);
	}
};


// Returns option title for given addon/option definition
//
var core_setting_translateValue = function(optionDef, value) {
	if(optionDef.hasOwnProperty("valueTitles") && optionDef.valueTitles.hasOwnProperty(value)) {
		return optionDef.valueTitles[value];
	}
	return value;
};
// Returns closure that retrieves given value from a given option object
//
var core_setting_getValueTranslator = function(options, optionDef) {
	return function() {
		return core_setting_translateValue(optionDef, options[optionDef.name]);
	};
};

// Creates "value" node (used in settings).
// Arguments:
//	arg, in addition to fields from createContainerNode, can have the following fields
//		optionDef - option definition
//		value - option value
//		object - target object, to set option to (typically addon.options)
//		addon - addon object
//
var core_setting_createValueNode = function(arg) {
	var node = Core.ui.createContainerNode(arg);
	node.enter = function() {
		try {
			var optionDef = arg.optionDef;
			var propertyName = optionDef.name;

			var oldValue = arg.object[propertyName];
			arg.object[propertyName] = arg.value;
			
			if(arg.addon && arg.addon.onSettingsChanged) {
				arg.addon.onSettingsChanged(propertyName, oldValue, arg.value, arg.object);
			}
	
			// Save changes
			Core.settings.saveOptions(arg.addon);
			
			// Goto parent node
			this.parent.parent.enter(kbook.model);
		} catch (e) {
			log.error("in valuenode.enter for option " + arg.optionDef.name + ": " + e);
		}
	};
	return node;
};

// Creates value nodes (used in addon settings) for given option definition and addon.
//  
var core_setting_createValueNodes = function(parent, optionDef, addon, options) {
	try {
		var values = optionDef.values;
		for (var i = 0, n = values.length; i < n; i++) {
			var v = values[i];
			var node = core_setting_createValueNode({
				parent: parent,
				title: core_setting_translateValue(optionDef, v),
				optionDef: optionDef,
				value: v,
				object: options,
				addon: addon,
				kind: Core.ui.NodeKinds.CROSSED_BOX,
				comment: ""
			});
			if(v === options[optionDef.name]) {
				node.selected = true;
			}
			parent.nodes.push(node);
		}
	} catch (e) {
		log.error("in core_setting_createValueNodes for addon " + addon.name + " option " + optionDef.name + ": " + e);
	}
};


var core_settings_doCreateAddonSettings;
var lazyCreateSettings = function(parent, optionDefs, addon) {
	Core.hook.hookBefore(parent, "enter", function(args, oldFunc) {
		if(!this.hasOwnProperty("prspInitialized")) {
			this.prspInitialized = true;
			core_settings_doCreateAddonSettings(parent, optionDefs, addon, true);
		}
	});
};

var core_settings_doCreateSingleSetting;
core_settings_doCreateAddonSettings = function(parent, optionDefs, addon, ignoreLazy) {
	if(ignoreLazy !== true) {
		lazyCreateSettings(parent, optionDefs, addon);
		return;
	}

	for (var i = 0, n = optionDefs.length; i < n; i++) {
		core_settings_doCreateSingleSetting(parent, optionDefs[i], addon);
	}
};

// Recursively creates setting nodes
//
core_settings_doCreateSingleSetting = function(parent, optionDef, addon) {
	var node;
	if(optionDef.hasOwnProperty("groupTitle")) {
		// Group
		node = Core.ui.createContainerNode({
				parent: parent,
				title: optionDef.groupTitle,
				comment: optionDef.groupComment ? optionDef.groupComment : "",
				kind: Core.ui.NodeKinds.getIcon(optionDef.groupIcon)
		});
		parent.nodes.push(node);

		core_settings_doCreateAddonSettings(node, optionDef.optionDefs, addon);
	} else {
		// If target is defined, use it, else create "options"
		var options;
		if(optionDef.hasOwnProperty("target")) {
			options = addon.options[optionDef.target];
		} else {
			options = addon.options;
		}

		// Create parent node
		node = Core.ui.createContainerNode({
				parent: parent,
				title: optionDef.title,
				kind: Core.ui.NodeKinds.getIcon(optionDef.icon)
		});
		parent.nodes.push(node);
		parent = node;

		parent._mycomment = core_setting_getValueTranslator(options, optionDef);
		core_setting_createValueNodes(parent, optionDef, addon, options);
	}
};

// Creates entry under "Settings => Addon Settings" corresponding to the addon.
// Arguments:
//	addon - addon variable
Core.settings.createAddonSettings = function(addon) {
	try {
		// Addon
		if(addon && addon.optionDefs && addon.optionDefs.length > 0) {
			var optionDefs = addon.optionDefs;
			var settingsNode = Core.ui.nodes.addonSettingsNode;

			// Settings node for this addon
			var title = addon.hasOwnProperty("title") ? addon.title : addon.name;
			var thisSettingsNode = Core.ui.createContainerNode({
					parent: settingsNode,
					title: title,
					kind: Core.ui.NodeKinds.getIcon(addon.icon),
					comment: addon.comment ? addon.comment : ""
			});
			settingsNode.nodes.push(thisSettingsNode);

			core_settings_doCreateAddonSettings(thisSettingsNode, optionDefs, addon);			
		}
	} catch (e) {
		log.error("failed to create addon settings: " + addon.name + " " + e);
	}
};



// Saves addon's non-default options as JSON object.
// WARNING: no escaping is done!
// Arguments:
//	addon - addon who's settings must be saved
//
Core.settings.saveOptions = function(addon) {
	try {
		FileSystem.ensureDirectory(Core.config.settingsRoot);
		var od;
		var name;
		
		// Find out which options need to be saved (do not save devault values)
		var options = addon.options;
		var optionDefs = addon.optionDefs;
		var optionDefsToSave = []; // option defs
		var gotSomethingToSave = false;
		for (var i = 0; i < optionDefs.length; i++) {
			od = optionDefs[i];
			
			// Add group suboptions
			if(od.hasOwnProperty("groupTitle")) {
				optionDefs = optionDefs.concat(od.optionDefs);
				continue;
			}

			name = od.name;
			var defValue = od.defaultValue;
			var target = od.hasOwnProperty("target") ? od.target : false;

			if(target) {
				if(options.hasOwnProperty(target) && options[target].hasOwnProperty(name) && options[target][name] !== defValue) {
					if (!optionDefsToSave.hasOwnProperty(target)) {
						optionDefsToSave[target] = {
							isGroup: true,
							target: target,
							optionDefs: []
						};
					}
					gotSomethingToSave = true;
					optionDefsToSave[target].optionDefs.push(od);
				}
			} else if(options.hasOwnProperty(name) && options[name] !== defValue) {
				gotSomethingToSave = true;
				optionDefsToSave.push(od);
			}
		}
		
		// If there is anything to save - save, if not, delete settings file
		var settingsFile = Core.config.settingsRoot + addon.name + ".config";
		if (gotSomethingToSave) {
			var stream = new Stream.File(settingsFile, 1, 0);
			try {
				var globalStr = "";
				for (var ii in optionDefsToSave) {
					od = optionDefsToSave[ii];
					name = od.name;
					
					var str = null;
					if (od.isGroup) {
						str = "\t\"" + od.target + "\": {\n"; 
						for (var j = 0, m = od.optionDefs.length; j < m; j++) {
							var od2 = od.optionDefs[j];
							str = str +  "\t\t\"" + od2.name + "\":\"" + options[od2.target][od2.name] + "\",\n";
						}
						// remove trailing ,\n
						str = str.substring(0, str.length -2);
						str = str + "\n\t}";
					} else if (od.hasOwnProperty("name")) {
						str = "\t\"" + name + "\":\"" + options[name] + "\"";
					}
					globalStr = globalStr + str + ",\n";
				}
				// remove trailing ,\n
				globalStr = globalStr.substring(0, globalStr.length - 2);
				stream.writeLine("return {\n" + globalStr + "\n}");
			} finally {
				stream.close();
			}
		} else {
			// Remove settings file, since all settings have default values
			FileSystem.deleteFile(settingsFile);
		}
	} catch (e) {
		log.error("saving options for addon: " + addon.name);
	}
};

// Loads addon's options, using default option values, if settings file or value is not present.
//
Core.settings.loadOptions = function(addon) {
	try {
		if(addon.optionDefs) {
			// load settings from settings file
			var options;
			try {
				var settingsFile = Core.config.settingsRoot + addon.name + ".config";
				options = Core.system.callScript(settingsFile, log);
			} catch (e0) {
				log.warn("Failed loading settings file for addon " + addon.name + ": " + e0);
			}
			if(!options) {
				options = {};
			}
			
			var optionDefs = addon.optionDefs;
			for (var i = 0; i < optionDefs.length; i++) {
				var od = optionDefs[i];
				if(od.hasOwnProperty("groupTitle")) {
					optionDefs = optionDefs.concat(od.optionDefs);
				} else {
					if(od.hasOwnProperty("target")) {
						if(!options.hasOwnProperty(od.target)) {
							options[od.target] = {};
						}
						
						if(!options[od.target].hasOwnProperty(od.name)) {
							options[od.target][od.name] = od.defaultValue;
						}
					} else {
						if(!options.hasOwnProperty(od.name)) {
							options[od.name] = od.defaultValue;
						}
					}
				}
			}
			
			addon.options = options;
		}
	} catch (e) {
		log.error("Loading settings of " + addon.name);
	}
};
