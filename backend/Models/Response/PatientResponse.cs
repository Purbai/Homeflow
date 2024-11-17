using System;
using HomeFlow.Models.Data;

namespace HomeFlow.Models.Response;

public class PatientResponse
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Gender { get; set; }
    public string ProcedureType { get; set; }
    public int PatientNeedTypeId { get; set; }
    public  string NeedDescription {get;set;}
    public string NeedOther { get; set; }
    public string? Postcode { get; set; }
    public DateTime StartDate { get; set; }
    public int ExpectedDurationDays {get;set;}
    public bool IsCarePackage { get; set; } = false;
    public DateTime CarePackageReqByDate {get;set;}
    public DateTime ActualLeaveDate {get;set;}
}
