using System;

namespace HomeFlow.Models.Request;

public class PatientCare
{
    public int ProviderId { get; set; }
    public int CarePackageId { get; set; }
    public int PatientId { get; set; }
    public bool IsCompleted { get; set; }
    public float Cost {get;set;}
    public DateTime PlannedDate {get;set;}
}
