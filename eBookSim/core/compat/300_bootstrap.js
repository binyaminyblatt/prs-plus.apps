// Name: 300
// Description: Sony PRS-300 bootstrap code
//	Receives variables: bootLog, Core, loadAddons, loadCore
//		must call loadAddons, loadCore and Core.init at appropriate times
//
// History:
//	2010-09-02 kartu - Initial version
//	2010-09-07 kartu - Added Italian translation by Samhain
//	2010-11-27 kartu - Added Georgian translation by raverfas
//	2010-11-28 kartu - First digit is ignored, if it is zero, when opening "goto" dialog
//	2010-11-29 kartu - Renamed ga => ka
//	2010-11-30 kartu - Fixed #14 " * by author/title sorting doesn't work for non latin chars"

var tmp = function() {
	var oldSetLocale, localize;
	//-----------------------------------------------------------------------------------------------------
	// Localization related code is model specific.  
	// Replacing default  "choose language" UI
	//-----------------------------------------------------------------------------------------------------
	localize = function(Core) {
		try {
			var i, n, currentLang, settingsNode, langNode, languages, langNames, enter, node, prspLanguages, langFile;
			currentLang = kbook.model.language;
	
			settingsNode = kbook.root.nodes[6];
			languages = ["en", "de", "fr", "ka", "it", "nl", "ru"];
			prspLanguages = {
				en: "English.js",
				de: "Deutsch.js",
				fr: "French.js",
				ka: "Georgian.js",
				it: "Italian.js",
				nl: "English.js", // missing Dutch PRS+ translation
				ru: "Russian.js"
			};
			langNames = {
				en: "English",
				de: "Deutsch", 
				fr: "Français",
				it: "Italiano",	
				ka: "ქართული",
				nl: "Nederlands", 
				ru: "Русский"
			};
	
			if (currentLang === undefined || prspLanguages[currentLang] === undefined) {
				currentLang = "en";
			}
	
			// Load core js		
			loadCore();
			
			// Load PRS+ strings
			langFile = Core.config.corePath + "lang/" + prspLanguages[currentLang];
			Core.lang.init(langFile);
			
			// FIXME localize date strings
			for (i = 0, n = languages.length; i < n; i++) {
				if (!Date.prototype.strings[languages[i]]) {
					Date.prototype.strings[languages[i]] = xs.newInstanceOf(Date.prototype.strings.en);
					Number.prototype.strings[languages[i]] = xs.newInstanceOf(Number.prototype.strings.en);
				}
			}
	
			langNode = Core.ui.createContainerNode({
				title: "fskin:/l/strings/STR_NODE_TITLE_LANG_SETTINGS".idToString(),
				icon: "LANGUAGE",
				comment: function() {
					return langNames[kbook.model.language];
				},
				parent: settingsNode
			});
			
			// Enter function for language children, changes locale and moves to parent
			enter = function() {
				try {
					// Code from kbook.xsb
					Fskin.localize.setLocale({language: this.tag, region: "XX"});
					kbook.model.language = this.tag;
					kbook.model.clearTitleSorters();
					kbook.root.update(kbook.model);
					kbook.model.writeFilePreference();
					this.parent.gotoParent(kbook.model);
					// TODO localize
					Core.ui.showMsg("Requires restart");
				} catch (e) {
					bootLog("changing language", e);
				}
			};
			
			// Create language node's children
			for (i = 0, n = languages.length; i < n; i++) {
				node = Core.ui.createContainerNode({
						title: langNames[languages[i]],
						icon: "CROSSED_BOX",
						parent: langNode
				});
				node.tag = languages[i];
				node.enter = enter;
				if (currentLang === languages[i]) {
					node.selected = true;
				}
				langNode.nodes.push(node);
			}
			
			// Replace "language" node with custom node
			settingsNode.nodes[4] = langNode;
			
			// self destruct :)
			delete this.localize;
			
			// Language strings were loaded, time to init Core
			loadAddons();
			Core.init();
		} catch (e) {
			bootLog("localize", e);
		}
	};
	
	// Init language related stuff once setLocale was called and strings were loaded
	oldSetLocale = Fskin.localize.setLocale;
	Fskin.localize.setLocale = function() {
		try {
			oldSetLocale.apply(this, arguments);
			localize(Core);
			// restore "old" set locale
			Fskin.localize.setLocale	= oldSetLocale;
		} catch (e) {
			bootLog("in overriden setLocale", e);
		}
	};
	
	/*
		<function id="doDigit" params="part"><![CDATA[
			var c = this.PAGE.countPages().toString().length - 1;
			var s = "";
			for (var i = 0; i < c; i++)
				s += "_";
			s += part.key.charAt(0);
			this.setVariable("GOTO_VARIABLE", s);
			var container = this.container;
			container.beforeModal(container.GOTO_GROUP);
		]]></function>
	*/
	// First digit is ignored, if it is zero, when opening "goto" dialog (original function quoted above)
	kbook.model.container.sandbox.PAGE_GROUP.sandbox.doDigit = function(part) {
		try {
			var c, s, i, container, key;
			bootLog("sandbox.PAGE is " + this.sandbox.PAGE);
			c = this.sandbox.PAGE.countPages().toString().length - 1;
			s = "";
			for (i = 0; i < c; i++) {
				s += "_";
			}
			key = part.key.charAt(0);
			if (key !== "0") {
				s += key;
			} else {
				s += "_";
			}
			this.setVariable("GOTO_VARIABLE", s);
			container = kbook.model.container;
			container.sandbox.beforeModal.call(container, container.sandbox.GOTO_GROUP);
		} catch (ignore) {
			bootLog("error in doDigit: " + ignore);
		}
	};
	
	// Fix sorting
	var compareStrings =  Core.config.compat.compareStrings;
	String.prototype.localeCompare = function(a) {
		return compareStrings(this.valueOf(), a);
	};
};

tmp();
