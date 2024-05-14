const defaultInputStyle = {
  width: "100%",
  margin: "5px 0",
};

const Input = ({ value, setValue, style, placeholder, ...rest }) => {
  return (
    <input
      style={style || defaultInputStyle}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...rest}
    />
  );
};

export default Input;
