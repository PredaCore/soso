const Discord = require('discord.js');
const lenolin = new Discord.Client();

const	token = "Mzk0NTQ4NjQ2MTI3MDc1MzI5.DSjuvw.vQp-f-U7fttYYT9EH2jEkf72Fy4",
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
    ["000", "Bienvenue dans le modèle de quêtes, QUETQUET N°1 (non aucun jeu de mot)", "Choisissez un couloir ci-dessous : (pas d'veine c'était pas l'bon)", 2, "couloir01", "couloir02"],
    ["0001", "Pas de bol, jean paul... Mais tu dira pas que je t'avais pas prévenue!", "", 0],
    ["0002", "T'es mignon mais t'es con, regarde ça: https://goo.gl/NcrLNP", "", 0],

    ["001", "Bienvenue dans le modèle de quêtes, ~~QUET~~QUET N°~~1~~ ..eeeuh 2.", "Choisissez un ~~couloir~~ chocolat ci-dessous :", 2, "couloir01", "couloir02"],
    ["0011", "Bravo !! Vous êtes mort dans d'atroce soufrance!", "", 0],
    ["0012", "Regarde ça: https://goo.gl/NcrLNP", "", 0],

    ["002", "Bienvenue dans la quêtes, ~~MAOW~~Maow N°~~3~~ ..eeeuh oui 3.", "Choisissez un ~~couloir~~ vanille ci-dessous :", 2, "couloir01", "couloir02"],
    ["0021", "Bravo !! Vous êtes mort dans d'atroce soufrance!", "", 0],
    ["0022", "Regarde ça: https://goo.gl/NcrLNP", "", 0]
];

var noReply = true;
var onQuest = false;
var myQuest = ""; // utilisé pour l'histoire complète à insérer.
var state = "000"; // numéro de l'arbre en cours de lecture
var ifor = 0; // pour ne chercher qu'à partir du dernier arbre visité
var nowQuest = ["0","Il était une fois","Choisir un personnage :",2,"Yann","Ebene"]; // utilisé pour lire la quête en cours.

var newQuest = function(){
	var min = 0, max = 2;
	var curQuest = [(Math.floor(Math.random() * (max - min +1)) + min)];
	if(curQuest[0]<10) curQuest.push("0");
	if(curQuest[0]<100) curQuest.push("0");
	state = curQuest.reverse().join('');
	onQuest = true;
	noReply = true;
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
	if(nowQuest[3]>4) {
		ifor = 0;
		state = nowQuest[4];
		run();
		return;
	} 
    var EmBeD = {
		"description": `${nowQuest[1]}\n${nowQuest[2]}`,
		"color": 3066993,
		"fields": (function(){
			let ret = [];
			switch(nowQuest[3]) {
				case 4:
					ret.push({name: nowQuest[7],value: "!choix04",inline: true});
				case 3:
					ret.push({name: nowQuest[6],value: "!choix03",inline: true});
				case 2:
					ret.push({name: nowQuest[5],value: "!choix02",inline: true});
				case 1:
					ret.push({name: nowQuest[4],value: "!choix01",inline: true});
					
					
					
		break;
                default:
                    onQuest = false;
					
				
					
			} return ret.reverse();
		})(),
		"thumbnail": {
			"url": "https://img15.hostingpics.net/pics/691096aqwzsxe.png"
        }
    };
    lenolin.channels.find("id", "395626075016658955").send({content: `!Q${state}`, embed: EmBeD});
};

lenolin.on('ready', () => {
	lenolin.user.setGame("Orc");
	console.log("lenolin-bot: true...");
	setInterval(newQuest, 3.6e+6);
	newQuest();
    lenolin.guilds.get('393792163835805706').members.map(a => {
		if(a.roles.has('396366269684645890')) a.removeRole('396366269684645890');
    });
});

lenolin.on('message', message => {
    // if(message.author.id===botID) {
    // if(/!Q[0-9]+/.test(message.content)) setTimeout(function(){if(noReply) message.delete();}, 3e5);
    // else setTimeout(function(){message.delete();}, 6e3);
// }
    
var regexp = [/^<@([0-9]+)>,/, /^!/];

    if(regexp[1].test(message.content)) { //on parle au MDJ
        var a = message.content.split(' ');
            
        switch(a[0]) {
			case "!choix01":
				if(onQuest) {state += "1";noReply = false;run();}
			break;
			case "!choix02":
				if(onQuest) {state += "2";noReply = false;run();}
			break;
			case "!choix03":
				if(onQuest) {state += "3";noReply = false;run();}
			break;
			case "!choix04":
				if(onQuest) {state += "4";noReply = false;run();}
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
        // if(message.author.id!==botID&&/^!/.test(message.content)) message.delete();
    }
});

lenolin.login(token);
