const express = require('express');  // Importation du module Express
const fs = require('fs');  // Importation du module de système de fichiers
const ytbdl = require('ytdl-core');  // Importation du module ytdl-core pour télécharger les vidéos YouTube

const app = express();  // Création d'une instance de l'application Express

app.use(express.static('public'));  // Définition du répertoire "public" pour les fichiers statiques
app.use(express.json());  // Activation de l'analyseur de corps de requête JSON

app.post('/download', async (req, res) => {
  const url = req.body.url;  // Récupération de l'URL de la vidéo à télécharger depuis le corps de la requête

  try {
    const videoID = ytbdl.getURLVideoID(url);  // Extraction de l'ID de la vidéo à partir de l'URL
    const info = await ytbdl.getInfo(videoID);  // Obtention des informations de la vidéo à partir de l'ID

    const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');  // Nettoyage du titre de la vidéo des caractères spéciaux

    ytbdl(url)
      .pipe(fs.createWriteStream(`${title}.mp3`))  // Téléchargement de la vidéo et création d'un flux de lecture pour écrire dans un fichier
      .on('finish', () => {
        res.sendStatus(200);  // Envoi d'une réponse avec le statut 200 (OK) lorsque le téléchargement est terminé
      });
  } catch (error) {
    console.error('Erreur lors du téléchargement :', error);  // Affichage de l'erreur dans la console en cas d'échec du téléchargement
    res.sendStatus(500);  // Envoi d'une réponse avec le statut 500 (Internal Server Error) en cas d'erreur
  }
});

// const port = process.env.PORT || 3000;  // Définition du port d'écoute du serveur
// app.listen(port, () => {
//   console.log(`Serveur démarré sur le port ${port}`);  // Affichage d'un message dans la console pour indiquer que le serveur est démarré
// });
