import { MoveClassification } from "@/typing/enums";
import { 
  blunderIcon, 
  inaccuracyIcon, 
  mistakeIcon,
  goodIcon, 
  excellentIcon, 
  bestIcon, 
  greatIcon, 
  bookIcon 
} from "@/assets/icons/classification/index";

export const CLASSIFICATION_IMAGES: Record<MoveClassification, string> = {

  [MoveClassification.blunder]: blunderIcon,
  [MoveClassification.inaccuracy]: inaccuracyIcon,
  [MoveClassification.mistake]: mistakeIcon,
  [MoveClassification.good]: goodIcon,
  [MoveClassification.excellent]: excellentIcon,
  [MoveClassification.best]: bestIcon,
  [MoveClassification.great]: greatIcon,
  [MoveClassification.book]: bookIcon,
} as const;

export const CLASSIFICATION_COLORS: Record<string, string> = {
  [MoveClassification.book]: "#a88865",
  [MoveClassification.best]: "#96bc4b",
  [MoveClassification.excellent]: "#96bc4b",
  [MoveClassification.good]: "#96af8b",
  [MoveClassification.inaccuracy]: "#f7c045",
  [MoveClassification.mistake]: "#e58f2a",
  [MoveClassification.blunder]: "#ca3431"
} as const;

export const CLASSIFICATION_MESSAGES: Record<MoveClassification, string> = {
  [MoveClassification.blunder]: "is a blunder",
  [MoveClassification.mistake]: "is a mistake",
  [MoveClassification.inaccuracy]: "is an inaccuracy",
  [MoveClassification.good]: "is a good move",
  [MoveClassification.excellent]: "is an excellent move",
  [MoveClassification.best]: "is the best move",
  [MoveClassification.book]: "is a book move",
  [MoveClassification.great]: "is a great move"
} as const;
