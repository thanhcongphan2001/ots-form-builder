import { createBuilder } from "@coltorapps/builder";
import { textFieldEntity } from "./entities/text-field-entity";
import { textareaEntity } from "./entities/textarea-entity";
import { selectEntity } from "./entities/select-entity";
import { checkboxEntity } from "./entities/checkbox-entity";
import { radioGroupEntity } from "./entities/radio-group-entity";

export const formBuilder = createBuilder({
  entities: [
    textFieldEntity,
    textareaEntity,
    selectEntity,
    checkboxEntity,
    radioGroupEntity,
  ],
});
