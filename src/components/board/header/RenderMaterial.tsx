import { FC } from "react";
import PieceIcon from "./PieceIcons";
import { Color } from "chess.js";
import { Materials } from "../../../types/eval";
import { determineColorLeadingInMaterial } from "../../../utils/chess/material";

interface RenderMaterialProps {
  material: Materials;
  color: Color;
}

const RenderMaterial: FC<RenderMaterialProps> = ({ material, color }) => {
  const materialCount = determineColorLeadingInMaterial(material, color);
  return (
    <div className="flex justify-center items-center ">
      {Object.entries(color === "b" ? material.b : material.w).map(([piece, count]) =>
        count > 0 ? (
          <div key={piece} className="flex ">
            {[...Array(count)].map(() => (
              <PieceIcon piece="bishop" size={18} />
            ))}
          </div>
        ) : null
      )}
      {materialCount > 0 ? "+" : ""}
      {materialCount || ""}
    </div>
  );
};

export default RenderMaterial;
