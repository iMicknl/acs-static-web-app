import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
    config: {
        connectionString: 'InstrumentationKey=f2b76161-4631-4873-910f-26efc0ff800a;IngestionEndpoint=https://centralus-0.in.applicationinsights.azure.com/',
        extensions: [reactPlugin],
        extensionConfig: {
          [reactPlugin.identifier]: { history: window.history }
        }
    }
});
appInsights.loadAppInsights();

export { reactPlugin, appInsights };