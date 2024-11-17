import { FormEvent, useContext, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { updatePatient } from "../../api/backendClient"
import { LoginContext } from "../../Components/LoginManager/LoginManager"
import { PatientNeedDropdown } from "../../Components/PatientNeedDropdown/PatientNeedDropdown"
import "./UpdatePatient.scss"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateTimePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import "dayjs/locale/en-gb"

export function UpdatePatient(): JSX.Element {
  const loginContext = useContext(LoginContext)
  const location = useLocation()
  const patientData = location.state


  const [expectedDurationDays, setExpectedDurationDays] = useState(patientData.expectedDurationDays)
  const [postcode, setPostcode] = useState(patientData.postcode)
  const [needOther, setNeedOther] = useState(patientData.needOther)
  const [gender, setGender] = useState(patientData.gender)
  const [procedureType, setProcedureType] = useState(patientData.procedureType)
  const [patientNeedTypeId, setPatientNeedTypeId] = useState(patientData.patientNeedTypeId)
  const [name, setName] = useState(patientData.name)
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(patientData.startDate))
  const [actualLeaveDate, setActualLeaveDate] = useState<Dayjs>(dayjs(patientData.actualLeaveDate))
  const [carePackageReqByDate, setCarePackageReqByDate] = useState<Dayjs>(dayjs(patientData.carePackageReqByDate))
  const [isCarePackage, setIsCarePackage] = useState<boolean>(patientData.isCarePackage)

  const [error, setError] = useState(null)

  const navigate = useNavigate()

  function tryPatientUpdate(event: FormEvent) {
    event.preventDefault()
    updatePatient(
      loginContext.jwt,
      patientData.id,
      name,
      gender,
      procedureType,
      patientNeedTypeId,
      needOther,
      postcode,
      startDate.toDate(),
      expectedDurationDays,
      isCarePackage,
      carePackageReqByDate?.toDate(),
      actualLeaveDate?.toDate(),
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(JSON.stringify(errorData.errors))
          })
        }
        navigate(`/patient/${patientData.id}`)
      })
      .then(() => {
        navigate(`/patient/${patientData.id}`)
      })
      .catch((error) => {
        setError(error.message)
      })
  }
  function getPatientNeedIdFromDropdown(speciesIdFromDropdown: number) {
    setPatientNeedTypeId(speciesIdFromDropdown)
  }

  return (
    <div className="container col-10 col-md-6 pt-4 mx-auto text-center">
      <div className="row">
        <h1 className="title">Update Sighting no.{patientData.id}</h1>
      </div>
      <div className="row justify-content-center">
        <form className="form container justify-content-center row" onSubmit={tryPatientUpdate}>
        <div className="form-group row justify-content-center pb-4">
            <label htmlFor="name" className="col-lg-3 col-sm-2 col-form-label">
              Name:
            </label>
            <div className="col-lg-7 col-sm-3">
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
          </div>
          <div className="form-group row justify-content-center pb-4">
            <label htmlFor="gender" className="col-lg-3 col-sm-2 col-form-label">
              Gender:
            </label>
            <div className="col-lg-7 col-sm-3">
              <input
                type="text"
                id="gender"
                className="form-control"
                value={gender}
                onChange={(event) => setGender(event.target.value)}
              />
            </div>
          </div>
          <div className="form-group row justify-content-center pb-4">
            <label htmlFor="procedureType" className="col-lg-3 col-sm-2 col-form-label">
            Reason for Admission:
            </label>
            <div className="col-lg-7 col-sm-3">
              <input
                type="text"
                id="procedureType"
                className="form-control"
                required
                value={procedureType}
                onChange={(event) => setProcedureType(event.target.value)}
              />
            </div>
          </div>
          <div className="form-group row justify-content-center pb-4">
            <label htmlFor="patientNeedTypeId" className="col-lg-3 col-sm-2 col-form-label">
              Patient Need Type:
            </label>
            <div className="col-lg-7 col-sm-3">
              <PatientNeedDropdown getPatientNeedIdFromDropdown={getPatientNeedIdFromDropdown} />
            </div>
          </div>
          <div className="form-group row justify-content-center pb-4">
            <label htmlFor="needOther" className="col-lg-3 col-sm-2 col-form-label">
              Need Other:
            </label>
            <div className="col-lg-7 col-sm-3">
              <textarea
                id="needOther"
                className="form-control"
                value={needOther}
                onChange={(event) => setNeedOther(event.target.value)}
              />
            </div>
          </div>
          <div className="form-group row justify-content-center pb-4">
            <label htmlFor="postcode" className="col-lg-3 col-sm-2 col-form-label">
            Postcode:
            </label>
            <div className="col-lg-7 col-sm-3">
              <input
                type="text"
                id="postcode"
                className="form-control"
                required
                value={postcode}
                onChange={(event) => setPostcode(event.target.value)}
              />
            </div>
          </div>
          <div className="form-group row justify-content-center pb-4">
            <label htmlFor="startDate" className="col-lg-3 col-sm-2 col-form-label">
              Start Date:
            </label>
            <div className="col-lg-7 col-sm-3">
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                <DateTimePicker
                  defaultValue={dayjs()}
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue ? newValue : dayjs())}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="form-group row justify-content-center pb-4">
            <label htmlFor="expectedDurationDays" className="col-lg-3 col-sm-2 col-form-label">
            Expected duration days:
            </label>
            <div className="col-lg-7 col-sm-3">
              <input
                type="number"
                id="postExpectedDurationDayscode"
                className="form-control"
                required
                value={expectedDurationDays}
                onChange={(event) => setExpectedDurationDays(parseInt(event.target.value))}
              />
            </div>
          </div>
{/*           <div className="form-group row justify-content-center pb-4">
            <label htmlFor="isCarePackage" className="col-lg-3 col-sm-2 col-form-label">
            Care Package Req?:
            </label>
            <div className="col-lg-7 col-sm-3">
              <input
                type="checkbox"
                id="isCarePackage"
                className="form-control"
                required
                value={isCarePackage}
                onChange={(event) => setIsCarePackage(event.target.value)}
              />
            </div>
          </div> */}
          <div className="form-group row justify-content-center pb-4">
            <label htmlFor="carePackageReqByDate" className="col-lg-3 col-sm-2 col-form-label">
              Care Packaged Req by Date:
            </label>
            <div className="col-lg-7 col-sm-3">
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                <DateTimePicker
                  defaultValue={dayjs()}
                  value={carePackageReqByDate}
                  onChange={(newValue) => setCarePackageReqByDate(newValue ? newValue : dayjs())}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="form-group row justify-content-center pb-4">
            <label htmlFor="actualLeaveDate" className="col-lg-3 col-sm-2 col-form-label">
              Actual Leave Date:
            </label>
            <div className="col-lg-7 col-sm-3">
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                <DateTimePicker
                  defaultValue={dayjs()}
                  value={actualLeaveDate}
                  onChange={(newValue) => setActualLeaveDate(newValue ? newValue : dayjs())}
                />
              </LocalizationProvider>
            </div>
          </div>

          <div>
            <div className="col-sm-10 my-3">
              <button className="btn btn-outline-success px-4" style={{ width: "200px" }} onClick={tryPatientUpdate}>
                Update
              </button>
            </div>
          </div>
          {error && <p style={{ color: "red" }}> {error}</p>}
        </form>
      </div>
    </div>
  )
}
