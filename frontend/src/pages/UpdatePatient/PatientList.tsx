import React, { useContext, useEffect, useState } from "react"
import { LoginContext } from "../../Components/LoginManager/LoginManager"
import { getPatient } from "../../api/backendClient"
import { Link } from "react-router-dom"

export interface PatientType {
    id: number
    name: string,
    gender: number,
    procedureType: number,
    patientNeedTypeId: string,
    needDescription: string,
    needOther: string,
    postcode: string,
    startDate: Date,
    ExpectedDurationDays: number,
    isCarePackage : boolean,
    carePackageReqByDate: Date,
    actualLeaveDate: Date
  }

function PatientList(): JSX.Element {
  const [patient, setPatient] = useState<PatientType[]>([])
  const loginContext = useContext(LoginContext)
  const jwt = loginContext.jwt

  useEffect(() => {
    async function fetchPatients() {
      try {
        const response = await getPatient(jwt)
        if (!response.ok) {
          throw new Error("Network response failed")
        }
        const result = await response.json()
        setPatient(result.patient)
      } catch (error) {
        console.error("Error fetching patient:", error)
      }
    }
    fetchPatients()
  }, [jwt])

  return (
    <div>
      <div className="banner">
        <h1> </h1>
        <h1>Select Patient to Update/Delete</h1>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Patient Name</th>
            </tr>
          </thead>
          <tbody>
            {patient &&
              patient?.map((data, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/patient/${data.id}`}>{data.id}</Link>
                  </td>
                  <td>{data.name}</td>


                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PatientList