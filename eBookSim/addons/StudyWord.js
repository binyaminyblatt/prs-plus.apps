/* Name: StudyWord app
   by Andrey Tryapitsyn
   Initial version: 2013-02-28
*/

tmp = function() {
	var appIcon = "BOOKS";
	var L = Core.lang.getLocalizer("Calendar");
	var StudyWord = {
		name: "StudyWord",
		title: L("TITLE"),
		description: "Flashcard app",
		icon: appIcon,			
		activate: function () {
			kbook.autoRunRoot.sandbox._icon =  Core.config.compat.NodeKinds.getIcon(appIcon,0);
			kbook.autoRunRoot.sandbox._title = StudyWord.title;
			kbook.autoRunRoot.sandbox.getSoValue = Core.system.getSoValue;
			kbook.autoRunRoot.sandbox.setSoValue = Core.system.setSoValue;
			kbook.autoRunRoot.sandbox.hasNumericButtons = Core.config.compat.hasNumericButtons;
			kbook.autoRunRoot.sandbox.getFileContent = Core.io.getFileContent;
			kbook.autoRunRoot.sandbox.startsWith = Core.text.startsWith;
			kbook.autoRunRoot.sandbox.gamesSavePath = Core.config.userGamesSavePath;
			kbook.autoRunRoot.sandbox.L = L;
			kbook.autoRunRoot.path = Core.config.addonsPath + "StudyWord/studyword.xml";
			kbook.autoRunRoot.sandbox.model = Core.config.model;
			kbook.autoRunRoot.enterIf(kbook.model);
		},
		actions: [{
			name: "StudyWord",
			group: "Games",
			title: L("TITLE"),
			icon: appIcon,
			action: function () {
				StudyWord.activate();
			}
		}]
	};
	
	Core.addAddon(StudyWord);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in StudyWord.js", e);
}