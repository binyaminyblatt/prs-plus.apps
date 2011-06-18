// Description: js functions for TestApp
// History: 
//      2010-09-16 Mark Nord - initial 

// GLOBAL VARIABLES

// END GLOBAL VARIABLES */


var getTime, newEvent, pageScroll, getSoValue, setSoValue, newSpite;
var c0t = 10;
var c0l = 1;
var uD = undefined;
var timer;
var counter = 1000;
var flag = 0;

target.getTimer = function () {
			if (typeof timer == "undefined") {
				timer = new Timer();
				timer.target = target;
			}
			return timer;
}

target.init = function () {
	this.bubble("tracelog","target.init.enter");
	if (kbook.autoRunRoot.path == undefined) { 
	    try {
		getSoValue = _Core.system.getSoValue;
		setSoValue = prsp.setSoValue;
	 } catch(ignore) {this.tracelog("Fehler bei Core im Sim")}	
	} else { 
	 try { getSoValue = kbook.autoRunRoot.getSoValue;
	       setSoValue = kbook.autoRunRoot.setSoValue;
	    // Core = kbook.autoRunRoot.params.Core;  // this fails
	 } catch(e) {this.tracelog("Fehler bei gSoV = kb.aRR.gSoV")}	
	}
	try{
	getTime = prsp.compile('',"var t = new Date();var tL = t.toLocaleTimeString();var show = tL.substring(0, tL.lastIndexOf(':'));"+
	"/*target.TestLabel.text = show;*/ return show;");	
	}catch(ignor){this.tracelog("Fehler bei compile");}

	try{
	pageScroll = getSoValue(this.logWin, 'scrollPage');
	}catch(ignor){this.tracelog("Fehler bei init pagescroll");}
	
	try{       
        newEvent = prsp.compile("param", "return new Event(param)");
        }catch(ignor){this.tracelog("Fehler bei init newEvent");}
	//	this.bubble("tracelog","newEvent"+newEvent);

	this.TestLabel.setValue('started');
	
	this.showTime(getTime()); 

	this.gridCursor.show(true); 
	this.bubble("tracelog","target.init.exit");
}

target.tracelog = function(msg) {
	this.logWin.setValue(this.logWin.getValue().concat(String.fromCharCode(10)).concat(msg));
		    try {
		       pageScroll.call(this.logWin, true, 1);
			    }
		    catch (e) {
    	    //   this.myLog('Err:' + e);
	    	}
}

target.exitApp = function() {
    var ev, func, menuBar;
    timer.close();
    delete timer;
    
    try{
	ev = newEvent(2048);
	menuBar = this.findContent("MENUBAR"); // menuBar had to be defined as id="MENUBAR" in XML!!
	func = getSoValue(menuBar,"endLoop");
	func.call(menuBar,ev);	 
    }catch(ignor){this.tracelog("Fehler bei endLoop in exitApp ");}
    kbook.autoRunRoot.exitIf(kbook.model);
};

/* target.container.container.doExitQuit = function(sender) {
 this.bubble("tracelog","quit click");
 target.exitApp();
} */
target.container.container.doExitQuit = target.exitApp;


target.doMenuF = function (obj) { /* Test-Function */
    try {
	//this.bubble("tracelog","appPath"+System.applyEnvironment("[applicationPath]"));
	//this.bubble("tracelog","myPath"+System.applyEnvironment("[myPath]"));
	//this.bubble("tracelog",""+Core.debug.dumpToString(Core.system.getSoValue(this,'id'),"this.",2));
	//this.bubble("tracelog",""+Core.debug.dumpToString(this.container.container.container.container.container.NUM_BUTTON1.mouseContextual,"this.",2));
	//this.bubble("tracelog","TRACER.scrollBy: "+Core.debug.dumpToString(this.container.container.container.container.container.TRACER.scrollBy,"",2));
	//this.bubble("tracelog","testoutput ");
	//this.bubble("tracelog","prsp.setSoValue "+Core.debug.dumpToString(prsp.setSoValue,"prsp.",2));
	//this.bubble("tracelog","Core.system.cloneObj "+Core.debug.dumpToString(Core.system.cloneObj,"Core.system.cloneObj.",1));
	//this.bubble("tracelog","Fsk.Error.native.code "+Core.debug.dumpToString(Fsk.Error.base,"Fsk.Error.native.code",2));
	//var base = Core.system.getSoValue(this,"title");
	//this.bubble("tracelog","this.name="+base);

	//var fnPageScroll = Core.system.getSoValue(this.container.container.container.container.container.TRACER, 'enabled');
	//this.bubble("tracelog","var "+Core.debug.dumpToString(fnPageScroll,"var",2));
	
	//var xyz = Core.system.getSoValue(this.container.container.container.container.container.TRACER, 'container');
	//var xyz = Core.system.getSoValue(this, 'root.container.root');
	//var xyz = this.root.container.root;
	//this.bubble("tracelog","var ="+xyz);
	//this.bubble("tracelog","dump: "+Core.debug.dumpToString(xyz,"var",2));
	
	//this.bubble("tracelog",""+Core.debug.dumpToString(obj,"this.",2));
	//this.bubble("tracelog",Core.debug..dumpToString(Core));
	//this.bubble("tracelog","this."+Core.debug.dumpToString(this,"",3));

	this.bubble("tracelog","ev="+ev);	
	var ev = newEvent(2048);
	this.bubble("tracelog","ev="+ev);
	//Core.system.setSoValue(ev,"key","");
	ev.x = 95;
	ev.y = 110;
	this.bubble("tracelog","ev.code");
	var func = getSoValue(this.Touch.MENUBAR,"mouseEnter");
	this.bubble("tracelog","mouseEnter"+func);
	func.call(this.Touch.MENUBAR,ev);
	this.bubble("tracelog","fired");
	var func = getSoValue(this.Touch.MENUBAR,"mouseDown");
	func.call(this.Touch.MENUBAR,ev); 
	var func = getSoValue(this.Touch.MENUBAR,"mouseUp");
	func.call(this.Touch.MENUBAR,ev); 
	}catch(ignor){this.tracelog("Fehler bei doMenuF");}
};

