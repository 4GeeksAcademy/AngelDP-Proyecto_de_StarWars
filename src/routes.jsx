// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Category } from "./pages/Category";
import { ItemDescription } from "./pages/ItemDescription";


export const router = createBrowserRouter(
    createRoutesFromElements(

      <Route path="/" element={ <Layout /> } errorElement={ <h1>Not found!</h1> } >
        <Route index element={ <Home /> } />
        <Route path="/category/:category" element={ <Category /> }/>
        <Route path="/category/:category/:id" element={ <ItemDescription/> }/>
      </Route>
    )
);