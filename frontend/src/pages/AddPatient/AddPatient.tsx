import React, { FormEvent, useContext } from "react"
import { useState } from "react"
import { PatientNeedDropdown } from "../../Components/PatientNeedDropdown/PatientNeedDropdown"
import "./AddPatient.scss"
import { useNavigate } from "react-router-dom"
import { LoginContext } from "../../Components/LoginManager/LoginManager"
import { createPatient } from "../../api/backendClient"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateTimePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import "dayjs/locale/en-gb"
//import { AreaLocationDropdown } from "../../Components/AreaLocationDropDown/AreaLocationDropDown"

export function AddPatient(): JSX.Element {
  const loginContext = useContext(LoginContext)

  const [expectedDurationDays, setExpectedDurationDays] = useState(3)
  const [postcode, setPostcode] = useState("N1 7NG")
  const [needOther, setNeedOther] = useState("Package of care twice daily")
  const [gender, setGender] = useState("Male")
  const [procedureType, setProcedureType] = useState("Fall")
  const [patientNeedTypeId, setPatientNeedTypeId] = useState(4)
  const [name, setName] = useState("John Doe")
  const [startDate, setStartDate] = useState<Dayjs>(dayjs())
  const [actualLeaveDate, setActualLeaveDate] = useState<Dayjs>(dayjs())
  const [carePackageReqByDate, setCarePackageReqByDate] = useState<Dayjs>(dayjs())
  const [isCarePackage, setIsCarePackage] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  async function submitPatient(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await createPatient(
        loginContext.jwt,
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

      if (!response.ok) {
        setErrorMessage("Oh no! Something did not go swimmingly, please try again.")
      } else {
        console.log("New pic uploaded")
        navigate("/explore")
      }
    } catch (err) {
      setErrorMessage("Error: Please contact support.")
    }
  }

  function getPatientNeedIdFromDropdown(patientNeedIdFromDropdown: number) {
    setPatientNeedTypeId(patientNeedIdFromDropdown)
  }


  return (
    <div className="add-a-sighting-page container justify-content-center">
      <h1 className="title pt-4">Add a Patient</h1>
      <div className="container col-10 pt-3 mx-auto">
        <p className="row justify-content-center">{errorMessage}</p>
        <form className="addSighting-form container justify-content-center row" method="post" onSubmit={submitPatient}>


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
          <button type="submit" className="btn btn-outline-success px-4" style={{ width: "200px" }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
