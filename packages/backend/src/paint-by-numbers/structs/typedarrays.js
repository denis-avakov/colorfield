"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanArray2D = exports.Uint8Array2D = exports.Uint32Array2D = void 0;
var Uint32Array2D = /** @class */ (function () {
    function Uint32Array2D(width, height) {
        this.width = width;
        this.height = height;
        this.arr = new Uint32Array(width * height);
    }
    Uint32Array2D.prototype.get = function (x, y) {
        return this.arr[y * this.width + x];
    };
    Uint32Array2D.prototype.set = function (x, y, value) {
        this.arr[y * this.width + x] = value;
    };
    return Uint32Array2D;
}());
exports.Uint32Array2D = Uint32Array2D;
var Uint8Array2D = /** @class */ (function () {
    function Uint8Array2D(width, height) {
        this.width = width;
        this.height = height;
        this.arr = new Uint8Array(width * height);
    }
    Uint8Array2D.prototype.get = function (x, y) {
        return this.arr[y * this.width + x];
    };
    Uint8Array2D.prototype.set = function (x, y, value) {
        this.arr[y * this.width + x] = value;
    };
    Uint8Array2D.prototype.matchAllAround = function (x, y, value) {
        var idx = y * this.width + x;
        return (x - 1 >= 0 &&
            this.arr[idx - 1] === value &&
            y - 1 >= 0 &&
            this.arr[idx - this.width] === value &&
            x + 1 < this.width &&
            this.arr[idx + 1] === value &&
            y + 1 < this.height &&
            this.arr[idx + this.width] === value);
    };
    return Uint8Array2D;
}());
exports.Uint8Array2D = Uint8Array2D;
var BooleanArray2D = /** @class */ (function () {
    function BooleanArray2D(width, height) {
        this.width = width;
        this.height = height;
        this.arr = new Uint8Array(width * height);
    }
    BooleanArray2D.prototype.get = function (x, y) {
        return this.arr[y * this.width + x] !== 0;
    };
    BooleanArray2D.prototype.set = function (x, y, value) {
        this.arr[y * this.width + x] = value ? 1 : 0;
    };
    return BooleanArray2D;
}());
exports.BooleanArray2D = BooleanArray2D;
//# sourceMappingURL=typedarrays.js.map