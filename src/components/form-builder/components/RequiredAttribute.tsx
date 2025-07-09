'use client';

import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import { ZodError } from 'zod';
import { createAttributeComponent } from '@coltorapps/builder-react';
import { requiredAttribute } from '../attributes/required-attribute';

export const RequiredAttribute = createAttributeComponent(
  requiredAttribute,
  (props) => {
    const id = `${props.entity.id}-${props.attribute.name}`;

    return (
      <FormControlLabel
        control={
          <Switch
            id={id}
            checked={props.attribute.value ?? false}
            onChange={(e) => props.setValue(e.target.checked)}
          />
        }
        label="Required Field"
        sx={{ mt: 1 }}
      />
    );
  },
);
