using System;

namespace HomeFlow.Models.Request;

public class BedsRequest
{
    public string ProviderId { get; set; }
    public int BedTypeId { get; set; }
    public int PatientId { get; set; }
    public bool IsOccupied { get; set; }
    public DateOnly StartDate {get;set;}
    public DateOnly ExpectedLeaveDate {get;set;}
}
