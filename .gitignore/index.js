const Discord = require("discord.js");
                        
var bot = new Discord.Client();

bot.on("ready", function() {
    bot.user.setGame("Race : Orc");
    console.log("le bot a bien ete connecte");
});


bot.login("Mzk0NTQ4NjQ2MTI3MDc1MzI5.DSU33g.4pNyKqbzGPoNSs-joO8FxxGNI7A");
