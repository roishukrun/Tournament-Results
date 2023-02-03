import { useState, useEffect, useCallback } from "react";
import Table, {
  CreateHeaderObject,
  CreateRowObject,
  CreateButtonsObject,
} from "./table/Table";

const levels = ["All", "Rookie", "Amateur", "Pro"];
const rowNumberOptions = [10, 20, 30, 40, 50];

function ResultsTable(props) {
  const [playersQuery, setPlayersQuery] = useState({
    start: 0,
    n: rowNumberOptions[0],
    level: levels[0],
    search: "",
  });
  const [totalResults, setTotalResults] = useState(0);
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [buttons, setButtons] = useState([]);

  const updateHeaders = useCallback(() => {
    const newHeaders = [];

    newHeaders.push(
      CreateHeaderObject({
        displayName: "Id",
        propertyName: "id",
      })
    );

    newHeaders.push(
      CreateHeaderObject({
        displayName: "Name",
        propertyName: "name",
      })
    );

    newHeaders.push(
      CreateHeaderObject({
        displayName: "Level",
        propertyName: "level",
        hasFilter: true,
        filterValue: playersQuery.level,
        filterOptions: levels,
        onFilterChange: handleLevelChange,
      })
    );

    newHeaders.push(
      CreateHeaderObject({
        displayName: "Score",
        propertyName: "score",
        hasSort: true,
      })
    );

    setHeaders(newHeaders);
  }, [playersQuery]);

  /* Update buttons after each update of the players table. */
  const updateButtons = useCallback(() => {
    setButtons(
      CreateButtonsObject({
        hasSearch: true,
        searchValue: playersQuery.search,
        searchLabel: "Search",
        searchPlaceholder: "Start typing here...",
        onSearchChange: handleSearchChange,
        hasPagination: true,
        onPageChange: handlePageButtonClick,
        previousPageName: "prevPage",
        previousPageValue: "Previous",
        isPreviousDisabled: () => playersQuery.start === 0,
        nextPageName: "nextPage",
        nextPageValue: "Next",
        isNextDisabled: () =>
          playersQuery.start + playersQuery.n >= totalResults,
        hasRowNumbersFilter: true,
        rowNumberValue: playersQuery.n,
        rowNumberLabel: "Results",
        rowNumberOptions: rowNumberOptions,
        onRowNumbersFilterChange: handleResultsPerPageChange,
      })
    );
  }, [playersQuery, totalResults]);

  /* Call players API and save the data which will later on will be used by the table. */
  useEffect(() => {
    let urlQuery = createUrlQuery(playersQuery);

    fetch(urlQuery)
      .then((response) => response.json())
      .then((json) => {
        setTotalResults(Number(json.headers["x-total"]));

        setRows(
          JSON.parse(json["body"]).map((player) =>
            CreateRowObject({
              values: {
                ...player,
                name: capitalize(player.name),
                level: capitalize(player.level),
              },
              isHighlighted: props.playerIsSuspected(player.id),
            })
          )
        );
      })
      .then(() => updateHeaders())
      .then(() => updateButtons());
  }, [playersQuery, props, updateHeaders, updateButtons]);

  /* Create URL query for the players API base on the 'playersQuery' options */
  function createUrlQuery(query) {
    let url = [];
    url.push("/api/v1/players?");
    url.push("start=" + query.start);
    url.push("&n=" + query.n);
    url.push(
      query.level !== "All" ? "&level=" + query.level.toLowerCase() : ""
    );
    url.push(query.search ? "&search=" + query.search.toLocaleLowerCase() : "");

    return url.join("");
  }

  function capitalize(sentence) {
    return sentence
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function handleResultsPerPageChange(event) {
    const resultPerPageValue = Number(event.target.value);

    setPlayersQuery((prevPlayerQuery) => ({
      ...prevPlayerQuery,
      n: resultPerPageValue,
    }));
  }

  function handleLevelChange(event) {
    const level = event.target.value;

    setPlayersQuery((prevPlayerQuery) => ({
      ...prevPlayerQuery,
      start: 0,
      level: level,
    }));
  }

  function handleSearchChange(event) {
    const searchQuery = event.target.value;

    setPlayersQuery((prevPlayerQuery) => ({
      ...prevPlayerQuery,
      start: 0,
      search: searchQuery,
    }));
  }

  function handlePageButtonClick(event) {
    const name = event.target.name;

    setPlayersQuery((prevPlayerQuery) => {
      if (name === "nextPage") {
        return {
          ...prevPlayerQuery,
          start: prevPlayerQuery.start + prevPlayerQuery.n,
        };
      } else if (name === "prevPage") {
        return {
          ...prevPlayerQuery,
          start:
            prevPlayerQuery.start - prevPlayerQuery.n < 0
              ? 0
              : prevPlayerQuery.start - prevPlayerQuery.n,
        };
      }
    });
  }

  return (
    <Table
      headers={headers}
      rows={rows}
      buttons={buttons}
      totalEntries={totalResults}
      entriesCountPerPage={playersQuery.n}
      firstEntry={playersQuery.start}
    ></Table>
  );
}

export default ResultsTable;
