require('./app')('mongodb://localhost/manageTeam').then(app => {
    console.log("Serwer działa na porcie : 8030")
    app.listen(process.env.PORT || 8030)
})
