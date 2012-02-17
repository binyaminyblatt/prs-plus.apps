// Name: _PRSPlus
// Description: PRS+ mapper for compiled Core-Functions to sandboxed js
// Author: Mark Nord
//
// History:
//	2010-10-03 Mark Nord - initial release
// 	2011-03-20 Mark Nord - fix for Core.String => Core.text
//	2011-04-01 Mark Nord - adjustments for lang and compat
//	2011-09-24 Mark Nord - copied Core.lang source into "sandbox" _Core.lang

// Started at, in milliseconds
var startedAt = (new Date()).getTime();

/* root is passed as param "root" in the Sim
var root = ".../FSK Test/eBookSim/";	*/

var config = {
	root: root,
	addonRoot: root + "addons/",
	coreRoot: root + "core/",
	//coreFile: this.coreRoot + "core_all.js",
	coreFile: root + "core/core_all.js",
	defaultLogLevel: "none",
	logFile: root + "PRSPlus.log",
	settingsRoot: root + "settings/",
	userGamesSavePath :  root + "GamesSave/",
	compat: {hasNumericButtons: true,
		 NodeKinds:{}}
};


/* Mark Nord: intentionally "_Core" NOT defined as var to have _Core as <global> mapper-object for Core
   	      don't know why, but this does the trick */
_Core = {
	config: config,
	utils: [],
	actions: [],
	addons: [],
	hook: {},
	text: {},
	shell: {},
	system:{},
	io:{},
	log:{},
	debug:{},
	lang:{},
};

// Definitions needed for the Sim
kbook = { autoRunRoot :{},
          simEnviro : true,
          model : {}
	}; 

kbook.autoRunRoot.exitIf = function (model) {
	model.bubble("setView","Menu");
}

// selfmade getSoValue function
var getInstance = prsp.compile('propName',"var s,v,i;s = propName.split('.');v = s.shift();i = this;while (v) {i = i[v];v = s.shift();}return i;");
var getSoValue = function (obj, propName) {
	return getInstance.call(obj, propName); 
};

// direct copy from core__debug.js, as compiled functions can't see sandboxed and vice versa
_Core.debug.dumpToString = function (o, prefix, depth) {
	var typeofo = typeof o;
	if (typeofo == "string" || typeofo == "boolean" || typeofo == "number") {
		return "'" + o + "'(" + typeofo + ")";
	}
	// Default depth is 1
	if (typeof depth == "undefined") {
		depth = 1;
	}
	// we show prefix if depth is 
	if (typeofo == "undefined") {
		return "undefined";
	}
	if (o === null) {
		return "null";
	}
	if (typeofo == "function") {
		return "a function";
	}
	if (o.constructor == Array) {
		var s = "Array(" + o.length + ")";
		if (depth > 0) {
			s += " dumping\n";
			for (var i = 0, n = o.length; i < n; i++) {
				s += prefix + "[" + i + "] => " + this.dumpToString(o[i], prefix + "\t", depth - 1) + "\n";
			}
		}
		// remove trailing "\n"
		if (s.charAt(s.length - 1) == "\n") {
			s = s.substring(0, s.length - 1);
		}
		return s;
	}
	if (typeofo != "object") {
		return "unknown entitiy of type (" + (typeof o) + ")";
	}
	
	// if depth is less than 1, return just "an object" string
	if (depth < 1) {
		return "an object";
	}
	if (typeof prefix == "undefined") {
		prefix = "";
	}

	// at this point, o is not null, and is an object
	var str = "dumping\n";
	var hasProps = false;
	for (var prop in o) {
		hasProps = true;
		var oprop = o[prop];
		try {
			str += prefix + prop + " => " + this.dumpToString(oprop, prefix + "\t", depth - 1) + "\n";
		} catch (ee) {
			str += prefix + prop + " => " + "failed to tostring: " + ee + "\n";
		}
	}
	if (!hasProps) {
		return "an object with no properties";
	}
	// remove trailing "\n"
	if (str.charAt(str.length - 1) == "\n") {
		str = str.substring(0, str.length - 1);
	}
	return str;
};

//target.bubble('tracelog','getsoVal(theRoot,Core)= '+ getSoValue(theRoot,'Core'));

// silly 1:1  assignment

_Core.system.callScript = function (path, log) {
			try {
				if (FileSystem.getFileInfo(path)) {
					var f = new Stream.File(path);
					try {
						var fn = new Function("_Core", f.toString(), path, 1);
						var result = fn(_Core);
						delete fn;
						return result;
					} finally {
						f.close();
					}
				}
			} catch (e) {
				var msg = "Error calling " + path + ": " + e;
				if (log) {
					log.error(msg);
				}
				throw msg;

			}
		}
