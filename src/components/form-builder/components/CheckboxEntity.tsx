'use client';

import React from 'react';
import { FormControlLabel, Checkbox, FormHelperText, Box } from '@mui/material';
import { ZodError } from 'zod';
import { createEntityComponent } from '@coltorapps/builder-react';
import { checkboxEntity } from '../entities/checkbox-entity';

export const CheckboxEntity = createEntityComponent(
  checkboxEntity,
  (props) => {
    return (
      <Box sx={{ mt: 1, mb: 1 }}>
        <FormControlLabel
          control={
            <Checkbox
              id={props.entity.id}
              checked={props.entity.value ?? false}
              onChange={(e) => props.setValue(e.target.checked)}
              required={props.entity.attributes.required || false}
            />
          }
          label={props.entity.attributes.label || 'Checkbox'}
        />
        {props.entity.error instanceof ZodError && (
          <FormHelperText error>
            {props.entity.error.format()._errors[0]}
          </FormHelperText>
        )}
      </Box>
    );
  },
);
