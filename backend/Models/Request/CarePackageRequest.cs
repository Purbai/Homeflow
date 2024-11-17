using System;

namespace HomeFlow.Models.Request;

public class CarePackageRequest
{
    public int CarePackageId { get; set; }
    public string SupplierId { get; set; }
}