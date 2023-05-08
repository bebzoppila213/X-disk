import { Button, ButtonGroup, Grid, Input } from "@mui/material";
import { FormEvent, useRef, useState } from "react";
import { DialogTitle } from "@mui/material";
import { sendFile } from "../api/files";

type FormFileProps = {
  onSubmitFormFile: (formData: HTMLFormElement) => void;
};

export default function FormFile({ onSubmitFormFile }: FormFileProps) {
  const inputFile = useRef<any>(null);
  const [fileName, setFileName] = useState("");

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmitFormFile(event.currentTarget);
  };

  const changeInput = () => {
    if (inputFile !== null && inputFile.current.files.length > 0) {
      setFileName(inputFile.current.files[0].name);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <h3>
        Название файла: <i>{fileName}</i>
      </h3>
      <Grid container spacing={2}>
        <Grid item>
          <Button variant="contained" component="label">
            Выбрать фаил
            <input
              accept=".zip,.rar,.7zip,.xlsx,,.docx"
              ref={inputFile}
              onChange={changeInput}
              name="file"
              type="file"
              hidden
            />
          </Button>
        </Grid>
        <Grid item>
          <Button
            disabled={!(fileName.length > 0)}
            type="submit"
            variant="contained"
          >
            Загрузить
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
