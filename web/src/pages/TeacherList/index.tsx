import React, { useState, FormEvent } from "react";

import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";

import searchIcon from "../../assets/images/icons/search.svg";

import "./styles.css";

import api from "../../services/api";

function TeacherList() {
	const [subject, setSubject] = useState("");
	const [weekDay, setWeekDay] = useState("");
	const [time, setTime] = useState("");

	const [teachers, setTeachers] = useState([]);

	async function searchTeachers(event: FormEvent) {
		event.preventDefault();

		const response = await api.get("classes", {
			params: {
				subject,
				week_day: weekDay,
				time,
			},
		});

		setTeachers(response.data);
	}

	return (
		<div id="page-teacher-list" className="container">
			<PageHeader title="Estes são os proffys disponíveis.">
				<form id="search-teachers" onSubmit={searchTeachers}>
					<Select
						name="subject"
						label="Matéria"
						options={[
							{ value: "Artes", label: "Artes" },
							{ value: "Biologia", label: "Biologia" },
							{ value: "Ciências", label: "Ciências" },
							{ value: "Educação física", label: "Educação física" },
							{ value: "Física", label: "Física" },
							{ value: "Geografia", label: "Geografia" },
							{ value: "História", label: "História" },
							{ value: "Português", label: "Português" },
							{ value: "Química", label: "Química" },
						]}
						onChange={(option: any) => {
							setSubject(option ? option.value : "");
						}}
					/>
					<Select
						name="week_day"
						label="Dia da semana"
						options={[
							{ value: "0", label: "Domingo" },
							{ value: "1", label: "Segunda-feira" },
							{ value: "2", label: "Terça-feira" },
							{ value: "3", label: "Quarta-feira" },
							{ value: "4", label: "Quinta-feira" },
							{ value: "5", label: "Sexta-feira" },
							{ value: "6", label: "Sábado" },
						]}
						onChange={(option: any) => {
							setWeekDay(option ? option.value : "");
						}}
					/>
					<Input
						type="time"
						name="time"
						label="Hora"
						value={time}
						onChange={(event) => {
							setTime(event.target.value);
						}}
					/>
					<button type="submit">
						Buscar
						<img src={searchIcon} alt="Buscar" />
					</button>
				</form>
			</PageHeader>

			<main>
				{teachers.length > 0 ? (
					teachers.map((teacher, index) => {
						return <TeacherItem key={index} teacher={teacher} />;
					})
				) : (
					<p className="error-msg">
						Nenhum professor encontrado com sua pesquisa.
					</p>
				)}
			</main>
		</div>
	);
}

export default TeacherList;
