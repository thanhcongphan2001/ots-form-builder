'use client';

import React from 'react';
import {
	Box,
	TextField,
	Button,
	IconButton,
	Typography,
	Stack,
	Paper,
	Divider
} from '@mui/material';
import {
	Add as AddIcon,
	Delete as DeleteIcon,
	DragIndicator as DragIcon
} from '@mui/icons-material';
import { ZodError } from 'zod';
import { createAttributeComponent } from '@coltorapps/builder-react';
import { optionsAttribute } from '../attributes/options-attribute';

export const OptionsAttribute = createAttributeComponent(
	optionsAttribute,
	(props) => {
		const options = props.attribute.value || [
			{ label: 'Option 1', value: 'option1' },
			{ label: 'Option 2', value: 'option2' }
		];

		const handleAddOption = () => {
			const newOptions = [
				...options,
				{
					label: `Option ${options.length + 1}`,
					value: `option${options.length + 1}`
				}
			];
			props.setValue(newOptions);
		};

		const handleUpdateOption = (index: number, field: 'label' | 'value', value: string) => {
			const newOptions = [...options];
			newOptions[index] = {
				...newOptions[index],
				[field]: value
			};
			props.setValue(newOptions);
		};

		const handleRemoveOption = (index: number) => {
			if (options.length > 1) {
				const newOptions = options.filter((_, i) => i !== index);
				props.setValue(newOptions);
			}
		};

		return (
			<Box>
				<Typography variant="subtitle2" gutterBottom>
					Options
				</Typography>
				
				<Stack spacing={2}>
					{options.map((option, index) => (
						<Paper
							key={index}
							variant="outlined"
							sx={{ p: 2, position: 'relative' }}
						>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
								<DragIcon sx={{ color: 'text.secondary', cursor: 'grab' }} />
								<Typography variant="body2" color="text.secondary">
									Option {index + 1}
								</Typography>
								<Box sx={{ flexGrow: 1 }} />
								<IconButton
									size="small"
									color="error"
									onClick={() => handleRemoveOption(index)}
									disabled={options.length <= 1}
								>
									<DeleteIcon fontSize="small" />
								</IconButton>
							</Box>
							
							<Stack spacing={1}>
								<TextField
									label="Label"
									value={option.label}
									onChange={(e) => handleUpdateOption(index, 'label', e.target.value)}
									size="small"
									fullWidth
								/>
								<TextField
									label="Value"
									value={option.value}
									onChange={(e) => handleUpdateOption(index, 'value', e.target.value)}
									size="small"
									fullWidth
								/>
							</Stack>
						</Paper>
					))}
				</Stack>

				<Button
					startIcon={<AddIcon />}
					onClick={handleAddOption}
					variant="outlined"
					size="small"
					sx={{ mt: 2 }}
					fullWidth
				>
					Add Option
				</Button>

				{props.attribute.error instanceof ZodError && (
					<Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
						{props.attribute.error.format()._errors[0]}
					</Typography>
				)}
			</Box>
		);
	}
);