_Core.system.cloneObj = getSoValue(theRoot,'Core.system.cloneObj');
_Core.system.compile = prsp.compile;
_Core.system.setSoValue = prsp.setSoValue;
_Core.system.getSoValue = getSoValue;
_Core.system.getFastSoValue =  getSoValue(theRoot,'Core.system.getFastSoValue');
_Core.system.rootObj = getSoValue(theRoot,'Core.system.rootObj');
_Core.system.doBubble = getSoValue(theRoot,'Core.system.doBubble');
//target.bubble('tracelog','done system');

_Core.text.trim = getSoValue(theRoot,'Core.text.trim');
_Core.text.endsWith = getSoValue(theRoot,'Core.text.endsWith');
_Core.text.startsWith = getSoValue(theRoot,'Core.text.startsWith');
_Core.text.compareStrings = getSoValue(theRoot,'Core.text.compareStrings');
//target.bubble('tracelog','done text');

_Core.io.getFileSize = getSoValue(theRoot,'Core.io.getFileSize');
_Core.io.moveFile = getSoValue(theRoot,'Core.io.moveFile');
_Core.io.copyFile = getSoValue(theRoot,'Core.io.copyFile');
_Core.io.deleteFile = getSoValue(theRoot,'Core.io.deleteFile');
_Core.io.setFileContent = getSoValue(theRoot,'Core.io.setFileContent');
_Core.io.getFileContent = getSoValue(theRoot,'Core.io.getFileContent');
_Core.io.listFiles = getSoValue(theRoot,'Core.io.listFiles');
//target.bubble('tracelog','done io');

_Core.shell.umount = getSoValue(theRoot,'Core.shell.umount');
_Core.shell.mount = getSoValue(theRoot,'Core.shell.mount');
_Core.shell.exec = getSoValue(theRoot,'Core.shell.exec');
_Core.shell.SD_MOUNT_PATH = getSoValue(theRoot,'Core.shell.SD_MOUNT_PATH');
_Core.shell.MS_MOUNT_PATH = getSoValue(theRoot,'Core.shell.MS_MOUNT_PATH');
_Core.shell.MOUNT_PATH = getSoValue(theRoot,'Core.shell.MOUNT_PATH');
_Core.shell.MS = 1;
_Core.shell.SD = 0;
//target.bubble('tracelog','done shell');

_Core.debug.dump = getSoValue(theRoot,'Core.debug.dump');
//target.bubble('tracelog','done debug');

_Core.log.error = getSoValue(theRoot,'Core.log.error');
_Core.log.warn = getSoValue(theRoot,'Core.log.warn');
_Core.log.info = getSoValue(theRoot,'Core.log.info');
_Core.log.trace = getSoValue(theRoot,'Core.log.trace');
_Core.log.setLevel = getSoValue(theRoot,'Core.log.setLevel');
_Core.log.log = getSoValue(theRoot,'Core.log.log ');
_Core.log.getLogger = getSoValue(theRoot,'Core.log.getLogger');
_Core.log.createLogger = getSoValue(theRoot,'Core.log.createLogger');
_Core.log.loggers = getSoValue(theRoot,'Core.log.loggers');
//target.bubble('tracelog','done log');

/* calling _Core.lang.getLocalizer throws an error
_Core.lang.LX  = getSoValue(theRoot,'Core.lang.LX');
_Core.lang.getLocalizer  = getSoValue(theRoot,'Core.lang.getLocalizer');
_Core.lang.getStrings  = getSoValue(theRoot,'Core.lang.getStrings');
*/


