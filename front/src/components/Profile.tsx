import FormFile from "./FormFile";
import FileList from "./FileList";
import { useAppSelector } from "../hooks/state";
import { useEffect, useState } from "react";
import { IFile } from "../types/file";
import { deleteFile, loadFiles, sendFile } from "../api/files";
import Modal from "./Modal";
import StatusAllert, { AlertTypes } from "./StatusAllert";
import { Alert } from "@mui/material";

type ErrorType = {
  text: string;
  type: AlertTypes;
};

export default function Profile() {
  const user = useAppSelector((state) => state.user);
  const [files, setFiles] = useState<IFile[]>([]);
  const [activeFileId, setActiveFileId] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState<ErrorType>({ text: "", type: "error" });

  const loadDataFiles = async () => {
    const files = await loadFiles(user.token);
    setFiles(files);
  };

  const addNewFile = async (formData: HTMLFormElement) => {
    const response = await sendFile(formData);
    if (response.status === 201) {
      setFiles([...files, response.data]);
    } else {
      setError({ text: response.messages, type: "error" });
    }
  };

  const onBtnDeleteCkick = (fileId: number) => {
    setModalIsOpen(true);
    setActiveFileId(fileId);
  };

  const onModalBtnYes = async () => {
    const res = await deleteFile(activeFileId);
    if (res.status < 300) {
      setFiles(files.filter((f) => f.id !== activeFileId));
    }
    setModalIsOpen(false);
  };

  useEffect(() => {
    loadDataFiles();
  }, []);

  console.log();
  

  return (
    <div>
      <Alert sx={{ mb: 2 }} severity="info">Колличество занятой памяти {(files.reduce((acc, f)=> acc + f.size,0) / (1024 * 1024)).toFixed(3)} Mb из 10 Mb</Alert>
      <FileList deleteFile={onBtnDeleteCkick} files={files} />
      <FormFile onSubmitFormFile={addNewFile} />
      {error.text && <StatusAllert text={error.text} type={error.type} />}

      <Modal
        title={`Вы действительно хотите удалить фаил ${files.find(f => f.id === activeFileId)?.name} ?`}
        handleYes={onModalBtnYes}
        handleNo={() => setModalIsOpen(false)}
        onClose={() => setModalIsOpen(false)}
        isOpen={modalIsOpen}
      />
    </div>
  );
}
