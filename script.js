let data = {
	RNG: "1.01",
	highestRNG: "1.01",
	rarity: {
		name: "Common",
		gradient: ["#888"],
		mutations: [],
	},
	highestRarity: {
		name: "Common",
		gradient: ["#888"],
		mutations: [],
	},
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
let uptime = 0, RNG = 1.01, mutationMultis = 1;
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
function makeGradient(gradient) {
	let someGradient = "linear-gradient(90deg, ";
	for (let i of gradient) {
		someGradient += (gradient[gradient.length - 1] != i) ? (i + ", ") : i;
	}
	someGradient += ")";
	return someGradient
}
function makeRarity(name="Common",min="1.01",max="1.01",gradient=["#888"]) {
	if (
		Number(decimalDigits(RNG,2)) >= Number(min)
		&& Number(decimalDigits(RNG,2)) < Number(max)
	) {
		data.rarity.name = name;
		data.rarity.gradient = gradient;
		if (!data.inventory.has(name)) {
			data.inventory.set(name,1);
		} else {
			data.inventory.set(name,data.inventory.get(name)+1);
		}
	}
}
function makeFinalRarity(name="Common",chance="1.01",gradient=["#888"]) {
	if (
		Number(decimalDigits(RNG,2)) >= Number(chance)
	) {
		data.rarity.name = name;
		data.rarity.gradient = gradient;
		if (!data.inventory.has(name)) {
			data.inventory.set(name,1);
		} else {
			data.inventory.set(name,data.inventory.get(name)+1);
		}
	}
}
function roll() {
	RNG = (1/Math.random())**(Math.log10(data.luck)+1);
	makeRarity("Common","1.01","2.50",["#888"]);
	makeRarity("Uncommon","2.50","5.00",["#8cc28e"]);
	makeRarity("Surreal","5.00","10.00",["#69c9ab"]);
	makeRarity("Rare","10.00","25.00",["#4bd3db"]);
	makeRarity("Tactical","25.00","50.00",["#3b80e1"]);
	makeRarity("Epic","50.00","100.00",["#7626eb"]);
	makeRarity("Legendary","100.00","250.00",["#f0ee36","#c5c31f"]);
	makeRarity("Exotic","250.00","500.00",["#f0be35","#d16634"]);
	makeRarity("Preeminent","500.00","1000.00",["#f06a35","#d14e34"]);
	makeRarity("Mythical","1000.00","2500.00",["#f08935","#bd2a53"]);
	data.luck += RNG**(1/5)-1;
	data.RNG = decimalDigits(RNG,2);
	data.cooldown = uptime+15;
	if (Number(data.RNG) > Number(data.highestRNG)) {
		data.highestRNG = data.RNG;
		data.highestRarity.name = data.rarity.name;
		data.highestRarity.gradient = data.rarity.gradient;
		data.highestRarity.mutations = data.rarity.mutations;
	}
	document.getElementById("rng").innerText = commaFormat(data.RNG) + " ~ " + commaFormat(data.highestRNG) + " RNG";
	document.getElementById("rarity").innerText = "<span style=\"background: "
		+ makeGradient(data.rarity.gradient) 
		+ "; background-clip: text; -webkit-background-clip: text; color: transparent; text-shadow: 2px 2px 1.5px #ffffff30;\">" + data.rarity.name + "</span> ~ "
		+ "<span style=\"background: "
		+ makeGradient(data.highestRarity.gradient)
		+ "; background-clip: text; -webkit-background-clip: text; color: transparent; text-shadow: 2px 2px 1.5px #ffffff30;\">" + data.highestRarity.name + "</span>";
	document.getElementById("rarity").innerHTML = document.getElementById("rarity").innerText;
	document.getElementById("luck").innerHTML = "You have <span style=\"font-size: 32px;\">" + decimalDigits(data.luck,4) + "</span> luck.";
}
document.querySelector("input.rngbutton").addEventListener("click",roll);
function update(){
	/* Updates */
	uptime = performance.now()/1000;
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
