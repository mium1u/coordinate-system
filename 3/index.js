function generateCartesianPoints(numPoints) {
	const points = []
	for (let i = 0; i < numPoints; i++) {
		const x = Math.random() * 100 
		const y = Math.random() * 100
		const z = Math.random() * 100
		points.push({ x, y, z })
	}
	return points
}

function generatePolarPoints(numPoints) {
	const points = []
	for (let i = 0; i < numPoints; i++) {
		const r = Math.random() * 100 
		const theta = Math.random() * 2 * Math.PI 
		points.push({ r, theta })
	}
	return points
}

function generateSphericalPoints(numPoints) {
	const points = []
	for (let i = 0; i < numPoints; i++) {
		const r = Math.random() * 100 
		const theta = Math.random() * 2 * Math.PI 
		const phi = Math.random() * Math.PI 
		points.push({ r, theta, phi })
	}
	return points
}

function distanceCartesian3D(x1, y1, z1, x2, y2, z2) {
	return Math.sqrt(
		Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
	)
}

function distancePolar2D(r1, theta1, r2, theta2) {
	return Math.sqrt(
		Math.pow(r1, 2) + Math.pow(r2, 2) - 2 * r1 * r2 * Math.cos(theta2 - theta1)
	)
}

function sphericalToCartesian(r, theta, phi) {
	const x = r * Math.sin(phi) * Math.cos(theta)
	const y = r * Math.sin(phi) * Math.sin(theta)
	const z = r * Math.cos(phi)
	return { x, y, z }
}

function distanceSphericalVolume(r1, theta1, phi1, r2, theta2, phi2) {
	return Math.sqrt(
		Math.pow(r1, 2) +
			Math.pow(r2, 2) -
			2 *
				r1 *
				r2 *
				(Math.sin(phi1) * Math.sin(phi2) * Math.cos(theta1 - theta2) +
					Math.cos(phi1) * Math.cos(phi2))
	)
}

function runBenchmarks() {
	const numPoints = 50000 

	const cartesianPoints = generateCartesianPoints(numPoints)
	const polarPoints = generatePolarPoints(numPoints)
	const sphericalPoints = generateSphericalPoints(numPoints)

	const cartesianStartTime = performance.now()
	for (let i = 0; i < numPoints; i += 2) {
		const d = distanceCartesian3D(
			cartesianPoints[i].x,
			cartesianPoints[i].y,
			cartesianPoints[i].z,
			cartesianPoints[i + 1].x,
			cartesianPoints[i + 1].y,
			cartesianPoints[i + 1].z
		)
	}
	const cartesianEndTime = performance.now()
	const cartesianDuration = cartesianEndTime - cartesianStartTime

	const polarStartTime = performance.now()
	for (let i = 0; i < numPoints; i += 2) {
		const d = distancePolar2D(
			polarPoints[i].r,
			polarPoints[i].theta,
			polarPoints[i + 1].r,
			polarPoints[i + 1].theta
		)
	}
	const polarEndTime = performance.now()
	const polarDuration = polarEndTime - polarStartTime

	const sphericalStartTime = performance.now()
	for (let i = 0; i < numPoints; i += 2) {
		const {
			x: x1,
			y: y1,
			z: z1,
		} = sphericalToCartesian(
			sphericalPoints[i].r,
			sphericalPoints[i].theta,
			sphericalPoints[i].phi
		)
		const {
			x: x2,
			y: y2,
			z: z2,
		} = sphericalToCartesian(
			sphericalPoints[i + 1].r,
			sphericalPoints[i + 1].theta,
			sphericalPoints[i + 1].phi
		)
		const d = distanceCartesian3D(x1, y1, z1, x2, y2, z2)
	}
	const sphericalEndTime = performance.now()
	const sphericalDuration = sphericalEndTime - sphericalStartTime

	const outputDiv = document.getElementById('output')
	outputDiv.innerHTML = `
        <p>Result</p>
        <p>time (
cartesian system): ${cartesianDuration.toFixed(
					2
				)} ms</p>
        <p>time (2D): ${polarDuration.toFixed(
					2
				)} ms</p>
        <p>time (3D): ${sphericalDuration.toFixed(
					2
				)} ms</p>
    `
}

document
	.getElementById('runBenchmarks')
	.addEventListener('click', runBenchmarks)
