import { getDestinationSquare } from "@/redux/slices/board";
import { getClassification } from "@/redux/slices/feedback";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useMarkerVisibility = () => {
  const [shouldMarkerBeVisible, setShouldMarkerBeVisible] = useState(false);
  const classification = useSelector(getClassification);
  const destinationSquare = useSelector(getDestinationSquare);

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
