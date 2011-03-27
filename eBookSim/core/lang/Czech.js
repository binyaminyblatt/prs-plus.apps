// Language: Czech
// Description: Localization file
// Translator: Hobogen
//
// History:
//	2010-05-06 kartu - Initial version by Hobogen @ mobileread
//	2010-05-11 kartu - Added VALUE_DEFAULT_DATE (CoreLang)
//	2010-05-15 kartu - Added OPTION_SKIP_BOOK_MENU (BookHistory)
//	2010-05-15 kartu - Added PAGE (BookHistory)
//	2010-05-17 kravitz - Replaced PAGE (BookHistory) with added FUNC_PAGE_X
//	2010-05-18 kartu - Merged with Hobogen's fixes
//	2010-05-18 kravitz - Replaced PAGE (Sony) with FUNC_PAGE_X
//	2010-05-20 kartu - Removed script reference from about string
//	2010-06-29 kartu - Split KeyBindings keys into KeyBindings and StandardActions
//				Added 0-9 translations

var FUNC_X_SOMETHING = function (n, s) {
	if (n > 4) {
		return n + " " + s[0];
	}
	if (n >= 2 && n <= 4){
		return n + " " + s[1];
	}
	if (n == 1) {
		return s[2];
	}
	return s[3];
};

var FUNC_X_BOOKS = function (n) {
	return FUNC_X_SOMETHING(n, ["knih", "knihy", "1 kniha", "Žádná kniha"]);
};

var FUNC_X_SETTINGS = function (n) {
	return FUNC_X_SOMETHING(n, ["nastavení", "nastavení", "1 nastavení", "Žádné nastavení"]);
};

var FUNC_X_ITEMS = function (n) {
	return FUNC_X_SOMETHING(n, ["položek", "položky", "1 položka", "Žádná položka"]);
};

var FUNC_X_PAGES = function (n) {
	if (n === 0) {
		return "0 stran";
	}
	return "strana " + n;
};

var FUNC_X_PICTURES = function (n) {
	return FUNC_X_SOMETHING(n, ["obrázků", "obrázky", "1 obrázek", "Žádný obrázek"]);
};

var FUNC_X_SONGS = function (n) {
	return FUNC_X_SOMETHING(n, ["nahrávek", "nahrávky", "1 nahrávka", "Žádná nahrávka"]);
};

var FUNC_X_BOOKMARKS = function (n) {
	return FUNC_X_SOMETHING(n, ["záložek", "záložky", "1 záložka", "Žádná záložka"]);
};

var FUNC_X_COLLECTIONS = function (n) {
	return FUNC_X_SOMETHING(n, ["kolekcí", "kolekce", "1 kolekce", "Žádná kolekce"]);
};

