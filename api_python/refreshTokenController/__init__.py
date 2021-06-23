import logging
import os
import json

import azure.functions as func
from azure.communication.identity import CommunicationIdentityClient, CommunicationUserIdentifier

connection_string = os.environ["AzureCommunicationServicesConnectionString"]
client = CommunicationIdentityClient.from_connection_string(connection_string)

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    identity = CommunicationUserIdentifier(req.route_params.get('identity'))
    token_result = client.get_token( identity, ["voip"])

    return func.HttpResponse(
        json.dumps({"token": token_result.token, "expiresOn": token_result.expires_on.isoformat()}),
        status_code=200
    )
