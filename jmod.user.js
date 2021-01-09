// ==UserScript==
// @name         Jmod - Bondage Club
// @namespace    jmod
// @version      1.0.3.5
// @description  Jomshir's collection of changes and patches for Bondage Club
// @author       jomshir98
// @match        https://www.bondageprojects.elementfx.com/*/BondageClub/*
// @match        https://www.bondageprojects.com/college/*/BondageClub/*
// @homepage     https://jomshir98.github.io/testing/
// @downloadURL  https://jomshir98.github.io/testing/jmod.user.js
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==

const icon_Emote = `data:image/png;base64,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`;
const icon_Typing = `data:image/png;base64,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`;
const icon_Letter = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAErklEQVRo3u2ZW0hqWRjH1zYlg9PUnCki50HooSCiAkPMLlRGRhQUBA1RkkEvEfRWTzFW2BUTuzyV5yGm60BFb0H0ENj9oSCKoFMnzUosM3Ynae/0m4eDQ6utqY2ny7D/sEBca/3X99uXb30uEWLFihUrVqxY/X9EIISQXq//bWJi4k+bzSZzOp2/HB8fI7FYHMnhcD7Z7XZ0c3ODSJJEDocDORwORFEUcrlcrxMgQSA+n4/Cw8NRVFQUiomJQSRJXpEkeSUUCuctFotqZ2fnO1IoFAKhUPgNIQQfsaWnp39taGj4HMLj8b7s7+9LP+ojdXp6+itBEL8jHo+HEUZERMDW1ha8V21sbABBEFjMAoHAibzdssXFxXcHMT8//9xj9uNDaGgoo3NqagpcLtebAzw8PMDY2Jiv9+XHh/r6ejAYDIwBWq0WKIp6MwiKoqCrq4sR1/LysncQAIDt7W1ISUnBBrW2tsLt7e2rQ9zc3EBzczMWi1gsht3dXQAA4HA43kEAAE5OTiArKwszqK2tBbvd/moQl5eXoFQqsRjkcjkYjcZ/xwgEgudBAACsVivU1NRgRiUlJZjRz9LJyQlkZmZiayuVSri+vsbGJSQk+AZx39qmpibMUCKRwN7e3k+D2N7ehuTkZGxNlUrl8dFOTU31D8Tby8blcmF9fT3oEB5eYNBoNF6TTXp6uv8g7vQ3OjrKWGRmZiYoAC6XC6anpxn+k5OT4HQ6vc7Lzs4ODMStubk5xmLDw8NA0/SLIWiaBq1Wy/BdWFjwOTc3N/dlIAAAa2trjEXVajXc3d0FDEGSJKhUKswrJCQENjc3/Zovk8leDmI0GkEsFjNg6urqAkrPNpuNkV7d+4S/mbGgoOBlIEajESQSidcyoaysDEwmk18+eXl5z5XmfsHI5fLAQYxG49MsAWq1mnFVfaVnT5VDXV0dtLW1Yd9lZGTA6elpcEFMJhNIpVJsoe7ubqBpGkiShNbWVqyPw+GAwWBg+CwtLTGufkdHBzgcDqBpGjo7O7E+mUwG5+fnwQExmUyMcqWvrw/LVBRFgU6n81g9UxQF9/f3MD4+zujX6/WYD03T0Nvbi40pKioCi8Xy30DMZjPk5ORgxv39/fDw8OD3XuCtzc7Oek3HGo0GG1taWgpWq/VlIGdnZ5Cfn48ZDgwMeIR4LIPBAFwu1ysAn8/3WRXQNA09PT3YvPLycri8vAwM5OLiAgoLCzGjoaEhnxBuHR0dQWVlJQOiuroajo6O/N4on8JUVFTA1dWVfyAWiwWKi4tfDPG4rDk4OICVlRVYXV2Fw8PDgH9tekoAlZWVYLPZngexWq1QWlqKTdTpdAFDBFOeYKqqquD6+tozSElJCZSXlz+bnd4SpqOjA4tNoVCASCRigjxt7n3ivYiiKAaMu0VGRgLylGE6OzvfFcTjO9Pe3s6IVyqVniGRSPR3MI8wCYLw2YJ9bJqWlvYXamlpEcTGxn7Ys9+MjIyvIyMjgpDl5WWysbFxjKbpCLPZjBITE11JSUmfnE4n4XA4Xu3U3deJfFhYGIqOjkbx8fEoLi7uO4/H+yaRSL5QFPXH4OCgjf1jhRUrVqxYsUII/QO1gKIk0DWwZAAAAABJRU5ErkJggg==`;

