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
	Zoom,
	Tab,
	Tabs,
	AppBar,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Checkbox,
	FormControlLabel,
	Radio,
	RadioGroup,
	FormLabel,
	FormHelperText
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
	Add as AddIcon,
	PlayArrow as PlayIcon,
	Build as BuildIcon,
	Check as CheckIcon,
	Close as CloseIcon,
	Download as DownloadIcon,
	Upload as UploadIcon
} from '@mui/icons-material';
import {
	BuilderEntities,
	BuilderEntityAttributes,
	useBuilderStore,
	useBuilderStoreData,
	InterpreterEntities,
	useInterpreterStore
} from '@coltorapps/builder-react';
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

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`form-builder-tabpanel-${index}`}
			aria-labelledby={`form-builder-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
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

// Test Form Field Component
function TestFormField({
	entity,
	value,
	onChange,
	error
}: {
	entity: any;
	value: any;
	onChange: (value: any) => void;
	error?: string;
}) {
	const attributes = entity.attributes;

	const renderField = () => {
		switch (entity.type) {
			case 'text':
				return (
					<TextField
						fullWidth
						label={attributes.label}
						type={attributes.type || 'text'}
						value={value || ''}
						onChange={(e) => onChange(e.target.value)}
						required={attributes.required}
						error={!!error}
						helperText={error}
						placeholder={attributes.placeholder}
						size="small"
					/>
				);

			case 'textarea':
				return (
					<TextField
						fullWidth
						multiline
						rows={4}
						label={attributes.label}
						value={value || ''}
						onChange={(e) => onChange(e.target.value)}
						required={attributes.required}
						error={!!error}
						helperText={error}
						placeholder={attributes.placeholder}
						size="small"
					/>
				);

			case 'select':
				return (
					<FormControl
						fullWidth
						size="small"
						error={!!error}
					>
						<InputLabel>{attributes.label}</InputLabel>
						<Select
							value={value || ''}
							onChange={(e) => onChange(e.target.value)}
							label={attributes.label}
							required={attributes.required}
						>
							{attributes.options?.map((option: any, index: number) => (
								<MenuItem
									key={index}
									value={option.value}
								>
									{option.label}
								</MenuItem>
							))}
						</Select>
						{error && <FormHelperText>{error}</FormHelperText>}
					</FormControl>
				);

			case 'checkbox':
				return (
					<FormControl error={!!error}>
						<FormControlLabel
							control={
								<Checkbox
									checked={!!value}
									onChange={(e) => onChange(e.target.checked)}
								/>
							}
							label={attributes.label}
						/>
						{error && <FormHelperText>{error}</FormHelperText>}
					</FormControl>
				);

			case 'radio':
				return (
					<FormControl error={!!error}>
						<FormLabel>{attributes.label}</FormLabel>
						<RadioGroup
							value={value || ''}
							onChange={(e) => onChange(e.target.value)}
						>
							{attributes.options?.map((option: any, index: number) => (
								<FormControlLabel
									key={index}
									value={option.value}
									control={<Radio />}
									label={option.label}
								/>
							))}
						</RadioGroup>
						{error && <FormHelperText>{error}</FormHelperText>}
					</FormControl>
				);

			default:
				return (
					<TextField
						fullWidth
						label={attributes.label}
						value={value || ''}
						onChange={(e) => onChange(e.target.value)}
						size="small"
					/>
				);
		}
	};

	return <Box sx={{ mb: 2 }}>{renderField()}</Box>;
}

// Toolbox Component
function FormBuilderToolbox({ builderStore }: { builderStore: any }) {
	const [draggedComponent, setDraggedComponent] = useState<string | null>(null);

	const handleDragStart = (e: React.DragEvent, componentType: string) => {
		setDraggedComponent(componentType);
		e.dataTransfer.setData('text/plain', componentType);
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
							onDragStart={(e) => handleDragStart(e, component.type)}
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

export const FormBuilderComplete: React.FC<FormBuilderProps> = ({ onSchemaChange }) => {
	const [activeEntityId, setActiveEntityId] = useState<string>();
	const [currentTab, setCurrentTab] = useState(0);
	const [showCode, setShowCode] = useState(false);
	const [testFormData, setTestFormData] = useState<Record<string, any>>({});
	const [testSubmitted, setTestSubmitted] = useState(false);
	const [testErrors, setTestErrors] = useState<Record<string, string>>({});

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

	// Use useBuilderStoreData to get reactive schema updates
	const { schema } = useBuilderStoreData(builderStore, (events) =>
		events.some(
			(event) =>
				event.name === 'EntityAdded' ||
				event.name === 'EntityDeleted' ||
				event.name === 'EntityAttributeUpdated'
		)
	);

	// Create interpreter store for form preview
	const interpreterStore = useInterpreterStore(formBuilder, schema || { entities: {}, root: [] });

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

	function exportSchema() {
		if (!schema || !schema.root || schema.root.length === 0) {
			alert('No form components to export!');
			return;
		}

		// Export the complete builder store data, not just schema
		const builderData = builderStore.getData();
		const dataStr = JSON.stringify(builderData, null, 2);
		const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

		const exportFileDefaultName = `form-schema-${new Date().toISOString().split('T')[0]}.json`;

		const linkElement = document.createElement('a');
		linkElement.setAttribute('href', dataUri);
		linkElement.setAttribute('download', exportFileDefaultName);
		linkElement.click();
	}

	function importSchema(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const importedData = JSON.parse(e.target?.result as string);

				// Validate basic schema structure
				if (!importedData.schema || !importedData.schema.entities || !importedData.schema.root) {
					throw new Error('Invalid schema format. Expected format: { schema: { entities: {}, root: [] } }');
				}

				// Load the data into builder store using setData method
				builderStore.setData(importedData);
				alert('Schema imported successfully!');
			} catch (error) {
				console.error('Import error:', error);
				alert('Failed to import schema. Please check the file format.');
			}
		};
		reader.readAsText(file);

		// Reset input value to allow importing the same file again
		event.target.value = '';
	}

	function handleTestFormChange(fieldId: string, value: any) {
		setTestFormData((prev) => ({
			...prev,
			[fieldId]: value
		}));

		// Clear error for this field when user starts typing
		if (testErrors[fieldId]) {
			setTestErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[fieldId];
				return newErrors;
			});
		}
	}

	function validateTestForm() {
		const errors: Record<string, string> = {};

		if (schema?.root) {
			schema.root.forEach((entityId) => {
				const entity = schema.entities[entityId];
				if (entity) {
					const attributes = entity.attributes;

					// Check required fields
					if (attributes.required && !testFormData[entityId]) {
						errors[entityId] = `${attributes.label || 'This field'} is required`;
					}

					// Check email format
					if (entity.type === 'text' && attributes.type === 'email' && testFormData[entityId]) {
						const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
						if (!emailRegex.test(testFormData[entityId])) {
							errors[entityId] = 'Please enter a valid email address';
						}
					}
				}
			});
		}

		return errors;
	}

	function handleTestFormSubmit() {
		const errors = validateTestForm();
		setTestErrors(errors);

		if (Object.keys(errors).length === 0) {
			setTestSubmitted(true);
			console.log('Test Form Submitted:', testFormData);
		}
	}

	function resetTestForm() {
		setTestFormData({});
		setTestErrors({});
		setTestSubmitted(false);
	}

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setCurrentTab(newValue);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		const componentType = e.dataTransfer.getData('text/plain');

		if (componentType) {
			const componentDef = componentDefinitions.find((def) => def.type === componentType);
			if (componentDef) {
				builderStore.addEntity({
					type: componentDef.type,
					attributes: componentDef.defaultAttributes
				});
			}
		}
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
							Complete Form Builder
						</Typography>
						<Typography
							variant="body1"
							sx={{ color: 'rgba(255,255,255,0.9)' }}
						>
							Professional form builder with full @coltorapps/builder integration
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
						<Chip
							label="TypeScript"
							sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
						/>
					</Stack>
				</Box>
			</Paper>

			{/* Tabs */}
			<Paper
				elevation={1}
				sx={{ mb: 2 }}
			>
				<AppBar
					position="static"
					color="default"
					elevation={0}
				>
					<Tabs
						value={currentTab}
						onChange={handleTabChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
					>
						<Tab
							icon={<BuildIcon />}
							label="Builder"
							iconPosition="start"
						/>
						<Tab
							icon={<PreviewIcon />}
							label="Preview"
							iconPosition="start"
						/>
						<Tab
							icon={<PlayIcon />}
							label="Test Form"
							iconPosition="start"
						/>
					</Tabs>
				</AppBar>
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
						variant="outlined"
						startIcon={<CodeIcon />}
						onClick={() => setShowCode(!showCode)}
					>
						{showCode ? 'Hide' : 'Show'} Code
					</Button>

					<Button
						variant="outlined"
						startIcon={<DownloadIcon />}
						onClick={exportSchema}
						disabled={!schema?.root || schema.root.length === 0}
					>
						Export Schema
					</Button>

					<Button
						variant="outlined"
						startIcon={<UploadIcon />}
						component="label"
					>
						Import Schema
						<input
							type="file"
							accept=".json"
							onChange={importSchema}
							style={{ display: 'none' }}
						/>
					</Button>

					<Box sx={{ flexGrow: 1 }} />
					<Typography
						variant="body2"
						color="text.secondary"
					>
						{schema?.root?.length || 0} components
					</Typography>
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
							{JSON.stringify(schema || {}, null, 2)}
						</Box>
					</Paper>
				</Fade>
			)}

			{/* Tab Panels */}
			<Box sx={{ flex: 1, overflow: 'hidden' }}>
				{/* Builder Tab */}
				<TabPanel
					value={currentTab}
					index={0}
				>
					<Grid
						container
						spacing={2}
						sx={{ height: '60vh' }}
					>
						{/* Toolbox */}
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

						{/* Canvas */}
						<Grid
							item
							xs={12}
							md={6}
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
										Form Canvas
									</Typography>
								</Box>

								<Box
									sx={{
										flex: 1,
										p: 2,
										overflow: 'auto',
										minHeight: 400,
										background: 'linear-gradient(145deg, #fafafa 0%, #f0f0f0 100%)'
									}}
									onDrop={handleDrop}
									onDragOver={handleDragOver}
									onClick={(e) => {
										// Only clear selection if clicking on the canvas background, not on components
										if (e.target === e.currentTarget) {
											setActiveEntityId(undefined);
										}
									}}
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
															gap: 0.5
														}}
													>
														{activeEntityId === props.entity.id ? (
															<Tooltip title="Stop Editing">
																<IconButton
																	size="small"
																	onClick={() => setActiveEntityId(undefined)}
																	sx={{
																		bgcolor: 'success.main',
																		color: 'white',
																		'&:hover': { bgcolor: 'success.dark' }
																	}}
																>
																	<CheckIcon fontSize="small" />
																</IconButton>
															</Tooltip>
														) : (
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
														)}
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
											</Box>
										)}
									</BuilderEntities>

									{/* Empty state */}
									{(!schema?.root || schema.root.length === 0) && (
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
									<Box
										sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
									>
										<Typography
											variant="h6"
											sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
										>
											<EditIcon />
											Properties
										</Typography>
										{activeEntityId && (
											<Tooltip title="Clear Selection">
												<IconButton
													size="small"
													onClick={() => setActiveEntityId(undefined)}
													sx={{
														bgcolor: 'grey.200',
														'&:hover': { bgcolor: 'grey.300' }
													}}
												>
													<CloseIcon fontSize="small" />
												</IconButton>
											</Tooltip>
										)}
									</Box>
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
					</Grid>
				</TabPanel>

				{/* Preview Tab */}
				<TabPanel
					value={currentTab}
					index={1}
				>
					<Paper
						elevation={2}
						sx={{ p: 3, minHeight: '60vh' }}
					>
						<Typography
							variant="h6"
							gutterBottom
							sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
						>
							<PreviewIcon />
							Form Preview (Read-only)
						</Typography>
						<Divider sx={{ mb: 3 }} />

						{schema && schema.root && schema.root.length > 0 ? (
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
								{(props) => <Box sx={{ mb: 2 }}>{props.children}</Box>}
							</BuilderEntities>
						) : (
							<Alert severity="info">
								No components added yet. Go to the Builder tab to add components.
							</Alert>
						)}
					</Paper>
				</TabPanel>

				{/* Test Form Tab */}
				<TabPanel
					value={currentTab}
					index={2}
				>
					<Paper
						elevation={2}
						sx={{ p: 3, minHeight: '60vh' }}
					>
						<Typography
							variant="h6"
							gutterBottom
							sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
						>
							<PlayIcon />
							Interactive Form Test
						</Typography>
						<Divider sx={{ mb: 3 }} />

						{schema && schema.root && schema.root.length > 0 ? (
							<Box>
								{testSubmitted ? (
									<Alert
										severity="success"
										sx={{ mb: 3 }}
									>
										<Typography
											variant="h6"
											gutterBottom
										>
											Form Submitted Successfully! 🎉
										</Typography>
										<Typography
											variant="body2"
											sx={{ mb: 2 }}
										>
											Submitted Data:
										</Typography>
										<Box
											component="pre"
											sx={{
												backgroundColor: 'grey.100',
												p: 2,
												borderRadius: 1,
												fontSize: '0.875rem',
												overflow: 'auto'
											}}
										>
											{JSON.stringify(testFormData, null, 2)}
										</Box>
									</Alert>
								) : (
									<Stack spacing={3}>
										{schema.root.map((entityId) => {
											const entity = schema.entities[entityId];
											if (!entity) return null;

											return (
												<TestFormField
													key={entityId}
													entity={entity}
													value={testFormData[entityId]}
													onChange={(value) => handleTestFormChange(entityId, value)}
													error={testErrors[entityId]}
												/>
											);
										})}
									</Stack>
								)}

								<Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
									{!testSubmitted ? (
										<Button
											variant="contained"
											color="primary"
											onClick={handleTestFormSubmit}
											startIcon={<PlayIcon />}
										>
											Submit Test Form
										</Button>
									) : (
										<Button
											variant="outlined"
											onClick={resetTestForm}
											startIcon={<PlayIcon />}
										>
											Test Again
										</Button>
									)}
								</Box>
							</Box>
						) : (
							<Alert severity="info">
								No components added yet. Go to the Builder tab to add components.
							</Alert>
						)}
					</Paper>
				</TabPanel>
			</Box>
		</Box>
	);
};

export default FormBuilderComplete;
