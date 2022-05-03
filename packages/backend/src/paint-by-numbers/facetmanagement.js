"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacetResult = exports.Facet = exports.PathPoint = exports.OrientationEnum = void 0;
var point_1 = require("./structs/point");
var OrientationEnum;
(function (OrientationEnum) {
    OrientationEnum[OrientationEnum["Left"] = 0] = "Left";
    OrientationEnum[OrientationEnum["Top"] = 1] = "Top";
    OrientationEnum[OrientationEnum["Right"] = 2] = "Right";
    OrientationEnum[OrientationEnum["Bottom"] = 3] = "Bottom";
})(OrientationEnum = exports.OrientationEnum || (exports.OrientationEnum = {}));
/**
 * PathPoint is a point with an orientation that indicates which wall border is set
 */
var PathPoint = /** @class */ (function (_super) {
    __extends(PathPoint, _super);
    function PathPoint(pt, orientation) {
        var _this = _super.call(this, pt.x, pt.y) || this;
        _this.orientation = orientation;
        return _this;
    }
    PathPoint.prototype.getWallX = function () {
        var x = this.x;
        if (this.orientation === OrientationEnum.Left) {
            x -= 0.5;
        }
        else if (this.orientation === OrientationEnum.Right) {
            x += 0.5;
        }
        return x;
    };
    PathPoint.prototype.getWallY = function () {
        var y = this.y;
        if (this.orientation === OrientationEnum.Top) {
            y -= 0.5;
        }
        else if (this.orientation === OrientationEnum.Bottom) {
            y += 0.5;
        }
        return y;
    };
    PathPoint.prototype.getNeighbour = function (facetResult) {
        switch (this.orientation) {
            case OrientationEnum.Left:
                if (this.x - 1 >= 0) {
                    return facetResult.facetMap.get(this.x - 1, this.y);
                }
                break;
            case OrientationEnum.Right:
                if (this.x + 1 < facetResult.width) {
                    return facetResult.facetMap.get(this.x + 1, this.y);
                }
                break;
            case OrientationEnum.Top:
                if (this.y - 1 >= 0) {
                    return facetResult.facetMap.get(this.x, this.y - 1);
                }
                break;
            case OrientationEnum.Bottom:
                if (this.y + 1 < facetResult.height) {
                    return facetResult.facetMap.get(this.x, this.y + 1);
                }
                break;
        }
        return -1;
    };
    PathPoint.prototype.toString = function () {
        return this.x + ',' + this.y + ' ' + this.orientation;
    };
    return PathPoint;
}(point_1.Point));
exports.PathPoint = PathPoint;
/**
 *  A facet that represents an area of pixels of the same color
 */
var Facet = /** @class */ (function () {
    function Facet() {
        this.pointCount = 0;
        /**
         * Flag indicating if the neighbourfacets array is dirty. If it is, the neighbourfacets *have* to be rebuild
         * Before it can be used. This is useful to defer the rebuilding of the array until it's actually needed
         * and can remove a lot of duplicate building of the array because multiple facets were hitting the same neighbour
         * (over 50% on test images)
         */
        this.neighbourFacetsIsDirty = false;
    }
    Facet.prototype.getFullPathFromBorderSegments = function (useWalls) {
        var newpath = [];
        var addPoint = function (pt) {
            if (useWalls) {
                newpath.push(new point_1.Point(pt.getWallX(), pt.getWallY()));
            }
            else {
                newpath.push(new point_1.Point(pt.x, pt.y));
            }
        };
        var lastSegment = null;
        for (var _i = 0, _a = this.borderSegments; _i < _a.length; _i++) {
            var seg = _a[_i];
            // fix for the continuitity of the border segments. If transition points between border segments on the path aren't repeated, the
            // borders of the facets aren't always matching up leaving holes when rendered
            if (lastSegment != null) {
                if (lastSegment.reverseOrder) {
                    addPoint(lastSegment.originalSegment.points[0]);
                }
                else {
                    addPoint(lastSegment.originalSegment.points[lastSegment.originalSegment.points.length - 1]);
                }
            }
            for (var i = 0; i < seg.originalSegment.points.length; i++) {
                var idx = seg.reverseOrder ? seg.originalSegment.points.length - 1 - i : i;
                addPoint(seg.originalSegment.points[idx]);
            }
            lastSegment = seg;
        }
        return newpath;
    };
    return Facet;
}());
exports.Facet = Facet;
/**
 *  Result of the facet construction, both as a map and as an array.
 *  Facets in the array can be null when they've been deleted
 */
var FacetResult = /** @class */ (function () {
    function FacetResult() {
    }
    return FacetResult;
}());
exports.FacetResult = FacetResult;
//# sourceMappingURL=facetmanagement.js.map