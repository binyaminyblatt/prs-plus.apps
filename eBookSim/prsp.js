// Description: PRS+ bootstrap script
// Author: kartu
//
// History:
//	2010-06-26 kartu - Initial version, based on 505
//	2011-02-26 kartu - Added compatPath & getFileContent params to bootstrap call
//	2011-02-27 kartu - Refactored parameters into PARAMS object
//	2011-04-01 Mark Nord - adapted for Sim

//if (!FileSystem.getFileInfo(System.applyEnvironment("[prspSafeModeFile]"))) {
	kbook = {model:{}};
	var bootLog;
	var path, code, f, endsWith, listFiles, getFileContent, getFileContentEx, userConfig, loadCore, loadAddons, compatPath;
	/* core intentionaly not defined as var !! */
	var tmp = function() { 
		var config = {
        		/* root is passed as param "root" in the Sim
        		var root = ".../FSK Test/eBookSim/";	*/
			root: root,
			model: "Sim",
			defaultLogLevel: "none",
			logFile: root + "PRSPlus.log",
			corePath: root + "core/" ,
			addonRoot: root + "addons/",
			settingsPath: root + "settings/",
			publicPath: root + "database/system/PRSPlus/", 
			userCSSPath: root + "database/system/PRSPlus/epub/", 
			userDictionaryPath: root + "database/system/PRSPlus/dictionary/", 
			userGamesSavePath :  root + "GamesSave/", 
			coreFile: root + "core/",
			addonsFile: root + "addons/addons.js",
			compat:{hasNumericButtons:true}
		};
		
		// Bootstrap logger
		//
		bootLog = function(msg) {
			if (config.defaultLogLevel === "none") {
				return;
			}
			var s = new Stream.File(config.logFile, 3);
			try {
				s.seek(s.bytesAvailable);
				s.writeLine(msg);
			} finally {
				s.close();
			}
		};

		// Checks if string ends with given postfix
		//		
		endsWith = function(str, postfix) {
			return str.lastIndexOf(postfix) === str.length - postfix.length;
		};
		
		// Returns array of files with given extension sorted by name
		//
		listFiles = function(path, ext) {
			var iterator, items, item, p;
			items = [];
			try {
				iterator = new FileSystem.Iterator(path);
				try {
					while (item = iterator.getNext()) {
						if (item.type == "file") {
							p = item.path;
							if (ext === undefined || endsWith(p, ext)) {
								items.push(p);
							}
						}
					}
					items.sort();
				} finally {
					iterator.close();
				}
			} catch (e) {
				bootLog("Error in list files, listing folder " + path + ": " + e);
			}
			return items;
		};
		
		// Loads file contents
		//
		getFileContent = function(path) {
			var f, result;
			try {
				f = new Stream.File(path, 2);
				try {
					result = f.toString();
				} finally {
					f.close();
				}
				return result;
			} catch (e) {
				bootLog("Error reading file " + path + ": " + e);
			}
			return "";
		};
		
		// Loads file, or, if path points to a folder, combined content of the files in folder, with extention <ext>
		//
		getFileContentEx = function(path, ext) {
			var info, files, result, i, n;
			info = FileSystem.getFileInfo(path);
			if (info && info.type == "directory") {
				files = listFiles(path, ext);
				result = "";
				for (i = 0, n = files.length; i < n; i++) {
					result = result + getFileContent(path + files[i]);
				}
				return result;
			} 
			return getFileContent(path);
		};

		// Load user config
		userConfig = root + "user.config";
//			bootLog("userConfig= " + userConfig);
		
		
		if (FileSystem.getFileInfo(userConfig)) {
			f = new Function("config", getFileContent(userConfig));
			f(config);
		}
//			bootLog("userConfig loaded");

		Core = {config: config};

//			bootLog("inital Core def");

		// Init function, called by model specific bootstrap 
		loadCore = function() {
			try {
				// Call core (there seems to be 100k limitation on javascript size, that's why it's split from addons)
				var coreCode, core;
				coreCode = getFileContentEx(config.coreFile, ".js");
				core = new Function("Core", coreCode);
				core(Core);
			} catch (e) {
				bootLog("Failed to load core "  + e);
				bootLog("core file was " + config.coreFile);
			}
		};
		
		/*/ Load addons, called by model specific bootstrap
		loadAddons = function() {
			var addonCode, log, addons;
			// Call addons
			try {
				addonCode = getFileContentEx(config.addonsFile, ".js");
				log = Core.log.getLogger("addons");
				addons = new Function("Core,log,tmp", addonCode);
				addons(Core, log, undefined);
			} catch (e) {
				bootLog("Failed to load addons " + e);
			}
		}; */

		compatPath = Core.config.corePath + "compat/";
		
		// Read compatibility configuration
		try {
			path = compatPath + Core.config.model + "_config.js";
			code = getFileContent(path);
			f = new Function("", code);
			Core.config.compat = f();
		} catch (e) {
			bootLog("FATAL: failed to load " + Core.config.model + " compat file" + e); 
		}
		
		// Call model specific bootstrap
		try {
			path = compatPath +  Core.config.model + "_bootstrap.js";
			code = getFileContent(path);
			f = new Function("PARAMS", code);
			f({
				bootLog: bootLog,
				Core: Core,
				loadCore: loadCore, 
			//	loadAddons: loadAddons, 
				getFileContent: getFileContent, 
				compatPath: compatPath
			});
		} catch (e1) {
			bootLog("FATAL: failed to call bootstrap " + e1); 
		}
	/*	bootLog(Core.debug.dumpToString(Core,'Core.',2)); 	
		bootLog(Core.debug.dumpToString(this,'this.',1)); 	*/
	};
	try {
		tmp();
		return this; // passing "this" as result as Core.system.rootObj isn't direct accessible					
	} catch (e) {
		bootLog("Error initializing: " + e);
} 
