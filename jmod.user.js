// ==UserScript==
// @name         Jmod - Bondage Club
// @namespace    jmod
// @version      1.0.0.0
// @description  Jomshir's collection of changes and patches for Bondage Club
// @author       jomshir98
// @match        https://www.bondageprojects.elementfx.com/*/BondageClub/*
// @match        https://www.bondageprojects.com/college/*/BondageClub/*
// @homepage     https://jomshir98.github.io/testing/
// @updateURL    https://jomshir98.github.io/testing/jmod.user.js
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==

window.setTimeout(function () {
	"use strict";
	const w = window.unsafeWindow || window;
	if (w.__jmod === true) return;
	w.__jmod = true;
	if (typeof w.ImportBondageCollege !== "function") {
		alert("Club not detected! Please only use this while you have Club open!");
		return;
	}

	// Utils

	const clipboardAvailable = Boolean(navigator.clipboard);

	// Tools

	function InfoBeep(msg) {
		console.log("Jmod msg:", msg);
		ServerBeep = { MemberNumber: 0, MemberName: "", ChatRoomName: null, Timer: CurrentTime + 3000, Message: msg };
	}

	function ChatRoomActionMessage(msg) {
		if (msg != "") ServerSend("ChatRoomChat", {
			Content: "Beep", Type: "Action", Dictionary: [
				{ Tag: "Beep", Text: "msg" },
				{ Tag: "Biep", Text: "msg" },
				{ Tag: "Sonner", Text: "msg" },
				{ Tag: "msg", Text: msg }]
		});
	}

	function ChatRoomSendLocal(msg) {
		ChatRoomMessage({
			Sender: Player.MemberNumber,
			Type: "Whisper",
			Content: msg
		});
	}

	function j_IsCloth(item) {
		if (item.Asset) item = item.Asset;
		return item.Group.Category === "Appearance" && item.Group.AllowNone && item.Group.Clothing && !item.Group.BodyCosplay;
	}

	function j_IsBind(item) {
		if (item.Asset) item = item.Asset;
		if (item.Group.Category !== "Item" || item.Group.BodyCosplay) return false;
		return !["ItemNeck", "ItemNeckAccessories", "ItemNeckRestraints"].includes(item.Group.Name);
	}

	function j_SwapCharacterClothesAndBinds(C1, C2) {
		const o1 = C1.Appearance.filter(i => j_IsCloth(i) || j_IsBind(i));
		C1.Appearance = C1.Appearance.filter(i => !j_IsCloth(i) && !j_IsBind(i));
		const o2 = C2.Appearance.filter(i => j_IsCloth(i) || j_IsBind(i));
		C2.Appearance = C2.Appearance.filter(i => !j_IsCloth(i) && !j_IsBind(i));
		C1.Appearance = C1.Appearance.concat(o2);
		C2.Appearance = C2.Appearance.concat(o1);
		const tp = C1.Pose;
		C1.Pose = C2.Pose;
		C2.Pose = tp;

		w.CharacterRefresh(C1);
		w.CharacterRefresh(C2);
		w.ChatRoomCharacterUpdate(C1);
		w.ChatRoomCharacterUpdate(C2);
	}
	w.j_SwapCharacterClothesAndBinds = j_SwapCharacterClothesAndBinds;

	// Controlable patches

	const o_SpeechGarble = w.SpeechGarble;
	let antigarble = 0;
	w.SpeechGarble = (C, CD) => {
		if (antigarble === 2) return CD;
		let res = o_SpeechGarble(C, CD);
		if (CD !== res && typeof res === "string" && antigarble === 1) res += " <> " + CD;
		return res;
	}


	// Chat control

	const o_ChatRoomSendChat = w.ChatRoomSendChat;

	w.ChatRoomSendChat = function () {
		const msg = ElementValue("InputChat").trim();
		if (msg.startsWith(".") && !msg.startsWith("..")) {
			const command = msg.split(" ")[0].substr(1);
			const rest = msg.substr(command.length + 2);
			if (RunCommand(command.toLocaleLowerCase(), rest)) {
				ElementValue("InputChat", "");
			}
			return;
		} else if (msg.startsWith("..")) {
			document.getElementById("InputChat").value = msg.substr(1);
		}
		return o_ChatRoomSendChat();
	}

	function RunCommand(cmd, rest) {
		if (cmd === "" || cmd === "help") {
			ChatRoomSendLocal(`Jmod commands:
.help - display this help [alias: . ]
.action [action] - send custom (action) [alias: .a ]
.antigarble [0|1|2] - set garble prevention to show [garbled|both|ungarbled] messages (only affects received messages!)
.patches - show info about currently applied patches
`);
		} else if (cmd === "a" || cmd === "action") {
			ChatRoomActionMessage(rest);
		} else if (cmd === "antigarble") {
			if (["0", "1", "2"].includes(rest)) {
				antigarble = Number.parseInt(rest);
				ChatRoomSendLocal(`Antigarble set to ${antigarble}`);
			} else {
				ChatRoomSendLocal(`Invalid antigarble level; use 0 1 or 2`);
			}
		} else if (cmd === "patches") {
			ChatRoomSendLocal(`Applied patches:
AsylumEntranceCanWander - Always can move in asylum
CheatAllow - Enable built-in cheats
LoginMistressItems - Mistress-only items are always available
LoginStableItems - Stable exam items are always available
InputChatMaxLength - Message limit increased to 1000 from 250
WardrobeIO - Import and export buttons in wardrobe for current clothes
[experimental] ExpressionMenu - New menu for facial expressions
`);
		} else {
			ChatRoomSendLocal(`Unknown command ${cmd} - use .help to show commands or two dots to send message starting with a dot`);
			return false;
		}
		return true;
	}

	// Wardrobe

	function j_WardrobeExportSelectionClothes() {
		const save = w.CharacterAppearanceSelection.Appearance.filter(j_IsCloth).map(w.WardrobeAssetBundle);
		return LZString.compressToBase64(JSON.stringify(save));
	}

	function j_WardrobeImportSelectionClothes(data) {
		if (typeof data !== "string" || data.length < 1) return "No data";
		try {
			if (data[0] !== "[") data = LZString.decompressFromBase64(data);
			data = JSON.parse(data);
			if (!Array.isArray(data)) return "Bad data";
		} catch (error) {
			console.warn(error);
			return "Bad data";
		}
		const C = w.CharacterAppearanceSelection;
		C.Appearance = C.Appearance.filter(a => a.Asset.Group.Category !== "Appearance" || !a.Asset.Group.AllowNone || !a.Asset.Group.Clothing);
		for (const cloth of data) {
			if (C.Appearance.some(a => a.Asset.Group.Name === cloth.Group)) continue;
			const A = w.Asset.find(a => a.Group.Name === cloth.Group && j_IsCloth(a) && a.Name === cloth.Name);
			if (A != null) {
				w.CharacterAppearanceSetItem(C, cloth.Group, A, cloth.Color, 0, null, false);
				const item = w.InventoryGet(C, cloth.Group);
				if (cloth.Property && item) {
					if (item.Property == null) item.Property = {};
					Object.assign(item.Property, cloth.Property);
				}
			} else {
				console.warn(`Clothing not found: `, cloth);
			}
		}
		w.CharacterLoadCanvas(C);
		return true;
	}

	w.j_WardrobeExportSelectionClothes = j_WardrobeExportSelectionClothes;
	w.j_WardrobeImportSelectionClothes = j_WardrobeImportSelectionClothes;

	const s_AppearanceRun = w.AppearanceRun;
	w.AppearanceRun = function () {
		s_AppearanceRun();
		if (w.CharacterAppearanceMode == "Wardrobe" && clipboardAvailable) {
			DrawButton(1300, 125, 330, 50, "Export", "White", "");
			DrawButton(1650, 125, 330, 50, "Import", "White", "");
		}
	}

	const s_AppearanceClick = w.AppearanceClick;
	w.AppearanceClick = function () {
		if (w.CharacterAppearanceMode == "Wardrobe" && clipboardAvailable) {
			// Export
			if (w.MouseIn(1300, 125, 330, 50)) {
				window.setTimeout(async () => {
					await navigator.clipboard.writeText(j_WardrobeExportSelectionClothes());
					w.CharacterAppearanceWardrobeText = "Copied to clipboard!";
				}, 0);
				return;
			}
			// Import
			if (w.MouseIn(1650, 125, 330, 50)) {
				window.setTimeout(async () => {
					const data = await navigator.clipboard.readText();
					const res = j_WardrobeImportSelectionClothes(data);
					if (res !== true) {
						w.CharacterAppearanceWardrobeText = `Import error: ${res}`;
					}
				}, 0);
				return;
			}
		}
		s_AppearanceClick();
	}

	// Common patches
	w.AsylumEntranceCanWander = () => true;
	w.CheatValidate = () => { };
	w.CheatAllow = true;
	for (const C of CheatList) {
		const AC = localStorage.getItem("BondageClubCheat" + C);
		if ((AC != null) && (AC.toUpperCase() == "TRUE")) CheatActivated.push(C);
	}

	w.LoginMistressItems = function () {
		InventoryAdd(Player, "MistressGloves", "Gloves", false);
		InventoryAdd(Player, "MistressBoots", "Shoes", false);
		InventoryAdd(Player, "MistressTop", "Cloth", false);
		InventoryAdd(Player, "MistressBottom", "ClothLower", false);
		InventoryAdd(Player, "MistressPadlock", "ItemMisc", false);
		InventoryAdd(Player, "MistressPadlockKey", "ItemMisc", false);
		InventoryAdd(Player, "MistressTimerPadlock", "ItemMisc", false);
	}

	w.LoginStableItems = function () {
		InventoryAdd(Player, "HarnessPonyBits", "ItemMouth", false);
		InventoryAdd(Player, "HarnessPonyBits", "ItemMouth2", false);
		InventoryAdd(Player, "HarnessPonyBits", "ItemMouth3", false);
		InventoryAdd(Player, "PonyBoots", "Shoes", false);
		InventoryAdd(Player, "PonyBoots", "ItemBoots", false);
		InventoryAdd(Player, "PonyHood", "ItemHood", false);
		InventoryAdd(Player, "HoofMittens", "ItemHands", false);
	}

	if (w.Player.Inventory.length > 0) {
		w.LoginMistressItems();
		w.LoginStableItems();
		w.ServerPlayerInventorySync();
	}

	const o_ChatRoomCreateElement = w.ChatRoomCreateElement;
	w.ChatRoomCreateElement = function () {
		o_ChatRoomCreateElement();
		document.getElementById("InputChat").setAttribute("maxLength", 1000);
	}
	if (document.getElementById("InputChat") != null) {
		document.getElementById("InputChat").setAttribute("maxLength", 1000);
	}


	// Testing stuff

	let DialogFacialExpressionsSelected = -1;
	const o_DialogLeave = w.DialogLeave;
	w.DialogLeave = function () {
		o_DialogLeave();
		DialogFacialExpressionsSelected = -1;
	}

	w.DialogFacialExpressionsBuild = function () {
		DialogFacialExpressions = [];
		for (let I = 0; I < Player.Appearance.length; I++) {
			const PA = Player.Appearance[I];
			let ExpressionList = PA.Asset.Group.AllowExpression
			if (!ExpressionList || !ExpressionList.length || PA.Asset.Group.Name == "Eyes2") continue;
			ExpressionList = ExpressionList.slice();
			if (!ExpressionList.includes(null)) ExpressionList.unshift(null);
			const Item = {};
			Item.Appearance = PA;
			Item.Group = PA.Asset.Group.Name;
			Item.CurrentExpression = (PA.Property == null) ? null : PA.Property.Expression;
			Item.ExpressionList = ExpressionList;
			DialogFacialExpressions.push(Item);
		}
		// Temporary (?) solution to make the facial elements appear in a more logical order, as their alphabetical order currently happens to match up
		DialogFacialExpressions = DialogFacialExpressions.sort(function (a, b) {
			return a.Appearance.Asset.Group.Name < b.Appearance.Asset.Group.Name ? -1 : a.Appearance.Asset.Group.Name > b.Appearance.Asset.Group.Name ? 1 : 0;
		});
	}
	w.DialogFacialExpressions = [];

	w.DialogDrawExpressionMenu = function () {
		// Draw the expression groups
		DrawText(DialogFind(Player, "FacialExpression"), 165, 25, "White", "Black");
		DrawButton(255, 50, 90, 90, "", "White", "Icons/WinkL.png", DialogFind(Player, "WinkLFacialExpressions"));
		DrawButton(155, 50, 90, 90, "", "White", "Icons/WinkR.png", DialogFind(Player, "WinkRFacialExpressions"));
		DrawButton(20, 50, 90, 90, "", "White", "Icons/Reset.png", DialogFind(Player, "ClearFacialExpressions"));
		if (!DialogFacialExpressions || !DialogFacialExpressions.length) DialogFacialExpressionsBuild();
		for (let I = 0; I < DialogFacialExpressions.length; I++) {
			const FE = DialogFacialExpressions[I];
			const OffsetY = 185 + 100 * I;

			DrawButton(20, OffsetY, 90, 90, "", I == DialogFacialExpressionsSelected ? "Cyan" : "White", "Assets/Female3DCG/" + FE.Group + (FE.CurrentExpression ? "/" + FE.CurrentExpression : "") + "/Icon.png");

			// Draw the table with expressions
			if (I == DialogFacialExpressionsSelected) {
				for (let j = 0; j < FE.ExpressionList.length; j++) {
					const EOffsetX = 155 + 100 * (j % 3);
					const EOffsetY = 185 + 100 * Math.floor(j / 3);
					DrawButton(EOffsetX, EOffsetY, 90, 90, "", (FE.ExpressionList[j] == FE.CurrentExpression ? "Pink" : "White"), "Assets/Female3DCG/" + FE.Group + (FE.ExpressionList[j] ? "/" + FE.ExpressionList[j] : "") + "/Icon.png");
				}
			}
		}
	}

	w.DialogClickExpressionMenu = function () {
		if (MouseIn(20, 50, 90, 90)) {
			DialogFacialExpressions.forEach(FE => {
				CharacterSetFacialExpression(Player, FE.Group);
				FE.CurrentExpression = null;
			});
		} else if (MouseIn(155, 50, 90, 90)) {
			const EyesExpression = WardrobeGetExpression(Player);
			const CurrentExpression = DialogFacialExpressions.find(FE => FE.Group == "Eyes").CurrentExpression;
			CharacterSetFacialExpression(Player, "Eyes1", (EyesExpression.Eyes !== "Closed") ? "Closed" : (CurrentExpression !== "Closed" ? CurrentExpression : null));
		} else if (MouseIn(255, 50, 90, 90)) {
			const EyesExpression = WardrobeGetExpression(Player);
			const CurrentExpression = DialogFacialExpressions.find(FE => FE.Group == "Eyes").CurrentExpression;
			CharacterSetFacialExpression(Player, "Eyes2", (EyesExpression.Eyes2 !== "Closed") ? "Closed" : (CurrentExpression !== "Closed" ? CurrentExpression : null));
		} else {
			// Expression category buttons
			for (let I = 0; I < DialogFacialExpressions.length; I++) {
				if (MouseIn(20, 185 + 100 * I, 90, 90)) {
					DialogFacialExpressionsSelected = I;
				}
			}

			// Expression table
			if (DialogFacialExpressionsSelected >= 0 && DialogFacialExpressionsSelected < DialogFacialExpressions.length) {
				const FE = DialogFacialExpressions[DialogFacialExpressionsSelected];
				for (let j = 0; j < FE.ExpressionList.length; j++) {
					const EOffsetX = 155 + 100 * (j % 3);
					const EOffsetY = 185 + 100 * Math.floor(j / 3);
					if (MouseIn(EOffsetX, EOffsetY, 90, 90)) {
						CharacterSetFacialExpression(Player, FE.Group, FE.ExpressionList[j]);
						FE.CurrentExpression = FE.ExpressionList[j];
					}
				}
			}
		}
	}

	w.DialogSelfMenuOptions[0] =
	{
		Name: "Expression",
		IsAvailable: () => true,
		Draw: w.DialogDrawExpressionMenu,
		Click: w.DialogClickExpressionMenu,
	};

	InfoBeep("Jmod loaded!");
}, 1500);
