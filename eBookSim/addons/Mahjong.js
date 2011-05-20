/* Name: Mahjong game
   Original code (c) '08 Clemenseken
*/

tmp = function() {
	var Mahjong = {
		name: "Mahjong",
		title: "Mahjong",
		description: "Game",
		icon: "GAME",
		activate: function () {
		   try {
			kbook.autoRunRoot.sandbox.getSoValue = Core.system.getSoValue;
			kbook.autoRunRoot.sandbox.getFileContent = Core.io.getFileContent;			
			kbook.autoRunRoot.sandbox.hasNumericButtons = Core.config.compat.hasNumericButtons;
			} catch (ignore) {}
			
			kbook.autoRunRoot.path = Core.config.addonsPath + "Mahjong/mahjong.xml";
			kbook.autoRunRoot.enterIf(kbook.model);
		},
		actions: [{
			name: "Mahjong",
			group: "Games",
			icon: "GAME",
			action: function () {
				Mahjong.activate();
			}
		}]
	};
	
	Core.addAddon(Mahjong);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in Mahjong.js", e);
}