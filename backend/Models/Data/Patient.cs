using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HomeFlow.Models.Data;

public class Patient
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Gender { get; set; }
    public string ProcedureType { get; set; }
    public int PatientNeedTypeId { get; set; }
    public  PatientNeedType PatientNeedType {get;set;}
    public string NeedOther { get; set; }
    public string? Postcode { get; set; }
    public DateTime StartDate { get; set; }
    public int ExpectedDurationDays {get;set;}
    public bool IsCarePackage { get; set; } = false;
    public DateTime CarePackageReqByDate {get;set;}
    public DateTime ActualLeaveDate {get;set;}
}
