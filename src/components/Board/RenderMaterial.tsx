import { FC, useEffect, useState } from "react";
import { Materials } from "../../types/eval";
import { getMaterialCount } from "../../utils/chess";
import PieceIcon from "../Icons/PieceIcons";
import { Color } from "../../types/board";


interface RenderMaterialProps {
  material: Materials;
  color: Color;
}

const RenderMaterial: FC<RenderMaterialProps> = ({ material, color }) => {
  
  useEffect(() => {
    setMaterialCount(getMaterialCount(material, color));
  }, [color, material]);

  const [materialCount, setMaterialCount] = useState<number>(0);

  return (
    <div className="flex justify-center items-center ">
      {Object.entries(color === "b" ? material.b : material.w).map(
        ([piece, count]) =>
          count > 0 ? (
            <div key={piece} className="flex ">
              {[...Array(count)].map(() => (
                <PieceIcon piece="bishop" size={24} />
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
