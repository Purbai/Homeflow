using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using HomeFlow.Models.Data;
using HomeFlow.Models.Request;
using HomeFlow.Models.Response;
using HomeFlow.Services;
using System;
using System.Threading.Tasks;

namespace HomeFlow.Controllers;

[Authorize]
[ApiController]
[Route("/patient")]
public class PatientController : Controller
{
    private readonly IPatientService _patientService;

    public PatientController(IPatientService patientService)
    {
        _patientService = patientService;
    }

    [HttpGet("{patientId}")]
    public IActionResult GetBySightingId([FromRoute] int patientId)
    {
        try
        {
            SinglePatientResponse patient = _patientService.GetSinglePatientResponse(patientId);
                return Ok(patient);

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create(PatientRequest patientRequest)
    {
        try
        {
            await _patientService.CreatePatient(patientRequest);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("")]
    public ActionResult<PatientListResponse> GetApproved()
    {
        try
        {
            PatientListResponse patient = _patientService.GetApproved();
            return Ok(patient);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{patientId}/delete")]
    public async Task<IActionResult> Delete([FromRoute] int patientId)
    {
        try
        {
            await _patientService.DeletePatient(patientId);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{patientId}/update")]
    public async Task<IActionResult> Update(PatientRequest patientRequest, [FromRoute] int patientId)
    {
        try
        {
            await _patientService.UpdatePatient(patientRequest, patientId);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
