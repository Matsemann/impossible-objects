import {findLineIntersection} from "./intersector";

const VIEW1 = {x: 0, y: 100, z: 100};
const VIEW2 = {x: 0, y: 100, z: -100};
const RESOLUTION = 100;

export function calculateIntersections(pairs) {

    return pairs.map(pair => {
        const lower = pair.lo === undefined ? -1 : pair.lo;
        const upper = pair.hi === undefined ? 1 : pair.hi;

        const numPoints = (upper - lower) * RESOLUTION;

        return findPoints(VIEW1, VIEW2, lower, upper, pair.func1, pair.func2, numPoints);
    });

}


export function findPoints(view1, view2, lower, upper, func1, func2, numPoints) {
    const intersections = [];

    for (let i = 0; i <= numPoints; i++) {
        const xVal = i * ((upper - lower) / numPoints) + lower;

        const func1x = func1(xVal);
        const func2x = func2(xVal);

        const intersection2d = findLineIntersection({x: -view1.z, y: view1.y}, {x: func1x, y: 0}, {x: -view2.z, y: view2.y}, {x: func2x, y: 0});
        intersections.push({x: xVal, y: intersection2d.y, z: -intersection2d.x});
    }

    return intersections;

}


export function debugFigureFunctions(pairs) {
    return pairs.flatMap(pair => {
        const lower = pair.lo === undefined ? -1 : pair.lo;
        const upper = pair.hi === undefined ? 1 : pair.hi;

        return [
            debugFunction(pair.func1, 100, lower, upper),
            debugFunction(pair.func2, 100, lower, upper),
        ]
    });
}

export function debugFunction(fn, numPoints, lower, upper) {
    const points = [];
    const start = new Date();

    for (let i = 0; i <= numPoints; i++) {
        const xVal = i * ((upper - lower) / numPoints) + lower;

        const fnX = fn(xVal);

        points.push({x: xVal, y: 0, z: fnX});
    }

    console.log("debug points took", new Date() - start);
    return points;
}