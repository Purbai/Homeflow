using Microsoft.EntityFrameworkCore;
using HomeFlow.Migrations;
using HomeFlow.Models.Data;

namespace HomeFlow.SeedData
{
    public class SeedSupplier
    {
        private readonly HomeFlowContext _context;

        public SeedSupplier(HomeFlowContext context)
        {
            _context = context;
        }

        private readonly IList<Supplier> DataSupplier = new List<Supplier>
        {
            new Supplier()
            {
                //Id = 1,
                SupplierName = "Plumbing R US",
                SupplierTypeId = "Bathroom fitting",
                IsAvailability = true,
                EstimatedCost = 1000

            },
            new Supplier()
            {
                //Id = 2,
                SupplierName = "District Nursing Agency",
                SupplierTypeId = "District Nurse",
                IsAvailability = true,
                EstimatedCost = 150
            },
        };

        public void SupplierSeed()
        {
            if (!_context.Supplier.Any())
            {
                _context.Supplier.AddRange(DataSupplier);
                _context.SaveChanges();
            }
        }
    }
}
