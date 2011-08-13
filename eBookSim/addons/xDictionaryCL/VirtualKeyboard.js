//virtual keyboard public object
VirtualKeyboard = new Object();
//public methods:
//VirtualKeyboard.Activate = function(from,kbdView)
//VirtualKeyboard.Deactivate = function()
//
//multiletter acronyms:
//SPC   space (char 32)
//SH    shift (change keyboard layout)

var tmp = function() {
    //such ugly sollution here because of test enviro and reader - temp. solution only
    if (myTrace == undefined) {
        function myTraceDummy(p) { }
        myTrace = myTraceDummy;
    }

    //Keyboard definition object
    //name      Full keyboard name
    //shortName shortcut to be displayed on button
    //def       array with keyboard definition
    //shift     optional array with shifted keyboard definition
    kbdDefinition = function(name, shortName, def, shift) {
        this.Name = name;
        this.ShortName = shortName;
        this.Definition = def;
        this.Enable = true;
        this.Shifted = shift;
    };
    //  private variables
    var _fromObj;                       //user object activating keyboard.
    var _kbdView;                       //visual representation of keyboard
    var _origDrivers;                   //original button drivers
    var _inpBuffer;                     //input buffer
    var _fstDigit;                      //first digit; -1 == there is not 1st digit
    var _kbdList;                       //list of keyboard layouts in use (max. 10)
    var _kbdLayoutList = new Array();   //list of keyboard layouts
    var _actKeyboard;                   //actually active keyboard
    var _actDefinition;                 //actually active keyboard definition (kbdDefinition.Definition or kbdDefinition.Shift)
    var _kbdLineSelector;               //selected line
    var _KeybordSwithLine;              //line of keyboard switcher

    //prepare several keyboards
    _kbdLayoutList.push(new kbdDefinition('Edhanced', 'edh',
    [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
        ['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'],
        ['u', 'v', 'w', 'x', 'y', 'z', 'SPC', '', 'SH', 'aa']
    ],
    [
        ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
        ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'],
        ['U', 'V', 'W', 'X', 'Y', 'Z', 'SPC', '', 'SH', '']
    ]
    ));
    _kbdLayoutList.push(new kbdDefinition('Letters', 'abc', [
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
        ['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'],
        ['u', 'v', 'w', 'x', 'y', 'z', ' ', '', '', '']
    ]));
    _kbdLayoutList.push(new kbdDefinition('Digits', '123', [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    ]));
    _kbdLayoutList.push(new kbdDefinition('9 lines', '9L', [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['a', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    ]));
    _kbdLayoutList.kbdDefault = _kbdLayoutList[0];

    //save original button driver and set new one
    function installDriver(from, name) {
        _origDrivers[name] = from[name];
        from[name] = this['fg_' + name];
    };
    //helper function to transform array index to row/column number
    function arr2ndx(n) {
        return (n + 1) % 10;
    };
    //helper function to transform row/column number to array index
    function ndx2arr(n) {
        if (n == 0) return 9;
        return n - 1;
    };
    //activate keyboard layout
    //kbd       keybord layout to activate
    //bShift    true for 'shifted' layout
    function setKeyboard(kbd, bShift) {
        _actKeyboard = kbd;
        if (bShift && (kbd.Shifted != undefined)) {
            _actDefinition = kbd.Shifted;
        } else {
            _actDefinition = kbd.Definition;
        }
        _kbdView.kbdDoc.KBD_GROUP.kbdTitle.setValue(kbd.Name);
        //set keyboard lines
        for (var line = 0; line < 10; line++) {
            var lineObj = _kbdView.kbdDoc.KBD_GROUP['line' + arr2ndx(line)];
            if (line in _actDefinition) {
                lineObj.show(true);
                setKeyboardLine(lineObj, line + 1, _actDefinition[line]);
                if ((line % 2) == 0) {
                    lineObj.kbdLine.KBD_LINE_GROUP.kbdLineLight.show(true);
                } else {
                    lineObj.kbdLine.KBD_LINE_GROUP.kbdLineDark.show(true);
                }
            } else {
                lineObj.show(false);
            }
        }
        //set language line
        var lngLine = _actDefinition.length;
        _KeybordSwithLine = this.arr2ndx(lngLine);
        var kbdLngLine = _kbdView.kbdDoc.KBD_GROUP['line' + _KeybordSwithLine];
        if ((lngLine % 2) == 0) {
            kbdLngLine.kbdLine.KBD_LINE_GROUP.kbdLineLight.show(true);
        } else {
            kbdLngLine.kbdLine.KBD_LINE_GROUP.kbdLineDark.show(true);
        }
        kbdLngLine.show(true);
        kbdLngLine.kbdLine.KBD_LINE_GROUP.lineName.setValue('0');
        for (var col = 0; col < 10; col++) {
            var colNdx = this.arr2ndx(col);
            var colObj = kbdLngLine.kbdLine.KBD_LINE_GROUP['col' + colNdx];
            if (col in _kbdList) {
                colObj.setValue(_kbdList[col].ShortName);
            } else {
                colObj.setValue('');
            }
        }
        //resize keyboard - why the hell it does not work???
        //        var kbdY, ln0Y, ln0H;
        //        kbdY = _kbdView.getY();
        //        ln0Y = _kbdView.kbdDoc.KBD_GROUP.line1.getY();
        //        ln0H = _kbdView.kbdDoc.KBD_GROUP.line1.getHeight();
        //        _kbdView.changeLayout(100, undefined, 100, 50, 500, undefined);
    };
    //fill one line of keyboard layout
    function setKeyboardLine(line, lineNum, kbdLine) {
        line.kbdLine.KBD_LINE_GROUP.lineName.setValue(lineNum);
        for (var col = 0; col < 10; col++) {
            var colObj = line.kbdLine.KBD_LINE_GROUP['col' + this.arr2ndx(col)];
            colObj.setValue(kbdLine[col]);
        }
    };
    //display updated input box and send feedback to user
    function reportProgress(key, keyTranslated) {
        _kbdView.kbdDoc.KBD_GROUP.input.setValue(_inpBuffer);
        _fromObj.bubble("doKbdProgress", key, keyTranslated, _inpBuffer);
    };
    //process digit button pressed
    function processDigit(digit) {
        var arrNdx = ndx2arr(digit);
        if (_fstDigit == -1) {
            //this is 1st digit
            if (arrNdx == 9) {
                //keyboard switch
                //_kbdView.kbdDoc.KBD_GROUP.stat.setValue('kbdSwitch');
                _fstDigit = 9;
                _kbdLineSelector = _kbdView.kbdDoc.KBD_GROUP['line' + _KeybordSwithLine];
                _kbdLineSelector.kbdLine.KBD_LINE_GROUP.kbdLineSel.show(true);
            } else {
                if (!(arrNdx in _actDefinition)) {
                    //_kbdView.kbdDoc.KBD_GROUP.stat.setValue('too big fstDigit');
                } else {
                    _fstDigit = arrNdx;
                    //_kbdView.kbdDoc.KBD_GROUP.stat.setValue('fstDigit=' + _fstDigit);
                    var lineObj = _kbdView.kbdDoc.KBD_GROUP['line' + digit];
                    _kbdLineSelector = lineObj;
                    _kbdLineSelector.kbdLine.KBD_LINE_GROUP.kbdLineSel.show(true);
                }
            }
        } else {
            if (_fstDigit == 9) {
                //keyboard switch
                var kbd = _kbdList[arrNdx];
                if (kbd != undefined) {
                    setKeyboard(kbd);
                }
            } else {
                var pressed = _actDefinition[_fstDigit][arrNdx];
                var translated = translateKey(pressed);
                _inpBuffer += translated;
                //_kbdView.kbdDoc.KBD_GROUP.stat.setValue('');
                reportProgress(pressed, translated);
            }
            if (_kbdLineSelector != undefined) {
                _kbdLineSelector.kbdLine.KBD_LINE_GROUP.kbdLineSel.show(false);
            }
            _fstDigit = -1;
        }
    };
    //multiletter key translation
    function translateKey(pressed) {
        if (pressed.lenght == 1) return pressed;
        if (pressed == 'SPC') return ' ';
        if (pressed == 'SH') {
            //shift pressed
            setKeyboard(_actKeyboard, _actDefinition == _actKeyboard.Definition);
            return '';
        }
        return pressed;
    }
    //activate keyboard
    //from      user object activating keyboard. I'll hack this object button drivers
    //kbdView   visual representation of keyboard
    VirtualKeyboard.Activate = function(from, kbdView) {
        myTrace('V.Activate');
        _kbdView = kbdView;
        _fromObj = from;
        _kbdView.show(true);
        _inpBuffer = '';
        _kbdView.kbdDoc.KBD_GROUP.input.setValue('');
        _fstDigit = -1;
        _kbdLineSelector = undefined;
        _origDrivers = new Object();
        installDriver(from, 'doCenter');
        installDriver(from, 'doMark');
        installDriver(from, 'doMarkMenu'); //mark-hold
        installDriver(from, 'doMenu');
        installDriver(from, 'doDigit');

        //prepare list of keyboards
        var srcNdx = 0;
        _kbdList = new Array();
        _kbdList.push(_kbdLayoutList.kbdDefault);
        while ((srcNdx < _kbdLayoutList.length) && (_kbdList.length < 10)) {
            if (_kbdLayoutList[srcNdx].Enable && (_kbdLayoutList[srcNdx] != _kbdLayoutList.kbdDefault)) {
                _kbdList.push(_kbdLayoutList[srcNdx]);
            }
            srcNdx++;
        }

        setKeyboard(_kbdLayoutList.kbdDefault);
        myTrace('V.Activate done');
    };
    //unactivate keyboard
    VirtualKeyboard.Deactivate = function() {
        myTrace('V.Deactivate');
        if (_fromObj == undefined) return; //nothing to do
        _kbdView.show(false);

        for (var drv in _origDrivers) {
            if (_origDrivers[drv] == undefined) {
                //there was not driver originally
                delete _fromObj[drv];
            } else {
                _fromObj[drv] = _origDrivers[drv];
            }
        }

        _kbdView = undefined;
        _fromObj = undefined;
        _origDrivers = undefined;
    };
    /////////////////////////////////////////////
    // fg_ functions are called with 'this' == _fromObj!!!

    //Center button pressed
    function fg_doCenter() { //result ready
        this.bubble("doKbdInput", _inpBuffer);
    };
    //Menu button
    function fg_doMenu() { //cancel - switch off keyboard?
        this.bubble("doKbdCancel");
    }
    //Mark button
    function fg_doMarkMenu() {   //clear result
        _inpBuffer = '';
        reportProgress('CLR', undefined);
    };
    //Mark-hold button
    function fg_doMark() {   //BS
        _inpBuffer = _inpBuffer.slice(0, -1);
        reportProgress('BS', undefined);
    };
    //digit button pressed
    function fg_doDigit(part) {
        processDigit(part.key);
    };

};
try {
    tmp();
}
catch (e) {
    //such ugly sollution here because of test enviro
    if (log != undefined) {
        log.error("in VirtualKeyboard.js", e);
    }
    if (myTrace != undefined) {
        myTrace('Error loading VirtualKeyboard.js: ' + e);
    }
}

//    this._kbdDriver.inp.changeLayout(30, undefined, 150, undefined, 100, 30, undefined);
//target.playWithTextEdit = function(e) {
//    var rootWindow = this.getWindow();
//    this.bubble("tracelog", 'rootWindow=' + rootWindow);
//    var te = new FskUI.TextEdit(rootWindow);
//    this.bubble("tracelog", 'te=' + te);
//    this.bubble("tracelog", 'te.setTextFormat=' + te.setTextFormat);
//    var tf = new FskUI.TextFormat;
//    this.bubble("tracelog", 'tf=' + tf);
//    var fo = tf.getFont();
//    this.bubble("tracelog", 'fo=' + fo);
//    var co = tf.getColor();
//    this.bubble("tracelog", 'co=' + co);
//    this.bubble("tracelog", 'size=' + tf.getSize());
//    this.bubble("tracelog", 'style=' + tf.getStyle());
//    this.bubble("tracelog", 'VAl=' + tf.getVAlignment());
//    this.bubble("tracelog", 'HAl=' + tf.getHAlignment());
//    te.setTextFormat(tf);
//    var bounds = new Object();
//    bounds.x = 100;
//    bounds.y = 100;
//    bounds.width = 100;
//    bounds.height = 30;
//    te.setBounds(bounds);
//    te.insert('pokus');
//    rootWindow.beginDrawing();
//    te.draw(false);
//    rootWindow.endDrawing();
//    this.te = te;
//};
