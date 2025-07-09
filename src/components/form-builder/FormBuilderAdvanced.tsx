'use client';

import React, { useState } from 'react';
import {
	Box,
	Paper,
	Typography,
	Grid,
	Button,
	Stack,
	Card,
	CardContent,
	IconButton,
	Chip,
	Divider,
	Tooltip,
	Alert,
	Fade,
	Zoom
} from '@mui/material';
import {
	TextFields as TextIcon,
	Subject as TextareaIcon,
	ArrowDropDown as SelectIcon,
	CheckBox as CheckboxIcon,
	RadioButtonChecked as RadioIcon,
	DragIndicator as DragIcon,
	Visibility as PreviewIcon,
	Code as CodeIcon,
	Save as SaveIcon,
	Delete as DeleteIcon,
	Edit as EditIcon,
	Add as AddIcon
} from '@mui/icons-material';
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

// Component definitions for toolbox
const componentDefinitions = [
	{
		type: 'textField',
		name: 'Text Input',
		icon: TextIcon,
		description: 'Single line text input',
		color: '#1976d2',
		defaultAttributes: { label: 'Text Input', placeholder: 'Enter text...' }
	},
	{
		type: 'textarea',
		name: 'Textarea',
		icon: TextareaIcon,
		description: 'Multi-line text input',
		color: '#388e3c',
		defaultAttributes: { label: 'Textarea', placeholder: 'Enter your message...' }
	},
	{
		type: 'select',
		name: 'Select',
		icon: SelectIcon,
		description: 'Dropdown selection',
		color: '#f57c00',
		defaultAttributes: {
			label: 'Select',
			options: [
				{ label: 'Option 1', value: 'option1' },
				{ label: 'Option 2', value: 'option2' }
			]
		}
	},
	{
		type: 'checkbox',
		name: 'Checkbox',
		icon: CheckboxIcon,
		description: 'Single checkbox',
		color: '#7b1fa2',
		defaultAttributes: { label: 'Checkbox' }
	},
	{
		type: 'radioGroup',
		name: 'Radio Group',
		icon: RadioIcon,
		description: 'Multiple choice selection',
		color: '#d32f2f',
		defaultAttributes: {
			label: 'Radio Group',
			options: [
				{ label: 'Option 1', value: 'option1' },
				{ label: 'Option 2', value: 'option2' }
			]
		}
	}
];

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

// Toolbox Component
function FormBuilderToolbox({ builderStore }: { builderStore: any }) {
	const [draggedComponent, setDraggedComponent] = useState<string | null>(null);

	const handleDragStart = (componentType: string) => {
		setDraggedComponent(componentType);
	};

	const handleDragEnd = () => {
		setDraggedComponent(null);
	};

	const addComponent = (componentDef: any) => {
		builderStore.addEntity({
			type: componentDef.type,
			attributes: componentDef.defaultAttributes
		});
	};

	return (
		<Stack spacing={2}>
			<Typography
				variant="h6"
				sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
			>
				<AddIcon />
				Components
			</Typography>

			{componentDefinitions.map((component) => {
				const IconComponent = component.icon;
				const isDragging = draggedComponent === component.type;

				return (
					<Zoom
						key={component.type}
						in={!isDragging}
						timeout={200}
					>
						<Card
							draggable
							onDragStart={() => handleDragStart(component.type)}
							onDragEnd={handleDragEnd}
							sx={{
								cursor: 'grab',
								transition: 'all 0.2s ease',
								transform: isDragging ? 'scale(0.95)' : 'scale(1)',
								opacity: isDragging ? 0.7 : 1,
								'&:hover': {
									transform: 'scale(1.02)',
									boxShadow: 3
								},
								'&:active': {
									cursor: 'grabbing'
								}
							}}
						>
							<CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
									<IconComponent sx={{ color: component.color, fontSize: 20 }} />
									<Typography
										variant="subtitle2"
										fontWeight="bold"
									>
										{component.name}
									</Typography>
									<DragIcon sx={{ ml: 'auto', color: 'text.secondary', fontSize: 16 }} />
								</Box>

								<Typography
									variant="caption"
									color="text.secondary"
									sx={{ mb: 1, display: 'block' }}
								>
									{component.description}
								</Typography>

								<Button
									size="small"
									variant="outlined"
									fullWidth
									onClick={() => addComponent(component)}
									sx={{ mt: 1 }}
								>
									Add to Form
								</Button>
							</CardContent>
						</Card>
					</Zoom>
				);
			})}
		</Stack>
	);
}

