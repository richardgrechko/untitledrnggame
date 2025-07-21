// re
let data = {
	RNG: "1.01",
	rawRNG: "1.01",
	highestRNG: "1.01",
	highestRawRNG: "1.01",
	rarity: {
		name: "Common",
		gradient: [["#888"],1],
		mutations: [],
	},
	highestRarity: {
		name: "Common",
		gradient: [["#888"],1],
		mutations: [],
	},
	secret: false,
	inventory: new Map(),
	luck: 1,
	cooldown: 0,
}, youRolled = {
	rarity: {
		name: "Common",
		gradient: ["#888"],
	},
	chance: "1.01",
}
let uptime = 0, RNG = 1.01, rawRNG = 1.01, mutationMultis = 1, mutationChances = {};
function decimalDigits(number, digits) {
	let idfk = Math.floor(Math.log10(Math.abs(number)))
	return (
		(
			(number >= (0.5 / (10 ** digits))) ?
			(number - (0.5 / (10 ** digits))) :
			(number >= 0) ?
			number :
			(number + (0.5 / (10 ** digits)))
		)+ (1e-15*10**(
		(idfk < (13-digits)) ?
		idfk :
		13-digits
	))).toFixed(digits)
}
function commaFormat(num) {
	let portions = num.split(".")
	portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
	if (portions.length == 1)
		return portions[0]
	return portions[0] + "." + portions[1]
}
function makeGradient(gradient,speed=1) {
	let someGradient = "linear-gradient(" + (uptime*90*speed) + "deg, ";
	for (let i of gradient) {
		someGradient += i + ", ";
	}
	someGradient += ")";
	return someGradient.replace(", )",")");
}
function makeRarity(options) {
	options = {
		min: options.min ?? "1.01",
		max: options.max ?? "1.01",
		secrets: options.secrets ?? ["1.00"],
		name: options.name ?? "Common",
		gradient: {
			colors: options.gradient.colors ?? ["#888"],
			speed: options.gradient.speed ?? 1,
		}
	}
	console.log(Number(decimalDigits(RNG,2)) >= Number(options.min),Number(decimalDigits(RNG,2)) < Number(options.max),options.secrets.includes(decimalDigits(RNG,2)))
	if (
		Number(decimalDigits(RNG,2)) >= Number(options.min)
		&& Number(decimalDigits(RNG,2)) < Number(options.max)
		&& !options.secrets.includes(decimalDigits(RNG,2))
	) {
		data.rarity.name = options.name;
		data.rarity.gradient = [options.gradient.colors,options.gradient.speed];
		if (!data.inventory.has(options.name)) {
			data.inventory.set(options.name,1);
		} else {
			data.inventory.set(options.name,data.inventory.get(options.name)+1);
		}
	}
}
function makeChanceSecret(options) {
	options = {
		chance: options.chance ?? "1.01",
		name: options.name ?? "Common",
		gradient: {
			colors: options.gradient.colors ?? ["#888"],
			speed: options.gradient.speed ?? 1,
		}
	}
	if (
		Number(decimalDigits(RNG,2)) == Number(options.chance)
	) {
		rawRNG = Number(options.chance*100);
		data.rawRNG = decimalDigits(rawRNG,2);
		data.rarity.name = options.name;
		data.rarity.gradient = [options.gradient.colors,options.gradient.speed];
		if (!data.inventory.has(options.name)) {
			data.inventory.set(options.name,1);
		} else {
			data.inventory.set(options.name,data.inventory.get(options.name)+1);
		}
	}
}
function makeFinalRarity(options) {
	options = {
		chance: options.chance ?? "1.01",
		name: options.name ?? "Common",
		gradient: {
			colors: options.gradient.colors ?? ["#888"],
			speed: options.gradient.speed ?? 1,
		}
	}
	if (
		Number(decimalDigits(RNG,2)) >= Number(options.chance)
	) {
		data.rarity.name = options.name;
		data.rarity.gradient = [options.gradient.colors,options.gradient.speed];
		if (!data.inventory.has(options.name)) {
			data.inventory.set(options.name,1);
		} else {
			data.inventory.set(options.name,data.inventory.get(options.name)+1);
		}
	}
}
function makeMutation(options) {
	options = {
		name: options.name ?? "Default",
		chance: options.chance ?? "50.00",
		multi: options.multi ?? "5.00",
		gradient: options.gradient ?? ["#ccc"],
	}
	mutationChances[options.name] = (1/Math.random())**(Math.log10(data.luck)+1);
	if (
		Number(decimalDigits(mutationChances[options.name],2)) >= Number(options.chance)
	) {
		data.rarity.mutations.push({
			name: options.name,
			gradient: options.gradient,
		});
		mutationMultis *= options.multi;
	}
}
function roll() {
	data.rarity.mutations = [];
	RNG = (1/Math.random())**(Math.log10(data.luck)+1);
	rawRNG = RNG;
	mutationMultis = 1;
	makeChanceSecret({name:"¿Cursed?",chance:"1.00",gradient:{colors:["#200","#500","#200"],speed:5}});
	makeRarity({name:"Common",min:"1.01",max:"2.50",gradient:{colors:["#888"]}});
	makeRarity({name:"Uncommon",min:"2.50",max:"5.00",gradient:{colors:["#8cc28e"]}});
	makeRarity({name:"Surreal",min:"5.00",max:"10.00",gradient:{colors:["#69c9ab"]}});
	makeRarity({name:"Rare",min:"10.00",max:"25.00",gradient:{colors:["#4bd3db"]}});
	makeRarity({name:"Tactical",min:"25.00",max:"50.00",gradient:{colors:["#3b80e1"]}});
	makeRarity({name:"Epic",min:"50.00",max:"100.00",gradient:{colors:["#7626eb"]}});
	makeRarity({name:"Legendary",min:"100.00",max:"250.00",gradient:{colors:["#f0ee36","#c5c31f"]}});
	makeRarity({name:"Exotic",min:"250.00",max:"500.00",gradient:{colors:["#f0be35","#d16634"]}});
	makeRarity({name:"Preeminent",min:"500.00",max:"1000.00",gradient:{colors:["#f06a35","#d14e34"]}});
	makeRarity({name:"Mythical",min:"1000.00",max:"2500.00",gradient:{colors:["#f03535","#bd2a53"]}});
	makeRarity({name:"Divine",min:"2500.00",max:"5000.00",gradient:{colors:["#a225a8","#d979de","#a225a8"]}});
	makeRarity({name:"Sacred",min:"5000.00",max:"10000.00",gradient:{colors:["#25a8a8","#dedd7a","#25a8a8"]}});
	makeRarity({name:"Reminiscent",min:"10000.00",max:"25000.00",gradient:{colors:["#cd7d2b","#e0de32","#dedd7a","#e0de32","#cd7d2b"]}});
	makeMutation({name:"Upgraded",chance:"50.00",multi:"5.00",gradient:["#b2e8eb","#76e0e5"]});
	makeMutation({name:"Advanced",chance:"500.00",multi:"35.00",gradient:["#5eabe6","#5397cb"]});
	RNG *= mutationMultis;
	rawRNG *= mutationMultis;
	data.luck += (RNG**(1/3)-1)/100;
	data.RNG = decimalDigits(RNG,2);
	data.rawRNG = decimalDigits(rawRNG,2);
	data.cooldown = uptime+15;
	if (Number(data.rawRNG) > Number(data.highestRawRNG)) {
		data.highestRNG = data.RNG;
		data.highestRawRNG = data.rawRNG;
		data.highestRarity.name = data.rarity.name;
		data.highestRarity.gradient = data.rarity.gradient;
		data.highestRarity.mutations = data.rarity.mutations;
	}
}
document.querySelector("input.rngbutton").addEventListener("click",roll);
function update(){
	/* Updates */
	uptime = performance.now()/1000;
	document.getElementById("rng").innerText = commaFormat(data.RNG) + ((data.rawRNG != data.RNG) ? (" [" + data.rawRNG + "]") : "") + " ~ " + commaFormat(data.highestRNG) + ((data.highestRawRNG != data.highestRNG) ? (" [" + data.highestRawRNG + "]") : "") + " RNG";
	document.getElementById("rarity").innerText = "";
	for (var mut of data.rarity.mutations) {
		document.getElementById("rarity").innerText += "<span style=\"background: "
		+ makeGradient(mut.gradient)
		+ "; background-clip: text; -webkit-background-clip: text; color: transparent; text-shadow: 2px 2px 1.5px #ffffff30;\">" + mut.name + " </span>";
	}
	document.getElementById("rarity").innerText += "<span style=\"background: "
		+ makeGradient(...data.rarity.gradient) 
		+ "; background-clip: text; -webkit-background-clip: text; color: transparent; text-shadow: 2px 2px 1.5px #ffffff30;\">" + data.rarity.name + "</span> ~ ";
	for (var mut of data.highestRarity.mutations) {
		document.getElementById("rarity").innerText += "<span style=\"background: "
		+ makeGradient(mut.gradient)
		+ "; background-clip: text; -webkit-background-clip: text; color: transparent; text-shadow: 2px 2px 1.5px #ffffff30;\">" + mut.name + " </span>";
	}
	document.getElementById("rarity").innerText += "<span style=\"background: "
		+ makeGradient(...data.highestRarity.gradient)
		+ "; background-clip: text; -webkit-background-clip: text; color: transparent; text-shadow: 2px 2px 1.5px #ffffff30;\">" + data.highestRarity.name + "</span>";
	document.getElementById("rarity").innerHTML = document.getElementById("rarity").innerText.replace(" ~"," ~ ");
	document.getElementById("luck").innerHTML = "You have <span style=\"font-size: 32px;\">" + decimalDigits(data.luck,4) + "</span> luck.";
	document.querySelector("input.rngbutton").disabled = document.querySelector("input.rngbutton").disabled || false;
	if (uptime < data.cooldown) {
		document.querySelector("input.rngbutton").disabled = true;
		document.querySelector("input.rngbutton").value = decimalDigits(data.cooldown-uptime,3);
	} else {
		document.querySelector("input.rngbutton").disabled = false;
		document.querySelector("input.rngbutton").value = "Roll!";
	}
	setTimeout(update,0)
}
update()
