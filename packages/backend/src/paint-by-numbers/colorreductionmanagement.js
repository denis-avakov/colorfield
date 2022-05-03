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
exports.ColorReducer = exports.ColorMapResult = void 0;
/**
 * Color reduction management of the process: clustering to reduce colors & creating color map
 */
var common_1 = require("./common");
var clustering_1 = require("./lib/clustering");
var colorconversion_1 = require("./lib/colorconversion");
var settings_1 = require("./settings");
var typedarrays_1 = require("./structs/typedarrays");
var random_1 = require("./random");
var ColorMapResult = /** @class */ (function () {
    function ColorMapResult() {
    }
    return ColorMapResult;
}());
exports.ColorMapResult = ColorMapResult;
var ColorReducer = /** @class */ (function () {
    function ColorReducer() {
    }
    /**
     *  Creates a map of the various colors used
     */
    ColorReducer.createColorMap = function (kmeansImgData) {
        var imgColorIndices = new typedarrays_1.Uint8Array2D(kmeansImgData.width, kmeansImgData.height);
        var colorIndex = 0;
        var colors = {};
        var colorsByIndex = [];
        var idx = 0;
        for (var j = 0; j < kmeansImgData.height; j++) {
            for (var i = 0; i < kmeansImgData.width; i++) {
                var r = kmeansImgData.data[idx++];
                var g = kmeansImgData.data[idx++];
                var b = kmeansImgData.data[idx++];
                var a = kmeansImgData.data[idx++];
                var currentColorIndex = void 0;
                var color = r + ',' + g + ',' + b;
                if (typeof colors[color] === 'undefined') {
                    currentColorIndex = colorIndex;
                    colors[color] = colorIndex;
                    colorsByIndex.push([r, g, b]);
                    colorIndex++;
                }
                else {
                    currentColorIndex = colors[color];
                }
                imgColorIndices.set(i, j, currentColorIndex);
            }
        }
        var result = new ColorMapResult();
        result.imgColorIndices = imgColorIndices;
        result.colorsByIndex = colorsByIndex;
        result.width = kmeansImgData.width;
        result.height = kmeansImgData.height;
        return result;
    };
    /**
     *  Applies K-means clustering on the imgData to reduce the colors to
     *  k clusters and then output the result to the given outputImgData
     */
    ColorReducer.applyKMeansClustering = function (imgData, outputImgData, ctx, settings, onUpdate) {
        if (onUpdate === void 0) { onUpdate = null; }
        return __awaiter(this, void 0, void 0, function () {
            var vectors, idx, vIdx, bitsToChopOff, pointsByColor, j, i, r, g, b, a, color, _i, _a, color, rgb, data, weight, vec, random, kmeans, curTime;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        vectors = [];
                        idx = 0;
                        vIdx = 0;
                        bitsToChopOff = 2;
                        pointsByColor = {};
                        for (j = 0; j < imgData.height; j++) {
                            for (i = 0; i < imgData.width; i++) {
                                r = imgData.data[idx++];
                                g = imgData.data[idx++];
                                b = imgData.data[idx++];
                                a = imgData.data[idx++];
                                // small performance boost: reduce bitness of colors by chopping off the last bits
                                // this will group more colors with only slight variation in color together, reducing the size of the points
                                r = (r >> bitsToChopOff) << bitsToChopOff;
                                g = (g >> bitsToChopOff) << bitsToChopOff;
                                b = (b >> bitsToChopOff) << bitsToChopOff;
                                color = "".concat(r, ",").concat(g, ",").concat(b);
                                if (!(color in pointsByColor)) {
                                    pointsByColor[color] = [j * imgData.width + i];
                                }
                                else {
                                    pointsByColor[color].push(j * imgData.width + i);
                                }
                            }
                        }
                        for (_i = 0, _a = Object.keys(pointsByColor); _i < _a.length; _i++) {
                            color = _a[_i];
                            rgb = color.split(',').map(function (v) { return parseInt(v); });
                            data = void 0;
                            if (settings.kMeansClusteringColorSpace === settings_1.ClusteringColorSpace.RGB) {
                                data = rgb;
                            }
                            else if (settings.kMeansClusteringColorSpace === settings_1.ClusteringColorSpace.HSL) {
                                data = (0, colorconversion_1.rgbToHsl)(rgb[0], rgb[1], rgb[2]);
                            }
                            else if (settings.kMeansClusteringColorSpace === settings_1.ClusteringColorSpace.LAB) {
                                data = (0, colorconversion_1.rgb2lab)(rgb);
                            }
                            else {
                                data = rgb;
                            }
                            weight = pointsByColor[color].length / (imgData.width * imgData.height);
                            vec = new clustering_1.Vector(data, weight);
                            vec.tag = rgb;
                            vectors[vIdx++] = vec;
                        }
                        random = new random_1.Random(settings.randomSeed === 0 ? new Date().getTime() : settings.randomSeed);
                        kmeans = new clustering_1.KMeans(vectors, settings.kMeansNrOfClusters, random);
                        curTime = new Date().getTime();
                        kmeans.step();
                        _b.label = 1;
                    case 1:
                        if (!(kmeans.currentDeltaDistanceDifference > settings.kMeansMinDeltaDifference)) return [3 /*break*/, 4];
                        kmeans.step();
                        if (!(new Date().getTime() - curTime > 500)) return [3 /*break*/, 3];
                        curTime = new Date().getTime();
                        return [4 /*yield*/, (0, common_1.delay)(0)];
                    case 2:
                        _b.sent();
                        if (onUpdate != null) {
                            ColorReducer.updateKmeansOutputImageData(kmeans, settings, pointsByColor, imgData, outputImgData, false);
                            onUpdate(kmeans);
                        }
                        _b.label = 3;
                    case 3: return [3 /*break*/, 1];
                    case 4:
                        // update the output image data (because it will be used for further processing)
                        ColorReducer.updateKmeansOutputImageData(kmeans, settings, pointsByColor, imgData, outputImgData, true);
                        if (onUpdate != null) {
                            onUpdate(kmeans);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *  Updates the image data from the current kmeans centroids and their respective associated colors (vectors)
     */
    ColorReducer.updateKmeansOutputImageData = function (kmeans, settings, pointsByColor, imgData, outputImgData, restrictToSpecifiedColors) {
        for (var c = 0; c < kmeans.centroids.length; c++) {
            // for each cluster centroid
            var centroid = kmeans.centroids[c];
            // points per category are the different unique colors belonging to that cluster
            for (var _i = 0, _a = kmeans.pointsPerCategory[c]; _i < _a.length; _i++) {
                var v = _a[_i];
                // determine the rgb color value of the cluster centroid
                var rgb = void 0;
                if (settings.kMeansClusteringColorSpace === settings_1.ClusteringColorSpace.RGB) {
                    rgb = centroid.values;
                }
                else if (settings.kMeansClusteringColorSpace === settings_1.ClusteringColorSpace.HSL) {
                    var hsl = centroid.values;
                    rgb = (0, colorconversion_1.hslToRgb)(hsl[0], hsl[1], hsl[2]);
                }
                else if (settings.kMeansClusteringColorSpace === settings_1.ClusteringColorSpace.LAB) {
                    var lab = centroid.values;
                    rgb = (0, colorconversion_1.lab2rgb)(lab);
                }
                else {
                    rgb = centroid.values;
                }
                // remove decimals
                rgb = rgb.map(function (v) { return Math.floor(v); });
                if (restrictToSpecifiedColors) {
                    if (settings.kMeansColorRestrictions.length > 0) {
                        // there are color restrictions, for each centroid find the color from the color restrictions that's the closest
                        var minDistance = Number.MAX_VALUE;
                        var closestRestrictedColor = null;
                        for (var _b = 0, _c = settings.kMeansColorRestrictions; _b < _c.length; _b++) {
                            var color = _c[_b];
                            // RGB distance is not very good for the human eye perception, convert both to lab and then calculate the distance
                            var centroidLab = (0, colorconversion_1.rgb2lab)(rgb);
                            var restrictionLab = void 0;
                            if (typeof color === 'string') {
                                restrictionLab = (0, colorconversion_1.rgb2lab)(settings.colorAliases[color]);
                            }
                            else {
                                restrictionLab = (0, colorconversion_1.rgb2lab)(color);
                            }
                            var distance = Math.sqrt((centroidLab[0] - restrictionLab[0]) * (centroidLab[0] - restrictionLab[0]) +
                                (centroidLab[1] - restrictionLab[1]) * (centroidLab[1] - restrictionLab[1]) +
                                (centroidLab[2] - restrictionLab[2]) * (centroidLab[2] - restrictionLab[2]));
                            if (distance < minDistance) {
                                minDistance = distance;
                                closestRestrictedColor = color;
                            }
                        }
                        // use this color instead
                        if (closestRestrictedColor !== null) {
                            if (typeof closestRestrictedColor === 'string') {
                                rgb = settings.colorAliases[closestRestrictedColor];
                            }
                            else {
                                rgb = closestRestrictedColor;
                            }
                        }
                    }
                }
                var pointRGB = v.tag;
                // replace all pixels of the old color by the new centroid color
                var pointColor = "".concat(Math.floor(pointRGB[0]), ",").concat(Math.floor(pointRGB[1]), ",").concat(Math.floor(pointRGB[2]));
                for (var _d = 0, _e = pointsByColor[pointColor]; _d < _e.length; _d++) {
                    var pt = _e[_d];
                    var ptx = pt % imgData.width;
                    var pty = Math.floor(pt / imgData.width);
                    var dataOffset = (pty * imgData.width + ptx) * 4;
                    outputImgData.data[dataOffset++] = rgb[0];
                    outputImgData.data[dataOffset++] = rgb[1];
                    outputImgData.data[dataOffset++] = rgb[2];
                }
            }
        }
    };
    /**
     *  Builds a distance matrix for each color to each other
     */
    ColorReducer.buildColorDistanceMatrix = function (colorsByIndex) {
        var colorDistances = new Array(colorsByIndex.length);
        for (var j = 0; j < colorsByIndex.length; j++) {
            colorDistances[j] = new Array(colorDistances.length);
        }
        for (var j = 0; j < colorsByIndex.length; j++) {
            for (var i = j; i < colorsByIndex.length; i++) {
                var c1 = colorsByIndex[j];
                var c2 = colorsByIndex[i];
                var distance = Math.sqrt((c1[0] - c2[0]) * (c1[0] - c2[0]) +
                    (c1[1] - c2[1]) * (c1[1] - c2[1]) +
                    (c1[2] - c2[2]) * (c1[2] - c2[2]));
                colorDistances[i][j] = distance;
                colorDistances[j][i] = distance;
            }
        }
        return colorDistances;
    };
    ColorReducer.processNarrowPixelStripCleanup = function (colormapResult) {
        return __awaiter(this, void 0, void 0, function () {
            var colorDistances, count, imgColorIndices, j, i, top_1, bottom, left, right, cur, topColorDistance, bottomColorDistance, leftColorDistance, rightColorDistance;
            return __generator(this, function (_a) {
                colorDistances = ColorReducer.buildColorDistanceMatrix(colormapResult.colorsByIndex);
                count = 0;
                imgColorIndices = colormapResult.imgColorIndices;
                for (j = 1; j < colormapResult.height - 1; j++) {
                    for (i = 1; i < colormapResult.width - 1; i++) {
                        top_1 = imgColorIndices.get(i, j - 1);
                        bottom = imgColorIndices.get(i, j + 1);
                        left = imgColorIndices.get(i - 1, j);
                        right = imgColorIndices.get(i + 1, j);
                        cur = imgColorIndices.get(i, j);
                        if (cur !== top_1 && cur !== bottom && cur !== left && cur !== right) {
                            // single pixel
                        }
                        else if (cur !== top_1 && cur !== bottom) {
                            topColorDistance = colorDistances[cur][top_1];
                            bottomColorDistance = colorDistances[cur][bottom];
                            imgColorIndices.set(i, j, topColorDistance < bottomColorDistance ? top_1 : bottom);
                            count++;
                        }
                        else if (cur !== left && cur !== right) {
                            leftColorDistance = colorDistances[cur][left];
                            rightColorDistance = colorDistances[cur][right];
                            imgColorIndices.set(i, j, leftColorDistance < rightColorDistance ? left : right);
                            count++;
                        }
                    }
                }
                console.log(count + ' pixels replaced to remove narrow pixel strips');
                return [2 /*return*/];
            });
        });
    };
    return ColorReducer;
}());
exports.ColorReducer = ColorReducer;
//# sourceMappingURL=colorreductionmanagement.js.map