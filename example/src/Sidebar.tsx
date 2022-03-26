import React from "react";
import type { IHHighlight } from "./react-pdf-highlighter";
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

import { IWorkspace } from "./types/Workspace";
import { Divider } from "@mui/material";
import { IResource } from "./types/Resource";
interface Props {
  highlights: Array<IHHighlight>;
  resetHighlights: () => void;
  toggleDocument: () => void;
  page: "pdf" | "dashboard" | "editor";
  workspaces: IWorkspace[];
  changeResource: (res: IResource) => Promise<void>;
}

const updateHash = (highlight: IHHighlight) => {
  document.location.hash = `highlight-${highlight.id}`;
};

export function Sidebar({
  highlights,
  toggleDocument,
  resetHighlights,
  workspaces,
  page,
  changeResource,
}: Props) {
  return (
    <div className="sidebar" style={{}}>
      <div className="description" style={{ padding: "1rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>Workspaces</h2>
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ overflowY: 'auto' }}
        >
          {
            workspaces.map(w =>
              <>
                <TreeItem nodeId={w.id} label={w.name}>
                  {
                    w.resources.map(r => (
                      <TreeItem nodeId={r.id} label={r.name} onClick={() => changeResource(r)} />
                    ))
                  }

                </TreeItem>
              </>
            )
          }
        </TreeView>


        <Divider style={{ marginTop: '1em' }} />
        <p>
          <small>
            To create area highlight hold ⌥ Option key (Alt), then click and
            drag.
          </small>
        </p>
      </div>

      <ul className="sidebar__highlights">
        {highlights.map((highlight, index) => (
          <li
            key={index}
            className="sidebar__highlight"
            onClick={() => {
              updateHash(highlight);
            }}
          >
            <div>
              <strong>{highlight.comment.text}</strong>
              {highlight.content.text ? (
                <blockquote style={{ marginTop: "0.5rem" }}>
                  {`${highlight.content.text.slice(0, 90).trim()}…`}
                </blockquote>
              ) : null}
              {highlight.content.image ? (
                <div
                  className="highlight__image"
                  style={{ marginTop: "0.5rem" }}
                >
                  <img src={highlight.content.image} alt={"Screenshot"} />
                </div>
              ) : null}
            </div>
            <div className="highlight__location">
              Page {highlight.position.pageNumber}
            </div>
          </li>
        ))}
      </ul>
      <div style={{ padding: "1rem" }}>
        <button onClick={toggleDocument}>Toggle PDF document</button>
      </div>
      {highlights.length > 0 ? (
        <div style={{ padding: "1rem" }}>
          <button onClick={resetHighlights}>Reset highlights</button>
        </div>
      ) : null}
    </div>
  );
}
