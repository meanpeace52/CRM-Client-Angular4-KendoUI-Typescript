/**
 * The selection settings of the Grid component.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid [data]="gridData" [selectable]="{ checkboxOnly: true, mode: 'multiple' }">
 *          <kendo-grid-column field="ProductID" title="Product ID">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="ProductName" title="Product Name">
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
export interface SelectableSettings {
    /**
     * Determines if row selection is allowed.
     *
     * @default true
     */
    enabled?: boolean;
    /**
     * Determines if the selection is performed only through clicking a checkbox.
     * If enabled, clicking the row itself will not select the row.
     * Applicable if at least one checkbox column is present.
     *
     * @default true
     */
    checkboxOnly?: boolean;
    /**
     * The available values are:
     * * `single`
     * * `multiple`
     *
     * @default "multiple"
     */
    mode?: SelectableMode;
}
/**
 * Represents the available selection modes.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid [data]="gridData" [selectable]="{ mode: 'single' }">
 *          <kendo-grid-column field="ProductID" title="Product ID">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="ProductName" title="Product Name">
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
export declare type SelectableMode = "single" | "multiple";
/**
 * Represents the possible states of the select-all checkbox.
 */
export declare type SelectAllCheckboxState = "checked" | "unchecked" | "indeterminate";
