import { Box } from "@material-ui/core";
import "./AdminPage.css";
import FoodPaper from "./components/FoodPaper";
import MenuItemList from "./components/MenuItemList";
import OrderItemList from "./components/OrderItemList";
import { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hook/http-hook";
import { useHistory } from "react-router-dom";
import AuthContext from "../../shared/context/auth-context";
import SnackBar from "./components/SnackBar";

const AdminPage = (props) => {
  const [food, setFood] = useState([]);
  const [drink, setDrink] = useState([]);
  const [opened, setOpened] = useState([]);
  const [isSnackBarOpen, setSnackBarOpen] = useState(false);

  const { isLoading, error, sendRequest } = useHttpClient();
  const history = useHistory();

  const authContext = useContext(AuthContext);
  const header = new Headers();
  header.append("Content-Type", "application/json");
  header.append("Authorization", "Bearer " + authContext.token);

  useEffect(() => {
    if (!authContext.isLogin) {
      history.replace("/login");
    }
  }, []);

  useEffect(() => {
    checkSnackBar();
  }, [authContext.isSuccess]);

  useEffect(() => {
    getAllMenu();
    getOpenedMenu();
    checkSnackBar();
  }, []);

  const checkSnackBar = () => {
    console.log(authContext);

    if (authContext.isSuccess) {
      setSnackBarOpen(true);
    }
    setTimeout(() => {
      setSnackBarOpen(false);
      authContext.setSuccess("");
    }, 3000);
  };

  const getAllMenu = () => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:4000/get-all-menu",
          "POST",
          JSON.stringify({}),
          header
        );

        console.log(responseData);
        if (responseData.status === 403) {
          history.logout();
          history.replace("/login");
        } else if (responseData.status === 200) {
          setFood(responseData.menu.filter((item) => item.type === "food"));
          setDrink(responseData.menu.filter((item) => item.type === "drink"));
        }
      } catch (err) {
        // done in http-hook.js
      }
    };
    fetchData();
  };

  const getOpenedMenu = () => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:4000/get-opened-menu",
          "POST",
          JSON.stringify({}),
          header
        );

        console.log(responseData);
        if (responseData.status === 403) {
          authContext.logout();
          history.replace("/login");
        } else if (responseData.status === 200) {
          if (responseData.menu !== null) {
            setOpened(responseData.menu);
          }
        }
      } catch (err) {
        // done in http-hook.js
      }
    };
    fetchData();
  };

  return (
    <header className="admin-page-header">
      <Box className="admin-page-box">
        <FoodPaper type={"food"} width={36}>
          {food.length > 0 && <MenuItemList list={food}></MenuItemList>}
        </FoodPaper>
        <FoodPaper type={"drink"} width={36}>
          {drink.length > 0 && <MenuItemList list={drink}></MenuItemList>}
        </FoodPaper>
        <FoodPaper type={"order"} width={72}>
          {opened.length > 0 && <OrderItemList list={opened}></OrderItemList>}
        </FoodPaper>
      </Box>
      <SnackBar
        isOpen={isSnackBarOpen}
        text={authContext.successText}
      ></SnackBar>
    </header>
  );
};

export default AdminPage;
