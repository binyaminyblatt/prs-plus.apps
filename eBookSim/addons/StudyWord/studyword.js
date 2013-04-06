//
// StudyWord for Sony Reader 950
// by Andrey Tryapitsyn
// 
//
// Initial version: 2013-02-28

var tmp = function () {

	var L = kbook.autoRunRoot.L;
	var STR_QUIT = L("STR_QUIT");
	var STR_OK = L("STR_OK");
	var STR_CANCEL = L("STR_CANCEL");
	var STR_DELETE = L("STR_DELETE");
	var STR_ONE_OFF = L("STR_ONE_OFF");
	var STR_FLOATING = L("STR_FLOATING");
	var STR_CARDINAL = L("STR_CARDINAL");
	var STR_SYMBOLS = L("STR_SYMBOLS");
	var STR_LETTERS = L("STR_LETTERS");
	var kbdPath = target.studywordRoot;	
	var hasNumericButtons = kbook.autoRunRoot.hasNumericButtons;
	var getSoValue = kbook.autoRunRoot.getSoValue;
	var setSoValue = kbook.autoRunRoot.setSoValue;
	var getFileContent = kbook.autoRunRoot.getFileContent;
	var startsWith = kbook.autoRunRoot.startsWith;
	var datPath0 = kbook.autoRunRoot.gamesSavePath+'Calendar/';
	FileSystem.ensureDirectory(datPath0);  

	var datPath  = datPath0 + 'calendar.dat';


	var custSel;
	var prevSel;

	var currentTempEvent;
	//var mouseLeave = getSoValue( target.SETTINGS_DIALOG.btn_Cancel,'mouseLeave');
	//var mouseEnter = getSoValue( target.SETTINGS_DIALOG.btn_Cancel,'mouseEnter');
	var shifted = false;
	var shiftOffset = 38;
	var symbols = false;
	var symbolsOffset = 76;
	var keys = [];

	FileSystem.ensureDirectory(kbdPath);


	var kbdPath = target.studywordRoot;
//	var kbdPath ="///Data/words/";
	var dicPath  = kbdPath +"word.dic";	
//	var dicPath = "///Data/words/word.dic";

//	var customKbdPath = datPath0 + 'custom.kbd';
//	FileSystem.ensureDirectory(kbdPath);

//	var settingsPath = datPath0 + 'settings.cnf';
	var settingsPath = kbdPath + 'settings.cnf';

	var offsetDifference = 6; // 600, 350, 650 (950: offsetDifference=15)

	// the following strings work on all readers except the 600 because the characters are missing from the font
	var strShift = "\u2191"; //up arrow
	var strUnShift = "\u2193"; //down arrow
	var strBack = "\u2190"; //left arrow
	var strUp = "\u2191";
	var strDown = "\u2193";


	var lang = "eng";	//current language
	var l2s1 = 55;		//level2 column 1 selection
	var l2s2 = 54;		//level2 column 1 selection
	var l2num;		//current number of row in level 2
	var l3num;		//current number of row in level 3
	var l2nummax ;	//max number of row in level 2
	var l3nummax ;	//max number of row in level 3
	var l21 = [10];		//array of positions WA[] words in level2,3 column 1
	var l22 = [10];		//array of positions WA[] words in level2 column 2
	//number of words working in selection
	var workwordnummax = 10;//max number of words in WA[] array
	var workwordnum = 0;	//current number of words in WA[] array
	var workingword = 25; 	//current working word in level
	var workwordlast = 0;	//last number word in WA[] array from Words[] array
	var wordsnum = 0;	//current number of words in Words[] array
	//score to finish for every level
	var l1val = 3;
	var l2val = 5;
	var l3val = 5;
	var l4val = 5;
	var l5val = 5;
	var l6val = 5;
	var lplus = 6;
	var lminus = 5;
	var learnedwords = 0;

	var curl=1;		//current level
	var scr = 0;		//current score for level

	var WA =new Array();	//arrays of words for current learning
	
	var words =new Array();	//array of words(all words from file)

	//mix function
	Array.prototype.shuffle = function( b )
	{
		 var i = this.length, j, t;
		 while( i ) 
		{
  			j = Math.floor( ( i-- ) * Math.random() );
  			t = b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
  			this[i] = this[j];
  			this[j] = t;
 		}

 		return this;
	};

	Array.prototype.shuffleLen = function( l, b )
	{
		 var i = l, j, t;
		 while( i ) 
		{
  			j = Math.floor( ( i-- ) * Math.random() );
  			t = b && typeof this[i].shuffleLen!=='undefined' ? this[i].shuffleLen() : this[i];
  			this[i] = this[j];
  			this[j] = t;
 		}

 		return this;
	};

	var twoDigits = function (i) {
		if (i<10) {return "0"+i}
		return i;	
	}

	//default keyboard
	target.loadWesternKeys = function () {
		keys[0]="q";
		keys[1]="w";
		keys[2]="e";
		keys[3]="r";
		keys[4]="t";
		keys[5]="y";
		keys[6]="u";
		keys[7]="i";
		keys[8]="o";
		keys[9]="p";
		keys[10]=",";
		keys[11]="7";
		keys[12]="8";
		keys[13]="9";
		keys[14]="a";
		keys[15]="s";
		keys[16]="d";
		keys[17]="f";
		keys[18]="g";
		keys[19]="h";
		keys[20]="j";
		keys[21]="k";
		keys[22]="l";
		keys[23]=".";
		keys[24]="4";
		keys[25]="5";
		keys[26]="6";
		keys[27]="z";
		keys[28]="x";
		keys[29]="c";
		keys[30]="v";
		keys[31]="b";
		keys[32]="n";
		keys[33]="m";
		keys[34]="0";
		keys[35]="1";
		keys[36]="2";
		keys[37]="3";
		keys[38]="Q";
		keys[39]="W";
		keys[40]="E";
		keys[41]="R";
		keys[42]="T";
		keys[43]="Y";
		keys[44]="U";
		keys[45]="I";
		keys[46]="O";
		keys[47]="P";
		keys[48]=";";
		keys[49]="&";
		keys[50]="*";
		keys[51]="(";
		keys[52]="A";
		keys[53]="S";
		keys[54]="D";
		keys[55]="F";
		keys[56]="G";
		keys[57]="H";
		keys[58]="J";
		keys[59]="K";
		keys[60]="L";
		keys[61]=":";
		keys[62]="$";
		keys[63]="%";
		keys[64]="^";
		keys[65]="Z";
		keys[66]="X";
		keys[67]="C";
		keys[68]="V";
		keys[69]="B";
		keys[70]="N";
		keys[71]="M";
		keys[72]=")";
		keys[73]="!";
		keys[74]="@";
		keys[75]="#";
		keys[76]="1";
		keys[77]="2";
		keys[78]="3";
		keys[79]="4";
		keys[80]="5";
		keys[81]="6";
		keys[82]="7";
		keys[83]="8";
		keys[84]="9";
		keys[85]="0";
		keys[86]="";
		keys[87]="";
		keys[88]="";
		keys[89]="";
		keys[90]="%";
		keys[91]="&";
		keys[92]="*";
		keys[93]="(";
		keys[94]=")";
		keys[95]="_";
		keys[96]="+";
		keys[97]=";";
		keys[98]=":";
		keys[99]="";
		keys[100]="";
		keys[101]="";
		keys[102]="";
		keys[103]="!";
		keys[104]="?";
		keys[105]="\"";
		keys[106]="\'";
		keys[107]=",";
		keys[108]=".";
		keys[109]="/";
		keys[110]="";
		keys[111]="";
		keys[112]="";
		keys[113]="";
		keys[114]="~";
		keys[115]="@";
		keys[116]="#";
		keys[117]="$";
		keys[118]="^";
		keys[119]="-";
		keys[120]="`";
		keys[121]="=";
		keys[122]="{";
		keys[123]="}";
		keys[124]="";
		keys[125]="";
		keys[126]="";
		keys[127]="";
		keys[128]="\u00AC";
		keys[129]="\u00A3";
		keys[130]="\u20AC";
		keys[131]="\u00A7";
		keys[132]="\u00A6";
		keys[133]="[";
		keys[134]="]";
		keys[135]="|";
		keys[136]="\\";
		keys[137]="";
		keys[138]="";
		keys[139]="";
		keys[140]="";
		keys[141]="\u00B2";
		keys[142]="\u00B0";
		keys[143]="\u00B5";
		keys[144]="\u00AB";
		keys[145]="\u00BB";
		keys[146]="<";
		keys[147]=">";
		keys[148]="";
		keys[149]="";
		keys[150]="";
		keys[151]="";
		return;
	}

	target.SaveKeyboard = function () {
		var i;
		var file = "";
		// attempt to save keyboard to file
		file =kbdPath+ lang+".kbd";	
		try {
			if (FileSystem.getFileInfo(file)) FileSystem.deleteFile(file); 
			stream = new Stream.File(file, 1);
			for (var i = 0; i < 151; i++) {
				stream.writeLine(keys[i]);
			}		
			stream.close();
		} catch (e) {}
	}


	// load keyboard from file
	target.loadKeyboard = function () {
		var i,j;
		var file = "";
		// attempt to load keyboard from file
		file =kbdPath+ lang+".kbd";
		if (FileSystem.getFileInfo(file)) {

			var tempfile = getFileContent(file,'keyboard missing');
			if (tempfile!='keyboard missing') {
				keys = tempfile.split("\r\n");	// CR LF is used by stream.writeLine()
			} else {
				// fallback
				this.loadWesternKeys();
				target.SaveKeyboard();
			}
		} else {
			// fallback
			this.loadWesternKeys();
			target.SaveKeyboard();
		}
		return;	
	}
	

	target.init = function () {
		var i,j;
		//target.bubble("tracelog","initialising...");
		this.appTitle.setValue(kbook.autoRunRoot._title);
		this.appIcon.u = kbook.autoRunRoot._icon;

	

		//simplify some labels
		setSoValue(target.keyboard1.BACK, 'text', strBack);
		setSoValue(target.keyboard1.SHIFT, 'text', strShift);
		setSoValue(target.keyboard1.SPACE, 'text', "");

		
		//apply translation strings
		target.keyboard1.eventDescription.setValue("");
		setSoValue(target.keyboard1.SYMBOL, 'text', L("STR_SYMBOLS"));
		target.Win.show(false);

		// 950 can display more events in the event box
		if (kbook.autoRunRoot.model=="950") {
			offsetDifference=15;
		}
		//target.eventsText.show(true);
		target.LoadSettings();
		target.InitWA();			

		target.GetString();

		if((wordsnum!=0)&&(wordsnum!=learnedwords)&&(workwordnum!=0)){workwordlast = WA[workwordnum-1].word;}else{workwordlast = -1;}

		l2num = l2nummax;

		target.loadKeyboard(lang);

		target.refreshKeys();
 		target.StatusWords_Label.setValue("Learned: " + learnedwords+"/" +wordsnum);
		//target.eventsText.setValue(" wordsnum " + wordsnum+ " workwordnum " + workwordnum+ " workwordnum "+j+ " workwordlast "+workwordlast +"WA0 " +WA[0].word+"WAl " +WA[workwordnum-1].word);				

		target.WordSelection();
	


		return;
	}


	//load words from file
	target.GetString = function (){ 



		var y;
		var s;
		var j;
		var res = '';
		wordsnum = 0;
		var l = "";
		var line = 0;
		var m = 1;

		if (FileSystem.getFileInfo(dicPath)){	
		//try {
			var stream = new Stream.File(dicPath);
			while (stream.bytesAvailable) {
				s = stream.readLine();
				line++;
				y = 0;

				if(s.length>=2){
				if((s.length==4)&&(s.charAt(0)=="#")){lang=s.substring(1, 4);}
				else if((s.length==5)&&(s.charAt(1)=="#")&&(line==1)){lang=s.substring(2, 5);}
				else if((s.charAt(0)!="/")&&(s.charAt(1)!="/")){
				wordsnum++;
				words[wordsnum-1] = new Array({word: "", transcription: "", translate: "",studied:0});
				while ((s.charAt(y)!=";")&&(y<s.length)) {y++}
				if(line==1){words[wordsnum-1].word = s.substring(1, y);}else {words[wordsnum-1].word = s.substring(0, y);}
				j = y+1;
				while ((s.charAt(j)!=";")&&(y<s.length)) {j++}				
				words[wordsnum-1].transcription = s.substring(y+1, j);
				y = j+1;
				while ((s.charAt(y)!=";")&&(y<s.length)) {y++}
				words[wordsnum-1].translate = s.substring(j+1, y);				
					
				if(y+1<s.length) {
					words[wordsnum-1].studied = s.substring(y+1, y+2);
					if((words[wordsnum-1].studied==0)&&(workwordnum<workwordnummax)){
					workwordnum++; 
					WA[workwordnum-1].word = wordsnum-1;}else if(words[wordsnum-1].studied==1){ learnedwords++;}
				}
				else {
					words[wordsnum-1].studied= 0;
					if(workwordnum<workwordnummax){
					workwordnum++;
					WA[workwordnum-1].word = wordsnum-1;}
				}}}
				


			}
			stream.close();
		}else{
		//test value
			for(var i = 0; i<10;i++){
				wordsnum++;
				words[wordsnum-1] = new Array({word: "", transcription: "", translate: "",studied:0});
				words[wordsnum-1].word = "Word"+wordsnum;
				words[wordsnum-1].transcription = "Transcription"+wordsnum;
				words[wordsnum-1].translate = "Translation"+wordsnum;
				words[wordsnum-1].studied = 0;
				lang = "eng";
			}
		
			workwordlast = -1;
		}

		//catch(e) {
			//res = '';
		//}

	
		//target.eventsText.setValue(" wordsnum " + wordsnum+ " workwordnum " + workwordnum+ " workwordnum "+j+ " workwordlast "+workwordlast +"WA0 " +WA[0].word+"WAl " +WA[workwordnum-1].word);				
		//target.eventsText.show(true);	
		return;
	}

	
	//load settings from file
	target.LoadSettings = function (){ 



		var y;
		var s;
		var j;
		var res = '';
		wordsnum = 0;
		var l = "";
		var line = 0;
		var m = 1;
		
		 

		if (FileSystem.getFileInfo(settingsPath)){
		//try{
			var stream = new Stream.File(settingsPath);
			while (stream.bytesAvailable) {
				s = stream.readLine();
				y = 0;

				while ((s.charAt(y)!=";")&&(y<s.length)) {y++}
				lplus = parseInt(s.substring(0, y));
				j = y+1;
				while ((s.charAt(j)!=";")&&(y<s.length)) {j++}				
				lminus = parseInt(s.substring(y+1, j));
				y = j+1;
				while ((s.charAt(y)!=";")&&(y<s.length)) {y++}
				l1val = parseInt(s.substring(j+1, y));
				j = y+1;
				while ((s.charAt(j)!=";")&&(y<s.length)) {j++}				
				l2val = parseInt(s.substring(y+1, j));
				y = j+1;
				while ((s.charAt(y)!=";")&&(y<s.length)) {y++}
				l3val = parseInt(s.substring(j+1, y));
				j = y+1;
				while ((s.charAt(j)!=";")&&(y<s.length)) {j++}				
				l4val = parseInt(s.substring(y+1, j));
				y = j+1;
				while ((s.charAt(y)!=";")&&(y<s.length)) {y++}
				l5val = parseInt(s.substring(j+1, y));
				j = y+1;
				while ((s.charAt(j)!=";")&&(y<s.length)) {j++}				
				l6val = parseInt(s.substring(y+1, j));
				y = j+1;
				while ((s.charAt(y)!=";")&&(y<s.length)) {y++}
				workwordnummax = parseInt(s.substring(j+1, y));

				j = y+1;
				while ((s.charAt(j)!=";")&&(y<s.length)) {j++}				
				l2nummax = parseInt(s.substring(y+1, j));
				y = j+1;
				while ((s.charAt(y)!=";")&&(y<s.length)) {y++}
				l3nummax = parseInt(s.substring(j+1, y));
				
					
			}
			stream.close();
		}else{
		//default settings
			lplus = 3;
			lminus = 2;
			l1val = 3;
			l2val = 5;
			l3val = 5;
			l4val = 3;
			l5val = 6;
			l6val = 6;
			l3nummax = 7;
			l2nummax = 5;
			workwordnummax = 10;
		}

		//catch(e) {
		//	res = '';
		//}

	
		//target.eventsText.setValue(" wordsnum " + wordsnum+ " workwordnum " + workwordnum+ " workwordnum "+j+ " workwordlast "+workwordlast +"WA0 " +WA[0].word+"WAl " +WA[workwordnum-1].word);				
		//target.eventsText.show(true);	
		return;

	}


	//select word and begin level
	target.WordSelection = function (){
		//word selection
		var k;
		var i;
		curl = 0;
		target.HideAll();
		if((wordsnum==0)||(wordsnum==learnedwords)){target.InitWin();return;}
		if(workwordnum<=0){target.addwords();	}
		for(i=0;(i<=workwordnum-1);i++){
			if(WA[i].l1<l1val){
			workingword = i;
			curl=1;
			target.Level1Init();
			break;
			return;
			}
		}  



 
		if(curl!=1){
			k = Math.floor(Math.random()*(workwordnum));
			workingword = k;
			//WA[workingword].l2= l2val;
			//WA[workingword].l3= l2val;
			//WA[workingword].l4= l2val;
			//WA[workingword].l5= l2val;
			//WA[0].l2= l2val;
			//WA[0].l3= l2val;
			//WA[0].l4= l2val;
			//WA[0].l5= l2val;
		if(WA[workingword].l2<l2val){curl=2;target.Level2Init();return;}		
		else if(WA[workingword].l3<l3val){curl=3;target.Level3Init();return;}		
		else if(WA[workingword].l4<l4val){curl=4;target.Level4Init();return;}
		else if(WA[workingword].l5<l5val){curl=5;target.Level5Init();return;}
		else if(WA[workingword].l6<l6val){curl=6;target.Level6Init();return;}

		}
		return;

	}



	target.doButtonClick = function (sender) {
		var str = "";
		var val;
		var id;
		id = getSoValue(sender, "id");
		n = id.substring(7, 10);
		if (n == "004") {
		//select word as studied
			if((wordsnum!=0)&&(wordsnum!=learnedwords)){
			target.decreasewordnum();
			target.WordSelection();	}		
			return;
		}
		if (n == "005") {
			// save words

			target.saveWords();

			return;
		}
		if (n == "006") {
			// 

			target.OpenSettings();
			target.SETTINGS_DIALOG.show(true);

			return;
		}			
		if (n == "001") {
			if(curl==1){WA[workingword].l1+=lplus;
			//for level 1 NEXT button
				target.Level1Visible(false);
				target.WordSelection();
//				target.eventsText.show(true);
//				target.eventsText.setValue("WA= " + WA[0].word + " WA2= " + WA[1].word+ " WA3= " + WA[2].word + "  ;WA= " + WA[0] + " WA2= " + WA[1]+ " WA3= " + WA[2]);
				return;
			}
			 else if(curl==4){scr=lplus;WA[workingword].l4+=scr;
			//for level 4 
				val = WA[workingword].l4;
				str ="Score: "+ val +" of " + l4val;
				target.StatusScore_Label.setValue(str);

				target.WordSelection();
				return;
			}
			else if (curl==6){
			//fro level 6 compare button
				//var eventDescription = target.getVariable("current_line");
				//var wordtmp = WA[workingword].word;
				if(words[WA[workingword].word].word==target.getVariable("current_line")){scr+=lplus;WA[workingword].l6+=scr;target.level6complite();	return;}
				else{scr=-lminus;}

				val = WA[workingword].l6+scr;
				str ="Score: "+ val +" of " + l6val;
				target.StatusScore_Label.setValue(str);
				return;	
			}
			else if (curl==10){
				target.ResetStatistics();
				target.saveWords();
				target.addwords();
				target.WordSelection();
				return;
			}
			return;
		}		

		if (n == "002") {
		//for level 4 forgot button
			if(curl==4){scr=lplus-lminus;WA[workingword].l4+=scr;
				target.WordSelection();
				return;
			}

		}		
		if (n == "003") {
		// for level 4,6 show Answer
			if(curl==4){target.translate.show(true);return;	}
			else if (curl==6){target.keyboard1.Answer.show(true);return;	}
			else if (curl==10){
				target.MixWord();
				target.ResetStatistics();
				target.addwords();
				target.WordSelection();
				return;	
			}
		}


		
	}

	//level 2 words selection
	target.doSquareClick = function (sender) {
		var id, n, x, y;
		//scr = 0;

		id = getSoValue(sender, "id");
		n = id.substring(6, 8);
		y = (n % 10) ; // find column
		x = (Math.floor(n / 10)) + 1; // find row
		var val = 0;		



		//target.eventsText.show(true);
		//target.eventsText.setValue("1= " + l21[0] + " 2= " + l21[1] +" 3= " + l21[2] +" 4= " + l21[3] +" 5= " + l21[4] + " 1= " + l22[0] + " 2= " + l22[1] +" 3= " + l22[2] +" 4= " + l22[3] +" 5= " + l22[4]);

		//place selection square
		//target.eventsText.show(true);
		if (x == 1){
			target.level2.selection1.changeLayout(0,300, uD, (y)*70+80, 70, uD);
			l2s1= y;
			l2s2 = 26;
			target.level2.selection2.changeLayout(0, 0, uD, 0, 0, uD);	
			scr = 0;
			workingword = l21[l2s1];
			//target.eventsText.setValue("l2= " + l21[l2s1] +  " " + l2s1);
			//target.eventsText.show(true);
			target.StatusScore_Label.show(true);
			//val = l2s1;


		}else if (x==2){
			target.level2.selection2.changeLayout(300, 300, uD, (y)*70+80, 70, uD);
			l2s2 = 10+y;
			//target.eventsText.setValue("l2= " + l22[l2s2-10] +  " " + l2s2);
			//target.eventsText.show(true);
			if((l2s1<10)&&(l21[l2s1]!=l22[l2s2-10])){
			//if selected word not match
				scr = -lminus;
			}
		}


		var str = "";

		val = WA[workingword].l2+scr;
		str ="Score: "+ val +" of " + l2val;
		//setSoValue(target.StatusScore_Label, 'text',str);
		target.StatusScore_Label.setValue(str);

		if (l21[l2s1]==l22[l2s2-10]){	
			target.level2['square'+l2s1].enable(false);
			target.level2['square'+l2s1].u=1;
			target.level2['square'+l2s2].u=1;
			target.level2['square'+l2s2].enable(false);
			l2num--;

			scr += lplus;			
			WA[l21[l2s1]].l2 += scr;
			scr = 0;
			//target.eventsText.setValue("l2= " + WA[l21[l2s1]].l2 + " l2= ");
			//target.eventsText.show(true);
			l2s1 = 55;
			l2s2 = 56;
			//val = WA[workingword].l2+scr;
			str ="Score: "+ WA[workingword].l2 +" of " + l2val;
			//setSoValue(target.StatusScore_Label, 'text',str);
			target.StatusScore_Label.setValue(str);
			target.level2.selection1.changeLayout(0, 0, uD, 0, 0, uD);
			target.level2.selection2.changeLayout(0, 0, uD, 0, 0, uD);
		}


		//target.eventsText.setValue("l2= " + (words[l21[l2s1]].l2) + " scr= "+ scr+ " l2num= " + l2num+ " curl= "+curl);

		if(l2num<=0){
			
			target.WordSelection();
			return;

		}
//target.eventsText.show(false);


		return;
	}



	//level 3,5 word selection
	target.dowordcaseClick = function (sender) {
			var id, n, x, y;
		var str = "";
		var val;
		id = getSoValue(sender, "id");
		n = id.substring(8, 9);
		y = (n % 10) + 1; // find column
		x = (Math.floor(n / 10)) + 1; // find row
		

		//target.eventsText.show(true);
		//target.eventsText.setValue("1= " + l21[0] + " 2= " + l21[1] +" 3= " + l21[3] +" 4= " + l21[4] +" 5= " + l21[5]);
		if(l21[n]==workingword){
			scr += lplus;
			if(curl==3){WA[workingword].l3 += scr;}
			else{WA[workingword].l5 += scr;}
			target.WordSelection();	
			return;
		
		}
		else {target.level3['wordcase'+n].u=1;scr = -lminus;
		//target.eventsText.show(true);	
		//target.eventsText.setValue("l21= " + l21[0]+" "+ l21[1]+" "+ l21[2]+" "+  l21[3]+" "+ l21[4]+" "+ l21[5]+" "+workingword+ " WA "+ WA[workingword].word);
		}
		
		if(curl==3){
			val = WA[workingword].l3+scr;
			str ="Score: "+ val +" of " + l3val;
		}else if(curl==5){
			val = WA[workingword].l5+scr;
			str ="Score: "+ val +" of " + l5val;
		}		
		target.StatusScore_Label.setValue(str);
		return;

	}
	



	target.doRoot = function (sender) {
		this.saveWords();
		kbook.autoRunRoot.exitIf(kbook.model);
		return;
	}
	
	target.doHold0 = function () {
		this.saveEvents();
		kbook.autoRunRoot.exitIf(kbook.model);
		return;
	}

	//save words to file
	target.saveWords = function () {
		var event;


		// save events to file
		try {
			if (FileSystem.getFileInfo(dicPath)) FileSystem.deleteFile(dicPath); 
			stream = new Stream.File(dicPath, 1);
			stream.writeLine("//General Dictionary format is: ");
			stream.writeLine("//#lan");
			stream.writeLine("//Original word;Transcription;Translation;Studies flag");
			stream.writeLine("//-----------------------------------------------------------");
			stream.writeLine("//lan - name of file with alphabet for keyboard: lan + .kbd");
			stream.writeLine("//Studies flag can be: 0 - not studied; 1 - studied");
			stream.writeLine("////////////////////////////////////////////////////////////////////////////////////");
			event = "#"+lang;
			stream.writeLine(event);
			if(wordsnum==0){event ="word1;transcription1;Translation1;"; stream.writeLine(event);
				event ="word2;transcription2;Translation2;"; stream.writeLine(event);}
			for (var i = 0; i < wordsnum; i++) {
				event=words[i].word+';'+words[i].transcription+';'+words[i].translate+';'+words[i].studied;
				stream.writeLine(event);
			}		
			stream.close();
		} catch (e) {}
		return;
	}
	

	//save settings to file
	target.saveSettings = function () {
		var event;
		// save events to file
		try {
			if (FileSystem.getFileInfo(settingsPath)) FileSystem.deleteFile(settingsPath); 
			stream = new Stream.File(settingsPath, 1);

				event=lplus+';'+lminus+';'+l1val+';'+l2val+';'+l3val+';'+l4val+';'+l5val+';'+l6val+';'+workwordnummax+';'+l2nummax+';'+l3nummax+';';
				stream.writeLine(event);
					
			stream.close();
		} catch (e) {}
		return;
	}


	//refresh keyboard
	target.refreshKeys = function () {
		var i,n,key,j;
		n = -1;
		if (shifted) {
			n = n + shiftOffset;
			//setSoValue(target.keyboard1.SHIFT, 'text', strUnShift);
			target.keyboard1.SHIFT.setText(strUnShift);
		} else {
			//setSoValue(target.keyboard1.SHIFT, 'text', strShift);
			target.keyboard1.SHIFT.setText(strShift);
		}
		if (symbols) {
			n = n + symbolsOffset;
			setSoValue(target.keyboard1['SYMBOL'], 'text', STR_LETTERS);
		} else {
			setSoValue(target.keyboard1['SYMBOL'], 'text', STR_SYMBOLS);
		}

		for (i = 1; i <= 38; i++) {
			j = i+n;
			key = 'key'+twoDigits(i);
			//setSoValue(target.keyboard1[key], 'text', keys[j]);
			target.keyboard1[key].setText(keys[j]);
			

		}
		return;
	}



	target.doSpace = function () {
		// ADD A SPACE
		var eventDescription = target.getVariable("current_line");
		eventDescription = eventDescription + " ";
		target.keyboard1.eventDescription.setValue(eventDescription);
		target.setVariable("current_line",eventDescription);
	}

	target.doSymbol = function () {
		symbols = !symbols;
		this.refreshKeys();

	} 

	target.doShift = function () {
		shifted = !shifted;
		this.refreshKeys();
		return;
	}	
	
	target.doBack = function () {
		// BACKSPACE
		var eventDescription = target.getVariable("current_line");
		eventDescription = eventDescription.slice(0,eventDescription.length-1);
		target.keyboard1.eventDescription.setValue(eventDescription);
		target.setVariable("current_line",eventDescription);
	}
	
	target.doKeyPress = function (sender) {
		var id = getSoValue(sender, "id");
		this.addCharacter(id);
		return;
	}
	
	target.addCharacter = function (id) {
		var key=id.substring(3, 5);
		var n;

		n = parseInt(key);

		if (symbols) { n = n + symbolsOffset };
		if (shifted) { n = n + shiftOffset };

		var character = keys[n-1];
		//target.bubble("tracelog","n="+n+", character="+character);
		var eventDescription = target.getVariable("current_line");
		eventDescription = eventDescription + character;
		target.keyboard1.eventDescription.setValue(eventDescription);
		target.setVariable("current_line",eventDescription);
		
		var Remain = "Remain: ";
		var wordtmp = words[WA[workingword].word].word;
		var rmn =  wordtmp.length - eventDescription.length;
		Remain = Remain + rmn + " of " + wordtmp.length;
		setSoValue(target.keyboard1.remainder,'text',Remain);
		
	}


	//level 1 initialisation
	target.Level1Init = function () {
		
		target.Level1Visible(true);
		setSoValue(target.BUTTON_001, 'text', "Next");
		setSoValue(target.Word, 'text',words[WA[workingword].word].word);
		setSoValue(target.transcription, 'text',words[WA[workingword].word].transcription);
		setSoValue(target.translate, 'text',words[WA[workingword].word].translate);
 		


		var str = "Score: ";
		str += WA[workingword].l1 +" of " + l1val;
		target.Status_Label.setValue("Level1");
		target.StatusScore_Label.setValue(str);
		target.StatusScore_Label.show(true);

		var path, item, parent, mediaNode;
		
		// create media
		//parent = this.parent;
//		path = "///Data/words/bun.mp3";
//		path = kbdPath +"bun.mp3";

		
/*		// create media

		try {
			item = Core.media.loadMedia(path);}

		//target.eventsText.show(true);

		} catch (ignore) {
			Core.ui.showMsg(L("MSG_ERROR_OPENING_BOOK"));
		}
		
		if (item) {
			// create node
			mediaNode = Core.media.createMediaNode(item, parent);
	
			// replace parent with media node
			Core.utils.replaceInArray(parent.nodes, this, mediaNode); 
			
			this.gotoNode(mediaNode, kbook.model);
		}
*/

		return;
	}


	//level 2 initialisation
	target.Level2Init = function (){ 


		target.Status_Label.setValue("Level2");
		target.StatusScore_Label.show(false);

		//target.Level2Visible(true);		
		target.level2.show(true);
		var i;
		var j;

		var r=[];//array of variations of positions for WA array
		var k = 0;

		scr = 0;
		l2s1 = 55;
		l2s2 = 56;
		
		if(workwordnum<l2nummax){l2num = workwordnum}else{l2num = l2nummax;}
		for(i=0;i<workwordnum;i++){r[i]=i;}
		target.level2.selection1.changeLayout(0, 0, uD, 0, 0, uD);
		target.level2.selection2.changeLayout(0, 0, uD, 0, 0, uD);

//first select words from WA
		for(i=0;i<=l2num-1;i++){

			if(i==0){k = workingword;}else{k = Math.floor(Math.random()*(workwordnum-i));}

			l21[i]=r[k];
			l22[i]=r[k];

			// decrese selected variable value
			for(j=k;j<=workwordnummax-1-i-1;j++){
				r[j]=r[j+1];
			}
		}		
//mix l12, l22		
		l21.shuffleLen(l2num);
		l22.shuffleLen(l2num);




		//target.eventsText.setValue("l21= " + l21[0]+" "+ l21[1]+" "+ l21[2]+" "+  l21[3]+" "+ l21[4]+" "+ l21[5]+" ");

		for (i = 0; i <= l2num-1; i++) {
			var k = i + 10;
			target.level2['l2word'+i].setValue(words[WA[l21[i]].word].word);
			target.level2['l2word'+k].setValue(words[WA[l22[i]].word].translate);

			target.level2['square'+i].enable(true);
			target.level2['square'+i].show(true);
			target.level2['l2word'+i].show(true);

			target.level2['square'+k].enable(true);
			target.level2['square'+k].show(true);
			target.level2['l2word'+k].show(true);

			target.level2['square'+i].u=0;
			target.level2['square'+k].u=0;

				
		}
		
			//target.eventsText.show(true);
		return;
	}


	//level 3 initialisation
	target.Level3Init = function (){ 


		var str = "";
		var val;
		val = WA[workingword].l3;
		str ="Score: "+ val +" of " + l3val;
		//setSoValue(target.StatusScore_Label, 'text',str);
		target.StatusScore_Label.setValue(str);
		target.Status_Label.setValue("Level3");
		target.StatusScore_Label.show(true);

		target.level3.show(true);

		target.transcription.show(true);
		target.Word.show(true);
		setSoValue(target.Word, 'text',words[WA[workingword].word].word);
		setSoValue(target.transcription, 'text',words[WA[workingword].word].transcription);
		target.split1.show(true);


		var i;
		var j;
		scr = 0;

		var k = 0;


		if(workwordnum<l3nummax){l3num = workwordnum}else{l3num = l3nummax;}
		var r = [];
		for(i=0;i<workwordnum;i++){r[i]=i;}

		//target.eventsText.show(true);	
		for(i=0;i<l3num;i++){
			target.level3['labelword'+i].show(true);
			target.level3['wordcase'+i].show(true);

			if(i==0){k = workingword;}else{k = Math.floor(Math.random()*(workwordnum-i));}
			l21[i]=r[k];
			for(j=k;j<=workwordnum-1-i-1;j++){
				r[j]=r[j+1];
			}

		}
		//target.eventsText.setValue("r1= " + r[0]+" "+ r[1]+" "+ r[2]+" "+  r[3]+" "+ r[4]+" "+ r[5]+" ");
		l21.shuffleLen(l3num);	
		//target.eventsText.show(true);	
		//target.eventsText.setValue("l21= " + l21[0]+" "+ l21[1]+" "+ l21[2]+" "+  l21[3]+" "+ l21[4]+" "+ l21[5]+" ");

		for (i = 0; i <= l3num-1; i++) {
			target.level3['labelword'+i].setValue(words[WA[l21[i]].word].translate);
			target.level3['wordcase'+i].u=0;
				
		}
		return;
	}


	//level 4 initialisation
	target.Level4Init = function (){ 
		target.StatusScore_Label.setValue("");
		var str = "";
		str ="Score: "+ WA[workingword].l4 +" of " + l4val;
		target.StatusScore_Label.setValue(str);
		target.Status_Label.setValue("Level4");
		target.StatusScore_Label.show(true);
		//target.eventsText.show(true);
		//target.eventsText.setValue("str= " + str + "  "+WA[workingword].l4);


			target.BUTTON_001.show(true);
			target.BUTTON_002.show(true);
			target.BUTTON_003.show(true);
			target.BUTTON_001.enable(true);
			target.BUTTON_002.enable(true);
			target.BUTTON_003.enable(true);
			setSoValue(target.BUTTON_003, 'text', "Answer");
			setSoValue(target.BUTTON_002, 'text', "Forgot");
			setSoValue(target.BUTTON_001, 'text', "Remember");
			target.transcription.show(true);
			target.Word.show(true);
			target.split1.show(true);
			setSoValue(target.Word, 'text',words[WA[workingword].word].word);
			setSoValue(target.transcription, 'text',words[WA[workingword].word].transcription);
			setSoValue(target.translate, 'text',words[WA[workingword].word].translate);

		return;
	}


	//level 5 initialisation
	target.Level5Init = function (){ 
		var str = "";
		var val;
		val = WA[workingword].l5;
		str ="Score: "+ val +" of " + l5val;
		//setSoValue(target.StatusScore_Label, 'text',str);
		target.StatusScore_Label.setValue(str);
		setSoValue(target.Status_Label, 'text',"Level5");
		target.StatusScore_Label.show(true);

		target.level3.show(true);
		if(workwordnum<l3nummax){l3num = workwordnum}else{l3num = l3nummax;}
		target.Word.show(true);
		setSoValue(target.Word, 'text',words[WA[workingword].word].translate);
		target.split1.show(true);

		var i;
		var j;
		scr = 0;

		var k = 0;


		if(workwordnum<l3nummax){l3num = workwordnum}else{l3num = l3nummax;}
		var r = [];
		for(i=0;i<workwordnum;i++){r[i]=i;}

		//target.eventsText.show(true);	
		for(i=0;i<l3num;i++){
			target.level3['labelword'+i].show(true);
			target.level3['wordcase'+i].show(true);

			if(i==0){k = workingword;}else{k = Math.floor(Math.random()*(workwordnum-i));}
			l21[i]=r[k];
			for(j=k;j<=workwordnum-1-i-1;j++){
				r[j]=r[j+1];
			}

		}
		//target.eventsText.setValue("r1= " + r[0]+" "+ r[1]+" "+ r[2]+" "+  r[3]+" "+ r[4]+" "+ r[5]+" ");
		l21.shuffleLen(l3num);	
		//target.eventsText.show(true);	
		//target.eventsText.setValue("l21= " + l21[0]+" "+ l21[1]+" "+ l21[2]+" "+  l21[3]+" "+ l21[4]+" "+ l21[5]+" ");

		for (i = 0; i <= l3num-1; i++) {

			target.level3['labelword'+i].setValue(words[WA[l21[i]].word].word);
			target.level3['wordcase'+i].u=0;
		}



		return;
	}


	//level 6 initialisation
	target.Level6Init = function (){ 


		var str = "";
		var val;
		val = WA[workingword].l6;
		str ="Score: "+ val +" of " + l6val;
		//setSoValue(target.StatusScore_Label, 'text',str);
		target.StatusScore_Label.setValue(str);
		setSoValue(target.Status_Label, 'text',"Level6");
		target.StatusScore_Label.show(true);


		scr = 0;
		target.keyboard1.show(true);

		setSoValue(target.BUTTON_003, 'text', "Answer");
		setSoValue(target.BUTTON_001, 'text', "Compare");
		target.BUTTON_001.show(true);
		target.BUTTON_003.show(true);
		target.BUTTON_001.enable(true);

		target.BUTTON_003.enable(true);
		target.Word.show(true);
		setSoValue(target.Word, 'text',words[WA[workingword].word].translate);
		setSoValue(target.keyboard1.Answer, 'text',words[WA[workingword].word].word);

		var eventDescription = "";

		target.keyboard1.eventDescription.setValue(eventDescription);
		target.setVariable("current_line",eventDescription);

		var Remain = "Remain: ";
		var wordtmp = words[WA[workingword].word].word;
		Remain = Remain + wordtmp.length + " of " + wordtmp.length;
		setSoValue(target.keyboard1.remainder,'text',Remain);
		target.setVariable("current_line","");
		target.keyboard1.Answer.show(false);
				target.eventsText.setValue("l6= " + WA[workingword].l6 + " score= "+ scr);
				//target.eventsText.show(true);
		return;
	}




	//
	target.level6complite = function (){
		if(WA[workingword].l6>=l6val){target.decreasewordnum();}
		//if(workwordnum<=0){target.addwords();}
		//if(workwordnum>0){target.WordSelection();}
		//else{//all words are learned
			//target.HideAll{};
		//}
		target.WordSelection();
		//target.eventsText.show(true);
		return;
	}

	target.decreasewordnum = function (){
		words[WA[workingword].word].studied=1;
		learnedwords++;

		for(var i=workingword;i<=workwordnum-1-1;i++){WA[i].word=WA[i+1].word;WA[i].l1=WA[i+1].l1;WA[i].l2=WA[i+1].l2;WA[i].l3=WA[i+1].l3;WA[i].l4=WA[i+1].l4;WA[i].l5=WA[i+1].l5;WA[i].l6=WA[i+1].l6;}	
		workwordnum--;
		target.StatusWords_Label.setValue("Learned: " + learnedwords+"/" +wordsnum);
		//target.eventsText.setValue("wn " + workwordnum );
		//target.eventsText.show(true);	
		return;			
	}


	target.addwords = function (){
//		var j = workwordnum;
//		var j = workwordlast;
		for(var i = workwordlast+1;(i<=wordsnum-1)&&(workwordnum<=workwordnummax-1);i++){workwordnum++;WA[workwordnum-1].word = i;WA[workwordnum-1].l1=0;WA[workwordnum-1].l2=0;WA[workwordnum-1].l3=0;WA[workwordnum-1].l4=0;WA[workwordnum-1].l5=0;WA[workwordnum-1].l6=0;}
		workwordlast = WA[workwordnum-1].word;

//		target.eventsText.setValue(" wordsnum " + wordsnum+ " workwordnum " + workwordnum+ " last "+ workwordlast + " j " + j+ " WAl " + WA[workwordnum-1].word);				
//		target.eventsText.show(true);	
		return;
	}	

	target.Level1Visible = function (visible) {

		target.BUTTON_001.show(visible);
		target.BUTTON_001.enable(visible);
		target.translate.show(visible);
		target.transcription.show(visible);
		target.Word.show(visible);
		target.split1.show(visible);
		return;
	}


	target.closeDlg = function () {


		//target.eventsText.setValue( " workwordnum " + workwordnum+ " last "+ workwordlast + " WAl " + WA[workwordnum-1].word);				
		//target.eventsText.show(true);	
		return;
	}


	target.changeSettings = function () {

		target.saveSettings();


		if(workwordnum>workwordnummax){workwordnum= workwordnummax;workwordlast = WA[workwordnum-1].word;}else{
			target.InitWA();
			target.addwords();}
		target.WordSelection();	
		return;

	}

	target.ResetStatistics = function () {

		for (var i = 0;i<=wordsnum-1;i++)
		{words[i].studied = 0;}
		workwordnum = 0;
		workwordlast= -1;
		learnedwords = 0;
		target.StatusWords_Label.setValue("Learned: " + learnedwords+"/" +wordsnum);
		return;

	}


	//mix words in Words[] array
	target.MixWord = function () {

		words.shuffle();	
		workwordnum = 0;
		workwordlast= -1;
		target.saveWords();

		return;

	}

	
	target.InitWA = function () {
		for (var i = workwordnum;i<=workwordnummax;i++)
		{WA[i] = new Array({word:0,l1: 0,l2: 0,l3: 0,l4: 0,l5: 0,l6: 0}); 
		WA[i].l1=0;WA[i].l2=0;WA[i].l3=0;WA[i].l4=0;WA[i].l5=0;WA[i].l6=0;WA[i].word=0;}
		return;

	}

	target.InitWin = function () {


		target.BUTTON_001.show(true);
		target.BUTTON_003.show(true);
		target.BUTTON_001.enable(true);
		target.BUTTON_003.enable(true);
		target.BUTTON_001.setText('Reset');
		target.BUTTON_003.setText('Mix');
		curl = 10;
		target.Status_Label.setValue("No word to learn");
		target.StatusScore_Label.show(false);
		target.Win.show(true);

		//target.split1.show(true);
		//target.split1.show(false);
		return;
	}



	target.SETTINGS_DIALOG.doPlusMinus = function (sender) {
		var id;
		var step = 0;
		id = getSoValue(sender, "id");
		n = id.substring(7, 10);
		if(n.charAt(2)=='P'){step = 1;}else{step = -1;}

		if (n.charAt(1) == 'P') {
			lplus+=step;
			if(lplus<1){lplus=1;}
			target.SETTINGS_DIALOG.WAScorePlus_set_Text.setValue(lplus);		
			return;
		}
		if (n.charAt(1) == 'M') {
			lminus+=step;
			if(lminus<1){lminus=1;}
			target.SETTINGS_DIALOG.WAScoreMinus_set_Text.setValue(lminus);		
			return;
		}
		if (n.charAt(1) == 'N') {
			workwordnummax+=step;
			if(workwordnummax<5){workwordnummax=5;}
			if(workwordnummax<l2nummax){l2nummax=workwordnummax;target.SETTINGS_DIALOG.L2Num_set_Text.setValue(l2nummax);}
			if(workwordnummax<l3nummax){l3nummax=workwordnummax;target.SETTINGS_DIALOG.L3Num_set_Text.setValue(l3nummax);}
			target.SETTINGS_DIALOG.WAWorkingnum_set_Text.setValue(workwordnummax);		
			return;
		}




		if (n.charAt(1) == '1') {
			l1val+=step;
			if(l1val<0){l1val=0;}
			target.SETTINGS_DIALOG.L1_set_Text.setValue(l1val);		
			return;
		}
		if (n.charAt(1) == '2') {
			l2val+=step;
			if(l2val<0){l2val=0;}
			target.SETTINGS_DIALOG.L2_set_Text.setValue(l2val);		
			return;
		}
		if (n.charAt(1) == '3') {
			l3val+=step;
			if(l3val<0){l3val=0;}
			target.SETTINGS_DIALOG.L3_set_Text.setValue(l3val);		
			return;
		}
		if (n.charAt(1) == '4') {
			l4val+=step;
			if(l4val<0){l4val=0;}
			target.SETTINGS_DIALOG.L4_set_Text.setValue(l4val);		
			return;
		}
		if (n.charAt(1) == '5') {
			l5val+=step;
			if(l5val<0){l5val=0;}
			target.SETTINGS_DIALOG.L5_set_Text.setValue(l5val);		
			return;
		}
		if (n.charAt(1) == '6') {
			l6val+=step;
			if(l6val<0){l6val=0;}
			target.SETTINGS_DIALOG.L6_set_Text.setValue(l6val);		
			return;
		}

		if (n.charAt(1) == '8') {
			l2nummax+=step;
			if(workwordnummax<l2nummax){l2nummax=workwordnummax;}
			if(l2nummax<1){l2nummax=1;}			
			if(l2nummax>10){l2nummax=10;}
			target.SETTINGS_DIALOG.L2Num_set_Text.setValue(l2nummax);		
			return;
		}
		if (n.charAt(1) == '9') {
			l3nummax+=step;
			if(workwordnummax<l3nummax){l3nummax=workwordnummax;}
			if(l3nummax<1){l3nummax=1;}			
			if(l3nummax>10){l3nummax=10;}
			target.SETTINGS_DIALOG.L3Num_set_Text.setValue(l3nummax);		
			return;
		}

		if (n == "RST") {
			target.ResetStatistics();
			target.saveWords();
			target.addwords();
			target.WordSelection();
			return;
		}	
		if (n == "MIX") {
			target.MixWord();
			target.addwords();
			target.WordSelection();
			return;	
		}	
		if (n == "DEF") {
			//target.eventsText.show(true);	
			lplus = 3;
			lminus = 2;
			l1val = 3;
			l2val = 5;
			l3val = 5;
			l4val = 3;
			l5val = 6;
			l6val = 6;
			l3nummax = 7;
			l2nummax = 5;
			workwordnummax = 10;
			target.SETTINGS_DIALOG.WAScorePlus_set_Text.setValue(lplus);
			target.SETTINGS_DIALOG.WAScoreMinus_set_Text.setValue(lminus);
			target.SETTINGS_DIALOG.WAWorkingnum_set_Text.setValue(workwordnummax);
			target.SETTINGS_DIALOG.L1_set_Text.setValue(l1val);
			target.SETTINGS_DIALOG.L2_set_Text.setValue(l2val);
			target.SETTINGS_DIALOG.L3_set_Text.setValue(l3val);
			target.SETTINGS_DIALOG.L4_set_Text.setValue(l4val);
			target.SETTINGS_DIALOG.L5_set_Text.setValue(l5val);
			target.SETTINGS_DIALOG.L6_set_Text.setValue(l6val);
			target.SETTINGS_DIALOG.L2Num_set_Text.setValue(l2nummax);
			target.SETTINGS_DIALOG.L3Num_set_Text.setValue(l3nummax);
			return;
		}
		if (n == "RB2") {
			target.SETTINGS_DIALOG.RadioB_RB2.enable(true);
			target.setVariable("TRIG",0);
			//target.eventsText.show(true);		
		}		

	}

	target.OpenSettings = function () {
		target.SETTINGS_DIALOG.WAScorePlus_set_Text.setValue(lplus);
		target.SETTINGS_DIALOG.WAScoreMinus_set_Text.setValue(lminus);
		target.SETTINGS_DIALOG.WAWorkingnum_set_Text.setValue(workwordnummax);
		target.SETTINGS_DIALOG.L1_set_Text.setValue(l1val);
		target.SETTINGS_DIALOG.L2_set_Text.setValue(l2val);
		target.SETTINGS_DIALOG.L3_set_Text.setValue(l3val);
		target.SETTINGS_DIALOG.L4_set_Text.setValue(l4val);
		target.SETTINGS_DIALOG.L5_set_Text.setValue(l5val);
		target.SETTINGS_DIALOG.L6_set_Text.setValue(l6val);
		target.SETTINGS_DIALOG.L2Num_set_Text.setValue(l2nummax);
		target.SETTINGS_DIALOG.L3Num_set_Text.setValue(l3nummax);


	}

	target.HideAll = function (){
		target.level3.show(false);
		target.transcription.show(false);
		target.Word.show(false);
		target.keyboard1.show(false);
		target.BUTTON_001.show(false);
		target.BUTTON_002.show(false);
		target.BUTTON_003.show(false);
		target.BUTTON_001.enable(false);
		target.BUTTON_002.enable(false);
		target.BUTTON_003.enable(false);
		target.translate.show(false);
		target.transcription.show(false);
		target.Word.show(false);
	
		target.level2.show(false);

		target.BUTTON_001.show(false);
		target.BUTTON_001.enable(false);
		target.translate.show(false);
		target.transcription.show(false);
		target.Word.show(false);
		target.split1.show(false);

		target.Win.show(false);

		for(var i = 0; i<=9; i ++){
			var k = i + 10;
			target.level2['square'+i].enable(false);
			target.level2['square'+i].show(false);		
			target.level2['square'+k].enable(false);
			target.level2['square'+k].show(false);	
			target.level2['l2word'+i].show(false);
			target.level2['l2word'+k].show(false);	
			target.level3['labelword'+i].show(false);
			target.level3['wordcase'+i].show(false);

		}
		return;
	}

};
tmp();
tmp = undefined;