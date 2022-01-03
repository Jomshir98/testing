// ==UserScript==
// @name         Jmod - Bondage Club
// @namespace    jmod
// @version      3.0.0
// @description  [DEPRECATED] Jomshir's collection of changes and patches for Bondage Club
// @author       jomshir98
// @match        https://www.bondageprojects.elementfx.com/*/BondageClub/*
// @match        https://www.bondageprojects.com/college/*/BondageClub/*
// @homepage     https://jomshir98.github.io/testing/
// @downloadURL  https://jomshir98.github.io/testing/jmod.user.js
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==

setTimeout(
	function () {
		"use strict";
		if (confirm("JMod is now deprecated in favour of BCX.\nWould you like to read more?")) {
			window.open("https://github.com/Jomshir98/bondage-club-extended#readme", "_blank");
		}
	},
	window.unsafeWindow !== undefined ? 1500 : 0
);
