"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueue = exports.Map = void 0;
var Map = /** @class */ (function () {
    function Map() {
        this.obj = {};
    }
    Map.prototype.containsKey = function (key) {
        return key in this.obj;
    };
    Map.prototype.getKeys = function () {
        var keys = [];
        for (var el in this.obj) {
            if (this.obj.hasOwnProperty(el)) {
                keys.push(el);
            }
        }
        return keys;
    };
    Map.prototype.get = function (key) {
        var o = this.obj[key];
        if (typeof o === 'undefined') {
            return null;
        }
        else {
            return o;
        }
    };
    Map.prototype.put = function (key, value) {
        this.obj[key] = value;
    };
    Map.prototype.remove = function (key) {
        delete this.obj[key];
    };
    Map.prototype.clone = function () {
        var m = new Map();
        m.obj = {};
        for (var p in this.obj) {
            m.obj[p] = this.obj[p];
        }
        return m;
    };
    return Map;
}());
exports.Map = Map;
var Heap = /** @class */ (function () {
    function Heap() {
        this.array = [];
        this.keyMap = new Map();
    }
    Heap.prototype.add = function (obj) {
        if (this.keyMap.containsKey(obj.getKey())) {
            throw new Error('Item with key ' + obj.getKey() + ' already exists in the heap');
        }
        this.array.push(obj);
        this.keyMap.put(obj.getKey(), this.array.length - 1);
        this.checkParentRequirement(this.array.length - 1);
    };
    Heap.prototype.replaceAt = function (idx, newobj) {
        this.array[idx] = newobj;
        this.keyMap.put(newobj.getKey(), idx);
        this.checkParentRequirement(idx);
        this.checkChildrenRequirement(idx);
    };
    Heap.prototype.shift = function () {
        return this.removeAt(0);
    };
    Heap.prototype.remove = function (obj) {
        var idx = this.keyMap.get(obj.getKey());
        if (idx === -1) {
            return;
        }
        this.removeAt(idx);
    };
    Heap.prototype.removeWhere = function (predicate) {
        var itemsToRemove = [];
        for (var i = this.array.length - 1; i >= 0; i--) {
            if (predicate(this.array[i])) {
                itemsToRemove.push(this.array[i]);
            }
        }
        for (var _i = 0, itemsToRemove_1 = itemsToRemove; _i < itemsToRemove_1.length; _i++) {
            var el = itemsToRemove_1[_i];
            this.remove(el);
        }
        for (var _a = 0, _b = this.array; _a < _b.length; _a++) {
            var el = _b[_a];
            if (predicate(el)) {
                console.log('Idx of element not removed: ' + this.keyMap.get(el.getKey()));
                throw new Error('element not removed: ' + el.getKey());
            }
        }
    };
    Heap.prototype.removeAt = function (idx) {
        var obj = this.array[idx];
        this.keyMap.remove(obj.getKey());
        var isLastElement = idx === this.array.length - 1;
        if (this.array.length > 0) {
            var newobj = this.array.pop();
            if (!isLastElement && this.array.length > 0) {
                this.replaceAt(idx, newobj);
            }
        }
        return obj;
    };
    Heap.prototype.foreach = function (func) {
        var arr = this.array.sort(function (e, e2) { return e.compareTo(e2); });
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var el = arr_1[_i];
            func(el);
        }
    };
    Heap.prototype.peek = function () {
        return this.array[0];
    };
    Heap.prototype.contains = function (key) {
        return this.keyMap.containsKey(key);
    };
    Heap.prototype.at = function (key) {
        var obj = this.keyMap.get(key);
        if (typeof obj === 'undefined') {
            return null;
        }
        else {
            return this.array[obj];
        }
    };
    Heap.prototype.size = function () {
        return this.array.length;
    };
    Heap.prototype.checkHeapRequirement = function (item) {
        var idx = this.keyMap.get(item.getKey());
        if (idx != null) {
            this.checkParentRequirement(idx);
            this.checkChildrenRequirement(idx);
        }
    };
    Heap.prototype.checkChildrenRequirement = function (idx) {
        var stop = false;
        while (!stop) {
            var left = this.getLeftChildIndex(idx);
            var right = left === -1 ? -1 : left + 1;
            if (left === -1) {
                return;
            }
            if (right >= this.size()) {
                right = -1;
            }
            var minIdx = void 0;
            if (right === -1) {
                minIdx = left;
            }
            else {
                minIdx = this.array[left].compareTo(this.array[right]) < 0 ? left : right;
            }
            if (this.array[idx].compareTo(this.array[minIdx]) > 0) {
                this.swap(idx, minIdx);
                idx = minIdx; // iteratively instead of recursion for this.checkChildrenRequirement(minIdx);
            }
            else {
                stop = true;
            }
        }
    };
    Heap.prototype.checkParentRequirement = function (idx) {
        var curIdx = idx;
        var parentIdx = Heap.getParentIndex(curIdx);
        while (parentIdx >= 0 && this.array[parentIdx].compareTo(this.array[curIdx]) > 0) {
            this.swap(curIdx, parentIdx);
            curIdx = parentIdx;
            parentIdx = Heap.getParentIndex(curIdx);
        }
    };
    Heap.prototype.dump = function () {
        if (this.size() === 0) {
            return;
        }
        var idx = 0;
        var leftIdx = this.getLeftChildIndex(idx);
        var rightIdx = leftIdx + 1;
        console.log(this.array);
        console.log('--- keymap ---');
        console.log(this.keyMap);
    };
    Heap.prototype.swap = function (i, j) {
        this.keyMap.put(this.array[i].getKey(), j);
        this.keyMap.put(this.array[j].getKey(), i);
        var tmp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = tmp;
    };
    Heap.prototype.getLeftChildIndex = function (curIdx) {
        var idx = (curIdx + 1) * 2 - 1;
        if (idx >= this.array.length) {
            return -1;
        }
        else {
            return idx;
        }
    };
    Heap.getParentIndex = function (curIdx) {
        if (curIdx === 0) {
            return -1;
        }
        return Math.floor((curIdx + 1) / 2) - 1;
    };
    Heap.prototype.clone = function () {
        var h = new Heap();
        h.array = this.array.slice(0);
        h.keyMap = this.keyMap.clone();
        return h;
    };
    return Heap;
}());
var PriorityQueue = /** @class */ (function () {
    function PriorityQueue() {
        this.heap = new Heap();
    }
    PriorityQueue.prototype.enqueue = function (obj) {
        this.heap.add(obj);
    };
    PriorityQueue.prototype.peek = function () {
        return this.heap.peek();
    };
    PriorityQueue.prototype.updatePriority = function (key) {
        this.heap.checkHeapRequirement(key);
    };
    PriorityQueue.prototype.get = function (key) {
        return this.heap.at(key);
    };
    Object.defineProperty(PriorityQueue.prototype, "size", {
        get: function () {
            return this.heap.size();
        },
        enumerable: false,
        configurable: true
    });
    PriorityQueue.prototype.dequeue = function () {
        return this.heap.shift();
    };
    PriorityQueue.prototype.dump = function () {
        this.heap.dump();
    };
    PriorityQueue.prototype.contains = function (key) {
        return this.heap.contains(key);
    };
    PriorityQueue.prototype.removeWhere = function (predicate) {
        this.heap.removeWhere(predicate);
    };
    PriorityQueue.prototype.foreach = function (func) {
        this.heap.foreach(func);
    };
    PriorityQueue.prototype.clone = function () {
        var p = new PriorityQueue();
        p.heap = this.heap.clone();
        return p;
    };
    return PriorityQueue;
}());
exports.PriorityQueue = PriorityQueue;
//# sourceMappingURL=datastructs.js.map