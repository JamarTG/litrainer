import { FC, useEffect, useState } from "react";
import { Materials } from "../../../types/eval";
import { determineColorLeadingInMaterial } from "../../../utils/chess/material";
import PieceIcon from "./PieceIcons";
import { Color } from "chess.js";

interface RenderMaterialProps {
  material: Materials;
  color: Color;
}

const RenderMaterial: FC<RenderMaterialProps> = ({ material, color }) => {
  useEffect(() => {
    setMaterialCount(determineColorLeadingInMaterial(material, color));
  }, [color, material]);

  const [materialCount, setMaterialCount] = useState<number>(0);

  return (
    <div className="flex justify-center items-center ">
      {Object.entries(color === "b" ? material.b : material.w).map(([piece, count]) =>
        count > 0 ? (
          <div
            key={piece}
            className="flex "
          >
            {[...Array(count)].map(() => (
              <PieceIcon
                piece="bishop"
                size={24}
              />
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
