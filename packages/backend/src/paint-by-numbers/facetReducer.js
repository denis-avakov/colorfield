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
exports.FacetReducer = void 0;
var colorreductionmanagement_1 = require("./colorreductionmanagement");
var common_1 = require("./common");
var facetCreator_1 = require("./facetCreator");
var typedarrays_1 = require("./structs/typedarrays");
var FacetReducer = /** @class */ (function () {
    function FacetReducer() {
    }
    /**
     *  Remove all facets that have a pointCount smaller than the given number.
     */
    FacetReducer.reduceFacets = function (smallerThan, removeFacetsFromLargeToSmall, maximumNumberOfFacets, colorsByIndex, facetResult, imgColorIndices, onUpdate) {
        if (onUpdate === void 0) { onUpdate = null; }
        return __awaiter(this, void 0, void 0, function () {
            var visitedCache, colorDistances, facetProcessingOrder, curTime, fidx, f, facetCount, startFacetCount, facetProcessingOrder_1, facetToRemove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        visitedCache = new typedarrays_1.BooleanArray2D(facetResult.width, facetResult.height);
                        colorDistances = colorreductionmanagement_1.ColorReducer.buildColorDistanceMatrix(colorsByIndex);
                        facetProcessingOrder = facetResult.facets
                            .filter(function (f) { return f != null; })
                            .slice(0)
                            .sort(function (a, b) { return (b.pointCount > a.pointCount ? 1 : b.pointCount < a.pointCount ? -1 : 0); })
                            .map(function (f) { return f.id; });
                        if (!removeFacetsFromLargeToSmall) {
                            facetProcessingOrder.reverse();
                        }
                        curTime = new Date().getTime();
                        fidx = 0;
                        _a.label = 1;
                    case 1:
                        if (!(fidx < facetProcessingOrder.length)) return [3 /*break*/, 4];
                        f = facetResult.facets[facetProcessingOrder[fidx]];
                        if (!(f != null && f.pointCount < smallerThan)) return [3 /*break*/, 3];
                        FacetReducer.deleteFacet(f.id, facetResult, imgColorIndices, colorDistances, visitedCache);
                        if (!(new Date().getTime() - curTime > 500)) return [3 /*break*/, 3];
                        curTime = new Date().getTime();
                        return [4 /*yield*/, (0, common_1.delay)(0)];
                    case 2:
                        _a.sent();
                        if (onUpdate != null) {
                            onUpdate((0.5 * fidx) / facetProcessingOrder.length);
                        }
                        _a.label = 3;
                    case 3:
                        fidx++;
                        return [3 /*break*/, 1];
                    case 4:
                        facetCount = facetResult.facets.filter(function (f) { return f != null; }).length;
                        if (facetCount > maximumNumberOfFacets) {
                            console.log("There are still ".concat(facetCount, " facets, more than the maximum of ").concat(maximumNumberOfFacets, ". Removing the smallest facets"));
                        }
                        startFacetCount = facetCount;
                        _a.label = 5;
                    case 5:
                        if (!(facetCount > maximumNumberOfFacets)) return [3 /*break*/, 8];
                        facetProcessingOrder_1 = facetResult.facets
                            .filter(function (f) { return f != null; })
                            .slice(0)
                            .sort(function (a, b) {
                            return b.pointCount > a.pointCount ? 1 : b.pointCount < a.pointCount ? -1 : 0;
                        })
                            .map(function (f) { return f.id; })
                            .reverse();
                        facetToRemove = facetResult.facets[facetProcessingOrder_1[0]];
                        FacetReducer.deleteFacet(facetToRemove.id, facetResult, imgColorIndices, colorDistances, visitedCache);
                        facetCount = facetResult.facets.filter(function (f) { return f != null; }).length;
                        if (!(new Date().getTime() - curTime > 500)) return [3 /*break*/, 7];
                        curTime = new Date().getTime();
                        return [4 /*yield*/, (0, common_1.delay)(0)];
                    case 6:
                        _a.sent();
                        if (onUpdate != null) {
                            onUpdate(0.5 +
                                0.5 -
                                (facetCount - maximumNumberOfFacets) / (startFacetCount - maximumNumberOfFacets));
                        }
                        _a.label = 7;
                    case 7: return [3 /*break*/, 5];
                    case 8:
                        // this.trimFacets(facetResult, imgColorIndices, colorDistances, visitedCache);
                        if (onUpdate != null) {
                            onUpdate(1);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // /**
    //  * Trims facets with narrow paths either horizontally or vertically, potentially splitting the facet into multiple facets
    //  */
    // public static trimFacets(facetResult: FacetResult, imgColorIndices: Uint8Array2D, colorDistances: number[][], visitedArrayCache: BooleanArray2D) {
    //     for (const facet of facetResult.facets) {
    //         if (facet !== null) {
    //             const facetPointsToReallocate: Point[] = [];
    //             for (let y: number = facet.bbox.minY; y <= facet.bbox.maxY; y++) {
    //                 for (let x: number = facet.bbox.minX; x <= facet.bbox.maxX; x++) {
    //                     if (x > 0 && y > 0 && x < facetResult.width - 1 && y < facetResult.height - 1 &&
    //                         facetResult.facetMap.get(x, y) === facet.id) {
    //                         // check if isolated horizontally
    //                         const top = facetResult.facetMap.get(x, y - 1);
    //                         const bottom = facetResult.facetMap.get(x, y + 1);
    //                         if (top !== facet.id && bottom !== facet.id) {
    //                             // . ? .
    //                             // . F .
    //                             // . ? .
    //                             // mark pixel of facet that it should be removed
    //                             facetPointsToReallocate.push(new Point(x, y));
    //                             const closestNeighbour = FacetReducer.getClosestNeighbourForPixel(facet, facetResult, x, y, colorDistances);
    //                             // copy over color of closest neighbour
    //                             imgColorIndices.set(x, y, facetResult.facets[closestNeighbour]!.color);
    //                             console.log("Flagged " + x + "," + y + " to trim");
    //                         }
    //                     }
    //                 }
    //             }
    //             if (facetPointsToReallocate.length > 0) {
    //                 FacetReducer.rebuildForFacetChange(visitedArrayCache, facet, imgColorIndices, facetResult);
    //             }
    //         }
    //     }
    // }
    /**
     * Deletes a facet. All points belonging to the facet are moved to the nearest neighbour facet
     * based on the distance of the neighbour border points. This results in a voronoi like filling in of the
     * void the deletion made
     */
    FacetReducer.deleteFacet = function (facetIdToRemove, facetResult, imgColorIndices, colorDistances, visitedArrayCache) {
        var facetToRemove = facetResult.facets[facetIdToRemove];
        if (facetToRemove === null) {
            // already removed
            return;
        }
        if (facetToRemove.neighbourFacetsIsDirty) {
            facetCreator_1.FacetCreator.buildFacetNeighbour(facetToRemove, facetResult);
        }
        if (facetToRemove.neighbourFacets.length > 0) {
            // there are many small facets, it's faster to just iterate over all points within its bounding box
            // and seeing which belong to the facet than to keep track of the inner points (along with the border points)
            // per facet, because that generates a lot of extra heap objects that need to be garbage collected each time
            // a facet is rebuilt
            for (var j = facetToRemove.bbox.minY; j <= facetToRemove.bbox.maxY; j++) {
                for (var i = facetToRemove.bbox.minX; i <= facetToRemove.bbox.maxX; i++) {
                    if (facetResult.facetMap.get(i, j) === facetToRemove.id) {
                        var closestNeighbour = FacetReducer.getClosestNeighbourForPixel(facetToRemove, facetResult, i, j, colorDistances);
                        if (closestNeighbour !== -1) {
                            // copy over color of closest neighbour
                            imgColorIndices.set(i, j, facetResult.facets[closestNeighbour].color);
                        }
                        else {
                            console.warn("No closest neighbour found for point ".concat(i, ",").concat(j));
                        }
                    }
                }
            }
        }
        else {
            console.warn("Facet ".concat(facetToRemove.id, " does not have any neighbours"));
        }
        // Rebuild all the neighbour facets that have been changed. While it could probably be faster by just adding the points manually
        // to the facet map and determine if the border points are still valid, it's more complex than that. It's possible that due to the change in points
        // that 2 neighbours of the same colors have become linked and need to merged as well. So it's easier to just rebuild the entire facet
        FacetReducer.rebuildForFacetChange(visitedArrayCache, facetToRemove, imgColorIndices, facetResult);
        // now mark the facet to remove as deleted
        facetResult.facets[facetToRemove.id] = null;
    };
    FacetReducer.rebuildForFacetChange = function (visitedArrayCache, facet, imgColorIndices, facetResult) {
        FacetReducer.rebuildChangedNeighbourFacets(visitedArrayCache, facet, imgColorIndices, facetResult);
        // sanity check: make sure that all points have been replaced by neighbour facets. It's possible that some points will have
        // been left out because there is no continuity with the neighbour points
        // this occurs for diagonal points to the neighbours and more often when the closest
        // color is chosen when distances are equal.
        // It's probably possible to enforce that this will never happen in the above code but
        // this is a constraint that is expensive to enforce and doesn't happen all that much
        // so instead try and merge if with any of its direct neighbours if possible
        var needsToRebuild = false;
        for (var y = facet.bbox.minY; y <= facet.bbox.maxY; y++) {
            for (var x = facet.bbox.minX; x <= facet.bbox.maxX; x++) {
                if (facetResult.facetMap.get(x, y) === facet.id) {
                    console.warn("Point ".concat(x, ",").concat(y, " was reallocated to neighbours for facet ").concat(facet.id));
                    needsToRebuild = true;
                    if (x - 1 >= 0 &&
                        facetResult.facetMap.get(x - 1, y) !== facet.id &&
                        facetResult.facets[facetResult.facetMap.get(x - 1, y)] !== null) {
                        imgColorIndices.set(x, y, facetResult.facets[facetResult.facetMap.get(x - 1, y)].color);
                    }
                    else if (y - 1 >= 0 &&
                        facetResult.facetMap.get(x, y - 1) !== facet.id &&
                        facetResult.facets[facetResult.facetMap.get(x, y - 1)] !== null) {
                        imgColorIndices.set(x, y, facetResult.facets[facetResult.facetMap.get(x, y - 1)].color);
                    }
                    else if (x + 1 < facetResult.width &&
                        facetResult.facetMap.get(x + 1, y) !== facet.id &&
                        facetResult.facets[facetResult.facetMap.get(x + 1, y)] !== null) {
                        imgColorIndices.set(x, y, facetResult.facets[facetResult.facetMap.get(x + 1, y)].color);
                    }
                    else if (y + 1 < facetResult.height &&
                        facetResult.facetMap.get(x, y + 1) !== facet.id &&
                        facetResult.facets[facetResult.facetMap.get(x, y + 1)] !== null) {
                        imgColorIndices.set(x, y, facetResult.facets[facetResult.facetMap.get(x, y + 1)].color);
                    }
                    else {
                        console.error("Unable to reallocate point ".concat(x, ",").concat(y));
                    }
                }
            }
        }
        // now we need to go through the thing again to build facets and update the neighbours
        if (needsToRebuild) {
            FacetReducer.rebuildChangedNeighbourFacets(visitedArrayCache, facet, imgColorIndices, facetResult);
        }
    };
    /**
     * Determines the closest neighbour for a given pixel of a facet, based on the closest distance to the neighbour AND the when tied, the closest color
     */
    FacetReducer.getClosestNeighbourForPixel = function (facetToRemove, facetResult, x, y, colorDistances) {
        var closestNeighbour = -1;
        var minDistance = Number.MAX_VALUE;
        var minColorDistance = Number.MAX_VALUE;
        // ensure the neighbour facets is up to date if it was marked as dirty
        if (facetToRemove.neighbourFacetsIsDirty) {
            facetCreator_1.FacetCreator.buildFacetNeighbour(facetToRemove, facetResult);
        }
        // determine which neighbour will receive the current point based on the distance, and if there are more with the same
        // distance, then take the neighbour with the closes color
        for (var _i = 0, _a = facetToRemove.neighbourFacets; _i < _a.length; _i++) {
            var neighbourIdx = _a[_i];
            var neighbour = facetResult.facets[neighbourIdx];
            if (neighbour != null) {
                for (var _b = 0, _c = neighbour.borderPoints; _b < _c.length; _b++) {
                    var bpt = _c[_b];
                    var distance = bpt.distanceToCoord(x, y);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestNeighbour = neighbourIdx;
                        minColorDistance = Number.MAX_VALUE; // reset color distance
                    }
                    else if (distance === minDistance) {
                        // if the distance is equal as the min distance
                        // then see if the neighbour's color is closer to the current color
                        // note: this causes morepoints to be reallocated to different neighbours
                        // in the sanity check later, but still yields a better visual result
                        var colorDistance = colorDistances[facetToRemove.color][neighbour.color];
                        if (colorDistance < minColorDistance) {
                            minColorDistance = colorDistance;
                            closestNeighbour = neighbourIdx;
                        }
                    }
                }
            }
        }
        return closestNeighbour;
    };
    /**
     *  Rebuilds the given changed facets
     */
    FacetReducer.rebuildChangedNeighbourFacets = function (visitedArrayCache, facetToRemove, imgColorIndices, facetResult) {
        var changedNeighboursSet = {};
        if (facetToRemove.neighbourFacetsIsDirty) {
            facetCreator_1.FacetCreator.buildFacetNeighbour(facetToRemove, facetResult);
        }
        for (var _i = 0, _a = facetToRemove.neighbourFacets; _i < _a.length; _i++) {
            var neighbourIdx = _a[_i];
            var neighbour = facetResult.facets[neighbourIdx];
            if (neighbour != null) {
                // re-evaluate facet
                // track all the facets that needs to have their neighbour list updated, which is also going to be all the neighbours of the neighbours that are being updated
                changedNeighboursSet[neighbourIdx] = true;
                if (neighbour.neighbourFacetsIsDirty) {
                    facetCreator_1.FacetCreator.buildFacetNeighbour(neighbour, facetResult);
                }
                for (var _b = 0, _c = neighbour.neighbourFacets; _b < _c.length; _b++) {
                    var n = _c[_b];
                    changedNeighboursSet[n] = true;
                }
                // rebuild the neighbour facet
                var newFacet = facetCreator_1.FacetCreator.buildFacet(neighbourIdx, neighbour.color, neighbour.borderPoints[0].x, neighbour.borderPoints[0].y, visitedArrayCache, imgColorIndices, facetResult);
                facetResult.facets[neighbourIdx] = newFacet;
                // it's possible that any of the neighbour facets are now overlapping
                // because if for example facet Red - Green - Red, Green is removed
                // then it will become Red - Red and both facets will overlap
                // this means the facet will have 0 points remaining
                if (newFacet.pointCount === 0) {
                    // remove the empty facet as well
                    facetResult.facets[neighbourIdx] = null;
                }
            }
        }
        // reset the visited array for all neighbours
        // while the visited array could be recreated per facet to remove, it's quite big and introduces
        // a lot of allocation / cleanup overhead. Due to the size of the facets it's usually faster
        // to just flag every point of the facet as false again
        if (facetToRemove.neighbourFacetsIsDirty) {
            facetCreator_1.FacetCreator.buildFacetNeighbour(facetToRemove, facetResult);
        }
        for (var _d = 0, _e = facetToRemove.neighbourFacets; _d < _e.length; _d++) {
            var neighbourIdx = _e[_d];
            var neighbour = facetResult.facets[neighbourIdx];
            if (neighbour != null) {
                for (var y = neighbour.bbox.minY; y <= neighbour.bbox.maxY; y++) {
                    for (var x = neighbour.bbox.minX; x <= neighbour.bbox.maxX; x++) {
                        if (facetResult.facetMap.get(x, y) === neighbour.id) {
                            visitedArrayCache.set(x, y, false);
                        }
                    }
                }
            }
        }
        // rebuild neighbour array for affected neighbours
        for (var _f = 0, _g = Object.keys(changedNeighboursSet); _f < _g.length; _f++) {
            var k = _g[_f];
            if (changedNeighboursSet.hasOwnProperty(k)) {
                var neighbourIdx = parseInt(k);
                var f = facetResult.facets[neighbourIdx];
                if (f != null) {
                    // it's a lot faster when deferring the neighbour array updates
                    // because a lot of facets that are deleted share the same facet neighbours
                    // and removing the unnecessary neighbour array checks until they it's needed
                    // speeds things up significantly
                    // FacetCreator.buildFacetNeighbour(f, facetResult);
                    f.neighbourFacets = null;
                    f.neighbourFacetsIsDirty = true;
                }
            }
        }
    };
    return FacetReducer;
}());
exports.FacetReducer = FacetReducer;
//# sourceMappingURL=facetReducer.js.map