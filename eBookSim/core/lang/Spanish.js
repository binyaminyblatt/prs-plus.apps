// Language: Spanish
// Description: Localization file
// Translator: surquizu, VICTORSJG
//
// History:
//	2010-04-30 kravitz - Refactored, added new strings
//	2010-05-01 kartu - Added ACTION_GOTO_LINK
//	2010-05-01 Translation is corrected by VICTORSJG
//	2010-05-02 kartu - Added dictionary strings
//	2010-05-02 kartu - Added translations and sizes for a number of strings, including "OK"
//	2010-05-03 kravitz - Renamed ReadingList to BookHistory, added new strings, refactored MenuTuning
//	2010-05-06 kartu - Added ppm related translations for PageIndex addon
//	2010-05-06 kartu - Added ppm related translations by VICTORSJG
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
	return FUNC_X_SOMETHING(n, ["libros", "1 libro", "Ningún libro"]);
};
var FUNC_X_SETTINGS = function (n) {
	return FUNC_X_SOMETHING(n, ["ajustes", "1 ajuste", "Ningún ajuste"]);
};
var FUNC_X_ITEMS = function (n) {
	return FUNC_X_SOMETHING(n, ["elementos", "1 elemento", "Ningún elemento"]);
};
var FUNC_X_PAGES = function (n) {
	return FUNC_X_SOMETHING(n, ["páginas", "1 página", "Ninguna página"]);
};
var FUNC_X_PICTURES = function (n) {
	return FUNC_X_SOMETHING(n, ["imágenes", "1 imagen", "Ninguna imagen"]);
};
var FUNC_X_SONGS = function (n) {
	return FUNC_X_SOMETHING(n, ["canciones", "1 canción", "Ninguna canción"]);
};
var FUNC_X_BOOKMARKS = function (n) {
	return FUNC_X_SOMETHING(n, ["marcadores", "1 marcador", "Ningún marcador"]);
};
var FUNC_X_COLLECTIONS = function (n) {
	return FUNC_X_SOMETHING(n, ["colecciones", "1 colección", "Ninguna colección"]);
};

