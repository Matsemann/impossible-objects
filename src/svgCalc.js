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
export function svgFunc(svgPathString) {
    const svgElem = document.createElementNS(ns, "svg");
    const path = document.createElementNS(ns, "path");

    path.setAttributeNS(null, "fill", "#FFFFFF");
    path.setAttributeNS(null, "stroke", "#FF0000");
    path.setAttributeNS(null, "d", "M0,0l50,50c0,0,0-33.6,50-50");
    svgElem.appendChild(path);



    let prevLength = 0;
    let prevX = -1;

    return (x) => {
        if (x < prevX) {
            prevLength = 0; // cannot use optimization
        }
        prevX = x;

        // x from -1 to 1 => 0 to 100
        const scaledX = (x + 1) * 50;

        while(true) {
            const point = path.getPointAtLength(prevLength);
            if (point.x >= scaledX) {
                return point.y / 50; // back to 0 to 1
            }
            prevLength += STEP_SIZE;
        }


    };
}