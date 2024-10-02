function sphericalToCartesian(r, theta, phi) {
	const x = r * Math.sin(phi) * Math.cos(theta)
	const y = r * Math.sin(phi) * Math.sin(theta)
	const z = r * Math.cos(phi)
	return { x, y, z }
}


function cartesianToSpherical(x, y, z) {
	const r = Math.sqrt(x * x + y * y + z * z)
	const theta = Math.atan2(y, x)
	const phi = Math.acos(z / r)
	return { r, theta, phi }
}

function appendToOutput(text) {
	const outputDiv = document.getElementById('output')
	const paragraph = document.createElement('p')
	paragraph.textContent = text
	outputDiv.appendChild(paragraph)
}

function handleFormSubmit(event) {
	event.preventDefault() 

	const pointsCount = parseInt(document.getElementById('pointsCount').value, 10)
	const sphericalPoints = []
	const cartesianPoints = []

	for (let i = 0; i < pointsCount; i++) {
		const r = Math.random() * 10 
		const theta = Math.random() * 2 * Math.PI 
		const phi = Math.random() * Math.PI 
		sphericalPoints.push({ r, theta, phi })

		const cartesian = sphericalToCartesian(r, theta, phi)
		cartesianPoints.push(cartesian)
	}

	document.getElementById('output').innerHTML = ''

	appendToOutput('Spherical coordinates to Cartesian')
	sphericalPoints.forEach((point, index) => {
		const cartesian = cartesianPoints[index]
		appendToOutput(
			`Dot ${index + 1}: r = ${point.r.toFixed(
				2
			)}, theta = ${point.theta.toFixed(2)}, phi = ${point.phi.toFixed(2)}` +
				` -> x = ${cartesian.x.toFixed(2)}, y = ${cartesian.y.toFixed(
					2
				)}, z = ${cartesian.z.toFixed(2)}`
		)
	})

	const sphericalConvertedPoints = cartesianPoints.map(point =>
		cartesianToSpherical(point.x, point.y, point.z)
	)

	appendToOutput(
		'\n Cartesian coordinates to spherical:'
	)
	sphericalConvertedPoints.forEach((point, index) => {
		appendToOutput(
			`Dot ${index + 1}: r = ${point.r.toFixed(
				2
			)}, theta = ${point.theta.toFixed(2)}, phi = ${point.phi.toFixed(2)}`
		)
	})

	appendToOutput('\n Validation:')
	sphericalPoints.forEach((original, index) => {
		const converted = sphericalConvertedPoints[index]
		const rMatches = Math.abs(original.r - converted.r) < 0.01
		const thetaMatches = Math.abs(original.theta - converted.theta) < 0.01
		const phiMatches = Math.abs(original.phi - converted.phi) < 0.01
		appendToOutput(
			`Dot ${
				index + 1
			}: Radius? ${rMatches}, Azimuth? ${thetaMatches},Polar angle? ${phiMatches}`
		)
	})
}

document
	.getElementById('coordinatesForm')
	.addEventListener('submit', handleFormSubmit)
