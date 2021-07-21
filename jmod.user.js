// ==UserScript==
// @name         Jmod - Bondage Club
// @namespace    jmod
// @version      1.8.0
// @description  Jomshir's collection of changes and patches for Bondage Club
// @author       jomshir98
// @match        https://www.bondageprojects.elementfx.com/*/BondageClub/*
// @match        https://www.bondageprojects.com/college/*/BondageClub/*
// @homepage     https://jomshir98.github.io/testing/
// @downloadURL  https://jomshir98.github.io/testing/jmod.user.js
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==

const icon_Emote = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAKnUlEQVRoQ91aD1CT5xl/3nz59xECSYg6Eh0L2iACVYSeWJ0E1lLX+a/e2K0bZzvh2mM3PSpda6l66SnDaj11vbmeFWxFdu2c52qtjLu1IA6wK/9qIQrIhQiiQELASEKSL/l2z9fEAy0SNHLc3rvvvnzf9z7P+/ze5+/7viHwf9JIoDgyMzOpmpoaEQCE2O12CcuyVKC0D+onFouhr68P8C4SiVhCiJdhGLtEIrGvWrVq9NSpU55AxgkIiEKhWM7j8Z4cGRmJ4fP5yQzD/JTH43H8WZblrskaId8PhXf/hc8URcHQ0BDw+XzuQr6EkHqv11tD03QLIeQ7i8Xy9aT8H9QhMjJyKcMwT9++fXu/0+kUT8bscXynafqOVCp9AwBq+/v7v51ojAk1smDBgjd7enqyXC5XvNfr5ehxxhiGwenvAoBBH1MrKmaKILA/mimNShpDi+aqAIC5OBxqDrWNWhMKhd+qVKqyzs7O/T801n1AVq5cKW9ra9tjNptzWZYd+/0yAJRUVVUlR0dHv0BRlBUHoijK7jebKYBhvV4v3+v1CsYAYVmW5TEMI7NYLP9dunRpDQCsA4DFfr4URXmVSuWRyMjInc3NzUNjxxsHRKfThV6+fPmA1Wp9Zazdp6amvnnu3Lm9NE13UhQVDgCzpiD0w3QddrvdQ06n88fr1q17vbKy8oCfCU5aaGjohyqVKr+trc12973/B0al2tra7b29vXsQhEgkAqfTiVrY6PV6rz3ErD8MgPtoUJZDhw7Fb9u27aRIJFridDq5gKBWq3enpKTsOXXqlIsLIn7K5OTk9fX19f8cw8nEsmxUUKQJEhNCSCMALPVHv8jIyA29vb2f3QWiVqsjrFbrZ3a7fYXPwersdns8TdPSIMkQFDZ2u/22RCKpJ4Sko6bkcnlNfHz8CxcvXhxAjRCNRrPGZDKdRRAej+f2wYMHf5+Xl6cHgAVBkSB4TDqLioreKSgo+DOfz5cxDAPPPffcpoqKipMkOjo6/MaNG11Op1OG4+n1+jM7d+5M5vF484I3flA5GQsLC2t37NjxW19K6NFqtbFEqVQmWyyWbzBHuN3uFoPBwIuNjV0U1KGDzKy9vf1aTEwMli4xyDoxMTGOzJo1a/PAwEAxvti9e7exoKDAxePxuA4ztQ0PD38gk8lChUIhJmxQqVTbSURExFmLxbIWAJxnzpwZ2bBhg/yebDsT8dw8fvw4u3nzZhUKxwWA0NBQy507d7AssFRUVNzKyMiIm4mS3ytTdXV1TWpqqgYAVGKxeISEhISwdrsd+924cOHCtVWrVqVOBKSsrAyysrJg8eLF8Omnn0JMzOQW+LhoGhsb/56UlJQIAE8IhUIgFEWxHg9X8nfV1tZeWb58+c8nAnL27FlYv349JCUlwSeffAILFkwenR8XTWtr67H4+PjlABCHRSXh8XhYwKHsJh+Q1X4gNpsNwzGkp6fDM888A/X19bBy5UqM3YAzLRAIuDv2y8/P56rU6aJpaWk5npCQsAwAFvnWMASrTk4jly5dal22bNkv/EBaW1shMzMTrly5Ak899RRnVseOHYOoqChOKx999BGYTCZYvXo1lJaWglKphOmiuXr16oexsbGokXhuoTZmLdFRX1/flJSU9Cs/kOLiYsjJyZnU96VSKZSXl8OKFStgumiMRuOB6OjotDG1112NtDc2NjYkJia+6JccS4Bbt25BW1sbNDc3wxdffAGVlZXc54yMDFi7di3n+AsXLoSIiAiuKp0umuvXr++Lior6GQAk+ZbO44A0JiYm/vpeFWDpfPjwYdizZw/QNA0OhwMUCgWUlJRAWloatwafbpqxQDgfGePs92kEhUOh9+3bxzl9ZGQk5xdNTU2wfft2zlc+/vhjSE0dH7Gng6arq2ufRqPhNMJFLbFYzI6OjnLOXldXZ0hJSXneN7tOj8cjOnnyJGzZsoWLRnv37uWik9ls5nwHTQ0dHf1CpeKSLFbPMB00BoOhOC4uLgXDL1oJkUqld2w2mwQAzBUVFb0ZGRlPokBOp3NUJBKJMaI1NDRweWPXrl0QFhbGCVxVVQV1dXWwdetWLBG4d2iCuLJ83DQ4VnV1dXVqaup8AFDz+fzbCOQrm82G3u88ffr00MaNG7FcwU2BmdyGSktL+Zs2bQpFISUSSTuZM2dOXl9f30F8kZ+f37B///5RQsiKmYzC4XAcDgkJCRUIBNlutxtmz559gCgUiqetVmsNOgzDME0YarVaLdYwM7Z1dHS0arVaLEcSMGIqlcpEguv1vr6+AYZhuOR45MiRz3Nzc7ECRvubie1KSUlJc3Z2NiZuSiQSDajV6ie4NXtMTMyWtra2w1hFulyuq93d3YNz5859egai8Pb29nao1WqvQCCIRbOaP3/+m52dne9xmWzRokU/MhqNlQ6HYyE+x8bGfm0wGLAgm1HN5XI5nn322abq6mpukmUyWdPs2bPXtre33/CnZFwpZlmt1hP+fV4AOMOy7AszCQkh5B8A8Ev/nrBSqcwym81/Q5e4W1u8/PLL4i+//HJ3d3f36yi8r3MVy7I6X2EZ0BHEYwCOTs0jhHzl38/CMZKTkw+tWbPmbb1ez60Kxwmn0WjmDA4OfjA8PLwBP/p85kZmZubRsrKydwQCgRkAcO/3cecZFH7I7XYrcnJytp44ceIPQqFQixsN2MLCws7J5fJXTCbTTf/E3TfLS5YsecJkMr03NDS07p4DnMu5ubnvFhYWviiXy9Px5GqC2R9wOByDDMPgqVbAxw0sywq8Xi/l9Xppt9ttPX/+/LvZ2dmZADCukAsPDy9Xq9V/NBgMrWPH/0Fz0ev1/KKiokKPx/M7j8czC+XBCtPnP2+xLIv7rzjIvc1WWVlZmp6ejsXbj7H0CtDUUA6sfXBycBcHqws15jas3dDMhUKhWavVntDpdAXvv/++02dNdyfqgXYvk8nWezye5+12+288Hk+oD0w+y7KYMLPGCsmyLFNaWvrtSy+9JKJpOh4r4GA0sViMPlAWFhZW3t/ff2Ying8CwiVInU4nvnjx4r89Ho+/bHndB4TbssTW3NxcdOHChbfy8vJsuPH9QyAmOkPE95gPcJLwQu0TQkYEAsF3EomknBDyTXh4+FfXrl1DLUzYAolEhBBynmXZ1b5I9gbLsniKxAE5evTov1599VWsArhtGXRIqVTaQlHUAbvdbkXTwAvNBC9suD3rf8a7xWJxY9XsO9VFjx6iKKpfo9HcamhocAei2UCAYOgrZ1k2w2dab2NIttlsZa+99lpOcXExLjVp30xikvpcqVTmdXR0GAMRwNcn4KDwMKblpxkHBAB2paWl/aexsbHEarX+xN+JoqjRiIiIP/X39++eAoCgdZ2SRtBnJBJJl8vlkrvdbu4YAhtN09dlMtm2mzdvng6aZFNkNFUg49jzeLwRuVzebTab4/AfC/eGxCnK8kjdHxpIWFiYUSgU/sVsNt89cX0kSR6ReMpAMMqIxeKqhISE7ZcuXZr0rxWPKF/A5FMCwufzPRKJ5NC8efP2t7S09AU8yjR0DAgIAFTSNL1UoVBsJoSc6+npCU7aDiLAQIDgqe8Oo9H4V71eP6jX67//Y8oMa4EAAZ1Ox6+qqmJmmOzjxPkf5cJ3dq1TtwIAAAAASUVORK5CYII=`;
const icon_Typing = `data:image/png;base64,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`;
const icon_Letter = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAErklEQVRo3u2ZW0hqWRjH1zYlg9PUnCki50HooSCiAkPMLlRGRhQUBA1RkkEvEfRWTzFW2BUTuzyV5yGm60BFb0H0ENj9oSCKoFMnzUosM3Ynae/0m4eDQ6utqY2ny7D/sEBca/3X99uXb30uEWLFihUrVqxY/X9EIISQXq//bWJi4k+bzSZzOp2/HB8fI7FYHMnhcD7Z7XZ0c3ODSJJEDocDORwORFEUcrlcrxMgQSA+n4/Cw8NRVFQUiomJQSRJXpEkeSUUCuctFotqZ2fnO1IoFAKhUPgNIQQfsaWnp39taGj4HMLj8b7s7+9LP+ojdXp6+itBEL8jHo+HEUZERMDW1ha8V21sbABBEFjMAoHAibzdssXFxXcHMT8//9xj9uNDaGgoo3NqagpcLtebAzw8PMDY2Jiv9+XHh/r6ejAYDIwBWq0WKIp6MwiKoqCrq4sR1/LysncQAIDt7W1ISUnBBrW2tsLt7e2rQ9zc3EBzczMWi1gsht3dXQAA4HA43kEAAE5OTiArKwszqK2tBbvd/moQl5eXoFQqsRjkcjkYjcZ/xwgEgudBAACsVivU1NRgRiUlJZjRz9LJyQlkZmZiayuVSri+vsbGJSQk+AZx39qmpibMUCKRwN7e3k+D2N7ehuTkZGxNlUrl8dFOTU31D8Tby8blcmF9fT3oEB5eYNBoNF6TTXp6uv8g7vQ3OjrKWGRmZiYoAC6XC6anpxn+k5OT4HQ6vc7Lzs4ODMStubk5xmLDw8NA0/SLIWiaBq1Wy/BdWFjwOTc3N/dlIAAAa2trjEXVajXc3d0FDEGSJKhUKswrJCQENjc3/Zovk8leDmI0GkEsFjNg6urqAkrPNpuNkV7d+4S/mbGgoOBlIEajESQSidcyoaysDEwmk18+eXl5z5XmfsHI5fLAQYxG49MsAWq1mnFVfaVnT5VDXV0dtLW1Yd9lZGTA6elpcEFMJhNIpVJsoe7ubqBpGkiShNbWVqyPw+GAwWBg+CwtLTGufkdHBzgcDqBpGjo7O7E+mUwG5+fnwQExmUyMcqWvrw/LVBRFgU6n81g9UxQF9/f3MD4+zujX6/WYD03T0Nvbi40pKioCi8Xy30DMZjPk5ORgxv39/fDw8OD3XuCtzc7Oek3HGo0GG1taWgpWq/VlIGdnZ5Cfn48ZDgwMeIR4LIPBAFwu1ysAn8/3WRXQNA09PT3YvPLycri8vAwM5OLiAgoLCzGjoaEhnxBuHR0dQWVlJQOiuroajo6O/N4on8JUVFTA1dWVfyAWiwWKi4tfDPG4rDk4OICVlRVYXV2Fw8PDgH9tekoAlZWVYLPZngexWq1QWlqKTdTpdAFDBFOeYKqqquD6+tozSElJCZSXlz+bnd4SpqOjA4tNoVCASCRigjxt7n3ivYiiKAaMu0VGRgLylGE6OzvfFcTjO9Pe3s6IVyqVniGRSPR3MI8wCYLw2YJ9bJqWlvYXamlpEcTGxn7Ys9+MjIyvIyMjgpDl5WWysbFxjKbpCLPZjBITE11JSUmfnE4n4XA4Xu3U3deJfFhYGIqOjkbx8fEoLi7uO4/H+yaRSL5QFPXH4OCgjf1jhRUrVqxYsUII/QO1gKIk0DWwZAAAAABJRU5ErkJggg==`;

