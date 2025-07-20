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
		decimalDigits(RNG,2) >= min
		&& decimalDigits(RNG,2) < max
	) {
		data.rarity.name = name;
		data.rarity.gradient = gradient;
		if (!data.inventory.has(name)) {
			data.inventory.set(name,1);
		} else {
			data.inventory.set(name,data.inventory.get(name)+1);
		}
	}
	data.cooldown = uptime+15;
}
function makeFinalRarity(name="Common",chance="1.01",gradient=["#888"]) {
	if (
		decimalDigits(RNG,2) >= chance
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
	data.luck += RNG**(1/5)-1;
	RNG = (1/Math.random())**(Math.log10(data.luck)+10);
	makeRarity("Common","1.01","2.50",["#888"]);
	makeRarity("Uncommon","2.50","5.00",["#8cc28e"]);
	makeRarity("Surreal","5.00","10.00",["#69c9ab"]);
	makeRarity("Rare","10.00","25.00",["#4bd3db"]);
	makeRarity("Tactical","25.00","50.00",["#3b80e1"]);
	makeRarity("Epic","50.00","100.00",["#7626eb"]);
	data.RNG = decimalDigits(RNG,2);
	if (data.RNG > data.highestRNG) {
		data.highestRNG = data.RNG;
		data.highestRarity = data.rarity;
	}
	document.getElementById("rng").innerText = commaFormat(data.RNG) + " ~ " + commaFormat(data.highestRNG) + " RNG";
	document.getElementById("rarity").innerText = "";
	document.getElementById("rarity").innerText += "<span style=\"background: ";
	document.getElementById("rarity").innerText += makeGradient(data.rarity.gradient);
	document.getElementById("rarity").innerText += "; background-clip: text; -webkit-background-clip: text; color: transparent; text-shadow: 2px 2px 1.5px #ffffff30;\">" + data.rarity.name + "</span> ~ ";
	document.getElementById("rarity").innerText += "<span style=\"background: ";
	document.getElementById("rarity").innerText += makeGradient(data.highestRarity.gradient);
	document.getElementById("rarity").innerText += "; background-clip: text; -webkit-background-clip: text; color: transparent; text-shadow: 2px 2px 1.5px #ffffff30;\">" + data.highestRarity.name + "</span>";
	document.getElementById("rarity").innerHTML = document.getElementById("rarity").innerText;
	document.getElementById("luck").innerHTML = "You have <div style=\"font-size: 32px;\">" + decimalDigits(data.luck,4) + "</div> luck.";
}
!function update(){
	/* Updates */
	uptime = performance.now()/1000;
	if (uptime < data.cooldown) {
		document.getElementById("roll").disabled = true;
		document.getElementById("roll").value = data.cooldown-uptime;
	} else {
		document.getElementById("roll").disabled = false;
		document.getElementById("roll").value = "Roll!";
	}
	requestAnimationFrame(update)
}()
