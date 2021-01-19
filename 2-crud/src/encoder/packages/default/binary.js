micro encoder/packages/default/binary.js
function main(args) {
	let text = args.text || ""
	let res =  text.split("").map(
		function (x) {
		 return x.charCodeAt(0).toString(2)
		}
	)
}
