export default class ChatSocket {
    ws;
    oauth;
    room;
    onChat;
    constructor(oauth) {
        this.oauth = 'oauth:'+oauth;
    }

    connect = (room) => {
        this.room = room;
        this.ws = new WebSocket("wss://irc-ws.chat.twitch.tv:443");
        this.ws.onopen = this.onOpen;
        this.ws.onclose = this.onClose;
        this.ws.onmessage = this.onMessage;
        this.ws.onerror = this.onError;
    }

    close = () => {
        this.ws.close();
    }

    join = (room) => {
        this.ws.send('PASS '+this.oauth);
        this.ws.send('NICK '+room);
        this.ws.send('JOIN #'+room);
        this.ws.send('USER #'+room);
    }

    onOpen = (e) => {
        console.log("CONNECTED!");
        this.ws.send('CAP REQ :twitch.tv/commands');
        this.ws.send('CAP REQ :twitch.tv/membership');
        this.ws.send('CAP REQ :twitch.tv/tags');
        this.join(this.room);
    }

    onClose = (e) => {
        console.log("DISCONNECTED!");
    }

    onMessage = (e) => {
        if (e.data.includes("PRIVMSG #"+this.room)) {
            const chat  = chatParser(e.data, this.room);
            if (this.onChat) {
                this.onChat(chat);
            }
            return;
        }
    }

    onError = (e) => {
        console.log(e.data);
    }

    send = (message) => {
        this.ws.send(message);
    }
}

/*
@badge-info=subscriber/17;
badges=subscriber/12,bits/1;
client-nonce=6100b52dbe0a3b207627fd47e50d0ab9;
color=#8A2BE2;
display-name=랄_로;
emote-only=1;
emotes=472958:0-12,14-26,28-40;
flags=;
id=5e181f7a-e3f0-4912-a170-203deb889dba;
mod=0;
room-id=62356185;
subscriber=1;
tmi-sent-ts=1611765637022;
turbo=0;
user-id=217698329;
user-type= :ra_lo!ra_lo@ra_lo.tmi.twitch.tv PRIVMSG #looksam :looksamPotter looksamPotter looksamPotter
*/

function chatParser(msg, room) {
    const data = {};
    console.log(msg);
    if (msg.startsWith('@')) {
        msg = msg.substring(1);
    }
    data["badge-info"] = msg.split("badge-info=")[1].split(";")[0];
    data["badges"] = msg.split("badges=")[1].split(";")[0];
    data["color"] = msg.split("color=")[1].split(";")[0];
    data["display-name"] = msg.split("display-name=")[1].split(";")[0];
    data["emotes"] = msg.split("emotes=")[1].split(";")[0];
    data["flags"] = msg.split("flags=")[1].split(";")[0];
    data["id"] = msg.split("id=")[1].split(";")[0];
    data["room-id"] = msg.split("room-id=")[1].split(";")[0];
    data["subscriber"] = msg.split("subscriber=")[1].split(";")[0];
    data["tmi-sent-ts"] = msg.split("tmi-sent-ts=")[1].split(";")[0];
    data["turbo"] = msg.split("turbo=")[1].split(";")[0];
    data["user-id"] = msg.split("user-id=")[1].split(";")[0];
    data["user-type"] = msg.split("user-type=")[1].split(" ")[1];
    data["username"] = data["user-type"].split("@")[1].split(".")[0];
    data["message"] = msg.split("user-type=")[1].split("#")[1].replace(room+" :", "").split("\r\n")[0];

    return data;
}