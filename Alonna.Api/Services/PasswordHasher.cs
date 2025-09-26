using BCrypt.Net;

namespace Alonna.Api.Services;

public interface IPasswordHasher
{
    bool Verify(string plain, string hash);
}

public sealed class PasswordHasher : IPasswordHasher
{
    public bool Verify(string plain, string hash)
        => BCrypt.Net.BCrypt.Verify(plain, hash);
}
