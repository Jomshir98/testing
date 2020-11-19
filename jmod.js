(function () {
	"use strict";
	const w = window;
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
`);
		} else {
			ChatRoomSendLocal(`Unknown command ${cmd} - use .help to show commands or two dots to send message starting with a dot`);
			return false;
		}
		return true;
	}

	// Wardrobe

	function j_WardrobeExportSelectionClothes() {
		const save = w.CharacterAppearanceSelection.Appearance.filter(a => a.Asset.Group.Category === "Appearance" && a.Asset.Group.Clothing).map(w.WardrobeAssetBundle);
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
			const A = w.Asset.find(a => a.Group.Name === cloth.Group && a.Group.Category === "Appearance" && a.Group.Clothing && a.Name === cloth.Name);
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

	InfoBeep("Jmod loaded!");
})();
