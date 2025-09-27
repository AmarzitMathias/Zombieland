import { useEffect } from "react";
import "./ModalCard.css"

function ModalCard (activity){
    const cardActivity = activity.activity

    return(
        <dialog id="modalCard" className="modal">
				<div className="modal-box">
					<h3 className="title-modal font-bold text-3xl">{cardActivity?.name}</h3>
					<img
						className="img-modal"
						src={cardActivity?.images[0].link}
					></img>
					<p className="text-modal py-4">
					{cardActivity?.description}
					</p>
					<div className="modal-action">
						<form method="dialog">
							<button className="cursor-pointer btn-modal btn-secondary" >
								Fermer
							</button>
						</form>
					</div>
				</div>
			</dialog>
    )
}
export default ModalCard;