# acs-static-web-app

Azure Communication Services meets Azure Static Web Apps.

Implementation of the [Calling sample](https://github.com/Azure/communication-ui-library/tree/main/samples/Calling) with an back-end powered by Azure Functions. This repository contains a back-end implmementation in C# (.NET Core 5), Node and Python.

## Requirements

- [Node.js (12.18.4 and above)](https://nodejs.org/en/download/)

## How to use

### Development

During development, you can run the front-end and back-end seperately. 
https://docs.microsoft.com/en-us/azure/static-web-apps/local-development
`npm run dev`

[todo SSL explanation]

## app

React front-end based on [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) and the [Calling sample](https://github.com/Azure/communication-ui-library/tree/main/samples/Calling). Currently using latest alpha version of [@azure/communication-react](https://www.npmjs.com/package/@azure/communication-react).

## api

Back-end based on Node.

## Alternatives

**api_dotnetcore5** 
Azure Functions

`npm i -g azure-functions-core-tools@3 --unsafe-perm true` 
