import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Link,
} from "@mui/material";
import { BASE_URL } from "../api";
import { IFile } from "../types/file";

type FileListItemProps = {
  file: IFile;
  deleteFile: (fileId: number) => void
};

export default function FileListItem({ file, deleteFile }: FileListItemProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div"></Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <CardMedia
            component="img"
            sx={{ width: 108, height: 108 }}
            image={`/assets/${file.type}.png`}
            alt="Paella dish"
          />
        </Typography>
        <Typography variant="body2">
          Название файла: <strong>{file.name.split(".")[0]}</strong>
          <br />
          Размер файла: <strong>{(file.size / 1024).toFixed(2)} КБ</strong>
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => window.open(BASE_URL + file.file)} variant="contained" size="small">
          Скачать
        </Button>
        <Button onClick={() => deleteFile(file.id)} variant="contained" color="secondary" size="small">
          Удалить
        </Button>
      </CardActions>
    </Card>
  );
}
