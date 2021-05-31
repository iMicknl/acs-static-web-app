import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import { CallContainer } from "./CallContainer";
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/join">
          <Join />
        </Route>
        <Route path="/call">
          <Call />
        </Route>
      </Switch>
    </Router>
  );
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <ProgressIndicator label="Example title" description="Example description" />
    </div>
  );
}

function Join() {
  let query = useQuery();

  return (
    <div>
      <h2>Join call {query.get("id")}</h2>
      <CallContainer />
    </div>
  );
}

function Call() {
  return (
    <div>
      <h2>Call</h2>
    </div>
  );
}
