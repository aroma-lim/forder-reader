import { FC, useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../hook/hooks";
import EmptyView from "./EmptyView";
import Lane from "./Lane";
import ListItem from "./ListItem";
import { TreeNode } from "../utils";
import { selectJSON, selectLists } from "../store/listSlice";
import PreviewLane from "./PreviewLane";

const LaneView: FC = () => {
  const lists = useAppSelector(selectLists);
  const json = useAppSelector(selectJSON);
  const [lanes, setLanes] = useState<TreeNode[][]>([]);
  const [path, setPath] = useState<string[]>([]);
  const [preview, setPreview] = useState<string>("");
  const [isShowPreview, setIsShowPreview] = useState<boolean>(false);

  useEffect(() => {
    setLanes([lists]);
    setPath([]);
    setPreview("");
    setIsShowPreview(false);
  }, [lists]);

  useEffect(() => {
    const pathString = path.join(".");

    Object.entries(json).forEach(([key, value]) => {
      if (key === pathString) {
        setPreview(value);
        return;
      }
    });
  }, [json, path]);

  const onExpand = useCallback(
    (listsInLane: TreeNode[], list: TreeNode, level: number) => {
      setPath((prev: string[]) => {
        const newPrev = prev.slice(0, level);
        return [...newPrev, list.name];
      });

      setLanes((prev) => {
        /**
         * from the beginning to just before the lane user clicks
         */
        const newPrev = prev.slice(0, level);

        /**
         * set states of 'selected' in the lane user clicks
         */
        const newLists = listsInLane.map((l) => {
          if (l.name === list.name) {
            return {
              name: l.name,
              selected: true,
              children: l.children,
            } as TreeNode;
          } else {
            return {
              name: l.name,
              selected: false,
              children: l.children,
            } as TreeNode;
          }
        });

        /**
         * set all 'selected' states 'false' in children
         */
        if (list.children.length > 0) {
          const newChildren = list.children.map((c) => {
            return {
              name: c.name,
              selected: false,
              children: c.children,
            } as TreeNode;
          });
          return [...newPrev, newLists, newChildren];
        } else {
          return [...newPrev, newLists];
        }
      });
    },
    []
  );

  const onShowPreview = useCallback((value: boolean) => {
    setIsShowPreview(value);
    if (!value) {
      setPreview("");
    }
  }, []);

  return (
    <>
      {lanes.map((listsInLane, level) => (
        <Lane data-testid={`lane-${level}`} key={level}>
          {listsInLane.length ? (
            listsInLane.map((list: TreeNode, index) => {
              return (
                <ListItem
                  key={list.name + index}
                  isFolder={list.children.length > 0}
                  selected={list.selected ?? false}
                  onExpand={() => onExpand(listsInLane, list, level)}
                  onShowPreview={(value) => onShowPreview(value)}
                >
                  {list.name}
                </ListItem>
              );
            })
          ) : (
            <EmptyView />
          )}
        </Lane>
      ))}
      {isShowPreview ? <PreviewLane path={path}>{preview}</PreviewLane> : null}
    </>
  );
};

export default LaneView;
