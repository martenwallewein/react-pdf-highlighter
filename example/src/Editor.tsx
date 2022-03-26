import React, { useEffect, useState } from "react";
import EasyMDE from "easymde";
import "./Editor.css";
import { IHighlight } from "./types/Highlight";
import { IResource } from "./types/Resource";

interface Props {
    highlights: IHighlight[];
    resource: IResource;
}

const generateMarkdown = (resource: IResource, hightlights: IHighlight[]): string => {

    let str = `# ${resource.name} \n\n`;

    hightlights.forEach(h => {
        str += `> ${h.content.text}\n\n`;
        if (h.comment.text) {
            str += `${h.comment.text}\n\n`
        } else {
            str += "\n";
        }
    })


    return str;
};

export const Editor = (props: Props) => {

    const [mde, setMde] = useState<any>(null);

    useEffect(() => {
        // @ts-ignore
        const easyMDE = new EasyMDE({ element: document.getElementById('editor') });
        const markdown = generateMarkdown(props.resource, props.highlights);
        easyMDE.value(markdown);
        setMde(easyMDE);
    }, []);

    useEffect(() => {
        if (mde) {
            const markdown = generateMarkdown(props.resource, props.highlights);
            mde.value(markdown);
        }
    }, [props.resource]);


    return (
        <div className="Editor">
            <textarea id="editor"></textarea>
        </div>
    )
};