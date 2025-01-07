'use client'

import { useRoom, useSelf } from "@liveblocks/react/suspense";
import * as Y from 'yjs'
import { useEffect, useState } from "react";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import stringToColor from "@/lib/stringToColor";

type EditorProps = {
    doc: Y.Doc;
    provider: any;
    darkMode: boolean;
}


function BlockNote({ doc, provider, darkMode }: EditorProps) {
    const userInfo = useSelf((me) => me.info);

    console.log(userInfo)

    const editor: BlockNoteEditor = useCreateBlockNote({
        collaboration: {
            provider,
            fragment: doc.getXmlFragment("document-store"),
            user: {
                name: userInfo?.name,
                color: stringToColor(userInfo?.email)
            }
        }
    })

    return (
        <div className="relative max-w-6xl mx-auto">
             <BlockNoteView
                className="min-h-screen"
                editor={editor}
                theme={darkMode ? 'dark' : 'light'}
            />

        </div>
    )
}


function Editor() {
    const room = useRoom();
    const [ doc, setDoc ] = useState<Y.Doc>();
    const [ provider, setProvider ] = useState<LiveblocksYjsProvider>();
    const [ darkmode, setDarkmode ] = useState(false);

    useEffect(() => {
        const yDoc = new Y.Doc();
        const yProvider = new LiveblocksYjsProvider(room, yDoc);
        setDoc(yDoc);
        setProvider(yProvider);

        return () => {
            yDoc?.destroy();
            yProvider?.destroy();
        }
    }, [room]);

    const style = `hover:text-white ${
        darkmode ? 'text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700' : 'text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700'
    }`

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 justify-end mb-10">
                <div>
                    {/* ai feature */}
                </div>

                <Button
                    className={style}
                    onClick={() => setDarkmode(!darkmode)}>
                    {darkmode ? <SunIcon/> : <MoonIcon/>}
                </Button>
            </div>

            {doc && provider && <BlockNote doc={doc} provider={provider} darkMode={darkmode} />}

        </div>
    )
}

export default Editor