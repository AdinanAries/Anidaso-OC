import { useEffect, useState } from "react";

const RichTextEditorQuill = (props) => {

    const {
        elem_id
    } = props;

    const [quill, setQuill ] = useState(null);

    useEffect(()=>{

        if(!quill){
            let __quill = new window.Quill(('#'+elem_id), {
                modules: {
                    toolbar: [
                        ['bold', 'italic'],
                        ['link', 'blockquote', 'code-block', 'image'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                    ],
                },
                theme: 'snow',
            });
            setQuill(__quill);
        }
        if(quill)
            quill.setContents([
                {
                    insert: "type here...",
                }
            ]);
    });

    return <div id={elem_id}>

    </div>;
    
}

export default RichTextEditorQuill;