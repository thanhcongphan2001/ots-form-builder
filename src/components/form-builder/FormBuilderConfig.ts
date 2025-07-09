import { createAttribute, createEntity } from '@coltorapps/builder';

// Define form field attributes
export const labelAttribute = createAttribute({
  name: 'label',
  validate: (value: unknown) => {
    if (typeof value !== 'string') {
      return 'Label must be a string';
    }
    if (value.length === 0) {
      return 'Label is required';
    }
    return null;
  },
});

export const placeholderAttribute = createAttribute({
  name: 'placeholder',
  validate: (value: unknown) => {
    if (typeof value !== 'string') {
      return 'Placeholder must be a string';
    }
    return null;
  },
});

export const requiredAttribute = createAttribute({
  name: 'required',
  validate: (value: unknown) => {
    if (typeof value !== 'boolean') {
      return 'Required must be a boolean';
    }
    return null;
  },
});

export const optionsAttribute = createAttribute({
  name: 'options',
  validate: (value: unknown) => {
    if (!Array.isArray(value)) {
      return 'Options must be an array';
    }
    for (const option of value) {
      if (typeof option !== 'object' || !option.label || !option.value) {
        return 'Each option must have label and value properties';
      }
    }
    return null;
  },
});

// Define form field entities
export const textInputEntity = createEntity({
  name: 'textInput',
  attributes: [labelAttribute, placeholderAttribute, requiredAttribute],
  validate: () => null,
});

export const textareaEntity = createEntity({
  name: 'textarea',
  attributes: [labelAttribute, placeholderAttribute, requiredAttribute],
  validate: () => null,
});

export const selectEntity = createEntity({
  name: 'select',
  attributes: [labelAttribute, requiredAttribute, optionsAttribute],
  validate: () => null,
});

export const checkboxEntity = createEntity({
  name: 'checkbox',
  attributes: [labelAttribute, requiredAttribute],
  validate: () => null,
});

export const radioGroupEntity = createEntity({
  name: 'radioGroup',
  attributes: [labelAttribute, requiredAttribute, optionsAttribute],
  validate: () => null,
});

// Export all entities for the builder
export const formBuilderEntities = [
  textInputEntity,
  textareaEntity,
  selectEntity,
  checkboxEntity,
  radioGroupEntity,
];
