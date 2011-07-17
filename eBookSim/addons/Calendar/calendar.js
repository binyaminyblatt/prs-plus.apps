//
// Calendar for Sony Reader
// by Ben Chenoweth
// (utilises code taken from JavaScript Calendar featured on and available at JavaScript Kit: http://www.javascriptkit.com)
//
// Initial version: 2011-07-14
// Changelog:
// 2011-07-15 Ben Chenoweth - Fixed start-up script; resized "Today" button.
// 2011-07-17 Ben Chenoweth - Improved layout and event icons; added "Anniversary"; increased event font size; changed event file-format; non-Touch cursor now moves.
// 2011-07-17 Ben Chenoweth - Added settings popup panel; 'Week starts with' option (Sunday or Monday).

var tmp = function () {
	var thisDate = 1;							// Tracks current date being written in calendar
	var wordMonth = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
	var wordDays = new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
	var today = new Date();							// Date object to store the current date
	var todaysDay = today.getDay() + 1;					// Stores the current day number 1-7
	var todaysDate = today.getDate();					// Stores the current numeric date within the month
	var todaysMonth = today.getUTCMonth() + 1;				// Stores the current month 1-12
	var todaysYear = today.getFullYear();					// Stores the current year
	var monthNum = todaysMonth;						// Tracks the current month being displayed
	var yearNum = todaysYear;						// Tracks the current year being displayed
	var firstDate;					// Object Storing the first day of the current month
	var firstDay;					// Tracks the day number 1-7 of the first day of the current month
	var lastDate;					// Tracks the last date of the current month
	var numbDays = 0;
	var calendarString = "";
	var eastermonth = 0;
	var easterday = 0;
	var events = [];
	
	var hasNumericButtons = kbook.autoRunRoot.hasNumericButtons;
	var getSoValue = kbook.autoRunRoot.getSoValue; 	
	var getFileContent = kbook.autoRunRoot.getFileContent;
	var datPath0 = kbook.autoRunRoot.gamesSavePath+'Calendar/';
	FileSystem.ensureDirectory(datPath0);  
	var datPath  = datPath0 + 'calendar.dat';
	var settingsPath = datPath0 + 'settings.dat';
	var selectionDate;
	var settingsDlgOpen = false;
	var weekBeginsWith = "Sun";
	var custSel;
	var mouseLeave = getSoValue( target.SETTINGS_DIALOG.btn_Cancel,'mouseLeave');
	var mouseEnter = getSoValue( target.SETTINGS_DIALOG.btn_Cancel,'mouseEnter');	
	
	// variables to be saved to a file
	target.settings = {	
		WeekBeginsWith : "Sun"
	};        

	// reads values of target.settings.xx from file
	target.loadSettings = function () {
		var stream, inpLine;
		var values = [];
      	try {
      		if (FileSystem.getFileInfo(settingsPath)) {
      			stream = new Stream.File(settingsPath);    			
		      	while (stream.bytesAvailable) {
      				inpLine = stream.readLine();
      				values = inpLine.split(':');
      				if ((values[1] == 'true') || (values[1] == 'false')) {   					
 					target.settings[values[0]] = values[1] == 'true';
      				} else {
      					target.settings[values[0]]=values[1];  
      				}
      			}
      		}	
      		stream.close();
      	} catch (e) {}	
	}         

	// writes values of target.settings.xx to file         
	target.saveSettings = function () { 
		var o, stream;
      	try {
      		if (FileSystem.getFileInfo(settingsPath)) FileSystem.deleteFile(settingsPath);
      		stream = new Stream.File(settingsPath, 1);
      		for (o in target.settings) {
      			stream.writeLine(o+':'+target.settings[o]);
      		}
      		stream.close();
      	} catch (e) { }         
    } 

	// Load settings from save file once at startup
	target.loadSettings();
	
	// assign model-variables
	with (target.settings) {
		weekBeginsWith = WeekBeginsWith;
		target.setVariable("week_begins",WeekBeginsWith);
	}	
	
	target.init = function () {
		var i;
		//this.bubble("tracelog","initialising...");
		this.appTitle.setValue(kbook.autoRunRoot._title);
		this.appIcon.u = kbook.autoRunRoot._icon;

		// Load events from save file
		try {
			if (FileSystem.getFileInfo(datPath)) {
				// read whole file in first to count how many events there are
				var tempfile = getFileContent(datPath,'savefile missing');
				if (tempfile!='savefile missing') {
					var lines = tempfile.split("\r\n");	// CR LF is used by stream.writeLine()
					var tempnumevents = (lines.length-1);
					//this.bubble("tracelog","Events="+tempnumevents);
					for (i=0; i<tempnumevents; i++) {
						events.push(lines[i].split(";"));
					}
				}
			} else {
				// no savefile, so push default events
				events.push(["Y", "1", "1", "2006", "New Year's Day"]);
				events.push(["V", "2", "14", "2005", "Valentine's Day"]);
				events.push(["F", "3", "0", "0", "Easter Sunday"]);
				events.push(["Y", "3", "17", "2005", "St. Patrick's Day"]);
				events.push(["F", "11", "4", "5", "Thanksgiving"]);
				events.push(["C", "12", "25", "2005", "Christmas"]);
			}
		} catch (e) { }
		
		// hide unwanted graphics
		this.selection1.changeLayout(0, 0, uD, 0, 0, uD);

		//this.bubble("tracelog","Today: "+today);
		
		if (weekBeginsWith=="Mon") {
			this.labelSun.setValue("Mon");
			this.labelMon.setValue("Tue");
			this.labelTue.setValue("Wed");
			this.labelWed.setValue("Thu");
			this.labelThu.setValue("Fri");
			this.labelFri.setValue("Sat");
			this.labelSat.setValue("Sun");
		} else {
			this.labelSun.setValue("Sun");
			this.labelMon.setValue("Mon");
			this.labelTue.setValue("Tue");
			this.labelWed.setValue("Wed");
			this.labelThu.setValue("Thu");
			this.labelFri.setValue("Fri");
			this.labelSat.setValue("Sat");
		}
		
		selectionDate=todaysDate;
		this.dateChanged();
		
		if (hasNumericButtons) {
			this.touchButtons0.show(false);
			this.touchButtons1.show(false);			
			//this.touchButtons2.show(false);
			this.touchButtons3.show(false);
			this.touchButtons4.show(false);
			this.BUTTON_TDY.show(false);
			this.BUTTON_PYR.show(false);
			this.BUTTON_PMN.show(false);
			this.BUTTON_NMN.show(false);
			this.BUTTON_NYR.show(false);
		} else {
			this.gridCursor.changeLayout(0, 0, uD, 0, 0, uD);			
			this.nonTouch1.show(false);
			this.nonTouch2.show(false);
			this.nonTouch3.show(false);
			this.nonTouch4.show(false);
			this.nonTouch5.show(false);
			this.nonTouch6.show(false);
			this.nonTouch7.show(false);
		}
		return;
	}

	target.dateChanged = function() {
		if (monthNum == 0) {
			monthNum = 12;
			yearNum--;
		}
		else if (monthNum == 13) {
			monthNum = 1;
			yearNum++
		}
		
		this.displayMonthYear.setValue(wordMonth[monthNum-1]+" "+yearNum);

		lastDate = new Date(yearNum,monthNum);
		lastDate.setDate(lastDate.getDate()-1);
		numbDays = lastDate.getDate();
		firstDate = new Date(yearNum, monthNum-1, 1);
		firstDay = firstDate.getDay() + 1;

		// hide events
		this.eventsText.setValue("");
		
		// hide cursor on Touch
		if (!hasNumericButtons) {
			this.gridCursor.changeLayout(0, 0, uD, 0, 0, uD);
		} else {
			if (selectionDate > numbDays) selectionDate=numbDays;
			var daycounter = 0;
			thisDate == 1;
			var x = -1;
			var y = -1;
			for (var i = 1; i <= 6; i++) {
				for (var j = 1; j <= 7; j++) {
					if (weekBeginsWith=="Sun") {
						daycounter = (thisDate - firstDay)+1;
					} else {
						daycounter = (thisDate - firstDay)+2;
						if (firstDay==1) daycounter -= 7;
					}
					if (selectionDate==daycounter) {
						x=j;
						y=i; 
					}
					thisDate++;
				}
			}
			thisDate = 1;
			
			if (selectionDate>0) {
				//place selection square
				this.gridCursor.changeLayout((x-1)*70+50, 70, uD, (y-1)*70+80, 70, uD);
			}
			
			if (this.checkevents(selectionDate,monthNum,yearNum,y,x)) {
				// events in selection square
				this.showevents(selectionDate,monthNum,yearNum,y,x);
			} else {
				this.eventsText.setValue("");
			}
		}
		
		//this.bubble("tracelog","monthNum="+monthNum+", yearNum="+yearNum+", numbDays="+numbDays);
		//this.bubble("tracelog","firstDate="+firstDate+", lastDate="+lastDate+", firstDay="+firstDay);
		this.createCalendar();
		return;	
	}

	target.easter = function (year) {
	// feed in the year it returns the month and day of Easter using two GLOBAL variables: eastermonth and easterday
	var a = year % 19;
	var b = Math.floor(year/100);
	var c = year % 100;
	var d = Math.floor(b/4);
	var e = b % 4;
	var f = Math.floor((b+8) / 25);
	var g = Math.floor((b-f+1) / 3);
	var h = (19*a + b - d - g + 15) % 30;
	var i = Math.floor(c/4);
	var j = c % 4;
	var k = (32 + 2*e + 2*i - h - j) % 7;
	var m = Math.floor((a + 11*h + 22*k) / 451);
	var month = Math.floor((h + k - 7*m + 114) / 31);
	var day = ((h + k - 7*m +114) % 31) + 1;
	eastermonth = month;
	easterday = day;
	}

	target.setSquare = function (row, column, type, date) {
		var id;
		id=(row - 1) * 7 + (column - 1);
		this['square' + id].u = type;
		if (date=="0") {
			this['day' + id].setValue("");
		} else {
			this['day' + id].setValue(date);
		}
		return;
	}
	
	target.createCalendar = function () {
		//calendarString = '';
		var daycounter = 0;
		var eventtype;
		thisDate == 1;
		
		//hide today marker
		this.selection1.changeLayout(0, 0, uD, 0, 0, uD);
		for (var i = 1; i <= 6; i++) {
			for (var x = 1; x <= 7; x++) {
				
				if (weekBeginsWith=="Sun") {
					daycounter = (thisDate - firstDay)+1;
				} else {
					daycounter = (thisDate - firstDay)+2;
					if (firstDay==1) daycounter -= 7;
				}
				thisDate++;
				if ((daycounter > numbDays) || (daycounter < 1)) {
					// square not used by current month
					this.setSquare(i,x,2,"0");
				} else {
					if (this.checkevents(daycounter,monthNum,yearNum,i,x) || ((todaysDay == x) && (todaysDate == daycounter) && (todaysMonth == monthNum))){
						if ((todaysDay == x) && (todaysDate == daycounter) && (todaysMonth == monthNum)) {
							// today
							if (this.checkevents(daycounter,monthNum,yearNum,i,x)) {
								// event on this day
								eventtype=this.getevent(daycounter,monthNum,yearNum,i,x);
								this.setSquare(i,x,eventtype,daycounter);
							} else {
								// blank day
								this.setSquare(i,x,0,daycounter);
							}
							//show today marker
							this.selection1.changeLayout((x-1)*70+50, 70, uD, (i-1)*70+80, 70, uD);
						}
						else	{
							// event on this day
							eventtype=this.getevent(daycounter,monthNum,yearNum,i,x);
							this.setSquare(i,x,eventtype,daycounter);
						}
					} else {
						// blank day
						this.setSquare(i,x,0,daycounter);
					}
				}
			}
		}
		thisDate = 1;
	}

	target.checkevents = function (day,month,year,week,dayofweek) {
	var numevents = 0;
	var floater = 0;

		for (var i = 0; i < events.length; i++) {
			if (events[i][0] == "W") {
				if ((events[i][2] == dayofweek)) numevents++;
			}
			else if ((events[i][0] == "Y") || (events[i][0] == "C") || (events[i][0] == "B") || (events[i][0] == "V") || (events[i][0] == "A")) {
				if ((events[i][2] == day) && (events[i][1] == month)) numevents++;
			}
			else if (events[i][0] == "F") {
				if ((events[i][1] == 3) && (events[i][2] == 0) && (events[i][3] == 0) ) {
					this.easter(year);
					if (easterday == day && eastermonth == month) numevents++;
				} else {
					floater = this.floatingholiday(year,events[i][1],events[i][2],events[i][3]);
					if ((month == 5) && (events[i][1] == 5) && (events[i][2] == 4) && (events[i][3] == 2)) {
						if ((floater + 7 <= 31) && (day == floater + 7)) {
							numevents++;
						} else if ((floater + 7 > 31) && (day == floater)) numevents++;
					} else if ((events[i][1] == month) && (floater == day)) numevents++;
				}
			}
			else if ((events[i][2] == day) && (events[i][1] == month) && (events[i][3] == year)) {
				numevents++;
			}
		}

		if (numevents == 0) {
			return false;
		} else {
			return true;
		}
	}

	target.getevent = function (day,month,year,week,dayofweek) {
		// christmas and valentine's day are prioritised
		for (var i = 0; i < events.length; i++) {
			if (events[i][0] == "C") {
				if ((events[i][2] == day) && (events[i][1] == month)) {
					return 4;
				}
			}
			if (events[i][0] == "V") {
				if ((events[i][2] == day) && (events[i][1] == month)) {
					return 5;
				}
			}			
		}
		// birthday and anniversarys are next
		for ( i = 0; i < events.length; i++) {
			if (events[i][0] == "B") {
				if ((events[i][2] == day) && (events[i][1] == month)) {
					return 3;
				}
			}
			if (events[i][0] == "A") {
				if ((events[i][2] == day) && (events[i][1] == month)) {
					return 6;
				}
			}
		}
		// other
		return 1;
	}
	
	target.showevents = function (day,month,year,week,dayofweek) {
	var theevent = "";
	var floater = 0;

		for (var i = 0; i < events.length; i++) {
			// First we'll process recurring events (if any):
			if (events[i][0] != "") {
				if (events[i][0] == "D") {
				}
				if (events[i][0] == "W") {
					if ((events[i][2] == dayofweek)) {
					theevent += events[i][4] + '\n';
					}
				}
				if (events[i][0] == "M") {
				}
				if ((events[i][0] == "Y") || (events[i][0] == "C") || (events[i][0] == "B") || (events[i][0] == "V") || (events[i][0] == "A")) {
					if ((events[i][2] == day) && (events[i][1] == month)) {
					theevent += events[i][4] + '\n';
					}
				}
				if (events[i][0] == "F") {
					if ((events[i][1] == 3) && (events[i][2] == 0) && (events[i][3] == 0) ) {
						if (easterday == day && eastermonth == month) {
							theevent += events[i][4] + '\n';
						} 
					} else {
						floater = this.floatingholiday(year,events[i][1],events[i][2],events[i][3]);

						if ((month == 5) && (events[i][1] == 5) && (events[i][2] == 4) && (events[i][3] == 2)) {
							if ((floater + 7 <= 31) && (day == floater + 7)) {
								theevent += events[i][4] + '\n';
							} else if ((floater + 7 > 31) && (day == floater)) {
								theevent += events[i][4] + '\n';
							}
						} else if ((events[i][1] == month) && (floater == day)) {
							theevent += events[i][4] + '\n';
						}
					}
			}
			}
			// Now we'll process any One Time events happening on the matching month, day, year:
			else if ((events[i][2] == day) && (events[i][1] == month) && (events[i][3] == year)) {
				theevent += events[i][4] + '\n';
			}
		}
		if (theevent == "") {
			theevent = 'No events to show.';
		}
		
		//this.bubble("tracelog","events="+theevent);
		this.eventsText.setValue(theevent);
		
		return;
	}

	target.floatingholiday = function (targetyr,targetmo,cardinaloccurrence,targetday) {
	// Floating holidays/events uses:
	//	the Month field for the Month (here it becomes the targetmo field)
	//	the Day field as the Cardinal Occurrence  (here it becomes the cardinaloccurrence field)
	//		1=1st, 2=2nd, 3=3rd, 4=4th, 5=5th, 6=6th occurrence of the day listed next
	//	the Year field as the Day of the week the event/holiday falls on  (here it becomes the targetday field)
	//		1=Sunday, 2=Monday, 3=Tuesday, 4=Wednesday, 5=Thurday, 6=Friday, 7=Saturday
	//	example: "F",	"1",	"3",	"2", = Floating holiday in January on the 3rd Monday of that month.
	//
	// In our code below:
	// 	targetyr is the active year
	// 	targetmo is the active month (1-12)
	// 	cardinaloccurrence is the xth occurrence of the targetday (1-6)
	// 	targetday is the day of the week the floating holiday is on
	//		0=Sun; 1=Mon; 2=Tue; 3=Wed; 4=Thu; 5=Fri; 6=Sat
	//		Note: subtract 1 from the targetday field if the info comes from the events.js file
	//
	// Note:
	//	If Memorial Day falls on the 22nd, 23rd, or 24th, then we add 7 to the dayofmonth to the result.
	//
	// Example: targetyr = 2052; targetmo = 5; cardinaloccurrence = 4; targetday = 1
	//	This is the same as saying our floating holiday in the year 2052, is during May, on the 4th Monday
	//
	var firstdate = new Date(String(targetmo)+"/1/"+String(targetyr));	// Object Storing the first day of the current month.
	var firstday = firstdate.getUTCDay();	// The first day (0-6) of the target month.
	var dayofmonth = 0;	// zero out our calendar day variable.

		targetday = targetday - 1;

		if (targetday >= firstday) {
			cardinaloccurrence--;	// Subtract 1 from cardinal day.
			dayofmonth = (cardinaloccurrence * 7) + ((targetday - firstday)+1);
		} else {
			dayofmonth = (cardinaloccurrence * 7) + ((targetday - firstday)+1);
		}
	return dayofmonth;
	}
	
	target.doButtonClick = function (sender) {
		var id;
		id = getSoValue(sender, "id");
		n = id.substring(7, 10);
		if (n == "TDY") {
			monthNum=todaysMonth;
			yearNum=todaysYear;
			this.dateChanged();			
			return;
		}
		if (n == "PYR") {
			// previous year
			yearNum--;
			this.dateChanged();
			return;
		}
		if (n == "PMN") {
			// previous month
			monthNum--;
			this.dateChanged();
			return;
		}
		if (n == "NMN") {
			// next month
			monthNum++;
			this.dateChanged();
			return;
		}
		if (n == "NYR") {
			// next year
			yearNum++;
			this.dateChanged();
			return;
		}
	}

	target.doSquareClick = function (sender) {
		var id, n, x, y, id;
		id = getSoValue(sender, "id");
		n = id.substring(6, 8);
		x = (n % 7) + 1; // find column
		y = (Math.floor(n / 7)) + 1; // find row
			
		var daycounter = 0;
		thisDate == 1;
		for (var i = 1; i <= 6; i++) {
			for (var j = 1; j <= 7; j++) {
				if (weekBeginsWith=="Sun") {
					daycounter = (thisDate - firstDay)+1;
				} else {
					daycounter = (thisDate - firstDay)+2;
					if (firstDay==1) daycounter -= 7;
				}
				if ((x==j) && (y==i)) selectionDate=daycounter;
				thisDate++;
			}
		}
		thisDate = 1;	
		if ((selectionDate < 1) || (selectionDate > numbDays)) selectionDate=0;
		
		if (selectionDate>0) {
			//place selection square
			this.gridCursor.changeLayout((x-1)*70+50, 70, uD, (y-1)*70+80, 70, uD);
		}
		
		if (this.checkevents(selectionDate,monthNum,yearNum,y,x)) {
			// events in square that was clicked
			this.showevents(selectionDate,monthNum,yearNum,y,x);
		} else {
			this.eventsText.setValue("");
		}
		
		//this.bubble("tracelog","n="+n+", column="+x+", row="+y+", date="+selectionDate);
		return;
	}
	
	target.doSelectClick = function (sender) {
		return;
	}

	target.doNext = function (sender) {
		// next month
		monthNum++;
		this.dateChanged();	
		return;
	}

	target.doPrev = function (sender) {
		// previous month
		monthNum--;
		this.dateChanged();	
		return;
	}

	target.doSize = function (sender) {
		return;
	}

	target.doRoot = function (sender) {
		var event;
		// save events to file
		try {
			if (FileSystem.getFileInfo(datPath)) FileSystem.deleteFile(datPath);
			stream = new Stream.File(datPath, 1);
			for (var i = 0; i < events.length; i++) {
				event=events[i][0]+';'+events[i][1]+';'+events[i][2]+';'+events[i][3]+';'+events[i][4];
				stream.writeLine(event);
			}		
			stream.close();
		} catch (e) {}
		kbook.autoRunRoot.exitIf(kbook.model);
		return;
	}
	
	target.doHold0 = function () {
		kbook.autoRunRoot.exitIf(kbook.model);
		return;
	}

	target.doLast = function () {
		// next year
		yearNum++;
		this.dateChanged();	
		return;
	}
	
	target.doFirst = function () {
		// last year
		yearNum--;
		this.dateChanged();	
		return;
	}

	target.doCenterF = function () {
		if (settingsDlgOpen) {
			this.SETTINGS_DIALOG.doCenterF();
			return;
		}
		return;
	}
	
	target.moveCursor = function (dir) {
		if (settingsDlgOpen) {
			this.SETTINGS_DIALOG_moveCursor(dir);
			return;
		}	
		switch (dir) {
		case "down":
			{
				selectionDate += 7;
				break;
			}
		case "up":
			{
				selectionDate -= 7;
				break;
			}
		case "left":
			{
				selectionDate -= 1;
				if (selectionDate==0) selectionDate=numbDays;
				break;
			}
		case "right":
			{
				selectionDate += 1;
				if (selectionDate==numbDays+1) selectionDate=1;
				break;
			}
		}
		
		if (selectionDate > numbDays) {
			if (selectionDate > 35) {
				selectionDate -= 35;
			} else {
				selectionDate -= 28;
			}
		}
		if (selectionDate < 1) {
			if (numbDays==28) {
				selectionDate +=28;
			} else if (numbDays==29) {
				if (selectionDate < -5) {
					selectionDate += 35;
				} else {
					selectionDate += 28;
				}
			} else if (numbDays==30) {
				if (selectionDate < -4) {
					selectionDate += 35;
				} else {
					selectionDate +=28;
				}
			} else {
				if (selectionDate < -3) {
					selectionDate += 35;
				} else {
					selectionDate += 28;
				}
			}
		}
		this.dateChanged();
	}
	
	target.doMark = function () {
		monthNum=todaysMonth;
		yearNum=todaysYear;
		this.dateChanged();			
		return;
	}
	
	// Settings pop-up panel stuff
    target.doOption = function(sender) {
		target.SETTINGS_DIALOG.week_starts.setValue("Week starts on:");	
		if (weekBeginsWith=="Sun") {
			target.setVariable("week_begins","1");
		} else {
			target.setVariable("week_begins","2");
		}
		if (hasNumericButtons) {
			custSel = 0;
			this.ntHandleSettingsDlg();
		}
		settingsDlgOpen = true;
		target.SETTINGS_DIALOG.show(true);
		return;
    }
	
	target.closeDlg = function () {
		settingsDlgOpen = false;
		return;
	}

	target.changeSettings = function () {
		settingsDlgOpen = false;
		var t = target.getVariable("week_begins");
		//target.bubble("tracelog","t="+t);
		
		if (t == "1") {
			weekBeginsWith="Sun";
		}
		if (t == "2") {
			weekBeginsWith="Mon";
		}
		
		// save current settings to settingsDatPath
		target.settings.WeekBeginsWith = weekBeginsWith;
		this.saveSettings();
		
		// change calendar
		if (weekBeginsWith=="Mon") {
			this.labelSun.setValue("Mon");
			this.labelMon.setValue("Tue");
			this.labelTue.setValue("Wed");
			this.labelWed.setValue("Thu");
			this.labelThu.setValue("Fri");
			this.labelFri.setValue("Sat");
			this.labelSat.setValue("Sun");
		} else {
			this.labelSun.setValue("Sun");
			this.labelMon.setValue("Mon");
			this.labelTue.setValue("Tue");
			this.labelWed.setValue("Wed");
			this.labelThu.setValue("Thu");
			this.labelFri.setValue("Fri");
			this.labelSat.setValue("Sat");
		}
		this.dateChanged();
		return;
	}
	
	target.ntHandleSettingsDlg = function () {
		if (custSel === 0) {
			target.SETTINGS_DIALOG.week_starts.enable(true);
			mouseLeave.call(target.SETTINGS_DIALOG.btn_Ok);
		}
		if (custSel === 1) {
			target.SETTINGS_DIALOG.week_starts.enable(false);	
			mouseLeave.call(target.SETTINGS_DIALOG.btn_Cancel);
			mouseEnter.call(target.SETTINGS_DIALOG.btn_Ok);
		}		
		if (custSel === 2) {				 		
			mouseLeave.call(target.SETTINGS_DIALOG.btn_Ok);
			mouseEnter.call(target.SETTINGS_DIALOG.btn_Cancel);	
		}
		return;
	}

	target.SETTINGS_DIALOG_moveCursor = function (direction) {
	switch (direction) {
		case "up" : {
			if (custSel>0) {
				custSel--;
				this.ntHandleSettingsDlg();
			}
			break
		}
		case "down" : {
			if (custSel<2) {
				custSel++;
				this.ntHandleSettingsDlg();
			}
			break
		}
		case "left" : {
			if (custSel==0) {
				target.setVariable("week_begins","1");
			}
			break
		}		
		case "right" : {
			if (custSel==0) {
				target.setVariable("week_begins","2");
			}
			break
		}
		return;
	  }	
	}
	
	target.SETTINGS_DIALOG.doCenterF = function () {
		if (custSel === 1) target.SETTINGS_DIALOG.btn_Ok.click();	
		if (custSel === 2) target.SETTINGS_DIALOG.btn_Cancel.click();
		return;
	}

	target.SETTINGS.settingsType = function (t) {
		return;
	}
	
};
tmp();
tmp = undefined;