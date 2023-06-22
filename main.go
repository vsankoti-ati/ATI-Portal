package main

import (
	"ati-portal/api/controllers"
	"net/http"

	"github.com/gin-gonic/gin"
)

const portNumber = "8085"

func main() {
	router := gin.Default()
	dataToUIPage := gin.H{}

	helloController := controllers.HelloController{}
	uploadController := controllers.ClientUploader{}
	
	/*
	router.LoadHTMLGlob("ui-dist/*.html")
	router.Static("/static", "./ui-dist/static")
	router.GET("/", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "index.html", dataToUIPage)
	})*/

	router.GET("/api/hello", helloController.GetName)
	router.POST("/api/upload", uploadController.UploadDocument)

	router.NoRoute(func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "index.html", dataToUIPage)
	})

	router.Run(":" + portNumber)
}
