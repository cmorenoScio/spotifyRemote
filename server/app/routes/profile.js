module.exports = (app) => {

    // Profile controller
    let controller = app.controllers.profile;
    let c = app.helpers.controllerHandler;

    app.post('/token', c(controller.token, (req, res, next) => [req.body.clientId, req.body.clientSecret, req.body.code, req.body.urlRedirect]));

    /**
     * @swagger
     * /profile:
     *   get:
     *     tags:
     *       - profile
     *     description: Returns profile information
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Profile object
     */
    app.get('/profile', c(controller.index));

    /**
     * @swagger
     * /profile/listening:
     *   get:
     *     tags:
     *       - profile
     *     description: Returns profile track playing
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Track object
     */
    app.get('/profile/listening', c(controller.listening));

    /**
     * @swagger
     * /profile/playlists:
     *   get:
     *     tags:
     *       - profile
     *     description: Returns profile playlists
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Playlists object
     */
    app.get('/profile/playlists', c(controller.playlists));

    /**
     * @swagger
     * /profile/playlist/:playlistId/tracks:
     *   get:
     *     tags:
     *       - profile
     *     description: Returns playlist tracks
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Tracks object
     */
    app.get('/profile/playlist/:playlistId/tracks', c(controller.playlistTracks, (req, res, next) => [req.params.playlistId]));

    /**
     * @swagger
     * /profile/playlist/:name:
     *   post:
     *     tags:
     *       - profile
     *     description: Adds new profile playlist
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Playlist object
     */
    app.post('/profile/playlist/:name', c(controller.addPlaylist, (req, res, next) => [req.params.name]));

    /**
     * @swagger
     * /profile/listening/next:
     *   post:
     *     tags:
     *       - profile
     *     description: Next Song
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Track object
     */
    app.post('/profile/listening/next', c(controller.nextTrack));

    /**
     * @swagger
     * /profile/listening/previous:
     *   post:
     *     tags:
     *       - profile
     *     description: Previous Song
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Track object
     */
    app.post('/profile/listening/previous', c(controller.previousTrack));

    /**
     * @swagger
     * /profile/listening/play:
     *   put:
     *     tags:
     *       - profile
     *     description: Play Song
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Track object
     */
    app.put('/profile/listening/play', c(controller.play));

    /**
     * @swagger
     * /profile/listening/pause:
     *   put:
     *     tags:
     *       - profile
     *     description: Pause Song
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Track object
     */
    app.put('/profile/listening/pause', c(controller.pause));
     /**
     * @swagger
     * /profile/playlist/:playlistId:
     *   get:
     *     tags:
     *       - profile
     *     description: Returns playlist info
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Tracks object
     */
    app.get('/profile/playlists/:playlistId', c(controller.playlistInfo, (req, res, next) => [req.params.playlistId]));


};
