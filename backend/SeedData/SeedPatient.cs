using Microsoft.EntityFrameworkCore;
using HomeFlow.Migrations;
using HomeFlow.Models.Data;

namespace HomeFlow.SeedData
{
    public class SeedPatient
    {
        private readonly HomeFlowContext _context;

        public SeedPatient(HomeFlowContext context)
        {
            _context = context;
        }

        private readonly IList<Patient> DataPatient = new List<Patient>
        {
            new Patient()
            {
                Name = "Mary",
                Gender = "Female",
                ProcedureType =  "Knee Op",
                PatientNeedTypeId = 1,
                NeedOther ="some comment ...",
                Postcode = "N1 7NG",
                StartDate = DateTime.Parse("18Sep2024 10:24:00").ToUniversalTime(),
                ExpectedDurationDays = 3,
                IsCarePackage = true,
                CarePackageReqByDate = DateTime.Parse("21Sep2024 10:24:00").ToUniversalTime(),
                ActualLeaveDate = DateTime.Parse("22Sep2024 10:24:00").ToUniversalTime()
            },


        };

        public void SeedPatients()
        {
            if (!_context.Patient.Any())
            {
                _context.Patient.AddRange(DataPatient);
                _context.SaveChanges();
            }
        }
    }
}
