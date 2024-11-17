using Microsoft.EntityFrameworkCore;
using HomeFlow.Models.Data;
using HomeFlow.Models.Request;
using HomeFlow.Models.Response;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace HomeFlow.Services;

public interface IPatientService
{
    public Task CreatePatient(PatientRequest patientRequest);
    public Task<Patient> GetPatientById(int patientId);
    public PatientListResponse GetApproved();
    public Task DeletePatient(int patientId);
    public Task UpdatePatient(PatientRequest patientRequest, int patientId);
    public SinglePatientResponse GetSinglePatientResponse(int patientId);

}

public class PatientService : IPatientService
{
    private readonly HomeFlowContext _context;
    private readonly IUserService _userservice;
    private readonly IPatientNeedTypeService _patientneedtypeservice;

    //public PatientService(HomeFlowContext context, IUserService userService, ISpeciesService speciesService)
    public PatientService(HomeFlowContext context, IUserService userService, IPatientNeedTypeService patientNeedTypeService)
    {
        _context = context;
        _userservice = userService;
        _patientneedtypeservice = patientNeedTypeService;
    }

    public async Task CreatePatient(PatientRequest patientRequest)
    {
        Patient patient = new Patient()
        {
            Name = patientRequest.Name,
            Gender = patientRequest.Gender,
            ProcedureType = patientRequest.ProcedureType,
            PatientNeedTypeId = patientRequest.PatientNeedTypeId,
            NeedOther = patientRequest.NeedOther,
            Postcode = patientRequest.Postcode,
            StartDate = patientRequest.StartDate,
            ExpectedDurationDays = patientRequest.ExpectedDurationDays,
            IsCarePackage= patientRequest.IsCarePackage,
            CarePackageReqByDate = patientRequest.CarePackageReqByDate,
            ActualLeaveDate = patientRequest.ActualLeaveDate
        };

        await _context.AddAsync(patient);
        await _context.SaveChangesAsync();
    }

    public SinglePatientResponse GetSinglePatientResponse(int patientId)
    {
        var singlepatient = GetPatientById(patientId);

        SinglePatientResponse patient = new SinglePatientResponse()
        {
            Id = singlepatient.Result.Id,
            Name = singlepatient.Result.Name,
            Gender = singlepatient.Result.Gender,
            ProcedureType = singlepatient.Result.ProcedureType,
            PatientNeedTypeId = singlepatient.Result.PatientNeedTypeId,
            NeedOther = singlepatient.Result.NeedOther,
            Postcode = singlepatient.Result.Postcode,
            StartDate = singlepatient.Result.StartDate,
            ExpectedDurationDays = singlepatient.Result.ExpectedDurationDays,
            IsCarePackage= singlepatient.Result.IsCarePackage,
            CarePackageReqByDate = singlepatient.Result.CarePackageReqByDate,
            ActualLeaveDate = singlepatient.Result.ActualLeaveDate
        };
        return patient;
    }

    public PatientListResponse GetApproved()
    {
        List<Patient> patient = _context
            .Patient.Include(p => p.PatientNeedType)
            .ToList();
        PatientListResponse patientListResponse = new PatientListResponse();
        patientListResponse.SetList(patient);
        return patientListResponse;
    }


    public async Task<Patient> GetPatientById(int patientId)
    {
        try
        {
            Patient patient = _context
                .Patient
                .Include(p => p.PatientNeedType)
                .Single(patient => patient.Id == patientId);
            return patient;
        }
        catch
        {
            throw new InvalidOperationException($"Patient with ID {patientId} not found");
        }
    }

    public async Task DeletePatient(int patientId)
    {
        Patient patient = await GetPatientById(patientId);

        try
        {
            _context.Patient.Remove(patient);
            _context.SaveChanges();
        }
        catch
        {
            throw new InvalidOperationException($"Patient with ID {patientId} cannot be deleted");
        }
    }

    public async Task UpdatePatient(PatientRequest patientRequest, int patientId)
    {
        Patient patient = await GetPatientById(patientId);
            patient.Name = patientRequest.Name;
            patient.Gender = patientRequest.Gender;
            patient.ProcedureType = patientRequest.ProcedureType;
            patient.PatientNeedTypeId = patientRequest.PatientNeedTypeId;
            patient.NeedOther = patientRequest.NeedOther;
            patient.Postcode = patientRequest.Postcode;
            patient.StartDate = patientRequest.StartDate;
            patient.ExpectedDurationDays = patientRequest.ExpectedDurationDays;
            patient.IsCarePackage= patientRequest.IsCarePackage;
            patient.CarePackageReqByDate = patientRequest.CarePackageReqByDate;
            patient.ActualLeaveDate = patientRequest.ActualLeaveDate;

        try
        {
            _context.Patient.Update(patient);
            _context.SaveChanges();
        }
        catch
        {
            throw new InvalidOperationException($"Patient with ID {patientId} cannot be updated");
        }
    }

}
