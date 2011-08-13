// Spideroox is a solitaire Spider designed for Onyx Boox 60, Bebook Neo and other e-reader with webbrowser. 
// (c) 2010 by Tomasz Kucza, All rights reserved. All graphics are public domain (from openclipart.org).

// History:
//	2011-04-20 Mark Nord:	blank project to start with

var tmp = function () {
	var uD; // short for undefined
	
	// PRS+ Core-functions handover
	var hasNumericButtons = kbook.autoRunRoot.hasNumericButtons;
	var getSoValue = kbook.autoRunRoot.getSoValue;
	var getFileContent = kbook.autoRunRoot.getFileContent;
        
         
	target.init = function () {
      	/* set translated appTitle and appIcon */
      	this.appTitle.setValue(kbook.autoRunRoot._title);
      	this.appIcon.u = kbook.autoRunRoot._icon;

      	// dynamical place cards
	var i,j;
	var maxCards=59; // 104 with all sprites defined
	var cardOffset=10;
	
      	   for (i=0; i<=3; i++) {
                  for (j=0; j<=9; j++) {
                      this['card'+pad(i*10+j,3)].changeLayout(5+j*59,55,uD,5+i*cardOffset,104,uD);
                      this['card'+pad(i*10+j,3)].u = 13; 
                      this['card'+pad(i*10+j,3)].v = 2; 
                     }} 
	   for (j=0; j<=3; j++) {
           	this['card'+pad(i*10+j,3)].changeLayout(5+j*59,55,uD,5+i*cardOffset,104,uD);
                this['card'+pad(i*10+j,3)].u = 13;
                this['card'+pad(i*10+j,3)].v = 2;
                     }                      
	   for (j=4; j<=9; j++) {
           	this['card'+pad(i*10+j,3)].changeLayout(5+j*59,55,uD,5+i*cardOffset,104,uD);
                this['card'+pad(i*10+j,3)].u = j;
                this['card'+pad(i*10+j,3)].v = 0;
                     }                      
           i++;          
	   for (j=0; j<=3; j++) {
           	this['card'+pad(i*10+j,3)].changeLayout(5+j*59,55,uD,5+i*cardOffset,104,uD);
                this['card'+pad(i*10+j,3)].u = j;
                this['card'+pad(i*10+j,3)].v = 2;
                     }                                           
              // hide unuses cards
               for (i=54; i<=maxCards; i++) { 
                     this['card'+pad(i,3)].changeLayout(0,0,uD,0,0,uD);
               }      
	};
	
	
	target.exitQuit = function () {
		kbook.autoRunRoot.exitIf(kbook.model);
	};

	// utility function to refresh the screen within a function
	var updateScreen = function() {
		FskUI.Window.update.call(kbook.model.container.getWindow());
	};
	
        // add leading Zeros	
        var pad = function (number, length) {
            var str = '' + number;
            while (str.length < length) {
                str = '0' + str;
            }
            return str;
        }	
	target.doCardClick = function (sender) {
	   var id, n, u, v;
           id = getSoValue(sender, "id");
           u = getSoValue(sender, "u");
           v = getSoValue(sender, "v");
           
           this.bubble("tracelog","id="+id);
	return;
}
};
try {
  tmp();
} catch(e) {target.bubble('tracelog','error in spider.js');}
tmp = undefined;
