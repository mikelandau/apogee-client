export function degreesToRadians(degrees: number): number {
    return (degrees / 180.0) * Math.PI;
}

export function radiansToDegrees(radians: number): number {
    return (radians / Math.PI) * 180.0
}

export function rotateVector(a: [number, number], theta: number): [number, number] {
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);

    return [a[0] * cosTheta - a[1] * sinTheta, a[0] * sinTheta + a[1] * cosTheta];
}

export function addVectors(a: [number, number], b: [number, number]): [number, number] {
    return [a[0] + b[0], a[1] + b[1]];
}

export function multiplyVector(a: [number, number], k: number) {
    return [a[0] * k, a[1] * k];
}

export function getVectorComponents(magnitude: number, angleDegrees: number): [number, number] {
    return [magnitude * Math.cos(angleDegrees),
        magnitude * Math.sin(angleDegrees)];
}

export function getMagnitudeAndAngle(origin: [number, number], destination: [number, number]) {
    const deltaX = destination[0] - origin[0];
    const deltaY = destination[1] - origin[1];

    let angle = 0;

    if (deltaX === 0 && deltaY === 0) {
        angle = 0;
    } else if (deltaX === 0) {
        angle = deltaY >= 0 ? 90 : 270;
    } else if (deltaX < 0) {
        angle = (Math.atan(deltaY/deltaX) + Math.PI) % (2 * Math.PI);
    } else {
        angle = (Math.atan(deltaY/deltaX) + 2 * Math.PI) % (2 * Math.PI);
    }

    const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    return [magnitude, angle];
}
