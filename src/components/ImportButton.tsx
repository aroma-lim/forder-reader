import { useRef } from "react";
import { useAppDispatch } from "../hook/hooks";
import { ReactComponent as ImportIcon } from "../assets/import-icon.svg";
import pathToTree, { TreeNode, validateJSON } from "../utils";
import { createJson, createLists } from "../store/listSlice";
import Button from "./Button";

const ImportButton = () => {
  const dispatch = useAppDispatch();
  const inputFile = useRef<HTMLInputElement | null>(null);

  const onButtonClick = () => {
    inputFile.current?.click();
  };

  const handleFileUpload = async (e: { target: { files: any } }) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = await file?.text();

    try {
      const json = validateJSON(data);
      if (!json) return;

      const lists: TreeNode[] = pathToTree(data);
      dispatch(createLists(lists));
      dispatch(createJson(json));
    } catch {
      window.alert("Import error: The file is not a JSON file.");
    }
  };

  return (
    <>
      <Button onClick={onButtonClick}>
        Import
        <ImportIcon />
      </Button>
      <input
        data-testid="file-input"
        style={{ display: "none" }}
        accept=".json"
        ref={inputFile}
        onChange={handleFileUpload}
        type="file"
      />
    </>
  );
};

export default ImportButton;
