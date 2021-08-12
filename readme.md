chatroom-exercise

SOCKETS : 2 way connection between client and server

how to refresh data? for example leaderboard updates in online multiplayer game.
We could ask users to refresh every few mins for new GET request with updated scores,
or use setIntervals, but those are hacky ways. We use sockets for realtime, constantly on the fly
updated data. 

ISSUE 1 : the console.logging happens in the terminal on the server side! don't be a dum dum Aaron.

ISSUE 2 : Move script.js under /socket.io in the <scripts> addition to the headers. Otherwise it loads 
the client side js before the sockets are loaded. Defer didnt work for some reason, had to move.

Current status : can see someone connect in the server side terminal on page reload.