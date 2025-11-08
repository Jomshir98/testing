# Brief history of BC server changes
by Jomshir98
_Licensed under CC-BY; sharing, creating derivatives, remixing, or building upon this article is allowed and encouraged_

This document covers only what happened since I joined the project. It was also created retroactively, so I might have missed something.
Feel free to correct me or add additional information on anything mentioned or relevant.
Each proposed change in this list has a date it was started and a link so you can see extra details for yourself.

Personal summary by Jomshir98:
Many of the changes were quickly accepted and improved things a lot.
Quite a few important ones were rejected until they were split into tiny bits that were merged one at a time (despite the fact that that increased chance of errors a lot, and errors indeed did happen that wouldn't have otherwise).
A few PRs took many months of continued queries to get acknowledged and accepted.
And many PRs were suspended or ignored entirely only to be "cleaned up" without any reaction or reason several years later...

The full list of PRs with short descriptions and tiny context follows.
Legend:
- ✅ Accepted change (28)
- ❌ Actively rejected change (3)
- 🪦 Ignored change (6)
- ⚠️ Something worth noting is here (15)

🪦 ⚠️ [November 2020] "Add type documentation" by Jomshir98 and Sekkmer
[#54](https://github.com/Ben987/Bondage-Club-Server/pull/54)
This PR was created to add documentation and tooling to reduce chance of making mistakes while writing server code.
Contained no actual changes to the code or its functionality.
Ben was contacted many times over the months regarding this.
Resolution: August 2022, rejected with reason:
> Clean-up of the GitHub pull requests.

❌ ⚠️ [November 2020] "Offline friends" by Jomshir98
[#55](https://github.com/Ben987/Bondage-Club-Server/pull/55)
This PR wsa to add support for querying status of friends on your friendlist, such as if they have friended you back and their current name.
Resolution: Week later, abandoned in favour of client-only implementation at the cost of inaccuracy and more storage space needed for each account

✅ [November 2020] "Leash support" by Ada18980
[#56](https://github.com/Ben987/Bondage-Club-Server/pull/56), [#57](https://github.com/Ben987/Bondage-Club-Server/pull/57) 
Added support for special beep messages used for leashing players across rooms.
Resolution: Merged within a week

🪦 [January 2021] "Better timed conditions" by Sandrine, in cooperation with Ellie and Jomshir98
[#61](https://github.com/Ben987/Bondage-Club-Server/pull/61), [client#1885](https://gitgud.io/BondageProjects/Bondage-College/-/merge_requests/1885)
Had a continued discussion with Ben and a few refinement iterations over the duration of a month, then Ben went silent on it.
Resolution: August 2022, rejected with reason:
> Clean-up of the GitHub pull requests.

✅ [January 2021] "Bugfix: Allows players to break with non-existent lover" by Ellie
[#63](https://github.com/Ben987/Bondage-Club-Server/pull/63)
Resolution: Merged within a week

✅ [January 2021] "IP-based connection limiting" by Jomshir98
[#64](https://github.com/Ben987/Bondage-Club-Server/pull/64)
Added supprot for limiting concurrent connections and logins to prevent ongoing DoS attack at the time
Resolution: Merged within a week

✅ [February 2021] "Fix memory leak" by Jomshir98
[#65](https://github.com/Ben987/Bondage-Club-Server/pull/65) 
Fixed most common reason for server crashing every few hours
Resolution: Merged within a week

✅ [February 2021] "Fix seemingly random disconnects" by Jomshir98
[#66](https://github.com/Ben987/Bondage-Club-Server/pull/66) 
Fixed that someone logging in twice would in addition to original connection disconnect one more random person
Resolution: Merged within a week

🪦 ⚠️ [February 2021] "Tamper evidence system" by Ada18980
[#67](https://github.com/Ben987/Bondage-Club-Server/pull/67), [client#2128](https://gitgud.io/BondageProjects/Bondage-College/-/merge_requests/2128) 
This aimed ot add a way to have cheat-proof way to monitor locks being bypassed or removed and re-added.
Suspended by Ben in February 2021 with reason:
> Lets put that one on hold for now.  A pretty big server change is coming for packet size and compression.

No reaction from Ben on this since.
Resolution: August 2022, rejected with reason:
> Clean-up of the GitHub pull requests.

✅ [February 2021] "Improvement: Item save format" by Jomshir98
[#68](https://github.com/Ben987/Bondage-Club-Server/pull/68)
Added a much smaller format to save items in player's inventory based on a study of average data player's have saved in their account.
Contact Jomshir98 if you want more details on study that was done as part of this.
Resolution: Merged within a week

✅ [February 2021] "Beep messages" by Jomshir98
[#69](https://github.com/Ben987/Bondage-Club-Server/pull/69)
Added ability to send messages with a beep. (this existed before this change as part of BCX, this change upstreamed these into BC)
Resolution: Merged within a week

✅ [March 2021] "Networking improvements" by Jomshir98
A series of multiple changes done to improve server's performance
Resolution: Merged in the timeframe of a few weeks

❌ ⚠️ [March 2021] "Better metrics" by Jomshir98
[#72](https://github.com/Ben987/Bondage-Club-Server/pull/72)
A patch to add better metrics to analyse server problems that were happening at the time.
Resolution: Merged and then immediately reverted when server was still having the problems... no useful metrics available to find out why.

🪦 ⚠️ [March 2021] "VIP for chatrooms" by Tessa
[#73](https://github.com/Ben987/Bondage-Club-Server/pull/73), [client#2193](https://gitgud.io/BondageProjects/Bondage-College/-/merge_requests/2193)
Aimed to add a new type "VIP" similar to room admins. VIPs would be allowed to see and join private/locked rooms, but not edit their settings.
Suspended by Ben in March 2021 with reason:
> Sorry, we'll need to put that one on hold until the server bugs are fixed.  We will try to optimize the server before adding new stuff.  Thanks!

No reaction from Ben on this since, despite continued queries on the status over the following months by multiple people.
Resolution: August 2022, rejected with reason:
> Clean-up of the GitHub pull requests.

✅ ⚠️ [March 2021] "Chatroom sync improvements" by Tessa, in collaboration with Sekkmer and Jomshir98
#76, #79, #80, #81, #82, #83, #84, #85, #86, #89, #90, #93
A single patch to improve server performance considerably. Was rejected by Ben as too big and following that split into multiple tiny PRs.
Resolution: May 2021, all the parts were finally merged over the span of two months

✅ [March 2021] "Login queue" by Jomshir98
[#78](https://github.com/Ben987/Bondage-Club-Server/pull/78)
This added a login queue to fix that server was completely unresponsive for tens of minutes after each reboot,
kicking everyone out until user population decreased enough for it to stabilized.
Resolution: Merged within a week

✅ [April 2021] "Room optimizations" by Sekkmer, Jomshir98, Tessa
[#87](https://github.com/Ben987/Bondage-Club-Server/pull/87)
Optimized synchronization of players in room, especially when someone joins or leaves the room.
Resolution: Merged within a week

✅ [April 2021] "Improve WhiteList&BlackList synchronization" by Jomshir98
[#88](https://github.com/Ben987/Bondage-Club-Server/pull/88)
This PR was a followup fix to improve whitelist and blacklist synchronization when someone joins or leaves room.
This was a followup to a change that only sent whitelist and blacklist to others in room if the relevant person is present as well. Before that change anyone could see your complete whitelist and blacklist if they were in the same room as you.
Resolution: Merged within a week

✅ ⚠️ [June 2021] "Release submissive from ownership" by Jomshir98
[#91](https://github.com/Ben987/Bondage-Club-Server/pull/91)
This added ability to release your submissive from ownership if you are in the same room instead of the submissive needing to go to the management and break it forcefully.
No reaction for several months of attempting to contact Ben about it.
Resolution: Merged on September 2021 (three months later)

✅ [June 2021] "Inventory favorites" by Ace
[#95](https://github.com/Ben987/Bondage-Club-Server/pull/95)
Added ability to mark items as favorite
Resolution: Merged within a week

✅ ⚠️ [July 2021] "Fix: Sync character when shared info is updated" by Jomshir98
[#91](https://github.com/Ben987/Bondage-Club-Server/pull/91)
This PR provided a medium-importance fix for syncing data to others in the room when it changes.
This fixed problems such as someone's description not updating if they changed it unless they left the room and joined again.
Resolution: Merged on September 2021 (two months later)

✅ ⚠️ [July 2021] "Formatting improvements" by Jomshir98
[#98](https://github.com/Ben987/Bondage-Club-Server/pull/98)
This only improved style of the code to be more legible. It needed to be updated because Ben made conflicting changes meanwhile.
Resolution: Merged on September 2021 (two months later)

✅ ⚠️ [July 2021] "Fix friendlist friend type" by Ace
[#99](https://github.com/Ben987/Bondage-Club-Server/pull/99)
Fixed lovers appearing in the friendlist as submissives.
Resolution: Merged on September 2021 (two months later)

✅ [September 2021] "Secret beeps" by Ace
[#103](https://github.com/Ben987/Bondage-Club-Server/pull/103), [#104](https://github.com/Ben987/Bondage-Club-Server/pull/104)
Added ability to exclude your current room while sending beeps and ability to show that room from a beep is private
Resolution: Merged within a week

✅ [September 2021] "Add admin/ban list during room creation" by Ace
[#106](https://github.com/Ben987/Bondage-Club-Server/pull/106)
Removed the need for update immediately following room re-creation after everyone in room DC'd
Resolution: Merged within a week

✅ [September 2021] "Fix double join bugs" by Ace
[#107](https://github.com/Ben987/Bondage-Club-Server/pull/107)
Fixed that you might join room, leave it, and immediately join again under some conditions when attempting to join it normally
Resolution: Merged within a week

✅ ⚠️ [September 2021] "Feature: Improved console warnings" by Ellie
[#109](https://github.com/Ben987/Bondage-Club-Server/pull/109)
Improved the console warning about script from simple one into nicer one that you can see today when you open console in BC.
Resolution: Merged on January 2022 (four months later)

✅ ⚠️⚠️⚠️ [September 2021] "Fix reference issues" by Ace, Jomshir98, Ellie, Sekkmer
[#110](https://github.com/Ben987/Bondage-Club-Server/pull/110)
A high-priority fix fixing many corner cases where changes done to your account could be applied to another, unrelated account.
Despite a lot of testing, clear descriptions and ability to reproduce the issues reliably was ignored for a long time until
Sid took it and split it into 26(!) tiny PRs (#114 to #139), that were merged over the period of several months
Resolution: Final parts were merged on the 31st March 2022 (SEVEN months later!)

✅ [March 2022] "Add rate limiting" by Sid
[#147](https://github.com/Ben987/Bondage-Club-Server/pull/147)
Added rate limiting for 2 new connections per second and 50 messages per second from a single client.
Removed the need for update immediately following room re-creation after everyone in room DC'd
Resolution: Merged within a week
Fun fact: This was reverted and then the revert was reverted without any comment or reason provided

🪦 ⚠️ [April 2022] "Paginated ChatRoomSearch" by Sid and Esta
[#150](https://github.com/Ben987/Bondage-Club-Server/pull/150)
Improved the chatroom search to no longer have fixed limit of rooms it can respond with.
Without this change if there are too many rooms, some old rooms will simply never be visible.
Resolution: Abandoned May 2022 after multiple conflict resolution rounds after Ben made several conflicting changes to server code without any reaction regarding this PR

✅ [November 2022] "Search for multiple chat spaces" by Nina
[#161](https://github.com/Ben987/Bondage-Club-Server/pull/161)
Added ability to search multiple spaces (Female, Male, Mixed) at the same time
Fun fact: Client still can't make use of this to this day (March 2024)
Resolution: Merged within a week

✅ [January 2023] "Send the room Space back to the client" by Esta
[#167](https://github.com/Ben987/Bondage-Club-Server/pull/167)
Added information about what space the _current_ room is from to be able to fix bugs related to asset blocking in some spaces
Resolution: Merged after three weeks

✅ [January 2023] "Fix a couple bugs with lovers and owners" by Esta
[#168](https://github.com/Ben987/Bondage-Club-Server/pull/168)
Fixed being able to love or own yourself (and a few related problems).
Resolution: Merged after two weeks

✅ [January 2023] "Fixes chatroom character swap chat dictionary" by Ellie
[#169](https://github.com/Ben987/Bondage-Club-Server/pull/169)
Moved the dictionary (the bits that replace parts of generic messages, such as character names) to a new format BC client moved to.
Resolution: Merged within a week

❌ ⚠️ [November 2023] "Sync character on appearance change" by elliethepink
[#175](https://github.com/Ben987/Bondage-Club-Server/pull/175)
Aimed to fix a problem with appearance not being saved into database for some changes.
As there was no reaction from Ben there was a client-side fix meanwhile at the cost of much increased server load.
Resolution: December 2023, rejected with reason:
> I think that one was fixed from a client side update. Thanks though!

✅ [December 2023] Some old code improvements by Esta
[#177](https://github.com/Ben987/Bondage-Club-Server/pull/177), [#179](https://github.com/Ben987/Bondage-Club-Server/pull/179), [#180](https://github.com/Ben987/Bondage-Club-Server/pull/180)
Resolution: Merged within a week

🪦 ⚠️ [December 2023] Rate limiting improvements and fixes by Sid
[#181](https://github.com/Ben987/Bondage-Club-Server/pull/181)
A framework for improving rate limiting by allowing clients to specify when messages were sent, meant to eliminate "Disconnected because rate limit" problems
Resolution: Abandoned at the end of January 2024 after Ben ignored this and made several conflicting changes
