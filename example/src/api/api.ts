import { IHighlight } from "../types/Highlight";
import { IResource } from "../types/Resource";
import { IWorkspace } from "../types/Workspace";

const HIGHLIGHTS_KEY = "rpf_highlights";

interface ServiceApi {
    AddWorkspace(workspace: IWorkspace): Promise<IWorkspace>;
    GetWorkspaces(): Promise<IWorkspace[]>;
    GetResources(): Promise<IResource[]>;
    GetHighlights(resource: IResource): Promise<IHighlight[]>;
    SetHighlights(resource: IResource, highlights: IHighlight[]): Promise<void>;
}

class SampleApi implements ServiceApi {
    private workspaces: IWorkspace[];
    private resources: IResource[];

    constructor() {
        this.resources = [
            {
                id: "1",
                name: "Multipath BitTorrent over SCION",
                path: "bittorrent-over-scion.pdf",
            },
            {
                id: "2",
                name: "Demonstration of xiondp",
                path: "xiondp.pdf",
            }
        ];
        this.workspaces = [
            {
                id: "10",
                name: "phd",
                description: "Workspace for phd research",
                folder: "/Users/martengartner/Projects/Uni/phd/",
                resources:  [
                    this.resources[0],
                ]
            }, {
                id: "20",
                name: "shared",
                description: "Workspace for unsassigned resources",
                folder: "/Users/martengartner/Projects/Uni/phd/",
                resources:  [
                    this.resources[1],
                ]
            }
        ]
    }
    async GetResources(): Promise<IResource[]> {
        return this.resources;
    }
    async GetHighlights(resource: IResource): Promise<IHighlight[]> {
        const highlightStr = localStorage.getItem(HIGHLIGHTS_KEY);
        if (highlightStr) {
            let highlights = JSON.parse(highlightStr) as IHighlight[];
            highlights = highlights.filter(h => h.resourceId === resource.id);
            return highlights;
        }
        return [];
    }
    async SetHighlights(resource: IResource, newHighlights: IHighlight[]): Promise<void> {
        const highlightStr = localStorage.getItem(HIGHLIGHTS_KEY);
        let highlights: IHighlight[];
        if (highlightStr) {
            highlights = JSON.parse(highlightStr) as IHighlight[];
            highlights = highlights.filter(h => h.resourceId !== resource.id);
            highlights = [...highlights, ...newHighlights];

        } else {
            highlights = newHighlights;
        }

        const targetStr = JSON.stringify(highlights);
        localStorage.setItem(HIGHLIGHTS_KEY, targetStr);
    }

    async AddWorkspace(workspace: IWorkspace): Promise<IWorkspace> {
        throw new Error("Method not implemented.");
    }
    async GetWorkspaces(): Promise<IWorkspace[]> {
        return this.workspaces;
    }


}

const serviceApi: ServiceApi  = new SampleApi();

export {
    serviceApi,
};