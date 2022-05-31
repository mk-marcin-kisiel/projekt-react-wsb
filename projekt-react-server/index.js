import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/user.js'
import Meme from './models/meme.js'
import JsonToken from 'jsonwebtoken'

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(express.json())


const CONNECTION_URL = 'mongodb+srv://Admin:szczupak@cluster0.dktyj41.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 3001;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

app.get('/', (req, res) => res.redirect('/memes/'))

app.get('/memes', async (req, res) => {
	try {
    	const memes = await Meme.find().sort({createdAt: -1})
		return res.json({ status: 'ok', memes: memes })		
	} catch (error) {
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.post('/memes', async (req, res) => {
	const token = req.headers['x-access-token']
	const voted = req.body.vote;
	// constcurrLikeCount+(voted)
	const memeID = req.body.memeid
	
	  try {
		  const decoded = JsonToken.verify(token, 'secretstring')
		  const username = decoded.username
		  const user = await User.findOne({ username: username })
		if(user !== undefined ){
			const currLikeCount = await Meme.findById(req.body.memeid)
			let newCount = parseInt(currLikeCount.likeCount) + parseInt(voted);
			const update = await Meme.findOneAndUpdate({_id: req.body.memeid}, {likeCount: newCount});
			return res.json({ status: 'ok' })
		}else{
			throw user;
		  }
	  } catch (error) {
		  res.json({ status: 'error', error: 'invalid token' })
	  }
})

app.post('/memes/register', async (req, res) => {
	try {
		await User.create({
			username: req.body.username,
			password: req.body.password
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate username' })
	}
})

app.post('/memes/login', async (req, res) => {
	const user = await User.findOne({
		username: req.body.username
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	if (req.body.password == user.password) {
		const token = JsonToken.sign(
			{
				username: user.username,
			}, 'secretstring'
      /**
       * secretOrPrivateKey is a string, buffer, or object containing 
       * either the secret for HMAC algorithms or the PEM encoded private key 
       * for RSA and ECDSA. 
       */
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})


app.get('/memes/dashboard', async (req, res) => {
	const token = req.headers['x-access-token']
	try {
		const decoded = JsonToken.verify(token, 'secretstring')
		const username = decoded.username
		const user = await User.findOne({ username: username })
    	const memes = await Meme.find({creator: user.username}).sort({createdAt: -1})
		return res.json({ status: 'ok', memes: memes })		
	} catch (error) {
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.post('/memes/dashboard', async (req, res) => {
  const token = req.headers['x-access-token']
  const title = req.body.memeTitle;
  const selectedFile = req.body.memeFile;
  const likeCount = 1;
  const createdAt = Date();
	try {
		const decoded = JsonToken.verify(token, 'secretstring')
		const creator = decoded.username
    	const newMeme = new Meme({title, creator, selectedFile, likeCount, createdAt})
		await newMeme.save()
		return res.json({ status: 'ok' })
	} catch (error) {
		res.json({ status: 'error', error: 'invalid token' })
	}
})
