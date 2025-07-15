let data = {
	RNG: "1.01",
	highestRNG: "1.01",
	rarity: {
		name: "Common",
		mutations: [],
	},
	highestRarity: {
		name: "Common",
		mutations: [],
	},
	luck: 1,
	cooldown: 0,
};
let uptime = 0;
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
!function update(){
	/* Updates */
	uptime = performance.now()/1000;
	requestAnimationFrame(update)
}()
