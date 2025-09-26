namespace Alonna.Api.Auth;

public class LoginRequest
{
    public string? UsernameOrEmail { get; set; }  // preferred
    public string? Username { get; set; }         // allow frontend to send this
    public string? Email { get; set; }            // ...or this
    public string Password { get; set; } = "";
}

public record LoginResponse(long UserId, string DisplayName, string Email, string Token);