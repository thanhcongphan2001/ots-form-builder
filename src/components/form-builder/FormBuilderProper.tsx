'use client';

import React, { useState } from 'react';
import { Box, Paper, Typography, Grid, Button, Stack } from '@mui/material';
import { BuilderEntities, BuilderEntityAttributes, useBuilderStore } from '@coltorapps/builder-react';
import { formBuilder } from './form-builder';

// Import entity components
import { TextFieldEntity } from './components/TextFieldEntity';
import { TextareaEntity } from './components/TextareaEntity';
import { SelectEntity } from './components/SelectEntity';
import { CheckboxEntity } from './components/CheckboxEntity';
import { RadioGroupEntity } from './components/RadioGroupEntity';

// Import attribute components
import { LabelAttribute } from './components/LabelAttribute';
import { PlaceholderAttribute } from './components/PlaceholderAttribute';
import { RequiredAttribute } from './components/RequiredAttribute';
import { OptionsAttribute } from './components/OptionsAttribute';

interface FormBuilderProps {
	onSchemaChange?: (schema: any) => void;
}

// Attribute components for each entity type
function TextFieldAttributes() {
	return (
		<Stack spacing={2}>
			<LabelAttribute />
			<PlaceholderAttribute />
			<RequiredAttribute />
		</Stack>
	);
}

function TextareaAttributes() {
	return (
		<Stack spacing={2}>
			<LabelAttribute />
			<PlaceholderAttribute />
			<RequiredAttribute />
		</Stack>
	);
}

function SelectAttributes() {
	return (
		<Stack spacing={2}>
			<LabelAttribute />
			<RequiredAttribute />
			<OptionsAttribute />
		</Stack>
	);
}

function CheckboxAttributes() {
	return (
		<Stack spacing={2}>
			<LabelAttribute />
			<RequiredAttribute />
		</Stack>
	);
}

function RadioGroupAttributes() {
	return (
		<Stack spacing={2}>
			<LabelAttribute />
			<RequiredAttribute />
			<OptionsAttribute />
		</Stack>
	);
}

export const FormBuilderProper: React.FC<FormBuilderProps> = ({ onSchemaChange }) => {
	const [activeEntityId, setActiveEntityId] = useState<string>();

	const builderStore = useBuilderStore(formBuilder, {
		events: {
			onEntityAttributeUpdated(payload) {
				void builderStore.validateEntityAttribute(payload.entity.id, payload.attributeName);
			},
			onEntityDeleted(payload) {
				if (payload.entity.id === activeEntityId) {
					setActiveEntityId(undefined);
				}
			},
			onSchemaUpdated(payload) {
				if (onSchemaChange) {
					onSchemaChange(payload.schema);
				}
			}
		}
	});

	async function submitFormSchema() {
		const validationResult = await builderStore.validateSchema();

		if (validationResult.success) {
			console.log('Valid schema:', validationResult.data);
			// Here you would send to server
		} else {
			console.log('Validation failed:', validationResult.reason);
		}
	}

	return (
		<Box sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
			{/* Header */}
			<Paper
				elevation={1}
				sx={{ p: 2, mb: 2 }}
			>
				<Typography
					variant="h6"
					component="h2"
				>
					Form Builder (Proper @coltorapps/builder)
				</Typography>
				<Typography
					variant="body2"
					color="text.secondary"
				>
					Drag components from the toolbox to build your form
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
							<Stack spacing={1}>
								<Button
									variant="outlined"
									onClick={() =>
										builderStore.addEntity({
											type: 'textField',
											attributes: { label: 'Text Field' }
										})
									}
								>
									Add Text Field
								</Button>
								<Button
									variant="outlined"
									onClick={() =>
										builderStore.addEntity({
											type: 'textarea',
											attributes: { label: 'Textarea' }
										})
									}
								>
									Add Textarea
								</Button>
								<Button
									variant="outlined"
									onClick={() =>
										builderStore.addEntity({
											type: 'select',
											attributes: {
												label: 'Select',
												options: [
													{ label: 'Option 1', value: 'option1' },
													{ label: 'Option 2', value: 'option2' }
												]
											}
										})
									}
								>
									Add Select
								</Button>
								<Button
									variant="outlined"
									onClick={() =>
										builderStore.addEntity({
											type: 'checkbox',
											attributes: { label: 'Checkbox' }
										})
									}
								>
									Add Checkbox
								</Button>
								<Button
									variant="outlined"
									onClick={() =>
										builderStore.addEntity({
											type: 'radioGroup',
											attributes: {
												label: 'Radio Group',
												options: [
													{ label: 'Option 1', value: 'option1' },
													{ label: 'Option 2', value: 'option2' }
												]
											}
										})
									}
								>
									Add Radio Group
								</Button>
							</Stack>
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
							sx={{ height: '100%', p: 2, overflow: 'auto' }}
						>
							<Typography
								variant="h6"
								gutterBottom
							>
								Form Preview
							</Typography>
							<BuilderEntities
								builderStore={builderStore}
								components={{
									textField: TextFieldEntity,
									textarea: TextareaEntity,
									select: SelectEntity,
									checkbox: CheckboxEntity,
									radioGroup: RadioGroupEntity
								}}
							>
								{(props) => (
									<Box
										sx={{
											border:
												activeEntityId === props.entity.id
													? '2px solid #1976d2'
													: '1px solid transparent',
											borderRadius: 1,
											p: 1,
											mb: 1,
											position: 'relative',
											'&:hover': {
												border: '1px solid #1976d2'
											}
										}}
									>
										{props.children}
										<Box
											sx={{
												position: 'absolute',
												top: 4,
												right: 4,
												display: 'flex',
												gap: 1
											}}
										>
											<Button
												size="small"
												variant="outlined"
												onClick={() => setActiveEntityId(props.entity.id)}
											>
												Select
											</Button>
											<Button
												size="small"
												variant="outlined"
												color="error"
												onClick={() => builderStore.deleteEntity(props.entity.id)}
											>
												Delete
											</Button>
										</Box>
									</Box>
								)}
							</BuilderEntities>
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
							{activeEntityId ? (
								<BuilderEntityAttributes
									builderStore={builderStore}
									components={{
										textField: TextFieldAttributes,
										textarea: TextareaAttributes,
										select: SelectAttributes,
										checkbox: CheckboxAttributes,
										radioGroup: RadioGroupAttributes
									}}
									entityId={activeEntityId}
								/>
							) : (
								<Typography
									variant="body2"
									color="text.secondary"
								>
									Select a component to edit its properties
								</Typography>
							)}
						</Paper>
					</Grid>
				</Grid>
			</Box>

			{/* Footer */}
			<Box sx={{ mt: 2 }}>
				<Button
					variant="contained"
					onClick={() => void submitFormSchema()}
				>
					Save Form
				</Button>
			</Box>
		</Box>
	);
};

export default FormBuilderProper;