var FUNC_PAGE_X = function (n) {
	return "strana " + n;
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
		DO_NOT_DISCONNECT: "Neodpojujte",
		USB_CONNECTED: "USB připojeno",
		DEVICE_LOCKED: "Zařízení zamčeno",

		// About, translate either all or none
		ABOUT_PRSP: "PRS+ @@@firmware@@@\n" + "Author: Mikheil Sukhiashvili aka kartu (kartu3@gmail.com) using work of: " + "igorsk, boroda, obelix, pepak, kravitz and others.\n" + "© GNU Lesser General Public License.",
		ABOUT_1: "Copyright ©2006-2008 Sony Corporation",
		ABOUT_2: "Adobe, the Adobe logo, Reader and PDF are either registered trademarks or" + " trademarks of Adobe Systems Incorporated in the United States and/or other countries.",
		ABOUT_3: "MPEG Layer-3 audio coding technology and patents licensed by Fraunhofer IIS and Thomson." + " MPEG-4 AAC audio coding technology licensed by Fraunhofer IIS (www.iis.fraunhofer.de/amm/).",
		ABOUT_4: "Application software designed and implemented by Kinoma (www.kinoma.com). Portions Copyright ©2006,2007 Kinoma, Inc.",
		ABOUT_5: "Bitstream is a registered trademark, and Dutch, Font Fusion, and Swiss are trademarks, of Bitstream, Inc.",
		ABOUT_6: "Portions of this software are Copyright ©2005 The FreeType Project (www.freetype.org). All rights reserved.",
		ABOUT_7: "This software is based in part on the work of the Independent JPEG Group.",
		AUTHORIZED_SONY: "Authorized for the eBook Store.",
		NOT_AUTHORIZED_SONY: "Not authorized for the eBook Store.",
		AUTHORIZED_ADOBE: "This device is authorized for Adobe DRM protected content.",
		NOT_AUTHORIZED_ADOBE: "This device is not authorized for Adobe DRM protected content.",
		SONY_FW_VERSION: "Version",
		DEVICE_ID: "Device",

		// Mime & card names
		RICH_TEXT_FORMAT: "Rich Text Format",
		ADOBE_PDF: "Adobe PDF",
		EPUB_DOCUMENT: "EPUB dokument",
		BBEB_BOOK: "BBeB Book",
		PLAIN_TEXT: "Prostý text",
		INTERNAL_MEMORY: "Vniřní paměť",
		MEMORY_STICK: "Memory Stick",
		SD_CARD: "SD karta",

		// Main.xml & kbook.so stuff
		INVALID_FORMAT: "Neplatný formát!",
		FORMATTING: "Formátováni...",
		LOADING: "Načítání...",
		LOW_BATTERY: "Slabá baterie!",
		HR_WARNING: "Chcete VYMAZAT všechen obsah, obnovit tovární nastavení a vymazat nastavení DRM?\n\nAno - Stiskni 5\nNe - Stiskni 'Menu'",
		DEVICE_SHUTDOWN: "Vypnout zařízení",
		PRESS_MARK_TO_SHUTDOWN: "Pro vypnutí zařízení",
		THIS_DEVICE: "zmáčkněte 'Záložku'.",
		PRESS_MARK_TO_DELETE: "Zmáčkněte 'Záložku' pro",
		THIS_BOOK: "vymazání této knihy.",
		FORMAT_INTERNAL_MEMORY: "Vymazat vnitřní paměť",
		PRESS_MARK_TO_FORMAT: "Zmáčkněte 'Záložku' pro",
		MSG_INTERNAL_MEMORY: "vymazání vnitřní paměti.",
		RESTORE_DEFAULTS: "Obnovit tovární nastavení",
		PRESS_MARK_TO_RESTORE: "Pro obnovu nastavení",
		DEFAULT_SETTINGS: "zmáčkněte 'Záložku'.",
		UPPER_PAGE: "strana",
		ONE_OF_ONE: "1 z 1",
		NO_BATTERY: "Vybitá baterie!",
		FORMATTING_INTERNAL_MEMORY: "Mazání vnitřní paměti...",
		SHUTTING_DOWN: "Vypínání...",

		// Root menu
		CONTINUE: "Pokračovat ve čtení",
		BOOKS_BY_TITLE: "Knihy podle názvu",
		BOOKS_BY_AUTHOR: "Knihy podle autora",
		BOOKS_BY_DATE: "Knihy podle data",
		COLLECTIONS: "Kolekce",
		ALL_BOOKMARKS: "Všechny záložky",
		NOW_PLAYING: "Přehrává se",
		MUSIC: "Audio",
		PICTURES: "Obrázky",
		SETTINGS: "Nastavení",

		// In Settings
		// orientation
		ORIENTATION: "Orientace",
		HORIZONTAL: "Horizontální",
		VERTICAL: "Vertikální",
		// set date
		SET_DATE: "Datum a čas",
		YEAR: "Rok",
		MONTH: "Měsíc",
		DATE: "Den", // Day
		HOUR: "Hodina",
		MINUTE: "Minuta",
		SETDATE_OK: "OK",
		// width in pixels = ..._SIZE * 35
		SETDATE_OK_SIZE: 2,
		// slideshow
		SLIDESHOW: "Prezentace",
		SS_ON: "Zap",
		SS_OFF: "Vyp",
		SS_TURN: "Stav",
		SS_DURATION: "Trvání snímku",
		// width in pixels = ..._SIZE * 35
		SS_SIZE: 3,
		SS_OK: "OK",
		// width in pixels = ..._SIZE * 35
		SS_OK_SIZE: 2,
		SECONDS: "vteřin",
		// auto standby (aka sleep mode)
		AUTOSTANDBY: "Režim spánku",
		AS_ON: "Zap",
		AS_OFF: "Vyp",
		AS_TURN: "Stav",
		// width in pixels = ..._SIZE * 35
		AS_SIZE: 3,
		AS_OK: "OK",
		// width in pixels = ..._SIZE * 35
		AS_OK_SIZE: 2,
		// about
		ABOUT: "O zařízení",
		// reset to factory settings

		RESET_TO_FACTORY: "Obnovit tovární nastavení",

		// In Advanced Settings
		ADVANCED_SETTINGS: "Pokročilé nastavení",
		// screen lock (aka device lock)
		SCREEN_LOCK: "Zamčít zařízení",
		SL_OFF: "Odemčeno",
		SL_ON: "Zamčeno",
		SL_CODE: "Kód",
		SL_TURN: "Stav",
		// width in pixels = ..._SIZE * 35
		SL_SIZE: 6,
		SL_OK: "OK",
		SL_OK_SIZE: 2,
		SL_OK_UNLOCK: "Odemčít", // unlock
		// width in pixels = ..._SIZE * 35
		SL_OK_UNLOCK_SIZE: 6,
		// format device
		FORMAT_DEVICE: "Vymazat vnitřní paměť",

		// In Book menu
		BEGIN: "Začátek",
		END: "Konec",
		BOOKMARKS: "Záložky",
		CONTENTS: "Obsah",
		HISTORY: "Historie",
		INFO: "Info",
		UTILITIES: "Pomůcky",

		// In Book Utilities
		REMOVE_ALL_BOOKMARKS: "Vymazat všechny záložky",
		CLEAR_HISTORY: "Vymazat historii",
		DELETE_BOOK: "Vymazat knihu",

		// In Books by Date
		TODAY: "Dnes",
		EARLIER_THIS_WEEK: "Dříve v tomto týdnu",
		LAST_WEEK: "Minulý týden",
		EARLIER_THIS_MONTH: "Dříve v tomto měsíci",
		LAST_MONTH: "Minulý měsíc",
		EARLIER_THIS_QUARTER: "Dříve v tomto čtvrtletí",
		LAST_QUARTER: "Minulé čtvrtletí",
		EARLIER_THIS_YEAR: "Dříve v tomto roce",
		LAST_YEAR: "Minulý rok",
		OLDER: "Starší",

		FUNC_PAGE_X: FUNC_PAGE_X,
		PART: "část",
		OF: "z",
		NO_BOOK: "Žádná kniha",
		NO_SONG: "Žádná nahrávka ",

		// Info title strings, comma separated, no spaces after comma
		INFO_TITLES: "Obal,Název,Autor,Vydavatel,Kategorie,ID knihy,Styl,Datum,Velikost,Místo,Soubor,Digitální práva,Vyprší",

		// Titles and criterions for "Books by Title" and "Books by Folder"
		// title is displayed, "criterion" is used for sorting.
		//
		// NOTE: if localization doesn't need custom Books by sorting, just remove CUSTOM_SORT, TITLE_*, CRITERION_* items
		CUSTOM_SORT: true,
		TITLE_1: "0-9",
		CRITERION_1: "0123456789",
		TITLE_2: "A B C Č",
		CRITERION_2: "ABCČabcč",
		TITLE_3: "D E F G",
		CRITERION_3: "DĎEÉĚFGdďeéěfg",
		TITLE_4: "H I J",
		CRITERION_4: "HIÍjhiíj",
		TITLE_5: "K L M",
		CRITERION_5: "KLMklm",
		TITLE_6: "N O P Q",
		CRITERION_6: "NŇOÓPQnňoópq",
		TITLE_7: "R Ř S Š",
		CRITERION_7: "RŘSŠrřsš",
		TITLE_8: "T U V W",
		CRITERION_8: "TŤUÚŮVWtuúůvw",
		TITLE_9: "X Y Z Ž",
		CRITERION_9: "XYÝZŽxyýzž",
		TITLE_0: "Ostatní",
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
		NODE_PRSP_SETTINGS:  "PRS+ nastavení",
		NODE_OTHERS: "Multimédia",
		NODE_GAMES_AND_UTILS: "Hry a pomůcky",
		GROUP_MENU_TITLE: "Nastavení menu",
		GROUP_VIEWER_TITLE: "Nastavení čtečky"
	},

	CoreLang: {
		TITLE: "Lokalizace",
		COMMENT: "Vyžaduje restart",
		OPTION_LANG: "Jazyk",

		OPTION_DATE_FORMAT: "Formát data",
		VALUE_DEFAULT_DATE: "Základní",
		ddMMMYY: "31/Led/99",
		ddMONTHYY: "31/Leden/99",
		ddMMMYYYY: "31/Led/1999",
		ddMONTHYYYY: "31/Leden/1999",

		OPTION_DATE_SEPARATOR: "Oddělovač data",
		VALUE_SPACE: "Mezera",
		VALUE_NONE: "Nic",

		MONTH_SHORT_1: "Led",
		MONTH_SHORT_2: "Úno",
		MONTH_SHORT_3: "Bře",
		MONTH_SHORT_4: "Dub",
		MONTH_SHORT_5: "Kvě",
		MONTH_SHORT_6: "Čen",
		MONTH_SHORT_7: "Čec",
		MONTH_SHORT_8: "Srp",
		MONTH_SHORT_9: "Zář",
		MONTH_SHORT_10: "Říj",
		MONTH_SHORT_11: "Lis",
		MONTH_SHORT_12: "Pro",

		MONTH_1: "Leden",
		MONTH_2: "Únor",
		MONTH_3: "Březen",
		MONTH_4: "Duben",
		MONTH_5: "Květen",
		MONTH_6: "Červen",
		MONTH_7: "Červenec",
		MONTH_8: "Srpen",
		MONTH_9: "Září",
		MONTH_10: "Říjen",
		MONTH_11: "Listopad",
		MONTH_12: "Prosinec"
	},

	MenuCaptions: {
		OPTION_STYLE: "Vzhled nadpisů menu",
		VALUE_SONY_DEFAULT: "Standardní Sony",
		VALUE_ALWAYS_SMALL: "Vždy malé",
		VALUE_ALWAYS_BIG: "Vždy velké"
	},

	TextEncoding: {
		OPTION_TITLE: "Kódování TXT a RTF knih",
		MSG_RESTART: "Vyžaduje restart!",
		LATIN: "Latinka",
		RUSSIAN:  "Azbuka (Windows-1251)"
	},

	KeyBindings: {
		TITLE: "Klávesové zkratky",
		DESCRIPTION: "Povolí nastavení akcí tlačítek",

		DEFAULT_VALUE: "Základní",

		// Contexts
		GLOBAL:  "Globální",
		IN_MENU: "V menu",
		IN_BOOK:  "Při čtení knihy",

		// Button groups
		NUM_BUTTONS: "Číselná tlačítka",
		JP_BUTTONS: "Směrová tlačítka",
		OTHER_BUTTONS: "Ostatní tlačítka",
		VOLUME_BUTTONS: "Zvuková tlačítka",

		// Buttons
		BN_SIZE: "Tlačítko 'Velikost'",
		BN_BOOKMARK: "Tlačítko 'Záložka'",
		BN_BL_NEXT: "Levé spodní 'Další strana'",
		BN_BL_PREVIOUS: "Levé spodní 'Předchozí strana'",
		BN_SB_NEXT: "Boční 'Další strana'",
		BN_SB_PREVIOUS:  "Boční 'Předchozí strana'",
		BN_MENU: "Tlačítko 'Menu'",
		BN_JP_LEFT: "Vlevo",
		BN_JP_RIGHT: "Vpravo",
		BN_JP_UP: "Nahoru",
		BN_JP_DOWN: "Dolů",
		BN_JP_CENTER: "Potvrdit",
		BN_H_SIZE: "Podržení tlačítka 'Velikost'",
		BN_H_BOOKMARK: "Podržení tlačítka 'Záložka'",
		BN_H_BL_NEXT: "Podržení levého spodního 'Další strana'",
		BN_H_BL_PREVIOUS: "Podržení levého spodního 'Předchozí strana'",
		BN_H_MENU: "Podržení tlačítka 'Menu'",
		BN_H_SB_NEXT: "Podržení bočního 'Další strana'",
		BN_H_SB_PREVIOUS: "Podržení bočního 'Předchozí strana'",
		BN_H_JP_CENTER: "Podržení tlačítka 'Potvrdit'",
		BN_H_1: "Podržení 1",
		BN_H_2: "Podržení 2",
		BN_H_3: "Podržení 3",
		BN_H_4: "Podržení 4",
		BN_H_5: "Podržení 5",
		BN_H_6: "Podržení 6",
		BN_H_7: "Podržení 7",
		BN_H_8: "Podržení 8",
		BN_H_9: "Podržení 9",
		BN_H_0: "Podržení 0",
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
		BN_VOLUME_DOWN: "Zvuk -",
		BN_H_VOLUME_DOWN: "Podržení zvuk -",
		BN_VOLUME_UP: "Zvuk +",
		BN_H_VOLUME_UP: "Podržení zvuk +",
	},		
	
	StandardActions: {
		// Actions
		ACTION_SHUTDOWN: "Vypnout",
		ACTION_NEXT_PAGE: "Další strana",
		ACTION_PREVIOUS_PAGE: "Předchozí strana",
		ACTION_NEXT_IN_HISTORY: "Další v historii",
		ACTION_PREVIOUS_IN_HISTORY: "Předchozí v historii",
		ACTION_PREVIOUS_SONG: "Předchozí nahrávka",
		ACTION_NEXT_SONG: "Další nahrávka",
		ACTION_GOTO_LINK: "Běž na odkaz"
	},

	Screenshot: {
		TITLE: "Snímek obrazovky",
		ACTION_TITLE: "Uložit snímek obrazovky",
		SAVING_TO: "Ukládám na ",
		FAILED_TO_SAVE: "Uložení se nezdařilo",
		OPT_SAVETO: "Uložit na",
		OPT_FEEDBACK: "Ukázat postup ukládání",
		MEMORY_STICK: "Memory stick",
		FEEDBACK_ON: "Zap",
		FEEDBACK_OFF: "Vyp",
		SD_CARD: "SD kartu",
		INTERNAL_MEMORY: "Vnitřní paměť"
	},

	BrowseFolders: {
		TITLE:  "Procházet složky",
		OPTION_SORTING_MODE: "Seřadit",
		VALUE_BY_TITLE: "Podle názvu",
		VALUE_BY_AUTHOR_THEN_TITLE: "Podle autora pak názvu",
		VALUE_BY_AUTHOR_SWAPPING: "Podle jména/příjmení autora",
		VALUE_BY_FILENAME: "Podle jména souboru",
		OPTION_TITLE_SORTER: "Použít 'titleSorter' pole při řazení",
		ENABLED: "Povoleno",
		DISABLED: "Zakázáno",
		OPTION_IM_ROOT: "Kořenový adresář vnitřní paměti",
		OPTION_CARD_SCAN: "Načíst SD/MS kartu",
		OPTION_MOUNT: "Namountovat SD/MS (experimentální)",
		NODE_RESCAN_INTERNAL_MEMORY: "Znovu načíst vnitřní paměť",
		NODE_COPY_TO_INTERNAL_MEMORY: "Zkopírovat do vnitřní paměti",
		NODE_COPY_TO_INTERNAL_MEMORY_COMMENT: "Kopíruje data do vnitřní paměti",
		NODE_COPY_AND_RESCAN: "Zkopírovat a znovunačíst vnitřní paměť",
		NODE_COPY_AND_RESCAN_COMMENT: "Kopíruje data do vnitřní paměti and znovunačítá knihy",
		ERROR_TARGET_EXISTS: "Chyba, cílový soubor existuje",
		NODE_BROWSE_FOLDERS: "Procházet složky",
		NODE_BROWSE_FOLDERS_COMMENT: "Procházet paměť",
		NODE_INTERNAL_MEMORY: "Vnitřní paměť",
		NODE_MEMORY_STICK: "Memory Stick",
		NODE_MEMORY_STICK_MOUNT: "Memory Stick přes Mount",
		NODE_SD_CARD: "SD karta",
		NODE_SD_CARD_MOUNT: "SD karta přes Mount"
	},

	Clock: {
		TITLE: "Hodiny",
		OPTION_STYLE: "Nastavení hodin",
		VALUE_24H: "24 hodin",
		VALUE_12H: "12 hodin",
		OPTION_MODE: "Zobrazení hodin",
		VALUE_ALWAYS_SHOWN: "Vždy zobrazit",
		VALUE_SHOWN_ONLY_IN_MENU: "Zobrazit jen v menu",
		VALUE_SHOWN_WHEN_READING: "Zobrazit jen při čtení",
		VALUE_OFF: "Vyp",
		ACTION_TOGGLE_CLOCK: "Přepnout hodiny",
		AM: "am",
		PM: "pm"
	},

	PageIndex: {
		TITLE: "Číslování stran",
		INDEX_STYLE_BOOK: "Vzhled číslování v knihách",
		INDEX_MODE_BOOK: "Zobrazení číslování v knihách",
		INDEX_MODE_MENU: "Vzhled číslování v menu",
		INDEX_STYLE_MENU: "Zobrazení číslování v menu",
		OF: "z",
		ALWAYS_SHOWN: "Vždy zobrazovat",
		NEVER_SHOWN: "Nikdy nazobrazovat",
		NOT_SHOWN_IF_SINGLE_PAGE: "Nezobrazovat na samostatných stranách",
		VALUE_STATS0: "5 / 100 (stran za minutu)",
		VALUE_STATS1: "5 / 100 (čas do konce knihy)",
		VALUE_STATS2: "5 / 100 (str. min. / čas do konce)"
	},

	EpubUserStyle: {
		OPTION_EPUB_CSS_FILE: "Vlastní styl pro EPUB (CSS soubor)",
		MSG_WARNING: "Funguje jenom pro nově otevřené knihy!",
		VALUE_DISABLED: "Zakázáno"
	},

	BookHistory: {
		FUNC_X_BOOKS: FUNC_X_BOOKS,
		FUNC_PAGE_X: FUNC_PAGE_X,
		TITLE: "Historie",
		VALUE_DISABLED: "Zakázána",
		OPTION_REPLACE: "Historie místo Pokračuj ve čtení",
		VALUE_ON: "Zap",
		VALUE_OFF: "Vyp",
		OPTION_SKIP_BOOK_MENU: "Přeskočit menu knihy"
	},

//ReadMark	ReadMark: {
//		TITLE_UNREAD: "Označit knihu - Přečteno",
//		TITLE_READ: "Označit knihu - Nepřečteno",
//	},

	TextScale: {
		OPTION_SCALE_DEFAULT: "Základní velikost",
		VALUE_SMALL: "(S) Malá velikost",
		VALUE_MEDIUM: "(M) Střední velikost",
		VALUE_LARGE: "(L) Velká velikost",
		VALUE_DISABLED: "Zakázána",
		VALUE_ENABLED: "Povolena"
	},

	MenuTuning: {
		OPTION_OUTER: "Základní menu obsahuje"
	},

	Dictionary: {
		TITLE: "Slovník",
		WARN_DICT_DISABLED: "Slovník je vypnut!",
		WARN_DICT_DOESNT_EXIST: "Soubor slovníku neexistuje!",
		ACTION_DICTIONARY: "Spustit slovník",
		OPTION_DICTIONARY: "Soubor slovníku",
		VALUE_DISABLED: "Zakázán"
	}
};