target.doSize = function () {
var mytimer;
	flag = Math.abs(flag-1);
	this.bubble("tracelog","flag="+flag+" counter="+counter);
	if (mytimer == undefined) {
     		mytimer = target.getTimer();
		mytimer.onCallback = function (delta) {
			// counter++;
			// target.TestLabel.setValue('timeraction '+counter);			
			target.moveCursor("right");
			FskUI.Window.update.call(kbook.model.container.getWindow());
			//mytimer.schedule(5000);
			}
	}		
	//mytimer.schedule(counter);
	(flag==1) ? mytimer.scheduleRepeating(counter) : mytimer.scheduleRepeating(-1);
}

target.digitF = function (sender) {
	sender = sender-1;
	if (sender == -1) {sender = 10};
	this.card0.u = sender;
	counter = (sender+1) * 1000;
}

target.moveCursor = function(direction) { 

	switch (direction) {
		case 'left': {	
			c0l--;
			break;
		}
		case 'right': {	
			c0l++;
			break;
		}
		case 'up': {	
			c0t--;
			break;
		}				
		case 'down': {	
			c0t++;
			break;
		}
	}	
	this.card0.changeLayout(c0l,73,uD,c0t,98,uD);
	//this.bubble("tracelog",direction); 
	this.TestLabel.setValue('x:'+c0l+' y:'+c0t);
}

target.doPreviousF = function() { 
	c0l--;
	this.card0.moveBy(-1,0);
	this.TestLabel.setValue('x:'+c0l+' y:'+c0t);
}


target.doNextF = function() { 
	c0l++;
	this.card0.moveBy(1,0);
	this.TestLabel.setValue('x:'+c0l+' y:'+c0t);

/*	this.bubble("tracelog","enter");
	this.tracelog("Core: " + Core);
	this.tracelog("_Core: " + _Core);
	this.tracelog("prsp.compile: "+prsp.compile);
	this.tracelog("kb.aRR.hasNumBut: "+kbook.autoRunRoot.hasNumericButtons);
	this.tracelog("kb.aRR.gSoV: "+kbook.autoRunRoot.getSoValue);
	this.tracelog("kb.aRR.params: "+kbook.autoRunRoot.params);
	this.tracelog("kb.aRR.params.NumBut: "+kbook.autoRunRoot.params.hasNumericButtons);
	this.tracelog("kb.aRR.params.Core:"+kbook.autoRunRoot.params.Core); 
	this.bubble("tracelog","exit"); */
}

target.doCenterF = function() {
	this.card0.v++;
	if (this.card0.v > 3) {this.card0.v=0}
}
target.doCloneSprite = function() { 
	// var newSprite = prsp.compile("name,target","target[name] = new this.Fskin.sprite");
	var root, container,initialize, skin, skinType;
	this.bubble("tracelog", "enter Clone");
	root = getSoValue(this.card0,"root");
	container = getSoValue(this.card0,"container");
	skin = getSoValue(this.card0,"skin");
	skinType = getSoValue(this.card0,"skinType");
	initialize = getSoValue(this.card0,"initialize");
	
	this.bubble("tracelog", "root:"+root+"Cont:"+container+"Init:"+initialize);
	
	this["card1"] = _Core.system.cloneObj(this.card0);
	// newSprite("card1",target);
	this.bubble("tracelog","card1:"+_Core.debug.dumpToString(this["card1"],"card1:",2));

	_Core.system.setSoValue(this,"card1.root",root);
	_Core.system.setSoValue(this,"card1.container",container);
	_Core.system.setSoValue(this,"card1.skin",skin);
	_Core.system.setSoValue(this,"card1.skinType",skinType);
	// initialize.call(this["card1"],root, container);
	this["card1"].u = 1;
	this["card1"].v = 1;
	this["card1"].changeLayout(c0l,73,uD,c0t+110,98,uD);
	this.bubble("tracelog", "exit Clone");
}

/**/
target.showTime = function (show) {
/*	var time = new Date();
	var timeLocale = time.toLocaleTimeString();
	var show = timeLocale.substring(0, timeLocale.lastIndexOf(':'));*/
	this.clock1.setValue(show);
}
/**/	
/**/
// var showTime1 = function(){ return "00:00"};

//var showTime1 = Core.system.compile('',"var t = new Date();var tL = t.toLocaleTimeString();var show = tL.substring(0, tL.lastIndexOf(':'));return show;");	

/*/	
