// Description: Default UI localizer (needed only by non English locales)
// Author: kartu
//
// History:
//	2010-04-25 kartu - Refactored from core-lang
//	2010-05-02 kartu - Added second "unlock screen" localization (shown after sleep/usb connection)
//				Added support for field sizes
//				Localized "ok" texts
//	2010-05-09 kartu - Fixed "All bookmarks" "+ 1" bug
//	2010-05-15 kartu - Fixed "set date" bug ("mAX" typo)
//	2010-05-15 kartu - Moved getDateAndClock function to core lang (since English locale might also need it)
//	2010-05-18 kravitz - Replaced "PAGE" with "FUNC_PAGE_X"
//	2010-05-20 kartu - Removed script reference from about string

var tmp = function() {
	//--------------------------------------------------------------------------------------
	// utility functions
	//--------------------------------------------------------------------------------------
	var L, LF, setStr, getPageChangedFunc, settingsComment, localizeDefaultUI;

	//--------------------------------------------------------------------------------------
	// "Localizing" functions
	//--------------------------------------------------------------------------------------

	var localizeDate = function() {
		var sony = _strings.Sony;
		// Set date related stuff
		//
		// FIXME side effects!!!
		if (typeof sony.FUNC_GET_DATE == "function") {
			Date.prototype.toLocaleDateString = function() {
				return sony.FUNC_GET_DATE(this);
			};
		}
	};

	var localizeRoot = function() {
		var nodes = Core.ui.nodes;
		var getSoValue = Core.system.getSoValue;

		setStr(nodes["continue"], "CONTINUE");
		nodes["continue"]._mycomment = function (arg) {
			var bookNode = kbook.model.currentBook;
			return bookNode !== null ?  getSoValue(bookNode, "media.title") : L("NO_BOOK");
		};

		// Books by ?
		setStr(nodes.booksByTitle, "BOOKS_BY_TITLE");
		setStr(nodes.booksByAuthor, "BOOKS_BY_AUTHOR");
		setStr(nodes.booksByDate, "BOOKS_BY_DATE");
		nodes.booksByTitle._mycomment = nodes.booksByAuthor._mycomment = nodes.booksByDate._mycomment = function () {
			return LF("FUNC_X_BOOKS", this.nodes.length - 10);
		};

		// Collections
		setStr(nodes.collections, "COLLECTIONS");
		nodes.collections._mycomment = function () {
			return LF("FUNC_X_COLLECTIONS", this.length);
		};
		// Books inside collections
		kbook.root.children.collections.prototype._mycomment = function() {
			return LF("FUNC_X_BOOKS", this.playlist.items.length);
		};

		// Bookmarks
		setStr(nodes.bookmarks, "ALL_BOOKMARKS");
		nodes.bookmarks._mycomment = function () {
			return LF("FUNC_X_BOOKMARKS", this.nodes.length);
		};

		// Now Playing
		setStr(nodes.nowPlaying, "NOW_PLAYING");
		nodes.nowPlaying._mycomment = function () {
			return kbook.model.currentSong === null ? L("NO_SONG") : this.comment();
		};

		// Music
		setStr(nodes.music, "MUSIC");
		nodes.music._mycomment = function () {
			return LF("FUNC_X_SONGS", this.length);
		};

		// Pictures
		setStr(nodes.pictures, "PICTURES");
		nodes.pictures._mycomment = function () {
			return LF("FUNC_X_PICTURES", this.length);
		};

		// Settings
		setStr(nodes.settings, "SETTINGS");
		nodes.settings._mycomment = settingsComment;
	};

	var localizeSettings = function() {
		// Settings - Orientation
		var settingsNode = Core.ui.nodes.settings;
		var settingsChildren = settingsNode.children;
		setStr(settingsChildren.orientation, "ORIENTATION");
		settingsChildren.orientation._mycomment = function () {
			return kbook.model.container.getVariable('ORIENTATION') ? L("HORIZONTAL") : L("VERTICAL");
		};

		// Settings - Set Date
		setStr(settingsChildren.setdate_clock, "SET_DATE");
		settingsChildren.setdate_clock._mycomment = function() {
			return LF("FUNC_GET_DATE_TIME", new Date());
		};
		var setDateNodes = settingsNode.nodes[1].nodes;
		setDateNodes[0].name = L("YEAR"); //year
		setDateNodes[1].name = L("MONTH"); // month
		setDateNodes[2].name = L("DATE"); // day
		setDateNodes[3].name = L("HOUR"); // hour
		setDateNodes[4].name = L("MINUTE"); // minute
		setDateNodes[5].min = setDateNodes[5].max = L("SETDATE_OK");
		setDateNodes[5].kind = -parseFloat(L("SETDATE_OK_SIZE", 2));

		// Settings - Slideshow
		var slideshow = Core.ui.nodes.settings.nodes[2];
		setStr(slideshow, "SLIDESHOW");
		slideshow._mycomment = function() {
			return kbook.model.slideshowFlag ? L("SS_ON") :  L("SS_OFF");
		};
		var slideshowNodes = slideshow.nodes;
		slideshowNodes[0].name= L("SS_TURN");
		slideshowNodes[0].min = L("SS_OFF") ;
		slideshowNodes[0].max = L("SS_ON") ;
		slideshowNodes[0].kind = -parseFloat(L("SS_SIZE", 2));
		slideshowNodes[1].name= L("SS_DURATION");
		slideshowNodes[1].comment = L("SECONDS");
		slideshowNodes[2].min =  slideshowNodes[2].max = L("SS_OK");
		slideshowNodes[2].kind = -parseFloat(L("SS_OK_SIZE", 2));
		// Settings - Auto Standby
		var autoStandby = Core.ui.nodes.settings.nodes[3];
		setStr(autoStandby, "AUTOSTANDBY");
		autoStandby._mycomment = function() {
			return kbook.model.autoStandbyFlag ? L("AS_ON") : L("AS_OFF");
		};
		var autoStandbyNodes = autoStandby.nodes;
		autoStandbyNodes[0].name = L("AS_TURN");
		autoStandbyNodes[0].min = L("AS_OFF");
		autoStandbyNodes[0].max = L("AS_ON");
		autoStandbyNodes[0].kind = -parseFloat(L("AS_SIZE", 2));
		autoStandbyNodes[1].min = autoStandbyNodes[1].max = L("AS_OK");
		autoStandbyNodes[1].kind = -parseFloat(L("AS_OK_SIZE", 2));

		// Settings - About
		setStr(settingsChildren.about, "ABOUT");
		setStr(settingsChildren.resetToFactorySettings, "RESET_TO_FACTORY");
	};

	var localizeAdvancedSettings = function() {
		try {
			var nodes = Core.ui.nodes;

			// Settings - Advanced Settings
			setStr(nodes.advancedSettings, "ADVANCED_SETTINGS");
			nodes.advancedSettings._mycomment = settingsComment;
			var advancedSettingsChildren = nodes.advancedSettings.children;

			// Settings - Advanced Settings - Screen Lock
			var screenLockSettings = kbook.screenLock;
			var screenLockSettingsNodes = screenLockSettings.nodes;
			setStr(screenLockSettings, "SCREEN_LOCK");
			screenLockSettingsNodes[0].name = L("SL_TURN");
			screenLockSettingsNodes[0].min =  L("SL_OFF");
			screenLockSettingsNodes[0].max =  L("SL_ON");
			screenLockSettingsNodes[0].kind = -parseFloat(L("SL_SIZE", 2));
			screenLockSettingsNodes[1].name =  L("SL_CODE");
			screenLockSettingsNodes[2].min = screenLockSettingsNodes[2].max = L("SL_OK");
			screenLockSettingsNodes[2].kind = -parseFloat(L("SL_OK_SIZE", 2));

			// Shown to unlock settings
			var screenLock = Core.ui.nodes.advancedSettings.nodes[0];
			var screenLockNodes = screenLock.nodes;
			screenLock._mycomment = function () {
				return kbook.model.screenLockFlag ? L("SL_ON") : L("SL_OFF");
			};
			setStr(screenLock, "SCREEN_LOCK");
			screenLockNodes[0].name = L("SL_CODE");
			screenLockNodes[1].min = screenLockNodes[1].max = L("SL_OK_UNLOCK");
			screenLockNodes[1].kind = -parseFloat(L("SL_OK_UNLOCK_SIZE", 2));

			// Shown to unlock device after it was connected to USB / restart
			var unlockNodes = kbook.screenUnlock.nodes;
			unlockNodes[0].name = L("SL_CODE");
			unlockNodes[1].min = unlockNodes[1].max = L("SL_OK_UNLOCK");
			unlockNodes[1].kind = -parseFloat(L("SL_OK_UNLOCK_SIZE", 2));

			// Settings - Advanced Settings - Format Device
			setStr(advancedSettingsChildren.formatDevice, "FORMAT_DEVICE");

			// Settings - Advanced Settings - Shutdown
			setStr(advancedSettingsChildren.deviceShutdown, "DEVICE_SHUTDOWN");
		} catch (e) {
			log.error("in localizeAdvancedSettings: " + e);
		}
	};

	var localizeBook = function() {
		// Book
		var bookChildren = kbook.children;
		setStr(bookChildren["continue"], "CONTINUE");
		setStr(bookChildren.begin, "BEGIN");
		setStr(bookChildren.end, "END");
		var getSoValue = Core.system.getSoValue;
		bookChildren["continue"]._mycomment = bookChildren.begin._mycomment = bookChildren.end._mycomment = function () {
			if (this.bookmark) {
				return LF("FUNC_PAGE_X", getSoValue(this.bookmark, "page") + 1);
			}
			return "";
		};

		setStr(bookChildren.bookmarks, "BOOKMARKS");
		bookChildren.bookmarks._mycomment = function () {
			return LF("FUNC_X_BOOKMARKS", this.bookmarks.length);
		};

		setStr(bookChildren.contents, "CONTENTS");
		bookChildren.contents._mycomment = function () {
			return LF("FUNC_X_ITEMS", this.bookmarks.length);
		};

		setStr(bookChildren.history, "HISTORY");
		bookChildren.history._mycomment = function () {
			return LF("FUNC_X_PAGES", this.bookmarks.length);
		};

		setStr(bookChildren.info, "INFO");
		Core.system.setSoValue(getSoValue(kbook, "strings"), "infoTitles", L("INFO_TITLES"));

		setStr(kbook.children.utilities, "UTILITIES");
		kbook.children.utilities._mycomment = settingsComment;
	};

	var localizeBookUtils = function() {
		// Book.Utilities
		var bookUtilChildren = kbook.children.utilities.children;
		var getSoValue = Core.system.getSoValue;
		setStr(bookUtilChildren.removeAllBookmarks, "REMOVE_ALL_BOOKMARKS");
		bookUtilChildren.removeAllBookmarks._mycomment = function () {
			return LF("FUNC_X_BOOKMARKS", getSoValue(this.parent.parent, "media.bookmarks.length"));
		};

		setStr(bookUtilChildren.clearHistory, "CLEAR_HISTORY");
		bookUtilChildren.clearHistory._mycomment = function () {
			return LF("FUNC_X_PAGES", getSoValue(this.parent.parent, "media.history.length"));
		};

		setStr(bookUtilChildren.deleteBook, "DELETE_BOOK");
	};

	var localizeBookByDate = function() {
		try {
			// BooksByDate child children
			var children = Core.ui.nodes.booksByDate.children;
			setStr(children._1, "TODAY");
			setStr(children._2, "EARLIER_THIS_WEEK");
			setStr(children._3, "LAST_WEEK");
			setStr(children._4, "EARLIER_THIS_MONTH");
			setStr(children._5, "LAST_MONTH");
			setStr(children._6, "EARLIER_THIS_QUARTER");
			setStr(children._7, "LAST_QUARTER");
			setStr(children._8, "EARLIER_THIS_YEAR");
			setStr(children._9, "LAST_YEAR");
			setStr(children._0, "OLDER");
		} catch (e) {
			log.error("In localizeBookByDate: " + e);
		}
	};

	var localizeBookByTitleAndAuthor = function() {
		if (L("CUSTOM_SORT") === true) {
			var setSoValue = Core.system.setSoValue;
			var childrenTitle = Core.ui.nodes.booksByTitle.children;
			var childrenAuthor = Core.ui.nodes.booksByAuthor.children;
			for (var i = 0; i < 10; i++) {
				var obj1 = childrenTitle["_" + i];
				var obj2 = childrenAuthor["_" + i];
				var criterion = L("CRITERION_" + i);
				var title =  L("TITLE_" + i);
				setSoValue(obj1, "criterion", criterion);
				setSoValue(obj1, "name", title);
				setSoValue(obj1, "title", title);
				setSoValue(obj2, "criterion", criterion);
				setSoValue(obj2, "name", title);
				setSoValue(obj2, "title", title);
			}
		}
	};

	var localizeComments = function() {
		var getSoValue = Core.system.getSoValue;
		var getFastSoValue = Core.system.getFastSoValue;

		// BooksBy* comment
		//
		var obj = getSoValue("FskCache.tree.bookItemNode");
		obj._mycomment = function() {
			var offsets, offset, index, c, result;
			index = getFastSoValue(this, "index");
			offsets = getSoValue(this, "parent.offsets");
			offset = offsets[index];
			c = offsets[index + 1] - offset;
			offset = offset - offset % 10;
			offset = offset / 10;
			offset++;
			result = LF("FUNC_X_BOOKS", c);
			if (c > 0) {
				result = result + " - " + LF("FUNC_PAGE_X", offset);
			}
			return result;
		};

		// Global bookmarks node
		//
		obj = getSoValue("FskCache.tree.globalBookmarkItemNode");
		obj._mycomment = function() {
			var bookmark, comment, part;
			bookmark = getFastSoValue(this, "bookmark");
			comment = (new Date(getFastSoValue(bookmark, "date"))).toLocaleDateString();
			comment = comment + ' - ' + getSoValue(this, "book.name");
			part = getFastSoValue(bookmark, "part");
			if (part) {
				comment = comment + ' - ' + L("PART") + ' ' + part;
			}
			comment = comment + ' - ' + LF("FUNC_PAGE_X", getFastSoValue(bookmark, "page") + 1) + ' ' + L("OF") + ' ' + getFastSoValue(bookmark, "pages");
			return comment;
		};

		// Bookmarks in book's "Bookmarks" and "History"
		//
		obj = getSoValue("FskCache.tree.bookmarkNode.prototype");
		obj._mycomment = function() {
			var part, page, pages, bookmark, result;
			bookmark = getFastSoValue(this, "bookmark");
			if (bookmark !== undefined) {
				part = getFastSoValue(bookmark, "part");
				page = getFastSoValue(bookmark, "page");
				page++;
				pages = getFastSoValue(bookmark, "pages");
				result = '';
				if (part) {
					result = result + L("PART") + ' ' + part + ' - ';
				}
				result = result + LF("FUNC_PAGE_X", page);
				if (pages) {
					result = result + ' ' + L("OF") + ' ' + pages;
				}
				return result;
			}
			return '?';
		};

		// Bookmarks in book's "Contents"
		//
		obj = getSoValue("FskCache.tree.markReferenceNode.prototype");
		obj._mycomment = function() {
			var part, page, bookmark;
			bookmark = getSoValue(this, "bookmark");
			page = getFastSoValue(bookmark, "page") + 1;
			part = getFastSoValue(bookmark, "part");
			if (part) {
				return L("PART") + ' ' + part + ' - ' + LF("FUNC_PAGE_X", page);
			} else {
				return LF("FUNC_PAGE_X", page);
			}
		};
	};

	var localizeStatic = function() {
		var obj;
		var container = kbook.model.container;
		// Invalid Format!
		container.INVALID_FORMAT_GROUP.LB_INVALID_FORMAT.setValue(L("INVALID_FORMAT"));
		// Formatting...
		container.PROGRESS_GROUP.LB_FORMATTING.setValue(L("FORMATTING"));
		container.FORMAT_GROUP.LB_FORMATTING.setValue(L("FORMATTING"));
		// Loading...
		container.DISK_GROUP.LB_LOADING.setValue(L("LOADING"));
		// Low Battery!
		container.LOW_BATTERY_GROUP.LB_LOW_BATTERY.setValue(L("LOW_BATTERY"));

		// Reset All
		obj = container.HARD_RESET_GROUP;
		obj.RESET_ALL.setValue(L("RESET_ALL"));
		// "Do you want to DELETE all content, restore all factory settings,
		// and clear the DRM authorization state?&#13;&#13;Yes - Press 5&#13;No - Press MENU"
		obj.HARD_RESET.HR_WARNING.setValue(L("HR_WARNING"));

		// Device Shutdown
		obj = container.DEVICE_SHUTDOWN_GROUP;
		obj.LB_TITLE.setValue(L("DEVICE_SHUTDOWN"));
		// Press MARK to shutdown
		obj.DEVICE_SHUTDOWN.LB_MESSAGE1.setValue(L("PRESS_MARK_TO_SHUTDOWN"));
		// this device.
		obj.DEVICE_SHUTDOWN.LB_MESSAGE2.setValue(L("THIS_DEVICE"));

		// Delete Book
		obj = container.DELETE_BOOK_GROUP;
		obj.LB_TITLE.setValue(L("DELETE_BOOK"));
		// Press MARK to
		obj.DELETE_BOOK.LB_MESSAGE1.setValue(L("PRESS_MARK_TO_DELETE"));
		// delete book.
		obj.DELETE_BOOK.LB_MESSAGE2.setValue(L("THIS_BOOK"));

		// Format Internal Memory
		obj = container.FORMAT_DEVICE_GROUP;
		obj.LB_TITLE.setValue(L("FORMAT_INTERNAL_MEMORY"));
		// Press MARK to format
		obj.FORMAT_DEVICE.LB_MESSAGE1.setValue(L("PRESS_MARK_TO_FORMAT"));
		// internal memory.
		obj.FORMAT_DEVICE.LB_MESSAGE2.setValue(L("MSG_INTERNAL_MEMORY"));

		// Restore Defaults
		obj = container.SOFT_RESET_GROUP;
		obj.LB_TITLE.setValue(L("RESTORE_DEFAULTS"));
		// Press MARK to restore
		obj.SOFT_RESET.LB_MESSAGE1.setValue(L("PRESS_MARK_TO_RESTORE"));
		// default settings.
		obj.SOFT_RESET.LB_MESSAGE2.setValue(L("DEFAULT_SETTINGS"));

		// Now Playing
		container.SONG_GROUP.LB_TITLE.setValue(L("NOW_PLAYING"));
		// Uppercase PAGE (goto)
		container.GOTO_GROUP.GROUP.LB_MESSAGE.setValue(L("UPPER_PAGE"));

		// 1 of 1
		var oneOfOne = L("ONE_OF_ONE");
		container.HARD_RESET_GROUP.LB_STATUS.setValue(oneOfOne);
		container.DEVICE_SHUTDOWN_GROUP.LB_STATUS.setValue(oneOfOne);
		container.DELETE_BOOK_GROUP.LB_STATUS.setValue(oneOfOne);
		container.FORMAT_DEVICE_GROUP.LB_STATUS.setValue(oneOfOne);
		container.SOFT_RESET_GROUP.LB_STATUS.setValue(oneOfOne);
		container.SETTING_GROUP.LB_STATUS.setValue(oneOfOne);

		// Info page
		var oldPageChanged = container.INFO_GROUP.INFO.pageChanged;
		container.INFO_GROUP.INFO.pageChanged = getPageChangedFunc("INFO_INDEX_COUNT", oldPageChanged, L);
	};

	var localizeKbook = function () {
		// SHUTDOWN_MSG related stuff
		// No battery!
		kbook.model.SHUTDOWN_MSG = L("NO_BATTERY");
		var oldDoFormatFlash = kbook.model.doFormatFlash;
		kbook.model.doFormatFlash = function () {
			oldDoFormatFlash.apply(this, arguments);
			this.setVariable('SHUTDOWN_MSG', L("FORMATTING_INTERNAL_MEMORY"));
		};
		var oldDoDeviceShutdown = kbook.model.doDeviceShutdown;
		kbook.model.doDeviceShutdown = function () {
			oldDoDeviceShutdown.apply(this, arguments);
			this.setVariable('SHUTDOWN_MSG', L("SHUTTING_DOWN"));
		};

		// Pictures
		var oldOnEnterPicture = kbook.model.onEnterPicture;
		kbook.model.onEnterPicture = getPageChangedFunc("PICTURE_INDEX_COUNT", oldOnEnterPicture, L);

		// Songs
		var oldPlaySong = kbook.model.playSong;
		kbook.model.playSong = getPageChangedFunc("SONG_INDEX_COUNT", oldPlaySong, L);
	};

	var localizeMisc = function () {
		// mime types
		var obj = Core.system.getSoValue("FskCache.tree.infoListNode.prototypes.mime");
		var func = function (value) {
			if (value == 'application/rtf') {
				return L("RICH_TEXT_FORMAT");
			}
			if (value == 'application/pdf') {
				return L("ADOBE_PDF");
			}
			if (value == 'application/epub+zip') {
				return L("EPUB_DOCUMENT");
			}
			if (value == 'application/x-sony-bbeb') {
				return L("BBEB_BOOK");
			}
			if (value == 'text/plain') {
				return L("PLAIN_TEXT");
			}
			return value;
		};
		Core.system.setSoValue(obj, "format", func);

		// internal memory / mem card
		obj = Core.system.getSoValue("FskCache.tree.infoListNode.prototypes.location");
		var oldFunc = Core.system.getFastSoValue(obj, "format");
		func = function () {
			var s = oldFunc.apply(this, arguments);
			switch (s) {
				case "Internal memory":
					return L("INTERNAL_MEMORY");
				case "Memory Stick":
					return L("MEMORY_STICK");
				case "SD Memory":
					return L("SD_CARD");
			}
			return s;
		};
		Core.system.setSoValue(obj, "format", func);
	};

	var localizeAbout = function () {
		var setSoValue = Core.system.setSoValue;
		var getFastSoValue = Core.system.getFastSoValue;
		var about = kbook.model.container.ABOUT_GROUP.ABOUT;

		// Localize records
		var records = Core.system.getSoValue(about, "data.records");
		for (var i = 0, n = records.length; i < n; i++) {
			var sandbox, key, text;
			sandbox = getFastSoValue(records[i], "sandbox");
			if (i === 0) {
				// translate PRSP entry
				key = "ABOUT_PRSP";
				text = L(key);
				text = text.replace("@@@firmware@@@", Core.version.firmware);
			} else {
				key = "ABOUT_" + i;
				text = L(key);
			}
			setSoValue(sandbox, "text", text);
		}

		var oldGetValue = about.getValue;
		var authorizedSony = L("AUTHORIZED_SONY");
		var notAuthorizedSony = L("NOT_AUTHORIZED_SONY");
		var authorizedAdobe = L("AUTHORIZED_ADOBE");
		var notAuthorizedAdobe = L("NOT_AUTHORIZED_ADOBE");
		var sonyVersion = L("SONY_FW_VERSION") + ":";
		var deviceID = L("DEVICE_ID") + ":";
		about.getValue = function (record, field) {
			var result = oldGetValue.apply(this, arguments);
			if (field === "text") {
				if (record.kind === 0) {
					result = result.replace("Authorized for the eBook Store.", authorizedSony);
					result = result.replace("Not authorized for the eBook Store.", notAuthorizedSony);
					result = result.replace("Version:", sonyVersion);
					result = result.replace("Device:", deviceID);
				} else if (record.kind === 1) {
					result = result.replace("This device is authorized for Adobe DRM protected content.", authorizedAdobe);
					result = result.replace("This device is not authorized for Adobe DRM protected content.", notAuthorizedAdobe);
				}
			}
			return result;
		};

		// Localize page index
		var oldPageChanged = about.pageChanged;
		about.pageChanged = getPageChangedFunc("ABOUT_INDEX_COUNT", oldPageChanged, L);

		// Localize title
		var aboutTitle = L("ABOUT");
		about.getTitle = function() {
			return aboutTitle;
		};

		// Recalculate box sizes
		about.dataChanged();
	};

	localizeDefaultUI = function () {
		var sony_str = Core.lang.getStrings("Sony");
		// Helper functions
		L = function (key, defValue) {
			if (sony_str.hasOwnProperty(key)) {
				return sony_str[key];
			} else {
				if (defValue !== undefined) {
					return defValue;
				} else {
					return key;
				}
			}
		};
		LF = function (key, param) {
			try {
				if (typeof sony_str[key] == "function") {
					return sony_str[key](param);
				} else if (typeof sony_str[key] != "undefined") {
					return sony_str[key];
				}
			} catch (e) {
				log.error("when calling " + key + " with param " + param + ": " + e);
			}
			return key;
		};
		setStr = function (node, strID) {
			node._myname = node.title = L(strID);
		};
		settingsComment = function () {
			return LF("FUNC_X_SETTINGS", this.length);
		};
		getPageChangedFunc = function(varName, oldFunc, L) {
			var model = kbook.model;
			var of = L("OF");
			return function() {
				oldFunc.apply(this, arguments);
				var s = model.getVariable(varName);
				if (s) {
					model.setVariable(varName, s.replace("of", of));
				}
			};
		};

		localizeRoot();
		localizeSettings();
		localizeAdvancedSettings();
		localizeBook();
		localizeBookUtils();
		localizeBookByDate();
		localizeBookByTitleAndAuthor();
		localizeComments();
		localizeStatic();
		localizeKbook();
		localizeMisc();
		localizeAbout();
		localizeDate();
	};

	localizeDefaultUI();
};
tmp();
