'use client';

import React from 'react';
import { TextField } from '@mui/material';
import { ZodError } from 'zod';
import { createAttributeComponent } from '@coltorapps/builder-react';
import { placeholderAttribute } from '../attributes/placeholder-attribute';

export const PlaceholderAttribute = createAttributeComponent(
  placeholderAttribute,
  (props) => {
    const id = `${props.entity.id}-${props.attribute.name}`;

    return (
      <TextField
        id={id}
        label="Placeholder Text"
        value={props.attribute.value ?? ""}
        onChange={(e) => props.setValue(e.target.value)}
        fullWidth
        size="small"
        margin="normal"
        error={props.attribute.error instanceof ZodError}
        helperText={
          props.attribute.error instanceof ZodError
            ? props.attribute.error.format()._errors[0]
            : null
        }
      />
    );
  },
);
