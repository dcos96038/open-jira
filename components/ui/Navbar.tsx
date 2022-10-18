import {AppBar, IconButton, Link, Toolbar, Typography} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {useContext} from "react";
import NextLink from "next/link";

import {UIContext} from "../../context/ui/UIContext";

const Navbar: React.FC = () => {
  const {openSideMenu} = useContext(UIContext);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" size="large" onClick={openSideMenu}>
          <MenuOutlinedIcon />
        </IconButton>

        <NextLink passHref href="/">
          <Link color="white" underline="none">
            <Typography variant={"h6"}>Open Jira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
