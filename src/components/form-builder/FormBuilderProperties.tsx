'use client';

import React from 'react';
import {
	Box,
	TextField,
	FormControlLabel,
	Switch,
	Typography,
	Stack,
	Button,
	IconButton,
	Divider
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useBuilderStore } from '@coltorapps/builder-react';

import { useFormBuilderStore } from './SimpleFormBuilderStore';

interface FormBuilderPropertiesProps {
	builderStore?: any; // Keep for compatibility but won't use
	selectedEntityId: string | null;
}

export const FormBuilderProperties: React.FC<FormBuilderPropertiesProps> = ({ selectedEntityId }) => {
	const builderStore = useFormBuilderStore();
	const selectedEntity = selectedEntityId
		? builderStore.schema.entities.find((e: any) => e.id === selectedEntityId)
		: null;

	if (!selectedEntity) {
		return (
			<Box sx={{ textAlign: 'center', py: 4 }}>
				<Typography
					variant="body2"
					color="text.secondary"
				>
					Select a form field to edit its properties
				</Typography>
			</Box>
		);
	}

	const handleUpdateAttribute = (attributeName: string, value: any) => {
		if (selectedEntity) {
			builderStore.updateEntityAttribute(selectedEntity.id, attributeName, value);
		}
	};

	const handleAddOption = () => {
		const currentOptions = selectedEntity.attributes.options || [];
		const newOption = {
			label: `Option ${currentOptions.length + 1}`,
			value: `option${currentOptions.length + 1}`
		};
		handleUpdateAttribute('options', [...currentOptions, newOption]);
	};

	const handleUpdateOption = (index: number, field: 'label' | 'value', value: string) => {
		const currentOptions = [...(selectedEntity.attributes.options || [])];
		currentOptions[index] = {
			...currentOptions[index],
			[field]: value
		};
		handleUpdateAttribute('options', currentOptions);
	};

	const handleRemoveOption = (index: number) => {
		const currentOptions = [...(selectedEntity.attributes.options || [])];
		currentOptions.splice(index, 1);
		handleUpdateAttribute('options', currentOptions);
	};

	const renderBasicProperties = () => (
		<>
			<TextField
				label="Label"
				value={selectedEntity.attributes.label || ''}
				onChange={(e) => handleUpdateAttribute('label', e.target.value)}
				fullWidth
				size="small"
				margin="normal"
			/>

			{(selectedEntity.type === 'textInput' || selectedEntity.type === 'textarea') && (
				<TextField
					label="Placeholder"
					value={selectedEntity.attributes.placeholder || ''}
					onChange={(e) => handleUpdateAttribute('placeholder', e.target.value)}
					fullWidth
					size="small"
					margin="normal"
				/>
			)}

			<FormControlLabel
				control={
					<Switch
						checked={selectedEntity.attributes.required || false}
						onChange={(e) => handleUpdateAttribute('required', e.target.checked)}
					/>
				}
				label="Required"
				sx={{ mt: 1 }}
			/>
		</>
	);

	const renderOptionsProperties = () => {
		if (selectedEntity.type !== 'select' && selectedEntity.type !== 'radioGroup') {
			return null;
		}

		const options = selectedEntity.attributes.options || [];

		return (
			<>
				<Divider sx={{ my: 2 }} />
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
					<Typography variant="subtitle2">Options</Typography>
					<Button
						size="small"
						startIcon={<AddIcon />}
						onClick={handleAddOption}
						variant="outlined"
					>
						Add Option
					</Button>
				</Box>

				<Stack spacing={2}>
					{options.map((option: any, index: number) => (
						<Box
							key={index}
							sx={{ border: '1px solid', borderColor: 'grey.300', borderRadius: 1, p: 2 }}
						>
							<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
								<Typography
									variant="caption"
									color="text.secondary"
								>
									Option {index + 1}
								</Typography>
								<IconButton
									size="small"
									onClick={() => handleRemoveOption(index)}
									disabled={options.length <= 1}
								>
									<DeleteIcon fontSize="small" />
								</IconButton>
							</Box>

							<TextField
								label="Label"
								value={option.label || ''}
								onChange={(e) => handleUpdateOption(index, 'label', e.target.value)}
								fullWidth
								size="small"
								margin="dense"
							/>

							<TextField
								label="Value"
								value={option.value || ''}
								onChange={(e) => handleUpdateOption(index, 'value', e.target.value)}
								fullWidth
								size="small"
								margin="dense"
							/>
						</Box>
					))}
				</Stack>
			</>
		);
	};

	return (
		<Box sx={{ height: '100%', overflow: 'auto' }}>
			<Typography
				variant="subtitle1"
				gutterBottom
			>
				{selectedEntity.name} Properties
			</Typography>

			{renderBasicProperties()}
			{renderOptionsProperties()}
		</Box>
	);
};

export default FormBuilderProperties;
