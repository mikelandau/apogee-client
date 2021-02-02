import { dotProduct, subtractVectors } from "./vector";

export function segmentIntersectsCirlce(vectorStart: [number, number], vectorEnd: [number, number], circleOrigin: [number, number], radius: number): boolean {
    const d = subtractVectors(vectorEnd, vectorStart);
    const f = subtractVectors(vectorEnd, circleOrigin);
    const a = dotProduct(d, d);
    const b = 2 * dotProduct(f, d);
    const c = dotProduct(f, f) - radius * radius;
    const discriminant = b * b - 4 * a * c;
    
    if (discriminant < 0) {
        return false
    }

    const sqrtDiscriminant = Math.sqrt(discriminant);
    const t1 = (-b - sqrtDiscriminant)/(2*a);
    const t2 = (-b + sqrtDiscriminant)/(2*a);
    
    return t1 <= 0 && t1 >= -1 || t2 <= 0 && t2 >= -1 || t2 >= 0 && t1 <= -1;;
}
