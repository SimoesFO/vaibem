import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { Store } from "./pages/Store";
import { StoresList } from "./pages/StoresList";
export function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} exact />
      <Route path="/signup" component={SignUp} />
      <Route path="/stores" component={StoresList} />
      <Route path="/store" component={Store} />
    </BrowserRouter>
  )
}