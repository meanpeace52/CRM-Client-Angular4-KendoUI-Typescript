"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var column_base_1 = require("./column-base");
var column_common_1 = require("./column-common");
/**
 * @hidden
 */
function isColumnGroupComponent(column) {
    return column.isColumnGroup;
}
exports.isColumnGroupComponent = isColumnGroupComponent;
/**
 * Represents the column-group header of the Grid.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *     <kendo-grid [data]="gridData">
 *       <kendo-grid-column-group title="Product Info">
 *         <ng-template kendoGridHeaderTemplate let-columnIndex="columnIndex" let-column="column">
 *               Column index: {{columnIndex}} / column title: {{column.title}}
 *         </ng-template>
 *         <kendo-grid-column field="ProductID" title="Product ID" width="120">
 *         </kendo-grid-column>
 *         <kendo-grid-column field="ProductName" title="Product Name">
 *         </kendo-grid-column>
 *       </kendo-grid-column-group>
 *       <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
 *       </kendo-grid-column>
 *       <kendo-grid-column field="Discontinued" width="120">
 *           <ng-template kendoGridCellTemplate let-dataItem>
 *               <input type="checkbox" [checked]="dataItem.Discontinued" disabled/>
 *           </ng-template>
 *       </kendo-grid-column>
 *     </kendo-grid>
 *    `
 * })
 *
 * class AppComponent {
 *    private gridData: any[];
 *
 *    constructor() {
 *        this.gridData = products;
 *    }
 * }
 *
 * const products = [{
 *    "ProductID": 1,
 *    "ProductName": "Chai",
 *    "UnitPrice": 18.0000,
 *    "Discontinued": true
 *  }, {
 *    "ProductID": 2,
 *    "ProductName": "Chang",
 *    "UnitPrice": 19.0000,
 *    "Discontinued": false
 *  }
 * ];
 *
 * ```
 */
var ColumnGroupComponent = (function (_super) {
    tslib_1.__extends(ColumnGroupComponent, _super);
    function ColumnGroupComponent(parent) {
        var _this = _super.call(this, parent) || this;
        _this.parent = parent;
        /**
         * @hidden
         */
        _this.isColumnGroup = true;
        /**
         * @hidden
         */
        _this.minResizableWidth = 10;
        if (parent && parent.isSpanColumn) {
            throw new Error('ColumnGroupComponent cannot be nested inside SpanColumnComponent');
        }
        return _this;
    }
    /**
     * @hidden
     */
    ColumnGroupComponent.prototype.rowspan = function () {
        return 1;
    };
    Object.defineProperty(ColumnGroupComponent.prototype, "colspan", {
        /**
         * @hidden
         */
        get: function () {
            var _this = this;
            if (!this.children || this.children.length === 1) {
                return 1;
            }
            return column_common_1.columnsSpan(this.children
                .filter(function (child) { return child !== _this && !child.hidden; }));
        },
        enumerable: true,
        configurable: true
    });
    return ColumnGroupComponent;
}(column_base_1.ColumnBase));
ColumnGroupComponent.decorators = [
    { type: core_1.Component, args: [{
                providers: [
                    {
                        provide: column_base_1.ColumnBase,
                        useExisting: core_1.forwardRef(function () { return ColumnGroupComponent; }) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-grid-column-group',
                template: ""
            },] },
];
/** @nocollapse */
ColumnGroupComponent.ctorParameters = function () { return [
    { type: column_base_1.ColumnBase, decorators: [{ type: core_1.SkipSelf }, { type: core_1.Host }, { type: core_1.Optional },] },
]; };
ColumnGroupComponent.propDecorators = {
    'children': [{ type: core_1.ContentChildren, args: [column_base_1.ColumnBase,] },],
};
exports.ColumnGroupComponent = ColumnGroupComponent;
