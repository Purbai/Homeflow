import { useNavigate, useParams } from "react-router-dom"
import "./IndividualPatient.scss"
import { deletePatient, getPatientById, Patient } from "../../api/backendClient"
import { LoginContext } from "../../Components/LoginManager/LoginManager"
import { useContext, useEffect, useState } from "react"
import { DeletePatientModal } from "../../Components/DeletePatientModal/DeletePatientModal"

export function IndividualPatient() {
  const [patient, setPatient] = useState<Patient | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const params = useParams()
  const loginContext = useContext(LoginContext)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    getPatientById(loginContext.jwt, Number(params.id))
      .then((response) => setPatient(response))
      .catch((error) => setError(error.message))
  }, [loginContext.jwt, params.id])

  if (error) {
    return <div className="px-4">You are not authorized to view this page, please log in</div>
  }

  if (!patient) {
    return <div>Loading...</div>
  }

  const patientData = {
    id: patient?.id,
    name: patient?.name,
    gender: patient?.gender,
    procedureType: patient?.procedureType,
    patientNeedTypeId: patient?.patientNeedTypeId,
    needDescription : patient.needDescription,
    needOther: patient?.needOther,
    postcode: patient?.postcode,
    startDate : patient?.startDate,
    expectedDurationDays : patient.expectedDurationDays,
    isCarePackage : patient.isCarePackage,
    carePackageReqByDate : patient.carePackageReqByDate,
    actualLeaveDate : patient.actualLeaveDate
  }

  const getConfirmDelete = (confirmation: boolean) => {
    setShowDeleteModal(false)

    if (confirmation) {
      deletePatient(loginContext.jwt, Number(patient.id))
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              throw new Error()
            })
          }
          navigate("/explore")
          return response.json()
        })
        .catch((error) => {})
    }
  }

  return (
    <div className="container col-10 col-md-6 pt-3 mx-auto">
      <div className="card bg-light mb-3 mt-lg-5 mx-auto">
        <h4 className="card-header py-3 ps-4">Patient Details</h4>
        <div className="card-body px-4">
          <div className="row">
            <div className="col-sm-3">
              <h6 className="card-title mb-0">Patient ID</h6>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{patient.id}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Name</h6>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{patient.name}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Gender</h6>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{patient.gender}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Reason for Admission</h6>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{patient.procedureType}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Patient Need Type</h6>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{patient.patientNeedTypeId} - {patient.needDescription} </p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Need Other</h6>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{patient.needOther}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Postcode</h6>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{patient.postcode}</p>
            </div>
          </div>
        <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Start Date</h6>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{patient.startDate.toLocaleString()}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Start Date</h6>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{patient.startDate.toLocaleString()}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Expected stay duration days?</h6>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{patient.expectedDurationDays}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Is CarePackage Required?</h6>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{patient.isCarePackage}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">CarePackage Req by Date</h6>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{patient.carePackageReqByDate.toLocaleString()}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h6 className="mb-0">Actual Leaver Date</h6>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{patient.actualLeaveDate.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="row g-0">
            <div className="col-6 p-2">
              <button
                id="update-button"
                data-testid="update-button"
                className="btn btn-primary btn-md w-100"
                onClick={() => navigate("/updatepatient", { state: patientData })}
              >
                Update
              </button>
            </div>


            <div className="col-6 p-2">
              <button
                id="delete-button"
                data-testid="delete-button"
                className="btn btn-primary btn-md w-100"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </button>
            </div>
        </div>
      </div>
      {showDeleteModal && <DeletePatientModal getConfirmDelete={getConfirmDelete} />}
    </div>
  )
}
