import "./index.css";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import router from "./router";
import { fetchMe } from "./redux/authReducer";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const authUser = useSelector((state) => state.auth.authUser);

  useEffect(() => {
    if (token && !authUser) {
      dispatch(fetchMe());
    }
  }, [token, authUser, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
