// Name: calculator
// Description: loader for calculator autorun
// Author: Mark Nord
// Based on work of: obelix, kartu
//
// History:
//	2010-09-16 Mark Nord - initial release

var Test = {
	name: "TestApp",
	title: "TestApp",
	description: "",
	icon: "GLOBUS",
	activate: function () {
	  try {	
		/*var params = {	hasNumericButtons : true,
				Core: Core};				 
		kbook.autoRunRoot.params = params; */
		kbook.autoRunRoot.hasNumericButtons = true;
		kbook.autoRunRoot.getSoValue = Core.system.getSoValue;
		kbook.autoRunRoot.setSoValue = Core.system.setSoValue;
		kbook.autoRunRoot.compile = Core.system.compile;
	 } catch(e) {};	
		kbook.autoRunRoot.path = Core.config.addonRoot + "TestApp/TestApp.xml";
		kbook.autoRunRoot.enterIf(kbook.model);
	},
	actions: [{
		name: "Test",
		group: "Games",
		icon: "GLOBUS",
		action: function () {
			Test.activate();
		}
	}]
};

return Test;