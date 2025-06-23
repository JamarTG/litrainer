import { MoveClassification } from "@/utils/enums";

export type Classification = (typeof MoveClassification)[keyof typeof MoveClassification];
