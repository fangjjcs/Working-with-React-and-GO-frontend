import { Box, Button } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import "./MoviesPage.css";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#28464b",
      darker: "#053e85",
    },
    neutral: {
      main: "#28464b",
      contrastText: "#fff",
    },
  },
});

const MoviesPage = (props) => {
  const [img, setImg] = useState(null);
  const [fileString, setFileString] = useState("");

  const onChangeImghandler = (event) => {
    const file = event.target.files[0];
    setImg(URL.createObjectURL(file));
    if(file) {
        const reader = new FileReader()
        reader.onload = function (e) {
            setFileString(e.target.result)
            console.log(e.target.result)
        }
        reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <header className="movies-page-header">
        <ThemeProvider theme={theme}>
          <Box className="movies-page-box">
            <div className="upload-content">
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload Picture
                </Button>
              </label>
              <input
                accept="image/*"
                className="upload-btn"
                id="contained-button-file"
                multiple
                type="file"
                onChange={onChangeImghandler}
              />
            </div>
            <img className="image" src={img}></img>
          </Box>
        </ThemeProvider>
      </header>
    </div>
  );
};

export default MoviesPage;
