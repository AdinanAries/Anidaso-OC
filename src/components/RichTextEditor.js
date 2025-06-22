import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const RichTextEditor = () => {

  const editorRef = useRef(null);

  const logContent = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <div>
      <Editor
        apiKey='x0lkg9bwnaxokm8yqug5rp73tbzcyenmk9g08sd0p0fvy565'
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>type here...</p>"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help",
        }}
      />
      <button onClick={logContent}>Log Content</button>
    </div>
  );
}

export default RichTextEditor;