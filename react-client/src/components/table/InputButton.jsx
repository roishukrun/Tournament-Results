function InputButton(props) {
  return (
    <label>
      <span className="right-margin">{props.label}:</span>
      <input
        className="button"
        onChange={props.onChange}
        value={props.value}
        placeholder={props.value ? props.value : props.placeholder}
      />
    </label>
  );
}

export default InputButton;
