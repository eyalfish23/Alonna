using System.Data;
using Microsoft.Data.SqlClient;
using Alonna.Api.Models;

namespace Alonna.Api.Data;

public interface IUserRepository
{
    Task<User?> FindByUsernameAsync(string username, CancellationToken ct);
    Task UpdateLastLoginAsync(long id, CancellationToken ct);
}

public sealed class UserRepository : IUserRepository
{
    private readonly string _cs;
    public UserRepository(IConfiguration cfg)
        => _cs = cfg.GetConnectionString("DefaultDb")!;

    public async Task<User?> FindByUsernameAsync(string username, CancellationToken ct)
    {
        const string sql = @"
SELECT TOP 1 *
FROM dbo.Users
WHERE Username = @u AND IsActive = 1;";

        await using var conn = new SqlConnection(_cs);
        await conn.OpenAsync(ct);

        await using var cmd = new SqlCommand(sql, conn);
        cmd.Parameters.Add(new SqlParameter("@u", SqlDbType.NVarChar, 100) { Value = username });

        await using var r = await cmd.ExecuteReaderAsync(ct);
        if (!await r.ReadAsync(ct)) return null;

        return new User
        {
            Id = r.GetInt64(r.GetOrdinal("Id")),
            Username = r["Username"] as string,
            Email = (string)r["Email"],
            PasswordHash = r["PasswordHash"] as string,
            DisplayName = r["DisplayName"] as string,
            IsActive = (bool)r["IsActive"],
            AuthProvider = r["AuthProvider"] as string,
            ProviderUserId = r["ProviderUserId"] as string,
            LastLoginAt = r["LastLoginAt"] as DateTime?,
            CreatedAt = (DateTime)r["CreatedAt"],
            UpdatedAt = (DateTime)r["UpdatedAt"]
        };
    }

    public async Task UpdateLastLoginAsync(long id, CancellationToken ct)
    {
        const string sql = @"UPDATE dbo.Users SET LastLoginAt = SYSUTCDATETIME() WHERE Id = @id;";
        await using var conn = new SqlConnection(_cs);
        await conn.OpenAsync(ct);
        await using var cmd = new SqlCommand(sql, conn);
        cmd.Parameters.Add(new SqlParameter("@id", SqlDbType.BigInt) { Value = id });
        await cmd.ExecuteNonQueryAsync(ct);
    }
}
