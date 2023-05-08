import { Grid } from "@mui/material";
import { IFile } from "../types/file";
import FileListItem from "./FileListItem";

type FileListProps = {
  files: IFile[];
  deleteFile: (fileId: number) => void
};

export default function FileList({ files, deleteFile }: FileListProps) {

  return (
    <div>
      <Grid container spacing={2}>
        {files.map((file) => (
          <Grid item>
            <FileListItem deleteFile={deleteFile} file={file} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
