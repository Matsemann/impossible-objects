import {findLineIntersection} from "./intersector";


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