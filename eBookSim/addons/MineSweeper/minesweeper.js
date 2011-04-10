// Minesweeper
// written in JavaScript
// Based on version written 1997..2004 by D. Shep Poor
// sheppoor@dataexperts.com
// Original on which this game is based
// Copyright (c) 1981-1995 Microsoft Corp. // beware of the (c) sign!!

// History:
//	2011-04-10 Mark Nord:	initially adopted to FSK for use with Sony PRS


var tmp = function () {
	
	var newEvent = prsp.compile("param", "return new Event(param)");
	
	var hasNumericButtons = kbook.autoRunRoot.hasNumericButtons;
	var getSoValue = kbook.autoRunRoot.getSoValue;
	
	target.init = function () {
		/* set translated appTitle and appIcon */
		this.appTitle.setValue(kbook.autoRunRoot._title);
		this.appIcon.u = kbook.autoRunRoot._icon;
	};
	
	
	target.ExitQuit = function () {
		var ev, func, menuBar;
		ev = newEvent(2048);
		menuBar = this.findContent("MENUBAR"); // menuBar had to be defined as id="MENUBAR" in XML!!
		// this.bubble("tracelog","findContent= "+menuBar);
		func = getSoValue(menuBar,"endLoop");
		// this.bubble("tracelog","endLoop= "+func);
		func.call(menuBar,ev);
		kbook.autoRunRoot.exitIf(kbook.model);
	};
	
};
try {
  tmp();
} catch(e) {target.bubble('tracelog','error in minesweeper.js');}
tmp = undefined;
