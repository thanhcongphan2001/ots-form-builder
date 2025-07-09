'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

// Types
export interface FormEntity {
  id: string;
  type: string;
  attributes: Record<string, any>;
  value?: any;
}

export interface FormSchema {
  entities: FormEntity[];
}

export interface FormBuilderStore {
  schema: FormSchema;
  addEntity: (entityData: { type: string; attributes: Record<string, any> }) => void;
  deleteEntity: (entityId: string) => void;
  updateEntity: (entityId: string, updates: Partial<FormEntity>) => void;
  updateEntityAttribute: (entityId: string, attributeName: string, value: any) => void;
  moveEntity: (entityId: string, direction: 'up' | 'down') => void;
  clearForm: () => void;
}

// Context
const FormBuilderContext = createContext<FormBuilderStore | null>(null);

// Provider Component
interface FormBuilderProviderProps {
  children: React.ReactNode;
  initialSchema?: FormSchema;
}

export const FormBuilderProvider: React.FC<FormBuilderProviderProps> = ({ 
  children, 
  initialSchema = { entities: [] } 
}) => {
  const [schema, setSchema] = useState<FormSchema>(initialSchema);

  const addEntity = useCallback((entityData: { type: string; attributes: Record<string, any> }) => {
    const newEntity: FormEntity = {
      id: `entity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: entityData.type,
      attributes: entityData.attributes,
      value: undefined
    };

    setSchema(prev => ({
      ...prev,
      entities: [...prev.entities, newEntity]
    }));
  }, []);

  const deleteEntity = useCallback((entityId: string) => {
    setSchema(prev => ({
      ...prev,
      entities: prev.entities.filter(entity => entity.id !== entityId)
    }));
  }, []);

  const updateEntity = useCallback((entityId: string, updates: Partial<FormEntity>) => {
    setSchema(prev => ({
      ...prev,
      entities: prev.entities.map(entity => 
        entity.id === entityId ? { ...entity, ...updates } : entity
      )
    }));
  }, []);

  const updateEntityAttribute = useCallback((entityId: string, attributeName: string, value: any) => {
    setSchema(prev => ({
      ...prev,
      entities: prev.entities.map(entity => 
        entity.id === entityId 
          ? { 
              ...entity, 
              attributes: { 
                ...entity.attributes, 
                [attributeName]: value 
              } 
            } 
          : entity
      )
    }));
  }, []);

  const moveEntity = useCallback((entityId: string, direction: 'up' | 'down') => {
    setSchema(prev => {
      const entities = [...prev.entities];
      const currentIndex = entities.findIndex(entity => entity.id === entityId);
      
      if (currentIndex === -1) return prev;
      
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      
      if (newIndex < 0 || newIndex >= entities.length) return prev;
      
      // Swap entities
      [entities[currentIndex], entities[newIndex]] = [entities[newIndex], entities[currentIndex]];
      
      return {
        ...prev,
        entities
      };
    });
  }, []);

  const clearForm = useCallback(() => {
    setSchema({ entities: [] });
  }, []);

  const store: FormBuilderStore = {
    schema,
    addEntity,
    deleteEntity,
    updateEntity,
    updateEntityAttribute,
    moveEntity,
    clearForm
  };

  return (
    <FormBuilderContext.Provider value={store}>
      {children}
    </FormBuilderContext.Provider>
  );
};

// Hook to use the store
export const useFormBuilderStore = (): FormBuilderStore => {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error('useFormBuilderStore must be used within a FormBuilderProvider');
  }
  return context;
};

// Simple hook that mimics the original useBuilderStore
export const useBuilderStore = (builder: any) => {
  return useFormBuilderStore();
};

export default FormBuilderProvider;
