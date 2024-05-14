const defaultSidenavStyle = (isOpen) => {
  return {
    sidenav: {
      color: "#fff",
      height: "100%",
      width: isOpen ? "250px" : "80px",
      position: "fixed",
      zIndex: "1",
      top: "0",
      left: "0",
      backgroundColor: "#111",
      overflowX: "hidden",
      paddingTop: "60px",
      transition: "0.5s",
      padding: isOpen ? "20px" : 0,
      borderTopRightRadius: "15px",
      borderBottomRightRadius: "15px",
      "&:hover": {
        color: "#f1f1f1",
      },
    },
    closeButton: {
      position: "absolute",
      top: "0",
      right: "0",
      backgroundColor: "inherit",
      color: "#fff",
      border: "0",
      fontSize: "36px",
      marginLeft: "50px",
      "&:hover": {
        cursor: "pointer",
      },
    },
  };
};

const Sidenav = ({ isOpen, close, ...rest }) => {
  const { sidenav, closeButton } = defaultSidenavStyle(isOpen);

  if (isOpen) {
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }

  return (
    <div
      id="mySidenav"
      style={sidenav}
      {...rest}
    >
      {isOpen && (
        <>
          <button
            style={closeButton}
            onclick={close}
          >
            &times;
          </button>
          <h1>Sidenav</h1>
        </>
      )}
    </div>
  );
};

export default Sidenav;
