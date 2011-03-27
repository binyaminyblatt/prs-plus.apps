/* Name: Draughts game
   Original code (c) Ben Chenoweth
   Initial version: March 2011
*/

tmp = function() {
	var Draughts = {
		name: "Draughts",
		title: "Draughts",
		description: "Board game",
		icon: "GAME",
		activate: function () {
			kbook.autoRunRoot.sandbox._icon = Core.config.compat.NodeKinds.getIcon("GAME",0);
			kbook.autoRunRoot.sandbox._title = Draughts.title;		
			kbook.autoRunRoot.sandbox.getSoValue = Core.system.getSoValue;
			kbook.autoRunRoot.sandbox.hasNumericButtons = Core.config.compat.hasNumericButtons;
			kbook.autoRunRoot.path = Core.config.addonsPath + "Draughts/draughts.xml";
			kbook.autoRunRoot.enterIf(kbook.model);
		},
		actions: [{
			name: "Draughts",
			group: "Games",
			icon: "GAME",
			action: function () {
				Draughts.activate();
			}
		}]
	};
	
	Core.addAddon(Draughts);
};
try {
	tmp();
} catch (e) {
	// Core's log
	log.error("in Draughts.js", e);
}