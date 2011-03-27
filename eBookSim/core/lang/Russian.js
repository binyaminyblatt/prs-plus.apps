// Language: Russian
// Description: Localization file
// Translator: SLL
//
// History:
//      2010-04-24 kartu - Fixed epub styles translation
//      2010-04-25 kartu - Fixed "turn on/off" translation
//      2010-04-30 kravitz - Refactored, added new strings
//      2010-04-30 kravitz - Fixed and optimized FUNC_X_SOMETHING()
//      2010-04-30 kravitz - Fixed SL_OFF and SL_ON translation
//      2010-05-01 kartu - Added ACTION_GOTO_LINK
//      2010-05-01 kravitz - Changed TextScale translation
//      2010-05-02 kartu - Added dictionary strings
//      2010-05-02 kartu - Added translations and sizes for a number of strings, including "OK"
//      2010-05-03 kravitz - Renamed ReadingList to BookHistory, added new strings, refactored MenuTuning
//      2010-05-06 kartu - Added ppm related translations for PageIndex addon
//      2010-05-11 kartu - Added VALUE_DEFAULT_DATE (CoreLang)
//      2010-05-12 kartu - Uploaded SLL's corrections
//      2010-05-15 kartu - Added OPTION_SKIP_BOOK_MENU (BookHistory)
//      2010-05-15 kartu - Added SLL's fixes
//      2010-05-15 kartu - Added PAGE (BookHistory)
//      2010-05-17 kravitz - Fixed VALUE_ON, VALUE_OFF (BookHistory)
//      2010-05-17 kravitz - Replaced PAGE (BookHistory) with added FUNC_PAGE_X
//      2010-05-18 kravitz - Replaced PAGE (Sony) with FUNC_PAGE_X
//      2010-05-20 kartu - Removed script reference from about string
//      2010-07-02 kartu - Added SLL's fixes
//      2010-07-02 kartu - Split KeyBindings keys into KeyBindings and StandardActions
//                              Added 0-9 translations
//	2010-12-01 kartu - Added happyhgy's fixes

var _x_cache = [];
var _x_cases = [2, 0, 1, 1, 1, 2];
var FUNC_X_SOMETHING = function (n, s) {
        if (!n) {
                return s[3];
        }
        if (!_x_cache[n]) {
                _x_cache[n] = (n % 100 > 4 && n % 100 < 20) ? 2 : _x_cases[Math.min(n % 10, 5)];
        }
        return n + " " + s[_x_cache[n]];
};

var FUNC_X_BOOKS = function (n) {
        return FUNC_X_SOMETHING(n, ["книга", "книги", "книг", "Пусто"]);
};

var FUNC_X_SETTINGS = function (n) {
        return FUNC_X_SOMETHING(n, ["настройка", "настройки", "настроек", "Пусто"]);
};

var FUNC_X_ITEMS = function (n) {
        return FUNC_X_SOMETHING(n, ["пункт", "пункта", "пунктов", "Пусто"]);
};

var FUNC_X_PAGES = function (n) {
        return FUNC_X_SOMETHING(n, ["страница", "страницы", "страниц", "Пусто"]);
};

var FUNC_X_PICTURES = function (n) {
        return FUNC_X_SOMETHING(n, ["изображение", "изображения", "изображений", "Пусто"]);
};

var FUNC_X_SONGS = function (n) {
        return FUNC_X_SOMETHING(n, ["песня", "песни", "песен", "Пусто"]);
};

var FUNC_X_BOOKMARKS = function (n) {
        return FUNC_X_SOMETHING(n, ["закладка", "закладки", "закладок", "Пусто"]);
};

var FUNC_X_COLLECTIONS = function (n) {
        return FUNC_X_SOMETHING(n, ["коллекция", "коллекции", "коллекций", "Пусто"]);
};

