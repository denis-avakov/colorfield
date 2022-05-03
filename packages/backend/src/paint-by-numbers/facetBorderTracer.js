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
exports.FacetBorderTracer = void 0;
var common_1 = require("./common");
var point_1 = require("./structs/point");
var typedarrays_1 = require("./structs/typedarrays");
var facetmanagement_1 = require("./facetmanagement");
var FacetBorderTracer = /** @class */ (function () {
    function FacetBorderTracer() {
    }
    /**
     *  Traces the border path of the facet from the facet border points.
     *  Imagine placing walls around the outer side of the border points.
     */
    FacetBorderTracer.buildFacetBorderPaths = function (facetResult, onUpdate) {
        if (onUpdate === void 0) { onUpdate = null; }
        return __awaiter(this, void 0, void 0, function () {
            var count, borderMask, facetProcessingOrder, fidx, f, _i, _a, bp, xWall, yWall, borderStartIndex, i, pt, path;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        count = 0;
                        borderMask = new typedarrays_1.BooleanArray2D(facetResult.width, facetResult.height);
                        facetProcessingOrder = facetResult.facets
                            .filter(function (f) { return f != null; })
                            .slice(0)
                            .sort(function (a, b) { return (b.pointCount > a.pointCount ? 1 : b.pointCount < a.pointCount ? -1 : 0); })
                            .map(function (f) { return f.id; });
                        fidx = 0;
                        _b.label = 1;
                    case 1:
                        if (!(fidx < facetProcessingOrder.length)) return [3 /*break*/, 5];
                        f = facetResult.facets[facetProcessingOrder[fidx]];
                        if (!(f != null)) return [3 /*break*/, 3];
                        for (_i = 0, _a = f.borderPoints; _i < _a.length; _i++) {
                            bp = _a[_i];
                            borderMask.set(bp.x, bp.y, true);
                        }
                        xWall = new typedarrays_1.BooleanArray2D(facetResult.width + 1, facetResult.height + 1);
                        yWall = new typedarrays_1.BooleanArray2D(facetResult.width + 1, facetResult.height + 1);
                        borderStartIndex = -1;
                        for (i = 0; i < f.borderPoints.length; i++) {
                            if (f.borderPoints[i].x === f.bbox.minX ||
                                f.borderPoints[i].x === f.bbox.maxX ||
                                f.borderPoints[i].y === f.bbox.minY ||
                                f.borderPoints[i].y === f.bbox.maxY) {
                                borderStartIndex = i;
                                break;
                            }
                        }
                        pt = new facetmanagement_1.PathPoint(f.borderPoints[borderStartIndex], facetmanagement_1.OrientationEnum.Left);
                        // L T R B
                        if (pt.x - 1 < 0 || facetResult.facetMap.get(pt.x - 1, pt.y) !== f.id) {
                            pt.orientation = facetmanagement_1.OrientationEnum.Left;
                        }
                        else if (pt.y - 1 < 0 || facetResult.facetMap.get(pt.x, pt.y - 1) !== f.id) {
                            pt.orientation = facetmanagement_1.OrientationEnum.Top;
                        }
                        else if (pt.x + 1 >= facetResult.width ||
                            facetResult.facetMap.get(pt.x + 1, pt.y) !== f.id) {
                            pt.orientation = facetmanagement_1.OrientationEnum.Right;
                        }
                        else if (pt.y + 1 >= facetResult.height ||
                            facetResult.facetMap.get(pt.x, pt.y + 1) !== f.id) {
                            pt.orientation = facetmanagement_1.OrientationEnum.Bottom;
                        }
                        path = FacetBorderTracer.getPath(pt, facetResult, f, borderMask, xWall, yWall);
                        f.borderPath = path;
                        if (!(count % 100 === 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, common_1.delay)(0)];
                    case 2:
                        _b.sent();
                        if (onUpdate != null) {
                            onUpdate(fidx / facetProcessingOrder.length);
                        }
                        _b.label = 3;
                    case 3:
                        count++;
                        _b.label = 4;
                    case 4:
                        fidx++;
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
     * Returns a border path starting from the given point
     */
    FacetBorderTracer.getPath = function (pt, facetResult, f, borderMask, xWall, yWall) {
        var debug = false;
        var finished = false;
        var count = 0;
        var path = [];
        FacetBorderTracer.addPointToPath(path, pt, xWall, f, yWall);
        // check rotations first, then straight along the ouside and finally diagonally
        // this ensures that bends are always taken as tight as possible
        // so it doesn't skip border points to later loop back to and get stuck (hopefully)
        while (!finished) {
            if (debug) {
                console.log(pt.x + ' ' + pt.y + ' ' + pt.orientation);
            }
            // yes, technically i could do some trickery to only get the left/top cases
            // by shifting the pixels but that means some more shenanigans in correct order of things
            // so whatever. (And yes I tried it but it wasn't worth the debugging hell that ensued)
            var possibleNextPoints = [];
            //   +---+---+
            //   |  <|   |
            //   +---+---+
            if (pt.orientation === facetmanagement_1.OrientationEnum.Left) {
                // check rotate to top
                //   +---+---+
                //   |   |   |
                //   +---xnnnn (x = old wall, n = new wall, F = current facet x,y)
                //   |   x F |
                //   +---x---+
                if (((pt.y - 1 >= 0 && facetResult.facetMap.get(pt.x, pt.y - 1) !== f.id) || // top exists and is a neighbour facet
                    pt.y - 1 < 0) && // or top doesn't exist, which is the boundary of the image
                    !yWall.get(pt.x, pt.y)) {
                    // and the wall isn't set yet
                    // can place top _ wall at x,y
                    if (debug) {
                        console.log('can place top _ wall at x,y');
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x, pt.y), facetmanagement_1.OrientationEnum.Top);
                    possibleNextPoints.push(nextpt);
                }
                // check rotate to bottom
                //   +---+---+
                //   |   |   |
                //   +---x---+ (x = old wall, n = new wall, F = current facet x,y)
                //   |   x F |
                //   +---xnnnn
                if (((pt.y + 1 < facetResult.height && facetResult.facetMap.get(pt.x, pt.y + 1) !== f.id) || // bottom exists and is a neighbour facet
                    pt.y + 1 >= facetResult.height) && // or bottom doesn't exist, which is the boundary of the image
                    !yWall.get(pt.x, pt.y + 1)) {
                    // and the wall isn't set yet
                    // can place bottom  _ wall at x,y
                    if (debug) {
                        console.log('can place bottom _ wall at x,y');
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x, pt.y), facetmanagement_1.OrientationEnum.Bottom);
                    possibleNextPoints.push(nextpt);
                }
                // check upwards
                //   +---n---+
                //   |   n   |
                //   +---x---+ (x = old wall, n = new wall, F = current facet x,y)
                //   |   x F |
                //   +---x---+
                if (pt.y - 1 >= 0 && // top exists
                    facetResult.facetMap.get(pt.x, pt.y - 1) === f.id && // and is part of the same facet
                    (pt.x - 1 < 0 || facetResult.facetMap.get(pt.x - 1, pt.y - 1) !== f.id) && // and
                    borderMask.get(pt.x, pt.y - 1) &&
                    !xWall.get(pt.x, pt.y - 1)) {
                    // can place | wall at x,y-1
                    if (debug) {
                        console.log("can place left | wall at x,y-1");
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x, pt.y - 1), facetmanagement_1.OrientationEnum.Left);
                    possibleNextPoints.push(nextpt);
                }
                // check downwards
                //   +---x---+
                //   |   x F |
                //   +---x---+ (x = old wall, n = new wall, F = current facet x,y)
                //   |   n   |
                //   +---n---+
                if (pt.y + 1 < facetResult.height &&
                    facetResult.facetMap.get(pt.x, pt.y + 1) === f.id &&
                    (pt.x - 1 < 0 || facetResult.facetMap.get(pt.x - 1, pt.y + 1) !== f.id) &&
                    borderMask.get(pt.x, pt.y + 1) &&
                    !xWall.get(pt.x, pt.y + 1)) {
                    // can place | wall at x,y+1
                    if (debug) {
                        console.log('can place left | wall at x,y+1');
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x, pt.y + 1), facetmanagement_1.OrientationEnum.Left);
                    possibleNextPoints.push(nextpt);
                }
                // check left upwards
                //   +---+---+
                //   |   |   |
                //   nnnnx---+ (x = old wall, n = new wall, F = current facet x,y)
                //   |   x F |
                //   +---x---+
                if (pt.y - 1 >= 0 &&
                    pt.x - 1 >= 0 && // there is a left upwards
                    facetResult.facetMap.get(pt.x - 1, pt.y - 1) === f.id && // and it belongs to the same facet
                    borderMask.get(pt.x - 1, pt.y - 1) && // and is on the border
                    !yWall.get(pt.x - 1, pt.y - 1 + 1) && // and the bottom wall isn't set yet
                    !yWall.get(pt.x, pt.y) // and the path didn't come from the top of the current one to prevent getting a T shaped path (issue: https://i.imgur.com/ggUWuXi.png)
                ) {
                    // can place bottom _ wall at x-1,y-1
                    if (debug) {
                        console.log('can place bottom _ wall at x-1,y-1');
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x - 1, pt.y - 1), facetmanagement_1.OrientationEnum.Bottom);
                    possibleNextPoints.push(nextpt);
                }
                // check left downwards
                //   +---x---+
                //   |   x F |
                //   nnnnx---+ (x = old wall, n = new wall, F = current facet x,y)
                //   |   |   |
                //   +---+---+
                if (pt.y + 1 < facetResult.height &&
                    pt.x - 1 >= 0 && // there is a left downwards
                    facetResult.facetMap.get(pt.x - 1, pt.y + 1) === f.id && // and belongs to the same facet
                    borderMask.get(pt.x - 1, pt.y + 1) && // and is on the border
                    !yWall.get(pt.x - 1, pt.y + 1) && // and the top wall isn't set yet
                    !yWall.get(pt.x, pt.y + 1) // and the path didn't come from the bottom of the current point to prevent T shape
                ) {
                    // can place top _ wall at x-1,y+1
                    if (debug) {
                        console.log('can place top _ wall at x-1,y+1');
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x - 1, pt.y + 1), facetmanagement_1.OrientationEnum.Top);
                    possibleNextPoints.push(nextpt);
                }
            }
            else if (pt.orientation === facetmanagement_1.OrientationEnum.Top) {
                // check rotate to left
                if (((pt.x - 1 >= 0 && facetResult.facetMap.get(pt.x - 1, pt.y) !== f.id) || pt.x - 1 < 0) &&
                    !xWall.get(pt.x, pt.y)) {
                    // can place left | wall at x,y
                    if (debug) {
                        console.log('can place left | wall at x,y');
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x, pt.y), facetmanagement_1.OrientationEnum.Left);
                    possibleNextPoints.push(nextpt);
                }
                // check rotate to right
                if (((pt.x + 1 < facetResult.width && facetResult.facetMap.get(pt.x + 1, pt.y) !== f.id) ||
                    pt.x + 1 >= facetResult.width) &&
                    !xWall.get(pt.x + 1, pt.y)) {
                    // can place right | wall at x,y
                    if (debug) {
                        console.log('can place right | wall at x,y');
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x, pt.y), facetmanagement_1.OrientationEnum.Right);
                    possibleNextPoints.push(nextpt);
                }
                // check leftwards
                if (pt.x - 1 >= 0 &&
                    facetResult.facetMap.get(pt.x - 1, pt.y) === f.id &&
                    (pt.y - 1 < 0 || facetResult.facetMap.get(pt.x - 1, pt.y - 1) !== f.id) &&
                    borderMask.get(pt.x - 1, pt.y) &&
                    !yWall.get(pt.x - 1, pt.y)) {
                    // can place top _ wall at x-1,y
                    if (debug) {
                        console.log("can place top _ wall at x-1,y");
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x - 1, pt.y), facetmanagement_1.OrientationEnum.Top);
                    possibleNextPoints.push(nextpt);
                }
                // check rightwards
                if (pt.x + 1 < facetResult.width &&
                    facetResult.facetMap.get(pt.x + 1, pt.y) === f.id &&
                    (pt.y - 1 < 0 || facetResult.facetMap.get(pt.x + 1, pt.y - 1) !== f.id) &&
                    borderMask.get(pt.x + 1, pt.y) &&
                    !yWall.get(pt.x + 1, pt.y)) {
                    // can place top _ wall at x+1,y
                    if (debug) {
                        console.log("can place top _ wall at x+1,y");
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x + 1, pt.y), facetmanagement_1.OrientationEnum.Top);
                    possibleNextPoints.push(nextpt);
                }
                // check left upwards
                if (pt.y - 1 >= 0 &&
                    pt.x - 1 >= 0 && // there is a left upwards
                    facetResult.facetMap.get(pt.x - 1, pt.y - 1) === f.id && // and it belongs to the same facet
                    borderMask.get(pt.x - 1, pt.y - 1) && // and it's part of the border
                    !xWall.get(pt.x - 1 + 1, pt.y - 1) && // the right wall isn't set yet
                    !xWall.get(pt.x, pt.y) // and the left wall of the current point isn't set yet to prevent |- path
                ) {
                    // can place right | wall at x-1,y-1
                    if (debug) {
                        console.log('can place right | wall at x-1,y-1');
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x - 1, pt.y - 1), facetmanagement_1.OrientationEnum.Right);
                    possibleNextPoints.push(nextpt);
                }
                // check right upwards
                if (pt.y - 1 >= 0 &&
                    pt.x + 1 < facetResult.width && // there is a right upwards
                    facetResult.facetMap.get(pt.x + 1, pt.y - 1) === f.id && // and it belongs to the same facet
                    borderMask.get(pt.x + 1, pt.y - 1) && // and it's on the border
                    !xWall.get(pt.x + 1, pt.y - 1) && // and the left wall isn't set yet
                    !xWall.get(pt.x + 1, pt.y) // and the right wall of the current point isn't set yet to prevent -| path
                ) {
                    // can place left |  wall at x+1,y-1
                    if (debug) {
                        console.log('can place left |  wall at x+1,y-1');
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x + 1, pt.y - 1), facetmanagement_1.OrientationEnum.Left);
                    possibleNextPoints.push(nextpt);
                }
            }
            else if (pt.orientation === facetmanagement_1.OrientationEnum.Right) {
                // check rotate to top
                if (((pt.y - 1 >= 0 && facetResult.facetMap.get(pt.x, pt.y - 1) !== f.id) || pt.y - 1 < 0) &&
                    !yWall.get(pt.x, pt.y)) {
                    // can place top _ wall at x,y
                    if (debug) {
                        console.log('can place top _ wall at x,y');
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x, pt.y), facetmanagement_1.OrientationEnum.Top);
                    possibleNextPoints.push(nextpt);
                }
                // check rotate to bottom
                if (((pt.y + 1 < facetResult.height && facetResult.facetMap.get(pt.x, pt.y + 1) !== f.id) ||
                    pt.y + 1 >= facetResult.height) &&
                    !yWall.get(pt.x, pt.y + 1)) {
                    // can place bottom  _ wall at x,y
                    if (debug) {
                        console.log('can place bottom _ wall at x,y');
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x, pt.y), facetmanagement_1.OrientationEnum.Bottom);
                    possibleNextPoints.push(nextpt);
                }
                // check upwards
                if (pt.y - 1 >= 0 &&
                    facetResult.facetMap.get(pt.x, pt.y - 1) === f.id &&
                    (pt.x + 1 >= facetResult.width ||
                        facetResult.facetMap.get(pt.x + 1, pt.y - 1) !== f.id) &&
                    borderMask.get(pt.x, pt.y - 1) &&
                    !xWall.get(pt.x + 1, pt.y - 1)) {
                    // can place right | wall at x,y-1
                    if (debug) {
                        console.log("can place right | wall at x,y-1");
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x, pt.y - 1), facetmanagement_1.OrientationEnum.Right);
                    possibleNextPoints.push(nextpt);
                }
                // check downwards
                if (pt.y + 1 < facetResult.height &&
                    facetResult.facetMap.get(pt.x, pt.y + 1) === f.id &&
                    (pt.x + 1 >= facetResult.width ||
                        facetResult.facetMap.get(pt.x + 1, pt.y + 1) !== f.id) &&
                    borderMask.get(pt.x, pt.y + 1) &&
                    !xWall.get(pt.x + 1, pt.y + 1)) {
                    // can place right | wall at x,y+1
                    if (debug) {
                        console.log('can place right | wall at x,y+1');
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x, pt.y + 1), facetmanagement_1.OrientationEnum.Right);
                    possibleNextPoints.push(nextpt);
                }
                // check right upwards
                if (pt.y - 1 >= 0 &&
                    pt.x + 1 < facetResult.width && // there is a right upwards
                    facetResult.facetMap.get(pt.x + 1, pt.y - 1) === f.id && // and belongs to the same facet
                    borderMask.get(pt.x + 1, pt.y - 1) && // and is on the border
                    !yWall.get(pt.x + 1, pt.y - 1 + 1) && // and the bottom wall isn't set yet
                    !yWall.get(pt.x, pt.y) // and the top wall of the current point isn't set to prevent a T shape
                ) {
                    // can place bottom _ wall at x+1,y-1
                    if (debug) {
                        console.log('can place bottom _ wall at x+1,y-1');
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x + 1, pt.y - 1), facetmanagement_1.OrientationEnum.Bottom);
                    possibleNextPoints.push(nextpt);
                }
                // check right downwards
                if (pt.y + 1 < facetResult.height &&
                    pt.x + 1 < facetResult.width && // there is a right downwards
                    facetResult.facetMap.get(pt.x + 1, pt.y + 1) === f.id && // and belongs to the same facet
                    borderMask.get(pt.x + 1, pt.y + 1) && // and is on the border
                    !yWall.get(pt.x + 1, pt.y + 1) && // and the top wall isn't visited yet
                    !yWall.get(pt.x, pt.y + 1) // and the bottom wall of the current point isn't set to prevent a T shape
                ) {
                    // can place top _ wall at x+1,y+1
                    if (debug) {
                        console.log('can place top _ wall at x+1,y+1');
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x + 1, pt.y + 1), facetmanagement_1.OrientationEnum.Top);
                    possibleNextPoints.push(nextpt);
                }
            }
            else if (pt.orientation === facetmanagement_1.OrientationEnum.Bottom) {
                // check rotate to left
                if (((pt.x - 1 >= 0 && facetResult.facetMap.get(pt.x - 1, pt.y) !== f.id) || pt.x - 1 < 0) &&
                    !xWall.get(pt.x, pt.y)) {
                    // can place left | wall at x,y
                    if (debug) {
                        console.log('can place left | wall at x,y');
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x, pt.y), facetmanagement_1.OrientationEnum.Left);
                    possibleNextPoints.push(nextpt);
                }
                // check rotate to right
                if (((pt.x + 1 < facetResult.width && facetResult.facetMap.get(pt.x + 1, pt.y) !== f.id) ||
                    pt.x + 1 >= facetResult.width) &&
                    !xWall.get(pt.x + 1, pt.y)) {
                    // can place right | wall at x,y
                    if (debug) {
                        console.log('can place right | wall at x,y');
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x, pt.y), facetmanagement_1.OrientationEnum.Right);
                    possibleNextPoints.push(nextpt);
                }
                // check leftwards
                if (pt.x - 1 >= 0 &&
                    facetResult.facetMap.get(pt.x - 1, pt.y) === f.id &&
                    (pt.y + 1 >= facetResult.height ||
                        facetResult.facetMap.get(pt.x - 1, pt.y + 1) !== f.id) &&
                    borderMask.get(pt.x - 1, pt.y) &&
                    !yWall.get(pt.x - 1, pt.y + 1)) {
                    // can place bottom _ wall at x-1,y
                    if (debug) {
                        console.log("can place bottom _ wall at x-1,y");
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x - 1, pt.y), facetmanagement_1.OrientationEnum.Bottom);
                    possibleNextPoints.push(nextpt);
                }
                // check rightwards
                if (pt.x + 1 < facetResult.width &&
                    facetResult.facetMap.get(pt.x + 1, pt.y) === f.id &&
                    (pt.y + 1 >= facetResult.height ||
                        facetResult.facetMap.get(pt.x + 1, pt.y + 1) !== f.id) &&
                    borderMask.get(pt.x + 1, pt.y) &&
                    !yWall.get(pt.x + 1, pt.y + 1)) {
                    // can place top _ wall at x+1,y
                    if (debug) {
                        console.log("can place bottom _ wall at x+1,y");
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x + 1, pt.y), facetmanagement_1.OrientationEnum.Bottom);
                    possibleNextPoints.push(nextpt);
                }
                // check left downwards
                if (pt.y + 1 < facetResult.height &&
                    pt.x - 1 >= 0 && // there is a left downwards
                    facetResult.facetMap.get(pt.x - 1, pt.y + 1) === f.id && // and it's the same facet
                    borderMask.get(pt.x - 1, pt.y + 1) && // and it's on the border
                    !xWall.get(pt.x - 1 + 1, pt.y + 1) && // and the right wall isn't set yet
                    !xWall.get(pt.x, pt.y) // and the left wall of the current point isn't set yet to prevent |- path
                ) {
                    // can place right | wall at x-1,y-1
                    if (debug) {
                        console.log('can place right | wall at x-1,y+1');
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x - 1, pt.y + 1), facetmanagement_1.OrientationEnum.Right);
                    possibleNextPoints.push(nextpt);
                }
                // check right downwards
                if (pt.y + 1 < facetResult.height &&
                    pt.x + 1 < facetResult.width && // there is a right downwards
                    facetResult.facetMap.get(pt.x + 1, pt.y + 1) === f.id && // and it's the same facet
                    borderMask.get(pt.x + 1, pt.y + 1) && // and it's on the border
                    !xWall.get(pt.x + 1, pt.y + 1) && // and the left wall isn't set yet
                    !xWall.get(pt.x + 1, pt.y) // and the right wall of the current point isn't set yet to prevent -| path
                ) {
                    // can place left |  wall at x+1,y+1
                    if (debug) {
                        console.log('can place left |  wall at x+1,y+1');
                    }
                    var nextpt = new facetmanagement_1.PathPoint(new point_1.Point(pt.x + 1, pt.y + 1), facetmanagement_1.OrientationEnum.Left);
                    possibleNextPoints.push(nextpt);
                }
            }
            if (possibleNextPoints.length > 1) {
                // TODO it's now not necessary anymore to aggregate all possibilities, the first one is going to be the correct
                // selection to trace the entire border, so the if checks above can include a skip once ssible point is found again
                pt = possibleNextPoints[0];
                FacetBorderTracer.addPointToPath(path, pt, xWall, f, yWall);
            }
            else if (possibleNextPoints.length === 1) {
                pt = possibleNextPoints[0];
                FacetBorderTracer.addPointToPath(path, pt, xWall, f, yWall);
            }
            else {
                finished = true;
            }
        }
        // clear up the walls set for the path so the array can be reused
        for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
            var pathPoint = path_1[_i];
            switch (pathPoint.orientation) {
                case facetmanagement_1.OrientationEnum.Left:
                    xWall.set(pathPoint.x, pathPoint.y, false);
                    break;
                case facetmanagement_1.OrientationEnum.Top:
                    yWall.set(pathPoint.x, pathPoint.y, false);
                    break;
                case facetmanagement_1.OrientationEnum.Right:
                    xWall.set(pathPoint.x + 1, pathPoint.y, false);
                    break;
                case facetmanagement_1.OrientationEnum.Bottom:
                    yWall.set(pathPoint.x, pathPoint.y + 1, false);
                    break;
            }
        }
        return path;
    };
    /**
     * Add a point to the border path and ensure the correct xWall/yWalls is set
     */
    FacetBorderTracer.addPointToPath = function (path, pt, xWall, f, yWall) {
        path.push(pt);
        switch (pt.orientation) {
            case facetmanagement_1.OrientationEnum.Left:
                xWall.set(pt.x, pt.y, true);
                break;
            case facetmanagement_1.OrientationEnum.Top:
                yWall.set(pt.x, pt.y, true);
                break;
            case facetmanagement_1.OrientationEnum.Right:
                xWall.set(pt.x + 1, pt.y, true);
                break;
            case facetmanagement_1.OrientationEnum.Bottom:
                yWall.set(pt.x, pt.y + 1, true);
                break;
        }
    };
    return FacetBorderTracer;
}());
exports.FacetBorderTracer = FacetBorderTracer;
//# sourceMappingURL=facetBorderTracer.js.map