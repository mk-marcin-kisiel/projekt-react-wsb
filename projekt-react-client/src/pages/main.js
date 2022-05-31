import React, { useEffect, useState } from 'react'
import '../theme/meme.css'
export default function Main (props) {
	const [memes, showMemes] = useState([]);

	async function gettheMemes() {
		const req = await fetch('/memes')

		const data = await req.json()
		if (data.status === 'ok') {
			showMemes(data.memes)
		} 
	}

	useEffect(() => {
		gettheMemes()
	}, [props])


	function ImgORvid(props){
        if (props.meme.selectedFile[5] === 'i') {
            return <img src={props.meme.selectedFile} alt='meme'/>
        }
        return(
            <video width="320" height="240" autoPlay muted loop>
                <source src={props.meme.selectedFile} type="video/mp4"/>
            </video>
            
        );
    }
    function RateThisMeme(props){
        const [vote, setVote] = useState('')
        const [likeCount, setlikeCount] = useState(props.meme.likeCount)

        // useEffect(()=>{
        //     setlikeCount(likeCount)
        // }, [vote, likeCount]
        // )
        async function Vote_inc(){
            const vote = 1;
            const memeid = props.meme._id
            const response = await fetch('/memes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    vote,
                    memeid
                }),
            })
        
            const data = await response.json()
            if (data.status === 'ok') {
                setVote('+');
                setlikeCount(likeCount+1)
            } else {
                alert('Nie jesteś zalogowany, zaloguj się aby oceniać memy')
            }
        }
        async function Vote_dec(){
            const vote = -1;
            const memeid = props.meme._id
            const response = await fetch('/memes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    vote,
                    memeid
                }),
            })
        
            const data = await response.json()
            if (data.status === 'ok') {
                setVote('-');
                setlikeCount(likeCount-1)

            } else {
                alert('Nie jesteś zalogowany, zaloguj się aby oceniać memy')
            }
        }
       

        return(
            <div className="meme-rate">
                <button className={vote==='+' ? 'meme-rate-btn meme-rate-btn-selected' : 'meme-rate-btn'} onClick={()=>Vote_inc()} type="button">++</button>
                <button className='meme-rate-btn'type="button">{likeCount}</button>             
                <button className={vote==='-' ? 'meme-rate-btn meme-rate-btn-selected' : 'meme-rate-btn'} onClick={()=>Vote_dec()} type="button">--</button>             
            </div>
        )

    }

    function ShowthisMeme(props){
        const data = new Date(props.meme.createdAt).toString().split('G')[0]
        if (props.selected ==='hot' && props.meme.likeCount <5){
            return (null)
        }
        return(
            <div className='meme-body meme-view meme-text'>
                <div className='meme-creator'>
                    Udostępnione przez: {props.meme.creator}
                    <br/>
                    {data}
                </div>
                 <div className='meme-title'>
                <h1>{props.meme.title}</h1>
                </div>
                 <ImgORvid key={props.meme.title} meme={props.meme}/>
                 <RateThisMeme key={props.meme._id} meme={props.meme}></RateThisMeme>
            </div>
        )
    }


	return (
	<div>
        {memes.map((meme) => <ShowthisMeme key={meme._id} meme={meme} selected={props.selected}/>)};
	</div>
	);
}