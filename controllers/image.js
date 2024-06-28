require('dotenv').config();

const handleApiCall = (req, res) => {
    const PAT = process.env.CLARIFAI_PAT;
    const USER_ID = 'nogalcy';
    const APP_ID = 'my-first-application-2l1vx9';
    const MODEL_ID = 'face-detection';
    const IMAGE_URL = req.body.input;

    const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
    });

    const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
    };
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(data => {res.json(data)})
        .catch(err => res.status(400).json("Error with Clarafai API"));
}




const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then( entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json("Unable to get entry count"));
};

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};