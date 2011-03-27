// Language: German
// Description: Localization file
 // Translator: Duglum, klawong, Mark Nord
//
// History:
//	2010-04-30 kravitz - Refactored, added new strings
//	2010-05-01 kartu - Added ACTION_GOTO_LINK
//	2010-05-01 Duglum, klawong, Mark Nord - translation is corrected
//	2010-05-02 kartu - Added dictionary strings
//	2010-05-02 kartu - Added translations and sizes for a number of strings, including "OK"
//	2010-05-03 kravitz - Renamed ReadingList to BookHistory, added new strings, refactored MenuTuning
//	2010-05-06 kartu - Added ppm related translations for PageIndex addon
//	2010-05-10 kartu - Added German corrections by Duglum/Mark Nord/klawong
//	2010-05-11 kartu - Added VALUE_DEFAULT_DATE (CoreLang)
//	2010-05-15 kartu - Added OPTION_SKIP_BOOK_MENU (BookHistory)
//	2010-05-15 kartu - Added PAGE (BookHistory)
//	2010-05-17 kravitz - Replaced PAGE (BookHistory) with added FUNC_PAGE_X
//	2010-05-18 kravitz - Replaced PAGE (Sony) with FUNC_PAGE_X
//	2010-05-18 kravitz - Added Duglum's translation of OPTION_SKIP_BOOK_MENU
//	2010-05-20 kartu - Removed script reference from about string
//	2010-06-29 kartu - Split KeyBindings keys into KeyBindings and StandardActions
//				Added 0-9 translations

var FUNC_X_SOMETHING = function (n, s) {
	if (n > 1) {
		return n + " " + s[0];
	}
	if (n == 1) {
		return s[1];
	}
	return s[2];
};

var FUNC_X_BOOKS = function (n) {
	return FUNC_X_SOMETHING(n, ["Bücher", "1 Buch", "Kein Buch"]);
};
var FUNC_X_SETTINGS = function (n) {
	return FUNC_X_SOMETHING(n, ["Einstellungen", "1 Einstellung", "Keine Einstellung"]);
};
var FUNC_X_ITEMS = function (n) {
	return FUNC_X_SOMETHING(n, ["Menüpunkte", "1 Menüpunkt", "Kein Menüpunkt"]);
};
var FUNC_X_PAGES = function (n) {
	return FUNC_X_SOMETHING(n, ["Seiten", "1 Seite", "Keine Seite"]);
};
var FUNC_X_PICTURES = function (n) {
	return FUNC_X_SOMETHING(n, ["Bilder", "1 Bild", "Kein Bild"]);
};
var FUNC_X_SONGS = function (n) {
	return FUNC_X_SOMETHING(n, ["Lieder", "1 Lied", "Kein Lied"]);
};
var FUNC_X_BOOKMARKS = function (n) {
	return FUNC_X_SOMETHING(n, ["Lesezeichen", "1 Lesezeichen", "Kein Lesezeichen"]);
};
var FUNC_X_COLLECTIONS = function (n) {
	return FUNC_X_SOMETHING(n, ["Sammlungen", "1 Sammlung", "Keine Sammlung"]);
};

var FUNC_PAGE_X = function (n) {
	return "Seite " + n;
};

// Utility function, no need to localize
var toDoubleDigit = function (num) {
	if (num < 10) {
		return "0" + num;
	}
	return num;
};

var FUNC_GET_DATE = function (date) {
	var day, month, year;
	day = toDoubleDigit(date.getDate());
	month = toDoubleDigit(date.getMonth() + 1);
	year = date.getFullYear();
	return month + "/" + day + "/" + year;
};

var FUNC_GET_TIME = function (date) {
	var hour, minute;
	hour = toDoubleDigit(date.getHours());
	minute = toDoubleDigit(date.getMinutes());
	return hour + ":" + minute;
};

