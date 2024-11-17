using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HomeFlow.Models.Data;

public class PatientCare
{
    public int PatientCareId { get; set; }
    public int ProviderId { get; set; }
    public Provider Provider {get;set;}
    public int CarePackageId { get; set; }
    public int PatientId { get; set; }
    public bool IsCompleted { get; set; }
    public float Cost {get;set;}
    public DateTime PlannedDate {get;set;}
}
