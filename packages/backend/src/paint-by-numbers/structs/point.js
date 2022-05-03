"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.distanceTo = function (pt) {
        // don't do euclidean because then neighbours should be diagonally as well
        // because sqrt(2) < 2
        //  return Math.sqrt((pt.x - this.x) * (pt.x - this.x) + (pt.y - this.y) * (pt.y - this.y));
        return Math.abs(pt.x - this.x) + Math.abs(pt.y - this.y);
    };
    Point.prototype.distanceToCoord = function (x, y) {
        // don't do euclidean because then neighbours should be diagonally as well
        // because sqrt(2) < 2
        //  return Math.sqrt((pt.x - this.x) * (pt.x - this.x) + (pt.y - this.y) * (pt.y - this.y));
        return Math.abs(x - this.x) + Math.abs(y - this.y);
    };
    return Point;
}());
exports.Point = Point;
//# sourceMappingURL=point.js.map