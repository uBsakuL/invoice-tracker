const defaultButtonStyle = {
  color: "red",
  height: "30px",
  width: "150px",
  borderRadius: "20px",
  border: "0",
  margin: "5px 0",
};

const Button = ({ onClick, type, style, text, ...rest }) => {
  return (
    <button
      style={style || defaultButtonStyle}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {text}
    </button>
  );
};

export default Button;
