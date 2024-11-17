using Microsoft.AspNetCore.Mvc;
using HomeFlow.Models.Data;
using HomeFlow.Models.Request;
using HomeFlow.Models.Response;
using HomeFlow.Services;

namespace HomeFlow.Controllers;

[ApiController]
[Route("/patientneedtype")]
public class PatientNeedTypeController : Controller
{
    private readonly IPatientNeedTypeService _service;

    public PatientNeedTypeController(IPatientNeedTypeService service)
    {
        _service = service;
    }

    [HttpGet("")]
    public IActionResult GetAllPatientNeedType()
    {
        try
        {
            PatientNeedTypeResponse patientNeedTypeResponse = _service.GetAllPatientNeedType();
            return Ok(patientNeedTypeResponse);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
