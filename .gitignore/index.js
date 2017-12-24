const Discord = require("discord.js");
                        
var bot = new Discord.Client();

bot.on("ready", function() {
    bot.user.setGame("soso, !help");
    console.log("le bot a bien ete connecte");
});

bot.login("Mzk0NDc2MjQzOTc5OTkzMDg5.DSFzbg.wm0qD6l8YM5t5bFT2nKQpnHg1zw");
