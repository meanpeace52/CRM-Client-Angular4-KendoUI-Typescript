import { OnDestroy, QueryList } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ExcelExportData, ColumnBase, CellOptions } from '@progress/kendo-angular-excel-export';
import { GridComponent } from '../grid.component';
import { ExcelService } from './excel.service';
/**
 * Configures the Excel export settings of the Kendo UI Grid.
 */
export declare class ExcelComponent implements OnDestroy {
    private rtl;
    /**
     * Specifies the file name of the exported Excel file.
     * @default "Export.xlsx"
     */
    fileName: string;
    /**
     * Enables or disables column filtering in the Excel file. This behavior is different from the filtering feature of the Grid.
     */
    filterable: boolean;
    /**
     * The creator of the workbook.
     */
    creator?: string;
    /**
     * The date when the workbook is created. Defaults to `new Date()`.
     */
    date?: Date;
    /**
     * If set to `true`, the content is forwarded to `proxyURL` even if the browser supports the saving of files locally.
     */
    forceProxy: boolean;
    /**
     * The URL of the server-side proxy which streams the file to the end user.
     * You need to use a proxy if the browser is not capable of saving files locally&mdash;for example, Internet Explorer 9 and Safari.
     * The responsibility for implementing the server-side proxy is yours.
     *
     * In the request body, the proxy receives a POST request with the following parameters:
     *
     * - `contentType`&mdash;The MIME type of the file.
     * - `base64`&mdash;The base-64 encoded file content.
     * - `fileName`&mdash;The file name, as requested by the caller.
     *
     * The proxy returns the decoded file with the `"Content-Disposition"` header set to `attachment; filename="<fileName.xslx>"`.
     */
    proxyURL: string;
    /**
     * The function that is used to get the exported data options. By default, the current data and group of the Grid are used.
     * To export data that is different from the current Grid data, provide a custom function.
     */
    fetchData: (component: GridComponent) => ExcelExportData | Promise<ExcelExportData> | Observable<ExcelExportData>;
    /**
     * The options of the cells that are inserted before the data,
     * group, and footer cells to indicate the group hierarchy if the data is grouped.
     */
    paddingCellOptions: CellOptions;
    /**
     * The options of the cells that are inserted before the header cells
     * to align the headers and the column values when the data is grouped.
     */
    headerPaddingCellOptions: CellOptions;
    /**
     * @hidden
     */
    columns: QueryList<ColumnBase>;
    private saveSubscription;
    private dataSubscription;
    constructor(excelService: ExcelService, rtl?: boolean);
    ngOnDestroy(): void;
    protected save(component: GridComponent): void;
    protected exportData(component: GridComponent, result: ExcelExportData): void;
    protected saveFile(dataURL: string): void;
}
