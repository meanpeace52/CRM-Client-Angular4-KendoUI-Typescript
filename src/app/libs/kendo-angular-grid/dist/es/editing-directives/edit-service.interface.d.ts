/**
 * The interface of the edit service that can be set to the
 * [editing directives]({% slug editing_directives_grid_kendouiforangular %}) of the Grid.
 */
export interface EditService {
    /**
     * The method that is called to create the items for new rows.
     */
    create(item: any): void;
    /**
     * The method that is called to update the items for existing rows.
     */
    update(item: any): void;
    /**
     * The method that is called to remove existing rows.
     */
    remove(item: any): void;
    /**
     * The method that is called to set new values to an item.
     */
    assignValues(target: any, source: any): void;
}
