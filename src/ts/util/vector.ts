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

export function getVectorComponents(magnitude: number, angleDegrees: number): [number, number] {
    return [magnitude * Math.cos(angleDegrees),
        magnitude * Math.sin(angleDegrees)];
}
