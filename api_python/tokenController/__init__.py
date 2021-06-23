import logging
import os
import json
import azure.functions as func
from azure.communication.identity import CommunicationIdentityClient

connection_string = os.environ["AzureCommunicationServicesConnectionString"]
client = CommunicationIdentityClient.from_connection_string(connection_string)

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    identity_token_result = client.create_user_and_token(["voip"])

    result = {
        "token": identity_token_result[1].token,
        "expiresOn": identity_token_result[1].expires_on.isoformat(),
        "user": {
            "communicationUserId": identity_token_result[0].properties['id']
        } 
    }

    return func.HttpResponse(
        json.dumps(
            result
        ),
        status_code=200
    )
