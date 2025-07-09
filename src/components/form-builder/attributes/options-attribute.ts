import { z } from "zod";
import { createAttribute } from "@coltorapps/builder";

const optionSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

export const optionsAttribute = createAttribute({
  name: "options",
  validate(value) {
    return z.array(optionSchema).min(1).parse(value);
  },
});
