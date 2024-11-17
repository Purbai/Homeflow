import "./DeletePatientModal.scss"

export const DeletePatientModal = ({ getConfirmDelete }: { getConfirmDelete(confirmation: boolean): void }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <div>
          <h2>Delete patient details</h2>
          <p>Warning: deleting this patient details is permanent.</p>
          <p>Are you sure you want to proceed?</p>
        </div>
        <div className="button-group">
          <button
            id="deletebutton-yes"
            data-testid="delete-button"
            className="btn btn-primary btn-md w-50"
            onClick={() => getConfirmDelete(true)}
          >
            Yes
          </button>
          <button
            id="deletebutton-no"
            data-testid="delete-button"
            className="btn btn-primary btn-md w-50"
            onClick={() => getConfirmDelete(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}
