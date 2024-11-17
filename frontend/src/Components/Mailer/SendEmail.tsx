import emailjs from "@emailjs/browser"

interface emailProps {
  userEmail: string
  message: string
  username: string
}

export function SendEmail(emailParams: emailProps) {
  const mailServiceId = process.env.REACT_APP_EMAIL_SERVICE_ID ? process.env.REACT_APP_EMAIL_SERVICE_ID : ""
  const mailTemplateId = process.env.REACT_APP_EMAIL_TEMPLATE_ID ? process.env.REACT_APP_EMAIL_TEMPLATE_ID : ""
  const mailPublicKey = process.env.REACT_APP_EMAIL_PUBLIC_KEY ? process.env.REACT_APP_EMAIL_PUBLIC_KEY : ""

  if (mailPublicKey !== "" && mailServiceId !== "" && mailTemplateId !== "") {
    var templateParams = {
      username: emailParams.username,
      message: emailParams.message,
      useremail: emailParams.userEmail,
    }
    emailjs.send(mailServiceId, mailTemplateId, templateParams, { publicKey: mailPublicKey }).then(
      () => {
        return "success"
      },
      (error) => {
        return "Failed:" + error.text
      },
    )
  }
  return "Failed: mail service not setup"
}
