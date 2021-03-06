import { EventEmitter } from '@angular/core';
/**
 * Represents a component which is to accommodate the filter operators.
 */
export declare class FilterCellOperatorsComponent {
    /**
     * @hidden
     */
    readonly hostClasses: boolean;
    /**
     * The filter operators that will be shown.
     */
    operators: Array<{
        text: string;
        value: string;
    }>;
    /**
     * Determines if the **Clear** button should be shown.
     * @type {boolean}
     */
    showButton: boolean;
    /**
     * Determines if the operators list will be shown.
     * @type {boolean}
     */
    showOperators: boolean;
    /**
     * The selected operator.
     * @type {string}
     */
    value: string;
    /**
     * Fires when the operator is selected.
     * @type {EventEmitter<string>}
     */
    valueChange: EventEmitter<string>;
    /**
     * Fires when the **Clear** button is clicked.
     * @type {EventEmitter<{}>}
     */
    clear: EventEmitter<{}>;
    /**
     * @hidden
     */
    onChange(dataItem: any): void;
    /**
     * @hidden
     */
    clearClick(): void;
}
