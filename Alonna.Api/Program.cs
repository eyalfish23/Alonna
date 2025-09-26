using Alonna.Api.Data;
using Alonna.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services.AddControllers();
builder.Services.AddSingleton<IUserRepository, UserRepository>();
builder.Services.AddSingleton<IPasswordHasher, PasswordHasher>();

// CORS (allow RN dev)
builder.Services.AddCors(o =>
{
    o.AddPolicy("dev", p => p
        .AllowAnyHeader()
        .AllowAnyMethod()
        .SetIsOriginAllowed(_ => true)
        .AllowCredentials());
});

var app = builder.Build();

app.UseCors("dev");
app.MapControllers();

app.Run("http://0.0.0.0:5211");
