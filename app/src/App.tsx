import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import { CallContainer } from "./CallContainer";
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator';
import { Stack, Text, Link, FontWeights, IStackTokens } from '@fluentui/react';

const boldStyle = { root: { fontWeight: FontWeights.semibold } };
const stackTokens: IStackTokens = { childrenGap: 15 };

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
      <Stack
      horizontalAlign="center"
      verticalAlign="center"
      verticalFill
      styles={{
        root: {
          width: '960px',
          margin: '0 auto',
          textAlign: 'center',
          color: '#605e5c',
        },
      }}
      tokens={stackTokens}
    >
      <Text variant="xxLarge" styles={boldStyle}>
        Home
      </Text>
      <Text variant="large">Join call</Text>
    </Stack>
    </div>
  );
}

function Join() {
  let query = useQuery();

  return (
    <div>
      <Stack
      horizontalAlign="start"
      verticalAlign="center"
      verticalFill
      styles={{
        root: {
          width: '960px',
          margin: '0 auto',
          textAlign: 'center',
          color: '#605e5c',
        },
      }}
      tokens={stackTokens}
    >
      <Text variant="xxLarge" styles={boldStyle}>
        Home
      </Text>

      <CallContainer />

      <Text variant="large">Join call {query.get("id")}</Text>
    </Stack>
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