var FUNC_PAGE_X = function (n) {
	return "Página " + n;
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
		DO_NOT_DISCONNECT: "¡No Desconectar!",
		USB_CONNECTED: "USB conectado",
		DEVICE_LOCKED: "Dispositivo bloqueado",

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
		RICH_TEXT_FORMAT: "Texto de Formato Enriquecido (RTF)",
		ADOBE_PDF: "Adobe PDF",
		EPUB_DOCUMENT: "Documento EPUB",
		BBEB_BOOK: "Libro BBeB",
		PLAIN_TEXT: "Texto sin formato",
		INTERNAL_MEMORY: "Memoria Interna",
		MEMORY_STICK: "Memory Stick",
		SD_CARD: "Tarjeta SD",

		// Main.xml & kbook.so stuff
		INVALID_FORMAT: "Formato No Válido!",
		FORMATTING: "Formateando...",
		LOADING: "Cargando...",
		LOW_BATTERY: "¡Batería Baja!",
		HR_WARNING: "¿Quieres BORRAR todo el contenido y restaurar los ajustes iniciales y el estado de la autorización del DRM?\n\nSi - Pulsa 5\nNo - Pulsa MENU",
		DEVICE_SHUTDOWN: "Apagar Dispositivo",
		PRESS_MARK_TO_SHUTDOWN: "Pulsa MARK para",
		THIS_DEVICE: "apagar lector.",
		PRESS_MARK_TO_DELETE: "Pulsa MARK para",
		THIS_BOOK: "borrar libro.",
		FORMAT_INTERNAL_MEMORY: "Formatear Memoria Interna",
		PRESS_MARK_TO_FORMAT: "Pulsa MARK para formatear",
		MSG_INTERNAL_MEMORY: "memoria interna.",
		RESTORE_DEFAULTS: "Ajustes Iniciales",
		PRESS_MARK_TO_RESTORE: "Pulsa MARK para restaurar",
		DEFAULT_SETTINGS: "ajustes iniciales.",
		UPPER_PAGE: "PÁGINA",
		ONE_OF_ONE: "1 de 1",
		NO_BATTERY: "¡Sin Batería!",
		FORMATTING_INTERNAL_MEMORY: "Formateando Memoria Interna...",
		SHUTTING_DOWN: "Apagando...",

		// Root menu
		CONTINUE: "Continuar Leyendo",
		BOOKS_BY_TITLE: "Libros por Título",
		BOOKS_BY_AUTHOR: "Libros por Autor",
		BOOKS_BY_DATE: "Libros por Fecha",
		COLLECTIONS: "Colecciones",
		ALL_BOOKMARKS: "Marcadores",
		NOW_PLAYING: "Reproduciendo Ahora",
		MUSIC: "Audio",
		PICTURES: "Imágenes",
		SETTINGS: "Ajustes",

		// In Settings
		// orientation
		ORIENTATION: "Orientación",
		HORIZONTAL: "Horizontal",
		VERTICAL: "Vertical",
		// set date
		SET_DATE: "Fecha y Hora",
		YEAR: "Año",
		MONTH: "Mes",
		DATE: "Día", // Day
		HOUR: "Hora",
		MINUTE: "Minuto",
		SETDATE_OK: "OK",
		// width in pixels = ..._SIZE * 35
		SETDATE_OK_SIZE: 2,
		// slideshow
		SLIDESHOW: "Modo Diapositivas",
		SS_ON: "Activado",
		SS_OFF: "Desactivado",
		SS_TURN: "Estado",
		SS_DURATION: "Duración",
		// width in pixels = ..._SIZE * 35
		SS_SIZE: 6,
		SS_OK: "OK",
		// width in pixels = ..._SIZE * 35
		SS_OK_SIZE: 2,
		SECONDS: "Segundos",
		// auto standby (aka sleep mode)
		AUTOSTANDBY: "Modo Reposo",
		AS_ON: "Activado",
		AS_OFF: "Desactivado",
		AS_TURN: "Estado",
		// width in pixels = ..._SIZE * 35
		AS_SIZE: 6,
		AS_OK: "OK",
		// width in pixels = ..._SIZE * 35
		AS_OK_SIZE: 2,
		// about
		ABOUT: "Acerca del Reader",
		// reset to factory settings
		RESET_TO_FACTORY: "Ajustes Iniciales",

		// In Advanced Settings
		ADVANCED_SETTINGS: "Ajustes Avanzados",
		// screen lock (aka device lock)
		SCREEN_LOCK: "Bloqueo Dispositivo",
		SL_OFF: "Desactivado",
		SL_ON: "Activado",
		SL_CODE: "Código",
		SL_TURN: "Estado",
		// width in pixels = ..._SIZE * 35
		SL_SIZE: 6,
		SL_OK: "OK",
		SL_OK_SIZE: 2,
		SL_OK_UNLOCK: "OK", // unlock
		// width in pixels = ..._SIZE * 35
		SL_OK_UNLOCK_SIZE: 2,
		// format device
		FORMAT_DEVICE: "Formatear Dispositivo",

		// In Book menu
		BEGIN: "Inicio",
		END: "Final",
		BOOKMARKS: "Marcadores",
		CONTENTS: "Tabla de contenidos",
		HISTORY: "Historial",
		INFO: "Información",
		UTILITIES: "Utilidades",

		// In Book Utilities
		REMOVE_ALL_BOOKMARKS: "Eliminar Marcadores",
		CLEAR_HISTORY: "Borrar Historial",
		DELETE_BOOK: "Borrar Libro",

		// In Books by Date
		TODAY: "Hoy",
		EARLIER_THIS_WEEK: "Primeros de Esta Semana",
		LAST_WEEK: "La Semana Pasada",
		EARLIER_THIS_MONTH: "Primeros de Este Mes",
		LAST_MONTH: "El Mes Pasado",
		EARLIER_THIS_QUARTER: "Primeros de Este Trimestre",
		LAST_QUARTER: "Último Trimestre",
		EARLIER_THIS_YEAR: "Primeros de Este Año",
		LAST_YEAR: "El Año Pasado",
		OLDER: "Más Antiguo",

		FUNC_PAGE_X: FUNC_PAGE_X,
		PART: "Parte",
		OF: "de",
		NO_BOOK: "Ningún libro",
		NO_SONG: "Ninguna canción",

		// Info title strings, comma separated, no spaces after comma
		INFO_TITLES: "Cubierta,Título,Autor,Editorial,Categoría,ID eBook,Tipo,Fecha,Tamaño,Ubicación,Archivo,Derechos Digitales,Caducidad",

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
		TITLE_0: "Otro",
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
		NODE_PRSP_SETTINGS: "Ajustes PRS+",
		NODE_OTHERS: "Multimedia",
		NODE_GAMES_AND_UTILS: "Juegos - Utilidades",
		GROUP_MENU_TITLE: "Menú Ajustes",
		GROUP_VIEWER_TITLE: "Ajustes Visor de Libros"
	},

	CoreLang: {
		TITLE: "Localización",
		COMMENT: "Requiere reincio",
		OPTION_LANG: "Idioma",

		OPTION_DATE_FORMAT: "Formato fecha",
		VALUE_DEFAULT_DATE: "Por defecto",
		ddMMMYY: "31/Ene/99",
		ddMONTHYY: "31/Enero/99",
		ddMMMYYYY: "31/Ene/1999",
		ddMONTHYYYY: "31/Enero/1999",

		OPTION_DATE_SEPARATOR: "Separador fecha",
		VALUE_SPACE: "Espacio",
		VALUE_NONE: "Ninguno",

		MONTH_SHORT_1: "Ene",
		MONTH_SHORT_2: "Feb",
		MONTH_SHORT_3: "Mar",
		MONTH_SHORT_4: "Abr",
		MONTH_SHORT_5: "May",
		MONTH_SHORT_6: "Jun",
		MONTH_SHORT_7: "Jul",
		MONTH_SHORT_8: "Ago",
		MONTH_SHORT_9: "Sep",
		MONTH_SHORT_10: "Oct",
		MONTH_SHORT_11: "Nov",
		MONTH_SHORT_12: "Dic",

		MONTH_1: "Enero",
		MONTH_2: "Febrero",
		MONTH_3: "Marzo",
		MONTH_4: "Abril",
		MONTH_5: "Mayo",
		MONTH_6: "Junio",
		MONTH_7: "Julio",
		MONTH_8: "Agosto",
		MONTH_9: "Septiembre",
		MONTH_10: "Octubre",
		MONTH_11: "Noviembre",
		MONTH_12: "Diciembre"
	},

	MenuCaptions: {
		OPTION_STYLE: "Estilo Títulos",
		VALUE_SONY_DEFAULT: "Original de Sony",
		VALUE_ALWAYS_SMALL: "Siempre pequeños",
		VALUE_ALWAYS_BIG: "Siempre grandes"
	},

	TextEncoding: {
		OPTION_TITLE: "Codificación de TXT y RTF",
		MSG_RESTART: "¡Requiere reinicio!",
		LATIN: "Carácteres latinos",
		RUSSIAN: "Carácteres rusos (W-1251)"
	},

	KeyBindings: {
		TITLE: "Configuración Teclas",
		DESCRIPTION: "Permite asignar acciones a las teclas",

		DEFAULT_VALUE: "Por defecto",

		// Contexts
		GLOBAL: "En todo momento",
		IN_MENU: "En los menús",
		IN_BOOK: "Durante la lectura",

		// Button groups
		NUM_BUTTONS: "Teclas numéricas",
		JP_BUTTONS: "Teclas del Joypad",
		OTHER_BUTTONS: "Otras teclas",
		VOLUME_BUTTONS: "Teclas de volumen",

		// Buttons
		BN_SIZE: "Zoom",
		BN_BOOKMARK: "Mark",
		BN_BL_NEXT: "Abajo izquierda 'siguiente'",
		BN_BL_PREVIOUS: "Abajo izquierda 'anterior'",
		BN_SB_NEXT: "Lateral 'siguiente'",
		BN_SB_PREVIOUS: "Lateral 'anterior'",
		BN_MENU: "Menú",
		BN_JP_LEFT: "Joypad izquierda",
		BN_JP_RIGHT: "Joypad derecha",
		BN_JP_UP: "Joypad arriba",
		BN_JP_DOWN: "Joypad abajo",
		BN_JP_CENTER: "Joypad centro",
		BN_H_SIZE: "Mantener zoom",
		BN_H_BOOKMARK: "Mantener mark",
		BN_H_BL_NEXT: "Mantener abajo izq. 'siguiente'",
		BN_H_BL_PREVIOUS: "Mantener abajo izq. 'anterior'",
		BN_H_MENU: "Mantener menú ",
		BN_H_SB_NEXT: "Mantener lateral 'siguiente'",
		BN_H_SB_PREVIOUS: "Mantener lateral 'anterior'",
		BN_H_JP_CENTER: "Mantener joypad centro",
		BN_H_1: "Mantener 1",
		BN_H_2: "Mantener 2",
		BN_H_3: "Mantener 3",
		BN_H_4: "Mantener 4",
		BN_H_5: "Mantener 5",
		BN_H_6: "Mantener 6",
		BN_H_7: "Mantener 7",
		BN_H_8: "Mantener 8",
		BN_H_9: "Mantener 9",
		BN_H_0: "Mantener 0",
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
		BN_VOLUME_DOWN: "Volumen -",
		BN_H_VOLUME_DOWN: "Mantener Volumen -",
		BN_VOLUME_UP: "Volumen +",
		BN_H_VOLUME_UP: "Mantener Volumen +"
	},		
	
	StandardActions: {
		// Actions
		ACTION_SHUTDOWN: "Apagar",
		ACTION_NEXT_PAGE: "Siguiente página",
		ACTION_PREVIOUS_PAGE: "Página anterior",
		ACTION_NEXT_IN_HISTORY: "Siguiente en el Historial",
		ACTION_PREVIOUS_IN_HISTORY: "Anterior en el Historial",
		ACTION_PREVIOUS_SONG: "Anterior canción",
		ACTION_NEXT_SONG: "Siguiente canción",
		ACTION_GOTO_LINK: "Ir al enlace"
	},

	Screenshot: {
		TITLE: "Capturador de Pantallas",
		ACTION_TITLE: "Capturar pantalla",
		SAVING_TO: "Salvando en ",
		FAILED_TO_SAVE: "Fallo en captura",
		OPT_SAVETO: "Salvar en...",
		OPT_FEEDBACK: "Mostrar progreso de salvar",
		MEMORY_STICK: "Memory Stick",
		FEEDBACK_ON: "Activado",
		FEEDBACK_OFF: "Desactivado",
		SD_CARD: "Tarjeta SD",
		INTERNAL_MEMORY: "Memoria Interna"
	},

	BrowseFolders: {
		TITLE: "Explorador de Carpetas",
		OPTION_SORTING_MODE: "Tipo de Orden",
		VALUE_BY_TITLE: "Por título",
		VALUE_BY_AUTHOR_THEN_TITLE: "Por autor y luego título",
		VALUE_BY_AUTHOR_SWAPPING: "Por autor (nombre/apellido)",
		VALUE_BY_FILENAME: "Por archivo",
		OPTION_TITLE_SORTER: "Ordenar por tipo de orden",
		ENABLED: "Activado",
		DISABLED: "Desactivado",
		OPTION_IM_ROOT: "Raíz de la Memoria Interna",
		OPTION_CARD_SCAN: "Escaneo de tarjetas SD/MS",
		OPTION_MOUNT: "Montar SD/MS",
		NODE_RESCAN_INTERNAL_MEMORY: "Escaneo Memoria Interna",
		NODE_COPY_TO_INTERNAL_MEMORY: "Copiar a Memoria Interna",
		NODE_COPY_TO_INTERNAL_MEMORY_COMMENT: "Copiar a la raíz de la Memoria Interna",
		NODE_COPY_AND_RESCAN: "Copiar y escanear la Memoria Interna",
		NODE_COPY_AND_RESCAN_COMMENT: "Copiar a la raíz de la Memoria Interna y escanear",
		ERROR_TARGET_EXISTS: "Error, el archivo destino existe",
		NODE_BROWSE_FOLDERS: "Libros por Carpetas",
		NODE_BROWSE_FOLDERS_COMMENT: "Explorar",
		NODE_INTERNAL_MEMORY: "Memoria Interna",
		NODE_MEMORY_STICK: "Memory Stick",
		NODE_MEMORY_STICK_MOUNT: "Memory Stick a través de montaje",
		NODE_SD_CARD: "Tarjeta SD",
		NODE_SD_CARD_MOUNT: "Tarjeta SD a través de montaje"
	},

	Clock: {
		TITLE: "Reloj",
		OPTION_STYLE: "Estilo del Reloj",
		VALUE_24H: "Formato 24 horas",
		VALUE_12H: "Formato 12 horas",
		OPTION_MODE: "Uso del Reloj",
		VALUE_ALWAYS_SHOWN: "Se muestra siempre",
		VALUE_SHOWN_ONLY_IN_MENU: "Sólo en los menús",
		VALUE_SHOWN_WHEN_READING: "Sólo en la lectura",
		VALUE_OFF: "Desactivado",
		ACTION_TOGGLE_CLOCK: "Alternar Reloj",
		AM: "am",
		PM: "pm"
	},

	PageIndex: {
		TITLE: "Paginación Libros y Menús",
		INDEX_STYLE_BOOK: "Formato Paginación Libro",
		INDEX_MODE_BOOK: "Muestra Paginación Libro",
		INDEX_MODE_MENU: "Muestra Paginación Menús",
		INDEX_STYLE_MENU: "Formato Paginación Menús",
		OF: "de",
		ALWAYS_SHOWN: "Siempre",
		NEVER_SHOWN: "Nunca",
		NOT_SHOWN_IF_SINGLE_PAGE: "Sólo si hay más de una página",
		VALUE_STATS0: "5 / 100 (páginas/minuto)",
		VALUE_STATS1: "5 / 100 (tiempo a final)",
		VALUE_STATS2: "5 / 100 (ppm / tiempo fin)"
	},

	EpubUserStyle: {
		OPTION_EPUB_CSS_FILE: "EPUB Archivo usario (css)",
		MSG_WARNING: "¡Sólo se aplica a libros abiertos después!",
		VALUE_DISABLED: "Desactivado"
	},

	BookHistory: {
		FUNC_X_BOOKS: FUNC_X_BOOKS,
		FUNC_PAGE_X: FUNC_PAGE_X,
		TITLE: "Historial del libro",
		VALUE_DISABLED: "Desactivado",
		OPTION_REPLACE: "Historial continuar leyendo",
		VALUE_ON: "Activado",
		VALUE_OFF: "Desactivado",
		OPTION_SKIP_BOOK_MENU: "Saltarse Menú Libro"
	},

//ReadMark	ReadMark: {
//		TITLE_UNREAD: "Marcadores - Ya leídos",
//		TITLE_READ: "Marcadores - No leídos todavía",
//	},

	TextScale: {
		OPTION_SCALE_DEFAULT: "Tamaño por defecto",
		VALUE_SMALL: "(S)Tamaño pequeño",
		VALUE_MEDIUM: "(M)Tamaño mediano",
		VALUE_LARGE: "(L)Tamaño grande",
		VALUE_DISABLED: "Desactivado",
		VALUE_ENABLED: "Activado"
	},

	MenuTuning: {
		OPTION_OUTER: "Opciones menú principal"
	},

	Dictionary: {
		TITLE: "Diccionario",
		WARN_DICT_DISABLED: "¡Diccionario desactivado!",
		WARN_DICT_DOESNT_EXIST: "¡No existe el archivo del diccionario!",
		ACTION_DICTIONARY: "Ejecutar diccionario",
		OPTION_DICTIONARY: "Archivo diccionario",
		VALUE_DISABLED: "Desactivado"
	}
};
