'use client'

import React, { useEffect, useState, useTransition } from 'react'
import { useParams } from 'next/navigation';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { docData } from 'rxfire/firestore';
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import Editor from '@/components/Editor';

function DocumentPage() {
    const { id } = useParams();
    const [input,setInput] = useState('');
    const [isUpdating, startTransition] = useTransition();

    
    useEffect(() => {
        const documentRef = doc(db, "documents", id);
        const subscription = docData(documentRef).subscribe((snapshot) => {
            setInput(snapshot.title || '');
        })
        
        // Cleanup subscription on unmount
        return () => {
            subscription.unsubscribe();
        };
    }, [id]);

    const updateTitle = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.trim()) {
            startTransition(async() => {
                await updateDoc(doc(db, "documents", id), {
                    title: input
                })
            })
        }
    }
  return (
    <div>
        <div>
            <div>page id: {id}</div>
            <form onSubmit={updateTitle}>
                <div>
                    <Input value={input} onChange={(e) => setInput(e.target.value)} />
                    <Button disabled={isUpdating} type='submit'>
                        {isUpdating ? "Updating..." : "Update"}
                    </Button>
                </div>
                <div>
                    {/* manage user */}
                </div>

                <hr  className='pb-10'/>

            </form>
            <Editor />
        </div>

    </div>
  )
}

export default DocumentPage