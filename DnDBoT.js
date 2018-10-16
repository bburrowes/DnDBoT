const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  	if (message.content.startsWith("!")) {
	  	message.content = message.content.substring(1,message.content.length);

	  	//Testing
	  	if (message.content == "ping") {
	  		message.channel.send("pong!");
	  	}

	  	if (message.content == "help") {
	  		message.channel.send(
	  			"List of commands:\n" +
	  			"**!roll {x}d{y}** - rolls x number of y-sided dice [max 9 dice at the moment]\n" +
	  			"**!timer {x}** - sets a timer for x seconds [bot will not respond in this time]\n" +
	  			"**!mm {x}** - pulls up Monstrous Manual entry for creature x [use leading capital letters, punctuation and parentheses as specified in Monstrous Manual]\n" +
	  			"**!mm help** - provides a list of all creatures available from the Monstrous Manual sorted alphabetically (unless one is a subset of another in which case it is sequential, such as Killmoulis to Brownies)\n" +
	  			"**!spell {x}** (PLANNED) - pulls up spell entry from all valid 2e spellbooks"
	  		);
	  	}

	  	//Dice Rolling
	  	else if (message.content.startsWith("roll ")) {
	  		var s = message.content.substring(5, message.content.length);
	  		var numDice = 1;
	  		//FIX THIS
	  		if (s.charCodeAt(0) >= 49 && s.charCodeAt(0) <= 57) {
	  			var t = s.charCodeAt(0) - 48;
	  			numDice = t;
	  			s = s.substring(1, s.length);
	  		}
	  		var sides;
	  		if (s.charAt(0) == 'd'){
	  			s = s.substring(1, s.length);
	  			if (isNaN(s)){
	  				message.channel.send("I can't roll that! Use the command !roll {# dice}d{# sides}. I can only roll up to 9 dice.");
	  			} else {
		  			sides = parseInt(s);
		  			var retVal = [];
		  			for (i = 0; i < numDice; i++){
		  				var x = Math.floor(Math.random() * Math.floor(sides)) + 1;
		  				retVal[i] = x;
		  			}
		  			var tot = 0;
		  			for (i = 0; i < numDice; i++){
		  				tot += retVal[i];
		  			}
		  			message.channel.send("[" + retVal + "]  Total: " + tot);
	  			}
	  		} else {
	  			message.channel.send("I can't roll that! Use the command !roll {# dice}d{# sides}. I can only roll up to 9 dice.");
	  		}
	  	}

	  	//Timer
	  	else if (message.content.startsWith("timer ")){
	  		var sec = message.content.substring(6, message.content.length);
	  		if (isNaN(sec) || parseInt(sec) > 60){
	  			message.channel.send("Invalid timer! Use the command !timer [#seconds] with a max of 60 seconds!");
	  		} else {
	  			wait(sec*1000);
	  			message.channel.send("Ding! Timer's up!");
	  		}
	  	}


	  	//Monstrous Manual
	  	else if (message.content == "mm help"){
	  		var s = "";
	  		for (var i = 0; i < monstrousmanual.length; i++){
	  			var y = monstrousmanual[i];
	  			s = s.concat("\"" + y['name'] + "\", ");
	  		}
	  		s = s.substring(0, s.length-3);
	  		message.channel.send("List of creatures: " + s + "\"");
	  	}
	  	else if (message.content.startsWith("mm ")){
	  		var creature = message.content.substring(3, message.content.length);
	  		for (var i = 0; i < monstrousmanual.length; i++){
	  			var y = monstrousmanual[i];
	  			if (creature == y['name']){
	  				message.channel.send(
	  					"**Name**: " + y['name'] + "\n" +
	  					"**Frequency**: " + y['freq'] + "\n" +
	  					"**Alignment**: " + y['alig'] + "\n" +
	  					"**Description**: " + y['desc'] + "\n",
	  					{files: [y['image']]}
	  				);
	  				creature = null;
	  			}
	  		}
	  		if(creature != null){
	  			message.channel.send("Invalid creature! Make sure you spelled it correctly and use capitals.");
	  		}
	  	}



	  	else {
	  		message.channel.send("I don't recognize that command! Make sure you typed it correctly or type !help for a list of commands.");
	  	}
  	}
});

client.login("[TOKEN]");



function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}


