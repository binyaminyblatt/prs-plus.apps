// Language: Italian
// Description: Localization file
// Translator: Samhain
//
// History:
//	2010-09-07 kartu - Initial version by Samhain

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
	return FUNC_X_SOMETHING(n, ["libri", "1 libro", "Nessun libro"]);
};

var FUNC_X_SETTINGS = function (n) {
	return FUNC_X_SOMETHING(n, ["impostazioni", "1 impostazione", "Nessuna impostazione"]);
};

var FUNC_X_ITEMS = function (n) {
	return FUNC_X_SOMETHING(n, ["oggetti", "1 oggetto", "Nessun oggetto"]);
};

var FUNC_X_PAGES = function (n) {
	return FUNC_X_SOMETHING(n, ["pagine", "1 pagina", "Nessuna pagina"]);
};

var FUNC_X_PICTURES = function (n) {
	return FUNC_X_SOMETHING(n, ["foto", "1 foto", "Nessuna foto"]);
};

var FUNC_X_SONGS = function (n) {
	return FUNC_X_SOMETHING(n, ["canzoni", "1 canzone", "Nessuna canzone"]);
};

var FUNC_X_BOOKMARKS = function (n) {
	return FUNC_X_SOMETHING(n, ["segnalibri", "1 segnalibro", "Nessun segnalibro"]);
};

var FUNC_X_COLLECTIONS = function (n) {
	return FUNC_X_SOMETHING(n, ["collezioni", "1 collezione", "Nessuna collezione"]);
};

