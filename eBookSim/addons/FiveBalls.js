/* Name: Fiveballs game
   Original code (c) 2008 Clemenseken
*/  

tmp = function() {
	var FiveBalls = {
		name: "FiveBalls",
		title: "Five Balls",
		description: "Game",
		icon: "GAME",
		activate: function () {
			kbook.autoRunRoot.sandbox.getSoValue = Core.system.getSoValue;
			kbook.autoRunRoot.sandbox.hasNumericButtons = Core.config.compat.hasNumericButtons;
		
			kbook.autoRunRoot.path = Core.config.addonsPath + "FiveBalls/fiveballs.xml";
			kbook.autoRunRoot.enterIf(kbook.model);
		},
		actions: [{
			name: "FiveBalls",
			group: "Games",
			icon: "GAME",
			action: function () {
				FiveBalls.activate();
			}
		}]
	};
	
	Core.addAddon(FiveBalls);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in FiveBalls.js", e);
}