'use client';

import React from 'react';
import { FormControl, FormLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { ZodError } from 'zod';
import { createEntityComponent } from '@coltorapps/builder-react';
import { selectEntity } from '../entities/select-entity';

export const SelectEntity = createEntityComponent(selectEntity, (props) => {
	const options = props.entity.attributes.options || [];

	return (
		<FormControl
			fullWidth
			size="medium"
			required={props.entity.attributes.required || false}
			error={props.entity.error instanceof ZodError}
			sx={{
				'& .MuiOutlinedInput-root': {
					borderRadius: 2,
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderColor: '#1976d2'
					}
				},
				'& .MuiInputLabel-root': {
					fontWeight: 500
				}
			}}
		>
			<FormLabel
				id={`${props.entity.id}-label`}
				sx={{
					fontWeight: 500,
					color: 'text.primary',
					mb: 1,
					display: 'block'
				}}
			>
				{props.entity.attributes.label || 'Select'}
				{props.entity.attributes.required && <span style={{ color: '#d32f2f', marginLeft: 4 }}>*</span>}
			</FormLabel>
			<Select
				labelId={`${props.entity.id}-label`}
				id={props.entity.id}
				value={props.entity.value ?? ''}
				onChange={(e) => props.setValue(e.target.value)}
				displayEmpty
				variant="outlined"
			>
				<MenuItem
					value=""
					disabled
				>
					<em>Choose an option</em>
				</MenuItem>
				{options.map((option, index) => (
					<MenuItem
						key={index}
						value={option.value}
					>
						{option.label}
					</MenuItem>
				))}
			</Select>
			{props.entity.error instanceof ZodError && (
				<FormHelperText>{props.entity.error.format()._errors[0]}</FormHelperText>
			)}
			{!props.entity.error && options.length > 0 && (
				<FormHelperText>
					{options.length} option{options.length !== 1 ? 's' : ''} available
				</FormHelperText>
			)}
		</FormControl>
	);
});