var monstrousmanual = [

	{
		name: "Aarakocra",
		alig: "Neutral good",
		freq: "Very rare",
		desc: "The aarakocra are a race of intelligent bird-men that live on the peaks of the highest mountains, spending their days soaring on the thermal winds in peace and solitude.\nAarakocra are about 5 feet tall and have a wing span of 20 feet. About halfway along the edge of each wing is a hand with three human-sized fingers and an opposable thumb. An elongated fourth finger extends the length of the wing and locks in place for flying. Though the wing-hands cannot grasp during flight, they are nearly as useful as human hands when an aarakocra is on the ground and its wings are folded back. The wing muscles anchor in a bony chest plate that provides the aarakocra with extra protection. The powerful legs end in four sharp talons that can unlock and fold back to reveal another pair of functional hands, also with three human-sized fingers and an opposable thumb. The hand bones, like the rest of an aarakocra’s skeleton, are hollow and fragile.\nAarakocra faces resemble crosses between parrots and eagles. They have gray-black beaks, and black eyes set frontally in their heads that provide keen binocular vision. Plumage color varies from tribe to tribe, but generally males are red, orange, and yellow while females are brown and gray.\nAarakocra speak their own language, the language of giant eagles, and, on occasion, the common tongue (10% chance).",
		image: "http://www.lomion.de/cmm/img/aarakocr.gif"
	},

	{
		name: "Aboleth",
		alig: "Lawful evil",
		freq: "Very rare",
		desc: "The aboleth is a loathsome amphibious creature that lives in subterranean caves and lakes. It despises most land-dwelling creatures and seeks to enslave intelligent surface beings. It is as cruel as it is intelligent.\nAn aboleth resembles a plump fish, 20 feet in length from its bulbous head to its fluke-like tail. Its body is blue-green with gray splotches, and its pink-tan underbelly conceals a toothless, rubbery mouth. Three slit-like eyes, purple-red in color and protected by bony ridges, are set one atop the other in the front of its head. Four pulsating blue-black orifices line the bottom of its body and secrete gray slime that smells like rancid grease. Four leathery tentacles, each 10 feet in length, grow from its head. An aboleth uses its tail to propel itself through the water and its tentacles to drag itself along dry land.",
		image: "http://www.lomion.de/cmm/img/aboleth.gif",
	},

	{
		name: "Ankheg",
		freq: "Rare",
		alig: "Neutral",
		desc: "The ankheg is a burrowing monster usually found in forests or choice agricultural land. Because of its fondness for fresh meat, the ankheg is a threat to any creature unfortunate enough to encounter it.\nThe ankheg resembles an enormous many-legged worm. Its six legs end in sharp hooks suitable for burrowing and grasping, and its powerful mandibles are capable of snapping a small tree in half with a single bite. A tough chitinous shell, usually brown or yellow, covers its entire body except for its soft pink belly. The ankheg has glistening black eyes, a small mouth lined with tiny rows of chitinous teeth, and two sensitive antennae that can detect movement of man-sized creatures up to 300 feet away.",
		image: "http://www.lomion.de/cmm/img/ankheg.gif",
	},

	{
		name: "Arcane",
		freq: "Very rare",
		alig: "Lawful neutral",
		desc: "The arcane are a race of merchants, found wherever there is potential trade in magical items. They appear as tall, lanky, blue giants with elongated faces and thin fingers; each finger having one more joint than is common in most humanoid life. The arcane dress in robes, although there are individuals who are found in heavier armor, a combination of chain links with patches of plate (AC 3).",
		image: "http://www.lomion.de/cmm/img/arcane.gif",
	},

	{
		name: "Argos",
		freq: "Very rare",
		alig: "Neutral evil",
		desc: "Argos are found in the same regions of wildspace as the baleful beholder nations. An argos resembles a giant amoeba. It has one large, central eye with a tripartite pupil, and a hundred lashless, inhuman eyes and many sharp-toothed mouths. An argos can extrude several pseudopods, each tipped with a fanged maw that functions as a hand to manipulate various tools.\nArgos move by slithering; they can cling to walls and ceilings. They can levitate and fly at the very slow rate of 3.\nArgos colors tend toward shades of transparent blues and violets; they smell like a bouquet of flowers. They are huge beasts ranging in size from 10 to 20 feet in diameter, weighing about 200 pounds per Hit Die. Though they exhibit signs of being intelligent tool users, they do not wear clothes, choosing rather to carry gear stored in temporary cavities within their bodies. However, their digestive juices often ruin devices within two to three weeks (saving throw vs. acid).",
		image: "http://www.lomion.de/cmm/img/argos.gif",
	},

	{
		name: "Aurumvorax",
		freq: "Very rare",
		alig: "Neutral",
		desc: "Despite being only the size of a large badger, the aurumvorax, or \"golden gorger\", is an incredibly dangerous creature. The animal is covered with coarse golden hair and has small silver eyes with golden pupils. It has eight powerful legs that end in 3-inch-long copper claws. The aurumvorax’s shoulders are massively muscled while its heavy jaw is full of coppery teeth.\nThe creature weighs over 500 pounds. This incredible density provides the animal with much of its natural protection. This, combined with its speed, power, and sheer viciousness, makes it one of the most dangerous species yet known.",
		image: "http://www.lomion.de/cmm/img/aurumvor.gif",
	},

	{
		name: "Baatezu",
		freq: "Common - Very rare",
		alig: "Lawful evil",
		desc: "Baatezu are a strong, evil-tempered, well-organized race of fiends. In their rigid caste system, authority derives not only from power but from station. Changes in station come from participation in the Blood War or (as is more often the case) from the high attrition rate in the upper ranks. If a baatezu performs a great feat that cripples the enemy, it is rewarded by promotion – actually a physical transformation – to a higher station.\nThe baatezu pursue two obsessive goals. First and foremost, they wish to destroy their ancient blood enemies, the tanar’ri. Both races treat the conflict not only as a war of annihilation, but as a definition of existence.\nSecond, the baatezu have recently (by immortal standards) noticed a small but interesting group of beings: humanity. By infiltrating humankind’s world and gaining followers there, the baatezu gain magical energy and, thus, power over the tanar’ri. Toward this end they strive to dominate humanity by convincing victims they have godlike powers.\nIn contrast to the chaotic evil tanar’ri, baatezu pursue a long-range goal of dominion by their whole race throughout the planes. They prefer to encourage humanity’s intellectual evils, such as pride and ambition, rather than the immediate sensual appetites tanar’ri exploit.\nIn appearance the baatezu are diverse, though a Gothic gargoyle look, grotesque and unsightly by human standards, is common. Baatezu types fall into three divisions:\n" + "```Greater (amnizu, cornugon, gelugon, pit fiend).\nLesser (abishai, barbazu, erinyes, hamatula, kocrachon, osyluth).\nLeast (nupperibo, spinagon).```" + "The lemures (a fourth variety) rank so low that they don’t even qualify as “least” in the baatezu scheme. Baatezu consider them the very bottom in station. However, scholars customarily number them among the types for the sake of completeness. (See full list for specific baatezu)",
		image: "http://www.lomion.de/cmm/img/baatabis.gif",
	},

	{
		name: "Banshee",
		freq: "Very rare",
		alig: "Chaotic evil",
		desc: "The banshee or groaning spirit, is the spirit of an evil female elf – a very rare thing indeed. Banshee hate the living, finding their presence painful, and seek to harm whomever they meet.\nBanshees appear as floating, luminous phantasms of their former selves. Their image glows brightly at night, but is transparent in sunlight (60% invisible). Most banshees are old and withered, but a few (10%) who died young retain their former beauty. The hair of a groaning spirit is wild and unkempt. Her dress is usually tattered rags. Her face is a mask of pain and anguish, but hatred and ire burns brightly in her eyes. Banshees frequently cry out in pain – hence their name.",
		image: "http://www.lomion.de/cmm/img/banshee.gif",
	},

	{
		name: "Basilisk",
		freq: "Uncommon",
		alig: "Neutral",
		desc: "These reptilian monsters all posses a gaze that enables them to turn any fleshy creature to stone; their gaze extends into the Astral and Ethereal planes. Although it has eight legs, its sluggish metabolism allows only a slow movement rate. A basilisk is usually dull brown in color, with a yellowish underbelly. Its eyes glow pale green.\n (This entry is for a lesser basilisk. You can type !mm Greater Basilisk or !mm Dracolisk for other kinds of basilisk.)",
		image: "http://www.lomion.de/cmm/img/basilisk.gif",
	},

	{
		name: "Greater Basilisk",
		freq: "Very rare",
		alig: "Neutral",
		desc: "These reptilian monsters all posses a gaze that enables them to turn any fleshy creature to stone; their gaze extends into the Astral and Ethereal planes. The greater basilisk is a larger cousin of the more common reptilian horror, the ordinary basilisk. These monsters are typically used to guard treasure.",
		image: "https://i.imgur.com/LS59CCA.png",
	},

	{
		name: "Dracolisk",
		freq: "Very rare",
		alig: "Chaotic evil",
		desc: "These reptilian monsters all posses a gaze that enables them to turn any fleshy creature to stone; their gaze extends into the Astral and Ethereal planes.\nThe sages say that the dracolisk is the offspring of a rogue black dragon and a basilisk of the largest size.\nThe result is a deep brown, dragon-like monster that moves with relative quickness on six legs. It can fly, but only for short periods – a turn or two at most.",
		image: "https://i.imgur.com/eo3GA2q.png",
	},

	{
		name: "Bat",
		freq: "Common - Rare",
		alig: "Neutral (Night Azmyth: Chaotic neutral, Hunter: Neutral evil, Sinister: Lawful evil)",
		desc: "Bats are common animals in many parts of the world. While ordinary bats are annoying but harmless, larger varieties can be quite deadly.\nWith almost 2,000 different species of bats known, one can find wingspans from less than two inches across to 15 feet or more. The small body of the ordinary bat resembles a mouse, while the wings are formed from extra skin stretched across its fore limbs. The larger bats are scaled up but otherwise similar in appearance.\nDespite the common belief that bats are blind, nearly all known species have rather good eyesight. In the dark, however, they do not rely on their visual acuity, but navigate instead by echo-location. By emitting a high-pitched squeal and listening for it to bounce back to them, they can \"see\" their surroundings by this natural form of sonar.",
		image: "http://www.lomion.de/cmm/img/spc/bat.gif",
	},

	{
		name: "Bear",
		freq: "Common - Uncommon",
		alig: "Neutral",
		desc: "A rather common omnivorous mammal, bears tend to avoid humans unless provoked. Exceptions to this rule can be a most unfortunate occurrence.\nBears are, in general, large and powerful animals which are found throughout the world's temperate and cooler climates. With dense fur protecting them from the elements and powerful claws protecting them from other animals, bears are the true rulers of the animal kingdom in the areas where they live.\nThe so-called black bear actually ranges in color from black to light brown. It is smaller than the brown bear and the most widespread species by far.",
		image: "http://www.lomion.de/cmm/img/bear.gif",
	},

	{
		name: "Beetle, Giant",
		freq: "Comon - Uncommon",
		alig: "Neutral",
		desc: "Giant beetles are similar to their more ordinary counterparts, but thousands of times larger – with chewing mandibles and hard wings that provide substantial armor protection.\nBeetles have two pairs of wings and three pairs of legs. Fortunately, the wings of a giant beetle cannot be used to fly, and in most cases, its six bristly legs do not enable it to move as fast as a fleeing man. The hard, chitinous shell of several varieties of these beetles are brightly colored, and sometimes have value to art collectors. While their shells protect beetles as well as plate mail armor, it is difficult to craft armor from them, and a skilled alchemist would need to be brought in on the job.\nAll beetles are basically unintelligent and always hungry. They will feed on virtually any form of organic material, including other sorts of beetles. They taste matter with their antennae, or feelers; if a substance tasted is organic, the beetle grasps it with its mandibles, crushes it, and eats it. Because of the thorough grinding of the mandibles, nothing eaten by giant beetles can be revived by anything short of a wish. Beetles do not hear or see well, and rely primarily on taste and feel.\nExcept as noted below, giant beetles are not really social animals; those that are found near each other are competitors for the same biological niche, not part of any family unit.",
		image: "http://www.lomion.de/cmm/img/beetlegi.gif",
	},

	{
		name: "Behir",
		freq: "Rare",
		alig: "Neutral evil",
		desc: "The behir is a snake-like reptilian monster whose dozen legs allow it to move with considerable speed and climb at fully half its normal movement rate. It can fold its limbs close to its long, narrow body and slither in snake-fashion if it desires. The head looks more crocodilian than snake-like, but has no difficulty in opening its mouth wide enough to swallow prey whole, the way a snake does.\nBehir have band-like scales of great hardness. Their color ranges from ultramarine to deep blue with bands of gray-brown. The belly is pale blue. The two large horns curving back over the head look dangerous enough but are actually used for preening the creature’s scales and not for fighting.",
		image: "http://www.lomion.de/cmm/img/behir.gif",
	},

	//To avoid confusion (Since Manual lists it as "Beholder and Beholder-kin I & II) I accept several forms of Beholder
	{
		name: "Beholder",
		freq: "Rare - Very rare",
		alig: "Various",
		desc: "The beholder is the stuff of nightmares. This creature, also called the sphere of many eyes or the eye tyrant, appears as a large orb dominated by a central eye and a large toothy maw, has 10 smaller eyes on stalks sprouting from the top of the orb. Among adventurers, beholders are known as deadly adversaries.\nEqually deadly are a number of variant creatures known collectively as beholder-kin, including radical and related creatures, and an undead variety. These creatures are related in manners familial and arcane to the \"traditional\" beholders, and share a number of features, including the deadly magical nature of their eyes. The most extreme of these creatures are called beholder abominations.\nThe globular body of the beholder and its kin is supported by levitation, allowing it to float slowly about as it wills.\nBeholders and beholder-kin are usually solitary creatures, but there are reports of large communities of them surviving deep beneath the earth and in the void between the stars, under the dominion of hive mothers.All beholders speak their own language, which is also understood by all beholder-kin. In addition, they often speak the tongues of other lawful evil creatures.",
		image: "http://www.lomion.de/cmm/img/spc/beholde1.gif",
	},

	{
		name: "Beholder and Beholder-kin",
		freq: "Rare - Very rare",
		alig: "Various",
		desc: "The beholder is the stuff of nightmares. This creature, also called the sphere of many eyes or the eye tyrant, appears as a large orb dominated by a central eye and a large toothy maw, has 10 smaller eyes on stalks sprouting from the top of the orb. Among adventurers, beholders are known as deadly adversaries.\nEqually deadly are a number of variant creatures known collectively as beholder-kin, including radical and related creatures, and an undead variety. These creatures are related in manners familial and arcane to the \"traditional\" beholders, and share a number of features, including the deadly magical nature of their eyes. The most extreme of these creatures are called beholder abominations.\nThe globular body of the beholder and its kin is supported by levitation, allowing it to float slowly about as it wills.\nBeholders and beholder-kin are usually solitary creatures, but there are reports of large communities of them surviving deep beneath the earth and in the void between the stars, under the dominion of hive mothers.All beholders speak their own language, which is also understood by all beholder-kin. In addition, they often speak the tongues of other lawful evil creatures.",
		image: "http://www.lomion.de/cmm/img/spc/beholde1.gif",
	},

	{
		name: "Beholder and Beholder-kin I",
		freq: "Rare - Very rare",
		alig: "Various",
		desc: "The beholder is the stuff of nightmares. This creature, also called the sphere of many eyes or the eye tyrant, appears as a large orb dominated by a central eye and a large toothy maw, has 10 smaller eyes on stalks sprouting from the top of the orb. Among adventurers, beholders are known as deadly adversaries.\nEqually deadly are a number of variant creatures known collectively as beholder-kin, including radical and related creatures, and an undead variety. These creatures are related in manners familial and arcane to the \"traditional\" beholders, and share a number of features, including the deadly magical nature of their eyes. The most extreme of these creatures are called beholder abominations.\nThe globular body of the beholder and its kin is supported by levitation, allowing it to float slowly about as it wills.\nBeholders and beholder-kin are usually solitary creatures, but there are reports of large communities of them surviving deep beneath the earth and in the void between the stars, under the dominion of hive mothers.All beholders speak their own language, which is also understood by all beholder-kin. In addition, they often speak the tongues of other lawful evil creatures.",
		image: "http://www.lomion.de/cmm/img/spc/beholde1.gif",
	},

	{
		name: "Beholder and Beholder-kin II",
		freq: "Rare - Very rare",
		alig: "Various",
		desc: "The beholder is the stuff of nightmares. This creature, also called the sphere of many eyes or the eye tyrant, appears as a large orb dominated by a central eye and a large toothy maw, has 10 smaller eyes on stalks sprouting from the top of the orb. Among adventurers, beholders are known as deadly adversaries.\nEqually deadly are a number of variant creatures known collectively as beholder-kin, including radical and related creatures, and an undead variety. These creatures are related in manners familial and arcane to the \"traditional\" beholders, and share a number of features, including the deadly magical nature of their eyes. The most extreme of these creatures are called beholder abominations.\nThe globular body of the beholder and its kin is supported by levitation, allowing it to float slowly about as it wills.\nBeholders and beholder-kin are usually solitary creatures, but there are reports of large communities of them surviving deep beneath the earth and in the void between the stars, under the dominion of hive mothers.All beholders speak their own language, which is also understood by all beholder-kin. In addition, they often speak the tongues of other lawful evil creatures.",
		image: "http://www.lomion.de/cmm/img/spc/beholde1.gif",
	},

	{
		name: "Bird",
		freq: "Various",
		alig: "Various",
		desc: "Avians, whether magical or mundane in nature, are among the most interesting creatures ever to evolve. Their unique physiology sets them apart from all other life, and their grace and beauty have earned them a place of respect and adoration in the tales of many races.",
		image: "http://www.lomion.de/cmm/img/bird.gif",
	},

	{
		name: "Brain Mole",
		freq: "Very rare",
		alig: "Neutral",
		desc: "A brain mole can perform mindwipe up to a range of 30 feet. Strangely enough, a brain mole must establish contact before using psychic drain. Furthermore, it can only perform psychic drain upon psionicists or psionic creatures. However, it does not have to put them into a trance or a deep sleep first, it just starts siphoning away psionic energy.",
		image: "http://www.lomion.de/cmm/img/braimole.gif",
	},

	{
		name: "Broken One",
		freq: "Common: Rare, Greater: Very rare",
		alig: "Neutral evil",
		desc: "Broken ones (or animal men) are the tragic survivors of scientific and magical experiments gone awry. While they were once human, their beings have become mingled with those of animals and their very nature has been forever altered by the shock of this event. It is rumored that some broken ones are the result of failed attempts at resurrection, reincarnation, or polymorph spells.\nWhile broken ones look more or less human, they are physically warped and twisted by the accidents that made them. The characteristics of their non-human part will be clearly visible to any who see them. For example, a broken one who has been infused with the essence of a rat might have horrific feral features, wiry whiskers, curling clawed fingers, and a long, whip-like tail.\nBroken ones know whatever languages they knew as human beings and 10% of them can communicate with their non-human kin as well. It is not uncommon for the speech of a broken one to be heavily accented or slurred by the deformities of its body.",
		image: "http://www.lomion.de/cmm/img/brokenon.gif",
	},

	{
		name: "Brownie",
		freq: "Rare",
		alig: "Lawful good",
		desc: "Brownies are small, benign humanoids who may be very distantly related to halflings. Peaceful and friendly, brownies live in pastoral regions, foraging and gleaning their food.\nStanding no taller than 2 feet, brownies are exceedingly nimble. They resemble small elves with brown hair and bright blue eyes. Their brightly colored garments are made from wool or linen with gold ornamentation. They normally carry leather pouches and tools for repairing leather, wood, and metal.\nBrownies speak their own language and those of elves, pixies, sprites, and halflings, as well as common. (for killmoulis, see !mm Killmoulis)",
		image: "http://www.lomion.de/cmm/img/brownie.gif",
	},

	{
		name: "Killmoulis",
		freq: "Uncommon",
		alig: "Neutral (chaotic good)",
		desc: "The killmoulis is a distant relative of the brownie, standing under 1-foot in height but with a disproportionately large head and a prodigious nose. Killmoulis are able to blend into surroundings and are therefore 10% detectable. They live in symbiotic relationships with humans, usually where foodstuffs are handled, making their homes under the floors, and in the walls and crawlspaces.\nKillmoulis are diminutive beings who like to provide useful services but also commit mischief.\nA killmoulis is under one foot in height. Although the overall shape is that of a thin humanoid, the head is immense in proportion. Killmoulis have no mouths or chins. They inhale food through their prodigious noses. Killmoulis do not speak but are apperently telepathic. They appear to be sexless.",
		image: "http://www.lomion.de/cmm/img/killmoul.gif",
	},

	{
		name: "Bugbear",
		freq: "Uncommon",
		alig: "Chaotic evil",
		desc: "Bugbears are giant, hairy cousins of goblins who frequent the same areas as their smaller relatives.\nBugbears are large and very muscular, standing 7’ tall. Their hides range from light yellow to yellow brown and their thick coarse hair varies in color from brown to brick red. Though vaguely humanoid in appearance, bugbears seem to contain the blood of some large carnivore. Their eyes recall those of some savage bestial animal, being greenish white with red pupils, while their ears are wedge shaped, rising from the top of their heads. A bugbear’s mouth is full of long sharp fangs.\nBugbears have a nose much like that of a bear with the same fine sense of smell. It is this feature which earned them their name, despite the fact that they are not actually related to bears in any way. Their tough leathery hide and long sharp nails also look something like those of a bear, but are far more dexterous.\nThe typical bugbear’s sight and hearing are exceptional, and they can move with amazing agility when the need arises. Bugbear eyesight extends somewhat into the infrared, giving them infravision out to 60 feet.\nThe bugbear language is a foul sounding mixture of gestures, grunts, and snarls which leads many to underestimate the intelligence of these creatures. In addition, most bugbears can speak the language of goblins and hobgoblins.",
		image: "http://www.lomion.de/cmm/img/bugbear.gif",
	},

	{
		name: "Bulette",
		freq: "Very rare",
		alig: "Neutral",
		desc: "Aptly called a landshark, the bulette (pronounced Boo-lay) is a terrifying predator that lives only to eat. The bulette is universally shunned, even by other monsters.\nIt is rumored that the bulette is a cross between an armadillo and a snapping turtle, but this is only conjecture. The bulette’s head and hind portions are blue-brown, and they are covered with plates and scales ranging from gray-blue to blue-green. Nails and teeth are dull ivory. The area around the eyes is brown-black, the eyes are yellowish and the pupils are blue green.",
		image: "http://www.lomion.de/cmm/img/bulette.gif",
	},

	{
		name: "Bullywug",
		freq: "Rare",
		alig: "Chaotic evil",
		desc: "The bullywugs are a race of bipedal, frog-like amphibians. They inhabit swamps, marshes, meres, or other dank places.\nBullywugs are covered with smooth, mottled olive green hide that is reasonably tough, giving them a natural AC of 6. They can vary in size from smaller than the average human to about seven feet in height. Their faces resemble those of enormous frogs, with wide mouths and large, bulbous eyes; their feet and hands are webbed. Though they wear no clothing, all bullywugs use weapons, armor, and shields if they are available. Bullywugs have their own language and the more intelligent ones can speak a limited form of the common tongue.",
		image: "http://www.lomion.de/cmm/img/bullywug.gif",
	},

	{
		name: "Carrion Crawler",
		freq: "Uncommon",
		alig: "Neutral",
		desc: "The carrion crawler is a scavenger of subterranean areas, feeding primarily upon carrion. When such food becomes scarce, however, it will attack and kill living creatures.\nThe crawler looks like a cross between a giant green cutworm and a cephalopod. Like so many other hybrid monsters, the carrion crawler may well be the result of genetic experimentation by a mad, evil wizard.\nThe monster’s head, which is covered with a tough hide that gives it Armor Class 3, sprouts eight slender, writhing tentacles. The body of the carrion crawler is not well protected and has an armor class of only 7. The monster is accompanied by a rank, fetid odor which often gives warning of its approach.",
		image: "http://www.lomion.de/cmm/img/carrcraw.gif",
	},

	{
		name: "Cat, Great",
		freq: "Uncommon - Rare",
		alig: "Neutral",
		desc: "The great cats are among the most efficient of all predators. ",
		image: "http://www.lomion.de/cmm/img/spc/catgreat.gif",
	},

	{
		name: "Cat, Small",
		freq: "Common - Rare",
		alig: "Neutral",
		desc: "Cats of different sizes and colorations are common throughout the world. Some are pets, while many are wild.",
		image: "http://www.lomion.de/cmm/img/catsmall.gif",
	},

	{
		name: "Catoblepas",
		freq: "Vary rare",
		alig: "Neutral",
		desc: "The catoblepas is a bizarre, loathsome creature that inhabits dismal swamps and marshes. Its most terrifying features are its large bloodshot eyes, from which emanate a deadly ray.\nThe body of the catoblepas is like that of a large, bloated buffalo, and its legs are stumpy, like those of a pygmy elephant or a hippopotamus. Its long, snakey tail is swift and strong, and can move with blinding speed. The head of the catoblepas is perched upon a long, weak neck, and would be much like that of a warthog except that the catoblepas is uglier.",
		image: "http://www.lomion.de/cmm/img/catoblep.gif",
	},

	{
		name: "Cave Fisher",
		freq: "Rare",
		alig: "Neutral",
		desc: "The cave fisher is a large insectoid that has adapted to life below ground. It combines many of the characteristics of a spider and a lobster.\nThe cave fisher has a hard, chitinous shell of overlapping plates and eight legs. The 6 rear legs are used for movement and traction on stony walls and corridors. Because of these limbs, the fisher has no difficulty in moving up and down vertical walls. The front pair of legs are equipped with powerful pincers, which are used for killing and dismembering prey. The most unusual feature of the cave fisher is its long snout, which can fire a strong, adhesive filament. The monster can also use its adhesive to anchor itself in place on walls and ledges.",
		image: "http://www.lomion.de/cmm/img/cavefish.gif",
	},

	{
		name: "Centaur",
		freq: "Rare",
		alig: "Neutral or chaotic good",
		desc: "Centaurs are woodland beings who shun the company of men. They dwell in remote, secluded glades and pastures.\nThe appearance of a centaur is unmistakable: they have the upper torso, arms, and head of a human being and the lower body of a large, powerful horse.\nCentaurs speak their own language and some among them (about 10%) can converse in the tongue of elves.",
		image: "http://www.lomion.de/cmm/img/centaur.gif",
	},

	{
		name: "Centipede",
		freq: "Common - Very rare",
		alig: "Neutral",
		desc: "Giant centipedes are loathsome, crawling arthropods that arouse almost universal disgust from all intelligent creatures (even other monsters). They are endemic to most regions.\nOne of the things that makes the centipede so repulsive is its resemblance to the worm. Its long body is divided into many segments from which protrude many tiny feet. Hence the name “centipede” (or hundred-footed). The giant centipede is so named because it is over 1-foot long. The body is plated with a chitinous shell and it moves with a slight undulating motion. The creature has the added benefit of protective coloration, and varies in color depending on the terrain it inhabits. Those that favor rocky areas are gray, those that live underground are black, while centipedes of the forest are brown or red.",
		image: "http://www.lomion.de/cmm/img/centiped.gif",
	},

	{
		name: "Chimera",
		freq: "Rare",
		alig: "Chaotic Evil",
		desc: "How chimerae were created is a dark mystery better left unexplored. The chimera has the hindquarters of a large, black goat and the forequarters of a huge, tawny lion. Its body has brownish-black wings like those of a dragon.\nThe monster has three heads, those of a goat, a lion, and a fierce dragon. The goat head is pitch black, with glowing amber eyes and long ochre horns. The lion head is framed by a brown mane and has green eyes. The dragon head is covered with orange scales and has black eyes.\nThe chimera speaks a limited form of the foul language of red dragons. As a rule, however, it will only pause to communicate with those creatures who are more powerful than itself. (Also see !mm Gorgimera)",
		image: "http://www.lomion.de/cmm/img/chimera.gif",
	},

	{
		name: "Gorgimera",
		freq: "Very rare",
		alig: "Neutral",
		desc: "The gorgimera has the hindquarters of a gorgon, forequarters of a lion, and body and wings of a red dragon. Like the chimera, it has the heads of its three constituent creatures.\nThe monster can attack with its claws, bite with its lion and dragon heads, and butt with its gorgon head. In place of making its normal attack, the gorgon and dragon heads can employ their breath weapons. While the dragon’s attack is similar to that of the chimera, the gorgon’s breath causes petrification to any caught in its area of effect. The gorgon head can use its breath weapon twice per day to strike in a cone 3 feet long which is 1 foot wide at its base and 3 feet wide at its mouth. The gorgimera will always use one of its breath weapons if its foes are within 10 feet. A save vs. petrification will allow a victim to avoid the effects of the gorgon’s breath.\nThe gorgon’s head can see into both the Astral and Ethereal planes, and its breath weapon extends therein.\nLike its relative the chimera, the gorgimera can also speak a limited form of the language of red dragons.",
		image: "https://i.imgur.com/hnNyGZz.jpg",
	},

	{
		name: "Cloaker",
		freq: "Very rare",
		alig: "Chaotic neutral",
		desc: "Cloakers are fiendish horrors, related to trappers, that dwell in dark places far beneath the surface of the earth. They generally seek to kill those who enter their lairs, unless they can think up some other, more amusing way to punish interlopers.\nWhen a cloaker is first seen, it is almost impossible to distinguish this monster from a common black cloak. The monster’s back has two rows of black eye spots running down it that look much like buttons, and the two ivory-colored claws on its upper edge can easily be mistaken for bone clasps.\nWhen it unfurls itself and moves to attack, however, its true nature becomes all too obvious. At this point, its white underside is clear and the monster’s face is fully visible. This face, with the glow of its two piercing, red eyes and the needle-like fangs that line its mouth, is a truly horrible sight. At this point, the monster also uncurls the whip-like tail at its trailing edge and begins to swish it back and forth in anticipation.",
		image: "http://www.lomion.de/cmm/img/cloaker.gif",
	},

	{
		name: "Cockatrice",
		freq: "Uncommon",
		alig: "Neutral",
		desc: "The cockatrice is an eerie, repulsive hybrid of lizard, cock, and bat. It is infamous for its ability to turn flesh to stone.\nThe cockatrice is about the size of a large goose or turkey, and has the head and body of a cock, with two bat-like wings and the long tail of a lizard tipped with a few feathers. Its feathers are golden brown, its beak yellow, its tail green, and its wings gray. The cockatrice’s wattles, comb, and eyes are bright red.\nFemales, which are much rarer than males, differ only in that they have no wattles or comb. (Also see !mm Pyrolisk)",
		image: "http://www.lomion.de/cmm/img/cockatri.gif",
	},

	{
		name: "Pyrolisk",
		freq: "Rare",
		alig: "Neutral evil",
		desc: "Frequently mistaken for its less malignant relative, the pyrolisk is virtually identical to the cockatrice except for the single red feather in its tail and the reddish cast of its wings. Whereas the cockatrice is motivated by instinct alone, the pyrolisk revels in spreading mayhem. Any victims who fail to save vs. death magic when meeting its gaze will instantly burst into flames, dying in agony. If the save is made, they are still burnt for 2-13 (1d12+1) points of damage. Any creature within 30 feet innately or magically immune to fire will not be affected by its gaze, and anyone who makes their saving throw is thereafter immune to the gaze of that particular pyrolisk.\nThe creature can cause any fire source within 30 yards to explode in fireworks (as a pyrotechnics spell) once per round.\nThe pyrolisk is itself immune to all fire-based spells and attacks.\nThe pyrolisk’s mortal enemy is the phoenix, although any creature which the monster encounters is likely to be attacked.",
		image: "https://78.media.tumblr.com/5f7244f993a63df067b515eea649ea8b/tumblr_oh9gfxP4xB1v9qvuco1_1280.jpg",
	},

	{
		name: "Couatl",
		freq: "Very rare",
		alig: "Lawful good",
		desc: "The couatl are feathered serpents of myth and lore. It is believed that they are distant relatives of dragons, although this remains unproven.\nSo rare as to be considered almost legendary, the couatl is one of the most beautiful creatures in existence. It has the body of a long serpent and feathered wings the color of the rainbow. Since it has the ability to polymorph, the couatl will sometimes appear in the form of other creatures (always of good alignment).\nCouatl are able to communicate via telepathy with almost any intelligent creature which they encounter. In addition, they can speak common and most serpent and avian languages.",
		image: "http://www.lomion.de/cmm/img/couatl.gif",
	},

	{
		name: "Crabman",
		freq: "Rare",
		alig: "Neutral",
		desc: "Crabmen are man-sized intelligent crabs. They walk upright on two pairs of legs. The small pincers tipping the short arms above their legs are used for fine manipulation. The two longer arms end in large claws. Two slender eyestalks bob above the beak-like collection of mandibles which makes up the crabman’s mouth. Male crabmen are often brightly colored and females may be reddish-brown, green, or black.",
		image: "http://www.lomion.de/cmm/img/crabman.gif",
	},

	{
		name: "Crawling Claw",
		freq: "Rare",
		alig: "Neutral",
		desc: "The much feared crawling claw is frequently employed as a guardian by those mages and priests who have learned the secret of its creation.\nNo single description of a crawling claw is possible as they are not uniform in appearance. Since claws are the animated remains of hands or paws of living creatures, they are apt to be found in a wide variety of shapes and sizes.",
		image: "http://www.lomion.de/cmm/img/crawclaw.gif",
	},

	{
		name: "Crocodile",
		freq: "Common",
		alig: "Neutral",
		desc: "The crocodile is a large, dangerous predatory reptile native to tropical and subtropical climes. It spends most of its time submerged in swamps, rivers, or other large bodies of water.\nThe crocodile is one of the most feared and ugliest predators of the tropics. It has a long, squat body, ranging in size from a scant foot to well over ten feet long. Most mature specimens range from eight to 15 feet long, and some even larger. Many sages argue that crocodiles never stop growing. The crocodile has a long jaw filled with sharp, conical teeth. The powerful maw is superbly adapted for dragging prey beneath the water and dismembering it. Its four short legs are very powerful, and can propel the crocodile rapidly through the water and over the land. Its long tail is also very strong and is sometimes used on land to unbalance its foes.\nThe crocodile is covered with a tough horny hide, which blends in very well with the surrounding water. Its eyes and nose are placed so that when the crocodile floats, only they remain above water, enabling the beast to spot and ambush prey. The crocodile is adept at floating through the water and remaining quite still, presenting the illusion that it is nothing more than a floating log.",
		image: "http://www.lomion.de/cmm/img/crocodil.gif",
	},

	{
		name: "Crustacean, Giant",
		freq: "Rare",
		alig: "Neutral",
		desc: "Giant crustaceans are peculiar mutations of crabs and freshwater crayfish. The first inhabits saltwater regions, while the latter is found only in fresh water.",
		image: "http://www.lomion.de/cmm/img/crusgian.gif",
	},

	{
		name: "Crypt Thing",
		freq: "Very rare",
		alig: "Neutral",
		desc: "Crypt things are strange undead creatures that sometimes guard tombs, graves, and corpses. There are two types of crypt things – ancestral and summoned. The former type are “natural” creatures, while the others are called into existence by a wizard or priest of at least 14th level.\nA crypt thing looks like nothing more than an animated skeleton, save that it is always clothed in a flowing robe of brown or black. Each eye socket is lit by a fierce, red pinpoint of light that is almost hypnotic in its intensity.",
		image: "http://www.lomion.de/cmm/img/crypthin.gif",
	},

	{
		name: "Death Knight",
		freq: "Very rare",
		alig: "Chaotic evil",
		desc: "A death knight is the horrifying corruption of a paladin or lawful good warrior cursed by the gods to its terrible form as punishment for betraying the code of honor it held in life.\nA death knight resembles a hulking knight, typically taller than 6 feet and weighing more than 300 pounds. Its face is a blackened skull covered with shards of shriveled, rotting flesh. It has two tiny, glowing orange-red pinpoints for eyes. Its armor is scorched black as if it had been in a fire. The demeanor of a death knight is so terrifying that even kender have been known to become frightened.\nA death knight’s deep, chilling voice seems to echo from the depths of a bottomless cavern. A death knight converses in the language it spoke in its former life, as well as up to six additional languages.",
		image: "http://www.lomion.de/cmm/img/deatknig.gif",
	},

	{
		name: "Deepspawn",
		freq: "Very rare",
		alig: "Chaotic evil",
		desc: "Deepspawn are infamous horrors who give birth to many other varieties of monsters; a single Deepspawn can make a vast area dangerous, even for alert, well-armed adventurers.\nDeepspawn look like large, rubbery spheres of mottled grey and brown. Six arms project from their bodies; three are tentacle-arms, and three are jaw-arms, ending in mouths of many teeth. A Deepspawn also has over 40 long, retractable, flexible eye stalks it extends only three or four at a time, well away from harm.",
		image: "http://www.lomion.de/cmm/img/deepspaw.gif",
	},

	{
		name: "Dinosaur",
		freq: "Uncommon - Rare",
		alig: "Neutral",
		desc: "Dinosaurs are found on alternate planes of existence, or even on lost continents. The frequency figures given are for areas where dinosaurs are normally found; in all other places, they are very rare at best. Dinosaurs, or “terrible lizards”, are reptiles descended from ancestral reptiles called thecodonts. The two types of dinosaurs are saurischians (“lizard-hipped”) and ornithischians (“bird-hipped”), named for terms describing their pelvic structures. Within the saurischia are the carnivorous therapods, represented here by tyrannosaurus, and the herbivorous sauropods, represented here by diplodocus. Saurischians also include ornithomimosaurs and the related dromaeosaurs, represented here by deinonychus.\nDinosaurs come in many sizes and shapes. Those presented here are generally large. Bigger species have drab colors, while smaller dinosaurs have a wide variety of markings. Most dinosaurs have a skin which is pebbly in texture; some closely related species of reptile have fur, and some may have feathers.",
		image: "http://www.lomion.de/cmm/img/spc/dinosau1.gif",
	},

	{
		name: "Displacer Beast",
		freq: "Very rare",
		alig: "Lawful evil",
		desc: "The displacer beast is a magical creature that resembles a puma with two powerful black tentacles growing from its shoulders. Very rare, they stay far from human habitations.\nThe displacer beast has the blue-black coloring of a dark panther,and a long cat-like body and head. Females range in length from 8 to 9 feet, and weigh 450 pounds; males are 10 to 12 feet long, and weigh up to 500 Lbs. They have 6 legs. Tentacles are tipped with rough horny edges that can inflict terrible wounds. Their eyes glow bright green, even after death.",
		image: "http://www.lomion.de/cmm/img/dispbeas.gif",
	},

	{
		name: "Dog",
		freq: "Common - Very rare",
		alig: "Various",
		desc: "Smaller than wolves, the appearance of the wild dog varies from place to place. Most appear very wolf-like, while others seem to combine the looks of a wolf and a jackal.",
		image: "http://www.lomion.de/cmm/img/dog.gif",
	},

	{
		name: "Dog, Moon",
		freq: "Rare",
		alig: "Neutral good",
		desc: "Often mistaken for baneful monsters, moon dogs are native creatures of Elysium and champions of the causes of good. They often appear in the Prime Material plane to fight evil wherever it shows itself.\nMoon dogs look very similar to large wolf hounds. Their strange heads are slightly human in appearance, giving the animals a very intelligent look. The creatures’ forepaws are adaptable, giving the moon dogs the ability to travel bipedally or on all fours. They are dark colored animals, ranging from dark gray to deep black. Moon dogs have amber eyes.\nMoon dogs speak their own language, and they can communicate with all canines and lupines as well. They can speak common using a limited form of telepathy.",
		image: "http://www.lomion.de/cmm/img/dogmoon.gif",
	},

	{
		name: "Dolphin",
		freq: "Uncommon",
		alig: "Lawful good",
		desc: "Dolphins are intelligent seagoing mammals.\nWhile all dolphins share a variety of common traits, the species comes in a variety of shapes and sizes. Their long, compact bodies are superbly adapted to the aquatic environment, and dolphins are among the most powerful swimmers in the oceans. All breeds of dolphins have a large fin on their backs, two flippers, a powerful tail, jaws filled with many sharp teeth, a blow hole, and are 5 to 6 feet long. Most common and well-known are the gray, or bottle-nosed dolphins, so named for their gray skin and bottle-shaped snouts. Other varieties have two-toned blue and gray coloring. The species communicates through an intricate speech consisting of high-pitched sounds, some out of the range of human hearing.",
		image: "http://www.lomion.de/cmm/img/dolphin.gif",
	},

	{
		name: "Doppelganger",
		freq: "Very rare",
		alig: "Neutral",
		desc: "The doppelganger is a master of mimicry that survives by taking the shapes of men, demihumans, and humanoids.\nDoppelgangers are bipedal and generally humanoid in appearance. Their bodies are covered with a thick, hairless gray hide, which gives them a natural AC of 5. They are, however, rarely seen in their true forms.",
		image: "http://www.lomion.de/cmm/img/doppelga.gif",
	},

	{
		name: "Dracolich",
		freq: "Very rare",
		alig: "Lawful evil, neutral evil, or chaotic evil (as per former dragon type; nonevil dragons become evil on transformation)",
		desc: "The dracolich is an undead creature resulting from the unnatural transformation of a dragon. The mysterious Cult of the Dragon practices the powerful magic necessary for the creation of the dracolich, though other practitioners are also rumored to exist.\nA dracolich can be created from any of the evil or neutral dragon subspecies. An evil or neutral dracolich retains the physical appearance of its original body, except that its eyes appear as glowing points of light floating in shadowy eye sockets. Skeletal or semiskeletal dracoliches have been observed on occasion.\nThe senses of a dracolich are similar to those of its original form, and it can detect invisible objects or creatures (including those hidden in darkness or fog) within a 10-foot radius per age category and also possess a natural clairaudience ability while in its lair equal to a range of 20 feet per age category. A dracolich can speak, cast spells, and employ the breath weapon of its original form. It can cast each of its spells once per day and can use its breath weapon once every three combat rounds. A dracolich retains the memories and intelligence of its original form.",
		image: "http://www.lomion.de/cmm/img/dracolic.gif",
	},

	{
		name: "Dragon, General",
		freq: "N/A",
		alig: "N/A",
		desc: "Dragons are an ancient, winged reptilian race. They are known and feared for their size, physical prowess, and magical abilities. The oldest dragons are among the most powerful creatures in the world. (This is general information on dragons, if you are looking for a specific dragon, type the !mm command for it)",
		image: "http://www.lomion.de/cmm/img/dragon.gif",
	},

	{
		name: "Dragon",
		freq: "N/A",
		alig: "N/A",
		desc: "Dragons are an ancient, winged reptilian race. They are known and feared for their size, physical prowess, and magical abilities. The oldest dragons are among the most powerful creatures in the world. (This is general information on dragons, if you are looking for a specific dragon, type the !mm command for it)",
		image: "http://www.lomion.de/cmm/img/dragon.gif",
	},

	{
		name: "Dragon, Chromatic Black Dragon",
		freq: "Rare",
		alig: "Chaotic evil",
		desc: "Black dragons are abusive, quick to anger, and resent intrusions of any kind. They like dismal surroundings, heavy vegetation, and prefer darkness to daylight. Although not as intelligent as other dragons, black dragons are instinctively cunning and malevolent.\nAt birth, a black dragon’s scales are thin, small, and glossy. But as the dragon ages, its scales become larger, thicker, and duller, which helps it camouflage itself in swamps and marshes. Black dragons speak their own tongue, a tongue common to all evil dragons, and 10% of hatchling black dragons have an ability to communicate with any intelligent creature. The chance to possess this ability increases 5% per age category of the dragon.",
		image: "http://www.lomion.de/cmm/img/dragcbla.gif",
	},

	{
		name: "Dragon, Chromatic Blue Dragon",
		freq: "Very rare",
		alig: "Lawful evil",
		desc: "Blue dragons are extremely territorial and voracious. They love to spend long hours preparing ambushes for herd animals and unwary travelers, and they spend equally long hours dwelling on their success and admiring their trophies.\nThe size of a blue dragon’s scales increases little as the dragon ages, although they do become thicker and harder. The scales vary in color from an iridescent azure to a deep indigo, retaining a glossy finish through all of the dragon’s stages because the blowing desert sands polish them. This makes blue dragons easy to spot in barren desert surroundings. However, the dragons often conceal themselves, burrowing into the sand so only part of their heads are exposed.\nBlue dragons love to soar in the hot desert air; usually flying in the daytime when temperatures are the highest. Some blue dragons nearly match the color of the desert sky and use this coloration to their advantage in combat.\nBlue dragons speak their own tongue, a tongue common to all evil dragons, and 12% of hatchling blue dragons have an ability to communicate with any intelligent creature. The chance to possess this ability increases 5% per age category of the dragon.",
		image: "http://www.lomion.de/cmm/img/dragcblu.gif",
	},

	{
		name: "Dragon, Chromatic Green Dragon",
		freq: "Very rare",
		alig: "Lawful evil",
		desc: "Green dragons are bad tempered, mean, cruel, and rude. They hate goodness and good-aligned creatures. They love intrigue and seek to enslave other woodland creatures, killing those who cannot be controlled or intimidated.\nA hatchling green dragon’s scales are thin, very small, and a deep shade of green that appears nearly black. As the dragon ages, the scales grow larger and become lighter, turning shades of forest, emerald, and olive green, which helps it blend in with its wooded surroundings. A green dragon’s scales never become as thick as other dragons’, remaining smooth and flexible.\nGreen dragons speak their own tongue, a tongue common to all evil dragons, and 12% of hatchling green dragons have an ability to communicate with any intelligent creature. The chance to possess this ability increases 5% per age category of the dragon.",
		image: "http://www.lomion.de/cmm/img/dragcgre.gif",
	},

	{
		name: "Dragon, Chromatic Red Dragon",
		freq: "Very rare",
		alig: "Chaotic evil",
		desc: "Red dragons are the most covetous and greedy of all dragons, forever seeking to increase their treasure hoards. They are obsessed with their wealth and memorize an inventory accurate to the last copper. They are exceptionally vain and self confident, considering themselves superior not only to other dragons, but to all other life in general.\nWhen red dragons hatch, their small scales are a bright glossy scarlet. Because of this, they can be quickly spotted by predators and men hunting for skins, so they are hidden in deep underground lairs and not permitted to venture outside until toward the end of their young stage when their scales become turned a deeper red, the glossy texture has been replaced by a smooth, dull finish, and they are more able to take care of themselves. As the dragon continues to age, the scales become large thick, and as strong as metal.\nRed dragons speak their own tongue, a tongue common to all evil dragons, and 16% of hatchling red dragons have an ability to communicate with any intelligent creature. The chance to possess this ability increases 5% per age category of the dragon.",
		image: "http://www.lomion.de/cmm/img/dragcred.gif",
	},

	{
		name: "Dragon, Chromatic White Dragon",
		freq: "Rare",
		alig: "Chaotic evil",
		desc: "White dragons, the smallest and weakest of the evil dragons, are slow witted but efficient hunters. They are impulsive, vicious, and animalistic, tending to consider only the needs and emotions of the moment and having no foresight or regret. Despite their low intelligence, they are as greedy and evil as the other evil dragons.\nThe scales of a hatchling white dragon are a mirror-like glistening ground. As the dragons ages, the sheen disappears, and by the time it reaches the very old stage, scales of pale blue and light gray are mixed in with the white.\nWhite dragons speak their own tongue, a tongue common to all evil dragons, and 7% of hatchling white dragons have an ability to communicate with any intelligent creature. The chance to possess this ability increases 5% per age category of the dragon.",
		image: "http://www.lomion.de/cmm/img/dragcwhi.gif",
	},

	{
		name: "Dragon, Gem Amethyst Dragon",
		freq: "Very rare",
		alig: "Neutral",
		desc: "Amethyst dragons are wise and regal, with a detached air, and ignore what they consider to be petty squabbles between good and evil, law and chaos. When hatched, amethyst dragons have lavender skin with small scales of a light, translucent purple. As they grow older, the scales gradually darken. Adults are a sparkling lavender in color.\nAmethyst dragons speak their own tongue and the tongue common to all gem dragons, and 18% of hatchling amethyst dragons have an ability to communicate with any intelligent creature. The chance to possess this ability increases 5% per age category of the dragon.",
		image: "http://www.lomion.de/cmm/img/drageame.gif",
	},

	{
		name: "Dragon, Gem Crystal Dragon",
		freq: "Very rare",
		alig: "Choatic neutral",
		desc: "Crystal dragons are the friendliest of the gem dragons, always curious about the world. Though they seldom seek out company, they willingly converse with visitors who do not try to steal from them.\nAt birth, crystal dragons have glossy white scales. As the dragons age, their scales become translucent. Moonlight and starlight causes their scales to luminesce, while bright sunlight lends them a dazzling brilliance which makes crystal dragons almost unbearable to look at.\nCrystal dragons speak their own tongue and the tongue common to all gem dragons, and 10% of hatchling crystal dragons have an ability to communicate with any intelligent creature. The chance to possess this ability increases 5% per age category of the dragon.",
		image: "http://www.lomion.de/cmm/img/dragecry.gif",
	},

	{
		name: "Dragon, Gem Emerald Dragon",
		freq: "Very rare",
		alig: "Lawful neutral",
		desc: "Emerald dragons are very curious, particularly about local history and customs, but prefer to only observe. They are the most paranoid of the gem dragons, and do not like people get too close to their treasure.\nEmerald dragons have translucent green scales at birth. As they age, the scales harden and take on many shades of green. They scintillate in light, and the dragon’s hide seems to be in constant motion.\nEmerald dragons speak their own tongue and the tongue common to all gem dragons, and 14% of hatchling emerald dragons have an ability to communicate with any intelligent creature. The chance to possess this ability increases 5% per age category of the dragon.",
		image: "http://www.lomion.de/cmm/img/drageeme.gif",
	},

	{
		name: "Dragon, Gem Sapphire Dragon",
		freq: "Very rare",
		alig: "Lawful neutral",
		desc: "While not actively hostile, sapphire dragons are militantly territorial and initially distrustful of anyone who approaches.\nThese beautiful dragons range from light to dark blue, and sparkle in the light, even at birth. Sapphire dragons are often mistaken for blue dragons, unless someone recalls the latter’s preferred arid environment.\nSapphire dragons speak their own tongue and the tongue common to all gem dragons, and 16% of hatchling sapphire dragons have an ability to communicate with any intelligent creature. The chance to possess this ability increases 5% per age category of the dragon.",
		image: "http://www.lomion.de/cmm/img/dragesap.gif",
	},

	{
		name: "Dragon, Gem Topaz Dragon",
		freq: "Very rare",
		alig: "Choatic neutral",
		desc: "Topaz dragons are unfriendly and selfish. Though not malevolent, they are seldom pleasant to deal with because of their erratic behavior. Topaz dragons neither seek company nor welcome it.\nAt hatching, topaz dragons are a dull yellow-orange in color. As they age and their scales harden, the scales become translucent and faceted. Adult topaz dragons sparkle in full sunlight.\nTopaz dragons speak their own tongue and the tongue common to all gem dragons, and 12% of hatchling topaz dragons have an ability to communicate with any intelligent creature. The chance to possess this ability increases 5% per age category of the dragon.",
		image: "http://www.lomion.de/cmm/img/dragetop.gif",
	},

	{
		name: "Dragon, Metallic Brass Dragon",
		freq: "Rare",
		alig: "Chaotic good",
		desc: "Brass dragons are great talkers, but not particularly good conversationalists. They are egotistical and often boorish. They oftern have useful information, but will divulge it only after drifting off the subject many times and after hints that a gift would be appreciated.\nAt birth, a brass dragon’s scales are dull. Their color is a brassy, mottled brown. As the dragon gets older, the scales become more brassy, until they reach a warm burnished appearance.",
		image: "http://www.lomion.de/cmm/img/dragmbra.gif",
	},

	{
		name: "Dragon, Metallic Bronze Dragon",
		freq: "Very rare",
		alig: "Lawful good",
		desc: "Bronze dragons are inquisitive and fond of humans and demi-humans. They enjoy polymorphing into small, friendly animals so they can unobtrusively observe humans and demi-humans, especially adventurers. Bronze dragons thrive on simple challenges such as riddles and harmless contests. They are fascinated by warfare and will eagerly join an army if the cause is just and the pay is good.\nAt birth, a bronze dragon’s scales are yellow tinged with green, showing only a hint of bronze. As the dragon approached adulthood, its color deepens slowly changing to a rich bronze tone that gets darker as the dragon ages. Dragons from the very old stage on develop a blue-black tint to the edges of their scales, similar to a patina on ancient bronze armor or statues.\nBronze dragons speak their own tongue, a tongue common to all good dragons, and 16% of hatchling bronze dragons have an ability to communicate with any intelligent creature. The chance to possess this ability increases 5% per age category of the dragon.",
		image: "http://www.lomion.de/cmm/img/dragmbro.gif",
	},

	{
		name: "Dragon, Metallic Copper Dragon",
		freq: "Rare",
		alig: "Chaotic good",
		desc: "Copper dragons are incorrigible pranksters, joke tellers, and riddlers. They are prideful and are not good losers, although they are reasonable good winner. They are particularly selfish, and greedy for their alignment, and have an almost neutral outlook where wealth is concerned.\nAt birth, a copper dragon’s scales have a ruddy brown color with a copper tint. As the dragon gets older, the scales become finer and more coppery, assuming a soft, warm gloss by the time the dragon becomes a young adult. Beginning at the venerable stage, the dragons’ scales pick up a green tint.\nCopper dragons speak their own tongue, a tongue common to all good dragons, and 14% of hatchling copper dragons have an ability to communicate with any intelligent creature. The chance to possess this ability increases 5% per age category of the dragon.",
		image: "http://www.lomion.de/cmm/img/dragmcop.gif",
	},

	{
		name: "Dragon, Metallic Gold Dragon",
		freq: "Very rare",
		alig: "Lawful good",
		desc: "Gold dragons are wise, judicious, and benevolent. They often embark on self-appointed quests to promote goodness, and are not easily distracted from them. They hate injustice and foul play. A gold dragon frequently assumes human or animal guise and usually will be encountered disguised.\nAt birth, a gold dragon’s scales are dark yellow with golden metallic flecks. The flecks get larger as the dragon matures until, at the adult stage, the scales grow completely golden.\nGold dragons speak their own tongue, a tongue common to all good dragons, and 18% of hatchling gold dragons have an ability to communicate with any intelligent creature. The chance to possess this ability increases 5% per age category of the dragon.",
		image: "http://www.lomion.de/cmm/img/dragmgol.gif",
	},

	{
		name: "Dragon, Metallic Silver Dragon",
		freq: "Very rare",
		alig: "Lawful good",
		desc: "Silver dragons are kind and helpful. They will cheerfully assist good creatures if their need is genuine. They often take the forms of kindly old men or fair damsels when associating with people.\nAt birth, a silver dragon’s scales are blue-gray with silver highlights. As the dragon approaches adulthood, its color slowly lightens to brightly gleaming silver. An adult or older silver dragon has scales so fine that the individual scales are scarcely visible. From a distance, these dragons look as if they have been sculpted from pure metal.\nSilver dragons speak their own tongue, a tongue common to all good dragons, and 16% of hatchling silver dragons have an ability to communicate with any intelligent creature. The chance to possess this ability increases 5% per age category of the dragon.",
		image: "http://www.lomion.de/cmm/img/dragmsil.gif",
	},

	{
		name: "Brown Dragon",
		freq: "Very rare",
		alig: "Neutral (evil)",
		desc: "Brown dragons, also known as great desert dragons, migrated from the desert Raurin and now frequent much of the wastes in Eastern Mulhorand. Brown dragons are ferocious beasts; while they are intelligent, they view human beings as food, and believe it peculiar to talk with one’s meal. They do not have wings and cannot fly.\nBrown dragons have a coloration similar to that of desert sands, ranging from dim brown at hatchling stage to almost white at great wyrm stage. They have small, webbed claws that well developed for digging, and very large, long mouths. Their scales are leathery and not as hard as other dragon armors.\nBrown dragons speak their own tongue and the language of blue dragons. They have a 5% chance per age category of being able to communicate with any intelligent creature.",
		image: "http://www.lomion.de/cmm/img/dragbrow.gif",
	},

	{
		name: "Cloud Dragon",
		freq: "Very rare",
		alig: "Neutral",
		desc: "Cloud dragons are reclusive creatures that dislike intrusions. They rarely converse, but if persuaded to do so they tend to be taciturn and aloof. They have no respect whatsoever for creatures that cannot fly without assistance from spells or devices.\nAt birth, cloud dragons have silver-white scales tinged with red at the edges. As they grow, the red spreads and lightens to sunset orange. At the mature adult stage and above, the red-orange color deepens to red gold and almost entirely replaces the silver.\nCloud dragons speak their own tongue and a tongue common to all neutral dragons. Also 17% of hatchling cloud dragons can speak with any intelligent creature. The chance to possess this ability increases 5% per age category.",
		image: "http://www.lomion.de/cmm/img/dragclou.gif",
	},

	{
		name: "Deep Dragon",
		freq: "Rare",
		alig: "Chaotic evil",
		desc: "Deep dragons are little known on the surface world. They are the hunters of the Underdark. Cunning and patient, they place their survival, followed by their joy of hunting, above all else. Deep dragons carefully amass and hide treasure in various caches, guarded with traps and magic. They are able to use most magical items.\nDeep dragons are an iridescent maroon when they hatch, soft-scaled, and unable to change form. They keep to their birth-lair until they have mastered both of their other forms – a giant winged worm or snake and a human (or drow) form.",
		image: "http://www.lomion.de/cmm/img/dragdeep.gif",
	},

	{
		name: "Mercury Dragon",
		freq: "Very rare",
		alig: "Chaotic good",
		desc: "Mercury dragons are fast, highly-maneuverable creatures with relatively small bodies and long tails. Although good in alignment, they are very whimsical, making and changing decisions frequently.\nAt birth, a mercury dragon’s scales are dull silver. As it ages, the scales become brighter and brighter, until at adult age they gain a brilliant mirror finish. Sunlight or other sources of light reflecting off the scales and wings of a mercury dragon can be blinding.\nMercuries speak the language of good dragons, but at high speed, so there’s only a 75% chance of understanding a mercury dragon.",
		image: "http://www.lomion.de/cmm/img/dragmerc.gif",
	},

	{
		name: "Mist Dragon",
		freq: "Very rare",
		alig: "Neutral",
		desc: "Mist dragons are solitary and philosophical. Their favorite activity is sitting quietly and thinking. They hate being disturbed and dislike conversation.\nAt birth, a mist dragon’s scales are shiny blue-white. As the dragon ages, the scales darken, becoming blue-gray with metallic silver flecks that sparkle in sunlight.\nMist dragons speak their own tongue and a tongue common to all neutral dragons. Also, 15% of hatchling mist dragons can speak with any intelligent creature. The chance to possess this ability increases 5% per age category.",
		image: "http://www.lomion.de/cmm/img/dragmist.gif",
	},

	{
		name: "Shadow Dragon",
		freq: "Very rare",
		alig: "Chaotic evil",
		desc: "Shadow dragons are sly and devious. They are instinctively cunning and are not prone to taking risks.\nAt all ages, a shadow dragon’s scales and body are translucent, so that when viewed from a distance it appears to be a mass of shadows.\nShadow dragons speak their own tongue and a tongue common to all evil dragons. Also, 17% of hatchling shadow dragons can speak with any intelligent creature. The chance to possess this ability increases 5% per age category.",
		image: "http://www.lomion.de/cmm/img/dragshad.gif",
	},

	{
		name: "Steel Dragon",
		freq: "Very rare",
		alig: "Lawful neutral (good)",
		desc: "Steel dragons love to have human and demihuman companions, and they prefer to live amid the hustle and bustle of great cities. They often pose as sages, scholars, mages, or other intellectuals.\nAt birth, a steel dragon’s scales are deep blue-gray with steely highlights. As the dragon approaches adulthood, its color slowly lightens to that of lustrous burnished steel. When these dragons take on human form, they always have one steel-gray feature – hair, eyes, nails, or sometimes a ring or other ornament.\nSteel dragons speak their own tongue and a tongue common to all neutral dragons. Also, 19% of hatchling steel dragons can speak with any intelligent creature. This chance increases by 5% per age category.",
		image: "http://www.lomion.de/cmm/img/dragstee.gif",
	},

	{
		name: "Yellow Dragon",
		freq: "Very rare",
		alig: "Chaotic evil",
		desc: "Although the existence of yellow dragons has long been predicted by sages (based on theories of primary colors), the first specimen was spotted only five or so years ago. The creatures are solitary and secretive, preferring to lay in wait for prey to stumble into carefully-prepared traps instead of hunting actively.\nAt birth, yellows have soft, tan scales. As they grow older, the scales harden and become lighter in color, eventually reaching the grayish yellow of desert sands. Their scales always have a dusty texture to them, giving them a finish that does not reflect light well. Even their teeth and claws have a similar finish. No part of the yellow dragon will glint in the sunlight, thereby giving away its position.\nYellow dragons speak their own tongue, which is quite different than that spoken by other evil dragons. Yellows have no interest in speaking with other races, and so they learn no other languages.",
		image: "http://www.lomion.de/cmm/img/dragyell.gif",
	},

	{
		name: "Dragon Turtle",
		freq: "Very rare",
		alig: "Neutral",
		desc: "Dragon turtles are one of the most beautiful, awesome, and feared creatures of the water. With their deadly jaws and breath weapon, and their penchant for capsizing ships, dragon turtles are dreaded by mariners on large bodies of water, both fresh and salt.\nWhen a dragon turtle surfaces, it is sometimes mistaken for the reflection of the sun or moon on the water. The turtle’s rough, deep green shell is much the same color as the deep water the monster favors, and the silver highlights that line the shell are patterned like light dancing on open water. The turtle’s legs and tail are of a lighter green, and they are flecked with golden highlights. The coloration of the creature’s head is similar to the legs and tail, but its crest spines are golden with dark green webbing connecting them. A dragon turtle’s shell can reach to 30 feet in diameter, and an adult turtle can measure over 40 feet from its snout to the tip of its tail. Dragon turtles speak their own highly-developed language.",
		image: "http://www.lomion.de/cmm/img/drgturtl.gif",
	},

	{
		name: "Dragonet, Faerie Dragon",
		freq: "Very rare",
		alig: "Chaotic good",
		desc: "A chaotic offshoot of the pseudodragon, the faerie dragon lives in peaceful, tangled forests and thrives on pranks, mischief, and practical jokes.\nFaerie dragons resemble miniature dragons with thin bodies, long, prehensile tails, gossamer butterfly wings, and huge smiles. Their colors range through the spectrum, changing as they age, from the red of a hatchling to the black of a great wyrm (see chart). The hides of females have a golden tinge that sparkles in the sunlight; males have a silver tinge.\nAll faerie dragons can communicate telepathically with one another at a distance of up to 2 miles. They speak their own language, along with the language of sprites, pixies, elves, and the birds and animals in their area.",
		image: "http://www.lomion.de/cmm/img/drnefadr.gif",
	},

	{
		name: "Dragonet, Firedrake",
		freq: "Rare",
		alig: "Neutral",
		desc: "Although frequently mistaken on first sighting for a young red dragon, the firedrake is neither as intelligent nor as powerful as its dragon cousin. It responds with flame to any stimulus.\nThis small dragonet – 4’ long, and a bit over 2’ in height – has the features and proportions of a miniature red dragon, but its scaly hide is thinner and more translucent than that of even the youngest of true dragons. The hide of the dragonet twitches and quivers almost imperceptibly, and is somewhat mottled in color, with mauve and burgundy splotches over the red undercolor. The wings beat slowly, even when the dragonet is on the ground. In this manner the firedrake provides air flow to itself, and wards off pesky insects. A shimmer of heat rises off of the dragonet at all times.",
		image: "http://www.lomion.de/cmm/img/drnefidr.gif",
	},

	{
		name: "Dragonet, Pseudodragon",
		freq: "Veyr rare",
		alig: "Neutral (good)",
		desc: "Pseudodragons are a species of small flying lizard that inhabits heavily forested wilderness areas. These playful, benign creatures have magical powers that they can share with others, so they are often sought as companions.\nPseudodragons resemble miniature red dragons. They have fine scales and sharp horns and teeth. A pseudodragon’s coloration is red-brown as opposed to the deep red of red dragons. Its tail is about 2 feet long (longer than the pseudodragon itself), barbed, and very flexible.\nPseudodragons communicate via a limited form of telepathy. If one elects to take a human companion, it can transmit what it sees and hears at a distance of up to 240 yards. Pseudodragons can vocalize animal noises such as a rasping purr (pleasure), a hiss (unpleasant surprise), a chirp (desire), or a growl (anger).",
		image: "http://www.lomion.de/cmm/img/drnepsdr.gif",
	},

	{
		name: "Dragonne",
		freq: "Very rare",
		alig: "Neutral",
		desc: "Possessing some of the most dangerous qualities of a lion and a brass dragon, the dragonne is a vicious and deadly hunter, and a threat to many who travel in warmer climates.\nFrom a distance, a dragonne looks much like a giant lion, with the one very notable exception of the pair of small, brass-colored wings that stretch from the creature’s shoulders. Upon closer inspection, other differences between the dragonne and its feline ancestor become apparent, too. The dragonne is covered with thick, brass-colored scales, much like a brass dragon, and its mane is much thicker and made of far coarser hair than a lion’s. The beast also possesses huge claws and fangs, and large eyes, usually brass-colored like its scales. Dragonnes do not have their own language. Instead, they speak the languages of brass dragons and sphinxes.",
		image: "http://www.lomion.de/cmm/img/drgonne.gif",
	},

	{
		name: "Dryad",
		freq: "Very rare",
		alig: "Neutral",
		desc: "Dryads are beautiful, intelligent tree sprites. They are as elusive as they are alluring, however, and dryads are rarely seen unless taken by surprise – or they wish to be spotted. The dryad’s exquisite features, delicate and finely chiseled, are much like an elf maiden’s. Dryads have high cheek bones and amber, violet, or dark green eyes. A dryad’s complexion and hair color changes with the seasons, presenting the sprite with natural camouflage. During the fall, a dryad’s hair turns golden or red, and her skin subtly darkens from its usual light tan to more closely match her hair color. This enables her to blend with the falling leaves of autumn. In winter, both the dryad’s hair and skin are white, like the snows that cover the oak groves. When encountered in a forest during fall or winter, a dryad is often mistaken for an attractive maid, probably of elvish descent. No one would mistake a dryad for an elf maid during the spring and summer, however. At these times of year, a dryad’s skin is lightly tanned and her hair is green like the oak leaves around her. Dryads often appear clothed in a loose, simple garment. The clothing they wear is the color of the oak grove in the season they appear. They speak their own tongue, as well as the languages of elves, pixies, and sprites. Dryads can also speak with plants.",
		image: "http://www.lomion.de/cmm/img/dryad.gif",
	},

	{
		name: "Dwarf",
		freq: "Common",
		alig: "Lawful good",
		desc: "Dwarves are a noble race of demihumans who dwell under the earth, forging great cities and waging massive wars against the forces of chaos and evil. Dwarves also have much in common with the rocks and gems they love to work, for they are both hard and unyielding. It’s often been said that it’s easier to make a stone weep than it is to change a dwarf’s mind. Standing from four to 4½ feet in height, and weighing 130 to 170 pounds, dwarves tend to be stocky and muscular. They have ruddy cheeks and bright eyes. Their skin is typically deep tan or light brown. Their hair is usually black, gray, or brown, and worn long, though not long enough to impair vision in any way. They favor long beards and mustaches, too. Dwarves value their beards highly and tend to groom them very carefully. Dwarves do not favor ornate stylings or wrappings for their hair or their beards. Dwarven clothing tends to be simple and functional. They often wear earth tones, and their cloth is considered rough by many other races, especially men and elves. Dwarves usually wear one or more pieces of jewelry, though these items are usually not of any great value or very ostentatious. Though dwarves value gems and precious metals, they consider it in bad taste to flaunt wealth. Because dwarves are a sturdy race, they add 1 to their initial Constitution ability scores. However, because they are a solitary people, tending toward distrust of outsiders and other races, they subtract 1 from their initial Charisma ability scores. Dwarves usually live from 350 to 450 years. Dwarves have found it useful to learn the languages of many of their allies and enemies. In addition to their own languages, dwarves often speak the languages of gnomes, goblins, kobolds, orcs, and the common tongue, which is frequently used in trade negotiations with other races.",
		image: "http://www.lomion.de/cmm/img/dwarf.gif",
	},

	{
		name: "",
		freq: "",
		alig: "",
		desc: "",
		image: "",
	},

	{
		name: "",
		freq: "",
		alig: "",
		desc: "",
		image: "",
	},

	{
		name: "",
		freq: "",
		alig: "",
		desc: "",
		image: "",
	},

	{
		name: "",
		freq: "",
		alig: "",
		desc: "",
		image: "",
	},

	/*
	{
		name: "",
		freq: "",
		alig: "",
		desc: "",
		image: "",
	},
*/

];
