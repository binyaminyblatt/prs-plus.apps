// Language: Сatalan
// Description: Localization file
// Translator: surquizu
//
// History:
//	2010-04-30 kravitz - Refactored, added new strings
//	2010-05-01 kartu - Added ACTION_GOTO_LINK
//	2010-05-01 Translation is corrected by surquizu
//	2010-05-02 kartu - Added dictionary strings
//	2010-05-02 kartu - Added translations and sizes for a number of strings, including "OK"
//	2010-05-03 kravitz - Renamed ReadingList to BookHistory, added new strings, refactored MenuTuning
//	2010-05-06 kartu - Added ppm related translations for PageIndex addon
//	2010-05-07 Translation is corrected by surquizu
//	2010-05-09 kartu - Added surquizu's corrections
//	2010-05-11 kartu - Added VALUE_DEFAULT_DATE (CoreLang)
//	2010-05-15 kartu - Added OPTION_SKIP_BOOK_MENU (BookHistory)
//	2010-05-15 kartu - Added PAGE (BookHistory)
//	2010-05-17 kravitz - Replaced PAGE (BookHistory) with added FUNC_PAGE_X
//	2010-05-18 kartu - Merged with surquizu corrections
//	2010-05-18 kravitz - Replaced PAGE (Sony) with FUNC_PAGE_X
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
	return FUNC_X_SOMETHING(n, ["llibres", "1 llibre", "Cap llibre"]);
};
var FUNC_X_SETTINGS = function (n) {
	return FUNC_X_SOMETHING(n, ["opcions", "1 opció", "Cap opció"]);
};
var FUNC_X_ITEMS = function (n) {
	return FUNC_X_SOMETHING(n, ["elements", "1 element", "Cap element"]);
};
var FUNC_X_PAGES = function (n) {
	return FUNC_X_SOMETHING(n, ["pàgines", "1 pàgina", "Cap pàgina"]);
};
var FUNC_X_PICTURES = function (n) {
	return FUNC_X_SOMETHING(n, ["imatges", "1 imatge", "Cap imatge"]);
};
var FUNC_X_SONGS = function (n) {
	return FUNC_X_SOMETHING(n, ["cançons", "1 cançó", "Cap cançó"]);
};
var FUNC_X_BOOKMARKS = function (n) {
	return FUNC_X_SOMETHING(n, ["marcadors", "1 marcador", "Cap marcador"]);
};
var FUNC_X_COLLECTIONS = function (n) {
	return FUNC_X_SOMETHING(n, ["col·leccions", "1 col·lecció", "Cap col·lecció"]);
};

