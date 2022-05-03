"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KMeans = exports.Vector = void 0;
var Vector = /** @class */ (function () {
    function Vector(values, weight) {
        if (weight === void 0) { weight = 1; }
        this.values = values;
        this.weight = weight;
    }
    Vector.prototype.distanceTo = function (p) {
        var sumSquares = 0;
        for (var i = 0; i < this.values.length; i++) {
            sumSquares += (p.values[i] - this.values[i]) * (p.values[i] - this.values[i]);
        }
        return Math.sqrt(sumSquares);
    };
    /**
     *  Calculates the weighted average of the given points
     */
    Vector.average = function (pts) {
        if (pts.length === 0) {
            throw Error("Can't average 0 elements");
        }
        var dims = pts[0].values.length;
        var values = [];
        for (var i = 0; i < dims; i++) {
            values.push(0);
        }
        var weightSum = 0;
        for (var _i = 0, pts_1 = pts; _i < pts_1.length; _i++) {
            var p = pts_1[_i];
            weightSum += p.weight;
            for (var i = 0; i < dims; i++) {
                values[i] += p.weight * p.values[i];
            }
        }
        for (var i = 0; i < values.length; i++) {
            values[i] /= weightSum;
        }
        return new Vector(values);
    };
    return Vector;
}());
exports.Vector = Vector;
var KMeans = /** @class */ (function () {
    function KMeans(points, k, random, centroids) {
        if (centroids === void 0) { centroids = null; }
        this.points = points;
        this.k = k;
        this.random = random;
        this.currentIteration = 0;
        this.pointsPerCategory = [];
        this.centroids = [];
        this.currentDeltaDistanceDifference = 0;
        if (centroids != null) {
            this.centroids = centroids;
            for (var i = 0; i < this.k; i++) {
                this.pointsPerCategory.push([]);
            }
        }
        else {
            this.initCentroids();
        }
    }
    KMeans.prototype.initCentroids = function () {
        for (var i = 0; i < this.k; i++) {
            this.centroids.push(this.points[Math.floor(this.points.length * this.random.next())]);
            this.pointsPerCategory.push([]);
        }
    };
    KMeans.prototype.step = function () {
        // clear category
        for (var i = 0; i < this.k; i++) {
            this.pointsPerCategory[i] = [];
        }
        // calculate points per centroid
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var p = _a[_i];
            var minDist = Number.MAX_VALUE;
            var centroidIndex = -1;
            for (var k = 0; k < this.k; k++) {
                var dist = this.centroids[k].distanceTo(p);
                if (dist < minDist) {
                    centroidIndex = k;
                    minDist = dist;
                }
            }
            this.pointsPerCategory[centroidIndex].push(p);
        }
        var totalDistanceDiff = 0;
        // adjust centroids
        for (var k = 0; k < this.pointsPerCategory.length; k++) {
            var cat = this.pointsPerCategory[k];
            if (cat.length > 0) {
                var avg = Vector.average(cat);
                var dist = this.centroids[k].distanceTo(avg);
                totalDistanceDiff += dist;
                this.centroids[k] = avg;
            }
        }
        this.currentDeltaDistanceDifference = totalDistanceDiff;
        this.currentIteration++;
    };
    return KMeans;
}());
exports.KMeans = KMeans;
//# sourceMappingURL=clustering.js.map