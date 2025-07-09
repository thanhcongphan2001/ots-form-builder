'use client';

import React, { useState } from 'react';
import {
	Box,
	Container,
	Typography,
	Tabs,
	Tab,
	Paper,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Alert,
	Chip
} from '@mui/material';
import {
	Build as BuildIcon,
	Preview as PreviewIcon,
	Code as CodeIcon,
	Download as DownloadIcon
} from '@mui/icons-material';
import FormBuilderComplete from '@/components/form-builder/FormBuilderComplete';
import { FormInterpreter } from '@/components/form-builder';

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
			{value === index && <Box sx={{ py: 3 }}>{children}</Box>}
		</div>
	);
}

export default function FormBuilderDemoPage() {
	const [tabValue, setTabValue] = useState(0);
	const [formSchema, setFormSchema] = useState<any>(null);
	const [showSchemaDialog, setShowSchemaDialog] = useState(false);
	const [submittedData, setSubmittedData] = useState<any>(null);

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	const handleSchemaChange = (schema: any) => {
		setFormSchema(schema);
	};

	const handleFormSubmit = (data: Record<string, any>) => {
		setSubmittedData(data);
		console.log('Form submitted with data:', data);
	};

	const handleExportSchema = () => {
		if (formSchema) {
			const dataStr = JSON.stringify(formSchema, null, 2);
			const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

			const exportFileDefaultName = 'form-schema.json';

			const linkElement = document.createElement('a');
			linkElement.setAttribute('href', dataUri);
			linkElement.setAttribute('download', exportFileDefaultName);
			linkElement.click();
		}
	};

	const hasFormFields = formSchema?.entities && formSchema.entities.length > 0;

	return (
		<Container
			maxWidth="xl"
			sx={{ py: 3 }}
		>
			{/* Header */}
			<Box sx={{ mb: 4 }}>
				<Typography
					variant="h3"
					component="h1"
					gutterBottom
				>
					React Form Builder Demo
				</Typography>
				<Typography
					variant="h6"
					color="text.secondary"
					gutterBottom
				>
					Build dynamic forms with drag & drop interface (Public Access)
				</Typography>

				<Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
					<Chip
						label="@coltorapps/builder"
						color="primary"
						variant="outlined"
					/>
					<Chip
						label="Material-UI"
						color="secondary"
						variant="outlined"
					/>
					<Chip
						label="TypeScript"
						color="success"
						variant="outlined"
					/>
					<Chip
						label="No Auth Required"
						color="info"
						variant="outlined"
					/>
				</Box>
			</Box>

			{/* Status Alert */}
			{submittedData && (
				<Alert
					severity="success"
					sx={{ mb: 3 }}
					onClose={() => setSubmittedData(null)}
				>
					Form submitted successfully! Data: {JSON.stringify(submittedData)}
				</Alert>
			)}

			{/* Tabs */}
			<Paper>
				{/* Form Builder Tab */}
				<TabPanel
					value={tabValue}
					index={0}
				>
					<FormBuilderComplete onSchemaChange={handleSchemaChange} />
				</TabPanel>

				{/* Form Preview Tab */}
				<TabPanel
					value={tabValue}
					index={1}
				>
					{hasFormFields ? (
						<Box sx={{ maxWidth: 800, mx: 'auto' }}>
							<FormInterpreter
								schema={formSchema}
								title="Demo Form"
								description="This is a preview of your form built with the Form Builder"
								onSubmit={handleFormSubmit}
							/>
						</Box>
					) : (
						<Box sx={{ textAlign: 'center', py: 8 }}>
							<Typography
								variant="h6"
								color="text.secondary"
								gutterBottom
							>
								No form to preview
							</Typography>
							<Typography
								variant="body2"
								color="text.secondary"
							>
								Go to the Form Builder tab and add some fields to see the preview
							</Typography>
						</Box>
					)}
				</TabPanel>
			</Paper>

			{/* Schema Dialog */}
			<Dialog
				open={showSchemaDialog}
				onClose={() => setShowSchemaDialog(false)}
				maxWidth="md"
				fullWidth
			>
				<DialogTitle>Form Schema (JSON)</DialogTitle>
				<DialogContent>
					<Box
						component="pre"
						sx={{
							bgcolor: 'grey.100',
							p: 2,
							borderRadius: 1,
							overflow: 'auto',
							maxHeight: 400,
							fontSize: '0.875rem',
							fontFamily: 'monospace'
						}}
					>
						{JSON.stringify(formSchema, null, 2)}
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setShowSchemaDialog(false)}>Close</Button>
					<Button
						variant="contained"
						onClick={handleExportSchema}
					>
						Export JSON
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
}
