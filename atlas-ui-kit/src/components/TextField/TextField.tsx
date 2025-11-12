import React from 'react';
import './TextField.css';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	disabled?: boolean;
	placeholder?: string;
	leftIcon?: React.ReactNode;
	buttonRight?: React.ReactNode;
	status?: 'error' | 'success';
	loading?: boolean;
	errorCaption?: string;
}

/**
 * Универсальный компонент TextField для ввода текста с поддержкой иконки, кнопки, статусов и загрузки.
 *
 * @param {TextFieldProps} props Свойства компонента
 * @param {string} [props.label] Метка поля
 * @param {string} [props.placeholder] Плейсхолдер
 * @param {React.ReactNode} [props.leftIcon] Иконка слева
 * @param {React.ReactNode} [props.buttonRight] Кнопка справа
 * @param {boolean} [props.disabled] Заблокировать поле
 * @param {boolean} [props.loading] Состояние загрузки
 * @param {'error'|'success'} [props.status] Статус поля
 * @param {string} [props.errorCaption] Сообщение об ошибке
 * @param {string} [props.type='text'] Тип input (text, number, password и т.д.)
 *
 * @returns Компонент поля ввода
 */

const TextField: React.FC<TextFieldProps> = ({
	label,
	placeholder,
	leftIcon,
	buttonRight,
	disabled,
	loading,
	status,
	errorCaption,
	type = 'text',
	...props
}) => {
	return (
		<div className='textfield'>
			{label && <label className='textfield__label'>{label}</label>}

			<div className={`textfield__wrapper textfield__${status}`}>
				{leftIcon && (
					<span className='textfield__icon'>{leftIcon}</span>
				)}

				<input
					type={type}
					className='textfield__input'
					placeholder={placeholder}
					disabled={disabled || loading}
					{...props}
				/>

				{buttonRight && (
					<span className='textfield__button'>{buttonRight}</span>
				)}
			</div>

			{status === 'error' && (
				<p className='textfield__error-message'>{errorCaption}</p>
			)}
		</div>
	);
};

export default TextField;
