const Discord = require("discord.js");
                        
var bot = new Discord.Client();

var promoteGrade = function(a,b,c,d) {
    bot.guilds.members.find('id', a).removeRole("id", b);
    bot.guilds.members.find('id', a).addRole("id", c);
    if(d) bot.guilds.members.find("id", a).setVoiceChannel(d);
};

bot.on('ready', () => {
    bot.user.setGame("Orc");
    console.log("self-bot: true...");
    var a = bot.guilds.array();
    for(var b=0,c=a.length;b<c;b++) {
        console.log(a[b]);
    }
});

bot.on('message', message => {
    if(message.content==="!promoteGrade2") promoteGrade(message.author.id, "ID de Grade1", "ID de Grade2");
});

bot.login("Mzk0NTQ4NjQ2MTI3MDc1MzI5.DSU33g.4pNyKqbzGPoNSs-joO8FxxGNI7A");
