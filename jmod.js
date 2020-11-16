(function () {
	const w = window;
	if (w.__jmod === true) return;
	w.__jmod = true;
	if (typeof w.ImportBondageCollege !== "function") {
		alert("Club not detected! Please only use this while you have Club open!");
		return;
	}

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
.antigarble [0|1|2] - set garble prevention to: none|show both|show original (only affects received messages!)
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
InputChatMaxLength - Message limit increased to 1000 from 250
`);
		} else {
			ChatRoomSendLocal(`Unknown command ${cmd} - use .help to show commands or two dots to send message starting with a dot`);
			return false;
		}
		return true;
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
	if (w.Player.Inventory.length > 0) LoginMistressItems();

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
