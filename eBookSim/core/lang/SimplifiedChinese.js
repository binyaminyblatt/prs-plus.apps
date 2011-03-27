// Language: SimplifiedChinese
// Description: Localization file
// Translator: thawk
//
// History:
//	2010-05-06 kartu - Initial version by thawk
//	2010-05-11 kartu - Added VALUE_DEFAULT_DATE (CoreLang)
//	2010-05-15 kartu - Added OPTION_SKIP_BOOK_MENU (BookHistory)
//	2010-05-17 kravitz - Replaced PAGE (BookHistory) with added FUNC_PAGE_X
//	2010-05-17 kravitz - Corrected by thawk
//	2010-05-18 kravitz - Replaced PAGE (Sony) with FUNC_PAGE_X
//	2010-05-19 kravitz - Corrected by thawk
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
	return FUNC_X_SOMETHING(n, ["本", "1 本", "无"]);
};

var FUNC_X_SETTINGS = function (n) {
	return FUNC_X_SOMETHING(n, ["项", "1 项", "无"]);
};

var FUNC_X_ITEMS = function (n) {
	return FUNC_X_SOMETHING(n, ["项", "1 项", "无"]);
};

var FUNC_X_PAGES = function (n) {
	return FUNC_X_SOMETHING(n, ["页", "1 页", "无"]);
};

var FUNC_X_PICTURES = function (n) {
	return FUNC_X_SOMETHING(n, ["张", "1 张", "无"]);
};

var FUNC_X_SONGS = function (n) {
	return FUNC_X_SOMETHING(n, ["首", "1 首", "无"]);
};

var FUNC_X_BOOKMARKS = function (n) {
	return FUNC_X_SOMETHING(n, ["项", "1 项", "无"]);
};

var FUNC_X_COLLECTIONS = function (n) {
	return FUNC_X_SOMETHING(n, ["项", "1 项", "无"]);
};