export const FormBuilderAdvanced: React.FC<FormBuilderProps> = ({ onSchemaChange }) => {
	const [activeEntityId, setActiveEntityId] = useState<string>();
	const [previewMode, setPreviewMode] = useState(false);
	const [showCode, setShowCode] = useState(false);

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
			alert('Form saved successfully!');
		} else {
			console.log('Validation failed:', validationResult.reason);
			alert('Validation failed: ' + validationResult.reason);
		}
	}

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		// Handle drop logic here if needed
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	return (
		<Box sx={{ height: '90vh', display: 'flex', flexDirection: 'column' }}>
			{/* Header */}
			<Paper
				elevation={2}
				sx={{ p: 3, mb: 2, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
			>
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<Box>
						<Typography
							variant="h4"
							component="h1"
							sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}
						>
							Advanced Form Builder
						</Typography>
						<Typography
							variant="body1"
							sx={{ color: 'rgba(255,255,255,0.9)' }}
						>
							Create beautiful forms with drag & drop interface
						</Typography>
					</Box>

					<Stack
						direction="row"
						spacing={1}
					>
						<Chip
							label="@coltorapps/builder"
							sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
						/>
						<Chip
							label="Material-UI"
							sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
						/>
					</Stack>
				</Box>
			</Paper>

			{/* Toolbar */}
			<Paper
				elevation={1}
				sx={{ p: 2, mb: 2 }}
			>
				<Stack
					direction="row"
					spacing={2}
					alignItems="center"
				>
					<Button
						variant={previewMode ? 'outlined' : 'contained'}
						startIcon={<EditIcon />}
						onClick={() => setPreviewMode(false)}
					>
						Edit Mode
					</Button>
					<Button
						variant={previewMode ? 'contained' : 'outlined'}
						startIcon={<PreviewIcon />}
						onClick={() => setPreviewMode(true)}
					>
						Preview Mode
					</Button>
					<Divider
						orientation="vertical"
						flexItem
					/>
					<Button
						variant="outlined"
						startIcon={<CodeIcon />}
						onClick={() => setShowCode(!showCode)}
					>
						{showCode ? 'Hide' : 'Show'} Code
					</Button>
					<Box sx={{ flexGrow: 1 }} />
					<Button
						variant="contained"
						startIcon={<SaveIcon />}
						onClick={() => void submitFormSchema()}
						color="success"
					>
						Save Form
					</Button>
				</Stack>
			</Paper>

			{/* Code View */}
			{showCode && (
				<Fade in={showCode}>
					<Paper
						elevation={1}
						sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5' }}
					>
						<Typography
							variant="h6"
							gutterBottom
						>
							Generated Schema:
						</Typography>
						<Box
							component="pre"
							sx={{
								bgcolor: '#1e1e1e',
								color: '#d4d4d4',
								p: 2,
								borderRadius: 1,
								overflow: 'auto',
								maxHeight: 200,
								fontSize: '0.875rem',
								fontFamily: 'Monaco, Consolas, monospace'
							}}
						>
							{JSON.stringify(builderStore.schema || {}, null, 2)}
						</Box>
					</Paper>
				</Fade>
			)}

			{/* Main Content */}
			<Box sx={{ flex: 1, overflow: 'hidden' }}>
				<Grid
					container
					spacing={2}
					sx={{ height: '100%' }}
				>
					{/* Toolbox */}
					{!previewMode && (
						<Grid
							item
							xs={12}
							md={3}
						>
							<Paper
								elevation={2}
								sx={{
									height: '100%',
									p: 2,
									background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%)'
								}}
							>
								<FormBuilderToolbox builderStore={builderStore} />
							</Paper>
						</Grid>
					)}

					{/* Canvas */}
					<Grid
						item
						xs={12}
						md={previewMode ? 12 : 6}
					>
						<Paper
							elevation={2}
							sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
						>
							<Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
								<Typography
									variant="h6"
									sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
								>
									{previewMode ? <PreviewIcon /> : <EditIcon />}
									{previewMode ? 'Form Preview' : 'Form Canvas'}
								</Typography>
							</Box>

							<Box
								sx={{
									flex: 1,
									p: 2,
									overflow: 'auto',
									minHeight: 400,
									background: previewMode
										? 'white'
										: 'linear-gradient(145deg, #fafafa 0%, #f0f0f0 100%)'
								}}
								onDrop={handleDrop}
								onDragOver={handleDragOver}
							>
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
										<Box sx={{ mb: 2 }}>
											{previewMode ? (
												// Preview mode - clean view
												<Box>{props.children}</Box>
											) : (
												// Edit mode - with controls
												<Paper
													elevation={activeEntityId === props.entity.id ? 3 : 1}
													sx={{
														p: 2,
														position: 'relative',
														border:
															activeEntityId === props.entity.id
																? '2px solid #1976d2'
																: '1px solid transparent',
														borderRadius: 2,
														transition: 'all 0.2s ease',
														'&:hover': {
															border: '1px solid #1976d2',
															boxShadow: 2
														}
													}}
												>
													{props.children}

													{/* Control buttons */}
													<Box
														sx={{
															position: 'absolute',
															top: 8,
															right: 8,
															display: 'flex',
															gap: 0.5,
															opacity: activeEntityId === props.entity.id ? 1 : 0,
															transition: 'opacity 0.2s ease',
															'&:hover': { opacity: 1 }
														}}
													>
														<Tooltip title="Edit Properties">
															<IconButton
																size="small"
																onClick={() => setActiveEntityId(props.entity.id)}
																sx={{
																	bgcolor: 'primary.main',
																	color: 'white',
																	'&:hover': { bgcolor: 'primary.dark' }
																}}
															>
																<EditIcon fontSize="small" />
															</IconButton>
														</Tooltip>
														<Tooltip title="Delete Component">
															<IconButton
																size="small"
																onClick={() =>
																	builderStore.deleteEntity(props.entity.id)
																}
																sx={{
																	bgcolor: 'error.main',
																	color: 'white',
																	'&:hover': { bgcolor: 'error.dark' }
																}}
															>
																<DeleteIcon fontSize="small" />
															</IconButton>
														</Tooltip>
													</Box>
												</Paper>
											)}
										</Box>
									)}
								</BuilderEntities>

								{/* Empty state */}
								{(!builderStore.schema?.entities || builderStore.schema.entities.length === 0) && (
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											justifyContent: 'center',
											height: '100%',
											textAlign: 'center',
											color: 'text.secondary'
										}}
									>
										<Typography
											variant="h6"
											gutterBottom
										>
											Start Building Your Form
										</Typography>
										<Typography
											variant="body2"
											sx={{ mb: 2 }}
										>
											Drag components from the toolbox or click "Add to Form" to get started
										</Typography>
										<Box
											sx={{
												width: 200,
												height: 100,
												border: '2px dashed',
												borderColor: 'divider',
												borderRadius: 2,
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center'
											}}
										>
											<Typography
												variant="body2"
												color="text.secondary"
											>
												Drop components here
											</Typography>
										</Box>
									</Box>
								)}
							</Box>
						</Paper>
					</Grid>

					{/* Properties Panel */}
					{!previewMode && (
						<Grid
							item
							xs={12}
							md={3}
						>
							<Paper
								elevation={2}
								sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
							>
								<Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
									<Typography
										variant="h6"
										sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
									>
										<EditIcon />
										Properties
									</Typography>
								</Box>

								<Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
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
										<Alert
											severity="info"
											sx={{ mt: 2 }}
										>
											Select a component to edit its properties
										</Alert>
									)}
								</Box>
							</Paper>
						</Grid>
					)}
				</Grid>
			</Box>
		</Box>
	);
};

export default FormBuilderAdvanced;
