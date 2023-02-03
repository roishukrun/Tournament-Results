import SelectButton from "./SelectButton";
import InputButton from "./InputButton";
import ClickButton from "./ClickButton";
import "./tableStyles.css";

function Table(props) {
  const headers = props.headers;
  const rows = props.rows;
  const buttons = props.buttons;
  const totalEntries = props.totalEntries;
  const entriesCountPerPage = props.entriesCountPerPage;
  const firstEntry = props.firstEntry;

  return (
    <div>
      {buttons && (
        <div className="table-buttons">
          <span className="align-left">
            <span className="right-margin">
              {buttons.hasRowNumbersFilter && (
                <SelectButton
                  onChange={buttons.onRowNumbersFilterChange}
                  value={buttons.rowNumberValue}
                  label={buttons.rowNumberLabel}
                  rowNumberOptions={buttons.rowNumberOptions}
                />
              )}
            </span>
            <span className="right-margin">
              {buttons.hasSearch && (
                <InputButton
                  onChange={buttons.onSearchChange}
                  value={buttons.searchValue}
                  label={buttons.searchLabel}
                  placeholder={buttons.searchPlaceholder}
                />
              )}
            </span>
          </span>
        </div>
      )}

      <table>
        <thead>
          <tr>
            {headers.map((headerObject, headerIndex) => (
              <th key={headerIndex}>
                {headerObject.displayName}
                {headerObject.hasFilter && (
                  <span className="left-margin">
                    <SelectButton
                      onChange={headerObject.onFilterChange}
                      value={headerObject.filterValue}
                      rowNumberOptions={headerObject.filterOptions}
                    />
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={row.isHighlighted ? "table-row-highlighted" : ""}
            >
              {headers.map((headerObject, headerIndex) => {
                return (
                  <td key={headerIndex}>
                    {row.values[headerObject.propertyName]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <span>
        Showing {firstEntry + 1} to {firstEntry + entriesCountPerPage} of{" "}
        {totalEntries} entries...
      </span>

      {buttons.hasPagination && (
        <span className="align-right">
          <span className="left-margin">
            <ClickButton
              onClick={buttons.onPageChange}
              disabled={buttons.isPreviousDisabled()}
              name={buttons.previousPageName}
              value={buttons.previousPageValue}
            />
          </span>
          <span className="left-margin">
            <ClickButton
              onClick={buttons.onPageChange}
              disabled={buttons.isNextDisabled()}
              name={buttons.nextPageName}
              value={buttons.nextPageValue}
            />
          </span>
        </span>
      )}
    </div>
  );
}

function createHeaderObject({
  displayName,
  propertyName,
  hasFilter = false,
  filterValue = null,
  filterOptions = null,
  onFilterChange = null,
} = {}) {
  return {
    displayName: displayName,
    propertyName: propertyName,
    hasFilter: hasFilter,
    filterValue: filterValue,
    filterOptions: filterOptions,
    onFilterChange: onFilterChange,
  };
}

function createRowObject({ values, isHighlighted = false } = {}) {
  return {
    values: values,
    isHighlighted: isHighlighted,
  };
}

function createButtonsObject({
  hasSearch = false,
  searchValue = null,
  searchLabel = null,
  searchPlaceholder = null,
  onSearchChange = null,
  hasPagination = false,
  onPageChange = null,
  previousPageName = null,
  previousPageValue = null,
  isPreviousDisabled = null,
  nextPageName = null,
  nextPageValue = null,
  isNextDisabled = null,
  hasRowNumbersFilter = false,
  rowNumberValue = null,
  rowNumberLabel = null,
  rowNumberOptions = null,
  onRowNumbersFilterChange = null,
} = {}) {
  return {
    hasSearch: hasSearch,
    searchValue: searchValue,
    searchLabel: searchLabel,
    searchPlaceholder: searchPlaceholder,
    onSearchChange: onSearchChange,
    hasPagination: hasPagination,
    onPageChange: onPageChange,
    previousPageName: previousPageName,
    previousPageValue: previousPageValue,
    isPreviousDisabled: isPreviousDisabled,
    nextPageName: nextPageName,
    nextPageValue: nextPageValue,
    isNextDisabled: isNextDisabled,
    hasRowNumbersFilter: hasRowNumbersFilter,
    rowNumberValue: rowNumberValue,
    rowNumberLabel: rowNumberLabel,
    rowNumberOptions: rowNumberOptions,
    onRowNumbersFilterChange: onRowNumbersFilterChange,
  };
}

export default Table;
export const CreateHeaderObject = createHeaderObject;
export const CreateRowObject = createRowObject;
export const CreateButtonsObject = createButtonsObject;
