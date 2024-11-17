using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HomeFlow.Models.Data;

public class Supplier
{
    public int Id { get; set; }
    public string SupplierName { get; set; }
    public string SupplierTypeId { get; set; }
    public bool IsAvailability { get; set; }
    public float EstimatedCost { get; set; }
    public ICollection<CarePackage> CarePackage {get;} = new List<CarePackage>();
}