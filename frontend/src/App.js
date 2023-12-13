import Router from "./Routes";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL;
  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Router />
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
}

export default App;
