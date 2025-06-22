import { useEffect } from "react";

const RichTextEditorQuill = (props) => {

    const {
        elem_id
    } = props;

    useEffect(()=>{
        const quill = new window.Quill(('#'+elem_id), {
            modules: {
                toolbar: [
                    ['bold', 'italic'],
                    ['link', 'blockquote', 'code-block', 'image'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                ],
            },
            theme: 'snow',
        });
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