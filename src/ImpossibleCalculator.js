import {findLineIntersection} from "./intersector";


export function triangle(x) {
    if (x <= 0) {
        return x + 1;
    } else {
        return -x + 1;
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

export function halfStar(x) {
    if (x < 0 ) {
        x = -x;
    }
    if (x < .42) {
        return 0.6666666 * x + 0.5;
    } else if (x < 0.625) {
        return -2 * x + 1.5;
    } else {
        return -0.666666 * x + 0.666666;
    }
}
export function halfStar2(x) {
    if (x < 0 ) {
        x = -x;
    }
    if (x < .375) {
        return 0.6666666 * x + 0.5;
    } else if (x < 0.625) {
        return -2 * x + 1.5;
    } else {
        return -0.666666 * x + 0.666666;
    }
}

export function halfStarOld(x) {
    if (x >= 0 && x < 0.25) {
        return x + 0.75;
    } else if (x >= 0 && x < 0.5) {
        return -3 * x + 1.75;
    } else if (x >= 0) {
        return -0.5 * x + 0.5;
    } else {
        return halfStarOld(-x);
    }
}

export function M(x) {
    if (x < 0) {
        x = -x;
    }
    if (x < 0.5) {
        return x;
    } else {
        return -x + 1;
    }
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

        const intersection2d = findLineIntersection({x: -view1.z, y: view1.y}, {x: func1x, y: 0}, {x: -view2.z, y: view2.y}, {x: func2x, y: 0});
        intersections.push({x: xVal, y: intersection2d.y, z: -intersection2d.x});
    }

    return intersections;

}