import React, { ReactNode, useState } from "react";
import { DragItem } from "../../../api/common/interfaces/dragdrop.interface";

interface IDragContext {
  dragItem?: DragItem;
  setDragItem: React.Dispatch<React.SetStateAction<DragItem | undefined>>;
}

export const DragContext = React.createContext({} as IDragContext);

export const DragProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dragItem, setDragItem] = useState<DragItem>();

  return (
    <DragContext.Provider value={{ setDragItem, dragItem }}>
      {children}
    </DragContext.Provider>
  );
};
