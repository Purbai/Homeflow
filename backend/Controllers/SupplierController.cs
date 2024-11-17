using Microsoft.AspNetCore.Mvc;
using HomeFlow.Models.Data;
using HomeFlow.Models.Request;
using HomeFlow.Models.Response;
using HomeFlow.Services;

namespace HomeFlow.Controllers;

[ApiController]
[Route("/supplier")]
public class SupplierController : Controller
{
    private readonly ISupplierService _service;

    public SupplierController(ISupplierService service)
    {
        _service = service;
    }

    [HttpGet("")]
    public IActionResult GetAllSuppliers()
    {
        try
        {
            SupplierResponse supplierResponse = _service.GetAllSupplier();
            return Ok(supplierResponse);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
