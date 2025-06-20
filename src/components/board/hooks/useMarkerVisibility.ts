import { Classification } from "@/types/classification";
import { useEffect, useState } from "react";

const useMarkerVisibility = (classification: Classification | null, destinationSquare: string | null) => {
  const [shouldMarkerBeVisible, setShouldMarkerBeVisible] = useState(false);

  useEffect(() => {
    if (destinationSquare && classification) {
      setShouldMarkerBeVisible(true);
    } else {
      setShouldMarkerBeVisible(false);
    }
  }, [destinationSquare, classification]);

  return { isVisible: shouldMarkerBeVisible, classification, destinationSquare };
};

export default useMarkerVisibility;
