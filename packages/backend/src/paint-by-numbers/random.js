"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
var Random = /** @class */ (function () {
    function Random(seed) {
        if (typeof seed === 'undefined') {
            this.seed = new Date().getTime();
        }
        else {
            this.seed = seed;
        }
    }
    Random.prototype.next = function () {
        var x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    };
    return Random;
}());
exports.Random = Random;
//# sourceMappingURL=random.js.map