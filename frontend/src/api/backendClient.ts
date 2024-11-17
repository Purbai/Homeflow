export interface User {
  userName: string
  firstName?: string
  lastName?: string
  email: string
  totalPointsEarned: number
  aboutMe?: string
}

export interface LeaderBoardRow {
  userName: string
  totalPointsEarned: number
}

export interface LeaderBoardTable {
  userLeaderBoard: Array<LeaderBoardRow>
}

export interface Patients {
  patients: Array<Patient>
}

export interface Patient {
  id: number
  name: string,
  gender: string,
  procedureType: string,
  patientNeedTypeId: number,
  needDescription: string,
  needOther: string,
  postcode: string,
  startDate: Date,
  expectedDurationDays: number,
  isCarePackage : boolean,
  carePackageReqByDate: Date,
  actualLeaveDate: Date
}

export const loginUser = async (username: string, password: string) => {
  return await fetch(`http://localhost:5280/auth/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
}

export const registerUser = async (
  firstname: string,
  lastname: string,
  email: string,
  username: string,
  password: string,
  aboutme: string,
) => {
  return await fetch(`http://localhost:5280/auth/register`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstname,
      lastname,
      email,
      username,
      password,
      aboutme,
    }),
  })
}

export const getPatient = async (header: string) => {
  return await fetch(`http://localhost:5280/patient`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${header}`,
    },
  })
}

export async function getPatientById(header: string, id: number): Promise<Patient> {
  const response = await fetch(`http://localhost:5280/patient/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${header}`,
    },
  })
  return await response.json()
}

export const getPatientNeedType = async () => {
  return await fetch(`http://localhost:5280/patientneedtype`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export const getAreaLocation = async () => {
  return await fetch(`http://localhost:5280/arealocation`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export async function fetchUserProfile(header: string): Promise<User> {
  const response = await fetch(`http://localhost:5280/users/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${header}`,
    },
  })
  return await response.json()
}

export async function FetchLeaderBoard(header: string) {
  const response = await fetch(`http://localhost:5280/users/leaderboard`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${header}`,
    },
  })
  if (!response.ok) {
    return response.json().then((errorData) => {
      throw new Error(JSON.stringify(errorData.errors))
    })
  }
  return await response.json()
}

export const updateUser = async (header: string, firstname?: string, lastname?: string, aboutme?: string) => {
  return await fetch(`http://localhost:5280/users/update`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${header}`,
    },
    body: JSON.stringify({
      firstname,
      lastname,
      aboutme,
    }),
  })
}

export async function deleteUserProfile(header: string) {
  const response = await fetch(`http://localhost:5280/users/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${header}`,
    },
  })
  return await response
}

export async function deletePatient(header: string, patientId: number) {
  const response = await fetch(`http://localhost:5280/patient/${patientId}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${header}`,
    },
  })
  return await response
}

export async function createPatient(
  header: string,
  name: string,
  gender: string,
  procedureType: string,
  patientNeedTypeId: number,
  needOther: string,
  postcode: string,
  startDate: Date,
  ExpectedDurationDays: number,
  isCarePackage : boolean,
  carePackageReqByDate: Date,
  actualLeaveDate: Date
) {
  return await fetch(`http://localhost:5280/patient/create`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${header}`,
    },
    body: JSON.stringify({
      name,
      gender,
      procedureType,
      patientNeedTypeId,
      needOther,
      postcode,
      startDate,
      ExpectedDurationDays,
      isCarePackage,
      carePackageReqByDate,
      actualLeaveDate
    }),
  })
}

export const updatePatient = async (
  header: string,
  patientId: number,
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
) => {
  return await fetch(`http://localhost:5280/patient/${patientId}/update`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${header}`,
    },
    body: JSON.stringify({
      name,
      gender,
      procedureType,
      patientNeedTypeId,
      needOther,
      postcode,
      startDate,
      ExpectedDurationDays,
      isCarePackage,
      carePackageReqByDate,
      actualLeaveDate
    }),
  })
}

// to add the JWT token as a header to fetch requests which access protected endpoints do the following:
// In the .tsx file where the fetch request is being called:
// 1) import the login context to access the value of the JWT token
// 2) pass the token as a prop called 'header' in the method which calls the fetch request
// In this file:
// 1) add 'header: string' as a prop to the method
// 2) add "Authorization": `Bearer ${header}` to the list of headers
