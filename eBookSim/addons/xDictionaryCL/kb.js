// Description: Dictionary by Celemenseken & Lisak & m-land 
// History: 
//      2010-05-18 kartu - Uploaded scrolling fixes by m-land 
//      2010-05-20 kartu - Fixed flickering caused by hourglass 
// 
// var Core = params.Core;
// log = params.log;
//dictionary files 
var dictPath = "dictionary/enczTAB.dic"//params.dictPath; //"/Data/database/system/PRSPlus/dictionary/"; //directory with dictionaries 
var lineNo = 0; //a line number with the result of the last search 
var lineLength = 30; //length of line when displaying definition 
var xCol = 1; //starting position of the cursor - at the middle column 
var scrollingOffset = 0; //which line of definition is "1st" due to scrolling?
var formatedDefinition = []; //array with formated definition

var resultsSize = 0;    //0==large, 9 lines; 1==small, 19 lines
var lineCount = 9;      //number of lines to display
var definition = '';    //not line-break definition

//Three button selection mode: if true, left arrow: left column, up arrow: up column, right arrow: right column 
//otherwise: up arrow: previous term, left arrow - move cursor to left, right arrow - move cursor to the right 
//target.threeButton = true; 
var threeButton = false;

//map of special function keys 
var keyMap = [
         ['', 'CLR', 'BS'],
         ['a', 'b', 'c'],
         ['d', 'e', 'f'],
         ['g', 'h', 'i'],
         ['j', 'k', 'l'],
         ['m', 'n', 'o'],
         ['p', 'q', 'r'],
         ['s', 't', 'u'],
         ['v', 'w', 'x'],
         ['y', 'z', ' ']
 ];



		// Dumps properties of an object
		//
		var dump = function (obj) {
			for (var p in obj) {
				this.bubble("tracelog",p + " => " + obj);
			}
		};
		var dumpToString = function (o, prefix, depth) {
			var typeofo = typeof o;
			if (typeofo == "string" || typeofo == "boolean" || typeofo == "number") {
				return "'" + o + "'(" + typeofo + ")";
			}
			// Default depth is 1
			if (typeof depth == "undefined") {
				depth = 1;
			}
			// we show prefix if depth is
			if (typeofo == "undefined") {
				return "undefined";
			}
			if (o === null) {
				return "null";
			}
			if (typeofo == "function") {
				return "a function";
			}
			if (o.constructor == Array) {
				var s = "Array(" + o.length + ")";
				if (depth > 0) {
					s += " dumping\n";
					for (var i = 0, n = o.length; i < n; i++) {
						s += prefix + "[" + i + "] => " + this.dumpToString(o[i], prefix + "\t", depth - 1) + "\n";
					}
				}
				// remove trailing "\n"
				if (s.charAt(s.length - 1) == "\n") {
					s = s.substring(0, s.length - 1);
				}
				return s;
			}
			if (typeofo != "object") {
				return "unknown entitiy of type (" + (typeof o) + ")";
			}

			// if depth is less than 1, return just "an object" string
			if (depth < 1) {
				return "an object";
			}
			if (typeof prefix == "undefined") {
				prefix = "";
			}

			// at this point, o is not null, and is an object
			var str = "dumping\n";
			var hasProps = false;
			for (var prop in o) {
				hasProps = true;
				try {
					var oprop = o[prop];
					str += prefix + prop + " => " + this.dumpToString(oprop, prefix + "\t", depth - 1) + "\n";
				} catch (ee) {
					str += prefix + prop + " => " + "failed to tostring: " + ee + "\n";
				}
			}
			if (!hasProps) {
				return "an object with no properties";
			}
			// remove trailing "\n"
			if (str.charAt(str.length - 1) == "\n") {
				str = str.substring(0, str.length - 1);
			}
			return str;  
		};



