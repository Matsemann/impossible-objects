const ns = "http://www.w3.org/2000/svg";

const STEP_SIZE = 0.05;
const X_DELTA = 0.001;

/*
Can read a SVG bezier curve and return y value for given x value
Assumes
    svgWidth: 100
    svgHeight: 50

    maps to
    x = [-1, 1]
    y = [0, 1]

For consecutive x values it won't have to search too far to find the correct place on the path

 */
export function svgFunc(svgPathString, backwards) {
    const svgElem = document.createElementNS(ns, "svg");
    const path = document.createElementNS(ns, "path");

    path.setAttributeNS(null, "fill", "#FFFFFF");
    path.setAttributeNS(null, "stroke", "#FF0000");
    path.setAttributeNS(null, "d", svgPathString);
    svgElem.appendChild(path);



    let prevLength = backwards ? path.getTotalLength() : 0;

    return (x) => {
        // x from -1 to 1 => 0 to 100
        const scaledX = (x + 1) * 50;

        while(true) {
            const point = path.getPointAtLength(prevLength);
            if ((!backwards && point.x >= scaledX) || (backwards && point.x <= scaledX)) {
                return point.y / 50; // back to 0 to 1
            }
            prevLength += backwards ? -STEP_SIZE : STEP_SIZE;
        }
        
    };
}


export function svgFuncBinary(svgPathString) {
    const svgElem = document.createElementNS(ns, "svg");
    const path = document.createElementNS(ns, "path");

    path.setAttributeNS(null, "fill", "#FFFFFF");
    path.setAttributeNS(null, "stroke", "#FF0000");
    path.setAttributeNS(null, "d", svgPathString);
    svgElem.appendChild(path);


    return (x) => {
        // x from -1 to 1 => 0 to 100
        const scaledX = (x + 1) * 50;

        let lower = 0;
        let upper = path.getTotalLength();

        let iterations = 0;

        while (true) {
            let lengthToCheck = (upper - lower) / 2 + lower;
            let point = path.getPointAtLength(lengthToCheck);
            if (Math.abs(point.x - scaledX) <= X_DELTA) {
                return point.y / 50; // back to 0 to 1
            } else if (point.x > scaledX) {
                upper = lengthToCheck;
            } else {
                lower = lengthToCheck;
            }
            if (iterations++ > 100) {
                console.log("gave up for point " + x + " (scaled " + scaledX + ")");
                return point.y / 50;
            }
        }
    };
}

export const svgTriangle = "M0,0c0,0,49.6,49.6,50,50s50-50,50-50";
export const svgHalfCirclePerfect = "M0,0c0,27.6,22.4,50,50,50s50-22.4,50-50";
export const svgHalfCircle = "M0,0c1.9,67.3,98.9,65.9,100,0";

export const svgPointyArrow = "M0,0c3.4,3.9,12.4,12.6,12.4,12.6l43.1,0.1L62.7,25L100,0";
export const svgSoftArrow = "M0,0c3.4,3.9,8.3,11,12.4,12.6c10,4,33.4-4.7,43.1,0.1c3.2,1.6,3.8,11.2,7.2,12.3C73.4,28.4,100,0,100,0";
export const svgEvenSofterArrow = "M0,0c1.8,5.4,3.8,14,7.9,15.7c10,4,38-7.8,47.6-3c3.2,1.6,2.9,11.5,6.4,10.9C72.1,21.7,100,0,100,0";

export const svgHeartTop = "M0,0c0,0,0.6,14.5,10.8,22c4.3,3,15.2,8.7,27,6.6C41.2,28,45,27,50,22.1c5,4.9,8.8,5.8,12.2,6.4C74,30.7,84.9,25,89.2,22C99.4,14.5,100,0,100,0";
export const svgHeartBottom = "M0,0c0,0,0.6,12.6,12.4,27.1c12.4,15.3,37.6,37.6,37.6,37.6l41.8-41.8c0,0,5.9-6.8,8.2-22.9";

export const svgDiamondOuter = "M0,0c0,0,5.2,9.5,31,18c0,0,5.8,20.1,19,32c0,0,14.8-12.6,19-32c0,0,14.8-1.8,31-18";
export const svgDiamondInner = "M27,0c0,0,1.1,12.9,4,18c0,0,6.9,2.7,19,3l0,0c12-0.3,19-3,19-3c3.1-6,4-18,4-18";
export const svgDiamondInnerCircle = "M27,0c0,12.7,10.3,23,23,23S73,12.7,73,0";