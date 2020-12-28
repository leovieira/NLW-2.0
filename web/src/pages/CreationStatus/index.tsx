import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

import "./styles.css";

interface Params {
	error: boolean;
	msg: string;
	redirect: string;
	counter: number;
}

function CreationStatus() {
	const locationState = useLocation().state as Params;

	const history = useHistory();

	const [params, setParams] = useState<Params>({
		error: true,
		msg: "Oops... algo deu errado!",
		redirect: "/give-classes",
		counter: 5,
	});

	const [redirect, setRedirect] = useState({
		enabled: false,
		counter: 0,
	});

	useEffect(() => {
		if (locationState !== undefined) {
			setParams({ ...locationState });
			setRedirect({ enabled: true, counter: locationState.counter });
		}
	}, [locationState]);

	useEffect(() => {
		if (redirect.enabled) {
			let interval = setInterval(() => {
				setRedirect({ ...redirect, counter: redirect.counter - 1 });
			}, 1000);

			if (redirect.counter === 0) {
				clearInterval(interval);
				setRedirect({ enabled: false, counter: 0 });
				history.push(params.redirect);
			}

			return () => clearInterval(interval);
		}
	}, [redirect, history, params]);

	return (
		<div id="page-creation-status">
			<div className="content">
				{params.error ? (
					<FiXCircle size={45} color="#fff" />
				) : (
					<FiCheckCircle size={45} color="#fff" />
				)}

				<p>{params.msg}</p>

				<span className="redirect">
					Redirecionando em ({redirect.counter}) segundos...
				</span>
			</div>
		</div>
	);
}

export default CreationStatus;
