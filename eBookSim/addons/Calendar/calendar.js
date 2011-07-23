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
// 2011-07-18 Ben Chenoweth - Fixed: "today" indicator missing in week-starts-Monday mode.
// 2011-07-19 Ben Chenoweth - Relocated Edit button; enabled option text on Touch and event text; started event popup panel.
// 2011-07-20 Ben Chenoweth - Event popup panel working (apart from changing description); delete event; fixed floating events.
// 2011-07-20 Ben Chenoweth - Event popup panel working for non-Touch; few bug fixes.
// 2011-07-22 Ben Chenoweth - Monthly/weekly events now work; changed event file format to include icon number; changed event popup panel to include icon; added more icons; weekend shaded slightly.

var tmp = function () {
	var thisDate = 1;							// Tracks current date being written in calendar
	var wordMonth = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
	var wordDays = new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
	var cardinals = new Array("1st", "2nd", "3rd", "4th", "5th");
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
	var eventsDlgOpen = false;
	var weekBeginsWith = "Sun";
	var custSel;
	var prevSel;
	var maxEventNum;
	var maxEventType = 5;
	var maxEventMonth = 12;
	var maxEventDay;
	var maxEventYear = 2100;
	var maxEventIcon = 14;
	var tempEvents = [];
	var tempEventsNum = [];
	var currentTempEvent;
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
		//target.bubble("tracelog","initialising...");
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
					//target.bubble("tracelog","Events="+tempnumevents);
					for (i=0; i<tempnumevents; i++) {
						events.push(lines[i].split(";"));
					}
				}
			} else {
				// no savefile, so push default events
				events.push(["Y", "1", "1", "1900", "12", "New Year's Day"]);
				events.push(["V", "2", "14", "1900", "6", "Valentine's Day"]);
				events.push(["F", "3", "0", "0", "3", "Easter Sunday"]);
				events.push(["Y", "3", "17", "1900", "10", "St. Patrick's Day"]);
				events.push(["F", "11", "4", "5", "11", "Thanksgiving"]);
				events.push(["C", "12", "25", "1900", "5", "Christmas"]);
			}
		} catch (e) { }
		
		// hide unwanted graphics
		this.selection1.changeLayout(0, 0, uD, 0, 0, uD);

		//target.bubble("tracelog","Today: "+today);
		
		if (weekBeginsWith=="Mon") {
			this.labelSun.setValue(wordDays[1]);
			this.labelMon.setValue(wordDays[2]);
			this.labelTue.setValue(wordDays[3]);
			this.labelWed.setValue(wordDays[4]);
			this.labelThu.setValue(wordDays[5]);
			this.labelFri.setValue(wordDays[6]);
			this.labelSat.setValue(wordDays[0]);
			todaysDay = today.getDay();
		} else {
			this.labelSun.setValue(wordDays[0]);
			this.labelMon.setValue(wordDays[1]);
			this.labelTue.setValue(wordDays[2]);
			this.labelWed.setValue(wordDays[3]);
			this.labelThu.setValue(wordDays[4]);
			this.labelFri.setValue(wordDays[5]);
			this.labelSat.setValue(wordDays[6]);
			todaysDay = today.getDay() + 1;
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
			this.BUTTON_EDT.show(false);
		} else {
			this.gridCursor.changeLayout(0, 0, uD, 0, 0, uD);			
			this.nonTouch1.show(false);
			this.nonTouch2.show(false);
			this.nonTouch3.show(false);
			this.nonTouch4.show(false);
			this.nonTouch5.show(false);
			this.nonTouch6.show(false);
			this.nonTouch7.show(false);
			this.nonTouch8.show(false);
		}
		
		target.eventsText.enable(true);
		target.BUTTON_EDT.enable(false);
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
		target.BUTTON_EDT.enable(false);
		
		// hide cursor on Touch
		if (!hasNumericButtons) {
			this.gridCursor.changeLayout(0, 0, uD, 0, 0, uD);
			this.createCalendar();			
		} else {
			if (selectionDate > numbDays) selectionDate=numbDays;
			var daycounter = 0;
			thisDate = 1;
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
			
			this.createCalendar();
			
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
		
		//target.bubble("tracelog","monthNum="+monthNum+", yearNum="+yearNum+", numbDays="+numbDays);
		//target.bubble("tracelog","firstDate="+firstDate+", lastDate="+lastDate+", firstDay="+firstDay);
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
		thisDate = 1;
		
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
					this.setSquare(i,x,0,"0");
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
								if (weekBeginsWith=="Sun") {
									if ((x==1) || (x==7)) {
										// weekend
										this.setSquare(i,x,2,daycounter);
									} else {
										this.setSquare(i,x,1,daycounter);
									}
								} else {
									if ((x==6) || (x==7)) {
										// weekend
										this.setSquare(i,x,2,daycounter);
									} else {
										this.setSquare(i,x,1,daycounter);
									}
								}
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
						if (weekBeginsWith=="Sun") {
							if ((x==1) || (x==7)) {
								// weekend
								this.setSquare(i,x,2,daycounter);
							} else {
								this.setSquare(i,x,1,daycounter);
							}
						} else {
							if ((x==6) || (x==7)) {
								// weekend
								this.setSquare(i,x,2,daycounter);
							} else {
								this.setSquare(i,x,1,daycounter);
							}
						}
					}
				}
			}
		}
		thisDate = 1;
		return;
	}

	target.checkevents = function (day,month,year,week,dayofweek) {
	var numevents = 0;
	var floater = 0;

	// reset the temporary array
	if (tempEvents.length>0) {
		tempEvents.length=0;
		tempEventsNum.length=0;
	}
	
		for (var i = 0; i < events.length; i++) {
			if (events[i][0] == "W") {
				if ((events[i][3] == dayofweek)) numevents++;
			}
			else if (events[i][0] == "M") {
				if ((events[i][2] == day) && (events[i][3] <= year)) numevents++;
			}
			else if ((events[i][0] == "Y") || (events[i][0] == "C") || (events[i][0] == "B") || (events[i][0] == "V") || (events[i][0] == "A")) {
				if ((events[i][2] == day) && (events[i][1] == month) && (events[i][3] <= year)) numevents++;
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
		// Only one icon can be shown, so we have to prioritise them
		// Also, the icon of the first event of each type will be the one displayed
		// yearly events are first
		for (var i = 0; i < events.length; i++) {
			if (events[i][0] == "Y") {
				if ((events[i][2] == day) && (events[i][1] == month) && (events[i][3] <= year)) {
					return events[i][4];
				}
			}
		}
		// floating events are next
		for ( i = 0; i < events.length; i++) {
			if (events[i][0] == "F") {
				if ((events[i][1] == 3) && (events[i][2] == 0) && (events[i][3] == 0) ) {
					if (easterday == day && eastermonth == month) {
						return events[i][4];
					} 
				} else {
					floater = this.floatingholiday(year,events[i][1],events[i][2],events[i][3]);

					if ((month == 5) && (events[i][1] == 5) && (events[i][2] == 4) && (events[i][3] == 2)) {
						if ((floater + 7 <= 31) && (day == floater + 7)) {
							return events[i][4];
						} else if ((floater + 7 > 31) && (day == floater)) {
							return events[i][4];								
						}
					} else if ((events[i][1] == month) && (floater == day)) {
						return events[i][4];
					}
				}
			}
		}
		// monthly events are next
		for ( i = 0; i < events.length; i++) {
			if (events[i][0] == "M") {
				if ((events[i][2] == day) && (events[i][3] <= year)) {
					return events[i][4];
				}
			}
		}
		// weekly events are next
		for ( i = 0; i < events.length; i++) {
			if (events[i][0] == "W") {
				if ((events[i][3] == dayofweek)) {
					return events[i][4];
				}
			}
		}
		// one off events
		for ( i = 0; i < events.length; i++) {
			if (events[i][0] == "") {
				if ((events[i][2] == day) && (events[i][1] == month) && (events[i][3] == year)) {
					return events[i][4];
				}
			}
		}
		// default event icon
		return 3;
	}
	
	target.showevents = function (day,month,year,week,dayofweek) {
	var theevent = "";
	var floater = 0;
	
		for (var i = 0; i < events.length; i++) {
			// First we'll process recurring events (if any):
			if (events[i][0] != "") {
				// repeating event
				if (events[i][0] == "W") {
					if ((events[i][3] == dayofweek)) {
						theevent += events[i][5] + '\n';
						tempEvents=tempEvents.concat(events.slice(i,i+1));
						tempEventsNum.push(i);
					}
				}
				if (events[i][0] == "M") {
					if ((events[i][2] == day) && (events[i][3] <= year)) {
						theevent += events[i][5] + '\n';
						tempEvents=tempEvents.concat(events.slice(i,i+1));
						tempEventsNum.push(i);
					}
				}
				if ((events[i][0] == "Y") || (events[i][0] == "C") || (events[i][0] == "B") || (events[i][0] == "V") || (events[i][0] == "A")) {
					if ((events[i][2] == day) && (events[i][1] == month) && (events[i][3] <= year)) {
						theevent += events[i][5] + '\n';
						tempEvents=tempEvents.concat(events.slice(i,i+1));
						tempEventsNum.push(i);
					}
				}
				if (events[i][0] == "F") {
					if ((events[i][1] == 3) && (events[i][2] == 0) && (events[i][3] == 0) ) {
						if (easterday == day && eastermonth == month) {
							theevent += events[i][5] + '\n';
							tempEvents=tempEvents.concat(events.slice(i,i+1));
							tempEventsNum.push(i);							
						} 
					} else {
						floater = this.floatingholiday(year,events[i][1],events[i][2],events[i][3]);

						if ((month == 5) && (events[i][1] == 5) && (events[i][2] == 4) && (events[i][3] == 2)) {
							if ((floater + 7 <= 31) && (day == floater + 7)) {
								theevent += events[i][5] + '\n';
								tempEvents=tempEvents.concat(events.slice(i,i+1));
								tempEventsNum.push(i);
							} else if ((floater + 7 > 31) && (day == floater)) {
								theevent += events[i][5] + '\n';
								tempEvents=tempEvents.concat(events.slice(i,i+1));
								tempEventsNum.push(i);								
							}
						} else if ((events[i][1] == month) && (floater == day)) {
							theevent += events[i][5] + '\n';
							tempEvents=tempEvents.concat(events.slice(i,i+1));
							tempEventsNum.push(i);
						}
					}
				}
			}
			// Now we'll process any One Time events happening on the matching month, day, year:
			else if ((events[i][2] == day) && (events[i][1] == month) && (events[i][3] == year)) {
				// one-off event
				theevent += events[i][5] + '\n';
				tempEvents=tempEvents.concat(events.slice(i,i+1));
				tempEventsNum.push(i);				
			}
		}
			
		//target.bubble("tracelog","events="+theevent+"numEvents="+tempEvents.length);
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
	var firstdate = new Date(targetyr, targetmo-1, 1);	// Object Storing the first day of the current month.
	var firstday = firstdate.getDay() + 1;	// The first day (0-6) of the target month.
	var dayofmonth = 0;	// zero out our calendar day variable.

		//targetday = targetday - 1;

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
		if (n == "EDT") {
			// edit events
			this.doEditEvents();
			return;
		}
	}

	target.doSquareClick = function (sender) {
		var id, n, x, y;
		id = getSoValue(sender, "id");
		n = id.substring(6, 8);
		x = (n % 7) + 1; // find column
		y = (Math.floor(n / 7)) + 1; // find row
			
		var daycounter = 0;
		thisDate = 1;
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
			target.BUTTON_EDT.enable(true);
		}
		
		if (this.checkevents(selectionDate,monthNum,yearNum,y,x)) {
			// events in square that was clicked
			this.showevents(selectionDate,monthNum,yearNum,y,x);
		} else {
			this.eventsText.setValue("");
		}

		//target.bubble("tracelog","n="+n+", column="+x+", row="+y+", date="+selectionDate);
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
		this.saveEvents();
		kbook.autoRunRoot.exitIf(kbook.model);
		return;
	}
	
	target.doHold0 = function () {
		this.saveEvents();
		kbook.autoRunRoot.exitIf(kbook.model);
		return;
	}

	target.saveEvents = function () {
		var event;
		// save events to file
		try {
			if (FileSystem.getFileInfo(datPath)) FileSystem.deleteFile(datPath);
			stream = new Stream.File(datPath, 1);
			for (var i = 0; i < events.length; i++) {
				event=events[i][0]+';'+events[i][1]+';'+events[i][2]+';'+events[i][3]+';'+events[i][4]+';'+events[i][5];
				stream.writeLine(event);
			}		
			stream.close();
		} catch (e) {}
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
		if (eventsDlgOpen) {
			this.EVENTS_DIALOG.doCenterF();
			return;
		}
		target.bubble("tracelog","selectionDate="+selectionDate+", numEvents="+tempEvents.length);
		this.doEditEvents();
		return;
	}
	
	target.moveCursor = function (dir) {
		if (settingsDlgOpen) {
			this.SETTINGS_DIALOG.moveCursor(dir);
			return;
		}	
		if (eventsDlgOpen) {
			this.EVENTS_DIALOG.moveCursor(dir);
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
		target.bubble("tracelog","Before: selectionDate="+selectionDate);
		this.dateChanged();
		target.bubble("tracelog","After: selectionDate="+selectionDate);
		return;
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
		} else {
			//target.SETTINGS_DIALOG.week_starts.enable(true);
		}
		settingsDlgOpen = true;
		target.SETTINGS_DIALOG.show(true);
		return;
    }
	
	target.closeDlg = function () {
		settingsDlgOpen = false;
		eventsDlgOpen = false;
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
			this.labelSun.setValue(wordDays[1]);
			this.labelMon.setValue(wordDays[2]);
			this.labelTue.setValue(wordDays[3]);
			this.labelWed.setValue(wordDays[4]);
			this.labelThu.setValue(wordDays[5]);
			this.labelFri.setValue(wordDays[6]);
			this.labelSat.setValue(wordDays[0]);
			todaysDay = today.getDay();
		} else {
			this.labelSun.setValue(wordDays[0]);
			this.labelMon.setValue(wordDays[1]);
			this.labelTue.setValue(wordDays[2]);
			this.labelWed.setValue(wordDays[3]);
			this.labelThu.setValue(wordDays[4]);
			this.labelFri.setValue(wordDays[5]);
			this.labelSat.setValue(wordDays[6]);
			todaysDay = today.getDay() + 1;
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

	target.SETTINGS_DIALOG.moveCursor = function (direction) {
	switch (direction) {
		case "up" : {
			if (custSel>0) {
				custSel--;
				target.ntHandleSettingsDlg();
			}
			break
		}
		case "down" : {
			if (custSel<2) {
				custSel++;
				target.ntHandleSettingsDlg();
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

	target.SETTINGS_DIALOG.settingsType = function (t) {
		return;
	}
	
	// events popup stuff
    target.doEditEvents = function () {
		//target.bubble("tracelog","Number of events="+tempEvents.length);
		// reset labels
		maxEventNum=tempEvents.length+1; // need to add +1 if a blank event can be added
		maxEventDay=numbDays;
		
		if (tempEvents.length==0) {
			// prepare textboxes for new event
			currentTempEvent=0;
			target.EVENTS_DIALOG.eventNum.setValue("1");
			target.setVariable("event_num","1");
			target.EVENTS_DIALOG.eventType.setValue("1");
			target.setVariable("event_type","1");
			target.EVENTS_DIALOG.eventTypeText.setValue("One-off");
			target.EVENTS_DIALOG.eventMonth.setValue(monthNum);
			target.setVariable("event_month",monthNum);
			target.EVENTS_DIALOG.eventDay.setValue(selectionDate);
			target.setVariable("event_day",selectionDate);
			target.EVENTS_DIALOG.eventYear.setValue(yearNum);
			target.setVariable("event_year",yearNum);
			target.EVENTS_DIALOG.eventDescription.setValue("Temporary description");
			target.setVariable("event_description","Temporary description");
			target.EVENTS_DIALOG.eventDayText.setValue("Date:");
			target.EVENTS_DIALOG.eventYearText.setValue("Year:");	
			target.EVENTS_DIALOG.weekDay.show(false);
			target.EVENTS_DIALOG.cardinalDay.show(false);
			target.EVENTS_DIALOG.btn_Delete.enable(false);
		} else {
			// put first event information into textboxes
			currentTempEvent=0;
			target.EVENTS_DIALOG.eventNum.setValue("1");		
			target.setVariable("event_num","1");
			target.EVENTS_DIALOG.loadTempEvent();
			target.EVENTS_DIALOG.btn_Delete.enable(true);
		}

		if (hasNumericButtons) {
			custSel = 0;
			prevSel = 0;
			this.ntHandleEventsDlg();
		}
		
		eventsDlgOpen = true;
		target.EVENTS_DIALOG.show(true);
		return;
    }

	target.EVENTS_DIALOG.loadTempEvent = function () {
			//target.bubble("tracelog","currentTempEvent="+currentTempEvent);
			target.EVENTS_DIALOG.eventDayText.setValue("Date:");
			target.EVENTS_DIALOG.eventYearText.setValue("Year:");	
			target.EVENTS_DIALOG.weekDay.show(false);
			target.EVENTS_DIALOG.cardinalDay.show(false);
			target.EVENTS_DIALOG.eventMonth.show(true);
			target.EVENTS_DIALOG.eventDay.show(true);
			if (tempEvents[currentTempEvent][0]=="") {
				target.EVENTS_DIALOG.eventType.setValue("1");
				target.setVariable("event_type","1");
				target.EVENTS_DIALOG.eventTypeText.setValue("One-off");
			} else if (tempEvents[currentTempEvent][0]=="Y") {
				target.EVENTS_DIALOG.eventType.setValue("2");
				target.setVariable("event_type","2");
				target.EVENTS_DIALOG.eventTypeText.setValue("Yearly");									
			} else if (tempEvents[currentTempEvent][0]=="M") {
				target.EVENTS_DIALOG.eventType.setValue("3");
				target.setVariable("event_type","3");
				target.EVENTS_DIALOG.eventTypeText.setValue("Monthly");
				// monthly event does not require month label
				target.EVENTS_DIALOG.eventMonth.show(false);
			} else if (tempEvents[currentTempEvent][0]=="W") {
				target.EVENTS_DIALOG.eventType.setValue("4");
				target.setVariable("event_type","4");
				target.EVENTS_DIALOG.eventTypeText.setValue("Weekly");
			} else if (tempEvents[currentTempEvent][0]=="F") {
				target.EVENTS_DIALOG.eventType.setValue("5");
				target.setVariable("event_type","5");
				target.EVENTS_DIALOG.eventTypeText.setValue("Floating");	
				// floating event requires different labels
				target.EVENTS_DIALOG.eventDayText.setValue("Cardinal:");
				target.EVENTS_DIALOG.eventYearText.setValue("Weekday:");
				target.EVENTS_DIALOG.weekDay.show(true);
				if (tempEvents[currentTempEvent][3]=="0") {
					target.EVENTS_DIALOG.weekDay.setValue("0");
				} else if (tempEvents[currentTempEvent][3]=="1") {
					target.EVENTS_DIALOG.weekDay.setValue(wordDays[0]);				
				} else if (tempEvents[currentTempEvent][3]=="2") {
					target.EVENTS_DIALOG.weekDay.setValue(wordDays[1]);
				} else if (tempEvents[currentTempEvent][3]=="3") {
					target.EVENTS_DIALOG.weekDay.setValue(wordDays[2]);
				} else if (tempEvents[currentTempEvent][3]=="4") {
					target.EVENTS_DIALOG.weekDay.setValue(wordDays[3]);
				} else if (tempEvents[currentTempEvent][3]=="5") {
					target.EVENTS_DIALOG.weekDay.setValue(wordDays[4]);
				} else if (tempEvents[currentTempEvent][3]=="6") {
					target.EVENTS_DIALOG.weekDay.setValue(wordDays[5]);
				} else if (tempEvents[currentTempEvent][3]=="7") {
					target.EVENTS_DIALOG.weekDay.setValue(wordDays[6]);
				}
				target.EVENTS_DIALOG.cardinalDay.show(true);
				if (tempEvents[currentTempEvent][2]=="0") {
					target.EVENTS_DIALOG.cardinalDay.setValue("0");
				} else if (tempEvents[currentTempEvent][2]=="1") {
					target.EVENTS_DIALOG.cardinalDay.setValue(cardinals[0]);				
				} else if (tempEvents[currentTempEvent][2]=="2") {
					target.EVENTS_DIALOG.cardinalDay.setValue(cardinals[1]);
				} else if (tempEvents[currentTempEvent][2]=="3") {
					target.EVENTS_DIALOG.cardinalDay.setValue(cardinals[2]);
				} else if (tempEvents[currentTempEvent][2]=="4") {
					target.EVENTS_DIALOG.cardinalDay.setValue(cardinals[3]);
				} else if (tempEvents[currentTempEvent][2]=="5") {
					target.EVENTS_DIALOG.cardinalDay.setValue(cardinals[4]);
				}
			}
			target.EVENTS_DIALOG.eventMonth.setValue(tempEvents[currentTempEvent][1]);
			target.setVariable("event_month",tempEvents[currentTempEvent][1]);
			target.EVENTS_DIALOG.eventDay.setValue(tempEvents[currentTempEvent][2]);
			target.setVariable("event_day",tempEvents[currentTempEvent][2]);
			target.EVENTS_DIALOG.eventYear.setValue(tempEvents[currentTempEvent][3]);
			target.setVariable("event_year",tempEvents[currentTempEvent][3]);
			target.EVENTS_DIALOG.eventIcon.setValue(tempEvents[currentTempEvent][4]);
			target.setVariable("event_icon",tempEvents[currentTempEvent][4]);
			this.square42.u = tempEvents[currentTempEvent][4];
			target.EVENTS_DIALOG.eventDescription.setValue(tempEvents[currentTempEvent][5]);
			target.setVariable("event_description",tempEvents[currentTempEvent][5]);
			return;
	}
	
	target.EVENTS_DIALOG.doPlusMinus = function (sender) {
	    var senderID;
	    senderID = getSoValue(sender,"id");
		target.EVENTS_DIALOG.doPlusMinusF(senderID);
		return;
	}
	
	target.EVENTS_DIALOG.doPlusMinusF = function (senderID) {
		var step, eventNum, eventType, eventMonth, eventDay, eventYear;
		step = ( senderID.lastIndexOf("+") != -1) ? 1 : -1;
		senderID = senderID.slice(0,senderID.length-1);
	    eventNum = parseInt(target.getVariable("event_num"));
	    eventType = parseInt(target.getVariable("event_type"));
	    eventMonth = parseInt(target.getVariable("event_month"));
	    eventDay = parseInt(target.getVariable("event_day"));
	    eventYear = parseInt(target.getVariable("event_year"));
		eventIcon = parseInt(target.getVariable("event_icon"));
		
	    switch (senderID) {
			case "eventNum" :
			{
				if (eventNum<=maxEventNum-step && eventNum>0-step) {
					eventNum = eventNum+step;
				}
				target.setVariable("event_num",eventNum);
				target.EVENTS_DIALOG.eventNum.setValue(eventNum);
				currentTempEvent=eventNum-1;
				if (currentTempEvent==tempEventsNum.length) {
					// new event
					target.EVENTS_DIALOG.eventNum.setValue(eventNum);
					target.setVariable("event_num",eventNum);
					target.EVENTS_DIALOG.eventType.setValue("1");
					target.setVariable("event_type","1");
					target.EVENTS_DIALOG.eventTypeText.setValue("One-off");
					target.EVENTS_DIALOG.eventMonth.setValue(monthNum);
					target.setVariable("event_month",monthNum);
					target.EVENTS_DIALOG.eventDay.setValue(selectionDate);
					target.setVariable("event_day",selectionDate);
					target.EVENTS_DIALOG.eventYear.setValue(yearNum);
					target.setVariable("event_year",yearNum);
					target.EVENTS_DIALOG.eventIcon.setValue("2");
					target.setVariable("event_icon","2");
					this.square42.u = 2;
					target.EVENTS_DIALOG.eventDescription.setValue("Temporary description");
					target.setVariable("event_description","Temporary description");
					target.EVENTS_DIALOG.eventDayText.setValue("Date:");
					target.EVENTS_DIALOG.eventYearText.setValue("Year:");	
					target.EVENTS_DIALOG.weekDay.show(false);
					target.EVENTS_DIALOG.eventMonth.show(true);
					target.EVENTS_DIALOG.eventDay.show(true);
					target.EVENTS_DIALOG.cardinalDay.show(false);
					target.EVENTS_DIALOG.btn_Delete.enable(false);
			} else {
					// load existing event
					target.EVENTS_DIALOG.loadTempEvent();
					target.EVENTS_DIALOG.btn_Delete.enable(true);
				}
				break;
			}
			case "eventType" :
			{
				if (eventType<=maxEventType-step && eventType>0-step) {
					eventType = eventType+step;
				}
				target.setVariable("event_type",eventType);
				target.EVENTS_DIALOG.eventType.setValue(eventType);
				if (eventType=="1") target.EVENTS_DIALOG.eventTypeText.setValue("One-off");
				if (eventType=="2") target.EVENTS_DIALOG.eventTypeText.setValue("Yearly");
				if (eventType=="3") target.EVENTS_DIALOG.eventTypeText.setValue("Monthly");
				if (eventType=="4") target.EVENTS_DIALOG.eventTypeText.setValue("Weekly");
				if (eventType=="5") target.EVENTS_DIALOG.eventTypeText.setValue("Floating");
				// change labels if necessary
				if (eventType=="3") {
					// monthly event (therefore don't need the month label)
					target.EVENTS_DIALOG.eventMonth.show(false);
					eventMonth=0;
					target.setVariable("event_month",eventMonth);
					target.EVENTS_DIALOG.eventDayText.setValue("Date:");
					target.EVENTS_DIALOG.eventYearText.setValue("Year:");	
					target.EVENTS_DIALOG.weekDay.show(false);
					target.EVENTS_DIALOG.cardinalDay.show(false);
					target.EVENTS_DIALOG.eventDay.show(true);
					if (currentTempEvent==tempEventsNum.length) {
						// new event
						eventYear=todaysYear;
						eventDay=todaysDate;
					} else {
						eventYear=tempEvents[currentTempEvent][3];
						eventDay=tempEvents[currentTempEvent][2];
					}
					if (eventYear<1900) eventYear=todaysYear; // if original event was a floating event
					target.setVariable("event_year",eventYear);
					target.EVENTS_DIALOG.eventYear.setValue(eventYear);
					if (eventDay==0) eventDay=1; // if original event was a floating event
					target.setVariable("event_day",eventDay);
					target.EVENTS_DIALOG.eventDay.setValue(eventDay);					
				} else if (eventType=="4") {
					// weekly event (therefore don't need the month or date, and yearly becomes week day)
					target.EVENTS_DIALOG.eventMonth.show(false);
					eventMonth=0;
					target.setVariable("event_month",eventMonth);
					target.EVENTS_DIALOG.eventDay.show(false);
					target.EVENTS_DIALOG.cardinalDay.show(false);
					eventDay=0;
					target.setVariable("event_day",eventDay);
					target.EVENTS_DIALOG.eventYearText.setValue("Weekday:");
					target.EVENTS_DIALOG.weekDay.show(true);
					if (currentTempEvent==tempEventsNum.length) {
						// new event
						eventYear=1;
					} else {
						eventYear=tempEvents[currentTempEvent][3];
					}
					if (eventYear>7) eventYear=1;
					target.setVariable("event_year",eventYear);
					if (eventYear==0) {
						target.EVENTS_DIALOG.weekDay.setValue("0");
					} else if (eventYear==1) {
						target.EVENTS_DIALOG.weekDay.setValue(wordDays[0]);				
					} else if (eventYear==2) {
						target.EVENTS_DIALOG.weekDay.setValue(wordDays[1]);
					} else if (eventYear==3) {
						target.EVENTS_DIALOG.weekDay.setValue(wordDays[2]);
					} else if (eventYear==4) {
						target.EVENTS_DIALOG.weekDay.setValue(wordDays[3]);
					} else if (eventYear==5) {
						target.EVENTS_DIALOG.weekDay.setValue(wordDays[4]);
					} else if (eventYear==6) {
						target.EVENTS_DIALOG.weekDay.setValue(wordDays[5]);
					} else if (eventYear==7) {
						target.EVENTS_DIALOG.weekDay.setValue(wordDays[6]);
					}
				} else if (eventType=="5") {
					// floating event (therefore date becomes cardinal and yearly becomes week day)
					target.EVENTS_DIALOG.eventDayText.setValue("Cardinal:");
					target.EVENTS_DIALOG.eventYearText.setValue("Weekday:");
					target.EVENTS_DIALOG.weekDay.show(true);
					target.EVENTS_DIALOG.cardinalDay.show(true);
					target.EVENTS_DIALOG.eventMonth.show(true);
					target.EVENTS_DIALOG.eventDay.show(true);
					if (currentTempEvent==tempEventsNum.length) {
						// new event
						eventYear=1;
						eventDay=1;
					} else {
						eventYear=tempEvents[currentTempEvent][3];
						eventDay=tempEvents[currentTempEvent][2];
						if (eventDay>5) eventDay=1;
					}
					if (eventYear>7) eventYear=1;
					target.setVariable("event_year",eventYear);
					if (eventYear==0) {
						target.EVENTS_DIALOG.weekDay.setValue("0");
					} else if (eventYear==1) {
						target.EVENTS_DIALOG.weekDay.setValue(wordDays[0]);				
					} else if (eventYear==2) {
						target.EVENTS_DIALOG.weekDay.setValue(wordDays[1]);
					} else if (eventYear==3) {
						target.EVENTS_DIALOG.weekDay.setValue(wordDays[2]);
					} else if (eventYear==4) {
						target.EVENTS_DIALOG.weekDay.setValue(wordDays[3]);
					} else if (eventYear==5) {
						target.EVENTS_DIALOG.weekDay.setValue(wordDays[4]);
					} else if (eventYear==6) {
						target.EVENTS_DIALOG.weekDay.setValue(wordDays[5]);
					} else if (eventYear==7) {
						target.EVENTS_DIALOG.weekDay.setValue(wordDays[6]);
					}
					target.setVariable("event_day",eventDay);
					target.EVENTS_DIALOG.eventDay.setValue(eventDay);					
					if (eventDay=="0") {
						target.EVENTS_DIALOG.cardinalDay.setValue("0");
					} else if (eventDay=="1") {
						target.EVENTS_DIALOG.cardinalDay.setValue(cardinals[0]);				
					} else if (eventDay=="2") {
						target.EVENTS_DIALOG.cardinalDay.setValue(cardinals[1]);
					} else if (eventDay=="3") {
						target.EVENTS_DIALOG.cardinalDay.setValue(cardinals[2]);
					} else if (eventDay=="4") {
						target.EVENTS_DIALOG.cardinalDay.setValue(cardinals[3]);
					} else if (eventDay=="5") {
						target.EVENTS_DIALOG.cardinalDay.setValue(cardinals[4]);
					}
				} else {
					target.EVENTS_DIALOG.eventDayText.setValue("Date:");
					target.EVENTS_DIALOG.eventYearText.setValue("Year:");	
					target.EVENTS_DIALOG.weekDay.show(false);
					target.EVENTS_DIALOG.cardinalDay.show(false);
					target.EVENTS_DIALOG.eventMonth.show(true);
					target.EVENTS_DIALOG.eventDay.show(true);
					if (currentTempEvent==tempEventsNum.length) {
						// new event
						eventYear=todaysYear;
						eventDay=todaysDate;
					} else {
						eventYear=tempEvents[currentTempEvent][3];
						eventDay=tempEvents[currentTempEvent][2];
					}
					if (eventYear<1900) eventYear=todaysYear; // if original event was a floating event
					target.setVariable("event_year",eventYear);
					target.EVENTS_DIALOG.eventYear.setValue(eventYear);
					if (eventDay==0) eventDay=1; // if original event was a floating event
					target.setVariable("event_day",eventDay);
					target.EVENTS_DIALOG.eventDay.setValue(eventDay);
				}
				break;
			}
			case "eventMonth" :
			{
				if ((eventType==3) || (eventType==4)) break;
				if (eventMonth<=maxEventMonth-step && eventMonth>0-step) {
					eventMonth = eventMonth+step;
				}
				target.setVariable("event_month",eventMonth);
				target.EVENTS_DIALOG.eventMonth.setValue(eventMonth);
				if ((eventMonth==1) || (eventMonth==3) || (eventMonth==5) || (eventMonth==7) || (eventMonth==8) || (eventMonth==10) || (eventMonth==12)) maxEventDay=31;
				if ((eventMonth==4) || (eventMonth==6) || (eventMonth==9) || (eventMonth==11)) maxEventDay=30;
				if (eventMonth==2) maxEventDay=28; //problem for leap years!
				if (eventDay>maxEventDay) {
					eventDay=maxEventDay;
					target.setVariable("event_day",eventDay);
					target.EVENTS_DIALOG.eventDay.setValue(eventDay);						
				}
				break;
			}
			case "eventDay" :
			{
				if (eventType==4) break;
				if (eventType==5) {
					if (eventDay<=5-step && eventDay>=0) {
						eventDay = eventDay+step;
						if (eventDay<1) eventDay=1;
					}
				}	else {			
					if (eventDay<=maxEventDay-step && eventDay>=0) {
						eventDay = eventDay+step;
						if (eventDay<1) eventDay=1;
					}
				}
				target.setVariable("event_day",eventDay);
				if (eventDay==0) {
					target.EVENTS_DIALOG.eventDay.setValue("0");
				} else {
					target.EVENTS_DIALOG.eventDay.setValue(eventDay);
				}
				if (eventType==5) {
					if (eventDay=="0") {
						target.EVENTS_DIALOG.cardinalDay.setValue("0");
					} else if (eventDay=="1") {
						target.EVENTS_DIALOG.cardinalDay.setValue(cardinals[0]);				
					} else if (eventDay=="2") {
						target.EVENTS_DIALOG.cardinalDay.setValue(cardinals[1]);
					} else if (eventDay=="3") {
						target.EVENTS_DIALOG.cardinalDay.setValue(cardinals[2]);
					} else if (eventDay=="4") {
						target.EVENTS_DIALOG.cardinalDay.setValue(cardinals[3]);
					} else if (eventDay=="5") {
						target.EVENTS_DIALOG.cardinalDay.setValue(cardinals[4]);
					}
				}
				break;
			}
			case "eventYear" :
			{
				if ((eventType==4) || (eventType==5)) {
					if (eventYear<=7-step && eventYear>=0) {
						eventYear = eventYear+step;
						if (eventYear<1) eventYear=1;
					}
				}	else {
					if (eventYear<=maxEventYear-step && eventYear>=1900) {
						eventYear = eventYear+step;
						if (eventYear<1900) eventYear=1900;
					}
				}
				target.setVariable("event_year",eventYear);
				if (eventYear==0) {
					target.EVENTS_DIALOG.eventYear.setValue("0");
				} else {
					target.EVENTS_DIALOG.eventYear.setValue(eventYear);
				}
				if ((eventType==4) || (eventType==5)) {
					if (eventYear==0) {
						target.EVENTS_DIALOG.weekDay.setValue("0");
					} else if (eventYear==1) {
						target.EVENTS_DIALOG.weekDay.setValue(wordDays[0]);				
					} else if (eventYear==2) {
						target.EVENTS_DIALOG.weekDay.setValue(wordDays[1]);
					} else if (eventYear==3) {
						target.EVENTS_DIALOG.weekDay.setValue(wordDays[2]);
					} else if (eventYear==4) {
						target.EVENTS_DIALOG.weekDay.setValue(wordDays[3]);
					} else if (eventYear==5) {
						target.EVENTS_DIALOG.weekDay.setValue(wordDays[4]);
					} else if (eventYear==6) {
						target.EVENTS_DIALOG.weekDay.setValue(wordDays[5]);
					} else if (eventYear==7) {
						target.EVENTS_DIALOG.weekDay.setValue(wordDays[6]);
					}
				}
				break;
			}
			case "eventIcon" :
			{
				if (eventIcon<=maxEventIcon && eventIcon>=3) {
					eventIcon = eventIcon+step;
				}
				if (eventIcon<3) eventIcon=3;
				if (eventIcon>maxEventIcon) eventIcon=maxEventIcon;
				target.setVariable("event_icon",eventIcon);
				this.square42.u=eventIcon;
				break;
			}
	   }
	}
	
	target.ntHandleEventsDlg = function () {
		// work out direction of movement and check if item is available
		eventType = parseInt(target.getVariable("event_type"));
		target.bubble("tracelog","Before: eventType="+eventType+", prevSel="+prevSel+", custSel="+custSel);
		if ((eventType=="3") && (custSel==3)) {
			// no month item
			if (prevSel==2) custSel=4;
			if (prevSel==4) custSel=2;
		}
		if ((eventType=="4") && ((custSel==4) || (custSel==3))) {
			// no month or date item
			if (prevSel==2) custSel=5;
			if (prevSel==5) custSel=2;
		}
		if (custSel==1) {
			if (currentTempEvent==tempEventsNum.length) {
				// new event, so skip delete button
				if (prevSel==0) custSel=2;
				if (prevSel==2) custSel=0;
			}
		}
		target.bubble("tracelog","After: eventType="+eventType+", prevSel="+prevSel+", custSel="+custSel);
		if (custSel === 0) {
			target.EVENTS_DIALOG.eventNum.enable(true);
			target.EVENTS_DIALOG.eventTypeText.enable(false);
			target.EVENTS_DIALOG.eventMonth.enable(false);
			target.EVENTS_DIALOG.eventDay.enable(false);
			target.EVENTS_DIALOG.cardinalDay.enable(false);
			target.EVENTS_DIALOG.eventYear.enable(false);
			target.EVENTS_DIALOG.weekDay.enable(false);
			target.EVENTS_DIALOG.eventIcon.enable(false);
			target.EVENTS_DIALOG.eventDescription.enable(false);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Ok);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Cancel);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Delete);
		}
		if (custSel === 1) {
			target.EVENTS_DIALOG.eventNum.enable(false);
			target.EVENTS_DIALOG.eventTypeText.enable(false);
			target.EVENTS_DIALOG.eventMonth.enable(false);
			target.EVENTS_DIALOG.eventDay.enable(false);
			target.EVENTS_DIALOG.cardinalDay.enable(false);
			target.EVENTS_DIALOG.eventYear.enable(false);
			target.EVENTS_DIALOG.weekDay.enable(false);
			target.EVENTS_DIALOG.eventIcon.enable(false);
			target.EVENTS_DIALOG.eventDescription.enable(false);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Ok);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Cancel);
			mouseEnter.call(target.EVENTS_DIALOG.btn_Delete);
		}
		if (custSel === 2) {
			target.EVENTS_DIALOG.eventNum.enable(false);
			target.EVENTS_DIALOG.eventTypeText.enable(true);
			target.EVENTS_DIALOG.eventMonth.enable(false);
			target.EVENTS_DIALOG.eventDay.enable(false);
			target.EVENTS_DIALOG.cardinalDay.enable(false);
			target.EVENTS_DIALOG.eventYear.enable(false);
			target.EVENTS_DIALOG.weekDay.enable(false);
			target.EVENTS_DIALOG.eventIcon.enable(false);
			target.EVENTS_DIALOG.eventDescription.enable(false);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Ok);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Cancel);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Delete);
		}
		if (custSel === 3) {
			target.EVENTS_DIALOG.eventNum.enable(false);
			target.EVENTS_DIALOG.eventTypeText.enable(false);
			target.EVENTS_DIALOG.eventMonth.enable(true);
			target.EVENTS_DIALOG.eventDay.enable(false);
			target.EVENTS_DIALOG.cardinalDay.enable(false);
			target.EVENTS_DIALOG.eventYear.enable(false);
			target.EVENTS_DIALOG.weekDay.enable(false);
			target.EVENTS_DIALOG.eventIcon.enable(false);
			target.EVENTS_DIALOG.eventDescription.enable(false);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Ok);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Cancel);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Delete);
		}
		if (custSel === 4) {
			target.EVENTS_DIALOG.eventNum.enable(false);
			target.EVENTS_DIALOG.eventTypeText.enable(false);
			target.EVENTS_DIALOG.eventMonth.enable(false);
			target.EVENTS_DIALOG.eventDay.enable(true);
			target.EVENTS_DIALOG.cardinalDay.enable(true);
			target.EVENTS_DIALOG.eventYear.enable(false);
			target.EVENTS_DIALOG.weekDay.enable(false);
			target.EVENTS_DIALOG.eventIcon.enable(false);
			target.EVENTS_DIALOG.eventDescription.enable(false);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Ok);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Cancel);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Delete);
		}
		if (custSel === 5) {
			target.EVENTS_DIALOG.eventNum.enable(false);
			target.EVENTS_DIALOG.eventTypeText.enable(false);
			target.EVENTS_DIALOG.eventMonth.enable(false);
			target.EVENTS_DIALOG.eventDay.enable(false);
			target.EVENTS_DIALOG.cardinalDay.enable(false);
			target.EVENTS_DIALOG.eventYear.enable(true);
			target.EVENTS_DIALOG.weekDay.enable(true);
			target.EVENTS_DIALOG.eventIcon.enable(false);
			target.EVENTS_DIALOG.eventDescription.enable(false);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Ok);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Cancel);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Delete);
		}
		if (custSel === 6) {
			target.EVENTS_DIALOG.eventNum.enable(false);
			target.EVENTS_DIALOG.eventTypeText.enable(false);
			target.EVENTS_DIALOG.eventMonth.enable(false);
			target.EVENTS_DIALOG.eventDay.enable(false);
			target.EVENTS_DIALOG.cardinalDay.enable(false);
			target.EVENTS_DIALOG.eventYear.enable(false);
			target.EVENTS_DIALOG.weekDay.enable(false);
			target.EVENTS_DIALOG.eventIcon.enable(true);
			target.EVENTS_DIALOG.eventDescription.enable(false);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Ok);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Cancel);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Delete);
		}
		if (custSel === 7) {
			target.EVENTS_DIALOG.eventNum.enable(false);
			target.EVENTS_DIALOG.eventTypeText.enable(false);
			target.EVENTS_DIALOG.eventMonth.enable(false);
			target.EVENTS_DIALOG.eventDay.enable(false);
			target.EVENTS_DIALOG.cardinalDay.enable(false);
			target.EVENTS_DIALOG.eventYear.enable(false);
			target.EVENTS_DIALOG.weekDay.enable(false);
			target.EVENTS_DIALOG.eventIcon.enable(false);
			target.EVENTS_DIALOG.eventDescription.enable(true);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Ok);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Cancel);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Delete);
		}
		if (custSel === 8) {
			target.EVENTS_DIALOG.eventNum.enable(false);
			target.EVENTS_DIALOG.eventTypeText.enable(false);
			target.EVENTS_DIALOG.eventMonth.enable(false);
			target.EVENTS_DIALOG.eventDay.enable(false);
			target.EVENTS_DIALOG.cardinalDay.enable(false);
			target.EVENTS_DIALOG.eventYear.enable(false);
			target.EVENTS_DIALOG.weekDay.enable(false);
			target.EVENTS_DIALOG.eventIcon.enable(false);
			target.EVENTS_DIALOG.eventDescription.enable(false);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Cancel);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Delete);
			mouseEnter.call(target.EVENTS_DIALOG.btn_Ok);
		}	
		if (custSel === 9) {
			target.EVENTS_DIALOG.eventNum.enable(false);
			target.EVENTS_DIALOG.eventTypeText.enable(false);
			target.EVENTS_DIALOG.eventMonth.enable(false);
			target.EVENTS_DIALOG.eventDay.enable(false);
			target.EVENTS_DIALOG.cardinalDay.enable(false);
			target.EVENTS_DIALOG.eventYear.enable(false);
			target.EVENTS_DIALOG.weekDay.enable(false);
			target.EVENTS_DIALOG.eventIcon.enable(false);
			target.EVENTS_DIALOG.eventDescription.enable(false);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Ok);
			mouseLeave.call(target.EVENTS_DIALOG.btn_Delete);
			mouseEnter.call(target.EVENTS_DIALOG.btn_Cancel);
		}
		return;
	}

	target.EVENTS_DIALOG.moveCursor = function (direction) {
	switch (direction) {
		case "up" : {
			if (custSel>0) {
				prevSel=custSel;
				custSel--;
				target.ntHandleEventsDlg();
			}
			break
		}
		case "down" : {
			if (custSel<9) {
				prevSel=custSel;
				custSel++;
				target.ntHandleEventsDlg();
			}
			break
		}
		case "left" : {
			if (custSel==0) target.EVENTS_DIALOG.doPlusMinusF("eventNum-");
			if (custSel==2) target.EVENTS_DIALOG.doPlusMinusF("eventType-");
			if (custSel==3) target.EVENTS_DIALOG.doPlusMinusF("eventMonth-");
			if (custSel==4) target.EVENTS_DIALOG.doPlusMinusF("eventDay-");
			if (custSel==5) target.EVENTS_DIALOG.doPlusMinusF("eventYear-");
			if (custSel==6) target.EVENTS_DIALOG.doPlusMinusF("eventIcon-");
			break
		}		
		case "right" : {
			if (custSel==0) target.EVENTS_DIALOG.doPlusMinusF("eventNum+");
			if (custSel==2) target.EVENTS_DIALOG.doPlusMinusF("eventType+");
			if (custSel==3) target.EVENTS_DIALOG.doPlusMinusF("eventMonth+");
			if (custSel==4) target.EVENTS_DIALOG.doPlusMinusF("eventDay+");
			if (custSel==5) target.EVENTS_DIALOG.doPlusMinusF("eventYear+");
			if (custSel==6) target.EVENTS_DIALOG.doPlusMinusF("eventIcon+");
			break
		}
		return;
	  }	
	}
	
	target.EVENTS_DIALOG.doCenterF = function () {
		if (custSel === 1) target.EVENTS_DIALOG.btn_Delete.click();
		if (custSel === 8) target.EVENTS_DIALOG.btn_Ok.click();
		if (custSel === 9) target.EVENTS_DIALOG.btn_Cancel.click();
		return;
	}

	target.doUpdateEvent = function () {
		var eventNum, eventType, eventTypeCode, eventMonth, eventDay, eventYear, eventDescription;
		eventsDlgOpen = false;
		
		// create new array item from stored variables
		eventType = parseInt(target.getVariable("event_type"));
		if (eventType=="1") eventTypeCode="";
		if (eventType=="2") eventTypeCode="Y";
		if (eventType=="3") eventTypeCode="M";
		if (eventType=="4") eventTypeCode="W";
		if (eventType=="5") eventTypeCode="F";
		eventMonth = target.getVariable("event_month");
		eventDay = target.getVariable("event_day");
		eventYear = target.getVariable("event_year");
		eventIcon = target.getVariable("event_icon");
		eventDescription = target.getVariable("event_description");
		
		if (currentTempEvent==tempEventsNum.length) {
			// new event
			target.bubble("tracelog","Add event");
			var addTo=[eventTypeCode, eventMonth, eventDay, eventYear, eventIcon, eventDescription];
			events.push(addTo);
		} else {
			target.bubble("tracelog","Update event "+tempEventsNum[currentTempEvent]);
			var replaceWith=[eventTypeCode, eventMonth, eventDay, eventYear, eventIcon, eventDescription];
			events.splice(tempEventsNum[currentTempEvent],1,replaceWith);
		}
		this.createCalendar();
		if (this.checkevents(selectionDate,monthNum,yearNum,y,x)) {
			this.showevents(selectionDate,monthNum,yearNum,y,x);
		} else {
			this.eventsText.setValue("");
		}		
		return;
	}

	target.doDeleteEvent = function () {
		//target.bubble("tracelog","Delete event "+tempEventsNum[currentTempEvent]);
		eventsDlgOpen = false;
		events.splice(tempEventsNum[currentTempEvent], 1);
		this.createCalendar();
		if (this.checkevents(selectionDate,monthNum,yearNum,y,x)) {
			this.showevents(selectionDate,monthNum,yearNum,y,x);
		} else {
			this.eventsText.setValue("");
		}
		return;
	}
};
tmp();
tmp = undefined;