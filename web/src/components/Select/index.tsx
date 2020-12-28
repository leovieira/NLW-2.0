import React from "react";
import ReactSelect, {
	OptionTypeBase,
	Props as ReactSelectProps,
} from "react-select";

import "./styles.css";

interface SelectProps extends ReactSelectProps<OptionTypeBase> {
	name: string;
	label: string;
	options: Array<{
		value: string;
		label: string;
	}>;
}

const Select: React.FC<SelectProps> = ({ name, label, options, ...rest }) => {
	const style = {
		control: (base: any, state: any) => ({
			...base,
			border: state.isFocused ? 0 : 0,
			// This line disable the blue border
			boxShadow: state.isFocused ? 0 : 0,
			"&:hover": {
				border: state.isFocused ? 0 : 0,
			},
		}),
	};

	return (
		<div className="select-block">
			<label htmlFor={name}>{label}</label>
			<ReactSelect
				className="select"
				classNamePrefix="select"
				isClearable={true}
				isSearchable={true}
				placeholder="Selecione..."
				options={options}
				{...rest}
				styles={style}
			/>
		</div>
	);
};

export default Select;
