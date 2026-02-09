import { MoveClassification } from "@/typing/enums";
import { 
  BlunderIcon, 
  InaccuracyIcon, 
  MistakeIcon,
  GoodIcon, 
  ExcellentIcon, 
  BestIcon, 
  GreatIcon, 
  BookIcon 
} from "@/assets/icons/classification/index";

export const CLASSIFICATION_IMAGES: Record<MoveClassification, string> = {

  [MoveClassification.Blunder]: BlunderIcon,
  [MoveClassification.Inaccuracy]: InaccuracyIcon,
  [MoveClassification.Mistake]: MistakeIcon,
  [MoveClassification.Good]: GoodIcon,
  [MoveClassification.Excellent]: ExcellentIcon,
  [MoveClassification.Best]: BestIcon,
  [MoveClassification.Great]: GreatIcon,
  [MoveClassification.Book]: BookIcon,
} as const;

export const CLASSIFICATION_COLORS: Record<string, string> = {
  [MoveClassification.Book]: "#a88865",
  [MoveClassification.Best]: "#96bc4b",
  [MoveClassification.Excellent]: "#96bc4b",
  [MoveClassification.Good]: "#96af8b",
  [MoveClassification.Inaccuracy]: "#f7c045",
  [MoveClassification.Mistake]: "#e58f2a",
  [MoveClassification.Blunder]: "#ca3431"
} as const;

export const CLASSIFICATION_MESSAGES: Record<MoveClassification, string> = {
  [MoveClassification.Blunder]: "is a blunder",
  [MoveClassification.Mistake]: "is a mistake",
  [MoveClassification.Inaccuracy]: "is an inaccuracy",
  [MoveClassification.Good]: "is a good move",
  [MoveClassification.Excellent]: "is an excellent move",
  [MoveClassification.Best]: "is the best move",
  [MoveClassification.Book]: "is a book move",
  [MoveClassification.Great]: "is a great move"
} as const;
