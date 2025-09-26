namespace Alonna.Api.DTOs;

public sealed class LoginResponse
{
    public long Id { get; set; }
    public string Username { get; set; } = "";
    public string? DisplayName { get; set; }
    public string Email { get; set; } = "";
}
