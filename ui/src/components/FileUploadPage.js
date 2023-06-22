import React, {useState} from 'react';
import { useOutletContext } from "react-router-dom";
//var result = "test message";
const FileUploadPage = () => {
    const [selectedFile, setSelectedFile] = useState("");
	const [isFilePicked, setIsFilePicked] = useState(false);
	const [isSelected, setIsSelected] = useState(false);
	const [result, setResult] = useState("")
	//const [ setAlertMessage ] = useOutletContext();	
	//const { setAlertClassName } = useOutletContext();

	function changeHandler(event) {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	}

	const handleSubmission = () => {
		const formData = new FormData();
		formData.append('file_input', selectedFile);

		const headers = new Headers();
        const requestOptions = {
            method: "POST",
            headers: headers,
			body: formData
        }

		fetch(
			'/api/upload', requestOptions			
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
				setResult("File uploaded successfully")
				//setAlertClassName("d-none")
                //setAlertMessage("File Uploaded successfully")
			})
			.catch((error) => {
				console.error('Error:', error);
				setResult("Error Uploading File")
				//setAlertClassName("alert-danger")
                //setAlertMessage(error)
			});
		};

	return(
   	<div className='container'>
			<label>Select a File:</label>&nbsp;&nbsp;&nbsp;
			<input type="file" name="file" onChange={changeHandler} />		
			<br /><br />	
			<div>
				<button onClick={handleSubmission}>Submit</button>
				<p>{result}</p>
			</div>
	</div>
	)
}

export default FileUploadPage;