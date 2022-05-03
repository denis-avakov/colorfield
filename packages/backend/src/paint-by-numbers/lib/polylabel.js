"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointToPolygonDist = exports.polylabel = void 0;
var datastructs_1 = require("./datastructs");
function polylabel(polygon, precision) {
    if (precision === void 0) { precision = 1.0; }
    // find the bounding box of the outer ring
    var minX = Number.MAX_VALUE;
    var minY = Number.MAX_VALUE;
    var maxX = Number.MIN_VALUE;
    var maxY = Number.MIN_VALUE;
    for (var i = 0; i < polygon[0].length; i++) {
        var p = polygon[0][i];
        if (p.x < minX) {
            minX = p.x;
        }
        if (p.y < minY) {
            minY = p.y;
        }
        if (p.x > maxX) {
            maxX = p.x;
        }
        if (p.y > maxY) {
            maxY = p.y;
        }
    }
    var width = maxX - minX;
    var height = maxY - minY;
    var cellSize = Math.min(width, height);
    var h = cellSize / 2;
    // a priority queue of cells in order of their "potential" (max distance to polygon)
    var cellQueue = new datastructs_1.PriorityQueue();
    if (cellSize === 0) {
        return { pt: { x: minX, y: minY }, distance: 0 };
    }
    // cover polygon with initial cells
    for (var x = minX; x < maxX; x += cellSize) {
        for (var y = minY; y < maxY; y += cellSize) {
            cellQueue.enqueue(new Cell(x + h, y + h, h, polygon));
        }
    }
    // take centroid as the first best guess
    var bestCell = getCentroidCell(polygon);
    // special case for rectangular polygons
    var bboxCell = new Cell(minX + width / 2, minY + height / 2, 0, polygon);
    if (bboxCell.d > bestCell.d) {
        bestCell = bboxCell;
    }
    var numProbes = cellQueue.size;
    while (cellQueue.size > 0) {
        // pick the most promising cell from the queue
        var cell = cellQueue.dequeue();
        // update the best cell if we found a better one
        if (cell.d > bestCell.d) {
            bestCell = cell;
        }
        // do not drill down further if there's no chance of a better solution
        if (cell.max - bestCell.d <= precision) {
            continue;
        }
        // split the cell into four cells
        h = cell.h / 2;
        cellQueue.enqueue(new Cell(cell.x - h, cell.y - h, h, polygon));
        cellQueue.enqueue(new Cell(cell.x + h, cell.y - h, h, polygon));
        cellQueue.enqueue(new Cell(cell.x - h, cell.y + h, h, polygon));
        cellQueue.enqueue(new Cell(cell.x + h, cell.y + h, h, polygon));
        numProbes += 4;
    }
    return { pt: { x: bestCell.x, y: bestCell.y }, distance: bestCell.d };
}
exports.polylabel = polylabel;
var Cell = /** @class */ (function () {
    function Cell(x, y, h, polygon) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.d = pointToPolygonDist(x, y, polygon);
        this.max = this.d + this.h * Math.SQRT2;
    }
    Cell.prototype.compareTo = function (other) {
        return other.max - this.max;
    };
    Cell.prototype.getKey = function () {
        return this.x + ',' + this.y;
    };
    return Cell;
}());
// get squared distance from a point px,py to a segment [a-b]
function getSegDistSq(px, py, a, b) {
    var x = a.x;
    var y = a.y;
    var dx = b.x - x;
    var dy = b.y - y;
    if (dx !== 0 || dy !== 0) {
        var t = ((px - x) * dx + (py - y) * dy) / (dx * dx + dy * dy);
        if (t > 1) {
            x = b.x;
            y = b.y;
        }
        else if (t > 0) {
            x += dx * t;
            y += dy * t;
        }
    }
    dx = px - x;
    dy = py - y;
    return dx * dx + dy * dy;
}
/**
 * Signed distance from point to polygon outline (negative if point is outside)
 */
function pointToPolygonDist(x, y, polygon) {
    var inside = false;
    var minDistSq = Infinity;
    for (var k = 0; k < polygon.length; k++) {
        var ring = polygon[k];
        for (var i = 0, len = ring.length, j = len - 1; i < len; j = i++) {
            var a = ring[i];
            var b = ring[j];
            if (a.y > y !== b.y > y && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x) {
                inside = !inside;
            }
            minDistSq = Math.min(minDistSq, getSegDistSq(x, y, a, b));
        }
    }
    return (inside ? 1 : -1) * Math.sqrt(minDistSq);
}
exports.pointToPolygonDist = pointToPolygonDist;
// get polygon centroid
function getCentroidCell(polygon) {
    var area = 0;
    var x = 0;
    var y = 0;
    var points = polygon[0];
    for (var i = 0, len = points.length, j = len - 1; i < len; j = i++) {
        var a = points[i];
        var b = points[j];
        var f = a.x * b.y - b.x * a.y;
        x += (a.x + b.x) * f;
        y += (a.y + b.y) * f;
        area += f * 3;
    }
    if (area === 0) {
        return new Cell(points[0].x, points[0].y, 0, polygon);
    }
    return new Cell(x / area, y / area, 0, polygon);
}
//# sourceMappingURL=polylabel.js.map