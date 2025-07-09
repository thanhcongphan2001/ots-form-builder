'use client';

import React from 'react';
import { Box, Button, Stack, Typography, Card, CardContent, CardActions } from '@mui/material';
import {
	TextFields as TextFieldsIcon,
	Subject as SubjectIcon,
	ArrowDropDown as ArrowDropDownIcon,
	CheckBox as CheckBoxIcon,
	RadioButtonChecked as RadioButtonCheckedIcon
} from '@mui/icons-material';
import { formBuilderEntities } from './FormBuilderConfig';
import { useFormBuilderStore } from './SimpleFormBuilderStore';

interface FormBuilderToolboxProps {
	builderStore?: any; // Keep for compatibility but won't use
}

const entityIcons = {
	textInput: TextFieldsIcon,
	textarea: SubjectIcon,
	select: ArrowDropDownIcon,
	checkbox: CheckBoxIcon,
	radioGroup: RadioButtonCheckedIcon
};

const entityLabels = {
	textInput: 'Text Input',
	textarea: 'Textarea',
	select: 'Select Dropdown',
	checkbox: 'Checkbox',
	radioGroup: 'Radio Group'
};

const entityDescriptions = {
	textInput: 'Single line text input field',
	textarea: 'Multi-line text input field',
	select: 'Dropdown selection field',
	checkbox: 'Single checkbox field',
	radioGroup: 'Multiple choice radio buttons'
};

export const FormBuilderToolbox: React.FC<FormBuilderToolboxProps> = () => {
	const builderStore = useFormBuilderStore();
	const handleAddEntity = (entityName: string) => {
		const defaultValues = {
			textInput: {
				label: 'Text Input',
				placeholder: 'Enter text...',
				required: false
			},
			textarea: {
				label: 'Textarea',
				placeholder: 'Enter your message...',
				required: false
			},
			select: {
				label: 'Select Option',
				required: false,
				options: [
					{ label: 'Option 1', value: 'option1' },
					{ label: 'Option 2', value: 'option2' }
				]
			},
			checkbox: {
				label: 'Checkbox',
				required: false
			},
			radioGroup: {
				label: 'Radio Group',
				required: false,
				options: [
					{ label: 'Option 1', value: 'option1' },
					{ label: 'Option 2', value: 'option2' }
				]
			}
		};

		builderStore.addEntity({
			type: entityName,
			attributes: defaultValues[entityName as keyof typeof defaultValues] || {}
		});
	};

	const handleDragStart = (e: React.DragEvent, entityName: string) => {
		e.dataTransfer.setData(
			'application/json',
			JSON.stringify({
				type: 'NEW_COMPONENT',
				entityName: entityName
			})
		);
		e.dataTransfer.effectAllowed = 'copy';
	};

	return (
		<Box sx={{ height: '100%', overflow: 'auto' }}>
			<Stack spacing={2}>
				{formBuilderEntities.map((entity) => {
					const IconComponent = entityIcons[entity.name as keyof typeof entityIcons];
					const label = entityLabels[entity.name as keyof typeof entityLabels];
					const description = entityDescriptions[entity.name as keyof typeof entityDescriptions];

					return (
						<Card
							key={entity.name}
							variant="outlined"
							draggable
							onDragStart={(e) => handleDragStart(e, entity.name)}
							sx={{
								cursor: 'grab',
								'&:hover': {
									borderColor: 'primary.main',
									bgcolor: 'primary.50'
								},
								'&:active': {
									cursor: 'grabbing'
								}
							}}
						>
							<CardContent sx={{ pb: 1 }}>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
									<IconComponent sx={{ mr: 1, color: 'primary.main' }} />
									<Typography
										variant="subtitle2"
										component="div"
									>
										{label}
									</Typography>
								</Box>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ fontSize: '0.75rem' }}
								>
									{description}
								</Typography>
							</CardContent>
							<CardActions sx={{ pt: 0 }}>
								<Button
									size="small"
									variant="contained"
									fullWidth
									onClick={() => handleAddEntity(entity.name)}
									sx={{ textTransform: 'none' }}
								>
									Add to Form
								</Button>
							</CardActions>
						</Card>
					);
				})}
			</Stack>
		</Box>
	);
};

export default FormBuilderToolbox;
