import { useState, useContext} from "react";
import { useHistory } from "react-router-dom/";
import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import Password from "@material-ui/icons/VpnKey";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import "./LoginPage.css";
import { useHttpClient } from "../../shared/hook/http-hook";
import AuthContext from "../../shared/context/auth-context";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#005566",
      darker: "#005566",
    }
  },
});

const LoginPage = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { isLoading, error, sendRequest } = useHttpClient();
  const authContext = useContext(AuthContext)
  const history = useHistory()

  const handleNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePwdChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    const request = {
      username: username,
      password: password,
    };
    login(request);
  };

  const login = (request) => {
    console.log(request)
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:4000/v1/signin",
          "POST",
          JSON.stringify(request)
        );

        console.log(responseData);

        if (responseData.status !== 200) {
          setIsError(true);
          setErrorMsg(responseData.error.message);
        } else {
          setIsError(false);
          setErrorMsg("");
          console.log(responseData)
          authContext.login(responseData.response.jwt)
          authContext.saveUser(responseData.response.username)
          authContext.setSuccess("成功登入!");
          history.replace("/")
        }
      } catch (err) {
        // done in http-hook.js
      }
    };
    fetchData();
  };

  return (
    <header className="login-page-header">
      <ThemeProvider theme={theme}>
        <Box className="login-page-box">
          <FormControl variant="standard" className="login-form">
            <InputLabel htmlFor="input-with-icon-adornment">
              Username
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
              value={username}
              onChange={handleNameChange}
            />
            {isError && (
              <FormHelperText error id="standard-helper-text">
                {errorMsg}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl variant="standard" className="login-form">
            <InputLabel htmlFor="input-with-icon-adornment">
              Password
            </InputLabel>
            <Input
              id="standard-password-input"
              type="password"
              startAdornment={
                <InputAdornment position="start">
                  <Password />
                </InputAdornment>
              }
              value={password}
              onChange={handlePwdChange}
            />
            {isError && (
              <FormHelperText error id="standard-helper-text">
                {errorMsg}
              </FormHelperText>
            )}
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Log In
          </Button>
        </Box>
      </ThemeProvider>
    </header>
  );
};

export default LoginPage;
