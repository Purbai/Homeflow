import { useContext, useEffect, useState } from "react"
import { LoginContext } from "../../Components/LoginManager/LoginManager"
import { getPatient } from "../../api/backendClient"
import "./Explore.scss"


export interface PatientType {
  id: number
  name: string,
  gender: number,
  procedureType: number,
  patientNeedTypeId: string,
  needOther: string,
  postcode: string,
  startDate: Date,
  ExpectedDurationDays: number,
  isCarePackage : boolean,
  carePackageReqByDate: Date,
  actualLeaveDate: Date
}


function Explore(): JSX.Element {
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
        console.error("Error fetching patients:", error)
      }
    }

    fetchPatients()
  }, [jwt])

  return (
    <>
      <div>
        Welcome to HomeFlow application
      </div>
    </>
  )
}

export default Explore
