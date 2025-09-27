import { useState } from "react";
import "./Card.css";
import { Link } from "react-router";
//le props est fourni par plusieurs components comme Attractions,
//Il contiendra toujours une activité

function Card(props) {
	return (
		<>
			<button type="button" className="cursor-pointer object-cover">
				<div
					className="card bg-base-100 w-96 shadow-xl rounded-xl overflow-hidden 
    card-attraction"
					id={`card-${props.activity.id}`}
				>
					<div className="">
						<img
							//Dans le props attraction, on sélectionne le tableau d'objet image
							//  et on prend le lien de la première image
							src={props.activity.images[0].link}
							alt={`Attraction ${props.activity.name}`}
							className="rounded-xl img-card"
						/>
						<figcaption className="w-96">{props.activity.name}</figcaption>
					</div>
				</div>
			</button>
		</>
	);
}
export default Card;
