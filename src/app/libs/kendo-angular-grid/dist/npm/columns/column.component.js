"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var cell_template_directive_1 = require("../rendering/cell-template.directive");
var group_header_template_directive_1 = require("../grouping/group-header-template.directive");
var edit_template_directive_1 = require("../editing/edit-template.directive");
var group_footer_template_directive_1 = require("../grouping/group-footer-template.directive");
var column_base_1 = require("./column-base");
var utils_1 = require("../utils");
var filter_cell_template_directive_1 = require("../filtering/filter-cell-template.directive");
/**
 * @hidden
 */
function isColumnComponent(column) {
    return utils_1.isPresent(column.field);
}
exports.isColumnComponent = isColumnComponent;
/**
 * Represents the columns of the Grid.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid [data]="gridData">
 *          <kendo-grid-column field="ProductID" title="Product ID" width="120">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="ProductName" title="Product Name">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="Discontinued" width="120">
 *              <ng-template kendoGridCellTemplate let-dataItem>
 *                  <input type="checkbox" [checked]="dataItem.Discontinued" disabled/>
 *              </ng-template>
 *          </kendo-grid-column>
 *        </kendo-grid>
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
var ColumnComponent = (function (_super) {
    tslib_1.__extends(ColumnComponent, _super);
    function ColumnComponent(parent) {
        var _this = _super.call(this, parent) || this;
        /**
         * Allows the column headers to be clicked and the `sortChange` event emitted.
         * You have to handle the `sortChange` event yourself and sort the data.
         */
        _this.sortable = true;
        /**
         * Defines the editor type. Used when the column enters the edit mode. The default editor type is `text`.
         *
         * @example
         * ```ts-no-run
         * <kendo-grid>
         *    <kendo-grid-column field="UnitPrice" [editor]="'numeric'">
         *    </kendo-grid-column>
         * </kendo-grid>
         * ```
         */
        _this.editor = 'text';
        /**
         * Defines the filter type that is displayed inside the filter row. The default value is `text`.
         *
         * @example
         * ```ts-no-run
         * <kendo-grid>
         *    <kendo-grid-column field="UnitPrice" [filter]="'numeric'">
         *    </kendo-grid-column>
         * </kendo-grid>
         * ```
         */
        _this.filter = 'text';
        /**
         * Defines if a filter UI will be displayed for this column. The default value is `true`.
         *
         * @example
         * ```ts-no-run
         * <kendo-grid>
         *    <kendo-grid-column field="UnitPrice" [filterable]="false">
         *    </kendo-grid-column>
         * </kendo-grid>
         * ```
         */
        _this.filterable = true;
        /**
         * Defines whether the column is editable. The default value is `true`.
         *
         * @example
         * ```ts-no-run
         * <kendo-grid>
         *    <kendo-grid-column field="UnitPrice" [editable]="false">
         *    </kendo-grid-column>
         * </kendo-grid>
         * ```
         */
        _this.editable = true;
        return _this;
    }
    Object.defineProperty(ColumnComponent.prototype, "templateRef", {
        get: function () {
            return this.template ? this.template.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "groupHeaderTemplateRef", {
        get: function () {
            return this.groupHeaderTemplate ? this.groupHeaderTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "groupFooterTemplateRef", {
        get: function () {
            return this.groupFooterTemplate ? this.groupFooterTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "editTemplateRef", {
        get: function () {
            return this.editTemplate ? this.editTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "filterCellTemplateRef", {
        get: function () {
            return this.filterCellTemplate ? this.filterCellTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "displayTitle", {
        get: function () {
            return this.title === undefined ? this.field : this.title;
        },
        enumerable: true,
        configurable: true
    });
    return ColumnComponent;
}(column_base_1.ColumnBase));
ColumnComponent.decorators = [
    { type: core_1.Component, args: [{
                providers: [
                    {
                        provide: column_base_1.ColumnBase,
                        useExisting: core_1.forwardRef(function () { return ColumnComponent; }) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-grid-column',
                template: ""
            },] },
];
/** @nocollapse */
ColumnComponent.ctorParameters = function () { return [
    { type: column_base_1.ColumnBase, decorators: [{ type: core_1.SkipSelf }, { type: core_1.Host }, { type: core_1.Optional },] },
]; };
ColumnComponent.propDecorators = {
    'field': [{ type: core_1.Input },],
    'format': [{ type: core_1.Input },],
    'sortable': [{ type: core_1.Input },],
    'editor': [{ type: core_1.Input },],
    'filter': [{ type: core_1.Input },],
    'filterable': [{ type: core_1.Input },],
    'editable': [{ type: core_1.Input },],
    'template': [{ type: core_1.ContentChild, args: [cell_template_directive_1.CellTemplateDirective,] },],
    'groupHeaderTemplate': [{ type: core_1.ContentChild, args: [group_header_template_directive_1.GroupHeaderTemplateDirective,] },],
    'groupFooterTemplate': [{ type: core_1.ContentChild, args: [group_footer_template_directive_1.GroupFooterTemplateDirective,] },],
    'editTemplate': [{ type: core_1.ContentChild, args: [edit_template_directive_1.EditTemplateDirective,] },],
    'filterCellTemplate': [{ type: core_1.ContentChild, args: [filter_cell_template_directive_1.FilterCellTemplateDirective,] },],
};
exports.ColumnComponent = ColumnComponent;
