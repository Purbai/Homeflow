using Microsoft.AspNetCore.Identity;
using HomeFlow.Models.Data;

namespace HomeFlow.SeedData;

public static class SampleUsers
{
    public const int NumberOfUsers = 2;

    private static readonly IList<IList<string>> DataUsers = new List<IList<string>>
    {
        new List<string> { "Sam", "White", "sam1", "user1@gmail.com", "Pa$$word1" },
        new List<string> { "Evie", "Brown", "evie2", "user2@gmail.com", "Pa$$word2" },
    };

    public static async Task CreateAdminAsync(UserManager<User> userManager)
    {
        var adminUser = new User
        {
            FirstName = "John",
            LastName = "Wick",
            UserName = "Admin",
            Email = "admin@email.com",
        };
        string adminPassword = "Pa$$word123";

        var createAdminUser = await userManager.CreateAsync(adminUser, adminPassword);
        if (createAdminUser.Succeeded)
        {
            await userManager.AddToRoleAsync(adminUser, "Admin");
        }
    }

    public static async Task CreateUsersAsync(UserManager<User> userManager)
    {
        foreach (var data in DataUsers)
        {
            var user = new User
            {
                FirstName = data[0],
                LastName = data[1],
                UserName = data[2],
                Email = data[3],
            };
            string userPassword = data[4];

            var createUser = await userManager.CreateAsync(user, userPassword);
            if (createUser.Succeeded)
            {
                await userManager.AddToRoleAsync(user, "User");
            }
        }
    }
}
