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
let uptime = 0, RNG = 1.01;
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
		someGradient += (data.rarity.gradient[data.rarity.gradient.length - 1] != i) ? (i + ", ") : i;
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
}
function roll() {
	data.luck += RNG**(1/5)-1;
	makeRarity("Common","1.01","2.50",["#888"]);
	document.getElementById("rng").innerHTML = data.RNG + " ~ " + data.highestRNG;
	document.getElementById("rarity").innerHTML += "";
	document.getElementById("rarity").innerHTML += "<span style=\"background: ";
	document.getElementById("rarity").innerHTML += makeGradient(data.rarity.gradient);
	document.getElementByid("rarity").innerHTML += "; background-clip: text; -webkit-background-clip: text; color: transparent; text-shadow: 2px 2px 1.5px #ffffff30;\">" + data.rarity.name + "</span> ~ ";
}
!function update(){
	/* Updates */
	uptime = performance.now()/1000;
	requestAnimationFrame(update)
}()
