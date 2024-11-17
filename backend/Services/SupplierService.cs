using Microsoft.EntityFrameworkCore;
using HomeFlow.Models.Data;
using HomeFlow.Models.Request;
using HomeFlow.Models.Response;

namespace HomeFlow.Services;

public interface ISupplierService
{
    public SupplierResponse GetAllSupplier();
    public Task<Supplier> GetSupplierById(int supplierId);
}

public class SupplierService : ISupplierService
{
    private readonly HomeFlowContext _context;

    public SupplierService(HomeFlowContext context)
    {
        _context = context;
    }

    public SupplierResponse GetAllSupplier()
    {
        SupplierResponse supplierResponse = new SupplierResponse() { ListOfSupplier = _context.Supplier.ToList() };
        return supplierResponse;
    }

    public async Task<Supplier> GetSupplierById(int supplierId)
    {
        try
        {
            Supplier supplier = _context.Supplier.Single(supplier => supplier.Id == supplierId);
            return supplier;
        }
        catch
        {
            throw new InvalidOperationException($"Supplier with ID {supplierId} not found");
        }
    }
}
