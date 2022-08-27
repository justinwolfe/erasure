import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import { useEffect, useState } from "react";
import { useIsScrolling } from "react-use-is-scrolling";

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

const Actions = ({}) => {
  const { isScrollingY: isScrolling } = useIsScrolling();
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    if (isScrolling) {
      setIsHidden(false);
    }
    if (!isScrolling) {
      setTimeout(() => {
        if (!isOpen) {
          setIsHidden(true);
        }
      }, 300);
    }
  }, [isScrolling, isHidden]);

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
      direction="left"
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      hidden={isHidden}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
};

export default Actions;
