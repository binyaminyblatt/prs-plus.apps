// Name: xDictionary by Clemenseken & Lisak, adapted for PRS+
// Description: Temporary solution, until PRS+ version is developed
// Author: Clemenseken, Lisak
//
// History:
//	2010-05-01 kartu - Adapted for PRS+ from http://www.mobileread.com/forums/attachment.php?attachmentid=13182&d=1212445222

tmp = function() {
    var endsWith = Core.string.endsWith;
    var DISABLED = "disabled";
    var log = Core.log.getLogger("DictionaryCL");

    var xDictionaryCL = {
        name: "xDictionaryCL",
        title: "TITLE",
        icon: "ABC",
        activate: function() {
            Core.log.getLogger("DictionaryCL").trace('-->');
            var xdictOption = xDictionaryCL.options.xdictionary;
            if (xdictOption === DISABLED) {
                Core.ui.showMsg(["WARN_DICT_DISABLED"]);
            } else {
                var xdictPath = Core.config.userDictionaryPath + xdictOption;

                if (FileSystem.getFileInfo(xdictPath)) {
                    var rootPath = Core.config.addonsPath + "xDictionaryCL/";
                    var params = {
                        log: Core.log.getLogger("DictionaryCL"),
                        rootPath: rootPath,
                        Core: Core,
                        xdictPath: xdictPath,
                        resultSize: xDictionaryCL.options.resultSize,
                        maxSmartZoom: xDictionaryCL.options.maxSmartZoom
                    };
                    kbook.autoRunRoot.xdictionaryParams = params;
                    kbook.autoRunRoot.path = rootPath + "kb.xml";
                    kbook.autoRunRoot.enterIf(kbook.model);
                } else {
                    Core.ui.showMsg(["WARN_DICT_DOESNT_EXIST"]);
                }
            }
        },
        actions: [{
            name: "launchxDictionary",
            title: "ACTION_DICTIONARY",
            group: "Utils",
            icon: "ABC",
            action: function() {
                xDictionaryCL.activate();
            }
}],
            optionDefs: [
			{
			    name: "xdictionary",
			    title: "OPTION_DICTIONARY",
			    icon: "ABC",
			    defaultValue: DISABLED,
			    values: [DISABLED],
			    valueTitles: {
			        disabled: "VALUE_DISABLED"
			    }
			},
			{
			    name: "resultSize",
			    title: 'Results size',  //@@@
			    icon: "ABC",
			    defaultValue: 25,
			    values: [15, 20, 25, 30, 35],
			    valueTitles: {
			        15: '15', 20: '20', 25: '25', 30: '30', 35: '35'
			    }
			},
			{
			    name: "maxSmartZoom",
			    title: 'Max smart zoom',  //@@@
			    icon: "ABC",
			    defaultValue: 20,
			    values: [0, 10, 20, 25, 40, 50],
			    valueTitles: {
			        0: 'Disabled', 10: '10 %', 20: '20 %', 25: '25 %', 40: '40 %', 50: '50 %'   //@@@
			    }
			}
		],
            /**
            * @constructor
            */
            onPreInit: function() {
                this.root = Core.config.userDictionaryPath;

                // Init epubCssFile values
                if (!FileSystem.getFileInfo(this.root)) {
                    // xdictionary folder doesn't exist, nothing to do
                    return;
                }
                var iterator = new FileSystem.Iterator(this.root);
                try {
                    var item, path;
                    var od = this.optionDefs[0];
                    while (item = iterator.getNext()) {
                        if (item.type == "file") {
                            path = item.path;
                            if (endsWith(path, ".dic")) {
                                od.values.push(path);
                                od.valueTitles[path] = path;
                            }
                        }
                    }
                } finally {
                    iterator.close();
                }
            }
        };
        Core.addAddon(xDictionaryCL);
    };
try {
	tmp();
} catch (e) {
	// log from Core
	log.error("in xDictionary by Clementseken & Lisak", e);
}