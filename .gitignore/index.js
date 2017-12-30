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

var allQuests = [
        ["000","```\nAlors que vous passez de longues heures accoudées au comptoir de la taverne de Marbrume a siroté une biere. Un barde monte sur une table et commence à jouer une petite chanson… Malheureusement sa chanson est terrible et nique l’ambiance du bar.```","Vous décidez de faire quelque chose !",2,"Le Convaincre de Partir","Le Provoquer en Duel"],
        // C'est le début de l'aventure, l'abre 0. Deux choix suivront cet arbre 0 : 01 et 02.
        
        ["0001",".<br/>Vous avez choisi d'aller à gauche. Il y a trois portes dans ce couloir","Choisissez une porte :",3,"Bleue","Verte","Rose"],
        // C'est le choix numéro 1 suivant l'arbre 0, c'est à dire 01. Trois choix suivront l'arbre 01 : 011, 012 et 013.
        ["0002",".<br/>Vous avez choisi d'aller à droite. Il y a une porte dans ce couloir","Ouvrir la porte ?",1,"Ouvrir."],
        // C'est le choix numéro 2 suivant l'arbre 0, c'est à dire 02. Un choix suivra l'arbre 02 : 021.
        
        
        ["00011",".<br/>Vous avez ouvert la porte Bleue. Vous découvrez un paysage de pique-nique.","Que faites-vous ?",4,"Regarder les fourmis","Se servir à manger","Renifler le fromage","Retourner sur vos pas"],
        // C'est le choix numéro 1 suivant l'arbre 01, c'est à dire 011. Quatre choix suivront l'arbre 011 : 0111, 0112, 0113 et 0114.
        ["00012",".<br/>Vous avez ouvert la porte Verte. Un vilain troll vous attendait derrière","Allez vous survivre ? C'est une autre histoire...",0],
        // C'est le choix numéro 2 suivant l'arbre 01, c'est à dire 012. Aucun choix n'est possible derrière cet arbre.
        ["00013",".<br/>Vous avez ouvert la porte Rose. Un vortex vous ramène dans le couloir de gauche","Entrer dans le vortex ?",1,"Entrer."],
        // C'est le choix numéro 3 suivant l'arbre 01, c'est à dire 013. Un choix suivra l'arbre 013 : 0131.
        ];

var noReply = true;
var onQuest = false;
var myQuest = ""; // utilisé pour l'histoire complète à insérer.
var state = "000"; // numéro de l'arbre en cours de lecture
var ifor = 0; // pour ne chercher qu'à partir du dernier arbre visité
var nowQuest = ["0","Il était une fois","Choisir un personnage :",2,"Yann","Ebene"]; // utilisé pour lire la quête en cours.

var newQuest = function(){
    let min = 0, max = 0;
    let curQuest = [(Math.floor(Math.random() * (max - min +1)) + min)];
    if(curQuest[0]<10) curQuest.push("0");
    if(curQuest[0]<100) curQuest.push("0");
    state = curQuest.reverse().join('');
    onQuest = true;
var noReply = true;
    run();
};

var run = function() {
    for ( var i = ifor; i < allQuests.length; i++ ) {
        if ( allQuests[i][0] == state ) { // Retrouver la quête en cours à partir de state.
            nowQuest = allQuests[i]; // une fois trouvée, mettre à jour la quete en cours.
            ifor = i; // puis mettre à jour le dernier arbre visité.
            break; // puis sortir de la boucle immédiatement.
        }
    }
        
    lenolin.channels.find("id", "395626075016658955").send({content: `!Q${state}`, embed:{
        description: `${nowQuest[1]}\n${nowQuest[2]}`,
        color: 3066993,
        thumbnail: {
            url: "https://cdn.discordapp.com/embed/avatars/0.png"
        },
        (function(){
            let ret = [];
            switch(nowQuest[3]) {
                case 4:
                    ret.push({
                        name: nowQuest[4],
                        value: "!choix04",
                        inline: true
                    });
                case 3:
                    ret.push({
                        name: nowQuest[3],
                        value: "!choix03",
                        inline: true
                    });
                case 2:
                    ret.push({
                        name: nowQuest[2],
                        value: "!choix02",
                        inline: true
                    });
                case 1:
                    ret.push({
                        name: nowQuest[1],
                        value: "!choix01",
                        inline: true
                    });
            }
            if(ret.length>0) return fields: [ret.reverse()];
            else return;
        })()
    }});

};

lenolin.on('ready', () => {
    bot.user.setGame("Orc");
    console.log("lenolin-bot: true...");
        
        setInterval(newQuest, 3,6e+6);
newQuest();
        
    lenolin.guilds.get('393792163835805706').members.map(a => {
        if(a.roles.has('396366269684645890')) a.removeRole('396366269684645890');
    });
});

lenolin.on('message', message => {
    if(message.author.id===botID) {
    if(/!Q[0-9]+/.test(message.content) setTimeout(function(){if(noReply) message.delete();}, 3e5);
    else setTimeout(function(){message.delete();}, 6e3);
}
    
var regexp = [/^<@([0-9]+)>,/, /^!/];

    if(regexp[1].test(message.content)) { //on parle au MDJ
        var a = message.content.split(' ');
            
        switch(a[0]) {
case "!choix01":
    if(onQuest) {
        state += "1";
        noReply = false;
        run();
    }
break;
case "!choix02":
    if(onQuest) {
        state += "2";
        noReply = false;
        run();
    }
break;
case "!choix03":
    if(onQuest) {
        state += "3";
        noReply = false;
        run();
    }
break;
case "!choix04":
    if(onQuest) {
        state += "4";
        noReply = false;
        run();
    }
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
        if(message.author.id!==botID&&/^!/.test(message.content)) message.delete();
    }
});

lenolin.login(token);
