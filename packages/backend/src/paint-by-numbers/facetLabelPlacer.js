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
exports.FacetLabelPlacer = void 0;
var common_1 = require("./common");
var polylabel_1 = require("./lib/polylabel");
var boundingbox_1 = require("./structs/boundingbox");
var facetCreator_1 = require("./facetCreator");
var FacetLabelPlacer = /** @class */ (function () {
    function FacetLabelPlacer() {
    }
    /**
     *  Determines where to place the labels for each facet. This is done by calculating where
     *  in the polygon the largest circle can be contained, also called the pole of inaccessibility
     *  That's the spot where there will be the most room for the label.
     *  One tricky gotcha: neighbour facets can lay completely inside other facets and can overlap the label
     *  if only the outer border of the facet is taken in account. This is solved by adding the neighbours facet polygon that fall
     *  within the facet as additional polygon rings (why does everything look so easy to do yet never is under the hood :/)
     */
    FacetLabelPlacer.buildFacetLabelBounds = function (facetResult, onUpdate) {
        if (onUpdate === void 0) { onUpdate = null; }
        return __awaiter(this, void 0, void 0, function () {
            var count, _i, _a, f, polyRings, borderPath, onlyOuterRing, _b, _c, neighbourIdx, neighbourPath, fallsInside, result, innerPadding;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        count = 0;
                        _i = 0, _a = facetResult.facets;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        f = _a[_i];
                        if (!(f != null)) return [3 /*break*/, 3];
                        polyRings = [];
                        borderPath = f.getFullPathFromBorderSegments(true);
                        // outer path must be first ring
                        polyRings.push(borderPath);
                        onlyOuterRing = [borderPath];
                        // now add all the neighbours of the facet as "inner" rings,
                        // regardless if they are inner or not. These are seen as areas where the label
                        // cannot be placed
                        if (f.neighbourFacetsIsDirty) {
                            facetCreator_1.FacetCreator.buildFacetNeighbour(f, facetResult);
                        }
                        for (_b = 0, _c = f.neighbourFacets; _b < _c.length; _b++) {
                            neighbourIdx = _c[_b];
                            neighbourPath = facetResult.facets[neighbourIdx].getFullPathFromBorderSegments(true);
                            fallsInside = FacetLabelPlacer.doesNeighbourFallInsideInCurrentFacet(neighbourPath, f, onlyOuterRing);
                            if (fallsInside) {
                                polyRings.push(neighbourPath);
                            }
                        }
                        result = (0, polylabel_1.polylabel)(polyRings);
                        f.labelBounds = new boundingbox_1.BoundingBox();
                        innerPadding = 2 * Math.sqrt(2 * result.distance);
                        f.labelBounds.minX = result.pt.x - innerPadding;
                        f.labelBounds.maxX = result.pt.x + innerPadding;
                        f.labelBounds.minY = result.pt.y - innerPadding;
                        f.labelBounds.maxY = result.pt.y + innerPadding;
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
                        _i++;
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
    /**
     *  Checks whether a neighbour border path is fully within the current facet border path
     */
    FacetLabelPlacer.doesNeighbourFallInsideInCurrentFacet = function (neighbourPath, f, onlyOuterRing) {
        var fallsInside = true;
        // fast test to see if the neighbour falls inside the bbox of the facet
        for (var i = 0; i < neighbourPath.length && fallsInside; i++) {
            if (neighbourPath[i].x >= f.bbox.minX &&
                neighbourPath[i].x <= f.bbox.maxX &&
                neighbourPath[i].y >= f.bbox.minY &&
                neighbourPath[i].y <= f.bbox.maxY) {
                // ok
            }
            else {
                fallsInside = false;
            }
        }
        if (fallsInside) {
            // do a more fine grained but more expensive check to see if each of the points fall within the polygon
            for (var i = 0; i < neighbourPath.length && fallsInside; i++) {
                var distance = (0, polylabel_1.pointToPolygonDist)(neighbourPath[i].x, neighbourPath[i].y, onlyOuterRing);
                if (distance < 0) {
                    // falls outside
                    fallsInside = false;
                }
            }
        }
        return fallsInside;
    };
    return FacetLabelPlacer;
}());
exports.FacetLabelPlacer = FacetLabelPlacer;
//# sourceMappingURL=facetLabelPlacer.js.map