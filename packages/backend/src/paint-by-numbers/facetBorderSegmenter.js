"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacetBorderSegmenter = exports.FacetBoundarySegment = exports.PathSegment = void 0;
var common_1 = require("./common");
var point_1 = require("./structs/point");
var facetmanagement_1 = require("./facetmanagement");
/**
 *  Path segment is a segment of a border path that is adjacent to a specific neighbour facet
 */
var PathSegment = /** @class */ (function () {
    function PathSegment(points, neighbour) {
        this.points = points;
        this.neighbour = neighbour;
    }
    return PathSegment;
}());
exports.PathSegment = PathSegment;
/**
 * Facet boundary segment describes the matched segment that is shared between 2 facets
 * When 2 segments are matched, one will be the original segment and the other one is removed
 * This ensures that all facets share the same segments, but sometimes in reverse order to ensure
 * the correct continuity of its entire oborder path
 */
var FacetBoundarySegment = /** @class */ (function () {
    function FacetBoundarySegment(originalSegment, neighbour, reverseOrder) {
        this.originalSegment = originalSegment;
        this.neighbour = neighbour;
        this.reverseOrder = reverseOrder;
    }
    return FacetBoundarySegment;
}());
exports.FacetBoundarySegment = FacetBoundarySegment;
var FacetBorderSegmenter = /** @class */ (function () {
    function FacetBorderSegmenter() {
    }
    /**
     *  Builds border segments that are shared between facets
     *  While border paths are all nice and fancy, they are not linked to neighbour facets
     *  So any change in the paths makes a not so nice gap between the facets, which makes smoothing them out impossible
     */
    FacetBorderSegmenter.buildFacetBorderSegments = function (facetResult, nrOfTimesToHalvePoints, onUpdate) {
        if (nrOfTimesToHalvePoints === void 0) { nrOfTimesToHalvePoints = 2; }
        if (onUpdate === void 0) { onUpdate = null; }
        return __awaiter(this, void 0, void 0, function () {
            var segmentsPerFacet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        segmentsPerFacet = FacetBorderSegmenter.prepareSegmentsPerFacet(facetResult);
                        // now reduce the segment complexity with Haar wavelet reduction to smooth them out and make them
                        // more curvy with data points instead of zig zag of a grid
                        FacetBorderSegmenter.reduceSegmentComplexity(facetResult, segmentsPerFacet, nrOfTimesToHalvePoints);
                        // now see which segments of facets with the prepared segments of the neighbour facets
                        // and point them to the same one
                        return [4 /*yield*/, FacetBorderSegmenter.matchSegmentsWithNeighbours(facetResult, segmentsPerFacet, onUpdate)];
                    case 1:
                        // now see which segments of facets with the prepared segments of the neighbour facets
                        // and point them to the same one
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *  Chops up the border paths per facet into segments adjacent tothe same neighbour
     */
    FacetBorderSegmenter.prepareSegmentsPerFacet = function (facetResult) {
        var segmentsPerFacet = new Array(facetResult.facets.length);
        for (var _i = 0, _a = facetResult.facets; _i < _a.length; _i++) {
            var f = _a[_i];
            if (f != null) {
                var segments = [];
                if (f.borderPath.length > 1) {
                    var currentPoints = [];
                    currentPoints.push(f.borderPath[0]);
                    for (var i = 1; i < f.borderPath.length; i++) {
                        var prevBorderPoint = f.borderPath[i - 1];
                        var curBorderPoint = f.borderPath[i];
                        var oldNeighbour = prevBorderPoint.getNeighbour(facetResult);
                        var curNeighbour = curBorderPoint.getNeighbour(facetResult);
                        var isTransitionPoint = false;
                        if (oldNeighbour !== curNeighbour) {
                            isTransitionPoint = true;
                        }
                        else {
                            // it's possible that due to inner facets inside the current facet that the
                            // border is interrupted on that facet's side, but not on the neighbour's side
                            if (oldNeighbour !== -1) {
                                // check for tight rotations to break path if diagonals contain a different neighbour,
                                // see https://i.imgur.com/o6Srqwj.png for visual path of the issue
                                if (prevBorderPoint.x === curBorderPoint.x &&
                                    prevBorderPoint.y === curBorderPoint.y) {
                                    // rotation turn
                                    // check the diagonal neighbour to see if it remains the same
                                    //   +---+---+
                                    //   | dN|   |
                                    //   +---xxxx> (x = wall, dN = diagNeighbour)
                                    //   |   x f |
                                    //   +---v---+
                                    if ((prevBorderPoint.orientation === facetmanagement_1.OrientationEnum.Top &&
                                        curBorderPoint.orientation === facetmanagement_1.OrientationEnum.Left) ||
                                        (prevBorderPoint.orientation === facetmanagement_1.OrientationEnum.Left &&
                                            curBorderPoint.orientation === facetmanagement_1.OrientationEnum.Top)) {
                                        var diagNeighbour = facetResult.facetMap.get(curBorderPoint.x - 1, curBorderPoint.y - 1);
                                        if (diagNeighbour !== oldNeighbour) {
                                            isTransitionPoint = true;
                                        }
                                    }
                                    else if ((prevBorderPoint.orientation === facetmanagement_1.OrientationEnum.Top &&
                                        curBorderPoint.orientation === facetmanagement_1.OrientationEnum.Right) ||
                                        (prevBorderPoint.orientation === facetmanagement_1.OrientationEnum.Right &&
                                            curBorderPoint.orientation === facetmanagement_1.OrientationEnum.Top)) {
                                        var diagNeighbour = facetResult.facetMap.get(curBorderPoint.x + 1, curBorderPoint.y - 1);
                                        if (diagNeighbour !== oldNeighbour) {
                                            isTransitionPoint = true;
                                        }
                                    }
                                    else if ((prevBorderPoint.orientation === facetmanagement_1.OrientationEnum.Bottom &&
                                        curBorderPoint.orientation === facetmanagement_1.OrientationEnum.Left) ||
                                        (prevBorderPoint.orientation === facetmanagement_1.OrientationEnum.Left &&
                                            curBorderPoint.orientation === facetmanagement_1.OrientationEnum.Bottom)) {
                                        var diagNeighbour = facetResult.facetMap.get(curBorderPoint.x - 1, curBorderPoint.y + 1);
                                        if (diagNeighbour !== oldNeighbour) {
                                            isTransitionPoint = true;
                                        }
                                    }
                                    else if ((prevBorderPoint.orientation === facetmanagement_1.OrientationEnum.Bottom &&
                                        curBorderPoint.orientation === facetmanagement_1.OrientationEnum.Right) ||
                                        (prevBorderPoint.orientation === facetmanagement_1.OrientationEnum.Right &&
                                            curBorderPoint.orientation === facetmanagement_1.OrientationEnum.Bottom)) {
                                        var diagNeighbour = facetResult.facetMap.get(curBorderPoint.x + 1, curBorderPoint.y + 1);
                                        if (diagNeighbour !== oldNeighbour) {
                                            isTransitionPoint = true;
                                        }
                                    }
                                }
                            }
                        }
                        currentPoints.push(curBorderPoint);
                        if (isTransitionPoint) {
                            // aha! a transition point, create the current points as new segment
                            // and start a new list
                            if (currentPoints.length > 1) {
                                var segment = new PathSegment(currentPoints, oldNeighbour);
                                segments.push(segment);
                                currentPoints = [curBorderPoint];
                            }
                        }
                    }
                    // finally check if there is a remainder partial segment and either prepend
                    // the points to the first segment if they have the same neighbour or construct a
                    // new segment
                    if (currentPoints.length > 1) {
                        var oldNeighbour = f.borderPath[f.borderPath.length - 1].getNeighbour(facetResult);
                        if (segments.length > 0 && segments[0].neighbour === oldNeighbour) {
                            // the first segment and the remainder of the last one are the same part
                            // add the current points to the first segment by prefixing it
                            var mergedPoints = currentPoints.concat(segments[0].points);
                            segments[0].points = mergedPoints;
                        }
                        else {
                            // add the remainder as final segment
                            var segment = new PathSegment(currentPoints, oldNeighbour);
                            segments.push(segment);
                            currentPoints = [];
                        }
                    }
                }
                segmentsPerFacet[f.id] = segments;
            }
        }
        return segmentsPerFacet;
    };
    /**
     * Reduces each segment border path points
     */
    FacetBorderSegmenter.reduceSegmentComplexity = function (facetResult, segmentsPerFacet, nrOfTimesToHalvePoints) {
        for (var _i = 0, _a = facetResult.facets; _i < _a.length; _i++) {
            var f = _a[_i];
            if (f != null) {
                for (var _b = 0, _c = segmentsPerFacet[f.id]; _b < _c.length; _b++) {
                    var segment = _c[_b];
                    for (var i = 0; i < nrOfTimesToHalvePoints; i++) {
                        segment.points = FacetBorderSegmenter.reduceSegmentHaarWavelet(segment.points, true, facetResult.width, facetResult.height);
                    }
                }
            }
        }
    };
    /**
     *  Remove the points by taking the average per pair and using that as a new point
     *  in the reduced segment. The delta values that create the Haar wavelet are not tracked
     *  because they are unneeded.
     */
    FacetBorderSegmenter.reduceSegmentHaarWavelet = function (newpath, skipOutsideBorders, width, height) {
        if (newpath.length <= 5) {
            return newpath;
        }
        var reducedPath = [];
        reducedPath.push(newpath[0]);
        for (var i = 1; i < newpath.length - 2; i += 2) {
            if (!skipOutsideBorders ||
                (skipOutsideBorders &&
                    !FacetBorderSegmenter.isOutsideBorderPoint(newpath[i], width, height))) {
                var cx = (newpath[i].x + newpath[i + 1].x) / 2;
                var cy = (newpath[i].y + newpath[i + 1].y) / 2;
                reducedPath.push(new facetmanagement_1.PathPoint(new point_1.Point(cx, cy), facetmanagement_1.OrientationEnum.Left));
            }
            else {
                reducedPath.push(newpath[i]);
                reducedPath.push(newpath[i + 1]);
            }
        }
        // close the loop
        reducedPath.push(newpath[newpath.length - 1]);
        return reducedPath;
    };
    FacetBorderSegmenter.isOutsideBorderPoint = function (point, width, height) {
        return point.x === 0 || point.y === 0 || point.x === width - 1 || point.y === height - 1;
    };
    FacetBorderSegmenter.calculateArea = function (path) {
        var total = 0;
        for (var i = 0; i < path.length; i++) {
            var addX = path[i].x;
            var addY = path[i === path.length - 1 ? 0 : i + 1].y;
            var subX = path[i === path.length - 1 ? 0 : i + 1].x;
            var subY = path[i].y;
            total += addX * addY * 0.5;
            total -= subX * subY * 0.5;
        }
        return Math.abs(total);
    };
    /**
     *  Matches all segments with each other between facets and their neighbour
     *  A segment matches when the start and end match or the start matches with the end and vice versa
     *  (then the segment will need to be traversed in reverse order)
     */
    FacetBorderSegmenter.matchSegmentsWithNeighbours = function (facetResult, segmentsPerFacet, onUpdate) {
        if (onUpdate === void 0) { onUpdate = null; }
        return __awaiter(this, void 0, void 0, function () {
            var MAX_DISTANCE, _i, _a, f, count, _b, _c, f, debug, s, segment, neighbourFacet, matchFound, neighbourSegments, ns, neighbourSegment, segStartPoint, segEndPoint, nSegStartPoint, nSegEndPoint, matchesStraight, matchesReverse;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        MAX_DISTANCE = 4;
                        // reserve room
                        for (_i = 0, _a = facetResult.facets; _i < _a.length; _i++) {
                            f = _a[_i];
                            if (f != null) {
                                f.borderSegments = new Array(segmentsPerFacet[f.id].length);
                            }
                        }
                        count = 0;
                        _b = 0, _c = facetResult.facets;
                        _d.label = 1;
                    case 1:
                        if (!(_b < _c.length)) return [3 /*break*/, 5];
                        f = _c[_b];
                        if (!(f != null)) return [3 /*break*/, 3];
                        debug = false;
                        for (s = 0; s < segmentsPerFacet[f.id].length; s++) {
                            segment = segmentsPerFacet[f.id][s];
                            if (segment != null && f.borderSegments[s] == null) {
                                f.borderSegments[s] = new FacetBoundarySegment(segment, segment.neighbour, false);
                                if (debug) {
                                    console.log('Setting facet ' + f.id + ' segment ' + s + ' to ' + f.borderSegments[s]);
                                }
                                if (segment.neighbour !== -1) {
                                    neighbourFacet = facetResult.facets[segment.neighbour];
                                    matchFound = false;
                                    if (neighbourFacet != null) {
                                        neighbourSegments = segmentsPerFacet[segment.neighbour];
                                        for (ns = 0; ns < neighbourSegments.length; ns++) {
                                            neighbourSegment = neighbourSegments[ns];
                                            // only try to match against the segments that aren't processed yet
                                            // and which are adjacent to the boundary of the current facet
                                            if (neighbourSegment != null && neighbourSegment.neighbour === f.id) {
                                                segStartPoint = segment.points[0];
                                                segEndPoint = segment.points[segment.points.length - 1];
                                                nSegStartPoint = neighbourSegment.points[0];
                                                nSegEndPoint = neighbourSegment.points[neighbourSegment.points.length - 1];
                                                matchesStraight = segStartPoint.distanceTo(nSegStartPoint) <= MAX_DISTANCE &&
                                                    segEndPoint.distanceTo(nSegEndPoint) <= MAX_DISTANCE;
                                                matchesReverse = segStartPoint.distanceTo(nSegEndPoint) <= MAX_DISTANCE &&
                                                    segEndPoint.distanceTo(nSegStartPoint) <= MAX_DISTANCE;
                                                if (matchesStraight && matchesReverse) {
                                                    // dang it , both match, it must be a tiny segment, but when placed wrongly it'll overlap in the path creating an hourglass
                                                    //  e.g. https://i.imgur.com/XZQhxRV.png
                                                    // determine which is the closest
                                                    if (segStartPoint.distanceTo(nSegStartPoint) +
                                                        segEndPoint.distanceTo(nSegEndPoint) <
                                                        segStartPoint.distanceTo(nSegEndPoint) +
                                                            segEndPoint.distanceTo(nSegStartPoint)) {
                                                        matchesStraight = true;
                                                        matchesReverse = false;
                                                    }
                                                    else {
                                                        matchesStraight = false;
                                                        matchesReverse = true;
                                                    }
                                                }
                                                if (matchesStraight) {
                                                    // start & end points match
                                                    if (debug) {
                                                        console.log('Match found for facet ' + f.id + ' to neighbour ' + neighbourFacet.id);
                                                    }
                                                    neighbourFacet.borderSegments[ns] = new FacetBoundarySegment(segment, f.id, false);
                                                    if (debug) {
                                                        console.log('Setting facet ' +
                                                            neighbourFacet.id +
                                                            ' segment ' +
                                                            ns +
                                                            ' to ' +
                                                            neighbourFacet.borderSegments[ns]);
                                                    }
                                                    segmentsPerFacet[neighbourFacet.id][ns] = null;
                                                    matchFound = true;
                                                    break;
                                                }
                                                else if (matchesReverse) {
                                                    // start & end points match  but in reverse order
                                                    if (debug) {
                                                        console.log('Reverse match found for facet ' +
                                                            f.id +
                                                            ' to neighbour ' +
                                                            neighbourFacet.id);
                                                    }
                                                    neighbourFacet.borderSegments[ns] = new FacetBoundarySegment(segment, f.id, true);
                                                    if (debug) {
                                                        console.log('Setting facet ' +
                                                            neighbourFacet.id +
                                                            ' segment ' +
                                                            ns +
                                                            ' to ' +
                                                            neighbourFacet.borderSegments[ns]);
                                                    }
                                                    segmentsPerFacet[neighbourFacet.id][ns] = null;
                                                    matchFound = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    if (!matchFound && debug) {
                                        // it's possible that the border is not shared with its neighbour
                                        // this can happen when the segment fully falls inside the other facet
                                        // though the above checks in the preparation of the segments should probably
                                        // cover all cases
                                        console.error('No match found for segment of ' +
                                            f.id +
                                            ': ' +
                                            ('siding ' +
                                                segment.neighbour +
                                                ' ' +
                                                segment.points[0] +
                                                ' -> ' +
                                                segment.points[segment.points.length - 1]));
                                    }
                                }
                            }
                            // clear the current segment so it can't be processed again when processing the neighbour facet
                            segmentsPerFacet[f.id][s] = null;
                        }
                        if (!(count % 100 === 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, common_1.delay)(0)];
                    case 2:
                        _d.sent();
                        if (onUpdate != null) {
                            onUpdate(f.id / facetResult.facets.length);
                        }
                        _d.label = 3;
                    case 3:
                        count++;
                        _d.label = 4;
                    case 4:
                        _b++;
                        return [3 /*break*/, 1];
                    case 5:
                        if (onUpdate != null) {
                            onUpdate(1);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return FacetBorderSegmenter;
}());
exports.FacetBorderSegmenter = FacetBorderSegmenter;
//# sourceMappingURL=facetBorderSegmenter.js.map