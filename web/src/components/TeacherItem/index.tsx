import React from "react";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";

import api from "../../services/api";

interface TeacherItemProps {
	teacher: {
		id: number;
		name: string;
		avatar: string;
		whatsapp: string;
		bio: string;
		subject: string;
		cost: number;
	};
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
	function createNewConnection() {
		api.post("connections", { user_id: teacher.id });
	}

	return (
		<article className="teacher-item">
			<header>
				<img src={teacher.avatar} alt={teacher.name} />
				<div>
					<strong>{teacher.name}</strong>
					<span>{teacher.subject}</span>
				</div>
			</header>

			<p>{teacher.bio}</p>

			<footer>
				<p>
					Preço/hora
					<strong>R$ {teacher.cost}</strong>
				</p>
				<a
					href={`https://wa.me/${teacher.whatsapp}`}
					target="_blank"
					rel="noopener noreferrer"
					onClick={createNewConnection}
				>
					<img src={whatsappIcon} alt="WhatsApp" />
					Entrar em contato
				</a>
			</footer>
		</article>
	);
};

export default TeacherItem;
