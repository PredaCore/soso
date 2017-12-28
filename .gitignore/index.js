const Discord = require("discord.js");
                        
var bot = new Discord.Client();

var promoteGrade = function(a,b,c,d) {
    client.guilds.members.find('id', a).removeRole("id", b);
    client.guilds.members.find('id', a).addRole("id", c);
    if(d) client.guilds.members.find("id", a).setVoiceChannel(d);
};

bot.on("ready", function() {
    bot.user.setGame("Orc");
    console.log("le bot a bien ete connecte");
});

bot.login("Mzk0NTQ4NjQ2MTI3MDc1MzI5.DSU33g.4pNyKqbzGPoNSs-joO8FxxGNI7A");