//return file's content in a string 
var fileToString = function(path) {
      	var stream;
      	try {
      		stream = new Stream.File(path);
      		return stream.toString();
      	} catch (whatever) {
      	} finally {
      		try {
      			stream.close();
      		} catch (ignore) {
      		}
      	}
  		return null;
   // return Core.io.getFileContent(path, null);
};


		target.getSoValue = function (obj, propName) {
		 this.bubble("tracelog","getSoValue");
		 this.bubble("tracelog","obj"+obj+" propName "+propName);
			if (propName === undefined) {
				return FskCache.mediaMaster.getInstance.call(this, obj);
			} else {
				return FskCache.mediaMaster.getInstance.call(obj, propName);
			}
		};





//put text into /tmp/script.sh and run it 
var runCommand = function(text) {
    //Core.shell.exec(text);
};

//run a command and return the result 
var runCommandResult = function(text) { /*
    var tmpf = "/tmp/__dict_result__";
    runCommand(text + " >" + tmpf);

    var res = fileToString(tmpf);
    this.issue = res;

    FileSystem.deleteFile(tmpf);
    return res; */
};

//DICTIONARY FUNCTIONS 

target.exitApp = function() {
    kbook.autoRunRoot.exitIf(kbook.model);
};

target.clearInput = function() {
    this.inputLine.setValue('');
};

target.clearStatus = function() {
    this.statusLine.setValue('');
};


target.clearLines = function() {
};

//shows/hides hourglass 
target.showHourGlass = function(show) {
    this.hourGlass.show(show);
    this.hourGlass.invalidate();
    if (show) {
        // Force screen update 
        // FskUI.Window.update.call(kbook.model.container.getWindow());
    }
};

target.changeSize = function() {
};

//formats definition for Result area
target.txtFormat = function() {
    var aLines = [];
    var myLines = '';
    var strPos = 0;
    var arrIdx = 0;
    var spaceIdx = 0;
    var nNextTab = 0;
    var bNew = true;
    var szBul = '•';

    while (strPos < definition.length) {
        nNextTab = definition.indexOf('\t', strPos);
        if (nNextTab == -1) {
            myLines += szBul + definition.slice(strPos, definition.length);
            break;
        }
        myLines += szBul + definition.slice(strPos, nNextTab) + '\n';
        strPos = nNextTab + 1;
    }
    this.textlines.setValue(myLines);

    return aLines;
};
//scrolling of resultset 
target.doScroll = function() {
};

//move cursor in columns (xCol: 0, 1 or 2) 
target.moveCursor = function(direction) {
    if (direction == "left") {
        if (--xCol < 0) {
            xCol = 2;
        }
    }
    if (direction == "right") {
        if (++xCol > 2) {
            xCol = 0;
        }
    }

    this.lineCursor.changeLayout(457 + xCol * 48, undefined, undefined, 627, undefined, undefined);
};
//move cursor in columns (xCol: 0, 1 or 2) 
target.arrowKey = function(button) {
    if (button == "left") {
        if (threeButton) {
            xCol = 0;
        } else {
            //lookup previous dict. line 
            this.findNeighbour(-1);
        }
    }
    if (button == "right") {
        if (threeButton) {
            xCol = 2;
        } else {
            //lookup next dict. line 
            this.findNeighbour(1);
        }
    }

    if (button == "up") {
    //    this.doNewScroll(-1);
    }

    if (button == "down") {
    //    this.doNewScroll(1);
    }

    this.lineCursor.changeLayout(457 + xCol * 48, undefined, undefined, 627, undefined, undefined);
};

//select a letter/function w/ function keys (key: 0..9)
target.pressDigit = function(digit) {
    var button = keyMap[digit][xCol];
    var processed = false; //has the key been processed? ('catch all letters') 

    if (button === '') {
        return;
    }

    if (button == 'BS') {
        //backspace 
        var input = this.inputLine.getValue();
        this.inputLine.setValue(input.slice(0, input.length - 1));
        processed = true;
    }

    if (button == 'CLR') {
        //clear all text from inputLine 
        processed = true;
        this.clearInput();
        this.clearLines();
    }

    if (!processed) {
        //letter
        this.inputLine.setValue(this.inputLine.getValue() + button);
    }
};

//perform a search or load a new dictionary:
target.centerKey = function() {
    this.inputLine.setValue('old center');
    this.bubble("tracelog", "m:doCenter");
};

