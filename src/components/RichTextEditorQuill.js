import { useEffect, useState } from "react";

const RichTextEditorQuill = (props) => {

    const {
        currentContent,
        elem_id,
        setContent,
    } = props;

    useEffect(()=>{
        let __quill = new window.Quill(('#'+elem_id), {
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike',],
                    ['link', /*'blockquote', 'code-block', 'image'*/],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ 'indent': '-1'}, { 'indent': '+1' }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'font': [] }],
                    [{ 'align': [] }],
                    ['clean']  
                ],
            },
            placeholder: 'type here...',
            theme: 'snow',
        });
        __quill.on('text-change', (delta, oldDelta, source) => {
            
            if (source == 'api') {
                //console.log('An API call triggered this change.');
            } else if (source == 'user') {
                let __content = document.getElementById(elem_id).innerHTML;
                setContent(`${__content}`, __quill.getContents());
                //console.log('A user action triggered this change.');
            }
        });
        
        if(currentContent){
            if(currentContent){
                __quill.setContents(currentContent);
            }
        }
    }, []);

    return <div id={elem_id}>
        {/* Text editor will be put here */}
    </div>;
    
}

export default RichTextEditorQuill;