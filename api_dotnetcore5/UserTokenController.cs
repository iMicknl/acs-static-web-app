using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Azure;
using Azure.Communication;
using Azure.Communication.Identity;

using System;

using System.Threading.Tasks;

namespace Contoso.API
{

    public class UserTokenController
    {

        private static CommunicationIdentityClient client = new CommunicationIdentityClient(Environment.GetEnvironmentVariable("AzureCommunicationServicesConnectionString"));

        [Function("token")]
        public static async Task<HttpResponseData> GetToken([HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequestData req,
            FunctionContext executionContext)
        {
            var logger = executionContext.GetLogger("UserTokenController");

            try
            {
                // Issue an identity and an access token with the "voip" scope for the new identity
                var identityAndTokenResponse = await client.CreateUserAndTokenAsync(scopes: new[] { CommunicationTokenScope.VoIP });
                var identity = identityAndTokenResponse.Value.User;
                var token = identityAndTokenResponse.Value.AccessToken.Token;
                var expiresOn = identityAndTokenResponse.Value.AccessToken.ExpiresOn;

                logger.LogInformation($"\nCreated an identity with ID: {identity.Id}");
                logger.LogInformation($"\nIssued an access token with 'voip' scope that expires at {expiresOn}:");
                logger.LogInformation(token);

                var jsonFormattedUser = new
                {
                    communicationUserId = identity.Id
                };

                var clientResponse = new
                {
                    user = jsonFormattedUser,
                    token = token,
                    expiresOn = expiresOn
                };

                var okResponse = req.CreateResponse(HttpStatusCode.OK);
                await okResponse.WriteAsJsonAsync(clientResponse);

                return okResponse;
            }
            catch (RequestFailedException ex)
            {
                logger.LogInformation($"Error occured while Generating Token: {ex}");

                var exceptionResponse = req.CreateResponse(HttpStatusCode.InternalServerError);
                await exceptionResponse.WriteStringAsync(ex.ToString()).ConfigureAwait(false);

                return exceptionResponse;
            }
        }


        [Function("refreshToken/{identity}")]
        public static async Task<HttpResponseData> RefreshToken([HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequestData req,
            FunctionContext executionContext, string identity)
        {
            var logger = executionContext.GetLogger("UserTokenController");

            try
            {
                // Read the identity and create an access token with the "voip" scope
                var identityToRefresh = new CommunicationUserIdentifier(identity);
                var tokenResponse = await client.GetTokenAsync(identityToRefresh, scopes: new[] { CommunicationTokenScope.VoIP });

                var clientResponse = new
                {
                    token = tokenResponse.Value.Token,
                    expiresOn = tokenResponse.Value.ExpiresOn
                };

                var okResponse = req.CreateResponse(HttpStatusCode.OK);
                await okResponse.WriteAsJsonAsync(clientResponse);

                return okResponse;
            }
            catch (RequestFailedException ex)
            {
                logger.LogInformation($"Error occured while refreshing Token: {ex}");

                var exceptionResponse = req.CreateResponse(HttpStatusCode.InternalServerError);
                await exceptionResponse.WriteStringAsync(ex.ToString()).ConfigureAwait(false);

                return exceptionResponse;
            }

        }

    }

}