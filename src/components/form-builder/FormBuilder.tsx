'use client';

import React from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import { FormBuilderProvider, useFormBuilderStore } from './SimpleFormBuilderStore';
import { FormBuilderToolbox } from './FormBuilderToolbox';
import { FormBuilderCanvas } from './FormBuilderCanvasSimple';
import { FormBuilderProperties } from './FormBuilderProperties';

interface FormBuilderProps {
	onSchemaChange?: (schema: any) => void;
}

const FormBuilderContent: React.FC<FormBuilderProps> = ({ onSchemaChange }) => {
	const builderStore = useFormBuilderStore();
	const [selectedEntityId, setSelectedEntityId] = React.useState<string | null>(null);

	// Notify parent component when schema changes
	React.useEffect(() => {
		if (onSchemaChange) {
			onSchemaChange(builderStore.schema);
		}
	}, [builderStore.schema, onSchemaChange]);

	return (
		<Box sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
			{/* Header */}
			<Paper
				elevation={1}
				sx={{ p: 2, mb: 2 }}
			>
				<Typography
					variant="h5"
					component="h1"
				>
					Form Builder
				</Typography>
				<Typography
					variant="body2"
					color="text.secondary"
				>
					Drag and drop components to build your form
				</Typography>
			</Paper>

			{/* Main Content */}
			<Box sx={{ flex: 1, overflow: 'hidden' }}>
				<Grid
					container
					spacing={2}
					sx={{ height: '100%' }}
				>
					{/* Toolbox */}
					<Grid
						item
						xs={12}
						md={3}
					>
						<Paper
							elevation={2}
							sx={{ height: '100%', p: 2 }}
						>
							<Typography
								variant="h6"
								gutterBottom
							>
								Components
							</Typography>
							<FormBuilderToolbox />
						</Paper>
					</Grid>

					{/* Canvas */}
					<Grid
						item
						xs={12}
						md={6}
					>
						<Paper
							elevation={2}
							sx={{ height: '100%', p: 2 }}
						>
							<Typography
								variant="h6"
								gutterBottom
							>
								Form Preview
							</Typography>
							<FormBuilderCanvas
								selectedEntityId={selectedEntityId}
								setSelectedEntityId={setSelectedEntityId}
							/>
						</Paper>
					</Grid>

					{/* Properties Panel */}
					<Grid
						item
						xs={12}
						md={3}
					>
						<Paper
							elevation={2}
							sx={{ height: '100%', p: 2 }}
						>
							<Typography
								variant="h6"
								gutterBottom
							>
								Properties
							</Typography>
							<FormBuilderProperties selectedEntityId={selectedEntityId} />
						</Paper>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export const FormBuilder: React.FC<FormBuilderProps> = (props) => {
	return (
		<FormBuilderProvider>
			<FormBuilderContent {...props} />
		</FormBuilderProvider>
	);
};

export default FormBuilder;
