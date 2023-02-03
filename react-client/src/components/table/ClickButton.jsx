function ClickButton(props) {
  return (
    <button
      className="button"
      onClick={props.onClick}
      disabled={props.disabled}
      name={props.name}
    >
      {props.value}
    </button>
  );
}

export default ClickButton;