setTimeout(
	function () {
		"use strict";
		const w = window.unsafeWindow || window;
		if (w.__jmod === true) return;
		w.__jmod = true;
		if (typeof w.ImportBondageCollege !== "function") {
			alert("Club not detected! Please only use this while you have Club open!");
			return;
		}

		const version = "1.8.0";

		//#region Utils

		const clipboardAvailable = Boolean(navigator.clipboard);
		const encoder = new TextEncoder();

		function crc32(str) {
			let crc = 0 ^ -1;
			for (const b of encoder.encode(str)) {
				let c = (crc ^ b) & 0xff;
				for (let j = 0; j < 8; j++) {
					c = (c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1);
				}
				crc = (crc >>> 8) ^ c;
			}

			return ((crc ^ -1) >>> 0).toString(16).padStart(8, "0").toUpperCase();
		}

		// Other mod detection
		const IsSMod = typeof w.ChatControlHead === "function";
		const HasBondageClubTools = ServerSocket.listeners("ChatRoomMessage").some(i => i.toString().includes("window.postMessage"));

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

		/**
		 * Patches a function, replacing some strings
		 * @param {Function} fn The function to patch
		 * @param {Record<string, string>} patches The patches to apply
		 * @param {string[]} [checksum] Accepted checksums
		 * @returns {Function}
		 */
		function PatchFunction(fn, patches, checksum = null) {
			let fn_str = fn.toString();
			const crc = crc32(fn_str);
			const N = `[JMod] Patching ${fn.name}[${crc}]`;
			if (!checksum) {
				console.info(`${N}: No checksum specified`);
			} else if (!checksum.includes(crc)) {
				console.warn(`${N}: Bad checksum`)
			}
			for (const k of Object.keys(patches)) {
				if (!fn_str.includes(k)) {
					console.warn(`${N}: Patch ${k} not applied`);
				}
				fn_str = fn_str.replaceAll(k, patches[k]);
			}
			return eval(`(${fn_str})`);
		}

		//#endregion

		//#region Tools

		let j_Allow = false;
		w.j_Allow = function _j_Allow(allow) {
			if (typeof allow === "boolean") {
				if (j_Allow === allow)
					return true;
				j_Allow = allow;
				if (allow) {
					console.warn("Cheats enabled; please be careful not to break things");
				} else {
					w.j_Devel(false);
					console.info("Cheats disabled");
				}
				return true;
			}
			return false;
		};

		let j_Devel = false;
		w.j_Devel = function _j_Devel(devel) {
			if (typeof devel === "boolean") {
				if (j_Devel === devel)
					return true;
				if (devel) {
					if (!w.j_Allow(true)) return false;
					AssetGroup.forEach(G => G.Description = G.Name);
					Asset.forEach(A => A.Description = A.Group.Name + ":" + A.Name);
					BackgroundSelectionAll.forEach(B => {
						B.Description = B.Name;
						B.Low = B.Description.toLowerCase();
					});
					console.warn("Developer mode enabled");
				} else {
					AssetLoadDescription("Female3DCG");
					BackgroundSelectionAll.forEach(B => {
						B.Description = DialogFindPlayer(B.Name);
						B.Low = B.Description.toLowerCase();
					});
					console.info("Developer mode disabled");
				}
				j_Devel = devel;
				return true;
			}
			return false;
		}

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

		const ChatRoomMessage_o = w.ChatRoomMessage;
		const ChatRoomMessage_patch = PatchFunction(ChatRoomMessage_o, IsSMod ? {
			"A.DynamicDescription(Source).toLowerCase()": `A.Description`,
			"G.Description.toLowerCase()": `G.Description`
		} : {
			"Asset[A].DynamicDescription(SourceCharacter || Player).toLowerCase()": `Asset[A].Description`,
			"AssetGroup[A].Description.toLowerCase()": `AssetGroup[A].Description`
		}, ["07FE4F52", "32105D0B", "2C6E4EC3", "8BF599EB"]);

		function ChatRoomSendLocal(msg) {
			ChatRoomMessage_o({
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
			const allowCosplay = !(C1.OnlineSharedSettings?.BlockBodyCosplay || C2.OnlineSharedSettings?.BlockBodyCosplay)
			const o1 = C1.Appearance.filter(i => j_IsCloth(i, allowCosplay) || j_IsBind(i));
			C1.Appearance = C1.Appearance.filter(i => !j_IsCloth(i, allowCosplay) && !j_IsBind(i));
			const o2 = C2.Appearance.filter(i => j_IsCloth(i, allowCosplay) || j_IsBind(i));
			C2.Appearance = C2.Appearance.filter(i => !j_IsCloth(i, allowCosplay) && !j_IsBind(i));
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
			const allowCosplay = !(TargetCharacter.OnlineSharedSettings?.BlockBodyCosplay || SourceCharacter.OnlineSharedSettings?.BlockBodyCosplay)
			TargetCharacter.Appearance = TargetCharacter.Appearance.filter(i => !j_IsCloth(i, allowCosplay) && !j_IsBind(i));
			const o2 = SourceCharacter.Appearance.filter(i => j_IsCloth(i, allowCosplay) || j_IsBind(i));
			TargetCharacter.Appearance = TargetCharacter.Appearance.concat(o2);
			TargetCharacter.Pose = SourceCharacter.Pose;

			w.CharacterRefresh(TargetCharacter);
			w.ChatRoomCharacterUpdate(TargetCharacter);
		}
		w.j_CopyCharacterClothesAndBinds = j_CopyCharacterClothesAndBinds;

		function j_SendHiddenMessage(type, message, Target = null) {
			if (HasBondageClubTools && !Array.isArray(ChatRoomData.Character)) {
				console.warn(`JMod: Unsent message ${type}; BondageClubTools crash prevention`);
				return;
			}
			ServerSend("ChatRoomChat", {
				Content: "BCXMsg",
				Type: "Hidden",
				Target,
				Dictionary: { type, message }
			});
		}

		w.j_SendHiddenMessage = j_SendHiddenMessage;

		const hiddenMessageHandlers = new Map();

		w.ChatRoomMessage = data => {
			if (data?.Type === "Hidden" && data.Content === "BCXMsg" && typeof data.Sender === "number") {
				if (data.Sender === w.Player.MemberNumber)
					return;
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
				if (j_Devel) {
					return ChatRoomMessage_patch(data);
				} else {
					return ChatRoomMessage_o(data);
				}
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

		//#endregion

		//#region Controlable patches

		const o_SpeechGarble = w.SpeechGarble;
		let antigarble = 0;
		let antigarble_block = false;
		w.SpeechGarble = (C, CD) => {
			if (antigarble === 2) return CD;
			let res = o_SpeechGarble(C, CD);
			if (CD !== res && typeof res === "string" && antigarble === 1) res += " <> " + CD;
			return res;
		};

		//#endregion

		//#region Chat control

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
WardrobeIO - Import and export buttons in wardrobe for current clothes
PoseOptionsAvailable - Player can select pose even outside of chatroom
[testing] Typing indicator
`);
			} else {
				ChatRoomSendLocal(`Unknown command ${cmd} - use .help to show commands or two dots to send message starting with a dot`);
				return false;
			}
			return true;
		}

		//#endregion

		//#region Wardrobe

		function j_WardrobeExportSelectionClothes(includeBinds = false) {
			const save = w.CharacterAppearanceSelection.Appearance.filter(a => j_IsCloth(a, true) || (includeBinds && j_IsBind(a))).map(A => ({ Name: A.Asset.Name, Group: A.Asset.Group.Name, Color: A.Color, Property: A.Property }));
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
			if ((w.CharacterAppearanceMode == "Wardrobe" || IsSMod && AppearanceMode == "Wardrobe") && clipboardAvailable) {
				const Y = IsSMod ? 265 : 125;
				DrawButton(1457, Y, 50, 50, "", "White", j_WardrobeIncludeBinds ? "Icons/Checked.png" : "", "Include restraints");
				DrawButton(1534, Y, 207, 50, "Export", "White", "");
				DrawButton(1768, Y, 207, 50, "Import", "White", "");
			}
		};

		const s_AppearanceClick = w.AppearanceClick;
		w.AppearanceClick = () => {
			if ((w.CharacterAppearanceMode == "Wardrobe" || IsSMod && AppearanceMode == "Wardrobe") && clipboardAvailable) {
				const Y = IsSMod ? 265 : 125;
				// Restraints toggle
				if (w.MouseIn(1457, Y, 50, 50)) {
					j_WardrobeIncludeBinds = !j_WardrobeIncludeBinds;
				}
				// Export
				if (w.MouseIn(1534, Y, 207, 50)) {
					setTimeout(async () => {
						await navigator.clipboard.writeText(j_WardrobeExportSelectionClothes(j_WardrobeIncludeBinds));
						w.CharacterAppearanceWardrobeText = "Copied to clipboard!";
					}, 0);
					return;
				}
				// Import
				if (w.MouseIn(1768, Y, 207, 50)) {
					setTimeout(async () => {
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
				const data = (ev.clipboardData || w.clipboardData).getData("text");
				const res = j_WardrobeImportSelectionClothes(data, j_WardrobeIncludeBinds, j_Allow);
				w.CharacterAppearanceWardrobeText = res !== true ? `Import error: ${res}` : "Imported!";
			}
		});

		//#endregion

		//#region Common patches

		// TODO: Socket.io is broken as it unloads before this one
		// Figure out how to make this fire even before socket.io
		// w.onbeforeunload = () => (!IsSMod ? "Are you sure you want to leave?" : undefined);

		w.AsylumEntranceCanWander = () => true;
		w.CheatValidate = () => { };
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
			InventoryAdd(Player, "DeluxeBoots", "Shoes", false);
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
			ChatroomSM.SetInputElement(elem);
		};

		const o_ChatRoomLeave = w.ChatRoomLeave;
		w.ChatRoomLeave = () => {
			o_ChatRoomLeave();
			ChatroomSM.SetInputElement(null);
		};

		w.ElementIsScrolledToEnd = ID => {
			const element = document.getElementById(ID);
			return element != null && element.scrollHeight - element.scrollTop - element.clientHeight <= 1;
		};

		//#endregion

		//#region Cheats

		const o_Player_CanChange = w.Player.CanChange;
		w.Player.CanChange = () => j_Allow || o_Player_CanChange.call(w.Player);

		const o_ChatRoomCanLeave = w.ChatRoomCanLeave;
		w.ChatRoomCanLeave = () => j_Allow || o_ChatRoomCanLeave();

		function j_InvisEarbuds() {
			const asset = Asset.find(A => A.Name === "BluetoothEarbuds");
			if (!asset) return;
			w.Player.Appearance = w.Player.Appearance.filter(A => A.Asset.Group.Name !== "ItemEars");
			w.Player.Appearance.push({
				Asset: asset,
				Color: "Default",
				Difficulty: -100,
				Property: {
					Type: "Light",
					Effect: [],
					Hide: AssetGroup.map(A => A.Name).filter(A => A !== "ItemEars")
				}
			});
			w.CharacterRefresh(Player);
			w.ChatRoomCharacterUpdate(Player);
		}
		w.j_InvisEarbuds = j_InvisEarbuds;

		//#endregion

		//#region Devel

		const ExtendedItemDraw_o = w.ExtendedItemDraw;
		const ExtendedItemDraw_patched = PatchFunction(ExtendedItemDraw_o, {
			"DialogFindPlayer(DialogPrefix + Option.Name)": `JSON.stringify(Option.Property.Type)`
		}, ["7C52D5A4", "3DB374E3", "486A52DF", "71FED847"]);

		w.ExtendedItemDraw = (...args) => {
			if (j_Devel) {
				return ExtendedItemDraw_patched(...args);
			} else {
				return ExtendedItemDraw_o(...args);
			}
		}

		const DialogDrawItemMenu_o = w.DialogDrawItemMenu;
		w.DialogDrawItemMenu = (C) => {
			if (j_Devel) {
				w.DialogTextDefault = C.FocusGroup.Description;
			}
			DialogDrawItemMenu_o(C);
		}

		const DialogDrawPoseMenu_o = w.DialogDrawPoseMenu;
		const DialogDrawPoseMenu_patch = PatchFunction(DialogDrawPoseMenu_o, {
			'"Icons/Poses/" + PoseGroup[P].Name + ".png"': `"Icons/Poses/" + PoseGroup[P].Name + ".png", PoseGroup[P].Name`
		}, ["EE8E3CC4", "4B972D11", "6145B7D7"]);

		w.DialogDrawPoseMenu = () => {
			if (j_Devel) {
				return DialogDrawPoseMenu_patch();
			} else {
				return DialogDrawPoseMenu_o();
			}
		}

		const DialogDrawExpressionMenu_o = w.DialogDrawExpressionMenu;

		w.DialogDrawExpressionMenu = () => {
			DialogDrawExpressionMenu_o();
			if (j_Devel) {
				for (let I = 0; I < DialogFacialExpressions.length; I++) {
					const FE = DialogFacialExpressions[I];
					const OffsetY = 185 + 100 * I;

					if (MouseIn(20, OffsetY, 90, 90)) {
						DrawText(JSON.stringify(FE.Group), 300, 950, "White");
					}

					if (I == DialogFacialExpressionsSelected) {
						for (let j = 0; j < FE.ExpressionList.length; j++) {
							const EOffsetX = 155 + 100 * (j % 3);
							const EOffsetY = 185 + 100 * Math.floor(j / 3);
							if (MouseIn(EOffsetX, EOffsetY, 90, 90)) {
								DrawText(JSON.stringify(FE.ExpressionList[j]), 300, 950, "White");
							}
						}
					}
				}
			}
		}

		w.DialogSelfMenuOptions.forEach(opt => {
			if (opt.Name === "Pose") {
				opt.IsAvailable = () => true;
				opt.Draw = w.DialogDrawPoseMenu;
			} else if (opt.Name === "Expression") {
				opt.Draw = w.DialogDrawExpressionMenu;
			}
		});

		//#endregion

		//#region Testing stuff

		//#endregion

		//#region Multiplayer interactive
		class ChatRoomStatusManager {
			constructor() {
				this.InputTimeoutMs = 3 * 1000;

				this.StatusTypes = {
					None: "None",
					Typing: "Typing",
					Emote: "Emote",
					Whisper: "Whisper",
					// SMod
					Action: "Action",
					Afk: 'Afk'
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
						clearTimeout(this.InputTimeout);
					}
					this.InputTimeout = setTimeout(this.InputEnd.bind(this), this.InputTimeoutMs);
					this.SetStatus(type, target);
				} else {
					this.InputEnd();
				}
			}

			InputEnd() {
				if (this.InputTimeout !== null) {
					clearTimeout(this.InputTimeout);
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

		hiddenMessageHandlers.set("hello", (src, data) => {
			for (const char of ChatRoomCharacter) {
				if (char.MemberNumber === src) {
					if (!char.JMod) {
						char.JMod = true;
						console.log(`${char.Name} is using BCX version ${data?.version || data}`);
					}
				}
			}
			if (data?.request) {
				j_Announce(false);
			}
		});

		function j_Announce(request = false) {
			j_SendHiddenMessage("hello", { version: `J${version}`, request });
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

		function ChatRoomDrawFriendList(Char, Zoom, CharX, CharY) {
			if (!Char) return;
			let Color = "#ffffff";
			let Friend = Char && Player.FriendList.includes(Char.MemberNumber);
			let IsMutual = Friend;
			if (IsSMod) {
				if (Char.OnNServer == null) {
					const Eyes = InventoryGet(Char, "Eyes");
					const GUID = Eyes && Eyes.Property && Eyes.Property.GUID;
					Char.OnNServer = (Char.ID == 0 && IsSMod) || GetGUID(Char) == GUID;
				}
				const DChar = ChatRoomData && ChatRoomData.Character && ChatRoomData.Character[ChatRoomCharacter.indexOf(Char)];
				IsMutual = Player.FriendList.isMutual(Char.MemberNumber) || Char.ID == 0;
				const ClientActive = Char.OnNServer;
				const ServerActive = DChar && AdvancedServerMode && DChar.OnNonameServer == true;
				if (ClientActive) Color = "#840c24";
				if (ServerActive) {
					if (DChar && DChar.UnConnected == true)
						Color = ClientActive ? "#0000ac" : "#00acac";
					else
						Color = ClientActive ? "#00ac00" : "#acac00";
				}
				Friend = Friend || ClientActive || ServerActive;
			}
			if (Char.JMod || Char.ID == 0) {
				Friend = true;
				Color = "#3737ed";
			}
			if (Friend) {
				DrawImageCanvasColorizeImage(DrawGetImage("Icons/Small/FriendList.png"), MainCanvas, CharX + 375 * Zoom, CharY, Zoom, Color, null, null, IsMutual ? 1 : 0.5);
			}
		}

		if (IsSMod) {
			w.ChatRoomDrawFriendList = ChatRoomDrawFriendList;
		}

		const ChatRoomDrawCharacterOverlay_o = w.ChatRoomDrawCharacterOverlay;
		const ChatRoomDrawCharacterOverlay_patch = PatchFunction(ChatRoomDrawCharacterOverlay_o, IsSMod ? {} : {
			'DrawImageResize("Icons/Small/FriendList.png", CharX + 375 * Zoom, CharY, 50 * Zoom, 50 * Zoom);': ""
		}, ["1E1A1B60", "10CE4173"]);

		w.ChatRoomDrawCharacterOverlay = (C, CharX, CharY, Zoom, Pos) => {
			ChatRoomDrawCharacterOverlay_patch(C, CharX, CharY, Zoom, Pos);

			ChatRoomDrawFriendList(C, Zoom, CharX, CharY);

			if (IsSMod) return;

			switch (C.ID == 0 ? ChatroomSM.Status : C.Status) {
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
		};

		//#endregion

		//#region Other mod compatability

		if (IsSMod) {
			console.warn("JMod: SMod load!");
			w.ChatRoomSM = ChatroomSM;
			ServerSocket.on("ChatRoomMessageSync", () => {
				j_Announce(true);
			});
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

		//#endregion

		j_Announce(true);
		InfoBeep(`Jmod loaded! Version: ${version}`);
	},
	window.unsafeWindow !== undefined ? 1500 : 0
);
