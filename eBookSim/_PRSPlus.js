// Name: _PRSPlus
// Description: PRS+ mapper for compiled Core-Functions to sandboxed js
// Author: Mark Nord
//
// History:
//	2010-10-03 Mark Nord - initial release
// 	2011-03-20 Mark Nord - fix for Core.String => Core.text

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
	compat: {hasNumericButtons: true}	// also sets startup-skin
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
	debug:{}
};

// Definitions needed for the Sim
kbook = { autoRunRoot :{},
          simEnviro : true
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

// silly 1:1  assignment

_Core.hook.hookAfter = getSoValue(theRoot,'Core.hook.hookAfter');
_Core.hook.hookBefore = getSoValue(theRoot,'Core.hook.hookBefore');
_Core.hook.hook = getSoValue(theRoot,'Core.hook.hook');

_Core.system.cloneObj = getSoValue(theRoot,'Core.system.cloneObj');
_Core.system.compile = prsp.compile;
_Core.system.setSoValue = prsp.setSoValue;
_Core.system.getSoValue = getSoValue;
_Core.system.rootObj = getSoValue(theRoot,'Core.system.rootObj');

_Core.text.endsWith = getSoValue(theRoot,'Core.text.endsWith');
_Core.text.startsWith = getSoValue(theRoot,'Core.text.startsWith');
_Core.text.compareStrings = getSoValue(theRoot,'Core.text.compareStrings');

_Core.io.copyFile = getSoValue(theRoot,'Core.io.copyFile');
_Core.io.setFileContent = getSoValue(theRoot,'Core.io.setFileContent');
_Core.io.getFileContent = getSoValue(theRoot,'Core.io.getFileContent');

_Core.shell.umount = getSoValue(theRoot,'Core.shell.umount');
_Core.shell.mount = getSoValue(theRoot,'Core.shell.mount');
_Core.shell.exec = getSoValue(theRoot,'Core.shell.exec');
_Core.shell.SD_MOUNT_PATH = getSoValue(theRoot,'Core.shell.SD_MOUNT_PATH');
_Core.shell.MS_MOUNT_PATH = getSoValue(theRoot,'Core.shell.MS_MOUNT_PATH');
_Core.shell.MOUNT_PATH = getSoValue(theRoot,'Core.shell.MOUNT_PATH');
_Core.shell.MS = 1;
_Core.shell.SD = 0;

_Core.debug.dump = getSoValue(theRoot,'Core.debug.dump');

_Core.log.error = getSoValue(theRoot,'Core.log.error');
_Core.log.warn = getSoValue(theRoot,'Core.log.warn');
_Core.log.info = getSoValue(theRoot,'Core.log.info');
_Core.log.trace = getSoValue(theRoot,'Core.log.trace');
_Core.log.setLevel = getSoValue(theRoot,'Core.log.setLevel');
_Core.log.log = getSoValue(theRoot,'Core.log.log ');
_Core.log.getLogger = getSoValue(theRoot,'Core.log.getLogger');
_Core.log.createLogger = getSoValue(theRoot,'Core.log.createLogger');
_Core.log.loggers = getSoValue(theRoot,'Core.log.loggers');

//_Core.actions = getSoValue(theRoot,'_Core.actions');

/*
_Core.config.settingsRoot = getSoValue(theRoot,'Core.config.settingsRoot');
_Core.config.logFile = getSoValue(theRoot,'Core.config.logFile');
_Core.config.defaultLogLevel => getSoValue(theRoot,'Core.config.defaultLogLevel');
_Core.config.coreFile = getSoValue(theRoot,'Core.config.coreFile');
_Core.config.coreRoot = getSoValue(theRoot,'Core.config.coreRoot');
_Core.config.addonRoot = getSoValue(theRoot,'Core.config.addonRoot');
_Core.config.root = getSoValue(theRoot,'Core.config.root');
*/

/* First idea for a automatic mapper, but can't figure out the dependencies between sandboxed and "compiled" functions
should run in compiled context ?
I gues Fskin.function and Fskin.script hold the answers  */
/*
var sandboxing = function (o, root, depth) {
	var typeofo = typeof o;
	if (typeofo == "string" || typeofo == "boolean" || typeofo == "number") {
		root.sandbox[o.id] = o;
		return;
	}
	// Default depth is 1
	if (typeof depth == "undefined") {
		depth = 1;
	}
	// we show prefix if depth is 
	if (typeofo == "undefined") {
		return ;
	}
	if (o === null) {
		return ;
	}
	if (typeofo == "function") {
		root.sandbox[o.id] = o;
		return ;
	}
	if (o.constructor == Array) {
		root.sandbox[o.id] = o;
		if (depth > 0) {
			for (var i = 0, n = o.length; i < n; i++) {
				this.sandboxing(o[i], root.sandbox[o.id], depth - 1);
			}
		}
		return;
	}
	if (typeofo != "object") {
		root.sandbox[o.id] = o 
		return;
	}
	
	// if depth is less than 1, return just "an object" string
	if (depth < 1) {
		root.sandbox[o.id] = o;
		return;
	}

	// at this point, o is not null, and is an object
	var hasProps = false;
	for (var prop in o) {
		hasProps = true;
		var oprop = o[prop];
		try {
			this.sandboxing(oprop, root.sandbox[o.id], depth - 1);
		} catch (ee) {
		}
	}
	if (!hasProps) {
		return;
	}
	return 'done';
};			/**/

/* something to play with; Output is routed to the simulators trace-window
var dump = getSoValue(theRoot,'Core.debug.dumpToString');
var sb = getSoValue(theRoot,'sandbox._Core.sandbox');
target.bubble('tracelog',dump(sb,'sandbox.'),'tR.SB',2);
target.bubble('tracelog',_Core.debug.dumpToString(_Core,'_Core.',1));
*/


