/* Name: CrossWord game
   by Dan Genin, borrowing generously from MineSweeper by Mark Nord
   Initial version: July 2013
*/

tmp = function() {
	var appIcon = "GAME";
	var CrossWord = {
		name: "CrossWord",
		title: "CrossWord",
		description: "Game",
		icon: appIcon,
		activate: function () {
		   try {
			kbook.autoRunRoot.sandbox._icon =  Core.config.compat.NodeKinds.getIcon(appIcon,0);
			kbook.autoRunRoot.sandbox._title = CrossWord.title;		   
			kbook.autoRunRoot.sandbox.getSoValue = Core.system.getSoValue;
			kbook.autoRunRoot.sandbox.setSoValue = Core.system.setSoValue;
			kbook.autoRunRoot.sandbox.getFileContent = Core.io.getFileContent;
			kbook.autoRunRoot.sandbox.listFiles = Core.io.listFiles;
			kbook.autoRunRoot.sandbox.hasNumericButtons = Core.config.compat.hasNumericButtons;
			kbook.autoRunRoot.sandbox.gamesSavePath = Core.config.userGamesSavePath;			
			} catch (ignore) {}
			
			kbook.autoRunRoot.path = Core.config.addonsPath + "CrossWord/crossword.xml";
			kbook.autoRunRoot.enterIf(kbook.model);
		},
		actions: [{
			name: "CrossWord",
			group: "Games",
			icon: appIcon,
			action: function () {
				CrossWord.activate();
			}
		}]
	};
	
	Core.addAddon(CrossWord);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in CrossWord.js", e);
}