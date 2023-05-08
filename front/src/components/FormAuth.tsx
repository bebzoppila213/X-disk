import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { validateLogin, validatePassword } from "../utils/valiator";

type FormAuthProps = {
    onSubmitForm: (login: string, password: string) => void
}

export default function FormAuth({onSubmitForm}: FormAuthProps) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError(() => !validateLogin(login))
    setPasswordError(() => !validatePassword(password))
    if(validatePassword(password) && validateLogin(login)){
        onSubmitForm(login, password)
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <h2>Форма авторизации</h2>
      <TextField
        label="Логин"
        onChange={(e) => setLogin(e.target.value)}
        required
        variant="outlined"
        type="text"
        sx={{ mb: 3 }}
        fullWidth
        value={login}
        error={loginError}
      />
      <TextField
        label="Пароль"
        onChange={(e) => setPassword(e.target.value)}
        required
        variant="outlined"
        type="password"
        value={password}
        error={passwordError}
        fullWidth
        sx={{ mb: 3 }}
      />
      <Button variant="outlined" type="submit">
        Отправить 
      </Button>
      {/* <CircularProgress /> */}
    </form>
  );
}
