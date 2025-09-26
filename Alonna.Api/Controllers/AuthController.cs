using Microsoft.AspNetCore.Mvc;
using Alonna.Api.Data;
using Alonna.Api.DTOs;
using Alonna.Api.Services;

namespace Alonna.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class AuthController : ControllerBase
{
    private readonly IUserRepository _repo;
    private readonly IPasswordHasher _hasher;

    public AuthController(IUserRepository repo, IPasswordHasher hasher)
    {
        _repo = repo;
        _hasher = hasher;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest req, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(req.Username) || string.IsNullOrWhiteSpace(req.Password))
            return BadRequest(new { error = "Username and password are required." });

        var user = await _repo.FindByUsernameAsync(req.Username.Trim(), ct);
        if (user is null || string.IsNullOrEmpty(user.PasswordHash))
            return Unauthorized(new { error = "Invalid username or password." });

        if (!_hasher.Verify(req.Password, user.PasswordHash))
            return Unauthorized(new { error = "Invalid username or password." });

        await _repo.UpdateLastLoginAsync(user.Id, ct);

        var res = new LoginResponse
        {
            Id = user.Id,
            Username = user.Username ?? "",
            DisplayName = user.DisplayName,
            Email = user.Email
        };
        return Ok(res);
    }
}
