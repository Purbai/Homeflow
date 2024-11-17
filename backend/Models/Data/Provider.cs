using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HomeFlow.Models.Data;

public class Provider
{
    [Key]
    public int Id { get; set; }
    public string ProviderName { get; set; }
    public string LocationPostcode { get; set; }
    public int NumberOfBeds { get; set; }
    public int BedTypeID { get; set; }
    public int NumberOfFreeBeds {get;set;}
    public ICollection<PatientCare> PatientCare {get;} = new List<PatientCare>();
}
