import * as tslib_1 from "tslib";
import { Component, forwardRef, ContentChild, SkipSelf, Host, Optional, Input } from '@angular/core';
import { ColumnBase } from './column-base';
import { CellTemplateDirective } from '../rendering/cell-template.directive';
/**
 * Represents the selection checkbox column of the Grid.
 *
 * If the column is defined empty, it renders a default checkbox for row selection.
 *
 * You can also define the content of the column inside an `<ng-template>` tag. The template context
 * is set to the current data item and the following additional fields are passed:
 * - `columnIndex`&mdash;The current column index.
 * - `rowIndex`&mdash;The current row index. If inside a new item row, it will be `-1`.
 * - `dataItem`&mdash;The current data item.
 * - `column`&mdash;The current column instance.
 * - `isNew`&mdash;The state of the current item.
 *
 * The template has to contain [`SelectionCheckboxDirective`]({% slug api_grid_selectioncheckboxdirective_kendouiforangular %}).
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid [data]="gridData" [selectable]="{enabled: true, checkboxOnly: true}">
 *          <kendo-grid-column field="ProductID" title="Product ID" width="120">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="ProductName" title="Product Name">
 *          </kendo-grid-column>
 *          <kendo-grid-checkbox-column title="Default checkbox">
 *          </kendo-grid-checkbox-column>
 *          <kendo-grid-checkbox-column title="Custom checkbox">
 *            <ng-template kendoGridCellTemplate let-idx="rowIndex">
 *              Select row <input [kendoGridSelectionCheckbox]="idx" />
 *            </ng-template>
 *          </kendo-grid-checkbox-column>
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
var CheckboxColumnComponent = (function (_super) {
    tslib_1.__extends(CheckboxColumnComponent, _super);
    function CheckboxColumnComponent(parent) {
        var _this = _super.call(this, parent) || this;
        _this.parent = parent;
        /*
         * @hidden
         */
        _this.isCheckboxColumn = true;
        return _this;
    }
    Object.defineProperty(CheckboxColumnComponent.prototype, "templateRef", {
        get: function () {
            return this.template ? this.template.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    return CheckboxColumnComponent;
}(ColumnBase));
export { CheckboxColumnComponent };
CheckboxColumnComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: ColumnBase,
                        useExisting: forwardRef(function () { return CheckboxColumnComponent; }) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-grid-checkbox-column',
                template: ""
            },] },
];
/** @nocollapse */
CheckboxColumnComponent.ctorParameters = function () { return [
    { type: ColumnBase, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional },] },
]; };
CheckboxColumnComponent.propDecorators = {
    'showSelectAll': [{ type: Input },],
    'template': [{ type: ContentChild, args: [CellTemplateDirective,] },],
};
