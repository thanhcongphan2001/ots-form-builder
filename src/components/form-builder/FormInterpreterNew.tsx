'use client';

import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Divider,
} from '@mui/material';

interface FormInterpreterProps {
  schema: any;
  onSubmit?: (data: Record<string, any>) => void;
  title?: string;
  description?: string;
}

export const FormInterpreter: React.FC<FormInterpreterProps> = ({
  schema,
  onSubmit,
  title = 'Form',
  description,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        const formData: Record<string, any> = {};
        await onSubmit(formData);
      } else {
        console.log('Form submitted!');
        alert('Form submitted successfully!');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!schema || !schema.entities || schema.entities.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No Form to Display
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please create a form using the Form Builder first.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
          Form interpreter will be implemented once the builder is working properly.
        </Typography>

        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default FormInterpreter;
