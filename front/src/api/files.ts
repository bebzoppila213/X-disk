import axios from "axios";
import { IFile } from "../types/file";
import $api from ".";



export const loadFiles = async (token: string) => {
  $api.get<IFile[]>("test/");
  const response = await $api.get<IFile[]>("test/");
  return response.data;
};

type SendFileBad = {
    messages: string,
    status: 400
}

type SendFileSucsess = {
    data: IFile,
    status: 201
}

export const sendFile = async (form: HTMLFormElement) => {
  const response = await $api.post("/test/", new FormData(form), {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data as SendFileBad | SendFileSucsess
};


export const deleteFile = async (fileId: number) => {
    const response = await $api.delete("/test/", {
        data: {fileId: fileId}
    })
    return response
    
}