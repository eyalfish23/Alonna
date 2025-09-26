namespace Alonna.Api.Models;

public class User
{
    public long Id { get; set; }
    public string? Username { get; set; }
    public string Email { get; set; } = null!;
    public string? PasswordHash { get; set; } // bcrypt
    public string? DisplayName { get; set; }
    public bool IsActive { get; set; } = true;
    public string? AuthProvider { get; set; }    // optional
    public string? ProviderUserId { get; set; }  // optional
    public DateTime? LastLoginAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
