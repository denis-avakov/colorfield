"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = exports.ClusteringColorSpace = void 0;
var ClusteringColorSpace;
(function (ClusteringColorSpace) {
    ClusteringColorSpace[ClusteringColorSpace["RGB"] = 0] = "RGB";
    ClusteringColorSpace[ClusteringColorSpace["HSL"] = 1] = "HSL";
    ClusteringColorSpace[ClusteringColorSpace["LAB"] = 2] = "LAB";
})(ClusteringColorSpace = exports.ClusteringColorSpace || (exports.ClusteringColorSpace = {}));
var Settings = /** @class */ (function () {
    function Settings() {
        this.kMeansNrOfClusters = 16;
        this.kMeansMinDeltaDifference = 1;
        this.kMeansClusteringColorSpace = ClusteringColorSpace.RGB;
        this.kMeansColorRestrictions = [];
        this.colorAliases = {};
        this.narrowPixelStripCleanupRuns = 3; // 3 seems like a good compromise between removing enough narrow pixel strips to convergence. This fixes e.g. https://i.imgur.com/dz4ANz1.png
        this.removeFacetsSmallerThanNrOfPoints = 20;
        this.removeFacetsFromLargeToSmall = true;
        this.maximumNumberOfFacets = Number.MAX_VALUE;
        this.nrOfTimesToHalveBorderSegments = 2;
        this.resizeImageIfTooLarge = true;
        this.resizeImageWidth = 1024;
        this.resizeImageHeight = 1024;
        this.randomSeed = new Date().getTime();
    }
    return Settings;
}());
exports.Settings = Settings;
//# sourceMappingURL=settings.js.map