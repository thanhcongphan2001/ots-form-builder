import { z } from "zod";
import { createEntity } from "@coltorapps/builder";
import { labelAttribute } from "../attributes/label-attribute";
import { requiredAttribute } from "../attributes/required-attribute";

export const checkboxEntity = createEntity({
  name: "checkbox",
  attributes: [labelAttribute, requiredAttribute],
  validate(value, context) {
    const schema = z.boolean();

    if (context.entity.attributes.required) {
      return schema.refine(val => val === true, {
        message: "This field is required"
      }).parse(value);
    }

    return schema.optional().parse(value);
  },
});
