const intersector = require('./intersector.js');

console.log(intersector.findLineIntersection(
    {x: 0, y: 0},
    {x: 10, y: 10},
    {x: 10, y: 5},
    {x: 9, y: 5}
));