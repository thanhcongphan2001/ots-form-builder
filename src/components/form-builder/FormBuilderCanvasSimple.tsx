'use client';

import React from 'react';
import { Box, Stack, Typography, Paper, IconButton, Divider } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { FormFieldRenderer } from './FormFieldRenderer';
import { useFormBuilderStore } from './SimpleFormBuilderStore';

interface FormBuilderCanvasProps {
	builderStore?: any; // Keep for compatibility but won't use
	selectedEntityId: string | null;
	setSelectedEntityId: (id: string | null) => void;
}

export const FormBuilderCanvas: React.FC<FormBuilderCanvasProps> = ({ selectedEntityId, setSelectedEntityId }) => {
	const builderStore = useFormBuilderStore();
	const handleSelectEntity = (entityId: string) => {
		setSelectedEntityId(entityId);
	};

	const handleDeleteEntity = (entityId: string) => {
		builderStore.deleteEntity(entityId);
		if (selectedEntityId === entityId) {
			setSelectedEntityId(null);
		}
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'copy';
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();

		try {
			const data = JSON.parse(e.dataTransfer.getData('application/json'));

			if (data.type === 'NEW_COMPONENT') {
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
					type: data.entityName,
					attributes: defaultValues[data.entityName as keyof typeof defaultValues] || {}
				});
			}
		} catch (error) {
			console.error('Error handling drop:', error);
		}
	};

	const entities = builderStore?.schema?.entities || [];

	return (
		<Box
			sx={{ height: '100%', overflow: 'auto' }}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
		>
			<Stack spacing={2}>
				{entities.length === 0 ? (
					<Paper
						variant="outlined"
						sx={{
							p: 4,
							textAlign: 'center',
							borderStyle: 'dashed',
							borderColor: 'grey.300',
							bgcolor: 'grey.50'
						}}
					>
						<Typography
							variant="body1"
							color="text.secondary"
						>
							No form fields yet
						</Typography>
						<Typography
							variant="body2"
							color="text.secondary"
						>
							Drag components from the toolbox or click "Add to Form" to start building
						</Typography>
					</Paper>
				) : (
					entities.map((entity: any, index: number) => (
						<Paper
							key={entity.id}
							variant="outlined"
							sx={{
								p: 2,
								cursor: 'pointer',
								border: selectedEntityId === entity.id ? 2 : 1,
								borderColor: selectedEntityId === entity.id ? 'primary.main' : 'grey.300',
								bgcolor: selectedEntityId === entity.id ? 'primary.50' : 'background.paper',
								'&:hover': {
									borderColor: 'primary.main',
									bgcolor: 'primary.50'
								}
							}}
							onClick={() => handleSelectEntity(entity.id)}
						>
							<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
								<Box sx={{ flex: 1, mr: 2 }}>
									<FormFieldRenderer entity={entity} />
								</Box>

								<Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
									<IconButton
										size="small"
										onClick={(e) => {
											e.stopPropagation();
											handleSelectEntity(entity.id);
										}}
										sx={{
											bgcolor: selectedEntityId === entity.id ? 'primary.main' : 'grey.200',
											color: selectedEntityId === entity.id ? 'white' : 'grey.600',
											'&:hover': {
												bgcolor: 'primary.main',
												color: 'white'
											}
										}}
									>
										<EditIcon fontSize="small" />
									</IconButton>

									<IconButton
										size="small"
										onClick={(e) => {
											e.stopPropagation();
											handleDeleteEntity(entity.id);
										}}
										sx={{
											bgcolor: 'grey.200',
											color: 'grey.600',
											'&:hover': {
												bgcolor: 'error.main',
												color: 'white'
											}
										}}
									>
										<DeleteIcon fontSize="small" />
									</IconButton>
								</Box>
							</Box>

							{selectedEntityId === entity.id && (
								<>
									<Divider sx={{ my: 1 }} />
									<Typography
										variant="caption"
										color="text.secondary"
									>
										Field Type: {entity.type} | Position: {index + 1}
									</Typography>
								</>
							)}
						</Paper>
					))
				)}
			</Stack>
		</Box>
	);
};

export default FormBuilderCanvas;
