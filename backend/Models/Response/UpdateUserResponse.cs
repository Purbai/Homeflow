namespace HomeFlow.Models.Request;

public class UpdateUserResponse
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? AboutMe { get; set; }
}
