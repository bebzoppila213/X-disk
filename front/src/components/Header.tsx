import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/state";
import { userLogout } from "../state/thunks";

export default function Header() {
  const user = useAppSelector((state) => state.user);
  const dispatcher = useAppDispatch();

  return (
    <Box sx={{ flexGrow: 1, mb: 3 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            X-disk
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {user.username}
            </Typography>
            {user.isAuth && (
              <Button onClick={() => dispatcher(userLogout())} color="inherit">
                Выход
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
