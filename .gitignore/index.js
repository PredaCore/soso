const Discord = require("discord.js");
                        
var bot = new Discord.Client();

bot.on("ready", function() {
    bot.user.setGame("Race : Orc");
    console.log("le bot a bien ete connecte");
});

    else if(message.content === '!test') {
      const embed = new Discord.RichEmbed();
      embed.setTitle('Mon titre - 256 caractères')
      .setAuthor('Nom', 'https://i.imgur.com/lm8s41J.png')
      .setColor(3066993)
      .setDescription('```\nAlors que vous passez de longues heures accoudées au comptoir de la taverne de Marbrume a siroté une biere. \n\nUn barde monte sur une table et commence à jouer une petite chanson… Malheureusement sa chanson est terrible et nique l’ambiance du bar.```')
      .setFooter('Pied de page - 2048','http://i.imgur.com/w1vhFSR.png')
      .setImage('http://i.imgur.com/yVpYmuV.png')
      .setThumbnail('https://img15.hostingpics.net/pics/691096aqwzsxe.png')
      .setTimestamp()
      .setURL('http://google.com');
      
      embed.addField('Markdown', 'Le **Markdown**, c\'est la *vie* ! ***Discord***')
      .addField('Markdown', 'Le **Markdown**, c\'est la *vie* ! ***Discord***')
      .addBlankField(true)
      .addField('Markdown', 'Le **Markdown**, c\'est la *vie* ! ***Discord***');
      
      message.channel.send({embed: embed});
    }
  }
});

bot.login("Mzk0NTQ4NjQ2MTI3MDc1MzI5.DSU33g.4pNyKqbzGPoNSs-joO8FxxGNI7A");
