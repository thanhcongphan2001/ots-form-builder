'use client';

import React from 'react';
import { TextField } from '@mui/material';
import { ZodError } from 'zod';
import { createEntityComponent } from '@coltorapps/builder-react';
import { textFieldEntity } from '../entities/text-field-entity';

export const TextFieldEntity = createEntityComponent(textFieldEntity, (props) => {
	return (
		<TextField
			id={props.entity.id}
			label={props.entity.attributes.label || 'Text Field'}
			placeholder={props.entity.attributes.placeholder || 'Enter text...'}
			value={props.entity.value ?? ''}
			onChange={(e) => props.setValue(e.target.value)}
			required={props.entity.attributes.required || false}
			fullWidth
			variant="outlined"
			size="medium"
			sx={{
				'& .MuiOutlinedInput-root': {
					borderRadius: 2,
					'&:hover fieldset': {
						borderColor: '#1976d2'
					}
				},
				'& .MuiInputLabel-root': {
					fontWeight: 500
				}
			}}
			error={props.entity.error instanceof ZodError}
			helperText={
				props.entity.error instanceof ZodError
					? props.entity.error.format()._errors[0]
					: props.entity.attributes.placeholder
						? `Placeholder: ${props.entity.attributes.placeholder}`
						: null
			}
		/>
	);
});
