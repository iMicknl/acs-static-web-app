import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {
    CommunicationIdentityClient,
  } from '@azure/communication-identity';
import { CommunicationUserIdentifier } from '@azure/communication-common';

const identityClient : CommunicationIdentityClient = new CommunicationIdentityClient(process.env["AzureCommunicationServicesConnectionString"]);

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const identity: CommunicationUserIdentifier = {communicationUserId: context.bindingData.identity};
    const refreshedTokenResponse = await identityClient.getToken(identity, ["voip"]);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: refreshedTokenResponse
    };

};

export default httpTrigger;
