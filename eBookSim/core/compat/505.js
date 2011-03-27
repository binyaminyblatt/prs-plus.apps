// Name: 505
// Description: Sony  PRS-505 compatibility layer
//
// History:
//	2010-07-09 kartu - Initial version

return {
	NodeKinds: {
		EMPTY: 1000,
		BOOK: 2,
		FILE: 2,
		AUDIO: 3,
		PICTURE: 4,
		SETTINGS: 5,
		AUTHOR: 6,
		CONTINUE: 7,
		PREVIOUS_PAGE: 8,
		NEXT_PAGE: 9,
		BOOKMARK: 10,
		LIST: 11,
		CLOCK: 12,
		PAUSE: 13,
		PLAY: 14,
		INFO: 15,
		LOCK: 16,
		BOOKS: 17,
		PICTURES: 18,
		CROSSED_BOX: 19,
		DATE: 22,
		ABOUT: 25,
		BACK: 26,
		ABC: 27,
		DATETIME: 28,
		DB: 29,
		SHUTDOWN: 31,
		FOLDER: 37,
		MS: 34,
		SD: 35,
		INTERNAL_MEM: 36,
		GAME: 38,
		TEXT_SCALE: 2, //FIXME add icon
		DEFAULT: 37,
		// 600 and 900 have more than one type of icons
		getIcon: function (strKind, type) {
			var kind = this[strKind];
			if (typeof kind === "undefined") {
				kind = 43;
			}
			return kind;
		}
	},

	// PRS+ abstract key code to actual key code, model specific
	keyCodes: {
		"1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "0": "0",
		"1_h": "kHold1", "2_h": "kHold2", "3_h": "kHold3", "4_h": "kHold4", "5_h": "kHold5", "6_h": "kHold6", "7_h": "kHold7", "8_h": "kHold8", "9_h": "kHold9", "0_h": "kHold0",
		jp_left: "kLeft", jp_right: "kRight", jp_up: "kUp", jp_down: "kDown",
		jp_center: "0x27", jp_center_h: "0x27-hold",
		menu: "0x21", menu_h: "0x21-hold",
		bookmark: "0x32", bookmark_h: "0x32-hold",
		size: "0x42", size_h: "0x42-hold",
		volume_down: "0x41", volume_down_h: "0x41-hold", volume_up: "0x40", volume_up_h: "0x40-hold",
		// Bottom left next/prev page
		bl_next: "0x30", bl_next_h: "0x30-hold", bl_previous: "0x31", bl_previous_h: "0x31h",
		// Sidebar next/prev page
		sb_next: "kNext", sb_next_h: "kLast", sb_previous: "kPrevious", sb_previous_h: "kFirst"
	},
	// does device have numeric keys
	hasNumericButtons: true,
	// are there volume keys
	hasVolumeButtons: true,
	// are there paging buttons
	hasPagingButtons: true,
	// Are there SD/MS card slots
	hasCardSlots: true,
	
	standardMenuLayout: {
		"continue": [0],
		booksByTitle: [1],
		booksByAuthor: [2],
		booksByDate: [3],
		collections: [4],
		bookmarks: [5],
		nowPlaying: [6],
		music: [7],
		pictures: [8],
		settings: [9],
		advancedSettings: [9,4]
	},

	prspMenu: {
		// Where to find which node, relative to kbook.root
		movableNodes: [1,0 /* by author */,1,1,1,1,1,1,1,1,0 /* settings */],
		defaultLayout: [
			{ name: "continue"}, 
			{ name: "booksByTitle"}, 
			{ name: "booksByDate"}, 
			{ name: "booksByAuthor"}, 
			{ name: "collections"},
			{ name: "bookmarks"}, 
			{ name: "settings", separator: true }
			// TODO
		]
	},

	// TODO add music and picture types
	media: {
		// types to be used to determine media type using "xs.isInstanceOf"
		types: [FskCache.text,FskCache.text],
		// what kind it is, supported are: "book", "picture", "note", "audio"
		kinds: ["book"],
		// node prototypes to use when creating media nodes
		prototypes: [FskCache.tree.bookNode]
	},
	
	compareStrings: function(a, b) {
		if (a === b) {
			return 0;
		}
		return a > b ? 1 : -1;
	}	
};

	/* TODO model specific
	// This hook is needed, since the parent node doesn't have a "shuffleList", so default onEnterSong fails
	//
	var oldOnEnterSong = kbook.model.onEnterSong;
	kbook.model.onEnterSong = function(node) {
		try {
			if (xs.isInstanceOf(node, musicPrototype)) {
				this.currentNode = node;
				this.STATE = 'SONG';
				kbook.menuData.setNode(null);
				if (this.currentSong != node) {
					this.playSong(node);
				} else {
					kbook.movieData.resetDisplayTimer();
				}			
			} else {
				oldOnEnterSong.apply(this, arguments);
			}
		} catch (e) {
			log.trace("Error in onEnterSong: " + e);
		}
	}; */
