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
exports.FacetCreator = void 0;
var common_1 = require("./common");
var fill_1 = require("./lib/fill");
var boundingbox_1 = require("./structs/boundingbox");
var point_1 = require("./structs/point");
var typedarrays_1 = require("./structs/typedarrays");
var facetmanagement_1 = require("./facetmanagement");
var FacetCreator = /** @class */ (function () {
    function FacetCreator() {
    }
    /**
     *  Constructs the facets with its border points for each area of pixels of the same color
     */
    FacetCreator.getFacets = function (width, height, imgColorIndices, onUpdate) {
        if (onUpdate === void 0) { onUpdate = null; }
        return __awaiter(this, void 0, void 0, function () {
            var result, visited, count, j, i, colorIndex, facetIndex, facet, _i, _a, f;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = new facetmanagement_1.FacetResult();
                        result.width = width;
                        result.height = height;
                        visited = new typedarrays_1.BooleanArray2D(result.width, result.height);
                        // setup facet map & array
                        result.facetMap = new typedarrays_1.Uint32Array2D(result.width, result.height);
                        result.facets = [];
                        count = 0;
                        j = 0;
                        _b.label = 1;
                    case 1:
                        if (!(j < result.height)) return [3 /*break*/, 7];
                        i = 0;
                        _b.label = 2;
                    case 2:
                        if (!(i < result.width)) return [3 /*break*/, 6];
                        colorIndex = imgColorIndices.get(i, j);
                        if (!!visited.get(i, j)) return [3 /*break*/, 4];
                        facetIndex = result.facets.length;
                        facet = FacetCreator.buildFacet(facetIndex, colorIndex, i, j, visited, imgColorIndices, result);
                        result.facets.push(facet);
                        if (!(count % 100 === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, common_1.delay)(0)];
                    case 3:
                        _b.sent();
                        if (onUpdate != null) {
                            onUpdate(count / (result.width * result.height));
                        }
                        _b.label = 4;
                    case 4:
                        count++;
                        _b.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6:
                        j++;
                        return [3 /*break*/, 1];
                    case 7: return [4 /*yield*/, (0, common_1.delay)(0)];
                    case 8:
                        _b.sent();
                        // fill in the neighbours of all facets by checking the neighbours of the border points
                        for (_i = 0, _a = result.facets; _i < _a.length; _i++) {
                            f = _a[_i];
                            if (f != null) {
                                FacetCreator.buildFacetNeighbour(f, result);
                            }
                        }
                        if (onUpdate != null) {
                            onUpdate(1);
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     *  Builds a facet at given x,y using depth first search to visit all pixels of the same color
     */
    FacetCreator.buildFacet = function (facetIndex, facetColorIndex, x, y, visited, imgColorIndices, facetResult) {
        var facet = new facetmanagement_1.Facet();
        facet.id = facetIndex;
        facet.color = facetColorIndex;
        facet.bbox = new boundingbox_1.BoundingBox();
        facet.borderPoints = [];
        facet.neighbourFacetsIsDirty = true; // not built neighbours yet
        facet.neighbourFacets = null;
        (0, fill_1.fill)(x, y, facetResult.width, facetResult.height, function (ptx, pty) { return visited.get(ptx, pty) || imgColorIndices.get(ptx, pty) !== facetColorIndex; }, function (ptx, pty) {
            visited.set(ptx, pty, true);
            facetResult.facetMap.set(ptx, pty, facetIndex);
            facet.pointCount++;
            // determine if the point is a border or not
            /*  const isInnerPoint = (ptx - 1 >= 0 && imgColorIndices.get(ptx - 1, pty) === facetColorIndex) &&
                      (pty - 1 >= 0 && imgColorIndices.get(ptx, pty - 1) === facetColorIndex) &&
                      (ptx + 1 < facetResult.width && imgColorIndices.get(ptx + 1, pty) === facetColorIndex) &&
                      (pty + 1 < facetResult.height && imgColorIndices.get(ptx, pty + 1) === facetColorIndex);
                */
            var isInnerPoint = imgColorIndices.matchAllAround(ptx, pty, facetColorIndex);
            if (!isInnerPoint) {
                facet.borderPoints.push(new point_1.Point(ptx, pty));
            }
            // update bounding box of facet
            if (ptx > facet.bbox.maxX) {
                facet.bbox.maxX = ptx;
            }
            if (pty > facet.bbox.maxY) {
                facet.bbox.maxY = pty;
            }
            if (ptx < facet.bbox.minX) {
                facet.bbox.minX = ptx;
            }
            if (pty < facet.bbox.minY) {
                facet.bbox.minY = pty;
            }
        });
        /*
               // using a 1D flattened stack (x*width+y), we can avoid heap allocations of Point objects, which halves the garbage collection time
             let stack: number[] = [];
             stack.push(y * facetResult.width + x);
    
             while (stack.length > 0) {
                 let pt = stack.pop()!;
                 let ptx = pt % facetResult.width;
                 let pty = Math.floor(pt / facetResult.width);
    
                 // if the point wasn't visited before and matches
                 // the same color
                 if (!visited.get(ptx, pty) &&
                     imgColorIndices.get(ptx, pty) == facetColorIndex) {
    
                     visited.set(ptx, pty, true);
                     facetResult.facetMap.set(ptx, pty, facetIndex);
                     facet.pointCount++;
    
                     // determine if the point is a border or not
                     let isInnerPoint = (ptx - 1 >= 0 && imgColorIndices.get(ptx - 1, pty) == facetColorIndex) &&
                         (pty - 1 >= 0 && imgColorIndices.get(ptx, pty - 1) == facetColorIndex) &&
                         (ptx + 1 < facetResult.width && imgColorIndices.get(ptx + 1, pty) == facetColorIndex) &&
                         (pty + 1 < facetResult.height && imgColorIndices.get(ptx, pty + 1) == facetColorIndex);
    
                     if (!isInnerPoint)
                         facet.borderPoints.push(new Point(ptx, pty));
    
                     // update bounding box of facet
                     if (ptx > facet.bbox.maxX) facet.bbox.maxX = ptx;
                     if (pty > facet.bbox.maxY) facet.bbox.maxY = pty;
                     if (ptx < facet.bbox.minX) facet.bbox.minX = ptx;
                     if (pty < facet.bbox.minY) facet.bbox.minY = pty;
    
                     // visit direct adjacent points
                     if (ptx - 1 >= 0 && !visited.get(ptx - 1, pty))
                         stack.push(pty * facetResult.width + (ptx - 1)); //stack.push(new Point(pt.x - 1, pt.y));
                     if (pty - 1 >= 0 && !visited.get(ptx, pty - 1))
                         stack.push((pty - 1) * facetResult.width + ptx); //stack.push(new Point(pt.x, pt.y - 1));
                     if (ptx + 1 < facetResult.width && !visited.get(ptx + 1, pty))
                         stack.push(pty * facetResult.width + (ptx + 1));//stack.push(new Point(pt.x + 1, pt.y));
                     if (pty + 1 < facetResult.height && !visited.get(ptx, pty + 1))
                         stack.push((pty + 1) * facetResult.width + ptx); //stack.push(new Point(pt.x, pt.y + 1));
                 }
             }
             */
        return facet;
    };
    /**
     * Check which neighbour facets the given facet has by checking the neighbour facets at each border point
     */
    FacetCreator.buildFacetNeighbour = function (facet, facetResult) {
        facet.neighbourFacets = [];
        var uniqueFacets = {}; // poor man's set
        for (var _i = 0, _a = facet.borderPoints; _i < _a.length; _i++) {
            var pt = _a[_i];
            if (pt.x - 1 >= 0) {
                var leftFacetId = facetResult.facetMap.get(pt.x - 1, pt.y);
                if (leftFacetId !== facet.id) {
                    uniqueFacets[leftFacetId] = true;
                }
            }
            if (pt.y - 1 >= 0) {
                var topFacetId = facetResult.facetMap.get(pt.x, pt.y - 1);
                if (topFacetId !== facet.id) {
                    uniqueFacets[topFacetId] = true;
                }
            }
            if (pt.x + 1 < facetResult.width) {
                var rightFacetId = facetResult.facetMap.get(pt.x + 1, pt.y);
                if (rightFacetId !== facet.id) {
                    uniqueFacets[rightFacetId] = true;
                }
            }
            if (pt.y + 1 < facetResult.height) {
                var bottomFacetId = facetResult.facetMap.get(pt.x, pt.y + 1);
                if (bottomFacetId !== facet.id) {
                    uniqueFacets[bottomFacetId] = true;
                }
            }
        }
        for (var _b = 0, _c = Object.keys(uniqueFacets); _b < _c.length; _b++) {
            var k = _c[_b];
            if (uniqueFacets.hasOwnProperty(k)) {
                facet.neighbourFacets.push(parseInt(k));
            }
        }
        // the neighbour array is updated so it's not dirty anymore
        facet.neighbourFacetsIsDirty = false;
    };
    return FacetCreator;
}());
exports.FacetCreator = FacetCreator;
//# sourceMappingURL=facetCreator.js.map