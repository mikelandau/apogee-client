import { dotProduct, subtractVectors } from "./vector";

function createDebugText(s: [number, number], e: [number, number], d: [number, number], f: [number, number], a: number, b: number, c: number, discriminant: number, t1: number, t2: number, result: boolean){
//     return `

// d: ${d[0]} ${d[1]}
// f: ${f[0]} ${f[1]}
// a: ${a}
// b: ${b}
// c: ${c}
// Δ: ${discriminant}
// t1: ${t1}
// t2: ${t2}
// `

    return `
s: ${s[0]} ${s[1]}
e: ${e[0]} ${e[1]}
t1: ${t1}
t2: ${t2}
result: ${result}
`
}

export function segmentIntersectsCirlce(vectorStart: [number, number], vectorEnd: [number, number], circleOrigin: [number, number], radius: number): [ boolean, string ] {
    const d = subtractVectors(vectorEnd, vectorStart);
    const f = subtractVectors(vectorEnd, circleOrigin);
    const a = dotProduct(d, d);
    const b = 2 * dotProduct(f, d);
    const c = dotProduct(f, f) - radius * radius;
    const discriminant = b * b - 4 * a * c;
    
    if (discriminant < 0) {
        return [false, createDebugText(vectorStart, vectorEnd, d,f,a,b,c,discriminant, NaN, NaN, false)];
    }

    const sqrtDiscriminant = Math.sqrt(discriminant);
    const t1 = (-b - sqrtDiscriminant)/(2*a);
    const t2 = (-b + sqrtDiscriminant)/(2*a);
    
    const result = Math.abs(t1) >= 0 && Math.abs(t1) <= 1 || Math.abs(t2) >= 0 && Math.abs(t2) <= 1;
    return [result, createDebugText(vectorStart, vectorEnd,d,f,a,b,c,discriminant,t1,t2, result)];
}
