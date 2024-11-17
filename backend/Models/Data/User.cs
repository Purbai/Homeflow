using Microsoft.AspNetCore.Identity;

namespace HomeFlow.Models.Data;

public class User : IdentityUser<int>
{
    [PersonalData]
    public string? FirstName { get; set; }

    [PersonalData]
    public string? LastName { get; set; }

    [PersonalData]
    public int TotalPointsEarned { get; set; }

    [PersonalData]
    public string? AboutMe { get; set; }

    [PersonalData]
    public bool IsSuspended { get; set; }
}
