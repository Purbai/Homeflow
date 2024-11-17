using System.Collections.Generic;
using System.Runtime.InteropServices;
using HomeFlow.Models.Data;
using HomeFlow.Services;

namespace HomeFlow.Models.Response;

public class PatientListResponse()
{
    public List<PatientResponse> Patient { get; set; }

    public void SetList(List<Patient> PatientList)
    {
        Patient = new List<PatientResponse>();

        foreach (var patient in PatientList)
        {
            PatientResponse patientResponse = new PatientResponse()
            {
                Id = patient.Id,
                Name = patient.Name,
                Gender = patient.Gender,
                ProcedureType = patient.ProcedureType,
                PatientNeedTypeId = patient.PatientNeedTypeId,
                NeedOther = patient.NeedOther,
                Postcode = patient.Postcode,
                StartDate = patient.StartDate,
                ExpectedDurationDays = patient.ExpectedDurationDays,
                IsCarePackage = patient.IsCarePackage,
                CarePackageReqByDate = patient.CarePackageReqByDate,
                ActualLeaveDate = patient.ActualLeaveDate
            };

            Patient.Add(patientResponse);
        }
    }
}