tmp = function() {
	var _strings, _X; // whatever is loaded from lang/<language>.js file
	var isDebug, createLocalizer, x_func, initXFunc, getXFunc;

	createLocalizer = function(str, prefix) {
		var f;
		f = function(key) {
			if (str.hasOwnProperty(key)) {
				try {
					return str[key];
				} catch (ignore) {
				}
			}
			if (isDebug) {
				log.trace("Missing translation " + prefix + key);
			}
			return key;
		};
		return f;
	};

	initXFunc = function (lang) {
		x_func = getXFunc (lang);
	};
	
	// Initializes language specific "x of something" function
	getXFunc = function (lang) {
		var result;
		switch (lang) {
			case "cs": // Czech
				result = function (s, n) {
					if (n > 4) {
						return n + " " + s[0];
					}
					if (n >= 2 && n <= 4) {
						return n + " " + s[1];
					}
					if (n === 1) {
						return s[2];
					}
					return s[3];
				};
				break;
			case "ka": // Georgian
				result = function (s, n) {
					if (n > 0) {
						return n + " " + s[0];
					}
					return s[1];
				};
				break;
			case "ru": // fallthrough // Russian
			case "ua": // Ukrainian
				var _x_cache = [];
				var _x_cases = [2, 0, 1, 1, 1, 2];
				result = function (s, n) {
					if (!n) {
						return s[3];
					}
					if (!_x_cache[n]) {
						_x_cache[n] = (n % 100 > 4 && n % 100 < 20) ? 2 : _x_cases[Math.min(n % 10, 5)];
					}
					return n + " " + s[_x_cache[n]];
				};
				break;
			default:
				 result = function (s, n) {
					if (n > 1) {
						return n + " " + s[0];
					}
					if (n === 1) {
						return s[1];
					}
					return s[2];
				};
				break;
		}
		return result;
	};
	
	_Core.lang = {
		/**
		* Should be called prior to getLocalizer calls
		* 
		* @param langFile - full path to the actual language js file (e.g. en.js)
		*/
		init: function (langFile) {
			try {
				isDebug = false; //_Core.log.isDebugEnabled();
				try {
					// translation strings
					_strings = _Core.system.callScript(langFile, log);
					
					// translation strings, passed to functions
					_X = _strings.X;
					
					// Extract lang name
					var idx = langFile.lastIndexOf("/");
					var len = langFile.length;
					
					this.lang = langFile.substring(idx + 1, len -3);
					initXFunc(this.lang); // init language specific "x books" function
				} catch (e0) {
					log.error("Failed to load strings from file " + langFile, e0);
				}
				
				coreL = this.getLocalizer("Core"); // defined in core
				this.L = coreL;
			} catch (e) {
				log.error("in Core.lang.init: " + e);
			}
		},

		getStrings: function (category, strings) {
			try {
				if (strings === undefined) {
					strings = _strings;
				}

				if (strings !== undefined && strings[category] !== undefined) {
					return strings[category];
				} else {
					log.warn("Cannot find strings for category: " + category);
					return {};
				}
			} catch (e) {
				log.error("in getStrings: " + e);
			}
		},

		getLocalizer: function (category, strings) {
			return createLocalizer(this.getStrings(category, strings), category + ".");
		},
		
		LX: function (category, param) {
			try {
				return x_func(_X[category], param);
			} catch (e) {
				return "error: " + e;
			}
		},
		
		getXFunc: getXFunc
	};
};

try {
	tmp();
} catch (e) {
	target.bubble("Error initializing _core-lang"+ e);
}
//target.bubble('tracelog','done lang');


_Core.config.compat.NodeKinds = getSoValue(theRoot,'Core.config.compat.NodeKinds');
_Core.config.compat.NodeKinds.getIcon = getSoValue(theRoot,'Core.config.compat.NodeKinds.getIcon');

/* something to play with; Output is routed to the simulators trace-window
var dump = getSoValue(theRoot,'Core.debug.dumpToString');
var sb = getSoValue(theRoot,'sandbox._Core.sandbox');
target.bubble('tracelog',dump(sb,'sandbox.'),'tR.SB',2);
target.bubble('tracelog',_Core.debug.dumpToString(_Core,'_Core.',1));
*/

var userConfig = _Core.config.root + "user.config";
if (FileSystem.getFileInfo(userConfig)) {
      	try {	
//      target.bubble('tracelog',_Core.debug.dumpToString(_Core.config,'_Core.config.',2))
      		var f = new Function('config', _Core.io.getFileContent(userConfig));
	      	f(_Core.config);
	      	delete f;

	 } catch(e) {target.bubble('tracelog','error running user.config')}
//	 target.bubble('tracelog',_Core.debug.dumpToString(_Core.config,'_Core.config.',2))
      }

// initialize _Core.lang
try {
	var currentLang, langFile;
	currentLang = kbook.model.language;

	if (currentLang === undefined) {
		currentLang = "en";
	}
	// Load PRS+ strings
	langFile = _Core.config.coreRoot + "lang/" +  currentLang + ".js";
	//target.bubble('tracelog','langfile '+langFile);
	_Core.lang.init(langFile);
	//target.bubble('tracelog','_Core.lang.init done');
 } catch(e) {target.bubble('tracelog','error in _Core.lang.init')}
		 