var FUNC_PAGE_X = function (n) {
	return "Pagina " + n;
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
		DO_NOT_DISCONNECT: "Non Scollegare",
		USB_CONNECTED: "USB collegata",
		DEVICE_LOCKED: "Dispositivo Bloccato",

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
		EPUB_DOCUMENT: "Documento EPUB",
		BBEB_BOOK: "BBeB Book",
		PLAIN_TEXT: "Testo",
		INTERNAL_MEMORY: "Memoria interna",
		MEMORY_STICK: "Memory Stick",
		SD_CARD: "Memoria SD",

		// Main.xml & kbook.so stuff
		INVALID_FORMAT: "Formato non valido!",
		FORMATTING: "Formattazione...",
		LOADING: "Caricamento...",
		LOW_BATTERY: "Carica Batteria Bassa!",
		HR_WARNING: "Vuoi CANCELLARE tutto il contenuto, ripristinare le impostazioni di default e cancellare le autorizzazioni DRM?\n\nSi - Premi 5\nNo - Premi MENU",
		DEVICE_SHUTDOWN: "Spegni Dispositivo",
		PRESS_MARK_TO_SHUTDOWN: "Premi SEGNALIBRO per spegnere",
		THIS_DEVICE: "questo dispositivo.",
		PRESS_MARK_TO_DELETE: "Premi SEGNALIBRO per",
		THIS_BOOK: "cancellare il libro.",
		FORMAT_INTERNAL_MEMORY: "Formatta Memoria Interna",
		PRESS_MARK_TO_FORMAT: "Premi SEGNALIBRO per formattare",
		MSG_INTERNAL_MEMORY: "la memoria interna.",
		RESTORE_DEFAULTS: "Ripristina Impostazioni Default",
		PRESS_MARK_TO_RESTORE: "Premi SEGNALIBRO per ripristinare",
		DEFAULT_SETTINGS: "le impostazioni di default.",
		UPPER_PAGE: "PAGINA",
		ONE_OF_ONE: "1 di 1",
		NO_BATTERY: "Batteria Scarica!",
		FORMATTING_INTERNAL_MEMORY: "Formattazione Memoria Interna...",
		SHUTTING_DOWN: "Spegnimento...",

		// Root menu
		CONTINUE: "Continua Lettura",
		BOOKS_BY_TITLE: "Libri per Titolo",
		BOOKS_BY_AUTHOR: "Libri per Autore",
		BOOKS_BY_DATE: "Libri per Data",
		COLLECTIONS: "Collezioni",
		ALL_BOOKMARKS: "Tutti i Segnalibri",
		NOW_PLAYING: "In Ascolto",
		MUSIC: "Musica",
		PICTURES: "Foto",
		SETTINGS: "Impostazioni",

		// In Settings
		// orientation
		ORIENTATION: "Orientamento",
		HORIZONTAL: "Orizzontale",
		VERTICAL: "Verticale",
		// set date
		SET_DATE: "Imposta Data",
		YEAR: "Anno",
		MONTH: "Mese",
		DATE: "Data", // Day
		HOUR: "Ora",
		MINUTE: "Minuti",
		SETDATE_OK: "OK",
		// width in pixels = ..._SIZE * 35
		SETDATE_OK_SIZE: 2,
		// slideshow
		SLIDESHOW: "Presentazione",
		SS_ON: "On",
		SS_OFF: "Off",
		SS_TURN: "Abilita",
		SS_DURATION: "Durata",
		// width in pixels = ..._SIZE * 35
		SS_SIZE: 2,
		SS_OK: "OK",
		// width in pixels = ..._SIZE * 35
		SS_OK_SIZE: 2,
		SECONDS: "Secondi",
		// auto standby (aka sleep mode)
		AUTOSTANDBY: "Modalità Sleep",
		AS_ON: "On",
		AS_OFF: "Off",
		AS_TURN: "Abilita",
		// width in pixels = ..._SIZE * 35
		AS_SIZE: 2,
		AS_OK: "OK",
		// width in pixels = ..._SIZE * 35
		AS_OK_SIZE: 2,
		// about
		ABOUT: "Info",
		// reset to factory settings
		RESET_TO_FACTORY: "Resetta alle impostazioni di fabbrica",

		// In Advanced Settings
		ADVANCED_SETTINGS: "Impostazioni Avanzate",
		// screen lock (aka device lock)
		SCREEN_LOCK: "Blocco Dispositivo",
		SL_OFF: "Off",
		SL_ON: "On",
		SL_CODE: "Codice",
		SL_TURN: "Abilita",
		// width in pixels = ..._SIZE * 35
		SL_SIZE: 2,
		SL_OK: "OK",
		SL_OK_SIZE: 2,
		SL_OK_UNLOCK: "OK", // unlock
		// width in pixels = ..._SIZE * 35
		SL_OK_UNLOCK_SIZE: 2,
		// format device
		FORMAT_DEVICE: "Formatta Dispositivo",

		// In Book menu
		BEGIN: "Inizio",
		END: "Fine",
		BOOKMARKS: "Segnalibri",
		CONTENTS: "Contenuti",
		HISTORY: "Cronologia",
		INFO: "Informazioni",
		UTILITIES: "Utilità",

		// In Book Utilities
		REMOVE_ALL_BOOKMARKS: "Rimuovi Tutti i Segnalibri",
		CLEAR_HISTORY: "Cancella Cronologia",
		DELETE_BOOK: "Cancella Libro",

		// In Books by Date
		TODAY: "Oggi",
		EARLIER_THIS_WEEK: "Settimana Corrente",
		LAST_WEEK: "Settimana Scorsa",
		EARLIER_THIS_MONTH: "Mese Corrente",
		LAST_MONTH: "Mese Scorso",
		EARLIER_THIS_QUARTER: "Quatrimestre Corrente",
		LAST_QUARTER: "Quatrimestre Scorso",
		EARLIER_THIS_YEAR: "Anno Corrente",
		LAST_YEAR: "Anno Scorso",
		OLDER: "Più vecchi",

		FUNC_PAGE_X: FUNC_PAGE_X,
		PART: "Partw",
		OF: "di",
		NO_BOOK: "Nessun libro",
		NO_SONG: "Nessuna canzone",

		// Info title strings, comma separated, no spaces after comma
		INFO_TITLES: "Copertina,Titolo,Autore,Editore,Categoria,eBook ID,Tipo,Data,Dimensione,File,Diritti Digitali,Scadenza",

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
		TITLE_0: "Other",
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
		NODE_PRSP_SETTINGS:  "Impostazioni PRS+",
		NODE_OTHERS: "Multimedia",
		NODE_GAMES_AND_UTILS: "Giochi e Utilità",
		GROUP_MENU_TITLE: "Impostazioni Menu",
		GROUP_VIEWER_TITLE: "Impostazioni Visualizzazione"
	},

	CoreLang: {
		TITLE: "Localizzazione",
		COMMENT: "Richiede riavvio",
		OPTION_LANG: "Lingua",

		OPTION_DATE_FORMAT: "Formato Data",
		VALUE_DEFAULT_DATE: "default",
		ddMMMYY: "31/Gen/99",
		ddMONTHYY: "31/Gennaio/99",
		ddMMMYYYY: "31/Gen/1999",
		ddMONTHYYYY: "31/Gennaio/1999",

		OPTION_DATE_SEPARATOR: "Separatore Data",
		VALUE_SPACE: "Spazio",
		VALUE_NONE: "Nessuno",

		MONTH_SHORT_1: "Gen",
		MONTH_SHORT_2: "Feb",
		MONTH_SHORT_3: "Mar",
		MONTH_SHORT_4: "Apr",
		MONTH_SHORT_5: "Mag",
		MONTH_SHORT_6: "Giu",
		MONTH_SHORT_7: "Lug",
		MONTH_SHORT_8: "Ago",
		MONTH_SHORT_9: "Set",
		MONTH_SHORT_10: "Ott",
		MONTH_SHORT_11: "Nov",
		MONTH_SHORT_12: "Dic",

		MONTH_1: "Gennaio",
		MONTH_2: "Febbraio",
		MONTH_3: "Marzo",
		MONTH_4: "Aprile",
		MONTH_5: "Maggio",
		MONTH_6: "Giugno",
		MONTH_7: "Luglio",
		MONTH_8: "Agosto",
		MONTH_9: "Settembre",
		MONTH_10: "Ottobre",
		MONTH_11: "Novembre",
		MONTH_12: "Dicembre"
	},

	MenuCaptions: {
		OPTION_STYLE: "Stile Didascalie Menu",
		VALUE_SONY_DEFAULT: "Default Sony",
		VALUE_ALWAYS_SMALL: "Sempre piccole",
		VALUE_ALWAYS_BIG: "Sempre grande"
	},

	TextEncoding: {
		OPTION_TITLE: "Codifica Libri TXT e RTF",
		MSG_RESTART: "Richiede riavvio!",
		LATIN: "Latino",
		RUSSIAN:  "Russo (Windows-1251)"
	},

	KeyBindings: {
		TITLE: "Associazione Tasti",
		DESCRIPTION: "Permette di associare delle azioni ai tasti",

		DEFAULT_VALUE: "Default",

		// Contexts
		GLOBAL:  "Globale",
		IN_MENU: "Nel Menu",
		IN_BOOK:  "Durante la Lettura",

		// Button groups
		NUM_BUTTONS: "Tasti Numerici",
		JP_BUTTONS: "Tasti del Joypad",
		OTHER_BUTTONS: "Altri Tasti",
		VOLUME_BUTTONS: "Tasti Volume",

		// Buttons
		BN_SIZE: "Tasto Dimensione",
		BN_BOOKMARK: "Tasto Segnalibro",
		BN_BL_NEXT: "'Prossima' in basso a sinistra",
		BN_BL_PREVIOUS: "'Precedente' in basso a sinistra",
		BN_SB_NEXT: "'Prossima' Laterale",
		BN_SB_PREVIOUS:  "'Precedente' Laterale",
		BN_MENU: "Tasto Menu",
		BN_JP_LEFT: "Joypad Sinistra",
		BN_JP_RIGHT: "Joypad Destra",
		BN_JP_UP: "Joypad Su",
		BN_JP_DOWN: "Joypad Giu",
		BN_JP_CENTER: "Joypad Centro",
		BN_H_SIZE: "Lunga Pressione Tasto Dimensione",
		BN_H_BOOKMARK: "Lunga Pressione Tasto Segnalibro",
		BN_H_BL_NEXT: "Lunga Pressione 'Prossima' in basso a sinistra",
		BN_H_BL_PREVIOUS: "Lunga Pressione 'Precedente' in basso a sinistra",
		BN_H_MENU: "Lunga Pressione Tasto Menu",
		BN_H_SB_NEXT: "Lunga Pressione 'Prossima' laterale",
		BN_H_SB_PREVIOUS: "Lunga Pressione 'Precedente' laterale",
		BN_H_JP_CENTER: "Lunga Pressione Joypad Centro",
		BN_H_1: "Lunga Pressione 1",
		BN_H_2: "Lunga Pressione 2",
		BN_H_3: "Lunga Pressione 3",
		BN_H_4: "Lunga Pressione 4",
		BN_H_5: "Lunga Pressione 5",
		BN_H_6: "Lunga Pressione 6",
		BN_H_7: "Lunga Pressione 7",
		BN_H_8: "Lunga Pressione 8",
		BN_H_9: "Lunga Pressione 9",
		BN_H_0: "Lunga Pressione 0",
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
		BN_VOLUME_DOWN: "Volume -",
		BN_H_VOLUME_DOWN: "Lunga Pressione Volume -",
		BN_VOLUME_UP: "Volume +",
		BN_H_VOLUME_UP: "Lunga Pressione Volume +"
	},		
	
	StandardActions: {
		// Actions
		ACTION_SHUTDOWN: "Spegni",
		ACTION_NEXT_PAGE: "Prossima Pagina",
		ACTION_PREVIOUS_PAGE: "Pagina Precedente",
		ACTION_NEXT_IN_HISTORY: "Prossimo nella Cronologia",
		ACTION_PREVIOUS_IN_HISTORY: "Precedente nella Cronologia",
		ACTION_PREVIOUS_SONG: "Canzone Precedente",
		ACTION_NEXT_SONG: "Prossima Canzone",
		ACTION_GOTO_LINK: "Segui Link"
	},

	Screenshot: {
		TITLE: "Screenshot",
		ACTION_TITLE: "Prendi uno Screenshot",
		SAVING_TO: "Salva in ",
		FAILED_TO_SAVE: "Salvataggio fallito",
		OPT_SAVETO: "Salva in",
		OPT_FEEDBACK: "Mostra progresso salvataggio",
		MEMORY_STICK: "Memory stick",
		FEEDBACK_ON: "On",
		FEEDBACK_OFF: "Off",
		SD_CARD: " Scheda SD",
		INTERNAL_MEMORY: "Memoria Interna"
	},

	BrowseFolders: {
		TITLE:  "Sfoglia Cartelle",
		OPTION_SORTING_MODE: "Ordina",
		VALUE_BY_TITLE: "Per titolo",
		VALUE_BY_AUTHOR_THEN_TITLE: "Per autore e poi titolo",
		VALUE_BY_AUTHOR_SWAPPING: "Per autore scambiando Nome/Cognome",
		VALUE_BY_FILENAME: "Per nome del file",
		OPTION_TITLE_SORTER: "Usa il campo 'titleSorter'",
		ENABLED: "Abilitato",
		DISABLED: "Disabilitato",
		OPTION_IM_ROOT: "Root della Memoria Interna",
		OPTION_CARD_SCAN: "Leggi Scheda SD/MS",
		OPTION_MOUNT: "Usa Mount con SD/MS (sperimentale)",
		NODE_RESCAN_INTERNAL_MEMORY: "Rileggi la Memoria Interna",
		NODE_COPY_TO_INTERNAL_MEMORY: "Copia nella Memoria Interna",
		NODE_COPY_TO_INTERNAL_MEMORY_COMMENT: "Copia file nella root della Memoria Interna",
		NODE_COPY_AND_RESCAN: "Copia & Rileggi la Memoria Interna",
		NODE_COPY_AND_RESCAN_COMMENT: "Copia file nella root della Memoria Interna e scansiona libri",
		ERROR_TARGET_EXISTS: "Errore, il file di destinazione esiste",
		NODE_BROWSE_FOLDERS: "Sfoglia Cartelle",
		NODE_BROWSE_FOLDERS_COMMENT: "Sfoglia il file system",
		NODE_INTERNAL_MEMORY: "Memoria Interna",
		NODE_MEMORY_STICK: "Memory Stick",
		NODE_MEMORY_STICK_MOUNT: "Memory Stick con Mount",
		NODE_SD_CARD: "Scheda SD",
		NODE_SD_CARD_MOUNT: "Scheda SD con Mount"
	},

	Clock: {
		TITLE: "Orologio",
		OPTION_STYLE: "Stile Orologio",
		VALUE_24H: "24 ore",
		VALUE_12H: "12 ore",
		OPTION_MODE: "Modalità Orologio",
		VALUE_ALWAYS_SHOWN: "Mostra sempre",
		VALUE_SHOWN_ONLY_IN_MENU: "Mostra solo nel menu",
		VALUE_SHOWN_WHEN_READING: "Mostra solo durante lettura",
		VALUE_OFF: "Spento",
		ACTION_TOGGLE_CLOCK: "Cambia Clock",
		AM: "am",
		PM: "pm"
	},

	PageIndex: {
		TITLE: "Indice Pagine",
		INDEX_STYLE_BOOK: "Stile Indice in Libri",
		INDEX_MODE_BOOK: "Modalità Indice in Libri",
		INDEX_MODE_MENU: "Modalità Indice in Menu",
		INDEX_STYLE_MENU: "Stile Indice in Menu",
		OF: "di",
		ALWAYS_SHOWN: "Mostra sempre",
		NEVER_SHOWN: "Non mostrare",
		NOT_SHOWN_IF_SINGLE_PAGE: "Non mostrare nelle pagine singole",
		VALUE_STATS0: "5 / 100 (pagine per minuto)",
		VALUE_STATS1: "5 / 100 (tempo alla fine)",
		VALUE_STATS2: "5 / 100 (ppm / tempo alla fine)"
	},

	EpubUserStyle: {
		OPTION_EPUB_CSS_FILE: "Stile EPUB Utente (CSS File)",
		MSG_WARNING: "Agisce sui prossimi libri aperti!",
		VALUE_DISABLED: "Disabilitato"
	},

	BookHistory: {
		FUNC_X_BOOKS: FUNC_X_BOOKS,
		FUNC_PAGE_X: FUNC_PAGE_X,
		TITLE: "Cronologia Libro",
		VALUE_DISABLED: "Disabilitato",
		OPTION_REPLACE: "Cronologia in Continua Lettura",
		VALUE_ON: "On",
		VALUE_OFF: "Off",
		OPTION_SKIP_BOOK_MENU: "Salta il Menu Libro"
	},

//ReadMark	ReadMark: {
//		TITLE_UNREAD: "Mark Book - Already Read",
//		TITLE_READ: "Mark Book - Not Yet Read",
//	},

	TextScale: {
		OPTION_SCALE_DEFAULT: "Dimensione di default",
		VALUE_SMALL: "(S)mall",
		VALUE_MEDIUM: "(M)edium",
		VALUE_LARGE: "(L)arge",
		VALUE_DISABLED: "Disabilitato",
		VALUE_ENABLED: "Abilitato"
	},

	MenuTuning: {
		OPTION_OUTER: "Menu in alto contiene"
	},

	Dictionary: {
		TITLE: "Dizionario",
		WARN_DICT_DISABLED: "Dizionario disabilitato!",
		WARN_DICT_DOESNT_EXIST: "Il file del dizionario non esiste!",
		ACTION_DICTIONARY: "Lancia Dizionario",
		OPTION_DICTIONARY: "File Dizionario",
		VALUE_DISABLED: "Disabilitato"
	}
};
