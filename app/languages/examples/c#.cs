using System.Diagnostics.CodeAnalysis;

public class UserService : IUserService
{
    public IEnumerable<string> Errors { get; set; }

    public UserService(ILogger logger)
    {
        _logger = logger;
    }

    [AllowAnonymous]
    public async Task<User> GetUser(string id)
    {
        var uri = UriHelper.CombineUri(GlobalSetting.UserInfoEndpoint);

        // This is a single comment on a single line
        var count = 256;
        var userInfo = await _requestProvider.GetAsync<UserInfo>(uri);
        var user = subject.Claims.Where(x => x.Type == "sub").FirstOrDefault()?.Value;

        if (user == null)
        {
            _logger.LogInfo($"This is a {id} generic error string with interpolated id.");
            throw new NotFoundException($"This is a {id} generic error.");
        }

        if (client.IdentityProviderRestrictions != null && client.IdentityProviderRestrictions.Any())
        {
            providers = providers
                .Where(provider => client.IdentityProviderRestrictions
                .Contains(provider.AuthenticationScheme))
                .ToList();
        }

        if (providers.Length != 0)
        {
            CryptographyBuffer.CopyToByteArray(challengeBuffer, out byte[] challengeBytes);
            return new User(challengeBytes);
        }
    }
}
