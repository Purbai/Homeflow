using System.ComponentModel.DataAnnotations;

namespace HomeFlow.Models.Request;

public class RegisterUserRequest
{
    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    [RegularExpression(
        @"\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*",
        ErrorMessage = "E-mail address must be in a valid format."
    )]
    public required string Email { get; set; }

    [RegularExpression(@"[a-z0-9]+", ErrorMessage = "Usernames can only contain lowercase letters and digits.")]
    [Length(minimumLength: 1, maximumLength: 32, ErrorMessage = "Usernames must be between 1 and 32 characters long.")]
    public required string UserName { get; set; }

    public required string Password { get; set; }
    public string? AboutMe { get; set; }
}
