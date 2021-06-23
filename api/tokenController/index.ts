import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {
    CommunicationIdentityClient,
  } from '@azure/communication-identity';

const identityClient : CommunicationIdentityClient = new CommunicationIdentityClient(process.env["AzureCommunicationServicesConnectionString"]);

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const identityTokenResponse = await identityClient.createUserAndToken (["voip"]);

    const { token, expiresOn, user } = identityTokenResponse;
    console.log(`\nCreated an identity with ID: ${user.communicationUserId}`);
    console.log(`\nIssued an access token with 'voip' scope that expires at ${expiresOn}:`);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: identityTokenResponse
    };
};

export default httpTrigger;
