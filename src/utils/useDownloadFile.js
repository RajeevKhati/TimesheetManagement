import { storage, ref, getDownloadURL } from "../firebase";

const useDownloadFile = () => {
  const downloadFile = (fileName) => {
    getDownloadURL(ref(storage, `leaveEmails/${fileName}`))
      .then((url) => {
        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
        };
        xhr.open("GET", url);
        xhr.send();
      })
      .catch((error) => {
        // Handle any errors
      });
  };
  return { downloadFile };
};

export default useDownloadFile;
