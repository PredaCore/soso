const Discord = require('discord.js');
const lenolin = new Discord.Client();

const    token = "Mzk0NTQ4NjQ2MTI3MDc1MzI5.DSjuvw.vQp-f-U7fttYYT9EH2jEkf72Fy4",
        botID = '394548646127075329'; //ID de lenolin.

const rpg = {
    role: [
            '394459182792966147',    //Marbrume - Ville
            '395927368260255745',    //Marbrume - Alentour
            '395930510641332244',    //Foret du Hadarac
            '395932085858205698',    //Dras Léona - Ville
            '395932272768843776'    //Dras Léona - Alentour
    ],
        goTo: function(a) {
        if(/"(.*?)"/.test(a)) {
            var b = /"(.*?)"/.exec(a)[1].toLowerCase(),
                c = {
                    "fort de marbrume": [0,1, '395934174839570432'],
                    "foret du hadarac": [2,2,-1],
                    "dras léona": [3,4, '395934283966971905']
                }, d = rpg.role;
            if(c.hasOwnProperty(b)) {
                return {v:d[c[b][0]], a:d[c[b][1]], c:c[b][2]};
            } else return false;
        } else return false;
    },
    addRoles: function(a,b) {
        lenolin.guilds.get('393792163835805706').members.get(a).addRole(b[0]).catch(console.error);
        lenolin.guilds.get('393792163835805706').members.get(a).addRole(b[1]).catch(console.error);
    }
};

var run = function() {};

lenolin.on('ready', () => {
    bot.user.setGame("Orc");
    console.log("lenolin-bot: true...");
    lenolin.guilds.get('393792163835805706').members.map(a => {
        if(a.roles.has('396366269684645890')) a.removeRole('396366269684645890');
    });
});

lenolin.on('message', message => {
    if(message.author.id===botID) setTimeout(function(){message.delete();}, 6e3);
    
var regexp = [/^<@([0-9]+)>,/, /^!/];

    if(regexp[1].test(message.content)) { //on parle au MDJ
        var a = message.content.split(' ');
            
        switch(a[0]) {
        case "!choix01":
            state += "1"; run();
        break;
        case "!choix02":
            state += "2"; run();
        break;
        case "!choix03":
            state += "3"; run();
        break;
        case "!choix04":
            state += "4"; run();
        break;

            case "!goto":
                if(message.member.roles.has('396366269684645890')) {
                    message.reply("Veuillez patientez quelques minute, 10 aprés votre dernier déplacement, avant de pouvoir bouger a nouveau.");
                } else {
                    var b = rpg.goTo(message.content), c="", d="";
                    if(b) {
                        if(b.c<0) c = b.v;
                        else {
                            if(message.member.roles.has(b.c)) c = b.v;
                            else c = b.a;
                        }
                        if(message.member.roles.has(c)) {
                            message.reply("Vous y êtes déjà...");
                        } else {
                            message.member.removeRoles(rpg.role);
                            rpg.addRoles(message.author.id,[c, '396366269684645890']);
                            setTimeout(function(){message.member.removeRole('396366269684645890');}, 6e5);
                        }
                    }
                }
            break;
        }
        if(/^!/.test(message.content)) message.delete();
    }
});

lenolin.login(token);
