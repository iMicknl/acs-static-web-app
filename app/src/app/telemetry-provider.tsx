import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
    config: {
        connectionString: 'InstrumentationKey=92bcf29b-10cd-4e80-8298-a9e867680f1a;IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com/',
        extensions: [reactPlugin],
        // extensionConfig: {
        //   [reactPlugin.identifier]: { history: window.history }
        // }
    }
});

export { reactPlugin, appInsights };