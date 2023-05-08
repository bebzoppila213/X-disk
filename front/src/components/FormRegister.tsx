import { TextField, FormControl, Button, CircularProgress } from "@mui/material";
import { useState } from "react";

import { validateLogin, validatePassword } from "../utils/valiator";

type FormRegisterProps = {
    onSubmitForm: (login: string, password: string) => void
}

export default function FormRegister({ onSubmitForm }: FormRegisterProps) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPasssword, setRepeatPasssword] = useState("");

  const [repeatPassswordError, setRepeatPassswordEmailError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoginError(() => !validateLogin(login))
    setPasswordError(() => !validatePassword(password))
    setRepeatPassswordEmailError(() => repeatPasssword !== password)

    if(repeatPasssword === password && validatePassword(password) && validateLogin(login)){
        onSubmitForm(login, password)
    }
    
}

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <h2>Форма регистрации</h2>
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
        type="text"
        value={password}
        error={passwordError}
        fullWidth
        sx={{ mb: 3 }}
      />
      <TextField
        label="Пароль 2 раз"
        onChange={(e) => setRepeatPasssword(e.target.value)}
        required
        variant="outlined"
        type="text"
        value={repeatPasssword}
        error={repeatPassswordError}
        fullWidth
        sx={{ mb: 3 }}
      />
      <Button variant="outlined" type="submit">
        Зарегистрироватся
      </Button>
      {/* <CircularProgress /> */}
    </form>
  );
}