var FUNC_PAGE_X = function (n) {
        return "Страница " + n;
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
                DO_NOT_DISCONNECT: "Не отсоединяйте устройство",
                USB_CONNECTED: "USB подключен",
                DEVICE_LOCKED: "Устройство заблокировано",

                // About, translate either all or none
                ABOUT_PRSP: "PRS+ @@@firmware@@@\n" + "Автор: Михаил Сухиашвили или kartu (kartu3@gmail.com) с использованием работ: " + "igorsk, boroda, obelix, pepak, kravitz и других. Русский перевод: SLL.\n" + "© GNU Lesser General Public License.\n",
                ABOUT_1: "Авторские права ©2006-2008 Sony Corporation",
                ABOUT_2: "Adobe, логотип Adobe, Reader и PDF являются зарегистрированными торговыми" + " марками или торговыми марками Adobe Systems Incorporated в США и/или других странах.",
                ABOUT_3: "Технология аудио-кодирования MPEG Layer-3 и патенты лицензированы Fraunhofer IIS и Thomson." + " Технология аудио-кодирования MPEG-4 AAC лицензирована Fraunhofer IIS (www.iis.fraunhofer.de/amm/).",
                ABOUT_4: "Программное обеспечение разработано и внедрено Kinoma (www.kinoma.com). Авторские права ©2006,2007 Kinoma, Inc.",
                ABOUT_5: "Bitstream является зарегистрированной торговой маркой; Dutch, Font Fusion, и Swiss являются торговыми марками Bitstream, Inc.",
                ABOUT_6: "Авторские права на часть программ принадлежат ©2005 The FreeType Project (www.freetype.org). Все права защищены.",
                ABOUT_7: "Программное обеспечение использует часть работ Independent JPEG Group.",
                AUTHORIZED_SONY: "\nАвторизован для eBook Store.",
                NOT_AUTHORIZED_SONY: "\nНе авторизован для eBook Store.",
                AUTHORIZED_ADOBE: "\nАвторизован для защищенных материалов Adobe DRM.",
                NOT_AUTHORIZED_ADOBE: "\nНе авторизован для защищенных материалов Adobe DRM.",
                SONY_FW_VERSION: "Версия",
                DEVICE_ID: "Устройство",

                // Mime & card names
                RICH_TEXT_FORMAT: "Rich Text Format",
                ADOBE_PDF: "Adobe PDF",
                EPUB_DOCUMENT: "Документ EPUB",
                BBEB_BOOK: "Книга BBeB",
                PLAIN_TEXT: "Обычный текст",
                INTERNAL_MEMORY: "Внутренняя память",
                MEMORY_STICK: "Memory Stick",
                SD_CARD: "SD Memory",

                // Main.xml & kbook.so stuff
                INVALID_FORMAT: "Неверный формат!",
                FORMATTING: "Форматирую...",
                LOADING: "Загружаю...",
                LOW_BATTERY: "Батарея разряжена!",
                HR_WARNING: "Вы готовы УДАЛИТЬ всё содержимое ридера, восстановить заводские настройки, и очистить состояние защищенного содержимого?\n\nДа - нажмите 5\nНет - нажмите «меню»",
                DEVICE_SHUTDOWN: "Отключение ридера",
                PRESS_MARK_TO_SHUTDOWN: "Нажмите «закладки» для",
                THIS_DEVICE: "полного отключения",
                PRESS_MARK_TO_DELETE: "Нажмите «закладки» для",
                THIS_BOOK: "удаления книги",
                FORMAT_INTERNAL_MEMORY: "Форматировать память",
                PRESS_MARK_TO_FORMAT: "Нажмите «закладки» для",
                MSG_INTERNAL_MEMORY: "начала форматирования",
                RESTORE_DEFAULTS: "Сбросить все настройки",
                PRESS_MARK_TO_RESTORE: "Нажмите «закладки» для",
                DEFAULT_SETTINGS: "сброса всех настроек.",
                UPPER_PAGE: "СТР.",
                ONE_OF_ONE: "1 из 1",
                NO_BATTERY: "Батарея разряжена!",
                FORMATTING_INTERNAL_MEMORY: "Форматирую внутреннюю память...",
                SHUTTING_DOWN: "Отключаюсь...",

                // Root menu
                CONTINUE: "Продолжить чтение",
                BOOKS_BY_TITLE: "Книги по названию",
                BOOKS_BY_AUTHOR: "Книги по авторам",
                BOOKS_BY_DATE: "Книги по дате загрузки",
                COLLECTIONS: "Коллекции книг",
                ALL_BOOKMARKS: "Все закладки",
                NOW_PLAYING: "В эфире",
                MUSIC: "Аудио",
                PICTURES: "Изображения",
                SETTINGS: "Настройки",

                // In Settings
                // orientation
                ORIENTATION: "Ориентация",
                HORIZONTAL: "Альбомная",
                VERTICAL: "Книжная",
                // set date
                SET_DATE: "Дата и время",
                YEAR: "Год",
                MONTH: "Месяц",
                DATE: "День",   // Day
                HOUR: "Часы",
                MINUTE: "Минуты",
                SETDATE_OK: "Применить",
                // width in pixels = ..._SIZE * 35
                SETDATE_OK_SIZE: 7,
                // slideshow
                SLIDESHOW: "Показ слайдов",
                SS_ON: "Включён",
                SS_OFF: "Отключён",
                SS_TURN: "Состояние",
                SS_DURATION: "Длительность",
                // width in pixels = ..._SIZE * 35
                SS_SIZE: 7,
                SS_OK: "Применить",
                // width in pixels = ..._SIZE * 35
                SS_OK_SIZE: 7,
                SECONDS: "секунд",
                // auto standby (aka sleep mode)
                AUTOSTANDBY: "Спящий режим",
                AS_ON: "Включён",
                AS_OFF: "Отключён",
                AS_TURN: "Состояние",
                // width in pixels = ..._SIZE * 35
                AS_SIZE: 7,
                AS_OK: "Применить",
                // width in pixels = ..._SIZE * 35
                AS_OK_SIZE: 7,
                // about
                ABOUT: "О Ридере",
                // reset to factory settings
                RESET_TO_FACTORY: "Сброс на заводские настройки",


                // In Advanced Settings
                ADVANCED_SETTINGS: "Дополнительные настройки",
                // screen lock (aka device lock)
                SCREEN_LOCK: "Защита паролем",
                SL_OFF: "Отключено",
                SL_ON: "Включено",
                SL_CODE: "Пароль",
                SL_TURN: "Состояние",
                // width in pixels = ..._SIZE * 35
                SL_SIZE: 7,
                SL_OK: "Применить",
                SL_OK_SIZE: 7,
                SL_OK_UNLOCK: "Открыть", // unlock
                // width in pixels = ..._SIZE * 35
                SL_OK_UNLOCK_SIZE: 7,
                // format device
                FORMAT_DEVICE: "Форматировать внутреннюю память",

                // In Book menu
                BEGIN: "В начало",
                END: "В конец",
                BOOKMARKS: "Закладки",
                CONTENTS: "Оглавление",
                HISTORY: "Журнал",
                INFO: "Информация",
                UTILITIES: "Инструменты",

                // In Book Utilities
                REMOVE_ALL_BOOKMARKS: "Удалить все закладки",
                CLEAR_HISTORY: "Очистить журнал",
                DELETE_BOOK: "Удалить книгу",

                // In Books by Date
                TODAY: "Сегодня",
                EARLIER_THIS_WEEK: "С начала недели",
                LAST_WEEK: "За прошлую неделю",
                EARLIER_THIS_MONTH: "С начала месяца",
                LAST_MONTH: "За прошлый месяц",
                EARLIER_THIS_QUARTER: "С начала квартала",
                LAST_QUARTER: "За прошлый квартал",
                EARLIER_THIS_YEAR: "С начала года",
                LAST_YEAR: "За прошлый год",
                OLDER: "Ещё ранее",

                FUNC_PAGE_X: FUNC_PAGE_X,
                PART: "Часть",
                OF: "из",
                NO_BOOK: "Пусто",
                NO_SONG: "Нет аудио",

                // Info title strings, comma separated, no spaces after comma
                INFO_TITLES: "Обложка,Название,Автор,Издатель,Жанр,eBook ID,Тип,Дата,Размер,Источник,Файл,Права,Истекают",

                // Titles and criterions for "Books by Title" and "Books by Folder"
                // title is displayed, "criterion" is used for sorting.
                //
                // NOTE: if localization doesn't need custom Books by sorting, just remove CUSTOM_SORT, TITLE_*, CRITERION_* items
                CUSTOM_SORT: true,
                TITLE_1: "0-9",
                CRITERION_1: "0123456789",
                TITLE_2: "А Б В Г",
                CRITERION_2: "АБВГабвг",
                TITLE_3: "Д Е Ж З",
                CRITERION_3: "ДЕЖЗдежз",
                TITLE_4: "И Й К Л",
                CRITERION_4: "ИЙКЛийкл",
                TITLE_5: "М Н О П",
                CRITERION_5: "МНОПмноп",
                TITLE_6: "Р С Т У",
                CRITERION_6: "РСТУрсту",
                TITLE_7: "Ф Х Ц Ч",
                CRITERION_7: "ФХЦЧфхцч",
                TITLE_8: "Ш Щ Ы",
                CRITERION_8: "ШЩЫшщы",
                TITLE_9: "Э Ю Я",
                CRITERION_9: "ЭЮЯэюя",
                TITLE_0: "Прочие",
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
                NODE_PRSP_SETTINGS: "Настройки PRS+",
                NODE_OTHERS: "Мультимедиа",
                NODE_GAMES_AND_UTILS: "Игры и приложения",
                GROUP_MENU_TITLE: "Стиль и функции меню",
                GROUP_VIEWER_TITLE: "Шрифты и кодировки"
        },

        CoreLang: {
                TITLE: "Региональные установки",
                COMMENT: "Требуется перезагрузка",
                OPTION_LANG: "Язык меню",

                OPTION_DATE_FORMAT: "Формат даты",
                VALUE_DEFAULT_DATE: "По умолчанию",
                ddMMMYY: "31/янв/99",
                ddMONTHYY: "31/января/99",
                ddMMMYYYY: "31/янв/1999",
                ddMONTHYYYY: "31/января/1999",

                OPTION_DATE_SEPARATOR: "Разделитель даты",
                VALUE_SPACE: "Пробел",
                VALUE_NONE: "Нет",

                MONTH_SHORT_1: "янв",
                MONTH_SHORT_2: "фев",
                MONTH_SHORT_3: "мар",
                MONTH_SHORT_4: "апр",
                MONTH_SHORT_5: "май",
                MONTH_SHORT_6: "июн",
                MONTH_SHORT_7: "июл",
                MONTH_SHORT_8: "авг",
                MONTH_SHORT_9: "сен",
                MONTH_SHORT_10: "окт",
                MONTH_SHORT_11: "ноя",
                MONTH_SHORT_12: "дек",

                MONTH_1: "январь",
                MONTH_2: "февраль",
                MONTH_3: "март",
                MONTH_4: "апрель",
                MONTH_5: "май",
                MONTH_6: "июнь",
                MONTH_7: "июль",
                MONTH_8: "август",
                MONTH_9: "сентябрь",
                MONTH_10: "октябрь",
                MONTH_11: "ноябрь",
                MONTH_12: "декабрь"
        },

        MenuCaptions: {
                OPTION_STYLE: "Стиль строк меню",
                VALUE_SONY_DEFAULT: "Оригинальный стиль Sony",
                VALUE_ALWAYS_SMALL: "Только мелкий шрифт",
                VALUE_ALWAYS_BIG: "Только крупный шрифт"
        },

        TextEncoding: {
                OPTION_TITLE: "Кодировка книг TXT/RTF",
                MSG_RESTART: "Требуется перезагрузка",

                LATIN: "Latin",
                RUSSIAN: "Русская (Windows-1251)"
        },

        KeyBindings: {
                TITLE: "Действия кнопок",
                DESCRIPTION: "Позволяет задавать действия кнопкам ридера",

                DEFAULT_VALUE: "По умолчанию",

                // Contexts
                GLOBAL: "Глобально",
                IN_MENU: "В меню",
                IN_BOOK: "При чтении",

                // Button groups
                NUM_BUTTONS: "Цифровые кнопки",
                JP_BUTTONS: "Кнопки джойстика",
                OTHER_BUTTONS: "Другие кнопки",
                VOLUME_BUTTONS: "Клавиша громкости",

                // Buttons
                BN_HOME: "«Главное меню»", //---
                BN_SIZE: "«Масштаб»",
                BN_BOOKMARK: "«Закладка»",
                BN_BL_NEXT: "Нижняя «Вперёд»",
                BN_BL_PREVIOUS: "Нижняя «Назад»",
                BN_SB_NEXT: "Боковая «Вперёд»",
                BN_SB_PREVIOUS: "Боковая «Назад»",
                BN_MENU: "«Меню/Возврат»",
                BN_JP_LEFT: "«Влево»",
                BN_JP_RIGHT: "«Вправо»",
                BN_JP_UP: "«Вверх»",
                BN_JP_DOWN: "«Вниз»",
                BN_JP_CENTER: "«Центр»",

                BN_H_HOME: "«Главное меню», удерживая", //---
                BN_H_SIZE: "«Масштаб», удерживая",
                BN_H_BOOKMARK: "«Закладка», удерживая",
                BN_H_BL_NEXT: "Нижняя «Вперёд», удерживая",
                BN_H_BL_PREVIOUS: "Нижняя «Назад», удерживая",
                BN_H_SB_NEXT: "Боковая «Вперёд», удерживая",
                BN_H_SB_PREVIOUS: "Боковая «Назад», удерживая",
                BN_H_MENU: "«Меню/Возврат», удерживая",
                BN_H_JP_LEFT: "«Влево», удерживая",   //---
                BN_H_JP_RIGHT: "«Вправо», удерживая", //---
                BN_H_JP_UP: "«Вверх», удерживая", //---
                BN_H_JP_DOWN: "«Вниз», удерживая", //---
                BN_H_JP_CENTER: "«Центр», удерживая", //---
                BN_H_1: "«1», удерживая",
                BN_H_2: "«2», удерживая",
                BN_H_3: "«3», удерживая",
                BN_H_4: "«4», удерживая",
                BN_H_5: "«5», удерживая",
                BN_H_6: "«6», удерживая",
                BN_H_7: "«7», удерживая",
                BN_H_8: "«8», удерживая",
                BN_H_9: "«9», удерживая",
                BN_H_0: "«0», удерживая",
                BN_1: "«1»",
                BN_2: "«2»",
                BN_3: "«3»",
                BN_4: "«4»",
                BN_5: "«5»",
                BN_6: "«6»",
                BN_7: "«7»",
                BN_8: "«8»",
                BN_9: "«9»",
                BN_0: "«0»",

                BN_VOLUME_DOWN: "Громкость «-»",
                BN_H_VOLUME_DOWN: "Громкость «-», удерживая",
                BN_VOLUME_UP: "Громкость «+»",
                BN_H_VOLUME_UP: "Громкость «+», удерживая"
        },
        
        StandardActions: {
                // Actions
                ACTION_SHUTDOWN: "Отключить",
                ACTION_NEXT_PAGE: "Следующая страница",
                ACTION_PREVIOUS_PAGE: "Предыдущая страница",
                ACTION_NEXT_IN_HISTORY: "Следующая в журнале",
                ACTION_PREVIOUS_IN_HISTORY: "Предыдущая в журнале",
                ACTION_PREVIOUS_SONG: "Предыдущая песня",
                ACTION_NEXT_SONG: "Следующая песня",
                ACTION_GOTO_LINK: "Перейти по ссылке",
                CONTINUE_READING: "Продолжить чтение" //---
        },

        Screenshot: {
                TITLE: "Снимок экрана",
                ACTION_TITLE: "Сделать снимок экрана",
                SAVING_TO: "Сохранить в",
                FAILED_TO_SAVE: "Ошибка сохранения",
                OPT_SAVETO: "Сохранить в",
                OPT_FEEDBACK: "Прогресс сохранения",
                MEMORY_STICK: "Memory stick",
                FEEDBACK_ON: "Включён",
                FEEDBACK_OFF: "Отключён",
                SD_CARD: "SD card",
                INTERNAL_MEMORY: "Внутренняя память"
        },

        BrowseFolders: {
                TITLE: "Просмотр папок",
                OPTION_SORTING_MODE: "Способ сортировки",
                VALUE_BY_TITLE: "По названию",
                VALUE_BY_AUTHOR_THEN_TITLE: "По автору и по названию",
                VALUE_BY_AUTHOR_SWAPPING: "По автору с заменой имя<>фамилия",
                VALUE_BY_FILENAME: "По имени файла",
                OPTION_TITLE_SORTER: "Использовать поле «titleSorter»",
                ENABLED: "Включено",
                DISABLED: "Отключено",
                OPTION_IM_ROOT: "Начинать просмотр папок с...",
                OPTION_CARD_SCAN: "Сканировать карты SD/MS",
                OPTION_MOUNT: "Монтировать SD/MS (экспериментально)",
                NODE_RESCAN_INTERNAL_MEMORY: "Просканировать внутреннюю память",
                NODE_COPY_TO_INTERNAL_MEMORY: "Скопировать во внутреннюю память",
                NODE_COPY_TO_INTERNAL_MEMORY_COMMENT: "Скопировать на верхний уровень внутренней памяти",
                NODE_COPY_AND_RESCAN: "Скопировать + сканировать память",
                NODE_COPY_AND_RESCAN_COMMENT: "Скопировать файл и просканировать всю память",
                ERROR_TARGET_EXISTS: "Ошибка, файл уже существует",
                NODE_BROWSE_FOLDERS: "Просмотр папок",
                NODE_BROWSE_FOLDERS_COMMENT: "Просмотр файловой системы",
                NODE_INTERNAL_MEMORY: "Внутренняя память",
                NODE_MEMORY_STICK: "Memory Stick",
                NODE_MEMORY_STICK_MOUNT: "Memory Stick через монтирование",
                NODE_SD_CARD: "SD Card",
                NODE_SD_CARD_MOUNT: "SD Card через монтирование",
                FAVOURITE_FOLDERS_FILE: "Список избранных папок"

        },

        Clock: {
                TITLE: "Часы",
                OPTION_STYLE: "Стиль часов",
                VALUE_24H: "24 часа",
                VALUE_12H: "12 часов",
                OPTION_MODE: "Режим часов",
                VALUE_ALWAYS_SHOWN: "Всегда показывать",
                VALUE_SHOWN_ONLY_IN_MENU: "Показывать только в меню",
                VALUE_SHOWN_WHEN_READING: "Показывать только при чтении",
                VALUE_OFF: "Отключены",
                ACTION_TOGGLE_CLOCK: "Переключить часы",
                AM: "am",
                PM: "pm"
        },

        PageIndex: {
                TITLE: "Индексная строка",
                INDEX_STYLE_BOOK: "Стиль в книге",
                INDEX_MODE_BOOK: "Режим в книге",
                INDEX_MODE_MENU: "Режим в меню",
                INDEX_STYLE_MENU: "Стиль в меню",
                OF: "из",
                ALWAYS_SHOWN: "Всегда показывать",
                NEVER_SHOWN: "Никогда не показывать",
                NOT_SHOWN_IF_SINGLE_PAGE: "Скрывать, если 1 страница",
                VALUE_STATS0: "5 / 100 (страниц в минуту)",
                VALUE_STATS1: "5 / 100 (оставшееся время)",
                VALUE_STATS2: "5 / 100 (см / оставшееся время)"
        },

        EpubUserStyle: {
                OPTION_EPUB_CSS_FILE: "Свой стиль EPUB (CSS файл)",
                MSG_WARNING: "Влияет только на книги, созданные позднее!",
                VALUE_DISABLED: "Отключён"
        },

        BookHistory: {
                FUNC_X_BOOKS: FUNC_X_BOOKS,
                FUNC_PAGE_X: FUNC_PAGE_X,
                TITLE: "История книг",
                VALUE_DISABLED: "Отключена",
                OPTION_REPLACE: "История в «Продолжить чтение»",
                VALUE_ON: "Включено",
                VALUE_OFF: "Отключено",
                OPTION_SKIP_BOOK_MENU: "Пропускать меню книги",
                VALUE_WHEN_OPENING_BOOK: "При открытии книги",
                VALUE_WHEN_EXITING_BOOK: "При выходе из книги",
                VALUE_ALWAYS: "Всегда",
                VALUE_NEVER: "Отключено"
                
        },

        //ReadMark      ReadMark: {
        //              TITLE_UNREAD: "Пометить книгу - Уже прочитана",
        //              TITLE_READ: "Пометить книгу - Еще не прочитана",
        //      },

        TextScale: {
                OPTION_SCALE_DEFAULT: "Шрифт по умолчанию",
                VALUE_SMALL: "(S) Мелкий шрифт",
                VALUE_MEDIUM: "(M) Средний шрифт",
                VALUE_LARGE: "(L) Крупный шрифт",
                VALUE_DISABLED: "Отключён",
                VALUE_ENABLED: "Включён"
        },

        MenuTuning: {
                OPTION_OUTER: "В главном меню"
        },

        Dictionary: {
                TITLE: "Словарь",
                WARN_DICT_DISABLED: "Словарь отключён!",
                WARN_DICT_DOESNT_EXIST: "Файл словаря не существует!",
                ACTION_DICTIONARY: "Запустить словарь",
                OPTION_DICTIONARY: "Файл словаря",
                VALUE_DISABLED: "Отключён"
        },
	
        MediaTag: {
          MARK_0: "Поставить метку «галочка»",
          MARK_1: "Поставить метку «звезда»",
          MARK_2: "Поставить метку «круг»",
          MARK_3: "Поставить метку «квадрат»",
          MARK_4: "Поставить метку «треугольник»",
          VALUE_OVER_ICON: "Поверх значка книги",
          VALUE_BOTTOM: "В нижней строке слева",
          VALUE_RIGHT: "В верхней строке справа",
          OPTION_POSITION: "Размещение метки"
        },
        MenuCustomizer: {
          TITLE: "Главное меню",
          MENU_ITEM: "Действие меню",
          MENU_SEPARATOR: "Разделитель меню",
          DEFAULT: "Действие по умолчанию",
          VALUE_DEFAULT: "По умолчанию",
          VALUE_YES: "Включен",
          VALUE_NO: "Выключен",
          SLOT_1: "Строка 1",
          SLOT_2: "Строка 2",
          SLOT_3: "Строка 3",
          SLOT_4: "Строка 4",
          SLOT_5: "Строка 5",
          SLOT_6: "Строка 6",
          SLOT_7: "Строка 7",
          SLOT_8: "Строка 8",
          SLOT_9: "Строка 9",
          SLOT_10: "Строка 0"
        },
        StatusBar:{
          TITLE: "Строка состояния"
        },
        StatusBar_Clock: {
                TITLE: "Часы",
                OPTION_STYLE: "Стиль часов",
                VALUE_24H: "24 часа",
                VALUE_12H: "12 часов",
                OPTION_MODE: "Режим часов",
                VALUE_ALWAYS_SHOWN: "Всегда показывать",
                VALUE_SHOWN_ONLY_IN_MENU: "Показывать Только в меню",
                VALUE_SHOWN_WHEN_READING: "Показыать только при чтении",
                VALUE_OFF: "Отключены",
                ACTION_TOGGLE_CLOCK: "Переключить часы",
                AM: "am",
                PM: "pm"
        },
        StatusBar_PageIndex: {
                TITLE: "Указатель страниц",
                INDEX_STYLE_BOOK: "Стиль в книге",
                INDEX_MODE_BOOK: "Режим в книге",
                INDEX_MODE_MENU: "Режим в меню",
                INDEX_STYLE_MENU: "Стиль в меню",
                OF: "из",
                ALWAYS_SHOWN: "Всегда показывать",
                NEVER_SHOWN: "Никогда не показывать",
                NOT_SHOWN_IF_SINGLE_PAGE: "Скрывать, если 1 страница",
                VALUE_STATS0: "5 / 100 (страниц в минуту)",
                VALUE_STATS1: "5 / 100 (оставшееся время)",
                VALUE_STATS2: "5 / 100 (см / оставшееся время)"
        }
};