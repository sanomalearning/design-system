import type { DataSourceFilterFunction, DataSourceFilterValue, DataSourceSortFunction } from './data-source.js';
import { getStringByPath } from '../path.js';
import { DataSource } from './data-source.js';

export class ArrayDataSource<T> extends DataSource<T> {
  /** Array of filtered & sorted items. */
  #items: T[] = [];

  /** The original array of items as passed to the constructor. */
  #originalItems: T[];

  get items(): T[] {
    return this.#items;
  }

  get size(): number {
    return this.#items.length;
  }

  constructor(items: T[]) {
    super();
    this.#items = [...items];
    this.#originalItems = [...items];
  }

  update(): void {
    let items = [...this.#originalItems];

    if (this.filterValues) {
      const filterFn: DataSourceFilterFunction<T> = this.filter?.(this.filterValues) || this.#filter(this.filterValues);

      items = items.filter(filterFn);
    }

    if (this.sortValue) {
      let sortFn: DataSourceSortFunction<T> | undefined = this.sorter?.(this.sortValue);

      if (!sortFn) {
        const { path, direction } = this.sortValue,
          ascending = direction === 'asc';

        sortFn = (a, b) => {
          const valueA = getStringByPath(a, path),
            valueB = getStringByPath(b, path);

          if (valueA === valueB) {
            return 0;
          } else if (valueA < valueB) {
            return ascending ? -1 : 1;
          } else {
            return ascending ? 1 : -1;
          }
        };
      }

      items.sort(sortFn);
    }

    this.#items = items;
    this.dispatchEvent(new CustomEvent<void>('sl-update'));
  }

  #filter(_values: DataSourceFilterValue[]): DataSourceFilterFunction<T> {
    // const regex = new RegExp(value, 'i');

    // if (!labelPath) {
    //   return item => {
    //     if (typeof item === 'string') {
    //       return regex.test(item);
    //     } else {
    //       // We can't filter an object we don't know
    //       return true;
    //     }
    //   };
    // }

    // // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    // return item => regex.test(`${getValueByPath(item, labelPath)}`);

    return () => true;
  }
}
