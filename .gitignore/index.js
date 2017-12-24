const Discord = require("discord.js");
                        
var bot = new Discord.Client();

bot.on("ready", function() {
    bot.user.setGame("lenolin, !help");
    console.log("le bot a bien ete connecte");
});

bot.login("Mzk0NTQ4NjQ2MTI3MDc1MzI5.DSF7lA.gkcdZON9Ltyw9eNFHIZiqwf6pcI");