window.setTimeout(
	function () {
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

		const version = "1.0.3.5";

		/**
		 * Utility function to add CSS in multiple passes.
		 * @param {string} styleString
		 */
		function addStyle(styleString) {
			const style = document.createElement("style");
			style.textContent = styleString;
			document.head.append(style);
		}

		if (w.TempCanvas === undefined) {
			w.TempCanvas = document.createElement("canvas").getContext("2d");
		}
		// Return a semi-transparent copy of a canvas
		function DrawAlpha(Canvas, Alpha) {
			// If there's nothing to do simply return the original image
			if (Alpha == null || Alpha >= 1.0) return Canvas;
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

		function DrawImageResize(Source, X, Y, Width, Height, Alpha) {
			var Img = DrawGetImage(Source);
			if (!Img.complete) return false;
			if (!Img.naturalWidth) return true;
			MainCanvas.drawImage(DrawAlpha(Img, Alpha), 0, 0, Img.width, Img.height, X, Y, Width, Height);
			return true;
		}

		function DrawImageCanvasColorizeImage(Img, Canvas, X, Y, Zoom, Color, Filter, AlphaMasks, Alpha) {
			// Make sure that the starting image is loaded

			if (!Img.complete) return false;
			if (!Img.naturalWidth) return true;

			// Variable initialization
			if (Alpha == null) Alpha = 1.0;
			var FullAlpha = Filter == false ? false : true;
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
					trans = (data[p] + data[p + 1] + data[p + 2]) / 383;
					if (data[p + 3] == 0 || trans < 0.8 || trans > 1.2) continue;
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
				trans = (data[p] + data[p + 1] + data[p + 2]) / 383;
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
			ServerBeep = {
				MemberNumber: 0,
				MemberName: "",
				ChatRoomName: null,
				Timer: CurrentTime + 3000,
				Message: msg
			};
		}

		function ChatRoomActionMessage(msg) {
			if (msg != "")
				ServerSend("ChatRoomChat", {
					Content: "Beep",
					Type: "Action",
					Dictionary: [
						{ Tag: "Beep", Text: "msg" },
						{ Tag: "Biep", Text: "msg" },
						{ Tag: "Sonner", Text: "msg" },
						{ Tag: "msg", Text: msg }
					]
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
				Dictionary: { type, message }
			});
		}

		w.j_SendHiddenMessage = j_SendHiddenMessage;

		const hiddenMessageHandlers = new Map();

		w.ChatRoomMessage = data => {
			if (data?.Type === "Hidden" && data.Content === "JModMsg" && typeof data.Sender === "number") {
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
				if (data?.Type === "Action" && data.Content === "ServerEnter") {
					j_Announce(true);
				}
				return o_ChatRoomMessage(data);
			}
		};

		function j_SendHiddenBeep(type, message, target) {
			ServerSend("AccountBeep", { MemberNumber: target, BeepType: `Jmod:${type}:${JSON.stringify(message)}` });
		}

		const hiddenBeepHandlers = new Map();

		const o_ServerAccountBeep = w.ServerAccountBeep;
		w.ServerAccountBeep = data => {
			if (typeof data?.BeepType === "string" && data.BeepType.startsWith("Jmod:")) {
				const i = data.BeepType.indexOf(":", 5);
				const type = data.BeepType.substring(5, i);
				const msg = JSON.parse(data.BeepType.substr(i + 1));
				const handler = hiddenBeepHandlers.get(type);
				if (handler === undefined) {
					console.warn("JMod - Hidden beep no handler", type, msg);
				} else {
					handler(data.MemberNumber, msg, data);
				}
			} else {
				o_ServerAccountBeep(data);
			}
		};

		let j_UnreadMessages = false;

		// Controlable patches

		const o_SpeechGarble = w.SpeechGarble;
		let antigarble = 0;
		let antigarble_block = false;
		w.SpeechGarble = (C, CD) => {
			if (antigarble === 2) return CD;
			let res = o_SpeechGarble(C, CD);
			if (CD !== res && typeof res === "string" && antigarble === 1) res += " <> " + CD;
			return res;
		};

		// Chat control

		const o_ChatRoomSendChat = w.ChatRoomSendChat;

		w.ChatRoomSendChat = () => {
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
			o_ChatRoomSendChat();
			ChatroomSM.InputEnd();
		};

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
				if (antigarble_block) {
					ChatRoomSendLocal(`Antigarble is blocked!`);
				} else if (["0", "1", "2"].includes(rest)) {
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
[backport] LoginSubmitted - Properly handle disconnect during login 
[experimental] Message beeps - send messages along beeps to other mod users
[WIP] Typing indicator
`);
			} else {
				ChatRoomSendLocal(`Unknown command ${cmd} - use .help to show commands or two dots to send message starting with a dot`);
				return false;
			}
			return true;
		}

		// Wardrobe

		function j_WardrobeExportSelectionClothes(includeBinds = false) {
			const save = w.CharacterAppearanceSelection.Appearance.filter(a => j_IsCloth(a, true) || (includeBinds && j_IsBind(a))).map(w.WardrobeAssetBundle);
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

			const Allow = a => j_IsCloth(a, CharacterAppearanceSelection.ID === 0) || (includeBinds && j_IsBind(a));

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
		w.AppearanceRun = () => {
			s_AppearanceRun();
			if (w.CharacterAppearanceMode == "Wardrobe" && clipboardAvailable) {
				DrawButton(1457, 125, 50, 50, "", "White", j_WardrobeIncludeBinds ? "Icons/Checked.png" : "", "Include restraints");
				DrawButton(1534, 125, 207, 50, "Export", "White", "");
				DrawButton(1768, 125, 207, 50, "Import", "White", "");
			}
		};

		const s_AppearanceClick = w.AppearanceClick;
		w.AppearanceClick = () => {
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
		};
		document.addEventListener("paste", ev => {
			if (CurrentScreen === "Appearance" && CharacterAppearanceMode === "Wardrobe") {
				ev.preventDefault();
				ev.stopImmediatePropagation();
				const data = (ev.clipboardData || window.clipboardData).getData("text");
				const res = j_WardrobeImportSelectionClothes(data, j_WardrobeIncludeBinds, j_Allow);
				w.CharacterAppearanceWardrobeText = res !== true ? `Import error: ${res}` : "Imported!";
			}
		});

		// Common patches
		w.AsylumEntranceCanWander = () => true;
		w.CheatValidate = () => {};
		w.CheatAllow = true;
		for (const C of CheatList) {
			const AC = localStorage.getItem("BondageClubCheat" + C);
			if (AC != null && AC.toUpperCase() == "TRUE") CheatActivated.push(C);
		}

		w.LoginMistressItems = () => {
			InventoryAdd(Player, "MistressGloves", "Gloves", false);
			InventoryAdd(Player, "MistressBoots", "Shoes", false);
			InventoryAdd(Player, "MistressTop", "Cloth", false);
			InventoryAdd(Player, "MistressBottom", "ClothLower", false);
			InventoryAdd(Player, "MistressPadlock", "ItemMisc", false);
			InventoryAdd(Player, "MistressPadlockKey", "ItemMisc", false);
			InventoryAdd(Player, "MistressTimerPadlock", "ItemMisc", false);
		};

		w.LoginStableItems = () => {
			InventoryAdd(Player, "HarnessPonyBits", "ItemMouth", false);
			InventoryAdd(Player, "HarnessPonyBits", "ItemMouth2", false);
			InventoryAdd(Player, "HarnessPonyBits", "ItemMouth3", false);
			InventoryAdd(Player, "PonyBoots", "Shoes", false);
			InventoryAdd(Player, "PonyBoots", "ItemBoots", false);
			InventoryAdd(Player, "PonyHood", "ItemHood", false);
			InventoryAdd(Player, "HoofMittens", "ItemHands", false);
		};

		if (w.Player.Inventory.length > 0) {
			w.LoginMistressItems();
			w.LoginStableItems();
			w.ServerPlayerInventorySync();
		}

		const o_ChatRoomCreateElement = w.ChatRoomCreateElement;
		w.ChatRoomCreateElement = () => {
			o_ChatRoomCreateElement();
			const elem = document.getElementById("InputChat");
			elem.setAttribute("maxLength", 1000);
			ChatroomSM.SetInputElement(elem);
		};
		if (document.getElementById("InputChat") != null) {
			document.getElementById("InputChat").setAttribute("maxLength", 1000);
		}

		const o_ChatRoomLeave = w.ChatRoomLeave;
		w.ChatRoomLeave = () => {
			o_ChatRoomLeave();
			ChatroomSM.SetInputElement(null);
		};

		const o_ServerSetConnected = w.ServerSetConnected;
		w.ServerSetConnected = (connected, errorMessage) => {
			o_ServerSetConnected(connected, errorMessage);
			if (!connected) {
				LoginSubmitted = false;
			}
		};

		// Cheats

		const o_Player_CanChange = w.Player.CanChange;
		w.Player.CanChange = () => j_Allow || o_Player_CanChange.call(w.Player);

		const o_ChatRoomCanLeave = w.ChatRoomCanLeave;
		w.ChatRoomCanLeave = () => j_Allow || o_ChatRoomCanLeave();

		// Testing stuff

		let BeepTarget = null;
		let BeepTargetName = "";

		const FriendListRun_o = w.FriendListRun;
		w.FriendListRun = () => {
			FriendListRun_o();
			if (BeepTarget !== null) {
				ElementPositionFix("FriendListBeep", 36, 5, 75, 1985, 890);
			}
		};

		function MakeBeepMenu(MemberNumber, MemberName, data = null) {
			if (BeepTarget == null) {
				ElementCreateDiv("FriendListBeep");
				ElementPositionFix("FriendListBeep", 36, 5, 75, 1985, 890);
			}
			const FriendListBeep = document.getElementById("FriendListBeep");
			BeepTarget = MemberNumber;
			BeepTargetName = MemberName;
			FriendListBeep.innerHTML = "";
			const dialog = document.createElement("div");
			const user = document.createElement("div");
			user.innerText = `${MemberName} [${MemberNumber}]`;
			const messageArea = document.createElement("textarea");
			messageArea.id = "FriendListBeepTextArea";
			messageArea.maxLength = 1000;
			messageArea.readOnly = true;
			messageArea.value = data?.Message || "";
			const footer = document.createElement("div");
			const closeBtn = document.createElement("a");
			closeBtn.innerText = "Close";
			closeBtn.onclick = BeepMenuClose;
			footer.append(closeBtn);
			if (data === null) {
				const sendBtn = document.createElement("a");
				sendBtn.innerText = "Send";
				sendBtn.onclick = BeepMenuSend;
				footer.append(sendBtn);
			}
			dialog.append(data === null ? "Send Beep" : data.Sent ? "Sent Beep" : "Received Beep", messageArea, footer);
			FriendListBeep.append(dialog);
			if (data === null) {
				j_SendHiddenBeep("hello", true, MemberNumber);
			}
		}

		function BeepMenuClose() {
			ElementRemove("FriendListBeep");
			BeepTarget = null;
		}

		function BeepMenuSend() {
			if (BeepTarget !== null) {
				const textarea = document.getElementById("FriendListBeepTextArea");
				if (textarea) {
					const msg = textarea.value;
					if (msg) {
						j_SendHiddenBeep("beepmsg", msg, BeepTarget);
					} else {
						ServerSend("AccountBeep", { MemberNumber: BeepTarget, BeepType: "" });
					}
					FriendListBeepLog.push({
						MemberNumber: BeepTarget,
						MemberName: BeepTargetName,
						ChatRoomName: ChatRoomData == null ? null : ChatRoomData.Name,
						Sent: true,
						Time: new Date(),
						Message: msg
					});
				}
				BeepMenuClose();
			}
		}

		hiddenBeepHandlers.set("beepmsg", (from, msg, data) => {
			j_UnreadMessages = true;
			ServerBeep.MemberNumber = data.MemberNumber;
			ServerBeep.MemberName = data.MemberName;
			ServerBeep.ChatRoomName = data.ChatRoomName;
			ServerBeep.Timer = CurrentTime + 10000;
			if (Player.AudioSettings && Player.AudioSettings.PlayBeeps) {
				ServerBeepAudio.volume = Player.AudioSettings.Volume;
				ServerBeepAudio.play();
			}
			ServerBeep.Message = `${DialogFind(Player, "BeepFrom")} ${ServerBeep.MemberName} (${ServerBeep.MemberNumber}); With message`;
			if (ServerBeep.ChatRoomName != null) ServerBeep.Message = ServerBeep.Message + " " + DialogFind(Player, "InRoom") + ' "' + ServerBeep.ChatRoomName + '" ' + (data.ChatRoomSpace === "Asylum" ? DialogFind(Player, "InAsylum") : "");
			FriendListBeepLog.push({
				MemberNumber: data.MemberNumber,
				MemberName: data.MemberName,
				ChatRoomName: data.ChatRoomName,
				ChatRoomSpace: data.ChatRoomSpace,
				Sent: false,
				Time: new Date(),
				Message: msg
			});
			if (CurrentScreen == "FriendList") ServerSend("AccountQuery", { Query: "OnlineFriends" });
		});

		w.FriendListBeep = MakeBeepMenu;

		const o_FriendListExit = w.FriendListExit;
		w.FriendListExit = () => {
			BeepMenuClose();
			o_FriendListExit();
			FriendListModeIndex = 0;
		};

		const o_ChatRoomClearAllElements = w.ChatRoomClearAllElements;
		w.ChatRoomClearAllElements = () => {
			BeepMenuClose();
			o_ChatRoomClearAllElements();
			FriendListModeIndex = 0;
		};

		hiddenBeepHandlers.set("hello", (from, message) => {
			if (message) {
				j_SendHiddenBeep("hello", false, from);
			} else if (BeepTarget === from) {
				const elem = document.getElementById("FriendListBeepTextArea");
				if (elem) {
					elem.readOnly = false;
				}
			}
		});

		const o_FriendListLoadFriendList = w.FriendListLoadFriendList;
		w.FriendListLoadFriendList = data => {
			o_FriendListLoadFriendList(data);
			if (FriendListMode[FriendListModeIndex] === "Beeps") {
				j_UnreadMessages = false;
				const PrivateRoomCaption = DialogFind(Player, "PrivateRoom");
				const SentCaption = DialogFind(Player, "SentBeep");
				const ReceivedCaption = DialogFind(Player, "ReceivedBeep");
				const SpaceAsylumCaption = DialogFind(Player, "ChatRoomSpaceAsylum");
				let Content = "";
				for (let i = FriendListBeepLog.length - 1; i >= 0; i--) {
					const B = FriendListBeepLog[i];
					Content += "<div class='FriendListRow'>";
					Content += "<div class='FriendListTextColumn FriendListFirstColumn'>" + B.MemberName + "</div>";
					Content += "<div class='FriendListTextColumn'>" + (B.MemberNumber != null ? B.MemberNumber.toString() : "-") + "</div>";
					Content +=
						"<div class='FriendListTextColumn'>" +
						(B.ChatRoomName == null ? "-" : (B.ChatRoomSpace ? B.ChatRoomSpace.replace("Asylum", SpaceAsylumCaption) + " - " : "") + B.ChatRoomName.replace("-Private-", PrivateRoomCaption)) +
						"</div>";
					if (B.Message) {
						Content += `<div class='FriendListLinkColumn' onclick="ShowBeep(${i})">${B.Sent ? SentCaption : ReceivedCaption} ${TimerHourToString(B.Time)} (Mail)</div>`;
					} else {
						Content += "<div class='FriendListTextColumn'>" + (B.Sent ? SentCaption : ReceivedCaption) + " " + TimerHourToString(B.Time) + "</div>";
					}
					Content += "</div>";
				}
				ElementContent("FriendList", Content);
			}
		};

		w.ShowBeep = i => {
			const beep = FriendListBeepLog[i];
			if (beep) {
				MakeBeepMenu(beep.MemberNumber, beep.MemberName, beep);
			}
		};

		addStyle(`
#FriendListBeep {
	background: #000000AA;
	display: flex !important;
	justify-content: center;
	align-items: center;
	border: 2px solid white;
	padding: 0 !important;
	padding-bottom: 1% !important;
}
#FriendListBeep > div {
	background: #999;
	border: white solid 2px;
	padding: .5em;
	display: flex;
	flex-direction: column;
	width: 80%;
	height: 80%;
	align-items: center;
}
#FriendListBeep > div > * {
	margin-top: .5em;
}
#FriendListBeep > div > div {
	width: 100%;
	display: flex;
}
#FriendListBeep textarea {
	width: 100%;
	height: 100%;
	font: inherit;
}
#FriendListBeep a {
	width: 50%;
	margin: auto;
	text-align: center;
	text-decoration: underline;
	user-select: none;
	cursor: pointer;
}
#FriendListBeep a:hover {
	color: cyan !important;
}
`);

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
					} else if (value.startsWith("/") || value.startsWith(".")) {
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
						console.log(`${char.Name} is using JMod version ${data?.version || data}`);
					}
				}
			}
			if (data?.request) {
				j_Announce(false);
			}
		});

		function j_Announce(request = false) {
			j_SendHiddenMessage("Hello", { version, request });
		}

		hiddenMessageHandlers.set("AntigarbleBlock", (src, data) => {
			if (w.Player.Ownership?.MemberNumber === src) {
				if (data) {
					antigarble = 0;
					antigarble_block = true;
					ChatRoomSendLocal(`Antigarble has been blocked by your owner`);
				} else {
					antigarble_block = false;
					ChatRoomSendLocal(`Antigarble has been unblocked by your owner`);
				}
			}
		});

		function ChatRoomDrawFriendList(C, Space, Zoom, CharX, CharY) {
			const Char = ChatRoomCharacter[C];
			let Color = "#ffffff";
			let Friend = Char && Player.FriendList.includes(Char.MemberNumber);
			let IsMutual = Friend;
			if (IsSMod) {
				const DChar = ChatRoomData && ChatRoomData.Character && ChatRoomData.Character[C];
				IsMutual = (Char && FriendListMutual.indexOf(Char.MemberNumber) >= 0) || Char.ID == 0;
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

		w.ChatRoomDrawCharacter = DoClick => {
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
			const Y = ChatRoomCharacter.length <= 5 ? (1000 * (1 - Zoom)) / 2 : 0;

			if (Player.GameplaySettings && Player.GameplaySettings.SensDepChatLog == "SensDepExtreme" && Player.GameplaySettings.BlindDisableExamine && Player.GetBlindLevel() >= 3) {
				RenderSingle = true;
				Space = 500;
				Zoom = 1;
				X = 0;
				Y = 0;
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
				if (RenderSingle && ChatRoomCharacter[C].ID != 0) continue;
				if (DoClick) {
					if (MouseIn(CharX, CharY, 450 * Zoom, 1000 * Zoom)) {
						if (MouseY <= CharY + 900 * Zoom && (Player.GameplaySettings && Player.GameplaySettings.BlindDisableExamine ? !(Player.GetBlindLevel() >= 3) || ChatRoomCharacter[C].ID == Player.ID : true)) {
							// If the arousal meter is shown for that character, we can interact with it
							if (ChatRoomCharacter[C].ID == 0 || Player.ArousalSettings.ShowOtherMeter == null || Player.ArousalSettings.ShowOtherMeter)
								if (
									ChatRoomCharacter[C].ID == 0 ||
									(ChatRoomCharacter[C].ArousalSettings != null && ChatRoomCharacter[C].ArousalSettings.Visible != null && ChatRoomCharacter[C].ArousalSettings.Visible == "Access" && ChatRoomCharacter[C].AllowItem) ||
									(ChatRoomCharacter[C].ArousalSettings != null && ChatRoomCharacter[C].ArousalSettings.Visible != null && ChatRoomCharacter[C].ArousalSettings.Visible == "All")
								)
									if (
										ChatRoomCharacter[C].ArousalSettings != null &&
										ChatRoomCharacter[C].ArousalSettings.Active != null &&
										(ChatRoomCharacter[C].ArousalSettings.Active == "Manual" || ChatRoomCharacter[C].ArousalSettings.Active == "Hybrid" || ChatRoomCharacter[C].ArousalSettings.Active == "Automatic")
									) {
										// The arousal meter can be maximized or minimized by clicking on it
										if (MouseIn(CharX + 60 * Zoom, CharY + 400 * Zoom, 80 * Zoom, 100 * Zoom) && !ChatRoomCharacter[C].ArousalZoom) {
											ChatRoomCharacter[C].ArousalZoom = true;
											return;
										}
										if (MouseIn(CharX + 50 * Zoom, CharY + 615 * Zoom, 100 * Zoom, 85 * Zoom) && ChatRoomCharacter[C].ArousalZoom) {
											ChatRoomCharacter[C].ArousalZoom = false;
											return;
										}

										// If the player can manually control her arousal, we set the progress manual and change the facial expression, it can trigger an orgasm at 100%
										if (ChatRoomCharacter[C].ID == 0 && MouseIn(CharX + 50 * Zoom, CharY + 200 * Zoom, 100 * Zoom, 500 * Zoom) && ChatRoomCharacter[C].ArousalZoom) {
											if (Player.ArousalSettings != null && Player.ArousalSettings.Active != null && Player.ArousalSettings.Progress != null) {
												if (Player.ArousalSettings.Active == "Manual" || Player.ArousalSettings.Active == "Hybrid") {
													let Arousal = Math.round((CharY + 625 * Zoom - MouseY) / (4 * Zoom), 0);
													if (Arousal < 0) Arousal = 0;
													if (Arousal > 100) Arousal = 100;
													ActivitySetArousal(Player, Arousal);
													if (Player.ArousalSettings.AffectExpression == null || Player.ArousalSettings.AffectExpression) ActivityExpression(Player, Player.ArousalSettings.Progress);
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
							ChatRoomCharacter[C].AllowItem = ChatRoomCharacter[C].ID == 0;
							ChatRoomOwnershipOption = "";
							ChatRoomLovershipOption = "";
							if (ChatRoomCharacter[C].ID != 0) ServerSend("ChatRoomAllowItem", { MemberNumber: ChatRoomCharacter[C].MemberNumber });
							CharacterSetCurrent(ChatRoomCharacter[C]);
						} else {
							if (
								(!LogQuery("BlockWhisper", "OwnerRule") || Player.Ownership == null || Player.Ownership.Stage != 1 || Player.Ownership.MemberNumber == ChatRoomCharacter[C].MemberNumber || !ChatRoomOwnerInside()) &&
								!(Player.GameplaySettings && Player.GameplaySettings.SensDepChatLog == "SensDepExtreme" && Player.GetBlindLevel() >= 3)
							)
								ChatRoomTargetMemberNumber = ChatRoomTargetMemberNumber == ChatRoomCharacter[C].MemberNumber || ChatRoomCharacter[C].ID == 0 ? null : ChatRoomCharacter[C].MemberNumber;
							else if (Player.GameplaySettings && Player.GameplaySettings.SensDepChatLog == "SensDepExtreme" && Player.GetBlindLevel() >= 3) ChatRoomTargetMemberNumber = null;
						}
						break;
					}
				} else {
					// Draw the background a second time for characters 6 to 10 (we do it here to correct clipping errors from the first part)
					if (C == 5 && Player.GetBlindLevel() < 3) {
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
						if (ChatRoomData.Admin && ChatRoomData.Admin.includes(ChatRoomCharacter[C].MemberNumber)) DrawImageResize("Icons/Small/Admin.png", CharX + 125 * Zoom, CharY, 50 * Zoom, 50 * Zoom);
						// if (Player.FriendList.has(ChatRoomCharacter[C].MemberNumber)) DrawImage("Icons/Small/FriendList.png", (C % 5) * Space + X + 375 * Zoom, Y + Math.floor(C / 5) * 500);
						if (Player.GhostList.includes(ChatRoomCharacter[C].MemberNumber)) DrawImageResize("Icons/Small/GhostList.png", CharX + 375 * Zoom, CharY, 50 * Zoom, 50 * Zoom);
						else ChatRoomDrawFriendList(C, Space, Zoom, CharX, CharY);

						switch (ChatRoomCharacter[C].Status) {
							case ChatroomSM.StatusTypes.Typing:
								DrawImageResize(icon_Typing, CharX + 375 * Zoom, CharY + 50 * Zoom, 50 * Zoom, 50 * Zoom);
								break;
							case ChatroomSM.StatusTypes.Whisper:
								DrawImageResize(icon_Typing, CharX + 375 * Zoom, CharY + 50 * Zoom, 50 * Zoom, 50 * Zoom, 0.5);
								break;
							case ChatroomSM.StatusTypes.Emote:
								DrawImageResize(icon_Emote, CharX + 375 * Zoom, CharY + 50 * Zoom, 50 * Zoom, 50 * Zoom);
								break;
						}

						if (ChatRoomCharacter[C].ID === 0 && j_UnreadMessages) {
							DrawImageResize(icon_Letter, CharX + 325 * Zoom, CharY, 50 * Zoom, 50 * Zoom);
						}
					}
				}
			}
		};

		// Other mod compatability

		const IsSMod = typeof w.ChatControlHead === "function";
		const HasBondageClubTools = ServerSocket.listeners("ChatRoomMessage").some(i => i.toString().includes("window.postMessage"));

		if (IsSMod) {
			console.warn("JMod: SMod load!");
			w.ChatRoomSM = ChatroomSM;
		}
		if (HasBondageClubTools) {
			console.warn("JMod: Bondage Club Tools detected!");
			const ChatRoomMessageForwarder = ServerSocket.listeners("ChatRoomMessage").find(i => i.toString().includes("window.postMessage"));
			const AccountBeepForwarder = ServerSocket.listeners("AccountBeep").find(i => i.toString().includes("window.postMessage"));
			console.assert(ChatRoomMessageForwarder !== undefined && AccountBeepForwarder !== undefined);
			ServerSocket.off("ChatRoomMessage");
			ServerSocket.on("ChatRoomMessage", data => {
				if (data?.Type !== "Hidden" || data.Content !== "JModMsg" || typeof data.Sender !== "number") {
					ChatRoomMessageForwarder(data);
				}
				return w.ChatRoomMessage(data);
			});
			ServerSocket.off("AccountBeep");
			ServerSocket.on("AccountBeep", data => {
				if (typeof data?.BeepType !== "string" || !data.BeepType.startsWith("Jmod:")) {
					AccountBeepForwarder(data);
				}
				return w.ServerAccountBeep(data);
			});
		}

		j_Announce(true);
		InfoBeep(`Jmod loaded! Version: ${version}`);
	},
	window.unsafeWindow !== undefined ? 1500 : 0
);
