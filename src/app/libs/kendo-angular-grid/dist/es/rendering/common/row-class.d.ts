/**
 * Represents the callback arguments that are used by the
 * [`rowSelected`]({% slug api_grid_gridcomponent_kendouiforangular %}#toc-rowSelected) property.
 */
export interface RowArgs {
    /**
     * The current row data.
     */
    dataItem: any;
    /**
     * The current row index.
     */
    index: number;
}
/**
 * Represents the callback arguments that are used by the
 * [`rowClass`]({% slug api_grid_gridcomponent_kendouiforangular %}#toc-rowClass) property.
 */
export interface RowClassArgs extends RowArgs {
}
/**
 * Represents the callback that is used by the
 * [`rowClass`]({% slug api_grid_gridcomponent_kendouiforangular %}#toc-rowClass) property.
 *
 * ```ts-no-run
 *  rowCallback({ dataItem, index }) {
 *    const isEven = index % 2 == 0;
 *    return {
 *      even: isEven,
 *      odd: !isEven
 *    };
 *  }
 * ```
 *
 */
export declare type RowClassFn = (context: RowClassArgs) => string | string[] | Set<string> | {
    [key: string]: any;
};
/**
 * Represents the callback that is used by the
 * [`rowSelected`]({% slug api_grid_gridcomponent_kendouiforangular %}#toc-rowSelected) property.
 *
 * ```ts-no-run
 * rowCallback({ dataItem, index }) {
 *   return index % 2 === 0;
 * }
 * ```
 */
export declare type RowSelectedFn = (context: RowArgs) => boolean;
