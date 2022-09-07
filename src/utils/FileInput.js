import { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "./firebase";
import check from "../assests/images/check.png";

const FileInput = ({ name, label, value, type, handleInputState, ...rest }) => {
	const inputRef = useRef();
	const [progress, setProgress] = useState(0);
	const [progressShow, setProgressShow] = useState(false);

	const handleUpload = () => {
		setProgressShow(true);
		const fileName = new Date().getTime() + value.name;
		const storageRef = ref(
			storage,
			type === "image" ? `/TemplateImages/${fileName}` : `/TemplateFiles/${fileName}`
		);
		const uploadTask = uploadBytesResumable(storageRef, value);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const uploaded = Math.floor(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(uploaded);
			},
			(error) => {
				console.log(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					handleInputState(name, url);
				});
			}
		);
	};

	return (
		<div className=''>
			<input
				type="file"
				ref={inputRef}
				onChange={(e) => handleInputState(name, e.currentTarget.files[0])}
				vlaue={value}
				className="form-control"
				{...rest}
			/>
			{/* <button
				type="button"
				onClick={() => inputRef.current.click()}
				className="btn btn-primary btn-sm"
			>
				{label}
			</button> */}
			{type === "image" && value && (
				<center><img
					src={typeof value === "string" ? value : window.URL.createObjectURL(value)}
					alt="file"
					// className={styles.preview_img}
                    style={{width:'160px', height:'auto', marginTop: "30px"}}
				/></center>
			)}
			{type === "audio" && value && (
				<audio
					src={typeof value === "string" ? value : window.URL.createObjectURL(value)}
					controls
				/>
			)}
			{type === "file" && value && (
				<audio
					src={typeof value === "string" ? value : window.URL.createObjectURL(value)}
					
				/>
			)}
			{value !== null && !progressShow && typeof value !== "string" && (
				<center><button style={{marginTop:'30px', marginBottom:'30px'}} onClick={handleUpload} className='btn btn-primary'>
					Upload Image
				</button></center>
			)}
			{progressShow && progress < 100 && (
				<div className=''>
					<p>{progress}% Completed...</p>
				</div>
			)}
			{progress === 100 && (
				<div className=''>
					<center><img src={check} alt="check circle" style={{width:'80px', height:'auto'}} /></center>
				</div>
			)}
		</div>
	);
};

export default FileInput;
