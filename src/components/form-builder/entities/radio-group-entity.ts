import { z } from "zod";
import { createEntity } from "@coltorapps/builder";
import { labelAttribute } from "../attributes/label-attribute";
import { requiredAttribute } from "../attributes/required-attribute";
import { optionsAttribute } from "../attributes/options-attribute";

export const radioGroupEntity = createEntity({
  name: "radioGroup",
  attributes: [labelAttribute, requiredAttribute, optionsAttribute],
  validate(value, context) {
    const validOptions = context.entity.attributes.options.map(opt => opt.value);
    const schema = z.enum(validOptions as [string, ...string[]]);

    if (context.entity.attributes.required) {
      return schema.parse(value);
    }

    return schema.optional().parse(value);
  },
});
