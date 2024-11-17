using Microsoft.EntityFrameworkCore;
using HomeFlow.Migrations;
using HomeFlow.Models.Data;

namespace HomeFlow.SeedData
{
    public class SeedPatientNeedType
    {
        private readonly HomeFlowContext _context;

        public SeedPatientNeedType(HomeFlowContext context)
        {
            _context = context;
        }

        private readonly IList<PatientNeedType> DataPatientNeedType = new List<PatientNeedType>
        {
            new PatientNeedType()
            {
                //Id = 1,
                NeedDescription = "Critical Care",
                CareDuration = 10,
                IsTransportRequired = true,
                TransportTypeId = "Ambulance",
                OtherDescription = ""
            },
            new PatientNeedType()
            {
                //Id = 2,
                NeedDescription = "Wheelchair Care",
                CareDuration = 5,
                IsTransportRequired = true,
                TransportTypeId = "Ambulance",
                OtherDescription = ""
            },
            new PatientNeedType()
            {
                //Id = 2,
                NeedDescription = "Home Adjustment",
                CareDuration = 5,
                IsTransportRequired = true,
                TransportTypeId = "Taxi",
                OtherDescription = ""
            },
        };

        public void PatientNeedTypeSeed()
        {
            if (!_context.PatientNeedType.Any())
            {
                _context.PatientNeedType.AddRange(DataPatientNeedType);
                _context.SaveChanges();
            }
        }
    }
}
