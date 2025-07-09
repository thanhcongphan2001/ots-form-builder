'use client';

import React from 'react';
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, FormHelperText } from '@mui/material';
import { ZodError } from 'zod';
import { createEntityComponent } from '@coltorapps/builder-react';
import { radioGroupEntity } from '../entities/radio-group-entity';

export const RadioGroupEntity = createEntityComponent(
  radioGroupEntity,
  (props) => {
    const options = props.entity.attributes.options || [];

    return (
      <FormControl
        component="fieldset"
        margin="normal"
        required={props.entity.attributes.required || false}
        error={props.entity.error instanceof ZodError}
      >
        <FormLabel component="legend">
          {props.entity.attributes.label || 'Radio Group'}
        </FormLabel>
        <RadioGroup
          id={props.entity.id}
          value={props.entity.value ?? ""}
          onChange={(e) => props.setValue(e.target.value)}
        >
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
        {props.entity.error instanceof ZodError && (
          <FormHelperText>
            {props.entity.error.format()._errors[0]}
          </FormHelperText>
        )}
      </FormControl>
    );
  },
);
