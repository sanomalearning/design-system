import { Grid } from './grid.js';
import { GridColumn } from './column.js';
import { GridColumnGroup } from './column-group.js';
import { GridSelectionColumn } from './selection-column.js';
import { GridSortColumn } from './sort-column.js';
import { GridSorter } from './sorter.js';

customElements.define('sl-grid', Grid);
customElements.define('sl-grid-column', GridColumn);
customElements.define('sl-grid-column-group', GridColumnGroup);
customElements.define('sl-grid-selection-column', GridSelectionColumn);
customElements.define('sl-grid-sort-column', GridSortColumn);
customElements.define('sl-grid-sorter', GridSorter);

declare global {
  interface HTMLElementTagNameMap {
    'sl-grid': Grid;
    'sl-grid-column': GridColumn;
    'sl-grid-column-group': GridColumnGroup;
    'sl-grid-selection-column': GridSelectionColumn;
    'sl-grid-sort-column': GridSortColumn;
    'sl-grid-sorter': GridSorter;
  }
}
