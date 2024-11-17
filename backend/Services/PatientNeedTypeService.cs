using HomeFlow.Models.Data;
using HomeFlow.Models.Request;
using HomeFlow.Models.Response;

namespace HomeFlow.Services;

public interface IPatientNeedTypeService
{
    public PatientNeedTypeResponse GetAllPatientNeedType();
}

public class PatientNeedTypeService : IPatientNeedTypeService
{
    private readonly HomeFlowContext _context;

    public PatientNeedTypeService(HomeFlowContext context)
    {
        _context = context;
    }

    public PatientNeedTypeResponse GetAllPatientNeedType()
    {
        PatientNeedTypeResponse patientNeedTypeResponse = new PatientNeedTypeResponse()
        {
            ListOfPatientNeedType = _context.PatientNeedType.ToList()
        };
        return patientNeedTypeResponse;
    }
}
