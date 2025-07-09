import { z } from "zod";
import { createEntity } from "@coltorapps/builder";
import { labelAttribute } from "../attributes/label-attribute";
import { placeholderAttribute } from "../attributes/placeholder-attribute";
import { requiredAttribute } from "../attributes/required-attribute";

export const textFieldEntity = createEntity({
  name: "textField",
  attributes: [labelAttribute, placeholderAttribute, requiredAttribute],
  validate(value, context) {
    const schema = z.string();

    if (context.entity.attributes.required) {
      return schema.min(1).parse(value);
    }

    return schema.optional().parse(value);
  },
});
