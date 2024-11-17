using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HomeFlow.Models.Data;

public class CarePackage
{
    [Key]
    public int Id {get;set;}
    public string CarePackageDesc { get; set; }
    public int SupplierId { get; set; }
    public Supplier Supplier {get;set;}
}
