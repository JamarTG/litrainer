import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PIECE_ICONS } from "../../constants";
import { Materials } from "../../types/eval";
import { getMaterialCount } from "../../utils/chess";

interface RenderMaterialProps {
  material: Materials;
  color: "white" | "black";
}

const RenderMaterial: React.FC<RenderMaterialProps> = ({ material, color }) => {
  

  useEffect(() => {
    setMaterialCount(getMaterialCount(material, color));
  }, [color, material]);

  const [materialCount, setMaterialCount] = useState<number>(0);

  return (
    <div className="flex justify-center items-center gap-2">
      {Object.entries(color === "black" ? material.b : material.w).map(
        ([piece, count]) =>
          count > 0 ? (
            <div key={piece} className="flex gap-1">
              {[...Array(count)].map((_, i) => (
                <span key={i} className="text-lg font-semibold">
                  <FontAwesomeIcon
                    icon={PIECE_ICONS[piece as keyof typeof PIECE_ICONS]}
                    size="sm"
                  />
                </span>
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
