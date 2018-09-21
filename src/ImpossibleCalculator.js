import {findLineIntersection} from "./intersector";


export function triangle(x) {
    if (x <= 0) {
        return -x;
    } else {
        return x;
    }
}

export function line(x) {
    return 1;
}

export function wave(x) {
    return Math.sin(2 * x);
}

export function halfCircle(x) {
    return Math.sqrt(1 - (x * x));
}

export function inverse(fn) {
    return (x) => -fn(x);
}

export function shift(fn, s) {
    return (x) => fn(x) + s;
}


export function findPoints(view1, view2, func1, func2, numPoints) {
    const intersections = [];

    for (let i = 0; i <= numPoints; i++) {
        const xVal = i * (2 / numPoints) - 1;

        const func1x = func1(xVal);
        const func2x = func2(xVal);

        const intersection2d = findLineIntersection({x: -view1.z, y: view1.y}, {x: 0, y: func1x}, {x: -view2.z, y: view2.y}, {x: 0, y: func2x});
        intersections.push({x: xVal, y: intersection2d.y, z: -intersection2d.x});
    }

    return intersections;

}