var FUNC_PAGE_X = function (n) {
	return "第" + n + "页";
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
		DO_NOT_DISCONNECT: "请不要断开",
		USB_CONNECTED: "已连接USB",
		DEVICE_LOCKED: "设备被锁定",

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
		RICH_TEXT_FORMAT: "RTF格式",
		ADOBE_PDF: "Adobe PDF",
		EPUB_DOCUMENT: "EPUB格式",
		BBEB_BOOK: "BBeB格式",
		PLAIN_TEXT: "纯文本格式",
		INTERNAL_MEMORY: "内部存储",
		MEMORY_STICK: "Sony记忆棒",
		SD_CARD: "SD卡",

		// Main.xml & kbook.so stuff
		INVALID_FORMAT: "文件格式无法识别！",
		FORMATTING: "正在排版...",
		LOADING: "加载中...",
		LOW_BATTERY: "电量过低！",
		HR_WARNING: "您要删除所有内容,恢复出厂设置,清除DRM数字版权保护信息吗?\n\n是 - 按 5\n否 - 按 MENU",
		DEVICE_SHUTDOWN: "关闭设备",
		PRESS_MARK_TO_SHUTDOWN: "按MARK键",
		THIS_DEVICE: "关闭此设备",
		PRESS_MARK_TO_DELETE: "按MARK键",
		THIS_BOOK: "开始删除",
		FORMAT_INTERNAL_MEMORY: "格式化内部存储",
		PRESS_MARK_TO_FORMAT: "按MARK键开始",
		MSG_INTERNAL_MEMORY: "格式化内部存储",
		RESTORE_DEFAULTS: "恢复缺省设置",
		PRESS_MARK_TO_RESTORE: "按MARK键开始",
		DEFAULT_SETTINGS: "恢复缺省设置",
		UPPER_PAGE: "PAGE",
		ONE_OF_ONE: "1 of 1",
		NO_BATTERY: "没有电！",
		FORMATTING_INTERNAL_MEMORY: "正在格式化内部存储...",
		SHUTTING_DOWN: "正在关闭设备...",

		// Root menu
		CONTINUE: "继续上次阅读",
		BOOKS_BY_TITLE: "按标题排序",
		BOOKS_BY_AUTHOR: "按作者排序",
		BOOKS_BY_DATE: "按日期排序",
		COLLECTIONS: "分类",
		ALL_BOOKMARKS: "书签",
		NOW_PLAYING: "正在播放",
		MUSIC: "音乐",
		PICTURES: "图片",
		SETTINGS: "配置选项",

		// In Settings
		// orientation
		ORIENTATION: "显示方向",
		HORIZONTAL: "横向",
		VERTICAL: "竖向",
		// set date
		SET_DATE: "设置日期",
		YEAR: "年",
		MONTH: "月",
		DATE: "日", // Day
		HOUR: "时",
		MINUTE: "分",
		SETDATE_OK: "确认",
		// width in pixels = ..._SIZE * 35
		SETDATE_OK_SIZE: 3,
		// slideshow
		SLIDESHOW: "幻灯片",
		SS_ON: "开",
		SS_OFF: "关",
		SS_TURN: "开关",
		SS_DURATION: "每张图片显示",
		// width in pixels = ..._SIZE * 35
		SS_SIZE: 2,
		SS_OK: "确认",
		// width in pixels = ..._SIZE * 35
		SS_OK_SIZE: 3,
		SECONDS: "秒",
		// auto standby (aka sleep mode)
		AUTOSTANDBY: "休眠模式",
		AS_ON: "开",
		AS_OFF: "关",
		AS_TURN: "开关",
		// width in pixels = ..._SIZE * 35
		AS_SIZE: 2,
		AS_OK: "确认",
		// width in pixels = ..._SIZE * 35
		AS_OK_SIZE: 3,
		// about
		ABOUT: "关于",
		// reset to factory settings
		RESET_TO_FACTORY: "恢复出厂设置",

		// In Advanced Settings
		ADVANCED_SETTINGS: "高级选项",
		// screen lock (aka device lock)
		SCREEN_LOCK: "设备锁",
		SL_OFF: "关",
		SL_ON: "开",
		SL_CODE: "密码",
		SL_TURN: "开关",
		// width in pixels = ..._SIZE * 35
		SL_SIZE: 2,
		SL_OK: "确认",
		SL_OK_SIZE: 3,
		SL_OK_UNLOCK: "解锁", // unlock
		// width in pixels = ..._SIZE * 35
		SL_OK_UNLOCK_SIZE: 3,
		// format device
		FORMAT_DEVICE: "格式化内部存储",

		// In Book menu
		BEGIN: "起始页",
		END: "结束页",
		BOOKMARKS: "书签",
		CONTENTS: "目录",
		HISTORY: "阅读历史",
		INFO: "信息",
		UTILITIES: "工具",

		// In Book Utilities
		REMOVE_ALL_BOOKMARKS: "删除所有书签",
		CLEAR_HISTORY: "清除阅读历史",
		DELETE_BOOK: "删除本书",

		// In Books by Date
		TODAY: "今天",
		EARLIER_THIS_WEEK: "本周早期",
		LAST_WEEK: "上周",
		EARLIER_THIS_MONTH: "本月早期",
		LAST_MONTH: "上月",
		EARLIER_THIS_QUARTER: "本季度早期",
		LAST_QUARTER: "上季度",
		EARLIER_THIS_YEAR: "本年度早期",
		LAST_YEAR: "去年",
		OLDER: "更早",

		FUNC_PAGE_X: FUNC_PAGE_X,
		PART: "段",
		OF: "共",
		NO_BOOK: "无",
		NO_SONG: "无",

		// Info title strings, comma separated, no spaces after comma
		//INFO_TITLES: "Cover,Title,Author,Publisher,Category,eBook ID,Kind,Date,Size,Location,File,Digital Rights,Expires",
		INFO_TITLES: "封面,标题,作者,发布者,类型,电子书ID,文件类型,日期,文件大小,存放位置,文件路径,数字版权保护,失效时间",

		// Titles and criterions for "Books by Title" and "Books by Folder"
		// title is displayed, "criterion" is used for sorting.
		//
		// NOTE: if localization doesn't need custom Books by sorting, just remove CUSTOM_SORT, TITLE_*, CRITERION_* items
		CUSTOM_SORT: false,
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
		NODE_PRSP_SETTINGS:  "PRS+ 选项",
		NODE_OTHERS: "多媒体",
		NODE_GAMES_AND_UTILS: "游戏及工具",
		GROUP_MENU_TITLE: "菜单选项",
		GROUP_VIEWER_TITLE: "阅读器选项"
	},

	CoreLang: {
		TITLE: "区域与语言",
		COMMENT: "重启生效！",
		OPTION_LANG: "界面语言",

		OPTION_DATE_FORMAT: "日期格式",
		VALUE_DEFAULT_DATE: "缺省",
		ddMMMYY: "31/Jan/99",
		ddMONTHYY: "31/January/99",
		ddMMMYYYY: "31/Jan/1999",
		ddMONTHYYYY: "31/January/1999",

		OPTION_DATE_SEPARATOR: "日期分隔符",
		VALUE_SPACE: "空格",
		VALUE_NONE: "无",

		MONTH_SHORT_1: "一月",
		MONTH_SHORT_2: "二月",
		MONTH_SHORT_3: "三月",
		MONTH_SHORT_4: "四月",
		MONTH_SHORT_5: "五月",
		MONTH_SHORT_6: "六月",
		MONTH_SHORT_7: "七月",
		MONTH_SHORT_8: "八月",
		MONTH_SHORT_9: "九月",
		MONTH_SHORT_10: "十月",
		MONTH_SHORT_11: "十一月",
		MONTH_SHORT_12: "十二月",

		MONTH_1: "一月",
		MONTH_2: "二月",
		MONTH_3: "三月",
		MONTH_4: "四月",
		MONTH_5: "五月",
		MONTH_6: "六月",
		MONTH_7: "七月",
		MONTH_8: "八月",
		MONTH_9: "九月",
		MONTH_10: "十月",
		MONTH_11: "十一月",
		MONTH_12: "十二月"
	},

	MenuCaptions: {
		OPTION_STYLE: "菜单项字体大小",
		VALUE_SONY_DEFAULT: "Sony缺省",
		VALUE_ALWAYS_SMALL: "小字体",
		VALUE_ALWAYS_BIG: "大字体"
	},

	TextEncoding: {
		OPTION_TITLE: "TXT及RTF格式电子书的编码",
		MSG_RESTART: "重启生效！",
		LATIN: "Latin",
		RUSSIAN:  "Russian (Windows-1251)"
	},

	KeyBindings: {
		TITLE: "按键设置",
		DESCRIPTION: "可以在按键上绑定动作",

		DEFAULT_VALUE: "缺省",

		// Contexts
		GLOBAL:  "全局按键设置",
		IN_MENU: "菜单按键设置",
		IN_BOOK:  "阅读按键设置",

		// Button groups
		NUM_BUTTONS: "数字键",
		JP_BUTTONS: "五向键",
		OTHER_BUTTONS: "其它键",
		VOLUME_BUTTONS: "音量键",

		// Buttons
		BN_SIZE: "放大镜按钮",
		BN_BOOKMARK: "书签按钮",
		BN_BL_NEXT: "左下角的'>'",
		BN_BL_PREVIOUS: "左下角的'<'",
		BN_SB_NEXT: "右边的'>'",
		BN_SB_PREVIOUS:  "右边的'<'",
		BN_MENU: "菜单键",
		BN_JP_LEFT: "向左",
		BN_JP_RIGHT: "向右",
		BN_JP_UP: "向上",
		BN_JP_DOWN: "向下",
		BN_JP_CENTER: "中间按钮",
		BN_H_SIZE: "长按放大镜按钮",
		BN_H_BOOKMARK: "长按书签按钮",
		BN_H_BL_NEXT: "长按左下角的'>'",
		BN_H_BL_PREVIOUS: "长按左下角的'<'",
		BN_H_MENU: "长按菜单键",
		BN_H_SB_NEXT: "长按右边的'>'",
		BN_H_SB_PREVIOUS:  "长按右边的'<'",
		BN_H_JP_CENTER: "长按中间按钮",
		BN_H_1: "长按1",
		BN_H_2: "长按2",
		BN_H_3: "长按3",
		BN_H_4: "长按4",
		BN_H_5: "长按5",
		BN_H_6: "长按6",
		BN_H_7: "长按7",
		BN_H_8: "长按8",
		BN_H_9: "长按9",
		BN_H_0: "长按0",
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
		BN_VOLUME_DOWN: "音量-",
		BN_H_VOLUME_DOWN: "长按音量-",
		BN_VOLUME_UP: "音量+",
		BN_H_VOLUME_UP: "长按音量+"
	},		
	
	StandardActions: {
		// Actions
		ACTION_SHUTDOWN: "关闭设备",
		ACTION_NEXT_PAGE: "下一页",
		ACTION_PREVIOUS_PAGE: "上一页",
		ACTION_NEXT_IN_HISTORY: "前进（阅读历史）",
		ACTION_PREVIOUS_IN_HISTORY: "后退（阅读历史）",
		ACTION_PREVIOUS_SONG: "上一首歌",
		ACTION_NEXT_SONG: "下一首歌",
		ACTION_GOTO_LINK: "跳到链接"
	},

	Screenshot: {
		TITLE: "截屏",
		ACTION_TITLE: "截屏",
		SAVING_TO: "正在保存 ",
		FAILED_TO_SAVE: "保存失败",
		OPT_SAVETO: "保存到",
		OPT_FEEDBACK: "显示保存进度",
		MEMORY_STICK: "Sony记忆棒",
		FEEDBACK_ON: "开",
		FEEDBACK_OFF: "关",
		SD_CARD: "SD卡",
		INTERNAL_MEMORY: "内部存储"
	},

	BrowseFolders: {
		TITLE:  "浏览文件夹",
		OPTION_SORTING_MODE: "排序方式",
		VALUE_BY_TITLE: "按标题排序",
		VALUE_BY_AUTHOR_THEN_TITLE: "先按作者再按标题排序",
		VALUE_BY_AUTHOR_SWAPPING: "按作者排序，但调换的姓和名的顺序",
		VALUE_BY_FILENAME: "按文件名排序",
		OPTION_TITLE_SORTER: "排序时参考'titleSorter'字段",
		ENABLED: "启用",
		DISABLED: "禁用",
		OPTION_IM_ROOT: "内部存储的根目录",
		OPTION_CARD_SCAN: "扫描SD/MS卡上的新书",
		OPTION_MOUNT: "通过Mount访问SD/MS卡（实验功能）",
		NODE_RESCAN_INTERNAL_MEMORY: "重新扫描内部存储",
		NODE_COPY_TO_INTERNAL_MEMORY: "拷贝到内部存储",
		NODE_COPY_TO_INTERNAL_MEMORY_COMMENT: "把文件拷贝到内部存储的根目录",
		NODE_COPY_AND_RESCAN: "拷贝到内部存储并更新书本目录",
		NODE_COPY_AND_RESCAN_COMMENT: "把文件拷贝到内部存储的根目录并更新书本目录",
		ERROR_TARGET_EXISTS: "错误，目标文件已存在",
		NODE_BROWSE_FOLDERS: "浏览文件夹",
		NODE_BROWSE_FOLDERS_COMMENT: "查看文件",
		NODE_INTERNAL_MEMORY: "内部存储",
		NODE_MEMORY_STICK: "Sony记忆棒",
		NODE_MEMORY_STICK_MOUNT: "通过Mount访问Sony记忆棒",
		NODE_SD_CARD: "SD卡",
		NODE_SD_CARD_MOUNT: "通过Mount访问SD卡"
	},

	Clock: {
		TITLE: "时钟",
		OPTION_STYLE: "时钟样式",
		VALUE_24H: "24小时制",
		VALUE_12H: "12小时制",
		OPTION_MODE: "时钟显示",
		VALUE_ALWAYS_SHOWN: "始终显示",
		VALUE_SHOWN_ONLY_IN_MENU: "只在菜单状态下显示",
		VALUE_SHOWN_WHEN_READING: "只在阅读状态下显示",
		VALUE_OFF: "不显示",
		ACTION_TOGGLE_CLOCK: "切换时钟",
		AM: "am",
		PM: "pm"
	},

	PageIndex: {
		TITLE: "页码",
		INDEX_STYLE_BOOK: "阅读状态下的页码样式",
		INDEX_MODE_BOOK: "阅读状态下的页码显示",
		INDEX_MODE_MENU: "菜单状态下的页码显示",
		INDEX_STYLE_MENU: "菜单状态下的页码样式",
		OF: "of",
		ALWAYS_SHOWN: "始终显示",
		NEVER_SHOWN: "不显示",
		NOT_SHOWN_IF_SINGLE_PAGE: "多于一页时才显示",
		VALUE_STATS0: "5 / 100 (每分钟页数)",
		VALUE_STATS1: "5 / 100 (预计到看完的时间)",
		VALUE_STATS2: "5 / 100 (每分钟页数/预计看完需时)"
	},

	EpubUserStyle: {
		OPTION_EPUB_CSS_FILE: "EPUB用户样式表（CSS文件）",
		MSG_WARNING: "仅对修改选项后重新打开的文件生效",
		VALUE_DISABLED: "禁用"
	},

	BookHistory: {
		FUNC_X_BOOKS: FUNC_X_BOOKS,
		FUNC_PAGE_X: FUNC_PAGE_X,
		TITLE: "阅读历史",
		VALUE_DISABLED: "禁用",
		OPTION_REPLACE: "在继续阅读中列出最近看过的书",
		VALUE_ON: "打开",
		VALUE_OFF: "关闭",
		OPTION_SKIP_BOOK_MENU: "跳过书本菜单，直接到上次阅读位置"
	},

//ReadMark	ReadMark: {
//		TITLE_UNREAD: "标记书本为已读",
//		TITLE_READ: "标记书本为未读",
//	},

	TextScale: {
		OPTION_SCALE_DEFAULT: "缺省字体大小",
		VALUE_SMALL: "(S)小字体",
		VALUE_MEDIUM: "(M)中字体",
		VALUE_LARGE: "(L)大字体",
		VALUE_DISABLED: "禁用",
		VALUE_ENABLED: "启用"
	},

	MenuTuning: {
		OPTION_OUTER: "根菜单包含"
	},

	Dictionary: {
		TITLE: "字典",
		WARN_DICT_DISABLED: "字典功能已被禁用",
		WARN_DICT_DOESNT_EXIST: "字典文件不存在！",
		ACTION_DICTIONARY: "启动字典",
		OPTION_DICTIONARY: "字典文件",
		VALUE_DISABLED: "禁用"
	}
};
