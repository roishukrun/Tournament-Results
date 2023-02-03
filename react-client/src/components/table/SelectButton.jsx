function SelectButton(props) {
  return (
    <span>
      <label>
        <span className="right-margin">
          {props.label ? `${props.label}:` : ""}
        </span>
        <select className="button" onChange={props.onChange}>
          {props.rowNumberOptions.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
    </span>
  );
}

export default SelectButton;
