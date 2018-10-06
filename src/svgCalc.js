const ns = "http://www.w3.org/2000/svg";

const STEP_SIZE = 0.05;

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

export const svgTriangle = "M0,0c0,0,49.6,49.6,50,50s50-50,50-50";
export const svgHalfCircle = "M0,0c1.9,67.3,98.9,65.9,100,0";

export const svgPointyArrow = "M0,0c3.4,3.9,12.4,12.6,12.4,12.6l43.1,0.1L62.7,25L100,0";
export const svgSoftArrow = "M0,0c3.4,3.9,8.3,11,12.4,12.6c10,4,33.4-4.7,43.1,0.1c3.2,1.6,3.8,11.2,7.2,12.3C73.4,28.4,100,0,100,0";