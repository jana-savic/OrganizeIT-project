import Auth from './components/Auth';
import { useCookies } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from './pages/Main';
import Visitor from './pages/Visitor';

const App = () => {
  const [cookies] = useCookies(null)
  const authToken = cookies.AuthToken

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={authToken ? <Main /> : <Visitor />} />
        <Route path="/auth" element={authToken ? <Main /> : <Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
