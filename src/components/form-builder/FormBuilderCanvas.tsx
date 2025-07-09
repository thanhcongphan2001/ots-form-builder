'use client';

import React from 'react';
import { Box, Stack, Typography, Paper, IconButton, Divider } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { BuilderEntities } from '@coltorapps/builder-react';
import { FormFieldRenderer } from './FormFieldRenderer';

interface FormBuilderCanvasProps {
	builderStore: any;
	selectedEntityId: string | null;
	setSelectedEntityId: (id: string | null) => void;
}

export const FormBuilderCanvas: React.FC<FormBuilderCanvasProps> = ({
	builderStore,
	selectedEntityId,
	setSelectedEntityId
}) => {
	const handleSelectEntity = (entityId: string) => {
		setSelectedEntityId(entityId);
	};

	const handleDeleteEntity = (entityId: string) => {
		builderStore.deleteEntity(entityId);
		if (selectedEntityId === entityId) {
			setSelectedEntityId(null);
		}
	};

	return (
		<Box sx={{ height: '100%', overflow: 'auto' }}>
			<BuilderEntities builderStore={builderStore}>
				{(props) => {
					if (!props.entities || props.entities.length === 0) {
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
								<Typography variant="body1" color="text.secondary">
									No form fields yet
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Add components from the toolbox to start building your form
								</Typography>
							</Paper>
						);
					}

					return (
						<Stack spacing={2}>
							{props.entities.map((entity, index) => (
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
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'flex-start'
								}}
							>
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
										Field Type: {entity.name} | Position: {index + 1}
									</Typography>
								</>
							)}
						</Paper>
						))}
					</Stack>
				);
			}}
		</BuilderEntities>
	</Box>
);
};

export default FormBuilderCanvas;
