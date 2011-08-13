//function keyHandler(origFn) {
//    this.origFn = origFn;
//}

var kbdList = Array();
kbdDefinition = function(name, shortName, def) {
    this.Name = name;
    this.ShortName = shortName;
    this.Definition = def;
};
kbdList.push(new kbdDefinition('Simple','smpl', [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
    ['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'],
    ['u', 'v', 'w', 'x', 'y', 'z', ' ', 'h1', 'i1', 'CLR']
]));
kbdList.push(new kbdDefinition('Letters','abc', [
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
    ['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'],
    ['u', 'v', 'w', 'x', 'y', 'z', ' ', 'h1', 'i1', 'CLR']
]));
kbdList.push(new kbdDefinition('Digits','123', [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
]));
kbdList.kbdDefault=kbdList[0];
kbdLanguages = ['smpl', 'num', '', '', '', '', '', '', '', '', ''];

target.kbdActivateImpl = function(from, bActive) {
    this.bubble("tracelog", "kbdActivateImpl:" + bActive);
    if (bActive == this.bActive) return;    //nothing to do
    this.bActive = bActive;
    if (bActive) {
        this.orig_from = from;
        from._kbdDriver = this;
        this.orig_drivers = new Object();
        this.installDriver(from, 'doCenter');
        this.installDriver(from, 'doMark');
        this.installDriver(from, 'doMarkMenu'); //mark-hold
        this.installDriver(from, 'doMenu');
        this.installDriver(from, 'doDigit');
        this.buffer = '';
        this.input.setValue('');
        this.fstDigit = -1;
        this.setKeyboard(kbdList.kbdDefault);
    } else {
        if (!('orig_from' in this)) throw "Keyboard was not active";
        for (drv in this.orig_drivers) {
            if (this.orig_drivers[drv] == undefined) {
                //there was not driver originally
                delete this.orig_from[drv];
            } else {
                this.orig_from[drv] = this.orig_drivers[drv];
            }
        }
        delete this.orig_from._kbdDriver;
        delete this.orig_drivers;
        delete this.orig_from;
    }
    this.bubble('kbdShow', bActive);
    this.bubble("tracelog", 'kbdActivateImpl done');
};
target.setKeyboard = function(kbd) {
    this.actKeyboard = kbd;
    for (var line = 0; line < 10; line++) {
        var lineObj = this['line' + this.arr2ndx(line)];
        if (line in kbd.Definition) {
            lineObj.show(true);
            this.setKeyboardLine(lineObj, line + 1, kbd.Definition[line]);
        } else {
            lineObj.show(false);
        }
    }
    var lngLine = kbd.Definition.length;
    var kbdLngLine = this['line' + this.arr2ndx(lngLine)];
    kbdLngLine.show(true);
    kbdLngLine.kbdLine.KBD_LINE_GROUP.lineName.setValue('0');
    for (var col = 0; col < 10; col++) {
        var colNdx = this.arr2ndx(col);
        var colObj = kbdLngLine.kbdLine.KBD_LINE_GROUP['col' + colNdx];
        if (col in kbdList) {
            colObj.setText(kbdList[col].ShortName);
            colObj.kbdLangDef = kbdList[col];
        } else {
            colObj.setText('');
            delete colObj.kbdLangDef;
        }
    }
}
target.setKeyboardLine = function(line, lineNum, kbdLine) {
    line.kbdLine.KBD_LINE_GROUP.lineName.setValue(lineNum);
    for (var col = 0; col < 10; col++) {
        var colObj = line.kbdLine.KBD_LINE_GROUP['col' + this.arr2ndx(col)];
        colObj.setText(kbdLine[col]);
    }
}
target.arr2ndx = function(n) {
    return (n + 1) % 10;
}
target.ndx2arr = function(n) {
    if (n == 0) return 9;
    return n - 1;
}
target.installDriver = function(from, name) {
    this.orig_drivers[name] = from[name];
    from[name] = this['_' + name];
}

target.testFn = function() {
this.makeDump(x1, '', 2);
};
target.makeDump = function(obj, pfx, dpns) {
    this.bubble("tracelog", pfx);
    for (var p in obj) {
        this.bubble("tracelog", pfx + '.' + p + " => " + obj[p]);
        if (dpns > 1) this.makeDump(obj[p], pfx + '.' + p, dpns - 1);
    }
};
target._doCenter = function() { //result ready
    this.bubble("doKbdInput", this._kbdDriver.buffer);
}
target._doMenu = function() { //cancel - switch off keyboard?
    this.bubble("doKbdCancel");
}
target._doMarkMenu = function() {   //clear result
    this._kbdDriver.buffer = '';
    this._kbdDriver.reportProgress('CLR', undefined);
};
target._doMark = function() {   //BS
    this._kbdDriver.buffer = this._kbdDriver.buffer.slice(0,-1);
    this._kbdDriver.reportProgress('BS', undefined);
};
target._doDigit = function(part) {
    this.bubble("tracelog", "k+:doDigit=" + part.key);
    this._kbdDriver.processDigit(part.key);
    //this._kbdDriver.inp.setValue(this._kbdDriver.buffer);
//    this.bubble("tracelog", "k-:doDigit");
};
target.processDigit = function(digit) {
    var arrNdx = this.ndx2arr(digit);
    if (this.fstDigit == -1) {
        //this is 1st digit
        if (arrNdx == 9) {
            //keyboard switch
            this.stat.setValue('kbdSwitch');
            this.fstDigit = 9;
        } else {
            if (!(arrNdx in this.actKeyboard.Definition)) {
                this.stat.setValue('too big fstDigit');
            } else {
                this.fstDigit = arrNdx;
                this.stat.setValue('fstDigit=' + this.fstDigit);
            }
        }
    } else {
        if (this.fstDigit == 9) {
            //keyboard switch
            var kbd = kbdList[arrNdx];
            if (kbd != undefined) {
                this.setKeyboard(kbd);
            }
        } else {
            var pressed = this.actKeyboard.Definition[this.fstDigit][arrNdx];
            this.buffer += pressed;
            this.stat.setValue('');
            this.reportProgress(pressed, pressed);
        }
        this.fstDigit = -1;
    }
};
target.reportProgress = function(key, keyTranslated) {
    this.input.setValue(this.buffer);
    this.bubble("doKbdProgress", key, keyTranslated, this.buffer);
};
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
