using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HomeFlow.Models.Data;

public class Beds
{
    [Key]
    public int Id { get; set; }
    public string ProviderId { get; set; }
    public int BedTypeId { get; set; }
    public int PatientId { get; set; }
    public bool IsOccupied { get; set; }
    public DateOnly StartDate {get;set;}
    public DateOnly ExpectedLeaveDate {get;set;}
}
