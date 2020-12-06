// ==UserScript==
// @name         Jmod - Bondage Club
// @namespace    jmod
// @version      1.0.2.0
// @description  Jomshir's collection of changes and patches for Bondage Club
// @author       jomshir98
// @match        https://www.bondageprojects.elementfx.com/*/BondageClub/*
// @match        https://www.bondageprojects.com/college/*/BondageClub/*
// @homepage     https://jomshir98.github.io/testing/
// @downloadURL  https://jomshir98.github.io/testing/jmod.user.js
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

	const version = "1.0.2.0";
	const resourceUrl = "https://jomshir98.github.io/testing/Resources";

	if (w.TempCanvas === undefined) {
		w.TempCanvas = document.createElement("canvas").getContext("2d");
	}
	// Return a semi-transparent copy of a canvas
	function DrawAlpha(Canvas, Alpha) {
		// If there's nothing to do simply return the original image
		if ((Alpha == null) || (Alpha >= 1.0)) return Canvas;
		// Copy the image to the temp canvas
		w.TempCanvas.canvas.width = Canvas.width;
		w.TempCanvas.canvas.height = Canvas.height;
		w.TempCanvas.globalCompositeOperation = "copy";
		w.TempCanvas.drawImage(Canvas, 0, 0);
		// Apply the alpha
		w.TempCanvas.globalCompositeOperation = "destination-in";
		w.TempCanvas.fillStyle = "rgba(0,0,0," + Alpha + ")";
		w.TempCanvas.fillRect(0, 0, Canvas.width, Canvas.height);
		return w.TempCanvas.canvas;
	}

	function DrawImage(Source, X, Y, Alpha) {
		var Img = DrawGetImage(Source);
		if (!Img.complete) return false;
		if (!Img.naturalWidth) return true;
		MainCanvas.drawImage(DrawAlpha(Img, Alpha), X, Y);
		return true;
	}

	function DrawImageCanvasColorizeImage(Img, Canvas, X, Y, Zoom, Color, Filter, AlphaMasks, Alpha) {
		// Make sure that the starting image is loaded

		if (!Img.complete) return false;
		if (!Img.naturalWidth) return true;

		// Variable initialization
		if (Alpha == null) Alpha = 1.0;
		var FullAlpha = (Filter == false) ? false : true;
		var width = Img.width;
		var height = Img.height;

		// Draw original image onto the working canvas
		w.TempCanvas.canvas.width = width;
		w.TempCanvas.canvas.height = height;
		w.TempCanvas.globalCompositeOperation = "copy";
		w.TempCanvas.drawImage(Img, 0, 0);

		// This is still needed because blend operations don't support conditionals
		// TODO: Convert eyes/vagina into multi-layer objects.
		if (!FullAlpha) {
			var rgbColor = DrawHexToRGB(Color);
			var trans;
			var imageData = w.TempCanvas.getImageData(0, 0, width, height);
			var data = imageData.data;
			for (var p = 0, len = data.length; p < len; p += 4) {
				trans = ((data[p] + data[p + 1] + data[p + 2]) / 383);
				if ((data[p + 3] == 0) || (trans < 0.8) || (trans > 1.2)) continue;
				data[p + 0] = rgbColor.r * trans;
				data[p + 1] = rgbColor.g * trans;
				data[p + 2] = rgbColor.b * trans;
				data[p + 3] *= Alpha;
			}

			w.TempCanvas.putImageData(imageData, 0, 0);
			if (AlphaMasks && AlphaMasks.length) {
				AlphaMasks.forEach(([x, y, w, h]) => w.TempCanvas.clearRect(x - X, y - Y, w, h));
			}
			// Draw the modified canvas onto the destination
			Canvas.drawImage(w.TempCanvas.canvas, 0, 0, width, height, X, Y, width * Zoom, height * Zoom);
			return true;
		}

		// Original per-pixel method
		var rgbColor = DrawHexToRGB(Color);
		var trans;
		var imageData = w.TempCanvas.getImageData(0, 0, width, height);
		var data = imageData.data;
		for (var p = 0, len = data.length; p < len; p += 4) {
			if (data[p + 3] == 0) continue;
			trans = ((data[p] + data[p + 1] + data[p + 2]) / 383);
			data[p + 0] = rgbColor.r * trans;
			data[p + 1] = rgbColor.g * trans;
			data[p + 2] = rgbColor.b * trans;
			data[p + 3] *= Alpha;
		}

		w.TempCanvas.putImageData(imageData, 0, 0);
		if (AlphaMasks && AlphaMasks.length) {
			AlphaMasks.forEach(([x, y, w, h]) => w.TempCanvas.clearRect(x - X, y - Y, w, h));
		}
		// Draw the modified canvas onto the destination
		Canvas.drawImage(w.TempCanvas.canvas, 0, 0, width, height, X, Y, width * Zoom, height * Zoom);
		return true;
	}

	// Tools

	let j_Allow = false;
	w.j_Allow = function _j_Allow(allow) {
		if (typeof allow === "boolean") {
			j_Allow = allow;
			if (allow) {
				console.warn("Cheats enabled; please be careful not to break things");
			} else {
				console.info("Cheats disabled");
			}
		}
	};

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

	const o_ChatRoomMessage = w.ChatRoomMessage;

	function ChatRoomSendLocal(msg) {
		o_ChatRoomMessage({
			Sender: Player.MemberNumber,
			Type: "Whisper",
			Content: msg
		});
	}

	function j_IsCloth(item, allowCosplay = false) {
		if (item.Asset) item = item.Asset;
		return item.Group.Category === "Appearance" && item.Group.AllowNone && item.Group.Clothing && (allowCosplay || !item.Group.BodyCosplay);
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

	function j_CopyCharacterClothesAndBinds(TargetCharacter, SourceCharacter) {
		TargetCharacter.Appearance = TargetCharacter.Appearance.filter(i => !j_IsCloth(i) && !j_IsBind(i));
		const o2 = SourceCharacter.Appearance.filter(i => j_IsCloth(i) || j_IsBind(i));
		TargetCharacter.Appearance = TargetCharacter.Appearance.concat(o2);
		TargetCharacter.Pose = SourceCharacter.Pose;

		w.CharacterRefresh(TargetCharacter);
		w.ChatRoomCharacterUpdate(TargetCharacter);
	}
	w.j_CopyCharacterClothesAndBinds = j_CopyCharacterClothesAndBinds;


	function j_SendHiddenMessage(type, message, Target = null) {
		ServerSend("ChatRoomChat", {
			Content: "JModMsg",
			Type: "Hidden",
			Target,
			Dictionary: { type, message },
		});
	}

	const hiddenMessageHandlers = new Map();

	w.ChatRoomMessage = function (data) {
		if (data !== null && typeof data === "object" && data.Type === "Hidden" && data.Content === "JModMsg" && typeof data.Sender === "number") {
			const { type, message } = data.Dictionary;
			if (typeof type === "string") {
				const handler = hiddenMessageHandlers.get(type);
				if (handler === undefined) {
					console.warn("JMod - Hidden message no handler", type, message);
				} else {
					handler(data.Sender, message);
				}
			}
		} else {
			if (data.Type === "Action" && data.Content === "ServerEnter") {
				j_Announce();
			}
			return o_ChatRoomMessage(data);
		}
	}

	// Controlable patches

	const o_SpeechGarble = w.SpeechGarble;
	let antigarble = 0;
	w.SpeechGarble = (C, CD) => {
		if (antigarble === 2) return CD;
		let res = o_SpeechGarble(C, CD);
		if (CD !== res && typeof res === "string" && antigarble === 1) res += " <> " + CD;
		return res;
	}

	const IsSMod = typeof w.ChatControlHead === "function";

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

	function j_WardrobeExportSelectionClothes(includeBinds = false) {
		const save = w.CharacterAppearanceSelection.Appearance.filter(a => j_IsCloth(a, true) || includeBinds && j_IsBind(a)).map(w.WardrobeAssetBundle);
		return LZString.compressToBase64(JSON.stringify(save));
	}

	function j_WardrobeImportSelectionClothes(data, includeBinds, force = false) {
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

		if (includeBinds && !force && C.Appearance.some(a => j_IsBind(a) && a.Property?.Effect?.includes("Lock"))) {
			return "Character is bound";
		}

		const Allow = a => j_IsCloth(a, CharacterAppearanceSelection.ID === 0) || includeBinds && j_IsBind(a);

		C.Appearance = C.Appearance.filter(a => !Allow(a));
		for (const cloth of data) {
			if (C.Appearance.some(a => a.Asset.Group.Name === cloth.Group)) continue;
			const A = w.Asset.find(a => a.Group.Name === cloth.Group && a.Name === cloth.Name && Allow(a));
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
		w.CharacterRefresh(C);
		return true;
	}

	w.j_WardrobeExportSelectionClothes = j_WardrobeExportSelectionClothes;
	w.j_WardrobeImportSelectionClothes = j_WardrobeImportSelectionClothes;

	const s_AppearanceRun = w.AppearanceRun;
	let j_WardrobeIncludeBinds = false;
	w.AppearanceRun = function () {
		s_AppearanceRun();
		if (w.CharacterAppearanceMode == "Wardrobe" && clipboardAvailable) {
			DrawButton(1457, 125, 50, 50, "", "White", j_WardrobeIncludeBinds ? "Icons/Checked.png" : "", "Include restraints");
			DrawButton(1534, 125, 207, 50, "Export", "White", "");
			DrawButton(1768, 125, 207, 50, "Import", "White", "");
		}
	}

	const s_AppearanceClick = w.AppearanceClick;
	w.AppearanceClick = function () {
		if (w.CharacterAppearanceMode == "Wardrobe" && clipboardAvailable) {
			// Restraints toggle
			if (w.MouseIn(1457, 125, 50, 50)) {
				j_WardrobeIncludeBinds = !j_WardrobeIncludeBinds;
			}
			// Export
			if (w.MouseIn(1534, 125, 207, 50)) {
				window.setTimeout(async () => {
					await navigator.clipboard.writeText(j_WardrobeExportSelectionClothes(j_WardrobeIncludeBinds));
					w.CharacterAppearanceWardrobeText = "Copied to clipboard!";
				}, 0);
				return;
			}
			// Import
			if (w.MouseIn(1768, 125, 207, 50)) {
				window.setTimeout(async () => {
					if (typeof navigator.clipboard.readText !== "function") {
						w.CharacterAppearanceWardrobeText = "Please press Ctrl+V";
						return;
					}
					const data = await navigator.clipboard.readText();
					const res = j_WardrobeImportSelectionClothes(data, j_WardrobeIncludeBinds, j_Allow);
					w.CharacterAppearanceWardrobeText = res !== true ? `Import error: ${res}` : "Imported!";
				}, 0);
				return;
			}
		}
		s_AppearanceClick();
	}
	document.addEventListener("paste", ev => {
		if (CurrentScreen === "Appearance" && CharacterAppearanceMode === "Wardrobe") {
			ev.preventDefault();
			ev.stopImmediatePropagation();
			const data = (ev.clipboardData || window.clipboardData).getData('text');
			const res = j_WardrobeImportSelectionClothes(data, j_WardrobeIncludeBinds, j_Allow);
			w.CharacterAppearanceWardrobeText = res !== true ? `Import error: ${res}` : "Imported!";
		}
	});

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
		const elem = document.getElementById("InputChat");
		elem.setAttribute("maxLength", 1000);
		ChatroomSM.SetInputElement(elem);
	}
	if (document.getElementById("InputChat") != null) {
		document.getElementById("InputChat").setAttribute("maxLength", 1000);
	}

	const o_ChatRoomLeave = w.ChatRoomLeave;
	w.ChatRoomLeave = function () {
		o_ChatRoomLeave();
		ChatroomSM.SetInputElement(null);
	}

	// Cheats

	const o_Player_CanChange = w.Player.CanChange;
	w.Player.CanChange = () => j_Allow || o_Player_CanChange.call(w.Player);

	const o_ChatRoomCanLeave = w.ChatRoomCanLeave;
	w.ChatRoomCanLeave = () => j_Allow || o_ChatRoomCanLeave();

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

	// Multiplayer interactive
	class ChatRoomStatusManager {

		constructor() {
			this.InputTimeoutMs = 3 * 1000;

			this.StatusTypes = {
				None: "None",
				Typing: "Typing",
				Emote: "Emote",
				Whisper: "Whisper"
			};

			/**
			 * @private
			 * @type {HTMLTextAreaElement|null}
			 */
			this.InputElement = null;

			/**
			 * @private
			 * @type {number|null}
			 */
			this.InputTimeout = null;

			this.Status = this.StatusTypes.None;
		}

		/**
		 * @param {HTMLTextAreaElement|null} elem 
		 */
		SetInputElement(elem) {
			if (this.InputElement !== elem) {
				this.InputElement = elem;
				if (elem !== null) {
					elem.addEventListener("blur", this.InputEnd.bind(this));
					elem.addEventListener("input", this.InputChange.bind(this));
				}
			}
		}

		SetStatus(type, target = null) {
			if (type !== this.Status) {
				if (target !== null && this.Status === this.StatusTypes.Whisper) {
					this.SetStatus(this.StatusTypes.None, null);
				}
				this.Status = type;
				j_SendHiddenMessage("ChatRoomStatusEvent", { Type: type, Target: target }, target);
				if (IsSMod) ServerSend("ChatRoomStatusEvent", { Type: type, Target: target });
			}
		}

		InputChange() {
			const value = this.InputElement?.value;
			if (typeof value === "string" && value.length > 1) {
				let type = this.StatusTypes.Typing;
				let target = null;
				if (value.startsWith("*") || value.startsWith("/me ") || value.startsWith("/emote ") || value.startsWith("/action ")) {
					type = this.StatusTypes.Emote;
				} else if (value.startsWith("/")) {
					return this.InputEnd();
				} else if (ChatRoomTargetMemberNumber !== null) {
					type = this.StatusTypes.Whisper;
					target = ChatRoomTargetMemberNumber;
				}
				if (this.InputTimeout !== null) {
					window.clearTimeout(this.InputTimeout);
				}
				this.InputTimeout = window.setTimeout(this.InputEnd.bind(this), this.InputTimeoutMs);
				this.SetStatus(type, target);
			} else {
				this.InputEnd();
			}
		}

		InputEnd() {
			if (this.InputTimeout !== null) {
				window.clearTimeout(this.InputTimeout);
				this.InputTimeout = null;
			}
			this.SetStatus(this.StatusTypes.None);
		}
	}

	let ChatroomSM = new ChatRoomStatusManager();
	if (document.getElementById("InputChat") != null) {
		ChatroomSM.SetInputElement(document.getElementById("InputChat"));
	}

	if (IsSMod) {
		console.warn("SMod load!");
		w.ChatRoomSM = ChatroomSM;
	} else {

	}

	hiddenMessageHandlers.set("ChatRoomStatusEvent", (src, data) => {
		for (const char of ChatRoomCharacter) {
			if (char.MemberNumber === src) {
				char.Status = data.Target == null || data.Target === w.Player.MemberNumber ? data.Type : "None";
			}
		}
	});

	hiddenMessageHandlers.set("Hello", (src, data) => {
		for (const char of ChatRoomCharacter) {
			if (char.MemberNumber === src) {
				if (!char.JMod) {
					char.JMod = true;
					console.log(`${char.Name} is using JMod version ${data}`);
				}
			}
		}
	});

	function j_Announce() {
		j_SendHiddenMessage("Hello", version);
	}

	function ChatRoomDrawFriendList(C, Space, Zoom, CharX, CharY) {
		const Char = ChatRoomCharacter[C];
		let Color = "#ffffff";
		let Friend = Char && Player.FriendList.includes(Char.MemberNumber);
		let IsMutual = Friend;
		if (IsSMod) {
			const DChar = ChatRoomData && ChatRoomData.Character && ChatRoomData.Character[C];
			IsMutual = Char && (FriendListMutual.indexOf(Char.MemberNumber) >= 0) || (Char.ID == 0);
			const ClientActive = Char && IsCharacterOnNServer(Char);
			const ServerActive = DChar && AdvancedServerMode && DChar.OnNonameServer == true;
			if (ClientActive) {
				Friend = true;
				Color = "#840c24";
			}
			if (ServerActive) {
				if (DChar && DChar.UnConnected == true) {
					if (ClientActive) Color = "#0000ac";
					else Color = "#00acac";
				} else {
					if (ClientActive) Color = "#00ac00";
					else Color = "#acac00";
				}
			}
		}
		if (Char.JMod) {
			Friend = true;
			Color = "#3737ed";
		}
		if (Friend) {
			DrawImageCanvasColorizeImage(DrawGetImage("Icons/Small/FriendList.png"), MainCanvas, CharX + 375 * Zoom, CharY, Zoom, Color, null, null, IsMutual ? 1 : 0.5);
		}
	}

	w.ChatRoomDrawCharacter = function (DoClick) {
		ChatRoomCharacter = ChatRoomCharacter.filter(Boolean);
		// Intercepts the online game chat room clicks if we need to
		if (DoClick && OnlineGameClick()) return;

		// The darkness factors varies with blindness level (1 is bright, 0 is pitch black)
		let DarkFactor = 1.0;
		let RenderSingle = false;

		// Determine the horizontal & vertical position and zoom levels to fit all characters evenly in the room
		const Space = ChatRoomCharacter.length >= 2 ? 1000 / Math.min(ChatRoomCharacter.length, 5) : 500;
		const Zoom = ChatRoomCharacter.length >= 3 ? Space / 400 : 1;
		const X = ChatRoomCharacter.length >= 3 ? (Space - 500 * Zoom) / 2 : 0;
		const Y = ChatRoomCharacter.length <= 5 ? 1000 * (1 - Zoom) / 2 : 0;

		if (Player.GameplaySettings && (Player.GameplaySettings.SensDepChatLog == "SensDepExtreme" && Player.GameplaySettings.BlindDisableExamine) && (Player.GetBlindLevel() >= 3)) {
			RenderSingle = true
			Space = 500
			Zoom = 1
			X = 0
			Y = 0
		}

		// If there's 2 characters, it's zoomed in
		if (!DoClick && Player.GetBlindLevel() < 3) {
			DrawImageZoomCanvas("Backgrounds/" + ChatRoomData.Background + ".jpg", MainCanvas, 500 * (2 - 1 / Zoom), 0, 1000 / Zoom, 1000, 0, Y, 1000, 1000 * Zoom);

			// Draws a black overlay if the character is blind
			if (Player.GetBlindLevel() == 2) DarkFactor = 0.15;
			else if (Player.GetBlindLevel() == 1) DarkFactor = 0.3;
			if (DarkFactor < 1.0) DrawRect(0, 0, 2000, 1000, "rgba(0,0,0," + (1.0 - DarkFactor) + ")");
		}

		// Draw the characters (in click mode, we can open the character menu or start whispering to them)
		for (let C = 0; C < ChatRoomCharacter.length; C++) {
			const CharX = RenderSingle ? 0 : X + (C % 5) * Space;
			const CharY = RenderSingle ? 0 : Y + Math.floor(C / 5) * 500;
			if (RenderSingle && ChatRoomCharacter[C].ID != 0)
				continue;
			if (DoClick) {
				if (MouseIn(CharX, CharY, 450 * Zoom, 1000 * Zoom)) {
					if ((MouseY <= CharY + 900 * Zoom) && (Player.GameplaySettings && Player.GameplaySettings.BlindDisableExamine ? (!(Player.GetBlindLevel() >= 3) || ChatRoomCharacter[C].ID == Player.ID) : true)) {

						// If the arousal meter is shown for that character, we can interact with it
						if ((ChatRoomCharacter[C].ID == 0) || (Player.ArousalSettings.ShowOtherMeter == null) || Player.ArousalSettings.ShowOtherMeter)
							if ((ChatRoomCharacter[C].ID == 0) || ((ChatRoomCharacter[C].ArousalSettings != null) && (ChatRoomCharacter[C].ArousalSettings.Visible != null) && (ChatRoomCharacter[C].ArousalSettings.Visible == "Access") && ChatRoomCharacter[C].AllowItem) || ((ChatRoomCharacter[C].ArousalSettings != null) && (ChatRoomCharacter[C].ArousalSettings.Visible != null) && (ChatRoomCharacter[C].ArousalSettings.Visible == "All")))
								if ((ChatRoomCharacter[C].ArousalSettings != null) && (ChatRoomCharacter[C].ArousalSettings.Active != null) && ((ChatRoomCharacter[C].ArousalSettings.Active == "Manual") || (ChatRoomCharacter[C].ArousalSettings.Active == "Hybrid") || (ChatRoomCharacter[C].ArousalSettings.Active == "Automatic"))) {

									// The arousal meter can be maximized or minimized by clicking on it
									if (MouseIn(CharX + 60 * Zoom, CharY + 400 * Zoom, 80 * Zoom, 100 * Zoom) && !ChatRoomCharacter[C].ArousalZoom) { ChatRoomCharacter[C].ArousalZoom = true; return; }
									if (MouseIn(CharX + 50 * Zoom, CharY + 615 * Zoom, 100 * Zoom, 85 * Zoom) && ChatRoomCharacter[C].ArousalZoom) { ChatRoomCharacter[C].ArousalZoom = false; return; }

									// If the player can manually control her arousal, we set the progress manual and change the facial expression, it can trigger an orgasm at 100%
									if ((ChatRoomCharacter[C].ID == 0) && MouseIn(CharX + 50 * Zoom, CharY + 200 * Zoom, 100 * Zoom, 500 * Zoom) && ChatRoomCharacter[C].ArousalZoom) {
										if ((Player.ArousalSettings != null) && (Player.ArousalSettings.Active != null) && (Player.ArousalSettings.Progress != null)) {
											if ((Player.ArousalSettings.Active == "Manual") || (Player.ArousalSettings.Active == "Hybrid")) {
												let Arousal = Math.round((CharY + 625 * Zoom - MouseY) / (4 * Zoom), 0);
												if (Arousal < 0) Arousal = 0;
												if (Arousal > 100) Arousal = 100;
												ActivitySetArousal(Player, Arousal);
												if ((Player.ArousalSettings.AffectExpression == null) || Player.ArousalSettings.AffectExpression) ActivityExpression(Player, Player.ArousalSettings.Progress);
												if (Player.ArousalSettings.Progress == 100) ActivityOrgasmPrepare(Player);
											}
											return;
										}
									}
									// Don't do anything if the thermometer is clicked without access to it
									if (MouseIn(CharX + 50 * Zoom, CharY + 200 * Zoom, 100 * Zoom, 415 * Zoom) && ChatRoomCharacter[C].ArousalZoom) return;
								}

						// If a character to swap was selected, we can complete the swap with the second character
						if (ChatRoomHasSwapTarget() && ChatRoomSwapTarget != ChatRoomCharacter[C].MemberNumber) {
							ChatRoomCompleteSwap(ChatRoomCharacter[C].MemberNumber);
							break;
						}

						// Intercepts the online game character clicks if we need to
						if (OnlineGameClickCharacter(ChatRoomCharacter[C])) return;

						// Gives focus to the character
						document.getElementById("InputChat").style.display = "none";
						document.getElementById("TextAreaChatLog").style.display = "none";
						ChatRoomBackground = ChatRoomData.Background;
						ChatRoomCharacter[C].AllowItem = (ChatRoomCharacter[C].ID == 0);
						ChatRoomOwnershipOption = "";
						ChatRoomLovershipOption = "";
						if (ChatRoomCharacter[C].ID != 0) ServerSend("ChatRoomAllowItem", { MemberNumber: ChatRoomCharacter[C].MemberNumber });
						CharacterSetCurrent(ChatRoomCharacter[C]);
					} else {
						if ((!LogQuery("BlockWhisper", "OwnerRule") || (Player.Ownership == null) || (Player.Ownership.Stage != 1) || (Player.Ownership.MemberNumber == ChatRoomCharacter[C].MemberNumber) || !ChatRoomOwnerInside())
							&& !(Player.GameplaySettings && (Player.GameplaySettings.SensDepChatLog == "SensDepExtreme") && (Player.GetBlindLevel() >= 3)))
							ChatRoomTargetMemberNumber = ((ChatRoomTargetMemberNumber == ChatRoomCharacter[C].MemberNumber) || (ChatRoomCharacter[C].ID == 0)) ? null : ChatRoomCharacter[C].MemberNumber;

						else if (Player.GameplaySettings && (Player.GameplaySettings.SensDepChatLog == "SensDepExtreme") && (Player.GetBlindLevel() >= 3))
							ChatRoomTargetMemberNumber = null
					}
					break;
				}
			} else {

				// Draw the background a second time for characters 6 to 10 (we do it here to correct clipping errors from the first part)
				if ((C == 5) && (Player.GetBlindLevel() < 3)) {
					DrawImageZoomCanvas("Backgrounds/" + ChatRoomData.Background + ".jpg", MainCanvas, 0, 0, 2000, 1000, 0, 500, 1000, 500);
					if (DarkFactor < 1.0) DrawRect(0, 500, 1000, 500, "rgba(0,0,0," + (1.0 - DarkFactor) + ")");
				}
				// Draw the character
				DrawCharacter(ChatRoomCharacter[C], CharX, CharY, Zoom);
				if (ChatRoomTargetMemberNumber == ChatRoomCharacter[C].MemberNumber) DrawImage("Icons/Small/Whisper.png", CharX + 75 * Zoom, CharY + 950 * Zoom);

				// Draw the friendlist / blacklist / whitelist icons
				if (ChatRoomCharacter[C].MemberNumber != null) {
					if (Player.WhiteList.includes(ChatRoomCharacter[C].MemberNumber)) DrawImageResize("Icons/Small/WhiteList.png", CharX + 75 * Zoom, CharY, 50 * Zoom, 50 * Zoom);
					else if (Player.BlackList.includes(ChatRoomCharacter[C].MemberNumber)) DrawImageResize("Icons/Small/BlackList.png", CharX + 75 * Zoom, CharY, 50 * Zoom, 50 * Zoom);
					if (ChatRoomData.Admin && ChatRoomData.Admin.includes(ChatRoomCharacter[C].MemberNumber)) DrawImageResize(`${resourceUrl}/Icons/Small/Admin.png`, CharX + 125 * Zoom, CharY, 50 * Zoom, 50 * Zoom);
					// if (Player.FriendList.has(ChatRoomCharacter[C].MemberNumber)) DrawImage("Icons/Small/FriendList.png", (C % 5) * Space + X + 375 * Zoom, Y + Math.floor(C / 5) * 500);
					if (Player.GhostList.includes(ChatRoomCharacter[C].MemberNumber)) DrawImageResize("Icons/Small/GhostList.png", CharX + 375 * Zoom, CharY, 50 * Zoom, 50 * Zoom);
					else ChatRoomDrawFriendList(C, Space, Zoom, CharX, CharY);

					switch (ChatRoomCharacter[C].Status) {
						case ChatroomSM.StatusTypes.Typing:
							DrawImage(`${resourceUrl}/Icons/Small/Typing.png`, CharX + 375 * Zoom, CharY + 50);
							break;
						case ChatroomSM.StatusTypes.Whisper:
							DrawImage(`${resourceUrl}/Icons/Small/Typing.png`, CharX + 375 * Zoom, CharY + 50, 0.5);
							break;
						case ChatroomSM.StatusTypes.Emote:
							DrawImage(`${resourceUrl}/Icons/Small/Emote.png`, CharX + 375 * Zoom, CharY + 50);
							break;
					}
				}
			}
		}
	}

	j_Announce();
	InfoBeep("Jmod loaded!");
}, window.unsafeWindow !== undefined ? 1500 : 0);
