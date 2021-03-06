import { TemplateRef, QueryList } from '@angular/core';
import { CellTemplateDirective } from '../rendering/cell-template.directive';
import { EditTemplateDirective } from '../editing/edit-template.directive';
import { ColumnBase } from './column-base';
import { ColumnComponent } from "./column.component";
/**
 * @hidden
 */
export declare function isSpanColumnComponent(column: any): column is SpanColumnComponent;
/**
 * Represents a column which can be spanned over multiple data cells while the individual header and footer cells are retained.
 * This behavior enables you to achieve more flexible layout and, at the same time,
 * keep the built-in UI element for sorting, filtering, and grouping.
 * The columns that will be merged have to be wrapped inside the `<kendo-grid-span-column>` tag.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid
 *              [sortable]="true"
 *              [filterable]="true"
 *              [kendoGridBinding]="products">
 *          <kendo-grid-column field="ProductID" title="Product ID" width="120">
 *          </kendo-grid-column>
 *          <kendo-grid-span-column>
 *              <kendo-grid-column field="ProductName" title="Product Name">
 *              </kendo-grid-column>
 *              <kendo-grid-column field="UnitPrice" title="Unit Price" filter="numeric" width="180" format="{0:c}">
 *              </kendo-grid-column>
 *          </kendo-grid-span-column>
 *          <kendo-grid-column field="Discontinued" width="120" filter="boolean">
 *              <ng-template kendoGridCellTemplate let-dataItem>
 *                  <input type="checkbox" [checked]="dataItem.Discontinued" disabled/>
 *              </ng-template>
 *          </kendo-grid-column>
 *        </kendo-grid>
 *    `
 * })
 *
 * class AppComponent {
 *   public products = [{
 *      "ProductID": 1,
 *      "ProductName": "Chai",
 *      "UnitPrice": 18.0000,
 *      "Discontinued": true
 *    }, {
 *      "ProductID": 2,
 *      "ProductName": "Chang",
 *      "UnitPrice": 19.0000,
 *      "Discontinued": false
 *    }
 *   ];
 * }
 *
 * ```
 *
 * By default, the data cell displays the data for the specified fields.
 * To further customize the spanned-column functionality,
 * you can use a [cell template]({% slug api_grid_celltemplatedirective_kendouiforangular %}).
 *
 * ```html-no-run
 * <kendo-grid-span-column>
 *  <kendo-grid-column field="field1" title="Field 1"></kendo-grid-column>
 *  <kendo-grid-column field="field2" title="Field 2"></kendo-grid-column>
 *    <ng-template kendoGridCellTemplate let-dataItem>
 *        <h5>{{ dataItem.field1 }}</h5>
 *        <p>{{ dataItem.field2 }}</p>
 *    </ng-template>
 *  </kendo-grid-span-column>
 * ```
 */
export declare class SpanColumnComponent extends ColumnBase {
    readonly isSpanColumn: boolean;
    template: QueryList<CellTemplateDirective>;
    editTemplate: QueryList<EditTemplateDirective>;
    /**
     * @hidden
     */
    childColumns: QueryList<ColumnComponent>;
    /**
     * @hidden
     */
    title: string;
    /**
     * @hidden
     */
    width: number;
    /**
     * @hidden
     */
    headerStyle: {
        [key: string]: string;
    };
    /**
     * @hidden
     */
    footerStyle: {
        [key: string]: string;
    };
    /**
     * @hidden
     */
    headerClass: string | string[] | Set<string> | {
        [key: string]: any;
    };
    /**
     * @hidden
     */
    footerClass: string | string[] | Set<string> | {
        [key: string]: any;
    };
    /**
     * Sets the visibility of the column.
     *
     * @default false
     */
    hidden: boolean;
    /**
     * Defines whether the edit template of the column will be rendered. The default value is `false`.
     *
     * > To enable the editing functionality for a spanned column, set an edit template for it.
     *
     * @example
     * ```ts-no-run
     * <kendo-grid>
     *    <kendo-grid-span-column [editable]="false">
     *      <kendo-grid-column field="UnitPrice">
     *      </kendo-grid-column>
     *      <kendo-grid-column field="ProductName">
     *      </kendo-grid-column>
     *      <ng-template kendoGridEditTemplate>
     *         .....
     *      </ng-template>
     *    </kendo-grid-span-column>
     * </kendo-grid>
     * ```
     */
    editable: boolean;
    private _editable;
    private _hidden;
    private _locked;
    constructor(parent?: ColumnBase);
    /**
     * @hidden
     */
    readonly templateRef: TemplateRef<any>;
    /**
     * @hidden
     */
    readonly editTemplateRef: TemplateRef<any>;
    /**
     * @hidden
     */
    readonly colspan: number;
    /**
     * Toggles the locked (frozen) state of the columns.
     * Locked columns are visible at all times during the horizontal scrolling of the Grid.
     * For the option to work properly, make sure that the Grid is configured to meet the following requirements:
     * - Scrolling is enabled.
     * - The `height` option of the Grid is set.
     * - The widths of all Grid columns are explicitly set in pixels.
     * In this way, the Grid adjusts the layout of the locked and unlocked columns.
     *
     * @default false
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid [data]="gridData" [scrollable]="scrollable" style="height: 200px">
     *          <kendo-grid-span-column [locked]="true">
     *             <kendo-grid-column field="ProductID" title="Product ID" width="120">
     *             </kendo-grid-column>
     *             <kendo-grid-column field="ProductName" title="Product Name" width="200">
     *             </kendo-grid-column>
     *          <kendo-grid-span-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
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
    locked: boolean;
}
