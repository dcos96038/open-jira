import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import {useContext} from "react";

import {UIContext} from "../../context/ui/UIContext";

const menuItems: string[] = ["Inbox", "Starred", "Send Email", "Drafts"];

const Sidebar = () => {
  const {sideMenuOpen, closeSideMenu} = useContext(UIContext);

  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={closeSideMenu}>
      <Box sx={{width: "250px"}}>
        <Box sx={{padding: "5px 10px"}}>
          <Typography variant={"h4"}>Menu</Typography>
        </Box>
        <List>
          {menuItems.map((text, i) => (
            <ListItemButton key={text}>
              <ListItemIcon>{i % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
