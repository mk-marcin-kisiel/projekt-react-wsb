import React, { useEffect, useState } from 'react'
import FileBase from 'react-file-base64'
import '../theme/memeform.css'

function Form(){
  const [memeTitle, setmemeTitle] = useState('');
  const [memeFile, setmemeFile] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
	const response = await fetch('/memes/dashboard', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-access-token': localStorage.getItem('token'),
		},
		body: JSON.stringify({
			memeTitle,
			memeFile,
		}),
		
	})

	const data = await response.json()

	if (data.status === 'ok') {
		setmemeTitle('');
		setmemeFile('');
		window.location.reload(false);

		// navigate('/memes/dashboard', {replace: true})
	} else {
		alert('Próbowałeś wysłać mema bez zalogowania')
	}
  };

  return (
    <div className='Form-body Form-view Form-text'>
		<div className='Form-headtext'>
			<h1>add(newMeme)</h1>
		</div>
		<div className='Form-form'>
			<form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<input value={memeTitle.title} 
				onChange={(e) => setmemeTitle(e.target.value)}
				required
				placeholder='Tytuł mema' 
				className='text'
				type="text"
				/>
				<div><FileBase className='btn-Form' type="file" 
				multiple={false} onDone={({ base64 }) => setmemeFile(base64)} />
				</div>
				
				<input type="submit" className='btn-Form' value="Dodaj"/>
				{/* <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> */}
			</form>
	  	</div>
    </div>
  );
}

export default function Dashboard () {
	const [memes, showMemes] = useState([]);

	async function gettheMemes() {
		const req = await fetch('/memes/dashboard', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		if (data.status === 'ok') {
			showMemes(data.memes)
		} else {
		}
	}

	useEffect(() => {
		gettheMemes()
	}, [])
	
	
	function ImgORvid(props){
        if (props.meme.selectedFile[5] === 'i') {
            return <img src={props.meme.selectedFile} alt='meme'/>
        }
        return(
            <video width="420" height="320" autoPlay muted loop>
                <source src={props.meme.selectedFile} type="video/mp4"/>
            </video>
            
        );
    }

    function ShowthisMeme(props){
        const data = new Date(props.meme.createdAt).toString().split('G')[0]
        return(
            <div className='meme-body meme-view meme-text'>
                <div className='meme-creator'>
                    Udostępnione przez: {props.meme.creator}
                    <br/>
                    {data}
                </div>
                 <div className='meme-title'>
                <h1 >{props.meme.title}</h1>
                </div>
                 <ImgORvid key={props.meme._id} meme={props.meme}/>
            </div>
			
        )
    }

	return (
	<div>
		{/* <h1>Your memes: {memes || 'No memes found'}</h1> */}
		<Form/>
		{/* {memes.map((meme)=> <p key={meme._id}>{meme.title} {meme.title}</p>)} */}
        {memes.map((meme) => <ShowthisMeme key={meme._id} meme={meme}/>)};
	</div>
	);
}
