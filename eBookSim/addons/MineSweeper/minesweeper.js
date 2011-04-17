// Minesweeper
// written in JavaScript
// Based on version written 1997..2004 by D. Shep Poor
// sheppoor@dataexperts.com
// Original on which this game is based
// Copyright (c) 1981-1995 Microsoft Corp. // beware of the (c) sign!!

// History:
//	2011-04-10 Mark Nord:	initially adopted to FSK for use with Sony PRS


var tmp = function () {
	var uD;
	var gridTop = 126;
	var gridLeft;
	var newEvent = prsp.compile("param", "return new Event(param)");
	
	var hasNumericButtons = kbook.autoRunRoot.hasNumericButtons;
	var getSoValue = kbook.autoRunRoot.getSoValue;
	var getFileContent = kbook.autoRunRoot.getFileContent;
	var fnPageScroll = getSoValue(target.helpText, 'scrollPage');
	var clickMode = 0;

      //
      // Variable and document setup stuff:
      //
      
         var maxX ,maxY, maxNumBombs, maxLegalBombs, l, maxCells, cellArray, clockStartTime;
      
         // setCookie("gameFormat",gameFormat);
	 var gameFormat = "Beginner"; //"Intermediate";
      
         /*/ Read the other param vars set by the intro page
         // Note how the double negative will force missing to default to true
         useQuestionMarks = ! (getCookie("useQuestionMarks") == 'false');
         useMacroOpen = ! (getCookie("useMacroOpen") == 'false');
         useFirstClickUseful = ! (getCookie("useFirstClickUseful") == 'false');
         openRemaining = (getCookie("openRemaining") == 'true'); */
         var useQuestionMarks = true;
         var useMacroOpen = true;
         var useFirstClickUseful = true;
         var openRemaining = false;
         var showNumMoves = false;
         
         // Set global constants   
        
         var topImages = 19;                        // 7 on game menu, 8 on opt menu, 3 bomb #s, smile face, 3 time #s
         var maxStackHeight = 300;                 // For recursive cell opening stack
         var smileMargin=((maxX+1)*32-(26*6+52))/2;// To center smile & rt jstfy time
      
         // Global Arrays (created once)
         var markedArray = new Array(maxStackHeight); // For recursive cell opening stack
         
         // Variables used & reset during play
         var dead = false;                         // Hit a bomb?
         var win = false;                          // All cells open?
         var bombsFlagged = 0;                     // How many bombs marked so far?
         var cellsOpen = 0;                        // How many cells open so far?
         var markedCount = -1;                     // For recursive cell opening stack
         var highestStackHeight = -1;              // For recursive cell opening stack
         var pointingAtX = -1;                     // Current cell being pointed at.
         var pointingAtY = -1;                     // Used for space bar bomb flagging
         var numMoves = 0;                         // Count the number of clicks
         var openRemainingUsed = false;            // Was openRemaining used by the player?
         var lastClickOnMenu = false;              // Used to control smooth menu closing
      
         // Vars for the clock time
         var clockMoving  = false;                 // Is it moving?
         var clockActive  = false;                 // Should it be moving?
         var killLastClock= false;                 // To start new time w/ old still running
         var clockCurrent = -1;                    // Current time
      
         // define images: the many faces of bombs and bomb markers
         var bombFlagged = 11;
         var bombRevealed = 14;
         var bombMisFlagged = 12;
         var bombDeath = 10;
         var bombQuestion = 13;
         var blankCell = 9;
      
         // define images: the 3 faces 
         var faceDead = 4;
         var faceSmile = 0;
         var faceWin = 1;
         var faceWait = 5;
         var faceOoh = 3;
         var facePirate = 2;	
         
         // load helptext and hide instructions once 
	target.helpText.setValue(getFileContent(target.mineSweeperRoot.concat('MineSweeper_Help_EN.txt'),'help.txt missing')); 
	target.helpText.show(false);
	var displayHelp = false; 
         
         
	target.init = function () {
	var i,j;
	var maxSquares = 367; // 16*23-1
	
		/* set translated appTitle and appIcon */
		this.appTitle.setValue(kbook.autoRunRoot._title);
		this.appIcon.u = kbook.autoRunRoot._icon;

                 // Read in the board dimensions settings 
                 // to get started with just set it to "Beginner"
                               
                 // Set additional params based on cookies or size defaults.
                 // Roll-your-own (custom)
                 if (gameFormat == "Custom") {
                    maxX = parseInt(getCookie("maxX"));
                    maxY = parseInt(getCookie("maxY"));
                    maxNumBombs = parseInt(getCookie("maxNumBombs")); }
                 // Intermediate
                 else { if (gameFormat == "Intermediate") {
                    maxX = 15;
                    maxY = 15;
                    maxNumBombs = 40; }
                 // Expert
                 else { if (gameFormat == "Expert") {
                    maxX = 15;
                    maxY = 22;
                    maxNumBombs = 77; }
                 // Beginner (also the default)
                 else { 
                    maxX = 7;
                    maxY = 7;
                    maxNumBombs = 10; // 10 when not testing
                    gameFormat = "Beginner"; } } }
                    
                 // This pre-calc just makes the next "if" easier to handle.
                 maxLegalBombs = Math.round((maxX+1)*(maxY+1) / 3)  // Max 1/3 of all cells
              
                 // Make sure all values are numbers and are within range
                 if ((isNaN(maxX)) || (maxX<7) || (maxX>31) || (isNaN(maxY)) || (maxY<7) || (maxY>24) ||
                    (isNaN(maxNumBombs)) || (maxNumBombs<1) || (maxNumBombs>maxLegalBombs)) {
                 //Not in range: Fancy alert screen
                 //alert("Minesweeper dimensions invalid:\n\tWidth: From 8 to 32\n\tHeight: from 8 to 24\n\tBoms: 1 to 1/3 of squares"); 
                    maxX = 7;
                    maxY = 7;
                    maxNumBombs = 10;
                    gameFormat = "Beginner"; }
        
              	 maxCells = (maxX+1)*(maxY+1)-1;       // Constant: # of cells on board
        	 cellArray = new Array(maxCells);      // One per cell on the board
                 for (l=0; l<=maxCells; l++) {
                    cellArray[l]=new constructCell()}	
		
		// check MenuOptions
 		 var menuBar = this.findContent("MENUBAR"); // menuBar had to be defined as id="MENUBAR" in XML!!
		//	this.bubble("tracelog","MENUBAR1 "+menuBar); // debug
		 var menus = getSoValue(menuBar,"menus");
		//	this.bubble("tracelog","menus "+menus); // debug
		 var items = getSoValue(menus[0],"items");	// Game-Menu
		//	this.bubble("tracelog","items "+items); // debug
        		for (var i = 2; i < 6; i++) { 
        		  switch (i) {
        			case 2:
        			{	items[i].check(gameFormat == "Beginner"); 
        				break;
        				}
        			case 3:
        			{	items[i].check (gameFormat == "Intermediate"); 
        				break;
        				}
        			case 4:
 	    			{	items[i].check(gameFormat == "Expert"); 
        				break;
        				}			
        			case 5:
        			{	items[i].check(gameFormat == "Custom"); 
        				break;
        				}
        		  } 		
        		}  
		updateOptMenu();

		this.btn_hint_prev_next.setValue('Change Mode step/flag');
		
	//	target.bubble('tracelog','height='+(getSoValue(this,'height')>900));
	//	target.bubble('tracelog','maxX= '+maxX);
	//	target.bubble('tracelog','maxY= '+maxY);

		// resize frame dynamical 
		gridLeft = 300-(maxX+1)*32/2;
	//	target.bubble('tracelog','gridLeft= '+gridLeft);
		this.frame1.changeLayout(gridLeft-21, 21+21+(maxX+1)*32, uD,  30, 85,uD);
		this.frame2.changeLayout(gridLeft-21, 21+21+(maxX+1)*32, uD, 105, 21+21+(maxY+1)*32, uD);

		// fill grid
        	   for (i=0; i<=maxX; i++) {
                    for (j=0; j<=maxY; j++) {
		//	target.bubble('tracelog','sq= '+'sq'+imageIndexOf(i,j)+' X= '+i+' Y='+j);                    
                        this['sq'+imageIndexOf(i,j)].changeLayout(gridLeft+i*32,32,uD,gridTop + j*32,32,uD);
                        this['sq'+imageIndexOf(i,j)].u = 9;
                       }} 
                // hide unuses squares       
                 for (i=(maxX+1)*(maxY+1); i<=maxSquares; i++) { 
                       this['sq'+pad(i,3)].changeLayout(0,0,uD,0,0,uD);
                 }      
		faceClick_first()
	};
	
	
	target.exitQuit = function () {
		var ev, func, menuBar;
		ev = newEvent(2048);
		menuBar = this.findContent("MENUBAR"); // menuBar had to be defined as id="MENUBAR" in XML!!
		func = getSoValue(menuBar,"endLoop");
		func.call(menuBar,ev);
		kbook.autoRunRoot.exitIf(kbook.model);
	};

	var updateScreen = function() {
		FskUI.Window.update.call(kbook.model.container.getWindow());
	};

	// just for debugging purposes
	target.doGridClick = function (sender) {
		var id, sq, u, v;
		var e = {button :1};
		id = getSoValue(sender,"id");
		sq = id.substring(2,5);
	//	u = getSoValue(sender,"u");
	//	v = getSoValue(sender,"v");
	//		this.bubble("tracelog","id= "+id); // debug
	//		this.bubble("tracelog","X= "+xFromID(x)); // debug
 	//		this.bubble("tracelog","Y= "+yFromID(x)); // debug
		e.button = (clickMode == 0) ? 1 : 2;
		cellClick(xFromID(sq),yFromID(sq),e);
		ticClock();	
		//	this.bubble("tracelog","sq#= "+x); // debug
		//	this.bubble("tracelog","u= "+u);
		//	this.bubble("tracelog","v= "+v);	  	
	};
	
	target.changeClickMode = function (sender) { 
	var msg;
		clickMode = Math.abs(clickMode-1);
		msg = (clickMode == 0) ? "MODE: step" : "MODE: flag";
	//	this.bubble("tracelog","clickMode= "+clickMode); // debug
		target.Touch.mode.setValue(msg);
	//	this.bubble("tracelog","clickMode= "+clickMode); // debug
	};


	target.showHelp = function (sender) {
		displayHelp = !displayHelp;
		this.closeHelpText.enable(displayHelp);
		this.closeHelpText.show(displayHelp);
		this.helpText.show(displayHelp);
		if (displayHelp) {
		 this.doNext = function () {this.helpTextPgDwn()};
		 this.doPrevious = function () {this.helpTextPgUp()};
		 this.btn_hint_prev_next.setValue('Scroll Help');		 
		} else {
 		 this.doNext = function () {this.changeClickMode()};
		 this.doPrevious = function() {this.changeClickMode()};
		 this.btn_hint_prev_next.setValue('Change Mode step/flag');
		} 
	}; 

	target.toggleClockMove = function (sender) {
		showNumMoves = !showNumMoves;
		updateClock();	
	}; 
	
	target.helpTextPgDwn = function (){
		this.bubble("tracelog","before PgDwn"); // debug
		fnPageScroll.call(this.helpText, true, 1);
		this.bubble("tracelog","after PgDwn"); // debug
	}	

	target.helpTextPgUp = function (){
		fnPageScroll.call(this.helpText, true, -1);
	}	
	
	// menu exist in the scope of DOCUMENT !! 
	target.container.container.selectLevel = function(sender) {
		var x = getSoValue(sender,"index");
	//	this.bubble('tracelog','sender.index= '+x);
		switch (x) {
			case 2:
			{	gameFormat = "Beginner"; 
				break;
				}
			case 3:
			{	gameFormat = "Intermediate"; 
				break;
				}
			case 4:
			{	gameFormat = "Expert"; 
				break;
				}			
			case 5:
			{	gameFormat = "Custom"; 
				break;
				}
		}		
		target.init();
	};
	
	var updateOptMenu = function (){
      		var menuBar, menus, items;
      		var menuBar = target.findContent("MENUBAR"); // menuBar had to be defined as id="MENUBAR" in XML!!
	//	this.bubble("tracelog","MENUBAR1 "+menuBar); // debug
		var menus = getSoValue(menuBar,"menus");
      		items = getSoValue(menus[1],"items");	// Options-Menu
      		items[0].check(useFirstClickUseful);
  		items[1].check(useQuestionMarks); 
          	items[2].check(useMacroOpen); 
      		items[3].check(openRemaining); 
	}

	target.container.container.changeOption = function(sender) {
		var x = getSoValue(sender,"index");
	//	this.bubble('tracelog','sender.index= '+x);
		switch (x) {
			case 0:
			{	useFirstClickUseful = !useFirstClickUseful; 
				break;
				}
			case 1:
			{	useQuestionMarks = !useQuestionMarks; 
				break;
				}
			case 2:
			{	useMacroOpen = !useMacroOpen; 
				sender.check(true);
				break;
				}			
			case 3:
			{	openRemaining = !openRemaining; 
				break;
				}
		}		
		updateOptMenu();
	};
	// checks for 900/950 screensize
	target.container.container.is950 = function(sender) {
		return getSoValue(target,'height') > 900;
	};	
	
	
// get X form id	
var xFromID = function (id) {	
	return id % (maxX+1);
}

// get Y form id	
var yFromID = function (id) {	
	return Math.floor(id / (maxX+1));
}
	
// add leading Zeros	
var pad = function (number, length) {
   
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
   
    return str;

}


// Creates the internal cells (as opposed to the image cells).  Called once
// per cell upon creation of the window (see above).
var constructCell = function() {
   this.isBomb = false;         // Is the cell a bomb?
   this.isExposed = false;      // Is it open?
   this.isFlagged = false;      // Does it have a bomb flag on it?
   this.isQuestion = false;     // Question mark (if its used)
   this.isMarked = false;       // Used for recursive macro opening
   this.neighborBombs = 0; }    // # surrounding bombs.  Set for all cells.

//
// General-purpose routines called from throughout the game
//


// Returns the index of the internal playing board cellArray at given
// x,y coords (on 0..n-1 scale).  Very useful fn.
var arrayIndexOf = function(x,y) {
   return x+y*(maxX+1); }


// Returns the index of the documents image pointing to cell at given
// x,y coords (on 0..n-1 scale).  Very useful fn.
// Notes: topImages are the 3 bomb digits, the face, & the 3 time digits.
//        Uses maxX+2 (not maxX+1) to include borderRight images.
var imageIndexOf = function(x,y) {	
	return pad(x + y * (maxX+1),3); }
//   return x+(y+2)*(maxX+3)+topImages+3; } // This is the simplified version
// return x+y*(maxX+2)+topImages+(maxX+1)*2+(y+1)+6; }


// Makes sure x,y coords are within the board.  Returns true or false.
var checkBounds = function(x,y) {
  return ((0<=x) && (x<=maxX) && (0<=y) && (y<=maxY)); }

// Saves the current pointing location of the mouse.  Called w/ onMouseOver
// for each cell.
var cursorHoldLoc = function(x,y) {
   pointingAtX = x;
   pointingAtY = y; 
   forceFocus(); }

// Clears the saved location.  Needed when user points outside the grid.
// Note: I check that I'm clearing the correct cell, just in case events
// occur out of order.
var cursorClearLoc = function(x,y) {
   if ((pointingAtX == x) && (pointingAtY == y)) {
      pointingAtX = -1;
      pointingAtY = -1; } }


// Complete the Win process. Save the cookies, and call the winning window.
var winShowWindow = function() {
   win = true;
//   setCookie("gameTime",clockCurrent);
//   setCookie("numMoves",numMoves);
//   setCookie("openRemainingUsed",openRemainingUsed);
   target.face.u = faceWin;
//   window.open('highscores/minewin.html','MinesweeperWin','toolbar=0,directories=0,menubar=0,scrollbars=1,resizable=0,width=400,height=420'); 
}
	
//
// Associated w/ opening cells & cell clicking
//

// Make sure the check box always has the focus. makes the space bar work.
var forceFocus = function() {
     // document.checkForm.modeCheck.focus()
     }


// You're dead.  Open the board of bombs.  Assumes death bomb is already
// displayed (and isExposed is set to true).
var deathShowBombs = function() {
   for (i=0; i<=maxX; i++) {
      for (j=0; j<=maxY; j++) {
         with (cellArray[arrayIndexOf(i,j)]) {
            if (!isExposed) {
               if ((isBomb) && (!isFlagged)) {
                  target['sq'+imageIndexOf(i,j)].u = bombRevealed; }
               else {
                  if ((!isBomb) && (isFlagged)) {
                  target['sq'+imageIndexOf(i,j)].u = bombMisFlagged;
               } } } } } } }


// You've won.  Mark any remaining cells as flags.
var winShowFlags = function() {
   for (i=0; i<=maxX; i++) {
      for (j=0; j<=maxY; j++) {
         with (cellArray[arrayIndexOf(i,j)]) {
            if ((!isExposed) && (!isFlagged)) {
               isFlagged = true;
               target['sq'+imageIndexOf(i,j)].u = bombFlagged; } } } } }
              
// Open all remaining cells. Returns True if the player has won.
var openAll = function() {
   allOK = true;
   for (i=0; i<=maxX; i++) {
      for (j=0; j<=maxY; j++) {
         with (cellArray[arrayIndexOf(i,j)]) {
            if (!isExposed) {
               if ((isBomb) && (!isFlagged)) {
                  target['sq'+imageIndexOf(i,j)].u = bombDeath; 
                  allOK = false;}
               else if ((!isBomb) && (isFlagged)) {
                  target['sq'+imageIndexOf(i,j)].u = bombMisFlagged; }
               else if (!isBomb) {
                  target['sq'+imageIndexOf(i,j)].u = neighborBombs; 
               } } } } } 
   return allOK;}
             


// Actually opens the cell.  Works for bombs & free cells.  Can handle
// recursive calls (through markMatrixToOpen), death (if bomb), and win.
// (should probably be broken up a bit)
var openCell = function(x,y) {
   // Normal cell opening processing begins here
   with (cellArray[arrayIndexOf(x,y)]) {
      if (isBomb) {
         // death
         clockStop();
         target['sq'+imageIndexOf(x,y)].u =  bombDeath;
         target.face.u = faceDead;
         isExposed = true;
         dead = true;
         updateNumBombs();
         deathShowBombs(); }
      else {
         target['sq'+imageIndexOf(x,y)].u =  neighborBombs; 
         isExposed = true;
         isMarked = false;
         ++ cellsOpen;
         if ((neighborBombs == 0) && (!isBomb)) {
            markMatrixToOpen(x,y); } 
         if (cellsOpen+maxNumBombs-1 == maxCells) {
            clockStop();
            winShowFlags();
            winShowWindow();
            } } } }
         

// Cells on stack marked to be open.  Called on an as-needed baisis.
// See the markCellToOpen fn below.
var constructMarkedCell = function() {
   this.x = -1;
   this.y = -1; }


// Although Netscapes JavaScript 1.1 documentation says JavaScript is
// recursive, it doesn't actually maintain a stack of local vars!
// So these functions turned out to be a real pain to rewrite with my
// own stack structures.
// Adds an element to the manual stack.  Lengthens the stack if necessary.
var markCellToOpen = function(x,y) {
   ++markedCount;
   if (highestStackHeight < markedCount) {
     ++highestStackHeight;
     markedArray[markedCount] = new constructMarkedCell() }
   markedArray[markedCount].x = x;
   markedArray[markedCount].y = y;
   cellArray[arrayIndexOf(x,y)].isMarked = true; }


// When you open a cell w/ 0 neighbors or click on a completely flagged
// cell, open all neighbors (not flagged).  Creates recursive calls through
// markCellToOpen
var markMatrixToOpen = function(x,y) {
   for (i=x-1; i<=x+1; i++) {
      for (j=y-1; j<=y+1; j++) {
         if (checkBounds(i,j)) {
            with (cellArray[arrayIndexOf(i,j)]) {
               if ((!isExposed) && (!isMarked) && (!isFlagged)) {
                  markCellToOpen(i,j); } } } } } }


// Open all cells (usually one) marked for opening.  See markMatrixToOpen
// to see how multiple cells are marked.
var openAllMarked = function() {
   while (markedCount >= 0) {
      markedCount--;  // Decrement first, in case a matrix is to be open
      with (markedArray[markedCount+1]) {
         openCell(x,y); } } }

// Returns 1 if a cell is flagged, and 0 otherwise.  Used in determining
// if a cell has complete surrounding cells flagged.  See below
var checkFlagged = function(x,y) {
   if (checkBounds(x,y)) 
      return (cellArray[arrayIndexOf(x,y)].isFlagged) ? (1) : (0); 
   else
      return 0; }


// Count the # of neighbors flagged.  Called for matrix opening.
var checkFlaggedMatrix = function(x,y) {
   count = 0;
   for (i=x-1; i<=x+1; i++) {
      for (j=y-1; j<=y+1; j++) {
         if ((i!=x) || (j!=y)) {                  //Don't check center point
         count = count + checkFlagged(i,j); } } }
   return count; }


// Called for first click only.  Starts the clock, and makes sure there is
// no bomb for the first open cell (or matrix).
var firstClick = function(x,y) {
    if (!useFirstClickUseful) {
      if (cellArray[arrayIndexOf(x,y)].isBomb) {
         placeBombRandomLoc();  // Place first to insure different loc
         removeBomb(x,y); } }
    else {
      var i = 0;        // Make local
      var j = 0;
      // Set each cell of the matrix to open to prevent bomb placement.
      for (i=x-1; i<=x+1; i++) {
         for (j=y-1; j<=y+1; j++) {
            if (checkBounds(i,j)) {
               cellArray[arrayIndexOf(i,j)].isExposed = true; } } }
      // Remove any bombs in the matrix and place elsewhere
      for (i=x-1; i<=x+1; i++) {
         for (j=y-1; j<=y+1; j++) {
            if (checkBounds(i,j)) {
               if (cellArray[arrayIndexOf(i,j)].isBomb) {
                  removeBomb(i,j);
                  placeBombRandomLoc();
                  } } } }
      // Set each cell back to normal.  (Let cellClick take it from here).
      for (i=x-1; i<=x+1; i++) {
         for (j=y-1; j<=y+1; j++) {
            if (checkBounds(i,j)) {
               cellArray[arrayIndexOf(i,j)].isExposed = false; } } } }
  clockStart(); }


// Main click function.  Called whenever a cell is clicked.  Based on mode,
// determines what to do about the click. Handles both left and right.
var cellClick = function(x,y,e) {
//   alert("Clicked cell " + x + "," + y);  //Useful diagnostic line
//   alert("Button pressed = " + e.button) //Useful diagnostic line
   closeAllMenus();
   if ((!dead) && (!win)) {
      target.face.u = faceSmile;
      numMoves++;
      // Count the moves
	  if ((e != null) && (e.button != 2)) {
	      if (!clockMoving)
	         firstClick(x,y);
	      with (cellArray[arrayIndexOf(x,y)]) {
	         // Is it already open?  If so, we may need to do a matrix (macro) open
	         if (isExposed) {
	            if ((useMacroOpen) && (checkFlaggedMatrix(x,y) == neighborBombs)) { 
	               markMatrixToOpen(x,y);
	               openAllMarked(); } }
	         else {
	            if (!isFlagged) { 
	               markCellToOpen(x,y); 
	               openAllMarked(); } } }
	      if (win) {
	         bombsFlagged = maxNumBombs;
	         updateNumBombs(); }
	  }
	  else {
	     if (x > -1) {
	      with (cellArray[arrayIndexOf(x,y)]) {
	         if (!isExposed) {
	            // There are 3 possibilities: blank, flagged, and question
	            // First deal with flagged going to either blank or question
	            if (isFlagged) {
	               bombsFlagged--;
	               isFlagged = false;
	               if (!useQuestionMarks)
	                  target['sq'+imageIndexOf(x,y)].u = blankCell;
	               else {
	                  isQuestion = true;
	                  target['sq'+imageIndexOf(x,y)].u = bombQuestion; } }
	            // Now deal w/ question going to blank
	            else {
	               if (isQuestion) {
	                  isQuestion = false;
	                  target['sq'+imageIndexOf(x,y)].u = blankCell; }
	               // Finally, blank going to flagged
	               else {
	                  isFlagged = true;
	                  ++bombsFlagged;
	                  target['sq'+imageIndexOf(x,y)].u = bombFlagged; } }
	         updateNumBombs(); } } }
 	  }
   }
  forceFocus();
}


// Mark a bomb with the space bar (what would be the spacebar).  Called 
// whenever the value of the check box is toggled.  (Replaces old fn which 
// altered "mode").
var cellRightClick = function() {
	cellClick(pointingAtX,pointingAtY, null);
}


// Disable the right click button's menu.
// var pressRightClick = function() { return false; } 
// document.oncontextmenu = pressRightClick;


// Special routine to ignore dragging starts.
// Allows the mouse to be in motion when the user clicks.
// Only works in IE because there is no onDrag handler in Mozilla
//var ignoreDragging = function() {
//   try {
//      window.event.returnValue = false; }
//   catch (e) {}
//   return false; }


// Show or remove the "Ooh" face when the mouse is clicked.
target.showMouseDown = function (e) {
   if ((! dead) && (! win) && (clickMode==0)){
      closeAllMenus();
      target.face.u = faceOoh; } }



// Check for F2. If pressed, restart the game. Two versions: for FF & IE
// document.onkeydown = checkKeyDown; // Uses global onkeypress. 
var checkKeyDown = function(e) { 
	try {
		if (e.keyCode == 113) {
			faceClick(); } }
	catch (e) {}
	try {
		if (window.event.keyCode == 113) {
			faceClick(); } }
	catch (e) {}
}


// When all bombs are marked, user can open all remaining cells.
var bombCountClick = function() {
   closeAllMenus();
   if ((!dead) && (!win) && (openRemaining) && ((maxNumBombs-bombsFlagged) == 0)) {
      clockStop();
      numMoves++;
      openRemainingUsed = true;
      if (openAll()) {
         winShowWindow(); 
         updateNumBombs(); }
      else {
         dead = true;
         updateNumBombs();
         target.face.u = faceDead; } }
   forceFocus();
   return false; }

//
// Board creation, re-initialization, bomb placement, etc.
//


// Support function for makeBoard.  Adds 1 to the neighborBombs property.
// Does a bounds check and a check for not being a bomb. (no change if 
// either condition fails)
var addNeighbor = function(x,y) {
   if (checkBounds(x,y)) {
      with (cellArray[arrayIndexOf(x,y)]) {
            ++neighborBombs; } } }


// Called only w/ removal of bomb when 1st click is on a bomb.
var removeNeighbor = function(x,y) {
   if (checkBounds(x,y)) {
      with (cellArray[arrayIndexOf(x,y)]) {
            neighborBombs--; } } }


// Support function for makeBoard, and also called externally if first 
// click is on a bomb.  Places a bomb at x,y loc and updates neighbor 
// counts.  returns true upon success, failure if bomb is already there 
// or if the square is open. (note: isExposed is set temporarily to true
// during first click to avoid bombs being placed in bomb-free zone.)
var placeBomb = function(x,y) {
   with (cellArray[arrayIndexOf(x,y)]) {
      if ((! isBomb) && (! isExposed)) {
         isBomb = true;
         for (i=x-1; i<=x+1; i++) {
            for (j=y-1; j<=y+1; j++) {
               addNeighbor(i,j); } } 
         return true;} 
      else
         return false; } }


// Only called when user's 1st click is on a bomb.
// NOTE: This fn caused an "internal error: Stack underflow" for a while,
// and then stopped.  I still can't find the cause, but if I split the
// cellArray reference out into a higher "with" statement, it comes back.
// It seems to work fine now, but be careful!
var removeBomb = function(x,y) {
   if (cellArray[arrayIndexOf(x,y)].isBomb) {
      for (i=x-1; i<=x+1; i++) {
         for (j=y-1; j<=y+1; j++) {
            removeNeighbor(i,j); } } 
      cellArray[arrayIndexOf(x,y)].isBomb = false;
      return true; } 
   else
      return false; }


// Pixed a random stop w/o a bomb already there and places a bomb there.
// Since it works w/ random locs and tests compliance, this fn is only
// suitable for up to ~50% coverage. (I've limited the program to 33%).
var placeBombRandomLoc = function() {
   bombPlaced = false;
   while (!bombPlaced) {
      with (Math) {
         i = floor(random() * (maxX+1));
         j = floor(random() * (maxY+1)); }
      bombPlaced = (placeBomb(i,j)) } }


// Does a complete clear of the internal board cell objects.
var clearBoard = function() {
   for (i=0; i<=maxX; i++) {
      for (j=0; j<=maxY; j++) {
         with (cellArray[arrayIndexOf(i,j)]) {
            isExposed = false;
            isBomb = false;
            isFlagged = false;
            isMarked = false;
            isQuestion = false;
            neighborBombs = 0;  } } } }


// Puts the original image on each image cell.
var clearBoardImages = function() {
   for (j=0; j<=maxY; j++) {
      for (i=0; i<=maxX; i++) {
         with (cellArray[arrayIndexOf(i,j)]) {
            if (target['sq'+imageIndexOf(i,j)].u != blankCell) {
            	target['sq'+imageIndexOf(i,j)].u = blankCell; } } } } }


// Core fn for creating a board.  Does not reset time or clear images.
var makeBoard = function() {
   clearBoard();
   bombsFlagged = 0;
   cellsOpen = 0;
   updateNumBombs();
   // Now place the bombs on the board
   bombsToPlace = maxNumBombs;
   while (bombsToPlace != 0) {
      placeBombRandomLoc();
      bombsToPlace--; } }


// Resets clock, makes board, clears images, and prepares for next game.
// First time doesn't do a parent reload.
var faceClick_first = function () {
   target.face.u = faceWait;
   updateScreen();
   numMoves = 0;
   closeAllMenus();
   clockStop();
   clockClear();
   makeBoard();
   clearBoardImages(); 
   forceFocus();
   dead = false;
   win = false;
   openRemainingUsed = false;
   target.face.u = faceSmile;
   return false;
   }

var faceClick = function() {
    faceClick_first();
   // Cheezy line to allow ads on calling page.
   try { 
      if (window.opener.window.location.pathname.indexOf('minesweeper.html') >= 0) {
         window.opener.window.location.reload(); 
      }
   } 
   catch (e) { }
   return false;
   }

//
// Numerical displays (clock and num bomb) updated here
//


// Set the clock images to the current time.  Called by ticClock
var updateClock = function() {
     var tempClock,digit,v;
     if (showNumMoves){
       v=1;
       tempClock=numMoves;
     	} 
     else {  
       v=0;
       tempClock = clockCurrent;
     }		     
     if (tempClock == -1) { tempClock = 0; }
     digit = tempClock % 10;
     target.time1s.u = digit;
     target.time1s.v = v;
     digit = Math.floor(tempClock / 10 % 10);
     target.time10s.u = digit;
     target.time10s.v = v;
     digit = Math.floor(tempClock / 100 % 10);
     target.time100s.u = digit;
     target.time100s.v = v;}


// Updates the display w/ the current number of bombs left.
var updateNumBombs = function() {
   if ((!dead) && (!win) && (openRemaining) && ((maxNumBombs-bombsFlagged) == 0)) {
      target.bomb1s.u = 10;
      target.bomb10s.u = 10;
      target.bomb100s.u = 10; }
   else {
      digit = Math.abs(maxNumBombs-bombsFlagged) % 10;
      target.bomb1s.u = digit;
      digit = Math.floor(Math.abs(maxNumBombs-bombsFlagged) / 10 % 10);
      target.bomb10s.u = digit;
      digit = Math.floor(Math.abs(maxNumBombs-bombsFlagged) / 100 % 10);
      target.bomb100s.u = digit;
      if (maxNumBombs < bombsFlagged)
         target.bomb100s.u = 10; } }




//
// TIME functions begin here...
//

// Clock tic. Originally called once, then it repeats every 1 second.
// no timers used at this moment, called with every click
// fixme
// for x50 hardwaretimer should be used
var ticClock = function() {
   var now;
   if (!killLastClock) {
      if (clockMoving) {
         now = new Date();
      	 clockCurrent = Math.floor((now.getTime()-clockStartTime)/1000)}
  // 	 target.bubble('tracelog','currentTime='+clockCurrent);
      if ((clockMoving) && (clockCurrent < 1000)) // Max out display at 999
         updateClock(); 
      clockActive = clockMoving;
//      if (clockActive)  {              // Always do the recursive call last
//         id = setTimeout("ticClock()",1000) } 
         }
//   killLastClock = false; 
}


// Stops the clock
//   SPECIAL NOTE: This function doesn't actually stop the clock: it
//   directs the ticClock fn to stop ticking upon its next recusrive call.
var clockStop = function() {
   clockMoving = false; }


// Stop and clear the clock.  See specal note in clockStop above.   
var clockClear = function() {
   // If we're currently moving, we need to first stop it
   if ((!clockMoving) && (clockCurrent != 0)) {
      clockCurrent = 0;
      updateClock(); }
   clockCurrent = -1;
   clockMoving = false; }


// Starts the clock.  Able to start a clear clock or restart a paused
// clock (a feature I'm not using here).
var clockStart = function() {
   var now;
   // Stop the clock (sets a temp variable for later interigation)
   clockWasActive = clockActive;
   clockMoving = true;
   now = new Date();
   clockStartTime = now.getTime();
//   target.bubble('tracelog','StartTime='+clockStartTime);
   ticClock();
   // harder part: We're still running.  Tells ticClock to kill old clock.
   if (clockWasActive) {
      killLastClock = true;  } }
      

// Since it takes so long to close, make a face...
var gameClose = function() {
   target.face.u = faceWait; }
//
var closeAllMenus = function() {
return true;
}
	
	
};
try {
  tmp();
} catch(e) {target.bubble('tracelog','error in minesweeper.js');}
tmp = undefined;
