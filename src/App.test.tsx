import { fireEvent, render, waitFor } from "@testing-library/react";
import App from "./App";
import { store } from "./store/store";
import ErrorExample from "./tests/error.json";
import ValidExample from "./tests/example.json";
import pathToTree from "./utils";

describe("App", () => {
  const getDom = async (file: { [x: string]: string | Object }) => {
    const DOM = render(<App store={store} />);
    const importer = DOM.getByTestId("file-input");
    await waitFor(() =>
      fireEvent.change(importer, {
        target: {
          files: [
            {
              text: () => JSON.stringify(file),
            },
          ],
        },
      })
    );
    return DOM;
  };

  test("when an invalid file is imported, it shows an error dialog.", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();
    const DOM = render(<App store={store} />);
    const importer = DOM.getByTestId("file-input");
    await waitFor(() =>
      fireEvent.change(importer, {
        target: {
          files: [
            {
              text: () => JSON.stringify(ErrorExample),
            },
          ],
        },
      })
    );
    expect(alertMock).toHaveBeenCalledTimes(1);
  });

  const tree = pathToTree(JSON.stringify(ValidExample));

  test("when a valid JSON file is imported, top-most folders and files from the file are listed.", async () => {
    const { getByTestId } = await getDom(ValidExample);
    const firstLane = getByTestId("lane-0");
    tree.forEach(({ name }) => expect(firstLane).toHaveTextContent(name));
  });

  test("when a folder is clicked, the children of the folder are listed.", async () => {
    const { getByTestId } = await getDom(ValidExample);
    const item = getByTestId(`item-${tree[0].name}`);
    await waitFor(() => fireEvent.click(item));

    tree[0].children.forEach(({ name }) =>
      expect(getByTestId("lane-1")).toHaveTextContent(name)
    );
  });

  test("When a file is clicked, its dot-separated path and content are displayed.", async () => {
    const { getByTestId } = await getDom(ValidExample);
    const leafNode = tree.filter(({ children: { length } }) => !length);
    const item = getByTestId(`item-${leafNode[0].name}`);
    await waitFor(() => fireEvent.click(item));

    expect(getByTestId("preview-lane")).toBeTruthy();
  });
});
