

export function findLineIntersection(v1, v2, v3, v4) {

    const result = {
        x: null,
        y: null,
        // onLine1: false,
        // onLine2: false
    };

    const denominator = ((v4.y - v3.y) * (v2.x - v1.x)) - ((v4.x - v3.x) * (v2.y - v1.y));
    if (denominator === 0) {
        return false; // parallel
    }

    const numerator1 = ((v4.x - v3.x) * (v1.y - v3.y)) - ((v4.y - v3.y) * (v1.x - v3.x));
    // const numerator2 = ((v2.x - v1.x) * v1.y - v3.y) - ((v2.y - v1.y) * v1.x - v3.x);

    const a = numerator1 / denominator;
    // const b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = v1.x + (a * (v2.x - v1.x));
    result.y = v1.y + (a * (v2.y - v1.y));

    // // if line1 is a segment and line2 is infinite, they intersect if:
    // if (a > 0 && a < 1) {
    //     result.onLine1 = true;
    // }
    // // if line2 is a segment and line1 is infinite, they intersect if:
    // if (b > 0 && b < 1) {
    //     result.onLine2 = true;
    // }
    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;
}