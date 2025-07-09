'use client';

import React from 'react';
import {
	TextField,
	FormControl,
	FormLabel,
	Select,
	MenuItem,
	Checkbox,
	FormControlLabel,
	RadioGroup,
	Radio,
	Box,
	Typography
} from '@mui/material';

interface FormFieldRendererProps {
	entity: {
		id: string;
		type: string;
		attributes: Record<string, any>;
	};
	isPreview?: boolean;
	value?: any;
	onChange?: (value: any) => void;
}

export const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({ entity, isPreview = false, value, onChange }) => {
	const { type, attributes } = entity;
	const { label, placeholder, required, options } = attributes || {};

	const handleChange = (newValue: any) => {
		if (onChange) {
			onChange(newValue);
		}
	};

	const renderField = () => {
		switch (type) {
			case 'textInput':
				return (
					<TextField
						label={label || 'Text Input'}
						placeholder={placeholder || 'Enter text...'}
						required={required || false}
						fullWidth
						variant="outlined"
						size="small"
						value={value || ''}
						onChange={(e) => handleChange(e.target.value)}
						disabled={!isPreview}
					/>
				);

			case 'textarea':
				return (
					<TextField
						label={label || 'Textarea'}
						placeholder={placeholder || 'Enter your message...'}
						required={required || false}
						fullWidth
						multiline
						rows={3}
						variant="outlined"
						size="small"
						value={value || ''}
						onChange={(e) => handleChange(e.target.value)}
						disabled={!isPreview}
					/>
				);

			case 'select':
				return (
					<FormControl
						fullWidth
						size="small"
						required={required || false}
					>
						<FormLabel
							component="legend"
							sx={{ mb: 1, fontSize: '0.875rem' }}
						>
							{label || 'Select Option'}
						</FormLabel>
						<Select
							value={value || ''}
							onChange={(e) => handleChange(e.target.value)}
							displayEmpty
							disabled={!isPreview}
						>
							<MenuItem value="">
								<em>Choose an option</em>
							</MenuItem>
							{(options || []).map((option: any, index: number) => (
								<MenuItem
									key={index}
									value={option.value}
								>
									{option.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				);

			case 'checkbox':
				return (
					<FormControlLabel
						control={
							<Checkbox
								checked={value || false}
								onChange={(e) => handleChange(e.target.checked)}
								disabled={!isPreview}
							/>
						}
						label={
							<Box>
								{label || 'Checkbox'}
								{required && (
									<Typography
										component="span"
										color="error"
										sx={{ ml: 0.5 }}
									>
										*
									</Typography>
								)}
							</Box>
						}
					/>
				);

			case 'radioGroup':
				return (
					<FormControl
						component="fieldset"
						required={required || false}
					>
						<FormLabel
							component="legend"
							sx={{ mb: 1, fontSize: '0.875rem' }}
						>
							{label || 'Radio Group'}
						</FormLabel>
						<RadioGroup
							value={value || ''}
							onChange={(e) => handleChange(e.target.value)}
						>
							{(options || []).map((option: any, index: number) => (
								<FormControlLabel
									key={index}
									value={option.value}
									control={<Radio disabled={!isPreview} />}
									label={option.label}
								/>
							))}
						</RadioGroup>
					</FormControl>
				);

			default:
				return (
					<Box
						sx={{
							p: 2,
							border: '1px dashed',
							borderColor: 'grey.400',
							borderRadius: 1,
							textAlign: 'center'
						}}
					>
						<Typography
							variant="body2"
							color="text.secondary"
						>
							Unknown field type: {name}
						</Typography>
					</Box>
				);
		}
	};

	return <Box sx={{ width: '100%' }}>{renderField()}</Box>;
};

export default FormFieldRenderer;
