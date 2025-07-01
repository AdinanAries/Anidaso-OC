import { useEffect, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloudUpload } from "react-icons/ai";
import { MdClear } from "react-icons/md";

const DragAndDropFileInput = ({
  onFilesSelected,
  width,
  height,
  input_elem_id,
}) => {

  const _input_elem_id = (input_elem_id || "browse")

  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
        const newFiles = Array.from(selectedFiles);
        const reader = new FileReader();
                
        // Define what happens when the file is read
        reader.onload = async function(e) {
            newFiles[0].content = await Buffer.from(e.target.result).toString('base64') // File content in base64
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        };
        
        // Read the file as text
        reader.readAsText(event.target.files[0]);
        
    }
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
        const newFiles = Array.from(droppedFiles);
        const reader = new FileReader();
                
        // Define what happens when the file is read
        reader.onload = async function(e) {
            newFiles[0].content = await Buffer.from(e.target.result).toString('base64') // File content in base64
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        };
        
        // Read the file as text
        reader.readAsText(event.dataTransfer.files[0]);
        
    }
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    onFilesSelected(files);
  }, [files, onFilesSelected]);

  return (
    <section className="drag-drop" style={{ width: width, height: height }}>
      <div
        className={`document-uploader ${
          files.length > 0 ? "upload-box active" : "upload-box"
        }`}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <>
          <div className="upload-info">
            <div>
                <p>
                    <i style={{marginRight: 10}} className='fa-solid fa-paperclip'></i>
                    Drag and drop your files here
                </p>
                <p>
                    Limit 15MB per file. Supported files: .PDF, .DOCX, .PPTX, .TXT, .XLSX
                </p>
            </div>
          </div>
          <input
            type="file"
            hidden
            id={_input_elem_id}
            onChange={handleFileChange}
            accept=".pdf,.docx,.pptx,.txt,.xlsx"
            multiple
          />
        </>

        {files.length > 0 && (
          <div className="file-list">
            <div className="file-list__container">
              {files.map((file, index) => (
                <div className="file-item" key={index}>
                  <div className="file-info">
                    <p>{file.name}</p>
                    <p>{file.type}</p>
                  </div>
                  <div className="file-actions">
                    <MdClear onClick={() => handleRemoveFile(index)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {files.length > 0 && (
          <div className="success-file">
            <AiOutlineCheckCircle
              style={{ color: "#6DC24B", marginRight: 1 }}
            />
            <p>{files.length} file(s) selected</p>
          </div>
        )}
        <label htmlFor={_input_elem_id} className="browse-btn">
            Browse Files
        </label>
      </div>
    </section>
  );
};

export default DragAndDropFileInput;
