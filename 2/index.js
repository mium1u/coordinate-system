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

function distanceSphericalSurface(r, phi1, phi2, theta1, theta2) {
	return (
		r *
		Math.acos(
			Math.sin(phi1) * Math.sin(phi2) +
				Math.cos(phi1) * Math.cos(phi2) * Math.cos(theta1 - theta2)
		)
	)
}

function handleFormSubmit(event) {
	event.preventDefault() 

	const point1 = document.getElementById('point1').value.split(',').map(Number)
	const point2 = document.getElementById('point2').value.split(',').map(Number)

	const [r1, theta1, phi1] = point1
	const [r2, theta2, phi2] = point2

	const { x: x1, y: y1, z: z1 } = sphericalToCartesian(r1, theta1, phi1)
	const { x: x2, y: y2, z: z2 } = sphericalToCartesian(r2, theta2, phi2)

	const cartesianDistance = distanceCartesian3D(x1, y1, z1, x2, y2, z2)
	const polarDistance = distancePolar2D(r1, theta1, r2, theta2)
	const sphericalVolumeDistance = distanceSphericalVolume(
		r1,
		theta1,
		phi1,
		r2,
		theta2,
		phi2
	)
	const sphericalSurfaceDistance = distanceSphericalSurface(
		r1,
		phi1,
		phi2,
		theta1,
		theta2
	)

	const outputDiv = document.getElementById('output')
	outputDiv.innerHTML = `
        <p> Distance in 3D c.system: ${cartesianDistance.toFixed(
					2
				)}</p>
        <p> Distance in 2D c.system: ${polarDistance.toFixed(
					2
				)}</p>
        <p> Distance in 3D c.system: (volume): ${sphericalVolumeDistance.toFixed(
					2
				)}</p>
        <p> Distance in 2D c.system: (surface): ${sphericalSurfaceDistance.toFixed(
					2
				)}</p>
    `
}

document
	.getElementById('distanceForm')
	.addEventListener('submit', handleFormSubmit)