var FUNC_PAGE_X = function (n) {
	return "Pàgina " + n;
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
		DO_NOT_DISCONNECT: "No Desconectar!",
		USB_CONNECTED: "USB conectat",
		DEVICE_LOCKED: "Lector Bloquejat",

		// About, translate either all or none
		ABOUT_PRSP: "PRS+ @@@firmware@@@\n" + "Autor: Mikheil Sukhiashvili aka kartu (kartu3@gmail.com) using work of: " + "igorsk, boroda, obelix, pepak, kravitz and others.\n" + "© GNU Lesser General Public License.",
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
		RICH_TEXT_FORMAT: "Text de Format Enriquit",
		ADOBE_PDF: "Adobe PDF",
		EPUB_DOCUMENT: "Document EPUB",
		BBEB_BOOK: "Llibre BBeB",
		PLAIN_TEXT: "Text Sense Format",
		INTERNAL_MEMORY: "Memòria Interna",
		MEMORY_STICK: "Memory Stick",
		SD_CARD: "Targeta SD",

		// Main.xml & kbook.so stuff
		INVALID_FORMAT: "Format No Vàlid!",
		FORMATTING: "Formatejant...",
		LOADING: "Carregant ...",
		LOW_BATTERY: "Batería Baixa!",
		HR_WARNING: "Vols ESBORRAR tot el contingut i restablir la Configuració inicial i l'estat de l'autorització del DRM?\n\nSi - Clica 5\nNo - Clica MENU",
		DEVICE_SHUTDOWN: "Apagar Lector",
		PRESS_MARK_TO_SHUTDOWN: "Clica MARK per apagar",
		THIS_DEVICE: "el lector.",
		PRESS_MARK_TO_DELETE: "Clica MARK per",
		THIS_BOOK: "esborrar el llibre.",
		FORMAT_INTERNAL_MEMORY: "Formatejar Memòria Interna",
		PRESS_MARK_TO_FORMAT: "Clica MARK per formatejar",
		MSG_INTERNAL_MEMORY: "la memòria interna.",
		RESTORE_DEFAULTS: "Restablir Valors Inicials",
		PRESS_MARK_TO_RESTORE: "Clica MARK per restablir",
		DEFAULT_SETTINGS: "els valors inicials.",
		UPPER_PAGE: "PÀGINA",
		ONE_OF_ONE: "1 de 1",
		NO_BATTERY: "Sense Batería!",
		FORMATTING_INTERNAL_MEMORY: "Formatejant Memòria Interna...",
		SHUTTING_DOWN: "Apagant...",

		// Root menu
		CONTINUE: "Continuar Llegint",
		BOOKS_BY_TITLE: "Llibres per Títol",
		BOOKS_BY_AUTHOR: "Llibres per Autor",
		BOOKS_BY_DATE: "Llibres per Data",
		COLLECTIONS: "Col·leccions",
		ALL_BOOKMARKS: "Marcadors",
		NOW_PLAYING: "Reproduint-se Ara",
		MUSIC: "Àudio",
		PICTURES: "Imatges",
		SETTINGS: "Configuració",

		// In Settings
		// orientation
		ORIENTATION: "Orientació",
		HORIZONTAL: "Horitzontal",
		VERTICAL: "Vertical",
		// set date
		SET_DATE: "Data i Hora",
		YEAR: "Any",
		MONTH: "Mes",
		DATE: "Día", // Day
		HOUR: "Hora",
		MINUTE: "Minut",
		SETDATE_OK: "OK",
		// width in pixels = ..._SIZE * 35
		SETDATE_OK_SIZE: 2,
		// slideshow
		SLIDESHOW: "Diapositives",
		SS_ON: "Activat",
		SS_OFF: "Desactivat",
		SS_TURN: "Estat",
		SS_DURATION: "Durada",
		// width in pixels = ..._SIZE * 35
		SS_SIZE: 6,
		SS_OK: "OK",
		// width in pixels = ..._SIZE * 35
		SS_OK_SIZE: 2,

		SECONDS: "Segons",
		// auto standby (aka sleep mode)
		AUTOSTANDBY: "Mode en Repòs",
		AS_ON: "Activat",
		AS_OFF: "Desactivat",
		AS_TURN: "Estat",
		// width in pixels = ..._SIZE * 35
		AS_SIZE: 6,
		AS_OK: "OK",
		// width in pixels = ..._SIZE * 35
		AS_OK_SIZE: 2,
		// about
		ABOUT: "Sobre el Reader",
		// reset to factory settings
		RESET_TO_FACTORY: "Valors Inicials",

		// In Advanced Settings
		ADVANCED_SETTINGS: "Configuració Avançada",
		// screen lock (aka device lock)
		SCREEN_LOCK: "Bloquejar Lector",
		SL_OFF: "Desactivat",
		SL_ON: "Activat",
		SL_CODE: "Codi",
		SL_TURN: "Estat",
		// width in pixels = ..._SIZE * 35
		SL_SIZE: 6,
		SL_OK: "OK",
		SL_OK_SIZE: 2,
		SL_OK_UNLOCK: "OK", // unlock
		// width in pixels = ..._SIZE * 35
		SL_OK_UNLOCK_SIZE: 2,
		// format device
		FORMAT_DEVICE: "Formatejar Lector",

		// In Book menu
		BEGIN: "Inici",
		END: "Final",
		BOOKMARKS: "Marcadors",
		CONTENTS: "Index de Continguts",
		HISTORY: "Historial",
		INFO: "Informació",
		UTILITIES: "Utilitats",

		// In Book Utilities
		REMOVE_ALL_BOOKMARKS: "Esborrar Marcadors",
		CLEAR_HISTORY: "Esborrar Historial",
		DELETE_BOOK: "Esborrar Llibre",

		// In Books by Date
		TODAY: "Avui",
		EARLIER_THIS_WEEK: "Principis de Setmana",
		LAST_WEEK: "Darrera Setmana",
		EARLIER_THIS_MONTH: "Principis de Mes",
		LAST_MONTH: "Darrer Mes",
		EARLIER_THIS_QUARTER: "Principis de Trimestre",
		LAST_QUARTER: "Darrer Trimestre",
		EARLIER_THIS_YEAR: "Principis d'Any",
		LAST_YEAR: "Darrer Any",
		OLDER: "Mes Antics",

		FUNC_PAGE_X: FUNC_PAGE_X,
		PART: "Part",
		OF: "de",
		NO_BOOK: "Cap llibre",
		NO_SONG: "Cap cançó",

		// Info title strings, comma separated, no spaces after comma
		INFO_TITLES: "Portada,Títol,Autor,Editorial,Categoría,ID eBook,Tipus,Data,Mida,Ubicació,Arxiu,Drets Digitals,Caducitat",

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
		TITLE_0: "Altres",
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
		NODE_PRSP_SETTINGS: "Configuració PRS+",
		NODE_OTHERS: "Multimèdia",
		NODE_GAMES_AND_UTILS: "Jocs - Aplicacions",
		GROUP_MENU_TITLE: "Menú Configuració",
		GROUP_VIEWER_TITLE: "Visor Configuració Llibre"
	},

	CoreLang: {
		TITLE: "Localització",
		COMMENT: "Cal reiniciar",
		OPTION_LANG: "Idioma",

		OPTION_DATE_FORMAT: "Format data",
		VALUE_DEFAULT_DATE: "Per defecte",
		ddMMMYY: "31/Gen/99",
		ddMONTHYY: "31/Gener/99",
		ddMMMYYYY: "31/Gen/1999",
		ddMONTHYYYY: "31/Gener/1999",

		OPTION_DATE_SEPARATOR: "Separador data",
		VALUE_SPACE: "Espai",
		VALUE_NONE: "Cap",

		MONTH_SHORT_1: "Gen",
		MONTH_SHORT_2: "Feb",
		MONTH_SHORT_3: "Mar",
		MONTH_SHORT_4: "Abr",
		MONTH_SHORT_5: "Mai",
		MONTH_SHORT_6: "Jun",
		MONTH_SHORT_7: "Jul",
		MONTH_SHORT_8: "Ago",
		MONTH_SHORT_9: "Set",
		MONTH_SHORT_10: "Oct",
		MONTH_SHORT_11: "Nov",
		MONTH_SHORT_12: "Dec",

		MONTH_1: "Gener",
		MONTH_2: "Febrer",
		MONTH_3: "Març",
		MONTH_4: "Abril",
		MONTH_5: "Maig",
		MONTH_6: "Juny",
		MONTH_7: "Juliol",
		MONTH_8: "Agost",
		MONTH_9: "Setembre",
		MONTH_10: "Octubre",
		MONTH_11: "Novembre",
		MONTH_12: "Decembre"
	},

	MenuCaptions: {
		OPTION_STYLE: "Estil Títols",
		VALUE_SONY_DEFAULT: "Original Sony",
		VALUE_ALWAYS_SMALL: "Títols petits",
		VALUE_ALWAYS_BIG: "Títols grans"
	},

	TextEncoding: {
		OPTION_TITLE: "Codificació TXT i RTF",
		MSG_RESTART: "Cal reiniciar!",
		LATIN: "Caràcters llatins",
		RUSSIAN: "Caràcters russos (W-1251)"
	},

	KeyBindings: {
		TITLE: "Configuració Tecles",
		DESCRIPTION: "Permet asignar accions a les tecles",

		DEFAULT_VALUE: "Per defecte",

		// Contexts
		GLOBAL: "En tot moment",
		IN_MENU: "En els menús",
		IN_BOOK: "Durant la lectura",

		// Button groups
		NUM_BUTTONS: "Tecles numèriques",
		JP_BUTTONS: "Tecles del Joypad",
		OTHER_BUTTONS: "Altres tecles",
		VOLUME_BUTTONS: "Tecles del volum",

		// Buttons
		BN_SIZE: "Zoom",
		BN_BOOKMARK: "Mark",
		BN_BL_NEXT: "Abaix esquerra 'següent'",
		BN_BL_PREVIOUS: "Abaix esquerra 'anterior'",
		BN_SB_NEXT: "Lateral 'seguent'",
		BN_SB_PREVIOUS: "Lateral 'anterior'",
		BN_MENU: "Menú",
		BN_JP_LEFT: "Joypad esquerre",
		BN_JP_RIGHT: "Joypad dreta",
		BN_JP_UP: "Joypad amunt",
		BN_JP_DOWN: "Joypad abaix",
		BN_JP_CENTER: "Joypad centre",
		BN_H_SIZE: "Mantenir zoom",
		BN_H_BOOKMARK: "Mantenir Mark",
		BN_H_BL_NEXT: "Mantenir abaix esq. 'següent'",
		BN_H_BL_PREVIOUS: "Mantenir abaix esq. 'anterior'",
		BN_H_MENU: "Mantenir menú",
		BN_H_SB_NEXT: "Mantenir lateral 'següent'",
		BN_H_SB_PREVIOUS: "Mantenir lateral 'anterior'",
		BN_H_JP_CENTER: "Mantenir joypad centre",
		BN_H_1: "Mantenir 1",
		BN_H_2: "Mantenir 2",
		BN_H_3: "Mantenir 3",
		BN_H_4: "Mantenir 4",
		BN_H_5: "Mantenir 5",
		BN_H_6: "Mantenir 6",
		BN_H_7: "Mantenir 7",
		BN_H_8: "Mantenir 8",
		BN_H_9: "Mantenir 9",
		BN_H_0: "Mantenir 0",
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
		BN_VOLUME_DOWN: "Volum -",
		BN_H_VOLUME_DOWN: "Mantenir Volum -",
		BN_VOLUME_UP: "Volum +",
		BN_H_VOLUME_UP: "Mantenir Volum +"
	},		
	
	StandardActions: {
		// Actions
		ACTION_SHUTDOWN: "Apagar",
		ACTION_NEXT_PAGE: "Pàgina Següent",
		ACTION_PREVIOUS_PAGE: "Pàgina Anterior",
		ACTION_NEXT_IN_HISTORY: "Proper en l'Historial",
		ACTION_PREVIOUS_IN_HISTORY: "Anterior en l'Historial",
		ACTION_PREVIOUS_SONG: "Anterior cançó",
		ACTION_NEXT_SONG: "Següent cançó",
		ACTION_GOTO_LINK: "Anar a Enllaç"
	},

	Screenshot: {
		TITLE: "Captura de Pantalles",
		ACTION_TITLE: "Captura de Pantalla",
		SAVING_TO: "Salvant a ",
		FAILED_TO_SAVE: "Captura fallida",
		OPT_SAVETO: "Salvar a ...",
		OPT_FEEDBACK: "Mostra progrés de salvar",
		MEMORY_STICK: "Memory Stick",
		FEEDBACK_ON: "Activat",
		FEEDBACK_OFF: "Desactivat",
		SD_CARD: "Targeta SD",
		INTERNAL_MEMORY: "Memòria Interna"
	},

	BrowseFolders: {
		TITLE: "Explorador de Carpetes",
		OPTION_SORTING_MODE: "Tipus d'Ordre",
		VALUE_BY_TITLE: "Per títol",
		VALUE_BY_AUTHOR_THEN_TITLE: "Per autor i després títol",
		VALUE_BY_AUTHOR_SWAPPING: "Per autor (nom/cognom)",
		VALUE_BY_FILENAME: "Per nom d'arxiu",
		OPTION_TITLE_SORTER: "Ordenar per Tipus d'Ordre",
		ENABLED: "Activat",
		DISABLED: "Desactivat",
		OPTION_IM_ROOT: "Arrel de la Memòria Interna",
		OPTION_CARD_SCAN: "Escaneja targetes SD/MS",
		OPTION_MOUNT: "Montar targetes SD/MS",
		NODE_RESCAN_INTERNAL_MEMORY: "Escaneja Memòria Interna",
		NODE_COPY_TO_INTERNAL_MEMORY: "Copia a Memòria Interna",
		NODE_COPY_TO_INTERNAL_MEMORY_COMMENT: "Copia arxius a l'arrel de la memòria interna",
		NODE_COPY_AND_RESCAN: "Copia i Escaneja memòria interna",
		NODE_COPY_AND_RESCAN_COMMENT: "Copia arxius a l'arrel de la Memòria Interna i escaneja",
		ERROR_TARGET_EXISTS: "Error, l'arxiu destí existeix",
		NODE_BROWSE_FOLDERS: "Llibres per Carpetes",
		NODE_BROWSE_FOLDERS_COMMENT: "Explorar",
		NODE_INTERNAL_MEMORY: "Memòria Interna",
		NODE_MEMORY_STICK: "Memory Stick",
		NODE_MEMORY_STICK_MOUNT: "Memory Stick a través de muntatge",
		NODE_SD_CARD: "Targeta SD",
		NODE_SD_CARD_MOUNT: "Targeta SD a través de muntatge"
	},

	Clock: {
		TITLE: "Rellotge",
		OPTION_STYLE: "Estil Rellotge",
		VALUE_24H: "Format 24 hores",
		VALUE_12H: "Format 12 hores",
		OPTION_MODE: "Ús del Rellotge",
		VALUE_ALWAYS_SHOWN: "Es mostra sempre",
		VALUE_SHOWN_ONLY_IN_MENU: "Només en els menús",
		VALUE_SHOWN_WHEN_READING: "Només en la lectura",
		VALUE_OFF: "Desactivat",
		ACTION_TOGGLE_CLOCK: "Alternar rellotge",
		AM: "am",
		PM: "pm"
	},

	PageIndex: {
		TITLE: "Paginació Llibres i Menús",
		INDEX_STYLE_BOOK: "Format Paginació Llibre",
		INDEX_MODE_BOOK: "Mostra Paginació Llibre",
		INDEX_MODE_MENU: "Mostra Paginació Menús",
		INDEX_STYLE_MENU: "Format Paginació Menús",
		OF: "de",
		ALWAYS_SHOWN: "Sempre",
		NEVER_SHOWN: "Mai",
		NOT_SHOWN_IF_SINGLE_PAGE: "Més d'una pàgina",
		VALUE_STATS0: "5 / 100 (pàg. per minut)",
		VALUE_STATS1: "5 / 100 (temps per fi)",
		VALUE_STATS2: "5 / 100 (ppm / temps per fi)"
	},

	EpubUserStyle: {
		OPTION_EPUB_CSS_FILE: "EPUB Estil Usuari (CSS)",
		MSG_WARNING: "Només s'aplica a llibres oberts després!",
		VALUE_DISABLED: "Desactivat"
	},

	BookHistory: {
		FUNC_X_BOOKS: FUNC_X_BOOKS,
		FUNC_PAGE_X: FUNC_PAGE_X,
		TITLE: "Historial Llibre",
		VALUE_DISABLED: "Desactivat",
		OPTION_REPLACE: "Historial Continuar Llegint",
		VALUE_ON: "Activat",
		VALUE_OFF: "Desactivat",
		OPTION_SKIP_BOOK_MENU: "Saltar-se Menú Llibre" 
	},

//ReadMark	ReadMark: {
//		TITLE_UNREAD: "Marcadors - Ja llegits",
//		TITLE_READ: "Marcadors - no llegits",
//	},

	TextScale: {
		OPTION_SCALE_DEFAULT: "Mida per defecte",
		VALUE_SMALL: "(S) Petita",
		VALUE_MEDIUM: "(M) Mitjana",
		VALUE_LARGE: "(L) Gran",
		VALUE_DISABLED: "Desactivat",
		VALUE_ENABLED: "Activat"
	},

	MenuTuning: {
		OPTION_OUTER: "Opció menú principal"
	},

	Dictionary: {
		TITLE: "Diccionari",
		WARN_DICT_DISABLED: "Diccionari desactivat!",
		WARN_DICT_DOESNT_EXIST: "No hi ha arxiu de Diccionari!",
		ACTION_DICTIONARY: "Obrir Diccionari",
		OPTION_DICTIONARY: "Arxiu del Diccionari",
		VALUE_DISABLED: "Desactivat"
	}
};
