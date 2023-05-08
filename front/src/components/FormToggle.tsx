import { ButtonGroup, Button, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import FormRegister from "./FormRegister";
import FormAuth from "./FormAuth";
import { useAppDispatch } from "../hooks/state";
import { userAuth, userRegister } from "../state/thunks";
import StatusAllert, { AlertTypes } from "./StatusAllert";

export type ErrorType = {
  text: string;
  type: AlertTypes;
};

export default function FormToggle() {
  const dispatcher = useAppDispatch();
  const [activeForm, setActiveForm] = useState<"register" | "auth">("register");
  const [error, setError] = useState<ErrorType>({ text: "", type: "error" });

  const onRegister = async (login: string, password: string) => {
    const resRegister = await dispatcher(
      userRegister({ username: login, password: password })
    );
    if (Object.hasOwn(resRegister, "error")) {
      setError({ text: "Ошибка регистрации", type: "error" });
    } else {
      setError({
        text: "Пользователь успешно зарегистрирован",
        type: "success",
      });
      setActiveForm("auth")
    }
  };

  const onAuth = async (login: string, password: string) => {
    const resAuth = await dispatcher(
      userAuth({ username: login, password: password })
    );
    if (Object.hasOwn(resAuth, "error")) {
      setError({ text: "Ошибка авторизации", type: "error" });
    }
  };

  useEffect(() => {
    const timer = setTimeout(
      () => setError({ text: "", type: "success" }),
      3000
    );
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          onClick={() => setActiveForm("register")}
          disabled={activeForm === "register"}
        >
          Регистрация
        </Button>
        <Button
          onClick={() => setActiveForm("auth")}
          disabled={activeForm === "auth"}
        >
          Авторизация
        </Button>
      </ButtonGroup>
      {activeForm === "register" ? (
        <FormRegister onSubmitForm={onRegister} />
      ) : (
        <FormAuth onSubmitForm={onAuth} />
      )}
      {error.text && (
        <StatusAllert type={error.type} text={error.text}></StatusAllert>
      )}
    </div>
  );
}
