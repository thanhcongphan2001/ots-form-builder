'use client';

import React from 'react';
import { TextField } from '@mui/material';
import { ZodError } from 'zod';
import { createEntityComponent } from '@coltorapps/builder-react';
import { textareaEntity } from '../entities/textarea-entity';

export const TextareaEntity = createEntityComponent(
  textareaEntity,
  (props) => {
    return (
      <TextField
        id={props.entity.id}
        label={props.entity.attributes.label || 'Textarea'}
        placeholder={props.entity.attributes.placeholder || 'Enter your message...'}
        value={props.entity.value ?? ""}
        onChange={(e) => props.setValue(e.target.value)}
        required={props.entity.attributes.required || false}
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        size="small"
        margin="normal"
        error={props.entity.error instanceof ZodError}
        helperText={
          props.entity.error instanceof ZodError
            ? props.entity.error.format()._errors[0]
            : null
        }
      />
    );
  },
);
