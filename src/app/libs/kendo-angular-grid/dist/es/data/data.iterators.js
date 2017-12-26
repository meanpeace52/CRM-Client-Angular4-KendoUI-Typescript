import * as tslib_1 from "tslib";
/* tslint:disable:use-life-cycle-interface */
import { $$iterator } from 'rxjs/symbol/iterator';
import { isPresent } from '../utils';
var isGroupItem = function (source) {
    return source.items !== undefined &&
        source.field !== undefined;
};
var isVirtualGroupItem = function (source) {
    return source.offset !== undefined &&
        source.skipHeader !== undefined;
};
var flattenGroups = function (groups) { return (groups.reduce(function (acc, curr) {
    if (isGroupItem(curr)) {
        return acc.concat(flattenGroups(curr.items));
    }
    return acc.concat([curr]);
}, []) // tslint:disable-line:align
); };
/**
 * @hidden
 */
export var itemAt = function (data, index) {
    var first = data[0];
    if (isPresent(first) && isGroupItem(first)) {
        return flattenGroups(data)[index];
    }
    return data[index];
};
/**
 * @hidden
 */
export var getIterator = function (data, _a) {
    var footers = _a.footers, level = _a.level, dataIndex = _a.dataIndex, parentGroupIndex = _a.parentGroupIndex, groupIndex = _a.groupIndex;
    var first = data[0];
    if (isPresent(first) && isGroupItem(first)) {
        if (isVirtualGroupItem(first)) {
            groupIndex = isPresent(first.offset) ? first.offset : groupIndex;
        }
        //tslint:disable-next-line:no-use-before-declare
        return new GroupIterator(data, footers, level, dataIndex, parentGroupIndex, groupIndex);
    }
    //tslint:disable-next-line:no-use-before-declare
    return new ItemIterator(data, dataIndex, parentGroupIndex);
};
var ArrayIterator = (function () {
    function ArrayIterator(arr, idx) {
        if (idx === void 0) { idx = 0; }
        this.arr = arr;
        this.idx = idx;
        this.arr = arr || [];
    }
    ArrayIterator.prototype[$$iterator] = function () {
        return this;
    };
    ArrayIterator.prototype.next = function () {
        return this.idx < this.arr.length ? {
            done: false,
            value: this.arr[this.idx++]
        } : { done: true, value: undefined };
    };
    return ArrayIterator;
}());
/**
 * @hidden
 */
var Iterator = (function () {
    function Iterator(arr, dataIndex, resultMap) {
        if (dataIndex === void 0) { dataIndex = 0; }
        if (resultMap === void 0) { resultMap = function (x) { return x; }; }
        this.dataIndex = dataIndex;
        this.resultMap = resultMap;
        var iterator = arr[$$iterator];
        this._innerIterator = iterator ? arr[$$iterator]() : new ArrayIterator(arr);
    }
    Iterator.prototype[$$iterator] = function () {
        return this;
    };
    Iterator.prototype.next = function () {
        return this.resultMap(this._innerIterator.next(), this.dataIndex++);
    };
    return Iterator;
}());
export { Iterator };
/**
 * @hidden
 */
var ItemIterator = (function (_super) {
    tslib_1.__extends(ItemIterator, _super);
    function ItemIterator(arr, dataIndex, groupIndex) {
        return _super.call(this, arr, dataIndex, function (x, idx) { return ({
            done: x.done,
            value: {
                data: x.value,
                groupIndex: groupIndex,
                index: idx,
                type: 'data'
            }
        }); }) || this;
    }
    Object.defineProperty(ItemIterator.prototype, "index", {
        /**
         * The index of the next record.
         * @readonly
         * @type {number}
         */
        get: function () {
            return this.dataIndex;
        },
        enumerable: true,
        configurable: true
    });
    return ItemIterator;
}(Iterator));
export { ItemIterator };
var prefix = function (s, n) {
    var p = s ? s + "_" : s;
    return "" + p + n;
};
/**
 * @hidden
 */
var GroupIterator = (function () {
    function GroupIterator(arr, outputFooters, level, dataIndex, parentIndex, groupIndex) {
        if (outputFooters === void 0) { outputFooters = false; }
        if (level === void 0) { level = 0; }
        if (dataIndex === void 0) { dataIndex = 0; }
        if (parentIndex === void 0) { parentIndex = ""; }
        if (groupIndex === void 0) { groupIndex = 0; }
        this.arr = arr;
        this.outputFooters = outputFooters;
        this.level = level;
        this.dataIndex = dataIndex;
        this.parentIndex = parentIndex;
        this.groupIndex = groupIndex;
        this.currentGroupIndex = "";
        this.arr = arr || [];
        this._iterator = new Iterator(this.arr, this.dataIndex);
    }
    GroupIterator.prototype[$$iterator] = function () {
        return this;
    };
    GroupIterator.prototype.nextGroupItem = function () {
        this.current = this._iterator.next().value;
        this._innerIterator = null;
        if (this.current) {
            this.currentGroupIndex = prefix(this.parentIndex, this.groupIndex++);
            return {
                done: false,
                value: {
                    data: this.current,
                    index: this.currentGroupIndex,
                    level: this.level,
                    type: 'group'
                }
            };
        }
        else {
            this.current = null;
            return { done: true, value: undefined };
        }
    };
    GroupIterator.prototype.footerItem = function () {
        if (this.current) {
            var group = this.current;
            this.current = null;
            return {
                done: false,
                value: {
                    data: group,
                    groupIndex: this.currentGroupIndex,
                    level: this.level,
                    type: 'footer'
                }
            };
        }
        else {
            this.current = null;
            return { done: true, value: undefined };
        }
    };
    GroupIterator.prototype.innerIterator = function (group) {
        if (!this._innerIterator) {
            this._innerIterator = getIterator(group.items, {
                dataIndex: this.dataIndex,
                footers: this.outputFooters,
                level: this.level + 1,
                parentGroupIndex: this.currentGroupIndex
            });
        }
        return this._innerIterator;
    };
    GroupIterator.prototype.nextDataItem = function (group) {
        var iterator = this.innerIterator(group);
        var currentIndex = iterator.index;
        var result = iterator.next();
        if (isPresent(result.value) && result.value.type !== "footer") {
            this.dataIndex = currentIndex;
        }
        return !result.done ? result : undefined;
    };
    GroupIterator.prototype.next = function () {
        if (!isPresent(this.current)) {
            return this.nextGroupItem();
        }
        var item = this.nextDataItem(this.current);
        return item ? item : (this.outputFooters ? this.footerItem() : this.nextGroupItem());
    };
    Object.defineProperty(GroupIterator.prototype, "index", {
        /**
         * The index of the last iterated data record.
         * @readonly
         * @type {number}
         */
        get: function () {
            return this.dataIndex + 1;
        },
        enumerable: true,
        configurable: true
    });
    return GroupIterator;
}());
export { GroupIterator };
