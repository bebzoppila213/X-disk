import { Alert } from "@mui/material";

export type AlertTypes = "error" | "success"

type StatusAllertProps = {
    text: string,
    type: AlertTypes
}

export default function StatusAllert({text, type}: StatusAllertProps){

    return(
        <Alert sx={{ mt: 1 }} severity={type}>
          {text}
        </Alert>
    )
}