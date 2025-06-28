import { useEffect, useState } from "react";

const RichTextEditorQuill = (props) => {

    const {
        elem_id,
        setContent
    } = props;

    const [quill, setQuill ] = useState(null);

    useEffect(()=>{

        if(!quill){
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
            /*__quill.setContents([
                {
                    insert: "type here...",
                }
            ]);*/
            __quill.on('text-change', (delta, oldDelta, source) => {
                
                if (source == 'api') {
                    //console.log('An API call triggered this change.');
                } else if (source == 'user') {
                    let __content = document.getElementById(elem_id).innerHTML;
                    console.log(__content);
                    setContent(`${__content}`)
                    //console.log('A user action triggered this change.');
                }
            });
            setQuill(__quill);
        }
    }, []);

    return <div id={elem_id}>
        {/* Text editor will be put here */}
    </div>;
    
}

export default RichTextEditorQuill;