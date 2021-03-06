import { ColumnComponent } from '../columns/column.component';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
/**
 * @hidden
 */
export declare class FilterCellComponent {
    column: ColumnComponent;
    filter: CompositeFilterDescriptor;
    private _templateContext;
    readonly templateContext: any;
    readonly hasTemplate: boolean;
    readonly isFilterable: boolean;
}
