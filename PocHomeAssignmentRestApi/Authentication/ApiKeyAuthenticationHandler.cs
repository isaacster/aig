using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace PocHomeAssignmentRestApi.Authentication
{
    public class ApiKeyAuthenticationOptions : AuthenticationSchemeOptions
    {
        public string ApiKey { get; set; }

        public const string Scheme = "ApiKeyAuthenticationScheme";
    }

    public class ApiKeyAuthenticationHandler : AuthenticationHandler<ApiKeyAuthenticationOptions>
    {
        public ApiKeyAuthenticationHandler(
            IOptionsMonitor<ApiKeyAuthenticationOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock)
            : base(options, logger, encoder, clock)
        {
        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Request.Headers.TryGetValue("Authorization", out var apiKeyValue))
            {
                return AuthenticateResult.Fail("API key is missing.");
            }

            string bearerToken = apiKeyValue.ToString();

            if (string.IsNullOrEmpty(bearerToken))
            {
                return AuthenticateResult.Fail("API key is empty.");
            }


            // not sure about this bug, didn't have time to solve it properly 
            if (bearerToken.StartsWith("Bearer"))
            {
                bearerToken = bearerToken.Replace("Bearer", "");
            }

            var apiKey = bearerToken.ToString().Trim();
            if (apiKey != Options.ApiKey)
            {
                return AuthenticateResult.Fail("Invalid API key.");
            }

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, "API User"),
                // Add any additional claims if needed
            };

            var identity = new ClaimsIdentity(claims, Scheme.Name);
            var principal = new ClaimsPrincipal(identity);
            var ticket = new AuthenticationTicket(principal, Scheme.Name);

            return AuthenticateResult.Success(ticket);
        }
    }
}
