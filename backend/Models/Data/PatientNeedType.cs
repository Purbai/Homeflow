using System.Collections.Generic;

namespace HomeFlow.Models.Data;

public class PatientNeedType
{
    public int Id { get; set; }
    public string NeedDescription { get; set; } = string.Empty;
    public int CareDuration { get; set; } 
    public bool IsTransportRequired { get; set; } 
    public string TransportTypeId { get; set; } = string.Empty;
    public string OtherDescription { get; set; } = string.Empty;
    public ICollection<Patient> Patient {get;} = new List<Patient>();
}
