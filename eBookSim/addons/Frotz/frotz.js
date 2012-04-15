//
// Frotz for Sony Reader
// by Ben Chenoweth
//
// Initial version: 2012-01-22
// Changelog:

var tmp = function () {
	
	var hasNumericButtons = kbook.autoRunRoot.hasNumericButtons;
	var getSoValue = kbook.autoRunRoot.getSoValue;
	var setSoValue = kbook.autoRunRoot.setSoValue;
	var getFileContent = kbook.autoRunRoot.getFileContent;
	var startsWith = kbook.autoRunRoot.startsWith;
	var listFiles = kbook.autoRunRoot.listFiles;
	
	var datPath = kbook.autoRunRoot.gamesSavePath+'Frotz/';
	FileSystem.ensureDirectory(datPath);
	//var tempPath = "/tmp/frotz/";
	//FileSystem.ensureDirectory(tempPath);

	var mouseLeave = getSoValue( target.key20,'mouseLeave');
	var mouseEnter = getSoValue( target.key20,'mouseEnter');
	var shifted = false;
	var shiftOffset = 34;
	var symbols = false;
	var symbolsOffset = 68;
	var keys = new Array(136);
	var strShift = "\u2191"; //up arrow
	var strUnShift = "\u2193"; //down arrow
	var strBack = "\u2190"; //left arrow
	var curSel, prevSel, lastSel;
	var keyBoardStartsAt = 10;	
	var lowestKey = 10;

	var tempOutput = "";
	
	var pageScroll;
	var strUp = "\u2191";
	var strDown = "\u2193";
	var previousCommands = [];
	var previousCommandNum = 0;
	
	var isSelectChar, setPopupChar;
	var isPopUp = false;
	var maxPopUpChar = 0;

	var twoDigits = function (i) {
		if (i<10) {return "0"+i}
		return i;	
	}

	target.loadKeyboard = function () {
//	this.bubble("tracelog","loadKeyboard..");
		keys=[	"q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
			"a", "s", "d", "f", "g", "h", "j", "k", "l", "OK",
			" ", "z", "x", "c", "v", "b", "n", "m", " ", " ",
			" ", "/", " ", "-",

			"Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
			"A", "S", "D", "F", "G", "H", "J", "K", "L", "OK",
			"",  "Z", "X", "C", "V", "B", "N", "M", " ", " ",
			" ", "\\", " ", ">",

			"1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
			"%", "&", "*", "(", ")", "_", "+", ";", ":", "OK",
			"",  "!", "?", "\"", "\'", ",", ".", "/", " ", " ",
			" ", "/", " ", "-",

			"~", "@", "#", "$",  "^", "-", "`", "=", "{", "}",
			"\u00AC", "\u00A3", "\u20AC", "\u00A7", "\u00A6", "[", "]", "|","\\","OK", 
			"","\u00B2","\u00B0","\u00B5", "\u00AB", "\u00BB", "<", ">", " "," ",
			" ", "\\", " ", ">"]; 
		// put keys on buttons
		this.refreshKeys();
		// highlight OK button for nonTouch
		if (hasNumericButtons) {
			prevSel = curSel = 25;
			target.ntHandleEvents();
		} 
		return;
	};
	
	target.init = function () {
	//	this.bubble("tracelog","initialising...");
		this.appTitle.setValue(kbook.autoRunRoot._title);
		this.appIcon.u = kbook.autoRunRoot._icon;
		try {
			pageScroll = getSoValue(this.frotzText, 'scrollPage');
		} catch (ignore) { }
		this.loadKeyboard();
		previousCommands.push(""); // start previous commands list with a blank entry
		if (hasNumericButtons) {
			this.touchLabel1.show(false);
			this.frotzScroll.show(false);
		} else {
			this.nonTouch1.show(false);
		}
		this.POPUP.show(false);
		this.enable(true); // needed for the SIM only
	};

	target.setOutput = function (output) {
		this.frotzText.setValue(output);
		try {
			pageScroll.call(this.frotzText, true, 1);
		}
		catch (ignore) { }
	};
	

	
	target.doQuit = function (sender) {
		kbook.autoRunRoot.exitIf(kbook.model);
		return;
	};
	
	target.doHold1 = function () {
		this.digitF(-1);
	};
	target.doHold2 = function () {
		this.digitF(-2);
	};	
	target.doHold3 = function () {
		this.digitF(-3);
	};
	target.doHold4 = function () {
		this.digitF(-4);
	};
	target.doHold5 = function () {
		this.digitF(-5);
	};
	target.doHold6 = function () {
		this.digitF(-6);
	};
	target.doHold7 = function () {
		this.digitF(-7);
	};
	target.doHold8 = function () {
		this.digitF(-8);
	};
	target.doHold9 = function () {
		this.digitF(-9);
	};
	target.doHold0 = function () {
		this.digitF(-10);
	};

	target.doOK = function () {
		var currentLine = target.getVariable("current_line");
		
		// add currentLine to output
		tempOutput = tempOutput + currentLine + "\n";
		this.setOutput(tempOutput);

		// add command to previousCommands array
		if (currentLine !== "") {
			previousCommands.push(currentLine);
		}
		previousCommandNum = 0;
			
		// clear currentLine
		currentLine = "";
		target.currentText.setValue(currentLine);
		target.setVariable("current_line",currentLine);
		return;
	};
	
	target.refreshKeys = function () {
		var i,n,key;
		n = -1;
	//	this.bubble("tracelog","refreshKeys...");
		if (shifted) {
			n = n + shiftOffset;
		//	setSoValue(target.key21, 'text', strUnShift);
			target.key31.setText(strUnShift);
		} else {
		//	setSoValue(target.key21, 'text', strShift);
			target.key31.setText(strShift);
		}
		if (symbols) {
			n = n + symbolsOffset;
		//	setSoValue(target.key31, 'text', "Abc");
			target.key41.setText("Abc");
		} else {
		//	setSoValue(target.key31, 'text', "Symbols");
			target.key41.setText("Sym");
		}	
		for (i=1; i<= shiftOffset; i++) {
			if ((i === 21) || (i === 31)) {
			} else {
				key = 'key'+twoDigits(i+keyBoardStartsAt);
				target[key].setText(keys[n+i]);
			}
		//	this.bubble("tracelog","key: "+key);
		//	mouseEnter.call(target[key]);			
		//	mouseLeave.call(target[key]);
		}	

		target.key43.setText("");
		target.key40.setText(strBack);
	//	this.bubble("tracelog","refreshKeys done...");
	};

	target.doSpace = function () {
		// ADD A SPACE
		var currentLine = target.getVariable("current_line");
		currentLine = currentLine + " ";
		target.currentText.setValue(currentLine);
		target.setVariable("current_line",currentLine);
	};

	target.doSymbol = function () {
		symbols = !symbols;
		this.refreshKeys();
	};

	target.doShift = function () {
		shifted = !shifted;
		this.refreshKeys();
	};	
	
	target.doBack = function () {
		// BACKSPACE
		var currentLine = target.getVariable("current_line");
		currentLine = currentLine.slice(0,currentLine.length-1);
		target.currentText.setValue(currentLine);
		target.setVariable("current_line",currentLine);
	};
	
	target.doKeyPress = function (sender) {
	//	var id = getSoValue(sender, "id");
		this.addCharacter(getSoValue(sender, "text"));
		return;
	};
	
	target.addCharacter = function (character) {
	/*	var n = parseInt(id.substring(3, 5));
		if (symbols) { n = n + symbolsOffset };
		if (shifted) { n = n + shiftOffset };
		var character = keys[n-1]; */
		var currentLine = target.getVariable("current_line");
		currentLine = currentLine + character;
		target.currentText.setValue(currentLine);
		target.setVariable("current_line",currentLine);		
	};

	target.ntHandleEvents = function () {
		var t;
		t = isPopUp ? target.POPUP : target;
	//	this.bubble("tracelog","curSel: " + curSel);
		mouseLeave.call(t["key"+twoDigits(prevSel)]);	
		mouseEnter.call(t["key"+twoDigits(curSel)]);	
		prevSel = curSel;
	};

	target.digitF = function (key) {
		var row, i, c, t;
		if ((key<0) && !isPopUp) {	// holdaction
			key = key == -10 ? key = 0 : key *= -1;
			row = Math.floor((curSel-1)/10);		
		//	this.bubble("tracelog","row: " + row);
			curSel = lastSel = row*10+key;
			c = getSoValue(target['key'+lastSel], "text");
			this.ntHandleEvents();
			maxPopUpChar = setPopupChar(c, this.POPUP);
			if (maxPopUpChar > 0) {
				isPopUp = true;
				this.POPUP.show(isPopUp);
				for ( i = 0; i<10; i++) {
					this.POPUP['key'+(51+i)].show(i < maxPopUpChar);
				curSel = prevSel = 51;
				this.ntHandleEvents();
				}
			} 
		} else {
			if (isPopUp) {
			//	this.bubble("tracelog","key" + key);
				key = key == -10 ? key = 60 : Math.abs(key)+50;
			//	this.bubble("tracelog","key" + key);
				if (key <= 50+maxPopUpChar) {
					target.POPUP["key"+twoDigits(key)].click();
				}
				curSel = prevSel = lastSel;	
				isPopUp = false;
				this.POPUP.show(isPopUp);
			} else {	// normal action
				key = key == 0 ? key +=10 : key;
			//	this.bubble("tracelog","doDigit" + key);
				row = Math.floor((curSel-1)/10);		
			//	this.bubble("tracelog","row: " + row);
				curSel= row*10+key;
				this.ntHandleEvents();
				target["key"+twoDigits(curSel)].click();
			}
		}
	};


	target.moveCursor = function (direction) {
	//	target.bubble("tracelog","moveCursor: "+direction);		
		switch (direction) {
			case "up" : if (!isPopUp) {
					switch (curSel) {
						case 43 : curSel = 35;	break;	
						case 44 : curSel = 39;	break;	
						case 45 : curSel = 40;	break;	
						default : curSel -= 10;		
					}
				}
				break;
			case "down" :  if (!isPopUp) {
					switch (curSel) {
						case lowestKey: curSel = 15; break;				
						case 31:
						case 32: curSel = 41; break;
						case 33: curSel = 42; break;
						case 34:
						case 35:
						case 36:
						case 37: 
						case 38: curSel = 43; break;
						case 39: curSel = 44; break;
						case 40: curSel = 45; break;	
						default: curSel += 10;
					}
				}
				break;
			case "left" :	if (curSel%10 !== 1) {
						curSel -= 1; }				
					break;
			case "right" :	if ((curSel%10 !==0) && (curSel !==45) && (curSel < 50+maxPopUpChar)) {
						curSel += 1; }			
					break;
		} 
		if (!isPopUp)  {
			if (curSel > 45) { 
				curSel -= 10; }
			if (curSel < lowestKey)  { 
				curSel = lowestKey; } 
		}
		this.ntHandleEvents(); 
	};

	target.doHoldCenterF = function () {
		var i;
	//	this.bubble("tracelog","curSel " + curSel%10 * -1 );
		i = curSel%10;
		i = i === 0 ? -10 : i *-1; 
		this.digitF(i);
	};
	
	target.doCenterF = function () {
		this.digitF(curSel%10);
	}; 

	/* next two functions copy 'n past from 650th kbook.so */
	isSelectChar = function (key) {
		var nRet, i;
		var selChar = ['A', 'a', 'C', 'c', 'D', 'd', 'E', 'e', 'I', 'i', 'N', 'n', 'O', 'o', 'S', 's', 'U', 'u', 'Y', 'y', 'Z', 'z', '!', '?', ''];
		nRet = 255;
		i = 0;
		while (selChar[i] !== '') {
			if (key === selChar[i]) {
				nRet = i;
				break;
			} else {
				i++;
			}
		}
		return nRet;
	};
	
	setPopupChar = function (text, popup) {
		var selCharGroup = [
			['A', '192', '193', '194', '195', '196', '197', '198', '0', '0', 8],
			['a', '224', '225', '226', '227', '228', '229', '230', '0', '0', 8],
			['C', '199', '0', '0', '0', '0', '0', '0', '0', '0', 2],
			['c', '231', '0', '0', '0', '0', '0', '0', '0', '0', 2],
			['D', '208', '0', '0', '0', '0', '0', '0', '0', '0', 2],
			['d', '240', '0', '0', '0', '0', '0', '0', '0', '0', 2],
			['E', '200', '201', '202', '203', '0', '0', '0', '0', '0', 5],
			['e', '232', '233', '234', '235', '0', '0', '0', '0', '0', 5],
			['I', '204', '205', '206', '207', '0', '0', '0', '0', '0', 5],
			['i', '236', '237', '238', '239', '0', '0', '0', '0', '0', 5],
			['N', '209', '0', '0', '0', '0', '0', '0', '0', '0', 2],
			['n', '241', '0', '0', '0', '0', '0', '0', '0', '0', 2],
			['O', '210', '211', '212', '213', '214', '216', '338', '0', '0', 8],
			['o', '242', '243', '244', '245', '246', '248', '339', '0', '0', 8],
			['S', '352', '0', '0', '0', '0', '0', '0',  '0', '0',2],
			['s', '353', '223', '0', '0', '0', '0', '0', '0', '0', 3],
			['U', '217', '218', '219', '220', '0', '0', '0', '0', '0', 5],
			['u', '249', '250', '251', '252', '0', '0', '0', '0', '0', 5],
			['Y', '221', '376', '0', '0', '0', '0', '0', '0', '0', 3],
			['y', '253', '255', '0', '0', '0', '0', '0', 3],
			['Z', '381', '0', '0', '0', '0', '0', '0', '0', '0', 2],
			['z', '382', '0', '0', '0', '0', '0', '0', '0', '0', 2],
			['!', '161', '0', '0', '0', '0', '0', '0', '0', '0', 2],
			['?', '191', '0', '0', '0', '0', '0', '0', '0', '0', 2],
			['', 0, '0', '0', '0', '0', '0', '0', '0', '0', 0]
		];
		var i = 0;
		while (selCharGroup[i][0] !== '') {
			if (selCharGroup[i][0] === text) {
				// target.bubble('tracelog',_Core.debug.dumpToString(popup,'popup.',3));
				popup.key51.setText(selCharGroup[i][0]);
				popup.key52.setText(String.fromCharCode(selCharGroup[i][1]));
				popup.key53.setText(String.fromCharCode(selCharGroup[i][2]));
				popup.key54.setText(String.fromCharCode(selCharGroup[i][3]));
				popup.key55.setText(String.fromCharCode(selCharGroup[i][4]));
				popup.key56.setText(String.fromCharCode(selCharGroup[i][5]));
				popup.key57.setText(String.fromCharCode(selCharGroup[i][6]));
				popup.key58.setText(String.fromCharCode(selCharGroup[i][7]));
				popup.key59.setText(String.fromCharCode(selCharGroup[i][8]));
				popup.key60.setText(String.fromCharCode(selCharGroup[i][9]));
				break;
			} else {
				i++;
			}
		}
		//	target.bubble('tracelog','exit selCharGroup i='+i);
		return selCharGroup[i][10];
	};

};
tmp();
tmp = undefined;