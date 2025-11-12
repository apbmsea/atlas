import React, { useState, useRef, useEffect } from 'react';
import './Select.css';
import { ArrowDownIcon } from '../../icons';

interface Option {
	value: string;
	label: string;
}

interface SelectProps {
	options: Option[];
	placeholder?: string;
	leftIcon?: React.ReactNode;
	disabled?: boolean;
	onChange?: (value: string) => void;
	defaultValue?: string;
	loading?: boolean;
}

/**
 * Универсальный компонент Select для выбора значения из списка с поддержкой иконки, состояния загрузки и блокировки.
 *
 * @param {SelectProps} props Свойства компонента
 * @param {Option[]} props.options Список опций для выбора. Каждая опция имеет `value` и `label`.
 * @param {string} [props.placeholder] Плейсхолдер, отображается когда ничего не выбрано.
 * @param {React.ReactNode} [props.leftIcon] Иконка, отображаемая слева от текста.
 * @param {boolean} [props.disabled=false] Заблокировать селектор.
 * @param {boolean} [props.loading=false] Состояние загрузки (например, блокирует открытие списка).
 * @param {string} [props.defaultValue] Значение, выбранное по умолчанию. Если не задано и нет placeholder — выбирается первая опция.
 * @param {(value: string) => void} [props.onChange] Callback при выборе опции, возвращает `value` выбранного элемента.
 *
 * @returns {JSX.Element} Компонент кастомного селектора.
 */

const Select: React.FC<SelectProps> = ({
	options,
	placeholder,
	leftIcon,
	disabled = false,
	defaultValue,
	loading,
	onChange
}) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	const initialValue =
		defaultValue ?? (placeholder ? '' : (options[0]?.value ?? ''));
	const [selected, setSelected] = useState<string>(initialValue);

	const handleSelect = (value: string) => {
		setSelected(value);
		onChange?.(value);
		setIsOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const displayValue =
		options.find(o => o.value === selected)?.label ||
		(placeholder ? placeholder : options[0]?.label);

	return (
		<div
			ref={wrapperRef}
			className={`select__wrapper
			${disabled || loading ? 'select__wrapper--disabled' : ''}
			${isOpen ? 'select__wrapper--open' : ''}`}
			onClick={() => !disabled && setIsOpen(prev => !prev)}
		>
			{leftIcon && <span className='select__icon'>{leftIcon}</span>}

			<span
				className={`select__value ${
					!selected && placeholder ? 'select__value--placeholder' : ''
				}`}
			>
				{displayValue}
			</span>

			<span
				className={`select__arrow ${isOpen ? 'select__arrow--open' : ''}`}
			>
				<ArrowDownIcon width={20} />
			</span>

			{isOpen && (
				<ul className='select__list'>
					{options.map(option => (
						<li
							key={option.value}
							className={`select__option ${
								option.value === selected
									? 'select__option--active'
									: ''
							}`}
							onClick={e => {
								e.stopPropagation();
								handleSelect(option.value);
							}}
						>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Select;