var FUNC_GET_DATE_TIME = function (date) {
	return date.toLocaleDateString() + " " + FUNC_GET_TIME(date);
};

return {
	// Standard stuff
	Sony: {
		// USB connected
		DO_NOT_DISCONNECT: "Bitte nicht trennen",
		USB_CONNECTED: "USB verbunden",
		DEVICE_LOCKED: "Gerät gesperrt",

		// About, translate either all or none
		ABOUT_PRSP:  "PRS+ @@@firmware@@@\n" + "Autor: Mikheil Sukhiashvili aka kartu (kartu3@gmail.com) using work of: " + "igorsk, boroda, obelix, pepak, kravitz und anderer.\n" + "© GNU Lesser General Public License.",
		ABOUT_1: "Copyright ©2006-2008 Sony Corporation",
		ABOUT_2: "Adobe, the Adobe logo, Reader and PDF are either registered trademarks or" + " trademarks of Adobe Systems Incorporated in the United States and/or other countries.",
		ABOUT_3: "MPEG Layer-3 audio coding technology and patents licensed by Fraunhofer IIS and Thomson." + " MPEG-4 AAC audio coding technology licensed by Fraunhofer IIS (www.iis.fraunhofer.de/amm/).",
		ABOUT_4: "Application software designed and implemented by Kinoma (www.kinoma.com). Portions Copyright ©2006,2007 Kinoma, Inc.",
		ABOUT_5: "Bitstream is a registered trademark, and Dutch, Font Fusion, and Swiss are trademarks, of Bitstream, Inc.",
		ABOUT_6: "Portions of this software are Copyright ©2005 The FreeType Project (www.freetype.org). All rights reserved.",
		ABOUT_7: "This software is based in part on the work of the Independent JPEG Group.",
		AUTHORIZED_SONY: "Authorisiert für den eBook Store.",
		NOT_AUTHORIZED_SONY: "Nicht authorisiert für den eBook Store.",
		AUTHORIZED_ADOBE: "Dieses Gerät ist authorisiert für Adobe DRM-geschützte Inhalte.",
		NOT_AUTHORIZED_ADOBE: "Dieses Gerät ist nicht authorisiert für Adobe DRM-geschützte Inhalte.",
		SONY_FW_VERSION: "Version",
		DEVICE_ID: "Gerät",

		// Mime & card names
		RICH_TEXT_FORMAT: "RTF-Datei",
		ADOBE_PDF: "PDF-Datei",
		EPUB_DOCUMENT: "EPUB-Dokument",
		BBEB_BOOK: "BBeB-Buch",
		PLAIN_TEXT: "Textdatei",
		INTERNAL_MEMORY: "Interner Speicher",
		MEMORY_STICK: "Memory Stick",
		SD_CARD: "SD-Karte",

		// Main.xml & kbook.so stuff
		INVALID_FORMAT: "Ungültiges Format!",
		FORMATTING: "Formatiere...",
		LOADING: "Lade...",
		LOW_BATTERY: "Batterie schwach!",
		HR_WARNING: "Willst Du alle Inhalte LÖSCHEN, auf Werkseinstellungen zurücksetzen und die DRM-Authorisierung zurücksetzen?\n\nJa - Drücke 5\nNein - Drücke MENÜ",
		DEVICE_SHUTDOWN: "Gerät ausschalten",
		PRESS_MARK_TO_SHUTDOWN: "Drücke LESEZEICHEN",
		THIS_DEVICE: "zum Ausschalten.",
		PRESS_MARK_TO_DELETE: "Drücke LESEZEICHEN um",
		THIS_BOOK: "dieses Buch zu löschen.",
		FORMAT_INTERNAL_MEMORY: "Formatiere internen Speicher",
		PRESS_MARK_TO_FORMAT: "Drücke LESEZEICHEN",
		MSG_INTERNAL_MEMORY: "zum Formatieren.",
		RESTORE_DEFAULTS: "Standardeinstellungen wiederherstellen",
		PRESS_MARK_TO_RESTORE: "Drücke LESEZEICHEN zum Wiederherstellen",
		DEFAULT_SETTINGS: "der Standardeinstellungen.",
		UPPER_PAGE: "Seite",
		ONE_OF_ONE: "1 von 1",
		NO_BATTERY: "Batterie leer!",
		FORMATTING_INTERNAL_MEMORY: "Formatiere internen Speicher...",
		SHUTTING_DOWN: "Gerät schaltet aus...",

		// Root menu
		CONTINUE: "Weiterlesen",
		BOOKS_BY_TITLE: "Bücher nach Titel",
		BOOKS_BY_AUTHOR: "Bücher nach Autor",
		BOOKS_BY_DATE: "Bücher nach Datum",
		COLLECTIONS: "Sammlungen",
		ALL_BOOKMARKS: "Alle Lesezeichen",
		NOW_PLAYING: "Momentan läuft",
		MUSIC: "Musik",
		PICTURES: "Bilder",
		SETTINGS: "Einstellungen",

		// In Settings
		// orientation
		ORIENTATION: "Ausrichtung",
		HORIZONTAL: "Horizontal",
		VERTICAL: "Vertikal",
		// set date
		SET_DATE: "Datum und Uhrzeit",
		YEAR: "Jahr",
		MONTH: "Monat",
		DATE: "Tag", // Day
		HOUR: "Stunde",
		MINUTE: "Minute",
		SETDATE_OK: "OK",
		// width in pixels = ..._SIZE * 35
		SETDATE_OK_SIZE: 2,
		// slideshow
		SLIDESHOW: "Diashow",
		SS_ON: "Ja",
		SS_OFF: "Nein",
		SS_TURN: "Aktivieren",
		SS_DURATION: "Intervall",
		// width in pixels = ..._SIZE * 35
		SS_SIZE: 2,
		SS_OK: "OK",
		// width in pixels = ..._SIZE * 35
		SS_OK_SIZE: 2,
		SECONDS: "Sekunden",
		// auto standby (aka sleep mode)
		AUTOSTANDBY: "Schlaf-Modus",
		AS_ON: "Ja",
		AS_OFF: "Nein",
		AS_TURN: "Aktivieren",
		// width in pixels = ..._SIZE * 35
		AS_SIZE: 2,
		AS_OK: "OK",
		// width in pixels = ..._SIZE * 35
		AS_OK_SIZE: 2,
		// about
		ABOUT: "Über",
		// reset to factory settings
		RESET_TO_FACTORY: "Auf Werkseinstellungen zurücksetzen",

		// In Advanced Settings
		ADVANCED_SETTINGS: "Erweiterte Einstellungen",
		// screen lock (aka device lock)
		SCREEN_LOCK: "Gerätesperre",
		SL_OFF: "Ja",
		SL_ON: "Nein",
		SL_CODE: "Code eingeben",
		SL_TURN: "Aktivieren",
		// width in pixels = ..._SIZE * 35
		SL_SIZE: 2,
		SL_OK: "OK",
		SL_OK_SIZE: 2,
		SL_OK_UNLOCK: "OK", // unlock
		// width in pixels = ..._SIZE * 35
		SL_OK_UNLOCK_SIZE: 2,
		// format device
		FORMAT_DEVICE: "Gerät formatieren",

		// In Book menu
		BEGIN: "Anfang",
		END: "Ende",
		BOOKMARKS: "Lesezeichen",
		CONTENTS: "Inhaltsverzeichnis",
		HISTORY: "Verlauf",
		INFO: "Informationen",
		UTILITIES: "Werkzeuge",

		// In Book Utilities
		REMOVE_ALL_BOOKMARKS: "Alle Lesezeichen löschen",
		CLEAR_HISTORY: "Verlauf löschen",
		DELETE_BOOK: "Buch löschen",

		// In Books by Date
		TODAY: "Heute",
		EARLIER_THIS_WEEK: "Diese Woche",
		LAST_WEEK: "Letzte Woche",
		EARLIER_THIS_MONTH: "Diesen Monat",
		LAST_MONTH: "Letzter Monat",
		EARLIER_THIS_QUARTER: "Dieses Quartal",
		LAST_QUARTER: "Letztes Quartal",
		EARLIER_THIS_YEAR: "Dieses Jahr",
		LAST_YEAR: "Letztes Jahr",
		OLDER: "Älter",

		FUNC_PAGE_X: FUNC_PAGE_X,
		PART: "Teil",
		OF: "von",
		NO_BOOK: "Kein Buch",
		NO_SONG: "Kein Lied",

		// Info title strings, comma separated, no spaces after comma
		INFO_TITLES: "Einband,Titel,Autor,Verleger,Kategorie,eBook ID,Dateityp,Datum,Dateigröße,Speicherort,Dateipfad,Digitale Rechte,Gültigkeitsende",

		// Titles and criterions for "Books by Title" and "Books by Folder"
		// title is displayed, "criterion" is used for sorting.
		//
		// NOTE: if localization doesn't need custom Books by sorting, just remove CUSTOM_SORT, TITLE_*, CRITERION_* items
		CUSTOM_SORT: true,
		TITLE_1: "0-9",
		CRITERION_1: "0123456789",
		TITLE_2: "A B C",
		CRITERION_2: "ABCabc",
		TITLE_3: "D E F",
		CRITERION_3: "DEFdef",
		TITLE_4: "G H I",
		CRITERION_4: "GHIghi",
		TITLE_5: "J K L",
		CRITERION_5: "JKLjkl",
		TITLE_6: "M N O",
		CRITERION_6: "MNOmno",
		TITLE_7: "P Q R S",
		CRITERION_7: "PQRSpqrs",
		TITLE_8: "T U V W",
		CRITERION_8: "TUVWtuvw",
		TITLE_9: "X Y Z",
		CRITERION_9: "XYZxyz",
		TITLE_0: "Sonstige",
		CRITERION_0: "",

		FUNC_GET_DATE_TIME: FUNC_GET_DATE_TIME,
		FUNC_GET_DATE: FUNC_GET_DATE,
		FUNC_GET_TIME: FUNC_GET_TIME,

		FUNC_X_PAGES: FUNC_X_PAGES,
		FUNC_X_ITEMS: FUNC_X_ITEMS,
		FUNC_X_SETTINGS: FUNC_X_SETTINGS,
		FUNC_X_PICTURES: FUNC_X_PICTURES,
		FUNC_X_SONGS: FUNC_X_SONGS,
		FUNC_X_BOOKMARKS: FUNC_X_BOOKMARKS,
		FUNC_X_COLLECTIONS: FUNC_X_COLLECTIONS,
		FUNC_X_BOOKS: FUNC_X_BOOKS
	},

	// PRS+ stuff
	Core: {
		FUNC_X_BOOKS: FUNC_X_BOOKS,
		FUNC_X_SETTINGS: FUNC_X_SETTINGS,
		FUNC_X_ITEMS: FUNC_X_ITEMS,
		NODE_PRSP_SETTINGS:  "PRS+ Einstellungen",
		NODE_OTHERS: "Multimedia",
		NODE_GAMES_AND_UTILS: "Spiele & Werkzeuge",
		GROUP_MENU_TITLE: "Menü-Einstellungen",
		GROUP_VIEWER_TITLE: "Darstellungsoptionen"
	},

	CoreLang: {
		TITLE: "Lokalisierung",
		COMMENT: "Benötigt Neustart",
		OPTION_LANG: "Sprache",

		OPTION_DATE_FORMAT: "Datums-Format",
		VALUE_DEFAULT_DATE: "Standardwert",
		ddMMMYY: "31/Jan/99",
		ddMONTHYY: "31/Januar/99",
		ddMMMYYYY: "31/Jan/1999",
		ddMONTHYYYY: "31/Januar/1999",

		OPTION_DATE_SEPARATOR: "Datums-Trennzeichen",
		VALUE_SPACE: "Leerzeichen",
		VALUE_NONE: "Keins",

		MONTH_SHORT_1: "Jan",
		MONTH_SHORT_2: "Feb",
		MONTH_SHORT_3: "Mar",
		MONTH_SHORT_4: "Apr",
		MONTH_SHORT_5: "Mai",
		MONTH_SHORT_6: "Jun",
		MONTH_SHORT_7: "Jul",
		MONTH_SHORT_8: "Aug",
		MONTH_SHORT_9: "Sep",
		MONTH_SHORT_10: "Okt",
		MONTH_SHORT_11: "Nov",
		MONTH_SHORT_12: "Dez",

		MONTH_1: "Januar",
		MONTH_2: "Februar",
		MONTH_3: "März",
		MONTH_4: "April",
		MONTH_5: "Mai",
		MONTH_6: "Juni",
		MONTH_7: "Juli",
		MONTH_8: "August",
		MONTH_9: "September",
		MONTH_10: "Oktober",
		MONTH_11: "November",
		MONTH_12: "Dezember"
	},

	MenuCaptions: {
		OPTION_STYLE: "Überschriften-Stil",
		VALUE_SONY_DEFAULT: "Sony Standard",
		VALUE_ALWAYS_SMALL: "Immer klein",
		VALUE_ALWAYS_BIG: "Immer groß"
	},

	TextEncoding: {
		OPTION_TITLE: "TXT- und RTF-Bücher Codierung",
		MSG_RESTART: "Benötigt Neustart!",
		LATIN: "Latin",
		RUSSIAN:  "Russisch (Windows-1251)"
	},

	KeyBindings: {
		TITLE: "Tasteneinstellungen",
		DESCRIPTION: "Bindet Aktionen an Tasten",

		DEFAULT_VALUE: "Standardwert",

		// Contexts
		GLOBAL:  "Global",
		IN_MENU: "Im Menü",
		IN_BOOK:  "Im Buch",

		// Button groups
		NUM_BUTTONS: "Numerische Tasten",
		JP_BUTTONS: "Joypad-Tasten",
		OTHER_BUTTONS: "Andere Tasten",
		VOLUME_BUTTONS: "Lautstärke-Tasten",

		// Buttons
		BN_SIZE: "Zoom-Taste",
		BN_BOOKMARK: "Lesezeichen-Taste",
		BN_BL_NEXT: "Unten links 'weiter'",
		BN_BL_PREVIOUS: "Unten links 'zurück'",
		BN_SB_NEXT: "Seite 'weiter'",
		BN_SB_PREVIOUS:  "Seite 'zurück'",
		BN_MENU: "Menü-Taste",
		BN_JP_LEFT: "Joypad links",
		BN_JP_RIGHT: "Joypad rechts",
		BN_JP_UP: "Joypad hoch",
		BN_JP_DOWN: "Joypad runter",
		BN_JP_CENTER: "Joypad Mitte",
		BN_H_SIZE: "Zoom-Taste halten",
		BN_H_BOOKMARK: "Lesezeichen-Taste halten",
		BN_H_BL_NEXT: "Unten links 'weiter' halten",
		BN_H_BL_PREVIOUS: "Unten links 'zurück' halten",
		BN_H_MENU: "Menü-Taste halten",
		BN_H_SB_NEXT: "Seite 'weiter' halten",
		BN_H_SB_PREVIOUS: "Seite 'zurück' halten",
		BN_H_JP_CENTER: "Joypad Mitte halten",
		BN_H_1: "1 halten",
		BN_H_2: "2 halten",
		BN_H_3: "3 halten",
		BN_H_4: "4 halten",
		BN_H_5: "5 halten",
		BN_H_6: "6 halten",
		BN_H_7: "7 halten",
		BN_H_8: "8 halten",
		BN_H_9: "9 halten",
		BN_H_0: "0 halten",
		BN_1: "1",
		BN_2: "2",
		BN_3: "3",
		BN_4: "4",
		BN_5: "5",
		BN_6: "6",
		BN_7: "7",
		BN_8: "8",
		BN_9: "9",
		BN_0: "0",
		BN_VOLUME_DOWN: "Lautstärke -",
		BN_H_VOLUME_DOWN: "Lautstärke - halten",
		BN_VOLUME_UP: "Lautstärke +",
		BN_H_VOLUME_UP: "Lautstärke + halten"
	},		
	
	StandardActions: {
		// Actions
		ACTION_SHUTDOWN: "Gerät ausschalten",
		ACTION_NEXT_PAGE: "Nächste Seite",
		ACTION_PREVIOUS_PAGE: "Vorherige Seite",
		ACTION_NEXT_IN_HISTORY: "Nächstes im Verlauf",
		ACTION_PREVIOUS_IN_HISTORY: "Vorheriges im Verlauf",
		ACTION_PREVIOUS_SONG: "Vorheriges Lied",
		ACTION_NEXT_SONG: "Nächstes Lied",
		ACTION_GOTO_LINK: "Verknüpfung folgen"
	},

	Screenshot: {
		TITLE: "Screenshot",
		ACTION_TITLE: "Screenshot erstellen",
		SAVING_TO: "Speichere nach ",
		FAILED_TO_SAVE: "Fehler beim Speichern",
		OPT_SAVETO: "Speichern",
		OPT_FEEDBACK: "Fortschrittsanzeige",
		MEMORY_STICK: "auf Memory Stick",
		FEEDBACK_ON: "Ja",
		FEEDBACK_OFF: "Nein",
		SD_CARD: "auf SD-Karte",
		INTERNAL_MEMORY: "im Internen Speicher"
	},

	BrowseFolders: {
		TITLE:  "Verzeichnisse durchsuchen",
		OPTION_SORTING_MODE: "Sortier-Modus",
		VALUE_BY_TITLE: "Nach Titel",
		VALUE_BY_AUTHOR_THEN_TITLE: "Nach Autor, dann Titel",
		VALUE_BY_AUTHOR_SWAPPING: "Nach Autor, Namen vertauscht",
		VALUE_BY_FILENAME: "Nach Dateiname",
		OPTION_TITLE_SORTER: "Beim Sortieren 'titleSorter' benutzen",
		ENABLED: "Aktiviert",
		DISABLED: "Deaktiviert",
		OPTION_IM_ROOT: "Verzeichnis des internen Speichers",
		OPTION_CARD_SCAN: "SD/Memory Stick scannen",
		OPTION_MOUNT: "SD/Memory Stick mounten (experimentell)",
		NODE_RESCAN_INTERNAL_MEMORY: "Internen Speicher erneut scannen",
		NODE_COPY_TO_INTERNAL_MEMORY: "In den internen Speicher kopieren",
		NODE_COPY_TO_INTERNAL_MEMORY_COMMENT: "Kopiert Datei in das Wurzelverzeichnis des internen Speichers",
		NODE_COPY_AND_RESCAN: "Kopieren & internen Speicher erneut scannen",
		NODE_COPY_AND_RESCAN_COMMENT: "Kopiert Datei in das Wurzelverzeichnis des internen Speichers und scannt erneut",
		ERROR_TARGET_EXISTS: "Fehler, Zieldatei existiert bereits",
		NODE_BROWSE_FOLDERS: "Verzeichnisse durchsuchen",
		NODE_BROWSE_FOLDERS_COMMENT: "",
		NODE_INTERNAL_MEMORY: "Interner Speicher",
		NODE_MEMORY_STICK: "Memory Stick",
		NODE_MEMORY_STICK_MOUNT: "Memory Stick via mount",
		NODE_SD_CARD: "SD-Karte",
		NODE_SD_CARD_MOUNT: "SD-Karte via mount"
	},

	Clock: {
		TITLE: "Uhr",
		OPTION_STYLE: "Zeitanzeige",
		VALUE_24H: "24 Stunden",
		VALUE_12H: "12 Stunden",
		OPTION_MODE: "Zeitansicht",
		VALUE_ALWAYS_SHOWN: "Immer anzeigen",
		VALUE_SHOWN_ONLY_IN_MENU: "Nur im Menü anzeigen",
		VALUE_SHOWN_WHEN_READING: "Nur beim Lesen anzeigen",
		VALUE_OFF: "AUS",
		ACTION_TOGGLE_CLOCK: "Uhr ein-/ausschalten",
		AM: "am",
		PM: "pm"
	},

	PageIndex: {
		TITLE: "Seiten-Index",
		INDEX_STYLE_BOOK: "Index-Stil in Büchern",
		INDEX_MODE_BOOK: "Index-Modus in Büchern",
		INDEX_MODE_MENU: "Index-Modus im Menü",
		INDEX_STYLE_MENU: "Index-Stil im Menü",
		OF: "von",
		ALWAYS_SHOWN: "Immer anzeigen",
		NEVER_SHOWN: "Nie anzeigen",
		NOT_SHOWN_IF_SINGLE_PAGE: "Nicht bei einzelner Seite anzeigen",
		VALUE_STATS0: "5 / 100 (Seiten pro Minute)",
		VALUE_STATS1: "5 / 100 (Zeit bis Buch-Ende)",
		VALUE_STATS2: "5 / 100 (SpM / Zeit bis Buch-Ende)"
	},

	EpubUserStyle: {
		OPTION_EPUB_CSS_FILE: "EPUB benutzerdefinierter Stil (CSS-Datei)",
		MSG_WARNING: "Bücher nach Ändern neu öffnen!",
		VALUE_DISABLED: "Deaktiviert"
	},

	BookHistory: {
		FUNC_X_BOOKS: FUNC_X_BOOKS,
		FUNC_PAGE_X: FUNC_PAGE_X,
		TITLE: "Buch-Verlauf",
		VALUE_DISABLED: "Deaktiviert",
		OPTION_REPLACE: "Weiterlesen durch Verlauf ersetzen",
		VALUE_ON: "Aktiviert",
		VALUE_OFF: "Deaktiviert",
		OPTION_SKIP_BOOK_MENU: "Buch-Menü überspringen"
	},

//ReadMark	ReadMark: {
//		TITLE_UNREAD: "Buch als gelesen markieren",
//		TITLE_READ: "Buch als nicht gelesen markieren",
//	},

	TextScale: {
		OPTION_SCALE_DEFAULT: "Standardgröße",
		VALUE_SMALL: "Kleine Schrift (S)",
		VALUE_MEDIUM: "Mittlere Schrift (M)",
		VALUE_LARGE: "Große Schrift (L)",
		VALUE_DISABLED: "Deaktiviert",
		VALUE_ENABLED: "Aktiviert"
	},

	MenuTuning: {
		OPTION_OUTER: "Oberste Menü-Ebene besteht aus"
	},

	Dictionary: {
		TITLE: "Wörterbuch",
		WARN_DICT_DISABLED: "Wörterbuch ist deaktiviert!",
		WARN_DICT_DOESNT_EXIST: "Wörterbuch-Datei existiert nicht!",
		ACTION_DICTIONARY: "Wörterbuch öffnen",
		OPTION_DICTIONARY: "Wörterbuch-Datei",
		VALUE_DISABLED: "Deaktiviert"
	}
};
