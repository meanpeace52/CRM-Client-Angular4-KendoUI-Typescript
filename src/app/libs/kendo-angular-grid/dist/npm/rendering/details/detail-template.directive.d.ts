import { TemplateRef } from '@angular/core';
/**
 * Represents the predicate that is used by the
 * [`DetailTemplateDirective`]({% slug api_grid_detailtemplatedirective_kendouiforangular %}) conditional rendering.
 *
 * ```ts-no-run
 *  myCondition(dataItem: any, index: number) { return dataItem.CategoryID % 2 == 0; }
 * ```
 */
export declare type DetailTemplateShowIfFn = (dataItem: any, index: number) => boolean;
/**
 * Represents the detail template of the Grid.
 * Provides additional details about a particular data row by expanding or collapsing its content.
 * The detail template does not work with locked columns and requires you to set the `detailRowHeight` option for virtual scrolling.
 *
 * To define the detail template, nest an `<ng-template>` tag with the `kendoGridDetailTemplate` directive inside a `<kendo-grid>` tag.
 * The template context is set to the current data item and the following additional fields are passed:
 * - `dataItem`&mdash;Defines the current data item.
 * - `rowIndex`&mdash;Defines the current row index.
 *
 * &nbsp;
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *       <kendo-grid
 *         [data]="data"
 *         selectable="true"
 *         style="height: 160px"
 *         >
 *         <kendo-grid-column field="ProductID"></kendo-grid-column>
 *         <kendo-grid-column field="ProductName"></kendo-grid-column>
 *         <kendo-grid-column field="UnitPrice"></kendo-grid-column>
 *         <ng-template kendoGridDetailTemplate let-dataItem>
 *           <div *ngIf="dataItem.Category">
 *             <header>{{dataItem.Category?.CategoryName}}</header>
 *             <span>{{dataItem.Category?.Description}}</span>
 *           </div>
 *         </ng-template>
 *       </kendo-grid>
 *   `
 * })
 *
 * class AppComponent {
 *     public data = [{
 *         "ProductID": 1,
 *         "ProductName": "Chai",
 *         "UnitPrice": 18.0000,
 *         "Discontinued": false,
 *         "Category": {
 *             "CategoryID": 1,
 *             "CategoryName": "Beverages",
 *             "Description": "Soft drinks, coffees, teas, beers, and ales"
 *         }
 *       }, {
 *         "ProductID": 2,
 *         "ProductName": "Chang",
 *         "UnitPrice": 19.0000,
 *         "Discontinued": false,
 *         "Category": {
 *             "CategoryID": 1,
 *             "CategoryName": "Beverages",
 *             "Description": "Soft drinks, coffees, teas, beers, and ales"
 *         }
 *       }, {
 *         "ProductID": 3,
 *         "ProductName": "Aniseed Syrup",
 *         "UnitPrice": 10.0000,
 *         "Discontinued": false,
 *         "Category": {
 *             "CategoryID": 2,
 *             "CategoryName": "Condiments",
 *             "Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
 *         }
 *     }];
 *
 * }
 *
 * ```
 *
 * &nbsp;
 *
 * To indicate if a detail row should be displayed, specify the
 * [`DetailTemplateShowIfFn`]({% slug api_grid_detailtemplateshowiffn_kendouiforangular %}) setting.
 *
 * ```ts-no-run
 *    <div *kendoGridDetailTemplate="let dataItem, let rowIndex = rowIndex; showIf: myCondition">
 *       <category-details [category]="dataItem"></category-details>
 *    </div>
 * ```
 *
 * The following example demonstrates how to use `DetailTemplateShowIfFn` with the `<ng-template>` element.
 *
 * ```ts-no-run
 *    <ng-template kendoGridDetailTemplate let-dataItem let-rowIndex="rowIndex"
 *       [kendoGridDetailTemplateShowIf]="myCondition">
 *        <category-details [category]="dataItem"></category-details>
 *    </ng-template>
 * ```
 * &nbsp;
 *
 * @example
 * ```ts
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *       <kendo-grid
 *         [data]="data"
 *         selectable="true"
 *         style="height: 160px"
 *         >
 *         <kendo-grid-column field="ProductID"></kendo-grid-column>
 *         <kendo-grid-column field="ProductName"></kendo-grid-column>
 *         <kendo-grid-column field="UnitPrice"></kendo-grid-column>
 *         <ng-template kendoGridDetailTemplate let-dataItem
 *              [kendoGridDetailTemplateShowIf]="showOnlyBeveragesDetails">
 *           <div *ngIf="dataItem.Category">
 *             <header>{{dataItem.Category?.CategoryName}}</header>
 *             <span>{{dataItem.Category?.Description}}</span>
 *           </div>
 *         </ng-template>
 *       </kendo-grid>
 *   `
 * })
 * class AppComponent {
 *     public data = [{
 *         "ProductID": 1,
 *         "ProductName": "Chai",
 *         "UnitPrice": 18.0000,
 *         "Discontinued": false,
 *         "Category": {
 *             "CategoryID": 1,
 *             "CategoryName": "Beverages",
 *             "Description": "Soft drinks, coffees, teas, beers, and ales"
 *         }
 *       }, {
 *         "ProductID": 2,
 *         "ProductName": "Chang",
 *         "UnitPrice": 19.0000,
 *         "Discontinued": false,
 *         "Category": {
 *             "CategoryID": 1,
 *             "CategoryName": "Beverages",
 *             "Description": "Soft drinks, coffees, teas, beers, and ales"
 *         }
 *       }, {
 *         "ProductID": 3,
 *         "ProductName": "Aniseed Syrup",
 *         "UnitPrice": 10.0000,
 *         "Discontinued": false,
 *         "Category": {
 *             "CategoryID": 2,
 *             "CategoryName": "Condiments",
 *             "Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
 *         }
 *     }];
 *
 *     public showOnlyBeveragesDetails(dataItem: any, index: number): boolean {
 *        return dataItem.Category.CategoryID === 1;
 *     }
 * }
 *
 * ```
 *
 */
export declare class DetailTemplateDirective {
    templateRef: TemplateRef<any>;
    /**
     * Defines the function that indicates if a given detail row and the associated **Expand** or **Collapse** button will be shown.
     */
    showIf: DetailTemplateShowIfFn;
    constructor(templateRef: TemplateRef<any>);
    private _condition;
}
